const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

let simulationConfig = {
  windowSize: 1000,
  attackProbability: 0.3,
  entropyThreshold: 4, // You can lower this to 0.5 or 1.0 for better detection
};

// Generate synthetic packet sequence (1 = attack, 0 = normal)
function generateTraffic(windowSize, attackProbability) {
  const packets = [];
  for (let i = 0; i < windowSize; i++) {
    packets.push(Math.random() < attackProbability ? 1 : 0);
  }
  return packets;
}

// Calculate entropy for binary packets
function calculateEntropy(packets) {
  const count = packets.length;
  const countAttack = packets.reduce((acc, p) => acc + p, 0);
  if (countAttack === 0 || countAttack === count) return 0;

  const pAttack = countAttack / count;
  const pNormal = 1 - pAttack;

  return -(pAttack * Math.log2(pAttack) + pNormal * Math.log2(pNormal));
}

// Run simulation: multiple windows, accumulate confusion matrix stats
function runSimulation({ windowSize, attackProbability, entropyThreshold }) {
  const numWindows = 100;

  let TP = 0, FP = 0, TN = 0, FN = 0;
  let entropySum = 0;

  for (let i = 0; i < numWindows; i++) {
    const packets = generateTraffic(windowSize, attackProbability);
    const entropy = calculateEntropy(packets);
    entropySum += entropy;

    const predictedAttack = entropy >= entropyThreshold ? 1 : 0;
    const groundTruth = packets.includes(1) ? 1 : 0;

    if (predictedAttack === 1 && groundTruth === 1) TP++;
    else if (predictedAttack === 1 && groundTruth === 0) FP++;
    else if (predictedAttack === 0 && groundTruth === 0) TN++;
    else if (predictedAttack === 0 && groundTruth === 1) FN++;

    // Optional debug logging per window
    // console.log(`Window ${i + 1}: Entropy=${entropy.toFixed(4)}, Predicted=${predictedAttack}, Actual=${groundTruth}`);
  }

  const total = TP + FP + TN + FN;

  const precision = TP + FP === 0 ? 1 : TP / (TP + FP);
  const recall = TP + FN === 0 ? 0 : TP / (TP + FN);
  const accuracy = total === 0 ? 0 : (TP + TN) / total;
  const f1Score = precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);
  const averageEntropy = entropySum / numWindows;

  // Optional summary logging
  // console.log(`TP=${TP}, FP=${FP}, TN=${TN}, FN=${FN}`);
  // console.log(`Precision=${precision}, Recall=${recall}, Accuracy=${accuracy}, F1=${f1Score}`);

  return {
    accuracy: accuracy.toFixed(4),
    precision: precision.toFixed(4),
    recall: recall.toFixed(4),
    f1Score: f1Score.toFixed(4),
    entropy: averageEntropy.toFixed(4),
  };
}

app.post("/config", (req, res) => {
  try {
    const { windowSize, attackProbability, entropyThreshold } = req.body;

    if (
      !Number.isInteger(windowSize) || windowSize <= 0 ||
      typeof attackProbability !== "number" || attackProbability < 0 || attackProbability > 1 ||
      typeof entropyThreshold !== "number" || entropyThreshold < 0
    ) {
      return res.status(400).json({ error: "Invalid parameters" });
    }

    simulationConfig = { windowSize, attackProbability, entropyThreshold };
    return res.json({ message: "Config updated", simulationConfig });
  } catch (error) {
    console.error("Config update error:", error);
    return res.status(500).json({ error: "Server failed to update config" });
  }
});

app.get("/results", (req, res) => {
  try {
    const results = runSimulation(simulationConfig);
    res.json(results);
  } catch (error) {
    console.error("Results fetch error:", error);
    res.status(500).json({ error: "Failed to run simulation" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

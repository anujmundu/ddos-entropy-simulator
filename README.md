# 🛡️ Entropy-Based DDoS Detection Simulation Platform

A full-stack simulation platform for detecting Distributed Denial of Service (DDoS) attacks using entropy-based statistical analysis. Built with React, Node.js, Express, and Chart.js, this project visualizes detection metrics in real time and demonstrates how entropy can identify anomalous traffic patterns.

---

## 📌 Project Overview

This platform simulates network traffic and applies entropy-based detection to identify potential DDoS attacks. It computes key metrics such as accuracy, precision, recall, and F1 score, and presents them through interactive charts.

- **Frontend**: React + Chart.js
- **Backend**: Node.js + Express
- **Detection Method**: Shannon Entropy
- **Metrics**: Accuracy, Precision, Recall, F1 Score

---

## 🧠 Key Concepts

- **Entropy**: Measures randomness in packet source distribution. Low entropy indicates repetitive sources, often a sign of DDoS.
- **Window-Based Analysis**: Traffic is grouped into windows; entropy is calculated per window.
- **Thresholding**: If entropy < threshold, the window is flagged as an attack.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/ddos-entropy-simulator.git
cd ddos-entropy-simulator
npm install

Running the App
Start the backend:

bash
node server.js
Start the frontend:

bash
cd client
npm start

⚙️ Configuration
You can configure simulation parameters via the frontend UI:

Window Size: Number of packets per analysis window

Attack Probability: Likelihood of malicious packets

Entropy Threshold: Detection sensitivity

📊 Simulation Flow
Traffic Generation: Simulates packets with varying source IPs.

Entropy Calculation: Shannon entropy is computed for each window.

Detection: If entropy < threshold, window is flagged.

Metric Evaluation: Confusion matrix is updated.

Visualization: Charts display entropy trends and detection metrics.

📈 Example
text
Window Size: 1000 packets
Attack Probability: 0.9
Entropy Threshold: 0.95

→ Most packets come from a single IP → Low entropy
→ System flags window as attack
→ Metrics updated and visualized
📚 Technologies Used
Layer	Tools & Libraries
Frontend	React, Chart.js
Backend	Node.js, Express
Visualization	Chart.js, Custom UI
Detection Logic	Shannon Entropy
🧪 Evaluation Metrics
Accuracy: Correct detections / Total windows

Precision: True positives / (True positives + False positives)

Recall: True positives / (True positives + False negatives)

F1 Score: Harmonic mean of precision and recall

📌 Future Scope
Real-time traffic ingestion

Integration with ML models

Cloud deployment and scalability

UI/UX enhancements for broader accessibility

🧑‍💻 Author
Anuj Mundu Full-stack Developer & Technical Communicator Intern @ Exposys Data Labs

📄 License
This project is licensed under the MIT License.

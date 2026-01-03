/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

const fs = require('fs');
const path = require('path');

// Configure projects
const projects = [
    // Intermediate
    {
        id: "P07-Quantum-Framework",
        tier: "Intermediate",
        name: "Quantum State Frontend Framework",
        type: "code",
        desc: "Simulating reaction to observation..."
    },
    {
        id: "P08-Temporal-API",
        tier: "Intermediate",
        name: "Temporal API Gateway",
        type: "api",
        desc: "Fetching data from t-minus 10 seconds..."
    },
    {
        id: "P09-Holographic-DB",
        tier: "Intermediate",
        name: "Holographic Database Interface",
        type: "database",
        desc: "Projecting 3D data schematics..."
    },
    {
        id: "P10-Quantum-CICD",
        tier: "Intermediate",
        name: "Quantum CI/CD Pipeline",
        type: "terminal",
        desc: "Running tests across 14 parallel universes..."
    },
    {
        id: "P11-Neuro-Server",
        tier: "Intermediate",
        name: "Neuro-Adaptive Web Server",
        type: "network",
        desc: "Adjusting content based on cognitive load..."
    },
    {
        id: "P12-Quantum-Messenger",
        tier: "Intermediate",
        name: "Quantum Cryptographic Messenger",
        type: "chat",
        desc: "Entangling particles for secure transmission..."
    },
    // Expert
    {
        id: "P13-Quantum-Computing",
        tier: "Expert",
        name: "Distributed Quantum Computing Simulator",
        type: "network",
        desc: "Initializing qubits on distributed mesh..."
    },
    {
        id: "P14-Temporal-Browser",
        tier: "Expert",
        name: "Temporal Web Browser",
        type: "browser",
        desc: "Loading DOM state from 2028..."
    },
    {
        id: "P15-Quantum-IP",
        tier: "Expert",
        name: "Quantum Internet Protocol Stack",
        type: "network",
        desc: "Teleporting packets via Q-Switch..."
    },
    {
        id: "P16-Holographic-OS",
        tier: "Expert",
        name: "Holographic Operating System",
        type: "desktop",
        desc: "Booting Spatial Window Manager..."
    },
    {
        id: "P17-Quantum-AI",
        tier: "Expert",
        name: "Quantum AI Development Platform",
        type: "code",
        desc: "Training tensor network on Bloch sphere..."
    },
    {
        id: "P18-Temporal-FS",
        tier: "Expert",
        name: "Temporal Versioning File System",
        type: "database",
        desc: "Forking reality for file write..."
    }
];

const template = (p) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${p.name} | Ashraf Morningstar</title>
    <link rel="stylesheet" href="../../assets/css/quantum-core.css">
    <style>
        .container { max-width: 1600px; margin: 0 auto; padding: var(--space-xl); }
        .sim-interface { 
            display: grid; 
            grid-template-columns: 250px 1fr; 
            gap: var(--space-lg); 
            height: 80vh; 
            margin-top: var(--space-lg);
        }
        .sidebar {
            background: rgba(255,255,255,0.03);
            border-right: 1px solid rgba(255,255,255,0.1);
            padding: var(--space-md);
        }
        .main-view {
            background: rgba(0,0,0,0.4);
            border-radius: 12px;
            padding: var(--space-md);
            position: relative;
            overflow: hidden;
            font-family: 'Courier New', monospace;
        }
        .status-bar {
            padding: var(--space-sm);
            background: rgba(138, 43, 226, 0.1);
            color: var(--quantum-primary);
            font-size: 0.9rem;
            display: flex;
            justify-content: space-between;
        }
        .log-entry { margin-bottom: 5px; opacity: 0; animation: fadeIn 0.3s forwards; }
        @keyframes fadeIn { to { opacity: 1; } }
        .blink { animation: blink 1s infinite; }
        @keyframes blink { 50% { opacity: 0; } }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1 class="text-quantum" style="font-family: var(--font-display)">${p.name}</h1>
            <p style="color: var(--text-secondary)">${p.desc}</p>
        </header>

        <div class="holo-card sim-interface">
            <div class="sidebar">
                <h3 style="margin-bottom: var(--space-md)">Controls</h3>
                <button class="quantum-btn" style="width: 100%; margin-bottom: 10px" onclick="startSim()">▶ Initialize</button>
                <button class="quantum-btn" style="width: 100%; margin-bottom: 10px" onclick="resetSim()">↺ Reset</button>
                <div style="margin-top: 20px; font-size: 0.8rem; color: #888">
                    <div>STATUS: <span id="status" class="blink">STANDBY</span></div>
                    <div>MEMORY: <span id="memory">0</span> TB</div>
                    <div>ENTANGLEMENT: <span id="entangle">0</span>%</div>
                </div>
            </div>
            
            <div style="display: flex; flex-direction: column; flex: 1;">
                <div class="status-bar">
                    <span>SYS_ID: ${p.id}</span>
                    <span>MODE: ${p.type.toUpperCase()}_SIM</span>
                </div>
                <div class="main-view" id="console-output">
                    <div style="color: var(--quantum-secondary)">> System initialized... awaiting input_</div>
                </div>
            </div>
        </div>
        
        <div style="margin-top: var(--space-xl); text-align: center">
            <a href="../../index.html" class="quantum-btn">← Return to Roadmap</a>
        </div>
    </div>

    <script src="../../assets/js/quantum-engine.js"></script>
    <script>
        const output = document.getElementById('console-output');
        const status = document.getElementById('status');
        const memory = document.getElementById('memory');
        const entangle = document.getElementById('entangle');
        let interval;

        const logs = [
            "Initializing quantum cores...",
            "Loading probabilistic modules...",
            "Synchronizing with temporal lattice...",
            "Entangling ${p.type} nodes...",
            "Analyzing wave function collapse...",
            "Optimizing coherence...",
            "System ready."
        ];

        function log(msg, type='info') {
            const div = document.createElement('div');
            div.className = 'log-entry';
            const color = type === 'error' ? '#ff5555' : (type === 'success' ? '#55ff55' : '#aaa');
            div.innerHTML = \`<span style="color:\${color}">[\${new Date().toLocaleTimeString()}]</span> \${msg}\`;
            output.appendChild(div);
            output.scrollTop = output.scrollHeight;
        }

        function startSim() {
            status.textContent = "RUNNING";
            status.style.color = "#55ff55";
            let i = 0;
            interval = setInterval(() => {
                // Random updates
                memory.textContent = (Math.random() * 100).toFixed(2);
                entangle.textContent = Math.floor(Math.random() * 100);
                
                // Specific logs
                if (Math.random() > 0.7) {
                    const specificLogs = [
                        "Processing q-bit stream...",
                        "Resolving superposition state...",
                        "Requesting temporal authorization...",
                        "Packet teleported successfully.",
                        "Neural weights updated."
                    ];
                    log(specificLogs[Math.floor(Math.random() * specificLogs.length)]);
                }
            }, 800);

            // Initial sequence
            let j = 0;
            const seq = setInterval(() => {
                if (j < logs.length) {
                    log(logs[j++], 'success');
                } else {
                    clearInterval(seq);
                }
            }, 600);
        }

        function resetSim() {
            clearInterval(interval);
            output.innerHTML = '<div style="color: var(--quantum-secondary)">> System initialized... awaiting input_</div>';
            status.textContent = "STANDBY";
            status.style.color = "var(--text-secondary)";
            memory.textContent = "0";
            entangle.textContent = "0";
        }

        // Auto start
        setTimeout(startSim, 1000);
    </script>
</body>
</html>`;

projects.forEach(p => {
    const dir = path.join(__dirname, 'Quantum-Web-Roadmap', p.tier, p.id);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.join(dir, 'index.html'), template(p));
    console.log("Generated: " + p.id);
});
`;

fs.writeFileSync('generate_all.js', script);
console.log("Generator script created.");

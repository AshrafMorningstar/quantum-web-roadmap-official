import os

# Base path
base_path = "Quantum-Web-Roadmap"

# Core template
template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} | Ashraf Morningstar</title>
    <link rel="stylesheet" href="../../assets/css/quantum-core.css">
    <style>
        .container {{ max-width: 1400px; margin: 0 auto; padding: var(--space-xl); }}
        .sim-interface {{ 
            display: grid; 
            grid-template-columns: 250px 1fr; 
            gap: var(--space-lg); 
            height: 70vh; 
            margin-top: var(--space-lg);
        }}
        .sidebar {{
            background: rgba(255,255,255,0.03);
            border-right: 1px solid rgba(255,255,255,0.1);
            padding: var(--space-md);
            border-radius: 12px;
        }}
        .main-view {{
            background: rgba(0,0,0,0.6);
            border-radius: 12px;
            padding: var(--space-md);
            font-family: 'Courier New', monospace;
            overflow-y: auto;
            border: 1px solid rgba(138, 43, 226, 0.2);
        }}
        .status-light {{
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #555;
            margin-right: 8px;
        }}
        .status-light.active {{ background: #00ff00; box-shadow: 0 0 10px #00ff00; }}
        .header-title {{
            font-family: var(--font-display);
            background: linear-gradient(135deg, var(--quantum-primary), var(--quantum-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }}
        .log-line {{ margin-bottom: 5px; opacity: 0; animation: fadeIn 0.3s forwards; }}
        @keyframes fadeIn {{ to {{ opacity: 1; }} }}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1 class="header-title">{name}</h1>
            <p style="color: var(--text-secondary)">{desc}</p>
        </header>

        <div class="holo-card sim-interface">
            <div class="sidebar">
                <h3 style="margin-bottom: var(--space-md)">System Control</h3>
                <div style="margin-bottom: 20px">
                    <div class="status-light" id="status-light"></div>
                    <span id="status-text">OFFLINE</span>
                </div>
                <button class="quantum-btn" style="width: 100%; margin-bottom: 10px" onclick="toggleSystem()">
                    ⚡ Power Toggle
                </button>
                <div style="margin-top: 30px; font-size: 0.8rem; color: #aaa">
                    <p>CORE: <span id="cpu">0</span>%</p>
                    <p>MEM: <span id="mem">0</span> TB</p>
                    <p>Q-BITS: <span id="qbits">0</span></p>
                </div>
            </div>
            
            <div class="main-view" id="console">
                <div style="color: var(--quantum-secondary)">> Awaiting initialization sequence...</div>
            </div>
        </div>
        
        <div style="margin-top: var(--space-xl); text-align: center">
            <a href="../../index.html" class="quantum-btn">← Back to Roadmap</a>
        </div>
    </div>

    <script src="../../assets/js/quantum-engine.js"></script>
    <script>
        let isRunning = false;
        let interval;
        const consoleDiv = document.getElementById('console');
        const statusText = document.getElementById('status-text');
        const statusLight = document.getElementById('status-light');
        
        const logs = [
            "Initializing quantum kernel...",
            "Loading {type} modules...",
            "Connecting to temporal bridge...",
            "Entangling data streams...",
            "Verifying state coherence...",
            "{specific_log}",
            "System fully operational."
        ];

        function log(msg) {{
            const div = document.createElement('div');
            div.className = 'log-line';
            div.innerHTML = `<span style="color: #8a2be2">[${{new Date().toLocaleTimeString()}}]</span> ${{msg}}`;
            consoleDiv.appendChild(div);
            consoleDiv.scrollTop = consoleDiv.scrollHeight;
        }}

        function toggleSystem() {{
            if (isRunning) {{
                isRunning = false;
                clearInterval(interval);
                statusText.textContent = "OFFLINE";
                statusText.style.color = "#aaa";
                statusLight.classList.remove('active');
                log("System shutdown initiated...");
            }} else {{
                isRunning = true;
                statusText.textContent = "ONLINE";
                statusText.style.color = "#00ff00";
                statusLight.classList.add('active');
                log("System startup initiated...");
                
                let i = 0;
                const boot = setInterval(() => {{
                    if (i < logs.length) {{
                        log(logs[i]);
                        i++;
                    }} else {{
                        clearInterval(boot);
                        startRandomLogs();
                    }}
                }}, 800);
            }}
        }}

        function startRandomLogs() {{
            interval = setInterval(() => {{
                if (!isRunning) return;
                
                // Update stats
                document.getElementById('cpu').textContent = Math.floor(Math.random() * 100);
                document.getElementById('mem').textContent = (Math.random() * 1024).toFixed(1);
                document.getElementById('qbits').textContent = Math.floor(Math.random() * 5000);
                
                if (Math.random() > 0.7) {{
                    const actions = [
                        "Optimizing coherence...",
                        "Processing quantum packet...",
                        "Resyncing temporal lattice...",
                        "Garbage collecting probability waves...",
                        "Detecting observer effect..."
                    ];
                    log(actions[Math.floor(Math.random() * actions.length)]);
                }}
            }}, 1500);
        }}
    </script>
</body>
</html>"""

# Projects configuration
projects = [
    # Intermediate
    {"id": "P07-Quantum-Framework", "tier": "Intermediate", "name": "Quantum State Framework", "type": "Frontend", "desc": "Reactive framework responding to observation", "specific_log": "Mounting virtual quantum DOM..."},
    {"id": "P08-Temporal-API", "tier": "Intermediate", "name": "Temporal API Gateway", "type": "API", "desc": "Endpoints spanning past, present, and future", "specific_log": "Opening temporal socket 443..."},
    {"id": "P09-Holographic-DB", "tier": "Intermediate", "name": "Holographic Database", "type": "DB", "desc": "3D spatial data management", "specific_log": "Projecting schema into 3D space..."},
    {"id": "P10-Quantum-CICD", "tier": "Intermediate", "name": "Quantum CI/CD Pipeline", "type": "DevOps", "desc": "Parallel universe testing suite", "specific_log": "Forking 12 test realities..."},
    {"id": "P11-Neuro-Server", "tier": "Intermediate", "name": "Neuro-Adaptive Server", "type": "Server", "desc": "Biometric response engine", "specific_log": "Calibrating neuro-sensors..."},
    {"id": "P12-Quantum-Messenger", "tier": "Intermediate", "name": "Quantum Messenger", "type": "Crypto", "desc": "Secure entanglement communication", "specific_log": "Distributing BB84 keys..."},
    # Expert
    {"id": "P13-Quantum-Computing", "tier": "Expert", "name": "Distributed Quantum Computer", "type": "Compute", "desc": "Browser-based qubit mesh", "specific_log": "Initializing WebRTC qubit cluster..."},
    {"id": "P14-Temporal-Browser", "tier": "Expert", "name": "Temporal Browser", "type": "Browser", "desc": "Navigate through time", "specific_log": "Indexing Wayback Machine headers..."},
    {"id": "P15-Quantum-IP", "tier": "Expert", "name": "Quantum IP Stack", "type": "Network", "desc": "Teleportation-based routing", "specific_log": "Establishing entanglement bridge..."},
    {"id": "P16-Holographic-OS", "tier": "Expert", "name": "Holographic OS", "type": "OS", "desc": "Spatial computing interface", "specific_log": "Booting window manager..."},
    {"id": "P17-Quantum-AI", "tier": "Expert", "name": "Quantum AI Platform", "type": "AI", "desc": "Tensor network trainer", "specific_log": "Loading neural weights to Bloch sphere..."},
    {"id": "P18-Temporal-FS", "tier": "Expert", "name": "Temporal File System", "type": "FS", "desc": "Multiverse file versioning", "specific_log": "Mounting parallel timelines..."}
]

# Generate
for p in projects:
    dir_path = os.path.join(base_path, p['tier'], p['id'])
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)
    
    file_path = os.path.join(dir_path, "index.html")
    content = template.format(
        name=p['name'],
        desc=p['desc'],
        type=p['type'],
        specific_log=p['specific_log']
    )
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    
    print(f"Generated {p['id']}")

print("All projects generated successfully.")

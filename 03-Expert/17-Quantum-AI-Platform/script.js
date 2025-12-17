/** Quantum AI Script | Author: Ashraf Morningstar */
class QuantumNeuralNet {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        
        this.nodes = [];
        this.connections = [];
        this.isTraining = false;
        
        this.init();
    }

    init() {
        const container = document.getElementById('neuralCanvas');
        this.renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(this.renderer.domElement);
        
        this.camera.position.z = 15;
        
        this.createNetwork();
        this.animate();
        
        document.getElementById('trainBtn').addEventListener('click', () => this.startTraining());
        document.getElementById('stopBtn').addEventListener('click', () => this.stopTraining());
        
        window.addEventListener('resize', () => {
             this.renderer.setSize(container.offsetWidth, container.offsetHeight);
             this.camera.aspect = container.offsetWidth / container.offsetHeight;
             this.camera.updateProjectionMatrix();
        });
    }

    createNetwork() {
        // Clear old
        this.nodes.forEach(n => this.scene.remove(n));
        this.connections.forEach(c => this.scene.remove(c));
        this.nodes = [];
        this.connections = [];

        // Layers
        const layers = [4, 6, 6, 2]; // Topology
        let xOffset = -5;

        const geometry = new THREE.SphereGeometry(0.3, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0x45a29e });

        for (let l = 0; l < layers.length; l++) {
            const count = layers[l];
            const yStart = (count * 1.5) / 2;
            
            for (let n = 0; n < count; n++) {
                const mesh = new THREE.Mesh(geometry, material.clone());
                mesh.position.set(xOffset, n * 1.5 - yStart, 0);
                this.scene.add(mesh);
                
                // Store metadata
                mesh.userData = { layer: l, index: n, value: 0 };
                this.nodes.push(mesh);
                
                // Connect to previous layer
                if (l > 0) {
                    const prevLayerNodes = this.nodes.filter(node => node.userData.layer === l - 1);
                    prevLayerNodes.forEach(prev => {
                        this.createConnection(prev, mesh);
                    });
                }
            }
            xOffset += 3; // Layer spacing
        }
    }

    createConnection(n1, n2) {
        const points = [n1.position, n2.position];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({ color: 0x222222, transparent: true, opacity: 0.2 });
        const line = new THREE.Line(geo, mat);
        this.scene.add(line);
        this.connections.push(line);
    }

    startTraining() {
        if(this.isTraining) return;
        this.isTraining = true;
        this.log("Initializing Quantum Backpropagation...");
        this.loopTraining();
    }

    stopTraining() {
        this.isTraining = false;
        this.log("Training Halted.");
        // Reset colors
        this.connections.forEach(c => c.material.color.setHex(0x222222));
    }

    loopTraining() {
        if(!this.isTraining) return;

        // Simulate Update Stats
        const loss = Math.random() * 0.5;
        const acc = 0.5 + Math.random() * 0.4;
        document.getElementById('lossVal').textContent = loss.toFixed(4);
        document.getElementById('accVal').textContent = (acc * 100).toFixed(1) + '%';
        
        // Log
        this.log(`Epoch ${Math.floor(Date.now()/1000)}: Loss=${loss.toFixed(3)}`);

        // Visualize "Firing"
        this.connections.forEach(line => {
             // Randomly light up connections
             if(Math.random() > 0.9) {
                 line.material.color.setHex(0x66fcf1);
                 line.material.opacity = 1;
             } else {
                 line.material.color.setHex(0x222222);
                 line.material.opacity = 0.2;
             }
        });
        
        this.nodes.forEach(node => {
            node.scale.setScalar(1 + Math.random() * 0.5); // Pulse
        });

        setTimeout(() => this.loopTraining(), 100);
    }

    log(msg) {
        const div = document.createElement('div');
        div.className = 'log-line';
        div.textContent = `> ${msg}`;
        const container = document.getElementById('logOutput');
        container.prepend(div);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.scene.rotation.y += 0.002;
        this.renderer.render(this.scene, this.camera);
    }
}

document.addEventListener('DOMContentLoaded', () => new QuantumNeuralNet());

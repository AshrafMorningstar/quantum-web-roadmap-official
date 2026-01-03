/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/** HoloDB Script | Author: Ashraf Morningstar */
class HoloDBRenderer {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.nodes = [];
        this.connections = [];
        
        // Data
        this.data = this.generateMockData(50);
        
        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);
        
        this.camera.position.z = 20;
        
        // Environment
        this.scene.fog = new THREE.FogExp2(0x000000, 0.03);
        
        this.createGraph();
        this.animate();
        this.setupInteractions();
    }

    generateMockData(count) {
        const data = [];
        for(let i=0; i<count; i++) {
            data.push({
                id: `node_${i}`,
                type: Math.random() > 0.5 ? 'User' : 'Transaction', 
                value: Math.floor(Math.random() * 1000)
            });
        }
        return data;
    }

    createGraph() {
        const geometry = new THREE.IcosahedronGeometry(0.5, 0);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
        
        this.data.forEach((d, i) => {
            const mesh = new THREE.Mesh(geometry, material.clone()); // Clone to allow individual highlighting
            
            // Random positions in a sphere
            const r = 10;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            mesh.position.x = r * Math.sin(phi) * Math.cos(theta);
            mesh.position.y = r * Math.sin(phi) * Math.sin(theta);
            mesh.position.z = r * Math.cos(phi);
            
            mesh.userData = d; // Store data
            
            this.scene.add(mesh);
            this.nodes.push(mesh);
            
            // Random connections
            if(i > 0 && Math.random() > 0.7) {
                this.createConnection(this.nodes[i-1], mesh);
            }
        });
    }

    createConnection(nodeA, nodeB) {
        const points = [];
        points.push(nodeA.position);
        points.push(nodeB.position);
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x005555, transparent: true, opacity: 0.3 });
        const line = new THREE.Line(geometry, material);
        
        this.scene.add(line);
        this.connections.push(line);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Slow rotation of entire cloud
        this.scene.rotation.y += 0.002;
        
        // Pulse effect
        this.nodes.forEach(node => {
            node.rotation.x += 0.01;
            node.rotation.y += 0.01;
        });

        this.renderer.render(this.scene, this.camera);
    }

    setupInteractions() {
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('click', (e) => this.onClick(e));
        document.getElementById('runQuery').addEventListener('click', () => this.runQuery());
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onClick() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.nodes);

        if (intersects.length > 0) {
            const node = intersects[0].object;
            this.highlightNode(node);
        }
    }

    highlightNode(node) {
        // Reset colors
        this.nodes.forEach(n => n.material.color.setHex(0x00ffff));
        this.nodes.forEach(n => n.scale.set(1,1,1));

        // Highlight selected
        node.material.color.setHex(0xff00ff);
        node.scale.set(1.5, 1.5, 1.5);

        // Update UI
        document.getElementById('nodeId').textContent = node.userData.id;
        document.getElementById('nodeType').textContent = node.userData.type;
        document.getElementById('nodeVal').textContent = node.userData.value;
    }

    runQuery() {
        const q = document.getElementById('queryInput').value;
        if(!q) return;

        // Visual effect for query
        this.scene.rotation.y += 2; // Spin fast
        alert(`Simulating query execution across holographic lattice for: "${q}"`);
    }
}

document.addEventListener('DOMContentLoaded', () => new HoloDBRenderer());

/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/** Holographic CSS - Script | Author: Ashraf Morningstar */
class HolographicRenderer {
    constructor() {
        this.container = document.getElementById('hologramStage');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.hologramObj = null;
        this.intensity = 1;
        this.time = 0;
        
        this.init();
    }

    init() {
        this.setupScene();
        this.addLights();
        this.createHologram(); // Initial Object
        this.animate();
        this.setupEventListeners();
    }

    setupScene() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0); // Transparent
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;

        // Add ambient grid
        const gridHelper = new THREE.GridHelper(10, 10, 0x0051ff, 0x001133);
        gridHelper.position.y = -2;
        this.scene.add(gridHelper);

        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        });
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        this.pointLight = new THREE.PointLight(0x00f3ff, 1, 100);
        this.pointLight.position.set(0, 2, 2);
        this.scene.add(this.pointLight);
    }

    createHologramFromCSS(cssText) {
        // Rudimentary parsing of CSS to control geometry properties
        // In a real advanced app this would map standard CSS props to 3D props
        let geometryType = 'box';
        let color = 0x00f3ff;
        
        if (cssText.includes('border-radius: 50%')) geometryType = 'sphere';
        if (cssText.includes('#ff0000')) color = 0xff0000;
        if (cssText.includes('#00ffcc')) color = 0x00ffcc;
        
        // Remove old object
        if (this.hologramObj) this.scene.remove(this.hologramObj);

        // Create Geometry
        let geometry;
        if (geometryType === 'sphere') geometry = new THREE.SphereGeometry(1.5, 32, 32);
        else geometry = new THREE.BoxGeometry(2, 2, 2);

        // Holographic Material (Wireframe + Fresnel-like glow)
        const material = new THREE.MeshPhongMaterial({
            color: color,
            wireframe: true,
            transparent: true,
            opacity: 0.8 * this.intensity,
            emissive: color,
            emissiveIntensity: 0.5 * this.intensity
        });

        this.hologramObj = new THREE.Mesh(geometry, material);
        this.scene.add(this.hologramObj);
    }

    createHologram() {
        // Default startup
        const css = document.getElementById('cssInput').value;
        this.createHologramFromCSS(css);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.time += 0.01;

        if (this.hologramObj) {
            this.hologramObj.rotation.x += 0.005;
            this.hologramObj.rotation.y += 0.01;
            
            // Holographic "Interference" flicker
            const flicker = 0.8 + Math.sin(this.time * 20) * 0.1 * Math.random();
            this.hologramObj.material.opacity = flicker * this.intensity;
        }

        this.renderer.render(this.scene, this.camera);
    }

    setupEventListeners() {
        document.getElementById('renderBtn').addEventListener('click', () => {
             const css = document.getElementById('cssInput').value;
             this.createHologramFromCSS(css);
        });

        document.getElementById('intensitySlider').addEventListener('input', (e) => {
            this.intensity = parseFloat(e.target.value);
            if(this.hologramObj) {
                this.hologramObj.material.opacity = 0.8 * this.intensity;
                this.hologramObj.material.emissiveIntensity = 0.5 * this.intensity;
            }
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
             document.querySelector('textarea').value = `.hologram {\n    background: #00ffcc;\n    border-radius: 50%;\n    transform: rotateX(45deg) rotateY(45deg);\n    box-shadow: 0 0 50px #00ffcc;\n}`;
             this.createHologram();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HolographicRenderer();
});

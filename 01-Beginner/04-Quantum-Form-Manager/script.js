/** Quantum Form Manager - Script | Author: Ashraf Morningstar */
class QuantumFormManager {
    constructor() {
        this.fields = document.querySelectorAll('.quantum-field');
        this.canvas = document.getElementById('waveCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.logs = document.getElementById('consoleLog');
        this.isEntangled = false;
        this.time = 0;
        
        this.init();
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        document.getElementById('observeBtn').addEventListener('click', () => this.collapseWaveFunction());
        document.getElementById('entangleBtn').addEventListener('click', () => this.entangleFields());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetState());
        
        this.fields.forEach(field => {
            const input = field.querySelector('input');
            input.addEventListener('input', () => this.updateSuperposition(field));
            input.addEventListener('focus', () => this.log(`Observing field potential: ${field.querySelector('label').textContent}`));
        });

        this.animateWave();
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    updateSuperposition(field) {
        if (!this.isEntangled) return;
        // If entangled, typing in one affects the probability cloud of others
        this.fields.forEach(f => {
            if (f !== field) {
                f.querySelector('.probability-cloud').style.opacity = Math.random() * 0.5 + 0.2;
            }
        });
    }

    entangleFields() {
        this.isEntangled = !this.isEntangled;
        const status = this.isEntangled ? 'ENTANGLED' : 'INDEPENDENT';
        this.log(`Quantum Entanglement State: ${status}`);
        document.getElementById('entangleBtn').innerHTML = this.isEntangled ? '🔓 Decouple Fields' : '🔗 Entangle Fields';
        
        if (this.isEntangled) {
            this.fields.forEach(f => f.setAttribute('data-state', 'entangled'));
        }
    }

    collapseWaveFunction() {
        this.log('Collapsing wave functions...');
        let allValid = true;

        this.fields.forEach(field => {
            const input = field.querySelector('input');
            const stateDisplay = field.querySelector('.state-value');
            const val = input.value;

            // Simulated quantum validation probability
            const probability = val.length > 3 ? 0.99 : 0.01;
            const outcome = Math.random() < probability ? 'Stable' : 'Decoherent';

            stateDisplay.textContent = outcome;
            stateDisplay.style.color = outcome === 'Stable' ? '#00FF9D' : '#FF0055';
            
            if (outcome === 'Decoherent') allValid = false;

            // Visual collapse effect
            field.querySelector('.probability-cloud').style.animation = 'none';
            field.querySelector('.probability-cloud').style.opacity = '0';
        });

        if (allValid) {
            this.log('SUCCESS: System state coherent.');
        } else {
            this.log('WARNING: Quantum decoherence detected in inputs.');
        }
    }

    resetState() {
        this.fields.forEach(field => {
            field.querySelector('input').value = '';
            field.querySelector('.state-value').textContent = 'Superposition';
            field.querySelector('.probability-cloud').style.animation = 'shimmer 2s infinite';
            field.setAttribute('data-state', 'superposition');
        });
        this.isEntangled = false;
        document.getElementById('entangleBtn').textContent = '🔗 Entangle Fields';
        this.log('Wave functions reset to initial superposition.');
    }

    log(msg) {
        const div = document.createElement('div');
        div.className = 'log-entry';
        div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        this.logs.prepend(div);
    }

    animateWave() {
        this.time += 0.05;
        this.ctx.fillStyle = 'rgba(18, 18, 37, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.beginPath();
        this.ctx.strokeStyle = '#00FF9D';
        this.ctx.lineWidth = 2;

        for (let x = 0; x < this.canvas.width; x++) {
            // Combine multiple sine waves for "quantum" look
            const y = this.canvas.height / 2 + 
                     Math.sin(x * 0.02 + this.time) * 30 +
                     Math.sin(x * 0.05 - this.time * 2) * 20;
            
            if (x === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();

        requestAnimationFrame(() => this.animateWave());
    }
}

document.addEventListener('DOMContentLoaded', () => new QuantumFormManager());

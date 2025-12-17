/**
 * Quantum Web Development Roadmap - Core JavaScript Engine
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

// Quantum State Management
class QuantumState {
    constructor(initialState = {}) {
        this.states = new Map();
        this.superposition = true;
        this.observers = new Set();
        this.probabilities = new Map();
        
        Object.entries(initialState).forEach(([key, value]) => {
            this.states.set(key, value);
            this.probabilities.set(key, 1.0);
        });
    }
    
    // Add state to superposition
    addState(key, value, probability = 1.0) {
        this.states.set(key, value);
        this.probabilities.set(key, probability);
        this.notifyObservers();
    }
    
    // Collapse quantum state to single value
    collapse(key) {
        if (!this.states.has(key)) return null;
        
        this.superposition = false;
        const value = this.states.get(key);
        
        // Trigger collapse animation
        this.triggerCollapseEffect(key);
        this.notifyObservers();
        
        return value;
    }
    
    // Measure state (probabilistic)
    measure() {
        const totalProbability = Array.from(this.probabilities.values())
            .reduce((sum, p) => sum + p, 0);
        
        let random = Math.random() * totalProbability;
        
        for (const [key, probability] of this.probabilities) {
            random -= probability;
            if (random <= 0) {
                return this.collapse(key);
            }
        }
    }
    
    // Observer pattern
    subscribe(callback) {
        this.observers.add(callback);
        return () => this.observers.delete(callback);
    }
    
    notifyObservers() {
        this.observers.forEach(callback => callback(this));
    }
    
    triggerCollapseEffect(key) {
        const event = new CustomEvent('quantumCollapse', {
            detail: { key, value: this.states.get(key) }
        });
        document.dispatchEvent(event);
    }
}

// Quantum Entanglement Manager
class QuantumEntanglement {
    constructor() {
        this.entanglements = new Map();
    }
    
    entangle(element1, element2, property = 'value') {
        const id = `${element1.id}-${element2.id}`;
        
        this.entanglements.set(id, {
            element1,
            element2,
            property
        });
        
        // Sync states
        this.syncEntanglement(element1, element2, property);
    }
    
    syncEntanglement(el1, el2, property) {
        el1.addEventListener('change', () => {
            el2[property] = el1[property];
            this.visualizeEntanglement(el1, el2);
        });
        
        el2.addEventListener('change', () => {
            el1[property] = el2[property];
            this.visualizeEntanglement(el2, el1);
        });
    }
    
    visualizeEntanglement(source, target) {
        const line = this.createEntanglementLine(source, target);
        document.body.appendChild(line);
        
        setTimeout(() => line.remove(), 1000);
    }
    
    createEntanglementLine(el1, el2) {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'fixed';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.pointerEvents = 'none';
        svg.style.zIndex = '9999';
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', rect1.left + rect1.width / 2);
        line.setAttribute('y1', rect1.top + rect1.height / 2);
        line.setAttribute('x2', rect2.left + rect2.width / 2);
        line.setAttribute('y2', rect2.top + rect2.height / 2);
        line.setAttribute('stroke', '#00ffff');
        line.setAttribute('stroke-width', '2');
        line.style.opacity = '0';
        line.style.animation = 'entanglementFlash 1s ease-out';
        
        svg.appendChild(line);
        return svg;
    }
}

// Quantum Particle System
class QuantumParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.options = {
            count: options.count || 50,
            color: options.color || '#8a2be2',
            speed: options.speed || 1,
            size: options.size || 4
        };
        
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.options.count; i++) {
            this.createParticle();
        }
        
        this.animate();
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'quantum-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        particle.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.background = this.options.color;
        particle.style.boxShadow = `0 0 10px ${this.options.color}`;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
    
    animate() {
        // Particles are animated via CSS
        requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        this.particles.forEach(p => p.remove());
        this.particles = [];
    }
}

// Temporal Animation Controller
class TemporalAnimationController {
    constructor(element) {
        this.element = element;
        this.animations = [];
        this.currentTime = 0;
        this.playbackRate = 1.0;
        this.playing = false;
    }
    
    addAnimation(animation) {
        this.animations.push(animation);
    }
    
    play() {
        this.playing = true;
        this.animations.forEach(anim => {
            anim.playbackRate = this.playbackRate;
            anim.play();
        });
    }
    
    pause() {
        this.playing = false;
        this.animations.forEach(anim => anim.pause());
    }
    
    setPlaybackRate(rate) {
        this.playbackRate = rate;
        this.animations.forEach(anim => anim.playbackRate = rate);
    }
    
    scrubTo(time) {
        this.currentTime = time;
        this.animations.forEach(anim => {
            anim.currentTime = time;
        });
    }
    
    reverse() {
        this.animations.forEach(anim => anim.reverse());
    }
}

// Holographic Effect Generator
class HolographicEffect {
    static apply(element) {
        element.style.background = 'rgba(255, 255, 255, 0.05)';
        element.style.backdropFilter = 'blur(20px) contrast(150%)';
        element.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        element.style.boxShadow = `
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 0 20px rgba(255, 255, 255, 0.05)
        `;
        
        // Add mouse tracking for parallax
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            element.style.transform = `
                perspective(1000px)
                rotateY(${x * 10}deg)
                rotateX(${-y * 10}deg)
                translateZ(10px)
            `;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
        });
    }
}

// Probability Wave Visualizer
class ProbabilityWaveVisualizer {
    constructor(svgElement, data = []) {
        this.svg = svgElement;
        this.data = data;
        this.width = svgElement.clientWidth;
        this.height = svgElement.clientHeight;
    }
    
    generateWave(amplitude = 1, frequency = 1, phase = 0) {
        const points = [];
        const steps = 100;
        
        for (let i = 0; i <= steps; i++) {
            const x = (i / steps) * this.width;
            const t = (i / steps) * Math.PI * 2 * frequency + phase;
            const y = this.height / 2 + Math.sin(t) * amplitude * (this.height / 4);
            points.push(`${x},${y}`);
        }
        
        return `M ${points.join(' L ')}`;
    }
    
    render() {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', this.generateWave());
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#8a2be2');
        path.setAttribute('stroke-width', '2');
        path.style.filter = 'drop-shadow(0 0 8px #8a2be2)';
        
        this.svg.appendChild(path);
        
        // Animate wave
        this.animateWave(path);
    }
    
    animateWave(path) {
        let phase = 0;
        const animate = () => {
            phase += 0.05;
            path.setAttribute('d', this.generateWave(1, 2, phase));
            requestAnimationFrame(animate);
        };
        animate();
    }
}

// Quantum Utility Functions
const QuantumUtils = {
    // Generate random quantum state
    randomState() {
        return Math.random() > 0.5 ? '|0⟩' : '|1⟩';
    },
    
    // Calculate probability from amplitude
    probabilityFromAmplitude(amplitude) {
        return amplitude * amplitude;
    },
    
    // Normalize probabilities
    normalizeProbabilities(probabilities) {
        const sum = probabilities.reduce((a, b) => a + b, 0);
        return probabilities.map(p => p / sum);
    },
    
    // Create quantum superposition visualization
    createSuperpositionEffect(element) {
        element.setAttribute('data-state', 'superposition');
        element.classList.add('quantum-state');
    },
    
    // Collapse to definite state
    collapseState(element) {
        element.setAttribute('data-state', 'collapsed');
        element.classList.add('quantum-state');
    },
    
    // Generate unique quantum ID
    generateQuantumId() {
        return 'q-' + Math.random().toString(36).substr(2, 9);
    }
};

// Export for use in projects
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        QuantumState,
        QuantumEntanglement,
        QuantumParticleSystem,
        TemporalAnimationController,
        HolographicEffect,
        ProbabilityWaveVisualizer,
        QuantumUtils
    };
}

// Add CSS animation for entanglement flash
const style = document.createElement('style');
style.textContent = `
    @keyframes entanglementFlash {
        0% { opacity: 0; stroke-dasharray: 0, 1000; }
        50% { opacity: 1; stroke-dasharray: 1000, 0; }
        100% { opacity: 0; stroke-dasharray: 1000, 0; }
    }
`;
document.head.appendChild(style);

console.log('%c⚛️ Quantum Engine Initialized', 'color: #8a2be2; font-size: 16px; font-weight: bold;');

/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/**
 * Neuro-Synaptic Color Experience Generator
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

// ===== QUANTUM COLOR ENGINE =====
class NeuroColorEngine {
    constructor() {
        this.attentionSpan = 0;
        this.colorMemory = new Map();
        this.keystrokePatterns = [];
        this.quantumState = 0;
        this.canvas = document.getElementById('quantumCanvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.setupEventListeners();
        this.startQuantumAnimation();
    }
    
    setupCanvas() {
        if (!this.canvas) return;
        
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        
        window.addEventListener('resize', () => {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
        });
    }
    
    setupEventListeners() {
        // Start biometric capture
        const startBtn = document.getElementById('startBiometric');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startBiometricCapture());
        }
        
        // Neural input tracking
        const neuralInput = document.getElementById('neuralInput');
        if (neuralInput) {
            neuralInput.addEventListener('keydown', (e) => this.captureKeystroke(e));
            neuralInput.addEventListener('input', () => this.updateRhythm());
        }
        
        // Canvas controls
        const generateBtn = document.getElementById('generateBtn');
        const saveBtn = document.getElementById('saveBtn');
        const resetBtn = document.getElementById('resetBtn');
        
        if (generateBtn) generateBtn.addEventListener('click', () => this.generateQuantumColors());
        if (saveBtn) saveBtn.addEventListener('click', () => this.saveColorMemory());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetQuantumField());
    }
    
    // ===== BIOMETRIC CAPTURE =====
    startBiometricCapture() {
        this.biometricActive = true;
        this.updateBiometricDisplay();
        
        // Simulate attention tracking (in real implementation, would use webcam)
        setInterval(() => {
            if (this.biometricActive) {
                this.attentionSpan = Math.random() * 0.3 + 0.7; // 70-100%
                this.updateAttentionDisplay();
            }
        }, 1000);
        
        this.showNotification('Neural capture started!', 'success');
    }
    
    captureKeystroke(event) {
        const timestamp = Date.now();
        this.keystrokePatterns.push({
            key: event.key,
            timestamp,
            code: event.code
        });
        
        // Keep only last 50 keystrokes
        if (this.keystrokePatterns.length > 50) {
            this.keystrokePatterns.shift();
        }
        
        this.updateKeystrokeDisplay();
    }
    
    updateRhythm() {
        if (this.keystrokePatterns.length < 2) return;
        
        // Calculate typing rhythm
        const intervals = [];
        for (let i = 1; i < this.keystrokePatterns.length; i++) {
            intervals.push(
                this.keystrokePatterns[i].timestamp - this.keystrokePatterns[i-1].timestamp
            );
        }
        
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const rhythmScore = Math.min(1, 1000 / avgInterval); // Normalize to 0-1
        
        this.updateRhythmDisplay(rhythmScore);
    }
    
    // ===== DISPLAY UPDATES =====
    updateAttentionDisplay() {
        const percentage = Math.round(this.attentionSpan * 100);
        const bar = document.getElementById('attentionBar');
        const value = document.getElementById('attentionValue');
        
        if (bar) bar.style.width = `${percentage}%`;
        if (value) value.textContent = `${percentage}%`;
    }
    
    updateRhythmDisplay(score) {
        const percentage = Math.round(score * 100);
        const bar = document.getElementById('rhythmBar');
        const value = document.getElementById('rhythmValue');
        const rhythmScoreEl = document.getElementById('rhythmScore');
        
        if (bar) bar.style.width = `${percentage}%`;
        if (value) value.textContent = `${percentage}%`;
        if (rhythmScoreEl) rhythmScoreEl.textContent = score.toFixed(2);
    }
    
    updateKeystrokeDisplay() {
        const count = document.getElementById('keystrokeCount');
        const complexity = document.getElementById('patternComplexity');
        
        if (count) count.textContent = this.keystrokePatterns.length;
        
        if (complexity) {
            const level = this.keystrokePatterns.length < 10 ? 'Low' :
                         this.keystrokePatterns.length < 30 ? 'Medium' : 'High';
            complexity.textContent = level;
        }
    }
    
    updateBiometricDisplay() {
        const quantumValue = document.getElementById('quantumValue');
        if (quantumValue) {
            quantumValue.textContent = this.biometricActive ? 'Active' : 'Inactive';
        }
    }
    
    // ===== QUANTUM COLOR GENERATION =====
    generateQuantumColors() {
        if (this.keystrokePatterns.length < 5) {
            this.showNotification('Please type more to generate better colors!', 'warning');
            return;
        }
        
        const colors = this.calculateQuantumColors();
        this.displayPalette(colors);
        this.updateNeuroSignature();
        this.showNotification('Quantum palette generated!', 'success');
    }
    
    calculateQuantumColors() {
        // Use attention and rhythm to generate colors
        const baseHue = Math.round(this.attentionSpan * 360);
        const rhythmFactor = this.keystrokePatterns.length / 50;
        
        const colors = [];
        for (let i = 0; i < 6; i++) {
            const hue = (baseHue + i * 60) % 360;
            const saturation = 50 + rhythmFactor * 50;
            const lightness = 40 + Math.random() * 30;
            
            colors.push({
                hsl: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                hex: this.hslToHex(hue, saturation, lightness)
            });
        }
        
        return colors;
    }
    
    hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }
    
    displayPalette(colors) {
        const grid = document.getElementById('paletteGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        colors.forEach((color, index) => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.background = color.hsl;
            swatch.setAttribute('data-color', color.hex);
            swatch.title = `Click to copy ${color.hex}`;
            
            swatch.addEventListener('click', () => {
                this.copyToClipboard(color.hex);
                this.showNotification(`Copied ${color.hex}!`, 'success');
            });
            
            grid.appendChild(swatch);
        });
        
        this.currentPalette = colors;
    }
    
    updateNeuroSignature() {
        const signature = document.getElementById('neuroSignature');
        if (!signature) return;
        
        const hash = this.generateNeuroHash();
        signature.textContent = hash;
    }
    
    generateNeuroHash() {
        const data = `${this.attentionSpan}-${this.keystrokePatterns.length}-${Date.now()}`;
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            hash = ((hash << 5) - hash) + data.charCodeAt(i);
            hash = hash & hash;
        }
        return `NP-${Math.abs(hash).toString(16).toUpperCase().substring(0, 8)}`;
    }
    
    // ===== COLOR MEMORY =====
    saveColorMemory() {
        if (!this.currentPalette) {
            this.showNotification('Generate a palette first!', 'warning');
            return;
        }
        
        const memoryId = Date.now();
        this.colorMemory.set(memoryId, {
            colors: this.currentPalette,
            signature: this.generateNeuroHash(),
            timestamp: new Date().toLocaleString()
        });
        
        this.displayMemoryBank();
        this.showNotification('Color memory saved!', 'success');
    }
    
    displayMemoryBank() {
        const grid = document.getElementById('memoryGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        if (this.colorMemory.size === 0) {
            grid.innerHTML = '<div class="memory-placeholder"><p>No color memories yet.</p></div>';
            return;
        }
        
        this.colorMemory.forEach((memory, id) => {
            const item = document.createElement('div');
            item.className = 'memory-item';
            
            const colorsDiv = document.createElement('div');
            colorsDiv.className = 'memory-colors';
            
            memory.colors.slice(0, 6).forEach(color => {
                const colorDiv = document.createElement('div');
                colorDiv.className = 'memory-color';
                colorDiv.style.background = color.hsl;
                colorsDiv.appendChild(colorDiv);
            });
            
            const info = document.createElement('div');
            info.className = 'memory-info';
            info.innerHTML = `
                <div>${memory.signature}</div>
                <div>${memory.timestamp}</div>
            `;
            
            item.appendChild(colorsDiv);
            item.appendChild(info);
            
            item.addEventListener('click', () => {
                this.displayPalette(memory.colors);
                this.showNotification('Memory loaded!', 'success');
            });
            
            grid.appendChild(item);
        });
    }
    
    // ===== QUANTUM ANIMATION =====
    startQuantumAnimation() {
        if (!this.ctx) return;
        
        const particles = [];
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                hue: Math.random() * 360,
                size: Math.random() * 3 + 1
            });
        }
        
        const animate = () => {
            this.ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.hue = (p.hue + 1) % 360;
                
                if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
                
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, 0.8)`;
                this.ctx.fill();
                
                // Draw connections
                particles.forEach(p2 => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 100) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(p.x, p.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.strokeStyle = `hsla(${(p.hue + p2.hue) / 2}, 100%, 50%, ${1 - dist / 100})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    resetQuantumField() {
        const grid = document.getElementById('paletteGrid');
        if (grid) grid.innerHTML = '';
        
        this.currentPalette = null;
        this.keystrokePatterns = [];
        this.updateKeystrokeDisplay();
        
        const neuralInput = document.getElementById('neuralInput');
        if (neuralInput) neuralInput.value = '';
        
        this.showNotification('Quantum field reset!', 'success');
    }
    
    // ===== UTILITIES =====
    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00ff00' : type === 'warning' ? '#ffaa00' : '#00ffff'};
            color: #000;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    const engine = new NeuroColorEngine();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

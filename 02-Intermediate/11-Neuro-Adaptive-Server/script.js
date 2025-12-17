/** Neuro-Adaptive Script | Author: Ashraf Morningstar */
class NeuroServer {
    constructor() {
        this.mousePath = [];
        this.stressLevel = 0; // 0 to 100
        this.isHighStress = false;
        
        this.init();
    }

    init() {
        // Track mouse movement for "jitter" (proxy for stress)
        document.addEventListener('mousemove', (e) => this.trackMouse(e));
        
        // Analyze periodically
        setInterval(() => this.analyzeUserState(), 1000);
    }

    trackMouse(e) {
        this.mousePath.push({ x: e.clientX, y: e.clientY, t: Date.now() });
        if(this.mousePath.length > 50) this.mousePath.shift();
    }

    analyzeUserState() {
        if (this.mousePath.length < 10) return;

        // Calculate "entropy" of movement (erratic changes in direction/speed)
        let visibleStress = 0;
        let totalDist = 0;
        
        for(let i=1; i<this.mousePath.length; i++) {
            const p1 = this.mousePath[i-1];
            const p2 = this.mousePath[i];
            const dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
            totalDist += dist;
        }

        // Simulating logic: High speed + sharp turns = Stress
        // For demo: just use speed/shake
        if (totalDist > 2000) visibleStress = 80; // Shaking/Fast moving
        else visibleStress = Math.max(0, this.stressLevel - 5); // Decay

        // Smooth transition
        this.stressLevel = (this.stressLevel * 0.7) + (visibleStress * 0.3);
        
        this.updateUI();
    }

    updateUI() {
        const stressVal = Math.round(this.stressLevel);
        document.getElementById('stressVal').textContent = `${stressVal}%`;

        // Threshold for adaptation
        if (stressVal > 60 && !this.isHighStress) {
            this.activateHighStressMode();
        } else if (stressVal < 40 && this.isHighStress) {
            this.deactivateHighStressMode();
        }
    }

    activateHighStressMode() {
        this.isHighStress = true;
        document.body.classList.add('high-stress');
        document.getElementById('modeVal').textContent = 'Zen (Simplified)';
        document.getElementById('loadVal').textContent = 'High';
        document.getElementById('modeVal').style.color = '#ff9900';
    }

    deactivateHighStressMode() {
        this.isHighStress = false;
        document.body.classList.remove('high-stress');
        document.getElementById('modeVal').textContent = 'Standard';
        document.getElementById('loadVal').textContent = 'Normal';
        document.getElementById('modeVal').style.color = '#00ff00';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NeuroServer();
    
    // Simulate initial activity to demonstrate
    console.log("Move mouse rapidly to simulate stress!");
});

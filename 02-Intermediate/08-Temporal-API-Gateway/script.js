/** Temporal API Gateway - Script | Author: Ashraf Morningstar */
class ChronosGateway {
    constructor() {
        this.statusDisplay = document.getElementById('resStatus');
        this.output = document.getElementById('jsonOutput');
        this.canvas = document.getElementById('timeCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Initial setup
        const now = new Date();
        document.getElementById('targetDate').valueAsDate = now;
        document.getElementById('targetTime').value = now.toTimeString().substring(0,5);

        this.init();
    }

    init() {
        document.getElementById('sendReqBtn').addEventListener('click', () => this.handleRequest());
        document.getElementById('probThreshold').addEventListener('input', (e) => {
            document.getElementById('probDisplay').textContent = parseFloat(e.target.value).toFixed(2);
        });

        // Resize canvas
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.drawTimeline();
    }

    async handleRequest() {
        this.output.textContent = 'Initiating temporal tunnel...';
        this.statusDisplay.textContent = 'Status: RESOLVING TIMELINE';
        
        const endpoint = document.getElementById('endpoint').value;
        const dateVal = document.getElementById('targetDate').value;
        const timeVal = document.getElementById('targetTime').value;
        const probability = parseFloat(document.getElementById('probThreshold').value);
        
        const targetDateTime = new Date(`${dateVal}T${timeVal}`);
        const now = new Date();
        const diff = targetDateTime - now; // ms difference
        
        // Identify temporal direction
        let direction = 'PRESENT';
        if (diff < -60000) direction = 'PAST';
        if (diff > 60000) direction = 'FUTURE';

        await this.simulateNetworkDelay();

        // Generate mockup data based on timeline
        const responseData = this.generateMockResponse(endpoint, direction, probability);
        
        this.statusDisplay.textContent = `Status: 200 OK (${direction})`;
        this.output.textContent = JSON.stringify(responseData, null, 2);
        
        this.drawTimeline(targetDateTime);
    }

    simulateNetworkDelay() {
        return new Promise(resolve => setTimeout(resolve, 1500));
    }

    generateMockResponse(endpoint, direction, prob) {
        // Mock logic for "Future" requests with probability
        if (direction === 'FUTURE' && Math.random() > prob) {
            return {
                error: "Temporal Paradox Detected",
                code: "ERR_CAUSALITY_VIOLATION",
                message: "Requested future state is unstable (Probability too low)."
            };
        }

        const baseData = {
            meta: {
                timestamp: new Date().toISOString(),
                temporal_offset: direction,
                quantum_signature: Math.random().toString(36).substring(7)
            }
        };

        if (endpoint.includes('users')) {
            return { ...baseData, data: { active_users: direction === 'FUTURE' ? 5000000 : 1240, growth_rate: "+15%" }};
        }
        if (endpoint.includes('finance')) {
             return { ...baseData, data: { btc_price: direction === 'FUTURE' ? 950000 : 42000, market_sentiment: "Greed" }};
        }
        return { ...baseData, data: { system_integrity: "99.9%", cpu_load: "42%" }};
    }

    drawTimeline(targetDate = new Date()) {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const ctx = this.ctx;

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#00ff41';
        ctx.strokeStyle = '#003b00';
        
        // Draw center line
        ctx.beginPath();
        ctx.moveTo(0, h/2);
        ctx.lineTo(w, h/2);
        ctx.stroke();

        // Draw "Now" marker
        const nowX = w / 2;
        ctx.fillText("NOW", nowX - 10, h/2 - 10);
        ctx.fillRect(nowX - 2, h/2 - 5, 4, 10);

        // Draw target marker
        const now = new Date();
        const diffDays = (targetDate - now) / (1000 * 60 * 60 * 24);
        // Map days to pixels (roughly)
        let targetX = nowX + (diffDays * 10); 
        
        // Clamp for visibility
        if (targetX < 20) targetX = 20;
        if (targetX > w - 20) targetX = w - 20;

        ctx.fillStyle = '#ff3333';
        ctx.fillText("TARGET", targetX - 20, h/2 + 25);
        ctx.fillRect(targetX - 2, h/2 - 5, 4, 10);

        // Connect
        ctx.beginPath();
        ctx.strokeStyle = '#ff3333';
        ctx.moveTo(nowX, h/2);
        ctx.quadraticCurveTo((nowX + targetX)/2, h/2 - 20, targetX, h/2);
        ctx.stroke();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ChronosGateway();
});

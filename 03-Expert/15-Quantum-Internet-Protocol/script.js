/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/** Quantum Protocol Script | Author: Ashraf Morningstar */
class NetworkStack {
    constructor() {
        this.layers = ['layer-app', 'layer-transport', 'layer-network', 'layer-link'];
        this.ctx = document.getElementById('photonCanvas').getContext('2d');
        this.time = 0;
        
        this.init();
    }

    init() {
        document.getElementById('sendPacketBtn').addEventListener('click', () => this.injectPacket());
        document.getElementById('decohereBtn').addEventListener('click', () => this.simDecoherence());
        
        this.drawPhyLayer();
    }

    injectPacket() {
        this.processLayer(0); // Start at App layer
    }

    async processLayer(layerIndex) {
        if (layerIndex >= this.layers.length) {
            this.transmitPhy();
            return;
        }

        const layerId = this.layers[layerIndex];
        const layerEl = document.getElementById(layerId).querySelector('.packet-stream');
        
        // VISUAL: Add packet
        const pkt = document.createElement('div');
        pkt.className = 'packet';
        layerEl.appendChild(pkt);

        // LOGIC: Processing delay
        await this.wait(600);
        
        // Remove from this layer and move to next
        pkt.remove();
        this.processLayer(layerIndex + 1);
    }

    transmitPhy() {
        // Trigger photon burst in canvas
        this.pulsePhy = true;
        setTimeout(() => this.pulsePhy = false, 500);
    }

    simDecoherence() {
        document.querySelectorAll('.layer').forEach(l => {
            l.style.background = '#3f1a1a'; // Red tint
            setTimeout(() => l.style.background = '', 500);
        });
        document.getElementById('fidVal').textContent = '45.2% (CRITICAL)';
        document.getElementById('fidVal').style.color = '#ef4444';
        
        setTimeout(() => {
            document.getElementById('fidVal').textContent = '99.9%';
            document.getElementById('fidVal').style.color = '';
        }, 2000);
    }

    drawPhyLayer() {
        const ctx = this.ctx;
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        
        requestAnimationFrame(() => this.drawPhyLayer());
        
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, w, h);
        
        ctx.strokeStyle = this.pulsePhy ? '#ffffff' : '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        this.time += 0.2;
        
        for (let x = 0; x < w; x+=5) {
            const y = h/2 + Math.sin(x * 0.05 - this.time) * 20;
            if(x===0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }

    wait(ms) { return new Promise(r => setTimeout(r, ms)); }
}

document.addEventListener('DOMContentLoaded', () => new NetworkStack());

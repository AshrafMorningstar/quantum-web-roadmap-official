/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/** Quantum CI/CD Script | Author: Ashraf Morningstar */
const STAGES = ['Lint & Quantum Syntax', 'Unit Tests (Superposition)', 'Integration', 'Deploy Staging', 'Quantum Verify'];

class QuantumPipeline {
    constructor() {
        this.tracks = ['A', 'B', 'C', 'D'];
        this.isBuilding = false;
        
        this.initUI();
    }

    initUI() {
        // Build initial empty steps
        this.tracks.forEach(track => {
            const container = document.getElementById(`track-${track}`);
            STAGES.forEach((stage, index) => {
                const el = document.createElement('div');
                el.className = 'step';
                el.textContent = stage;
                el.id = `step-${track}-${index}`;
                container.appendChild(el);
            });
        });

        document.getElementById('triggerBuildBtn').addEventListener('click', () => this.startBuild());
    }

    startBuild() {
        if(this.isBuilding) return;
        this.isBuilding = true;
        this.log('Initializing Quantum Pipeline...');
        this.resetUI();

        // Run tracks in "parallel" with random delays and outcomes
        this.tracks.forEach(track => {
            this.runTrack(track);
        });
    }

    async runTrack(trackId) {
        for (let i = 0; i < STAGES.length; i++) {
            const stepId = `step-${trackId}-${i}`;
            const el = document.getElementById(stepId);
            
            // Set running
            el.className = 'step running';
            this.log(`Track ${trackId}: Starting ${STAGES[i]}...`);
            
            // Simulate work
            await this.wait(Math.random() * 1000 + 500);

            // Determine outcome (Entropy track D fails more often)
            const failChance = trackId === 'D' ? 0.3 : 0.05;
            const success = Math.random() > failChance;

            if (success) {
                el.className = 'step success';
                el.textContent = '✓ ' + STAGES[i];
            } else {
                el.className = 'step fail';
                el.textContent = '✗ ' + STAGES[i];
                this.log(`Track ${trackId} FAILED at ${STAGES[i]}`, true);
                return; // Stop this track
            }
        }
        this.log(`Track ${trackId} Completed Successfully!`, false, true);
    }

    resetUI() {
        const steps = document.querySelectorAll('.step');
        steps.forEach(s => {
            s.className = 'step';
            s.textContent = s.textContent.replace(/[✓✗] /, '');
        });
        document.getElementById('buildLogs').innerHTML = '';
    }

    wait(ms) { return new Promise(r => setTimeout(r, ms)); }

    log(msg, isError = false, isSuccess = false) {
        const terminal = document.getElementById('buildLogs');
        const div = document.createElement('div');
        div.className = 'log-line';
        if(isError) div.classList.add('log-error');
        if(isSuccess) div.classList.add('log-success');
        
        div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        terminal.prepend(div);
    }
}

document.addEventListener('DOMContentLoaded', () => new QuantumPipeline());

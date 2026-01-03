/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/** Quantum Simulator Script | Author: Ashraf Morningstar */
class QuantumSimulator {
    constructor() {
        this.circuit = [[], [], []]; // 3 Qubits
        this.draggedType = null;
        
        this.init();
    }

    init() {
        // Drag Events
        document.querySelectorAll('.gate').forEach(gate => {
            gate.addEventListener('dragstart', (e) => this.dragStart(e));
        });

        document.querySelectorAll('.wire').forEach((wire, index) => {
            wire.addEventListener('dragover', (e) => e.preventDefault());
            wire.addEventListener('drop', (e) => this.drop(e, index));
        });

        document.getElementById('runBtn').addEventListener('click', () => this.runSimulation());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearCircuit());
    }

    dragStart(e) {
        this.draggedType = e.target.getAttribute('data-type');
        e.dataTransfer.setData('text/plain', this.draggedType);
    }

    drop(e, qubitIndex) {
        e.preventDefault();
        const gateType = this.draggedType;
        
        this.circuit[qubitIndex].push(gateType);
        this.renderCircuit();
    }

    renderCircuit() {
        const wires = document.querySelectorAll('.wire');
        wires.forEach((wire, i) => {
            wire.innerHTML = ''; // Clear
            this.circuit[i].forEach(gateType => {
                const el = document.createElement('div');
                el.className = `gate`;
                el.setAttribute('data-type', gateType);
                el.textContent = gateType;
                wire.appendChild(el);
            });
        });
    }

    clearCircuit() {
        this.circuit = [[], [], []];
        this.renderCircuit();
        this.resetResults();
    }

    runSimulation() {
        // Mock Simulation Logic
        // In a real app we'd compute matrix multiplication of unitary operators
        
        let hasHadamard = false;
        this.circuit.forEach(line => {
             if(line.includes('H')) hasHadamard = true;
        });

        const results = document.getElementById('resultsChart');
        results.innerHTML = '';

        // If H gate is present, we have superposition -> random probabilities
        // Otherwise deterministic (000)
        
        const possibleStates = ['000', '001', '010', '011', '100', '101', '110', '111'];
        
        possibleStates.forEach(state => {
            let height = 0;
            if (!hasHadamard) {
                // If pure state, mostly 000
                 height = state === '000' ? 100 : 0;
            } else {
                // Superposition
                // Generate varying probabilities summing roughly to 100
                height = Math.random() * 80;
            }

            const barContainer = document.createElement('div');
            barContainer.className = 'bar-container';
            barContainer.innerHTML = `
                <div class="bar" style="height: ${height}%; background: ${this.getColor(height)}"></div>
                <div class="bar-label">${state}</div>
            `;
            results.appendChild(barContainer);
        });
    }
    
    getColor(height) {
        if(height > 50) return '#007bff';
        return '#6c757d';
    }

    resetResults() {
        document.getElementById('resultsChart').innerHTML = '';
    }
}

document.addEventListener('DOMContentLoaded', () => new QuantumSimulator());

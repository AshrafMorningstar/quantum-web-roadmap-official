/** Quantum Framework Core | Author: Ashraf Morningstar */
class QuantumState {
    constructor(initialState) {
        this.possibleStates = [initialState];
        this.collapsed = false;
        this.observers = [];
    }

    addPossibility(state) {
        this.possibleStates.push(state);
    }

    observe() {
        if (!this.collapsed) {
            // Collapse to a random state based on "probability" (uniform for now)
            const index = Math.floor(Math.random() * this.possibleStates.length);
            this.value = this.possibleStates[index];
            this.collapsed = true;
            this.notifyObservers();
            return this.value;
        }
        return this.value;
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(obs => obs(this.value));
    }
}

class QuantumComponent {
    constructor(selector, renderFn) {
        this.el = document.querySelector(selector);
        this.renderFn = renderFn;
        this.state = null;
    }

    bindState(qState) {
        this.state = qState;
        this.state.subscribe(this.update.bind(this));
        // Initial render in "superposition" (loading/blur state)
        this.el.innerHTML = `<div class="q-superposition">Scanning possibilities...</div>`;
        this.el.classList.add('q-component');
        
        // Simulate observer effect (mouse over)
        this.el.addEventListener('mouseenter', () => {
             const val = this.state.observe();
             // Logger
             const log = document.getElementById('debug-log');
             const entry = document.createElement('div');
             entry.className = 'log-entry collapse';
             entry.textContent = `Wave function collapsed: ${JSON.stringify(val)}`;
             log.prepend(entry);
        });
    }

    update(val) {
        this.el.innerHTML = this.renderFn(val);
        this.el.classList.add('rendered');
    }
}

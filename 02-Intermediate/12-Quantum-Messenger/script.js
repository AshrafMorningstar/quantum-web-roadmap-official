/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/** Quantum Messenger Script | Author: Ashraf Morningstar */
class QuantumMessenger {
    constructor() {
        this.secretKey = '';
        this.evePresent = false;
        this.basisAlice = []; 
        this.basisBob = [];
        this.bitsAlice = [];
        this.bitsBob = [];
        
        this.init();
    }

    init() {
        this.startQKD();
        
        // Listeners
        document.getElementById('sendBtn').addEventListener('click', () => this.sendMessage());
        document.getElementById('msgInput').addEventListener('keyup', (e) => {
            if(e.key === 'Enter') this.sendMessage();
        });
        document.getElementById('eveToggle').addEventListener('change', (e) => {
            this.evePresent = e.target.checked;
            this.handleEve();
        });

        // Continuously generate key
        setInterval(() => this.generateKeyBit(), 500);
    }

    generateKeyBit() {
        // BB84 Protocol Simulation
        
        // 1. Alice chooses bit (0 or 1) and basis (+ or x)
        const bit = Math.round(Math.random());
        const basisA = Math.random() > 0.5 ? '+' : 'x';
        
        // 2. Transmit: If Eve is present, she measures and potentially collapses/alters state
        let sentBasis = basisA;
        let sentBit = bit;

        if(this.evePresent) {
            // Eve measures
            const basisE = Math.random() > 0.5 ? '+' : 'x';
            if (basisE !== basisA) {
                // Wrong basis measurement randomizes the bit usually
                sentBit = Math.round(Math.random()); 
            }
            // Eve resends...
        }

        // 3. Bob chooses basis (+ or x) and measures
        const basisB = Math.random() > 0.5 ? '+' : 'x';
        let measuredBit = sentBit;

        if (basisB !== sentBasis) {
            // Wrong basis, measured bit is random (50%)
            measuredBit = Math.round(Math.random());
        }

        // 4. Sifting: Alice and Bob compare bases (publicly) discard if no match
        if (basisA === basisB) {
            // Bases matched. Bits should match unless Eve interfered.
            if (this.evePresent && bit !== measuredBit) {
                // Error detected!
                this.detectError();
            } else {
                 if(!this.evePresent) this.appendKey(measuredBit);
            }
        }
    }

    appendKey(bit) {
        this.secretKey += bit;
        if(this.secretKey.length > 32) this.secretKey = this.secretKey.substring(1); // Keep rolling window
        
        document.getElementById('sharedKeyDisplay').textContent = this.secretKey;
        
        // Update Entropy
        const entropy = Math.min(100, this.secretKey.length * 4);
        document.getElementById('entropyVal').textContent = `${entropy}%`;
        document.getElementById('entropyFill').style.width = `${entropy}%`;
    }

    detectError() {
        // In real QKD, you check a subset of bits to detect error rate
        // Simulation: Just warn immediately
        const alertBox = document.getElementById('eveAlert');
        alertBox.style.display = 'block';
        
        // Clear key for security
        this.secretKey = '';
        document.getElementById('sharedKeyDisplay').textContent = '[CLEARED - UNSAFE]';
    }

    handleEve() {
        if(!this.evePresent) {
            document.getElementById('eveAlert').style.display = 'none';
        }
    }

    startQKD() {
        this.addSystemMessage("QKD Stream established. Listening for photons...");
    }

    sendMessage() {
        const input = document.getElementById('msgInput');
        const text = input.value;
        if(!text) return;
        
        if(this.secretKey.length < 5) {
            this.addSystemMessage("Error: Insufficient entropy to encrypt. Wait for key generation.");
            return;
        }

        // Simulate encryption (XOR roughly)
        const encrypted = this.xorCiper(text, this.secretKey);
        
        // UI: Show sent
        this.addMessage(text, 'sent');
        input.value = '';

        // Simulate network delay and Bob receiving/decrypting
        setTimeout(() => {
            if(this.evePresent) {
                 this.addMessage(encrypted, 'received scrambled'); // Bob fails to decrypt if key corrupted by Eve?
                 // Or actually, Bob and Alice share key, but Eve can't read it.
                 // If Eve interrupted, key negotiation failed.
                 this.addSystemMessage("Bob: Decryption failed. Key mismatch due to interference.");
            } else {
                 this.addMessage(text, 'received');
            }
        }, 1000);
    }

    xorCiper(text, key) {
        // Visual effect only
        return text.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ 1)).join('');
    }

    addMessage(text, type) {
        const area = document.getElementById('msgArea');
        const el = document.createElement('div');
        el.className = `msg ${type}`;
        el.textContent = text;
        area.appendChild(el);
        area.scrollTop = area.scrollHeight;
    }

    addSystemMessage(text) {
        this.addMessage(text, 'system');
    }
}

document.addEventListener('DOMContentLoaded', () => new QuantumMessenger());

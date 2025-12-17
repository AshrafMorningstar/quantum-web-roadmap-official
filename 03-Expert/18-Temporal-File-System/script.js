/** TVFS Script | Author: Ashraf Morningstar */
const fileVersions = {
    "f1": [
        { 
            ver: "v1.0", 
            date: "2023-01-01", 
            content: `function init() {\n  console.log("Hello World");\n}` 
        },
        { 
            ver: "v1.5", 
            date: "2023-06-15", 
            content: `function init() {\n  console.log("Hello Quantum World");\n  setupQubits();\n}` 
        },
        { 
            ver: "v2.0", 
            date: "2024-01-01", 
            content: `// OPTIMIZED CORE\nfunction init() {\n  const qSystem = new QuantumSystem();\n  qSystem.entangle();\n  console.log("System Stable");\n}` 
        }
    ]
};

class TVFSExplorer {
    constructor() {
        this.activeFileId = 'f1';
        this.currentVerIndex = 2; // Latest
        
        this.init();
    }

    init() {
        // File selection
        document.querySelectorAll('.file').forEach(el => {
            el.addEventListener('click', () => {
                document.querySelectorAll('.file').forEach(f => f.classList.remove('active'));
                el.classList.add('active');
                this.activeFileId = el.getAttribute('data-id');
                // In a real app we'd load diff versions for diff files
                // For demo, we just reset timeline
                this.updateView();
            });
        });

        // Scrubber
        const scrubber = document.getElementById('timeScrubber');
        scrubber.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            // Map 0-100 to version index 0-2
            if (val < 33) this.currentVerIndex = 0;
            else if (val < 66) this.currentVerIndex = 1;
            else this.currentVerIndex = 2;
            
            this.updateView();
        });

        this.updateView();
    }

    updateView() {
        const versions = fileVersions["f1"]; // Mock: always use f1 data
        const currentData = versions[this.currentVerIndex];
        
        const editor = document.getElementById('codeEditor');
        
        // Simple visual diff effect
        editor.style.opacity = 0.5;
        setTimeout(() => {
            editor.innerText = currentData.content;
            editor.style.opacity = 1;
        }, 100);

        // Update Meta
        document.getElementById('fileMeta').innerText = `Version: ${currentData.ver} | Date: ${currentData.date}`;
    }
}

document.addEventListener('DOMContentLoaded', () => new TVFSExplorer());

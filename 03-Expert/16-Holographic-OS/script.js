/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/** HoloOS Script | Author: Ashraf Morningstar */
class HoloOS {
    constructor() {
        this.windows = document.querySelectorAll('.window, .windowglass');
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateParallax();
        });

        this.windows.forEach(win => {
            this.makeDraggable(win);
        });

        document.querySelectorAll('.icon').forEach(icon => {
            icon.addEventListener('click', () => {
                this.spawnWindow(icon.getAttribute('title'));
            });
        });
    }

    updateParallax() {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        
        const dx = (this.mouseX - cx) / cx;
        const dy = (this.mouseY - cy) / cy;

        this.windows.forEach(win => {
            // Subtle 3D tilt based on mouse position relative to window center
            const rect = win.getBoundingClientRect();
            const wCx = rect.left + rect.width / 2;
            const wCy = rect.top + rect.height / 2;
            
            const tiltX = (this.mouseY - wCy) / 20; // Rotate X axis based on Y dist
            const tiltY = -(this.mouseX - wCx) / 20; // Rotate Y based on X dist
            
            win.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px)`;
        });
    }

    makeDraggable(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = elmnt.querySelector('.win-header') || elmnt.querySelector('.glass-header');
        
        if (header) {
            header.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            
            // Bring to front
            elmnt.style.zIndex = 100 + Array.from(document.querySelectorAll('.window')).length;
        }

        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    spawnWindow(title) {
        const win = document.createElement('div');
        win.className = 'windowglass';
        win.style.top = '150px';
        win.style.left = '300px';
        win.innerHTML = `
            <div class="glass-header">
                <span>${title}</span>
                <span class="close-btn" onclick="this.parentElement.parentElement.remove()">×</span>
            </div>
            <div class="glass-content">
                Loading module: ${title}...
                <br>
                [System Ready]
            </div>
        `;
        document.getElementById('desktop-environment').appendChild(win);
        this.makeDraggable(win);
        this.windows = document.querySelectorAll('.window, .windowglass'); // Update list
    }
}

document.addEventListener('DOMContentLoaded', () => new HoloOS());

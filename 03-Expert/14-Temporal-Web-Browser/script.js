/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/** Temporal Browser Script | Author: Ashraf Morningstar */
class ChronoBrowser {
    constructor() {
        this.currentYear = 2024;
        this.content = document.querySelector('.webpage-content');
        this.viewport = document.getElementById('browserViewport');
        
        this.init();
    }

    init() {
        const slider = document.getElementById('timeSlider');
        slider.addEventListener('input', (e) => this.navigateTime(parseInt(e.target.value)));
        
        // Initial state
        this.navigateTime(2024);
    }

    navigateTime(year) {
        this.currentYear = year;
        document.getElementById('yearDisplay').textContent = `Year: ${year}`;
        
        // Remove all style classes
        this.viewport.className = 'viewport';
        
        let styleClass = 'style-2024';
        let contentHTML = '';

        if (year < 1995) {
            styleClass = 'style-1990';
            contentHTML = `
                <center><h1>Welcome to the World Wide Web</h1></center>
                <hr>
                <p>You have reached the Example Home Page.</p>
                <ul><li><a href="#">Link 1</a></li><li><a href="#">Link 2</a></li></ul>
                <p><i>Last updated: Jan 12, ${year}</i></p>
            `;
        } else if (year < 2010) {
            styleClass = 'style-2000';
            contentHTML = `
                <div style="background:linear-gradient(to bottom, #dceefc, #fff); padding:20px; border:1px solid #aaa;">
                    <h1 style="color:#336699; font-size:1.5em;">Example.com 2.0</h1>
                    <small>Best viewed in Internet Explorer 6</small>
                    <p>Welcome to the portal of the future.</p>
                    <button style="background:#ddd; border:1px solid #888; padding:5px;">Enter Site >></button>
                </div>
            `;
        } else if (year < 2028) {
            styleClass = 'style-2024'; // Modern
            contentHTML = `
                <header class="page-header">
                    <h1 id="pageTitle">Welcome to Example.com</h1>
                </header>
                <main id="pageBody">
                    <p class="lead">Simplifying your digital life simulation.</p>
                    <button style="background:black; color:white; border:none; padding:10px 20px; border-radius:5px;">Get Started</button>
                    <div style="margin-top:20px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                        <div style="background:#f9f9f9; padding:20px;">Card 1</div>
                        <div style="background:#f9f9f9; padding:20px;">Card 2</div>
                    </div>
                </main>
                <footer style="margin-top:50px; color:#888;">© ${year} Example Corp</footer>
            `;
        } else {
            styleClass = 'style-2030'; // Future
            contentHTML = `
                <header style="display:flex; justify-content:space-between; border-bottom:1px solid #00f3ff; padding-bottom:10px;">
                    <h1>HOLO.NET</h1>
                    <div class="status">Neural Link: ACTIVE</div>
                </header>
                <main style="margin-top:30px;">
                    <p style="font-size:1.2em;">Direct Neural Interface Ready.</p>
                    <div style="height:100px; background:rgba(0,243,255,0.1); border:1px solid #00f3ff; display:flex; align-items:center; justify-content:center; margin:20px 0;">
                        [ A U G M E N T E D   R E A L I T Y   Z O N E ]
                    </div>
                </main>
            `;
        }

        this.viewport.classList.add(styleClass);
        this.content.innerHTML = contentHTML;
        
        // Visual CRT flicker effect when changing time significantly
        this.addGlitchEffect();
    }

    addGlitchEffect() {
        this.viewport.animate([
            { filter: 'blur(0px) brightness(1)' },
            { filter: 'blur(5px) brightness(1.5) hue-rotate(90deg)' },
            { filter: 'blur(0px) brightness(1)' }
        ], {
            duration: 200,
            iterations: 1
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new ChronoBrowser());

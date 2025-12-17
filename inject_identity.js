const fs = require('fs');
const path = require('path');

const rootDir = 'Quantum-Web-Roadmap';
const author = "Ashraf Morningstar";
const githubLink = "https://github.com/AshrafMorningstar";
const keywords = "Quantum Web Development, AI Web Projects, Future Web Tech, 3D Web Design, Glassmorphism, WebAssembly, Ashraf Morningstar Portfolio";

// Headers for different file types
const jsHeader = `/**
 * ⚛️ QUANTUM WEB DEVELOPMENT ROADMAP
 * ------------------------------------
 * @author ${author}
 * @link ${githubLink}
 * @copyright 2025 ${author}
 * 
 * This project is part of a revolutionary web development roadmap.
 * Built with pure HTML/CSS/JS for instant execution.
 */

`;

const cssHeader = `/* 
 * ⚛️ QUANTUM WEB DEVELOPMENT ROADMAP
 * ------------------------------------
 * Author: ${author}
 * GitHub: ${githubLink}
 * 
 * Premium Quantum UI/UX Design System
 */

`;

const htmlMetaTags = `
    <!-- 
      ⚛️ QUANTUM WEB DEVELOPMENT ROADMAP
      Created by ${author} (${githubLink}) 
    -->
    <meta name="author" content="${author}">
    <meta name="publisher" content="${author}">
    <meta name="copyright" content="${author}">
    <meta name="description" content="Explore 18 revolutionary quantum-inspired web projects by ${author}. From neural color generators to distributed quantum simulations. #QuantumWeb #WebDev">
    <meta name="keywords" content="${keywords}">
    
    <!-- Open Graph / Viral Tags -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Quantum Web Roadmap | ${author}">
    <meta property="og:description" content="Experience the future of web development. 18 revolutionary projects by ${author}.">
    <meta property="og:image" content="https://opengraph.githubassets.com/1/AshrafMorningstar/Quantum-Web-Roadmap">
    <meta property="og:url" content="${githubLink}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Quantum Web Roadmap | ${author}">
    <meta name="twitter:description" content="18 Revolutionary Web Projects. Zero Setup. Pure Magic.">
`;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const ext = path.extname(filePath);
    const fileName = path.basename(filePath);

    // Skip if already has header
    if (content.includes("Ashraf Morningstar") && content.includes(githubLink)) {
        // Even if it has it, ensure SEO tags in HTML are robust
        if (ext === '.html' && !content.includes('og:title')) {
             // force update HTML metadata
        } else {
            return; 
        }
    }

    if (ext === '.js' || ext === '.ts') {
        fs.writeFileSync(filePath, jsHeader + content);
        console.log(`[JS] Processed: ${fileName}`);
    } 
    else if (ext === '.css') {
        fs.writeFileSync(filePath, cssHeader + content);
        console.log(`[CSS] Processed: ${fileName}`);
    } 
    else if (ext === '.html') {
        // Insert inside <head>
        if (content.includes('<head>')) {
            const newContent = content.replace('<head>', `<head>${htmlMetaTags}`);
            fs.writeFileSync(filePath, newContent);
            console.log(`[HTML] Enhanced: ${fileName}`);
        }
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else {
            processFile(filePath);
        }
    }
}

console.log("🚀 Starting Global Viral & Attribution Injection...");
walkDir(rootDir);
console.log("✅ All files updated with Author Identity & SEO Tags.");

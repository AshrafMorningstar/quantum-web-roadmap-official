/**
 * Self-Assembling Portfolio Architecture - Script
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class PortfolioQuantumEntangler {
  constructor() {
    this.projects = [];
    this.skillVectors = [];
    this.layoutSuperposition = [];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeCanvas();
    this.generateDemoData();
  }

  setupEventListeners() {
    document
      .getElementById("analyzeBtn")
      ?.addEventListener("click", () => this.analyzeGitHub());
    document
      .getElementById("collapseLayoutBtn")
      ?.addEventListener("click", () => this.collapseLayout());
    document
      .getElementById("exportBtn")
      ?.addEventListener("click", () => this.exportHTML());
    document
      .getElementById("shareBtn")
      ?.addEventListener("click", () => this.sharePortfolio());
    document
      .getElementById("refreshBtn")
      ?.addEventListener("click", () => this.regenerate());
  }

  async analyzeGitHub() {
    const username = document.getElementById("githubUsername")?.value;
    if (!username) {
      this.showNotification("Please enter a GitHub username", "warning");
      return;
    }

    this.showNotification("Analyzing skill vectors...", "info");

    // Simulate GitHub API analysis
    setTimeout(() => {
      this.skillVectors = this.generateSkillVectors();
      this.displayAnalysisResults();
      this.visualizeSkills();
      this.generateLayoutSuperposition();
      this.showNotification("Analysis complete!", "success");
    }, 2000);
  }

  generateSkillVectors() {
    const skills = [
      "JavaScript",
      "Python",
      "React",
      "Node.js",
      "CSS",
      "HTML",
      "TypeScript",
      "Vue",
    ];
    return skills.map((skill) => ({
      name: skill,
      proficiency: Math.random() * 0.5 + 0.5,
      projects: Math.floor(Math.random() * 20) + 5,
      commits: Math.floor(Math.random() * 500) + 100,
    }));
  }

  displayAnalysisResults() {
    const resultsDiv = document.getElementById("analysisResults");
    if (!resultsDiv) return;

    resultsDiv.innerHTML = `
            <div class="skill-grid">
                ${this.skillVectors
                  .map(
                    (skill) => `
                    <div class="skill-item">
                        <div class="skill-name">${skill.name}</div>
                        <div class="skill-bar">
                            <div class="skill-fill" style="width: ${
                              skill.proficiency * 100
                            }%"></div>
                        </div>
                        <div class="skill-stats">${skill.projects} projects • ${
                      skill.commits
                    } commits</div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  initializeCanvas() {
    const canvas = document.getElementById("skillCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    this.animateCanvas(ctx, canvas);
  }

  animateCanvas(ctx, canvas) {
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      hue: Math.random() * 360,
    }));

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${p.hue}, 100%, 50%)`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

  visualizeSkills() {
    const legend = document.getElementById("skillLegend");
    if (!legend) return;

    legend.innerHTML = this.skillVectors
      .map(
        (skill) => `
            <div style="display: inline-block; margin: 0.5rem; padding: 0.5rem 1rem; background: rgba(0,255,255,0.1); border-radius: 20px;">
                ${skill.name}: ${Math.round(skill.proficiency * 100)}%
            </div>
        `
      )
      .join("");
  }

  generateLayoutSuperposition() {
    this.layoutSuperposition = ["grid", "timeline", "quantum"];
  }

  collapseLayout() {
    const optimal =
      this.layoutSuperposition[
        Math.floor(Math.random() * this.layoutSuperposition.length)
      ];
    this.generatePortfolio(optimal);
    this.showNotification(`Collapsed to ${optimal} layout!`, "success");
  }

  generatePortfolio(layout) {
    const preview = document.getElementById("portfolioPreview");
    if (!preview) return;

    preview.innerHTML = `
            <div class="generated-portfolio ${layout}-layout">
                <h2>Auto-Generated Portfolio</h2>
                <div class="portfolio-content">
                    ${this.skillVectors
                      .map(
                        (skill) => `
                        <div class="portfolio-skill-card">
                            <h3>${skill.name}</h3>
                            <p>Proficiency: ${Math.round(
                              skill.proficiency * 100
                            )}%</p>
                            <p>${skill.projects} Projects</p>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `;
  }

  generateDemoData() {
    this.skillVectors = this.generateSkillVectors();
  }

  exportHTML() {
    this.showNotification("Exporting HTML...", "info");
    setTimeout(() => this.showNotification("HTML exported!", "success"), 1000);
  }

  sharePortfolio() {
    this.showNotification("Share link copied!", "success");
  }

  regenerate() {
    this.skillVectors = this.generateSkillVectors();
    this.displayAnalysisResults();
    this.visualizeSkills();
    this.showNotification("Portfolio regenerated!", "success");
  }

  showNotification(message, type) {
    const notification = document.createElement("div");
    notification.style.cssText = `
            position: fixed; top: 20px; right: 20px;
            background: ${
              type === "success"
                ? "#00ff00"
                : type === "warning"
                ? "#ffaa00"
                : "#00ffff"
            };
            color: #000; padding: 15px 25px; border-radius: 10px;
            font-weight: 600; z-index: 10000;
        `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
}

document.addEventListener(
  "DOMContentLoaded",
  () => new PortfolioQuantumEntangler()
);

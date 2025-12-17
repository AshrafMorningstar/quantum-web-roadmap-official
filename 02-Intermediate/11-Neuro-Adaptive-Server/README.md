# Neuro-Adaptive Web Server

**Author**: Ashraf Morningstar  
**GitHub**: https://github.com/AshrafMorningstar

A demonstration of a web server (frontend simulation) that adapts its content presentation based on the user's inferred cognitive state.

## Concept

The "Observer Effect" in web design: The page changes based on how the user observes it. Specifically, it tracks cursor metrics (speed, jitter) as a proxy for user stress or frustration.

## Features

- **Stress Detection**: Analyzes mouse entropy to detect frustration or impatience.
- **Dynamic Content Rewriting**:
  - **Standard Mode**: Full layout, complex information, standard density.
  - **Zen Mode (High Stress)**: Removes distractions, simplifies text, increases contrast and font size for legibility.

## Usage

Move your mouse erratically or very fast to simulate "stress". Watch the interface simplify itself ("Zen Mode") to reduce cognitive load. Stop moving to return to "Standard Mode".

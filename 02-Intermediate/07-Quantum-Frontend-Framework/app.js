/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/** App Logic for Project 7 */

// 1. Define a Quantum State
const userProfileState = new QuantumState({ name: "Alice", role: "Admin" });
userProfileState.addPossibility({ name: "Bob", role: "User" });
userProfileState.addPossibility({ name: "Charlie", role: "Guest" });

// 2. Define Components
const profileCard = new QuantumComponent('#superposition-demo', (data) => {
    return `
        <h3>${data.name}</h3>
        <p>Role: ${data.role}</p>
        <small>State Collapsed</small>
    `;
});

// 3. Bind
profileCard.bindState(userProfileState);


// Entangled Example
const sharedState = new QuantumState({ count: 0 });
// Add some chaos
sharedState.addPossibility({ count: 42 });
sharedState.addPossibility({ count: 1337 });

const viewA = new QuantumComponent('#entangled-a', (data) => `<b>View A:</b> ${data.count}`);
const viewB = new QuantumComponent('#entangled-b', (data) => `<b>View B:</b> ${data.count}`);

viewA.bindState(sharedState);
viewB.bindState(sharedState);

// Auto-trigger observation for demo purposes after 3s
setTimeout(() => {
    // If not interacted with, force observation
    sharedState.observe();
}, 5000);

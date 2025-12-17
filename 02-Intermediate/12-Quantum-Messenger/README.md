# Quantum Cryptographic Messenger

**Author**: Ashraf Morningstar  
**GitHub**: https://github.com/AshrafMorningstar

A chat application simulation secured by Quantum Key Distribution (BB84 Protocol).

## Concept

Uses the principles of quantum mechanics (measuring a quantum state changes it) to detect eavesdroppers.

1. **Key Generation**: Alice and Bob generate a shared secret key using quantum states.
2. **Eavesdropping**: If "Eve" tries to intercept the key generation, the error rate increases, alerting the parties.
3. **Encryption**: Once a safe key is established, it's used as a One-Time Pad for perfect secrecy.

## Usage

- Wait for the "Shared Secret Key" to generate.
- Type messages to chat securely.
- Toggle "Simulate Eve" to see how eavesdropping destroys the key generation process and alerts the users.

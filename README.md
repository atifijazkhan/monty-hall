# The Monty Hall Problem

An interactive exploration of one of probability's most counterintuitive puzzles.

**[Live Demo](https://cs.uwaterloo.ca/~a78khan/monty_hall/)**

![Monty Hall Problem](monty-hall.png)

## Overview

This project provides three ways to understand and verify the Monty Hall problem:

1. **Interactive Web Demo** - Play the game yourself and see the statistics
2. **Monte Carlo Simulator** - Run millions of simulations to empirically verify the math
3. **In-Depth Blog Post** - Full mathematical explanation with rigorous proofs

## Quick Start

### Web Demo

Try the [live demo](https://cs.uwaterloo.ca/~a78khan/monty_hall/) or open `index.html` locally. The page includes:

- **The Game** - Play the Monty Hall game interactively
- **Simulation** - Watch the computer play thousands of games
- **Blog** - Read the full mathematical analysis

No server required - it's a single self-contained HTML file.

### Command-Line Simulator

Run Monte Carlo simulations to verify the theoretical probabilities:

```bash
node monty-hall-eval.js
```

The CLI tool tests four scenarios:

| Scenario | Expected Win Rate |
|----------|------------------|
| Standard 3-door (switch) | 66.67% |
| Standard 3-door (stay) | 33.33% |
| Shuffled variant | 50.00% |
| N-door generalization | (n-1)/n |

## The Answer

**You should always switch.**

- Staying wins with probability **1/3**
- Switching wins with probability **2/3**

Switching doubles your chances of winning.

## Project Structure

```
monty-hall/
├── index.html           # Interactive web demo (game + simulation + blog)
├── monty-hall-eval.js   # Node.js Monte Carlo simulator
├── monty-hall-blog.md   # Full mathematical writeup
├── monty-hall.png       # Screenshot
├── sample_eval          # Sample output from the CLI tool
├── LICENSE              # MIT License
└── README.md            # This file
```

## Requirements

- **Web demo**: Any modern browser
- **CLI simulator**: Node.js (no dependencies)

## License

MIT License - see [LICENSE](LICENSE) for details.

---

*"You should always switch."* — Marilyn vos Savant, 1990

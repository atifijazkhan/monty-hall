#!/usr/bin/env node
/**
 * ============================================================================
 * MONTY HALL PROBLEM - UNIFIED EXPERIMENTAL EVALUATION
 * ============================================================================
 *
 * An empirical verification tool for the Monty Hall problem and its variants.
 *
 * SCENARIOS TESTED:
 *   1. Standard 3-Door (Always Switch)  — Expected win rate: 66.67%
 *   2. Standard 3-Door (Always Stay)    — Expected win rate: 33.33%
 *   3. Shuffled Variant (Random Pick)   — Expected win rate: 50.00%
 *   4. N-Door Generalization (Switch)   — Expected win rate: (n-1)/n
 *
 * USAGE:
 *   node monty-hall-eval.js
 *
 * THEORETICAL BACKGROUND:
 *   - Standard game: Player picks 1 of n doors. Host opens (n-2) goat doors.
 *     Switching wins iff player initially picked wrong, which happens (n-1)/n.
 *   - Shuffled variant: After host reveals, remaining doors are shuffled.
 *     Player loses track of which was theirs, reducing to 50/50 blind choice.
 *
 * @author Generated with Claude
 * @see monty-hall-blog.md for full mathematical proofs
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Promisified readline question helper.
 * @param {string} prompt - The prompt to display
 * @returns {Promise<string>} User's input
 */
const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

// ============================================================================
// SIMULATION FUNCTIONS
// ============================================================================

/**
 * Simulates the standard Monty Hall game with n doors.
 *
 * GAME RULES:
 *   1. Car placed uniformly at random behind one of n doors
 *   2. Player picks a door uniformly at random
 *   3. Host opens (n-2) doors, all goats (avoids player's door and car)
 *   4. Two doors remain: player's original pick and one other
 *   5. Player either switches or stays based on strategy
 *
 * CORRECTNESS ARGUMENT:
 *   - If player initially picked car (prob 1/n): switch loses, stay wins
 *   - If player initially picked goat (prob (n-1)/n): switch wins, stay loses
 *   - Therefore: P(switch wins) = (n-1)/n, P(stay wins) = 1/n
 *
 * @param {number} numDoors - Number of doors (must be >= 2)
 * @param {string} strategy - Either 'switch' or 'stay'
 * @returns {boolean} True if player wins (gets the car)
 */
function simulateStandard(numDoors, strategy) {
  // Step 1: Place car behind a random door (0 to numDoors-1)
  const carDoor = Math.floor(Math.random() * numDoors);

  // Step 2: Player picks a random door
  const playerPick = Math.floor(Math.random() * numDoors);

  // Step 3-4: Host opens (numDoors - 2) goat doors, leaving player's door and one other
  // We don't need to simulate which doors host opens—we only need the final state.
  //
  // KEY INSIGHT: After host's elimination, the "switch" door is determined by:
  //   - If playerPick == carDoor: switch door is any goat (we pick an arbitrary one)
  //   - If playerPick != carDoor: switch door MUST be carDoor (host couldn't eliminate it)

  let switchDoor;
  if (playerPick === carDoor) {
    // Player picked the car. All other doors are goats.
    // Switch door can be any of them (all equally losing).
    switchDoor = (playerPick + 1) % numDoors;
  } else {
    // Player picked a goat. Host eliminated all other goats.
    // The only remaining non-player door is the car.
    switchDoor = carDoor;
  }

  // Step 5: Apply strategy
  const finalChoice = (strategy === 'switch') ? switchDoor : playerPick;

  // Return true if player wins
  return finalChoice === carDoor;
}

/**
 * Simulates the shuffled variant of the Monty Hall problem.
 *
 * MODIFIED RULES:
 *   1-3. Same as standard (3 doors, player picks, host reveals goat)
 *   4. NEW: The two remaining doors are shuffled—player loses track of which was theirs
 *   5. Player picks uniformly at random from the two remaining doors
 *
 * CORRECTNESS ARGUMENT:
 *   Let D₀ = player's original door, D₁ = other remaining door
 *   From standard analysis: P(car behind D₀) = 1/3, P(car behind D₁) = 2/3
 *
 *   After shuffle, player picks each with probability 1/2:
 *   P(win) = P(pick D₀)·P(car|D₀) + P(pick D₁)·P(car|D₁)
 *          = (1/2)(1/3) + (1/2)(2/3)
 *          = 1/6 + 1/3
 *          = 1/2
 *
 *   The shuffle neutralizes the advantage—it becomes a fair coin flip.
 *
 * @returns {boolean} True if player wins (gets the car)
 */
function simulateShuffled() {
  // Step 1: Place car behind a random door (0, 1, or 2)
  const carDoor = Math.floor(Math.random() * 3);

  // Step 2: Player picks a random door
  const playerPick = Math.floor(Math.random() * 3);

  // Step 3: Host opens a goat door (not player's pick, not the car)
  let hostOpens;
  for (let i = 0; i < 3; i++) {
    if (i !== playerPick && i !== carDoor) {
      hostOpens = i;
      break;
    }
  }

  // Step 4: Identify remaining doors (player's pick and one other)
  const remaining = [];
  for (let i = 0; i < 3; i++) {
    if (i !== hostOpens) {
      remaining.push(i);
    }
  }
  // remaining[] now has exactly 2 elements

  // Step 5: Shuffle effect—player picks uniformly at random from remaining
  // (They've lost track of which door was their original pick)
  const finalChoice = remaining[Math.floor(Math.random() * 2)];

  return finalChoice === carDoor;
}

// ============================================================================
// PROGRESS BAR UTILITY
// ============================================================================

/**
 * Runs a simulation function multiple times with a progress bar.
 *
 * @param {Function} simulateFn - Zero-argument function returning boolean (win/lose)
 * @param {number} numGames - Number of games to simulate
 * @param {string} label - Label to display next to progress bar
 * @returns {number} Total number of wins
 */
function runWithProgress(simulateFn, numGames, label) {
  let wins = 0;
  // Update progress bar ~50 times during the simulation
  const updateInterval = Math.max(1, Math.floor(numGames / 50));

  for (let i = 0; i < numGames; i++) {
    if (simulateFn()) wins++;

    // Update progress bar at intervals and at the end
    if ((i + 1) % updateInterval === 0 || i === numGames - 1) {
      const pct = ((i + 1) / numGames * 100).toFixed(0).padStart(3);
      const filled = Math.round((i + 1) / numGames * 25);
      const bar = '█'.repeat(filled) + '░'.repeat(25 - filled);
      process.stdout.write(`\r  ${label}: [${bar}] ${pct}%`);
    }
  }
  console.log(); // Newline after progress bar completes
  return wins;
}

// ============================================================================
// RESULT DISPLAY
// ============================================================================

/**
 * Displays simulation results in a formatted box.
 *
 * @param {string} label - Description of the scenario
 * @param {number} wins - Number of wins
 * @param {number} total - Total games played
 * @param {number} theoretical - Theoretical win probability (0 to 1)
 */
function displayResult(label, wins, total, theoretical) {
  const empirical = (wins / total * 100).toFixed(2);
  const theoreticalPct = (theoretical * 100).toFixed(2);
  const diff = Math.abs(parseFloat(empirical) - parseFloat(theoreticalPct)).toFixed(2);

  // Row helper: label (17 chars) + value (22 chars) = 39 chars content
  const row = (name, value) => `  │ ${name.padEnd(17)}${value.padStart(22)} │`;

  console.log(`\n  ┌─────────────────────────────────────────┐`);
  console.log(`  │ ${label.padEnd(39)} │`);
  console.log(`  ├─────────────────────────────────────────┤`);
  console.log(row('Games played:', total.toString()));
  console.log(row('Wins:', wins.toString()));
  console.log(row('Empirical:', empirical + '%'));
  console.log(row('Theoretical:', theoreticalPct + '%'));
  console.log(row('Difference:', '±' + diff + '%'));
  console.log(`  └─────────────────────────────────────────┘`);
}

// ============================================================================
// SCENARIO RUNNERS
// ============================================================================

/**
 * Scenario 1: Standard 3-door game, player always switches.
 * Expected win rate: 2/3 ≈ 66.67%
 */
function runScenario1(numGames) {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SCENARIO 1: Standard 3-Door - Always Switch');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const wins = runWithProgress(() => simulateStandard(3, 'switch'), numGames, 'Simulating');
  displayResult('Always Switch (3 doors)', wins, numGames, 2/3);
}

/**
 * Scenario 2: Standard 3-door game, player always stays.
 * Expected win rate: 1/3 ≈ 33.33%
 */
function runScenario2(numGames) {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SCENARIO 2: Standard 3-Door - Always Stay');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const wins = runWithProgress(() => simulateStandard(3, 'stay'), numGames, 'Simulating');
  displayResult('Always Stay (3 doors)', wins, numGames, 1/3);
}

/**
 * Scenario 3: Shuffled variant—player picks randomly after doors are shuffled.
 * Expected win rate: 1/2 = 50%
 */
function runScenario3(numGames) {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SCENARIO 3: Shuffled Variant - Random Pick');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const wins = runWithProgress(simulateShuffled, numGames, 'Simulating');
  displayResult('Shuffled (random pick)', wins, numGames, 1/2);
}

/**
 * Scenario 4: N-door generalization—test switching with various door counts.
 * Expected win rate: (n-1)/n for each n
 */
function runScenario4(numGames) {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SCENARIO 4: N-Door Generalization - Always Switch');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const doorCounts = [3, 5, 10, 50, 100];

  for (const n of doorCounts) {
    const wins = runWithProgress(() => simulateStandard(n, 'switch'), numGames, `n=${n}`.padEnd(6));
    const theoretical = (n - 1) / n;
    const empirical = (wins / numGames * 100).toFixed(2);
    console.log(`     → Theoretical: ${(theoretical * 100).toFixed(2)}%  |  Empirical: ${empirical}%`);
  }

  console.log('\n  Formula: P(switch wins) = (n-1)/n');
}

/**
 * Runs all scenarios sequentially and displays a summary.
 */
function runAllScenarios(numGames) {
  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║         MONTY HALL - COMPLETE EXPERIMENTAL EVALUATION         ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝');

  runScenario1(numGames);
  runScenario2(numGames);
  runScenario3(numGames);
  runScenario4(numGames);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('  Scenario                      Theoretical    Strategy');
  console.log('  ─────────────────────────────────────────────────────────');
  console.log('  Standard 3-door (switch)      66.67%         OPTIMAL');
  console.log('  Standard 3-door (stay)        33.33%         Suboptimal');
  console.log('  Shuffled variant              50.00%         No advantage');
  console.log('  N-door (switch)               (n-1)/n        OPTIMAL');
  console.log('\n  Conclusion: Always switch!\n');
}

// ============================================================================
// MAIN MENU & ENTRY POINT
// ============================================================================

/**
 * Displays the interactive menu.
 */
function showMenu() {
  console.log('\n┌───────────────────────────────────────────────────────────────┐');
  console.log('│           MONTY HALL PROBLEM - EXPERIMENTAL EVAL              │');
  console.log('├───────────────────────────────────────────────────────────────┤');
  console.log('│  1. Standard 3-Door (Always Switch)      → Expected: 66.67%   │');
  console.log('│  2. Standard 3-Door (Always Stay)        → Expected: 33.33%   │');
  console.log('│  3. Shuffled Variant (Random Pick)       → Expected: 50.00%   │');
  console.log('│  4. N-Door Generalization (Switch)       → Expected: (n-1)/n  │');
  console.log('│  5. Run ALL scenarios                                         │');
  console.log('│  0. Exit                                                      │');
  console.log('└───────────────────────────────────────────────────────────────┘');
}

/**
 * Main entry point. Displays welcome message, gets configuration, and runs menu loop.
 */
async function main() {
  console.clear();
  console.log('\n  ╔══════════════════════════════════════════════════════════╗');
  console.log('  ║   THE MONTY HALL PROBLEM - EMPIRICAL VERIFICATION TOOL   ║');
  console.log('  ╠══════════════════════════════════════════════════════════╣');
  console.log('  ║  "You should always switch" - Marilyn vos Savant, 1990   ║');
  console.log('  ╚══════════════════════════════════════════════════════════╝\n');

  // Get number of games from user
  // Locale-robust: accepts thousand separators: comma, period, space, apostrophe, underscore
  // Examples: 100000 | 100,000 | 100.000 | 100 000 | 100'000 | 100_000
  const numGamesInput = await question('  Number of games per scenario [default: 10000]: ');
  const numGames = parseInt(numGamesInput.replace(/[,.\s'_]/g, ''), 10) || 10000;

  if (numGames < 1) {
    console.log('  Invalid number. Exiting.');
    rl.close();
    return;
  }

  // Main menu loop
  while (true) {
    showMenu();
    const choice = await question('\n  Select option (0-5): ');

    switch (choice.trim()) {
      case '1': runScenario1(numGames); break;
      case '2': runScenario2(numGames); break;
      case '3': runScenario3(numGames); break;
      case '4': runScenario4(numGames); break;
      case '5': runAllScenarios(numGames); break;
      case '0':
      case 'q':
      case 'exit':
        console.log('\n  Goodbye!\n');
        rl.close();
        return;
      default:
        console.log('  Invalid option. Try again.');
    }

    await question('\n  Press Enter to continue...');
  }
}

// Run the program
main().catch(err => {
  console.error('Error:', err);
  rl.close();
});

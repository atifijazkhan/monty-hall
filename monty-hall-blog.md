# The Monty Hall Problem: Why You Should Always Switch

*A deep dive into one of probability's most counterintuitive puzzles—and why even brilliant mathematicians got it wrong*

---

## Introduction

In 1990, a reader wrote to Marilyn vos Savant's "Ask Marilyn" column in *Parade* magazine with a puzzle about a game show. Her answer sparked one of the most heated mathematical controversies in popular history.

She received over 10,000 letters. Nearly 1,000 came from PhD holders. The tone ranged from condescending to outraged:

> *"You blew it, and you blew it big! Since you seem to have difficulty grasping the basic principle at work here, I'll explain..."*
> — PhD from Georgetown

> *"There is enough mathematical illiteracy in this country, and we don't need the world's highest IQ propagating more."*
> — PhD from George Mason University

The legendary mathematician Paul Erdős, one of the most prolific mathematicians in history, refused to believe the correct answer until he was shown a computer simulation.

They were all wrong. Marilyn was right.

Here's the puzzle that fooled them all.

---

## The Problem: Test Yourself First

Before reading further, commit to an answer.

**The Setup:**
You're on a game show. The host, Monty Hall, shows you three doors. Behind one door is a new car. Behind the other two are goats.

**The Game:**
1. You pick a door—let's say Door 1
2. Monty, who *knows* what's behind each door, opens a *different* door—say Door 3—revealing a goat
3. Monty asks: "Would you like to switch to Door 2?"

**The Question:**
Should you switch, stay, or does it not matter?

*Think about it. Commit to your answer. Then read on.*

---

## The Answer

**You should always switch.**

- Staying wins with probability **1/3**
- Switching wins with probability **2/3**

Switching *doubles* your chances of winning.

If your intuition screamed "it's 50/50!"—you're in excellent company. That intuition is wrong, and understanding *why* it's wrong reveals something deep about probability.

---

## The Rules (Precise Statement)

The analysis depends critically on the exact rules. Here they are:

**Assumptions:**
1. The car is placed uniformly at random behind one of three doors
2. The player selects a door uniformly at random (or deterministically—it doesn't matter)
3. Monty Hall *always* opens a door after your selection
4. Monty *never* opens your door
5. Monty *never* opens the door with the car
6. When Monty has a choice (both remaining doors have goats), he selects uniformly at random
7. After Monty opens a door, you may switch to the other unopened door

These constraints mean Monty's behavior is *not* random—it's *forced* by the rules.

---

## Part I: Intuitive Explanations

Let's build understanding before formalism.

### The Core Insight

When you first picked a door, what was the probability you were right?

**1/3.**

Three doors, one car, random selection. Simple.

Here's the key: **Monty's action cannot change this probability.**

Why? Because Monty will *always* reveal a goat, no matter what. Whether you picked the car or a goat, Monty can always find a goat door to open (there are always at least one, and usually two, goat doors he's allowed to open).

Since Monty's action is *guaranteed* regardless of your choice, observing him open a goat door tells you nothing new about *your* door.

So after the reveal:
- Your door still has probability 1/3 of having the car
- The probability has to go *somewhere*—it goes to the remaining door
- The other door has probability 2/3

**Switching wins whenever you were initially wrong. You were probably wrong. Switch.**

### The 100-Door Amplification

Imagine 100 doors. One car, 99 goats.

You pick Door 1. Monty then opens 98 doors, all revealing goats. Two doors remain: your original pick and Door 57.

Would you switch to Door 57?

*Obviously yes.*

Your initial pick had a 1% chance of being right. That means there was a 99% chance the car was behind one of the other 99 doors. Monty just eliminated 98 of those doors, but he was *forced* to avoid the car. All that 99% probability is now concentrated on Door 57.

The 3-door case works identically—the numbers are just less dramatic.

### Why "50/50" Is Wrong

The "50/50" intuition comes from this reasoning:

> "Two doors remain. One has the car. Therefore 50/50."

This ignores the *process* that led to two doors remaining. Consider:

| Your initial pick | What Monty does | Switching wins? |
|-------------------|-----------------|-----------------|
| Car (prob 1/3) | Opens either goat door | No |
| Goat A (prob 1/3) | *Must* open Goat B's door | **Yes** |
| Goat B (prob 1/3) | *Must* open Goat A's door | **Yes** |

Switching wins in 2 out of 3 equally likely scenarios.

The two remaining doors are *not* symmetric. Your door was chosen *before* any information was revealed. The other door is the one that *survived* Monty's elimination—and Monty was constrained to avoid the car.

---

## Part II: Common Wrong Arguments

Understanding the errors helps cement the correct reasoning.

### Wrong Argument #1: "Two doors, one car, so 50/50"

**The Error:** This would be true if someone randomly removed a door. But Monty's removal is *non-random*—he's constrained to reveal a goat. His action is *informative* precisely because he had no choice.

**Analogy:** Suppose I have two coins—one double-headed, one fair—and I pick one randomly. I flip it and show you: heads. Is the probability it's the double-headed coin still 50%? No—it's now 2/3, because the double-headed coin was *certain* to show heads, while the fair coin had only 50% chance.

Monty's "forced" reveal works the same way.

### Wrong Argument #2: "Monty's action gives no information because he always reveals a goat"

**The Error:** It's true that Monty always reveals *a* goat. But *which* goat door he opens is informative.

If the car is behind Door 2, Monty *must* open Door 3.
If the car is behind Door 1, Monty can open Door 2 *or* Door 3.

Observing Door 3 opened is *twice as likely* if the car is behind Door 2. This asymmetry is the source of the 2/3 probability.

### Wrong Argument #3: "I already picked, so my probability is locked in"

**The Error:** Conditional probabilities *can* update based on new information. The update just happens to keep your door at 1/3 while shifting the other probability mass to the remaining door.

---

## Part III: Mathematical Proof

Now let's prove this rigorously.

### Formal Setup

**Probability Space:**
Let Ω be the sample space of all possible game configurations.

**Random Variables:**
- **C** ∈ {1, 2, 3}: The door hiding the car (uniform distribution)
- **P** ∈ {1, 2, 3}: The player's initial pick (we fix P = 1 without loss of generality)
- **H** ∈ {2, 3}: The door Monty opens (determined by C, P, and Monty's randomization)

**Assumptions (restated formally):**
1. P(C = i) = 1/3 for i ∈ {1, 2, 3}
2. H ≠ P (Monty never opens player's door)
3. H ≠ C (Monty never reveals the car)
4. When Monty has multiple valid choices, he selects uniformly at random

### Method 1: Enumeration (Most Direct)

Fix the player's choice as Door 1. Enumerate all possibilities:

| Car Location | P(this case) | Monty opens | P(Monty's choice) | Joint P | Switching wins? |
|--------------|--------------|-------------|-------------------|---------|-----------------|
| Door 1 | 1/3 | Door 2 | 1/2 | 1/6 | No |
| Door 1 | 1/3 | Door 3 | 1/2 | 1/6 | No |
| Door 2 | 1/3 | Door 3 | 1 (forced) | 1/3 | **Yes** |
| Door 3 | 1/3 | Door 2 | 1 (forced) | 1/3 | **Yes** |

**Total probability check:** 1/6 + 1/6 + 1/3 + 1/3 = 1 ✓

**P(switching wins):** 1/3 + 1/3 = **2/3** ✓

**P(staying wins):** 1/6 + 1/6 = **1/3** ✓

This direct enumeration is arguably the clearest proof.

### Method 2: Bayes' Theorem

We'll compute P(C = 1 | H = 3)—the probability your door has the car, given Monty opened Door 3.

**Step 1: Compute conditional probabilities of Monty's action**

P(H = 3 | C = 1) = 1/2 (Monty chooses randomly between doors 2 and 3)
P(H = 3 | C = 2) = 1 (Monty is forced to open door 3)
P(H = 3 | C = 3) = 0 (Monty cannot reveal the car)

**Step 2: Compute P(H = 3) via Law of Total Probability**

$$P(H = 3) = \sum_{i=1}^{3} P(H = 3 | C = i) \cdot P(C = i)$$

$$P(H = 3) = \frac{1}{2} \cdot \frac{1}{3} + 1 \cdot \frac{1}{3} + 0 \cdot \frac{1}{3} = \frac{1}{6} + \frac{1}{3} + 0 = \frac{1}{2}$$

**Step 3: Apply Bayes' Theorem**

$$P(C = 1 | H = 3) = \frac{P(H = 3 | C = 1) \cdot P(C = 1)}{P(H = 3)} = \frac{\frac{1}{2} \cdot \frac{1}{3}}{\frac{1}{2}} = \frac{1}{3}$$

$$P(C = 2 | H = 3) = \frac{P(H = 3 | C = 2) \cdot P(C = 2)}{P(H = 3)} = \frac{1 \cdot \frac{1}{3}}{\frac{1}{2}} = \frac{2}{3}$$

$$P(C = 3 | H = 3) = \frac{P(H = 3 | C = 3) \cdot P(C = 3)}{P(H = 3)} = \frac{0 \cdot \frac{1}{3}}{\frac{1}{2}} = 0$$

**Verification:** P(C = 1 | H = 3) + P(C = 2 | H = 3) + P(C = 3 | H = 3) = 1/3 + 2/3 + 0 = 1 ✓

**Interpretation:** Given that Monty opened Door 3:
- Door 1 (your door): 1/3 probability of car
- Door 2 (switch door): 2/3 probability of car
- Door 3 (opened): 0 probability (you saw the goat)

### Completeness: The H = 2 Case

By symmetry (or direct calculation), if Monty opens Door 2:

P(H = 2 | C = 1) = 1/2
P(H = 2 | C = 2) = 0
P(H = 2 | C = 3) = 1

P(H = 2) = 1/2

P(C = 1 | H = 2) = 1/3
P(C = 3 | H = 2) = 2/3

**Verification of event space:** P(H = 2) + P(H = 3) = 1/2 + 1/2 = 1 ✓

### Unconditional Switching Win Rate

$$P(\text{switch wins}) = P(\text{switch wins} | H = 2) \cdot P(H = 2) + P(\text{switch wins} | H = 3) \cdot P(H = 3)$$

$$= \frac{2}{3} \cdot \frac{1}{2} + \frac{2}{3} \cdot \frac{1}{2} = \frac{2}{3}$$

Regardless of which door Monty opens, switching wins with probability 2/3.

---

## Part IV: The Shuffling Variant

Here's a modification that *does* result in 50/50.

### Modified Rules

1. You pick a door
2. Monty opens a door revealing a goat
3. **New:** The two remaining doors are physically shuffled—you lose track of which was your original pick
4. You choose one of the two remaining doors

### Intuitive Explanation

In the original game, you exploit your knowledge: "I probably picked wrong, so the *other* door is probably right."

After shuffling, you can't identify "your" door versus "the other" door. The information that made switching advantageous—knowing which door was which—is destroyed.

You're now making a blind choice between two doors. One has the car, one has a goat. **It's genuinely 50/50.**

### Rigorous Proof

**Setup:** After Monty acts, let:
- D₀ = player's original door
- D₁ = the other remaining door

From our earlier analysis (conditioning on Monty's action):
- P(car behind D₀) = 1/3
- P(car behind D₁) = 2/3

**The shuffle:** The player now selects uniformly at random from {D₀, D₁}, independently of the car location.

Let S ∈ {D₀, D₁} be the player's selection after shuffling.

**Compute P(win):**

$$P(\text{win}) = P(\text{win} | S = D_0) \cdot P(S = D_0) + P(\text{win} | S = D_1) \cdot P(S = D_1)$$

Since selection is uniform and independent:
- P(S = D₀) = P(S = D₁) = 1/2
- P(win | S = D₀) = P(car behind D₀) = 1/3
- P(win | S = D₁) = P(car behind D₁) = 2/3

$$P(\text{win}) = \frac{1}{3} \cdot \frac{1}{2} + \frac{2}{3} \cdot \frac{1}{2} = \frac{1}{6} + \frac{1}{3} = \frac{1}{2}$$

**Key insight:** The unequal conditional probabilities (1/3 vs 2/3) are *neutralized* by the uniform random selection. The shuffle doesn't change the probabilities behind the doors—it changes the player's *strategy* from "always pick D₁" (optimal) to "pick uniformly" (suboptimal but forced by ignorance).

### Information-Theoretic Perspective

The shuffle is a striking example of the difference between:
- **Physical state:** The car's location (unchanged by shuffling)
- **Epistemic state:** What the player knows (destroyed by shuffling)

Monty's constrained behavior created *exploitable information*. The shuffle erased the player's *access* to that information, not the information itself. The probabilities behind the doors remain 1/3 and 2/3—but the player can no longer act on this asymmetry.

---

## Part V: The N-Door Generalization

### Problem Statement

- **n doors:** 1 car, (n − 1) goats
- Player picks one door
- Monty opens **(n − 2) doors**, all revealing goats (he's constrained to avoid the player's door and the car)
- Two doors remain: the player's original pick and one other
- Should the player switch?

### Theorem

**Switching wins with probability (n − 1)/n.**

### Proof

**Claim:** After Monty's elimination, let D₀ be the player's door and D₁ be the remaining door. Then:
- P(car behind D₀) = 1/n
- P(car behind D₁) = (n − 1)/n

**Proof:**

The player's initial selection is uniform over n doors, so P(car behind D₀) = 1/n initially.

Now we verify this doesn't change after Monty's action.

**Case 1: Player initially picked the car (probability 1/n)**
- All other (n − 1) doors have goats
- Monty opens any (n − 2) of them
- The remaining door D₁ has a goat
- Switching loses

**Case 2: Player initially picked a goat (probability (n − 1)/n)**
- The car is behind one of the other (n − 1) doors
- Monty must open (n − 2) goat doors, avoiding the car
- The remaining door D₁ *must* be the car (it's the only non-eliminated door with the car)
- Switching wins

Therefore:
$$P(\text{switch wins}) = P(\text{initially picked goat}) = \frac{n-1}{n}$$

$$P(\text{stay wins}) = P(\text{initially picked car}) = \frac{1}{n}$$

**QED.**

### Table of Values

| n (doors) | P(stay wins) | P(switch wins) |
|-----------|--------------|----------------|
| 3 | 33.3% | 66.7% |
| 5 | 20% | 80% |
| 10 | 10% | 90% |
| 100 | 1% | 99% |
| 1,000 | 0.1% | 99.9% |

As n → ∞, switching becomes arbitrarily close to certain victory.

---

## Conclusion

The Monty Hall problem endures because it exposes a gap between intuition and rigorous reasoning.

### Key Lessons

**1. Constrained behavior creates information.**
Monty isn't acting randomly—he's *forced* to avoid the car. This constraint makes his action informative, even though he "always reveals a goat."

**2. Process matters, not just outcomes.**
Two remaining doors look symmetric, but they're not. One was chosen blindly; the other survived an informed elimination.

**3. Conditional probability is subtle.**
The probability of your door having the car doesn't update to 1/2 just because there are two doors. It updates based on *how* information was revealed—and in this case, the constrained reveal keeps your door at 1/3.

**4. Information requires access.**
The shuffling variant shows that even when favorable probabilities exist, you can only exploit them if you know which option is which.

---

## Summary

| Scenario | Optimal Strategy | Win Probability | Reason |
|----------|------------------|-----------------|--------|
| Standard (3 doors) | Switch | 2/3 | You were probably wrong initially |
| Standard (n doors) | Switch | (n−1)/n | Same logic, amplified |
| Shuffled doors | Random (forced) | 1/2 | Can't identify the better door |

---

The Monty Hall problem is more than a puzzle. It's a lesson in epistemic humility—a reminder that our intuitions about probability can fail spectacularly, even for simple-sounding problems.

**Always switch.**

---

*The problem is named after Monty Hall (1921–2017), host of the American game show "Let's Make a Deal." The mathematical controversy was ignited by Marilyn vos Savant's correct solution in her September 1990 Parade column. Even Paul Erdős, with over 1,500 published papers, initially refused to accept the answer—until a computer simulation convinced him.*

---
title: "Why the Best Description Wins"
date: 2026-03-17T00:00:00.000Z
description: >-
  Good explanations compress. Bad ones sprawl. This isn't an opinion — it's a theorem.
  Information theory proves that an optimal description exists for any system, and it's the one
  that predicts the most with the least effort. This is why science works. And it might explain
  why physics looks the way it does.
draft: false
author:
  name: "Ian Derrington"
contentType: article
mediaTypes:
  - text
series: "Physics of Common Sense"
categories:
  - Physics
  - Systems thinking
tags:
  - Information theory
  - Compression
  - Epimechanics
coverImage:
  url: ./images/why_the_best_description_wins-1-1.png
  alt: >-
    A dense, tangled web of words and arrows on the left gradually simplifies into a single
    elegant equation on the right, with a glowing path connecting them. The compressed side
    radiates clarity. Warm blueprint aesthetic, deep blue and gold.
bullets:
  - Good explanations compress prediction into fewer symbols — bad ones sprawl
  - Information theory proves an optimal description exists for any system (theorem, not opinion)
  - Science is a compression race — the best theory predicts the most with the least effort
  - The open question — does optimal description always look like physics?
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
---

# Why the Best Description Wins

You have two recipes for chocolate cake.

Recipe A has 3 steps. Recipe B has 30 steps. Both produce the same cake. Which recipe is better?

This isn't a trick question. Recipe A is better. Not because it's simpler — simplicity is just the side effect. Recipe A is better because it captures the same result with less effort. It *compresses* more outcome into fewer instructions.

Now hold that thought.

<!-- more -->

## Maps, recipes, and E=mc²

You're driving through a city you've never visited. You have two maps. Map A shows every crack in every sidewalk, every blade of grass, every pigeon. Map B shows roads, turns, and landmarks. Which map gets you where you're going?

Map B. Not because Map A is wrong — every crack is real. But Map A is useless precisely because it doesn't compress. It doesn't separate what matters from what doesn't. A map that includes everything is just the territory at a different scale. It predicts nothing because it simplifies nothing.

This is the same reason E=mc² works better than "stuff has oomph."

"Stuff has oomph" isn't wrong, exactly. Matter does have energy. But that description predicts nothing. You can't use it to build anything, test anything, or surprise yourself with a consequence you didn't expect. E=mc² does all of those things. It tells you how much energy, in what units, with what relationship to mass. It compresses an enormous range of predictions — nuclear reactors, particle physics, stellar evolution — into five symbols.

The good description wins because it *compresses more prediction into less effort*.

## This isn't an opinion

Here's where things get interesting. The claim above — that there exists a best description for any system — isn't a philosophical preference. It isn't a style choice. It's a mathematical theorem. Multiple theorems, actually, all saying the same thing in different languages.

**Shannon's rate-distortion theory (1959)** proved that for any source of information and any level of accuracy you're willing to accept, there exists an optimal encoding — a way of describing the source that uses the least information while staying within your accuracy target. This isn't a suggestion. It's a theorem with a proof. The optimal encoding exists whether you've found it or not.

**Rissanen's Minimum Description Length (1978)** proved the same thing from a different angle: the best model for any dataset is the one that minimizes the total cost of describing both the model and the data the model fails to capture. Too simple a model and you pay in errors. Too complex and you pay in model overhead. The optimum is in between — and it's mathematically unique.

**Kolmogorov complexity** defines the ultimate compression: the shortest computer program that produces a given output. For any dataset, this shortest program exists. (You can't always find it — that's Chaitin's incompleteness result — but it exists.)

**Solomonoff induction (1964)** proved that a learner who weights hypotheses by their simplicity — shorter descriptions get higher prior probability — will converge to the true distribution generating the data. Simpler descriptions aren't just prettier. They're *provably better predictors* in the long run.

Four independent results. Four different mathematical frameworks. One conclusion: **for any system, at any accuracy level, there is an optimal description, and it's the one that compresses the most prediction into the least effort.**

This isn't an opinion about what good science looks like. It's a fact about the structure of information itself.

## This is why science works

Think about what scientists actually do. They look at a pile of data — planetary orbits, chemical reactions, disease spread, market fluctuations — and they compete to find the description that captures the most pattern in the fewest symbols.

Newton compressed Kepler's three laws of planetary motion and Galileo's laws of falling bodies into three laws of motion and one law of gravitation. Darwin compressed the bewildering diversity of life into variation, selection, and inheritance. Maxwell compressed electricity, magnetism, and light into four equations.

Each of these was a compression victory. The winning theory didn't just describe what happened — it predicted what *would* happen, in situations nobody had tested yet, using fewer assumptions than any alternative.

This is also why science self-corrects. A theory that predicts less, or requires more machinery to make the same predictions, is a worse compression. It will be outcompeted — not by fiat, but by the same pressure that makes Recipe A beat Recipe B. Scientists don't abandon theories because they're "wrong" in some absolute sense. They abandon them because a better compression arrives.

We can't access truth directly. [Hoffman's Interface Theory](https://doi.org/10.1093/oso/9780393254693.001.0001) makes this point sharply: our perceptions are fitness-tuned interfaces, not photographs of reality. We see what's useful to see, not what's "there." Our descriptions — our maps, recipes, equations — are interfaces too. The best interface isn't the "truest" one (we can't check). It's the one that lets you predict the most with the least effort.

Science is the systematic search for better interfaces. Information theory tells us this search has a target — the optimal compression exists — even if we haven't reached it yet.

## The math, gently

Let's write this down, just once, so you can see what the formal version looks like.

Call your description of a system $X$. There are many possible descriptions — many possible maps of the same territory. Call the set of all possible descriptions $\mathcal{R}$.

For any description $X$ and any accuracy level $\varepsilon$ (how much error you're willing to tolerate), there's a cost $C(X, \varepsilon)$ — the computational effort needed to predict what happens next.

The optimal description is:

$$X^* = \underset{X \in \mathcal{R}}{\operatorname{argmin}}\; C(X, \varepsilon)$$

In words: $X^*$ is the description that minimizes prediction cost at your chosen accuracy.

That $X^*$ exists is the theorem. Shannon proved it. Rissanen proved it. Kolmogorov complexity implies it. Solomonoff induction converges to it. This is settled mathematics.

What does $X^*$ look like? That's the open question.

## The conjecture: optimal description looks like physics

Here's the hook — the part that isn't proven yet, but is the reason this matters beyond information theory.

Look at what the best descriptions in physics have in common. They have **symmetries** — the laws look the same from different vantage points. They have **conservation laws** — quantities that don't change even as the system evolves. They have **simple equations of motion** — a small number of variables obeying compact rules.

These aren't accidents. Each of these properties *reduces prediction cost*:

- **Symmetries** mean you don't have to re-derive the physics from every new vantage point. One derivation covers them all. That's compression.
- **Conservation laws** mean some quantities are free — you don't have to predict them because they don't change. That's compression.
- **Low dimensionality** means fewer variables to track. That's compression.

So here's the conjecture: *maybe the reason physics looks the way it does is that physics is what optimal description looks like.*

Not physics as in "the study of particles and forces." Physics as in "the structural form of any description that has been compressed to its limit." Symmetries, conservation laws, compact equations — these might not be features of reality. They might be features of *good description* applied to reality.

If this is right, then when we find the best way to describe *any* system — an economy, an ecosystem, a mind, an organization — that description will have the same structural form: a Lagrangian, symmetries, conservation laws, sparse coupling. Not because those systems "are" physics, but because optimal description always converges to that form.

This is what the [Epimechanics framework](../epimechanics/epimechanics_00_prelude.md) calls the **Representational Efficiency principle**. The existence of $X^*$ is proven. That $X^*$ has Lagrangian symmetry — that's the conjecture. It's the central open problem.

## What's proven, what's not

Let's be precise about the boundary.

**Proven (theorem):**
- For any system, an optimal description $X^*$ exists that minimizes prediction cost at a given accuracy
- This follows from Shannon (1959), Rissanen (1978), Kolmogorov complexity, and Solomonoff induction
- The optimal description maximally compresses — it captures the most pattern in the fewest symbols

**Conjectured (open problem):**
- $X^*$ necessarily has maximal Lagrangian symmetry, sparse coupling, and minimal dimensionality
- Physics-like structure is a *consequence* of optimal compression, not a feature of reality imposed on descriptions

There is evidence for the conjecture. The [renormalization group](https://doi.org/10.1103/PhysRevB.4.3174) shows that at each scale, the "right" description sheds irrelevant variables and reveals symmetries. [Causal emergence](https://doi.org/10.1073/pnas.1314922110) shows that coarse-grained descriptions can be more causally powerful than fine-grained ones — compression increases predictive power. The [free energy principle](https://doi.org/10.1038/nrn2787) shows that self-organizing systems minimize a quantity structurally identical to prediction cost.

But a unified proof connecting information-theoretic optimality to Lagrangian structure does not yet exist. It might be the most important open problem in the foundations of science.

## Why this matters for you

Forget the theorems for a moment. Here's the everyday version.

Every time you explain something — to a colleague, a student, yourself — you're in a compression race. The explanation that captures the pattern in fewer words, with fewer exceptions, covering more cases, is the one that wins. Not because brevity is a virtue for its own sake, but because compression is prediction. If you can say it shorter, you understand it better.

This is why the best teachers don't simplify — they compress. They find the one idea that makes ten facts obvious. They hand you the map that makes the territory navigable.

It's why the best engineers don't add features — they find abstractions. The right abstraction compresses a thousand special cases into one general mechanism.

It's why the best theories don't explain — they predict. An explanation that only accounts for what already happened is a list, not a theory. A theory compresses past and future into the same structure.

And it's why, when you finally understand something deeply, it feels *simple*. Not because you've thrown away the complexity. Because you've found the compression that makes the complexity *unnecessary*.

The best description wins. Always. That's not a slogan — it's a theorem.

---

*This post is part of the [Physics of Common Sense](./index.md) series, which builds everyday intuitions toward the formal [Epimechanics](../epimechanics/index.md) framework. For the mathematical foundations of the Representational Efficiency principle, see [Part 0: Foundations](../epimechanics/epimechanics_00_prelude.md).*

---
title: "Tensor Programs IVb: Adaptive Optimization in the Infinite-Width Limit (arXiv:2308.01814) — Full Text Extraction"
description: >-
  Raw full-text extraction of TP4b in the Tensor Programs series for reproducible computational analysis.
date: 2026-03-21T00:00:00.000Z
draft: true
author:
  name: "epiphysics-open-source"
contentType: article
series: "Tensor Programs Sources"
coverImage:
  url: ./images/tp4b_2308.01814.png
  alt: "Mathematical derivations from Tensor Programs series paper TP4b"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
feedback:
  enabled: true
---

> [!note]
> Source PDF: `docs/research/tensor_programs/sources/TP4b_2308.01814.pdf`
>
> Extracted text: `docs/research/tensor_programs/sources/TP4b_2308.01814.txt`
>
> DOI: https://doi.org/10.48550/arXiv.2308.01814

## Full extracted text

```text
Tensor Programs IVb:
Adaptive Optimization in the ∞-Width Limit
Etai Littwin
Apple

Abstract
Going beyond stochastic gradient descent (SGD), what new phenomena emerge in
wide neural networks trained by adaptive optimizers like Adam? Here we show:
The same dichotomy between feature learning and kernel behaviors (as in SGD)
holds for general optimizers as well, including Adam — albeit with a nonlinear
notion of “kernel.” We derive the corresponding “neural tangent” and “maximal
update” limits for any architecture. Two foundational advances underlie the above
results: 1) A new Tensor Program language, N E⊗OR⊤, that can express how
adaptive optimizers process gradients into updates. 2) The introduction of bra-ket
notation (borrowed from quantum physics) to drastically simplify expressions
and calculations in Tensor Programs. This work summarizes and generalizes all
previous results in the Tensor Programs series of papers.

Space of ∞-Width Neural Networks
Trained by Adaptive Optimizers

Unstable,
Unfaithful, or
Trivial

Maximal
Update

Fe
re

u
at

Standard

Neural
Tangent

g
nin
ar

Operator
Regime

Le

arXiv:2308.01814v2 [cs.LG] 7 Aug 2023

Greg Yang
xAI

Contents
1

2

Introduction

5

1.1

Related Work . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

7

1.2

Notations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

7

1.2.1

The Tensor Program Ansatz: Representing Vectors via Random Variables .

8

1.2.2

IID Copies . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

10

1.2.3

Big-O Notation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

10

Exposition of Main Results

12

2.1

Optimizers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

12

2.2

abcd-Parametrizations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

13

2.3

Setup . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

14

2.4

Neural Tangent . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

15

2.4.1

Continuous Time Intuition . . . . . . . . . . . . . . . . . . . . . . . . . .

16

2.4.2

Infinite-Width Limit . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

16

2.4.3

Lack of Feature Learning . . . . . . . . . . . . . . . . . . . . . . . . . . .

18

Maximal Update . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

18

2.5.1

Shallow Infinite-Width Limit . . . . . . . . . . . . . . . . . . . . . . . . .

19

N E⊗OR⊤: Tensor Program with Nonlinear Outer Products . . . . . . . . . . . . .

19

2.6.1

The N E⊗OR⊤ Language . . . . . . . . . . . . . . . . . . . . . . . . . . .

20

2.6.2

Setups . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

20

2.6.3

Limit Objects . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

21

2.6.4

The Master Theorem . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

23

2.7

Maximal Update for Deep MLP . . . . . . . . . . . . . . . . . . . . . . . . . . .

23

2.8

Dynamical Dichotomy: The Classification of abcd-Parametrizations . . . . . . . .

24

2.8.1

Technical Assumptions . . . . . . . . . . . . . . . . . . . . . . . . . . . .

25

2.8.2

Size of Feature Learning . . . . . . . . . . . . . . . . . . . . . . . . . . .

25

2.8.3

Stability and Faithfulness . . . . . . . . . . . . . . . . . . . . . . . . . . .

25

2.8.4

Nontriviality . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

27

2.8.5

Feature Learning and Operator Regimes . . . . . . . . . . . . . . . . . . .

27

2.8.6

Classification of abcd-Parametrizations . . . . . . . . . . . . . . . . . . .

27

Infinite-Width Limits for Any Architecture . . . . . . . . . . . . . . . . . . . . . .

29

2.5
2.6

2.9

2

3

4

2.9.1

Representating Architectures via Tensor Programs . . . . . . . . . . . . .

29

2.9.2

abcd-Parametrization for Any Architecture . . . . . . . . . . . . . . . . .

30

2.9.3

Interlude: Backpropagation and Total Programs . . . . . . . . . . . . . . .

31

2.9.4

Training Setup . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

32

2.9.5

Neural Tangent Limit . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

32

2.9.6

Maximal Update Limit . . . . . . . . . . . . . . . . . . . . . . . . . . . .

34

2.10 Extensions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

36

2.10.1 Weight Decay . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

36

2.10.2 Update Clipping and Normalization . . . . . . . . . . . . . . . . . . . . .

37

2.10.3 Second Moment Factoring ala Adafactor . . . . . . . . . . . . . . . . . .

40

2.10.4 Future Optimizers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

40

2.11 Proof Sketch . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

40

Proofs of Infinite-Width Limits

42

3.1

Proof of Classification of abcd-Parametrizations . . . . . . . . . . . . . . . . . . .

42

3.1.1

Program Setup . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

43

3.1.2

Program Construction . . . . . . . . . . . . . . . . . . . . . . . . . . . .

45

3.1.3

The Infinite-Width Limit . . . . . . . . . . . . . . . . . . . . . . . . . . .

48

3.1.4

r = 0 Implies Feature Learning . . . . . . . . . . . . . . . . . . . . . . .

49

3.2

Proof of Maximal Update Limit . . . . . . . . . . . . . . . . . . . . . . . . . . .

51

3.3

Proof of Neural Tangent Limit . . . . . . . . . . . . . . . . . . . . . . . . . . . .

52

Proof of Master Theorem

54

4.1

Basic Tools . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

54

4.1.1

Review of Moore-Penrose Pseudo-Inverse . . . . . . . . . . . . . . . . . .

55

4.1.2

Baranyai’s Theorem . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

56

Basic Objects and Operations . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

56

4.2.1

Fixed-Dimensional Random Variables and Vectors . . . . . . . . . . . . .

56

4.2.2

Space of Random Sequences . . . . . . . . . . . . . . . . . . . . . . . . .

56

4.2.3

Multi-Tensors . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

57

4.2.4

Constant Tensors . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

57

4.2.5

IID Tensors . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

58

4.2.6

Averaging over n . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

58

4.2.7

Implicit Broadcasting of Nonlinearities on Multi-Tensors . . . . . . . . . .

58

4.2.8

Nonlinear Outer Products . . . . . . . . . . . . . . . . . . . . . . . . . .

59

Vanishing and Bounded Moments . . . . . . . . . . . . . . . . . . . . . . . . . .

60

4.3.1

Moment-Bounded Multi-Tensors . . . . . . . . . . . . . . . . . . . . . . .

60

4.3.2

Vanishing Multi-Tensors . . . . . . . . . . . . . . . . . . . . . . . . . . .

61

4.3.3

Equivalence Modulo Vanishing Multi-Tensors . . . . . . . . . . . . . . . .

62

4.3.4

Distributional Equivalence (aka Dequivalence) . . . . . . . . . . . . . . .

65

4.2

4.3

3

4.4

Getting Equivalence From Distributional Equivalence . . . . . . . . . . . . . . . .

67

4.4.1

Proof of Lemma 4.4.5 . . . . . . . . . . . . . . . . . . . . . . . . . . . .

70

4.5

Matrix Pseudo-Inverse . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

72

4.6

Uniformized Tensor Programs . . . . . . . . . . . . . . . . . . . . . . . . . . . .

73

4.6.1

Uniformized N ETSOR⊤ . . . . . . . . . . . . . . . . . . . . . . . . . . .

73

4.6.2

Uniformized N E⊗OR⊤ . . . . . . . . . . . . . . . . . . . . . . . . . . . .

73

4.6.3

Setup and Constructions . . . . . . . . . . . . . . . . . . . . . . . . . . .

73

N ETSOR⊤ Master Theorem, Vectorwise Convergence . . . . . . . . . . . . . . . .

74

4.7.1

Proof Setup . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

74

4.7.2

Proof Plan

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

75

4.7.3

Exact Formulas . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

76

4.7.4

Showing 3) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

77

4.7.5

Showing 2) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

77

4.7.6

Showing 1) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

77

4.8

N E⊗OR⊤ Master Theorem, Vectorwise Convergence . . . . . . . . . . . . . . . .

77

4.9

Proof of N E⊗OR⊤ Master Theorem Theorem 2.6.10 . . . . . . . . . . . . . . . .

79

4.9.1

Relaxing Initial Scalar Requirement . . . . . . . . . . . . . . . . . . . . .

79

4.9.2

Proof of Non-Gaussian N E⊗OR⊤ Master Theorem . . . . . . . . . . . . .

79

4.7

5

Experiments

81

5.1

81

Numerical Verification . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

4

Chapter 1

Introduction
While historically the deep learning theory literature has by-and-large (carelessly in hindsight)
identified “infinite-width neural networks” with “neural tangent kernel” [3, 21] or “gaussian process”
[14, 20, 29, 33], by now we understand these are just particular kinds of infinite-width limit with
simple mathematics. Indeed, there also exists a “feature learning regime” with much more complex
mathematics but also all the actually desired properties of a neural network [7, 8, 31, 32, 34, 36].
Yang & Hu [45] precisely characterized this so-called Dynamical Dichotomy: there is no other regime
that can happen for MLPs trained by SGD in finite time.
Does Adaptive Optimization Create New Large Width Behavior? In practice, of course,
most neural networks of importance are trained by adaptive optimizers like Adam [19]. Can new
phenomenon arise in the infinite-width limit of adaptive optimizers? For example, if one invokes
the (not-quite-correct) intuition that neural network trained with small learning rate exhibits kernel
behavior, then one might suppose that these optimizers may adaptively enforce large effective learning
rates. This prevents kernel behavior and may even “supercharge” feature learning.
But it turns out there’s nothing special about adaptive optimizers in this regard. Essentially the exact
dichotomy of feature learning vs kernel regime plays out for any adaptive optimizer. This means
there is also a “neural tangent kernel” limit for any adaptive optimizer, where the network evolution
can be captured solely by some kind of evolution equation in the function space — albeit no longer
a linear equation. This also means that “maximal update” parametrization can be defined for e.g.,
Adam, that maximizes feature learning in a suitable sense. Indeed, [47] already contained an intuitive
derivation of this µP for Adam, and showed it preserves optimal hyperparameters as ones scales the
width of a model (e.g., Transformer [39]). Part of this work serves to fill the gap in [47]’s theoretical
foundations.
Tensor Program with Nonlinear Outer Products To achieve this result, we leverage the Tensor
Programs framework: express the adaptive optimization of a network in any parametrization in
a Tensor Program, and invoke the Master Theorem to take the infinite-width limit of the whole
computation, obtaining in particular the limit at the end of training.
Yet, there is one problem: no previous Tensor Program language can express adaptive optimization!
The main issue is the expression of the entrywise “normalization” of the gradient done by the
optimizer: For example, in the first step of training, Adam essentially just takes the sign of the
gradient; while previous Tensor Program languages like N ETSOR⊤ can express this operation for the
input and output weights, they cannot do so for the hidden weights.1
Thus, we extend N ETSOR⊤ (pronounced “NETS-ert”) to a new language N E⊗OR⊤ (pronounced
“NEK-zort”) by allowing such operations. More precisely, this operation can be construed as a
“nonlinear outer product” of vectors.2 For example, a nonlinear outer product z of two vectors
1
More generally, N ETSOR⊤ can only express this for vector-like (1 dimension tends to infinity) parameters
but not matrix-like (2 dimensions).
2
This was called “nonlinear tensor product” in [47], but here we adopt the term outer to avoid over-using the
word tensor.

5

x, y ∈ Rn has zαβ = ϕ(xα , yβ ) for some ϕ : R2 → R. In its full generality, nonlinear outer products
express the the gradient processing done by Adam and other optimizers. N E⊗OR⊤ can be just
thought of as “N ETSOR⊤ + nonlinear outer products.”
We prove the Master Theorem for N E⊗OR⊤ (i.e., how to take the infinite width limit for any
N E⊗OR⊤ program), for both the classical Gaussian case (where matrices are sampled from
Gaussians) as well as the general non-Gaussian case, following the strategy of [12].
Infinite Width Limits for Any Architecture The Tensor Programs series is known for
architecturally universal results — results that hold for all “natural deep learning architectures”, past
and future. For example, [41] established the architectural universality of Neural Network-Gaussian
Process (NNGP) Correspondence, [43, 46] established the same for the Neural Network-Tangent
Kernel Correspondence, and [44] likewise for Free Independence Principle. Yet, [45]’s theoretical
development of maximal update parametrization only focused on multi-layer perceptrons.3
Here we write down the µ-limit (as well as the neural tangent limit) for any architecture and any
adaptive optimizer. The key innovation here is the definition of what “any architecture” means, while
the proofs follow essentially the MLP examples.
Notational Advances Prior works did not write down the µ-limits for all “natural” architectures
mainly because the Tensor Programs notation was not efficient enough to deal with this arbitrary
complexity. The mundane looking but vital innovation of this work is a new set of Tensor Programs
notations that enables concise expression of all of the above: the bra-ket (aka Dirac) notation,
borrowed from quantum physics. For readers familiar with prior Tensor Programs papers, in short:
8x⟩ = Z x ,

⟨x8y⟩ = E Z x Z y .

The expectation inner product becomes notably succinct in the new notation, which also enables much
more efficient expressions of the nonlinear outer product that is at the center of adaptive optimization.
Contributions
• We formalize a general notion of adaptive optimization in deep learning, called entrywise
updates — the property that gradients are processed entrywise — satisfied by common
optimizers like SGD and Adam [19].
• We define the neural tangent and maximal update parametrizations for entrywise optimizers
and derive their infinite-width limits. While we focus on MLPs in most of this paper for
pedagogical purposes, we eventually write down the limits for any “reasonable” architecture.
• More generally, like [45], we identify all “natural” infinite-width limits in this setting and
dichotomize them into feature learning vs a nonlinear version of kernel regime. The maximal
update limit remains the “optimal” feature learning limit for all entrywise optimizers.
• All of the above results are made possible by a new version of Tensor Program, called
N E⊗OR⊤, that can express the adaptive updates using the new instruction of nonlinear
outer product. This forms the bulk of the technical advances made in this work.
• Even so, the most vital contribution of this work is perhaps introducing the bra-ket notation
to drastically simplify expressions and calculations common in Tensor Programs.
The infinite-width limits of adaptive optimizers take the headline for this paper and may be what
piques readers’ interest in the near term. But the new Tensor Program and the new notation will likely
have longer lasting impact, pushing forward our fundamental knowledge of large neural network
behavior and lowering the translation tax between how this knowledge is stored on paper and in our
heads.
The Tensor Programs Series In a way, this work gathers and generalizes all previous results in the
Tensor Programs series about infinite-width limits: Theorem 2.9.19 generalizes the architecturally
universal Neural Network-Gaussian Process correspondence [41] and Neural Network-Tangent Kernel
correspondence [43, 46]; the new Tensor Program, N E⊗OR⊤ (Definition 2.6.1), generalizes the
3

with a brief discussion of defining µP for any architecture in the appendix, but nothing about its limit; [47]
did a thorough empirical investigation of muP for a variety of architectures but nothing theoretical

6

N ETSOR⊤+ of [44]; its Master Theorem (Theorem 2.6.10) holds for both Gaussian and non-Gaussian
matrices, generalizing [12]; the Dynamical Dichotomy for entrywise updates (Corollary 2.8.20)
generalizes that for SGD [45]; our µ-limit equations generalize those of [45] for SGD and, for the
first time, we even write down the general µ-limit equations for any architecture (Theorem 2.9.25).

1.1

Related Work

Infinite-Width Neural Networks Here we briefly overview past works on infinite-width neural
networks, but we recommend the reader to refer to [45, Sec 2] for a more comprehensive review.
A large body of literature exists on both the kernel (NTK) limit [3, 18, 21, 43, 46] and the mean
field limit for 2-layer neural network [7, 31, 32, 34, 36]. Various papers describe the kernel and
feature learning regimes more generally without taking an infinite-width limit. [8] describes the “lazy
training” regime in arbitrary differentiable programs, and is controlled by a single parameter α which
scales the output. It is shown that when α is large, the weight need only move slightly to fit the
training data, and network essentially performs kernel learning. Many papers [2, 16, 30] view the
kernel and feature learning regimes as learning in different timescales, explicitly incorporating the
time dependence in the infinite-width limit, and others derive finite width corrections to the NTK for
finite width networks [13, 22]. In this paper, as in [45], we consider training time to be constant, and
take only the width to infinity.
Tensor Programs Tensor Programs, first introduced in [42] and expanded upon in [41, 43, 44],
were developed as a theoretical framework to analyze the infinite-width limits of any architecture
expressible in a simple formal language, in an attempt to unify the per-architecture analysis prevalent
in the literature [1, 10, 15, 23]. [45] defined a natural space of neural network parametrizations
(abc-parametrizations), and classified all resulting infinite-width limits into two possible catagories:
1) the kernel regime, in which the neural network function evolves as a linear model, and 2) the feature
learning regime, in which the representations change and adapt to data over the course of training.
The µ parametrization was then identified as the “optimal” parametrization for arbitrary architectures
in which all layers learn features, and was later heuristically extended to adaptive optimizers [47].
Adaptive Optimizers Adaptive optimizers [11, 19, 52] and their variants were developed to
accelerate learning by adapting the learning rate on a per parameter basis, and currently is a critical
component of large scale pretraining of transformer models [17, 25, 51]. No previous work has
developed their theory for infinite-width neural network, but a concurrent work has derived the
infinite-width NTK for SignSGD in the batch-size 1 setting [28] (which is not equivalent to the
general batch-size setting).

1.2

Notations

One of the the key innovations of this work is a set of much cleaner notations to express ideas in
Tensor Programs. While this sizeable section may be off-putting to some readers, it’s better to explain
the notation sooner than later. We recommend skimming until the end of the Outer Product subsection
and then move on, coming back to read other parts when necessary.
Multi-vectors and Multi-scalars Throughout this paper, we expect n to be large. If x ∈ Rn , then
we say x is an n-vector, or just vector. If x ∈ Rn×k where k is fixed as n → ∞, then we say x is a
multi-vector, with the intuition that x can be thought of as a k-tuple of vectors. Likewise, c ∈ R is
a scalar, but we will call c ∈ Rk (where k is fixed as n → ∞) a multi-scalar (not a vector), with
the intuition that c can be thought of as a k-tuple of scalars. A more formal definition is given in
Section 4.2.3.
Averaging over n When x ∈ Rn , we always use greek subscript α, β, . . . ∈ [n] to index its entries.
Then ⟨xα ⟩α denotes its average entry. This notation will only be used to average over n-dimensions,
but not over constant dimensions.
7

1.2.1

The Tensor Program Ansatz: Representing Vectors via Random Variables

As we will see, as width becomes large, the entries of the (pre-)activation vectors and their gradients
will become roughly iid (just like in the SGD case), both at initialization (which is easy to see) and
training (which is harder to see). Hence any such vector’s behavior can be tracked via a random
variable that reflects the distribution of its entries. While we call this the “Tensor Program Ansatz”, it
is a completely rigorous calculus as seen below in Section 2.6 (as well as in previous papers in the
Tensor Programs series for SGD).
Ket Notation
Concretely, if x ∈ Rn is one such vector, then we write 8x⟩ ∈ R (called a ket) for such a random
variable, such that x’s entries look like iid samples from 8x⟩.4 For any two such vectors x, y ∈ Rn ,
(xα , yα ) ∈ R2 for each α will look like iid samples from the random vector (8x⟩, 8y⟩), such that, for
⊤
example, limn→∞ x n y = E 8x⟩ · 8y⟩, which we write succinctly as just ⟨x8y⟩. Here ⟨x8 is called a
bra, interpreted as a sort of “transpose” to 8x⟩. In our convention, 8x⟩ is always a random variable
independent of n and x always has Θ(1) typical entry size.5 .
Multi-Vector Kets Furthermore, this notation cleanly handles the multi-vector case when x =
(x1 , . . . , xk ) is an n × k matrix where k is fixed as n → ∞:
8x⟩ = (8x1 ⟩, . . . , 8xk ⟩) ∈ Rk ,

⟨x8y⟩ ∈ Rk×l ,

if y has shape n × l. Here 8x⟩, a ket, should
P be thought of as a row vector (and its “transpose” ⟨x8, a
bra, as a column vector), so that 8x⟩v = i 8xi ⟩v i for any vector (v 1 , . . . , v k ) ∈ Rk . Generally, the
intuition is that in the expression 8x⟩, the 8 side represents the n-dimension (in the limit as n → ∞)
while the ⟩ side represents the k-dimension. Thus
⟨x8y⟩ represents the limit of x⊤ y/n.6
Because we will often need to multiply a ket with a diagonal matrix, we introduce a shorthand:
8x⟩χ = 8x⟩Diag(χ),

(1.1)

if x is n × k and χ is a k-dimensional vector.
Outer Product

Likewise, if both x and y have shape n × k, the expression
8x⟩⟨y8 represents the limit of xy ⊤ ∈ Rn×n .

More formally, 8x⟩⟨y8 is defined as an operator that takes a ket 8z⟩ ∈ Rj and return the ket
(8x⟩⟨y8)8z⟩ = 8x⟩(⟨y8z⟩) ∈ Rj

i.e., it returns the random vector 8x⟩ ∈ Rk multiplied by the deterministic matrix ⟨y8z⟩ ∈ Rk×j on
the right. This corresponds to the limit of xy ⊤ z/n. Likewise, 8x⟩⟨y8 acts on a bra ⟨w8 ∈ Rj by
⟨w8(8x⟩⟨y8) = (⟨w8x⟩)⟨y8 ∈ Rj .

which corresponds to the limit of n1 w⊤ xy ⊤ . This definition of 8x⟩⟨y8 makes the expressions
8x⟩⟨y8z⟩,

⟨w8x⟩⟨y8,

⟨w8x⟩⟨y8z⟩

unambiguous (since any way of ordering the operations give the same answer).
4
The reader may wonder why we write 8x⟩ instead of the more conventional |x⟩ in quantum mechanics.
This is mainly because later (Definition 2.6.7) we want to write 8W 8 for the “limit” of a matrix W so that
8W 8x⟩ = 8W x⟩, but if we used | instead of 8, then |W | looks too much like some norm of W .
5
i.e., ∥x∥2 /n = Θ(1) as n → ∞
6
Note that later, we will consider x of shape n × k1 × · · · × kr , in which case 8x⟩ and ⟨x8 both have shape
k1 × · · · × kr , and ⟨x8x⟩ has shape k1 × · · · × kr × k1 × · · · × kr .

8

Remark 1.2.1 (Potential Confusion). One should not interpret 8x⟩ ⟨y8 as the scalar random variable
Pk
8x⟩ · 8y⟩ = i=1 8xi ⟩8y i ⟩, which would act on a ket 8z⟩ to produce (⟨x8 · ⟨y8)8z⟩ = E(8x⟩ · 8y⟩)8z⟩,
which is deterministic. On the other hand, 8x⟩ ⟨y8z⟩ is always a linear combination of 8x⟩, a
nondeterministic random variable in general. In particular, any correlation between 8x⟩ and 8y⟩ does
not directly play a role in their outer product 8x⟩ ⟨y8: we always have 8x⟩ ⟨y8z⟩ = 8x⟩ ⟨y8 1 8z⟩ 1 ,
where (8y⟩ 1 , 8z⟩ 1 ) is an iid copy of (8y⟩, 8z⟩) independent from 8x⟩. (See Section 1.2.2 below for
more comment on this notation).
Outer Product with Diagonal Inserted Finally, if χ ∈ Rk is deterministic, then (consistent with
Eq. (1.1)) we define 8x⟩ χ ⟨y8 as the operator that acts on kets 8z⟩ ∈ Rj by
(8x⟩ χ ⟨y8)8z⟩ = 8x⟩ χ ⟨y8z⟩ = 8x⟩Diag(χ)(⟨y8z⟩) ∈ Rj .
Morally, 8x⟩ χ ⟨y8 is just a shorter way of writing 8x⟩Diag(χ)⟨y8 and represents the limit of
xDiag(χ)y ⊤ . In particular, 8x⟩ 1 ⟨y8 = 8x⟩⟨y8.
Nonlinear Outer Product
If xy ⊤ ∈ Rn×n is the (linear) outer product of two vectors x ∈ Rn and y ∈ Rn , then ϕ(xy ⊤ ), the
entrywise application of nonlinear ϕ : R → R to xy ⊤ , is a kind of nonlinear outer product.7 Passing
to the ket notation, in general we define ϕ (8x⟩ χ ⟨y8) as the operator that acts on kets as
k
X

def

ϕ (8x⟩ χ ⟨y8) 8z⟩ = E ϕ
1



i=1

!
i

i

i 1

χ 8x ⟩8y ⟩

8z⟩ 1




where 8y 1 ⟩ 1 , . . . , 8y k ⟩ 1 , 8z⟩ 1 is an iid copy of 8y 1 ⟩, . . . , 8y k ⟩, 8z⟩ independent from 8x⟩ and
the expectation is taken only over the former. This is just like, in the finite n case,
!
k
X

ϕ xDiag(χ)y ⊤ z/n = ϕ
χi xi y i⊤ z/n.
i=1

Moreover, if 8w⟩ ∈ Rj , 8z⟩ ∈ Rk , then


⟨w8ϕ (8x⟩ χ ⟨y8) 8z⟩ = ⟨w8ϕ 8x⟩ χ ⟨y8 1 8z⟩ 1 ∈ Rj×k
!
k


X
= Eϕ
χi 8xi ⟩8y i ⟩ 1
8w⟩ ⊗ 8z⟩ 1
i=1

where ⊗ denotes outer product of vectors and expectation is taken over everything.


More generally, if ϕ : Rt → R, then ϕ 8x1 ⟩ χ1 ⟨y1 8, . . . , 8xt ⟩ χt ⟨yt 8 is an operator taking kets to
kets, defined by
!
k
k


X
X
def
i
i
i 1
i i
i 1
ϕ 8x1 ⟩ χ1 ⟨y1 8, . . . , 8xt ⟩ χt ⟨yt 8 8z⟩ = E ϕ
χ1 8x1 ⟩8y1 ⟩ , . . . ,
χt 8xt ⟩8yt ⟩
8z⟩ 1
1

i=1

i=1

Remark 1.2.2 (Potential Confusion). Note ϕ(8x⟩⟨y8) is not the image of the operator 8x⟩⟨y8 under ϕ
in the continuous function calculus of operators, but rather a “coordinatewise application” of ϕ. For
example, if ϕ(t) = t2 , then ϕ(8x⟩⟨y8) is not 8x⟩⟨y8x⟩⟨y8, the latter being what typically “squaring an
operator” means, but rather 8x⟩2 ⟨y82 = 8x ⊙ x⟩⟨y ⊙ y8.
7

The general definition of nonlinear outer product is given in Definition 4.2.12, but for the most part here we
will only be concerned with this particular type of nonlinear outer product and its generalization below.

9

Bar Notation
In later applications, when ϕ is an update function (such as Qt in Eq. (2.1)), this will be clear from
context.8 Then we use the much lighter “bar” notation
8x⟩v = ϕ(8x⟩v)

8x⟩ χ ⟨y8 = ϕ(8x⟩ χ ⟨y8)

8x⟩ χ ⟨y8z⟩ = ϕ(8x⟩ χ ⟨y8)8z⟩

(1.2)

⟨w8x⟩ χ ⟨y8z⟩ = ⟨w8ϕ(8x⟩ χ ⟨y8)8z⟩.
Random Vector Calculation
In contrast to the cases above, when an expression involves only kets (or bras), then the usual calculus
of kets as random variables or vectors apply, e.g., 8x⟩ ⊙ 8y⟩ is just the random vector formed from
entrywise product of 8x⟩ and 8y⟩.9
Comparison with Previous Z • Notation
For readers familiar with the Tensor Programs papers, this new “bra-ket” notation (aka Dirac notation)
relates to the old Z • notation by
8x⟩ = Z x ,

⟨x8y⟩ = E Z x Z y .

The new notation’s succinctness of expectation inner product should already be apparent. Furthermore,
the old notation is not very compatible with multi-vectors whereas 8x⟩ makes it clear that ⟩ represents
the constant dimension side. Consequently, (nonlinear) outer product is awkward to express in it,
especially when its contraction with random variables requires an explicit expectation symbol E.
1.2.2

IID Copies

As already seen above, if X is any random object, then X 1 , X 2 , . . . denote iid copies of X:
d
X i = X for all i and X, X 1 , X 2 , . . . are mutually independent. If Y is another random object,
d
then Y 1 , Y 2 , . . . are iid copies of Y that furthermore satisfy (X i , Y i ) = (X, Y ) for each i. E i
means taking the expectation over the iid copies with superscript i .
1.2.3

Big-O Notation

Remark 1.2.3 (Potential Confusion). Following previous papers of the Tensor Programs series, we
adopt the following semantics of big-O notation, which concerns the “typical size” of entries of a
tensor rather than the norm of the tensor (as is the more common usage of big-O notation). Therefore,
the reader must internalize this notation sooner rather than later to avoid confusion.
Definition 1.2.4 (Big-O Notation). Given a sequence x = {x(n)}∞
n=1 of random tensors, where
x(n) can have different shapes for different n, we write x = Θ(n−a ) and say x has coordinates (or
entries) of size Θ(n−a ) if there exist constants A, B > 0 such that almost surely,10 for sufficiently
large n,
1 X
A≤
x(n)2α ≤ B
(1.3)
#x(n) α
where #x(n) is the number of entries in x(n). We make similar definitions for O(n−a ) and Ω(n−a ).
Note the constants A, B can depend on everything except n; in concrete contexts below, such
constants can, for example, depend on neural network architecture, training time, optimizer, etc, but
just not width.
For example, the bar notation in 8dhlt ⟩ χt ⟨xl−1
8 abbreviates Qlt where l, t are the same as in dhlt inside.
t
From readers with quantum mechanics background, beware that 8x⟩8y⟩ in our context is the product of
random variables 8x⟩ and 8y⟩, which is not equal to their “tensor product” (which would be written 8x⟩8y⟩ 1 ).
10
Here “almost surely” is with respect to the probability of the entire sequence x.
8

9

10

Most often, x will have “approximately iid” coordinates, so the notation x = Θ(n−a ) can be
interpreted intuitively to say x has coordinates of “empirical standard deviation” Θ(n−a ), which
justifies the name.
We also define Õ in a slightly nonstandard manner that is more suitable for our usage.
Definition 1.2.5. For a random sequence c = {c(n)}n≥1 of fixed-sized vectors, we write c = Õ(nk )
a.s.
if n−k−ε c −−→ 0 for every ε > 0.
Morally, Õ(1) objects are those that are typically poly-logarithmic in norm, thus coinciding with the
more conventional definition of Õ(1) in computational complexity theory. However, technically our
notion is a bit more general since they allow any growth slower than any polynomial.

11

Chapter 2

Exposition of Main Results
Here we explain our main results while later chapters will prove them. We begin by isolating a concept
that captures most of adaptive optimizers, namely entrywise optimizers (Section 2.1), which forms
the focus of this work. By considering how to scale the learning rate, initialization, and multipliers
(a so-called abcd-parametrization), we catalogue all natural ways of taking infinite-width limits
(Section 2.2). We study the archetypical examples, the (canonical generalizations of) neural tangent
(NT) (Section 2.4) and the maximal update (µ) (Sections 2.5 and 2.7) parametrizations, and describe
their infinite-width limits. More generally, we classify all possible limits of abcd-parametrizations
(Section 2.8): while most parametrizations are degenerate in one way or another, the rest can be
divided into the feature learning and the operator regimes, the latter being the nonlinear counterpart
of kernel regime. The µ and NT limits are respectively the “maximal” elements of each regime in that
all parameters contribute to the function evolution. Nevertheless, like in the SGD case, all operator
regime limits, including the NT limit, do not learn features and trivialize transfer learning. While
all of the above stars the MLP as the instructional architecture, finally we write down the NT and µ
limits for any architecture (Section 2.9).
Underlying these results is the new Tensor Program language, N E⊗OR⊤, that expresses the so-called
nonlinear outer products (Section 2.6). We formulate the algorithm, aka the Master Theorem, to
compute the infinite-width limit of any N E⊗OR⊤ program. New techniques, such as new notions of
equivalence of random vectors, are needed to prove the Master Theorem; we overview the proof in
Section 2.11 before giving it in full in Chapter 4.

2.1

Optimizers

What does one mean by adaptive optimization? Both SGD and Adam, prototypical optimizers in
deep learning, have entrywise updates, where parameter updates take the form of a function of the
current and/or past gradients. This turns out to be a concept that captures most of adaptive optimizers.
Entrywise Updates Generically, if g0 , g1 , ..., gt ∈ R denote the gradients of some scalar parameter
w ∈ R at steps 0, 1, ..., t, a general notion of an update at step t takes the form
wt − wt−1 = −ηQt (g0 , . . . , gt )

(2.1)

for some function Qt : Rt+1 → R which we call the update function, where η is the learning
rate. We call Eq. (2.1) an entrywise update and the corresponding optimizer an entrywise optimizer.
For example, for SGD, Qt just returns gt . For SGD with momentum β, Qt (g0 , . . . , gt ) = β t g0 +
· · · + β 0 gt . These are examples of linear entrywise updates, where Qt is linear. On the other hand,
“adaptive updates” are generally nonlinear, where Qt typically takes the form1
m
(2.2)
Qt (g0 , . . . , gt ) = √
v + ϵ2
√
Sometimes, the denominator is v + ϵ instead. For practical purposes, there is no difference between
these two versions. However, Eq. (2.2) is differentiable at v = 0, satisfying our smoothness assumption
Assumption 2.3.2 while the alternative is not.
1

12

where m and v are both functions of the past gradients g0 , . . . , gt and ϵ > 0 is there for numerical
stability. For example, in Adam [19], m and v are respectively the exponential moving averages of
them and their squares, resulting in the following unwieldy expression:
Pt
t−s
1
s=0 (1 − β1 )β1 gs
1−β1t+1
Qt (g0 , . . . , gt ) = q
,
(Adam)
Pt
t−s 2
1
2
s=0 (1 − β2 )β2 gs + ϵ
1−β t+1
2

where β1 , β2 are Adam’s momentum hyperameters. We can also consider a simpler “memoryless”
version of this, namely SignSGD [4]:
gt
.
(SignSGD)
Qt (g0 , . . . , gt ) = Qt (gt ) = p
gt2 + ϵ2
In the context of an L-hidden-layer MLP, we can more generally consider a collection Q = {Qlt :
Rt+1 → R}t≥0,l∈[L+1] of update functions, one for each layer l.
Definition 2.1.1. We say Qlt : Rt+1 → R is memoryless if Qlt (g0 , . . . , gt ) only depends on gt for
any (g0 , . . . , gt ) ∈ Rt+1 . We say Q is memoryless if all Qlt are memoryless.
Definition 2.1.2. We say a memoryless Q is stationary if Qlt does not depend on l or t. In this case,
we just write Q : R → R instead of Q.
We will also write memoryful and nonstationary for the opposite of memoryless and stationary. In
this sense, SGD and SignSGD are both memoryless and stationary but Adam is neither. We will
always present the memoryless stationary versions of our theorems first, as they carry across the main
ideas. The full version (i.e., memoryful nonstationary) will always be a straightforward modification,
though often requiring more notations.
Optimizer Coverage Many other optimizers are covered by this entrywise update framework
Eq. (2.1), including RMSProp, Adagrad, Adadelta, NAdam, Adamax, etc [9, 19, 27, 35, 52]. However,
some other ingredients of “adaptive” optimization, such as gradient clipping, weight decay, or
momentum factoring as in Adafactor [35], are not directly covered. Nevertheless, using our new
extension of Tensor Programs discussed in Section 2.6, it is straightforward to derive and classify the
infinite-width limits including such ingredients, and we do so in Section 2.10. Such theorems will be
by-and-large the same as what we have here (e.g., Dynamical Dichotomy Corollary 2.8.20 still holds),
but the definitions of neural tangent and maximal update parametrizations (Definition 2.4.1,2.5.1) can
change, as well as, e.g., the equations characterizing feature learning. See [47, Sec B.3] for further
intuitive discussions.
Insufficient Expressivity of Previous Tensor Programs If Qt in Eq. (2.1) is nonlinear, then
N ETSOR⊤+ , the most advanced version of Tensor Programs before this work, is unable to express
Eq. (2.1) for hidden weights of a network (weight matrices where both dimensions tend to infinity).
In this work, we extend N ETSOR⊤ to N E⊗OR⊤ that can express it and develop its Master Theorem.

2.2

abcd-Parametrizations

In this work, we consider how such optimization should be parametrized wrt the width of a neural
network, generalizing the the abc-parametrization of [45].
For concreteness, consider an L-hidden-layer biasless perceptron: For weight matrices W 1 ∈ Rn×d
and W 2 , . . . , W L ∈ Rn×n , and nonlinearity ϕ : R → R, such a neural network on input ξ ∈ Rd is
given by
hl (ξ) = W l xl−1 (ξ) ∈ Rn ,

xl (ξ) = ϕ(hl (ξ)) ∈ Rn ,

0

where x (ξ) = ξ and the network output is f (ξ) = W

L+1⊤ L

for l = 1, . . . , L,

x (ξ) for W

Fix a set of update functions Q = {Qlt

L+1

∈R

n×1

(2.3)

.

t+1

Definition 2.2.1.
: R
→ R}t≥0,l∈[L+1] . An abcdparametrization of the MLP in Eq. (2.3) is specified by a set of numbers {al , bl , cl , dl }l such that
(a) We parametrize each weight as W l = n−al wl for actual trainable parameter wl
13

l
(b) We initialize each wαβ
∼ N (0, n−2bl )

(c) The learning rate is ηn−cl for some width-independent η
(d) The gradients of wl are multiplied by ndl before being processed by Qlt : i.e., the update
at time t is
wl ← wl − ηn−cl Qlt (ndl g0 , . . . , ndl gt )
(2.4)
where gs , s = 0, . . . , t, are the gradients of wl at time s and Qlt is applied entrywise.
A simple example is the “standard parametrization” that is the default for, e.g., PyTorch, where
nothing scales with width other than the initialization.
Example 2.2.2. The standard abcd-parametrization (SP) is defined by
l
al
bl
cl
dl

[2, L]

1

0

0
0
0
0

1/2

0
0

L+1
0
1/2

0
0

In Definition 2.2.1, beyond the obvious addition of scaling exponent dl , compared to abcparametrization of [45], we also now have layer dependent cl . This is without loss of generality,
because of the redundancy in al , bl , cl , as shown in [45, Eq 5]. This takes the more general form as
follows for abcd-parametrization:
Proposition 2.2.3 (abcd Redundancy). For every l ∈ [L + 1],
for all θ ∈ R, at any finite width n, ft (ξ) stays fixed for all t and ξ if we set
al ← al + θ, bl ← bl − θ, cl ← cl − θ, dl ← dl + θ.

(2.5)

Remark 2.2.4 (Reduction to abc-Parametrization for SGD). In the case of SGD (i.e., when
Qlt (g0 , . . . , gt ) = gt ), an abcd-parametrization reduces to an abc-parametrization with the mapping
(al , bl , cl ) ← (al , bl , cl − dl ).

(2.6)

Remark 2.2.5 (Omitted Constants). As in [45], our concern here is the correct way to scale with width.
In practice, there should be tunable hyperparameters in front of the powers of n in Definition 2.2.1,
as investigated in [47].
Remark 2.2.6 (Alternative Definition of dl for Adam). In the idealized case of Adam and similar
adaptive optimizers where the ϵ in Eq. (2.2) is 0, Qlt is degree-0 homogeneous and dl itself is
redundant. When ϵ > 0, this is no longer true. But the almost homogeneity yields an alterative but
equivalent way to define dl : instead of gs being multiplied by ndl , we let ϵ be multiplied by n−dl .
Remark 2.2.7 (For Adam, SP with Tuned LR Learns Features). If one sets the global learning rate
for SP (Example 2.2.2) to its largest stable value, then for SGD, SP is in the kernel regime [45].
But for SignSGD and Adam, assuming perfect scale invariance, SP’s largest stable learning rate is
Θ(1/n), so that with this setting (i.e., setting cl = 1 for every l), SP is actually in the feature learning
regime. The reader is not expected to understand the underlying reasoning at this point, but the claim
above can be derived by calculating r = 0 from Definition 2.8.5 and invoking Theorem 2.8.12 and
Theorem 2.8.19. This difference in default scaling may be a contributing factor to the success of
Adam compared to SGD.

2.3

Setup

Here we set up the notation and conventions regarding the data, (pre)activations, and training of the
network as well as the main technical assumptions for our rigorous results.
Data and (Pre)Activations Consider a set of M inputs ξ ⊆ Rd considered as a d × M matrix
whose columns ξ a , a = 1, . . . , M represent individual inputs. Then we write ft ∈ RM for the
function outputs on these inputs, and write hlt and xlt (with shape n × M) for the pre- and postactivations of all of such inputs in layer l at time t. Similarly, let dhlt and dxlt (with shape n × M)
14

represent the scaled gradients naL +bL ∇hlt ft and naL +bL ∇xlt ft at time t (this scaling ensures that
dhlt and dxlt have typical size Θ(1) entrywise at initialization t = 0).2
Error Signal and Training Routine While [45] considered only the batch-size-1 case to simplify
notation, here, because of our notational advance, we can afford to consider the following more
general setting.
Setup 2.3.1. We consider the function evolution under an abcd-parametrization and a sequence
of error signal functions εt : RM → RM (t ≥ 0), that returns the output error signal given the
function values. A training routine is the package of 1) the learning rate η, 2) collection Q of update
functions (as in Definition 2.2.1) and 3) a sequence of εt as above.
The εt error signals simultaneously encapsulate both full batch as well as mini-batch training. For
example, we can set εt (f ) = L′ (f , y) ⊙ batchmaskt for some loss function L and a target vector
y ∈ RM , where batchmaskt is the vector that is 1 on elements in the batch at time t and 0 otherwise.
Furthermore, we can implement train-test split via εt : For example, ξ can be split into two parts,
ξ = (ξ train , ξ test ) such that εt is always 0 on the ξ test . Then the evolution of ft can track the
evolution of function values on the test set due to changes from the training set.
The εt framework more generally covers settings like reinforcement and online learning where the
error signal is not obtained from just a simple loss function.
Technical Assumptions For all rigorous results in this work, we will consider the following
smoothness assumption. This is sufficient for deriving the NTK and µP limits but more assumptions,
stated later, are required for Dynamical Dichotomy, i.e., the classification of abcd-parametrizations.
Assumption 2.3.2 (Smoothness). Assume ϕ′ , εt , and Qlt for all l, t are pseudo-Lipschitz.3
This is a very weak assumption satisfied by typical loss functions (e.g., MSE or cross entropy), update
functions (e.g., SGD or Adam4 ), and nonlinearities (e.g., tanh or gelu). The notable exception here
is that relu itself is not covered because its derivative has a discontinuity. But this is a common
technicality not treated in the theoretical literature. Nevertheless, we expect all theorems in this work
should apply to relu as well and can be proven rigorously in the future.
With this setup in mind, we next describe the two prototypical infinite-width limits, the neural tangent
and maximal update limits, for nonlinear entrywise updates before completely classifying the space
of abcd-parametrization.

2.4

Neural Tangent

The “classical” neural tangent (abc-)parametrization (NTP) can be generalized easily to an abcdparametrization using the intuition that the input to any nonlinear update function should be Θ(1) (we
won’t go through this calculation here but c.f. Definition 2.8.8 and Lemma 2.8.11). After defining this
generalization next, we adapt the well-known continuous-time heuristic for deriving the NTK limit to
the nonlinear updates case (Eq. (2.7)), before writing down a succinct expression of the infinite-width
limit made possible by our new bra-ket notation (Eqs. (2.8) and (2.9)).
Definition 2.4.1. The neural tangent abcd-parametrization (NTP) is defined (modulo Eq. (2.5)) by
l

[2, L]

1

L+1

al
bl
cl
dl

1/2

0
0
1/2
1/2

1/2

0
1
1

0
1/2
1/2

2
Notation-wise, we do not bold the d in dhlt unless the output dimension e is larger than 1, in which case
l
dht represents naL +bL Jhl ft ∈ Rn×e×M . See Definition 2.9.14.
t
P
3
Recall a function f : Rk → R is called pseudo-Lipschitz if |f (x) − f (y)| ≤ C∥x − y∥(1 + ki=1 |xi |d +
|yi |d ) for some C, d > 0. This is morally the same as saying f has a polynomially bounded derivative.
4

specifically, Adam in the form Eq. (2.2) with ϵ > 0

15

Recovering “Classical” NTP Reducing to abc-parametrization in the SGD case via Eq. (2.6) (i.e.,
subtracting the last 2 rows), we recover exactly the classical NTP [45, Table 1].
2.4.1

Continuous Time Intuition

If we consider ft ∈ RM as a function of parameters Θt over continuous time t, then, for SGD, we
have the typical equation




∂ft ∂Lt
∂ft ∂Lt ∂ft
′
ft = −η
,
= −η
,
∂Θt ∂Θt
∂Θt ∂ft ∂Θt
where Lt = L(ft ) and L is the loss function. For a general (memoryless stationary) update function
Q, this just becomes5



∂ft
∂Lt ∂ft
ft′ = −η
,Q
,
(2.7)
∂Θt
∂ft ∂Θt
with Q applied entrywise. In both cases, when width is large in NTP (Definition 2.4.1), the weights
∂ft
essentially move so little that ∂Θ
is invariant to t (in so far as this contraction in Eq. (2.7) is
t
concerned). What changes from Q = id (SGD case) to the general case is that ft′ is no longer linear
t
in the error signal εt (ft ) = ∂L
∂ft ; instead, it is the result of a nonlinear operator KQ mapping the
error signal to the function update:


∂Lt
′
ft = −ηKQ
= −ηKQ (εt (ft )).
∂ft
When Q = id, KQ reduces to the linear operator represented by the NTK. But note that ft′ is still
linear in the learning rate η for general Q.
Now we turn to make this intuition rigorous.
2.4.2

Infinite-Width Limit

We can associate random vectors 8xlt ⟩, 8hlt ⟩ to xlt and hlt as discussed in Section 1.2.1 (and similar to
the SGD case studied in [45]). But as in the case with SGD, these random vectors will turn out to be
independent of t (because of the lack of feature learning). Therefore, we will drop the subscript t
in the notation below. The construction of 8xl ⟩, 8hl ⟩ follow from the general rules of the N E⊗OR⊤
program we develop below,6 but here they can be stated simply as follows:
Definition 2.4.2. For each l = 1, . . . , L, the ket 8hl ⟩ ∈ RM is constructed as a mean-zero Gaussian
vector with covariance matrix ⟨xl−1 8xl−1 ⟩ when l > 1 or ξ ⊤ ξ when l = 1. Simultaneously,
def
xl =
ϕ(8hl ⟩) ∈ RM for l = 1, . . . , L.7
Likewise, we can associate random vectors 8dxl ⟩, 8dhl ⟩ to gradients dxl , dhl (again, suppressing
subscript t because it will turn out the kets are independent of t).
Definition 2.4.3. For each l = L, . . . , 1, the ket 8dxl ⟩ ∈ RM is independent from {8xl ⟩, 8hl ⟩}L
l=1
and is a mean-zero Gaussian vector with covariance matrix ⟨dhl+1 8dhl+1 ⟩ when l < L or the all-1s
def ′
matrix when l = L. Simultaneously, 8dhl ⟩ =
ϕ (8hl ⟩) ⊙ 8dxl ⟩ ∈ RM for all l.
Memoryless Stationary Case Finally, having constructed these kets, we can define the
generalization of NTK we need. To make the formula short, we employ the following convention:
def
def
we write 8x0 ⟩ =
ξ ∈ Rd×M and 8dhL+1 ⟩ =
1 ∈ R1×M is the row vector of 1s. Then we set
0
0 ⊤
0
0
⊤
M×M 8
⟨x 8 = 8x ⟩ and ⟨x 8x ⟩ = ξ ξ ∈ R
; likewise for ⟨dhL+1 8dhL+1 ⟩. At this point, the
reader may find it helpful to review Section 1.2.1, especially on Bar Notation.
5

Technically, we should include terms involving dl from Definition 2.2.1 in Eq. (2.7), but for simplicity, let’s
just assume that Q is temporarily redefined to have already included them
6
Actually they are the same random vectors as constructed in [43] since this can be done in N ETSOR⊤.
7
{h1 , x1 }, . . . , {hL , xL } are mutually independent by construction as well, but we will not need this fact.
8
One perhaps would be inclined to rescale ⟨x0 8x0 ⟩ = ξ⊤ ξ/d, but in our context, d is a constant while we
only focus on scaling with n. So we choose to be slightly more brief by omitting this scaling with d.

16

Definition 2.4.4 (Neural Tangent Operator, Memoryless Stationary Case). For any function Q : R →
R, we define the neural tangent Q-operator KQ : RM → RM by the following: for any χ ∈ RM ,
def

KQ (χ) = Diag

L+1
X
l=1

⟨dhl 8dhl ⟩ χ ⟨xl−1 8xl−1 ⟩

(2.8)

where the “bar” notation abbreviates application of Q as in Eq. (1.2).
Let’s digest the notation a bit: In Eq. (2.8), 1) the subscript χ ∈ RM represents multiplication
by Diag(χ), 2) 8dhl ⟩ χ ⟨xl−1 8 is a random scalar variable, and 3) ⟨dhl 8dhl ⟩ χ ⟨xl−1 8xl−1 ⟩ is a
deterministic M × M matrix. The Diag in Eq. (2.8) takes its diagonal. Thus, KQ (χ) has entries
KQ (χ)a =

L+1
X
l=1

⟨dhla 8dhl ⟩ χ ⟨xl−1 8xl−1,a ⟩

for each a ∈ [M].
Example 2.4.5 (SGD Example). As an example, when Q is identity, the “bar” can be removed, and
KQ reduces to the linear operator represented by the NTK:9
Kid (χ) = χK,
def
K=

where K ∈ RM×M is the NTK

L+1
X
l=1

⟨dhl 8dhl ⟩ ⊙ ⟨xl−1 8xl−1 ⟩.

Example 2.4.6 (SignSGD Example). As another example, consider Q = sign (Eq. (SignSGD) with
ϵ = 0). If the batch size is 1, i.e., χ is nonzero on exactly one input, say ξ b , b ∈ [M], then Eq. (2.8)
is linear in sign(χ) because sign(xy) = sign(x) sign(y). Thus,
KQ (χ) = sign(χ)Ksign ,
Ksign =

L+1
X
l=1

where Ksign ∈ RM×M is

⟨dhl 8dhl ⟩ ⊙ ⟨xl−1 8xl−1 ⟩

for each a ∈ [M]. This expression was concurrently derived in [28]. However, when batch size is
larger than 1, KQ (χ) is no longer linear in sign(χ) generally, and there is no simplification like this.
In particular, in the continuous time gradient flow setting, SignSGD with a large batch size is not
equivalent to that with batch size 1 but very small learning rate, in contrast to SGD.
We can now state the generalized Neural Tangent limit for memoryless stationary updates. In
particular, this covers SGD and SignSGD (Eq. (SignSGD)).
Theorem 2.4.7 (Neural Tangent Limit, Memoryless Stationary Case). Consider any training
routine (Setup 2.3.1) with memoryless stationary update function Q (Definition 2.1.1). Adopt
Assumption 2.3.2. Then
d

f0 −
→ N (0, ⟨xL 8xL ⟩)

and for every t, ft converges almost surely to random function f˚t ∈ RM satisfying
f˚t+1 − f˚t = −ηKQ (εt (f˚t )),

for all t.

(2.9)

The proof can be found in Section 3.3. Note, as in the SGD case, f˚t is deterministic conditioned
on f˚0 . We remind the reader that Eq. (2.9) simultaneously covers full batch, mini-batch, train-test
split, and other schemes by changing εt , as discussed under Setup 2.3.1. This will be the same for all
theorems in this work.
9

Again, χ is a row vector. In prior works, it’s usually treated as a column vector in which case one would
write Kχ instead.

17

Memoryful Nonstationary Case The memoryless stationary condition allowed a clean
mathematical formulation of the NT limit. But we can remove it easily at the cost of some more
notation.
Definition 2.4.8 (Neural Tangent Operator, Memoryful Nonstationary Case). For memoryless but
nonstationary update functions Qt = {Qlt : R → R}l , we define KQt : RM → RM with the same
equation as Eq. (2.8), except the bar notation abbreviates Qlt where l is the same as in the dhl under
the bar.
For general update functions Qt = {Qlt : Rt+1 → R}l , we define KQt : R(t+1)×M → RM ,
def
KQt (χ0 , . . . , χt ) =
Diag

L+1
X
l=1

⟨dhl 8dhl ⟩ χ≤t ⟨xl−1 8xl−1 ⟩

(2.10)


where 8dhl ⟩ χ≤t ⟨xl−1 8 is shorthand for Qlt 8dhl ⟩ χ0 ⟨xl−1 8, . . . , 8dhl ⟩ χt ⟨xl−1 8 .
With this in mind, the following theorem yields the NT limit of Adam (Eq. (Adam)) as a corollary.
Theorem 2.4.9 (Neural Tangent Limit, Memoryful Nonstationary Case). If the update functions Q
are memoryless but not necessarily stationary, then Theorem 2.4.7 holds with Eq. (2.9) replaced by
f˚t+1 − f˚t = −ηKQt (εt (f˚t )),

for all t.

(2.11)

For general Q, not necessarily memoryless, Theorem 2.4.7 holds with Eq. (2.9) replaced by
f˚t+1 − f˚t = −ηKQt (ε0 (f˚0 ), . . . , εt (f˚t )),

for all t.

(2.12)

The proof is a straightforward adaptation of the proof of Theorem 2.4.7 in Section 3.3.
2.4.3

Lack of Feature Learning

Just as for the SGD case, the neural tangent limit cannot learn features, for example, in the sense
that the feature kernel (the Gram matrix of the input representations) does not evolve during training
(Theorem 2.8.19). Likewise, pretraining is futile in this limit as finetuning it would be no different
than finetuning a randomly initialized network (Remark 2.8.22). Nevertheless, the NT limit is
“maximal” among all nondegenerate limits without feature learning in that all other limits are just
given by a neural tangent operator that involves a subsum of Eq. (2.8) (Remark 2.8.21).

2.5

Maximal Update

As for NTP, the “classical” maximal update (abc-)parametrization can be generalized easily to an
abcd-parametrization using the intuition that the input to any nonlinear update function should be
Θ(1) (c.f. Definition 2.8.8 and Lemma 2.8.11). After defining this generalization next, we study its
limit for shallow MLP. The deep case will have to wait until we develop the new Tensor Program
theory in the next section.
Definition 2.5.1. The maximal update abcd-parametrization (µP) is defined (modulo Eq. (2.5)) by
l
al
bl
cl
dl

[2, L]

1

L+1

0

0
0
0
1

1
0
0
1

1/2

1
1

Recovering “Classical” µP If we assume that the Adam update function (Eq. (Adam)) is perfectly
scale-invariant, then the dl row can be dropped, yielding [47, Table 8] regarding Adam LR scaling.
To recover the abc version of µP in [45, Table 1] for SGD, just apply Eq. (2.5) to the l = 1, L + 1
columns with θ = −1/2 and then apply Eq. (2.6) (i.e., subtracting the last 2 rows).
18

2.5.1

Shallow Infinite-Width Limit

We focus on the shallow case first because its µ-limit is fairly easy to describe. We shall cover the
general case after we describe the outer product tensor program N E⊗OR⊤ in Section 2.6. Adopt the
following leaner notation:
f (ξ) = (1/n)v ⊤ x(ξ),
for trainable parameters u ∈ R

n×d

,v ∈ R

n×1

x(ξ) = ϕ(h(ξ)),

h(ξ) = uξ,

with initialization u, v ∼ N (0, I).

(2.13)
10

The following general theorem covers the µ-limit for SGD (Q = id) and SignSGD (Eq. (SignSGD)).
Theorem 2.5.2 (Shallow µ-Limit, Memoryless Stationary Case). Consider any training routine
(Setup 2.3.1) with memoryless stationary update function Q (Definition 2.1.1).
Adopt
Assumption 2.3.2. As n → ∞, ft for the network in Eq. (2.13) converges almost surely to some f˚t
for every t, which is recursively defined from t = 0 by the following dynamics:
1. (Forward and Backward Propagation)
χ̊t = εt (f˚t ) ∈ RM , f˚t = ⟨vt 8xt ⟩ ∈ RM , 8xt ⟩ = ϕ(8ht ⟩) ∈ RM , 8ht ⟩ = 8ut ⟩ξ ∈ RM
2. (Parameter Updates)
8ut+1 ⟩ = 8ut ⟩ − η8vt ⟩ϕ′ (8ht ⟩)χ̊t ξ ⊤ ∈ Rd

(2.14)

8vt+1 ⟩ = 8vt ⟩ − η8xt ⟩ · χ̊t ∈ R

(2.15)

where the bar notation (Eq. (1.2)) abbreviates application of Q and · denotes dot product.
3. (Initialization)
(8v0 ⟩, 8u0 ⟩) = N (0, I)
Again, one can note that if Q is identity, then we recover the SGD equations from [45, Theorem 6.1].
The proof of Theorem 2.5.2 is given in Section 3.2. This can be adapted straightforwardly to cover
the nonstationary or memoryful cases:
Theorem 2.5.3 (Shallow µ-Limit, Memoryful Nonstationary Case). If Q is memoryless but not
stationary, then Theorem 2.5.2 holds if the bar in Eq. (2.15) (resp. Eq. (2.14)) is interpreted as Q2t
(resp. Q1t ).
If Q is not memoryless, then Theorem 2.5.2 holds if Eqs. (2.14) and (2.15) are replaced with
8ut+1 ⟩ = 8ut ⟩ − η8v≤t ⟩ϕ′ (8h≤t ⟩)χ̊≤t ξ ⊤ ∈ R
8vt+1 ⟩ = 8vt ⟩ − η8x≤t ⟩ · χ̊≤t ∈ R

where the bar notations abbreviate

8v≤t ⟩ϕ′ (8h≤t ⟩)χ̊≤t ξ ⊤ = Q1t 8v0 ⟩ϕ′ (8h0 ⟩)χ̊0 ξ ⊤ , . . . , 8vt ⟩ϕ′ (8ht ⟩)χ̊t ξ ⊤



8x≤t ⟩ · χ̊≤t = Q2t (8x0 ⟩ · χ̊0 , . . . , 8xt ⟩ · χ̊t )

Remark 2.5.4. Theorem 2.5.2 and 2.5.3 also hold if the output dimension is greater than 1, in which
case the equations should be interpreted slightly differently; see Eq. (2.35).

2.6

N E⊗OR⊤: Tensor Program with Nonlinear Outer Products

As mentioned above, the gradient processing done by entrywise optimizers in general cannot be
expressed previously by even the most expressive Tensor Program language. Here we fix this issue
by adding “nonlinear outer products” to Tensor Programs. Like in previous works, we algebraically
construct such programs’ limit objects (“kets”, in our new notation) and link them to the analytic
properties of vectors in the corresponding programs via a Master Theorem. Unlike previous works,
we also construct the limits of matrices, which are operators on kets. This is purely a conceptual
change, but this perspective helps express the deep µ-limit much more efficiently than possible before.
10

Again, more generally, we can insert constants in this parametrization, like h(ξ) = √1d uξ or uα ∼
N (0, 1/d), but we omit them here for simplicity.

19

2.6.1

The N E⊗OR⊤ Language

Definition 2.6.1. A N E⊗OR⊤ program generates a sequence x of Rn -vectors and a sequence c of
R-scalars inductively defined via one of the following ways from an initial set c0 ⊆ c of random
scalars, an initial set x0 ⊆ x of random Rn vectors, and an initial set W of random Rn×n matrices.11
We will think of c as a vector and x as a matrix with the Rn vectors as columns; then c0 is just a
subvector of c and x0 is a submatrix of x. At each step of the program, one can
Avg choose a vector x ∈ x (think of x as a column in x ∈ Rn×|x| ) and append to c a scalar12
n

1X
xα ∈ R
n α=1

(2.16)

MatMul choose a matrix W ∈ W and vector x ∈ x, and append to x the vector
W x ∈ Rn

or W ⊤ x ∈ Rn

OuterNonlin choose integer r ≥ 0 and function ψ : R|x|(r+1)+l → R; append to x the vector13
n

y∈R ,

1
yα = r
n

n
X

ψ(xα ; xβ1 ; ...; xβr ; c)

(2.17)

β1 ,...,βr =1

where xγ is the γth row in x as a matrix and |x| is the number of vectors in x. We call r + 1
the order of ψ in this context.
Note that while Definition 2.6.1 doesn’t directly give an instruction to transform scalars into scalars
(in contrast to MatMul and OuterNonlin that transforms vectors into vectors), this can be done by
combining instructions.
Lemma 2.6.2. If ψ : R|c| → R and c are the scalars in a N E⊗OR⊤ program, then ψ(c) ∈ R can be
introduced as a new scalar in the program.
Proof. Think of ψ as a function that ignores vector arguments and depend only on scalars, and use it
in OuterNonlin to create the vector whose entries are identically equal to ψ(c). Applying Avg to
this vector gives the desired result.
2.6.2

Setups

We are interested in the behavior of N E⊗OR⊤ programs in two typical settings:
Setup 2.6.3 (Gaussian). Assume14
1. Every entry of every W ∈ W is sampled iid from N (0, 1/n).
2. Every entry of every initial vector x ∈ x0 is sampled iid from N (0, 1).
3. The initial scalars c0 converge almost surely to 0.
4. All functions ψ used in OuterNonlin are pseudo-Lipschitz.
Setup 2.6.4 (Non-Gaussian). Assume the same as Setup 2.6.3 but replace 1) and 4) with
11

which will be sampled with iid Gaussian entries in Setup 2.6.3 or general non-Gaussian entries in Setup 2.6.4.
We replaced the Moment instruction of N ETSOR⊤+ with Avg here, but there is no loss of expressivity since
Moment is just a composition of Avg and Nonlin+
13
We can equivalently allow x in each slot below to be different multi-vectors (which are subsets of x), since
ψ here can just be chosen to ignore the irrelevant subsets of x. For notational simplicity, we don’t do this.
0
14
Compared to [44], we have WLOG simplified the setup by assuming 1) σW = 1 for every W , 2) Z x =
0
0
8x ⟩ = N (0, I), and 3) θ̊ = 0 for every θ ∈ c . This is WLOG because σW , θ̊, and the mean and covariance
of 8x0 ⟩ can all be absorbed into OuterNonlin via the appropriate linear functions.
12

20

1*. there exists a sequence ν3 , ν4 , . . . > 0 such that all matrices have independent entries15
drawn from distributions with zero mean, variance n−1 , and all higher kth moment bounded
by νk n−k/2 ; and16
4*. All functions ψ used in OuterNonlin are polynomially smooth.17
We further require initial scalars c0 to have moments of all orders bounded in n.18
While Setup 2.6.4 allows more general distributions for matrix entries, its nonlinearities need to have
more smoothness than Setup 2.6.3. See [12] for more discussions on these setups.
2.6.3

Limit Objects

As before, when the width n of the program goes to infinity, one can infer how the program behaves
via a calculus of random variables. We define them below via the new ket notation instead of the
earlier Z notation.
Definition 2.6.5 (Ket Construction). We recursively define the random variable 8x⟩ (called a ket)
for each vector x and deterministic number θ̊ for each scalar θ in the program. For a vector W x
produced by MatMul, we also define random variables 8W xˆ⟩ and 8W x˙⟩ (called hat-ket and dot-ket
respectively) such that 8W x⟩ = 8W xˆ⟩ + 8W x˙⟩. Their recursive definitions are given below.
0

0

def
def
0 ∈ R|c | .19
N (0, I) ∈ R|x | and c̊ =
Init 8x0 ⟩ =
def
Avg If θ is generated by Avg as in Eq. (2.16), then θ̊ =
E 8x⟩ = ⟨18x⟩.

OuterNonlin If x is generated by OuterNonlin as in Eq. (2.17), then
def
f (8x⟩)
8x⟩ =

where

def
E ψ(y; 8x⟩ 1 ; · · · ; 8x⟩ r ; c̊).20
f : R|x| → R, f (y) =

Hat All hat-kets are jointly Gaussian with zero-mean and covariance21
Cov(8W xˆ⟩, 8U yˆ⟩) = I(W = U )⟨x8y⟩

(2.18)

Dot Every dot-ket is a linear combination of previous kets, expressed by the following equation
def
8W x˙⟩ =
8x⟩⟨∇W ⊤ x 8x⟩

(2.19)

Eq. (2.19) is the same equation [45, Zdot] but formulated much more succinctly in the bra-ket
notation:
X
∂Z x
[45, Zdot], Ż W x =
Zy E
,
∂ Ẑ W ⊤ y
y∈x
X
∂8x⟩
or, in scalar ket notation, 8W x˙⟩ =
8y⟩ E
.
∂8W ⊤ yˆ⟩
y∈x
15

For all of our results, it does not matter how the matrices for different n are correlated, e.g., whether they
are independent or the matrices are all upper left submatrix of fixed infinite iid matrix. This is because our proof
only depends on how moments of vectors behave with n, which does not care about such inter-n correlations.
16
Initial vectors are still sampled from N (0, 1), as in [12].
17
Recall from [12] that f : Rk → R is polynomially smooth if it is C ∞ and its partial derivatives of any order
are polynomially bounded. See [12].
18
But the moments do not need to be bounded as a function of the order.
19
These Init rules depend on the fact that, in Setup 2.6.3 and Setup 2.6.4, initial vectors are sampled with
variance 1 and initial scalars converge to 0.
20
recall (Section 1.2.2) 8x⟩ 1 , · · · , 8x⟩ r are iid copies of 8x⟩, which is the tuple (8x1 ⟩, 8x2 ⟩, . . .)
21
In Eq. (2.18), I(W = U ) is the deterministic number that is 1 iff W and U are the same matrix (as symbols
in the program) and 0 otherwise. This should not be interpreted as a random variable that is 1 precisely when W
and U take the same values.

21

To arrive at the presentation Eq. (2.19), we think of E

∂8x⟩
as ⟨∂8W ⊤ yˆ⟩ 8x⟩ for a “generalized bra”
∂8W ⊤ yˆ⟩

⟨∂8W ⊤ yˆ⟩ 8, and group together 1) all kets 8y⟩ as 8x⟩ and 2) all the bras ⟨∂8W ⊤ yˆ⟩ 8 (over all y ∈ x)
P
as a multidimensional bra written simply as ⟨∇W ⊤ x 8. Then the sum y can be straightforwardly
rewritten as the “ket outer product” described in Section 1.2.1.
ˆ ⊤ x8 in the sense
Remark 2.6.6 (Alternative Notation). The bra ⟨∇W ⊤ x 8 is really the “dual” of ⟨W
22
that
ˆ ⊤ x8y⟩,
for any ket 8y⟩, ⟨x8x⟩⟨∇ ⊤ 8y⟩ = ⟨W
W x

or, in short,

⟨x8x⟩⟨∇W ⊤ x 8 = ˆ
⟨W ⊤ x8

This follows from Stein’s lemma.23 Thus, a more appropriate notation for ⟨∇W ⊤ x 8 is perhaps
def
ˇ ⊤ x8 =
⟨W
⟨∇W ⊤ x 8,

so that

ˇ ⊤ x8 = ⟨W
ˆ ⊤ x8
⟨x8x⟩⟨W
and Eq. (2.19) reads
def
ˇ ⊤ x8x⟩ = 8x⟩⟨x8x⟩+ ⟨W
ˆ ⊤ x8x⟩.
8W x˙⟩ =
8x⟩⟨W

However, this “duality” is not essential for understanding this paper, so we keep the more intuitive
notation ⟨∇W ⊤ x 8 instead.
Definition 2.6.7. Let W be an initial matrix in a N E⊗OR⊤ program. We define 8W 8 to be the linear
operator on kets24 that acts by
def
8W 8x⟩ =
8W x⟩ = 8W xˆ⟩ + 8W x˙⟩.

Any linear operator that is equal to 8W 8 for some initial matrix W is called an initial operator. A set
of initial operators is called independent if their corresponding initial matrices are distinct.25
We have already seen an example of a linear operator on kets: expressions like 8y⟩ χ ⟨z8.
Definition 2.6.7 puts 8W 8 in the same space as 8y⟩ χ ⟨z8. This allows us to add them in the sequel,
which simplifies the presentation of the µ-limit.
We can immediately see a few properties of 8W 8 by considering the counterpart when n is finite.
Proposition 2.6.8. For any initial matrix W , the operator 8W 8 is bounded.26
Proof. This follows from the classical operator norm tail bounds on iid random matrices (see, e.g.,
[38]), which passes to the limit via Theorem 2.6.10 below.
Proposition 2.6.9. For any initial matrix, the operator 8W ⊤ 8 is the adjoint27 of the operator 8W 8.
a.s.

a.s.

Proof. By Theorem 2.6.10 below, n1 ⟨x, W y⟩ −−→ ⟨x8W y⟩ and n1 ⟨W ⊤ x, y⟩ −−→ ⟨W ⊤ x8y⟩. Since
⟨x, W y⟩ = ⟨W ⊤ x, y⟩ for any n, we have
⟨x8W y⟩ = ⟨W ⊤ x8y⟩,
i.e., 8W ⊤ 8 is the adjoint of 8W 8.

But note this identity only holds when x contains all vectors z where 8y⟩ depends on 8W ⊤ zˆ⟩.
In the language of Riemannian geometry, if we think of ⟨x8x⟩ as a metric tensor in a Riemannian manifold,
then ⟨∇W ⊤ x 8 is obtained from ˆ
⟨W ⊤ x8 by “lowering the index.”
24
To be rigorous, we need to specify the “Hilbert space” of kets. This is somewhat pedantic and not crucial
to the key points of this paper, but the Hilbert space can be constructed as follows: Let σ(π) be the σ-algebra
S
generated by the kets of the program π. Let Σ(π) def
= π′ ⊇π σ(π) be the union (more precisely, the direct
limit) of σ(π ′ ) over all programs π ′ extending π. Then the Hilbert space in question is the L2 space of random
variables over the Σ of our program.
25
i.e., independently sampled in Setup 2.6.3 or Setup 2.6.4.
26
i.e., there exists real number L > 0 such that for any ket 8x⟩, ⟨W x8W x⟩ ≤ L⟨x8x⟩.
27
“adjoint” in the sense of Hilbert space operators; see Footnote 24.
22

23

22

2.6.4

The Master Theorem

Our key foundational result is that the Master Theorem of earlier Tensor Programs generalizes to
N E⊗OR⊤ programs. This underlies all of our theorems about adaptive optimization.
Theorem 2.6.10 (N E⊗OR⊤ Master Theorem). Consider a N E⊗OR⊤ program with (Gaussian)
Setup 2.6.3 or (non-Gaussian) Setup 2.6.4. Then, as n → ∞, its scalars c satisfy
a.s.

c −−→ c̊.
In Setup 2.6.4, this convergence also happens in Lp for every p ∈ [1, ∞). In either setup, if the initial
scalars are all Õ(n−1/2 ) (Definition 1.2.5), then
c − c̊ = Õ(n−1/2 )
as well.
Remark 2.6.11. If the initial scalars are Õ(n−1/2 ), then we can almost say that the distribution
of c converge to the delta distribution on c̊ in Wasserstein distance, at a rate of Õ(n−1/2 ). See
Section 4.3.4. An analogous Õ(n−1/2 )-convergence result also holds for vectors converging to their
kets (in a suitable sense). See Lemma 4.8.2.

2.7

Maximal Update for Deep MLP

In this section we describe the infinite-width limit of µP for arbitrarily deep MLP. The main difference
here compared to the shallow case (Section 2.5.1) is the presence of n × n iid matrices in the middle
of the network, which behaves like initial operators (Definition 2.6.7) in the limit.
Theorem 2.7.1 (Deep µ-Limit, Memoryless Stationary Case). Consider any training routine
(Setup 2.3.1) with memoryless stationary update function Q (Definition 2.1.1).
Adopt
Assumption 2.3.2. As n → ∞, ft converges almost surely to some f˚t for every t, which is recursively
defined from t = 0 by the following dynamics:28
1. (Forward and Backward Propagation)
f˚t = ⟨wtL+1 8xL
t ⟩,
8h1t ⟩ = 8wt1 ⟩ξ,

L+1
8dxL
⟩ ⊗ 1M ,
t ⟩ = 8wt

χ̊t = εt (f˚t )

8hlt ⟩ = 8Wtl 8xl−1
t ⟩,

l⊤
l
8dxl−1
t ⟩ = 8Wt 8dht ⟩,

8xlt ⟩ = ϕ(8hlt ⟩),

8dhlt ⟩ = 8dxlt ⟩ ⊙ ϕ′ (8hlt ⟩).

2. (Parameter Updates)
1
8wt+1
⟩ = 8wt1 ⟩ − η8dh1t ⟩χ̊t ξ ⊤

l
8Wt+1
8 = 8Wtl 8 − η8dhlt ⟩ χ̊t ⟨xl−1
t 8, ∀l ∈ [2, L]

L+1
8wt+1
⟩ = 8wtL+1 ⟩ − η8xL
t ⟩ · χ̊t .

(2.20)
(2.21)
(2.22)

3. (Initialization) 8W02 8, . . . , 8W0L 8 are independent initial operators (Definition 2.6.7), and
(8w01 ⟩, 8w0L+1 ⟩) = N (0, I).
One can check that when L = 1, we recover Theorem 2.5.2.
28
We remind the reader that, in µP (Definition 2.5.1), wtL+1 is the output layer weights normalized so that
L+1
wt
has Θ(1)-sized entries (whereas WtL+1 = n1 wtL+1 ). The same point applies to wt1 (but Wt1 = wt1 ). We

use lower case w for input and output weights while upper case W for other layers to emphasize that the former
are vector-like parameters (one dimension going to ∞) while others are matrix-like (two dimensions going to
∞).

23

Here, Eq. (2.21) uses the operator semantics discussed in and below Definition 2.6.7 to cleanly
express the parameter update. When unwinded, Eq. (2.21) is equivalent to
8hlt ⟩ = 8W0l xl−1
t ⟩−η
l⊤
l
8dxl−1
t ⟩ = 8W0 dht ⟩ − η

t−1
X
s=0

l−1
8dhls ⟩ χ̊s ⟨xl−1
s 8xt ⟩

t−1
X
s=0

l
l
8xl−1
s ⟩ χ̊s ⟨dhs 8dht ⟩.

The proof of Theorem 2.7.1 and Theorem 2.5.2 can be found in Section 3.2.
Remark 2.7.2 (µP is Most Natural). Observe that all of the equations above are essentially the “ket”
versions of what one does in a finite network. This holds for general architectures: the µ-limit can
always be obtained straightforwardly transcribing the tensor operations in a finite network to their
counterparts acting on kets in the infinite-width limit. See Theorem 2.9.25. In this sense, µP is the
most natural parametrization.
As before, the general case without stationarity or memorylessness is straightforward given
Theorem 2.7.1, albeit with some more notation.
Theorem 2.7.3 (Deep µ-Limit, Memoryful Nonstationary Case). If Q is memoryless but not
stationary, then Theorem 2.7.1 holds if the bars in Eqs. (2.20) to (2.22) are interpreted as Qlt
l
l
(where l is the same as the layer index appearing in Wt+1
or wt+1
on the LHS).
If Q is not memoryless, then Theorem 2.7.1 holds if Eqs. (2.20) to (2.22) are replaced with
1
8wt+1
⟩ = 8wt1 ⟩ − η8dh1≤t ⟩χ̊≤t ξ ⊤

l
8Wt+1
8 = 8Wtl 8 − η8dhl≤t ⟩ χ̊≤t ⟨xl−1
≤t 8, ∀l ∈ [2, L]

L+1
8wt+1
⟩ = 8wtL+1 ⟩ − η8xL
≤t ⟩ · χ̊≤t

where the bar notations abbreviate
8dh1≤t ⟩χ̊≤t ξ ⊤ = Q1t 8dh10 ⟩χ̊0 ξ ⊤ , . . . , 8dh1t ⟩χ̊t ξ ⊤



l−1
l−1
l
l
l
8dhl≤t ⟩ χ̊≤t ⟨xl−1
≤t 8 = Qt 8dh0 ⟩ χ̊0 ⟨x0 8, . . . , 8dht ⟩ χ̊t ⟨xt 8

L+1
L
8xL
8xL
0 ⟩ · χ̊0 , . . . , 8xt ⟩ · χ̊t .
≤t ⟩ · χ̊≤t = Qt



Remark 2.7.4. Theorem 2.5.2 and 2.5.3 also hold if the output dimension is greater than 1, but the
equations need to be interpreted slightly differently. See Eq. (2.35).
Remark 2.7.5 (What is µP “maximal” in?). For SGD, [45] showed µP is the unique stable
parametrization where every weight matrix is updated maximally [45, Defn 5.2] and the output
weight matrix is also initialized maximally [45, Defn 5.4]. These definitions still make sense here and
this statement holds as well if “stable” is replaced with “stable and faithful” (Definition 2.8.7, 2.8.8).

2.8

Dynamical Dichotomy: The Classification of abcd-Parametrizations

In this section, we characterize the infinite-width limits of all possible abcd-parametrizations under
reasonable assumptions of the optimizer and network nonlinearity, generalizing the work done
for SGD in [45]. First, we filter out the uninteresting limits: the unstable (training blows up),
the trivial (training gets stuck at initialization), and the unfaithful (the update functions Q and/or
nonlinearities ϕ are trivialized). We sort all other limits into a Dynamical Dichotomy (Corollary 2.8.20)
between feature learning and operator regimes (the latter being the nonlinear version of kernel regime
in the SGD case). The µ and NT limits are respectively their archetypes (indeed, the maximal
parametrizations in these regimes (Remark 2.8.21)). Like in the SGD case, this dichotomy is not
tautological: it implies certain network training dynamics cannot be the infinite-width limit of any
abcd-parametrization (Remark 2.8.24). Likewise, pretraining is still futile in the operator regime even
with adaptive optimizers (Remark 2.8.22).
Our results here hold for not only memoryless stationary but also memoryful nonstationary updates.
24

2.8.1

Technical Assumptions

Definition 2.8.1. We say a function F : R → R preserves positivity if F (x) > 0 whenever x > 0.
We say it preserves sign if sign F (x) = sign(x) for all x (where sign takes value in {−1, 0, 1}).
For proving the Dynamical Dichotomy Theorem for entrywise updates, we will make the following
technical assumptions. Roughly speaking, we will focus only on “relu-like” nonlinearities and
sign-preserving update functions with mild smoothness.
Assumption 2.8.2. Suppose
1. ϕ and ϕ′ are nonnegative and pseudo-Lispchitz.
2. ϕ preserves positivity.
3. There exists δ > 0 such that tδ ϕ(x/t) converges uniformly (as a function in x ∈ R) to
relu(x)δ as t → 0.
4. Qlt is pseudo-Lipschitz for all l, t, and Ql0 preserves sign for all l.
Remark 2.8.3 (Sufficiency). As in [45], the pseudo-Lipschitzness of ϕ, ϕ′ , Qlt are sufficient for letting
us use our new Master Theorem (Theorem 2.6.10) to take the limits of any parametrization, get the
operator limits, and prove their properties. Any assumptions beyond such is required only for proving
that r = 0 implies feature learning (Theorem 3.1.3). In particular, the reason we only require Ql0 to
preserve signs (instead of for all t) is because we will only need to show that features evolve in the
first step.
Remark 2.8.4 (Necessity). Assumption 2.8.2 is satisfied by typical smooth versions of relu like gelu
and its powers. However, note that these are only a specific set of conditions that allow us to easily
prove our desired result and are likely very far from a necessary set of conditions. For example,
1) the pseudo-Lipschitz conditions can likely be relaxed to allow ϕ = relu and Qlt = sign, and 2)
the uniform convergence in Assumption 2.8.2 certainly can be relaxed to some measure-theoretic
convergence. In fact, we expect all theorems below in this section to hold for generic activations and
update functions. We leave this to future work.
2.8.2

Size of Feature Learning

In [45], the number r of an abc-parametrization measures how much the features change over training.
We adapt its definition to abcd-parametrizations.
Definition 2.8.5. Define

l
cl + al − 1 if l > 1
def
def
def
rl =
, r≤l =
min rl , r =
r≤L
m=1
cl + al
if l = 1
Morally, in any “reasonable” abcd-parametrization (in the sense of stable (Definition 2.8.7) and
−r
faithful (Definition 2.8.8) discussed below), we have ∆Wtl xl−1
= Θ(n−rl ) and ∆xL
),
t
t = Θ(n
where ∆•t = •t − •0 is the cumulative change of •t . Concretely, for NTP and µP we have, for all
l ∈ [1, L],
r = rl = 1/2 in NTP (Definition 2.4.1)

r = rl = 0 in µP (Definition 2.5.1)

(2.23)

The reader should sanity check that rl and r are invariant to the symmetry in Eq. (2.5).
Remark 2.8.6. Ostensibly, Definition 2.8.5 is different from and much simpler than [45, Defn 3.2] for
abc-parametrizations. But, in fact, they are equivalent for stable and faithful abcd-parametrizations
(under the reduction Eq. (2.6) to abc-parametrizations). The comparative simplicity of Definition 2.8.5
is also due to the faithfulness.
2.8.3

Stability and Faithfulness

We will only care about any parametrization satisfying two basic properties: 1) does not blow up
during at initialization or during training as width → ∞ and 2) does not trivialize the update functions
Qlt . The former property is known as stability and has already been studied in [45] for SGD. The latter
is specific to nonlinear entrywise updates, and we will call this the faithful property. By “trivialize,”
25

we mean that the input to Qlt is either i) too small and thus linearizing Qlt around the origin or ii) too
large and only depends on Qlt ’s behavior “around infinity”. Both scenarios ignore the bulk of Qlt ’s
values as a function. If such behaviors are actually desired, then one can change Qlt to such effects.
For example, the linearizing behavior in case i) can be implemented by choosing a linear Qlt and
modifying cl , dl appropriately so that the input to Qlt has constant typical size (wrt width).
Recall from Section 1.2.3 the entry-wise semantics of big-O notation. We formalize the stability and
faithfulness properties below.
Definition 2.8.7 (Stability). We say an abcd-parametrization of an L-hidden layer MLP is
1. stable at initialization if
hl0 , xl0 = Θ(1), ∀l ∈ [L],

and f0 = O(1).

(2.24)

2. stable during training if for any training routine, any time t ≥ 0, l ∈ [L], we have
∆hlt , ∆xlt = O(1), ∀l ∈ [L],

and ∆ft = O(1).

We say the parametrization is stable if it is stable both at initialization and during training.
Definition 2.8.8. We say an abcd-parametrization is faithful at time t if the input to Qlt is Θ(1) for
every l ∈ [L]. We also say it is faithful at initialization if this is true at t = 0.
Remark 2.8.9. The condition hl0 , xl0 = Θ(1) in Eq. (2.24) is in truth more of a “faithfulness to ϕ”
condition than just stability (which would strictly speaking be more like O(1) than Θ(1)). But we
never need to distinguish these notions, so following [45], we will keep the definition as is.
Lemma 2.8.10. Adopt Assumption 2.8.2. An abcd-parametrization is stable at initialization iff
a1 + b1 = 0;

al + bl = 1/2, ∀l ∈ [2, L];

and aL+1 + bL+1 ≥ 1/2.

(2.25)

This condition is the same as [45, Thm H.6(1)]. For example, SP, NTP, and µP are all stable
at initialization. In this situation, some easy calculation shows that, at initialization, the last
layer gradients have entry size Θ(n−aL+1 ) and while all other layers’ gradients have entry size
Θ(n−al −aL+1 −bL+1 ). Hence,
Lemma 2.8.11. In Lemma 2.8.10, the abcd-parametrization is furthermore faithful at initialization
iff
dl = al + aL+1 + bL+1 for l ≤ L and dL+1 = aL+1 .
(2.26)
For example, NTP and µP are faithful at initialization but SP (Example 2.2.2) is not (but if Q is scale
invariant then SP is equivalent to a faithful parametrization).
Theorem 2.8.12 (Stability and Faithfulness Characterization). Adopt Assumption 2.8.2. Suppose, at
initialization, an abcd-parametrization is both faithful and stable. Then it remains so for all t ≥ 1 iff
rl ≥ 0 for all l ∈ [L + 1]

and aL+1 + bL+1 + r ≥ 1

and bL+1 ≤ cL+1 .

(2.27)

In words: 1) rl ≥ 0 for all l ∈ [L] ensures the features do not blow up, while 2) rL+1 ≥ 0 and
L+1
29
aL+1 + bL+1 + r ≥ 1 resp. ensure that WtL+1 xL
∆xL
t , W0
t = O(1), so ft does not blow up;
L+1
finally, 3) bL+1 ≤ cL+1 ensures that W
does not change scale after updates, since otherwise the
dl in Eq. (2.26) is no longer faithful.
Remark 2.8.13. One can check that Theorem 2.8.12 reduces to [45, Thm 3.3] (the stability
characterization of abc-parametrizations) plus the additional constraint that WtL+1 = O(W0L+1 ) for
all t (which is imposed by bL+1 ≤ cL+1 in Eq. (2.27)). As remarked above, this constraint is due to
the faithfulness requirement. But in fact, if we allow dl to vary during training, then this constraint
can be removed and the appropriate version of Theorem 2.8.12 would be equivalent to [45, Thm 3.3].
29

Recall ∆•t = •t − •0 is the cumulative change of •t .

26

2.8.4

Nontriviality

Even among stable and faithful parametrizations, we are only interested in nontrivial parametrizations
(as in [45]), where in the infinite width limit the network will not be stuck at initialization during
training.
Definition 2.8.14 (Nontriviality). We say an abcd-parametrization of an L-hidden layer MLP is
a.s.
trivial if for every training routine and any time t ≥ 1, ft − f0 −−→ 0 as n → ∞ (i.e., the function
does not evolve in the infinite-width limit). We say the parametrization is nontrivial otherwise.
Nontriviality is characterized by a disjunction of equations in al , bl , cl , just as for SGD in [45].
Theorem 2.8.15. Adopt Assumption 2.8.2. A stable and faithful abcd-parametrization is nontrivial iff
aL+1 + cL+1 = 1 or aL+1 + bL+1 + r = 1.

(2.28)

This is essentially equivalent to [45, Thm 3.4]. For example, NTP and µP are both nontrivial.
2.8.5

Feature Learning and Operator Regimes

Finally, we ask: what are the different possible behaviors among the nontrivial, stable, and faithful
parametrizations? As in [45], we will see a dichotomy between feature learning and a nonlinear
version of the kernel regime which we call the operator regime.
Definition 2.8.16 (The Operator Regime). For memoryless stationary updates, we say an abcdparametrization of an L-hidden layer MLP is in the operator regime if there exists a function
K : RM → RM , which we call an operator, such that for all training routines and every t ≥ 0, as
width n → ∞,
a.s.
ft+1 − ft − ηK(ft ) −−→ 0.
(2.29)
For memoryless, nonstationary updates, we allow K to depend on t. For general entrywise updates,
we make the same definition if for all t,
a.s.

ft+1 − ft − ηKt (f0 , . . . , ft ) −−→ 0.
for some Kt : R

(t+1)×M

(2.30)

M

→R .

Notice that the operator regime is defined solely in the function space, without talking about the
internals of the network, in contrast to feature learning.
Definition 2.8.17 (Feature Learning). We say an abcd-parametrization of an L-hidden layer MLP
admits feature learning in the lth layer if there exists some training routine such that
∆xlt = Ω(1)

(2.31)

for some t ≥ 0. We say the parametrization admits feature learning if it does so in any layer.
We say the parametrization fixes the lth layer features if for all training routine,
a.s.

∥∆xlt ∥2 /n −−→ 0
for all t ≥ 0. We say the parametrization fixes all features if it does so in every layer.
We make similar definitions as above replacing feature with prefeature and xl with hl .
Definition 2.8.18 (Feature Kernel Evolution). We say an abcd-parametrization of an L-hidden layer
MLP evolves the lth layer feature kernel if there exists some training routine such that
l⊤ l
xlt xl⊤
t /n − x0 x0 /n = Ω(1)

for some t ≥ 0. We say the parametrization evolves feature kernels if it does so in any layer.
We say the parametrization fixes the lth layer feature kernel if for all training routine,
a.s.

l
l⊤ l
xl⊤
−→ 0,
t xt /n − x0 x0 /n −

as n → ∞,

for all t ≥ 0. We say the parametrization fixes all feature kernels if it does so in every layer.
We make similar definitions as above replacing feature with prefeature and xl with hl .
2.8.6

Classification of abcd-Parametrizations
27

The classification of abcd-parametrizations is similar to that of
abc-parametrizations [45, Thm H.13]. We remind the reader
that this holds for not only memoryless stationary but more
generally memoryful nonstationary updates.

Unstable,
Unfaithful, or
Trivial

Maximal
Update

Fe
re

u
at

Theorem 2.8.19. Adopt Assumption 2.8.2. Consider a
nontrivial, stable, and faithful abcd-parametrization of an Lhidden layer MLP. Then

Space of abcd-Parametrizations

(a) the operator regime
(b) fixes all features
(c) fixes features in the Lth layer
(d) fixes all feature kernels
(e) fixes feature kernel in the Lth layer
(f) fixes all prefeatures
(g) fixes prefeatures in the Lth layer
(h) fixes all prefeature kernels
(i) fixes prefeature kernel in the Lth layer

ing

2. The following are equivalent to r > 0

Standard

n
ar

(a) feature learning
(b) feature learning in the Lth layer
(c) feature kernels evolution
(d) feature kernel evolution in the Lth layer
(e) prefeature learning
(f) prefeature learning in the Lth layer
(g) prefeature kernels evolution
(h) prefeature kernel evolution in the Lth layer

Le

Operator
Regime

1. The following are equivalent to r = 0

Neural
Tangent

Figure 2.1:
A Caricature
of
abcd-Parametrizations.
The nontrivial stable faithful
parametrizations form a high
dimensional polyhedron. Those on
a part of its boundary admit feature
learning, while all others are in the
operator regime. µP is a vertex in
the former, while NTP, latter. The
overall shape is similar to [45, Fig.
2]

3. If there is feature learning or feature kernel evolution
or prefeature learning or prefeature kernel evolution
in layer l, then there is feature learning and
feature kernel evolution and prefeature learning and
prefeature kernel evolution in layers l, . . . , L.
a.s.

a.s.

4. If r = 0, then f0 −−→ 0 and ft −−→ f˚t for some
deterministic f˚t . However, the converse is not true.
Consequently, we can generalize Dynamical Dichotomy to (nonlinear) entrywise updates.
Corollary 2.8.20 (Dynamical Dichotomy). A nontrivial, stable, and faithful abcd-parametrization
either admits feature learning or is in the operator regime, but not both.
Of course, the canonical examples here are µP in the feature learning regime and NTP in the operator
regime. In the SGD case, Theorem 2.8.19 and Corollary 2.8.20 are equivalent to their counterparts
[45, Thm H.13, Cor H.14] other than a minor technical difference as discussed in Remark 2.8.13.
Remark 2.8.21 (Maximality). The µ and NT limits are resp. the “maximal” limits in the feature
learning and operator regimes, in the sense that all parameter tensors contribute to the function update,
and that any other limits in those regimes are just “downgrades” of µ and NT limits by zeroing out
the initialization or learning rate of some parameters. See also Remark 2.7.5.
Remark 2.8.22 (Pretraining is still futile in the operator regime even with adaptive optimizers). [45,
Thm H.17] holds almost verbatim in our case as well, after replacing “stable” with “stable and faithful”
and “kernel regime” with “operator regime”: Finetuning any pretrained network in the operator
regime would be equivalent to finetuning a randomly initialized network. Thus, pretraining in the
operator regime is useless.
28

Remark 2.8.23 (Function Space Picture). In the memoryless stationary case, an operator regime limit
resides solely in the function space picture, i.e. ft+1 being solely determined by the function values
ft themselves (as opposed to the internal activations of f as well) along with learning rate η and error
signals εt . However, as in [45, Remark 3.11], this is not true of any feature learning limit because
one can construct counterexamples where ft are close for two infinite-width limits but ft+1 are far.
Remark 2.8.24 (Not All Dynamics are Infinite-Width Limits). Compared to the kernel regime in
the SGD case, the operator regime now allows nonlinear evolution in the function space picture.
Nevertheless, in such dynamics, ft+1 − ft must be linear in η for every t. Thus, any function space
evolution nonlinear in η cannot be the infinite-width limit of any entrywise optimizer.30 For example,
ft+1 − ft = −ηft − η 2 ft2 is not a valid limit.
Remark 2.8.25 (Uniform Parametrization). [45, Sec G] identified a subclass of abc-parametrizations,
called uniform parametrizations, where all layers “learn the same amount of features” and the output
layer is initialized and updated maximally. This is used in [40] to give an alternative presentation
of µP as well as discussion of joint width-depth limit. This notion also makes sense for abcdparametrizations: For every s ∈ [0, 1/2], there is a unique stable and faithful abcd-parametrization,
called UPs such that rl = s for all l = 1, . . . , L and rL+1 = 1 and aL+1 + bL+1 = 1 − s. For
example, UP0 is µP and UP1/2 is NTP.

2.9

Infinite-Width Limits for Any Architecture

Having written down the infinite-width limits of adaptive optimizers for MLPs, we now turn to
general architectures. An astute reader may have already absorbed the key insights from the previous
sections and can use them to derive the NT or µ limits for each new architecture in an ad hoc
fashion. In contrast, here we describe the algorithm to do this once and for all, uniformly for all
“reasonable” architectures. This uniformity of course requires abstraction, which is not conducive to
quick comprehension; on the flip side, this algorithm will always be here for someone to fall back to
if the ad hoc approach does not work out.
The main work here is not the proofs (which can be easily adapted from the MLP case and so are
omitted), but the definitions: What is an architecture? What architecture counts as “reasonable”?
How to define abcd-parametrization for any such architecture? What are their infinite-width limits?
Answering these questions in the most generality requires careful thought.
2.9.1

Representating Architectures via Tensor Programs

Definition 2.9.1 (Architecture and Representability). Let Tn = (R)j ⊕ (Rn )k ⊕ (Rn×n )l . We shall
call this the parameter space with l matrix, k vector, and j scalar parameters.
A function family f = {fn (−; −) : Rd × Tn → Re }∞
n=1 (with fixed input and output dimensions d
and e independent of n) is called an architecture. It has l matrix, k vector, and j scalar parameters.
We say an architecture f is representable if there is a N E⊗OR⊤ program π and vectors x1 , . . . , xe in
π such that 1) π has j + d initial scalars, k initial vectors, and l initial matrices; and 2) for any n, when
they are instantiated with ξ ∈ (R)d and Θ ∈ Tn ,31 the sum of xi ’s entries yields fn (ξ; Θ)i for each
i ∈ [e]. In this case, (π, x1 , . . . , xe ) is called a representation of f , and π is called a representation
program of f .
As demonstrated in [41, 43], Definition 2.9.1 covers essentially every architecture in practice: RNNs,
residual network, transformers, etc.
Remark 2.9.2. In this definition, only the symbolic structure of the program matters; the random
sampling of Setup 2.6.3 and Setup 2.6.4 plays no role.
Remark 2.9.3. For simplicity, we only considered the case when the notion of “width” is the same
throughout the network. Nevertheless, this definition can be easily modified to cover the nonuniform
case, but stating it would be much more complex.
Remark 2.9.4. In truth, we could have phrased Definition 2.9.1 using N ETSOR⊤ instead of N E⊗OR⊤,
since we do not know of any neural network in the wild that is not N ETSOR⊤-representable
30

The same holds for any adaptive optimizer with ingredients discussed under Optimizer Coverage of
Section 2.1.
31
In particular, the first j initial scalars are set to the (R)j part of Θ and the last d scalars are set to ξ.

29

(N E⊗OR⊤ is only required for expressing adaptive optimization like Adam). But there is little
cost in stating the more general version, which can potentially matter in the future.
Remark 2.9.5. [46] also defined a notion of representable functions using N ETSOR⊤. In comparison,
our definition is much more general: Beyond the superficial difference of N E⊗OR⊤ here vs
N ETSOR⊤ there, [46] dealt with input and output layer weights in special ways, whereas here
we do not, instead opting to uniformly deal with scalar, vector, and matrix parameters. The input and
output weights of [46] are vector parameters in this view.
Example 2.9.6. The L-hidden-layer MLP in Eq. (2.3) has d + 1 vector parameters (where d
corresponds to input dimension and 1 corresponds to output dimension) and L − 1 matrix parameters.
It is represented by the program that generates 1) h1 using OuterNonlin and hl , l ≥ 2, using
MatMul; 2) xl using OuterNonlin; and 3) generate function output by summing W L+1 ⊙ xL (so
we can take x1 in Definition 2.9.1 to be W L+1 ⊙ xL ).
2.9.2

abcd-Parametrization for Any Architecture

Definition 2.9.7 (abcd-Parametrization for Representable Architectures). Consider a representable
t+1
architecture with representation program π. Fix a set of update functions Q = {QW
→
t : R
R}t≥0,W where W ranges over every matrix, vector, and scalar parameters. An abcd-parametrization
of this architecture is specified by aW , bW , cW , dW for each such W , along with an additional
number aout , such that
(a) We parametrize W as W = n−aW w for actual trainable parameter w;
(b) We initialize each entry of w iid from N (0, n−2bW );
(c) The learning rate is ηn−cW for some width-independent η;
(d) The gradients of w are multiplied by ndW before being processed by QW
t : i.e., the update
at time t is
dW
w ← w − ηn−cW QW
g0 , . . . , ndW gt )
t (n
where gs , s = 0, . . . , t, are the gradients of w at time s and QW
t is applied entrywise;
and the function output is multiplied by n−aout .32
Remark 2.9.8. In the MLP case, the aout was absorbed into aL+1 . But in the generality of
Definition 2.9.1, output weights are not singled out,33 so we need to separately specify aout .
Remark 2.9.9. As always, we are only concerned with scaling with n here, but there can be a tunable
constant hyperparameter in front of every power of n in Definition 2.2.1.
Remark 2.9.10. The random initialization in Definition 2.9.7 is always mean-zero. For some
applications, such as layernorm/batchnorm weights W (that is initialized as all 1s), this may seem
insufficient. However, one can just refactor the parameter: For this particular example, we can
refactor W = 1 + W ′ where W ′ is the initial vector of the program π. W ′ can then be initialized
as N (0, σn−2bW ′ ) for some tunable constant hyperparameter σ (which is set to 0 by practitioners
typically).
NTP and µP naturally generalize to general representable architectures.
Definition 2.9.11 (NTP for general architecture). For any representable architecture, its Neural
Tangent Parametrization (NTP) is defined by the following setting of a, b, c, d for matrix, vector, and
scalar parameters as well as the output multiplier aout .

a
b
c
d

matrix

vector

scalar

out

1/2

0
0
1/2
1/2

0
0
0
0

1/2

0
1
1

-

P
i
i.e., fn (ξ; Θ)i = n−aout n
α=1 xα instead of just a plain sum.
P
33
In fact, output weights may be ill defined in some architectures, such as if f (ξ) = α xL (ξ)α .

32

30

Definition 2.9.12 (µP for general architecture). For any representable architecture, its Maximal
Update Parametrization (µP) is defined by the following setting of a, b, c, d for matrix, vector, and
scalar parameters as well as the output multiplier aout .

a
b
c
d

matrix

vector

scalar

out

0

0
0
0
1

0
0
0
0

1
-

1/2

1
1

Remark 2.9.13. In comparison to their counterparts for MLP, the NTP and µP above consider scalar
parameters (which are not present in the MLP in Eq. (2.3)). Otherwise, Definition 2.4.1 can be
recovered from Definition 2.9.11 by mapping the columns [2, L] to “matrix,” 1 to “vector,” and L + 1
to “vector” but with the value of a taken from the “out” column. Definition 2.5.1 can be recovered
likewise from Definition 2.9.12.
Before we formulate their limits, we need to discuss how to construct the “backpropagation” of an
arbtrary of N E⊗OR⊤ program.34
2.9.3

Interlude: Backpropagation and Total Programs

Recall that when x ∈ Rn , the notation ⟨xα ⟩α denotes its average entry; this applies more generally to
tensors, such as ⟨xα1 ...αr ⟩α1 ···αr when x ∈ Rn×···×n = (Rn )⊗r .
Definition 2.9.14 (Backpropagation Program). Consider any N E⊗OR⊤ program π and a vector x
in π. Then π’s backpropagation program wrt x is an extension of π defined by constructing the
following objects on top of π: (Intuitively, one should interpret dx y = n ∂⟨x∂yα ⟩α if y is a vector and
dx c = ∂⟨x∂cα ⟩α if c is a scalar.)
• dx x := 1n ∈ Rn
• For any MatMul instruction z := W y in π, we construct dx|z y := W ⊤ dx z (via another
MatMul)
• For any Avg instruction c := ⟨zα ⟩α in π, we construct dx|c z := (dx c)1n ∈ Rn (via
OuterNonlin)
• Suppose y = ⟨ψ(x; xβ1 ; · · · ; xβr ; c)⟩β1 ···βr . For each i = 0, . . . , r, let
gβi 0 ···βr = dx yα ψi (xβ0 ; · · · ; xβr ; c) ∈ R|x| ,
where ψi : R|x|(r+1)+l → R|x| yields the derivative of ψ against x in the ith slot. When
i = r + 1, we make the analogous definition for gβr+1
∈ R|c| . We write β = (β0 , . . . , βr ),
0 ···βr
β[i 7→ α] = (β0 , . . . , βi−1 , α, βi+1 , . . . , βr ), and β−i = (β0 , . . . , βi−1 , βi+1 , . . . , βr ).
Then we construct dx|y c = (dx|y c1 , . . . , dx|y c|c| ) and dx|y x = (dx|y x1 , . . . , dx|y x|x| ) by
dx|y c := ⟨gβr+1 ⟩β ∈ R|c|
dx|y xα :=

r
X

OuterNonlin + Avg

i
|x|
⟨gβ[i7
→α] ⟩β−i ∈ R

OuterNonlin

i=0

Explicitly,
0
dx|y xα = ⟨gαβ
⟩
+ ⟨gβ10 αβ2 ···βr ⟩β0 β2 ···βr + · · · + ⟨gβr 0 ···βr−1 α ⟩β0 ···βr−1
1 ···βr β1 ···βr

• Finally, for every vector or scalar y in π other than x,
X
dx y :=
dx|u y
u

where u ranges over all vector or scalar in π whose construction used y.35
34
35

This has been constructed previously for N ETSOR⊤ programs in [12].
If this sum is empty, then the RHS is set to 0.

31

The subprogram36 constructing all of these new objects is denoted dx π (so that the backpropagation
program is π|dx π).
Recall ([44, Defn I.1]) that “|” (as in “π|π ′ ”) signifies the concatenation of programs.
Remark 2.9.15. If r = 0 in OuterNonlin (i.e., we just have a Nonlin+ instruction), then the
formulas simplify to
dx|y c := ⟨dx yα ψ1 (xα ; c)⟩α
dx|y xα := yα ψ0 (xα ; c).
Definition 2.9.16 (Total Program dπ). Consider a representable architecture f with representation
(π, x1 , . . . , xe ). Gather all of π’s backpropagation programs wrt xi into a single (large) program:
1

e

def
dπ =
π|dx π| · · · |dx π.

Let ξ ∈ Rd be an input to f . Then dπ(ξ) will denote the program dπ with ξ inserted as the
appropriate initial scalars (c.f. Definition 2.9.1). As in Section 2.3, we consider a set of M inputs
ξ = {ξ 1 , . . . , ξ M } ⊆ Rd . Then we set
def
dπ =
dπ(ξ 1 )| · · · |dπ(ξ M ),

whose initial data are the j scalars, k vectors, and l matrices corresponding to Tn in Definition 2.9.1;
they are shared among all subprograms dπ(ξ i ). We call dπ the total program of f .
For any vector y in π, we write y = (y(ξ 1 ), . . . , y(ξ M )) ∈ Rn×M to denote the multi-vector of its
j
counterparts in dπ. We also write dy = (dx y(ξ a ))j∈[e],a∈[M] ∈ Rn×e×M for the multi-vector in
dπ of its error signals.
2.9.4

Training Setup

The setup in Section 2.3 is defined with the MLP in mind, but can be generalized easily to deal with
general architectures, as we do here for clariy: 1) Because we consider multi-dimensional outputs here,
the error signal functions εt obviously need to take the more general signature εt : Re×M → Re×M .
t+1
2) The update functions Q now contain a QΘ
→ R for every matrix, vector, and scalar
t : R
Θt
parameter Θ. Memoryless still means Q only depends on its last argument, and stationary still
means QΘ
t is the same regardless of Θ and t. 3) The smoothness assumption we require is the natural
adaptation of Assumption 2.3.2:
Assumption 2.9.17 (Smoothness). Assume εt and QΘ
t for all Θ, t are pseudo-Lipschitz and all
nonlinearities used in the representing program has pseudo-Lipschitz derivatives.
2.9.5

Neural Tangent Limit

Memoryless Stationary Case
Definition 2.9.18 (Neural Tangent Operator for General Architecture). Fix a representable
architecture f with representation (π, x1 , . . . , xe ). For any function Q : R → R, we define the neural
tangent Q-operator KQ : Re×M → Re×M by the following: for any χ ∈ Re×M ,
X
def
W
KQ
(χ) =
DiagM
⟨dg8dh⟩ χ ⟨z8y⟩
(2.32)
h=W z
g=W y
def
v
KQ
(χ) =
⟨dv8dv⟩ · χ
X
X
def
W
v
KQ (χ) =
KQ
(χ) +
KQ
(χ)

(2.33)
(2.34)

v

W

where the “bar” notation abbreviates application of Q as in Eq. (1.2) and all kets and bras are evaluated
in dπ (Definition 2.9.16) via Definition 2.6.5. To interpret these formulas, we need to tell you two
things:
36

The notion of subprogram is formally defined in [44, Defn I.1]. Roughly it means a contiguous subset of
instructions in the program.

32

1) Ranges of arguments. Here, W ranges over all matrix parameters and v over all vector parameters
of f , and all kets are calculated from dπ by sampling matrix parameters from N (0, 1/n) and vector
parameters from N (0, 1).37 The sum in Eq. (2.32) sums over all vectors h, z, g, y in π satisfying
h = W z and g = W y (potentially h = g and z = y).
2) Tensor operations. Here 8dg⟩, 8dh⟩, χ ∈ Re×M while 8z⟩, 8y⟩ ∈ RM . First, we take the
convention that each bra has the same shape as the corresponding ket:38 ⟨dg8, ⟨dh8 ∈ Re×M .
Second, the meaning of 8dh⟩ χ ⟨z8 is
X
i
8dh⟩ χ ⟨z8 =
χai 8dx h(ξ a )⟩⟨z(ξ a )8
(2.35)
a∈[M],i∈[e]

(i.e., contraction of all matching indices), which generalizes the case of e = 1 in Theorem 2.9.19.
Likewise, in Eq. (2.33), 8dv⟩ · χ ∈ R contracts all indices. Finally, DiagM in Eq. (2.32) takes its
argument tensor of shape e × M × M and returns a tensor of shape e × M by “taking the diagonal
over the M dimension.”
Theorem 2.9.19 (Neural Tangent Limit for General Architecture). Consider a representable
architecture f with representation (π, x1 , . . . , xe ) and any training routine in NTP (Definition 2.9.11)
with memoryless stationary update function Q. Adopt Assumption 2.9.17. Further assume
1. f has no scalar parameters, and
2. ⟨18xi (ξ)⟩ = 0 for every input ξ and output index i ∈ [e] at initialization.39
Recall ft denotes the function after t steps of updates from random initialization. Then
d

f0 −
→ N (0, ⟨x8x⟩)
where x is the multi-vector consisting of x1 , . . . , xe evaluated on all M inputs. Additionally, for
every t ≥ 0, ft converges almost surely to a random function f˚t ∈ Re×M satisfying
f˚s+1 − f˚s = −ηKQ (εs (f˚s )),

for all s.

(2.36)

Remark 2.9.20. Note Simple GIA Check [43] may not be satisfied in general architectures, so that we
cannot necessarily calculate kets like 8dh⟩ by assuming matrix parameters and their transposes are
independent (even if no transposes occur in π), e.g., ignoring 8dh˙⟩ in our calculations. Nevertheless,
Theorem 2.9.19 still holds if one calculates 8dh⟩ correctly using the rules of Definition 2.6.5.
Remark 2.9.21. Assumption 2 (x being mean zero) in Theorem 2.9.19 is obviously necessary for
us to arrive at a Gaussian Process limit at initialization. Assumption 1 is also necessary for two
reasons: 1) at initialization, random initialization of scalar parameters would make the initial process
a mixture of Gaussian processes (or a GP conditioned on the values of scalar parameters). Even if the
scalar parameters are deterministic, the gradient wrt scalar parameters will also be a random process
(possibly correlated to the process of the function) at initialization. 2) Function space picture (c.f.
Remark 2.8.23 and [45, Remark 3.11]) would no longer hold: One cannot track the evolution of the
f˚t solely by knowing what it is at time t = 0. Instead, one would need to track the values of the
scalar parameters and their gradients as well. So in a sense we will have a “function space + scalar
parameters” picture. The complete evolution of f˚t can then be described by a) the joint process of the
function output, scalar parameters, and their gradients at initialization, together with b) an evolution
equation involving how they evolve given their previous values in time. This is similar to [24].
Memoryful Nonstationary Case
As before, with some more notation we can write down the NT limit for any representable architecture.
Definition 2.9.22 (Neural Tangent Operator, Memoryful Nonstationary Case). For memoryless but
nonstationary update functions Qt = {Qθt : R → R : parameter θ}, we define KQt : Re×M →
37

Again, we can insert hyperparameters like σW and σv , but for simplicity we omit them here.
Intuitively, 8dg⟩ corresponds to dg ∈ Rn×e×M while ⟨dg8 corresponds to dg’s “transpose” with shape
e×M×n
R
.
39
More precisely, the ket 8xi (ξ)⟩ is evaluated in dπ (Definition 2.9.16) via Definition 2.6.5.
38

33

Re×M with the same equation as Eqs. (2.32) to (2.34), except the bar notation abbreviates QW
t or
Qvt .
For general update functions Qt = {Qθt : Rt+1 → R}θ , we define KQt : R(t+1)×e×M → Re×M ,
X
def
W
KQ
(χ
,
.
.
.
,
χ
)
Diag
⟨dg8dh⟩ χ≤t ⟨z8y⟩
(2.37)
=
0
t
M
t
h=W z
g=W y
def
v
KQ
(χ0 , . . . , χt ) =
⟨dv8dv⟩ · χ≤t
t
X
X
def
W
v
KQt (χ0 , . . . , χt ) =
KQ
(χ
,
.
.
.
,
χ
)
+
KQ
(χ0 , . . . , χt )
0
t
t
t

(2.38)
(2.39)

v

W

where 8dh⟩ χ≤t ⟨z8 is shorthand for QW
t (8dh⟩ χ0 ⟨z8, . . . , 8dh⟩ χt ⟨z8) and 8dv⟩ · χ≤t is shorthand
for Qvt (8dv⟩ · χ0 , . . . , 8dv⟩ · χt )
With this in mind, the following theorem yields the NT limit of Adam (Eq. (Adam)) as a corollary.
Theorem 2.9.23 (Neural Tangent Limit, Memoryful Nonstationary Case). If the update functions Q
are memoryless but not necessarily stationary, then Theorem 2.9.19 holds with Eq. (2.36) replaced by
f˚t+1 − f˚t = −ηKQt (εt (f˚t )),

for all t.

(2.40)

For general Q, not necessarily memoryless, Theorem 2.9.19 holds with Eq. (2.36) replaced by
f˚t+1 − f˚t = −ηKQt (ε0 (f˚0 ), . . . , εt (f˚t )),
2.9.6

for all t.

(2.41)

Maximal Update Limit

Given a representable architecture, the representing program describes the symbolic procedure for
computing the output of the network given an assignment of the input and parameters to concrete
values. This procedure is well defined for any network width (by construction). Naturally, it remains
well defined as explicitly spelled out below even when we “pass to the infinite-width limit.” In short,
Definition 2.9.24 specifies what it means for a program to compute something given an assignment
of the input and parameters to concrete infinite-width limits (e.g., kets and operators).
Definition 2.9.24. For any program π and a vector y in π, 8y⟩ can be thought of as a function, defined
via Definition 2.6.5, of {8W 8}W , {8v⟩}v , {c̊}c where W, v, c range over the initial matrices, vectors,
and scalars respectively. Consider an assignment Θ that assigns an operator Θ{W } to each initial
matrix W , ket Θ{v} to each initial vector v, and a deterministic number Θ{c} to each initial scalar c.
Then we write
Θ{8x⟩ χ̊ ⟨y8}, Θ{8y⟩}, Θ{⟨y8z⟩}, Θ{θ̊}
for 8x⟩ χ̊ ⟨y8, 8y⟩, ⟨y8z⟩ and θ̊ computed using this assignment (i.e., swapping out 8W 8 for Θ{W },
8v⟩ for Θ{v}, and c̊ for Θ{c}).

More precisely, we recursively define

def
8Θ{x}⟩ =
Θ{8x⟩}

def
Θ{⟨x8y⟩} =
⟨Θ{x}8Θ{y}⟩
def
Θ{8x⟩ χ̊ ⟨y8} =
8Θ{x}⟩ Θ{χ̊} ⟨Θ{y}8


Θ

def
Θ{8W 8x⟩} =
8Θ{W }8Θ{x}⟩

def
E ψ(8x⟩; 8x⟩ 1 ; · · · ; 8x⟩ r ; c̊) =
E ψ(8x̃⟩; 8x̃⟩ 1 ; · · · ; 8x̃⟩ r ; Θ{c̊}) where x̃ = Θ{x}

1 ··· r

1 ··· r

where we write 8Θ{W }8 = Θ{W } for each initial matrix W , 8Θ{v}⟩ = Θ{v} for each initial vector
v, and Θ{c̊} = Θ{c} for each initial scalar c.40
40

so that 8Θ{•}8 and 8Θ{•}⟩ are just redundant affirmations of the “shape” of Θ{•}, rather than saying
Θ{•} is some object in some program and 8Θ{•}8 or 8Θ{•}⟩ are their “limits.”

34

Memoryless Stationary Case
Theorem 2.9.25 (µ-Limit for General Architecture). Consider a representable architecture f with
representation (π, x1 , . . . , xe ) and any training routine in µP (Definition 2.9.12) with memoryless
stationary update function Q. Adopt Assumption 2.9.17.
Then for each t ≥ 0, ft converges almost surely to f˚t computed from the following.
1. (Forward and Backward Propagation) Let Θt be the assignment that assigns 8Wt 8 to each
matrix parameter W , 8v⟩ to each vector parameter v, and c̊t to each scalar parameter c.
f˚t = Θt {⟨18x⟩} ∈ Re×M
χ̊t = εt (f˚t ) ∈ Re×M
(2.42)
8yt ⟩ = Θt {8y⟩} ∈ RM

8dyt ⟩ = Θt {8dy⟩} ∈ Re×M

åt = Θt {å} ∈ RM

dåt = Θt {då} ∈ Re×M

for any vector y in π
(2.43)

for any scalar a in π
(2.44)
1
e
Here x is the multi-vector consisting of x , . . . , x evaluated on all M inputs, and all kets
and limits are calculated in dπ via Definition 2.6.5.
2. (Parameter Updates)
8Wt+1 8 = 8Wt 8 − η

X
h=W x

8dht ⟩ χ̊t ⟨xt 8

8vt+1 ⟩ = 8vt ⟩ − η8dvt ⟩ · χ̊t

for every matrix parameter W

(2.45)

for every vector parameter v

(2.46)

c̊t+1 = c̊t − ηdc̊t
for every scalar parameter c
(2.47)
where the tensor operations and summation over h = W x should be interpreted as in
Definition 2.9.18.
3. (Initialization) {8W0 8 : matrix parameter W } is a set of independent initial operators.
Additionally,
8v0 ⟩ = N (0, 1)
for every vector parameter v
(2.48)
c̊0 ∼ N (0, 1)
for every scalar parameter c
(2.49)
all independent from one another.
Here, we used the notation W, v, c for matrix, vector, and scalar parameters, in contrast to y and a for
vector and scalar generated by the program π. The former are exemplified by weights while the latter
by (pre)activations.
Example 2.9.26. In the MLP case with program π given in Eq. (2.3), there are no generated scalars,
so we can ignore Eq. (2.44). The generated vectors (in dπ) are h1 , . . . , hL and x1 , . . . , xL as well
as their error signals dhl , dxl . So Eq. (2.43) reduces to the 2nd and 3rd rows in Theorem 2.7.1(1).
Finally, the function output is given by averaging wL+1 ⊙ xL , so the f˚t = Θt {⟨18x⟩} in Eq. (2.42)
reduces to f˚t = ⟨wtL+1 8xL
t ⟩ in Theorem 2.7.1(1).
Remark 2.9.27 (Scalar Parameters). In contrast to the NT limit (Theorem 2.9.19), here we allow
scalar parameters. The sampling of c̊0 ∼ N (0, 1) in Eq. (2.49) for every scalar parameter c is just
a consequence of the sampling in Definition 2.9.7. But in fact for any deterministic initialization
C ∈ R of c, we can set c̊0 = C in Eq. (2.49), and Theorem 2.9.25 still holds. Indeed, for scalar
parameters, the most natural initialization is probably either 0 (for additive parameters like bias) or 1
(for multiplicative parameters like layernorm weights). When scalar parameters have deterministic
initializations, f˚t is always deterministic as well; however, in Theorem 2.9.25, as written, f˚t is only
deterministic conditioned on c̊0 for every scalar parameter c.
Remark 2.9.28 (µP is Most Natural). As discussed in Remark 2.7.2, µP is in a sense the most natural
parametrization because its infinite-width limit is just a direct “ket-translation” of the finite-width
computations, no matter the architecture. Compare this with NTP, where the Gaussian process
and kernel behaviors can only happen under some relative restrictive conditions, like “no scalar
parameters” (Theorem 2.9.19 and Remark 2.9.21).
Remark 2.9.29. In the µ-limit for a general architecture, f˚0 no longer needs to be 0, unlike
Theorem 2.7.1. For example, if in an MLP with relu activation, the output is given by the average
entry of the last layer activation vector, then obviously f˚0 will always be positive.
35

Memoryful Nonstationary Case
Theorem 2.9.30 (µ-Limit for General Architecture, Memoryful Nonstationary Updates). If Q is
memoryless but not stationary, then Theorem 2.9.25 holds if the bars in Eqs. (2.45) to (2.47) are
v
c
interpreted as QW
t , Qt , and Qt .
If Q is not memoryless, then Theorem 2.9.25 holds if Eqs. (2.45) to (2.47) are replaced with
X
8Wt+1 8 = 8Wt 8 − η
8dh≤t ⟩ χ̊≤t ⟨x≤t 8
for every matrix parameter W
h=W x

8vt+1 ⟩ = 8vt ⟩ − η8dv≤t ⟩ · χ̊≤t

for every vector parameter v

c̊t+1 = c̊t − ηdc̊≤t

for every scalar parameter c

where the bar notations abbreviate
!
X
h=W x

8dh≤t ⟩ χ̊≤t ⟨x≤t 8 = QW
t

X
h=W x

8dh0 ⟩ χ̊0 ⟨x0 8, . . . ,

X
h=W x

8dht ⟩ χ̊t ⟨xt 8

8dv≤t ⟩ · χ̊≤t = Qvt (8dv0 ⟩ · χ̊0 , . . . , 8dvt ⟩ · χ̊t )
dc̊≤t = Qct (dc̊0 , . . . , dc̊t ) .

2.10

Extensions

2.10.1

Weight Decay

Consider the update equation (Eq. (2.4)) with decoupled weight decay λ:41
l
wtl = (1 − λ)wt−1
− ηn−cl Qlt (ndl g0 , . . . , ndl gt ).

(2.50)

This decoupled weight decay λ is equivalent to a traditional weight decay value λ/ηn . It’s obvious
that λ should be invariant to the width n: if λ → ∞ with n, then 1 − λ < 0 eventually; if λ → 0
with n, then weight decay has no effect in the limit.
−cl

The theory in this section covers AdamW [27], SGD with weight decay, and so on.
Maximal Update Limit
Theorem 2.7.1 holds with Eqs. (2.20) to (2.22) replaced with
1
8wt+1
⟩ = (1 − λ)8wt1 ⟩ − η8dh1t ⟩χ̊t ξ ⊤

l
8Wt+1
8 = (1 − λ)8Wtl 8 − η8dhlt ⟩ χ̊t ⟨xl−1
t 8, ∀l ∈ [2, L]

L+1
8wt+1
⟩ = (1 − λ)8wtL+1 ⟩ − η8xL
t ⟩ · χ̊t .

(2.51)
(2.52)
(2.53)

All other µ-limit theorems (Theorem 2.5.2, 2.5.3, 2.7.3, and 2.9.30) hold with similar modifications.
In particular, if we interpret the bars in Eqs. (2.45), (2.51) and (2.53) as Eq. (Adam) and replace the •t
subscripts under the bars to •≤t (c.f. the notation in Theorem 2.7.3), then we get the equations for
AdamW’s µ-limit.
Neural Tangent
Fix decoupled weight decay λ.
Definition 2.10.1. For each l = 1, . . . , L and s = 0, 1, . . ., the ket 8hls ⟩ ∈ RM is constructed as a
l−1
⊤
mean-zero Gaussian vector with covariance matrix (1 − λ)2s ⟨xl−1
s 8xs ⟩ when l > 1 or ξ ξ when
l def
l
M
l = 1. Simultaneously, xs = ϕ(8hs ⟩) ∈ R for l = 1, . . . , L. Furthermore, for any s, t ≥ 0, 8hls ⟩
l−1
and 8hlt ⟩ are jointly Gaussian with covariance (1 − λ)s+t ⟨xl−1
s 8xt ⟩.
41

We will assume all layers have the same λ, for simplicity. The generalization to layer-specific λ is
straightforward.

36

Definition 2.10.2. For each l = L, . . . , 1 and s = 0, 1, . . ., the ket 8dxls ⟩ ∈ RM is independent
from {8xlt ⟩, 8hlt ⟩}L
l=1 for any t and is a mean-zero Gaussian vector with covariance matrix (1 −
def
l+1
l
λ)2s ⟨dhl+1
8dh
s
s ⟩ when l < L or the all-1s matrix when l = L. Simultaneously, 8dhs ⟩ =
l
l
M
l
l
′
ϕ (8hs ⟩) ⊙ 8dxs ⟩ ∈ R for all l. Furthermore, for any s, t ≥ 0, 8dxs ⟩ and 8dxt ⟩ are jointly
l+1
Gaussian with covariance (1 − λ)s+t ⟨dhl+1
s 8dht ⟩.
Theorem 2.10.3. With decoupled weight decay λ, Theorem 2.4.7 holds with the update equation
Eq. (2.9) replaced by
f˚t+1 − f˚0 = −η

t
X

(1 − λ)t−s Diag

s=0

L+1
X
l=1

l−1
⟨dhlt+1 8dhls ⟩ χs ⟨xl−1
s 8xt+1 ⟩.

For memoryless nonstationary updates, interpret the bar as Qlt . For memoryful nonstationary updates,
replace the nonlinear outer product with 8dhl≤s ⟩ χ≤s ⟨xl−1
≤s 8 (c.f. Theorem 2.7.3 for the notation).
Note that when λ = 0, hls is invariant to s as are xls , dhls , dxls , and this exponentially weighted sum
just reduces to a simple sum and thus to Eq. (2.9).
In the memoryful case, interpreting the bar in Theorem 2.10.3 as Eq. (Adam) yields the NT limit of
AdamW. The limit theorems (Theorem 2.9.19 and Theorem 2.9.23) for general architecture also hold
with analogous modifications.
2.10.2

Update Clipping and Normalization

We now add update clipping or normalization to Eq. (2.50):42
l
wtl = (1 − λ)wt−1
− ηn−cl · ν −1 Qlt (ndl g0 , . . . , ndl gt ),

(2.54)

where
• if we are doing update normalization, then we set ν ← ∥Qlt (ndl g0 , . . . , ndl gt )∥;
• if we are doing update clipping, then calculate additionally ν ← min(ν, θl ) where θl is a
threshold hyperparameter for layer l.
Some recent works [5, 6, 26, 35, 49, 50] normalize the update by the current weight (Frobenius)
norm instead of by the update norm. We explore its implications in Section 2.10.2. For now we focus
on the formulation above.
The key questions we explore here are:
1. How should the abcd values adjust to update clipping and normalization?
2. What do the neural tangent and maximal update limits look like?
3. How should the threshold hyperparameter θl scale with width n?
The key intuition is as follows: In all “reasonable” parametrizations (more precisely, faithful
ones
√
(Definition 2.8.8)), Qlt (ndl g0 , . . . , ndl gt ) is entrywise Θ(1). Thus, its norm ν scales like #entries,
as can be verified via the Master Theorem
√ (Theorem 2.6.10). For example, for the input and output
weights of the MLP (Eq. (2.3)), this is n, while for the hidden weights, this is n. Therefore, for
update clipping, the threshold should be

1/2 if l = 1, L + 1
θl = θ0l nel where el =
(2.55)
1
otherwise,
for some tunable hyperparameter θ0l independent of width. Otherwise, either the clipping has no
effect (if θl is larger than this) or ν after update clipping is always equal to the threshold θl (if θl is
smaller than this).
42
Traditionally, gradient clipping for SGD clips the norm of the entire gradient (for the whole network).
Naively, one would just do this before applying the update function Q. However, in Adam, for example, this
would be meaningless because of Adam’s normalization. For general Q, the dl terms can be trivially adjusted
according to how the global gradient norm scales. So this notion of clipping or normalization (before Q) is not
very interesting.

37

At the same time, cl should be el smaller than if there is no update normalization or clipping (i.e., the
learning rate should be larger). Thus, for example,
Definition 2.10.4. The NTP with update normalization or clipping is
l

[2, L]

1

L+1

al
bl
cl
dl

1/2

0
0
0
1/2

1/2

0
0
1

0
0
1/2

where update clipping thresholds θl scale as in Eq. (2.55).
Definition 2.10.5. The µP with update normalization or clipping is
l
al
bl
cl
dl

[2, L]

1

L+1

0

0
0
−1/2
1

1
0
−1/2
1

1/2

0
1

where update clipping thresholds θl scale as in Eq. (2.55).
Likewise, the classification of parametrizations in Section 2.8 hold for update normalization or
clipping if we replace all mentions of cl in Section 2.8 with cl + el . For example,
Definition 2.10.6. With update clipping or normalization, we redefine

l
c + el + al − 1 if l > 1
def
def
def
rl = l
, r≤l =
min rl , r =
r≤L
m=1
cl + el + al
if l = 1
L
−r
Then xL
) still and it remains that r = 1/2 for NTP (Definition 2.10.4) and r = 0 for
t − x0 = Θ(n
µP (Definition 2.10.5) with the new definitions above.

General Architectures For general architectures, there is one ew for every parameter tensor w, and
should be set to 0, 1/2, and 1 respectively for scalar, vector, and matrix parameters. Then the obvious
generalization of the above discussion holds.
Maximal Update Limit
def
Definition 2.10.7. For any random vector X, let |X| =

p

def
E ∥X∥2 . Then let X̃ =
X/|X|.

Then Theorem 2.7.1 holds with Eqs. (2.20) to (2.22) replaced with (essentially, compared to
Eqs. (2.51) to (2.53) we added a tilde ˜ to all bars.)43
˜
1
8wt+1
⟩ = (1 − λ)8wt1 ⟩ − η 8dh1t ⟩χt ξ ⊤
˜
l
8Wt+1
8 = (1 − λ)8Wtl 8 − η 8dhlt ⟩ χt ⟨xl−1
t 8, ∀l ∈ [2, L]
˜
L+1
8wt+1
⟩ = (1 − λ)8wtL+1 ⟩ − η 8xL
t ⟩ · χt .

(2.56)
(2.57)
(2.58)

Here, we think of 8hlt ⟩ χ̊t ⟨xl−1
t 8 as a scalar random variable with the same distribution as
PM
l−1
l
1
∈ R.
i=1 χ̊t (ξi )8ht (ξi )⟩8xt (ξi )⟩
def
If doing update clipping, then interpret X̃ =
X/ min(θ0 , |X|) for θ0 being the θ0l (Eq. (2.55)) for
appropriate layer l.

Similar statements hold for other µ-limit theorems, including those in general architectures.
43

Unfortunately, LaTeX breaks χ̊t in the subscripts, so here we just write χt instead.

38

Neural Tangent Limit Theorem 2.10.3 holds with a tilde added to all bars, where the tilde should
def
def
X/|X| if doing update normalization or X̃ =
X/ min(θ0 , |X|)
be interpreted according to X̃ =
if doing update clipping. Similar statements hold for other NT limit theorems, including those in
general architectures.
Normalization by Current Weight Norm
Now suppose in Eq. (2.54), we normalizd by the current weight norm instead, i.e.,
l
ν ← ∥wt−1
∥F .

For simpicity, assume the weight decay λ is zero; our conclusion will turn out to hold even when this
is not the case.
Let’s consider what happens to the hidden weights. Consider W l for l ∈ [2, L]. The Frobenius norm
of √
its initialization W0l ∈ Rn×n√(a random Gaussian matrix with Wαβ ∼ N (0, 1/n)) scales like
Θ( n) (in fact, asymptotically n + O(1)). But, in a stable parametrization (Definition 2.8.7), the
l
Frobenius norm of δWtl = Wtl − Wt−1
, a nonlinear outer product with O(1/n) entries, scales like
O(1). This means that
√
∥δWtl ∥F
∥δwtl ∥F
=
= O(1/ n).
l
l
∥W0 ∥F
∥w0 ∥F
Therefore,
∥W0l + δW1l + · · · + δWtl ∥F
∥Wtl ∥F
∥wtl ∥F
=
=
→1
∥W0l ∥F
∥W0l ∥F
∥w0l ∥F
l
for any t as n → ∞.44 So ν = ∥wt−1
∥F = Θ(∥w0l ∥F ) = Θ(n1−bl ) (in fact, ν/n−bl → 1).

In contrast, for the input layer weight W = W 1 , we have ∆Wt = O(W0 ) (entrywise and
in Frobenius norm) in a stable parametrization. If the parametrization is furthermore faithful
(Definition 2.8.8), then for W = W L+1 , this is true as well (c.f. Remark 2.8.13). So ∥wt1 ∥F /∥w01 ∥F
and ∥wtL+1 ∥F /∥w0L+1 ∥F are both Θ(1) (but ̸→ 1 generally) and ν = Θ(n1/2−bl ) in both cases.
Therefore, if we subtract bl from el in Eq. (2.55), then all discussion above applies. For example, the
parametrizations for current weight norm can be obtained by adding the bl row to the cl row.
Definition 2.10.8. The NTP with update normalization or clipping with current weight norm is the
same as Definition 2.10.4.
Definition 2.10.9. The µP with update normalization or clipping with current weight norm is
l
al
bl
cl
dl

[2, L]

1

L+1

0

0
0
−1/2
1

1
0
−1/2
1

1/2
1/2

1

where the clipping thresholds θl scale as n1/2 .
The limit equations for µP in this
q case is just Eqs. (2.56) to (2.58) but with the tilde interpreted as
p
1
1
dividing by ⟨wt 8wt ⟩, 1, and ⟨wtL+1 8wtL+1 ⟩ respectively. Similar modifications apply to the NT
limits.
Likewise, the classification of parametrizations hold if we replace each cl with cl + el − bl .
We have assumed that the weight decay λ is 0 at the beginning. In the general case, define δWt =
Wt − (1 − λ)Wt−1 instead, but the same calculations will yield the same conclusions.
44

The fact that ∥wt ∥F is essentially ∥w0 ∥F really implies that this is not the right quantity to normalize or
clip the update by. For example, other norms (like spectral norm) does not have this property and could be better
suited (if we ignore the computational issues for the moment). As another example, if Frobenius norm is desired,
we should perhaps want to normalize by ∥∆wt ∥F instead of ∥wt ∥F .

39

2.10.3

Second Moment Factoring ala Adafactor

The key observation here is that, even though the factored update function Q is not entrywise
anymore, the update itself is still a nonlinear outer product of dh≤t and dx≤t (with some scalars
variables inserted in an appropriate N E⊗OR⊤ program), All of our theory in fact holds as-is for this
more general kind of update function, since they all factor through the OuterNonlin instruction of
N E⊗OR⊤.
2.10.4

Future Optimizers

As technology advances, we may get better optimizers of very different forms than we discussed here.
But we can quite reasonably expect them to continue to efficiently utilize GPUs, i.e., perform large
matrix-multiplies. As such, these optimizers can always be analyzed in a Tensor Program. So the
lesson is: as long as one understands Tensor Programs, one can always derive the correct way of
scaling an optimizer (with width).

2.11

Proof Sketch

N E⊗OR⊤ programs equipped with their Master Theorem (Theorem 2.6.10) provide the main tool
to all of our rigorous results. For example, to prove the neural tangent or µ limit equations, one
can: express the optimization dynamics using a N E⊗OR⊤ program, mechanically compute the kets
according to Definition 2.6.5, and apply Theorem 2.6.10 to compute the limit (see full proofs in
Sections 3.2 and 3.3). What remains is to prove Theorem 2.6.10 using a strategy which we now
outline.
In a program, all vectors can be collected into an n × M matrix V where n is the dimension of
each vector, and M is the total number of vectors. The Master Theorem can be interpreted as saying
that each row of V (i.e., the slice for each α ∈ [n]) is roughly an iid sample from some distribution
D on RM (the distribution of some multivariate ket computed from Definition 2.6.5). Specifically,
Theorem 2.6.10 and all previous versions of the Master Theorem formalize this by saying: this matrix
V of vectors looks similar to a matrix V ′ of iid samples from D, as measured by applying arbitrary
pseudo-Lipschitz “test function ψ” to both sides and taking averages (the scalars in Theorem 2.6.10
are exactly of this form by Avg).
Core Insight Our core insight here is that V is in fact similar to V ′ in a stronger sense without
needing to refer to any test function ψ: There is a “small” matrix δV of the same shape as V such
that V − δV is distributed exactly the same as V ′ . In general, if this happens, then we say V
is distributionally equivalent, or dequivalent, to V ′ (Definition 4.3.15). The definition of “small”
roughly means that δV is Õ(1) in L2 norm, so that dequivalence is morally just “close in Wasserstein
distance.” This “Wasserstein” notion is a stronger sense of closeness of V to V ′ than the “test
function” notion described in the previous paragraph because the test function ψ is (by assumption)
smooth enough that δV contributes a vanishing amount to the average (Proposition 4.3.11).
To prove this core insight, there are two parts.
Part 1: We show that, in any N ETSOR⊤ program (i.e., a program with no scalar variables and
no T ENSOR operation), V is dequivalent to V ′ . This can be done by re-analyzing the proof of the
N ETSOR⊤ Master Theorem in [44] in a fairly straightforward way.
Part 2: For any N E⊗OR⊤ program π (the subject of our work here), we construct a parallel
N ETSOR⊤ program (Definition 4.8.1) and show, by induction, that the vectors of the two programs
are dequivalent (i.e., distributed exactly the same after subtracting “small” vectors). This parallel
program essentially replaces 1) all scalar variables in the original program by their deterministic limits,
as computed in Definition 2.6.5(Avg), and 2) all OuterNonlin operations by Nonlin operations, as
computed in Definition 2.6.5(OuterNonlin), so that the corresponding vectors of these programs
share their kets. Then, by Part 1 above, we will have proven V dequivalent to V ′ for the original
N E⊗OR⊤ program π.
In this induction, we need to prove and use a lemma that, in the simplest case as an illustration, says
the following: For any pseudo-Lipschitz function ψ : Rk → R and random vector x ∈ Rn with iid
40

standard Gaussian entries, the following two tensors T and T ′ are equivalent: 1) the tensor T with
entries Tβ1 ...βk = ψ(xβ1 , . . . , xβk ), and 2) the tensor T ′ with entries Tβ′ 1 ...βk = ψ(x1β1 , . . . , xkβk )
where x1 , . . . , xk are iid copies of x. The proof of this lemma interestingly requires Baranyai’s
theorem (Theorem 4.1.5), a classical theorem from the theory of combinatorial design about perfect
matching in complete hypergraphs.

41

Chapter 3

Proofs of Infinite-Width Limits
Here we prove the classificatioon of abcd-parametrizations as well as the NT and µ-limit equations,
assuming the N E⊗OR⊤ Master Theorem (Theorem 2.6.10).

3.1

Proof of Classification of abcd-Parametrizations

Here we seek to prove the main claims of Section 2.8: Theorem 2.8.19, 2.8.15, and 2.8.12.
Overview The proof is a straightforward modification of the proof of [45, H.13]. The main subtle
point is how r = 0 implies Item 1 of Theorem 2.8.19 (Item 4(a)iii in the proof outline below). The
reasoning for this in [45] is very specific to SGD and the activation functions tanh and (smoothed) relu.
Here, we adopt a different logic, given in Section 3.1.4 and Theorem 3.1.3, based on the “asymptotic
relu-ness” of the nonlinearity.
On the other hand, the implication of Item 2 in Theorem 2.8.19 by r > 0 is similar to [45], adapted
naturally to general Qlt functions, so we omit the full proof here. However, we provide the derivation
of the NT limit in Section 2.4, which gives an instructive example of the proof for general operator
regime parametrizations.
Proof Outline In the sequel, we provide full details of Items 4(a)i and 4(a)iii of the outline below.
All other steps in this outline are straightforward adaptations of [45] or easy in a self-contained way.
1. The characterization of stability at initialization (Lemma 2.8.10) is already proven in [45,
Thm H.19]. So assume stability at initialization from here on.
2. Some simple calculations then verifies the characterization of faithfulness at initialization
(Lemma 2.8.11). So assume faithfulness at initialization from here on.1
3. If bL+1 > cL+1 , then it’s easy to see that we lose faithfulness after 1 step of update (because
the input to Qlt is ω(1)).
4. Otherwise bL+1 ≤ cL+1 .
(a) First, assume that rl ≥ 0 for all l ∈ [L + 1] and aL+1 + bL+1 + r ≥ 1. (i.e., we assume
Eq. (2.27))
i. Then we can build a N E⊗OR⊤ program computing the network evolution (which
we do in Sections 3.1.1 and 3.1.2). The Master Theorem yields its infinite-width
limit, described in Section 3.1.3, which will be obviously stable and faithful
(Lemma 3.1.2).
ii. If r > 0, then, by adapting the corresponding reasoning in [45], it’s easy to derive
all properties in Theorem 2.8.19(2), as well as the validity of Theorem 2.8.15
(assuming r > 0). We derive the NT limit in Section 3.3 as an example.
1
Note this effectively fixes dl given al , bl , so that the abcd-parametrization now has the same degrees of
freedom as an abc-parametrization. This is a sanity check for why we can adapt most of the arguments from
[45].

42

iii. If r = 0, then the reasoning in [45] cannot be straightforwardly adapted. In
Section 3.1.4, using a different method based on “asymptotic relu-ness” of the
nonlinearity ϕ (Assumption 2.8.2), we prove all properties in Theorem 2.8.19(1,3,4),
the validity of Theorem 2.8.15 (assuming r = 0), and the fact that we are not in
operator regime.
(b) Suppose rl < 0 for some l ∈ [L], and l∗ is the smallest such l. Then the infinite-width
limit derived above up to time 1, layer l∗ shows that ∆xl1 = ω(1) for some choice of ξ
and training routine, so we lose stability.
(c) Otherwise, if aL+1 + bL+1 + r < 1 or rL+1 < 0, then the infinite-width limit derived
above up to time 1 shows that ∆f1 = ω(1), so we lose stability as well.
(d) Combining all caseworks, we 1) derive the nontriviality condition Theorem 2.8.15; 2)
see Eq. (2.27) is necessary for faithfulness and stability as well, proving Theorem 2.8.12;
and 3) prove Theorem 2.8.19.
3.1.1

Program Setup

In Sections 3.1.1 to 3.1.3, we implement Item 4(a)i: we construct the Tensor Program that encodes
the training of an L-hidden layer MLP under an abcd-parametrization satisfying Eqs. (2.25) to (2.27)
and take its infinite-width limit. For the most part, they are straightforward adaptations of [45, Sec.
H.3-H.5]; nevertheless, we show full details to demonstrate the usage of the new N E⊗OR⊤ language
and its Master Theorem (Theorem 2.6.10).
In this section, we first describe the initial matrices, vectors, and scalars of the program, along with
necessary notations.
For ease of presentation, we assume the input dimension d = 1. The general d case is a trivial
adaptation.
Initial Matrices, Vectors, Scalars
1. Initial matrices: W02 , . . . , W0L , sampled like (W0l )αβ ∼ N (0, 1/n).
def
c L+1 =
2. Initial vectors: input layer matrix W01 ∈ Rn×1 and normalized output layer matrix W
0
L+1 aL+1 +bL+1
L+1
n×1
1
c
W0 n
∈R
, sampled like (W0 )α , (W
)α ∼ N (0, 1).
0

3. Initial scalars: We define the following scalars (where we explain the intuition in parenthesis).
The reader can skip this part on a first read but come back when referred to.
(a) (n times the scale of coordinates of ∆Wtl ) For l ≥ 2, define
def −rl
θW l =
n
= n1−cl −al

(b) (scale of coordinates of ∆Wt1 and ∆h1t ) Define
def −r1
θ1 = θW 1 =
n
= n−c1 −a1

(c) (scale of coordinates of ∆WtL+1 )
def −aL+1 −cL+1
θL+1 = θW L+1 =
n

(d) (scale of ∆hlt and ∆xlt ) For l ∈ [L], define
def
θhl = θxl = θl =
max θW m = max(θW l , θl−1 ) = n−r≤l

m≤l

(3.1)

Note that θL = n−r with r defined in Definition 2.8.5.
(e) (scale of WtL+1 )
def −(aL+1 +bL+1 )
θf =
n

43

(3.2)

(f) (convenience scalars)
θxl−1 /hl = θxl−1 /θhl = nr≤l −r≤l−1
θW l /hl = θW l /θhl = nr≤l −rl
θW l xl−1 /hl = θW l θxl−1 /θhl = nr≤l −rl −r≤l−1
θL+1/f = θL+1 /θf = nbL+1 −cL+1
′
θL+1
= nθL+1 = n1−aL+1 −cL+1
′
θLf
= nθL θf = n1−(r+aL+1 +bL+1 )
(g) Depending on the the value of aL+1 + bL+1 , we will also construct the values of f at
initialization as initial scalars. See Section 3.1.2 for an explanation.

Eq. (2.27) implies all of these θs either converge to 0 or stay constant at 1. This means that, assuming
appropriate regularity conditions on the nonlinearities and rank stability, we can apply the Master
Theorem (if θ blows up to ∞ then we can’t do that).
Notations We use := to more clearly denote assignment happening in the program, as opposed
to mathematical equality. To clearly demonstrate the application of OuterNonlin, we will rewrite
expressions in the form
y = Nonlin2 (x; z; c)
n
for vector y ∈ R , multi-vectors x ∈ Rn×k , z ∈ Rn×j , and multi-scalar c ∈ Rl if there exists a
function ψ : Rk+j+l → R such that
n
1X
yα =
ψ(xα ; zβ ; c).
(3.3)
n
β=1

This is the order-2 form of Eq. (2.17). We also write
y = Nonlin1 (x; c)
k+l
if there exists a function ψ : R
→ R such that
yα = ψ(xα ; c).
(3.4)
This is the order-1 form of Eq. (2.17). All usages of OuterNonlin in the program below will be
through Nonlin1 (majority of cases) and Nonlin2 (only when weight updates are involved). This
program will not use OuterNonlin order higher than 2.
Preview of Names for Vectors In the program, for each z ∈ {xl , hl }l , we will construct
vectors δzt to mathematically represent θz−1 (zt − zt−1 ) (intuition: change in z scaled to have Θ(1)
coordinates). Similarly, for w ∈ {W L+1 , W 1 }, we will construct δwt to mathematically represent
−1
θw
(wt − wt−1 ) (intuition: change in w scaled to have Θ(1) coordinates). Then, mathematically,
zt = zt−1 + θz δzt , wt = wt−1 + θw δwt .
We will also construct dz to mathematically represent θf−1 ∇z f (intuition: gradient ∇z f scaled to
have Θ(1) coordinates). For weight changes, we have the following identity
1
l
Wtl − Wt−1
= −ηθW l Qlt (ndl −al χt−1 xl−1⊤
t−1 )
n
1
= −ηθW l Qlt (χt−1 xl−1⊤
(3.5)
t−1 )
n
for l = L + 1,
1
l
Wtl − Wt−1
= −ηθW l Qlt (ndl −al θf dhlt−1 Diag(χt−1 )xl−1⊤
t−1 )
n
1
= −ηθW l Qlt (dhlt−1 Diag(χt−1 )xl−1⊤
(3.6)
t−1 )
n
for l ∈ [2, L], and for l = 1,
l
⊤
Wtl − Wt−1
= −ηθW l Qlt (ndl −al θf dhlt−1 Diag(χt−1 )ξt−1
)
⊤
= −ηθW l Qlt (dhlt−1 Diag(χt−1 )ξt−1
).

(3.7)

Here, the 2nd equality of each block is due to our assumption of Eqs. (2.25) to (2.27) (see discussion
at the start of this section), which means ndl −al θf = 1 for all l ≤ L above and ndL+1 −aL+1 = 1.
44

3.1.2

Program Construction

Here we construct the N E⊗OR⊤ Program encoding the training of an MLP. We separately describe
the first forward and backward passes followed by the later forward and backward passes.
First Forward Pass
We compute h10 := W01 ξ via Nonlin1 and then construct the following multi-vectors via Nonlin1
and MatMul respectively:
xl0 := ϕ(hl0 ) ∈ Rn×M , hl+1
:= W0l+1 xl0 ∈ Rn×M , for l = 1, . . . , L − 1,
(3.8)
0
M
Function Output The first output is f0 = W0L+1⊤ xL
0 ∈ R , but we will define f0 in the program
slightly differently.
a.s.

Case when aL+1 + bL+1 > 1/2 Then f0 −−→ 0. In the program, we will construct f0 as an initial
2
(multi-)scalar mathematically defined by W0L+1⊤ xL
0.
Case when aL+1 + bL+1 = 1/2 If aL+1 + bL+1 = 1/2, then f0 converges to a nontrival Gaussian
via CLT [41], so we will condition on f0 :
1 c L+1⊤ L
Given values c ∈ RM , we will condition on the event E that f0 = √ W
x0 equals c. (3.9)
n 0
c L+1 conditioned on E is given by
The distribution of W
0
d √
c L+1 =
f L+1
W
nx+⊤ c + ΠW
E
0
0
f L+1 is an iid copy of W
c L+1 , and Π is the orthogonal projection into
where x is shorthand for xL
,
W
0
0
0
the orthogonal complement of the column space of x (and •+⊤ denotes the pseudo-inverse transpose
as usual).
By standard formulas for pseudo-inverse and orthogonal projection, we can write
1
1
def
x+⊤ = xΣ+ , Π = I − xΣ+ x⊤ , where Σ =
x⊤ x/n ∈ RM×M .
n
n
def
f L+1 /n, then
If we further define γ =
x⊤ W
0

f L+1 = W
f L+1 − xΣ+ γ
ΠW
0
0

and

√

1
nx+⊤ c = √ xΣ+ c.
n

a.s.

a.s.

f L+1 is independent from x, and Σ −−→ Σ̊ for some
By the Master Theorem, γ −−→ 0 because W
0
PSD matrix Σ̊. At this point in the program, all (multi-)scalars we used (like c) are constant with n
and can be absorbed into nonlinearities. By the rank stability property of any program without scalars
a.s.
[44], the rank of Σ is fixed for large enough n, almost surely, so Σ+ −−→ Σ̊+ by the continuity of
pseudo-inverse on fixed-rank matrices. Therefore, we have
c
c
a.s.
a.s.
√ , γ −−→ 0 =⇒ Σ+ √ , Σ+ γ −−→ 0.
n
n
Thus, the mathematical conditioning done in Eq. (3.9) is achieved programmatically as follows:
f L+1 as an initial vector and c (the value of f0 ) as initial scalars
1. We introduce W
0
2. We introduce Σ as a multi-scalar via Σ := x⊤ x/n (Nonlin1 followed by Avg)
f L+1 /n (Nonlin1 followed by Avg)
3. We introduce γ as a multi-scalar via γ := x⊤ W
0

c L+1 (an initial vector) in the program with (the non-initial vector)
4. We replace W
0
c L+1 := xΣ+ √c + W
f L+1 − xΣ+ γ
W
0
E
n
f L+1 ; Σ, γ, c, θf = √1 ).3
constructed using Nonlin1 (x, W
0

n

2

We cannot define it using Avg + OuterNonlin because, intuitively, the mechanism of this convergence is
through CLT, not Law of Large Numbers.
3
recall θf from Eq. (3.2).

45

a.s.
c L+1 ⟩ = 8W
f L+1 ⟩. Intuitively, this means that,
Since Σ+ √cn , Σ+ γ −−→ 0 as above, we have 8W
0
E
f L+1 is practically the same as
even after conditioning on f0 = c, the conditional distribution of W
0
the original distribution. We can then proceed exactly as in the case when aL+1 + bL+1 > 1/2,
c L+1 taking the role of W
c L+1 . The program then encodes the evolution of f conditioned on
with W
0
E
4
f0 = c.
Assumption 3.1.1. For the above reason, we will assume aL+1 + bL+1 > 1/2, and remark whenever
the case aL+1 + bL+1 = 1/2 involves subtleties.

First Backward Pass
Next, we write the backward pass
c L+1 ⊗ 1M
dxL
0 := W

Nonlin1

0
l
dh0 := dxl0 ⊙ ϕ′ (hl0 )
dxl−1
:= W0l⊤ dhl0
0

Nonlin1
MatMul

where 1M is the M-dimensional vector of all 1s, recall, dz mathematically equals θf−1 ∇z f .
The error signal at the output is expressed using Nonlin1 followed by Avg as in Lemma 2.6.2.5
χ0 := ε0 (f0 ).
Mirroring Eq. (3.5), we also define
δW1L+1 := −ηQL+1
(xL
0 χ0 )
0

Nonlin1

to represent the (normalized) change in W L+1 due to the first gradient step.
tth Forward Pass, t ≥ 1
Overview We iteratively define δzt to mathematically represent θz−1 (zt − zt−1 ), for z ∈ {xl , hl }l .
Then we eventually set
zt := z0 + θz δz1 + · · · + θz δzt
= Nonlin1 (z0 , δz1 , . . . , δzt ; θz )
c L+1 + θL+1 (δW L+1 + · · · + δWtL+1 ). In
Likewise, we will define δWtL+1 so that WtL+1 = θf W
0

1

the program, we will not directly use WtL+1 but instead use its normalized version
ctL+1 := W
c L+1 + θL+1/f (δW L+1 + · · · + δWtL+1 )
W
0

(3.10)

1

c L+1 , δW L+1 , . . . , δWtL+1 ; θL+1/f )
= Nonlin1 (W
0
1
L+1
c
where θL+1/f = θL+1 /θf . Mathematically, Wt
= θf−1 WtL+1 .

(3.11)

The Construction of (Pre)Activations We start with h = h1 : By Eq. (3.7), we have
δht := −ηQ1t (dht−1 Diag(χt−1 )ξ ⊤ )ξ = Nonlin1 (dht−1 ; ξ, η, χt−1 ).
For higher layers, if for brevity we write h = hl , x = xl−1 , and W = W l , then h = W x. By
Eq. (3.6), we have, mathematically,
θh δht = θx Wt−1 δxt + (Wt − Wt−1 )xt
!
t−1
X
= θx W0 δxt +
(Ws − Ws−1 )δxt + (Wt − Wt−1 )xt
s=1

= θx

W0 δxt − ηθW

t−1
X

δxt
Qls−1 (dhs−1 Diag(χs−1 )x⊤
s−1 )

!

n

s=1

xt
− ηθW Qlt−1 (dht−1 Diag(χt−1 )x⊤
.
t−1 )
n
4

Formally, we can also have c as initial scalars, but since they are fixed with n, they can be absorbed into the
c L+1 .
Nonlin that defines W
E
5
˚
Here, f0 = 0 if aL+1 + bL+1 > 1/2; otherwise, f0 = f˚0 is the c we conditioned on in Eq. (3.9).

46

Recall θx/h = θh−1 θx , θW/h = θh−1 θW , θW x/h = θh−1 θW θx . We construct
δht := θx/h W0 δxt − ηθW x/h

t−1
X

Qls−1 (dhs−1 Diag(χs−1 )x⊤
s−1 )

s=1

δxt
n

xt
− ηθW/h Qlt−1 (dht−1 Diag(χt−1 )x⊤
t−1 )

n
= Nonlin2 (MatMul(W0 , δxt ), dh0 , . . . , dht−1 ;
x0 , . . . , xt−1 , δxt ;
η, θx/h , θW x/h , θW/h , χ0 , . . . , χt−1 )
If x = xl , h = hl , then x = ϕ(h), and (using θx = θh (Eq. (3.1))),
δxt := θh−1 (ϕ(ht−1 + θh δht ) − ϕ(ht−1 ))
= Nonlin1 (ht−1 , δht ; θh )

(3.12)

where the function in Nonlin1 is precisely the difference quotient for the function ϕ.6
The Function Outputs We do not construct ft directly, but rather through scalars δft = ft − ft−1 ,
so that
Nonlin1

ft := f0 + δf1 + · · · + δft .

L+1⊤
L
Mathematically, δft = θL+1 δWtL+1⊤ xL
t + Wt−1 θL δxt , but we shall write it slightly differently
in the program:

c L+1⊤ L
δWtL+1⊤ xL
t
′ Wt−1 δxt
+ θLf
n
n
c L+1 , δxL ; θ′ , θ′ ))
= Avg(Nonlin1 (δWtL+1 , xL
,
W
t
t
L+1 Lf
t−1

′
δft := θL+1

′
′
c L+1 is constructed in Eq. (3.10).
where θL+1
= nθL+1 , θLf
= nθL θf and W
t−1

tth Backward Pass, t ≥ 1
In the last layer, we construct
c L+1 ⊗ 1N .
dxL
t := Wt

Nonlin1

ctL+1 and the vector 1N ).
(i.e., outer product between the vector W
For each l = L, . . . , 1 for dhl and l = L, . . . , 2 for dxl−1 , we also calculate
dhlt := dxlt ⊙ ϕ′ (hlt ) = Nonlin1 (dxlt , hlt )
dxl−1
:= W0l⊤ dhlt − ηθW l
t

t−1
X

l⊤
l
Qls (xl−1
s Diag(χs )dhs )dht /n

s=0
l−1
= Nonlin2 (MatMul(W0l⊤ , dhlt ), xl−1
0 , . . . , xt−1 ;

dhl0 , . . . , dhlt−1 , dhlt ;
η, θW l , χ0 , . . . , χt−1 )
Using Lemma 2.6.2, we define the error signal
χt := εt (ft ) = Avg(Nonlin1 (; ft )).
Finally, we compute the (normalized) change in W L+1 after this update as in Eq. (3.5).
L+1
1
L
δWt+1
:= −ηQL+1
(xL
t
t χt ) = Nonlin (xt ; χt , η)
6
The pseudo-Lipschitzness of ϕ′ assumed in Assumption 2.8.2 implies that the nonlinearity (the difference
quotient function) represented by Nonlin1 here is pseudo-Lipschitz, so that we can ultimately apply our Master
Theorem.

47

3.1.3

The Infinite-Width Limit

In this section, we describe the kets (Definition 2.6.5) corresponding to the vectors of the program
constructed above. According to the Master Theorem, each such vector z will have roughly iid
coordinates distributed like 8z⟩ in the large n limit.
Let θ̊• denote the limit of any θ• in Section 3.1.1. If pseudostability holds, then θ̊• is either 0 or 1, as
one can easily verify. We can construct the kets for each vector in the program, as follows.
1. For the first forward and backward passes, we have,
8h10 ⟩ = 8W01 ⟩ξ,
c L+1 ⟩ ⊗ 1M ,
8dxL
0 ⟩ = 8W

8xl0 ⟩ = ϕ(8hl0 ⟩),

8dhl0 ⟩ = 8dxl0 ⟩ ⊙ ϕ′ (8hl0 ⟩),

0

2. For z ∈ {xl , hl }l , we have

l+1 l
8hl+1
x0 ⟩,
0 ⟩ = 8W0

l⊤
l
8dxl−1
0 ⟩ = 8W0 dh0 ⟩

8zt ⟩ = 8z0 ⟩ + θ̊z 8δz1 ⟩ + · · · + θ̊z 8δzt ⟩

(3.13)

where θ̊xl = θ̊hl = I(r≤l = 0).

3. For l ∈ [L], x = xl , h = hl , we have 8δxt ⟩ = Ψ(8ht−1 ⟩, 8δht ⟩; θ̊h ) where Ψ is the
nonlinearity represented by Nonlin1 in Eq. (3.12). If θ̊h = 0 (e.g. if r≤l > 0), then
8δxt ⟩ = ϕ′ (8ht−1 ⟩) ⊙ 8δht ⟩.

(3.14)

8δxt ⟩ = ϕ(8ht ⟩) − ϕ(8ht−1 ⟩).

(3.15)

8δht ⟩ = −η8dht−1 ⟩χ̊t−1 ξ ⊤ ξ.
where the bar notation abbreviates Q1t−1 .

(3.16)

Otherwise, θ̊h = 1 (e.g. if r≤l = 0), and
1

4. For h = h , we have

5. For l ≥ 2, h = hl , x = xl−1 , W = W l , we have
8δht ⟩ = θ̊x/h 8W0 δxt ⟩ − η θ̊W x/h

t−1
X
s=0

8dhs ⟩ χ̊s ⟨xs 8δxt ⟩

− η θ̊W/h 8dht−1 ⟩ χ̊t−1 ⟨xt−1 8xt ⟩.

(3.17)

Here, as is everywhere else, the bar notation abbreviates Qlt where l, t are the same as the
super/subscripts in 8dhlt ⟩ or ⟨dhlt 8 contained inside. Note at least one of θ̊x/h and θ̊W/h
equals 1; the exact formulas are
θ̊x/h = I(rl ≥ r≤l−1 )
θ̊W/h = I(rl ≤ r≤l−1 )
θ̊W x/h = I(rl = 0 & r≤l−1 = 0).
As usual, we can decompose 8W0 δxt ⟩ by Definition 2.6.5.
8W0 δxt ⟩ = 8W0 δxtˆ⟩ + 8W0 δxt˙⟩

= 8W0 δxtˆ⟩ + 8dh<t ⟩⟨∇dh<t 8δxt ⟩.

where dh<t is the multi-vector (dh0 , . . . , dht−1 ). Here we simplified 8W0 δxt˙⟩ because
8δxt ⟩ only depends on dh<t among previous vectors.
6. For last layer weight
8δWtL+1 ⟩ = −η8xL
(3.18)
t−1 ⟩χ̊t−1
(where the bar notation abbreviates QL+1
t−1 ) and

ctL+1 ⟩ = 8W
c L+1 ⟩ + θ̊L+1/f (8δW L+1 ⟩ + · · · + 8δWtL+1 ⟩)
8W
0
1

where θ̊L+1/f = I(bL+1 = cL+1 ).7
7

This equation here assumes bL+1 ≤ cL+1 as in Item 4.

48

(3.19)

7. The output deltas have limits
′
L
′
c L+1
δ f˚t = θ̊L+1
⟨δWtL+1 8xL
t ⟩ + θ̊Lf ⟨Wt−1 8δxt ⟩

(3.20)

′
′
where θ̊L+1
= I(aL+1 + cL+1 = 1) and θ̊Lf
= I(r + aL+1 + bL+1 = 1), and

f˚t = f˚0 + δ f˚1 + · · · + δ f˚t ,
where f˚0 = 0 if aL+1 + bL+1 > 1/2 (Assumption 3.1.1); otherwise (aL+1 + bL+1 = 1/2),
f˚0 equals the value (from the initial NNGP) we conditioned on (as specified in the discussion
above Assumption 3.1.1).
8. For gradients:
c L+1 ⟩ ⊗ 1M
8dxL
t ⟩ = 8W t

8dhlt ⟩ = 8dxlt ⟩ ⊙ ϕ′ (8hlt ⟩)

l⊤
l
8dxl−1
t ⟩ = 8W0 dht ⟩ − η θ̊W l

t−1
X
s=0

l
l
8xl−1
s ⟩ χ̊s ⟨dhs 8dht ⟩

(3.21)

where θ̊W l = I(rl = 0).
9. Error signal
χ̊t = εt (f˚t ).
From this description of the infinite-width limit, it’s clear that the resulting dynamics is both faithful
and stable.
Lemma 3.1.2. Eqs. (2.25) to (2.27) imply stability and faithfulness.
3.1.4

r = 0 Implies Feature Learning

In this section, we implement Item 4(a)iii of the proof outline.
Theorem 3.1.3. Adopt Assumption 2.8.2. Consider a parametrization satisfying Eqs. (2.25) to (2.28).8
If r = 0, then the following are true of this parametrization:
1. not in the operator regime
2. feature learning
3. feature learning in the Lth layer
4. feature kernels evolution
5. feature kernel evolution in the Lth layer
6. prefeature learning
7. prefeature learning in the Lth layer
8. prefeature kernels evolution
9. prefeature kernel evolution in the Lth layer
10. if there is feature learning or feature kernel evolution or prefeature learning or prefeature
kernel evolution in layer l, then there is feature learning and feature kernel evolution and
prefeature learning and prefeature kernel evolution in layers l, . . . , L.
Proof. WLOG, assume M = 1 where the sole input is nonzero; our construction will work obviously
for general M by masking the error signal εt . Correspondingly, we use notation hl instead of hl , etc.
8

For reader’s convenience, these equations are resp. the proposed conditions for stability at init, faithful at
init, stable and faithful throughout training, and nontriviality.

49

Outline We will show that as learning rate η → ∞, ⟨hl1 8hl1 ⟩, ⟨xl1 8xl1 ⟩ → ∞, so that ⟨hl1 8hl1 ⟩ ̸=
⟨hl0 8hl0 ⟩ and ⟨xl1 8xl1 ⟩ ̸= ⟨xl0 8xl0 ⟩ for sufficiently large η. This would imply (pre)feature kernel
evolution and (pre)feature learning of the parametrization. In addition, we will show that f˚1 (output
of function after 1 step of update) asympotically grows like η s for some s > 0. If s ̸= 1, then the
dynamics cannot satisfy the the operator equation Eq. (2.29), which is linear in η. If s = 1, then we
can calculate that limη→∞ η −1 f˚1 ̸= ∂η f˚1 |η=0 , so that the update is not perfectly linear in η, violating
Eq. (2.29), so we are not in the operator regime. The other claims will also naturally follow over the
course of the proof.
The general reasoning is that, when η is large, by the asymptotic homogeneity of ϕ
j
(Assumption 2.8.2(3)), 8hl1 ⟩ should roughly be of order η 1+δ+···+δ where j is the number of
ℓ ≤ l with rl = 0, and the order of 8xl1 ⟩ is the δth power of that. This would show ⟨xl1 8xl1 ⟩ → ∞.
Some further calculation shows that f˚1 is of the same order as 8xl1 ⟩ or η more than that. This would
violate the operator equation Eq. (2.29) either because f˚1 does not scale linearly in η or because it’s
not perfectly linear in η.
This reasoning should work for “generic” activations. However, for concreteness, we impose the
conditions of Assumption 2.8.2 to be able to easily prove that certain pathological behavior cannot
happen where certain inner products vanish, such as ⟨xl0 8xl1 ⟩, allowing this reasoning to become
rigorous.
Proof of theorem Let sk = 1 + δ + · · · + δ k−1 with convention s0 = 0. Let el = sσ , where σ =
Pl
ℓ=1 I(rℓ = 0) is the partial count of how many rl s are zero up to layer l. Because r = minl rl = 0,
el > 0 for some l and is nondecreasing.
def
def
Define 8h̃l1 ⟩ =
limη→∞ 8xl1 ⟩/η el and 8x̃l1 ⟩ =
limη→∞ 8xl1 ⟩/η el δ . Design ε0 so that χ̊0 = −1. Then
we can see that

∀l ∈ [0, L − 1], 8h̃l+1
1 ⟩=

(
8dhl0 ⟩ ⟨xl0 8x̃l1 ⟩ if rl+1 = 0
8W0l x̃l1 ⟩
otherwise


δ
l
relu (8h̃1 ⟩) if rl = 0
l
l
∀l ∈ [1, L], 8x̃1 ⟩ = ϕ(8h̃1 ⟩)
else if rℓ > 0 for all ℓ ≤ l

δ
l
relu (8h̃1 ⟩) otherwise
(Pre)Feature kernel evolution Using this formula and the lemmas above, we can perform an easy
induction to see that 1) 8x̃l1 ⟩ ≥ 0 and is greater than 0 with nonzero probability, and 2) ⟨h̃l1 8hl0 ⟩ ≥ 0
for all l.
eL δ
eL
This already implies that 8xL
and 8hL
in η, so the (pre)feature
1 ⟩ scales like η
1 ⟩ scales like η
kernel evolves.

Output scaling; violation of the operator equation By Eq. (2.28), either aL+1 + cL+1 = 1 (last
update is maximal) or aL+1 + bL+1 + r = 1 (last layer initialization is maximal).
If the last layer update is maximal, then its contribution to the output has the property
c L+1 − W
c L+1 8xL ⟩ = ⟨xL 8x̃L ⟩ > 0
lim η −(eL δ+1) ⟨W
1
0
1
1
0

η→∞

by Lemma 3.1.5 (and the fact that reluδ and ϕ both preserve positivity). This means that the
contribution scales like η eL δ+1 in η.
If the last layer initialization is maximal, then its contribution to the output has the property
c L+1 8xL
c L+1 8x̃L
lim η −eL δ ⟨W
1 ⟩ = ⟨W0
1⟩ > 0
0

η→∞

by Stein’s lemma and Lemma 3.1.5. This means the contribution scales like η eL δ in η.9
9

An important role of Assumption 2.8.2 is to prevent pathological cases where the above expectations vanish.

50

Thus, the output of the function scales either like η eL δ+1 or η eL δ . This means that, if the last layer
update is maximal or δ is not among the discrete set of values where eL δ = 1, then f˚1 does not scale
linearly in η.
If the last layer update is not maximal and δ takes one of such values (such as δ = 1 when rl = 0 for
exactly one l), then one can calculate
c L+1 8x̃L
c L+1 8xL
⟨W
1 ⟩ ̸= ∂η ⟨W0
1 ⟩|η=0 .
0

(3.22)

which means that f˚1 is not perfectly linear in η.
In either case, Eq. (2.29) cannot be satisfied.

The above proof (especially the section on “Output scaling”) in fact also yields the following.
Theorem 3.1.4. If Eq. (2.28) is not satisfied in Theorem 3.1.3 (but r is still 0), then the parametrization
is trivial.
Helper Lemmas
The significance of the positivity and sign preservation properties in Assumption 2.8.2 is that they
allow us to apply the following lemmas in our reasoning.
Lemma 3.1.5. If F, G : R → R preserve positivity and are nonnegative,10 then
E F (X)G(Y ) > 0
for any nonzero random variables X, Y with E XY ≥ 0.
Proof. Obviously, E XY ≥ 0 implies there is nonzero probability that both X and Y , and thus F (X)
and G(Y ) are positive. Since F and G are nonnegative, the conclusion follows.
Lemma 3.1.6. Let X, Y ∈ R be nonnegative random variables. Suppose Q preserves sign. Then the
function F : R → R defined by
def
F (z) =
E Q(zX)Y
is identically 0 if E XY = 0, but otherwise satisfies
sign F (z) = sign z, ∀z ∈ R.
Again, here sign takes value in {−1, 0, 1}.
In the language of kets, this implies: For nonnegative kets 8x⟩, 8y⟩ and any ket 8z⟩,
def
Q(8z⟩ ⟨x8)8y⟩
F (8z⟩) =

is 0 almost surely if ⟨x8y⟩ = 0 but otherwise satisfies
sign F (8z⟩) = sign 8z⟩
Proof. If E XY = 0, then XY is almost surely 0 because X and Y are nonnegative. Then Q(zX)Y
is almost surely 0 because Q preserves sign. So its expectation is 0, hence F is identically 0.
Otherwise, E XY > 0 and there is nonzero probability that X and Y are both positive. In this
event, Q(zX)Y has the same sign as z; otherwise Q(zX)Y = 0. Taking average, we see that
sign F (z) = sign z as desired.

3.2

Proof of Maximal Update Limit

In µP (Definition 2.5.1), all of the θ̊s in Section 3.1.3 will equal 1. Some straightforward
simplifications then lead to Theorem 2.5.2 for the shallow case and Theorem 2.7.1 for the deep case.
ctL+1 in
(We made some simplification in notation as well: wtL+1 in Theorem 2.7.1 corresponds to W
Section 3.1.3 and wt1 in Theorem 2.7.1 corresponds to Wt1 in Section 3.1.3)
10

Obviously F, G need to be measurable for the expectation to make sense but let’s not get too pedantic;
rather all functions in this paper are measurable by default.

51

3.3

Proof of Neural Tangent Limit

In this section, we prove Theorem 2.4.7 by specializing the limit formula in Section 3.1.3 above for
general abcd-parametrizations.
In NTP (Definition 2.4.1), all rl equal 1/2 (Eq. (2.23)). In particular, from Eq. (3.13), we see that
8xlt ⟩ = 8xl0 ⟩,

8hlt ⟩ = 8hl0 ⟩

for all l and all t. Likewise, from Eq. (3.19), we see that

and from Eq. (3.21), that

ctL+1 ⟩ = 8W
c L+1 ⟩
8W
0
c L+1 ⟩ ⊗ 1M
8dxL
t ⟩ = 8W t

8dhlt ⟩ = 8dxlt ⟩ ⊙ ϕ′ (8hlt ⟩)

so that, inductively,

l⊤
l
8dxl−1
t ⟩ = 8W0 dht ⟩

8dxlt ⟩ = 8dxl0 ⟩, 8dhlt ⟩ = 8dhl0 ⟩
for all l and all t. These consequences justify the notational decision to drop the t subscript in
Section 2.4. We now adopt this notation as well in the rest of this section. However, note that δ f˚t ,
δWtL+1 , δhlt , and δxlt still vary with t.
In addition, plugging in the NTP values of abcd to Eqs. (3.14), (3.20) and (3.17) gives
8δxlt ⟩ = ϕ′ (8hl ⟩) ⊙ 8δhlt ⟩.

l
l−1 8xl−1 ⟩
8δhlt ⟩ = 8W0 δxl−1
t ⟩ − η8dh ⟩ χ̊t−1 ⟨x

c L+1 8δxL
δ f˚t = ⟨δWtL+1 8xL ⟩ + ⟨W
t ⟩

(3.23)
(3.24)
(3.25)

To show Theorem 2.4.7, we need to calculate δ f˚t and show it equals −ηKQ (χ̊t−1 ).
There are two contributions to δ f˚t from Eq. (3.25). We first calculate the former. By Eq. (3.18),
L
⊤
L
⟨δWtL+1 8xL
t ⟩ = −ηχ̊t−1 ⟨xt−1 8xt ⟩
L
L
= −ηχ̊⊤
t−1 ⟨x 8x ⟩

(3.26)

(where the bar notation abbreviates QL+1
t−1 ) which matches with the output weight contribution from
Eq. (2.8).
To calculate the latter term from Eq. (3.25), we employ the following lemma.
Lemma 3.3.1. For any l ∈ [2, L],
⟨dhl 8δhlt ⟩ = ⟨dhL−1 8δhtL−1 ⟩ − η⟨dhl 8dhl ⟩ χ̊t−1 ⟨xl−1 8xl−1 ⟩.

For l = 1, we have

⟨dh1 8δh1t ⟩ = −η⟨dh1 8dh1 ⟩χ̊t−1 ξ ⊤ ξ.
Proof. For l = 1, this follows trivially from Eq. (3.16). For l ∈ [2, L], by Eq. (3.24),
l
l
l−1 8xl−1 ⟩.
⟨dhl 8δhlt ⟩ = ⟨dhl 8W0l δxl−1
t ⟩ − η⟨dh 8dh ⟩ χ̊t−1 ⟨x

So it remains to show ⟨dhl 8W0l δxtl−1 ⟩ = ⟨dhl−1 8δhl−1
t ⟩. But applying Lemma 4.8.3,
l−1
l⊤
l
l−1
⟨dhl 8W0l δxl−1
8δxl−1
t ⟩ = ⟨W0 dh 8δxt ⟩ = ⟨dx
t ⟩

= ⟨dxl−1 8ϕ′ (hl−1 ) ⊙ δhl−1
t ⟩
= ⟨dxl−1 ⊙ ϕ′ (hl−1 )8δhl−1
t ⟩

as desired.

= ⟨dhl−1 8δhl−1
t ⟩

52

Then the latter term from Eq. (3.25) is
L
L
c L+1 8δxL
c L+1 8ϕ′ (hL ) ⊙ δhL
c L+1 ⊙ ϕ′ (hL )8δhL
⟨W
t ⟩ = ⟨W
t ⟩ = ⟨W
t ⟩ = Diag⟨dh 8δht ⟩

which, by Eq. (3.26) and a trivial induction with Lemma 3.3.1, gives

δ f˚t = −ηKQ (χ̊t−1 ) = −ηKQ (εt−1 (f˚t−1 ))
as desired.

53

Chapter 4

Proof of Master Theorem
To prove our main foundational theorem Theorem 2.6.10, we had an editorial choice: we could bash
our way to a proof by repeating (over and over again) analytical arguments involving the likes of
Holder and Cauchy-Schwarz, or we could encapsulate them into neat objects with neat properties
that then make the underlying algebraic structure more transparent. Even though the writing is more
arduous, we chose the latter way, because of this transparency and because it builds a more extensible
foundation for future work.1 The drawback is perhaps that there can be many long sections building
up the underlying structures before the payoff — but that’s the choice we made, and the reader is
stuck with it, for better (hopefully) or worse.

4.1

Basic Tools

Here we just record some basic lemmas that we would use frequently. The reader can skip this on
first read and come back when necessary.
Lemma 4.1.1. For an integer m, and complex numbers ai ∈ C, i ∈ [k],
k
X

m

ai

≤ k m−1

i=1

k
X

m

|ai | .

i=1

Proof. Expand the power in the LHS using the multinomial theorem, apply AM-GM to each
summand, and finally aggregate using triangle inequality.
Lemma 4.1.2. Let {Xn }n≥1 be a sequence of random variables with zero mean. If for some p ∈ N
and for all n, E Xn2p ≤ cn−1−λ , for some λ > 0, then Xn → 0 almost surely.
Proof. By Markov’s inequality, for any ϵ > 0,
X
n

Pr(|Xn | > ϵ) = Pr(Xn2p > ϵ2p ) ≤ E Xn2p /ϵ2p ≤ cn−1−λ /ϵ2p
X
Pr(|Xn | > ϵ) ≤
cn−1−λ /ϵ2p < ∞.
n

By Borel-Cantelli Lemma, almost surely, |Xn | ≤ ϵ for all large n. Then, if we pick a sequence
{ϵk > 0}k converging to 0, we have that, almost surely, for each k, |Xn | ≤ ϵk for large enough n —
i.e. almost surely, Xn → 0.
Lemma 4.1.3. Let x ∈ Rn be a random vector with iid components such that E x1 = 0 and
E |x1 |p < ∞ for all integer p ≥ 1. Then there exist constants Cp , independent of n, for all p ≥ 1
def 1 Pn
√
such that S =
α=1 xα satisfies
n
E |S|p < Cp ,

∀p ≥ 1.

1
extensible in the sense that properties can be used as black-boxes for more advanced theorems. This is
definitely a more algebraic style, compared to analysts who tend to open black boxes and constantly tweak the
insides.

54

Figure 4.1: A graphical illustration of Baranyai’s Theorem for n = 8, r = 2. Here G82 is just the
usual complete graph on 8 vertices. A perfect matching here reduces to the usual meaning on graphs:
a set of 4 edges that covers all 8 vertices. Every edge above is colored, and for each color, the edges
with that color form a perfect matching. Image source: wikipedia.org

Furthermore, Cp can be taken to be Pp (ν1 , ν2 , . . . , νp ) where
• νk is an upper bound on the signed kth moment E xk1 of x1
• Pp is a polynomial that depends only on p.
Proof. See [12, prop H.2].
4.1.1

Review of Moore-Penrose Pseudo-Inverse

We recall Moore-Penrose pseudo-inverse and some properties of it.
Definition 4.1.4. For A ∈ Rn×m , a pseudo-inverse of A is defined as a matrix A+ ∈ Rm×n that
satisfies all of the following criteria
AA+ A = A,

A+ AA+ = A+ ,

(AA+ )⊤ = AA+ ,

(A+ A)⊤ = A+ A.

The following facts are standard.
• If A has real entries, then so does A+ .
• The pseudo-inverse always exists and is unique.
• When A is invertible, A+ = A−1 .
• (A⊤ )+ = (A+ )⊤ , which we denote as A+⊤ .
• A+ = (A⊤ A)+ A⊤ = A⊤ (AA⊤ )+ .
• AA+ is the orthogonal projector to the column space of A; I − A+ A is the orthogonal
project to the null space of A.
• If A has singular value decomposition A = U ΛV where U and V are orthogonal and Λ has
the singular values on its diagonal, then A+ = V ⊤ Λ+ U ⊤ where Λ+ inverts all nonzero
entries of Λ.
Pn
• For any collection of vectors {vi }ni=1 in a Hilbert space, w 7→ i,j=1 vi (Σ+ )ij ⟨vj , w⟩,
where Σij = ⟨vi , vj ⟩, is the projection operator to the linear span of {vi }ni=1 .
55

4.1.2

Baranyai’s Theorem

The complete hypergraph Gnr is a hypergraph containing n vertices in which every subset of r vertices
forms a hyperedge. A perfect matching of it is a set of n/r hyperedges that (thought of as subsets of
vertices) partitions the vertices of Gnr .

Theorem 4.1.5 (Baranyai’s Theorem). Suppose
integer r divides integer n. The collection of all nr

hyperedges in Gnr can be partitioned into nr nr perfect matchings.
See Fig. 4.1 for a graphical illustration. The hyperedges of Gnr are just the r-element subsets of [n].
A version of Baranyai’s Theorem also holds for ordered r-element subsets, i.e., length-r sequences of
distinct elements of [n].
Theorem 4.1.6 (Ordered Baranyai’s Theorem). Suppose integer r divides integer n. The collection
of all n(n − 1) · · · (n − r + 1) length-r sequences of distinct elements of [n] can be partitioned into
r(n − 1) · · · (n − r + 1) perfect matchings.
The proof follows from Theorem 4.1.5 and symmetrization.

4.2

Basic Objects and Operations

In this section, we define the basic objects and operations on them recurring in our quest to understand
Tensor Programs. In the next, we describe their properties.
4.2.1

Fixed-Dimensional Random Variables and Vectors

Notation We will predominantly consider sequences of random objects indexed by an integer n
(see Section 4.2.2 below). In this context, to emphasize objects that do not vary with n, we will use
uppercase letters like X, Y, . . . for scalar random variables and their bolded versions X, Y , . . . for
random vectors, matrices, or tensors. The latter will have components denoted by superscripts, e.g.,
X = (X 1 , . . . , X k ) if X ∈ Rk .
4.2.2

Space of Random Sequences

Prior papers in the Tensor Programs series often talk about objects like scalars, vectors, and matrices
whose size varies with a global notion of “width” denoted n. Formally, each such object is a sequence
(of scalars, vectors, or matrices) in n, but to be intuitive, these works downplay this sequence aspect
(for example, by suppressing the dependence on n notationally).
However, here we need to talk about more complex high order tensors who can contain both
dimensions that scale with n and those that do not. In addition, we will formulate a notion of
“vanishing” tensors that is really an asymptotic property as n → ∞ rather than a nonasymptotic one;
this notion turns out to interact cleanly with typical operations like pseudo-Lipschitz nonlinearities
that is involved in Tensor Programs. As such, for these reasons, we will be explicit that the objects
we play with here are sequences in n:
Definition 4.2.1. For any integer s ≥ 0, denote by S s the set of all random sequences x of order-s
tensors with dimensions n × n × · · · × n (i.e., sequences x with x(n) ∈ ⊗s Rn for all n = 1, 2, . . .).
|
{z
}
s

We call the objects in S 0 , S 1 , S 2 respectively n-scalars, n-vectors, and n-matrices. For general s,
we call the objects in S s n-tensors. Often, we will drop the prefix “n-” when the context is clear.
So, for example, S 0 contains all infinite sequences of scalar random variables, and S 1 contains all
infinite sequences of random vectors of linearly increasing size.
Notation We will use Greek letters α, β, . . . (with values in [n]) to denote indices of an n-tensor.
For higher order n-tensors in S s , we also use their bolded counterparts α, β, . . . (with values in [n]s )
to denote multi-indices, where (for example) α is understood to have components α = (α1 , . . . , αs ).
For example, if x ∈ S s , then x(n) has entries {x(n)α1 ...αs : α1 , . . . , αs ∈ [n]} = {x(n)α : α ∈
[n]s }. We can also mix single indices and multi-indices, e.g., {x(n)αβ : α ∈ [n], β ∈ [n]s−1 }.
56

As in prior works, even though we will work with sequences of tensors (x(n))n≥1 , we will suppress
the dependence on n notationally and talk about x as if it’s a fixed tensor. So, for example, for an
n-matrix x, xαβ refers to the entry x(n)αβ where the n is from context.
4.2.3

Multi-Tensors

In many results we shall discuss, we often talk about lists of n-tensors, e.g., x1 , . . . , xk ∈ S s .
Going forward, it will be helpful to think of such lists as (a sequence of) a single tensor of shape
n × n × · · · × n × k (or other arrangements of dimensions, as discussed below) for each n. We
generalize this further in the following definition.
Definition 4.2.2 (Multi-Tensors). For any integers s ≥ 0 and k ≥ 0, let S s ⊗ Rk denote the set of all
random sequences (in n) of tensors of shape n × · · · × n ×k.
{z
}
|
s

In general, suppose V = R

k1 ×···×kr

s

. Then S ⊗ V denotes the same but for shape n × · · · × n ×k1 ×
|
{z
}
s

· · · × kr . We shall call any element of such a space a multi-tensor. When s = 0, 1, 2, we also call
such elements multi-scalar, multi-vector, and multi-matrix respectively.
Intuitively, S s can be read as ⊗s Rn , so that S s ⊗ Rk1 ×···×kr can be read as Rn ⊗ · · · ⊗ Rn ⊗
Rk1 ×···×kr ∼
= Rn ⊗ · · · ⊗ Rn ⊗ Rk1 ⊗ · · · ⊗ Rkr , which makes the tensor shapes more apparent.
More abstractly, we can let V be any finite-dimensional Euclidean space, in which case S s ⊗ V is the
space of sequences of tensors with shape n × · · · × n, taking values in V. However, in this work, we
{z
}
|
s

will primarly concern ourselves with the V being tensor spaces as in Definition 4.2.2.
Definition 4.2.3. In this work, by Euclidean space we mean any finite-dimensional real vector space.
We will use notation V and its cousins to denote such spaces.
In this abstraction, we will also talk about nonlinearities that map between Euclidean spaces (e.g.,
ψ : V → V ′ ), generalizing the scalar functions (e.g., ψ : Rk → R) typical of prior works. This
generality allows us to compose nonlinearities more naturally, which simplifies our presentation
conceptually and our proofs technically.
Notation We will always use lower case letters x, y, z, . . . to denote n-tensors (i.e., elements of S • ).
On the other hand, we will always use their bolded counterparts x, y, z, . . . to denote multi-tensors
(i.e., elements of S • ⊗ V).
We think of a multi-tensor as a (fixed-size) tuple of n-tensors: for example, x ∈ S s ⊗ Rk is thought of
as a tuple (x1 , . . . , xk ) of n-tensors xi ∈ S s . As in this example, we will always use letters i, j, k, . . .
in superscript for “constant-sized” indices (corresponding to Rk in the example) to distinguish from
the Greek letters α, β, . . . in subscript for the “n-sized” indices. This is consistent with the notation
in Section 4.2.1 for fixed-dimensional objects. So x here has elements {xiα : α ∈ [n]s and i ∈ [k]}.
In particular, for any α ∈ [n]s , xα = {xiα }i ∈ Rk ; for any i ∈ [k], xi = {xiα }α ∈ S s . Note that
when we pick the ith component xi of x, the letter x is not bolded.
In contrast, we will need to talk about a list of multi-tensors as well, x1 , . . . , xr , where we use the
superscript letters r, s, t, . . . to denote the indices of this list. Each multi-tensor has components
t
t
xt = {xti }i = {xti
α }i,α = {xα }α . Again, notationally, notice that x means a multi-tensor in a
i
sequence, but x means the ith component of multi-tensor x.
4.2.4

Constant Tensors

Definition 4.2.4 (Notation for constant sequences). Often we will need to talk about some sequence
(in n) that equals a fixed value, say ϑ, for all n. Then we shall denote this sequence by ϑ as well,
which should not cause confusion in our contexts.
57

4.2.5

IID Tensors
d

Definition 4.2.5. Let X be any random object. Then X 1 , X 2 , . . . denote iid copies of X: X i =
X for all i and X, X 1 , X 2 , . . . are mutually independent. If Y is another random object, then
d
Y 1 , Y 2 , . . . are iid copies of Y that furthermore satisfy (X i , Y i ) = (X, Y ) for each i.
In other words, the collection of all objects with superscript i forms an “isomorphic world” to the
collection with superscript j . We will always use the above notation when we want to make a
“constant number” (wrt n) of iid copies (except in Definition 4.2.6 below). However, we will also at
times need to make n (or powers of n) iid copies, for which we use the following notation instead.
We first give the general but abstract definition before substantiating it with examples.
Definition 4.2.6. For every integer s ≥ 0, We define the iid operator
iid : S s ⊗ V → S s+1 ⊗ V
as follows. If x ∈ S s ⊗ V, then iid(x) ∈ S s+1 ⊗ V is the multi-tensor satisfying, for any α ∈ [n],
iid(x)(n)α = x α (n).
Example 4.2.7. If Z ∈ R is a (scalar) random variable, we can think of Z as the sequence in S 0
identically equal to Z (c.f. Definition 4.2.4). Then iid(Z) denotes the sequence in S 1 where, for each
n ≥ 1, the nth element iid(Z)(n) is the n-dimensional random vector where each entry is an iid
copy of Z.2
Similarly, if Z ∈ V for some Euclidean space V, then for each n, iid(Z)(n)α is an iid copy of Z for
every α ∈ [n].
In general, if Z ∈ Rk1 ×···×kr is a random tensor, then iid(Z) ∈ S 1 ⊗ Rk1 ×···×kr is the sequence
whose nth element is the shape-(n × k1 × · · · × kr ) tensor iid(Z)(n) where, for each α ∈ [n],
iid(Z)(n)α is an iid copy of Z.
Example 4.2.8. If Z ∈ R is a random variable, then iid2 (Z) = iid(iid(Z)) is the sequence of n × n
matrices with iid entries drawn from Z.
When we iterate iid and want to clarify or emphasize the shape information, we will also write iidn
for iid, iidn×n for iid2 , iidn×n×n for iid3 , and so on. So iidn×n (N (0, 1)) is the sequence of n × n
standard Gaussian matrices.
Remark 4.2.9. Note that iid is only well defined up to distributional equality. Thus, if for example
one wants to prove almost sure equality and the proof involves iid, then one needs to carefully check
that the usage of iid makes sense.
4.2.6

Averaging over n

Definition 4.2.10. Let V be a finite-dimensional Euclidean space, and let x ∈ S s+r ⊗ V be a
multi-tensor. For α ∈ [n]s , β ∈ [n]r , we write
X
def 1
xαβ ∈ S s ⊗ V
⟨xαβ ⟩β =
r
n
r
β∈[n]

for averaging over multi-index β while fixing multi-index α.
D 
E
This notation can be nested, e.g., F ⟨xαβ ⟩β
for some function F . When F is identity, this is
obviously just ⟨xγ ⟩γ .
4.2.7

α

Implicit Broadcasting of Nonlinearities on Multi-Tensors

Given a nonlinearity ϕ : Rk → R and n-vectors x1 , . . . , xk , the expression y = ϕ(x1 , . . . , xk )
denotes another n-vector y with entries yα = ϕ(x1α , . . . , xkα ) (with the multi-tensor notation x =
2

Furthermore, iid(Z)(n) is identical to the first n elements of iid(Z)(n + 1). However, we will never use
this fact here.

58

(x1 , . . . , xk ), we can also write y = ϕ(x)). In the terminology of linear-algebra software (such as
numpy), we say “ϕ is implicitly broadcast across the dimension n.”
In general, this implicit broadcast rule holds for any n-tensors or multi-tensors.
Definition 4.2.11. Let V be any finite-dimensional Euclidean space (e.g., V = Rk1 ×···×kr ). For any
multi-tensor x ∈ S s ⊗ V and ϕ : V → R, the expression ϕ(x) denotes a new n-tensor y ∈ S s with
yα = ϕ(xα ).3
More generally, if V ′ is another Euclidean space and ϕ : V → V ′ , then ϕ(x) ∈ S s ⊗ V ′ with
yα = ϕ(xα ).
In other words, the implicit broadcasting lifts ϕ : V → V ′ to a function ϕ : S s ⊗ V → S s ⊗ V ′ for
any s ≥ 0.
4.2.8

Nonlinear Outer Products

An outer product of two vectors x, y is the matrix W with entries Wαβ = xα yβ . This can be written
trivially as Wαβ = ψ(xα ; yβ ) for ψ(−; −) being the product function. This is generalized by a
notion of nonlinear outer product, where ψ can be any function, not just product. We make the
definition below in full generality, but for first reading, it may help to mentally set V1 , . . . , Vr , V ′ to
be R to understand the basic idea.
Definition 4.2.12 (Nonlinear Outer Product). Let V1 , . . . , Vr , V ′ be any finite dimensional Euclidean
spaces. Suppose ψ : V1 ⊕ · · · ⊕ Vr → V ′ , where we format ψ’s arguments in blocks ψ(−; −; · · · ; −),
with the tth block “−” corresponding to Vt . Then given xt ∈ S st ⊗ Vt for t = 1, . . . , r, we write
ψ(x1 ; · · · ; xr )
for the multi-tensor y in S

P

t st

⊗ V ′ with entries

yα1 ···αr = ψ(x1α1 ; · · · ; xrαr ),

for all αt ∈ [n]st .

We call this the ψ-outer product of x1 , . . . , xr .
Let’s unpack the multi-tensor notation a bit. For example, if xt = (xt1 , xt2 ) for every t = 1, . . . , r,
then
12
r1
r2
ψ(x1 ; · · · ; xr )α1 ···αr = ψ(x11
α1 , xα1 ; · · · ; xαr , xαr ).
In other words, arguments in the same block have matching (multi-)indices, while arguments in
different blocks have freely varying indices. This in particular generalizes Definition 4.2.11, which
applies when there is only one block in ψ. Likewise, the implicit broadcasting in this nonlinear
outer
P
product lifts ψ : V1 ⊕ · · · ⊕ Vr → V ′ to a function ψ : S s1 ⊗ V1 ⊕ · · · ⊕ S sr ⊗ Vr → S i si ⊗ V ′ .
We isolate the case when ψ : V1 ⊕ · · · ⊕ Vr → V ′ is the identity function with V ′ = V1 ⊕ · · · ⊕ Vr .
Definition 4.2.13. (x1 ; · · · ; xr ) is called the semicolon product of x1 , . . . , xr . It has entries
(x1 ; · · · ; xr )α1 ···αr = (x1α1 , . . . , xrαr ).
The importance of this operation is that: for any ψ, the ψ-outer product is just the composition of the
semicolon product followed by application of ψ as in Definition 4.2.11.
ψ(x1 ; · · · ; xr ) = ψ(x),

where x = (x1 ; · · · ; xr ).

(4.1)

This fact simplifies the proofs involving nonlinear outer products.
Consistency with “Nonlinearities with Parameters” The semicolon notation in nonlinear outer
product is consistent with previous papers in the Tensor Programs series. There, the nonlinearities are
all of the form ψ : Rk ⊕ Rl → R, applied to k n-vectors x1 , . . . , xk and l n-scalars θ1 , . . . , θl of the
program to produce a single vector:
ψ(x1 , . . . , xk ; θ1 , . . . , θl ).
In light of Definition 4.2.12, this is now interpreted as a ψ-outer product of the multi-vector x =
(x1 , . . . , xk ) and the multi-scalar θ = (θ1 , . . . , θl ).
3

Unpacking this a bit: for each α ∈ [n]s , xα ∈ V, so ϕ(xα ) is well-defined and yields a value in R

59

4.3

Vanishing and Bounded Moments

4.3.1

Moment-Bounded Multi-Tensors

For the following discussion, let V be finite-dimensional Eucldiean spaces and let x ∈ S s ⊗ V be a
multi-tensor. For first time reading, one may mentally set V = R, so that S s ⊗ V = S s , to get the
basic intuitions more quickly.
In this work, we will especially focus on x where each entry of x(n) has “typical size O(1)” as
n → ∞. We formalize this “typical size O(1)” criterion as follows.
Definition 4.3.1. We say a multi-tensor x is entrywise moment-bounded, or just moment-bounded
for short, if the following holds: for every integer p ≥ 1
∥xα ∥pp α = Õ(1).
with Õ from Definition 1.2.5. We write Sbs ⊗ V for the space of such multi-tensors.
Unpacking the big-O notation, x is moment-bounded iff, for every integer p ≥ 1 and every ϵ > 0, we
have
a.s.
n−ϵ · ∥xα ∥pp α −−→ 0, as n → ∞.
Intuitively, if one thinks of the entries xα as samples from a distribution D, then ∥xα ∥pp α is the
(empirical) pth moment of D. Thus, moment-boundedness just means that D has bounded empirical
moments of every order (ignoring logarithmic factors), i.e., samples from D has typical size O(1).
Basic Properties
First, one can note the following trivial property that is useful for simplifying proofs.
Proposition 4.3.2. x = (x1 , . . . , xk ) is moment-bounded iff each of its components x1 , . . . , xk is
moment-bounded.
A related property holds for “components along n”:
Proposition 4.3.3. If random Z ∈ Rk has all moments, then iidr (Z) is moment-bounded for all
r ≥ 0.
Moment-boundedness is closed under applications of polynomially bounded functions: in short,
• ψ(x) is moment-bounded if x is, and
• more generally, ψ(x1 ; · · · ; xr ) is moment-bounded if x1 , . . . , xr are.
We make this formal in the following
Proposition 4.3.4. Consider moment-bounded multi-tensors xt ∈ Sbst ⊗ Vt for each t = 1, . . . , r.
′
1
r
Let ψ(−; · · · ; −) : V1 ⊕ · · · ⊕ Vr → V
P be polynomially bounded. Then ψ(x ; · · · ; x ) is moment1
r
′
t st
bounded as well: ψ(x ; · · · ; x ) ∈ Sb
⊗V .
For example, for r = 1, when we take ψ : R2 → R as the sum and product functions, we have that
Sbs is closed under entrywise sum and product. Similarly, when we take ψ : Rk×l+l×m → Rk×m to
be the matrix multiplication function (multiplying matrices of sizes k × l and l × m to get one of size
k × m), we derive the closure of Sbs ⊗ Rk×k under matrix multiplication (after setting l = m = k).
Proof. By polynomially-boundedness of ψ, for any q > 0, there are C, p such that, for any z t ∈
Vt , t = 1, . . . , r, we have
∥ψ(z 1 ; · · · ; z r )∥qq ≤ C(1 + ∥z 1 ∥pp + · · · + ∥z r ∥pp ).
Therefore, for β ∈ [n]s ,
∥ψ(x1α1 ; · · · ; xrαr )∥qq α ···α ≤ C (1 + ∥x1α1 ∥pp + · · · + ∥xrαr ∥pp ) α ···α
1
r
1

 r
1 p
r p
= C 1 + ∥xα ∥p α + · · · + ∥xα ∥p α .
60

a.s.

But, for each t ∈ [r], since xt is moment-bounded, we have n−ϵ ∥xtα ∥pp α −−→ 0 for any ϵ > 0.
Therefore,


a.s.
n−ϵ ∥ψ(x1α1 ; · · · ; xrαr )∥qq α ···α ≤ n−ϵ C 1 + ∥x1α ∥pp α + · · · + ∥xrα ∥pp α −−→ 0
1

r

as well. Since q and ϵ are arbitrary in this argument, this shows ψ(x1 ; · · · ; xr ) is moment-bounded.

4.3.2

Vanishing Multi-Tensors

A mentioned above, a notion of “vanishing” will play a central role in what follows:
Definition 4.3.5. We say a multi-tensors x is entrywise vanishing, or just vanishing for short, if
∥xα ∥2 α = Õ(n−1 ),
with Õ from Definition 1.2.5. We write S0s ⊗ V for the space of such multi-tensors.4
Unpacking the big-O notation, x is vanishing iff, for every ϵ > 0,
a.s.

n1−ϵ · ∥xα ∥2 α −−→ 0,

as n → ∞.

At first, using the same√
intuition as above, one may think of vanishing tensors as those whose entries
have typical size O(1/ n).
But notice that “vanishing” is defined only via L2 norm, while “moment-bounded” is defined via
every Lp norm. This is an important technical distinction. The primary purpose of this distinction is
that when x is an n-vector and W is an iid matrix with (for example) N (0, 1/n) entries,
W x is vanishing if x is; see Proposition 4.3.14.
This is because of the well-known almost sure operator-norm bounds [38, 48] on such iid matrices W .
If we defined “vanishing” based on other Lp norm as well, then we cannot make the same statement
as it will be much more difficult to control the Lp norm of W x.
As a result of this difference in the definitions, “vanishing” implies “moment-bounded” only for
scalars and vectors (i.e., S0s ⊆ Sbs only for s = 0, 1);√see Lemma 4.3.7 below. For example, consider
the n-matrix x with all-zero entries except the value n in its top left corner. It is vanishing (because
|xα |2 α = Θ(1/n)) but not moment-bounded (e.g., |xα |8 α = Θ(n2 )). The takeaway here is
that while moment-bounded tensors can be thought of as “every entry is O(1)”, vanishing tensors
can have a small number of entries that explode with n, as long as the quadratic mean of the entries
√
has size O(1/ n).
We summarize these intuitions succinctly as follows (because they are important to understand sooner
than later):
moment-bounded ≈ dense entries all of size O(1)
√
vanishing ≈ potentially sparse entries, O(1/ n) in quadratic mean.
Basic Properties
Like for moment-boundedness, the “vanishing” property is reducible to components, which makes
proofs a bit simpler.
Proposition 4.3.6. x = (x1 , . . . , xk ) is vanishing iff each of its components x1 , . . . , xk is vanishing.
As mentioned above, S0s ⊆ Sbs only for s = 0, 1.
4

We emphasize that “vanishing” is a shorthand for “entrywise-vanishing” and not interpreted as “normwisevanishing”. For example, an entrywise-vanishing vector can still have Ω(1) norm, such as the vector with entries
n−1/2 ; a random Gaussian matrix with iid N (0, 1/n) entries will have Θ(1) operator norm almost surely as
n → ∞. But since we will never talk about “normwise-vanishing,” for our purposes it will not cause confusion
to abbreviate “entrywise-vanishing” to just “vanishing.”

61

2s
Lemma 4.3.7. Let x ∈ S0s ⊗ V for Euclidean space V. Whenever s = 0, 1 or else p < s−1
, we have
a.s.

∥xα ∥pp α −−→ 0.
Consequently, S0s ⊗ V ⊆ Sbs ⊗ V for s = 0, 1. i.e., all vanishing multi-scalars and multi-vectors are
moment-bounded. But this is false for s ≥ 2.
Proof. For clarity, we prove the claim for x ∈ S0s ; the generalization to x ∈ S0s ⊗ V follows from
this case componentwise.
By Lp norm inequalities, for all p ≥ 2,
∥x(n)∥p ≤ ∥x(n)∥2
so

∥x(n)∥pp /ns ≤ ∥x(n)∥p2 /ns = K p/2

where

2

def
K=
∥x(n)∥22 /ns· p .

2s
, we have s · p2 > s − 1, so that, for any sufficiently small δ > 0,
When s = 0 or 1 or when p < s−1

K < n1−δ · ∥x(n)∥22 /ns

for all n.

But since x is vanishing, the RHS goes to 0 almost surely, and therefore so does K. We thus have
a.s.

∥x(n)∥pp /ns = ∥xα ∥pp α = K p/2 −−→ 0
as desired.
The following yields a sufficient condition for vanishing that is often easier to show than directly
showing
√ vanishing itself. Roughly speaking, it says an n-tensor is vanishing if every entry looks like
O(1/ n) as measured by every power mean expectation.
Proposition 4.3.8. Suppose v ∈ Sbs . If there exist constants Cp,ε for all ε > 0 and all integers p ≥ 1
such that we have the following inequality
2p
−p+ε
n−s E ∥v∥2p
2p = E vα α ≤ Cp,ε n

for all p, ε and n, then v is vanishing.
Proof. WLOG we assume s = 1, since the general case follows by unrolling v into a (giant) vector.
a.s.

To show v is vanshing, we need to show n−ϵ ∥v∥2 −−→ 0 for any ϵ > 0. By Lemma 4.1.2, we just need
to show that for some q, γ > 0, we have E(n−ϵ ∥v∥2 )q = O(n−1−γ ). But ∥v∥ ≤ n1/2−1/2q ∥v∥2q
for all q ≥ 1. Thus, for any q ≥ 1,
q−ϵq
E(n−ϵ ∥v∥2 )q ≤ n−ϵq E nq−1 ∥v∥2q
Cq,ε n−q+ε = nε−ϵq Cq,ε .
2q ≤ n

Whence we can take any small ε > 0 and q > (1 + ε)/ϵ to have E(n−ϵ ∥v∥2 )q = O(n−1−γ ), as
desired.
4.3.3

Equivalence Modulo Vanishing Multi-Tensors

Definition 4.3.9. Let x, y be multi-tensors of the same shape. We say x is equivalent to y, written
x ≡ y, if x − y is vanishing.
Since our writing convention suppresses n, this notation may be ambiguous: To disambiguate,
the equivalence x ≡ y is a notion between multi-tensors as sequences, i.e., it should be read as
{x(n)}n ≡ {y(n)}n , NOT as a sequence of equivalences x(n) ≡ y(n), one for each n.
The x, y here will all have Θ(1)-sized entries in our applications. By the discussion above regarding
vanishing multi-tensors, x ≡ y just means that x and y have roughly the same entries. But note that,
as vectors, matrices, or tensors, x can definitely differ from y nontrivially in norm, because e.g., a
vanishing vector can have Θ(1) norm.
We first note a trivial but useful property.
62

Proposition 4.3.10. (x1 , . . . , xk ) ≡ (y 1 , . . . , y k ) iff x1 ≡ y 1 , . . ., and xk ≡ y k .
Equivalence is preserved under most operations, as summarized below:
1. “smooth” mapping ϕ: (Proposition 4.3.11 and Proposition 4.3.12)
(a) For example, if x ≡ y are both moment-bounded, then ϕ(x) ≡ ϕ(y). This holds more
generally for “smooth” nonlinear outer products.
2. averaging over [n]: (Lemma 4.3.13)
(a) If x ≡ y, then ⟨xαβ ⟩β ≡ ⟨yαβ ⟩β
3. multiplication by operator-norm-bounded matrices: (Proposition 4.3.14)
(a) If x ≡ y are n-vectors and W is an n-matrix that almost surely has bounded operator
norm, then√W x ≡ W y. This holds in particular for W having iid, zero-mean entries of
size Θ(1/ n).
Preservation under Nonlinear Outer Products
Proposition 4.3.11. Consider multi-tensors xt , y t ∈ Sbst ⊗ Vt for each t = 1, . . . , r and a function
ψ(−; · · · ; −) : V1 ⊕ · · · ⊕ Vt → V ′ . If ψ is pseudo-Lipschitz and xt ≡ y t for all t, then
ψ(x1 ; · · · ; xr ) ≡ ψ(y 1 ; · · · ; y r ).
Proof. Note that this holds for the semicolon product (i.e., when ψ is identity and V ′ = V1 ⊕· · ·⊕Vt ):
If we shorthand ∆ = (x1 ; · · · ; xr ) − (y 1 ; · · · ; y r ), then
∆β1 ···βr = (x1β1 − yβ1 1 , . . . , xrβr − yβr r ) ∈ V ′
so that, with α = (β1 , . . . , βr ),
∥∆α ∥2 α = ∥x1β1 − yβ1 1 ∥2 + · · · + ∥xrβr − yβr r ∥2 β ···β
1

r

= ∥x1β − yβ1 ∥2 β + · · · + ∥xrβ − yβr ∥2 β .
Then since x1 − y 1 , . . . , xr − y r are all vanishing, so is ∆. Thus, we get (x1 ; · · · ; xr ) ≡
(y 1 ; · · · ; y r ).
By Eq. (4.1), this means, for proving Proposition 4.3.11, it suffices to show ψ(x) ≡ ψ(y) when
ψ : V → V ′ and x, y ∈ Sbs ⊗ V with x ≡ y, where V, V ′ are arbitrary Euclidean spaces. WLOG,
assume V = Rk for some integer k ≥ 0. We can further assume V ′ to be R, because the general case
follows componentwise from this. We proceed as follows.
By the definition of pseudo-Lipschitz, we have
|ψ(xβ ) − ψ(yβ )| ≤ C∥xβ − yβ ∥uβ
def
where uβ =
1 + ∥xβ ∥pp + ∥yβ ∥pp

for some constants C, p > 0. By Proposition 4.3.4, (uβ )β form a moment-bounded tensor u ∈ Sbs .
Thus
k
X
|ψ(xβ ) − ψ(yβ )|2 β ≤ C ∥xβ − yβ ∥2 u2β β = C
(xiβ − yβi )2 u2β β .
i=1

D
E
a.s.
Now fix i and let v = xi − y i . By assumption, v is vanishing. We will show n1−ϵ vβ2 u2β
−−→ 0
β

for any ϵ > 0, for any i. By the above inequality, this will prove the desired result. Below, we shall
abbreivate ⟨•β ⟩β as just ⟨•⟩.
By Holder’s inequality, for any q, r > 2 such that 2q + 2r = 1, we have
2/q

v 2 u2 ≤ ⟨v q ⟩
63

2/r

⟨ur ⟩

.

For any ϵ > 0, we shall choose q (and consequently r by the relation 2q + 2r = 1) barely larger than 2
such that
2/q a.s.

n1−ϵ/2 ⟨v q ⟩
n

−ϵ/2

−−→ 0

(4.2)

r 2/r a.s.

⟨u ⟩

−−→ 0

(4.3)

from which follows n1−ϵ v 2 u2 as we wanted. Now, Eq. (4.3) holds for any ϵ > 0 and r > 0
because u is moment-bounded.
For Eq. (4.2), notice 5
2/q

⟨v q ⟩

= n−2s/q ∥v∥2q ≤ n−2s/q ∥v∥22 = ns(1−2/q) v 2

by standard Lp norm inequality. We shall choose q just slightly above 2 so that s(1 − 2/q) < ϵ/2.
Then 1 − ϵ/2 + s(1 − 2/q) < 1 − δ for some positive δ > 0 and hence
2/q

n1−ϵ/2 ⟨v q ⟩

a.s.

≤ n1−ϵ/2+s(1−2/q) v 2 < n1−δ v 2 −−→ 0

where the convergence to 0 is because v is vanishing.
While most nonlinearities we encounter will be pseudo-Lipschitz (globally), occasionally we need to
work with the functions that are only locally Lipschitz around some point (for example, the matrix
inverse function is locally Lipschitz around a nonsingular matrix). Equivalence to deterministic
constant is preserved under locally Lipschitz mapping:
Proposition 4.3.12. Consider moment-bounded multi-scalar θ ∈ Sb0 ⊗ V such that θ ≡ θ̊ for some
deterministic θ̊ ∈ V.6 Let ψ : V → V ′ be locally Lipschitz at θ̊. Then
ψ(θ) ≡ ψ(θ̊).
Proof. WLOG assume V = Rk . Let U be the open neighborhood of θ̊ in Rk such that ψ is Lipschitz
on U with Lipschitz constant L. Almost surely, θ ∈ U as n → ∞ because θ ≡ θ̊. Therefore, almost
surely, ∥ψ(θ) − ψ(θ̊)∥ ≤ L∥θ − θ̊∥ as n → ∞. Since θ − θ̊ is vanishing, we have ψ(θ) − ψ(θ̊) is
vanishing as well.
Preservation under Averaging
Lemma 4.3.13. Suppose x, y ∈ Sbs ⊗ V are equivalent. With β denoting any subset of indices, let
⟨x•β ⟩β be the multi-tensor x′ with entries x′α = ⟨xαβ ⟩β . Then
1) ⟨x•β ⟩β , ⟨y•β ⟩β are both moment-bounded;
2) we have
⟨x•β ⟩β ≡ ⟨y•β ⟩β .
Proof. Note 1) follows easily from Jensen’s inequality. So we shall focus on 2) in the remainder.
We first make a few simplifications: 1) We assume β is just the single last index and use the unbolded
font β instead. The general case follows from the obvious induction. 2) WLOG we can assume
V = R because the general case follows componentwise from this. We then use unbolded font
x, y instead of x, y. 3) By linearity of ≡, it suffices to prove this for y ≡ 0 (i.e., x and y are both
vanishing).
Let β ′ = (β1 , . . . , βs−1 ) ∈ [n]s−1 denote the first s − 1 indices. Then, by power-mean inequality,
for every β ′ ,
2
⟨xβ′ β ⟩β ≤ x2β′ β β .
5
Here, the definition of “vanishing” in terms of L2 norm becomes critical, and if we were to define “vanishing”
using general Lp norm, then the proof wouldn’t go through.
6
Recall this means the random sequence θ is equivalent to the sequence that equals θ̊ identically; c.f.
Definition 4.2.4.

64

Therefore,
2

⟨x•β ⟩β

=

X

2

⟨xβ′ β ⟩β ≤ ns−1 x2β β

β′

where β ranges over all [n]s . Then
n1−ϵ · ⟨x•β ⟩β

2

a.s.

/ns−1 ≤ n1−ϵ x2β β −−→ 0

where the almost sure convergence is because x is vanishing. Thus we have ⟨x•β ⟩β is vanishing, as
well.
Preservation under Matrix Multiplication
Proposition 4.3.14. Given n-vectors x, y ∈ Sb1 with x ≡ y and an n-matrix W ∈ Sb2 with almost
surely bounded operator norm, we have
W x ≡ W y,
no matter how W is correlated with x and y.
In particular, this applies when W (n) = √1n iidn×n (Z) where Z is a sub-Gaussian random variable
with zero mean and unit variance.7
Proof. The first statement is trivial since the definition of “vanishing” only depends on L2 norm. The
second statement follows from well-known operator norm bounds on iid matrices with sub-Gaussian
entries.
4.3.4

Distributional Equivalence (aka Dequivalence)

We will also need the distributional version of equivalence. In the simplest case, we have the following
definition.
Definition 4.3.15. For any multi-tensor x, y of the same shape, we say x and y are distributionally
equivalent, or dequivalent, written
d

x ≡ y,
d

if there exist multi-tensors x̂, ŷ with x̂ ≡ x and ŷ ≡ y such that x̂ = ŷ.
d

Like for equivalence, x ≡ y is a notion between multi-tensors as sequences, i.e., it should be read as
d

d

{x(n)}n ≡ {y(n)}n , NOT as a sequence of equivalences x(n) ≡ y(n), one for each n.
However, note that, contrary to equality, distributional equality in general is not reducible
d
d
componentwise: (x1 , x2 ) = (y 1 , y 2 ) is usually stronger than the conjunction of x1 = y 1 and
d

x2 = y 2 . Thus, we need to define a more general notion of distributional equivalence of list of objects.
Definition 4.3.16. Suppose we have two lists of multi-tensors x1 , . . . , xr and y 1 , . . . , y r , such that
xt and y t have
the same shape for every t, but their shapes can vary with t. We say x1 , . . . , xr and

y 1 , . . . , y r are distributionally equivalent, written
 d

x1 , . . . , xr ≡ y 1 , . . . , y r ,
d

if there exist x̂t ≡ xt , ŷ t ≡ y t for all t ∈ [r] such that (x̂1 , . . . , x̂r ) = (ŷ 1 , . . . , ŷ r ).
7

We expect this operator norm bound to hold more generally for Z that is zero-mean, unit variance, and has
finite fourth moment, due to [48]. But this result assumes the matrices W (n), n ≥ 1, are upper left blocks of an
infinite iid matrix. It should be possible to relax this assumption in [48], but since this is not crucial here, we
will just leave this task to future works for which this is more critical.

65

This definition is especially necessary for reasoning about the Gaussian conditioning trick inside the
induction proof of the Master Theorem.
Finally, we note that, while Definition 4.3.16 seems to be strictly more general than Definition 4.3.15,
in fact they are logically equivalent:
 d

 d

x1 , . . . , xr ≡ y 1 , . . . , y r ⇐⇒ x1 ; · · · ; xr ≡ y 1 ; · · · ; y r
(4.4)
where the RHS uses Definition 4.3.15 on semicolon products.8 Nevertheless, we explicitly formulated
Definition 4.3.16 as it is more transparent.
d

d

d

As discussed above, (z, x) ≡ (z ′ , y) is strictly stronger than the conjunction of z ≡ z ′ and x ≡ y.
d

However, they are logically equivalent if we replace x ≡ y with the conditional dequivalence
d

d

x ≡R y, as defined below, where R is the relation z ≡ z ′ .
d

Definition 4.3.17 (Conditional distributional equivalence). The expression R : z ≡ z ′ means “we
d

d

d

give the relation z ≡ z ′ the name R.” In this case, we define x ≡R y to mean (z, x) ≡ (z ′ , y). This
is called a conditional dequivalence.
d

d

More generally, if R : z ≡R′ z ′ is itself a conditional equivalence, we recursively define x ≡R y
d

to mean (z, x) ≡R′ (z ′ , y). Finally, when R = ∅ is the empty relation (equivalence of nothing to
d

d

nothing), we define x ≡R y as just the unconditional dequivalence x ≡ y.
d

d

For example, we may recursively write R0 : x0 ≡ y0 and Ri : xi ≡Ri−1 yi . Then the conditional
d

dequivalence Ri can be unpacked into (x0 , . . . , xi ) ≡ (y0 , . . . , yi ).
Wasserstein Distance Interpretation
For two multi-tensors x, y of the same shape, thought of as sequences {x(n)}n , {y(n)}n , we may
form a new sequence W2 (x, y) of their Wasserstein distances {W2 (Dx(n) , Dy(n) )}n , where W2 ’s
p
underlying metric for each n is the scaled Euclidean distance d(x, y) = ⟨∥xα − yα ∥2 ⟩α , and
Dx(n) , Dy(n) denote the measures of x(n), y(n). Then,
d

morally, x ≡ y ⇐⇒ W2 (x, y) = Õ(n−1/2 ).
This is not exactly rigorous because Wasserstein distance is defined using expected movement while
equivalence is defined using an almost sure notion of “vanishing.” This is a technical issue that can be
sidestepped if one were to define Õ using convergence of expectations rather than almost sure. Since
we will not actually use this Wasserstein distance interpretation in this work, we will not attempt to
make this more formal. This connection is purely to aid the reader’s intuitive understanding.
Basic Properties
Conditional dequivalence naturally inherits the basic properties of equivalence. Consider any
conditional dequivalence named R. In summary, conditional dequivalence is preserved under:
1. “smooth” mapping ϕ: (Proposition 4.3.18)
d

d

(a) For example, if R′ : x ≡R y are all moment-bounded, then ϕ(x) ≡R′ ϕ(y). This
holds more generally for “smooth” nonlinear outer products.
2. averaging over [n]: (Lemma 4.3.19)
d

d

(a) If R′ : x ≡R y, then ⟨x•β ⟩β ≡R′ ⟨y•β ⟩β .
3. multiplication by operator-normed-bounded matrices: (Proposition 4.3.20)
 d

When xt all have the same number of n-dimensions, then x1 , . . . , xr ≡ y 1 , . . . , y r can be interpreted
as distributional equivalence ala Definition 4.3.15 of two multi-tensors fromed from concatenation. But in
general xt have different number of n-dimensions for different t, where the semicolon product still applies.
8

66

d

(a) If x, y are n-vectors with R′ : x ≡R y and W is an n-matrix that almost surely has
bounded operator norm, then W√x ≡R′ W y. This holds in particular for W having iid,
zero-mean entries of size Θ(1/ n).
The formal statements are as follows. The proofs are all trivial given the corresponding statements in
Section 4.3.3.
Proposition 4.3.18. Consider multi-tensors xt , y t ∈ Sbst ⊗ Vt for each t = 1, . . . , r and a function
ψ(−; · · · ; −) : V1 ⊕ · · · ⊕ Vt → V ′ . Let R be any dequivalence. If ψ is pseudo-Lipschitz and
d

R′ : (x1 , . . . , xr ) ≡R (y 1 , . . . , y r ), then
d

ψ(x1 ; · · · ; xr ) ≡R′ ψ(y 1 ; · · · ; y r ).
d

Lemma 4.3.19. Suppose x, y ∈ Sbs ⊗ V satisfy R′ : x ≡R y for some dequivalence R. Then, with
β denoting any subset of indices,
d

⟨x•β ⟩β ≡R′ ⟨y•β ⟩β ,
where ⟨x•β ⟩β is the multi-tensor x′ with entries x′α = ⟨xαβ ⟩β , and likewise for ⟨y•β ⟩β .
Proposition 4.3.20. Given an n-matrix W ∈ Sb2 with almost surely bounded operator norm and
d

n-vectors x, y ∈ Sb1 with R : x ≡W y,9 we have
d

W x ≡R W y.
In particular, this applies when W (n) = √1n iidn×n (Z) where Z is a random variable with zero
mean, unit variance, and finite fourth moment.

4.4

Getting Equivalence From Distributional Equivalence

Here we discuss several situations, in order of easy to hard, that allow us to “upgrade” dequivalence
to equivalence. The most important result (Lemma 4.4.5) in this section reads roughly as follows:
If x is iid along the n-dimensions, then ⟨ϕ(x; xβ1 ; · · · ; xβr )⟩β ≡ ⟨ϕ(x; xβ11 ; · · · ; xβrr )⟩β (where,
recall, for each i, x i is an iid copy of x, such that x, x 1 , . . . , x r are mutually independent).
d

Trivial Conversion Sometimes, we can directly convert ≡ to ≡:
d

Proposition 4.4.1. If x ≡ y and, for each n, y(n) is deterministic, then x ≡ y.
d

Proof. This just follows from that fact that, for any random vectors X and Y , if X = Y and Y is
a.s.
deterministic, then X = Y .
Easy Conversion In other times, two objects formed from dequivalent ingredients are actually
(absolutely) equivalent. This happens typically when we are averaging over many iid things,
essentially because of the Law of Large Numbers. The most basic example is:
Lemma 4.4.2. Let Z ∈ R be a random variable for whom moments of every order exists. Then, as
elements of Sb0 ,
⟨iid(Z)α ⟩α ≡ E Z.
Here iid(Z) is only well-defined up to distributional equality, so what we mean here is: whenever
d

d

d

z ≡ iid(Z), we have ⟨zα ⟩α ≡ E Z. In other words, if z ≡ z ′ ≡ iid(Z), then we in fact have
d

⟨zα ⟩α ≡ ⟨zα′ ⟩α , not just ≡ as from Lemma 4.3.19.
9

d

d

x ≡W y means dequivalence conditional on the trivial equivalence W ≡ W .

67

Proof. WLOG assume E Z = 0. Then because Z has moments of every order, by Lemma 4.1.3,
P
def 1
√
Y =
α iid(Z)α has moments of every order p bounded by some constant Cp independent of n.
n
2
To show ⟨iid(Z)α ⟩α = √1n Y is vanishing, we need to show that for every ϵ > 0, n1−ϵ ⟨iid(Z)α ⟩α =
a.s.

n−ϵ Y 2 −−→ 0. But E |n−ϵ Y 2 |p ≤ C2p n−ϵp for every p > 0. In particular, taking p > 1/ϵ, we can
apply Lemma 4.1.2 to get the desired result.
For example, we will frequently use the following corollary of this:
d

Lemma 4.4.3. If x ∈ Sb1 ⊗ Rk and y ∈ Sb1 ⊗ Rl satisfy (x, y) ≡ iid(X, Y ) for random vectors
X ∈ Rk , Y ∈ Rl with finite joint moments of every order, then
1 ⊤
x y ≡ E XY ⊤ ∈ Rk×l .
n
In other words, the RHS has entries E X i Y j for each i ∈ [k], j ∈ [l].
d

Proof. The (i, j)th entry of n1 x⊤ y is just ⟨xiα yαj ⟩α ≡ ⟨iid(X i Y j )α ⟩α which is equivalent to E X i Y j
by Lemma 4.4.2. Then we can upgrade this to equivalence by Proposition 4.4.1: ( n1 x⊤ y)ij ≡
E X i Y j , as desired.
Medium Conversion For our main theorem involving nonlinear outer products, we need the
following (much stronger) generalization of Lemma 4.4.2, which roughly says ⟨ψ(x; iid(Z)α )⟩α ≡
EZ ψ(x; Z) in the simplest case.
Lemma 4.4.4. Let x ∈ Sbs0 ⊗ V0 be moment-bounded. For each t = 1, . . . , r, let Z t ∈ Vt be
a (fixed-dimensional) random vector whose moments exist for all orders. Assume Z 1 , . . . , Z r are
d
all mutually independent. For each t, define st ≥ 1 and z t ∈ S st ⊗ Vt such that z t = iidst (Z t ).
1
r
′
Assume x, z , . . . , z are mutually independent. Let ψ : V0 ⊕ · · · ⊕ Vr → V be a pseudo-Lipschitz
function. Then, with βt ∈ [n]st and β = β1 · · · βr ,
ψ(x; zβ1 1 ; · · · ; zβr r ) β ≡ Ψ(x) ∈ Sbs0 ⊗ V ′
where
Ψ : V0 → V ′ ,

def
Ψ(ξ) =
E ψ(ξ; Z 1 ; · · · ; Z r ),

where the expectation is taken over Z 1 , . . . , Z r .
As discussed above, this implies
D
E
ψ(x; zβ1 1 ; · · · ; zβr r ) β ≡ ψ(x; zβ1 11 ; · · · ; zβr r1 ) ,
β

(4.5)

d

which is an upgrade over the ≡ from Lemma 4.3.19.
Proof. WLOG assume V ′ = R since the general case follows from this componentwise. Furthermore,
we will assume r = 1 because the general case follows from this by induction. Let
def
ψ̄(ξ; ζ 1 ) =
ψ(ξ; ζ 1 ) − Ψ(ξ).

Then for any ξ, ψ̄(ξ; Z 1 ) has mean zero (over the randomness of Z 1 ). Let
def
y=
ψ̄(x; zβ1 1 ) β ∈ Sbs0 .
1

We want to show y is vanishing.
Notationally, we have usually written x when we really mean x(n), the nth element of x as sequence
of tensors. This is not ambiguous typically, but here we do want to talk about both semantics.
Therefore, in this proof, we will be explicit: for emphasis, we write x[1, ∞) = {x(n)}∞
n=1 for the
sequence interpretation and still write just “x” for the nth element of it (with dependence on n
suppressed as usual).
68

Now, we will prove y is vanishing by showing that, with probability 1 on the distribution of x[1, ∞),
y is vanishing conditioned on x[1, ∞).
By Lemma 4.1.3 applied to ψ̄(xα ; zβ1 1 ) with fixed α (using the independence of z 1 from x), we
have
2p
E[yα
|xα ] ≤ Dp (xα )n−ps1 ≤ Dp (xα )n−p
for some polynomially-bounded function Dp : V0 → R independent of α. (More specifically,
Dp (xα ) is a polynomial in the moments of the random variable ψ(xα ; Z 1 ) conditioned on xα ,
which are themselves polynomially bounded functions of xα ). Here we used the assumption that
s1 ≥ 1 in the 2nd inequality. Then
 2p

2p
E yα
| x = E[yα
|xα ] α ≤ n−p ⟨Dp (xα )⟩α .
α
Because x is moment-bounded, so is ⟨Dp (xα )⟩α ∈ S 0 , so that, for every ε > 0,
a.s.

n−ε ⟨Dp (xα )⟩α −−→ 0.
Thus, for almost every sequence x[1, ∞),
n−ε ⟨Dp (xα )⟩α ≤ Cp,ε (x[1, ∞)) for all n
for some constant Cp,ε (x[1, ∞)) dependent on the whole sequence x[1, ∞). Then
 2p

| x[1, ∞) ≤ Cp,ε (x[1, ∞))n−p for all n
n−ε E yα
α
satisfying Proposition 4.3.8, implying y is vanishing conditioned on x[1, ∞). Since this argument
holds for every x[1, ∞) and every ε > 0, we have the desired result.
Advanced Conversion In the most advanced case, we need Eq. (4.5) to hold even when the x
and z i are strongly correlated. This will turn out to be the most important case, since it forms the
induction base for our main theorem.
Lemma 4.4.5 (IID Equivalence). Let X ∈ Rk be a random vector whose moments exist for all
d

orders. Let x ∈ Sb1 ⊗ Rk satisfy x ≡ iid(X). Let c ∈ Sb0 ⊗ Rl be such that c ≡ c̊ for some
deterministic c̊ ∈ Rl .
Let ψ : (⊕s+r Rk ) ⊕ Rl → R be pseudo-Lipschitz. Then, with β = (β1 , . . . , βr ),10
⟨ψ(x; · · · ; x; xβ1 ; · · · ; xβr ; c)⟩β ≡ ⟨ψ(x; · · · ; x; xβ11 ; · · · ; xβrr ; c̊)⟩β

(4.6)

as elements of Sbs (where, recalling Definition 4.2.5, x 1 , . . . , x r are iid copies of iid(X),
independent from x).
We in fact don’t need to assume c̊ is deterministic, but doing so simplifies the proof.
We remind the reader the notations in Eq. (4.6). To be very explicit, if s = 1 and T =
⟨ψ(x; xβ1 ; · · · ; xβr ; c)⟩β ∈ Sb1 , then each entry Tα is
1 X
Tα = r
ψ(x1α , . . . , xkα ; x1β1 , . . . , xkβ1 ; · · · ; x1βr , . . . , xkβr ; c1 , . . . , cl ).
(4.7)
n
β1 ,...,βr

Likewise for ⟨ψ(x; xβ11 ; · · · ; xβrr ; c̊)⟩β .
Intuitively, when all the β1 , . . . , βr are distinct, then xβ1 , . . . , xβr are roughly independent as well,
but this is obviously not the case when β1 , . . . , βr are not distinct. However, among all possible values
of the tuple (β1 , . . . , βr ), the nondistinct ones constitute a minority, vanishing with n. Therefore, we
hope to say that they contribute vanishingly to the sum Eq. (4.7) so as to establish Eq. (4.6).
By combining with Lemma 4.4.4, we get
Lemma 4.4.6. In the same scenario as Lemma 4.4.5, if s = 1, then
⟨ψ(x; xβ1 ; · · · ; xβr ; c)⟩β ≡ Ψ(x)
where
def
Ψ : Rk → R, Ψ(x) =
E ψ(x; X 1 ; · · · ; X r ; c̊), ∀x ∈ Rk ,
1

1 ,..., r
r

(with the expectation taken over X ; · · · ; X ).
The iid copies x 1 , . . . , x r are only well-defined up to distributional equality, so Eq. (4.6) should be read
as: for any instantiation of x 1 , . . . , x r , the equivalence holds.
10

69

4.4.1

Proof of Lemma 4.4.5

Preliminary Reduction and Setup
We assume in the proof that s = 1, as the general case is a straightforward modification.
WLOG, we can assume x is an iid copy of iid(X) by Proposition 4.3.11. Applying Proposition 4.3.11
again to c, we see
ψ(x; x; · · · ; x; c) ≡ ψ(x; x; · · · ; x; c̊).
So we can assume WLOG c = c̊ and furthermore just absorb it into ψ since c̊ is deterministic. It
remains to show
⟨ψ(x; xβ1 ; · · · ; xβr )⟩β ≡ ⟨ψ(x; xβ11 ; · · · ; xβrr )⟩β .
Let ∆ ∈ Sbr+1 be the tensor
∆αβ = ∆αβ1 ···βr = ψ(xα ; xβ1 ; · · · ; xβr ) − ψ(xα ; xβ11 ; · · · ; xβrr ).
Note the following properties of ∆:
Proposition 4.4.7. 1) If α does not appear in β and all indices in β are distinct, then E ∆αβ = 0. 2)
If β ′ is another multi-index with the same property and that furthermore does not intersect β, then
∆αβ and ∆αβ′ are independent conditioned on xα .
Then our goal is to show ⟨∆•β ⟩β ∈ Sb1 is vanishing, i.e., for any ϵ > 0,
D
E
a.s.
2
n1−ϵ ⟨∆αβ ⟩β
−−→ 0.
α

By Proposition 4.3.8, we just need to show there exist constants Cp for all integers p ≥ 1 such that
D
E
2p
E ⟨∆αβ ⟩β
≤ Cp n−p
α

(4.8)

for all n and p.
2p

Fix n and p. Below, we shall bound each ⟨∆αβ ⟩β individually. By symmetry in α, we WLOG fix
α = n. Let n′ be the largest multiple of r smaller than n.
The Core Insight
We succinctly overview the core insight here, with more explanation below. There are 3 steps of
reasoning:
P
P
1. For large n, β ∆αβ is dominated by the subset sum β∈Γ ∆αβ where Γ ⊆ [n′ ]r consists of
all β that do not contain repeating indices (i.e., β1 , . . . , βr are all distinct). (Note such β does not
contain α either since α = n > n′ by assumption).
2. But by Ordered Baranyai’s Theorem (Theorem 4.1.6), there is a partition of Γ into perfect
′
matchings Γ1 , Γ2 , . . . i.e., such that each Γi consists of multi-indices Γi = {β 1 , . . . , β n /r } and
′
β 1 , . . . , β n /r partition [n′ ] (i.e., each β ∈ [n′ ] appear in exactly one of β j ). For example, if n′ = 4
and r = 2, then Γ = {(1, 2), (1, 3), (1, 4), (2, 3), (2, 4), (3, 4)} ∪ {mirror image}. This is partitioned
into the perfect matchings {(1, 2), (3, 4)} ⊔ {(1, 3), (2, 4)} ⊔ {(1, 4), (2, 3)} along with their mirror
images. Back to the general case, we thus have
X
XX
∆αβ =
∆αβ .
(4.9)
i

β∈Γ

P

β∈Γi

3. But, conditioned on xα , each β∈Γi ∆αβ is a sum of independent, mean-zero random variables
p
√
by Proposition 4.4.7. Therefore it has typical size O( n′ /r) which is just O( n) because r is
constant. As a result, the whole sum Eq. (4.9) is of order nr−1/2 so that
X
n−r
∆αβ = O(n−1/2 ).
β∈Γ

70

This will be formalized as moment bounds
2p

E ⟨∆αβ ⟩β ≤ Cp n−p
from which Eq. (4.8) would follow.
Of the 3 steps above, only 1 and 3 need further explanation. We do so below.
Filling in the Details
1. Sum Decomposition Let R1 be the set of β that contains at least one of n′ + 1, . . . , n. Let R2 be
the set of β that contains repeating indices. Then the complement of Γ in [n]r is a subset of R1 ∪ R2 .
Now note that |R1 ∪ R2 | = Θ(nr−1 ) (where the hidden constant can depend on r since r = Θ(1)).
Furthermore, because X (the distribution of x and y’s α-slices) has all moments and ψ is pseudoLipschitz and thus polynomially bounded, there exist constants Dq for every q ≥ 1 such that for all
α, β, we have E |∆αβ |q ≤ Dq = O(1). Therefore, we have
E(

X

∆αβ )2p ≤ |R1 ∪ R2 |2p−1 E

β̸∈Γ

X

(r−1)(2p−1)+(r−1)
∆2p
) = O(n(r−1)2p ).
αβ = O(n

β̸∈Γ

Thus, after multiplying by (n−r )2p , we get
2p

E ⟨∆αβ Iβ̸∈Γ ⟩β = O(n−2p ).
Consequently,
2p

2p

E ⟨∆αβ ⟩β = E ⟨∆αβ Iβ∈Γ + ∆αβ Iβ̸∈Γ ⟩β
2p

2p

≤ C E ⟨∆αβ Iβ∈Γ ⟩β + C E ⟨∆αβ Iβ̸∈Γ ⟩β
2p

≤ C E ⟨∆αβ Iβ∈Γ ⟩β + O(n−2p )
where C = 22p−1 (by Lemma 4.1.1). Thus, to show Eq. (4.8), it suffices to show
2p

E ⟨∆αβ Iβ∈Γ ⟩β ≤ Cp n−p
(for a different set of constants Cp ).
3. Bounding Moments Let ⟨−⟩β∈Γ denote average over β ∈ Γ. Recall that, by Ordered Baranyai’s
Theorem, we have partitioned Γ into Γ1 , Γ2 , . . . where each Γi consists of multi-indices Γi =
′
′
{β 1 , . . . , β n /r } such that β 1 , . . . , β n /r partition [n′ ]. Consequently, for each i, {∆αβ : β ∈ Γi } is
mutually independent conditioned on xα . We first deduce
D
E2p D
E
2p
2p
2p
E ⟨∆αβ Iβ∈Γ ⟩β ≤ E ⟨∆αβ ⟩β∈Γ = E ⟨∆αβ ⟩β∈Γi
≤ E ⟨∆αβ ⟩β∈Γi
i

i

where the equality follows from Eq. (4.9) and the last inequality follows from power-mean inequality.
Again, conditioned on xα , each ⟨∆αβ ⟩β∈Γi is a mean of independent, mean-zero random variables
by Proposition 4.4.7. But by Lemma
4.1.3, thereiare real polynomially bounded functions Fp of xα
h
2p

for each integer p such that E ⟨∆αβ ⟩β∈Γi | xα < Fp (xα )(n′ /r)−p simultaneously for every i. 11
Therefore, altogether,
2p
E ⟨∆αβ Iβ∈Γ ⟩β ≤ Cp n−p

where Cp = 2p rp E Fp (xα ) = 2p rp E Fp (X) (which is finite because X has all moments, and
where 2p ≥ (n/n′ )p is there as a loose conversion factor from n′ to n).
11
Specifically, if Hα is the random variable distributed identically as ∆αβ , β ∈ Γ (which have the same
distribution for any β ∈ Γ), then by Lemma 4.1.3, Fp is a polynomial in the moments of Hα conditioned on
xα ,and these moments are themself polynomially bounded in xα because ψ is polynomially bounded.

71

4.5

Matrix Pseudo-Inverse

Lemma 4.5.1. Suppose12 Λ ∈ Sb0 ⊗ Rk×k such that Λ ≡ Λ̊ for a deterministic Λ̊ ∈ Rk×k .13 If Λ̊ is
full rank, then
Λ+ ≡ Λ̊−1
as well.
Proof. Apply Proposition 4.3.12 to ψ being the matrix pseudo-inverse function, which is locally
Lipschitz at any full rank matrix.
Earlier we defined spaces like S 1 ⊗ Rk which roughly contains sequences (in n) of n × k matrices.
Likewise, we can define Rk ⊗ S 1 which contain the transposes of S 1 ⊗ Rk , i.e., k × n matrices.
d

Lemma 4.5.2. Suppose X ∈ Rk is a random vector and x ≡ iid(X) ∈ Sb1 ⊗ Rk .14 If X has
def
moments of all orders and its covariance Λ =
E XX ⊤ ∈ Rk×k (which is deterministic, independent
1
k 15
of n) is full rank, then as elements of Sb ⊗ R ,
d

d

nx+⊤ ≡ xΛ−1 ≡ n iid(X)+⊤ ≡ iid(X)Λ−1 .

(4.10)

Here nx+⊤ is the sequence n 7→ nx(n)+⊤ , and likewise for n iid(X)+⊤ ; xΛ−1 at index n is the
matrix multiplication between x(n) (shape n × k) and Λ−1 (shape k × k).
Note that nx+⊤ is the correct scaling with n so that this matrix has Θ(1) sized entries (it is elucidating
to consider the example when k = 1 and x is just an n-vector).
Proof. Let x̃ be an instance of iid(X) such that x ≡ x̃.
By standard pseudo-inverse facts (Section 4.1.1), nx+ = ( n1 x⊤ x)+ x⊤ . By Lemma 4.3.13, n1 x⊤ x ≡
1 ⊤
1 ⊤
⊤
n x̃ x̃. By Lemma 4.4.2, n x̃ x̃ ≡ E XX = Λ. By Lemma 4.5.1 and the nonsingularity of Λ, we
have
+

1 ⊤
x x
≡ Λ−1 .
(4.11)
n
Therefore, since equivalence is preserved under matrix multiplication (which is certainly pseudoLipschitz; see Proposition 4.3.11), we have
1
d
d
nx+⊤ = x( x⊤ x)+ ≡ xΛ−1 ≡ x̃Λ−1 = iid(X)Λ−1
n
as desired.16
Lemma 4.5.3. In the setting of Lemma 4.5.2, suppose there is additionally y ∈ Sb1 ⊗ Rl such that
d

(x, y) ≡ iid(X, Y ) (as sequences in Sb1 ⊗ (Rk ⊕ Rl )) for some (fixed wrt n) random vector Y ∈ Rl .
Then, as elements of Sb0 ⊗ Rk×l , 17
x+ y ≡ Λ−1 Γ
(4.12)
def
where Γ ∈ Rk×l is the deterministic matrix with entries Γij =
E X i Y j .18
12

i.e., Λ(n) is a random k × k matrix for each n; c.f. Definition 4.2.2
Recall this means the random sequence Λ is equivalent to the sequence that equals Λ̊ identically; c.f.
Definition 4.2.4.
14
i.e., X is a sequence of random Rn×k matrices, distributionally equivalent to iid(X); c.f. Definition 4.2.2
15
Recall, as discussed in Definition 4.2.2, Sb1 ⊗ Rk means sequence in n of moment-bounded n × k matrices.
16
Technically, we need to check that Λ−1 and x̃⊤ are both moment-bounded for Proposition 4.3.11 to apply.
But this check passes trivially.
17
Recall Sb0 ⊗ Rk×l means sequence in n of moment-bounded k × l matrices; c.f. Definition 4.2.2
18
Note the RHS is just a deterministic Rk×l matrix, representing the constant sequence as in Definition 4.2.4.
13

72

Proof. let (x̃, ỹ) be an instance of iid(X, Y ) such that (x, y) ≡ (x̃, ỹ). Then by standard pseudoinverse facts (Section 4.1.1),
1
1
1
x+ y = ( x⊤ x)−1 ( x⊤ y) ≡ Λ−1 ( x̃⊤ ỹ) ≡ Λ−1 Γ
n
n
n
where the first equivalence follows from Eq. (4.11) and Proposition 4.3.11, and the last equivalence
follows from Lemma 4.4.2.

4.6

Uniformized Tensor Programs

Here, we “uniformize” different variations of Tensor Programs, in the sense that we squash all the
different instructions into a single step. This allows us to streamline the induction in our proofs.
4.6.1

Uniformized N ETSOR⊤

Given initial matrices A1 , . . . , AL ∈ Rn×n and initial vectors g 1 , . . . , g M0 ∈ Rn , consider the
following iteration for i = M0 + 1, . . . , M that generates new vectors g M0 +1 , . . . , g M ∈ Rn :
gαi ←

n
X

i
Wαβ
xiβ ,

where xiα = ϕi (gα1 , . . . , gαi−1 ).

(4.13)

β=1

Here each ϕi is a chosen scalar function with (i − 1) arguments and W i is an n × n matrix. Each
matrix W i equals to either some matrix Aj of the program or its transpose Aj⊤ . The matrices
W i for different i can possibly be the same. Thus each program is entirely determined by the data
i M0
i M
i
j
j⊤
{Aj }L
j=1 ∪ {g }i=1 ∪ {ϕ }i=M0 +1 along with the correspondence between W and A or A .
This type of program is obviously a subset of N ETSOR⊤ ([44]) but it’s also easy to see that they have
the same expressive power.
4.6.2

Uniformized N E⊗OR⊤

Now extend the previous formulation to include additionally initial scalars c1 , . . . , cM0 ∈ R and
extend Eq. (4.13) to produce both a new vector g i and a new scalar ci at each step i = M0 +1, . . . , M :

gαi ←

n
X

n

i
Wαβ
xiβ ,

β=1

where xiα =

ci ←

1X i
xβ ,
n

(4.14)

β=1

1 X i
ϕ (gα ; gβ ; · · · ; gβi ; c)
ni

(4.15)

β

= ⟨ϕi (gα ; gβ1 ; · · · ; gβi ; c)⟩β

(4.16)

where ϕi : Ri−1 ⊕ · · · ⊕ Ri−1 → R, each β = (β1 , . . . , βi ) ranges over all tuples in [n]i , and
|
{z
}
i+2

g = (g 1 , . . . , g i−1 ), c = (c1 , . . . , ci−1 ) at iteration i.
Here we are tying together the tensor order of ϕi with the iteration index i, to simplify the formulation.
But note that ϕi can always ignore all but the first block of inputs, for example, to replicate Eq. (4.13).
By the same reasoning as Section 4.6.1, this formulation of N E⊗OR⊤ is equivalent to Definition 2.6.1.
4.6.3

Setup and Constructions

Below, we typically consider the following setup for both uniformized N ETSOR⊤ and uniformized
N E⊗OR⊤. It is essentially the same as Setup 2.6.3 except that the initial scalars need to converge at
the rate of Õ(n−1/2 ). This is needed to prove the vectorwise convergence results below.
Setup 4.6.1. Assume
73

1. Every entry of every Al is sampled iid from N (0, 1/n).
2. Every entry of every initial vector g i is sampled iid from N (0, 1).
3. Each initial scalar ci is Õ(n−1/2 ).
4. All nonlinearities ϕi are pseudo-Lipschitz.
In addition, since both uniformized N ETSOR⊤ and uniformized N E⊗OR⊤ are subsets of the
N E⊗OR⊤ language, the construction of kets in Definition 2.6.5 make sense for both of them. Finally,
in the context of n → ∞, we think of the program’s objects as sequences in n, i.e., Aj ∈ S 2 , g i ∈ S 1 ,
ci ∈ S 0 .

4.7

N ETSOR⊤ Master Theorem, Vectorwise Convergence

Definition 4.7.1. Consider a Tensor Program (of any variation). Let x1 , . . . , xk be the set of
all vectors in the program. Then we define (x̊1 , . . . , x̊k ) as iid(8x1 ⟩, . . . , 8xk ⟩), i.e., each α-slice
(x̊1α , . . . , x̊kα ) is an iid sample from (8x1 ⟩, . . . , 8xk ⟩).19
Both x̊ and 8x⟩ are “limits” of a vector x in some sense, but x̊ always has the same shape as x (same
for θ̊ for scalar θ) while 8x⟩ collapses the n-dimension. In this and the next section, we aim to show
d

that x ≡ x̊ in different kinds of Tensor Programs. This essentially means that x and x̊, random
vectors with larger and larger dimensions, become closer and closer in distribution as n → ∞ (see
Section 4.3.4) — hence the vectorwise convergence in the section title.
Theorem 4.7.2. Consider a N ETSOR⊤ program in Setup 4.6.1. Consider any collection of vectors
y 1 , . . . , y k in the program. Then they are moment-bounded and
d

(y 1 , . . . y k ) ≡ (ẙ 1 , . . . ẙ k ).
In other words, (y 1 , . . . y k ) is distributed like n iid copies of (8y 1 ⟩, . . . 8y k ⟩), modulo vanishing
vectors. This is a stronger result than [44], at the cost of assuming faster convergence of initial scalars
in Setup 4.6.1.
Remark 4.7.3. Let us comment that, in this proof, we do not use the property that equivalence
is preserved under iid matrix multiplication Proposition 4.3.14 (this property is a crucial reason
underlying the definition of “vanishing”), because of N ETSOR⊤’s rank stability property. This
however will be crucial in Section 4.8 to prove the analogous result for N E⊗OR⊤.
We recall some terminology from prior works.
Definition 4.7.4. A vector is called a G-var if it is an initial vector or generated by MatMul.
4.7.1

Proof Setup

We will nontrivially leverage parts of the Master Theorem proof in [44]. Our notation differs
from there (hopefully improved for first time readers), but a mapping is provided in Table 4.1. By
Proposition 4.3.18, it suffices to show this for all G-vars of the program, since other vectors are
pseudo-Lipschitz images of G-vars. We furthermore WLOG assume the formulation in Eq. (4.13)
and proceed to show this for vectors g 1 , . . . , g M (all G-vars in the program).
By the N ETSOR⊤ Master Theorem [44], we know that the matrices ( n1 g i⊤ g j )M
i,j=1 and
M ×M
( n1 xi⊤ xj )M
converge
almost
surely
to
deterministic
matrices
Ω
∈
R
and
Ξ
∈
RM ×M .
i,j=1
By rank stability [44, sec L.5], WLOG, we can assume
Assumption 4.7.5. WLOG, we assume Ω and Ξ are both full rank.
19
Note that (x̊1 , . . . , x̊k ) is only well defined up to distributional equality, and thus it only makes sense to
talk about them up to distributional equality or coarser notions like (conditional) dequivalence, but not up to
equivalence.

74

[44]

Here

xi
gi
yi
xi
uj
hj
j
v
yj
h
x
g
g
Υ
x⊤ x/n
Υ̊
⟨x8x⟩
Λ
y ⊤ y/n
Λ̊
⟨y8y⟩
Γ
h⊤ x/n
Γ̊
⟨h8x⟩
γ
x⊤ x/n
γ̊
⟨x8x⟩
δ
h⊤ x/n
δ̊
⟨h8x⟩
Table 4.1: Notation mapping between [44] and here. We improved the notation to be more intuitive,
leveraging our new bra-ket notation.

Indeed, [44, sec L.5] says that Ξ (resp. Ω) is singular iff there are linear dependencies (with constant
coefficients) between xi s (resp. g i s), which we can get rid of by rewriting the program in the obvious
way.20
We induct on i, starting from the base case i = M0 .
Base Case: i = M0 .

This holds by Setup 4.6.1 that the initial vectors are sampled iid.

Inductive Step Here we assume the dequivalence
d

R : (g 1 , . . . , g i ) ≡ (g̊ 1 , . . . ,g̊ i )

(4.17)

as well as their moment-boundedness and we shall show
d

g i+1 ≡R g̊ i+1 ,
and their moment-boundedness, where the conditional dequivalence can be unpacked into
d

(g 1 , . . . , g i , g i+1 ) ≡ (g̊ 1 , . . . ,g̊ i ,g̊ i+1 ).

(4.18)

def i+1
def i+1
def
For brevity, write g =
g ,x =
x ,W =
W i+1 so that in this notation, by Eq. (4.13), g = W x.

We apply Gaussian conditioning trick to obtain
d

(g 1 , . . . , g i , g) = (g 1 , . . . , g i , ω + σΠ⊥ z)

(4.19)
d

where ω ∈ S 1 , Π⊥ ∈ S 2 and σ ∈ S 0 are functions of g 1 , . . . , g i , and z ∈ S 1 , z = iid(N (0, 1)) is a
fresh iid standard Gaussian vector, independent from everything else.
4.7.2

Proof Plan

Below, we will give the exact formulas for ω, Π⊥ , σ and we will show that
20

Rank stability is a highly nontrivial but technical result of [44]. While seemingly small, it allows us to
drastically simplify the proof because we do not have to think about “corner cases” where the rank of a matrix
drops suddenly in the limit, which can lead to all kinds of pathological behaviors. Readers interested in full rigor
should consult [44] for the proof of this result.

75

1. there is a pseudo-Lipschitz function ψ : Ri → R such that ω ≡ ψ(g 1 , . . . , g i ),21
2. there is a deterministic σ̊ ∈ R such that σ ≡ σ̊, and
3. Π⊥ z ≡ z.
These claims already imply that g is moment-bounded. Furthermore, applying Eq. (4.17) and
Proposition 4.3.18 to Eq. (4.19), the above claims imply
d

(g 1 , . . . , g i , g) ≡ (g̊ 1 , . . . ,g̊ i , ψ(g̊ 1 , . . . ,g̊ i ) + σ̊z)
Using the exact formulas below, by the same calculations of [44], the RHS can be shown to be
d
= (g̊ 1 , . . . ,g̊ i ,g̊ i+1 ), yielding Eq. (4.18) as desired.22
4.7.3

Exact Formulas

Preliminary Definitions We define the following objects.
• Let J (resp. J ′ ) be the set of indices j ≤ i such that W j = W i+1 (resp. W j = W i+1⊤ ),
so that g j = W xj (resp. g j = W ⊤ xj ) by construction.
• Let g ∈ S 1 ⊗ RJ (resp. x ∈ S 1 ⊗ RJ ) be the matrix with column vectors g j (resp. xj ) for
all j ∈ J, so that g = W x. (Note g is a distinct object from and does not contain g = g i+1 ;
likewise for x and x = xi+1 )
′

′

• Likewise, let h ∈ S 1 ⊗ RJ (resp. y ∈ S 1 ⊗ RJ ) be the matrix with column vectors g j
(resp. xj ) for all j ∈ J ′ , so that h = W ⊤ y.
Exact Formulas
formulas:

Then, by the same calculations as in [44], ω, Π⊥ , σ have the following exact
ω = (gx+ + y +⊤ h⊤ − y +⊤ h⊤ xx+ )x

(4.20)

and
r

2
∥Π⊥
x x∥
n
⊥ def
with Πx = I − xx+

σ=

and

def
Π⊥ =
I − yy + .

(4.21)

(4.22)

Further Constructions Now we further define g̊ to be the matrix with column vectors g̊ j for all
j ∈ J; likewise we define x̊, h̊, ẙ. By induction hypothesis (Eq. (4.17)), we have
d

(g, x, h, y) ≡R (g̊, x̊, h̊, ẙ)

(4.23)

because of Proposition 4.3.18 (as this relation is a pseudo-Lipschitz image of Eq. (4.17)).
Now note

1 ⊤
x x ≡ ⟨x8x⟩ ∈ RJ×J
n
by Eq. (4.23) and Lemma 4.4.3, where the RHS is a deterministic object independent of n. Likewise,
S 0 ⊗ RJ×J ∋

′
′
1 ⊤
y y ≡ ⟨y8y⟩ ∈ RJ ×J .
n
But both ⟨x8x⟩ and ⟨y8y⟩ are principal submatrices of Ξ by construction, so by Sylvester’s Criterion
and Assumption 4.7.5,
⟨x8x⟩ and ⟨y8y⟩ are nonsingular.
(4.24)
The significance of this is that now we can use Lemma 4.5.3 on x and y.
′

′

S 0 ⊗ RJ ×J ∋

21

with ψ applied coordinatewise as usual
In particular, we do not change any of the formulas for the large n limit in our induction; we only “upgrade
the mode of convergence” to (distributional) equivalence. So it is easy to verify this claim.
22

76

4.7.4

Showing 3)

Using Eq. (4.22) and Lemma 4.5.3, we have
Π⊥ z = z − yy + z ≡ z − y⟨y8y⟩−1 ⟨y8z⟩
But 8z⟩ is independent from 8y⟩ (because z is independent from y by construction) and is distributed
as N (0, 1), so the ⟨y8z⟩ vanishes. In conclusion,
Π⊥ z ≡ z
as desired. This shows 3).
4.7.5

Showing 2)

Writing out the definition of σ 2 (Eq. (4.21)), we see
2
1
1
∥Π⊥
x x∥
= x⊤ x − ( x⊤ x)(x+ x)
n
n
n
1 ⊤
1 ⊤
≡ x x − ( x x)⟨x8x⟩−1 ⟨x8x⟩
n
n
def 2
≡ ⟨x8x⟩ − ⟨x8x⟩⟨x8x⟩−1 ⟨x8x⟩ =
σ̊

σ2 =

where the second line follows by Lemma 4.5.3, and the third line follows by Eq. (4.23) and
Lemma 4.4.3.
Note that σ̊ 2 is deterministic. By Assumption 4.7.5, σ̊ 2 > 0 (because σ̊ is a 1 × 1 Schur complement
of Ξ). Then the square root function is locally Lipschitz around σ̊ 2 . So by Proposition 4.3.12, we get
σ ≡ σ̊.
4.7.6

Showing 1)

Finally, we can apply the same strategy to show ω = Ex is equivalent to a linear combination of g̊
and ẙ with deterministic coefficients, albeit with slightly more calculations.
By Eq. (4.20), we can decompose
ω = (gx+ + y +⊤ h⊤ − y +⊤ h⊤ xx+ )x
=A+B−C
where
1
1
1
1
def
def
y( y ⊤ y)+ ( h⊤ x)(x+ x).
B=
y( y ⊤ y)+ ( h⊤ x), C =
n
n
n
n
Then the same deduction as before (involving Lemma 4.4.3 and Lemma 4.5.3) shows
def
A=
gx+ x,

A ≡ g⟨x8x⟩−1 ⟨x8x⟩,

B ≡ y⟨y8y⟩−1 ⟨h8x⟩,

C ≡ y⟨y8y⟩−1 ⟨h8x⟩⟨x8x⟩−1 ⟨x8x⟩

Thus, A, B, C, and thus ω are clearly equivalent to linear combinations of (the columns of) g and y.
Consequently, ω is also a pseudo-Lipschitz image of g 1 , . . . , g i because y is. This proves 1).

4.8

N E⊗OR⊤ Master Theorem, Vectorwise Convergence

Definition 4.8.1 (Integrated Program). Given an uniformized N E⊗OR⊤ program π (Eq. (4.14)), we
construct a parallel uniformized N ETSOR⊤ program π, called the integrated program, as follows. π’s
vectors will be denoted with an underline g 1 , . . . , g M (which will turn out to be equivalent to their
counterparts without underlines).
• The initial matrices of π and π are identical and using the same symbols A1 , . . . , AL .
• The initial vectors g 1 , . . . , g M0 are the same as those of the original program g 1 , . . . , g M0 .
77

• new vectors g i for i = M0 + 1, . . . , M are generated iteratively as follows: For each such i,
define ϕi : Ri−1 → R by
def
ϕi (x) =

E ϕi (x; 8g⟩ 1 ; . . . ; 8g⟩ i ; c̊)

1 ... i

for any x ∈ Ri−1 , where g denotes (g 1 , . . . , g i−1 ), c denotes (c1 , . . . , ci−1 ), and ϕi is from
Eq. (4.16). Then g i is generated as
g iα ←

n
X

 
where xiα = ϕi g α .

i
Wαβ
xiβ ,

β=1

Note all scalars ci of π are replaced by their deterministic limits c̊i ∈ R as constructed in
Definition 2.6.5 and absorbed into the nonlinearities ϕi .
The name integrated program refers to the intuition that we are replacing the averaging
⟨ϕi (gα ; gβ1 ; · · · ; gβi ; c)⟩β with integration E 1 ... i ϕi (gα ; 8g⟩ 1 ; · · · ; 8g⟩ i ; c̊).
Lemma 4.8.2. Consider a uniformized N E⊗OR⊤ program π in Setup 4.6.1 and its integrated
d
N ETSOR⊤ program π as constructed above. Then for g = (g 1 , . . . , g M ), we have 8g⟩ = 8g⟩ (as
random vectors in RM ) and
d

d

g ≡ g ≡ g̊ ≡ g̊.
d

In particular, this implies that for (non-uniformized) N E⊗OR⊤ programs, x ≡ x̊ for x being the
collection of all vectors, i.e., we have the vectorwise convergent version of the Master Theorem, a
strengthening of the 2nd half of Theorem 2.6.10 (which assumes initial scalars are Õ(n−1/2 )).
Before we prove this, let us remark that Lemma 4.8.2 automatically tells us that identities of kets, such
as [44, Lemma L.3], that hold for N ETSOR⊤ programs automatically hold for N E⊗OR⊤ programs:
Lemma 4.8.3 ([44, Lemma L.3]). For any vectors x, y and matrix W in a N E⊗OR⊤ program, the
following identities hold.
⟨x8W y⟩ = ⟨W ⊤ x8y⟩
˙ ⊤ x8y⟩
⟨x8W yˆ⟩ = ⟨W

d

Proof of Lemma 4.8.2. The distributional equality 8g⟩ = 8g⟩ follows straightforwardly from the
d

definition of these random vectors. Thus we also have g̊ = g̊ (since they are just iid samples of 8g⟩
d

and 8g⟩). We also have from Theorem 4.7.2 that g ≡ g̊. So it remains to prove that g ≡ g.

We will induct on i to show that (g 1 , . . . , g i ) ≡ (g 1 , . . . , g i ). Note that, by Proposition 4.3.11, this
implies (x1 , . . . , xi+1 ) ≡ (x1 , . . . , xi+1 ), and by Lemma 4.3.13, this also implies (c1 , . . . , ci+1 ) ≡
(c̊1 , . . . ,c̊i+1 ).
The base case of i = M0 is trivial since both programs share their initial vectors.
Assuming the induction hypothesis for i (i.e., (g 1 , . . . , g i ) ≡ (g 1 , . . . , g i )), we shall prove it’s also
true for i + 1: i.e., we need to show g i+1 ≡ g i+1 in addition.
For brevity, write ϕ = ϕi+1 , ϕ = ϕi+1 , W = W i+1 , x = xi+1 . Let g denote (g 1 , . . . , g i ); likewise
for g. Let c denote (c1 , . . . , ci ) and c̊ denote (c̊1 , . . . ,c̊i ). Then since g ≡ g and c ≡ c̊ by IH, we
have by Proposition 4.3.11 that
ϕ(g; . . . ; g; c) ≡ ϕ(g; . . . ; g; c̊) ∈ Sbi+2 .
Finally, by Lemma 4.4.6, we get
⟨ϕ(g; g β ; . . . ; g β ; c̊)⟩β ≡
1

i

E ϕ(g; 8g⟩ 1 ; . . . ; 8g⟩ i ; c̊) = ϕi+1 (g; c̊) = x.

1 ... i

78

So, altogether,
x = ⟨ϕ(g; gβ1 ; . . . ; gβi ; c)⟩β ≡ x.
Finally, by Proposition 4.3.14, we arrive at
g i+1 = W x ≡ W x = g i+1
as desired.
Remark 4.8.4. In this proof, the preservation of equivalence under iid matrix multiplication
Proposition 4.3.14 (proved using off-the-shelf operator norm tail bounds) is crucial. It allowed
us to circumvent a complex (and probably ill-fated) Gaussian conditioning argument inside a larger,
more involved induction loop. This preservation property is a key factor behind the Definition 4.3.5
of “vanishing.” The slight downside to this is that initial scalars need to be Õ(n−1/2 ) (to get the
equivalence going in the first place), but that is satisfied most of the time in practice.

4.9

Proof of N E⊗OR⊤ Master Theorem Theorem 2.6.10

With Lemma 4.8.2, the only things left to prove are: 1) We can weaken the requirement that the
initial scalars are Õ(n−1/2 ) (Definition 1.2.5) to just that they converge to 0 almost surely; in turn
the conclusion needs to be weakened as well to almost sure convergence instead of the stronger
Õ(n−1/2 ) convergence. 2) We can swap the Gaussian setup Setup 2.6.3 with the non-Gaussian setup
Setup 2.6.4 and not only still obtain all of the above results but also show all scalars converge in Lp
as well, for all p ∈ [1, ∞).
4.9.1

Relaxing Initial Scalar Requirement

This will follow from the “uniformly locally Lipschitz” property of N E⊗OR⊤ programs: For any
scalar θ in a program, we can treat θ as a random function θn (c) of initial scalars c (with randomness
coming from sampling of initial matrices and vectors) for any finite n. Then for any c, there is a
neighborhood of c and a constant L > 0 such that θn is almost surely Lipschitz for all n on that
neighborhood with Lipschitz constant L.
This property in particular implies that θn is equicontinuous over n almost surely, and thus how fast
or slow cn converges to c̊ does not affect the limit limn→∞ θn (cn ).
This “uniformly locally Lipschitz” property can be shown by proving a sub-Weibull23 tail bound on
the convergence of any scalar in a program, and then performing a chaining argument [37]. The full
details will be given in a future paper.24
4.9.2

Proof of Non-Gaussian N E⊗OR⊤ Master Theorem

The non-Gaussian N ETSOR⊤ Master Theorem ([12]) states that, under Setup 2.6.4, the scalars of the
program converge almost surely and in Lp for every p ∈ [1, ∞). Our goal here is to adapt its proof to
the more general N E⊗OR⊤ case.
The overarching proof strategy of the non-Gaussian N ETSOR⊤ Master Theorem was to smoothly
interpolate between the non-Gaussian program and the Gaussian program (c.f. [12, Defn 5.1]) and to
show that for large enough n, the scalars of the program do not change much along this interpolation.
In fact, the total change along this interpolation is Õ(n−1/2 ) (see the last chain of equation/inequalities
before [12, Sec 5.1]). So if we can adapt all of the reasoning to N E⊗OR⊤, then we can obtain the
Õ(n−1/2 ) convergence in Theorem 2.6.10 as well under Setup 2.6.4.
The key technical insight enabling all of this is a bound on the moments of mixed derivatives of a
non-Gaussian program’s scalars and vectors against the program’s matrices.
23
i.e., the probability of deviating t away from the limit is bounded by a function of the form exp(−C(nt)α )
for some power α > 0 (usually < 1).
24
Note that only the Dynamical Dichotomy Theorem (i.e., classification of abcd-parametrizations) needs to
deal with initial scalars that converge slower than Õ(n−1/2 ). In particular, the NT and µ-limits only need the
version of the Master Theorem with Õ(n−1/2 ) initial scalars.

79

To obtain the non-Gaussian N E⊗OR⊤ Master Theorem, the main task is to generalize this key
technical insight, with which the interpolation trick carries over to our case easily. This is done in
Lemmas 4.9.2 and 4.9.3 below, which are useful in their own right beyond this context. The full
proof of the non-Gaussian Master Theorem can be then be straightforwardly adapted from [12].
Setup 4.9.1. Consider Setup 2.6.4, but allow the variances of matrix entries to differ from n−1 but
still bounded above by ν2 n−1 for some ν2 > 0 common to all matrix entries.
Below, we invoke the notion of oblivious constants from [12, Defn I.1]. This is a technical notion
needed to finish the proof of the the non-Gaussian Master Theorem, but the first time readers can
ignore the comments on oblivious constants.
Lemma 4.9.2 (Expected Smoothness of Vectors). Consider a N E⊗OR⊤ program under Setup 4.9.1.
Then, for any polynomially smooth ψ : RrM +M → R, any p ≥ 1, and any multiset P of the
program’s matrix entries {Wαβ }α,β,W ∈W ,
sup E ∂ P ψ(gα1 ; · · · ; gαr ; c)

p

= O(1)

as n → ∞.

(4.25)

α∈[n]r

where constant in the big-O is (p, P)-oblivious wrt ψ and the program.
This generalizes [12, Lemma I.3] to N E⊗OR⊤.
Proof. In the original proof in [12, Sec I], replace ϕ(x1 , . . . , xk ) with ϕ(x1 ; · · · ; xk ) everywhere.
As the original proof essentially factors through arguments about the “supremum” over all indices
α ∈ [n], it can be adapted straightforwardly to the “supremum” over all multi-indices α ∈ [n]r .
Lemma 4.9.3 (Expected Smoothness of Scalars). Consider a program in Setup 4.9.1. Then for any
p ≥ 1, any nonempty multiset P of the program’s matrix entries {Wαβ }α,β,W ∈W „ and any scalar c
of the program,
p
E ∂ P c = O(n−p ) as n → ∞.
(4.26)
Furthermore, the constant in the big-O is (p, P)-oblivious wrt the program.
This generalizes [12, Lemma J.6] to N E⊗OR⊤.
Proof. Construct the backpropagation program (Definition 2.9.14), which is another N E⊗OR⊤
program. Then proceed as in the proof of [12, Lemma J.6].

80

Chapter 5

Experiments
5.1

Numerical Verification

We perform numerical experiments to validate our theory. It is intractable to compute the exact
infinite-width limits for general Q, since the expectations required to evaluate the infinite-width
dynamics in both limits do not admit an analytical solution (even for the Neural Tangent Limit). We
thus employ Monte Carlo simulations to approximate these expectations.
We test Theorem 2.4.9 and Theorem 2.7.3 by training ReLU MLPs (L = 4 for NTP and L = 2 for
µP) on R10 Gaussian inputs and a unit output. We use the standard L2 loss function, regressing to
random targets. We train networks with different widths using the Adam optimizer with a learning
rate of η = 0.2 and ϵ = 10−4 , using 100 training samples and conducting 10 trials for each width.
To account for varying initial outputs and loss derivatives per weight initialization, we subtract
the initialized network output from the output for each sample, ensuring that the output is zero at
initialization for all inputs.
We approximate the infinite-width training dynamics by estimating the expectations in Definition 2.4.4
and Theorem 2.7.3 using Monte Carlo simulations. As the initial loss derivatives are deterministic
with zero outputs, the infinite-width dynamics can be estimated without actually constructing a
network. To compare the finite and infinite width neural networks’ evolution, we assess the output on
random inputs at each iteration. Our results are summarized in Fig. 5.1 and Fig. 5.2. As anticipated,
the training dynamics converge to the infinite-width dynamics as the width increases.

81

(a)

(b)

(c)

Figure 5.1: Adam training dynamics of finite and infinite-width networks in NTP. We train networks
of widths 64 (a), 512 (b), 7000 (c), and track the outputs for 4 random inputs (one per row) at each
iteration as the network trains. We compute the output distribution over 10 independent runs for
each network, and compare with the infinite-width dynamics (black curve). As the width grows, the
network function converges to that of the infinite-width dynamics captured in Theorem 2.4.9.

82

(a)

(b)

(c)

Figure 5.2: Adam training dynamics of finite and infinite-width networks in µP. We train networks
of widths 64 (a), 512 (b), 7000 (c), and track the outputs for 4 random inputs (one per row) at each
iteration as the network trains. We compute the output distribution over 10 independent runs for
each network, and compare with the infinite-width dynamics (black curve). As the width grows, the
network function converges to that of the infinite-width dynamics captured in Theorem 2.7.3.

83

Acknowledgements
In alphabetical order, we would like to thank Jeremy Bernstein, Nikhil Ghosh, Dror Ironi, Ariel
Landau, Sadhika Malladi, Jamie Simon, and Josh Susskind for providing insightful comments and
discussion.

84

Bibliography
[1] Sina Alemohammad, Zichao Wang, Randall Balestriero, and Richard Baraniuk. The recurrent
neural tangent kernel. ArXiv, abs/2006.10246, 2021.
[2] Zeyuan Allen-Zhu, Yuanzhi Li, and Zhao Song. A convergence theory for deep learning via
over-parameterization. ArXiv, abs/1811.03962, 2019.
[3] Sanjeev Arora, S. Du, Wei Hu, Zhiyuan Li, R. Salakhutdinov, and Ruosong Wang. On exact
computation with an infinitely wide neural net. In NeurIPS, 2019.
[4] Jeremy Bernstein, Yu-Xiang Wang, Kamyar Azizzadenesheli, and Anima Anandkumar.
signSGD: Compressed Optimisation for Non-Convex Problems, February 2018. URL
https://arxiv.org/abs/1802.04434v3.
[5] Jeremy Bernstein, Arash Vahdat, Yisong Yue, and Ming-Yu Liu. On the distance between two
neural networks and the stability of learning. arXiv:2002.03432 [cs, math, stat], January 2021.
URL http://arxiv.org/abs/2002.03432.
[6] Simon Carbonnelle and Christophe De Vleeschouwer. Layer rotation: a surprisingly powerful
indicator of generalization in deep networks? arXiv:1806.01603 [cs, stat], July 2019. URL
http://arxiv.org/abs/1806.01603.
[7] Lénaïc Chizat and Francis R. Bach. On the global convergence of gradient descent for overparameterized models using optimal transport. In NeurIPS, 2018.
[8] Lénaïc Chizat, Edouard Oyallon, and Francis R. Bach. On lazy training in differentiable
programming. In NeurIPS, 2019.
[9] Timothy Dozat. Incorporating nesterov momentum into adam. 2016.
[10] Simon Shaolei Du, Kangcheng Hou, Barnabás Póczos, Ruslan Salakhutdinov, Ruosong Wang,
and Keyulu Xu. Graph neural tangent kernel: Fusing graph neural networks with graph kernels.
ArXiv, abs/1905.13192, 2019.
[11] John C. Duchi, Elad Hazan, and Yoram Singer. Adaptive subgradient methods for online
learning and stochastic optimization. In J. Mach. Learn. Res., 2010.
[12] Eugene Golikov and Greg Yang. Non-Gaussian Tensor Programs. October 2022. URL
https://openreview.net/forum?id=AcHUIG2wA8-.
[13] Boris Hanin and Mihai Nica. Finite depth and width corrections to the neural tangent kernel.
ArXiv, abs/1909.05989, 2020.
[14] Geoffrey E. Hinton and R. Neal. Bayesian learning for neural networks. 1995.
[15] Jiri Hron, Yasaman Bahri, Jascha Narain Sohl-Dickstein, and Roman Novak. Infinite attention:
Nngp and ntk for deep attention networks. In ICML, 2020.
[16] Jiaoyang Huang and H. T. Yau. Dynamics of deep neural networks and neural tangent hierarchy.
ArXiv, abs/1909.08156, 2020.
[17] Xiaoshan Huang, Felipe Pérez, Jimmy Ba, and Maksims Volkovs. Improving transformer
optimization through better initialization. In ICML, 2020.
85

[18] Arthur Jacot, Franck Gabriel, and Clément Hongler. Neural tangent kernel: convergence and
generalization in neural networks (invited paper). Proceedings of the 53rd Annual ACM SIGACT
Symposium on Theory of Computing, 2018.
[19] Diederik P. Kingma and Jimmy Ba. Adam: A method for stochastic optimization. CoRR,
abs/1412.6980, 2015.
[20] Jaehoon Lee, Y. Bahri, Roman Novak, S. Schoenholz, Jeffrey Pennington, and Jascha SohlDickstein. Deep neural networks as gaussian processes. ArXiv, abs/1711.00165, 2018.
[21] Jaehoon Lee, Lechao Xiao, Samuel S. Schoenholz, Yasaman Bahri, Jascha Sohl-Dickstein, and
Jeffrey Pennington. Wide neural networks of any depth evolve as linear models under gradient
descent. ArXiv, abs/1902.06720, 2019.
[22] Etai Littwin, T. Galanti, and L. Wolf. On random kernels of residual architectures. arXiv:
Learning, 2020.
[23] Etai Littwin, Tomer Galanti, Lior Wolf, and Greg Yang. On infinite-width hypernetworks. arXiv:
Learning, 2020.
[24] Etai Littwin, Omid Saremi, Shuangfei Zhai, Vimal Thilak, Hanlin Goh, Joshua M. Susskind,
and Greg Yang. Implicit Acceleration and Feature Learning in Infinitely Wide Neural Networks
with Bottlenecks, July 2021. URL http://arxiv.org/abs/2107.00364. arXiv:2107.00364
[cs].
[25] Liyuan Liu, Xiaodong Liu, Jianfeng Gao, Weizhu Chen, and Jiawei Han. Understanding the
difficulty of training transformers. ArXiv, abs/2004.08249, 2020.
[26] Yang Liu, Jeremy Bernstein, Markus Meister, and Yisong Yue. Learning by Turning: Neural
Architecture Aware Optimisation. arXiv:2102.07227 [cs], September 2021. URL http:
//arxiv.org/abs/2102.07227.
[27] Ilya Loshchilov and Frank Hutter. Decoupled weight decay regularization. In International
Conference on Learning Representations, 2017.
[28] Sadhika Malladi, Alexander Wettig, Dingli Yu, Danqi Chen, and Sanjeev Arora. A Kernel-Based
View of Language Model Fine-Tuning, October 2022. URL https://arxiv.org/abs/2210.
05643v3.
[29] A. Matthews, M. Rowland, J. Hron, R. Turner, and Zoubin Ghahramani. Gaussian process
behaviour in wide deep neural networks. ArXiv, abs/1804.11271, 2018.
[30] Song Mei, Andrea Montanari, and Phan-Minh Nguyen. A mean field view of the landscape
of two-layer neural networks. Proceedings of the National Academy of Sciences of the United
States of America, 115:E7665 – E7671, 2018.
[31] Song Mei, Andrea Montanari, and Phan-Minh Nguyen. A mean field view of the landscape
of two-layer neural networks. Proceedings of the National Academy of Sciences of the United
States of America, 115:E7665 – E7671, 2018.
[32] Phan-Minh Nguyen and Huy-Tuan Pham. A rigorous framework for the mean field limit of
multilayer neural networks. ArXiv, abs/2001.11443, 2020.
[33] Roman Novak, L. Xiao, Y. Bahri, Jaehoon Lee, Greg Yang, J. Hron, D. Abolafia, Jeffrey
Pennington, and Jascha Sohl-Dickstein. Bayesian deep convolutional networks with many
channels are gaussian processes. In ICLR, 2019.
[34] Grant M. Rotskoff and Eric Vanden-Eijnden. Neural networks as interacting particle systems:
Asymptotic convexity of the loss landscape and universal scaling of the approximation error.
ArXiv, abs/1805.00915, 2018.
[35] Noam Shazeer and Mitchell Stern. Adafactor: Adaptive Learning Rates with Sublinear Memory
Cost. April 2018. URL https://arxiv.org/abs/1804.04235v1.
86

[36] Justin A. Sirignano and Konstantinos Spiliopoulos. Mean field analysis of neural networks: A
law of large numbers. SIAM J. Appl. Math., 80:725–752, 2020.
[37] Michel Talagrand. Upper and lower bounds for stochastic processes: modern methods and
classical problems. Number 3. Folge, volume 60 in Ergebnisse der Mathematik und ihrer
Grenzgebiete : a series of modern surveys in mathematics. Springer, Heidelberg ; New York,
2014. ISBN 978-3-642-54074-5. OCLC: ocn873529598.
[38] Terence Tao. Topics in random matrix theory. Graduate studies in Mathematics, 132, 2012.
[39] Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez,
L. Kaiser, and Illia Polosukhin. Attention is all you need. ArXiv, abs/1706.03762, 2017.
[40] Sho Yaida. Meta-Principled Family of Hyperparameter Scaling Strategies. Technical
Report arXiv:2210.04909, arXiv, October 2022. URL http://arxiv.org/abs/2210.04909.
arXiv:2210.04909 [hep-th, stat] type: article.
[41] Greg Yang. Tensor programs i: Wide feedforward or recurrent neural networks of any
architecture are gaussian processes. ArXiv, abs/1910.12478, 2019.
[42] Greg Yang. Scaling Limits of Wide Neural Networks with Weight Sharing: Gaussian Process
Behavior, Gradient Independence, and Neural Tangent Kernel Derivation. arXiv:1902.04760
[cond-mat, physics:math-ph, stat], February 2019.
[43] Greg Yang. Tensor programs ii: Neural tangent kernel for any architecture.
abs/2006.14548, 2020.

ArXiv,

[44] Greg Yang. Tensor programs iii: Neural matrix laws. ArXiv, abs/2009.10685, 2020.
[45] Greg Yang and Edward J. Hu. Feature learning in infinite-width neural networks. ArXiv,
abs/2011.14522, 2020.
[46] Greg Yang and Etai Littwin. Tensor programs iib: Architectural universality of neural tangent
kernel training dynamics. ArXiv, abs/2105.03703, 2021.
[47] Greg Yang, Edward J. Hu, Igor Babuschkin, Szymon Sidor, Xiaodong Liu, David Farhi, Nick
Ryder, Jakub Pachocki, Weizhu Chen, and Jianfeng Gao. Tensor Programs V: Tuning Large
Neural Networks via Zero-Shot Hyperparameter Transfer. arXiv:2203.03466 [cond-mat],
March 2022. URL http://arxiv.org/abs/2203.03466. arXiv: 2203.03466.
[48] Y. Q. Yin, Z. D. Bai, and P. R. Krishnaiah. On the limit of the largest eigenvalue of the
large dimensional sample covariance matrix. Probability Theory and Related Fields, 78(4):
509–521, August 1988. ISSN 0178-8051, 1432-2064. doi: 10.1007/BF00353874. URL
https://link.springer.com/10.1007/BF00353874.
[49] Yang You, Igor Gitman, and Boris Ginsburg. Large Batch Training of Convolutional Networks.
arXiv:1708.03888 [cs], September 2017. URL http://arxiv.org/abs/1708.03888.
[50] Yang You, Jing Li, Sashank Reddi, Jonathan Hseu, Sanjiv Kumar, Srinadh Bhojanapalli,
Xiaodan Song, James Demmel, Kurt Keutzer, and Cho-Jui Hsieh. Large Batch Optimization
for Deep Learning: Training BERT in 76 minutes. arXiv:1904.00962 [cs, stat], January 2020.
URL http://arxiv.org/abs/1904.00962.
[51] J. Zhang, Sai Praneeth Karimireddy, Andreas Veit, Seungyeon Kim, Sashank J. Reddi, Surinder
Kumar, and Suvrit Sra. Why adam beats sgd for attention models. ArXiv, abs/1912.03194,
2019.
[52] Zhiming Zhou, Qingru Zhang, Guansong Lu, Hongwei Wang, Weinan Zhang, and Yong Yu.
Adaptive learning rate methods. 2018.

87


```

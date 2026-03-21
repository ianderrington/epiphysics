---
title: "Tensor Programs II: Neural Tangent Kernel for Any Architecture (arXiv:2006.14548) — Full Text Extraction"
description: >-
  Raw full-text extraction of TP2 in the Tensor Programs series for reproducible computational analysis.
date: 2026-03-21T00:00:00.000Z
draft: true
author:
  name: "epiphysics-open-source"
contentType: article
series: "Tensor Programs Sources"
coverImage:
  url: ./images/tp2_2006.14548.png
  alt: "Mathematical derivations from Tensor Programs series paper TP2"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
feedback:
  enabled: true
---

> [!note]
> Source PDF: `docs/research/tensor_programs/sources/TP2_2006.14548.pdf`
>
> Extracted text: `docs/research/tensor_programs/sources/TP2_2006.14548.txt`
>
> DOI: https://doi.org/10.48550/arXiv.2006.14548

## Full extracted text

```text
arXiv:2006.14548v4 [stat.ML] 30 Nov 2020

Tensor Programs II:
Neural Tangent Kernel for Any Architecture

Greg Yang
Microsoft Research AI
gregyang@microsoft.com

Abstract
We prove that a randomly initialized neural network of any architecture has its
Tangent Kernel (NTK) converge to a deterministic limit, as the network widths
tend to infinity. We demonstrate how to calculate this limit. In prior literature, the
heuristic study of neural network gradients often assumes every weight matrix used
in forward propagation is independent from its transpose used in backpropagation
[58]. This is known as the gradient independence assumption (GIA). We identify
a commonly satisfied condition, which we call Simple GIA Check, such that the
NTK limit calculation based on GIA is correct. Conversely, when Simple GIA
Check fails, we show GIA can result in wrong answers. Our material here presents
the NTK results of Yang [63] in a friendly manner and showcases the tensor
programs technique for understanding wide neural networks. We provide reference
implementations of infinite-width NTKs of recurrent neural network, transformer,
and batch normalization at https://github.com/thegregyang/NTK4A.

1

Introduction

Jacot et al. [39] showed that, in the limit of large width, a neural network undergoing training by
gradient descent evolves like a linear model. Their argument proceeds in two steps:
NTK I NIT If f (x; θ) is the neural network (with parameters θ and input x), then we can define a

kernel called Neural Tangent Kernel by
def

Θ(x, x̄) = h∇θ f (x; θ), ∇θ f (x̄; θ)i,

for any inputs x, x̄.

Jacot et al. [39] showed that, if the parameters θ are appropriately randomized, then Θ
converges to a deterministic kernel Θ̊ as the widths of f grow to infinity.
NTK T RAIN In the limit of large width, the NTK in the course of gradient descent stays constant,
and remarkably, the network evolves like a linear model under kernel gradient descent with
this limiting NTK Θ̊.
With recent experimental validation [45], NTK promises to shed light on the training and generalization properties of overparametrized neural networks. Yet, it’s not clear whether NTK continues to
be valid for modern deep learning, such as Faster R-CNN in image segmentation [56], transformer
in machine translation [59], or generative adversarial networks for distribution learning [25]. In
particular, we ask
Does every modern neural network have an infinite-width NTK? Can we compute it?
Our contributions. In this paper, we show that the NTK for any randomly initialized neural network
of standard architecture1 converges almost surely to a deterministic limit, as the network widths2
tend to infinity, and we show how to exactly compute this limit, i.e. we generalize NTK I NIT to
standard architectures. By standard architecture we mean any architecture that is some composition
1

In this work, architecture refers to the network topology along with the ratios of widths of hidden layers.
In fully-connected network, width is the number of neurons in a layer. In a convolutional network, width is
the number of channels in a layer.
2

of multilayer perceptrons (MLPs), recurrent neural networks (RNNs) (e.g., Long-Short Term Memory
(LSTM) [33] or Gated Recurrent Unit (GRU) [14]), skip connections [31, 35], convolutions [22, 23,
42, 43, 57] or graph convolutions [11, 17, 20, 32, 40, 46], pooling [42, 43], batch normalization
[38], layer normalization [8] and/or attention [9, 59]. More generally, our result applies to any
architecture whose forward and backpropagation can be expressed via nonlinearities and matrix
multiplication (Definition 7.1).

We give concrete algorithms to compute the infinite-width
NTK for batchnorm-ReLU MLP, transformer, and RNN
(Appendix E) and verify they agree with simulations. In
the plot on the right, we have computed the deviation
of empirical NTKs Θwidth over widths 26 , . . . , 213 from
the corresponding limits Θ̊. The shade represents 95%
confidence interval of the mean over 100 seeds.

Finite-Width Deviation from Infinite-Width NTK
relative Frobenius norm
| width |F/| |F

In the process, we identify a commonly satisfied condition
(Simple GIA Check, Condition 1) that rigorously justifies
what is known as the Gradient Independence Assumption (GIA) [67]. This is the heuristic, used in calculating
the statistics of neural network gradients at initialization,
that W > in backpropagation is independent from W in
forwardpropagation. However, without Condition 1, calculation based on GIA can be incorrect (Section 6.3).

model
BN+ReLU
transformer
RNN
width 1/2

10 1

10 2

102

103

width

104

The Tensor Programs Series This paper is the second in the Tensor Programs series, following
Yang [62]. Here we show NTK I NIT holds for any standard architecture, which motivates N ETSOR>,
an extension of the tensor program language N ETSOR in Yang [62] by matrix transposes. Whereas
N ETSOR can only express the forward propagation of a neural network, N ETSOR> can also express
its backpropagation. This allows us to reason about the network’s gradients in the infinite-width
limit (and hence the NTK), which N ETSOR cannot do. In a future paper, we will also generalize
NTK T RAIN for any standard architecture, which requires an even more expressive extension of
N ETSOR>. The results in this paper supercede all results in Yang [63] regarding NTK.
Our results here imply a universal Neural Network-Tangent Kernel correspondence. It opens a way
toward studying the inductive biases of a neural network of any architecture trained under SGD.
We hope this can enable theoretical understanding to catch up to practice even as neural networks
manifest in increasingly many varied architectures in modern deep learning.

2

Background

Given a parametrized function f (x; θ) with parameter θ and with scalar output, we can naively
expand f in θ around a base point θ0
f (x; θ) − f (x; θ0 ) ≈ h∇θ f (x; θ0 ), θ − θ0 i

(1)

for any input x, where h, i denotes inner product. The RHS is a linear model, where ∇θ f (−; θ0 ) acts
as a input featurizer, and θ − θ0 acts as the weights. This is a good approximation as long as θ is
not too far from θ0 — in particular, if f is a neural network and we train it for a short amount of
time under gradient descent with a small learning rate. However, at face value, it seems f can never
change — and learn — much under such training. Why would such a naive linearization of f be
helpful?
Counterintuively, Jacot et al. [39] showed that, as the network widths tend to infinity, f can in fact
fit any data perfectly while Eq. (1) remains an accurate description of the training dynamics! An
explanatory intuition is that, when θ is high dimensional, even a small change in θ can cause a large
change in f .
Let’s be a bit more precise. Consider the L-hidden-layer MLP f (x; θ) described below in Eq. (2),
def

with width nl in layer l. Then Jacot et al. [39] showed that the finite-width NTK Θ(x, x̄) =
h∇θ f (x; θ), ∇θ f (x̄; θ)i converges in probability
p

Θ−
→ Θ̊

as n1 , . . . , nL → ∞ in that sequence,

(NTK I NIT)

for some deterministic Θ̊ to be described below (Eq. (12)), over the randomness induced by randomly
l
initializing the parameters like ωαβ
, blα ∼ N (0, 1), ∀α, β. This means that the inner product between
2

every pair of features ∇θ f (x; θ0 ), ∇θ f (x̄; θ0 ) of Eq. (1) converges, as widths tend to infinity, even
though the parameters θ are random.
Now consider the evolution of the MLP ft with time t, trained under continuous time gradient
descent with loss function L. Let the initial function f0 be obtained by standard Gaussian random
initialization as above. Then Jacot et al. [39] showed that, in the large width limit, for any fixed
training time T ,
ft → f˚t for all t < T , where f˚0 = f0 , ∂t f˚t = −η Θ̊ · ∇f L(f˚t ).
(NTK T RAIN)
Thus, somehow the hopelessly complicated optimization trajectory of an MLP has reduced to a kernel
gradient descent with a fixed kernel Θ̊. For square loss L, this equation further simplifies to a linear
differential equation, allowing one to solve for f˚t explicitly for all t: if labels are provided by a
ground truth function f ∗ , then
f˚t − f ∗ = e−ηtΘ̊ (f0 − f ∗ ).
Because one can show Θ̊ is in general a non-singular kernel, this equation implies that f can fit any
training data given it is wide enough [39].
Thus, the infinite-width NTK Θ̊ reflects an implicit prior induced by gradient descent and the choices
of architecture and initialization scheme. For example, its spectrum informs us the kind of functions
that can be learned quickly and generalize well [65]. Jacot et al. [39] gave us a way into the blackbox
of MLPs, and this paper tries to fill the gap for modern architectures. Here we describe a general,
rigorous way of computing the infinite-width NTK of a network. In a future paper of this series, we
will also show NTK T RAIN holds for any architecture as well. We hope our work here can enable
theoretical analyses of state-of-the-art neural networks that contribute to the practice of modern
machine learning.

3

Related Works

A much older literature of Gaussian process (GP) behavior of wide neural networks also associates a
kernel to each network (the NN-GP correspondence) [16, 30, 41, 44, 50–52, 60]. While the NTK can
be thought of as characterizing the behavior of training the full network under gradient descent, the
infinite-width GP of a network characterizes the same when training only the last layer.
After Jacot et al. [39] invented NTK, our original paper [63] proved the architectural universality of
NTK and NN-GP. However, the results were written densely and in heavy programming language
notation. Yang [62] simplified the writing and generalized the results for GP. We do the same here for
the NTK results.
After Yang [63], several works dove into specific kinds of NTKs, such as convolutional [6], graph
[19], hypernetworks [48], RNNs [2], attention [34], or NTK with orthogonal initialization [37]. Other
works studied the higher order terms in the Taylor expansion [21, 36], ensembled NTK [49], or finite
width corrections [27, 47].
Closely related is the signal propagation literature, which tries to understand how to prevent pathological behaviors in randomly initialized neural networks when they are deep [13, 26, 28, 29, 53–
55, 58, 66–68]. The investigation of forward signal propagation corresponds to studying the infinitedepth limit of the associated Gaussian process, and the investigation of backward signal propagation
corresponds to studying the infinite-depth limit of NTK.
Neural tangent kernel solved an age-old question of “how does training of neural network work so
well despite being highly nonconvex?” [3–5, 18, 39, 69]. This in turn has been used for studying
convergence questions in deep reinforcement learning [1, 12]. The spectrum of NTK has been
analyzed to provide finer-grained answers to these problems [10, 24, 65].
Compared to neural networks, kernel regression with the corresponding NTKs work better in the low
data regime [7], consistent with classical observations about kernel methods and previous works on
NNGPs [44, 52]. This can be valuable in important settings such as medical data that need to make
decisions based on only a few data points.

4

Warmup: Neural Tangent Kernel for a Multi-Layer Perceptron

We first demonstrate the intuitions of our framework by redoing the MLP NTK limit computation.
0
Consider the MLP f (ξ; θ) = W L+1 xL (ξ) with input ξ ∈ Rn and output dimension nL+1 = 1,
3

where we recursively define, for l = 2, . . . , L,
l

hl (ξ) = W l xl−1 (ξ) + bl ∈ Rn ,

xl (ξ) = φ(hl (ξ)),

h1 (ξ) = W 1 ξ + b1 ∈ Rn

1

(2)

in which each W l is factorized as W l = √ 1l−1 ω l , and the MLP’s parameters are θ = {ω l ∈
n

l

l−1

l

l
n L
Rn ×n }L+1
l=1 ∪ {b ∈ R }l=1 . This style of parametrization of weight matrices is known as
l
the NTK parametrization. We shall sample ωαβ
, blα ∼ N (0, 1), ∀α, β. Jacot et al. [39]’s argument
for NTK I NIT is inductive in the depth of the MLP, which would run into difficulty generalizing to
other architectures with weight sharing, like RNNs. Here we show a different technique based on
decomposing the NTK into an explicit sum of products of terms whose limits we can evaluate.

4.1

Decomposing NTK

For simplicity, write f (ξ) = f (ξ; θ) and ∇p f (ξ) will denote gradient of the output f (ξ) in some
quantity p, given ξ and θ. In the MLP (Eq. (2)) above, we can decompose the NTK into contributions
0
¯
from weights and biases: for inputs ξ, ξ¯ ∈ Rn (possibly ξ = ξ),
Θ(ξ, ¯
ξ) = h∇θ f (ξ), ∇θ f ( ¯
ξ)i =

L+1
X

∇ωl f (ξ), ∇ωl f ( ¯
ξ) +

l=1

L
X

∇bl f (ξ), ∇bl f ( ¯
ξ) ,

(3)

l=1

where h, i denotes (trace) inner product. To see this quantity converges as widths n1 , . . . , nL → ∞,
it suffices to show that each summand converges. First note the nl × nl−1 matrix ∇ωl f (ξ) is
the product of the nl × 1 vector √ 1l−1 ∇hl f (ξ) and the 1 × nl−1 vector xl−1 (ξ)> , by chain rule.
n
√
¯ for different vectors • ∈ {hl , xl }l . Set dhl = nl ∇hl f (ξ) and
¯
Abbreviate
•
=
•(ξ),
•
=
•(
ξ)
√
¯ Then we have ∇ωl f (ξ)
¯ = √ 1 dh̄l x̄l−1> . Using the cyclic property of the
dh̄l = nl ∇ l f (ξ).
h̄

nl nl−1

trace inner product in the right equality,
∇ωl f (ξ), ∇ωl f ( ¯
ξ) =

1
dhl xl−1> , dh̄l x̄l−1> =
nl nl−1



dhl> dhl
nl

  l−1> l−1 
x
x̄
.
nl−1

(4)

In the rest of the section we seek to understand the two terms in this product in an intuitive way.
The main ingredients in our argument are a central limit heuristic (i.e. the sum of many roughly
independent random variables looks like a Gaussian) and gradient independence assumption.
4.2

Limits of Forward Quantities xl> x̄l /nl

By the randomness of the initial weight matrices and inductive applications of central limit arguments,
(xlα , x̄lα ) is intuitively correlated but roughly iid across α ∈ [nl ] [55, 58], so
xl> x̄l
→ C l (ξ, ¯
ξ),
nl

(5)

¯ Unpacking this a bit: for each α, the coordinate (W l xl−1 )α =
for some deterministic scalar C l (ξ, ξ).
Pn
l−1
l
l
is a sum of a large number n of roughly iid random variables Wαβ
xl−1
β=1 Wαβ xβ
β . Its
P
P
n
n
l−1 2
l−1 2
l l−1 2
l
l
2
l−1 2
variance is E(W x )α = E( β=1 Wαβ xβ ) = β=1 E(Wαβ ) E(xβ ) = kx k /nl−1 ≈
C l−1 (ξ, ξ). So by a central limit argument, (W l xl−1 )α should look like N (0, C l−1 (ξ, ξ)). Similarly,
(W l x̄l−1 )α should be roughly N (0, C l−1 ( ¯
ξ, ¯
ξ)) and the pair ((W l xl−1 )α , (W l x̄l−1 )α ) should be
l−1
jointly Gaussian with covariance C (ξ, ¯
ξ). Then the pair (xlα , x̄lα ) should be distributed like
l
(φ(ζ), φ(ζ̄)), and C satisfies the following recursion (here the +1 comes from the bias bl ∼ N (0, 1))
C l (ξ, ¯
ξ) = E φ(ζ)φ(ζ̄),
4.3

where (ζ, ζ̄) ∼ N

  l−1


¯
C (ξ, ξ) C l−1 (ξ, ξ)
0,
+
1
.
¯ ξ) C l−1 (ξ,
¯ ξ)
¯
C l−1 (ξ,

(6)

Limits of Backward Quantities dhl> dh̄l /nl
def

For simplicity, assume n1 = · · · = nL . Then like hl , we can also expand dxlα = (W l+1> dhl+1 )α =
P
l+1
0 l+1
(W l+1> (dxl+1 φ0 (hl+1 ))α = β Wβα
dxl+1
β φ (hβ ). We might hope to say that each term of
4

this sum is roughly independent so we can apply a central limit heuristic, but hl+1
actually depends
β
l+1
on Wβγ for all γ. Interestingly, the signal propagation literature [58, 61, 67, 68] has found it’s fine
to ignore such dependences: If we adopt the following
Heuristic 4.1 (gradient independence assumption, or GIA [58, 67]). For any matrix W , we assume
W > used in backprop is independent from W used in the forward pass.
then the resulting calculation will still agree with simulation when n1 , . . . , nL  1. With
this assumption, we can then proceed as in Section 4.2 and argue dxlα is roughly distributed as N (0, kdhl+1 k2 /nl+1 ) and iid across α ∈ [nl ]. Likewise, we argue the pair
def

(dxlα , dx̄lα ) = ((W l+1> dhl+1 )α , (W l+1> dh̄l+1 )α ) is jointly Gaussian with zero mean and covariance kdhl+1> dh̄l+1 k2 /nl+1 , and is iid across α. Since (hlα , h̄lα ) is also roughly iid across α, we
expect (dhlα , dh̄lα ) = (dxlα φ0 (hlα ), dx̄lα φ0 (h̄lα )) to be so as well, and
dhl> dh̄l
¯
→ Dl (ξ, ξ),
nl

(7)

for some deterministic scalar Dl (ξ, ¯
ξ). Combining our calculations here, we see Dl satisfies the
recurrence
¯ = E η η̄ E φ0 (ζ)φ0 (ζ̄) = Dl+1 (ξ, ξ)
¯ E φ0 (ζ)φ0 (ζ̄)
Dl (ξ, ξ)
(8)
  l+1

l+1
¯
D (ξ, ξ) D (ξ, ξ)
where (η, η̄) ∼ N 0,
,
¯ ξ) Dl+1 (ξ,
¯ ξ)
¯
Dl+1 (ξ,
  l


¯
C (ξ, ξ) C l (ξ, ξ)
(ζ, ζ̄) ∼ N 0,
+
1
¯ ξ) C l (ξ,
¯ ξ)
¯
C l (ξ,
Together with Eq. (5) and Eq. (7), we have
¯ → C l−1 (ξ, ξ)D
¯ l (ξ, ξ),
¯
∇ωl f (ξ), ∇ωl f (ξ)
√
Similarly, because ∇bl f (ξ) = ∇hl f (ξ) = dhl / nl , we have
¯ → Dl (ξ, ξ),
¯
∇bl f (ξ), ∇bl f (ξ)

∀l ∈ [2, L].

∀l ∈ [2, L].

So the NTK should converge like
¯ →
Θ(ξ, ξ)

L+1
X

¯ l (ξ, ξ)
¯ +
C l−1 (ξ, ξ)D

L
X

¯
Dl (ξ, ξ).

(9)

l=1

l=1

Together with Eq. (6) and Eq. (8), this in fact recovers the NTK limit formula in Jacot et al. [39].

5

NTK for Any Architecture? The Issues and the Proposal

The method presented in the last section for computing the MLP NTK already seem easier than that
of Jacot et al. [39] to generalize to other architectures, but several thorny issues still remain.
Q1: Can we meaningfully generalize the NTK decomposition in Eq. (3)? For example, for an
MLP with weights tied across layers (i.e. W l = W l+1 , for all l = 1, . . . , L − 1), we can generalize
l>
l
Eq. (3) into a similar decomposition, but how do we know terms like dh nldh̄ will converge or won’t
blow up to ∞ due to the extra correlations from weight tying?
Q2: Can we continue to assume gradient independence? GIA significantly simplified our calculation above for the MLP. However, at a first glance it would still seem absurd to assume W > is
independent from W . Now, for example, suppose we tie the weights across layers in the MLP. The
additional correlations then make GIA even more questionable. Can we still assume GIA?
Q3: Can we uniformly handle the complexity of modern neural networks? Standard architectures like CNN, RNN, GRU, LSTM, transformer, ResNet, etc contain a wide variety of gadgets, and
a priori it’s not clear there’s a systematic way of handling all of them at once.
The techniques in this paper yield the following answers:
5

A1: Yes. We can generalize Eq. (3) to decompose the NTK into a sum of products of inner products
of the form h> h̄/n with h, h̄ ∈ Rn , and importantly, each such term will turn out to tend to a
deterministic finite constant as n → ∞, implying NTK converges as well. See Eqs. (10) and (12).
A2: Conditional Yes. It turns out, somewhat counterintuitively, whether GIA works doesn’t depend
on the hidden-to-hidden weight matrices (which GIA concerns) so much as the output layer weights.
The following is a general but easily checkable condition that implies GIA:
Condition 1 (Simple GIA Check). The output layer (like W L+1 in the MLP example above) is
sampled independently and with zero mean from all other parameters and is not used anywhere else
in the interior of the network3 .
At a very high level, Condition 1 implies GIA because any weight matrix W can only interact with
its transpose W > via a path that goes through the last layer weights. If these weights are sampled
independently and with zero mean, then such interactions are zeroed out as well. See Eq. (16) for a
concrete explanation. In Section 6.3, we also show a counterexample where Condition 1 is violated
and GIA doesn’t work4 . For a more general condition guaranteeing GIA, see Definition A.3.
A3: Yes. We introduce a simple and general language, N ETSOR> (extending N ETSOR from Yang
[62]), expressing compositions of matrix multiplication and nonlinearity application, such that if
an NN satisfies Condition 1 and one can write down its forward and backward computations in
N ETSOR> (as can be done for standard architectures), then its NTK provably converges under mild
regularity conditions (Corollary 7.3). This N ETSOR> program can allow one to mechanistically
compute the infinite-width NTK by recursively applying the Master Theorem (Theorem 7.2).

6

Strategy for Computing the Infinite-Width NTK

For general architectures, we can in fact compute the NTK with an overall strategy very similar to
Eq. (3) and Eq. (9).
6.1

The Canonical Decomposition

Consider a neural network5 f (ξ) with input ξ ∈ Rd , scalar output, and with weights W and
biases b such that any weight W ∈ Rn×m is always used in the computation of f (ξ) in the form
y(ξ) = W z(ξ), for possibly many different vectors y(ξ) ∈ Rn , z(ξ) ∈ Rm . For example, in the MLP
example above, W would be W l for some l, and y(ξ) = hl (ξ), z(ξ) = xl−1 (ξ). If the MLP weights
are tied across layers with W = W 2 = · · · = W L , then (y, z) ∈ {(h2 , x1 ), . . . , (hL , xL−1 )}.
Suppose that we adopt the NTK parametrization where W is factored as W = √1m ω for ω ∈ Rn×m ,
and ω, instead of W , is trained. Then the NTK Θ of f is a sum
X
X
¯ =
¯ +
¯
Θ(ξ, ξ)
∇ω f (ξ), ∇ω f (ξ)
∇b f (ξ), ∇b f (ξ)
(10)
ω

b

over biases b and factorized weights ω. In the MLP example with tied-weights W = W 2 = · · · =
PL−1
W L ∈ Rn×n and W = √1n ω, we can write ∇ω f (ξ) = n1 l=1 dhl+1 xl> , and
¯ = 1
∇ω f (ξ), ∇ω f (ξ)
n2
=

*L−1
X

l+1

dh

l>

x ,

l=1

L−1
X

+
`+1

dh̄

x̄

`>

`=1

L−1

L−1

l,`=1

l,`=1

X dhl+1> dh̄`+1 xl> x̄`
1 X
l+1 l>
`+1 `>
.
dh
x
,
d
h̄
x̄
=
n2
n
n

i.e. if the output weight is v and the output is v > x, then x does not depend on v.
Note that GIA means we can assume the backward weights are independent from the forward weights but
multiple usages of backward weights (e.g. in an RNN backprop) are not assumed to be independent from each
other.
5
formally, we consider any neural network whose computation can be expressed in N ETSOR>
(Definition 7.1); however, in this section, an intuitive understanding of “neural network” is enough.
3

4

6

¯ z̄ =
In the general
ξ, ξ¯ to f (possibly equal). If we abbreviate ȳ = y(ξ),
√ two inputs
√ case, consider any
¯
¯
z(ξ), dy = n∇y f (ξ), dȳ = n∇ȳ f (ξ), then we can express the contribution of ∇ω f to the NTK
Θ of f as
*
+
X
X
1
1
¯ =
¯ =
∇ω f (ξ), ∇ω f (ξ)
∇W f (ξ), ∇W f (ξ)
dy z > ,
dȳ z̄ >
m
mn y,z
ȳ,z̄
=

X dy > dȳ z > z̄
1 X
dy z > , dȳ z̄ > =
mn y,z,ȳ,z̄
n
m
y,z,ȳ,z̄

(11)

where the sum is over all matrix multiplication of the form y = W z (resp. ȳ = W z̄) used in the
computation of f (ξ) (resp. f ( ¯
ξ)). Notice how Eq. (10) generalizes
Eq. (3), and Eq. (4) is just Eq. (11)

where the sum is over the singleton sets hl , xl−1 and h̄l , x̄l−1 .
>

>

We will show below (Theorem 7.2) that dy n dȳ and zmz̄ both converge almost surely to some
¯ and C z,z̄ (ξ, ξ)
¯ if the factored weights and biases ω, b are drawn from
deterministic limits Dy,ȳ (ξ, ξ)
standard Gaussians (i.e. in the NTK parametrization), as widths tend to infinity. Similarly, we will
also show the convergence of ∇b f (ξ)> ∇b f ( ¯
ξ) for any bias b of f and compute its limiting value
Db (ξ, ¯
ξ). Then the limiting NTK is given by
X
X
X
¯ =
¯ z,z̄ (ξ, ξ)
¯ +
¯
Θ̊(ξ, ξ)
Dy,ȳ (ξ, ξ)C
Db (ξ, ξ).
(12)
weight W y,z:y=W z
ȳ,z̄:ȳ=W z̄

bias b

Intuitive Rules for Computing Intermediate Kernels C and D

6.2

Here we present intuitive rules for computing C and D, which would yield the NTK by Eq. (12). Their
justifications will follow in the next section. Consider the first forward and backward propagations of
a neural network. Assume for simplicity that the hidden layers all have the same width, denoted n,
which tends to infinity. Then under Condition 16 , the following is the key intuition for computing the
kernels C and D for arbitrary architecture.
Box 1

Key Intuitions for Understanding a Wide Neural Network

When the width n  1, every (pre-)activation vector x ∈ Rn has roughly iid coordinates
distributed as some random variable denoted Z x . The set of random variables {Z x }x over
x ∈ Rn in this computation is possibly correlated, as {xα }x is possibly correlated for each
α ∈ [n], but is roughly iid across α. Thus, for any vectors x, y ∈ Rn , as n → ∞,
x> y/n → E Z x Z y ,
which is the form of the limit (kernels C and D) we want. We can use the following rules to
compute Z x recursively.
1. (Nonlin) For any fixed (i.e. constant as n → ∞) k and φ : Rk → R, we havea
1

k

1

k

Z φ(x ,...,x ) = φ(Z x , . . . , Z x ).
2. (MatMul) For any set of Rn vectors X and a matrix W ∈ Rn×n with Wαβ ∼
2
N (0, σW
/n), the set of random variables {Z W x : x ∈ X } is jointly Gaussian with
zero mean and covariance
2
Cov(Z W x , Z W x̄ ) = σW
E Z x Z x̄ ,

for any x, x̄ ∈ X .

If Y is any set of Rn vectors and W̄ 6= W , then {Z W x : x ∈ X } is independent
from {Z W̄ y : y ∈ Y}.
a

here φ is applied coordinatewise to x1 , . . . , xk , i.e. φ(x1 , . . . , xk )α = φ(x1α , . . . , xkα )

Remark 6.1. Rule 2 applies even if W is correlated with vectors in X , for example if x = W x̄ or
x = W > x̄ for some x, x̄ ∈ X .
6

or when the associated N ETSOR> program is BP-like (Definition A.3)

7

n
o
>
Remark 6.2. In Rule 2, if we set W̄ = W > , then the rule implies Z W y : y ∈ Y is independent

from Z W x : x ∈ X . This is how we use GIA implied by Condition 1.
Remark 6.3. To reason about the computation of a wide neural network on the input ξ of fixed
dimension, we apply the above rules to the first layer embedding W ξ into Rn , but not ξ itself.
These rules largely generalize our intuitive treatment of the MLP example above: The “iid coordinates”
intuition suggests the limits in Eqs. (5) and (7). The recursive relations in Eqs. (6) and (8) of C and
D are then given by Rule 1 and 2. Now let us examine the power of these rules by looking at more
advanced weight sharing inside an RNN.
6.2.1

Example: RNN

Consider the RNN with state st at time t evolving according to
st (ξ) = φ(g t (ξ) + ut (ξ) + b), g t (ξ) = W st−1 (ξ), ut (ξ) = U ξ t
(13)
 1
with input sequence ξ = ξ , . . . , ξ t , . . . , ξ T ∈ Rd , nonlinearity φ, weights W ∈ Rn×n , U ∈
√
Rn×d , and bias b ∈ Rn . The RNN outputs v > sT (ξ)/ n ∈ R for some output weights v ∈ Rn and
the last state sT (ξ). We shall sample Wαβ ∼ N (0, 1/n), Uαβ ∼ N (0, 1/d), bα ∼ N (0, 1), vα ∼
N (0, 1). Then Condition 1 becomes true automatically, and we may use the rules in Box 1.
As in Eq. (11), we shall consider a second input sequence ξ¯ = {ξ¯1 , . . . , ξ¯t , . . . ∈ Rd }, possibly with
ξ¯ = ξ. There are two weight matrices in this network, W and U . For W , the double sum in Eq. (11)
t>
r
t> r
is over {g t , st−1 }t and {ḡ t , s̄t−1 }t . Thus we seek to calculate the limits of sns̄ and dg ndḡ for all
t and r. Similarly, for U , the double sum in Eq. (11) is over {ut , ξ t }t and ūt , ξ¯t t . Thus we also
t>

t> r

r

seek to calculate the limits of du ndū , whereas we are already given ξ dξ̄ , which is constant in n
for each t and r.
Forward As width n → ∞ (but input dimension d fixed), Box 1 says we can think of g t , ut , st , b
t
t
t
as having iid coordinates distributed resp. as some random variables Z g , Z u , Z s , Z b . Of course,
t
t
t
r
Z b = N (0, 1) and {Z u , Z ū }t is jointly Gaussian with mean zero and covariance Cov(Z u , Z ū ) =
t
t
ξ t> ξ¯r /d. By Rule 2, {Z g , Z ḡ }t is also jointly Gaussian with mean zero, and it has covariance
t
r
t−1
r−1
Cov(Z g , Z ḡ ) = E Z s Z s̄ . Stringing them together gives us the following recursion
t

r

t

t

r

r

E Z s Z s̄ = E φ(Z g + Z u + Z b )φ(Z ḡ + Z ū + Z b ) = E φ(ζ1 )φ(ζ2 ),

 


2
st−1
st−1 s̄r−1
t> r
Z
Z
Z


 ξ ξ

 r−1 2  +
where (ζ1 , ζ2 ) ∼ N 0, E 
+ 1 .
d
s̄r−1 st−1
s̄
Z
Z
Z
This recursion yields the desired limit
t> r
t r
¯ = lim s s̄ = E Z st Z s̄r .
C s ,s̄ (ξ, ξ)
n→∞
n

(14)

Backward The backward equation is given by
dst−1 = W > dg t ,

dg t = dut = φ0 g t + ut + b

dst .



(15)

By Box 1, we should think of dst as having iid coordinates distributed like some random variable
t
Z ds which satisfy
t

r

t+1

E Z ds Z ds̄ = E Z du

= E φ0 (Z g

Z du

t+1

t+1

+ Z b )Z ds

r+1

E φ0 (Z g

t+1

r+1

E φ0 (ζ1 )φ0 (ζ2 ),

Z ds̄

t+1

Z ds̄

= E Z ds

t+1

+ Zu

t+1

= E Z ds

r+1

8

φ0 (Z ḡ

t+1

+ Zu

r+1

+ Z ū

r+1

+ Z b )Z ds̄

r+1

+ Z ū

+ Z b )φ0 (Z ḡ

r+1

r+1

+ Z b)


where (ζ1 , ζ2 ) ∼ N 0, E

 
2
st
Z

r

t

Z s̄ Z s



t
r
Z s Z s̄  ξt> ξr
+ d + 1. This recursion yields the der 2
Z s̄

sired limit
t
r
dst> ds̄r
= E Z ds Z ds̄
n→∞
n
t+1>
t+1
r+1
t+1
r+1
dūr+1
¯ = lim du
= Du ,ū (ξ, ξ)
= E Z du Z du .
n→∞
n
t

r

Ds ,s̄ (ξ, ¯
ξ) = lim

Combined with Eqs. (12) and (14), we can compute the infinite-width NTK. See Appendix E.2 also
for generalization to RNN with average pooling.
Other standard architectures follow a similar scheme; see Appendices D and E.
6.3

GIA Makes or Breaks the Intuitive Rules of Box 1

Without Condition 1, rules of Box 1 may not work When the last layer outputs the average of
the final embedding, Condition 1 doesn’t hold anymore. Let us see how this means we can’t treat
W > as independent from W . Suppose we have a 2-hidden-layer network
x1 = W 1 ξ + 1,

h2 = W 2 x1 ,

x2 = φ(h2 ),

y = 1> x2 /n

with φ(z) = z 2 being the square function, ξ = 0 ∈ Rd , y ∈ R, x1 , h2 , x2 ∈ Rn , W 1 ∈ Rn×d , W 2 ∈
∂y
1
2
Rn×n , Wαβ
∼ N (0, 1/d), Wαβ
∼ N (0, 1/n). If we set dx2 = n ∂x
2 , then backprop yields
dx2 = 1,

dh2 = 2h2

1 = 2h2 ,

dx1 = W 2> dh2 = 2W 2> h2 = 2W 2> W 2 x1
2

By Rule 2, h2 should have coordinates distributed like Z h = N (0, 1) and likewise dh2 has
2
2
coordinates distributed like Z dh = 2Z h = N (0, 4).
If we assumed that W 2> is independent from W 2 , then this would imply dx1 also has coordinates
distributed like N (0, 4). But a simple calculation shows its mean cannot be 0 in reality:
X
X
XX
2
2 1
2 2 1
2
2 1
E dx1α = 2 E
Wβα
Wβγ
xγ = 2
E(Wβα
) xα + 2
E Wβα
Wβγ
xγ = 2 E x1α = 2
β,γ

β

β γ6=α

2
2
where the second sum vanishes because the terms Wβα
, Wβγ
, x1γ in the product are independent,
P
2 2
while in the first sum we have β E(Wβα
) = 1.

√
Intuition for why Condition 1 implies GIA On the other hand, if the last layer is y = v > x2 / n
√ ∂y
for vα ∼ N (0, 1) so that Condition 1 holds, then a similar calculation with dx2 = n ∂x
2 yields
X
XX
2 2 1
2
2 1
E dx1α = 2
E vβ (Wβα
) xα + 2
E vβ Wβα
Wβγ
xγ = 0
(16)
β

β γ6=α

which now vanishes because vβ appears unpaired in the expectation of the first sum and it is
independent from everything else. This illustrates an intuition for why Condition 1 implies GIA: the
last layer weights zero out all potential pathways through which W and W > can correlate.
We have demonstrated our intuitive rules for calculating the kernels that combine to form the NTK.
Now let us rigorously justify these rules.

7

N ETSOR>

To justify our intuitive calculations, we need to pin down the range of architectures they are valid for,
and also the precise regularity conditions for the corresponding limits to hold. Here 1) we introduce
the N ETSOR> language such that an architecture is covered if its forward and backward propagations
are expressible in N ETSOR>, and 2) we prove a Master Theorem for N ETSOR> programs that allows
us to justify the intuitions of Box 1 rigorously.
9

Definition 7.1 (Simplified N ETSOR>). For simplicity’s sake7 , in this section, a N ETSOR> program
is just a sequence of Rn vectors inductively generated via one of the following ways from an initial
set V of random Rn vectors and a set W of random n × n matrices
Nonlin Given φ : Rk → R and x1 , . . . , xk ∈ Rn , we can generate φ(x1 , . . . , xk ) ∈ Rn
MatMul Given W ∈ Rn×n and x ∈ Rn , we can generate W x ∈ Rn or W > x ∈ Rn
Note that φ in Nonlin is applied coordinatewise. Here, n should be thought of as the width, W the
weight matrices, and V the biases and the first layer embeddings of inputs. Note that φ in Nonlin can
also be linear, e.g. x, y 7→ x + y in a skip connection. For example, the RNN equations (Eqs. (13)
and (15)) form a natural N ETSOR> program: the initial vectors are V = {ut (ξ) = U ξ t }Tt=1 ∪ {v =
dsT , b} and the initial matrix is W = {W }, and new vectors {g t , st , dst , dg t }t are formed inductively
according to
dst−1 = W > dg t

g t (ξ) = W st−1 (ξ)
t

t

t

0

t

s (ξ) = φ(g (ξ) + u (ξ) + b)

t

MatMul
t

dg = φ g + u + b

t



ds .

Nonlin

Like N ETSOR in Yang [62] for forward propagation, N ETSOR> can express all standard architectures.
For example, in a program expressing convolution neural network with width n, the activation vector
for each pixel across all channels is represented by an Rn vector. See Appendix D for more details
and other examples of modern deep learning layers. We state the Master Theorem below assuming
a generalization of Condition 1 to a condition called BP-like (short for “backpropagation-like”)
for N ETSOR> programs; see Definition A.3. On the first read-through, we recommend the reader
to mentally replace BP-like with Condition 1 which covers most of the cases we are interested in
practice withP
regard to NTK calculations. In previous sections, we cared about limits of the form
n
x> y/n = n1 α=1 ψ(xα , yα ) where ψ is the product function. The Master Theorem tells us how to
compute this for almost any function ψ.
Theorem 7.2 (BP-like N ETSOR> Master Theorem). Consider a N ETSOR> program. Suppose:
2
2
1) for each initial W ∈ W, Wαβ ∼ N (0, σW
/n) for an associated variance σW
; 2) there is a
V
g
|V|
multivariate Gaussian Z = {Z : g ∈ V} ∈ R such that the initial set of vectors V are sampled
like {gα : g ∈ V} ∼ Z V iid for each α ∈ [n]. If the program is BP-like and all φ used in Nonlin are
polynomially bounded8 , then
n

1
k
1X
a.s.
ψ(h1α , . . . , hkα ) −−→ E ψ(Z h , . . . , Z h ),
n α=1

as

n → ∞,

(17)

for any collection of vectors h1 , . . . , hk in the program and any polynomially bounded ψ : Rk → R,
i
where Z h are defined in Box 1.9
This rigorously justifies the intuitions in the previous section (after checking the regularity conditions).

Back to theMLP example
Eq. (2) Assuming n1 = · · · = nL , we’d have W = W 2 , . . . , W L

√
and V = bl l ∪ W 1 ξ, W 1 ξ¯ ∪ {dxL = nW L+1 }. The weight matrices are by default
n
o
1
1
sampled like in Theorem 7.2, and V is distributed as in Theorem 7.2 with Z W ξ , Z W ξ̄ ∼



2
l
L
kξk2 ξ > ξ¯
σw
N 0, dim(ξ)
and with Z b , Z dx ∼ N (0, σb2 ) independently. The forward and
ξ¯> ξ k ¯
ξk2
backpropagation of the MLP (Eq. (2)) form a natural N ETSOR> program, once we unwind it a little:
We set g 1 (ξ) = W 1 ξ via Nonlin (with identity as the nonlinearity), and
g l (ξ) = W l xl−1 (ξ)
l

l

dxl−1 (ξ) = W l> dg l (ξ)
l

x (ξ) = φ(g (ξ) + b )

0

l

l

MatMul
l

dg (ξ) = φ (g (ξ) + b )

l

dx (ξ)

Nonlin

7
See Appendix A for the formal description of the general notion of N ETSOR>; for variable dimension
generalization, see Appendix C.
8
We say a function φ : Rk → R is polynomially-bounded if |φ(x)| ≤ Ckxkp + c for some p, C, c > 0, for
all x ∈ Rk .
9
Difference with [63, Thm 5.1]: We have gotten rid of the “rank convergence” assumption by showing that it
comes for free. See CoreSet and Lemma G.6 in Appendix G.

10

¯ This program is BP-like because the MLP satisfies Condition 1.
and similarly for computations on ξ.
For typical activation function φ like ReLU, φ and its derivative are both polynomially bounded.
Therefore Theorem 7.2 applies: for example, with ψ(x, y) = xy applied to the vectors dhl , dh̄l ,
Eq. (17) recovers Eq. (7) rigorously.
Summary

So a formal proof of the NTK convergence proceeds as follows:

1. Express the network in N ETSOR>
2. Check the network satisfies Condition 1 or more generally the program is BP-like
3. Check that the φs of the program (which correspond to both the activation functions in the
original network and their derivatives) are all polynomially bounded
This is sufficient to show that the NTK converges almost surely as width goes to infinity. To further
compute this limit, follow Eq. (12) and Box 1 as in the RNN example in Section 6.2.1. As a summary:
Corollary 7.3. Let f be a (possibly recurrent) neural network of standard architecture with scalar
output and satisfying Condition 1. If its nonlinearities have polynomially bounded weak derivatives,
then its NTK Θ converges almost surely, over any finite set of inputs, to a deterministic kernel Θ̊
a.s.

Θ −−→ Θ̊
as its widths go to infinity and each of its factored weights ω and biases b are randomly initialized as
ωαβ ∼ N (0, σω2 ), bα ∼ N (0, σb2 ) for some σω , σb ≥ 0.
See more examples of NTK computations and proofs of convergence (Appendix E) in the appendix.
Remark 7.4 (Importance of BP-like Condition). Recall the counterexample for GIA in Section 6.3,
which can be expressed in a valid but not BP-like N ETSOR> program. Therefore Theorem 7.2 is not
true when the BP-like condition does not hold. We will extend Theorem 7.2 to cover the non-BP-like
cases in a future paper, which requires much more machinery.
Generalizations All results in this section can be generalized to the case where the dimensions in
the N ETSOR program are not all equal (such as when an NN has varying widths across layers); see
Appendix C. It is easy to show Corollary 7.3 also holds when the output is multidimensional (possibly
variable-dimensional, like in a language model). Architectural blocks like layernorm or attention
requires extending N ETSOR> to a more powerful language N ETSOR>+ (like how N ETSOR+ extends
N ETSOR in Yang [62]), which is discussed in Appendix B.
The N ETSOR> Master Theorem has implications outside of NTK as well. For example, most of the
semirigorous computations made in the signal propagation literature [55, 58, 61, 67, 68] can now be
justified rigorously. See Yang [63] for more discussions.
Guide to the Appendix
Appendix A Treats N ETSOR> from a formal perspective (similar to the style of Yang [62]).
Appendix B Introduces N ETSOR>+ and proves its Master Theorem.
Appendix C Extends N ETSOR and N ETSOR>+ to allow matrices, vectors of variable dimensions.
Appendix D Examples writing forward and backprop of standard architectures in N ETSOR>.
Appendix E Examples calculating the limiting NTKs for RNN, CNN, transformer, and batchnorm.
Appendix F Theoretical tools for our main proof.
Appendix G Proof of our main theorem Theorem 7.2

8

Conclusion

We showed that for any randomly initialized feedforward or recurrent neural network of standard
architecture, its NTK converges almost surely to a deterministic kernel. We did so by introducing
N ETSOR>, a language capable of expressing both forward and backward propagation of NNs, along
with a tool (Theorem 7.2) for understanding the behavior of such computations. We hope our work
lays the foundation for understanding modern overparametrized neural networks.
11

Acknowledgements
We thank Edward Hu, Judy Shen, Zhiyuan Li, Ilya Razenshteyn, Jason Lee, Huishuai Zhang,
Simon Du, Suriya Gunasekar, Etai Littwin, Roman Novak, Jaehoon Lee, Sam Schoenholz, Jascha
Sohl-Dickstein, Tomer Galanti, Janardhan Kulkarni, Zeyuan Allen-Zhu, and Jeffrey Pennington for
feedback and discussions.

References
[1] Joshua Achiam, Ethan Knight, and Pieter Abbeel. Towards Characterizing Divergence in
Deep Q-Learning. arXiv:1903.08894 [cs], March 2019. URL http://arxiv.org/abs/1903.
08894.
[2] Sina Alemohammad, Zichao Wang, Randall Balestriero, and Richard Baraniuk. The recurrent
neural tangent kernel, 2020.
[3] Zeyuan Allen-Zhu, Yuanzhi Li, and Yingyu Liang. Learning and Generalization in Overparameterized Neural Networks, Going Beyond Two Layers. arXiv:1811.04918 [cs, math, stat],
November 2018. URL http://arxiv.org/abs/1811.04918.
[4] Zeyuan Allen-Zhu, Yuanzhi Li, and Zhao Song. A Convergence Theory for Deep Learning
via Over-Parameterization. arXiv:1811.03962 [cs, math, stat], November 2018. URL http:
//arxiv.org/abs/1811.03962.
[5] Zeyuan Allen-Zhu, Yuanzhi Li, and Zhao Song. On the Convergence Rate of Training Recurrent
Neural Networks. arXiv:1810.12065 [cs, math, stat], October 2018. URL http://arxiv.
org/abs/1810.12065.
[6] Sanjeev Arora, Simon S. Du, Wei Hu, Zhiyuan Li, Ruslan Salakhutdinov, and Ruosong Wang.
On Exact Computation with an Infinitely Wide Neural Net. arXiv:1904.11955 [cs, stat], April
2019. URL http://arxiv.org/abs/1904.11955.
[7] Sanjeev Arora, Simon S. Du, Zhiyuan Li, Ruslan Salakhutdinov, Ruosong Wang, and Dingli Yu.
Harnessing the power of infinitely wide deep nets on small-data tasks, 2019.
[8] Jimmy Lei Ba, Jamie Ryan Kiros, and Geoffrey E. Hinton. Layer Normalization.
arXiv:1607.06450 [cs, stat], July 2016. URL http://arxiv.org/abs/1607.06450.
[9] Dzmitry Bahdanau, Kyunghyun Cho, and Yoshua Bengio. Neural Machine Translation by
Jointly Learning to Align and Translate. arXiv:1409.0473 [cs, stat], September 2014. URL
http://arxiv.org/abs/1409.0473.
[10] Ronen Basri, David Jacobs, Yoni Kasten, and Shira Kritchman. The Convergence Rate of
Neural Networks for Learned Functions of Different Frequencies. arXiv:1906.00425 [cs, eess,
stat], June 2019.
[11] Joan Bruna, Wojciech Zaremba, Arthur Szlam, and Yann LeCun. Spectral Networks and
Locally Connected Networks on Graphs. arXiv:1312.6203 [cs], December 2013. URL http:
//arxiv.org/abs/1312.6203.
[12] Qi Cai, Zhuoran Yang, Jason D. Lee, and Zhaoran Wang. Neural temporal-difference and
q-learning provably converge to global optima, 2019.
[13] Minmin Chen, Jeffrey Pennington, and Samuel Schoenholz. Dynamical Isometry and a Mean
Field Theory of RNNs: Gating Enables Signal Propagation in Recurrent Neural Networks.
In Proceedings of the 35th International Conference on Machine Learning, volume 80 of
Proceedings of Machine Learning Research, pages 873–882, Stockholmsmässan, Stockholm
Sweden, July 2018. PMLR. URL http://proceedings.mlr.press/v80/chen18i.html.
[14] Kyunghyun Cho, Bart van Merrienboer, Caglar Gulcehre, Dzmitry Bahdanau, Fethi Bougares,
Holger Schwenk, and Yoshua Bengio. Learning Phrase Representations using RNN EncoderDecoder for Statistical Machine Translation. arXiv:1406.1078 [cs, stat], June 2014. URL
http://arxiv.org/abs/1406.1078.
[15] Youngmin Cho and Lawrence K. Saul. Kernel methods for deep learning. In Advances in
neural information processing systems, pages 342–350, 2009. URL http://papers.nips.
cc/paper/3628-kernel-methods-for-deep-learning.
12

[16] Amit Daniely, Roy Frostig, and Yoram Singer. Toward Deeper Understanding of Neural Networks: The Power of Initialization and a Dual View on Expressivity. In D. D.
Lee, M. Sugiyama, U. V. Luxburg, I. Guyon, and R. Garnett, editors, Advances in
Neural Information Processing Systems 29, pages 2253–2261. Curran Associates, Inc.,
2016. URL http://papers.nips.cc/paper/6427-toward-deeper-understandingof-neural-networks-the-power-of-initialization-and-a-dual-view-onexpressivity.pdf.
[17] Michaël Defferrard, Xavier Bresson, and Pierre Vandergheynst. Convolutional Neural Networks
on Graphs with Fast Localized Spectral Filtering. arXiv:1606.09375 [cs, stat], June 2016.
[18] Simon S. Du, Xiyu Zhai, Barnabas Poczos, and Aarti Singh. Gradient Descent Provably
Optimizes Over-parameterized Neural Networks. arXiv:1810.02054 [cs, math, stat], October
2018. URL http://arxiv.org/abs/1810.02054.
[19] Simon S. Du, Kangcheng Hou, Barnabás Póczos, Ruslan Salakhutdinov, Ruosong Wang, and
Keyulu Xu. Graph neural tangent kernel: Fusing graph neural networks with graph kernels,
2019.
[20] David K Duvenaud, Dougal Maclaurin, Jorge Iparraguirre, Rafael Bombarell, Timothy Hirzel,
Alan Aspuru-Guzik, and Ryan P Adams. Convolutional Networks on Graphs for Learning
Molecular Fingerprints. In C. Cortes, N. D. Lawrence, D. D. Lee, M. Sugiyama, and R. Garnett,
editors, Advances in Neural Information Processing Systems 28, pages 2224–2232. Curran
Associates, Inc., 2015.
[21] Ethan Dyer and Guy Gur-Ari. Asymptotics of wide networks from feynman diagrams, 2019.
[22] Kunihiko Fukushima. Cognitron: A self-organizing multilayered neural network. Biological
cybernetics, 20(3-4):121–136, 1975.
[23] Kunihiko Fukushima and Sei Miyake. Neocognitron: A self-organizing neural network model
for a mechanism of visual pattern recognition. In Competition and cooperation in neural nets,
pages 267–285. Springer, 1982.
[24] Behrooz Ghorbani, Song Mei, Theodor Misiakiewicz, and Andrea Montanari. Linearized
two-layers neural networks in high dimension. arXiv:1904.12191 [cs, math, stat], April 2019.
[25] Ian J. Goodfellow, Jean Pouget-Abadie, Mehdi Mirza, Bing Xu, David Warde-Farley, Sherjil
Ozair, Aaron Courville, and Yoshua Bengio. Generative Adversarial Networks. arXiv:1406.2661
[cs, stat], June 2014. URL http://arxiv.org/abs/1406.2661.
[26] Boris Hanin. Which Neural Net Architectures Give Rise To Exploding and Vanishing Gradients?
January 2018. URL https://arxiv.org/abs/1801.03744.
[27] Boris Hanin and Mihai Nica. Finite depth and width corrections to the neural tangent kernel,
2019.
[28] Boris Hanin and David Rolnick. How to Start Training: The Effect of Initialization and
Architecture. arXiv:1803.01719 [cs, stat], March 2018. URL http://arxiv.org/abs/1803.
01719.
[29] Soufiane Hayou, Arnaud Doucet, and Judith Rousseau. On the Selection of Initialization and
Activation Function for Deep Neural Networks. arXiv:1805.08266 [cs, stat], May 2018. URL
http://arxiv.org/abs/1805.08266.
[30] Tamir Hazan and Tommi Jaakkola. Steps Toward Deep Kernel Methods from Infinite Neural Networks. arXiv:1508.05133 [cs], August 2015. URL http://arxiv.org/abs/1508.05133.
[31] Kaiming He, Xiangyu Zhang, Shaoqing Ren, and Jian Sun. Deep Residual Learning for Image Recognition.
pages 770–778, 2016.
URL https://www.cvfoundation.org/openaccess/content_cvpr_2016/html/He_Deep_Residual_
Learning_CVPR_2016_paper.html.
[32] Mikael Henaff, Joan Bruna, and Yann LeCun. Deep Convolutional Networks on GraphStructured Data. arXiv:1506.05163 [cs], June 2015.
13

[33] Sepp Hochreiter and Jürgen Schmidhuber. Long Short-Term Memory. Neural Comput., 9
(8):1735–1780, November 1997. ISSN 0899-7667. doi: 10.1162/neco.1997.9.8.1735. URL
http://dx.doi.org/10.1162/neco.1997.9.8.1735.
[34] Jiri Hron, Yasaman Bahri, Jascha Sohl-Dickstein, and Roman Novak. Infinite attention: Nngp
and ntk for deep attention networks, 2020.
[35] Gao Huang, Zhuang Liu, Laurens van der Maaten, and Kilian Q. Weinberger. Densely Connected
Convolutional Networks. arXiv:1608.06993 [cs], August 2016. URL http://arxiv.org/
abs/1608.06993.
[36] Jiaoyang Huang and Horng-Tzer Yau. Dynamics of deep neural networks and neural tangent
hierarchy, 2019.
[37] Wei Huang, Weitao Du, and Richard Yi Da Xu. On the neural tangent kernel of deep networks
with orthogonal initialization, 2020.
[38] Sergey Ioffe and Christian Szegedy. Batch Normalization: Accelerating Deep Network Training
by Reducing Internal Covariate Shift. In PMLR, pages 448–456, June 2015. URL http:
//proceedings.mlr.press/v37/ioffe15.html.
[39] Arthur Jacot, Franck Gabriel, and Clément Hongler. Neural Tangent Kernel: Convergence
and Generalization in Neural Networks. arXiv:1806.07572 [cs, math, stat], June 2018. URL
http://arxiv.org/abs/1806.07572.
[40] Thomas N. Kipf and Max Welling. Semi-Supervised Classification with Graph Convolutional
Networks. arXiv:1609.02907 [cs, stat], September 2016.
[41] Nicolas Le Roux and Yoshua Bengio. Continuous neural networks. In Artificial Intelligence
and Statistics, pages 404–411, 2007.
[42] Yann LeCun, Léon Bottou, Yoshua Bengio, and Patrick Haffner. Gradient-based learning
applied to document recognition. Proceedings of the IEEE, 86(11):2278–2324, 1998.
[43] Yann LeCun, Patrick Haffner, Léon Bottou, and Yoshua Bengio. Object recognition with
gradient-based learning. In Shape, contour and grouping in computer vision, pages 319–345.
Springer, 1999.
[44] Jaehoon Lee, Yasaman Bahri, Roman Novak, Sam Schoenholz, Jeffrey Pennington, and Jascha
Sohl-dickstein. Deep Neural Networks as Gaussian Processes. In International Conference on
Learning Representations, 2018. URL https://openreview.net/forum?id=B1EA-M-0Z.
[45] Jaehoon Lee, Lechao Xiao, Samuel S. Schoenholz, Yasaman Bahri, Jascha Sohl-Dickstein, and
Jeffrey Pennington. Wide Neural Networks of Any Depth Evolve as Linear Models Under
Gradient Descent. arXiv:1902.06720 [cs, stat], February 2019. URL http://arxiv.org/
abs/1902.06720.
[46] Yujia Li, Daniel Tarlow, Marc Brockschmidt, and Richard Zemel. Gated Graph Sequence
Neural Networks. arXiv:1511.05493 [cs, stat], November 2015.
[47] Etai Littwin and Lior Wolf. Residual tangent kernels, 2020.
[48] Etai Littwin, Tomer Galanti, and Lior Wolf. On the optimization dynamics of wide hypernetworks, 2020.
[49] Etai Littwin, Ben Myara, Sima Sabah, Joshua Susskind, Shuangfei Zhai, and Oren Golan.
Collegial ensembles, 2020.
[50] Alexander G. de G. Matthews, Mark Rowland, Jiri Hron, Richard E. Turner, and Zoubin
Ghahramani. Gaussian Process Behaviour in Wide Deep Neural Networks. arXiv:1804.11271
[cs, stat], April 2018. URL http://arxiv.org/abs/1804.11271.
[51] Radford M Neal. BAYESIAN LEARNING FOR NEURAL NETWORKS. PhD Thesis, University
of Toronto, 1995.
[52] Roman Novak, Lechao Xiao, Jaehoon Lee, Yasaman Bahri, Daniel A Abolafia, Jeffrey Pennington, and Jascha Sohl-Dickstein. Bayesian Deep Convolutional Networks with Many Channels
are Gaussian Processes. arXiv preprint arXiv:1810.05148, 2018.
14

[53] Jeffrey Pennington, Samuel Schoenholz, and Surya Ganguli. Resurrecting the sigmoid in deep
learning through dynamical isometry: theory and practice. In I. Guyon, U. V. Luxburg,
S. Bengio, H. Wallach, R. Fergus, S. Vishwanathan, and R. Garnett, editors, Advances
in Neural Information Processing Systems 30, pages 4788–4798. Curran Associates, Inc.,
2017. URL http://papers.nips.cc/paper/7064-resurrecting-the-sigmoid-indeep-learning-through-dynamical-isometry-theory-and-practice.pdf.
[54] George Philipp and Jaime G. Carbonell. The Nonlinearity Coefficient - Predicting Overfitting
in Deep Neural Networks. arXiv:1806.00179 [cs, stat], May 2018. URL http://arxiv.org/
abs/1806.00179.
[55] Ben Poole, Subhaneil Lahiri, Maithreyi Raghu, Jascha Sohl-Dickstein, and Surya Ganguli.
Exponential expressivity in deep neural networks through transient chaos. In Advances In
Neural Information Processing Systems, pages 3360–3368, 2016.
[56] Shaoqing Ren, Kaiming He, Ross Girshick, and Jian Sun.
Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks.
In C. Cortes,
N. D. Lawrence, D. D. Lee, M. Sugiyama, and R. Garnett, editors, Advances in
Neural Information Processing Systems 28, pages 91–99. Curran Associates, Inc.,
2015.
URL http://papers.nips.cc/paper/5638-faster-r-cnn-towards-realtime-object-detection-with-region-proposal-networks.pdf.
[57] David E Rumelhart, Geoffrey E Hinton, and Ronald J Williams. Learning internal representations by error propagation. Technical report, California Univ San Diego La Jolla Inst for
Cognitive Science, 1985.
[58] Samuel S. Schoenholz, Justin Gilmer, Surya Ganguli, and Jascha Sohl-Dickstein. Deep Information Propagation. 2017. URL https://openreview.net/pdf?id=H1W1UN9gg.
[59] Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N Gomez,
\Lukasz Kaiser, and Illia Polosukhin. Attention is All You Need. In Advances in Neural
Information Processing Systems, pages 5998–6008, 2017.
[60] Christopher K I Williams. Computing with Infinite Networks. In Advances in neural information
processing systems, page 7, 1997.
[61] Lechao Xiao, Yasaman Bahri, Jascha Sohl-Dickstein, Samuel Schoenholz, and Jeffrey Pennington. Dynamical Isometry and a Mean Field Theory of CNNs: How to Train 10,000Layer Vanilla Convolutional Neural Networks. In Proceedings of the 35th International
Conference on Machine Learning, volume 80 of Proceedings of Machine Learning Research, pages 5393–5402, Stockholmsmässan, Stockholm Sweden, July 2018. PMLR. URL
http://proceedings.mlr.press/v80/xiao18a.html.
[62] Greg Yang. Tensor programs i: Wide feedforward or recurrent neural networks of any architecture are gaussian processes. In Advances in Neural Information Processing Systems, pages
9947–9960, 2019.
[63] Greg Yang. Scaling Limits of Wide Neural Networks with Weight Sharing: Gaussian Process
Behavior, Gradient Independence, and Neural Tangent Kernel Derivation. arXiv:1902.04760
[cond-mat, physics:math-ph, stat], February 2019.
[64] Greg Yang. Tensor programs iii: Neural matrix laws. 2020.
[65] Greg Yang and Hadi Salman. A fine-grained spectral perspective on neural networks, 2019.
[66] Greg Yang and Sam S. Schoenholz. Deep mean field theory: Layerwise variance and width
variation as methods to control gradient explosion, 2018. URL https://openreview.net/
forum?id=rJGY8GbR-.
[67] Greg Yang and Samuel S. Schoenholz. Mean Field Residual Network: On the Edge of Chaos.
In Advances in neural information processing systems, 2017.
[68] Greg Yang, Jeffrey Pennington, Vinay Rao, Jascha Sohl-Dickstein, and Samuel S. Schoenholz.
A Mean Field Theory of Batch Normalization. arXiv:1902.08129 [cond-mat], February 2019.
URL http://arxiv.org/abs/1902.08129.
[69] Difan Zou, Yuan Cao, Dongruo Zhou, and Quanquan Gu. Stochastic Gradient Descent Optimizes
Over-parameterized Deep ReLU Networks. arXiv:1811.08888 [cs, math, stat], November 2018.
URL http://arxiv.org/abs/1811.08888.
15

N ETSOR>: The Formal Version

A

While we recommend using N ETSOR> defined in Definition 7.1 in practice, we give a formal treatment of the N ETSOR> language here and formulate its corresponding Master Theorem
(Theorem A.6), which is equivalent to Theorem 7.2 and which we will prove instead. The type
system of this formal N ETSOR> allows us to express the proof of Theorem A.6 more easily.
The formal syntax of N ETSOR> extends N ETSOR [62] by a new transpose (Trsp) instruction.
Compared to Definition 7.1, we allow matrices and vectors to have varying dimension, and explicitly
single out the vectors produced by MatMul via an elementary type system.
Definition A.1. N ETSOR> programs are straightline programs, where each variable follows one
of three types, G, H, or A (such variables are called G-vars, H-vars, and A-vars), and after input
variables, new variables can be introduced by one of the rules MatMul or Nonlin to be discussed
shortly. Variables of G and H types are vectors, while variables of A type are matrices. Each type is
annotated by dimensionality information 10 :
• If x is a (vector) variable of type G (or H) and has dimension n, we write x : G(n) (or
x : H(n)).
• If A is a (matrix) variable of type A and has size n1 × n2 , we write A : A(n1 , n2 ).
G is a subtype of H, which means that x : G(n) implies x : H(n). A N ETSOR> program consists of
the following two parts.
Input A set of input G- or A-vars (corresponding to the initial set of matrices and vectors in
Definition 7.1).
Body New variables can be introduced and assigned via the following rules
Trsp if A : A(n1 , n2 ) is an A-var, then we can form its transpose as an A-var:
A> : A(n2 , n1 )
Naturally we identify (A> )> with A.
MatMul if A : A(n1 , n2 ) and x : H(n2 ), then we can form a G-var via matrix-vector
product:
Ax : G(n1 )
Nonlin If x1 , . . . , xk : G(n) are G-vars with the same dimension n and φ : Rk → R, then
we can form an H-var by coordinatewise application of φ
φ(x1 , . . . , xk ) : H(n)
Output For the purpose of this paper11 , the output of a N ETSOR> program is any function of scalars
of the form
n
1X
ψ(h1α , . . . , hkα )
n α=1
for some function ψ and collection of H-vars h1 , . . . , hk .
Remark A.2. In comparison with N ETSOR introduced in [62], the language N ETSOR> defined
here has additionally the transpose (Trsp) instruction and drops the LinComb instruction12 , and
additionally has no output. While the lack of LinComb and output is just taking away some syntactic
sugar, the Trsp instruction significantly expands the expressivity of the language. Importantly, it
allows us to express backpropagation.
formally, we are dealing with dependent types G and H indexed by N and A indexed by N2
In general, the output of a tensor program need not be defined, as most of the time we are concerned with
how the H-vars produced over the course of the program interact with each other.
12
N ETSOR> is exactly the N ETSOR− language, introduced in the appendix of Yang [62], augmented with
Trsp.
10

11

16

N ETSOR> Program 1 MLP Forward and Backward Computation on Network Input x
Input: W 1 x : G(n1 )
. layer 1 embedding of input
Input: b1 : G(n1 )
. layer 1 bias
Input: W 2 : A(n2 , n1 )
. layer 2 weights
Input: b2 : G(n2 )
. layer 2 bias
Input: v : G(n2 )
. readout layer weights
1: x1 := φ(W 1 x + b1 ) : H(n1 )
. layer 1 activation; Nonlin with (u, v) 7→ φ(u + v)
2: h̃2 := W 2 x1 : G(n2 )
. MatMul
3: x2 := φ(h̃2 + b2 ) : H(n2 )
.
layer
2
activation;
Nonlin
with
(u,
v)
→
7
φ(u + v)
√
4:
. output is v > x2 / n2 , but this does not need to be expressed in the program
5:
. begin backprop
6: W 2> := (W 2 )> : A(n1 , n2 )
. Trsp
√
7: dx2 := v : G(n2 )
. gradient wrt x2 equals the last layer weights, scaled
up
by
n2
√
2
0 2
2
2
2
2
2
8: dh̃ := φ (h̃ + b ) dx : H(n )
. gradient wrt h̃ , scaled up by √n ; Nonlin
9: dx1 := W 2> dh̃2 : G(n1 )
. gradient wrt x1 , scaled up by √n2 ; MatMul
1
0
1
1
1
10: d(W x) := φ (W x + b ) dx
. gradient wrt the vector W 1 x, scaled up by n2 ; Nonlin
11:


 . Return2 the
 NTK value Θ(x, x); see Eq. (9)
kdh̃2 k2
kx1 k2
kd(W 1 x)k2
kxk
kx2 k2
1 + n1
+
1 + dim(x)
Output: n2 + n2
n1
N ETSOR> Program 2 Simple RNN Forward and Backward Computation on Two Input Sequences
// Embeddings of sequence 1 tokens
Input: U x11 , . . . , U xT1 1 : G(n)
// Embeddings of sequence 2 tokens
Input: U x12 , . . . , U xT2 2 : G(n)
// Weight and bias
Input: W : A(n, n)
Input: b : G(n)
// Readout weights
Input: v : G(n)
// The FOR loop is a shorthand for the unrolled
straight-line program
for a = 1, 2 do
s1a := φ(U x1a + b) : H(n)
h̃2a := W s1a : G(n)
s2a := φ(h̃2a + U x2a + b) : H(n)
..
.
h̃Ta a := W sTa −1,a : G(n)
sTa a := φ(h̃Ta a + U√
xTa a + b) : H(n)
> Ta a
// Output is v s / n, but
// we don’t express this in the program

// — Backprop —
√
// ∀ variable u, du represents n∇u out
dsTa a := v : G(n)
// φ0 is derivative of φ
dh̃Ta a := φ0 (h̃Ta a + U xTa a + b) dsTa a :
H(n)
dsTa −1,a := W > dh̃Ta a : G(n)
dh̃Ta −1,a := φ0 (h̃Ta −1,a + U xTa −1,a +
b) dsTa −1,a : H(n)
dsTa −2,a := W > dh̃Ta −1,a : G(n)
..
.
ds1a := W > dh̃2a : G(n)
dh̃1a := φ0 (U x1a + b) ds1a : H(n)
// Return NTK evaluated on sequences x1 , x2
// See Eq. (12)
T1 1 > T2 2
Output: s n s +
PT1 PT2 dh̃i1 > dh̃j2
×
i=1
j=1
n


si−1,1 > sj−1,2
xi1> xj2
+
1+
i1
n
dim(x )

Examples Programs 1 and 2 write out the forward and backward computation of resp. an MLP
and a simple RNN. We remark on a few things: First, notice that the new transpose instruction Trsp
allows us to express backpropagation. Second, as in Yang [62], we account for the input x through
its embedding W 1 x, not x itself. This is because 1) our theorems concern the case where all input
G-vars are random; in the context of expressing neural network computation, x is a deterministic
input, while W 1 x is a Gaussian vector when W 1 has iid Gaussian entries; 2) x has a fixed dimension,
while we intend all dimensions (like n1 , n2 ) in the N ETSOR program to tend to infinity, as we’ll
describe shortly. Third, weight-sharing is easily expressed because we can arbitrarily re-use A-vars.
Programs expressing backpropagation have a special property that we would like to isolate, and
which will reduce the complexity the N ETSOR> master theorem we need to prove. It is a tensor
program generalization of Condition 1 for neural networks.
17

Definition A.3. A N ETSOR> program is said to be BP-like if there is a special nonempty set of
input G-vars v 1 , . . . , v k (intuitively, these should be thought of as the readout weights of the forward
computation) such that
1. If W > z is used in the program for some H-var z, and W is an input A-var, then z must be
an odd function of v 1 , . . . , v k , in the sense that, fixing all other G-vars, if v 1 , . . . , v k are
negated simultaneously, then z is negated as well:
z(−v 1 , . . . , −v k , all other G-vars) = −z(v 1 , . . . , v k , all other G-vars).
2. If W z is used in the program for some H-var z, and W is an input A-var, then z cannot
depend on any of v 1 , . . . , v k .
3. v 1 , . . . , v k are sampled with zero mean (but possibly with nontrivial covariances) and
independently from all other G-vars.
Remark A.4. A N ETSOR> program expressing backpropagation of a network satisfying Condition 1
can be seen to be BP-like as follows: We can always write the program such that the “forward
computation”, up to but before
√ applying readout weights, appears first, followed by the “backward
computation” (scaled
up
by
width, as exemplified by Programs 1 and 2). If the network output is a
√
scalar out = v > x/
n
with
readout
weights v, then v is not used until the backward computation,
√
where we have n∂out/∂x = v. This fulfills condition 2 in Definition A.3. In the backward
computation, only transposed matrices (A-vars) appear in MatMul lines, and all vectors (H-vars) are
linear functions of (and thus are odd in) v, because backpropagation is linear in output gradients. This
fulfills condition 1 in Definition A.3.
Like in Yang [62], the G-vars in a BP-like N ETSOR> program will roughly jointly Gaussian in each
coordinate slice. We keep track of their mean and covariance using the usual recursive equations.
 in
µ (g) if g is input
µ(g) =
,
0
otherwise
 in
if g, g 0 are inputs
Σ (g, g 0 )
2
Σ(g, ḡ) = σW EZ φ(Z)φ̄(Z) if g = W h, ḡ = W h̄,

0
otherwise

(18)

Setup A.5. For N ETSOR> program: For simplicity, assume all dimensions in the program are equal
2
2
to n. Suppose for each A-var W : A(n, n), we sample Wαβ ∼ N (0, σW
/n) for some σW
> 0, and
in
in
for each α ∈ [n], we sample, i.i.d., {xα : x is input G-var} ∼ N (µ , Σ ) for some mean µin and
(possibly singular) covariance Σin over input G-vars.
Finally, we have the BP-like N ETSOR> Master theorem.
Theorem A.6 (BP-like N ETSOR> Master Theorem). Fix any BP-like N ETSOR> program satisfying
Setup A.5 and with all nonlinearities polynomially-bounded. If g 1 , . . . , g M are all of the G-vars in
the entire program, including all input G-vars, then for any polynomially-bounded ψ : RM → R, as
n → ∞,
n
1
M
1X
a.s.
ψ(gα1 , . . . , gαM ) −−→
E
ψ(Z) =
E
ψ(Z g , . . . , Z g ),
n α=1
Z∼N (µ,Σ)
Z∼N (µ,Σ)
a.s.

1

M

where −−→ means almost sure convergence, Z = (Z g , . . . , Z g ) ∈ RM , and µ = {µ(g i )}M
i=1 ∈
M ×M
RM and Σ = {Σ(g i , g j )}M
∈
R
are
given
in
Eq.
(18).
See
Fig.
1
for
an
illustration.
i,j=1
This is equivalent to Theorem 7.2, but emphasizes that the main source of randomness comes from
the G-vars (i.e. approximately Gaussian vectors) g 1 , . . . , g M whose distribution can be explicitly
computed via Eq. (18).

B

N ETSOR>+

In this section we augment N ETSOR> with a constant type to form N ETSOR>+ , like how N ETSOR
is augmented likewise to form self-parametrized N ETSOR+ in Yang [62]. The main result here is the
BP-like N ETSOR>+ Master Theorem (Theorem B.2).
18

𝑔1

𝑔3

𝑔𝑀

𝜓(

)

𝜓(

)

𝜓(

)

1

𝜓(

)

𝜓(

)

𝜓(

)

𝑛→∞

Average
𝑛
1
෍
𝑛

𝑔2

𝑎. 𝑠.

𝔼

𝑍 ~ 𝑁 𝜇,Σ

𝜓 ( 𝑍𝑔1

𝑍𝑔

2

𝑍𝑔

3

𝑍𝑔

𝑀

)

Figure 1: An illustration of the N ETSOR> Master Theorem Theorem A.6.
We first formally define the N ETSOR>+ language.
Definition B.1. A N ETSOR>+ program13 is a N ETSOR> program where we have an additional
scalar type, called C, which should intuitively be thought of as a random variable that tends to a
deterministic limit (i.e. a Constant) almost surely. Colloquially, we will call variables of type C
“C-vars.” C-vars can be used as parameters of nonlinearities.
For completeness, we specify a N ETSOR+ program as follows:
Input A set of input C-vars, in addition to the G- and A-vars allowed in Definition A.1.
Body New variables can be introduced and assigned via the following rules
MatMul Same as in Definition A.1.
Trsp Same as in Definition A.1.
Nonlin+ If x1 , . . . , xk : G(n) are G-vars with the same dimension n, θ1 , . . . , θl : C are
C-vars, and φ(−; −) : Rk × Rl → R is a parametrized function, then we may create
an H-var
φ(x1 , . . . , xk ; θ1 , . . . , θl ) : H(n)
where φ(−; θ1 , . . . , θl ) acts coordinatewise.
Moment If x1 , . . . , xk : G(n) are G-vars with the same dimension n, θ1 , . . . , θl : C are
C-vars, and φ(−; −) : Rk × Rl → R is a parametrized function, then we may create a
C-var
n
1X
φ(x1α , . . . , xkα ; θ1 , . . . , θl ) : C.
n α=1
Output Same as in Definition A.1.
See Appendix D for examples of layernorm and attention written in N ETSOR>+ .
The following gives the N ETSOR>+ Master Theorem, which first lists the regularity conditions
needed (rank stability and parameter-control), along with some natural notations defined later, before
stating the main convergence results.
Theorem B.2 (BP-like N ETSOR>+ Master Theorem). Fix any BP-like N ETSOR>+ program sampled in the natural way as in Assumption B.3 and also satisfying rank stability (Assumption B.7).
Let ϕ• , Θ• , µ, Σ, (˚) be as in Definition B.4. Suppose for every H-var or C-var u, ϕu (−; Θu ) is
parameter-controlled at Θ̊u . Then the following hold.
13
In the language of Yang [62], N ETSOR>+ actually corresponds to self-parametrized N ETSOR+ with Trsp,
but we omit “self-parametrized” in the name because this is the primary form of N ETSOR>+ we will use in
practice. What would be the plain N ETSOR>+ in the language of Yang [62] would just be a fragment of of the
N ETSOR>+ in Definition B.1, so our Master Theorem will also cover that case.

19

1. Let g 1 , . . . , g M be all of the G-vars in the program (including all input G-vars). Then for
any polynomially bounded ψ : RM → R, we have
n

1X
a.s.
ψ(gα1 , . . . , gαM ) −−→
E
ψ(Z).
n α=1
Z∼N (µ,Σ)
More generally, for any l, for any random vector Θ ∈ Rl that converges almost surely to
a deterministic vector Θ̊, as n → ∞, and for any ψ(−; −) : RM × Rl → R parametercontrolled at Θ̊,
n
1X
a.s.
ψ(gα1 , . . . , gαM ; Θ) −−→
E
ψ(Z; Θ̊).
n α=1
Z∼N (µ,Σ)
2. Each C-var θ converges to its natural limit θ̊:
a.s.

θ −−→ θ̊.
We now expand on the assumptions and definitions used in the Master Theorem.
Assumption B.3. Fix a self-parametrized N ETSOR>+ program satisfying Setup A.5. Assume each
a.s.
input C-var θ is sampled in a way such that θ −−→ θ̊ as n → ∞ for some deterministic scalar θ̊ ∈ R.
Definition B.4. Fix a N ETSOR>+ program with scalar variables satisfying Assumption B.3. For the
purpose of this definition, write g 1 , . . . , g M for the entirety of the G-vars in the program, including
input G-vars.
New Notations: ϕ• , Θ•
h def

For each H-var h = φ(g 1 , . . . , g M ; θ1 , . . . , θl ) introduced by Nonlin+ ,

h def

i

set ϕ = φ and Θ = (θ1 , . . . , θl ). For each G-var g i , this means that ϕg (x1 , . . . , xM ) = xi and
Pn
i
Θg = () ∈ R0 is the empty vector. Likewise, for each C-var c = n1 α=1 φ(gα1 , . . . , gαM ; θ1 , . . . , θl )
def

def

introduced by Moment, set ϕc = φ and Θc = (θ1 , . . . , θl ).
Extending the (˚) notation from Assumption B.3 and the Recursive Definition of µ and Σ Given µin
and Σin as in Setup A.5, we define µ and Σ on G-vars, along with “limit scalars” θ̊ for each C-var θ
(extending θ̊ given by Assumption B.3 for input θ), as follows: For any pair of G-vars g, ḡ, we define
recursively
 in
def µ (g) if g is input
µ(g) =
0
otherwise
 in
if g, g 0 are inputs
Σ (g, ḡ)
def
2
h
h
h̄
h̄
Σ(g, ḡ) = σW EZ ϕ (Z; Θ̊ )ϕ (Z; Θ̊ ) if g = W h, ḡ = W h̄
(19)

0
otherwise
where W is any A-var, transposed or not14 ; and for each C-var θ introduced by Moment,
def

θ̊ = E ϕθ (Z; Θ̊θ ).
Z

(20)

In all of the equations above, Z ∼ N (µ, Σ) is a random Gaussian vector with an entry for each G-var
in the program.
Parameter-Control We adapt the definition of parameter-control from Yang [62] to our setting.
Definition B.5. We say a parametrized function φ(−; −) : Rk × Rl → R is polynomially parametercontrolled or just parameter-controlled for short15 , at Θ̊ ∈ Rl if
In Eq. (19), if W is an input A-var, then σW is as in Setup A.5; if W = W̄ > for some input G-var W̄ , then
σW = σW̄ . Note: when we allow variable dimensions in the program, this is defined slightly differently; see
Eq. (24).
15
This overloads the meaning of parameter-controlled from Yang [62], where the definition replaces the
2−
“polynomially bounded” in the definition here with “bounded by eCk·k +c for some C, c,  > 0.” In this paper,
we shall never be concerned with the latter (more generous) notion of boundedness, so there should be no risk of
confusion.
14

20

1. φ(−; Θ̊) is polynomially bounded, and
2. there are some polynomially bounded φ̄ : Rk → R and some function f : Rl → R≥0 ∪ {∞}
that has f (Θ̊) = 0 and that is continuous at Θ̊, such that, for all x1 , . . . , xk ∈ R and Θ ∈ Rl ,
|φ(x1 , . . . , xk ; Θ) − φ(x1 , . . . , xk ; Θ̊)| ≤ f (Θ)φ̄(x1 , . . . , xk ).

Note that f and φ̄ here can depend on Θ̊. The following examples come from Yang [62].
Example B.6. Any function that is (pseudo-)Lipschitz16 in x1 , . . . , xk and Θ is polynomially
parameter-controlled. An example of a discontinuous function that is polynomially parametercontrolled is φ(x; θ) = step(θx). Then for θ̊ 6= 0,
|φ(x; θ) − φ(x; θ̊)| ≤

|θ̊ − θ|
|θ̊|

,

so we can set f (θ) = |θ̊−θ|
and φ̄ = 1 in Definition B.5.
|θ̊|
Rank Stability The following assumption says that the vectors in a program should not change
any linear dependence relations abruptly in the infinite n limit.
Assumption B.7 (Rank Stability). For any W : A(n, m) and any collection S ⊆ {(h : H(m)) | ∃(g :
1
G(n)), g := W h}, let H ∈ Rm×|S| be the matrix whose columns are h ∈ S. If m
H > H ∈ R|S|×|S|
converges almost surely to some C̊ as n, m → ∞ with convergent ratio n/m → α, then almost
surely rank H = rank C̊ for all large n and m.
Some remarks
• An example violating rank stability would be S = {1, 1 + 1/n}, vectors with constant
entries 1 and 1 + 1/n, which are linearly independent for any finite n but their kernel matrix
becomes singular in the limit n → ∞.
• Note that a common situation where rank stability holds is when all limit C̊ matrices are full
rank. By the lower semi-continuity of rank, rank H = rank C̊ must hold asymptotically.
• There are counterexamples to the N ETSOR>+ Master Theorem if rank stability is not
assumed [62].
• Note that we did not assume Assumption B.7 explicitly in Theorems 7.2 and A.6 because
we in fact get it for free (Lemma G.6).
See Yang [62] for further discussions of the rank stability assumption.
B.1

The Simplified N ETSOR>+

We can simplify the above formal description of N ETSOR>+ like how we simplified N ETSOR> in
the main text.
Definition B.8 (Simplified N ETSOR>+ ). A simplified N ETSOR>+ program is just a sequence of
vectors and scalars recursively generated from an initial set of random n × n matrices W, random
size n vectors V, and random scalars C via one of the following ways
Nonlin Given φ : Rk × Rl → R, previous scalars θ1 , . . . , θl ∈ R and vectors x1 , . . . , xk ∈ Rn , we
can generate a new vector
φ(x1 , . . . , xk ; θ1 , . . . , θl ) ∈ Rn
where φ(−; θ1 , . . . , θl ) applies coordinatewise to each α-slice (x1α , . . . , xkα ).
16

A pseudo-Lipschitz function φ : Rr → R is one that satisfies
|φ(x) − φ(y)| ≤ Ckx − yk(kxkp + kykq + 1)

for some constants C, p, q ≥ 0. Roughly speaking, pseudo-Lipschitz functions are those that have polynomially
bounded weak derivatives.

21

Moment Given same setup as above, we can also generate a new scalar
n

1X
φ(x1α , . . . , xkα ; θ1 , . . . , θl ) ∈ R
n α=1
MatMul Given W ∈ Rn×n and x ∈ Rn , we can generate W x ∈ Rn or W > x ∈ Rn
Here the (initial) matrices, vectors, and scalars correspond to the (input) A-, H-, and C-vars in
Definition B.1, and the rules with the same name mirror one another. The main difference between this version of N ETSOR>+ and Definition B.1 is that we are implicitly allowing Nonlin and
Moment to take in H-vars here instead of only G-vars. Nevertheless, their expressive powers are
equivalent, since any vector generated with Definition B.8 is generated from a chain of Nonlin
that ends up in G-vars (those vectors created by MatMul), and we can just collapse parametrized
nonlinearities into a single parametrized nonlinearity that takes in G-vars only. For example, if
z = φ(x1 , x2 ; θ1 ), x1 = W v, x2 = ψ(y; θ2 ), y = W u, then z can be directly expressed in terms
def

of G-vars: z = φ(W v, W u; θ1 , θ2 ) = φ(W v, ψ(W u; θ2 ); θ1 ). Therefore, we make the following
definition
Definition B.9 (ϕ• , Θ• Notation). For any size n vector x in Definition B.1, let ϕx and Θx be
the parametrized nonlinearity and the scalars such that x = ϕx (z 1 , . . . , z k ; Θx ) for some G-vars
z 1 , . . . , z k . Likewise, for any scalar
B.1, let ϕc and Θc be the parametrized nonlinearity
Pnc in Definition
1
x 1
and the scalars such that c = n α=1 ϕ (zα , . . . , zαk ; Θc ) for some G-vars z 1 , . . . , z k .
Then we can write down a Master Theorem in the style of Theorem 7.2 for Definition B.8-style
N ETSOR>+ programs.
Box 2

How to Intuitively Understand a Simplified N ETSOR>+ Program

Consider a N ETSOR>+ program sampled as in Theorem B.10. When n  1, each vector
x ∈ Rn in the program has roughly iid coordinates distributed like a random variable Z x ,
and each scalar θ ∈ R is close to a deterministic scalar θ̊, with Z x and θ̊ defined recursively
as below.
Nonlin If y = φ(x1 , . . . , xk ; θ1 , . . . , θl ), then
1

k

Z y = φ(Z x , . . . , Z x ; θ̊1 , . . . , θ̊l ).
Moment If θ = n1

Pn

k
1
α=1 φ(xα , . . . , xα ; θ1 , . . . , θl ), then
1

k

θ̊ = E φ(Z x , . . . , Z x ; θ̊1 , . . . , θ̊l ).
Z

MatMul For any set of infinite vectors X and matrix W ∈ W, the set of random variables
Z W x : x ∈ X is jointly Gaussian with zero mean and covariance

2
Cov Z W x , Z W x̄ = σW
E Z x Z x̄ .
If Y is any set of Rn vectors and W̄ 6= W , then {Z W x : x ∈ X } is independent
from {Z W̄ y : y ∈ Y}.
Theorem B.10 (Simplified BP-like N ETSOR> Master Theorem). Consider a N ETSOR>+ program
2
in the style of Definition B.8. Suppose: 1) for each initial W ∈ W, Wαβ ∼ N (0, σW
/n) for an
2
associated variance σW
; 2) there is a multivariate Gaussian Z V = {Z g : g ∈ V} ∈ R|V| such
that the initial set of vectors V are sampled like {gα : g ∈ V} ∼ Z V iid for each α ∈ [n]; 3) each
initial scalar θ tends to a deterministic constant θ̊ as n → ∞. Suppose the program is BP-like and
ϕu (−; −) is parameter-controlled at Θ̊u for all vectors and scalars u. Assume the program satisfies
rank stability (Assumption B.7).
Recursively define Z h for each vector h and θ̊ for each scalar θ in the program as in Box 2. Then the
following hold.
22

1. For any l, for any random vector Θ ∈ Rl that converges almost surely to a deterministic
vector Θ̊ as n → ∞, for any vectors x1 , . . . , xM ∈ Rn in the program, and for any
ψ(−; −) : RM × Rl → R parameter-controlled at Θ̊,
n

1
M
1X
a.s.
ψ(x1α , . . . , xM
−→ E ψ(Z x , . . . , Z x ; Θ̊).
α ; Θ) −
n α=1

2. Each C-var θ converges to its natural limit θ̊:
a.s.

θ −−→ θ̊.

C

Programs with Variable Dimensions

Notation In this section, we let dim(x) denote the dimension of an H-var x.
As in Yang [62], we focused in the main text on the case where all dimensions of vectors in a
N ETSOR> program are equal, but this does not have to be the case. In this section, we state the
Master Theorem for BP-like N ETSOR> and N ETSOR>+ programs with variable dimensions. The
main idea is exactly the same as before, but we require some more notation to describe how the limit
is taken when all the widths vary.
First, there are some obvious dimensionality constraints even when they do vary, induced by the rules
we apply to introduce variables:

If y = φ(x1 , . . . , xk ), then dim(y) = dim(xi ), ∀i; similarly for Nonlin+ and Moment.
(21)
If y = W x and ȳ = W x̄, then dim(x) = dim(x̄) and dim(y) = dim(ȳ).
Definition C.1. Given an equivalence relation ≃ on the input G-vars of a program, we extend this to
an equivalence relation on all H-vars of the program by
h ≡ h0 ⇐⇒ h ≃ h0 OR h and h0 are constrained to have the same dimension by (21).

(22)

We call any such equivalence class a Common Dimension Class, or CDC.
Intuitively, the dimensions of H-vars in each CDC are all the same but can be different in different
CDCs.
Example C.2. In Program 1, if we let different layers have different widths, then the CDCs are
{W 1 x, b1 , x1 , dx1 , d(W 1 x)} and {b2 , v, h̃2 , x2 , dx2 , dh̃2 }. If we tie the widths, then all of these
H-vars are in the same CDC. In Program 2, all G-vars are in the same CDC, and given the body of
the program, this is the only way to partition the H-vars into CDCs, because the reuse of W across
time step ties all H-var dimensions to be equal.
The following describes the sampling and CDCs of N ETSOR> programs we are interested in.
Assumption C.3. Fix a N ETSOR> or N ETSOR>+ program with some equivalence relation on the
input G-vars, and thus with induced CDCs over its H-vars. Assume the dimensions in each CDC are
the same, but the dimensions of different CDCs can vary. Suppose for each input A-var W : A(m0 , m),
2
2
we sample Wαβ ∼ N (σW
/m) for some σW
> 0. For each transpose A-var W > : A(m, m0 ), we
m0 2
2
also set σW > = m σW . Suppose further for each CDC c with dimension n, for each α ∈ [n], we
sample, i.i.d., {xα : x ∈ c and x is input G-var} ∼ N (µc , Σc ) for some mean µc and covariance Σc
over input G-vars in c.
Then the following result is an easy extension of Theorem A.6.
Theorem C.4 (BP-like N ETSOR> Master Theorem; Variable Dimensions). Fix any BP-like
N ETSOR> program satisfying Assumption C.3 and with all nonlinearities polynomially bounded.
Consider the limit where all dimensions go to infinity, with their pairwise ratios tending to finite but
nonzero values:
∀W : A(n0 , n),
Then for each transpose W

>

we have n0 /n → ρ

for some ρ ∈ (0, ∞).

0

of an input A-var W : A(n , n), we have
2
σW
> =

n0 2
2
σ → σ̊W
>
n W
23

2
for some limit σ̊W
> . For each input A-var W , we also set σ̊W = σW .

For any CDC c, if g 1 , . . . , g M : G(n) are all of the G-vars in c (including all input G-vars), then for
any polynomially bounded ψ : RM → R, as all dimensions in the program tend to infinity (not just
the dimension of c) in the manner above, we have
n

1
M
1X
a.s.
ψ(gα1 , . . . , gαM ) −−→
E c c ψ(Z) =
E c c ψ(Z g , . . . , Z g ),
n α=1
Z∼N (µ ,Σ )
Z∼N (µ ,Σ )

a.s.

1

(23)

M

where −−→ means almost sure convergence, Z = (Z g , . . . , Z g ) ∈ RM , and µc = {µc (g i )}M
i=1 ∈
M ×M
RM and Σc = {Σc (g i , g j )}M
∈
R
are
given
in
Eq.
(24).
i,j=1
The mean µc and covariance Σc used in Theorem C.4 are defined as follows.
Definition C.5. For any CDC c and G-vars g, ḡ in c, define recursively
 c
µ (g) if g is input
c
µ (g) =
,
0
otherwise
 c
if g, ḡ are inputs
Σ (g, ḡ)
c
2
h
h̄
Σ (g, ḡ) = σ̊W EZ ϕ (Z)ϕ (Z) if g = W h, ḡ = W h̄

0
otherwise

(24)

2
where W can be either an input or a transposed A-var (with σ̊W
defined in Theorem C.4) and
0
0
c
c
0
Z ∼ N (µ , Σ ) with c denoting the CDC of h and h̄.

Proof. Trivial adaptation of the proof of Theorem A.6.
Remark C.6. Eq. (23) only concerns G-vars of the same CDC; what about G-vars of different CDCs?
One can quickly see that a convergence statement like in Eq. (23) cannot be made naively just
because the dimensions are not equal: we cannot even write down the “empirical average” that should
converge. In fact, one can intuitively think of vectors of different CDCs as roughly “independent”
because their “main source of randomness” must come from different A-vars.
Likewise we can extend the BP-like N ETSOR>+ Master Theorem to the Variable Dimension case.
Theorem C.7 (BP-like N ETSOR>+ Master Theorem; Variable Dimensions). Fix any BP-like
N ETSOR>+ program sampled in the natural way as in Assumptions B.3 and C.3 and also satisfying rank stability (Assumption B.7). Let ϕ• , Θ• be as in Definition B.4. Suppose for every H-var
or C-var u, ϕu (−; Θu ) is parameter-controlled at Θ̊u .
Consider the limit where all dimensions go to infinity, with their pairwise ratios tending to finite but
nonzero values:
for all W : A(n0 , n),

we have n0 /n → ρ for some ρ ∈ (0, ∞).

Then for each transpose W > of an input A-var W : A(n0 , n), we have
n0 2
2
σ → σ̊W
>
n W
2
for some limit σ̊W
> . For each input A-var W , we also set σ̊W = σW .
2
σW
> =

For any pair of G-vars g, ḡ, we define recursively
 in
def µ (g) if g is input
µ(g) =
0
otherwise
 in
if g, g 0 are inputs
Σ (g, ḡ)
def
2
h
h
h̄
h̄
Σ(g, ḡ) = σ̊W EZ ϕ (Z; Θ̊ )ϕ (Z; Θ̊ ) if g = W h, ḡ = W h̄

0
otherwise
where W is any A-var, transposed or not; and for each C-var θ introduced by Moment,
def

θ̊ = E ϕθ (Z; Θ̊θ ).
Z

Then the following hold.
24

(25)

1. For any CDC c, let g 1 , . . . , g M be all of the G-vars in c (including all input G-vars). Then
for any polynomially bounded ψ : RM → R, we have
n

1X
a.s.
ψ(gα1 , . . . , gαM ) −−→
E
ψ(Z).
n α=1
Z∼N (µc ,Σc )
More generally, for any l, for any random vector Θ ∈ Rl that converges almost surely to
a deterministic vector Θ̊, as n → ∞, and for any ψ(−; −) : RM × Rl → R parametercontrolled at Θ̊,
n
1X
a.s.
ψ(gα1 , . . . , gαM ; Θ) −−→
E
ψ(Z; Θ̊).
n α=1
Z∼N (µc ,Σc )
2. Each C-var θ converges to its natural limit θ̊:
a.s.

θ −−→ θ̊.

D

Writing Backpropagation of Standard Architectures in N ETSOR>

In general, one can observe that, if the forward propagation can be written down in N ETSOR (which
can be done for all standard architectures as noted in Yang [62]), then the backprop can be written
down in N ETSOR>. Here we give some explicit examples of this.
Notation If x ∈ Rn is an (pre-)activation vector, then dx denotes the gradient of the network output
at x.
Dense Matrix Multiplication If y = W x, then dx = W > dy.
Skip Connection If z = x + y, then dx = dy = dz.
(Graph) Convolution A convolution can be decomposed as a sum of many weight-shared dense
matrix multiplications, as observed in Yang [62]. Combining the above, we can also express
convolution and its backpropagation in N ETSOR>.
Let x = {xs ∈ Rn : s ∈ P } be the feature maps of a convolutional neural network, where n is
the number of channels, P is the set of pixel positions (e.g. P = [32] × [32]), and xs is the vector
of activations at pixel s across all channels. A convolutional layer is given by a set of weights
W = {Wκ ∈ Rn×n : κ ∈ K}: a dense (#channel-by-#channel) matrix Wκ for each kernel position
κ ∈ K (e.g. K = {−1, 0, 1} × {−1, 0, 1} for a 3 × 3 kernel or K = {−2, 0, 2} × {−2, 0, 2} for
the same with dilation 2), where for simplicity we assume n is also the number of output channels.
2
Assume Wκ ∼ N (0, σw
/n). A kernel position κ acts on a pixel position s to obtain another pixel
position s + κ. The convolution of x by W (that maintains the pixel positions) can then be written
via a combination of MatMul and Nonlin as {hs ∈ Rn : s ∈ P } where
X
hs =
Wκ xs+κ
κ

where the range of κ depends on the padding property of the convolution. Here we will assume the
sum ranges over all κ such that s + κ ∈ P , which corresponds to the most common zero padding.
Similarly, during backpropagation, given gradients {dht ∈ Rn : t ∈ P }, the gradients {dxt ∈ Rn :
t ∈ P } can be computed by
X
dxt =
Wκ> dht−κ
κ

where again the sum is over κ such that t + κ ∈ P . Both equations are valid N ETSOR> snippets and
we may form the associated random variables by
X
Z hs =
Z Wκ xs+κ
κ

Z

dxt

=

X

>

Z Wκ dht−κ

κ

25

>

where each Z Wκ xs+κ , Z Wκ dht−κ is Gaussian.
Let x̄ be any second set of input feature maps (possibly x = x̄), and h̄ is the convolution of W with
x̄. Then {Z hs }s ∪ {Z h̄s }s are jointly Gaussian, with
X
E Z hs Z h̄t =
E Z Wκ xs+κ Z Wτ x̄t+τ .
κ,τ

But by Rule 2,
E Z Wκ xs+κ Z Wτ x̄t+τ =



if κ 6= τ
if κ = τ

0
2
σw
E Z xs+κ Z x̄t+κ

so we can simplify
2
E Z hs Z h̄t = σw

X

E Z xs+κ Z x̄t+κ .

(26)

κ

Similarly, {Z dxt }t ∪ {Z dx̄t }t is jointly Gaussian with
X
2
E Z dxs Z dx̄t = σw
E Z dhs+κ Z dh̄t+κ .

(27)

κ

If we apply nonlinearity to h, then the usual V-transform calculations apply. This routine can be
easily generalized to different strides, paddings, dilations, and also to graph convolutions.
Pooling Continuing the notation from convolution above, global average pooling (GAP) can be
expressed via Nonlin as
1 X
GAP(x) =
x s ∈ Rn .
|P |
s∈P

Likewise, (local) maxpool with kernel positions K can be expressed via Nonlin as
Maxpool(x)s = max{xs+κ : κ ∈ K, s + κ ∈ P } ∈ Rn ,
where max is applied coordinatewise.
Batchnorm and Pooling For  > 017 , ζ = (ζ 1 , . . . , ζ B ) ∈ RB , let φ̃ : RB → RB ,
 
def
def
φ̃(ζ) = φ ζ̃ , ζ̃ =

B

ζ̂

def

σ(ζ̂)

def

, ζ̂ = ζ − ν(ζ) where ν(ζ) =

1 X i
ζ ,
B i=1

def

σ(ζ̂)2 =

1
kζ̂k2 + ,
B
(28)

be batchnorm followed by coordinatewise nonlinearity φ, where ζ ∈ RB should be interpreted as
a single neuron across a batch, and ν and σ are the batch mean and standard deviations. Here, B
should be thought of as fixed while n → ∞.
If γ = φ̃(ζ) ∈ RB , and dγ ∈ RB is a gradient of some loss wrt γ, then the gradient wrt dζ ∈ RB
can be written as
!


1
ζ̃ ζ̃ > dγ φ0 (ζ̃)
def
dζ = dφ̃(dγ | ζ) = I −
I−
.
B
B
σ(ζ̂)
Then, given a batch of vectors z 1 , . . . , z B ∈ Rn (for example, they could be the preactivations after
applying a linear layer), we can express batchnorm via Nonlin as coordinatewise applications of φ̃:
y i := φ̃i (z 1 , . . . , z B ) ∈ Rn ,

i = 1, . . . , B.

(29)

Given gradients dy 1 , . . . , dy B ∈ Rn , backpropagation can similarly be expressed via Nonlin as
coordinatewise applications of dφ̃:
dz i = dφ̃i (dy 1 , . . . , dy B | z 1 , . . . , z B ) ∈ Rn ,
17

i = 1, . . . , B.

If  = 0 here, then the batchnorm jacobian has a singularity, so the BP-like Master Theorem does not cover

it.

26

GRU and LSTM Since GRU and LSTMs are just recurrent dense matrix mutliplication and
coordinatewise nonlinearities, we can naturally write their forward and backprop in N ETSOR>. Here
we do so concretely for GRU.
GRU evolves according to:
z t = σ(ζ t ), ζ t = Uz xt + Wz ht−1 + bz
rt = σ(ρt ),

ρt = Ur xt + Wr ht−1 + br

ht = z t ht−1 + (1 − z t ) φ(γ t ), γ t = Uh xt + Wh (rt ht−1 ) + bh
where σ is sigmoid and φ is tanh, xt , ht , z t , rt are resp. the input, state, update gate, and reset gate
vectors, and W• , U• , b• are the weights and biases going into vector •. Since these equations only
involve MatMul and Nonlin, they can be expressed in N ETSOR>.
If the output is v > hT on the final time step T for some weights v ∈ Rn , and d• denotes the gradient
of this output against •, then we can write the backprop as follows
dhT = v

dht−1 = z t dht + Wz> dζ t + rt Wh> dγ t + Wr> σ 0 (ρt ) dρt

dz t = dht
ht−1 − φ(γ t )
dζ t = dz t

σ 0 (ζ t )

dγ t = dht

(1 − z t )

drt = ht−1

Wh> dγ t

φ0 (γ t )

dρt = drt σ 0 (ρt )
which involves only MatMul and Nonlin and so is expressible in N ETSOR>.
To express layernorm and attention, we need the extension N ETSOR>+ to N ETSOR> so we can
express scalars such as the mean and variance of a layer. We will use the simplified version of
N ETSOR>+ given in Definition B.8.
Layernorm Given a layer’s pre-activation x ∈ Rn , we can use Moment to compute its mean and
variance, where we introduce nonlinearities φ• to put the expressions in the form of Moment:
n
n
1X
1X
ν=
xα =
φid (xα ) ∈ R
n α=1
n α=1
σ2 =

n
n
1X
1X
(xα − ν)2 =
φsq (xα ; ν) ∈ R.
n α=1
n α=1

With these scalars defined, we can then express layernorm of x as
x−ν
y = Layernorm(x) = √
= φLN (x; ν, σ 2 , ) ∈ Rn .
σ2 + 
Now suppose we have a gradient dy ∈ Rn at y. Then backpropagating to x through the layernorm
yields
dx = d Layernorm(dy | x) ∈ Rn
(30)



>
1
yy
dy
def
√
= In −
In −
∈ Rn
n
n
σ2 + 


1
1
=√
In −
(dy − c · y)
n
σ2 + 
1
=√
(dy − c · y − a)
2
σ +
= φbp (dy, y; c, a, σ 2 , )
Nonlin
n
>
y dy
1X
where c =
=
yα dyα ∈ R
Moment
n
n α=1
n

a=

1X
dyα − c · yα ∈ R
n α=1
27

Moment

In terms of the corresponding random variables, we have
Zx − E Zx
def
˚
Zy =
Layernorm(x) = p
Var(Z x ) + 

(31)

dy
− Z y E Z dy Z y )
def Center(Z
˚
p
Z dx = dLayernorm(dy
| x) =
Var(Z x ) + 

(32)

def

where Center(X) = X − E X.
Attention Given keys, queries, and values for T tokens, k 1 , . . . , k T , q 1 , . . . , q T , v 1 , . . . , v T ∈ Rn ,
attention yields
y i = Attn(q i , {k i }i , {v i }i )
= ai1 v 1 + · · · aiT v T ∈ Rn
where

Nonlin

(ai1 , . . . , aiT ) = SoftMax(ci1 , . . . , ciT )
aij = SoftMax(ci1 , . . . , ciT )j ∈ R
n
1X i j
q k ∈ R.
cij = q i> k j /n =
n α=1 α α

Moment
Moment

In terms of corresponding random variables, we have
i

1

T

Z y = åi1 Z v + · · · + åiT Z v


i
1
i
T
(åi1 , . . . ,åiT ) = SoftMax E Z q Z k , . . . , E Z q Z k .
If dy 1 , . . . , dy T ∈ Rn are gradients, and we abbreviate dy = {dy i }i , k = {k i }i , q = {q i }i , v =
{v i }i , then backpropagating through the attention yields
def

dv j = dvj Attn(dy | k, q, v) = a1j dy 1 + · · · + aTj dy T
X
def
i l
eij fjl
k ∈ Rn
dq i = dqi Attn(dy | k, q, v) =

Nonlin
Nonlin

j,l
def

dk i = dki Attn(dy | k, q, v) =

X

l l
elj fji
q ∈ Rn

Nonlin

(33)

j,l
n

1X i j
dy v ∈ R
n α=1 α α

with eij = dy i> v j /n =

Moment

n

i
fjl
= ∂aij /∂cil =

1X
ψjl (; ci1 , . . . , ciT ) ∈ R
n α=1

Moment

where ψjl is a “parametrized nonlinearity” that depends only on the parameters:
def

ψjl (; c1 , . . . , cT ) = ∂SoftMaxj (c1 , . . . , cT )/∂cl .
i

i

i

i

If we abbreviate Z dy = {Z dy }i , Z k = {Z k }i , Z q = {Z q }i , Z v = {Z v }i , then in terms of the
corresponding random variables, we have
j
1
T
def
dy
˚
Z dv = dvj Attn(Z
| Z k , Z q , Z v ) = å1j Z dy + · · · + åTj Z dy
X
i
def
dy
i kl
˚
Z dq = dqi Attn(Z
| Zk, Zq, Zv) =
e̊ij f˚jl
Z

j,l

Z

dki

def
dy
˚
= dki Attn(Z
| Zk, Zq, Zv) =

X
j,l

i

e̊ij = E Z dy Z v

j

i
1
i
T
i
f˚jl
= ψjl (; E Z q Z k , . . . , E Z q Z k )

28

l
e̊lj f˚ji
Zq

l

(34)

E

Example NTK Computations

In this section, we show how to compute the NTK of different architecture.
First, we review the V-transform of a nonlinearity.
Definition E.1. Given a multivariate nonlinearity Φ : RB → RB , its V-transform VΦ is a function
taking B × B positive semidefinite matrices to B × B positive semidefinite matrices, and is given by
the following formula
def
VΦ (K) =
E
Φ(z)Φ(z)> .
z∼N (0,K)

When φ : R → R, we take Vφ to be V-transform of the RB → RB function that applies φ to each
coordinate.
We collect below some of the common V-transforms. Here we describe the V-transforms using the
function notation of kernels, but we shall freely switch between the function notation and the matrix
notation in what follows.
Fact E.2 ([15]). For any kernel K,
p
1 p
( 1 − c2 + (π − arccos c)c) K(x, x)K(x0 , x0 )
Vrelu (K)(x, x0 ) =
2π
1
0
(π − arccos c)
Vrelu0 (K)(x, x ) =
2π
p
where c = K(x, x0 )/ K(x, x)K(x0 , x0 ).
Fact E.3 ([51]). For any kernel K,
2
K(x, x0 )
Verf (K)(x, x0 ) = arcsin p
π
(K(x, x) + 0.5)(K(x0 , x0 ) + 0.5)
4
.
Verf 0 (K)(x, x0 ) = p
π (1 + 2K(x, x))(1 + 2K(x0 , x0 )) − 4K(x, x0 )2
Fact E.4. Let φ(x) = exp(x/σ) for some σ > 0. For any kernel K,


K(x, x) + 2K(x, x0 ) + K(x0 , x0 )
0
Vφ (K)(x, x ) = exp
.
2σ 2
E.1

MLP

In the main text, we showed how to compute infinite-width NTK of an MLP using the simplified
N ETSOR> (Definition 7.1). While this is the recommended way of performing the calculations, here
we demonstrate formal N ETSOR> (Definition A.1) calculation of the infinite-width NTK Θ̊(x, x) of
the MLP described in Program 1, using Theorem A.6. By its nature, this calculation will be more
verbose, so the meaning of Theorem A.6 can be seen concretely. We hope this can help readers who
find the main text calculations too dense.
For simplicity, let φ = ReLU, assume the hidden layer widths are equal to a common integer n,
n1 = n2 = n, and suppose x ∈ Rm . This MLP has 5 parameters: W 1 ∈ Rn×m , W 2 ∈ Rn×n , v ∈
Rn , b1 ∈ Rn , b2 ∈ Rn . In the NTK parametrization, we factor W 1 = √1m ω 1 and W 2 = √1n ω 2 ,
1
2
and we sample ωαβ
, ωαβ
, vα , b1α , b2α ∼ N (0, 1), iid, for any α, β. This implies that σW 2 = 1 in
Setup A.5.
This implies that each coordinate of the G-var vector W 1 x is distributed as N (0, kxk2 /m). Thus,
µin is identically 0, and Σin takes the following values over pairs of G-vars
Σin (W 1 x, W 1 x) = kxk2 /m,

Σin (b1 , b1 ) = Σin (b2 , b2 ) = Σin (v, v) = 1,

and Σin (g, g 0 ) = 0 for all other pairs of G-vars.
√
If we let f (x) denote the network output v > x2 / n, then by Eq. (11), the contribution of ω 1 ’s
gradient to the NTK is
kxk2
k∇ω1 f (x)k2 = k∇W 1 x f (x)k2
.
m
29

In Program 1, the G-var d(W 1 x) corresponds to
as
k∇ω1 f (x)k2 =

√

n∇W 1 x f (x). Therefore, we can rewrite the above

kd(W 1 x)k2 kxk2
.
n
m

Similarly, the contribution of ω 2 ’s and v’s gradients to the NTK is
k∇ω2 f (x)k2 =

kdh̃2 k2 kx1 k2
,
n
n

k∇v f (x)k2 =

kx2 k2
.
n

Likewise, the contributions of the bias gradients are
k∇b1 f (x)k2 =

kd(W 1 x)k2
,
n

k∇b2 f (x)k2 =

kdh̃2 k2
.
n

Since the NTK can be expressed as
Θ(x, x) = k∇ω1 f (x)k2 + k∇ω2 f (x)k2 + k∇v f (x)k2 + k∇b1 f (x)k2 + k∇b2 f (x)k2
kdh̃2 k2 kx1 k2
kx2 k2
kd(W 1 x)k2
kdh̃2 k2
kd(W 1 x)k2 kxk2
+
+
+
+
n
m
n
n
n
n
n




kdh̃2 k2 kx1 k2
kx2 k2
kd(W 1 x)k2 kxk2
+1 +
+1 +
,
=
n
m
n
n
n
=

(35)

it suffices to compute the limits of the following squared norms, as n → ∞:
kd(W 1 x)k2 kdh̃2 k2 kx1 k2 kx2 k2 kxk2
,
,
,
,
.
n
n
n
n
m
Theorem A.6 provides exactly the tool needed for this purpose. Here the last squared norm kxk2 /m
is constant in n so we will focus on the other ones.
Checking the conditions of Theorem A.6 In order to apply Theorem A.6, we first need to check
that 1) Program 1 is BP-like, and 2) its nonlinearities are polynomially-bounded. The latter assumption
is obvious since both ReLU and its derivative, the step function, are polynomially-bounded (note
that we don’t require these functions to be smooth at all). The former condition is already shown in
Remark A.4 to be true for any program expressing backpropagation, but we can also reason explicitly
as follows: We can take the “special set of input G-vars” in Definition A.3 to be the G-var v in
Program 1. Note that the only input A-var in Program 1 is W 2 . Then condition 2 of Definition A.3
is satisfied because the only usage of W 2 in Program 1 is in the line h̃2 := W 2 x1 , and here x1 does
not depend on v. Likewise, condition 1 is satisfied because the only usage of W 2> in Program 1 is in
the line dx1 := W 2> dh̃2 , and dh̃2 depends linearly on, and is thus odd in v.
1 2

2 2

Limits of x1 and x2 In fact, the limits of kxnk , kxnk can be computed already with the N ETSOR
Master Theorem of Yang [62], but for completeness we will present the calculation of their limits.
The variable x1 has type H but it can be expressed as a function of G-vars as φ(W 1 x + b1 ), so by
Theorem A.6,
n
1
1
kx1 k2
1X
a.s.
=
φ((W 1 x)α + b1α )2 −−→
E
φ(Z W x + Z b )2
n
n α=1
Z W 1 x ,Z b1

 
1
1
Σ(W 1 x, W 1 x) Σ(W 1 x, b1 )
.
where (Z W x , Z b ) ∼ N 0,
Σ(W 1 x, b1 )
Σ(b1 , b1 )

Because W 1 x and b1 are both input G-vars, this covariance matrix is just
 in
 

Σ (W 1 x, W 1 x) Σin (W 1 x, b1 )
kxk2 /m 0
=
.
0
1
Σin (W 1 x, b1 )
Σin (b1 , b1 )
30

Furthermore, by linearity of Gaussian variables, we can simplify this expectation to
kx1 k2 a.s.
−−→ E φ(ζ)2 ,
ζ
n

where ζ ∼ N (0, Σ(W 1 x, W 1 x) + 2Σ(W 1 x, b1 ) + Σ(b1 , b1 ))


kxk2
+1 .
= N 0,
m

Since we have assumed φ is ReLU, this expectation is just


kx1 k2 a.s. 1 kxk2
1 kxk2
1
−−→
+1 =
+ .
n
2
m
2 m
2
To compute the the next limit limn→∞ kx2 k2 /n, we first need to compute Σ(h̃2 , h̃2 ) and Σ(h̃2 , b2 ).
By “otherwise” case of Eq. (18), Σ(h̃2 , b2 ) = 0, and by the MatMul case of Eq. (18),
Σ(h̃2 , h̃2 ) = σW 2

1

E
1

Z W x ,Z b

1

φ(Z W x + Z b )2 =
1

1
1 kxk2
+ ,
2 m
2

as we have computed above already.
Therefore, by Fig. 1,
n

2
2
1X
a.s.
φ(h̃2α + b2α )2 −−→ E φ(Z h̃ + Z b )2 ,
n α=1
 

 
2
1
1 kxk
Σ(h̃2 , h̃2 ) Σ(h̃2 , b2 )
h̃2
b2
where (Z , Z ) ∼ N 0,
= N 0, 2 m + 2
2 2
2 2
Σ(h̃ , b ) Σ(b , b )
0

kx2 k2 /n =


0
.
1

Again, by linearity of Gaussians, we have
a.s.

kx2 k2 /n −−→

φ(ζ) =

E2

ζ∼N (0,kxk /2m+3/2)
1

2

kxk2
3
+ .
4m
4

2 2

Limits of kd(Wn x)k and kdh̃n k
Whereas the limits computed above could already be done using
the N ETSOR Master Theorem of Yang [62], the limits we will compute here necessarily involve
matrix transposes and thus can only be computed using Theorem A.6.
By Theorem A.6,
n

kdh̃2 k2 /n =

2
2
2
1X 0 2
a.s.
(φ (h̃α + b2α )dx2α )2 −−→ E φ0 (Z h̃ + Z b )2 (Z dx )2
n α=1

where

Σ(h̃2 , b2 )
Σ(h̃2 , dx2 )
Σ(b2 , b2 )
Σ(b2 , dx2 ) 
2 2
Σ(dx , b ) Σ(dx2 , dx2 )
!!
1
1
2
0 0
2 kxk /m + 2
.
0
1 0
0
0 1

 

Σ(h̃2 , h̃2 )
h̃
b
dx


(Z , Z , Z ) ∼ N 0, Σ(b2 , h̃2 )
Σ(dx2 , h̃2 )
2

2

2

=N
2

0,
2

2

Since Z dx is independent from Z h̃ and Z b , we have
a.s.

kdh̃2 k2 /n −−→ E φ0 (ζ1 )2 (ζ2 )2 ,
= E φ0 (ζ1 )2 E(ζ2 )2 =


with ζ1 ∼ N

1
3
0, kxk2 /m +
2
2



1
1
·1= .
2
2

Next, notice that by Eq. (18), for the same ζ1 , ζ2 above, we have
Σ(dx1 , dx1 ) = σW 2> E φ0 (ζ1 )2 (ζ2 )2 = 1 ·

31

1
1
=
2
2

,

ζ2 ∼ N (0, 1)

as before (in this calculation, the MatMul case of Eq. (18) essentially “forgets” the correlation
between W 2 and W 2> and treats W 2> as just another independently sampled matrix). In addition,
Σ(dx1 , b1 ) = Σ(dx1 , W 1 x) = 0 by the “otherwise” case of Eq. (18). Consequently, by Theorem A.6,
n

1
1
1
1X 0
a.s.
kd(W x)k /n =
φ ((W 1 x)α + b1α )2 (dx1 )2α −−→ E φ0 (Z W x + Z b )2 (Z dx )2 ,
n α=1
 

Σ(W 1 x, W 1 x) Σ(W 1 x, b1 ) Σ(W 1 x, dx2 )
1
1
2
where (Z W x , Z b , Z dx ) ∼ N 0,  Σ(b1 , W 1 x)
Σ(b1 , b1 )
Σ(b1 , dx2 ) 
2
1
2 1
Σ(dx , W x)
Σ(dx , b )
Σ(dx2 , dx2 )

 
kxk2 /m 0 0


0
1 0  .
= N 0,
0
0 21

1

2

This expectation is easily evaluated, and we have
a.s.

kd(W 1 x)k2 /n −−→

1 1
1
· =
2 2
4

Finish computing the infinite-width NTK Θ̊ In summary, we have
kx1 k2 a.s. 1 kxk2
1
−−→
+ ,
n
2 m
2

kx2 k2 a.s. 1 kxk2
3
−−→
+ ,
n
4 m
4

kdh̃2 k2 a.s. 1
−−→ ,
n
2

kd(W 1 x)k2 a.s. 1
−−→ .
n
4

Thus, by Eq. (35), we have

 



1 kxk2
1 1 kxk2
1
1 kxk2
3
Θ(x, x) −−→ Θ̊(x, x) =
+1 +
+ +1 +
+
4
m
2 2 m
2
4 m
4
2
3 kxk
7
=
+ .
4 m
4
a.s.

Generalization to multiple inputs This example only computed Θ̊(x, x). The same reasoning can
be easily applied to multiple inputs by writing down a program expressing the forward and backward
computation of the MLP on two inputs.
E.2

Simple Recurrent Neural Network and Average Pooling

We complete the NTK limit computation from the main text and also generalize it to the case where
the output is a projection of the average state instead of just the last state. Recall the RNN we consider
is given by the following forward and backward equations
st (ξ) = φ(g t (ξ) + ut (ξ) + b),

g t (ξ) = W st−1 (ξ), ut (ξ) = U ξ t

dut = dg t = φ0 g t + ut + b
dst .

dst−1 = W > dg t ,

For an input sequence ξ = ξ 1 , . . . , ξ t , . . . , ξ T ∈ Rd , we will consider both

LastState the case where the output of the RNN is a projection of the last state
√
f (ξ) = v > sT / n
as in main text and
AvgPool the case where the output of the RNN is a projection of the average state
T

f (ξ) =

1X > t √
v s / n.
T t=1

If we sample
2
2
Wαβ ∼ N (0, σW
/n), Uαβ ∼ N (0, σU
/d), bα ∼ N (0, σb2 ), vα ∼ N (0, σv2 )

32

then the recursion equations in the main text can be generalized straightforwardly to the following
t

r

t

r

t+1

,s̄r+1

t

r

t

r

C s ,s̄ = E φ(ζ1 )φ(ζ2 ),
Ds ,s̄ = Ds

E φ0 (ζ1 )φ0 (ζ2 )
t−1

r−1

−2 s
,s̄
Dg ,ḡ = Du ,ū = σW
D

 st ,st

t r
t> r
C
C s ,s̄
2
2 ξ ξ
st ,s̄r
2
where (ζ1 , ζ2 ) ∼ N σW
+
σ
=
+
σ
t r
r r
U
b , and we have abbreviated C
d
s ,s̄
s̄ ,s̄
C
C
t r
t
r
C s ,s̄ (ξ, ¯
ξ) = E Z s Z s̄ = limn→∞ n−1 st> s̄r , and so on.

Initial condition for LastState If we use the last state for output, then the initial conditions are
0

r

T

T̄

t

0

C s ,s̄ = C s ,s̄ = 0
Ds ,s̄ = σv2
D

sT ,s̄r

=D

st ,s̄T̄

but

= 0,

for all other r, t.

st ,s̄r

Here, the initial condition for D
reflects the fact that only the last state is used for output. This
t r
initial condition in fact implies that most Ds ,s̄ are 0 by a simple induction:
−i

i 6= j =⇒ Ds
−i

where s

T −i

=s

−j

, s̄

T̄ −j

= s̄

,s̄−j

=0

.

Initial condition for AvgPool If instead of projecting the last state, we project the average of all
states to get the output, then the initial condition for D is
T

r

t

T̄

Ds ,s̄ = Ds ,s̄ = σv2 , ∀r, t
In this case we can’t zero out the majority of D like the above.
NTK To compute the NTK, we apply Eq. (12) to get
¯ =
Θ̊(ξ, ξ)

T
−1 T̄
−1
X
X

Dg

t+1

,ḡ r+1

t

r

C s ,s̄ +

t=1 r=1

T
X T̄
X

t

Dg ,ḡ

t=1 r=1

r

T̄
T
T
T
ξ t ξ¯r X X gt ,ḡr
D
+ C s ,s̄
+
d
t=1 r=1

where the terms in the sum are resp. contributions from W, U, b, and v. As noted above, if the output
depends only on the last state, then the double sum above can be replaced with a single sum over the
−i −i
diagonal Ds ,s̄ .
E.3

Convolution Neural Network

We continue the notation of the Convolution section of Appendix D. We consider a convolutional
neural network with width n, with feature map positions given by P , and with convolutional kernel
positions K, throughout the network. For example, K can be {−1, 0, 1} × {−1, 0, 1}, and P can be
[32] × [32]. For simplicity, we forgo bias. Let xl = {xls ∈ Rn : s ∈ P } and hl = {hls ∈ Rn : s ∈ P }
be the activations and preactivations of layer l. Let W l = {Wκl : κ ∈ K} be the layer l weights. The
input ξ = {ξs ∈ Rd : s ∈ P } to the network is an image with d = 3 channels and has pixel positions
P . Then the network computation proceeds by
X
x0s (ξ) = ξs ,
hls (ξ) =
Wκl xl−1
xls (ξ) = φ(hls (ξ)),
s+κ (ξ),
κ
l
2
for l = 1, . . . , L, where the sum is over κ such that s + κ ∈ P . We sample Wκαβ
∼ N (0, σw
/n) for
1
2
l = 2, . . . , L, and Wκαβ
∼ N (0, σw
/d). For the output, we will consider both

Global Average Pooling (GAP) where output of network is given by
1 X 1 > L
√ v xs
f (ξ) =
|P |
n
s∈P

for vα ∼ N (0, σv2 ) and
33

Vectorization where output of network is given by
1 X 1 > L
√ vs x s
f (ξ) = p
|P | s∈P n
for output weights v = {vs ∈ Rn : s ∈ P } sampled like vsα ∼ N (0, σv2 ). This is called
“vectorization” because it’s equivalent to a linear readout of the flattening (vectorization) of
final layer embeddings xL = {xL
s : s ∈ P }.
Forward Propagation Given another input ξ¯ = {ξ¯s ∈ Rd : s ∈ P }, we define h̄ls = hls ( ¯
ξ), x̄ls =
l ¯
xs (ξ) similarly. Then by the N ETSOR> Master Theorem (Theorem 7.2), there exist some determinl
l
¯ C xls ,x̄lt (ξ, ξ),
¯ such that
istic scalars C hs ,h̄t (ξ, ξ),
l

a.s.

l

l

def

l

l
hl>
−→ E Z hs Z h̄t = C hs ,h̄t (ξ, ¯
ξ)
s h̄t /n −
l
l def
l
l
a.s.
l
¯
xl>
−→ E Z xs Z x̄t = C xs ,x̄t (ξ, ξ),
s x̄t /n −
0
0
0
¯ def
for all s, t ∈ P, l = 1, . . . , L. For convenience, we also define C xs+κ ,x̄t+κ (ξ, ξ)
= x0>
s+κ x̄t+κ /d. As
in Eq. (26) and in the MLP case, these scalars are related to each other through a recurrence: for
l = 1, . . . , L,

 hl ,hl
l
l
¯
l
l
C s s (ξ, ξ) C hs ,h̄t (ξ, ξ)
C xs ,x̄t (ξ, ¯
ξ) = E φ(ζ)φ(ζ̄), (ζ, ζ̄) ∼
l
l
l
l
C hs ,h̄t (ξ, ¯
ξ) C h̄t ,h̄t ( ¯
ξ, ¯
ξ)
X
l−1
l−1
l
l
¯ = σ2
¯
C hs ,h̄t (ξ, ξ)
C xs+κ ,x̄t+κ (ξ, ξ).
w

κ
def √

Backpropagation Define dhls =
f proceed as follows.

def √

n∇hls f (ξ), dh̄ls =

ξ). Then, the backpropagation of
n∇h̄ls f ( ¯

dhls = dxls φ0 (hls )
X
dxl−1
=
Wκl> dhls−κ .
s
κ

By the N ETSOR> Master Theorem (Theorem 7.2), there exist some deterministic scalars
l
l
¯ Dxls ,x̄lt (ξ, ξ)
¯ such that
Dhs ,h̄t (ξ, ξ),
l
l def
l
l
a.s.
l
¯
dhl>
−→ E Z dhs Z dh̄t = Dhs ,h̄t (ξ, ξ)
s dh̄t /n −

a.s.

l

l

l

def

l

l
dxl>
−→ E Z dxs Z dx̄t = Dxs ,x̄t (ξ, ¯
ξ),
s dx̄t /n −

for l = L, . . . , 1. These scalars are related to each other through a recurrence: As in the MLP case,
we have, for l = L, . . . , 1,

 hl ,hl
l
l
¯
C s s (ξ, ξ) C hs ,h̄t (ξ, ξ)
hls ,h̄lt
xls ,x̄lt
0
0
¯
¯
D
(ξ, ξ) = D
(ξ, ξ) E φ (ζ)φ (ζ̄), (ζ, ζ̄) ∼
l
l
¯ C h̄lt ,h̄lt (ξ,
¯ ξ)
¯ .
C hs ,h̄t (ξ, ξ)
As in Eq. (27), we also have, for l = L, . . . , 2,
l−1

D xs

,x̄l−1
t

¯ = σ2
(ξ, ξ)
w

X

l

l

Dhs−κ ,h̄t−κ .

κ

Now the initial condition for this recurrence depends on whether the network has global average
pooling or not:
 2
σv /|P |2
if GAP
xL
,x̄L
¯
s
t
D
(ξ, ξ) =
σv2 I(s = t)/|P | if vectorization.
l
l
¯ =
Note in the vectorization case, this initial condition implies that, for all l, Dxs ,x̄t (ξ, ξ)
l
l
¯ = 0 if s 6= t.
Dxs ,x̄t (ξ, ξ)

34

NTK Finally, we can decompose the NTK into contributions from ∇v f and from {∇ωκl f }κ,l . If
the last layer involves GAP, then the contribution of ∇v f is
*
+
X
X
X xL> x̄L
1
s
t
−1
¯ =
h∇v f (ξ), ∇v f (ξ)i
|P |−1
xL
x̄L
= |P |−2
s , |P |
t
n
n
s∈P
t∈P
s,t∈P
X
a.s.
−2
xL
,x̄L
¯
s
t
−−→ |P |
C
(ξ, ξ).
s,t∈P

If the last layer involves vectorization, then
¯ =
h∇v f (ξ), ∇v f (ξ)i

X

s∈P
a.s.

¯ = |P |−1
∇vs f (ξ), ∇vs f (ξ)

−−→ |P |

X xL> x̄L
s

s

n

s∈P
−1

X

C

L
xL
s ,x̄s

¯
(ξ, ξ).

s∈P

For l > 1, the contribution of ∇ωκl f is
*
+
l−1
X
X
X dhl> dh̄l xl−1>
s
t s+κ x̄t+κ
−2
l l−1
l l−1
¯
h∇ωκl f (ξ), ∇ωκl f (ξ)i = n
dhs xs+κ ,
dh̄s x̄s+κ =
n
n
s
s
s,t
l−1
l
l
a.s.
¯ xl−1
¯
s+κ ,x̄t+κ (ξ, ξ).
−−→ Dhs ,h̄t (ξ, ξ)C
0>

0

0
0
x
x̄
¯ def
For l = 1, if we define C xs+κ ,x̄t+κ (ξ, ξ)
= s+κd t+κ , we similarly have
*
+
0
X
X
X dh1> dh̄1 x0>
s
t s+κ x̄t+κ
−1 −1
1 0
1 0
¯
h∇ωκ1 f (ξ), ∇ωκ1 f (ξ)i = n d
dhs xs+κ ,
dh̄s x̄s+κ =
n
d
s
s
s,t
1
1
a.s.
¯ x0s+κ ,x̄0t+κ (ξ, ξ).
¯
−−→ Dhs ,h̄t (ξ, ξ)C

Altogether, the NTK is
¯ =
Θ(ξ, ξ)

L X
X

¯ + h∇v f (ξ), ∇v f (ξ)i
¯
h∇ωκl f (ξ), ∇ωκl f (ξ)i

l=1 κ∈K
a.s.

−−→

L XX
X
l=1

κ

D

hls ,h̄lt

l−1
¯ xl−1
¯ +
s+κ ,x̄t+κ (ξ, ξ)
(ξ, ξ)C

s,t

(
P
L L
|P |−2 s,t∈P C xs ,x̄t (ξ, ¯
ξ) if GAP
P
L L
−1
xs ,x̄s
¯
|P |
(ξ, ξ)
else.
s∈P C

Here the sum is over κ ∈ K and s, t ∈ P such that s + κ, t + κ ∈ P .
E.3.1

Vectorized NTK Formula
l

l

Let {ξi }ki=1 be a set of inputs. For l = 1, . . . , L, define the tensors C x , C h ∈ Rk×P ×k×P by
l

def

l

l

l

def

l

l

x
h
Cisjt
= C xs ,x̄t (ξi , ξj ), Cisjt
= C hs ,h̄t (ξi , ξj ). Note that s (and t) is a spatial index that may expand
to double indices if P is 2-dimensional (e.g. P = [32] × [32]). For any tensor C = {Cisjt }isjt ∈
Rk×P ×k×P , define the linear operator
X
def
T (C)isjt =
Ci,s+κ,j,t+κ
κ

where the sum is over κ ∈ K such that s + κ, t + κ are both in P . This operator can be easily
0
implemented via convolution in pytorch or tensorflow. Also define C x ∈ Rk×P ×k×P by
x0
>
Cisjt
= ξis
ξjt /d. Then assuming K = −K 18 ,
l

l

l

C x = Vφ (C h )
D
18

xl−1

2
C h = σw
T (C x

l
2
= σw
T (Dh )

Note, in general when K 6= −K, we have Dx

D
l−1

hl

=D
l

xl

l−1

)
l

Vφ0 (C h ).

2
= σw
T † (Dh ), where T † is the adjoint of T .

35

The initial condition is
xL
Disjt
=

 2
σv /|P |2
if GAP
σv2 I(s = t)/|P | else.
l

l

x
h
Note in the vectorization case, we only need to compute the entries Cisjt
, Cisjt
where s = t, as
everything else will be 0. Finally, the infinite-width NTK is given by
(
P
L
xL
X
|P |−2 s,t∈P Cisjt
if GAP
hl
xl−1
)+
Θ̊ij =
D ◦ T (C
P
−1
xL
|P
|
C
else.
s∈P isjs
l=1
P
where ◦ contracts the s, t indices: (A ◦ B)ij = s,t∈P Aisjt Bisjt .

E.4

Batchnorm

We first detail how to propagate the covariances of activations and of gradients before describing
how we can combine them to compute the NTK. We use the notation of Eq. (28) and let φ̃ denote
batchnorm followed by coordinatewise nonlinearity φ.
Forward Single Batch

If h1 , . . . , hB are the pre-activations of a layer over a batch of size B, and
g 1 , . . . , hB ),
x1 , . . . , xB = relu(h
1

B

then as discussed in Appendix D, this is a valid tensor program. If Z h , . . . , Z h are jointly
1
B
distributed as N (0, Σ), then [62, 68] showed that Z x , . . . , Z x has the 2nd moment matrix Σ0 , Σ0ij =
1

B

E Z x Z x , given by
Σ0 = B

Z ∞
0

Vrelu (ΣG (I + 2sΣG )−1 )
p
ds
det(I + 2sΣG )

(36)

where Vrelu is as in Fact E.2, and ΣG = GΣG, G = IB − B1 11> .
Forward Cross Batch Suppose h̄1 , . . . , h̄B̄ are the pre-activations of a layer over another batch
h1
hB
h̄1
h̄B̄
of 
sizeB̄ (possibly
 B̄ 6= B), such that (Z , . . . , Z , Z , . . . , Z ) is jointly distributed as
Σ Ξ
g h̄1 , . . . , h̄B ). Then the cross-batch moment matrix
N 0,
. Let x̄1 , . . . , x̄B = relu(
Ξ> Σ̄
i

j

Ξ0 , Ξ0ij = E Z x Z x̄ , is given by
Z ∞ Z ∞
p
0
−1
Ξ = B B̄π
ds
dt (st)−1/2 det(IB+B̄ + 2Ω)−1/2 Vrelu (Π)12
0

(37)

0

where
Ω = D1/2




GΣG GΞḠ
D1/2
ḠΞ> G ḠΣ̄Ḡ

Π = D−1/2 Ω(I + 2Ω)−1 D−1/2


sIB
0
D = sIB ⊕ tIB̄ =
0
tI
B̄

G = IB − B

−1

>

11

Ḡ = IB̄ − B̄

−1

11>

and Vrelu (Π)12 is the block of Vrelu (Π) on the first row, second column, of size B × B̄.
1

B

Backward Single Batch Now, suppose dx1 , . . . , dxB are gradients such that Z dx , . . . , Z dx
1
B
are jointly distributed as N (0, ∆) independently from Z h , . . . , Z h . Let dh1 , . . . , dhB =
i
1
g
d relu(dx
, . . . , dxB | h1 , . . . , hB ). Then, by Yang et al. [68], {Z dh }i has 2nd-moment matrix
i
j
∆0 , ∆0ij = E Z dh Z dh , given by
Z ∞
∆0 = B
δ(Λ1 + Λ2 − Λ3 )G ds
(38)
0

36

where
Λ1 = Λ1 (s) = ∆ Vstep (K(s))
1
Λ2 = Λ2 (s) = s2 (h∆, Vrelu (K(s))iK(s) + 2K(s)J(s)K(s))
2
Λ3 = Λ3 (s) = s(K(s)J(s) + J(s)K(s))
and
q
δ(s) = 1/ det(I + 2sΣG )
K(s) = ΣG (I + 2sΣG )−1
†

J(s) =

dVrelu (K(s))
{∆}.
dK(s)
†

(K(s))
(K(s))
Here, dVrelu
is a matrix-to-matrix linear operator, and dVrelu
denotes its adjoint, which
dK(s)
dK(s)
“backprops” a gradient of Vrelu (K(s)) to a gradient of K(s).

Backward
1

Cross
B

Batch Now,
1

suppose

B̄

dx̄1 , . . . , dx̄B  are


(Z dx , . . . , Z dx , Z dx̄ , . . . , Z dx̄ ) are jointly distributed as N
1

B

1

gradients
such that

∆ χ
0,
independently
¯
χ> ∆

B̄

from (Z h , . . . , Z h , Z h̄ , . . . , Z h̄ ). Let
dh̄1 , . . . , dh̄B̄ = d g
relu(dx̄1 , . . . , dx̄B | h̄1 , . . . , h̄B ).
i

(39)

j

Then the cross-batch moment matrix χ0 , χ0ij = E Z dh Z dh̄ , is given by
Z ∞Z ∞
p
χ0 = B B̄
γ G(Γ1 + Γ2 − Γ3 )Ḡ ds dt
0

0

where
Γ1 = Γ1 (s, t) = χ Vstep (Π)12
Γ2 = Γ2 (s, t) = 4st(hVrelu (Π)12 , χiΠ12 + (ΠJΠ)12 )
Γ3 = Γ3 (s, t) = 2(t(JΠ)12 + s(ΠJ)12 )
with A12 denoting the off-diagonal block of A, and
γ = γ(s, t) = π −1 s−1/2 t−1/2 det(IB+B̄ + 2Ω)−1/2


sIB
0
D = D(s, t) =
0
tI
B̄

Ω = Ω(s, t) = D

1/2

ΣD

1/2

Ω(I + 2Ω)−1 D−1/2

† 
dVrelu (Π)
0 χ
{ >
}
J = J(s, t) =
χ
0
dΠ

Π = Π(s, t) = D

−1/2

The backward equations Eqs. (38) and (39) are not explicit in [68] but can be derived from Lemma
H.5, Eq (52), Prop G.8, and Lemma G.10 from [68].
E.4.1

NTK

Because batchnorm turns the neural network into a batch-to-batch function, its infinite-width NTK is
constructed slightly differently than other networks demonstrated in the main text. We summarize its
computation below.
37

Two inputs of the same batch Let x1 , . . . , xB ∈ Rd be a batch of inputs.
Consider a batchnorm-ReLU MLP with L hidden layers and width n. Its forward pass is given by
hli = ω l xl−1
∈ Rn ,
i

g l ) ∈ RB×n ,
xl = relu(h

x1i = ω 1 xi ∈ Rn

l
with weights ωαβ
∼ N (0, 1), and it has output yi = √1n v > xL for parameters v ∼ N (0, 1).

Starting with the Σ0ij = hxi , xj i/d, compute Σl = (Σl−1 )0 , l = 1, . . . L, according to Eq. (36).
Suppose we want to compute the NTK’s value on two inputs xi , xj , possibly the same. Start with
∆L+1 = 12 (δij + δji ) where δij is the matrix with zero everywhere except 1 at the (i, j)th entry.
Then compute ∆l = (∆l+1 )0 , l = L, . . . , 1 according to Eq. (38). Then

Θ̊(xi , xj ) =

L
X

hΣl , ∆l+1 i.

l=0

Two inputs of different batches Let x̄1 , . . . , x̄B ∈ Rd be a second batch of inputs, and compute
Σ̄l , l = 0, . . . , L for them just like how Σl are computed for x1 , . . . , xB ∈ Rd above. In addition,
starting with Ξ0ij = hxi , x̄j i/d, compute Ξl = (Ξl−1 )0 , l = 1, . . . , L, according to Eq. (37).
Suppose we want to compute the NTK’s value on two inputs xi , x̄j from different batches. Start with
χL+1 = δij , compute χl = (χl+1 )0 , l = L, . . . , 1, according to Eq. (39). Then
L
X

Θ̊(xi , x̄j ) =

hΞl , χl+1 i.

l=0

E.5

Transformer

We’ll work with the following transformer variant. Let x01 , . . . , x0T ∈ Rd be a sequence of inputs
(the superscript will be layer index, and the subscript will be token index). Then each layer l of our
transformer computes the following
kil = U l xl−1
∈ Rn
i

yil = Attn(kil , k l , k l ) + kil

zil = L(yil )

gil = W l1 zil

hli = W l2 φ(gil )

xli = L(hli + zil )

where U l , W l1 , W l2 are weights, φ is nonlinearity (e.g. relu), k l = {kjl }Tj=1 and Attn and L are
Attention and Layernorm as in Appendix D. The network outputs a single scalar from the average of
the final embeddings xL
i :
T
1X > L √
v xi / n
o=
T i=1
To compute the Transformer-NTK, we will need to use the (simplified) N ETSOR>+ Master Theorem
(Theorem B.10) due to the presence of Layernorm and Attention.
Setup assume for all α, β ∈ [n],
l1
l2
2
• Wαβ
, Wαβ
∼ N (0, σw
/n) for all l ≥ 1
l
1
• Uαβ
∼ N (0, σu2 /n) for all l ≥ 2 and Uαβ
∼ N (0, σu2 /d)

• vα ∼ N (0, σv2 )
• Assume Layernorm  = 0
Forward pass Suppose we have two sequences {x01 , . . . , x0T } and {x̄01 , . . . , x̄0T }, and we
use ¯
• to denote quantities • computed on the second sequence.
Then we see that
l
l
l
l
l
l
{Z hi , Z h̄j }i,j , {Z gi , Z ḡj }i,j , {Z ki , Z k̄j }i,j are mutually independent sets of random variables, each
of which is jointly Gaussian with zero mean. Their covariances are given by
38

l

l

l

l

l

l

l

l−1

l

l

2
Cov(Z hi , Z h̄j ) = σw
E φ(Z gi )φ(Z ḡj )
l

2
Cov(Z gi , Z ḡj ) = σw
E Z zi Z z̄j
l−1

Cov(Z ki , Z k̄j ) = σu2 E Z xi Z x̄j
In addition,
l

l

Z xi =

l

l

l

l

Z hi + Z zi − E Z hi + Z zi


l
l
std Z hi + Z zi

l

Z zi =

T
X

l

Z yi − E Z yi
l
std(Z yi )

l

Z yi =

l

l

ålij Z kj + Z ki

j=1

where
(åli1 , . . . ,åliT ) = SoftMax(c̊li1 , . . . ,c̊liT ),
l

l

l

l

c̊lij = E Z ki Z kj .

l

We can easily see that E Z hi + Z zi = E Z yi = 0. So we can simplify
l

Z

xli

l

l

Z hi + Z zi
=r 
2 ,
l
l
E Z hi + Z zi

Z

zil

=q

Z yi

.
l

E(Z yi )2

These equations yield a recursive way of computing all random variable Z • associated to vector • in
the forward pass.
Backward pass Backprop is given by the following equations.
1
v
T
dzil = W l1> dgil + dhli

dxL
i =

dgil = φ0 (gil )

dhli = dL(dxli | hli + zil )

W l2> dhli

dxl−1
= U l> dkil
i

dyil = dL(dzil | yil )

and
dkil = dyil + dqi Attn({dyil }i | {kil }i , {kil }i , {kil }i )
+ dki Attn({dyil }i | {kil }i , {kil }i , {kil }i )
+ dvi Attn({dyil }i | {kil }i , {kil }i , {kil }i )
This implies the following equations (via Box 2) for the associated random variables.


l
l
l
l
Z dhi = dL̊ Z dxi | Z hi + Z zi ,



l
l
l
l
l
l
l
Z dyi = dL̊ Z dzi | Z yi , E Z dxi Z dx̄j = σu2 E Z dki Z dk̄j

l
l
l
l
l
l
Z dki = Z dyi + dqi ˚
Attn(Z dy | Z dk , Z dk , Z dk )
l
l
l
dy l
˚
+ dki Attn(Z
| Z dk , Z dk , Z dk )
l
l
l
l
+ dvi ˚
Attn(Z dy | Z dk , Z dk , Z dk )

L

L

l

l

l

l

l

l

l

l

l

l

E Z dxi Z dx̄j = T −2 σv2
l

2
E Z dgi Z dḡj = σw
E Z dhi Z dh̄j E φ0 (Z gi )φ0 (Z ḡj )
l

2
E Z dgi Z dḡj + E Z dhi Z dh̄j
E Z dzi Z dz̄j = σw

l
l
l
l
˚ and dL̊ are as in Eqs. (32) and (34).
where Z dy = {Z dyi }i , Z dk = {Z dki }i , and dAttn

39

Some Simplifications Now we can write




l
l
l
l
l
l
l
l
1
 Center Z dxi − Z xi E Z dxi Z xi

Z dhi = dL̊ Z dxi | Z hi + Z zi =
l
l
std Z hi + Z zi
l

as in Eq. (31). But because of the MatMul rule of 
Box 2, Z dxi is a zero mean
independent
 Gaussian
l
l
l
l
l
l
l
l
from Z xi , and E Z dxi Z xi = 0. Therefore Center Z dxi − Z xi E Z dxi Z xi = Z dxi , and
l

Z dxi

l

Z dhi =



l

l

std Z hi + Z zi

.

Likewise,
l

Z

dyil



= dL̊ Z

dzil

|Z

yil



Z dzi
=
l .
std(Z yi )

˚ and dki Attn
˚ terms in Z dkil depend linearly on {E Z dyil Z kjl }j
Finally, from Eq. (34), the dqi Attn
which vanish again by the MatMul rule of Box 2. Therefore,
l
l
l
l
l
dy l
˚
Z dki = Z dyi + dvi Attn(Z
| Z dk , Z dk , Z dk ) =

X

l

l

ålji Z dyj + Z dyi

j

with ålji as computed in the forward pass.
The complete simplification:
1

l

Z dhi =



std Z

hli

l

+Z

zil

l

 Z dxi

Z dyi =

L
1

 Z dzi
l
std Z zi

l

Z dki =

X

l

l

ålji Z dyj + Z dyi

j

l

l

l

l

l

l

l

l

l

l

l

l

l

l

l

2
E Z dgi Z dḡj = σw
E Z dhi Z dh̄j E φ0 (Z gi )φ0 (Z ḡj )
l

2
E Z dzi Z dz̄j = σw
E Z dgi Z dḡj + E Z dhi Z dh̄j

E Z dxi Z dx̄j = σu2 E Z dki Z dk̄j
As in Yang [62], all nonlinearities of the N ETSOR>+ program (corresponding to nonlinearities and
their derivatives in the network) are parameter controlled, and Assumption B.7 is satisfied. So Master
Theorem holds, and the NTK has a well-defined almost sure limit which is given by Eq. (12). We can
then summarize the above into the following vectorized formulas for computing this NTK limit.
E.5.1

NTK

Suppose we have a collection of M sequences {x0a1 , . . . , x0aT }M
a=1 each with T tokens. We will
use a, b, . . . as sequence indices and i, j, . . . as token indices. We will work with 4-tensors in
RM ×T ×M ×T , which can be also thought of as M × M blocks of T × T matrices.
Notations

For 4-tensor C ∈ RM ×T ×M ×T :

1. BlockDiag(C) is the 4-tensor with BlockDiag(C)aibi = Caibj I(a = b).
2. Diag(C) is the 4-tensor with Diag(C)aibj = Caibj I(a = b)I(i = j).
3. Juxtaposition represents multiplication of tensors reshaped as matrices C C̄
einsum(‘aibj,bjck->aick’, C, C̄).
4. Corr(C) = Diag(C)−1/2 C Diag(C)−1/2 .
5. SoftMax(C) applies SoftMax to C in the last dimension.
40

=

NTK Computation the NTK, as a M × M matrix, is
L

X l
L
l−1
l
l
l
l
1
◦ Cx +
Dk ◦ C x + Dg ◦ C z + Dh ◦ Vφ (C g )
2
T
l=1
P
where X ◦ Y is a matrix for 4-tensors X, Y , with (X ◦ Y )ab = ij Xaibj Yaibj , and the relevant
tensors are computed by
Θ̊ =

Forward:
x0
Caibj
= x>
ai xbj /d
l

C k = σu2 C x

Backward:
L

x
Daibj
= σv2 /T 2

l−1

l

l

l

l

Dh = ∆x Dx ∆x
l

Al = BlockDiag(SoftMax(C k ))
l

l

C y = (Al + I)C k (Al> + I)
l

yil

l

yil

l

l

l

Vφ0 (C g )
l

l

l

l

Dy = ∆z Dz ∆z

∆z = Diag(C )−1/2
l

l

2
Dz = σw
Dg + Dh

C z = Corr(C )
2 z
C g = σw
C

l

2
Dg = σw
Dh

l

l

l

Dk = (Al> + I)Dy (Al + I)

l

Dx

l

l

l

l

l

l

l

l

l−1

= σu2 Dk

l

2
C h = σw
Vφ (C g )

C x = Corr(C h + C z )
∆x = Diag(C h + C z )−1/2

F

Theoretical Tools

We will use the following trivial but useful fact repeatedly.
Lemma F.1. For an integer m, and complex numbers ai ∈ C, i ∈ [k],
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

Proof. Expand the power in the LHS using the multinomial theorem, apply AM-GM to each summand, and finally aggregate using triangle inequality.
F.1

Probability Facts

This section is largely the same as section G.1 of Yang [62]. All proofs can be found there.
d

Notations Given two random variables X, Y , and a σ-algebra A, the notation X =A Y means that
for any integrable function φ and for any random varible Z measurable on A, E φ(X)Z = E φ(Y )Z.
We say that X is distributed as (or is equal in distribution to) Y conditional on A. In case A is
d
d
a.s.
the trivial σ-algebra, we just write X = Y . The expression X −
→ Y (resp. X −−→ Y ) means X
converges to Y in distribution (resp. almost surely).
Lemma F.2. Let {Xn }n≥1 be a sequence of random variables with zero mean. If for some p ∈ N
and for all n, E Xn2p ≤ cn−1−ρ , for some ρ > 0, then Xn → 0 almost surely.
The following is a standard fact about multivariate Gaussian conditioning
n1
Proposition F.3. Suppose Rn1 +n2 3 x ∼ 
N (µ, K), where
 we partition x = (x1 , x2 ) ∈ R ×
d
K
K
Rn2 , µ = (µ1 , µ2 ) ∈ Rn1 × Rn2 , and K = K11 K12 . Then x1 =x2 N (µ|x2 , K|x2 ) where
21
22
+
µ|x2 = µ1 − K12 K22
(x2 − µ2 )
+
K|x2 = K11 − K12 K22
K21 .

41

Lemma F.4 (Stein’s lemma). For jointly Gaussian random variables Z1 , Z2 with zero mean, and
any function φ : R → R where E φ0 (Z1 ) and E Z1 φ(Z2 ) exists, we have
E Z1 φ(Z2 ) = Cov(Z1 , Z2 ) E φ0 (Z2 ).
Lemma F.5. Let Φ : Rn → R be measurable. Then for z ∼ N (ζ, Σ), the following Hessian and
gradient matrices are equal:
d
d2
E Φ(z) = 2
E Φ(z)
2
dζ
dΣ
whenever both sides exist.
F.2

Gaussian Conditioning Trick

Review of Moore-Penrose Pseudoinverse Let A+ denote the Moore-Penrose pseudo-inverse of a
matrix A.
Lemma F.6. Let A ∈ Rn×m be a matrix with random Gaussian entries, Aij ∼ N (0, σ 2 ). Consider
fixed matrices Q ∈ Rm×q , Y ∈ Rn×q , P ∈ Rn×p , X ∈ Rm×p . Suppose there exists a solution in A
to the equations Y = AQ and X = A> P . Then the distribution of A conditioned on Y = AQ and
X = A> P is
d

⊥
A =Y =AQ,X=A> P E + Π⊥
P ÃΠQ

where
E = Y Q+ + P +> X > − P +> P > Y Q+ ,
⊥
+
+
Ã is an iid copy of A, and Π⊥
P = I − ΠP and ΠQ = I − ΠQ in which ΠP = P P and ΠQ = QQ
are the orthogonal projection to the space spanned by the column spaces of P and Q respectively.

Proof. See Yang [62, Lemma G.7].
F.3

Law of Large Numbers for Images of Weakly Correlated Gaussians

Lemma F.7. Let Π ∈ Rn×n be an orthogonal projection matrix. Then each diagonal entry Πii ∈
[0, 1].
Proof. Because Π = Π2 , we have for each i, Πii =
0 =⇒ Πii ∈ [0, 1].

2
j Πij

P

=⇒ Πii (1 − Πii ) =

2
j6=i Πij ≥

P

Theorem F.8. Let z ∼ N (0, Π) where ΠP
∈ Rn×n is a matrix such that its correlation matrix
−1/2
−1/2
2
C = D
ΠD
, D = Diag(Π), has i<j Cij
≤ R for some constant R as n → ∞. (So
an orthogonal projection matrix of rank n − O(1) satisfies this condition). Consider functions
φi : R → R for each i ∈ [n] with mean µi = Ex φi (x) under x ∼ N (0, Πii ). Suppose each φi
has finite (2p)th centered moment Ex (φi (x) − µi )2p , for x ∼ N (0, Πii ), where p ≥ 6. Then for
Pn
def
Q = n1 i=1 φi (zi ), as n → ∞,
E[(Q − E Q)2p ] ≤ Cn−1.5 max

E

i∈[n] x∼N (0,Πii )

2p

(φi (x) − µi )

for some constant C depending on p and R, but not on n or the functions φi . If in addition, each φi
has finite centered moments of order 2pL for some L > 1, then
v
u n
u1 X
2pL
2p
−1.5+1/L L
t
E[(Q − E Q) ] ≤ Cn
E
(φi (x) − µi ) .
n i=1 x∼N (0,Πii )
Proof. See Yang [64].
42

G

Proof of Main Theorem

In this section, we will give the proof for Theorem A.6 which is equivalent to Theorem 7.2. We
reproduce the statement below
Theorem A.6 (BP-like N ETSOR> Master Theorem). Fix any BP-like N ETSOR> program satisfying
Setup A.5 and with all nonlinearities polynomially-bounded. If g 1 , . . . , g M are all of the G-vars in
the entire program, including all input G-vars, then for any polynomially-bounded ψ : RM → R, as
n → ∞,
n

1
M
1X
a.s.
ψ(gα1 , . . . , gαM ) −−→
E
ψ(Z) =
E
ψ(Z g , . . . , Z g ),
n α=1
Z∼N (µ,Σ)
Z∼N (µ,Σ)

a.s.

1

M

where −−→ means almost sure convergence, Z = (Z g , . . . , Z g ) ∈ RM , and µ = {µ(g i )}M
i=1 ∈
M ×M
RM and Σ = {Σ(g i , g j )}M
are given in Eq. (18). See Fig. 1 for an illustration.
i,j=1 ∈ R
Comparison against N ETSOR Master Theorem [62] We will follow the general outline of the
inductive proof of N ETSOR Master Theorem in Yang [62]. Here, the correlation of a matrix with its
transpose (Remark G.1) causes additional difficulty in proving rank stability and zero stability properties (Appendix G.3) as well as the induction hypothesis (Moments(m)). The main sections dealing
with these difficulties are Appendix G.2 which describes the setup for the induction, Appendix G.4.2
which proves part of rank and zero stability properties, and Appendices G.5.2 and G.5.3 which prove
parts of the inductive step using the law of large numbers for weakly correlated random variables
Theorem F.8.
A Bit of Notation and Terminology Note that, for each n, the randomness of our program specified
by Theorem A.6 comes from the sampling of the input variables. Let U be the product space obtained
from multiplying together the corresponding probability space for each n. Each sample from
this product probability space thus correspond to a sequence {S(n)}n of instantiatiations of input
variables. Below, when we say “almost surely” (often abbreviated “a.s.”), we mean “almost surely
over the probability of U.” We will also often make statements of the form
almost surely (or, a.s.), for all large n,

A(n) is true

where A(n) is a claim parametrized by n. This means that for all but a U-probability-zero set of
sequences {S(n)}n of input variable instantiations, A(n) is true for large enough n. Note that the
order of the qualifiers is very important here.
We induct, but on what? A natural way of going about proving Theorem A.6 is by inducting on
the number of variables in a program. It turns out this is not enough to prove our claim in its full
generality, and it would be more fruitful to perform a simultaneous induction on our claim (Moments)
along with another statement, parametrized by m,
Moments(m) For any polynomially-bounded ψ : Rm → R, as n → ∞,
n

1X
a.s.
ψ(gα1 , . . . , gαm ) −−→
E
ψ(Z).
n α=1
Z∼N (µ,Σ)
CoreSet(m) There exists a “core set” M ⊆ [m] such that,
Basis(m) almost surely, for large enough n, for every iP
∈ [m], there exist unique constants
(not depending on n) {aj }j∈M such that g i = j∈M aj g j . Note the uniqueness
implies that {g i }i∈M is linearly independent.
NullAvoid(m) for every triangular array of Lesbegue measure zero sets {Anα ∈
RM }n∈N,α∈[n] , almost surely for all large enough n, for all α ∈ [n], we have
{gαi }i∈M 6∈ Anα .
In other words, the values {gαi }α∈M of the core set “avoid” Lebesgue measure zero
sets asymptotically. Intuitively, this says that the distribution of these values are not
singular. (Note the LHS depends on n although we are suppressing it notationally)
Let us explain in brief why we need to consider CoreSet satisfying Basis and NullAvoid.
43

• Basis reduces the consideration of Moments to only the core set G-vars, since every other
G-var is asymptotically a linear combination of them.
• When we apply the Gaussian conditioning technique Proposition F.3, we need to reason
about the pseudo-inverse
Λ+ of some submatrix Λ of a covariance matrix. Each entry of Λ is
Pn
1
of the form n α=1 φi (gα1 , . . . , gαm−1 )φj (gα1 , . . . , gαm−1 ) for a collection of polynomially
bounded scalar functions {φi }i . This Λ will be a random variable which converges a.s. to
a.s.
a determinstic limit Λ̊ as n → ∞. It should be generically true that Λ+ −−→ Λ̊+ as well,
which is essential to make the Gaussian conditioning argument go through. But in general,
this is guaranteed only if Λ’s rank doesn’t drop suddenly in the n → ∞ limit. We thus need
to guard against the possibility that g 1 , . . . , g m , in the limit, suddenly concentrate on a small
set on which {φi (g 1 , . . . , g m )}i are linearly dependent. This is where NullAvoid comes in.
It tells us that g 1 , . . . , g m will avoid any such small set asymptotically, so that indeed the
rank of Λ will not drop in the limit.
Proof organization We will show that Moments and CoreSet are true for input variables, as the
base case, and
Moments(m − 1) and CoreSet(m − 1) =⇒ Moments(m) and CoreSet(m)
as the inductive step. By induction, we obtain Moments(M ), which is Theorem A.6.
The base cases are easy and we will dispatch with them immediately after this in Appendix G.1, but
the inductive step is much more complicated, and we will need to set up notation in Appendix G.2.
During this setup, we prove some basic limit theorems using the induction hypothesis. However, the
full generality of these claims requires some consequences of CoreSet, which we call “rank stability”
and “zero stability.” These notions are introduced and proved in Appendix G.3.
We would then finally be able to handle the inductive steps at this point. We first prove
Moments(m − 1) and CoreSet(m − 1) =⇒ CoreSet(m)
in Appendix G.4 because it is easier. Then we prove
Moments(m − 1) and CoreSet(m − 1) =⇒ Moments(m)
in Appendix G.5.
G.1

Base Cases: Moments and CoreSet for Input Variables

Base case: Moments(input vars) Suppose the input variables are x1 , . . . , xk : G(n) (so that
µ ∈ Rk , Σ ∈ Rk×k ). We need to show that for any polynomially-bounded function ψ : Rk → R,
n

1X
a.s.
ψ(x1α , . . . , xkα ) −−→
E
ψ(Z),
n α=1
Z∼N (µ,Σ)
where ψ on the RHS ignores all coordinates corresponding to non-input G-vars. Since µ and Σ
restricted to input variables are just µ and Σ (see Eq. (18)), the RHS expectation is just
E

Z∼N (µ,Σ)

ψ(Z) =

E

Z in ∼N (µ,Σ)

ψ(Z in )

and the almost sure convergence we desire is just a result of the law of large numbers.
Base Case: CoreSet(input vars) Let x1 , . . . , xk be the input G-vars as above. Pick the core set
M to be any subset of [k] such that rank Σ|M = rank Σ. Then it’s straightforward to verify Basis
and NullAvoid.
G.2

Inductive Case: Setup

We now assume Moments(m − 1) and CoreSet(m − 1) and want to reason about g m to show
Moments(m) and CoreSet(m). Suppose
g m := Ah where A : A(n, n) and h : H(n) was introduced by h := φ(g 1 , . . . , g m−1 )
44

(WLOG padding input slots if necessary; if h = g i is a G-var, then just let φ be the projection to the
ith coordinate). For brevity, we will just write g = g m . Consider all previous instances where A or
A> is used:
ĝ i := Aĥi , i = 1, . . . , r, and ǧ j := A> ȟj , j = 1, . . . , s.
Define
def

def

def

def

Ĝ = [ĝ 1 | . . . |ĝ r ] ∈ Rn×r , Ǧ = [ǧ 1 | . . . |ǧ s ] ∈ Rn×s , Ĥ = [ĥ1 | . . . |ĥr ], Ȟ = [ȟ1 | . . . |ȟs ]. (40)
We will also use Ĝ to denote the set of G-vars {ĝ 1 , . . . , ĝ r } when we later write expressions like
Σ(Ĝ, Ĝ). Let B be the σ-algebra spanned by all previous G-vars g 1 , . . . , g m−1 (and hence also all
previous H-vars). Conditioning on B, A is constrained by Ĝ = AĤ, Ǧ = A> Ȟ, and we have by
Lemma F.6,
d

g =B (E + Π⊥
ÃΠ⊥
)h
Ȟ
Ĥ
where
E = ĜĤ + + Ȟ +> Ǧ> − Ȟ +> Ǧ> Ĥ Ĥ +
= Ĝ(Ĥ > Ĥ)+ Ĥ > + Ȟ(Ȟ > Ȟ)+ Ǧ> − Ȟ(Ȟ > Ȟ)+ Ǧ> Ĥ(Ĥ > Ĥ)+ Ĥ > ,

(41)

Ã is an independent copy of A and ΠĤ = Ĥ Ĥ + = Ĥ(Ĥ > Ĥ)+ Ĥ > is the projection to the column
space of Ĥ (likewise for ΠȞ ).
Remark G.1. Note if Trsp is not allowed (as in N ETSOR Master Theorem [62]), then this would
d
simplify a lot to g =B (ĜĤ + + ÃΠ⊥
)h. In particular, compared to the N ETSOR Master Theorem,
Ĥ
we cannot straightforwardly think of g as having iid Gaussian coordinates because of the projection
Π⊥
in front of Ã. Most of the added complexity of this proof of N ETSOR> Master Theorem comes
Ȟ
from this fact.
Remark G.2. On the other hand, with the BP-like assumption, E is roughly equal to ĜĤ + ; see
Lemma G.5. However, this is very far from true when we don’t assume the program is BP-like.
If we define
def

def

q

kΠ⊥
hk2 /n
Ĥ

(42)

y, with y ∼ N (0, In )
g =B ω + σΠ⊥
Ȟ

(43)

ω = Eh,

σ = σA

then
d

For brevity, we will define the following matrices and vectors of fixed dimension
def

Λ̌ = Ȟ > Ȟ/n ∈ Rs×s

def

η̌ = Ǧ> h/n ∈ Rs .

Λ̂ = Ĥ > Ĥ/n ∈ Rr×r

def

def

Γ = Ǧ> Ĥ/n ∈ Rs×r

def

η̂ = Ĥ > h/n ∈ Rr

(44)

Suppose ĥi was introduced by ĥi := φ̂i (g 1 , . . . , g M ), and ȟj was introduced by ȟj :=
φ̌j (g 1 , . . . , g M ), where φ̂i and φ̌j depend at most on g 1 , . . . , g m−1 . By induction hypothesis
˚
Moments(m − 1), Λ̂, Λ̌, Γ, η̂, η̌ all converge a.s. to corresponding limit values Λ̂, ˚
Λ̌, ˚
η̂, since their
1
m−1
entries are moments of Z , . . . , Z
:
a.s. ˚ def
Λ̂ij −−→ Λ̂ij = E φ̂i (Z)φ̂j (Z) = (σA )−2 Σ(ĝ i , ĝ j )
a.s.
def
Λ̌ −−→ ˚
Λ̌ = E φ̌i (Z)φ̌j (Z) = (σ )−2 Σ(ǧ i , ǧ j )
ij

ij

A

a.s.

def
η̂i −−→ ˚
η̂i = E φ̂i (Z)φ(Z) = (σA )−2 Σ(ĝ i , g)
a.s.

a.s.

and Γ −−→ 0, η̌ −−→ 0 because, by the BP-like assumption, Ǧ is odd in some input G-vars v 1 , . . . , v k
independent from all other input G-vars, so that the limiting expectation is 0.
˚
It turns out that, as a consequence of Lemma G.6 below, a.s. for all large enough n, rank Λ̂ = rank Λ̂
and rank Λ̌ = rank ˚
Λ̌. Therefore, as pseudoinverse is continuous on matrices of fixed rank, we get
the following proposition
45

a.s. ˚
a.s.
Proposition G.3. Λ̂+ −−→ Λ̂+ and Λ̌+ −−→ ˚
Λ̌+ .

Using this proposition, we compute the limits of the conditional mean ω and variance σ 2 .
a.s.

def

Lemma G.4. σ 2 −−→ σ̊ 2 = Σ(g, g) − Σ(g, Ĝ)Σ(Ĝ, Ĝ)+ Σ(Ĝ, g)
Proof. Note that
2
σ2
σ2
σA
(h> h − h> ΠĤ h) = A (h> h − h> Ĥ(Ĥ > Ĥ)+ Ĥ > h) = A (h> h − η̂ > Λ̂+ η̂).
n
n
n
2
Because φ is polynomially-bounded, so is φ(z) as well. By induction hypothesis,

σ2 =

n
1 >
1X
a.s.
−2
φ(gα1 , . . . , gαm−1 )2 −−→
h h=
E
φ(Z)2 = σA
Σ(g, g).
n
n α=1
Z∼N (µ,Σ)
a.s.
a.s. ˚
a.s. ˚
Likewise, η̂ −−→ ˚
η̂ and Λ̂ −−→ Λ̂. By Proposition G.3, Λ̂+ −−→ Λ̂+ . Combining all of these limits
together yields the desired claim.
def
a.s.
def ˚
Lemma G.5. Let v = Λ̂+ η̂, so that v −−→ v̊ = Λ̂+˚
η̂. Then for some vector ε̂ ∈ Rr , ε̌ ∈ Rs that go
to 0 a.s. with n, ω = Eh = Ĝ(v̊ + ε̂) + Ȟ ε̌

Proof. Using Eqs. (41) and (44), we can re-express ω as
ω = ĜΛ̂+ η̂ + Ȟ Λ̌+ η̌ − Ȟ Λ̌+ ΓΛ̂+ η̂.
a.s.

a.s.

def

a.s.

Because Γ −−→ 0, η̌ −−→ 0 as discussed above, we can set ε̌ = Λ̌+ η̌ − Λ̌+ ΓΛ̂+ η̂, so that ε̌ −−→ 0.
a.s. ˚
def
a.s.
In addition, by Proposition G.3, Λ̂+ −−→ Λ̂+ , so that setting ε̂ = v − v̊, we get ε̂ −−→ 0.

Altogether, we have
ω = Ĝ(v̊ + ε̂) + Ȟ ε̌
as desired.
G.3

Rank Stability and Zero Stability

In this section, we prove the following consequence of CoreSet(m − 1) and Moments(m − 1).
Lemma G.6 (Rank Stability). For any collection of polynomially-bounded functions {ψj : Rm−1 →
R}lj=1 , let K ∈ Rl×l be the random matrix (depending on n) defined by
n

Kij =

1X
ψi (gα1 , . . . , gαm−1 )ψj (gα1 , . . . , gαm−1 ).
n α=1

By Moments(m − 1),
a.s.

K −−→ K̊
for some matrix K̊ ∈ Rl×l .
1. Then, almost surely, for large enough n,
ker K = ker K̊,

im K = im K̊,

and

rank K = rank K̊.

Here ker denotes null space and im denotes image space.
2. Suppose I ⊆ [l] is any subset such that K̊|I , the restriction of K̊ to rows and columns
corresponding to I, satisfies
|I| = rank K̊|I = rank K̊.
There are unique coefficients {Fij }i∈[l],j∈I that expresses each row of K̊ as linear combinations of rows corresponding to I:
X
∀i ∈ [l], K̊i =
Fij K̊j .
j∈I

46

Then, a.s. for all large n, for all α ∈ [n],
ψi (gα1 , . . . , gαm−1 ) =

X

Fij ψj (gα1 , . . . , gαm−1 ).

j∈I

This will be primarily a corollary of the following Lemma G.7.
Lemma G.7 (Zero Stability). If ψ : Rm−1 → R≥0 is a nonnegative function such that
n
1X
a.s.
ψ(gα1 , . . . , gαm−1 ) −−→ 0
n α=1
then, almost surely, for large enough n,
ψ(gα1 , . . . , gαm−1 ) = 0
for all α ∈ [n].
We give the proof of Lemma G.6 now, assuming Lemma G.7.
a.s.

Proof. Let v ∈ Rl be in the null space of K̊, i.e. v > K̊v = 0. Then we also have v > Kv −−→
v > K̊v = 0. But
!2
n
X
1X
>
1
m−1
1
m−1 def
1
m−1
v Kv =
Ψ(gα , . . . , gα ), where Ψ(gα , . . . , gα ) =
vi ψi (gα , . . . , gα )
n α=1
i=1
and Ψ is a nonnegative function. By Lemma G.7, we have that: almost surely, for large enough n,
Ψ(gα1 , . . . , gαm−1 ) = 0 for all α ∈ [n]

=⇒ v > Kv = 0

Claim 1. If we apply this argument to a basis {v 1 , . . . , v t } of ker K̊, then we get,
ker K̊ ⊆ ker K,

a.s. for all large n,
so that

a.s. for all large n, rank K̊ ≥ rank K.
Because the rank function is lower semicontinuous (i.e. the rank can drop suddenly, but cannot
a.s.
increase suddenly), and K −−→ K̊, we also have
rank K̊ ≤ rank K.

a.s. for all large n,

Combined with the above, this gives the desired result on rank. The equality of null space then
follows from the equality of rank, and the equality of image space follows immediately, as the image
space is the orthogonal complement of the null space.
Claim 2. If we apply the above argument to each v i defined by inner product as
X
def
∀x ∈ Rl , x> v i = xi −
Fij xj ,
j∈I
i

(note that only for i 6∈ I is v nonzero), then we have, a.s. for large n, v i> Kv i = 0, or
X
ψi (gα1 , . . . , gαm−1 ) =
Fij ψj (gα1 , . . . , gαm−1 ).
j∈I

In the rest of this section, we prove Lemma G.7. It helps to first show that the linear relations given
in Basis carries over to the n → ∞ limit.
Proposition G.8. Let Σ|M be the submatrix of Σ with rows and columns corresponding to
{g i : i ∈ M}. Then rank Σ = rank Σ|M = |M|. Furthermore, if Z = (Z 1 , . . . , Z m−1 ) ∼
N (µ|m−1 , Σ|m−1 ), where µ|m−1 , Σ|m−1 are the restrictions of µ, Σ to g 1 , . . . , g m−1 , then for each
i,
X
d
Zi =
aj Z j
j∈M

where {aj }j∈M are the coefficients corresponding to g i given in Basis.
47

Proof. By Basis property, each g i , i ∈ M, has a set of unique constants {aj }j∈M (independent of
n) such that, almost surely, for large enough n,
X
gi =
aj g j .
j∈M
def

Let ψ(x1 , . . . , xm−1 ) = (xi −

j 2
j∈M aj x ) . Then by Basis(m − 1) and Moments(m − 1),

P

n

1X
a.s.
ψ(gα1 , . . . , gαm−1 ) −−→
E
ψ(Z) = 0.
n α=1
Z∼N (µ|m−1 ,Σ|m−1 )
where µ|m−1 , Σ|m−1 are the restrictions of µ, Σ to g 1 , . . . , g m−1 . This implies that for Z =
(Z 1 , . . . , Z m−1 ) ∼ N (µ|m−1 , Σ|m−1 ),
X
d
Zi =
aj Z j .
j∈M

Repeating this argument for all i ∈ [m − 1] implies that {Z j }j∈M is a “spanning set” of
Z 1 , . . . , Z m−1 . Furthermore, by the uniqueness of the coefficients, we also have that {Z j }j∈M is
linearly independent as well. This then implies the rank consequence we want.
Now we show Lemma G.7.
Proof of Lemma G.7. By Moments(m − 1),
n

1X
ψ(gα1 , . . . , gαm−1 ) →
E
ψ(Z).
n α=1
Z∼N (µ|m−1 ,Σ|m−1 )
By Proposition G.8, if Z ∼ N (µ|m−1 , Σ|m−1 ) and Z|M is the part of Z corresponding to M, then
Z|M has density. The law of Z|M (namely N (µ|M , Σ|M ), where µ|M , Σ|M are the restriction of
µ and Σ to M) is absolutely continuous against the Lebesgue measure of RM and vice
versa, so that a set of Lebesgue measure zero is measure zero under N (µ|M , Σ|M ), and
vice versa; and
Z|M is basis of Z. Basis yields a linear function λ such that λ({gαj }j∈M ) = {gαi }m−1
i=1 for all α,
d

almost surely asymptotically, and λ(Z|M ) = Z, so that
E

ψ(Z) =

Z∼N (µ|m−1 ,Σ|m−1 )

E

Z 0 ∼N (µ|M ,Σ|M )

ψ ◦ λ(Z 0 ).

This expectation is 0 by our premise.
Because ψ, and thus ψ ◦ λ, is a nonnegative function, the nullity of the expectation implies that, other
than a set U of N (µ|M , Σ|M )-measure zero, ψ ◦ λ is 0. This set U also has Lebesgue measure zero
as Z|M has density, by our reasoning above.
If in NullAvoid, we set Anα = U for all n and all α ∈ [n], then we get that: almost surely, for all
large enough n, for all α ∈ [n],
{gαi }i∈M 6∈ U ⇐⇒ ψ ◦ λ({gαi }i∈M ) = 0 ⇐⇒ ψ(gα1 , . . . , gαm−1 ) = 0,
as desired.
G.4

Inductive Step: CoreSet(m)

In this section, we show
Moments(m − 1) and CoreSet(m − 1) =⇒ CoreSet(m).
More explicitly, we need to think about whether to add m to the core set M of [m − 1] in order to
maintain the Basis and NullAvoid properties.
We proceed by casework on whether σ̊ = 0.
48

G.4.1

If σ̊ = 0.

We will show that the core set properties are maintained if we don’t add m to the core set.
def

Consider the space L = L2 (N (µ|M , Σ|M )) of square-integrable real functions against the measure
N (µ|M , Σ|M ) defined on RM . Let hφ, ψi = EY ∼N (µ|M ,Σ|M ) φ(Y )ψ(Y ) be the inner product of
this space. Just like in a finite-dimensional inner product space, given a finite collection of functions
S = {ψ i }ki=1 , the orthogonal projection operator ΠS to the span of S (inside L) is given by
k
X

ΠS φ =

ai ψ i ,

i=1

for any φ ∈ L, where
a = Λ+ b ∈ Rk ,
bj = hψ j , φi, b ∈ Rk ,
Λij = hψ i , ψ j i, Λ ∈ Rk×k .
Recall that g = Ah where h was introduced by h := φ(g 1 , . . . , g m−1 ), for some polynomiallybounded φ, and likewise ĝ i = Aĥi where ĥi = φ̂i (g 1 , . . . , g m−1 ), for each i ∈ [r]. By Basis,
we know that, a.s. for large enough n, each of g 1 , . . . , g m−1 is a (unique, constant-in-n) linear
combination of {g j }j∈M . Therefore, we can express
h = φ({g j }j∈M ),

∀i ∈ [r], ĥi = φ̂i ({g j }j∈M )

and

def

for some functions φ, φ̂i ∈ L. For convenience, set S = {φ̂i }i .
One can see then, as in the proof of Lemma G.4,
˚
2
2
σ̊ 2 = σA
(E φ(Z)2 − ˚
η̂ > Λ̂+˚
η̂) = σA
(hφ, φi − hφ, ΠS φi)
˚
by expanding the definition of ˚
η̂ and Λ̂. Therefore, σ̊ = 0 implies that
hφ, φi = hφ, ΠS φi
so that: after changing its values on a set U of measure zero under N (µ|M , Σ|M ) (and thus also
under Lebesgue measure by Lemma G.6), φ is a linear combination of {φ̂i }ri=1 , i.e.
X
∀~x 6∈ U, φ(~x) =
ci φ̂i (~x)
i∈[r]

for some coefficients {ci }i∈[r] . By NullAvoid applied to Anα = U for all n and α ∈ [n], we also
have that: a.s. for large enough n,
X
X
φ(g 1 , . . . , g α ) = φ({g j }j∈M ) =
ci φ̂i ({g j }j∈M ) =
ci φ̂i (g 1 , . . . , g α ),
i∈[r]

i∈[r]

and therefore, under the same condition, (recall A is the matrix giving rise to g in g := Ah)
X
X
g = Aφ(g 1 , . . . , g α ) =
ci Aφ̂i (g 1 , . . . , g α ) =
ci ĝ i .
i∈[r]

i∈[r]

This shows that, if we keep the core set as M, then Basis is still satisfied. Since the core set is not
changing, NullAvoid just follows from the induction hypothesis.
For usage later in the proof of Moments(m), we record our observation here as follows
Lemma G.9. If σ̊ = 0, then there are coefficients {ci }ri=1 independent of n such that a.s. for large
enough n,
X
g=
ci ĝ i .
i∈[r]

49

G.4.2

If σ̊ > 0.

It’s clear that g cannot be in the linear span of {ĝ i }i∈[r] asymptotically, so we will add g to the core
set, and the Basis property follows immediately. In the below, we shall write M for the old core set,
def
and M0 = M ∪ {g} for the new one.
It remains to show NullAvoid for M0 . First, let’s assume that, a.s. for large enough n, Π⊥
has no
Ȟ
zero diagonal entry; we shall show this fact below in Lemma G.10. Because the conditional variance
of gαm given g 1 , . . . , g m−1 is σ 2 (Π⊥
) , and because σ̊ > 0, this assumption implies that, a.s. for
Ȟ αα
all large enough n,
gαm |g 1 , . . . , g m−1 has density for all α ∈ [n].
(45)
By “has density” here, we in particular mean that any Lesbegue measure zero set in R has zero
probability under the conditional distribution of gαm given g 1 , . . . , g m−1 .
Now, assuming Lemma G.10, we prove NullAvoid holds for M0 .
0

Let {Anα ⊆ RM }n∈N,α∈[n] be a triangular array of Lesbegue measure zero sets. For each Anα ,
def

define Bnα = {~x ∈ RM : λ(Anα |~x ) 6= 0}, where Anα |~x = {y ∈ R : (~x, y) ∈ Anα ⊆ RM × R}
is the “slice” of Anα at ~x, and λ is the 1-dimensional Lebesgue measure. Because each Anα has
0
measure zero in RM , necessarily each Bnα also has measure zero in RM . Applying NullAvoid to
the triangular array {Bnα ⊆ RM }n∈N,α∈[n] , we get that: a.s. for large enough n,
∀α ∈ [n], {gαi }i∈M 6∈ Bnα .
Therefore, by Eq. (45), a.s. for large enough n,
∀α ∈ [n], {gαi }i∈M0 6∈ Anα .
This finishes the proof of NullAvoid for M0 , and also CoreSet(m), save for Lemma G.10 below.
Lemma G.10. Almost surely, for large enough n, Π⊥
has no zero diagonal entry.
Ȟ
Λ̌ is full rank. Otherwise, by Lemma G.6(2), we can replace ȟ1 , . . . , ȟs by a
Proof. WLOG, assume ˚
linearly independent spanning set ȟi1 , . . . , ȟik such that 1) each ȟj is almost surely, for all large n, a
linear combination of them and such that 2) their 2nd moment matrix is full rank in the limit. Then
the projection matrix associated to ȟi1 , . . . , ȟik is, almost surely, for all large n, the same as ΠȞ .
By the Sherman-Morrison formula (Fact G.11),

(ΠȞ )αα = f

1 > −1
ȟα Λ̌−α ȟα
n



P
where f (x) = x/(1 + x), ȟα is the column vector (ȟ1α , . . . , ȟsα )> , and Λ̌−α = n1 β6=α ȟβ ȟβ > .
Thus, unless Λ̌−α is singular for some α, all diagonal entries of Π⊥
= I − ΠȞ are nonzero. So it
Ȟ
suffices to show that,
a.s. for large enough n,

Λ̌−α is nonsingular for all α.

To do this, it pays to note that Λ̌−α = Λ̌ − n1 ȟα ȟ>
α , so that
1
1 >
|λmin (Λ̌−α ) − λmin (Λ̌)| ≤ k ȟα ȟ>
ȟ ȟα .
α kop =
n
n α
By Lemma G.12 below (which bounds the max by a high moment),
max

1

α∈n n

a.s.

ȟ>
−→ 0,
α ȟα −

and consequently
a.s.

max |λmin (Λ̌−α ) − λmin (Λ̌)| −−→ 0.

α∈[n]

a.s.
Because Λ̌ −−→ ˚
Λ̌, we know that, a.s. for large enough n, λmin (Λ̌) is bounded away from 0 by a
constant (independent of n). Altogether, this implies that all Λ̌−α are nonsingular, as desired.

50

Fact G.11 (Sherman-Morrison formula). For any nonsingular matrix A ∈ Rl×l and vector a ∈ Rl ,
we have
a> A−1 a
a> (A + aa> )−1 a =
.
1 + a> A−1 a
Consequently, for any full rank matrix H, the αth diagonal entry of its associated projection matrix
ΠH = H(H > H)−1 H > can be written as
(ΠH )αα =

>
Hα (H−α
H−α )−1 Hα>
>
1 + Hα (H−α H−α )−1 Hα>

where Hα is the αth row of H, and H−α is H with the αth row removed.
Lemma G.12. Assume Moments(m − 1). Suppose ψ : Rm−1 → R is polynomially bounded. Then
as n → ∞,
1
a.s.
max |ψ(gα1 , . . . , gαm−1 )| −−→ 0
np α∈[n]
for any p > 0.
Proof. For any q > 0, we have the elementary bound
sX
|ψ(gα1 , . . . , gαm−1 )|q .
max |ψ(gα1 , . . . , gαm−1 )| ≤ q
α∈[n]

α∈[n]

Thus, for any q > 0,
v
u X
1
1
u1
1
m−1
q
max
|ψ(g
,
.
.
.
,
g
)|
≤
|ψ(gα1 , . . . , gαm−1 )|q .
t
α
α
np α∈[n]
np−1/q n
α∈[n]

P
a.s.
Because, by Moments(m − 1), n1 α∈[n] |ψ(gα1 , . . . , gαm−1 )|q −−→ C for some constant C as
n → ∞, the RHS above converges a.s. to 0 as soon as we take q > 1/p, and therefore so does the
LHS.

G.5

Inductive Step: Moments(m)

In this section, we show
Moments(m − 1) and CoreSet(m − 1) =⇒ Moments(m).
More specifically, we will show that for any polynomially-bounded ψ : Rm → R,
n

1X
a.s.
ψ(gα1 , . . . , gαm ) −−→
E
ψ(Z)
n α=1
Z∼N (µ,Σ)
where again on the RHS ψ ignores all coordinates Z m+1 , . . . , Z M (corresponding to g m+1 , . . . , g M ).
By Lemma G.9, if σ̊ = 0, then almost surely, for large enough n, g = g m is just a (fixed) linear
combination of g 1 , . . . , g m−1 , so Moments is trivially true. Therefore, in the below, we assume
σ̊ > 0.

(?)

This assumption will be crucial for our arguments involving smoothness induced by Gaussian
averaging.
To clarify notation in the following, we will write EX [expression] to denote the expectation
over only the randomization in X, and E [ expression| B] to denote the expectation taken over all
randomness except those in B.
51

Proof Plan

Note that
n

1X
ψ(gα1 , . . . , gαm ) −
E
ψ(Z) ≤ A + B + C
n α=1
Z∼N (µ,Σ)
where
n

def

A=

q


1X
)αα
ψ(gα1 , . . . , gαm ) − E ψ gα1 , . . . , gαm−1 , ωα + σz (Π⊥
Ȟ
z
n α=1

n
r
q


X
1X
1
m−1
B=
E ψ gα1 , . . . , gαm−1 , ωα + σz (Π⊥
)
−
E
ψ
g
,
.
.
.
,
g
,
v̊i ĝαi + σ̊z
αα
α
α
Ȟ
z
n α=1 z
i=1
!
n
r
X
X
def 1
E ψ gα1 , . . . , gαm−1 ,
C=
v̊i ĝαi + σ̊z −
E
ψ(Z)
n α=1 z
Z∼N (µ,Σ)
i=1

!

def

with z ∼ N (0, 1). Note that B and C are random variables in B. We will show that each of A, B, C
goes to 0 almost surely, which would finish the proof of Theorem A.6.
a.s.

a.s.

Roughly speaking, A −−→ 0 because of a law of large number, B −−→ 0 because of the smoothness
a.s.
in Ez ψ induced by Gaussian averaging, and C −−→ 0 by induction hypothesis. We start with the last
item, since it’s the easiest.
G.5.1 C Converges Almost Surely to 0
a.s.

In this section we show that C −−→ 0 by a straightforward reduction to the inductive hypothesis.
Let Ẑ 1 , . . . , Ẑ r be the components of Z ∼ N (µ, Σ) corresponding to ĝ 1 , . . . , ĝ r , and let Ẑ be the column vector with these entries. Note that, by Proposition F.3, Z m (corresponding to g m ), conditioned
˚
on Z 1 , . . . , Z m−1 , is distributed as a Gaussian with mean Σ(g, Ĝ)Σ(Ĝ, Ĝ)+ Ẑ = ˚
η̂ > Λ̂+ Ẑ = v̊ > Ẑ
+
and variance Σ(g, g) − Σ(g, Ĝ)Σ(Ĝ, Ĝ) Σ(Ĝ, g) = σ̊. Thus
E ψ(Z) =
Z

=
=

E

Z 1 ,...,Z m−1

E[ψ(Z)|Z 1 , . . . , Z m−1 ]

E

E

Z 1 ,...,Z m−1 z∼N (0,1)

E

Z 1 ,...,Z m−1

ψ(Z 1 , . . . , Z m−1 ,v̊ > Ẑ + σ̊z)

Ψ(Z 1 , . . . , Z m−1 )

def

where we have set Ψ(Z 1 , . . . , Z m−1 ) = Ez∼N (0,1) ψ(Z 1 , . . . , Z m−1 ,v̊ > Ẑ + σ̊z). Ψ is a polynomially bounded function since ψ is. Applying the induction hypothesis to Ψ, we obtain
!
n
r
X
1X
1
m−1
i
E ψ gα , . . . , gα ,
v̊i ĝα + σ̊z
n α=1 z
i=1
n

=


1X
Ψ gα1 , . . . , gαm−1
n α=1

a.s.

−−→

E

Z 1 ,...,Z m−1

Ψ(Z 1 , . . . , Z m−1 )
by induction hypothesis

=

E

E

Z 1 ,...,Z m−1 z∼N (0,1)

ψ(Z , . . . , Z m−1 ,v̊ > Ẑ + σ̊z)
1

= E ψ(Z)
Z

as desired.
G.5.2 A Converges Almost Surely to 0
a.s.

In this section we show A −−→ 0.
52

def

For each α ∈ [n], let ψα (x) = ψ(gα1 , . . . , gαm−1 , ωα + σx), with ω and σ defined in Eq. (42). This
is a random function depending on the randomness of gα1 , . . . , gαm−1 , and it changes with n as well.
def

Also consider the “centered version” of ψα , ψ̃α (x) = ψα (x) − E ψα (x0 ) with expectation taken over
x0 ∼ N (0, (Π⊥
) ) (but not gα1 , . . . , gαm−1 ). Note by Eq. (43),
Ȟ αα
n

d

A =B

1X
ψ̃α (ξα )
n α=1

).
where ξ ∼ N (0, Π⊥
Ȟ
Proof idea. To prove our claim, we will show that, for almost all (i.e. probability 1 in U) sequences
of (g 1 , . . . , g m−1 ) = (g 1 (n), . . . , g m−1 (n)) in n — which we shall call amenable sequences of
g 1 , . . . , g m−1 — we have a moment bound

2λ

E[A |B] =

E

ξ∼N (0,Π⊥
)
Ȟ

!2λ
n
1X
ψ̃α (ξα )
< Cn−1.25
n α=1

(46)

for some large λ and some constant C > 0 depending only on λ and the particular sequence of
{(g 1 (n), . . . , g m−1 (n))}n . Then we apply Lemma F.2 to show that, conditioned on any amenable
sequence, A converges to 0 almost surely over all randomness remaining after conditioning. Since
almost all sequences are amenable, this shows that the convergence is also almost sure without the
conditioning.

The moment bound. For λ ≥ 6 and any q > 1, we first apply Theorem F.8 to get the bound

E
ξ

v
!2λ
u
n
n
u1 X
1X
−1.5+1/q q
t
E ψ̃α (ξα )2λq
ψ̃α (ξα )
≤ cn
n α=1
n α=1

where on both sides ξ ∼ N (0, Π⊥
), and c is a constant depending only on λ and m, but not on n, the
Ȟ
functions ψα , or g 1 , . . . , g m−1 . To obtain Eq. (46), we will show that
n

1X
E ψ̃α (ξα )2λq
n α=1

(47)

is uniformly bounded (in n), almost surely over the randomness of the sequences
{g 1 (n), . . . , g m−1 (n)}n . We take all such sequences to be the amenable sequences. For q > 4, we
then get the desired moment bound Eq. (46).
It remains to show the almost sure uniform boundedness.

Almost sure uniform boundedness. Intuitively, Eq. (47) should converge almost surely to a
deterministic value by applying some version of the induction hypothesis, so it should be almost
surely uniformly bounded in n. The obstacle is that ξα is not purely a function of gα1 , . . . , gαm−1 , and
a priori it is not clear how to apply the induction hypothesis in a straightforward way. We thus first
def
process Eq. (47) a bit. Let µα = Ex∼N (0,(Π⊥ )αα ) ψα (x). Then, abbreviating E for expectation taken
Ȟ

53

over ξ ∼ N (0, Π⊥
), we have the following inequalities of random variables in B:
Ȟ
n
n
1X
1X
E ψ̃α (ξα )2λq =
E(ψα (ξα ) − µα )2λq
n α=1
n α=1

≤

n

1 2λq−1 X 
E ψα (ξα )2λq + µ2λq
2
α
n
α=1

by Lemma F.1
≤

n
X

1 2λq
2
E ψα (ξα )2λq
n
α=1

q
by power mean inequality µα ≤ 2λq E ψα (ξα )2λq
=

n
1 2λq X
2
E ψ(gα1 , . . . , gαm−1 , ωα + σξα )2λq .
n
α=1

Suppose, WLOG, that ψ is polynomially bounded by an inequality |ψ(x)| ≤ Ckxkpp + c for some
p, C, c > 0. In the below, we will silently introduce constants C1 , C2 , . . . via Lemma F.1 and merge
with old constants, such that they will only depend on λ, p, q. Continuing the chain of inequalities
above
n
n
X
2λq
1
1X
E ψ̃α (ξα )2λq ≤ c + C22λq
E |gα1 |p + . . . + |gαm−1 |p + |ωα + σξα |p
n α=1
n
α=1
≤c+
≤c+

n
X
2λq
1
C1
E |gα1 |p + . . . + |gαm−1 |p + |ωα |p + |σξα |p
n α=1
n
X
1
C2
|g 1 |2λqp + . . . + |gαm−1 |2λqp + |ωα |2λqp + E |σξα |2λqp .
n α=1 α
(48)

We now proceed to show that the summands of Eq. (48) are almost surely uniformly bounded, which
a.s.
finishes our proof of A −−→ 0.
• By induction hypothesis,
n

1X
E |gα1 |2λqp + . . . + |gαm−1 |2λqp
n α=1
almost surely converges to a deterministic value, so that it is almost surely uniformly
bounded in n.
a.s.
• In addition, σ −−→ σ̊, so that, almost surely, for large enough n, σ ≤ σ̊ + 1. (The order of
the qualifiers is important here; in general this statement cannot be made uniformly in n).
Therefore, almost surely, for large enough n,
n
n
1X
1X
E |σξα |2λqp ≤
|σ̊ + 1|2λqp E |ξα |2λqp .
n α=1
n α=1

This is almost surely uniformly bounded in n because Var(ξα ) = (Π⊥
) ∈ [0, 1] for all α
Ȟ αα
by Lemma F.7.
Pn
• It remains to bound n1 α=1 |ωα |2λqp . We extract our reasoning here into the Lemma G.13
a.s.
below, as we will need to reuse this for later. This finishes the proof of A −−→ 0.
Lemma G.13. For any polynomially bounded function ϕ : R → R,
n

1X
|ϕ(ωα )|
n α=1
is almost surely uniformly bounded in n.
54

Proof. It suffices to prove this for ϕ(x) = |x|d for any d > 0.
Expanding ω according to Lemma G.5, we get
r
n
n
s
X
1X X i
1X
ĝα (v̊i + ˆi ) +
|ωα |d =
ȟjα ˇj
n α=1
n α=1 i=1
j=1

d

for (fixed dimensional) ˆ ∈ Rr , ˇ ∈ Rs that go to 0 almost surely with n. Applying Lemma F.1, we
get
n
n X
r
X
1X
1
|ωα |d ≤ C3
ĝ i v̊i
n α=1
n α=1 i=1 α

d

+

r
X

d

ĝαi ˆi

+

s
X

d

ȟjα ˇj

.

j=1

i=1

We bound each summand separately.
• By induction hypothesis,
n

r

1X X i
ĝ v̊i
n α=1 i=1 α

d

converges a.s. to a deterministic value, so it is a.s uniformly bounded in n.
Pr
• P
By the a.s. decaying property of ˆ, we have almost surely, for large enough n, | i=1 ĝαi ˆi | ≤
r
i
i=1 |ĝα | (again, the order of qualifier is very important here). By induction hypothesis,
!d
n
r
1X X i
|ĝ |
n α=1 i=1 α
converges a.s. to a deterministic value, yielding the a.s. uniformly-boundedness of it and of
n

r

1X X i
ĝ ˆi
n α=1 i=1 α

d

.

• Likewise, because for each j, ȟj is a polynomially-bounded function of g 1 , . . . , g m−1 19 ,
the summands of

d
s
n
1 X X j 
|ȟ |
n α=1 j=1 α
are polynomially-bounded functions of g 1 , . . . , g m−1 too. So by induction hypothesis, this
sum converges a.s., implying the a.s. uniform boundedness of it and
n

s

1X X j
ȟ ˇj
n α=1 j=1 α

d

.

G.5.3 B Converges Almost Surely to 0
a.s.

In this section we show B −−→ 0.
19
This is the only place where we need the assumption that all nonlinearities in the program are polynomially
bounded. Otherwise, the compositions of such nonlinearities might not be integrable against the Gaussian
measure

55

def

Some Notations For brevity, we will set dα = (Π⊥
) . In addition, for each α ∈ [n], w ∈ R,
Ȟ αα
τ ≥ 0, let

def
Ψα (w; τ 2 ) =
E
ψ gα1 , . . . , gαm−1 , w + τ z .
z∼N (0,1)

(Here and in all that follows, τ 2 is the square of τ , and the 2 is not an index). This is a random
function, with randomness induced by g 1 , . . . , g m−1 .
Our proof idea is to write
n


1X
Ψα ωα ; σ 2 dα − Ψα
B=
n α=1
≤

1 X
n

2

Ψα ωα ; σ dα



+ Ψα

r
X

!
v̊i ĝαi ;σ̊ 2

i=1
r
X

!
v̊i ĝαi ;σ̊ 2

(49)

i=1

α∈U


1 X
Ψα ω α ; σ 2 d α − Ψα
+
n

r
X

α∈V

!
v̊i ĝαi ;σ̊ 2

(50)

i=1

def

where U t V = [n] is a partition of [n] with U = {α : dα < 1/2} and V is its complement. Note
that |U | ≤ 2 rank Ȟ ≤ 2s is uniformly bounded in n. We then show each summand of Eq. (49) goes
to 0 a.s. independently. Finally we use the smoothness of Ψα (Eq. (52)) induced by the Gaussian
averaging in Ψα to show each summand of Eq. (50) is almost surely o(1/n), finishing the proof.
Eq. (49) converges to 0 a.s. We first look at the term
!
!
r
r
X
X
|U |
1 X
i
i
2
2
≤
v̊i ĝα ;σ̊
Ψα
v̊i ĝα ;σ̊
max Ψα
n
n α∈[n]
i=1
i=1
α∈U
v
!q
u X
r
X
2s u
1
q
i
2
t
≤ 1−1/q
Ψα
v̊i ĝα ;σ̊
n
n
i=1

(51)

α∈[n]


Pr
i
2 q
for any q > 0. Now Ψα
is a fixed (independent of α) polynomially-bounded
i=1 v̊i ĝα ;σ̊
function of gα1 , . . . , gαm−1 , so by induction hypothesis,
!q
r
X
1 X
i
2
Ψα
v̊i ĝα ;σ̊
n
i=1
α∈[n]

is a.s. uniformly bounded in n, so that using a large q ≥ 2, we see Eq. (51) converges a.s. to 0.
Next, we apply a similar reasoning to the other term and obtain
v
u

1 X
2s u 1 X
q
2
Ψα ωα ; σ dα ≤ 1−1/q q
|Ψα (ωα ; σ 2 dα )|
t
n
n
n
α∈U

α∈[n]

We in fact already know that
q
1 X
Ψα ωα ; σ 2 dα
n
α∈[n]

is a.s. uniformly bounded in n from Eq. (48) in Appendix G.5.2, so that
 a.s.
1 X
Ψα ωα ; σ 2 dα −−→ 0
n
α∈U

from which follows the same for Eq. (49).
56

Eq. (50) converges to 0 a.s. As mentioned above, to prove this we will use the following smoothness bound of Ψα , whose proof will be delayed to the end of the section. Suppose, WLOG, that
the polynomially boundedness of ψ presents itself in an inequality |ψ(x)| ≤ Ckxkpp + C, for some
p, C > 0, where p is an integer. This p will appear explicitly in this smoothness bound below.
Lemma G.14 (Smoothness of Ψα ). Let w, ∆w ∈ R, τ 2 , ∆τ 2 ∈ R≥0 . Then
Ψα (w + ∆w; τ 2 + ∆τ 2 ) − Ψα (w; τ 2 )


≤ R(|∆w| + ∆τ 2 )(1 + τ −2 ) Sα + |w|p + |∆w|p + τ p + (∆τ 2 )p/2
(52)
for some constant R > 0, and where
def

Sα = 1 + |gα1 |p + · · · + |gαm−1 |p .
To bound Eq. (50), first we expand
ωα =

r
X

ĝαi (v̊i + ˆi ) +

i=1

s
X

ȟjα ˇj

j=1

where, by Lemma G.5, ˆ ∈ Rr , ˇ ∈ Rs are vectors that go to 0 almost surely with n. Then we apply
the smoothness bound Eq. (52) to get, for each α ∈ V
!
r
X


2
i
2
Ψα ωα ; σ dα − Ψα
v̊i ĝα ;σ̊
≤ R 1 + min(σ 2 dα ,σ̊ 2 )−1 Xα Yα
i=1


≤ R 1 + min(σ 2 /2,σ̊ 2 )−1 Xα Yα
using the fact that dα ≥ 1/2, ∀α ∈ V . Here
r
X
def
Xα = |ωα −
v̊i ĝαi | + |σ 2 dα − σ̊ 2 |
i=1

=

r
X

ĝαi ˆi +

i=1
def

s
X

ȟjα ˇj + |σ 2 dα − σ̊ 2 |

j=1

p

Yα = Sα + |ωα | +

r
X

ĝαi ˆi +

i=1

s
X

p

ȟjα ˇj

+ max(σ 2 dα ,σ̊ 2 )p/2 + |σ 2 dα − σ̊ 2 |p/2 .

j=1

Thus,
!
r
X

1 X
2
i
2
Ψα ωα ; σ dα − Ψα
v̊i ĝα ;σ̊
Eq. (50) =
n
i=1
α∈V
X
1
≤ R 1 + min(σ 2 /2,σ̊ 2 )−1
Xα Yα
n
α∈V
s
s
 1 X
1 X 2
2
2 −1
2
≤ R 1 + min(σ /2,σ̊ )
Xα
Yα .
n
n
α∈V

α∈V

a.s.


Since σ −−→ σ̊ and we have assumed σ̊ > 0 by Eq. (?), we have 1 + min(σ 2 /2,σ̊ 2 )−1 is almost
surely uniformly bounded in n.
Thus, Eq. (50) can be shown to converge a.s. to 0 if we show
s
1 X 2
Yα is a.s. uniformly bounded in n, and
n
α∈V
s
1 X 2 a.s.
Xα −−→ 0
n
α∈V

We prove these two claims in Lemmas G.15 and G.16 below, which would finish our proof of
a.s.
B −−→ 0, and of our main theorem Theorem A.6 as well.
57

Lemma G.15.

q P
1
n

2 a.s.
−→ 0.
α∈V Xα −

Proof. Note that
Xα ≤

r
X

ĝαi ˆi +

i=1

s
X

ȟjα ˇj + |σ̊ 2 − σ 2 | + |σ 2 − σ 2 dα |

j=1

def

= Pα + Qα + Rα .

Then by triangle inequality (in `2 -norm),
s
s
s
s
1 X 2
1 X 2
1 X 2
1 X 2
Xα ≤
Pα +
Qα +
Rα .
n
n
n
n
α∈V

α∈V

α∈V

α∈V

We now show that each term above converges a.s. to 0, which would finish the proof of Lemma G.15.
a.s.

a.s.

• Because ˆ −−→ 0 and ˇ −−→ 0, we have


r
s
X
X
X
X
1
1
 (ĝαi ˆi )2 +
Pα2 ≤ C8
(ȟjα ˇj )2 
n
n
i=1
j=1
α∈V
α∈V


s
r
X
X
X
1
 (ĝαi )2 +
(ȟjα )2 
≤ C8 max{|ˆ
i |, |ˇ
j |} ×
i,j
n
j=1
i=1
α∈V


s
r
X
X
X
1
 (ĝαi )2 +
≤ C8 max{|ˆ
i |, |ˇ
j |} ×
(ȟjα )2 
i,j
n
j=1
i=1
α∈[n]

a.s.

−−→ C8 × 0 × E = 0
where E is the Gaussian expectation that n1
a.s. to, by inductive hypothesis.

P

α∈[n]

P

Ps
r
i 2
j 2
i=1 (ĝα ) +
j=1 (ȟα )



converges

• The quantity Qα actually doesn’t depend on α, so that
s
1 X 2
a.s.
Qα ≤ |σ̊ 2 − σ 2 | −−→ 0
n
α∈V

by Lemma G.4.
2
• Notice Rα
= σ 4 (1 − dα )2 ≤ σ 4 (1 − dα ) because 1 − dα ∈ [0, 1/2]. Thus,

1 X 2
1 X
Rα ≤ σ 4
1 − dα
n
n
α∈V
α∈V
1 X
≤ σ4
1 − dα
n
α∈[n]

= σ4

1
rank Ȟ
n

by the definition that dα = (Π⊥
) . But of course rank Ȟ ≤ s is bounded relative to n.
Ȟ αα
So this quantity goes to 0 (surely) as desired.

Lemma G.16.

q P
1
n

2
α∈V Yα is a.s. uniformly bounded in n.

58

Proof. We have
s
s
s
s
s
1 X 2
1 X 2
1 X
1 X 02
1 X
2p
Yα ≤
Sα +
|ωα | +
Xα +
max(σ 2 dα ,σ̊ 2 )p
n
n
n
n
n
α∈V
α∈V
α∈V
α∈V
α∈V
v
v
v
v
u X
u X
u X
u X
u1
u1
u1
u1
≤t
Sα2 + t
|ωα |2p + t
Xα0 2 + t
max(σ 2 dα ,σ̊ 2 )p
n
n
n
n
α∈[n]

α∈[n]

α∈[n]

where
r
X

def
Xα0 =

ĝαi ˆi +

i=1

s
X

α∈[n]

p

ȟjα ˇj

+ |σ 2 dα − σ̊ 2 |p

j=1

We proceed to show that each of 4 summands above are individually a.s. uniformly bounded in n.
• Sα2 is a polynomially bounded function of gα1 , . . . , gαm−1 , so that by Moments(m − 1),
1 X 2 a.s.
Sα −−→ C
n
α∈[n]

for some constant C, so it is also a.s. uniformly bounded in n.
• By Lemma G.13, we get
1 X
|ωα |2p
n
α∈[n]

is a.s. uniformly bounded in n.
• Using the same reasoning as in the proof of Lemma G.15, one can easily show
1 X 0 2 a.s.
Xα −−→ 0
n
α∈[n]

so it is also a.s. uniformly bounded.
• Since dα ≤ 1, we have max(σ 2 dα ,σ̊ 2 ) ≤ max(σ 2 ,σ̊ 2 ), which is independent of α. Therefore,
1 X
1 X
max(σ 2 dα ,σ̊ 2 )p ≤
max(σ 2 ,σ̊ 2 )p
n
n
α∈[n]

α∈[n]

a.s.

= max(σ 2 ,σ̊ 2 )p/2 −−→ σ̊ p .
Therefore, it is also a.s. uniformly bounded in n.

Finally, we deliver the promised proof of Lemma G.14.
Proof of Lemma G.14. By Lemma F.4, Ψα is differentiable in w, and
∂w Ψα (w; τ 2 ) = τ −1
∂τ 2 Ψα (w; τ 2 ) =

E

z∼N (0,1)

zψ(gα1 , . . . , gαm−1 , w + τ z)

1 −2
τ
E (z 2 − 1)ψ(gα1 , . . . , gαm−1 , w + τ z).
2
z∼N (0,1)

(53)
(54)

Recall that |ψ(x)| ≤ Ckxkpp + C. We will silently introduce constants C1 , C2 , . . . depending only
on p, merging with old constants, typically via Lemma F.1 or by integrating out some integrands
59

depending only on p. With z ∼ N (0, 1),
|∂w Ψα (w; τ 2 )| ≤ τ −1 E |z||ψ(gα1 , . . . , gαm−1 , w + τ z)|
z

≤τ

−1

C E |z| 1 + |gα1 |p + · · · + |gαm−1 |p + |w + τ z|p



z

≤ τ −1 C1 E |z| 1 + |gα1 |p + · · · + |gαm−1 |p + |w|p + τ p |z|p
z

≤ τ −1 C2 1 + |gα1 |p + · · · + |gαm−1 |p + |w|p + τ p .



Similarly,
1 −2
τ E |z 2 − 1||ψ(gα1 , . . . , gαm−1 , w + τ z)|
z
2

≤ τ −2 C3 1 + |gα1 |p + · · · + |gαm−1 |p + |w|p + τ p .

|∂τ 2 Ψα (w; τ 2 )| ≤

Therefore, for any ∆w ∈ R, ∆τ 2 ∈ R≥0 , we have
Ψα (w + ∆w; τ 2 + ∆τ 2 ) − Ψα (w; τ 2 )
Z 1

dt ∆w · ∂w Ψα (w + ∆wt; τ 2 + ∆τ 2 t) + ∆τ 2 · ∂τ 2 Ψα (w + ∆wt; τ 2 + ∆τ 2 t)
=
0

Z 1
≤


dt |∆w| · |∂w Ψα (w + ∆wt; τ 2 + ∆τ 2 t)| + |∆τ 2 | · |∂τ 2 Ψα (w + ∆wt; τ 2 + ∆τ 2 t)|

0

≤ (C2 + C3 )(|∆w| + |∆τ 2 |)
Z 1


dt((τ 2 + ∆τ 2 t)−1/2 + (τ 2 + ∆τ 2 t)−1 ) × Sα + |w + ∆wt|p + (τ 2 + ∆τ 2 t)p/2
0

where for brevity we have set
def

Sα = 1 + |gα1 |p + · · · + |gαm−1 |p ,
which is independent of t.
Since ∆τ 2 ≥ 0, (τ 2 + ∆τ 2 t)−1 ≤ τ −2 , and we get
Ψα (w + ∆w; τ 2 + ∆τ 2 ) − Ψα (w; τ 2 )
Z 1 

≤ C4 (|∆w| + ∆τ 2 )(τ −1 + τ −2 )
dt Sα + |w + ∆wt|p + (τ 2 + ∆τ 2 t)p/2
0

Z 1



dt Sα + |w|p + |∆w|p tp + τ p + (∆τ 2 )p/2 tp/2
0

2
−1
−2
≤ C6 (|∆w| + ∆τ )(τ + τ ) Sα + |w|p + |∆w|p + τ p + (∆τ 2 )p/2
≤ C5 (|∆w| + ∆τ 2 )(τ −1 + τ −2 )

where in the end we have integrated out tp and tp/2 . We finally apply the simplification τ −1 ≤
1
1 −2
by AM-GM to get the desired Eq. (52).
2 + 2τ

60


```

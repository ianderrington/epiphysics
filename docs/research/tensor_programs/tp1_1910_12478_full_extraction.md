---
title: "Tensor Programs I: Wide Feedforward or Recurrent Neural Networks of Any Architecture are Gaussian Processes (arXiv:1910.12478) — Full Text Extraction"
description: >-
  Raw full-text extraction of TP1 in the Tensor Programs series for reproducible computational analysis.
date: 2026-03-21T00:00:00.000Z
draft: true
author:
  name: "epiphysics-open-source"
contentType: article
series: "Tensor Programs Sources"
coverImage:
  url: ./images/tp1_1910.12478.png
  alt: "Mathematical derivations from Tensor Programs series paper TP1"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
feedback:
  enabled: true
---

> [!note]
> Source PDF: `docs/research/tensor_programs/sources/TP1_1910.12478.pdf`
>
> Extracted text: `docs/research/tensor_programs/sources/TP1_1910.12478.txt`
>
> DOI: https://doi.org/10.48550/arXiv.1910.12478

## Full extracted text

```text
arXiv:1910.12478v3 [cs.NE] 8 May 2021

Tensor Programs I:
Wide Feedforward or Recurrent Neural Networks of
Any Architecture are Gaussian Processes

Greg Yang∗
Microsoft Research AI
gregyang@microsoft.com

Abstract
Wide neural networks with random weights and biases are Gaussian processes, as
originally observed by Neal (1995) and more recently by Lee et al. (2018) and
Matthews et al. (2018) for deep fully-connected networks, as well as by Novak
et al. (2019) and Garriga-Alonso et al. (2019) for deep convolutional networks.
We show that this Neural Network-Gaussian Process correspondence surprisingly
extends to all modern feedforward or recurrent neural networks composed of multilayer perceptron, RNNs (e.g. LSTMs, GRUs), (nD or graph) convolution, pooling,
skip connection, attention, batch normalization, and/or layer normalization. More
generally, we introduce a language for expressing neural network computations,
and our result encompasses all such expressible neural networks. This work serves
as a tutorial on the tensor programs technique formulated in Yang (2019) and
elucidates the Gaussian Process results obtained there. We provide open-source implementations of the Gaussian Process kernels of simple RNN, GRU, transformer,
and batchnorm+ReLU network at github.com/thegregyang/GP4A.

1

Introduction

Motivated to understand the Bayesian prior in neural networks (NNs), Neal [41] theoretically showed
that infinitely wide, shallow neural networks with random weights and biases are Gaussian processes
(GPs). He empirically explored this phenomenon over deep networks as well, but this was not proven
rigorously until recently [37, 40, 43, 18], with concrete progress made over the intervening years
[56, 34, 22, 13]. This neural network-Gaussian process correspondence (NN-GP correspondence) has
not only allowed one to transform the implicit prior of NNs into explicit priors that can be understood
analytically [46, 49, 63, 59, 65], but has also created new state-of-the-art kernels by converting from
deep neural networks [37, 43]. Yet, so far the focus has dwelled entirely on multilayer perceptrons
(MLPs) or simple convolutional neural networks (CNNs). As new architectures are created with
blistering speed, a question starts to emerge and reverberate:
Do all infinitely wide, randomly initialized neural networks correspond to Gaussian processes?
Even if the answer is yes, at the current rate where each new architecture warrants its own NN-GP
correspondence paper, theory will never catch up to practice. On a more basic level, what does this
question even mean for recurrent neural networks?
Our Contributions In this paper, we formulate the notion of a Gaussian process with variabledimensional output (see Definition 2.1), and show that feedforward and recurrent neural networks
of standard architectures converge to Gaussian processes in this sense as their widths or number
∗

Please see https://arxiv.org/abs/1910.12478 for the full version of this paper.

33rd Conference on Neural Information Processing Systems (NeurIPS 2019), Vancouver, Canada.

of channels go to infinity, when their weights and biases are randomized. By standard architecture
we mean any architecture that is some composition of multilayer perceptrons (MLPs), recurrent
neural networks (RNNs) (e.g., Long-Short Term Memory (LSTM) [26] or Gated Recurrent Unit
(GRU) [10]), skip connections [24, 27], convolutions [16, 17, 47, 35, 36] or graph convolutions
[8, 25, 15, 38, 14, 31], pooling [35, 36], batch normalization (batchnorm) [28], layer normalization
[1] and/or attention [2, 55]. Even more broadly, we design a new language, N ETSOR , for expressing
neural network computations, and show the GP convergence for all such expressible networks. By
demonstrating that N ETSOR can implement any network of standard architectures, we obtain the
aforementioned results as a corollary. The results for RNNs, batchnorm, layernorm, attention, and
their combination with other layers are new. We open-source reference implementations2 for the GP
kernels of simple RNN, GRU, transformer, and feedforward batchnorm network; see Fig. 3 for an
illustration.
Relation of This Paper with [60] This paper serves several purposes. 1) Introduce the reader
to the tensor programs technique formulated in [60], using the Neural Network-Gaussian Process
Correspondence as motivation. 2) Promote a redesigned set of notations for tensor programs that
hopefully makes the understanding and the application of this technique easier. 3) Prove a more
general version of the Gaussian Process results first presented in [60]. 4) Provide example calculations
and reference implementations2 of the GP kernels for several architectures like the vanilla RNN,
GRU, batchnorm network, and transformers.
We assume the reader has not read [60] and seek to explain all results in elementary terms. However,
we will provide commentary in footnotes throughout the paper on differences from [60].
Regarding 1), this paper will be the first in a series to explain the tensor programs technique, each
covering a more powerful type of tensor programs, and each motivated by specific theorems that can
be proved or calculations made possible by these new tensor programs. In particular, here we will
only talk about tensor programs without matrix transposes. Regarding 3), the results presented here
will supersede all results in [60] concerning Gaussian Processes, with one caveat that here we will
not cover architectures using both a weight W and its transpose W > in its forward pass (but this
result will come for free in a later paper in this series).

2

Gaussian Process with Variable-Dimensional Output

We first clarify the notion of a Gaussian process with variable dimension output.
Definition 2.1 (Gaussian Process). We say a random function f : X → Rm (with fixed dimensional output) is a Gaussian process if for any finite subset {x1 , . . . , xk } ⊆ X, the random vector
(f (x1 ), . . . , f (xk )) ∈ Rm×k is distributed as a km-dimensional Gaussian. If f has variable dimensional output (e.g. f is an RNN), such as when f (x) ∈ Rl(x) for some length function l : X → N 3 ,
then we say f is a Gaussian process ifP
for any finite subset {x1 , . . . , xk } ⊆ X, the random vector
(f (x1 ), . . . , f (xk )) is distributed as a ( i l(xi ))-dimensional Gaussian.
To illustrate a GP with variable-dimensional output, consider a simple RNN that runs on two input
sequences given by the GloVe embeddings [44] 4 of the words of the two sentences
sentence 1 (7 words):
sentence 2 (9 words):

“The brown fox jumps over the dog.”
“The quick brown fox jumps over the lazy dog.”

(?)

A pseudocode is given in Program 2 in Section 4 (ignore the type annotations like G(n), H(n), A(n)
√
for now). The RNN emits a single scalar after reading each token (in Program 2, this is v > sia / n,
where sia is the RNN state after reading the ith token of the ath sentence, and v is the readout layer);
this number takes into account all of the word embeddings read so far. Thus, it will output a total of 7
scalars after reading sentence 1, and a total of 9 scalars after reading sentence 2. To say that this RNN
is a GP would imply that all 7 + 9 = 16 scalars are jointly Gaussian-distributed (corresponding to a
16 × 16 kernel), over the randomness of the weights and biases imbued during initialization. This
2

github.com/thegregyang/GP4A
Q
i.e. f : x∈X Rl(x) is a dependent function
4
The embedding associates each word to a real vector of 100 dimensions such that semantically similar
words are mapped to closer vectors
3

2

is indeed the empirical phenomenon with a width-1000 RNN, and Fig. 2(E) visualizes the the joint
distribution of the last scalars output by the RNN at the end of each sentence. It clearly exhibits a
Gaussian nature, and perfectly fits the theoretically predicted Gaussian distribution (dashed ovals),
which we shall describe in Corollary 5.5.

3

Recap: GP Behavior of a Multilayer Perceptron (MLP)

Before explaining our main results, we first review the argument from prior works [37, 40, 43]
for the GP convergence of a wide MLP with randomly initialized weights and biases, and we also
demonstrate why such an argument is inadequate for RNNs. Consider an MLP with widths {nl }l ,
l
l−1
l
weight matrices {W l ∈ Rn ×n }l , and biases {bl ∈ Rn }l , where l ranges among the layer
numbers of the MLP. Its computation is given recursively as
h1 (x) = W 1 x + b1

and

hl (x) = W l φ(hl−1 (x)) + bl for l ≥ 2.

(1)

l
2
At initialization time, suppose Wαβ
∼ N (0, σw
/nl−1 ) for each α ∈ [nl ], β ∈ [nl−1 ], and
l
2
0
bα ∼ N (0, σb ). Consider two inputs x, x . Conditioned on hl−1 (x) and hl−1 (x0 ), iid for each
α, (hl (x)α , hl (x0 )α ) is distributed as




2
σw
kφ(hl−1 (x))k2
φ(hl−1 (x)) · φ(hl−1 (x0 ))
2
N 0, l−1
+
σ
.
b
φ(hl−1 (x)) · φ(hl−1 (x0 ))
kφ(hl−1 (x0 ))k2
n

If (hl−1 (x)α , hl−1 (x0 )α ) is distributed as N (0, Σl−1 ), iid for each α, then by a law of large number
argument, the covariance matrix above converges to a deterministic limit


φ(z)2
φ(z)φ(z 0 )
l def 2
Σ = σw
E
+ σb2
0
φ(z 0 )2
(z,z 0 )∼N (0,Σl−1 ) φ(z)φ(z )
as the width nl−1 → ∞, making (hl (x)α , hl (x0 )α ) Gaussian distributed as N (0, Σl ). Iteratively
applying this argument for each l yields the result for a deep MLP. A similar logic works for
feedforward CNNs.
Unfortunately, this argument breaks down if the weights {W l }l are tied, i.e. all W l are equal to a
common matrix W , as in the case of an RNN. In this case, when we condition on the preactivations
hl−1 (x), hl−1 (x0 ) of the previous layer, W is no longer conditionally an iid random Gaussian matrix,
and all subsequent reasoning breaks down. We can repair this situation for RNNs in an ad hoc way
via the Gaussian conditioning technique (Lemma G.7), but we prefer to set our sights wider, and deal
with all standard architectures, and more, in one fell swoop. To this end, we develop a framework
based on our new N ETSOR language.

4

N ETSOR : Language for Expressing Neural Network Computation

To show that networks of all standard architectures converge to GPs, we first show that they can be
expressed by the following very general N ETSOR language (see Programs 1 and 2 for examples)5 ,
and then show that any computation expressed this way exhibits GP behavior when its dimensions
are large.
Definition 4.1. 6 N ETSOR programs are straight-line programs, where each variable follows one
of three types, G, H, or A (such variables are called G-vars, H-vars, and A-vars), and after input
variables, new variables can be introduced by one of the rules MatMul, LinComb, Nonlin to be
discussed shortly. G and H are vector types and A is a matrix type; intuitively, G-vars should be
thought of as vectors that are asymptotically Gaussian, H-vars are images of G-vars by coordinatewise
nonlinearities, and A-vars are random matrices with iid Gaussian entries. Each type is annotated by
dimensionality information:
• If x is a (vector) variable of type G (or H) and has dimension n, we write x : G(n) (or
x : H(n)).
5

N ETSOR is a specific kind of tensor program; for other variants, see Appendix E.
We keep the definition here informal in terms of programming language convention to be accessible to the
general machine learning audience. For those with PL background, see Appendix J.
6

3

N ETSOR program 1 MLP Computation on Network Input x
Input: W 1 x : G(n1 )
Input: b1 : G(n1 )
Input: W 2 : A(n2 , n1 )
Input: b2 : G(n2 )
Input: v : G(n2 )
1: h1 := W 1 x + b1 : G(n1 )
2: x1 := φ(h1 ) : H(n1 )
3: h̃2 := W 2 x1 : G(n2 )
4: h2 := h̃2 + b2 : G(n2 )
5: x2 := φ(h2 )√
: H(n2 )
> 2
Output: v x / n2

. layer 1 embedding of input
. layer 1 bias
. layer 2 weights
. layer 2 bias
. readout layer weights
. layer 1 preactivation; LinComb
. layer 1 activation; Nonlin
. MatMul
. layer 2 preactivation; LinComb
. layer 2 activation; Nonlin

• If A is a (matrix) variable of type A and has size n1 × n2 , we write A : A(n1 , n2 ).
G is a subtype of H, so that x : G(n) implies x : H(n). A N ETSOR program consists of the following
three parts.
Input A set of input G- or A-vars.
Body New variables can be introduced and assigned via the following rules (with intuition in italics)
MatMul if A : A(n1 , n2 ) and x : H(n2 ), we can form a G-var via matrix-vector product:
Ax : G(n1 ),

“random iid matrix times a vector is roughly a Gaussian vector.”7

LinComb Suppose x1 , . . . , xk : G(n) are G-vars with the same dimension and a1 , . . . ak ∈
R are constants. Then we can form their linear combination as a G-var:
n
X
ai xi : G(n), “linear combination of Gaussian vectors is Gaussian.”
i=1

Nonlin If x1 , . . . , xk : G(n) are G-vars with the same dimension n and φ : Rk → R, then
φ(x1 , . . . , xk ) : H(n),

“image of Gaussian vector is not always Gaussian”

where φ acts coordinatewise.
8
Output For the purpose
of this paper
√
√ , the output of a N ETSOR program can be any tuple of scalars,
(v 1> y 1 / n1 , . . . , v k> y k / nk ), where v 1 : G(n1 ); . . . ; v k : G(nk ) are some input G-vars
not used elsewhere (and possibly with duplicates v i = v j ), and y 1 : H(n1 ); . . . ; y k : H(nk )
are some H-vars (possibly with duplicates y i = y j ).

Examples Program 1 gives an example of a N ETSOR program representing an MLP computation.
Note that we account for the input x through its embedding W 1 x, not x itself. This is because 1) our
theorems concern the case where all input G-vars are random; in the context of expressing neural
network computation, x is a deterministic input, while W 1 x is a Gaussian vector when W 1 has iid
Gaussian entries; 2) x has a fixed dimension, while we intend all dimensions (like n1 , n2 ) in the
N ETSOR program to tend to infinity, as we’ll describe shortly. Similarly, Program 2 expresses in
N ETSOR the computation of a simple RNN on two separate input sequences; computation on more
input sequences follows the same pattern. Note how weight-sharing is easily expressed in N ETSOR
because we can re-use A-vars arbitrarily. Appendix A shows more examples of standard architectures
in N ETSOR and N ETSOR+ .
More generally, we can allow the nonlinearities in Nonlin to depend on parameters; this will be
necessary to express layernorm and attention (see Appendix A). We capture this idea in a new rule:
7

Beware: in a later paper (and in [60], tensor program general case), we will introduce matrix transpose as
a valid operation, and in that case, Ax can be very far from a Gaussian, and this intuition is no longer correct.
Thus, this intuition is more subtle than it might seem at face value.
8
In general, the output of a tensor program need not be defined, as most of the time we are concerned with
how the H-vars produced over the course of the program interact with each other.

4

N ETSOR program 2 Simple RNN Computation on Two Input Sequences
h̃t1 := W st−1,1 : G(n)
ht1 := h̃t1 + U xt1 + b : G(n)
st1 := φ(ht1 ) : H(n)
// Computation on sequence 2
h12 := U x12 + b : G(n)
s12 := φ(h12 ) : H(n)
h̃22 := W s12 : G(n)
h22 := h̃22 + U x22 + b : G(n)
s22 := φ(h22 ) : H(n)
..
.
h̃r2 := W sr−1,2 : G(n)
hr2 := h̃r2 + U xr2 + b : G(n)
sr2 := φ(hr2 ) : √
H(n)
√
Output: (v > s11
/
n, . . . , v > st1
/ n,
√
√
v > s12 / n, . . . , v > sr2 / n)

// Embeddings of two inputs sequences
Input: U x11 , . . . , U xt1 : G(n)
Input: U x12 , . . . , U xr2 : G(n)
// Weight and bias
Input: W : A(n, n)
Input: b : G(n)
// Readout weights
Input: v : G(n)
// Computation on sequence 1
h11 := U x11 + b : G(n)
s11 := φ(h11 ) : H(n)
h̃21 := W s11 : G(n)
h21 := h̃21 + U x21 + b : G(n)
s21 := φ(h21 ) : H(n)
..
.

Nonlin+ Suppose x1 , . . . , xk : G(n) are G-vars with the same dimension n and θ1 , . . . , θt ∈ R
possibly depend on G-vars already defined. If φ(−; −) : Rk × Rt → R, then
φ(x1 , . . . , xk ; θ1 , . . . , θt ) : H(n),
where φ acts coordinatewise.
Definition 4.2. N ETSOR+ programs are N ETSOR programs allowing Nonlin+ rules.
N ETSOR and N ETSOR+ specify different kinds of tensor programs; in Appendix E we discuss other
kinds that are semantically equivalent. In a future paper, we shall study the effect of allowing matrix
transposes as an operation on A-vars.
Remark 4.3. In this paper, in Nonlin+P
, we will only instantiate θj with continuous functions of
n
“empirical moments” of the form n−1 i=1 ψ(y 1 , . . . , y r ) for some set of G-vars {yi }i . A key
consequence of our scaling limit result is that these “empirical moments” converge almost surely
to a deterministic limit under very general conditions (Theorems 5.4 and C.4), so that φ(−; Θ) is,
under suitable smoothness conditions (Definition C.1), approximately a fixed nonlinearity when n is
large. Thus, we should intuitively treat Nonlin+ as Nonlin but with the nonlinearity determined
automatically by the N ETSOR program itself.
Nonlin+ expands the expressible computation quite broadly, but to keep the main text lean and
focused on the key ideas behind tensor programs, we relegate a more thorough discussion of Nonlin+
in the appendix (see Appendices C, D and I).

5

Computing the GP Kernel from a N ETSOR Encoding of a Neural Network

For readers who wish to be convinced that N ETSOR (or N ETSOR+ ) can express standard architectures,
see Appendix A. In this section, we show that any architecture expressible in N ETSOR and satisfies
some mild conditions will exhibit Gaussian Process behavior in the large width limit.
In this section, we make the following simplifying assumption on the dimensions of the program and
the randomness of the variables.
Assumption 5.1. Fix a N ETSOR program. For simplicity, assume all dimensions in the program are
2
2
equal to n. Suppose for each A-var W : A(n, n), we sample Wαβ ∼ N (0, σW
/n) for some σW
> 0,
in
in
and for each α ∈ [n], we sample, i.i.d., {xα : x is input G-var} ∼ N (µ , Σ ) for some mean µin
and (possibly singular) covariance Σin over input G-vars.
5

The constraint on the dimensions can be removed easily; see Appendix F. This sampling induces
randomness in all variables created in the program, and we shall characterize this randomness shortly.
We first review some notation that will be used immediately.
Notation In this paper, a kernel Σ on a set X is a symmetric function Σ : X × X → R such that
m X
m
X

ci cj Σ(xi , xj ) ≥ 0

i=1 j=1

holds for any m ∈ N, x1 , . . . , xm ∈ X, and c1 , . . . , cm ∈ R. Given a kernel Σ on a set of G-vars,
we will both treat it as matrix and as a function, depending on the context. Function Notation As
a function, Σ(g, g 0 ) is the value of Σ on the pair of G-vars (g, g 0 ). If G = {g 1 , . . . , g k } is a set of
G-vars, then we also denote by Σ(g, G) the row vector {Σ(g, g 1 ), . . . , Σ(g, g k )}. Likewise Σ(G, g)
is the column vector with the same values. If G0 = {g 10 , . . . , g l0 } is another set of G-vars (possible
with overlap with G), then Σ(G, G0 ) is the matrix {Σ(g i , g j 0 ) : i ∈ [k], j ∈ [l]}. Restriction
Notation We also use the “restriction” notation Σ|G to denote the square matrix Σ(G, G) in a more
concise way. Matrix Notation When an association of indices to G-vars is clear from context, we
will also write Σij for the corresponding value of Σ on the pair of ith and jth G-vars. Juxtaposition
implies matrix multiplication, e.g. ΣΩ means matrix product if Ω is a matrix of appropriate size.
Indices Notation We will both use superscripts and subscripts for indices. We will never multiply in
i,b
ib
subscript or superscript, so juxtaposition of indices like Wαβ
is the same as Wα,β
. H-vars as Both
Symbols and Vectors An H-var will be considered both as a symbol (like in Σ(g, g 0 ) above) as well
as the corresponding length n vector (like in Theorem 5.4 below), depending on the context.
Definition 5.2. In the setting of Assumption 5.1, we extend µin and Σin to µ and Σ that resp. take
a single and a pair of G-vars and both output to R. Intuitively, µ specifies the mean coordinate of
a G-var, and Σ specifies the coordinatewise covariance of a pair of G-vars; this is formalized in
Theorem 5.4 below. Index all the G-vars in the program as g 1 , . . . , g M (including input G-vars), in
the order of appearance in the program. For any pair of G-vars g, g 0 (among g 1 , . . . , g M ), we define
recursively
 in
(g)
if g is input
µ
P
P
i
µ(g) =
a µ(y ) if g = i ai y i , introduced by LinComb ,
 i i
0
otherwise

in
0

Σ (g, g )
if g, g 0 are inputs

P
P


i 0

if g = i ai y i , introduced by LinComb
Pi ai Σ(y , g )
P
i
Σ(g, g 0 ) =
if g 0 = i ai y i , introduced by LinComb
i ai Σ(g, y )


2

σW
EZ φ(Z)φ̄(Z) if g = W h, g 0 = W h0 , introduced by MatMul w/ same A-var W


0
otherwise
(2)
where
• y i are G-vars for all i
• (h : H(n)) was introduced by the Nonlin with h := φ(g 1 , . . . , g M ), h0 was introduced by
Nonlin with h0 := φ̄(g 1 , . . . , g M ) (where WLOG we have padded the input slots of φ and
φ̄ to account for all G-vars)
• Z ∼ N (µ, Σ) is a random Gaussian vector with 1 entry for each G-var in the program.
Note that since φ and φ̄ only depends on entries of Z corresponding to previous G-vars, the expectation
EZ φ(Z)φ̄(Z) only depends on entries of µ and Σ already defined, so there is no circular logic in
this recursive definition of µ and Σ. See Appendix B.1.1 for a simple, worked-out example of how to
recursively compute µ and Σ for Program 1.
For our main theorems, we isolate a very general class of nonlinearities that we are concerned with.
Definition 5.3. We say a function φ : Rk → R is controlled if |φ(x)| is bounded by a function of the
2−
form eCkxk +c with C, c,  > 0
6

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

Figure 1: An illustration of the N ETSOR Master Theorem Theorem 5.4.
Controlled functions can explode faster than exponential but are still L1 and L2 -integrable against
Gaussian measures. Additionally, there is no constraint on the smoothness of φ here. Thus this
definition captures almost all functions we would care about in practice.
The metric structure of the final layer representations of inputs under a deep neural network often
reveals semantical information about the inputs. This structure is reflected in the inner products
between pairs of such representations, e.g. st1> sr2 /n for st1 and sr2 in Program 2. The following
Master Theorem allows one to compute such inner products, and much more, for a wide network at
def
initialization time (take ψ below to be ψ(z 1 , . . . , z M ) = z M −1 z M ).
Theorem 5.4 (N ETSOR Master Theorem). 9 Fix any N ETSOR program satisfying Assumption 5.1
and with all nonlinearities controlled. If g 1 , . . . , g M are all of the G-vars in the entire program,
including all input G-vars, then for any controlled ψ : RM → R, as n → ∞,
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
(2).
See
Fig.
1
for
an
illustration.
i,j=1
Intuitively, Theorem 5.4 says, for each α, (gα1 , . . . , gαM ) ≈ N (µ, Σ) in the large n limit, and each
α-slice appears to be “iid” from the point of view of the empirical average by any controlled function
ψ. The proof of Theorem 5.4 is given in Appendix H.
Combining Theorem 5.4 with Proposition G.4, we can straightforwardly calculate the output distribution of a N ETSOR program.
Corollary 5.5 (Computing the GP Kernel).√ Adopt the same
√ assumptions and notations as in
Theorem 5.4. If the program outputs (v > x1 / n, . . . , v > xk / n), where
• v : G(n), vα ∼ N (0, σv2 ), is an input G-var not used elsewhere in the program and is
sampled independently from all other G-vars, and
• xi was introduced as xi := φi (g 1 , . . . , g M )
then the output vector converges in distribution to N (0, K) where
Kij = σv2

E

φi (Z)φj (Z),

Z∼N (µ,Σ)

with µ, Σ defined in Eq. (2).

(3)

Intuitively, this corollary follows from the fact that, for any finite n, the output vector is some
Gaussian N (0, K̃) conditioned on x1 , . . . , xk , and the covariance K̃ converges to a deterministic
covariance K, causing the output vector to converge in distribution to N (0, K) as well. The case
9

Difference with [60, Thm 4.3]: We have gotten rid of the “rank convergence” assumption by showing that it
comes for free. See CoreSet and Lemma H.4 in Appendix H.

7

sent2

1.0

randRNN covariances (theory)

0.8

0.8

0.25

0.6

0.6

0.20

0.4

0.4

0.2

0.2

0.05

0.0

0.0

0.00

(B) sent1

sent2

0.020
0.018
0.016
0.014
0.012
0.010
0.008
0.006

0.15
0.10

(C) sent1

sent2

randRNN: Theory vs Empirics

randRNN covariance std (empirical)
0.30

(D) sent1

sent2

(E)

theory

2.0
1.5
1.0
0.5
0.0
0.5
1.0
1.5
2.0

randRNN("...the dog")

randRNN correlations (theory)

The
brown
fox
jumps
over
the
dog
The
quick
brown
fox
jumps
over
the
lazy
dog

(A) sent1

1.0

The
brown
fox
jumps
over
the
dog
The
quick
brown
fox
jumps
over
the
lazy
dog

The
brown
fox
jumps
over
the
dog
The
quick
brown
fox
jumps
over
the
lazy
dog

GloVe correlations

The
brown
fox
jumps
over
the
dog
The
quick
brown
fox
jumps
over
the
lazy
dog

sent1
sent2

The
brown
fox
jumps
over
the
dog
The
quick
brown
fox
jumps
over
the
lazy
dog

2

1
0
1
randRNN("...lazy dog")

2

Figure 2: Infinite-width theory is highly predictive for simple RNN (Program 2) with 1000 neurons and
erf activation. We pass two sentences (“The brown fox jumps over the dog” and “The quick brown
fox jumps over the lazy dog”) by their word GloVe embeddings into randomly initialized simple
RNNs. (A) Cosine distances between each pair of word GloVe embeddings. (B) Correlation matrix of
the limiting Gaussian that Program 2 output vector converges to. Each row/column corresponds to an
embedding of of the sentence up to that word. (C) Covariance matrix of the same. See Appendix B.2
for algorithm to compute this covariance. (D) Entrywise standard deviation of empirical covariance
around (C), as measured from 100 random simple RNNs. Note the deviations are at least an order of
magnitude smaller than the limiting values (C), for 1000 neurons. (E) Visualizing
the√joint distribution
√
of the final outputs of the RNN at the end of each sentence, i.e. (v > st1 / n, v > sr2 / n) in Program 2.
We sampled 100,000 simple RNNs and plotted the 2d histogram as a heatmap. Simultaneously, we
plot the limiting Gaussian level curves predicted by our theory, which fit the simulations perfectly.
when we have multiple distinct v i (allowed by Definition 4.1) can be obtained easily as well (see
Proposition G.4).
Following Corollary 5.5 and its extensions below, the convergence of standard architectures to
Gaussian Processes becomes obvious: Express the marginal of the distribution on every finite set
of inputs as a N ETSOR (or N ETSOR+ ) program, and then apply Corollary 5.5. We summarize the
result below.
Corollary 5.6. If its nonlinearities are controlled (Definition 5.3), then a (possibly recurrent) neural
network of standard architecture converges to a Gaussian process in finite-dimensional distribution 10 in the sense of Definition 2.1 as its widths go to infinity and each of its weights W and
2
biases b are randomized as Wαβ ∼ N (0, σW
/n), bα ∼ N (µb , σb2 ) for a collection of sampling
hyperparameters {σW }W , {µb , σb }b . If its nonlinearities are more generally parametrized and are
parameter-controlled (Definition C.1), such as in the case of attention models or where layernorm is
involved, then the same result holds as long as Assumption C.3 also holds.
An Empirical Demonstration Despite being about infinite width, our theory is highly predictive
for finite-width networks, as shown in Fig. 2. As in Section 2, we randomly initialize a simple
RNN (Program 2) with 1000 neurons and erf activation (we choose erf instead of tanh because it
simplifies kernel calculations; see Appendix B.2 for the derivation of the algorithm to compute the
kernel). We pass the two sentences in (?) to the random RNN by their GloVe embeddings. After
processing each token, the RNN outputs a scalar, as before, and over the two input sequences, the
RNN outputs 7 + 9 = 16 scalars in total. Our result Corollary 5.5 implies that, as the width of the
RNN grows to infinity, these 16 scalars are distributed jointly as a Gaussian. Fig. 2(E) illustrates
this is indeed the case for the marginal on 2 scalars, as discussed in Section 2. We also compare
our theoretically derived, infinite-width covariance of the 16 scalars (Fig. 2(C)) with the empirical
finite-width covariance obtained from multiple random initializations. We find that the empirical
covariance, as predicted, concentrates around the theoretical, and the entrywise standard deviation is
typically at least an order of magnitude lower than the values themselves (Fig. 2(D)) (with width 1000
RNNs). The random RNN is clearly doing nontrivial context embedding, as seen by comparing the
correlation matrix of the 16 scalars Fig. 2(B) (context-sensitive) with the matrix of cosine distances
(i.e. correlations) between the GloVe embeddings Fig. 2(A) (context-insensitive). A tell-tale sign is
the entry corresponding to (“lazy”, “dog”): even though as words, they are not semantically similar
10

Stronger convergence results, such as convergence in distribution with respect to some topology on functions
on Rd , would be available if one can show additionally the tightness of the random neural networks under this
topology. However, here we are content with convergence of finite-dimensional marginals of the stochastic
processes.

8

    

 W U D Q V I R U P H U  F R U U H O D W L R Q   W K H R U \ 

 U H O D W L Y H  G H Y L D W L R Q  I U R P  W K H R U \

   

 
   

 

   
    
    

   

   

  % 

 V H Q W                         V H Q W 

 7 K H
 E U R Z Q
 I R [
 M X P S V
 R Y H U
 W K H
 G R J
 7 K H
 T X L F N
 E U R Z Q
 I R [
 M X P S V
 R Y H U
 W K H
 O D ] \
 G R J

 7 K H
 E U R Z Q
 I R [
 M X P S V
 R Y H U
 W K H
 G R J
 7 K H
 T X L F N
 E U R Z Q
 I R [
 M X P S V
 R Y H U
 W K H
 O D ] \
 G R J

   

  &   V H Q W                         V H Q W 

 

  

  

 & , ) $ 5    V D P S O H  L G

  

  
  

log2width

   

  ' 

 

 P R G H O
 % 1
 * 5 8
 W U D Q V I R U P H U
 V L P S O H 5 1 1

   

   

    

 

   

   

   

 V H Q W                         V H Q W 

 % 1  U H O X  I F  Q H W  F R U U H O D W L R Q V   W K H R U \ 

   

    

   

  $ 

   

 

  ( 

 

2log2(|Ksim Kth|F/|Kth|F)

 * 5 8  F R U U H O D W L R Q V   W K H R U \ 

   
   

 7 K H
 E U R Z Q
 I R [
 M X P S V
 R Y H U
 W K H
 G R J
 7 K H
 T X L F N
 E U R Z Q
 I R [
 M X P S V
 R Y H U
 W K H
 O D ] \
 G R J

 V H Q W                         V H Q W 

 5 1 1  F R U U H O D W L R Q V   W K H R U \ 
 7 K H
 E U R Z Q
 I R [
 M X P S V
 R Y H U
 W K H
 G R J
 7 K H
 T X L F N
 E U R Z Q
 I R [
 M X P S V
 R Y H U
 W K H
 O D ] \
 G R J

 

  

log2width

  

Figure 3: Infinite-width GP kernels (more precisely, their correlation matrices) for which we provide
reference implementations, and the deviation of finite-width simulations from the corresponding
infinite-width limits. (A) – (C) The correlation matrices of the GP kernels for the simple RNN
(same as in Fig. 2; see Program 2 for the architecture and Appendix B.2 for derivation), GRU
(Program 5; Appendix B.5), and transformer (Program 10; Appendix D.3), with input sequences
given by the GloVe embeddings of (?). (D) The correlation matrix of the GP kernel for a feedforward,
fully-connected network with batchnorm+ReLU (batchnorm followed by ReLU) as nonlinearity (see
Appendix B.3 for derivation). The inputs are the first 64 CIFAR10 images, split into two batches of
32 each. The red lines indicate the batch split. (E) For each architecture above, we independently
randomly initialize 100 networks for each width among [25 , 26 , . . . , 213 ]. We calculate the empirical
kernel of the network outputs and plot
√ its (relative) Frobenius distance to the infinite-width kernel.
This Frobenius distance drops like 1/ width as one would expect from a central limit intuition. See
our code2 for Python implementations of these kernels and the code for generating this figure.
(so that the entry in Fig. 2(A) is small), the random RNN understands that the two sentences resp.
up to “lazy” and “dog” have been very similar (so that the entry in Fig. 2(B) is large). Given the
precision of our theoretical predictions, we expect analyses of the equations derived here will lead to
many nontrivial insights about recurrent (and other) neural network behavior in practice, which we
leave for future work.
Examples and Extensions: A Brief Guide to the Appendix Appendix B contains a plethora of
worked-out examples of the kernel computation for different architectures, starting from the known
case of MLP to the new results of RNN (as shown in Fig. 2), GRU, batchnorm, and others. At this
point, we recommend the reader to follow along some of those examples to solidify the understanding
of Theorem 5.4.
A Master Theorem for N ETSOR+ can be similarly proved. This is stated in Appendix C and can be
proved easily given the proof of Theorem 5.4; see Appendix I. Appendix D works out examples of
kernel computations for layernorm and transformer, which can only be expressed through N ETSOR+ .
Fig. 3 illustrates the kernels of simple RNN, GRU, transformer, and a batchnorm+ReLU network,
and confirms that the finite width simulations tend to the infinite-width, theoretical kernels.
We also discuss different variants of N ETSOR and N ETSOR+ in Appendix E which trade off syntactical simplicity with ease of use, but are semantically equivalent to N ETSOR or N ETSOR+ . Appendix F
discusses the case when the dimensions of a program need not be equal. With the appropriate setup,
a Master Theorem in this case can be proved similarly (Theorem F.4).

6

Related Works

NN-GP Correspondence Many works have observed the neural network-Gaussian process correspondence (NN-GP correspondence) for subsets of standard architectures [56, 34, 22, 13, 37, 40, 43].
Others have exploited this NN-GP correspondence implicitly or explicitly to build new models
[11, 33, 12, 57, 58, 7, 54, 32, 4, 6, 18, 43]. In particular, by directly converting NN to GP using this
correspondence, Lee et al. [37] constructed the state-of-the-art (SOTA) permutation-invariant GP on
MNIST, and Novak et al. [43] was until recently SOTA on CIFAR10 for any GP with untrainable
kernel. Additionally, the NN-GP correspondence has led to new understanding of neural network
training and generalization [42, 53, 61].
In this paper, we generalized the NN-GP correspondence to standard architectures and very general
nonlinearities (controlled functions; see Definition 5.3). In contrast, Matthews et al. [40] requires φ to
be linearly bounded in norm; Daniely et al. [13] requires φ be twice-differentiable with |φ|, |φ0 |, |φ00 |
9

all bounded, or that φ = ReLU; and a sufficient condition given in Novak et al. [43] is that φ0 exists
and is bounded by exp(O(x2− )), though it is unclear how the more general set of 3 conditions given
there (in their section E.4) compares with ours.
Signal Propagation in Neural Networks A long line of work starting with Glorot and Bengio
[20] and He et al. [23] studies the effect of initialization in deep neural networks [46, 50, 63, 62, 21,
9, 64, 45], for example, what is the best initialization scheme to avoid gradient vanishing? These
works apply the same calculations of covariances as we do for calculating Σ here, though in a much
more restricted set of architectures, and they are typically more concerned with the dynamics of such
covariances with depth.
Reservoir Computing In reservoir computing [30, 39, 51], sequence processing is typically done
by a randomly initialized recurrent neural network. A sequence of inputs is fed step by step into
the network, and a final readout layer transforms the random RNN’s state into an output. The only
trainable parameters are the readout layer, but not the random RNN itself. Thus, in the infinite-width
limit, reservoir computing corresponds exactly to GP inference with the RNN kernel computed in
Appendix B.2.

7

Conclusion

We formulated the notion of Gaussian process with variable-dimensional outputs and showed that
randomly initialized, wide feedforward and recurrent neural networks of standard architectures
converge in distribution to Gaussian processes in such a sense. This significantly generalizes prior
work on the NN-GP correspondence. We did so by introducing N ETSOR , a language for expressing
computation common in deep learning, including neural networks of standard architecture, along
with a theorem (Theorem 5.4) characterizing the behavior of a N ETSOR program as its tensors are
randomized and their dimensions tend to infinity; many examples and extensions are exhibited in
the appendix. Finally, we empirically verified our theory for simple RNN, GRU, transformer, and
batchnorm (Fig. 3) and open-sourced implementations of the corresponding infinite-width limit
kernels at github.com/thegregyang/GP4A. In the next paper in this series, we will introduce a
more powerful version of tensor program that allows matrix transposes, and use this tool to compute
Neural Tangent Kernel [29] for any architecture.

10

Acknowlegements
I’m very thankful for my buddy Hadi Salman who is always ready to help and who donated a lot of
time helping me write the detailed examples for MLP and RNN kernels. I’d also like to thank Mimee
Xu who read the first versions of this paper and provided valuable feedback. Finally, allow me to
express my appreciation for myriads of friends and collaborators who have helped me improve this
paper in one way or another: Sam Schoenholz, Yihe Dong, Judy Shen, Alessandro Sordoni, Huishuai
Zhang, George Phillip, Vinay Rao, Sebastien Bubeck, Zeyuan Allen-Zhu, Kyle Aitkens, Chunyuan
Li, Alex Polozov, Ilya Razenshteyn, Jianfeng Gao, Pengchuan Zhang, Jascha Sohl-Dickstein, Jeffrey
Pennington, and others.

References
[1] Jimmy Lei Ba, Jamie Ryan Kiros, and Geoffrey E. Hinton. Layer Normalization.
arXiv:1607.06450 [cs, stat], July 2016. URL http://arxiv.org/abs/1607.06450. 00329
arXiv: 1607.06450.
[2] Dzmitry Bahdanau, Kyunghyun Cho, and Yoshua Bengio. Neural Machine Translation by
Jointly Learning to Align and Translate. arXiv:1409.0473 [cs, stat], September 2014. URL
http://arxiv.org/abs/1409.0473. arXiv: 1409.0473.
[3] Mohsen Bayati and Andrea Montanari. The dynamics of message passing on dense graphs,
with applications to compressed sensing. IEEE Transactions on Information Theory, 57(2):
764–785, February 2011. ISSN 0018-9448, 1557-9654. doi: 10.1109/TIT.2010.2094817. URL
http://arxiv.org/abs/1001.3448. arXiv: 1001.3448.
[4] Kenneth Blomqvist, Samuel Kaski, and Markus Heinonen. Deep convolutional Gaussian
processes. arXiv preprint arXiv:1810.03052, 2018.
[5] Erwin Bolthausen. An iterative construction of solutions of the TAP equations for the
Sherrington-Kirkpatrick model. arXiv:1201.2891 [cond-mat, physics:math-ph], January 2012.
URL http://arxiv.org/abs/1201.2891. arXiv: 1201.2891.
[6] Anastasia Borovykh. A gaussian process perspective on convolutional neural networks. arXiv
preprint arXiv:1810.10798, 2018.
[7] John Bradshaw, Alexander G de G Matthews, and Zoubin Ghahramani. Adversarial examples,
uncertainty, and transfer testing robustness in gaussian process hybrid deep networks. arXiv
preprint arXiv:1707.02476, 2017.
[8] Joan Bruna, Wojciech Zaremba, Arthur Szlam, and Yann LeCun. Spectral Networks and Locally
Connected Networks on Graphs. arXiv:1312.6203 [cs], December 2013.
[9] Minmin Chen, Jeffrey Pennington, and Samuel Schoenholz. Dynamical Isometry and a Mean
Field Theory of RNNs: Gating Enables Signal Propagation in Recurrent Neural Networks.
In Proceedings of the 35th International Conference on Machine Learning, volume 80 of
Proceedings of Machine Learning Research, pages 873–882, Stockholmsmässan, Stockholm
Sweden, July 2018. PMLR. URL http://proceedings.mlr.press/v80/chen18i.html.
[10] Kyunghyun Cho, Bart van Merrienboer, Caglar Gulcehre, Dzmitry Bahdanau, Fethi Bougares,
Holger Schwenk, and Yoshua Bengio. Learning Phrase Representations using RNN EncoderDecoder for Statistical Machine Translation. arXiv:1406.1078 [cs, stat], June 2014. URL
http://arxiv.org/abs/1406.1078. arXiv: 1406.1078.
[11] Youngmin Cho and Lawrence K. Saul. Kernel methods for deep learning. In Advances in
neural information processing systems, pages 342–350, 2009. URL http://papers.nips.
cc/paper/3628-kernel-methods-for-deep-learning.
[12] Andreas Damianou and Neil Lawrence. Deep gaussian processes. In Artificial Intelligence and
Statistics, pages 207–215, 2013.
11

[13] Amit Daniely, Roy Frostig, and Yoram Singer. Toward Deeper Understanding of Neural
Networks: The Power of Initialization and a Dual View on Expressivity. In D. D. Lee,
M. Sugiyama, U. V. Luxburg, I. Guyon, and R. Garnett, editors, Advances in Neural Information
Processing Systems 29, pages 2253–2261. Curran Associates, Inc., 2016.
[14] Michaël Defferrard, Xavier Bresson, and Pierre Vandergheynst. Convolutional Neural Networks
on Graphs with Fast Localized Spectral Filtering. arXiv:1606.09375 [cs, stat], June 2016.
[15] David K Duvenaud, Dougal Maclaurin, Jorge Iparraguirre, Rafael Bombarell, Timothy Hirzel,
Alan Aspuru-Guzik, and Ryan P Adams. Convolutional Networks on Graphs for Learning
Molecular Fingerprints. In C. Cortes, N. D. Lawrence, D. D. Lee, M. Sugiyama, and R. Garnett,
editors, Advances in Neural Information Processing Systems 28, pages 2224–2232. Curran
Associates, Inc., 2015.
[16] Kunihiko Fukushima. Cognitron: A self-organizing multilayered neural network. Biological
cybernetics, 20(3-4):121–136, 1975.
[17] Kunihiko Fukushima and Sei Miyake. Neocognitron: A self-organizing neural network model
for a mechanism of visual pattern recognition. In Competition and cooperation in neural nets,
pages 267–285. Springer, 1982.
[18] Adrià Garriga-Alonso, Laurence Aitchison, and Carl Edward Rasmussen. Deep Convolutional
Networks as shallow Gaussian Processes. arXiv:1808.05587 [cs, stat], August 2018. URL
http://arxiv.org/abs/1808.05587. arXiv: 1808.05587.
[19] Alan Genz, Frank Bretz, Tetsuhisa Miwa, Xuefei Mi, Friedrich Leisch, Fabian Scheipl, and
Torsten Hothorn. mvtnorm: Multivariate Normal and t Distributions, 2019. URL https:
//CRAN.R-project.org/package=mvtnorm. R package version 1.0-11.
[20] Xavier Glorot and Yoshua Bengio. Understanding the difficulty of training deep feedforward
neural networks. In Yee Whye Teh and Mike Titterington, editors, Proceedings of the Thirteenth
International Conference on Artificial Intelligence and Statistics, volume 9 of Proceedings of
Machine Learning Research, pages 249–256, Chia Laguna Resort, Sardinia, Italy, May 2010.
PMLR. URL http://proceedings.mlr.press/v9/glorot10a.html. 02641.
[21] Boris Hanin and David Rolnick. How to Start Training: The Effect of Initialization and
Architecture. arXiv:1803.01719 [cs, stat], March 2018. URL http://arxiv.org/abs/1803.
01719. arXiv: 1803.01719.
[22] Tamir Hazan and Tommi Jaakkola. Steps Toward Deep Kernel Methods from Infinite Neural Networks. arXiv:1508.05133 [cs], August 2015. URL http://arxiv.org/abs/1508.05133.
arXiv: 1508.05133.
[23] Kaiming He, Xiangyu Zhang, Shaoqing Ren, and Jian Sun.
Delving deep into
rectifiers: Surpassing human-level performance on imagenet classification.
In Proceedings of the IEEE international conference on computer vision, pages 1026–
1034, 2015. URL http://www.cv-foundation.org/openaccess/content_iccv_2015/
html/He_Delving_Deep_into_ICCV_2015_paper.html.
[24] Kaiming He, Xiangyu Zhang, Shaoqing Ren, and Jian Sun. Deep Residual Learning for
Image Recognition. pages 770–778, 2016. URL https://www.cv-foundation.org/
openaccess/content_cvpr_2016/html/He_Deep_Residual_Learning_CVPR_2016_
paper.html.
[25] Mikael Henaff, Joan Bruna, and Yann LeCun. Deep Convolutional Networks on GraphStructured Data. arXiv:1506.05163 [cs], June 2015.
[26] Sepp Hochreiter and Jürgen Schmidhuber. Long Short-Term Memory. Neural Comput., 9
(8):1735–1780, November 1997. ISSN 0899-7667. doi: 10.1162/neco.1997.9.8.1735. URL
http://dx.doi.org/10.1162/neco.1997.9.8.1735.
[27] Gao Huang, Zhuang Liu, Laurens van der Maaten, and Kilian Q. Weinberger. Densely Connected
Convolutional Networks. arXiv:1608.06993 [cs], August 2016. URL http://arxiv.org/
abs/1608.06993. arXiv: 1608.06993.
12

[28] Sergey Ioffe and Christian Szegedy. Batch Normalization: Accelerating Deep Network Training
by Reducing Internal Covariate Shift. In PMLR, pages 448–456, June 2015. URL http:
//proceedings.mlr.press/v37/ioffe15.html.
[29] Arthur Jacot, Franck Gabriel, and Clément Hongler. Neural Tangent Kernel: Convergence
and Generalization in Neural Networks. arXiv:1806.07572 [cs, math, stat], June 2018. URL
http://arxiv.org/abs/1806.07572. 00000 arXiv: 1806.07572.
[30] Herbert Jaeger. Echo state network. Scholarpedia, 2(9):2330, September 2007. ISSN 1941-6016.
doi: 10.4249/scholarpedia.2330.
[31] Thomas N. Kipf and Max Welling. Semi-Supervised Classification with Graph Convolutional
Networks. arXiv:1609.02907 [cs, stat], September 2016.
[32] Vinayak Kumar, Vaibhav Singh, PK Srijith, and Andreas Damianou. Deep Gaussian Processes
with Convolutional Kernels. arXiv preprint arXiv:1806.01655, 2018.
[33] Neil D Lawrence and Andrew J Moore. Hierarchical Gaussian process latent variable models.
In Proceedings of the 24th international conference on Machine learning, pages 481–488. ACM,
2007.
[34] Nicolas Le Roux and Yoshua Bengio. Continuous neural networks. In Artificial Intelligence
and Statistics, pages 404–411, 2007.
[35] Yann LeCun, Léon Bottou, Yoshua Bengio, and Patrick Haffner. Gradient-based learning
applied to document recognition. Proceedings of the IEEE, 86(11):2278–2324, 1998.
[36] Yann LeCun, Patrick Haffner, Léon Bottou, and Yoshua Bengio. Object recognition with
gradient-based learning. In Shape, contour and grouping in computer vision, pages 319–345.
Springer, 1999.
[37] Jaehoon Lee, Yasaman Bahri, Roman Novak, Sam Schoenholz, Jeffrey Pennington, and Jascha
Sohl-dickstein. Deep Neural Networks as Gaussian Processes. In International Conference on
Learning Representations, 2018. URL https://openreview.net/forum?id=B1EA-M-0Z.
[38] Yujia Li, Daniel Tarlow, Marc Brockschmidt, and Richard Zemel. Gated Graph Sequence
Neural Networks. arXiv:1511.05493 [cs, stat], November 2015.
[39] Wolfgang Maass, Thomas Natschläger, and Henry Markram. Real-Time Computing Without
Stable States: A New Framework for Neural Computation Based on Perturbations. Neural
Computation, 14(11):2531–2560, November 2002. ISSN 0899-7667, 1530-888X. doi: 10.1162/
089976602760407955.
[40] Alexander G. de G. Matthews, Jiri Hron, Mark Rowland, Richard E. Turner, and Zoubin
Ghahramani. Gaussian Process Behaviour in Wide Deep Neural Networks. In International
Conference on Learning Representations, 2018. URL https://openreview.net/forum?
id=H1-nGgWC-.
[41] Radford M Neal. BAYESIAN LEARNING FOR NEURAL NETWORKS. PhD Thesis, University
of Toronto, 1995.
[42] Roman Novak, Yasaman Bahri, Daniel A. Abolafia, Jeffrey Pennington, and Jascha SohlDickstein. Sensitivity and Generalization in Neural Networks: an Empirical Study. In International Conference on Learning Representations, 2018. URL https://openreview.net/
forum?id=HJC2SzZCW.
[43] Roman Novak, Lechao Xiao, Jaehoon Lee, Yasaman Bahri, Daniel A Abolafia, Jeffrey Pennington, and Jascha Sohl-Dickstein. Bayesian Deep Convolutional Networks with Many Channels
are Gaussian Processes. arXiv preprint arXiv:1810.05148, 2018.
[44] Jeffrey Pennington, Richard Socher, and Christopher Manning. Glove: Global Vectors for
Word Representation. pages 1532–1543. Association for Computational Linguistics, 2014. doi:
10.3115/v1/D14-1162. URL http://aclweb.org/anthology/D14-1162. 04219.
13

[45] Jeffrey Pennington, Samuel Schoenholz, and Surya Ganguli. Resurrecting the sigmoid in
deep learning through dynamical isometry: theory and practice. In I. Guyon, U. V. Luxburg,
S. Bengio, H. Wallach, R. Fergus, S. Vishwanathan, and R. Garnett, editors, Advances in Neural
Information Processing Systems 30, pages 4788–4798. Curran Associates, Inc., 2017. 00004.
[46] Ben Poole, Subhaneil Lahiri, Maithreyi Raghu, Jascha Sohl-Dickstein, and Surya Ganguli.
Exponential expressivity in deep neural networks through transient chaos. In Advances In
Neural Information Processing Systems, pages 3360–3368, 2016. 00047.
[47] David E Rumelhart, Geoffrey E Hinton, and Ronald J Williams. Learning internal representations by error propagation. Technical report, California Univ San Diego La Jolla Inst for
Cognitive Science, 1985.
[48] Nico Schlömer. QuadPy: Numerical integration (quadrature, cubature) in Python, 2016–. URL
https://github.com/nschloe/quadpy. [Online; accessed <today>].
[49] Samuel S. Schoenholz, Justin Gilmer, Surya Ganguli, and Jascha Sohl-Dickstein. Deep Information Propagation. arXiv:1611.01232 [cs, stat], November 2016. URL http://arxiv.org/
abs/1611.01232. arXiv: 1611.01232.
[50] Samuel S. Schoenholz, Justin Gilmer, Surya Ganguli, and Jascha Sohl-Dickstein. Deep Information Propagation. 2017. URL https://openreview.net/pdf?id=H1W1UN9gg.
[51] Benjamin Schrauwen. An overview of reservoir computing: Theory, applications and implementations. page 12, 2007.
[52] Elias M. Stein and Rami Shakarchi. Functional analysis: introduction to further topics in
analysis. Princeton University Press, 2011.
[53] Guillermo Valle-Pérez, Chico Q. Camargo, and Ard A. Louis. Deep learning generalizes
because the parameter-function map is biased towards simple functions. arXiv:1805.08522 [cs,
stat], May 2018.
[54] Mark van der Wilk, Carl Edward Rasmussen, and James Hensman. Convolutional Gaussian
Processes. In Advances in Neural Information Processing Systems 30, pages 2849–2858, 2017.
[55] Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N Gomez,
\Lukasz Kaiser, and Illia Polosukhin. Attention is All You Need. In Advances in Neural
Information Processing Systems, pages 5998–6008, 2017.
[56] Christopher K I Williams. Computing with Infinite Networks. In Advances in neural information
processing systems, page 7, 1997.
[57] Andrew G Wilson, Zhiting Hu, Ruslan R Salakhutdinov, and Eric P Xing. Stochastic Variational
Deep Kernel Learning. In Advances in Neural Information Processing Systems, pages 2586–
2594, 2016.
[58] Andrew Gordon Wilson, Zhiting Hu, Ruslan Salakhutdinov, and Eric P Xing. Deep kernel
learning. In Artificial Intelligence and Statistics, pages 370–378, 2016.
[59] Lechao Xiao, Yasaman Bahri, Jascha Sohl-Dickstein, Samuel Schoenholz, and Jeffrey Pennington. Dynamical Isometry and a Mean Field Theory of CNNs: How to Train 10,000Layer Vanilla Convolutional Neural Networks. In Proceedings of the 35th International
Conference on Machine Learning, volume 80 of Proceedings of Machine Learning Research, pages 5393–5402, Stockholmsmässan, Stockholm Sweden, July 2018. PMLR. URL
http://proceedings.mlr.press/v80/xiao18a.html.
[60] Greg Yang. Scaling Limits of Wide Neural Networks with Weight Sharing: Gaussian Process
Behavior, Gradient Independence, and Neural Tangent Kernel Derivation. arXiv:1902.04760
[cond-mat, physics:math-ph, stat], February 2019.
[61] Greg Yang and Hadi Salman. A Fine-Grained Spectral Perspective on Neural Networks. July
2019.
14

[62] Greg Yang and Sam S. Schoenholz. Deep Mean Field Theory: Layerwise Variance and
Width Variation as Methods to Control Gradient Explosion. February 2018. URL https:
//openreview.net/forum?id=rJGY8GbR-.
[63] Greg Yang and Samuel S. Schoenholz. Mean Field Residual Network: On the Edge of Chaos.
In Advances in neural information processing systems, 2017.
[64] Greg Yang, Jeffrey Pennington, Vinay Rao, Jascha Sohl-Dickstein, and Samuel S. Schoenholz.
A Mean Field Theory of Batch Normalization. September 2018. URL https://openreview.
net/forum?id=SyMDXnCcF7.
[65] Greg Yang, Jeffrey Pennington, Vinay Rao, Jascha Sohl-Dickstein, and Samuel S. Schoenholz.
A Mean Field Theory of Batch Normalization. arXiv:1902.08129 [cond-mat], February 2019.
URL http://arxiv.org/abs/1902.08129. arXiv: 1902.08129.

15

N ETSOR program 3 Batchnorm (with Fully Connected Layers) over Multiple Batches
// For φ : R → R, h ∈ RB ,
// let φ̃(h) = φ((h − ν(h))/σ(h)),
PB
// where ν(h) = B1 i=1 hi ,
q P
B
// σ(h) = B1 i=1 (hi − ν(h))2 .
// Let φ̃i , i ∈ [B], be the ith coordinate of φ̃.
// Embeddings of k batches of inputs
// with ath batch having size Ba
Input: {W 1 xia : G(n)}a∈[k],i∈[Ba ]
Input: W 2 , . . . , W L : A(n, n)
// Readout layer
Input: v : G(n)

A

for a ∈ [k] and i ∈ [Ba ] do
x1ia := φ̃i (W 1 x1a , . . . , W 1 xBa a )
: H(n)
end for
for l = 2, . . . , L do
for a ∈ [k] and i ∈ [Ba ] do
hlia := W l xl−1,ia : G(n)
end for
for a ∈ [k] and i ∈ [Ba ] do
xlia := φ̃i (hl1a , . . . , hlBa a ) : H(n)
end for
end for
√
Output: {v > xLia / n}a∈[k],i∈[Ba ]

Writing Standard Architectures in N ETSOR

In this section, we showcase example programs for batchnorm, skip connection, convolution, pooling,
GRU/LSTM, and (scaled) attention. In most cases, we demonstrate the computation on a single input
batch, image, or sequence. Generalization to multiple inputs is obvious and follows the pattern of
Program 2. It should also be apparent that any composition of these gadgets can be expressed in
N ETSOR .
Additionally, observe that all nonlinearities used in these programs are controlled (Definition 5.3) or
parameter-controlled (Definition C.1), so that Theorem 5.4 or Theorem C.4 applies. Also we remark
that the GP convergence results for batchnorm, GRU/LSTM (and RNNs in general), and attention are
new.
Batchnorm, Fully-Connected Let φ̃ : RB → RB ,
def

φ̃(h) = φ



h − ν(h)
σ(h)


,

B
X
def 1
hi ,
where ν(h) =
B i=1

v
u
B
u1 X
def
σ(h) = t
(hi − ν(h))2 ,
B i=1

(4)

be batchnorm followed by coordinatewise nonlinearity φ, where h ∈ RB should be interpreted as
a single neuron across a batch, and ν and σ are the batch mean and standard deviations. Here, B
should be thought of as fixed while n → ∞. Then, given a batch of G-vars y 1 , . . . , y B : G(n) (for
example, they could be the preactivations after applying a linear layer), we can express the application
of batchnorm via Nonlin as
x1 := φ̃1 (y 1 , . . . , y B ),

...,

xB := φ̃B (y 1 , . . . , y B ),

(5)

producing B H-vars x1 , . . . , xB : H(n). Program 3 expresses more generally the computation of
a batchnorm network on multiple batches and over multiple layers. Here, each “for-loop” is just
shorthand for the corresponding unrolled program (since Definition 4.1 doesn’t allow for-loops).
Skip Connection If x : H(n) is previous layer activation, and we have weights W : A(n, n) and
bias b : G(n), then we can express skip connection as
h̃ := W x

MatMul

h := h̃ + b
x̄ := x + φ(h)

LinComb
Nonlin

(Graph) Convolution Consider a convolution network with L layers, with layer l having nl
channels, with kernel positions kerl (for example, for a 3 × 5 kernel, kerl = [3] × [5]), and with
feature map pixel positions posl (for example, for a 128 × 256 feature map, posl = [128] × [256]).
16

N ETSOR program 4 2-Layer Convolutional Network with Global Average Pooling
Input: {Wj1 xi+j : G(n1 )}j∈ker1 ,i∈pos1

// Layer 2 Convolution
for j ∈ ker2 , i ∈ pos1 s.t. i + j ∈ pos2 do
// Convolution Weights Multiplication
// MatMul
h2i;j := Wj1 x1i+j : G(n2 )
end for
for i ∈ pos2 do
// Sum is over all j ∈ ker2 such that
// thereP
is i0 ∈ pos1 with i0 = j + i
2
hi := j h2i;j : G(n2 )
end for
// Nonlinearity
Pooling
P& Global Average
1
2
2
x̄2 := |pos
φ(h
)
:
H(n
)
2
2|
i
√i∈pos
> 2
2
Output: v x̄ / n

s.t. i+j∈pos0

Input: {Wj2 : A(n2 , n1 )}j∈ker2
// Readout weights
Input: v : G(n2 )
// Layer 1 Convolution
for i ∈ pos1 do
// Directly use input embeddings
// LinComb
// Sum is over all j ∈ ker1 such that
// thereP
is i0 ∈ pos0 with i0 = j + i
1
hi := j Wj1 xi+j : G(n1 )
x1i := φ(h1i ) : H(n1 )
end for

l
Then we can describe the weights of a stride-1 convolution as {Wiαβ
}l∈[L],i∈kerl ,α∈[nl ],β∈[nl−1 ] , so
l

l−1

that for each i ∈ kerl , Wil ∈ Rn ×n is a dense matrix. Further, suppose x is an image input to the
network with pixel coordinates pos0 and n0 channels, {xiα }i∈pos0 ,α∈[n0 ] , so that xi is a vector of
dimension n0 . Then the application of the convolution W 1 on x is given by
X
X
1
1
Wjαβ
xi+j,β ∈ R,
h1i := (W 1 ∗ x)i =
Wj1 xi+j ∈ Rn , h1iα = (W 1 ∗ x)iα =
j

jβ

where the sums are over j ∈ ker1 , i + j ∈ pos0 , and β ∈ [n0 ]. For higher layers we have similar
formulas, with the only difference that we treat Wj1 xi+j as input G-vars but treat Wjl+1 xli+j , l ≥ 2,
as a MatMul operation. Thus, our framework can express CNN computations by expressing the
individual matrix multiplications Wj xi+j and reusing the matrices Wj . Program 4 shows a simple
example program, and Program 7 shows a full-fledged example over multiple inputs. Again, each
“for-loop” is just shorthand for the corresponding unrolled program. Higher stride and general graph
convolution can be expressed likewise.
Pooling We continue the notational scheme of the exposition on convolutions above. Given
the feature maps of layer l, {xiα }i∈posl ,α∈[nl ] , global average pooling produces a single vector
x̄ = {x̄α }α∈[nl ] given by
x̄ :=

X
1
xi ,
|posl |
l

using LinComb.

i∈pos

See Program 4 for an example in combination with convolutional layers. We can similarly express
max pooling. Suppose posl = [2k] × [2k]. Then max pooling with, for example, 2 × 2 kernel and
stride of 2 would produce {x̂jα }j∈[k]×[k],α∈[nl ] , with
x̂jα := max({x2j+i,α }i∈{0,1}×{0,1},2j+i∈posl ),

using Nonlin.

GRU and LSTM We present a program expressing GRU computation in Program 5; the program
for LSTM is similar and is omitted. The overall pattern is similar to the program for simple RNN
(Program 2), but with a crucial subtlety regarding the gating mechanism. In Program 5, z̃ s , r̃s , h̃s are
G-vars, but the gates σ(z̃ s ), σ(r̃s ) (where σ is sigmoid) and the candidate update φ(h̃s ) are not G-vars.
As we can only apply Nonlin to G-vars, this requires us to unroll the definition of hs to be a function
of only G-vars. However, Appendix E presents expanded, but semantically equivalent versions of
N ETSOR which allow a more succinct representation of the same computation; see Program 11.
Finally, Program 8 presents a full-fledged program with multiple input sequences.
17

N ETSOR program 5 GRU, with Gating Function σ and Activation Function φ
// Embeddings of input sequence
Input: Uz x1 , . . . , Uz xT : G(n)
Input: Ur x1 , . . . , Ur xT : G(n)
Input: Uh x1 , . . . , Uh xT : G(n)
// Parameters
Input: Wz , Wr , Wh : A(n, n)
Input: bz , br , bh : G(n)
// Initial GRU state
Input: h0 : G(n)
// Readout layer
Input: v : G(n)
// Time step 1
h1z := Wz h0 : G(n)
z̃ 1 := h1z + Uz x1 + bz : G(n)
h1r := Wr h0 : G(n)
r̃1 := h1r + Ur x1 + br : G(n)
// σ is gating function, typically sigmoid; applying Nonlin
ĥ0 := h0 σ(r̃1 ) : H(n)
h1h := Wh ĥ0 : G(n)
h̃1 := h1h + Uh x1 + bh : G(n)
// Apply Nonlin
// φ is activation function, typically tanh
h1 := (1 − σ(z̃ 1 )) h0 + σ(z̃ 1 ) φ(h̃1 ) : H(n)
// Time step 2
h2z := Wz h1 : G(n)
z̃ 2 := h2z + Uz x2 + bz : G(n)
h2r := Wr h1 : G(n)
r̃2 := h2r + Ur x2 + br : G(n)
// Morally, ĥ1 = σ(r̃1 ) h1 , but we need to unroll h1 to apply Nonlin
// This can be expressed with more brevity using N ETSOR◦ ; see Remark E.5
ĥ1 := σ(r̃1 ) ((1 − σ(z̃ 1 )) h0 + σ(z̃ 1 ) φ(h̃1 )) : H(n)
h2h := Wh ĥ1 : G(n)
h̃2 := h2h + Uh x2 + bh : G(n)
// Unrolling h2 to a coordinatewise function of G-vars
h2 := (1 − σ(z̃ 2 )) (1 − σ(z̃ 1 )) h0 + (1 − σ(z̃ 2 )) σ(z̃ 1 ) φ(h̃1 ) + σ(z̃ 2 ) φ(h̃2 ) : H(n)
// Time step 3
..
.
// Time step T
// Define z̃ T , r̃T , h̃T just like above
..
.
// Unrolling hT to a coordinatewise function of G-vars
JT
JT
PT
l
i
j
hT := h0
σ(z̃ j )
l=j+1 (1 − σ(z̃ )) : H(n)
i=1 (1 − σ(z̃ )) +
j=1 φ(h̃ )
√
√
> 1
> T
Output: (v h / n, . . . , v h / n)

Layernorm Layernorm requires the extended rule Nonlin+ to express. Recall for x ∈ Rn
(thought of as the vector of activations with one entry per neuron inq
a layer; contrast with batchnorm),
P
Pn
x−ν(x)
1
Layernorm(x) = σ(x) where ν(x) = n α xα and σ(x) = n1 α=1 (xα − ν(x))2 . As we
will see, ν(x) and σ(x) will both converge a.s. to a deterministic limit. Thus Layernorm(x) is just
a linear combination of x with the constant-1s vector (considered as a input G-var), with (roughly
18

deterministic) coefficients µ(x) and σ(x). This is expressible using the Nonlin+ rule:
def x − θ1
Layernorm(x) := ψ(x; ν(x), σ(x)), where ψ(x; θ1 , θ2 ) =
.
θ2
Similarly, if layernorm is followed up by a nonlinearity φ, then we can express


x − θ1
def
φ(Layernorm(x)) := ψ(x; ν(x), σ(x)), where ψ(x; θ1 , θ2 ) = φ
.
θ2
If layernorm is preceded by a nonlinearity, then likewise we can write
Layernorm(φ(x)) := ψ(x; ν(φ(x)), σ(φ(x))),

def φ(x) − θ1

where ψ(x; θ1 , θ2 ) =

θ2

.

Scaled Attention Scaled attention requires the extended rule Nonlin+ to express. Consider the
following version of scaled attention: Given a query vector q ∈ Rn , keys k i ∈ Rn for each i ∈ [r],
and corresponding values v i ∈ Rm , i ∈ [r], we can define the following scaled attention
def

Attention(q, {k i }i , {v i }i ) =

r
X

def

ai = SoftMax(q > k 1 /n, . . . , q > k r /n)i .

ai v i ,

i=1

If q, k i are given as H-vars in a N ETSOR program, then Theorem 5.4 will show that q > k i /n converges
almost surely to a deterministic limit, so that each ai converges likewise. If each v i = ψ(g i ) for some
G-var g i and fixed nonlinearity ψ, then attention can be expressed as follows using Nonlin+ :
Attention(q, {k i }i , {v i }i ) = φ(g 1 , . . . , g r ; a1 , . . . , ar )
where
def

φ(x1 , . . . , xr ; θ1 , . . . , θr ) = θ1 ψ(x1 ) + · · · + θr ψ(xr ).
More complicated variants, such as allowing ψ to take multiple G-vars as inputs, is likewise expressible. When used as part of a decoder, a mask needs to be placed on the pre-softmax values so that
no attention is paid to tokens in the future. This is aptly called masked attention and is given by the
following formula: for j ∈ [r],
MaskedAttentionj (q, {k i }ri=1 , {v i }ri=1 ) =
where

r
X
aji v i ,

i=1
j
> 1
> j
ai = SoftMax(q k /n, . . . , q k /n, −∞, . . . , −∞)i .

It can obviously be expressed in N ETSOR in the same fashion as (non-masked) attention.
√
Note that Vaswani et al. [55] scales the pre-softmax values by 1/ n instead of 1/n:
√
√
ai = SoftMax(q > k 1 / n, . . . , q > k r / n)i .
√
This is useful if qα kαi has mean zero (averaged over α) for each i, so that q > k i / n becomes roughly
> i
Gaussian,
√ whereas q k /n converges to 0. However, when the zero-mean condition doesn’t hold,
q > k i / n would only blow up to infinity.

B

Example GP Kernel Computation with N ETSOR

In this section, we show how to compute the GP kernel of different architecture, following the
recursive construction of Theorem 5.4.
First, we review the V-transform of a nonlinearity.
Definition B.1. Given a multivariate nonlinearity Φ : RB → RB , its V-transform VΦ is a function
taking B × B positive semidefinite matrices to B × B positive semidefinite matrices, and is given by
the following formula
def
VΦ (K) =
E
Φ(z)Φ(z)> .
z∼N (0,K)

When φ : R → R, we take Vφ to be V-transform of the RB → RB function that applies φ to each
coordinate.
19

We collect below some of the common V-transforms. Here we describe the V-transforms using the
function notation of kernels, but we shall freely switch between the function notation and the matrix
notation in what follows.
Fact B.2 ([11]). For any kernel K,
p
1 p
( 1 − c2 + (π − arccos c)c) K(x, x)K(x0 , x0 )
2π
1
0
VReLU0 (K)(x, x ) =
(π − arccos c)
2π
VReLU (K)(x, x0 ) =

p
where c = K(x, x0 )/ K(x, x)K(x0 , x0 ).
Fact B.3 ([41]). For any kernel K,
2
K(x, x0 )
arcsin p
π
(K(x, x) + 0.5)(K(x0 , x0 ) + 0.5)
4
Verf 0 (K)(x, x0 ) = p
.
π (1 + 2K(x, x))(1 + 2K(x0 , x0 )) − 4K(x, x0 )2
Verf (K)(x, x0 ) =

Fact B.4. Let φ(x) = exp(x/σ) for some σ > 0. For any kernel K,


K(x, x) + 2K(x, x0 ) + K(x0 , x0 )
Vφ (K)(x, x0 ) = exp
.
2σ 2
In Appendix B.3, we will also discuss the V-transform of batchnorm (which has been derived in [65]).
B.1

MLP

The kernel computation of a multilayer perceptron is by now well-known [46, 50, 37]. In this section,
we work out an example of how to recover the usual kernel computation via tensor programs.
B.1.1

MLP with Single Input (Program 1)

The aim here is to illustrate step-by-step applications of Eq. (2) for Program 1, but note that in
practice, it is often more convenient to find some bulk recursive or compositional structure of Σ, and
to leverage that structure for computing Σ (see Appendix B.2 for an example).
For simplicity, assume the nonlinearities φ are ReLUs and the widths n1 = n√2 = n to satisfy
Assumption 5.1. By Corollary 5.5, we know that the output of the MLP, v T x2 / n, is distributed
as a Gaussian with mean 0 and variance of σ 2 Ez φ2 (z), where z ∼ N (µ(h2 ), Σ(h2 , h2 )), and h2
is the layer 2 preactivation (also a G-var) in Program 1. Therefore, all we need is to compute µ(h2 )
and Σ(h2 , h2 ) using (2), which requires the calculation of µ and Σ for possibly all the other G-vars
in Program 1 due to the recursive nature of (2). In this example, we shall compute all entries of
µ and Σ explicitly as a demonstration. We do so for
 each G-var in the order of
 appearance in the
1
1 2
1
2
2
N ETSOR program. Explicitly, the ordering is G = W x, b , b , v, h , h̃ , h . The input G-vars
are W 1 x, b1 , b2 , and v, and the sole input A-var is W 2 .
Setup In the fashion of typical Glorot initializations, we shall sample the parameters W 1 , W 2 , b1 , b2
of the network as
1
2
Wαβ
∼ N (0, 1/ dim x), Wαβ
∼ N (0, 1/n), vα ∼ N (0, 1), b1α ∼ N (0, 1), b2α ∼ N (0, 1).

This corresponds, in the context of Assumption 5.1, to setting σW 2 = 1, µin = 0 (in particular,
µ(W 1 x) = µin (W 1 x) = 0 due to the sampling of W 1 ), and Σin as follows:
20

Σin (W 1 x, W 1 x) = 1
Σin (b1 , b1 ) = 1
Σin (b2 , b2 ) = 1
Σin (b2 , b1 ) = 0
Σin (v, v) = 1
Σin (bi , W 1 x) = 0 for i ∈ {1, 2}
Σin (bi , v) = 0 for i ∈ {1, 2}
Σin (v, W 1 x) = 0
Calculating µ and Σ Now we will show a detailed calculation of µ and Σ for all of the G-vars G
appearing here. By the input G-var case of Eq. (2),
Σ(W 1 x, W 1 x) = Σin (W 1 x, W 1 x) = 1
Σ(b1 , b1 ) = Σin (b1 , b1 ) = 1
Σ(b2 , b2 ) = Σin (b2 , b2 ) = 1
Σ(b1 , b2 ) = Σin (b2 , b1 ) = 0
Σ(v, v) = Σin (v, v) = 1
Σ(W 1 x, bi ) = Σ(bi , W 1 x) = Σin (bi , W 1 x) = 0 for i ∈ {1, 2}
Σ(v, bi ) = Σ(bi , v) = Σin (bi , v) = 0 for i ∈ {1, 2}
Σ(W 1 x, v) = Σ(v, W 1 x) = Σin (v, W 1 x) = 0
1
1
1
1
1
Next, we extend µ
Pand Σ to h , introduced via LinComb by h := W x + b . Note that h is a G-var
of the form g = i ai y i where a1 = a2 = 1, y 1 = W 1 x, and y 2 = b1 . Therefore, by the LinComb
case of Eq. (2),

µ(h1 ) = µ(W 1 x) + µ(b1 ) = 0
Σ(h1 , W 1 x) = Σ(W 1 x, W 1 x) + Σ(b1 , W 1 x) = 1 + 0 = 1
Σ(h1 , b1 ) = Σ(W 1 x, b1 ) + Σ(b1 , b1 ) = 0 + 1 = 1
Σ(h1 , b2 ) = Σ(W 1 x, b2 ) + Σ(b1 , b2 ) = 0 + 0 = 0
Σ(h1 , v) = Σ(W 1 x, v) + Σ(b1 , v) = 0 + 0 = 0
Σ(h1 , h1 ) = Σ(h1 , W 1 x) + Σ(h1 , b1 ) = 1 + 1 = 2.
So h1 is correlated with W 1 x and b1 in obvious ways, and is independent from b2 and v.
Next, we extend µ and Σ to, introduced via MatMul by h̃2 := W 2 x1 . Note that h̃2 is a G-var of the
form g = W h where W = W 2 is an A-var, and h = x1 is an H-var introduced by x1 := ReLU(h1 ).
Therefore, by the “otherwise” case of Eq. (2),
µ(h̃2 ) = 0
Σ(h̃2 , W 1 x) = 0
Σ(h̃2 , b1 ) = 0
Σ(h̃2 , b2 ) = 0
Σ(h̃2 , v) = 0
Σ(h̃2 , h1 ) = 0
and by the MatMul case of Eq. (2) (setting φ and φ̄ there to both be ReLU),
2
2
Σ(h̃2 , h̃2 ) = σW
2 E φ(z)φ̄(z) = E ReLU(z) = 1
z

1

1

z
1

where z ∼ N (µ(h ), Σ(h , h )) = N (0, 2).
21

N ETSOR program 6 MLP Computation on a Set of Inputs
for i = 1, . . . , B do
h1i := W 1 xi + b1 : G(n)
x1i := φ(h1i ) : H(n)
for l = 2, . . . , L do
h̃li := W l xl−1,i : G(n)
hli := h̃li + bl : G(n)
xli := φ(hli ) : H(n)
end for
end for
√
√
Output: (v > xL1 / n, . . . , v > xLB / n)

// Embeddings of inputs
Input: W 1 x1 , . . . , W 1 xB : G(n)
// Biases across L layers
Input: b1 , . . . , bL : G(n)
// Weights from layer 2 on
Input: W 2 , . . . , W L : A(n, n)
// Readout weights
Input: v : G(n)

Thus, h̃2 can be thought of as “independent” from all other G-vars.
2
Finally, we extend
by h2 := h̃2 + b2 . Note that h2 is a G-var
Pµ andi Σ to h , introduced via1LinComb
2
of the form g = i ai y where a1 = a2 = 1, y = h̃ , and y 2 = b2 . Then by the LinComb case of
Eq. (2),

µ(h2 ) = µ(h̃2 ) + µ(b2 ) = 0
Σ(h2 , W 1 x) = Σ(h̃2 , W 1 x) + Σ(b2 , W 1 x) = 0 + 0 = 0
Σ(h2 , b1 ) = Σ(h̃2 , b1 ) + Σ(b2 , b1 ) = 0 + 0 = 0
Σ(h2 , b2 ) = Σ(h̃2 , b2 ) + Σ(b2 , b2 ) = 0 + 1 = 1
Σ(h2 , v) = Σ(h̃2 , v) + Σ(b2 , v) = 0 + 0 = 0
Σ(h2 , h1 ) = Σ(h̃2 , h1 ) + Σ(b2 , h1 ) = 0
Σ(h2 , h̃2 ) = Σ(h̃2 , h̃2 ) + Σ(b2 , h̃2 ) = 1 + 0 = 1
Σ(h2 , h2 ) = Σ(h̃2 , h2 ) + Σ(b2 , h2 ) = Σ(h2 , h̃2 ) + Σ(h2 , b2 ) = 1 + 1 = 2.
Note that h2 turns out to be “independent” from h1 , i.e. Σ(h2 , h1 ) = 0, just as one might expect from
the mean field or the NNGP literature.
Distribution of the Program Output We are now done
µ(g) and Σ(g, g 0 ) for all
√ with calculating
0
> 2
2
g, g ∈ G. Recall the output of the program is v x / n, where x was introduced via Nonlin by
x2 := ReLU(h2 ). According to Corollary 5.5, the output variance is then given by
σv2 E φ2 (z) = E ReLU(z)2 = 1,
z

z

where z ∼ N (µ(h2 ), Σ(h2 , h2 )) = N (0, 2).
B.1.2

MLP with Multiple Inputs (Program 6)

Now suppose we have an L-layer MLP with B inputs x1 , . . . , xB . Program 6 expresses its computation (again, the “for” loops are shorthands for the unrolled series of assignments).
Here we will avoid computing out all values of Σ but only those that affect the infinite-width GP. By
Corollary 5.5, the output of Program 6 is distributed as
 > Li > Lj 
Li
Lj
v x
v x
def
√ , √
Kij = Cov
= σv2 E φ(Z h )φ(Z h )
(6)
Z
n
n
Li

where σv2 is the coordinatewise variance of v, Z ∼ N (µ, Σ), and Z h is the component of Z
Lj
corresponding to hLi (likewise for Z h ). Therefore, we need to compute µ and Σ for the G-vars
{hL1 , . . . , hLB }.
22

Setup Suppose the inputs xi have dimension m. If we sample the neural network parameters in the
usual Glorot fashion,
1
2
Wαβ
∼ N (0, σw
/m),

vα ∼ N (0, σv2 ),

l
2
Wαβ
∼ N (0, σw
/n), ∀2 ≤ l ≤ L,

blα ∼ N (0, σb2 ), ∀l ∈ [L],

(7)

then we have Σin defined by
2 i> j
Σin (W 1 xi , W 1 xj ) = σw
x x /m,

Σin (bl , bl ) = σb2 ,

Σin (v, v) = σv2

for all i, j ∈ [B] and l ∈ [L], and Σin (g, g 0 ) = 0 for any other pairs of input G-vars g, g 0 . On the
other hand, µin (g) = 0 for all input G-vars g.
Computing µ From Eq. (2), it is clear that µin = 0 implies µ = 0.
Computing Σ

Again, our goal is to compute Σ restricted to the G-vars {hL1 , . . . , hLB }.

Lemma B.5. For any l = 2, . . . , L and any i, j ∈ [B],
2
Σ(hli , hlj ) = σw
E φ(z1 )φ(z2 ) + σb2

(8)

z1 ,z2


where (z1 , z2 ) ∼ N 0, Σ|hl−1,i ,hl−1,j , and (unrolling the restriction notation)


Σ(hl−1,i , hl−1,i ) Σ(hl−1,i , hl−1,j )
Σ|hl−1,i ,hl−1,j =
.
Σ(hl−1,j , hl−1,i ) Σ(hl−1,j , hl−1,j )
Proof. From Program 6, hli is introduced via LinComb by
hli := h̃li + bl .
Thus by the LinComb cases of Eq. (2), we have
Σ(hli , hlj ) = Σ(h̃li , hlj ) + Σ(bl , hlj )
= Σ(h̃li , h̃lj ) + Σ(bl , h̃lj ) + Σ(h̃li , bl ) + Σ(bl , bl ).
Now, we cannot pattern match Σ(bl , h̃lj ) with any of the cases of Eq. (2) other than the “otherwise”
case, which means Σ(bl , h̃lj ) = 0. Likewise, Σ(h̃li , bl ) = 0. Therefore,
Σ(hli , hlj ) = Σ(h̃li , h̃lj ) + Σ(bl , bl )
= Σ(h̃li , h̃lj ) + σb2 .
Now let’s analyze the Σ(h̃li , h̃lj ) term. The G-var h̃li is introduced via MatMul by
h̃li := W l xl−1,i ,

where xl−1,i := φ(hl−1,i )

and likewise for hlj . By the MatMul case of Eq. (2), we have
l−1,i

2
Σ(h̃li , h̃lj ) = σw
E φ(Z h
Z

l−1,j

)φ(Z h

)

where Z ∼ N (µ, Σ). Since the integrand only depends two components of Z, we can simplify the
expression as
l−1,i

E φ(Z h
Z

l−1,j

)φ(Z h

) = E φ(z1 )φ(z2 ),
z1 ,z2


where (z1 , z2 ) ∼ N 0, Σ|hl−1,i ,hl−1,j .

Putting it all together, we recover the expression in the claim, as desired.
23

Computing the GP Kernel K Eq. (8) along with Eq. (6) gives all we need to compute K by
recursion. If φ has a nice V-transform Vφ , then we can vectorize this equation and obtain the
following algorithm (which, again, is by now well-known [46, 50, 37])
Computing MLP kernel on B inputs
Consider an L-layer MLP with nonlinearity φ at each layer. Suppose we have B network
inputs x1 , . . . , xB ∈ Rm , as in Program 6, and we sample the MLP parameters as in Eq. (7).
Then the MLP converges in distribution to a GP on those B inputs, with kernel K computed
as follows
2 i> j
1. Initialize K ∈ RB×B by Kij ← σw
x x /m
2
2. For l = 1, . . . , L − 1, do K ← σw
Vφ (K) + σb2

3. Return K ← σv2 Vφ (K)

B.2

Simple RNN (Program 2)

By Corollary 5.5, we know that the output of Program 2,

 > 11
v > st1 v > s12
v > sr2
v s
√ ,..., √ , √ ,..., √
n
n
n
n
is, in the large n limit, distributed as a Gaussian with mean 0 and the covariance K where, for any
a, b ∈ {1, 2} (denoting sequence number),
 > ia > j b 
ia
jb
v s
v s
def
√ , √
Kia,jb = lim Cov
= σv2 E φ(Z h )φ(Z h )
n→∞
Z
n
n
ia

jb

where Z ∼ N (µ, Σ), and Z h is the component of Z corresponding to hia and likewise for Z h .
Therefore, we need to compute µ and Σ for the G-vars {h11 , . . . , hs1 , h12 , . . . , ht2 } in Program 2.
Setup Suppose the input tokens xia to the RNN have dimension m. We will obtain the µ and Σ for
Program 2 with
2
2
Uαβ ∼ N (0, σU
/m), Wαβ ∼ N (0, σW
/n), bα ∼ N (0, σb2 ), vα ∼ N (0, σv2 ).

(9)

The randomization of U induces the following covariance structure in the input token embeddings
2 >
Σin (U x, U y) = σU
x y/m

(10)

for any x, y ∈ {xi1 }ti=1 ∪ {xj2 }rj=1 . For any other pair g, g 0 of input G-vars, the sampling implies
Σin (g, g 0 ) = 0. Additionally, µin (g) = 0 for all input G-var g.
Computing µ In fact, one can quickly see that µ(g) = 0 for all G-vars g, not just the input G-vars.
Computing Σ By Eq. (2), all {hi1 , h̃i1 }ti=1 ∪ {hj2 , h̃j2 }rj=1 are possibly correlated with each other.
They satisfy the following recurrence
Lemma B.6. For any a, b ∈ {1, 2}, we have
Σ(hia , hjb ) = Σ(h̃ia , h̃jb ) + Σin (U xia , U xjb ) + σb2 ,

∀i, j ≥ 1

(11)

2
Σ(h̃ia , h̃jb ) = σW
E φ(z1 )φ(z2 ),

∀i, j ≥ 2,

(12)

where
(z1 , z2 ) ∼ N (0, Σ|hi−1,a ,hj−1,b ),
ia

jb

and the base case Σ(h̃ , h̃ ) = 0 if i ≤ 1 or j ≤ 1. Here, Σ|set means the submatrix of Σ with
rows and columns in set.
Note that the notation b appears both as a sequence index and as the bias of the RNN. Since the
former will only appear as a superscript and the latter will not, there should be no confusion.
24

Proof. Note that for each i ≥ 2, hia is introduced via LinComb by hia := h̃ia + U xia + b, where
h̃ia , U xia , and b are G-vars. Then by the LinComb case of Eq. (2),
Σ(hia , hjb ) = Σ(h̃ia , hjb ) + Σ(U xia , hjb ) + Σ(b, hjb )
= Σ(h̃ia , h̃jb ) + Σ(U xia , h̃jb ) + Σ(b, h̃jb )
+ Σ(h̃ia , U xjb ) + Σ(U xia , U xjb ) + Σ(b, U xjb )
+ Σ(h̃ia , b) + Σ(U xia , b) + Σ(b, b).
By the “otherwise” case of Eq. (2),
Σ(U xia , h̃jb ) = Σ(b, h̃jb ) = Σ(h̃ia , U xjb ) = Σ(h̃ia , b) = 0,
and by the “input G-var” case of Eq. (2),
Σ(b, U xjb ) = Σ(h̃ia , b) = Σin (b, U xjb ) = Σin (h̃ia , b) = 0.
We thus have
Σ(hia , hjb ) = Σ(h̃ia , h̃jb ) + Σ(U xia , U xjb ) + Σ(b, b)
= Σ(h̃ia , h̃jb ) + Σ(U xia , U xjb ) + σb2
which is Eq. (11).
Next, note that h̃ia is introduced via MatMul by h̃ia := W sia , and sia is an H-var introduced by
sia := φ(hia ). Thus, by the MatMul rule of Eq. (2),
ia

jb

2
Σ(h̃ia , h̃jb ) = σW
E φ(Z h )φ(Z h )
Z

ia

jb

where Z ∼ N (µ, Σ) and Z h (resp. Z h ) is its component corresponding to hia (resp. hjb ). Since
ia
jb
the integrand only depends on the two components Z h and Z h , we can rewrite
2
Σ(h̃ia , h̃jb ) = σW
E φ(z1 )φ(z2 )
z1 ,z2

where (z1 , z2 ) ∼ N (0, Σ|hi−1,a ,hj−1,b ). This is Eq. (12).
Let us formulate the results above in a way more suggestive of the algorithm required to compute the
def
def
kernel. For any 2 ≤ p ≤ t, 2 ≤ q ≤ r, define H̃ pq = {h̃i1 }pi=2 ∪ {h̃j2 }qj=2 and X pq = {U xi1 }pi=1 ∪
{U xj2 }qj=1 . Denote by Σ|H̃ pq the restriction of Σ to H̃ pq , and likewise Σin |X pq the restriction of
Σin to X pq . 
We can visualize

 pp

App B pq
P
Qpq
(p+q−2)×(p+q−2)
in
Σ|H̃ pq =
∈R
Σ |X pq =
∈ R(p+q)×(p+q)
B pq > C qq
Qpq > Rqq
(13)
where
def

C qq = {Σ(h̃i2 , h̃j2 )}q,q
i,j=2

def

Rqq = {Σin (U xi2 , U xj2 )}q,q
i,j=1

App = {Σ(h̃i1 , h̃j1 )}p,p
i,j=2
P pp = {Σin (U xi1 , U xj1 )}p,p
i,j=1

def

B pq = {Σ(h̃i1 , h̃j2 )}p,q
i,j=2

def

def

Qpq = {Σin (U xi1 , U xj2 )}p,q
i,j=1 .

def

Let Σ|0H̃ pq also denote Σ|H̃ pq padded with an additional column and an additional row of 0s on the
left and top of each block App , B pq , B pq > , C qq :


0
0
0
0
pp
pq
0 B 
0 A
(p+q)×(p+q)
Σ|0H̃ pq = 0
.
(14)
0
0
0 ∈R
pq >
qq
0 B
0 C
Then Eqs. (11) and (12) can be combined and vectorized as

Σ|H̃ p+1,q+1 = Vφ Σ|0H̃ pq + Σin |X pq + σb2 .
(15)
Eq. (15) quickly yields to a iterative, vectorized algorithm for computing Σ|H̃ tr (recall t and r are the
lengths of the two input sequences), assuming that Vφ can be efficiently computed (such as those
def

under Definition B.1). Then, with H pq = {hi1 }pi=1 ∪ {hj2 }qj=1 , we have
Σ|H tr = Σ|0H̃ tr + Σin |X tr + σb2 .
25

Computing the GP Kernel Finally, given Σ|H tr , by Corollary 5.5, the covariance of the output of
Program 2 in the large n limit is
K = σv2 Vφ (Σ|H tr ) .
Computing RNN kernel
Consider a simple RNN with nonlinearity φ, as in Program 2. Suppose we have 2 input
sequences x11 , . . . , xt1 and x12 , . . . , xr2 ∈ Rm . Assume we sample the RNN parameters as
in Eq. (9). Then the outputs of the RNN converge jointly in distribution to a Gaussian with
covariance computed as follows.
1. Initialize Σin according to Eq. (10).
2. Starting with p = q = 0, do


2
(a) Σ|H̃ p+1,q+1 ← σw
Vφ Σ|0H̃ pq + Σin |X pq + σb2 (see Eqs. (13) and (14) for
notations)
(b) Set p ← min(p + 1, t), q ← min(q + 1, r).
(c) If p and q did not change, break.
3. Compute Σ|H tr ← Σ|0H̃ tr + Σin |X tr + σb2 .
4. The output kernel is given by
K ← σv2 Vφ (Σ|H tr ) .
See our repository github.com/thegregyang/GP4A for a reference implementation of this kernel.
B.3

Batchnorm (Program 3)

As shown in Appendix A, batchnorm (followed by a coordinatewise nonlinearity) can be just thought
of a multivariate nonlinearity, and the computation of Σ can largely follow the same pattern as for
any other feedforward neural net (see Program 3). However, doing so efficiently is not so obvious,
especially when the batch size is large. In this section, we describe how to overcome this apparent
difficulty.
B.3.1

Batchnorm with Single Batch

Let us compute the GP kernel for Program 3, assuming there is only one batch.
Setup The network in Program 3 has parameters W 1 ∈ Rn×m , where m is the input dimension,
and W l ∈ Rn×n for 2 ≤ l ≤ L. Since batchnorm is scale-invariant, we will just assume that
1
Wαβ
∼ N (0, 1/m),

l
Wαβ
∼ N (0, 1/n), ∀l ≥ 2,

and vα ∼ N (0, σv2 ). This means that the initial N ETSOR sampling data have values
Σin (v, v) = σv2
0 0

0 0

Σin (W 1 xia , W 1 xi a ) = xia> xi a /m,
and µin = 0 identically.
Computing µ As before, from Eq. (2), it is easy to see that µin = 0 implies µ = 0.
Computing Σ Applying Eq. (2) in the fashion of Lemma B.5, we get
Lemma B.7. For any a ∈ [k] and 2 ≤ l ≤ L, let H la denote the set {hlia }i∈[Ba ] . Also write
def

H 1a = {W 1 xia }i∈[Ba ] . Recall that Σ|set denotes the square submatrix of Σ with rows and columns
in set. Then for any a ∈ [k] and l = 1, . . . , L − 1,
Σ|H l+1,a =

E

ζ∼N (0,Σ|H la )

φ̃(ζ)φ̃(ζ)> = Vφ̃ (Σ|H la ) ∈ RBa ×Ba ,

(16)

where φ̃ is batchnorm followed by coordinatewise nonlinearity φ, as in Appendix A and Program 3.
26

A priori, evaluating this expectation requires a Ba -dimensional Gaussian integral, which becomes
intractible when B is large. However, if φ = ReLU, then surprisingly one can reduce the Bdimensional integral this Gaussian expectation seems to require to a 1-dimensional integral: By [65]
we can express Eq. (16) as
Z ∞
Σ|H l+1,a = Ba
0

VReLU (ΣG (I + 2sΣG )−1 )
p
ds
det(I + 2sΣG )

(17)

where VReLU is as in Fact B.2, and
def

ΣG = GΣ|H la G
1
def
G = IB − 11> .
B
B.3.2

Batchnorm with Multiple Batches

Now let’s consider the covariance of preactivations between different batches. We maintain the same
setup as above, and as usual µ = 0 identically.
Computing Σ

By another straightforward application of Eq. (2), we get

Lemma B.8. With the same notation as in Lemma B.7, for two different batches a 6= b,
Σ(H l+1,a , H l+1,b ) = E φ̃(ζ1 )φ̃(ζ2 )>
where the expectation is taken over
 
 
ζ1
Σ(H la , H la )
∼ N 0,
ζ2
Σ(H lb , H la )


Σ(H la , H lb )
.
Σ(H lb , H lb )

Again, this expectaion seems to require an integral in (Ba + Bb ) dimensions. However, via some
integral tricks, this expectation can be transformed to the following 2D integral:

Σ(H l+1,a , H l+1,b ) =

p

Ba Bb π −1

Z ∞

Z ∞
ds

0

dt (st)−1/2 det(IBa +Bb + 2Ω)−1/2 VReLU (Π)12

0

(18)

where
Ω = D1/2



Ga Σ(Y, Y )Ga
Gb Σ(Y 0 , Y )Ga


Ga Σ(Y, Y 0 )Gb
D1/2
Gb Σ(Y 0 , Y 0 )Gb

Π = D−1/2 Ω(I + 2Ω)−1 D−1/2


sIBa
0
D = sIBa ⊕ tIBb =
0
tIBb
Ga = IBa − Ba−1 11>
Gb = IBb − Bb−1 11>
and VReLU (Π)12 is the block of VReLU (Π) on the first row, second column, of size Ba × Bb .
Computing the GP Kernel K The computation is similar to Lemmas B.7 and B.8, so let us
directly summarize the entire algorithm below.
27

Computing Batchnorm+ReLU kernel
We compute the kernel of a L-layer fully-connected network where each layer has a batchnorm
followed by ReLU, as shown in Program 3. Let the input dimension be m and the common
1
2
width of hidden layers be n. Sample the first layer weights W 1 as Wαβ
∼ N (0, σW
/m)
l
l
2
and each higher layer’s weight matrix W as Wαβ ∼ N (0, σW /n) with σW = 1 (since
batchnorm is scale-invariant), and the readout layer as vα ∼ N (0, σv2 ). We omit biases since
batchnorm is shift invariant. Suppose we have k batches of inputs {xib : i ∈ [Bb ], b ∈ [k]},
with batch b containing Bb inputs. Then the outputs of the network converge jointly in
distribution to a Gaussian N (0, K) with K computed as follows.
0
0
1. Initialize {Kab
∈ RBa ×Bb }ka,b=1 by (Kab
)ij ← xia> xjb /m.

2. For l = 1, . . . , L, do
(a) For a = 1, . . . , k, do
l
l−1
i. Kaa
← Vφ̃ (Kaa
) by evaluating a 1D integral according to Eq. (17).
(b) For a, b ∈ [k], a 6= b, do
l−1
l−1
l
l−1
i. Compute Kab
by using Kab
, Kaa
, Kbb
and evaluating a 2D integral
according to Eq. (18).
3. Return
 L

L
K11 · · · K1k

..  ∈ RPa Ba ×Pa Ba
..
K ← σv2  ...
.
. 
L
Kk1

···

L
Kkk
.

Vectorized Implementation In our repo github.com/thegregyang/GP4A, we show how to
implement single- and multi-batch BN using the quadpy [48] package for vectorized quadrature
integration, and by using eigendecomposition to simplify the computation of the integrand in the
integrals above.
B.4

Convolution and Pooling (Program 4)

Convolution and pooling, in the context of neural network-Gaussian process correspondence, have
already been treated in [43, 18]. In this section we revisit the same derivations from the perspective
of tensor programs.
B.4.1

CNN with Single Input

Let us compute the GP kernel for Program 4, for the following setup:
Setup The CNN in Program 4 has parameters {Wj1 }j∈ker1 , {Wj2 }j∈ker2 . It has widths n1 and n2 ,
but for simplicity, let’s assume n1 = n2 = n. Each input image is given as {xi ∈ Rm }i∈pos0 where
pos0 denotes “pixel locations” and m denotes number of channels (for example, pos0 = [32] × [32]
and m = 3 for the CIFAR10 dataset). Suppose we sample the parameters as
2
(Wj1 )αβ ∼ N (0, σw
/m), ∀j ∈ ker1 ,

2
(Wj2 )αβ ∼ N (0, σw
/n1 ), ∀j ∈ ker2 ,

vα ∼ N (0, σv2 /n).

This induces Σin as follows:
Σin (v, v) = σv2
2 >
Σin (Wj1 xi+j , Wj10 xi0 +j 0 ) = σw
xi+j xi0 +j 0 /m

for any i, i0 ∈ pos1 , j, j 0 ∈ ker1 such that i + j, i0 + j 0 ∈ pos0 ; and Σin (g, g 0 ) = 0 for any other
pairs of input G-vars. In addition, µin = 0 identically.
Computing µ As before, from Eq. (2), it is easy to see that µin = 0 implies µ = 0.
28

Computing Σ By straightforward applications of Eq. (2), we obtain the following
Lemma B.9. For any i, i0 ∈ pos1 ,
X
Σ(h1i , h1i0 ) =
Σin (Wj1 xi+j , Wj10 xi0 +j 0 ).
j,j 0 ∈ker 1

In addition, for any j, j 0 ∈ ker2 such that i + j, i0 + j 0 ∈ pos1 ,
2
Σ(h2i;j , h2i0 ;j 0 ) = σw
E φ(z1 )φ(z2 )I(j = j 0 ),
z1 ,z2

where (z1 , z2 ) ∼ N (0, Σ|h1i ,h10 ). Finally, for any i, i0 ∈ pos2 ,
i
X
Σ(h2i;j , h2i0 ;j 0 )
Σ(h2i , h2i0 ) =
j,j 0 ∈ker 2
0

where the sum is over all j, j ∈ ker such that i + j, i0 + j 0 ∈ pos1 .
2

Computing the GP kernel K By Corollary 5.5, the output of the CNN converges in distribution
to N (0, K) where K is a scalar given by
!2
 > 2
2
2
v x̄
1 X
def
2
h2i
K = lim Var
= σv E
φ(Z )
= σv2 0 E 2 E φ(Z hi )φ(Z hi0 )
2
n→∞
Z
Z
n
|pos | i
i,i ∈pos
where Z ∼ N (µ, Σ) and where in the last expression, i, i0 are sampled independently and uniformly
def

from pos2 . If we let H 2 = {h2i }i∈pos2 , then K can be computed as
K = σv2
B.4.2

E

i,i0 ∈pos2

Λii0

where

def

Λ = Vφ (Σ|H 2 ) .

CNN with Multiple Inputs

Now consider the general case when we have multiple inputs x1 , . . . , xB and have L layers (but, for
simplicity, still no bias), as in Program 7. The derivation is very similar to the single input case, but
we will err on the side of completeness.
Setup The CNN in Program 7 has parameters {W l }l∈[L],j∈kerl . It has widths n1 , . . . , nL , but
as before, we shall assume they are all equal to n for simplicity. Each input image xa is given as
{xai ∈ Rm }i∈pos0 where pos0 denotes “pixel locations” and m denotes number of channels. Suppose
we sample the parameters as
2
(Wj1 )αβ ∼ N (0, σw
/m), ∀j ∈ ker1 ,

2
(Wjl )αβ ∼ N (0, σw
/nl−1 ), ∀j ∈ kerl ,

for all l = 2, . . . , L, and vα ∼ N (0, σv2 /n). This induces Σin as follows:
Σin (v, v) = σv2
0

0

2 a > a
Σin (Wj1 xai+j , Wj10 xai0 +j 0 ) = σw
xi+j xi0 +j 0 /m

for any a, a0 ∈ [B] and any i, i0 ∈ pos1 , j, j 0 ∈ ker1 such that i+j, i0 +j 0 ∈ pos0 ; and Σin (g, g 0 ) = 0
for any other pairs of input G-vars. In addition, µin = 0 identically.
Computing µ As before, from Eq. (2), it is easy to see that µin = 0 implies µ = 0.
Computing Σ By straightforward applications of Eq. (2), we obtain the following
Lemma B.10. For any a, a0 ∈ [B] and any i, i0 ∈ pos1 ,
X
0
1a0
Σ(h1a
Σin (Wj1 xai+j , Wj10 xai0 +j 0 ).
i , hi0 ) =

(19)

j,j 0 ∈ker 1

In addition, for any 2 ≤ l ≤ L and any j, j 0 ∈ ker2 such that i + j, i0 + j 0 ∈ pos1 ,
0

la
2
0
Σ(hla
i;j , hi0 ;j 0 ) = σw E φ(z1 )φ(z2 )I(j = j ),
z1 ,z2

29

(20)

N ETSOR program 7 L-layer Convolutional Network with Global Average Pooling
Input: {Wj1 xai+j : G(n1 )}

a∈[B],
j∈ker 1 ,i∈pos1
s.t. i+j∈pos0

Input: {Wjl : A(nl , nl−1 )}2≤l≤L,j∈kerl
// Readout weights
Input: v : G(nL )
for a ∈ [B] do
// Layer 1 convolution
for i ∈ pos1 do
// Directly use input embeddings
// LinComb
// Sum is over all j ∈ ker1 such that
// there P
is i0 ∈ pos0 with i0 = j + i
1a
hi := j Wj1 xai+j : G(n1 )
end for
// Higher layer convolutions
for l = 2, . . . , L do
for i ∈ posl−1 do
xl−1,a
:= φ(hl−1,a
) : H(nl−1 )
i
i
end for
for j ∈ kerl , i ∈ posl s.t. i + j ∈ posl−1 do
// MatMul
l l−1,a
hla
: G(nl )
i;j := Wj xi+j
end for
for i ∈ posl do
// Sum is over all j ∈ kerl such that
// there P
is i0 ∈ posl−1 with i0 = j + i
la
l
hi := j hla
i;j : G(n )
end for
end for
// NonlinearityP
& Global Average Pooling
1
La
L
x̄La := |pos
L|
i∈ker L φ(hi ) : H(n )
end for
√
√
Output: v > x̄L1 / nL , . . . , v > x̄LB / nL



where (z1 , z2 ) ∼ N 0, Σ|hl−1,a ,hl−1,a0 . Finally, for any i, i0 ∈ posl ,
i

i0

0

la
Σ(hla
i , hi0 ) =

X

0

la
Σ(hla
i;j , hi0 ;j 0 )

(21)

j,j 0

where the sum is over all j, j 0 ∈ kerl such that i + j, i0 + j 0 ∈ posl−1 .
These equations are all we need to compute the GP kernel K.
Computing the GP kernel K By Corollary 5.5, the output of the CNN converges in distribution
to N (0, K) where K ∈ RB×B is given by
!
!
!
0
X
La0
v > x̄La v > x̄La
1 X
1
def
2
hLa
h
√ , √
Kaa0 = lim Cov
= σv E
φ(Z i )
φ(Z i )
n→∞
Z
|posL | i
|posL | i
n
n
= σv2

La

E

La0

E φ(Z hi )φ(Z hi0 )

i,i0 ∈posL Z

(22)

where Z ∼ N (µ, Σ) and where in the last expression, i, i0 are sampled independently and uniformly
La0
from posL . Since Σ(hLa
i , hi0 ) can be obtained recursively via Lemma B.10, one can compute K
easily via recursion. But we can do better by vectorizing the whole computation.
30

Vectorized Implementation Let us define the 4-tensor
Σl = {Σlaa0 ii0 : a, a0 ∈ [B], i, i0 ∈ posl }
by
0

def

la
Σlaa0 ii0 = Σ(hla
i , hi0 ).

Then Eq. (19) corresponds to
2
Σ1aa0 ii0 = σw

X

0

xai+j > xai0 +j 0 /m

j,j 0
0

where the sum is over all j, j ∈ ker such that i + j, i0 + j 0 ∈ pos0 . For l = 2, . . . , L − 1, Eqs. (20)
and (21) can be vectorized as
2
Σlaa0 = κl ∗ Σ̂laa0 , where Σ̂l = σw
Vφ (Σl−1 ),
1

treating Σl−1 as a (B · posl−1 ) × (B · posl−1 ) matrix, and κl ∗ is the “convolution”
X
(κl ∗ Σ̂laa0 )ii0 =
(Σ̂laa0 )i+j,i0 +j 0 .
0

(23)

l

j,j ∈ker
i+j∈posl−1
0
i +j 0 ∈posl−1

This κl convolution can indeed be implemented as a (CUDA) convolutional operation, vectorized
over all a, a0 .
Finally, to obtain the infinite-width GP kernel K of the CN output, we can vectorize Eq. (22) as
Kaa0 = σv2 E ∗ Σ̂L ,
and E∗ denotes the spacial averaging

where
def

(E ∗ Σ̂L )aa0 =

E

Σ̂L = Vφ (ΣL−1 ),

i,i0 ∈posL

Σ̂L
aa0 ii0 .

(24)

Again, E∗ can be implemented as a convolution operator vectorized over all a, a0 .
In summary,
Computing CNN Kernel
Suppose we have an L-layer convolutional neural network with coordinatewise nonlinearity
φ but no bias, as in Program 7, that takes images with m channels and of size pos0 × pos0 .
Suppose we have a set of inputs x1 , . . . , xB where each input xa is given as xa = {xai ∈
Rm }i∈pos0 . Then the CNN outputs converge in distribution to a Gaussian N (0, K) where
K ∈ RB×B can be calculated as follows.
l
l
1. Initialize Σ1 ∈ RB×B×pos ×pos by
X
0
2
Σ1aa0 ii0 = σw
xai+j > xai0 +j 0 /m
j,j 0

where the sum is over all j, j 0 ∈ ker1 such that i + j, i0 + j 0 ∈ pos0 .
2. For l = 2, . . . , L − 1, do
2 l
(a) Σl ← σw
κ ∗ Vφ (Σl−1 ) (see Eq. (23) for κl ’s definition)

3. return K ← σv2 E ∗ Vφ ΣL−1 (see Eq. (24) for E’s definition)

B.5

GRU (Program 5)

We demonstrate how to compute the GP kernel for GRU as encoded in N ETSOR by Program 5. A key
distinguishing feature of this conversion is that we will need to compute high dimensional Gaussian
expectations, where the dimension is as large as the number of timesteps unrolled, in contrast to the
simple RNN case Program 2. These Gaussian expectations correspond to the expected values of
multiplication of the gate values across time.
We first proceed with a single input sequence, as in Program 5. We then comment on the generalization
to multiple sequences at the end.
31

Setup We will obtain the µ and Σ for Program 5 with
2
2
(Uz )αβ , (Ur )αβ , (Uh )αβ ∼ N (0, σU
/n), (Wz )αβ , (Wr )αβ , (Wh )αβ ∼ N (0, σW
/n),

(bz )α , (br )α , (bh )α ∼ N (0, σb2 ),

vα ∼ N (0, σv2 ), and h0 = 0.

(25)

Suppose the input tokens xi to the GRU have dimension m. The randomization of U induces the
following covariance structure in the input token embeddings
2 >
Σin (U x, U y) = σU
x y/m

for any x, y ∈ {xi }Ti=1 . For any other pair g, g 0 of input G-vars, Σin (g, g 0 ) = 0. Additionally,
µin (g) = 0 for all input G-vars g.
Computing µ In fact, one can quickly see that µ(g) = 0 for all G-vars g.
Computing Σ Applying Eq. (2) to Program 5 and some simplification in the manner of
Lemma B.6’s proof yields, for any two times t, s,
2 t> s
Σ(z̃ t , z̃ s ) = Σ(htz , hsz ) + σU
x x /m + σb2
t

(26)

s

2 t> s
Σ(r̃ , r̃ ) = Σ(htr , hsr ) + σU
x x /m + σb2
2 t> s
Σ(h̃t , h̃s ) = Σ(hth , hsh ) + σU
x x /m + σb2
Σ(htz , hsz ) = Σ(htr , hsr )
t X
s 
X
i
j
2
= σW
E φ(Z h̃ )φ(Z h̃ )
i=1 j=1


i

× E σ(Z z̃ )

(27)
(28)



t
Y

z̃



p

j

(1 − σ(Z )) × σ(Z z̃ )

p=i+1



s
Y

z̃

q



(1 − σ(Z ))

(29)

q=j+1

t

s

2
Σ(hth , hsh ) = σW
Σ(htz , hsz ) E σ(Z r̃ )σ(Z r̃ )

(30)

where expectations are taken over Z = {Z g }g is G-var ∼ N (µ, Σ), which has one component for each
G-var in the program. Then, applying Corollary 5.5, we see that the output of the GRU
√
√
(v > h1 / n, . . . , v > hT / n)
converges in distribution to a zero mean Gaussian distribution with covariance matrix K =
{Kts }Tt,s=1 ,
Kts = σv2

t X
s 
X

i

j

E φ(Z h̃ )φ(Z h̃ )

i=1 j=1



t
Y

i

× E σ(Z z̃ )


z̃

p



s
Y

j

(1 − σ(Z )) × σ(Z z̃ )

p=i+1





(1 − σ(Z ))
.
z̃

q

(31)

q=j+1

Eqs. (27) to (31) yield the complete set of equations to compute the output covariance K, but to do
so efficiently rests entirely on evaluating the the possibly T -dimensional integral behind

 

t
s
Y
Y
i
p
j
q
E σ(Z z̃ )
(1 − σ(Z z̃ )) × σ(Z z̃ )
(1 − σ(Z z̃ )) .
(32)
p=i+1

q=j+1

For general σ and φ, this is hopeless. However, when φ = erf and σ = (1 + erf)/2 — which
approximate φ = tanh and σ = sigmoid — Eq. (32) can in fact be evaluated efficiently by reducing
it to a Gaussian orthant probability, which can be evaluated efficiently [19]:
32

N ETSOR program 8 GRU, Multiple Input Sequences
// Embeddings of B input sequences
// with ath sequence having length Ta
Input: {Uz xta : G(n)}a∈[B],t∈[Ta ]
Input: {Ur xta : G(n)}a∈[B],t∈[Ta ]
Input: {Uh xta : G(n)}a∈[B],t∈[Ta ]
// Parameters
Input: Wz , Wr , Wh : A(n, n)
Input: bz , br , bh : G(n)
// Initial GRU state
Input: h0 : G(n)
// Readout layer
Input: v : G(n)
for a ∈ [B] do
for t ∈ [Ta ] do
t−1,a
hta
: G(n)
z := Wz h
z̃ ta := hta
+
Uz xta + bz : G(n)
z
t−1,a
hta
: G(n)
r := Wr h
ta
ta
r̃ := hr + Ur xta + br : G(n)
// Morally, ĥt−1,a = σ(r̃t−1,a ) ht−1,a , but we need to unroll ht−1,a to apply Nonlin
t−1,a
ĥt−1,a
)
 := σ(r̃

J
Pt−1
Jt−1
t−1
0
ia
ja
ja
la
h
σ(z̃ )
i=1 (1 − σ(z̃ )) +
j=1 φ(h̃ )
l=j+1 (1 − σ(z̃ )) : H(n)
t−1,a
hta
: G(n)
h := Wh ĥ
ta
ta
h̃ := hh + Uh xta + bh : G(n)
// Unrolling J
ht to a coordinatewisePfunction of G-vars
t
t
t
0
ia
ja
h := h
σ(z̃ ja )
i=1 (1 − σ(z̃ )) +
j=1 φ(h̃ )
end for
end for
√
Output: {v > hta / n}a∈[B],t∈[Ta ]

Jt

l=j+1 (1 − σ(z̃

la

)) : H(n)

Lemma B.11. Let φ = erf and σ = (1 + erf)/2. Then for any µ ∈ RT and any PSD Σ ∈ RT ×T ,

E

x∼N (µ,Σ)

E

x∼N (µ,Σ)

T
Y

φ(xi ) =

i=1
T
Y

σ(xi ) =

i=1

=

E

x∼N (µ,Σ+ 12 I)

E

x∼N (µ,Σ+ 21 I)

Pr

x∼N (µ,Σ+ 21 I)

T
Y

sgn(xi )

i=1
T
Y

I(xi ≥ 0)

i=1

[x ≥ 0].

Remark B.12. Observe that if T = 2, then Lemma B.11 recovers the arccosine kernel of erf via
Fact B.3:

E [erf(x1 )erf(x2 ) : x ∼ N (0, Σ)] =

33

2
arcsin q
π
(Σ

Σ12

1
1
11 + 2 )(Σ22 + 2 )

.

To apply Lemma B.11, we can express Eq. (32) as


i

E σ(Z z̃ )



t
Y



p

j

σ(−Z z̃ ) × σ(Z z̃ )

p=i+1


= E σ(Ŷ i )

= E

t
Y


q

σ(−Z z̃ )

q=j+1

s
Y







s
Y

σ(Ŷ p ) × σ(Y̌ j )

p=i+1



s
Y


σ(Y̌ q )

q=j+1



σ(Ŷ p ) × 

p=i

s
Y


σ(Y̌ q )

q=j

where (Ŷ i , . . . , Ŷ t , Y̌ j , . . . , Y̌ s ) ∼ N (ν, Ω) with b and Ω given as follows

ν(Ŷ i ) = µ(z̃ i )

ν(Y̌ j ) = µ(z̃ j )

ν(Ŷ p ) = −µ(z̃ p ), ∀p ≥ i + 1

ν(Y̌ q ) = −µ(z̃ q ), ∀q ≥ j + 1

Σ(z̃ p , z̃ q )
if p ≥ i + 1, q ≥ j + 1, or p = i, q = j
−Σ(z̃ p , z̃ q ) otherwise.
(
0
Σ(z̃ p , z̃ p )
if p, p0 ≥ i + 1, or p = p0 = i
p
p0
Ω(Ŷ , Ŷ ) =
p p0
−Σ(z̃ , z̃ ) otherwise.
(
0
Σ(z̃ q , z̃ q )
if q, q 0 ≥ j + 1, or q = q 0 = j
q
q0
Ω(Y̌ , Y̌ ) =
q q0
−Σ(z̃ , z̃ ) otherwise.
Ω(Ŷ p , Y̌ q ) =



Using Lemma B.11, one then has


i

E σ(Z z̃ )

t
Y


p


j

σ(−Z z̃ ) × σ(Z z̃ )

p=i+1

s
Y


q

σ(−Z z̃ )

q=j+1




1
= Pr X ≥ 0 : X ∼ N ν, I + Ω .
2

(33)

If we two input sequences, the equations for recursively computing Σ and of K are similar to the
above, and we summarize them below
34

Computing the GRU kernel
Consider a GRU processing B sequences in the fashion of Program 8, with φ = erf and
σ = (1 + erf)/2. Sample the GRU’s parameters as in Eq. (25). Then for sequence numbers
a, b ∈ [B] and time steps 2 ≤ t ≤ Ta , 2 ≤ s ≤ Tb , we have the following recurrence
relations
sb
2 ta> sb
Σ(z̃ ta , z̃ sb ) = Σ(hta
x /m + σb2
z , hz ) + σU x
sb
2 ta> sb
Σ(r̃ta , r̃sb ) = Σ(hta
x /m + σb2
r , hr ) + σU x
sb
2 ta> sb
Σ(h̃ta , h̃sb ) = Σ(hta
x /m + σb2
h , hh ) + σU x
sb
ta
sb
Σ(hta
z , hz ) = Σ(hr , hr )
2
= σW

t
s
X
X

ia

jb

ab
ζi:t,j:s
E φ(Z h̃ )φ(Z h̃ )

i=1 j=1
sb
sb
2
ta
sb
r̃ ta
Σ(hta
)σ(Z r̃ )
h , hh ) = σW Σ(hz , hz ) E σ(Z

with initial conditions
Σ(z̃ ta , z̃ sb ) = Σ(r̃ta , r̃sb ) = Σ(h̃ta , h̃sb ) = 0

if t = 1 or s = 1,

and the output covariance K of the GRU outputs in the large n limit can be computed as
 > ta > sb 
v x v x
√ , √
Kta,sb = lim Cov
n→∞
n
n
s
t
XX
ia
jb
ab
ζi:t,j:s
= σv2
E φ(Z h̃ )φ(Z h̃ )
i=1 j=1

where Z ∼ N (0, Σ) and

ia

def

ab
ζi:t,j:s
= E σ(Z z̃ )
Z



t
Y



pa

jb

(1 − σ(Z z̃ )) × σ(Z z̃ )

p=i+1

s
Y


qb

(1 − σ(Z z̃ )) ,

q=j+1

which can be reduced to a computation of orthant probability in the fashion of Eq. (33).
The above equations can be turned into a (relatively) efficient algorithm for computing the GP kernel
of a GRU. Our repo github.com/thegregyang/GP4A shows a reference implementation of it
(allowing slightly more general initialization hyperparameters). It leverages the R package mvtnorm
[19] to evaluate the Gaussian orthant probability involved in Eq. (33).
In the rest of the section, we prove Lemma B.11.
Review of (Tempered) Distributions Before we begin the proof of Lemma B.11, we briefly recall
the notion of a tempered distribution, which is a “pseudo-function” that is formally defined as an
element of the dual of Schwartz space (intuitively, the space of functions with rapidly decreasing
derivatives of all orders) [52]. Given a Schwartz function f and a tempered distribution τ , the value
of τ on f will be denoted here by
hτ, f i.
For example, if τ is a locally-integrable function, then τ is also a tempered distribution and hτ, f i
can be defined by
Z
hτ, f i = τ (x)f (x) dx.
As all Schwartz functions have Fourier transforms [52], any tempered distribution has Fourier
transform defined by
def

hF{τ }, f i = hτ, F{f }i.
35

In what follows, notationally, Fourier transform will convert functions or distributions in variable t to
functions to distributions in variable x, or vice versa. See [52] for more background on distributions.
Proof of Lemma B.11. As a tempered distribution, φ = erf can be expressed as
)
( √
2
e−t /4
−i 2
√ p.v.
(x)
φ(x) = F
t
π
√ −t2 /4
Z
1
ixt −i 2 e
√
√
=
p.v. e
dt,
t
π
2π
where p.v. denotes principal value integration
√ −t2 /4
√ −t2 /4
Z −ε Z ∞ 
Z
def
ixt −i 2 e
ixt −i 2 e
√
√
+
e
p.v. e
dt = lim
dt.
ε→0
t
t
π
π
−∞
ε
Over multiple variables, because Fourier transform over RT is equivalent to applying 1D Fourier
transform over each coordinate, we have


!
PT
√ !T − PT t2 /4
Z
2
T
 −i√2 T
Y
i=1 i
e− i=1 ti /4 
e
1
−i 2
ix·t
√
√
p.v. QT
φ(xi ) = F
(x) =
p.v. e
dt.
QT
T
/2


π
π
(2π)
i=1 ti
i=1 ti
i=1
def

1

>

−1

Let γ(x; Σ) = (det 2πΣ)−T /2 e− 2 x Σ x be the density of N (0, Σ) for nonsingular Σ. Note that
1 >
F{γ(x; Σ)}(t) = (2π)−T /2 e− 2 t Σt . We thus have
"T
#
Y
E
φ(xi ) : x ∼ N (0, Σ)
i=1


* 
!
+
P
2
 −i√2 T

t
− T
/4
i
i=1
e
√
= F
p.v. QT
, γ(x; Σ)


π
i=1 ti
+
PT
√ !T
2
e− i=1 ti /4
−i 2
√
p.v. QT
, F{γ(x; Σ)}
=
π
i=1 ti
+
*
PT
√ !T
2
e− i=1 ti /4
−i 2
−T /2 − 12 t> Σt
√
p.v. QT
=
, (2π)
e
π
i=1 ti
√ !T
Z − PT t2 /4
i=1 i
1 >
−i 2
e
√
=
p.v.
(2π)−T /2 e− 2 t Σt dt
QT
π
i=1 ti
√ !T
Z
1 >
1
1
−i 2
√
p.v. QT
(2π)−T /2 e− 2 t (Σ+ 2 I)t dt
=
π
i=1 ti
*
+
√ !T
−i 2
1
−T /2 − 12 t> (Σ+ 12 I)t
√
=
p.v. QT
, (2π)
e
π
i=1 ti
*
+
√ !T
−i 2
1
1
√
=
p.v. QT
, F{γ(x; Σ + I)}
2
π
i=1 ti


*
!
+
 −i√2 T
1 
1
√
= F
p.v. QT
, γ(x; Σ + I)


2
π
i=1 ti
*

*
=

+
√ !T 
T
T Y
p
−i 2
1
√
i π/2
sgn(xi ), γ(x; Σ + I)
2
π
i=1
36

"T
Y

1
=E
sgn(xi ) : x ∼ N (0, Σ + I)
2
i=1

#

p
where we used F{p.v.t−1 }(x) = i π/2 sgn(x). Similar reasoning show that this formula also
works when the mean is nonzero:
"T
#
"T
#
Y
Y
1
E
φ(xi ) : x ∼ N (µ, Σ) = E
sgn(xi ) : x ∼ N (µ, Σ + I) .
2
i=1
i=1
A standard continuity argument yields the same formula for singular Σ. Some simple arithmetic
reduces the σ case to φ.
"T
#
"T
#
Y
Y
1
−T
2 E
(1 + φ(xi )) : x ∼ N (µ, Σ) = E
I(xi ≥ 0) : x ∼ N (µ, Σ + I) .
2
i=1
i=1

N ETSOR+ Master Theorem

C

In this section, we state the Master Theorem for N ETSOR+ . Its proof can be found in Appendix I.
We first need to extend the notion of controlled functions (Definition 5.3) to functions with parameters,
and additionally require a smoothness assumption.
Definition C.1. We say a parametrized function φ(−; −) : Rk × Rl → R is parameter-controlled at
Θ̊ ∈ Rl if
1. φ(−; Θ̊) is controlled, and
2. there are some controlled φ̄ : Rk → R and some function f : Rl → R≥0 ∪ {∞} that has
f (Θ̊) = 0 and that is continuous at Θ̊, such that, for all x1 , . . . , xk ∈ R and Θ ∈ Rl ,
|φ(x1 , . . . , xk ; Θ) − φ(x1 , . . . , xk ; Θ̊)| ≤ f (Θ)φ̄(x1 , . . . , xk ).

Note that f and φ̄ here can depend on Θ̊.
Example C.2. Any function that is (pseudo-)Lipschitz11 in x1 , . . . , xk and Θ is parameter-controlled.
An example of a discontinuous function that is parameter-controlled is φ(x; θ) = step(θx). Then for
θ̊ 6= 0,
|θ̊ − θ|
|φ(x; θ) − φ(x; θ̊)| ≤
,
|θ̊|
so we can set f (θ) = |θ̊−θ|
and φ̄ = 1 in Definition C.1.
|θ̊|
Assumption C.3 (Rank Stability). For any W : A(n, m) and any collection S ⊆ {(h : H(m)) | ∃(g :
1
G(n)), g := W h}, let H ∈ Rm×|S| be the matrix whose columns are h ∈ S. If m
H > H ∈ R|S|×|S|
converges almost surely to some C̊ as n, m → ∞ with convergent ratio n/m → α, then almost
surely rank H = rank C̊ for all large n and m.
Note that a common situation where rank stability holds is when all limit C̊ matrices are full rank.
By the lower semi-continuity of rank, rank H = rank C̊ must hold asymptotically.
11

A pseudo-Lipschitz function φ : Rr → R is one that satisfies
|φ(x) − φ(y)| ≤ Ckx − yk(kxkp + kykq + 1)

for some constants C, p, q ≥ 0. Roughly speaking, pseudo-Lipschitz functions are those that have polynomially
bounded weak derivatives.

37

Theorem C.4. Fix any N ETSOR+ program satisfying Assumption 5.1 and Assumption C.3. Suppose
for each parametrized nonlinearity φ(−; Θ) in the program (appearing as part of Nonlin+ ), the parameters Θ are instantiated with random variables that converge almost surely to some deterministic
vector Θ̊ as n → ∞, and assume φ is parameter-controlled at Θ̊. If g 1 , . . . , g M are all of the G-vars
(including all input G-vars), then for any l, for any random vector Θ ∈ Rl that converges almost
surely to a deterministic vector Θ̊, as n → ∞, and for any ψ : RM × Rl → R parameter-controlled
at Θ̊,
n
1X
a.s.
ψ(gα1 , . . . , gαM ; Θ) −−→
E
ψ(Z; Θ̊),
(34)
n α=1
Z∼N (µ,Σ)
a.s.

where −−→ means almost sure convergence, Z ∈ RM , and µ ∈ RM and Σ ∈ RM ×M are given
in Eq. (2), calculated by replacing each parametrized φ(−; Θ) with parameterless nonlinearity
φ(−; Θ̊).
The proof of this theorem can be found in Appendix I.
We will be instantiating the coordinates of Θ typically with “empirical moments”
n
1X
ψ(gα1 , . . . , gαM )
n α=1

(35)

for some controlled ψ, since such “moments” should converge to a deterministic value by
Theorem C.4; or even, recursively,
n
1X
ψ(gα1 , . . . , gαM ; Θ0 )
(36)
n α=1
for some sequence of random vectors Θ0 that converge a.s. to Θ̊0 and for ψ parameter-controlled at
Θ̊0 . One can keep recursing by replacing Θ0 with further empirical moments.
However, there is a slight complication: we are using Theorem C.4 both for the convergence of the
parameters in Nonlin+ rules in the program, as well as for the convergence Eq. (34), in what seems
like could be circular logic. It turns out not hard to straighten out this reasoning, but it requires a bit
more notation and setup to state the result. We do this in the next section Appendix C.1, with main
theorem Theorem C.11 that will be our primary tool concerning N ETSOR+ programs in practice.
To finish up this section, we make several remarks on the assumptions made in Theorem C.4.
Remark C.5 (Necessity of parameter-control). Suppose ψ(x; θ) = I(θx 6= 0). For θ 6= 0, ψ is 1
everywhere except ψ(0; θ) = 0. For θ = 0, ψ is identically 0. Thus it’s easily seen that ψ is not
parameter-controlled at θ = 0.
Now, if g : G(n) is sampled like gα ∼ N (0, 1), then
n
1X
a.s.
ψ(gα ; θ) −−→ 1
n α=1
if θ = 1/n so that θ → θ̊ = 0, but
E

Z∼N (µ,Σ)

ψ(Z; θ̊) = E 0 = 0.

So our Master Theorem can’t hold in this case.
Remark C.6 (Necessity of Rank Stability Assumption Assumption C.3). Suppose we have two input
G-vars g 1 , g 2 : G(n) which are sampled independently as gα1 , gα2 ∼ N (0, 1). Let W : A(n, n)
be sampled as Wαβ ∼ N (0, 1/n). Then we can define h2 := θg 2 : H(n) where θ = exp(−n)
a.s.
as a function of n, using Nonlin+ , so that h2α −−→ 0. Additionally, let ḡ 1 := W g 1 : G(n) and
a.s.
ḡ 2 := W h2 : G(n). Again, ḡα2 −−→ 0 but for any finite n, ḡ 2 is linearly independent from ḡ 1 . Thus
rank stability does not hold here.
Now consider the (parameterless) nonlinearity ψ(x, y) that is 1 except on the line y = 0, where it is
0. Then
n
1X
a.s.
ψ(ḡα1 , ḡα2 ) −−→ 1
n α=1
38

but

1

E

Z∼N (µ,Σ)

2

ψ(Z ḡ , Z ḡ ) = E 0 = 0.

Remark C.7 (Rank Stability Already Holds for N ETSOR Programs). It turns out that, as long as
we only have parameterless nonlinearities, we get rank stability Assumption C.3 for free. This is
formulated explicitly in Lemma H.4. It is as a result of our proof of Theorem 5.4 that interleaves
an inductive proof of this rank stability (more generally, the inductive hypothesis CoreSet) with an
inductive proof of the “empirical moment” convergence (the inductive hypothesis Moments).
C.1

Self-Parametrized N ETSOR+ Programs and Their Master Theorem

As stated below Theorem C.4, there could be potentially circular logic when allowing Nonlin+ rules
to take parameters depending on previously defined variables in the program, such as in the form of
Eq. (35). In this section, we untangle this potentially circular logic into a sound reasoning
• by introducing a scalar type into N ETSOR+ programs to explicitly extract the Nonlin+
parameters into their own variables (Definition C.8). These scalar variables can recursively
depend on previously defined scalar variables, making the “recursive parameters” discussed
in Eq. (36) much more succinctly and clearly expressed.
• and by proving a Master Theorem for such N ETSOR+ programs (Theorem C.11). This
theorem will be the primary way through which we analyze N ETSOR+ programs in practice.
Definition C.8. 12 A self-parametrized N ETSOR+ program is a N ETSOR program where we have
an additional scalar type, called C, which should intuitively be thought of as random variables that
tend to a deterministic limit (i.e. a Constant) almost surely. Colloquially, we will call variables of
type C “C-vars.” C-vars can be used as parameters of nonlinearities in Nonlin+ rules, hence the
“self-parametrized” in the name.
For completeness, we specify a self-parametrized N ETSOR+ program as follows:
Input A set of input C-vars, in addition to the G- and A-vars allowed in Definition 4.1.
Body New variables can be introduced and assigned via the following rules
MatMul Same as in Definition 4.1.
LinComb Same as in Definition 4.1.
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
Output Same as in Definition 4.1.
The self-parametrized N ETSOR+ programs we are concerned will have all of its C-vars convergent
to a deterministic constant. We thus need this to be true for the input C-vars at the very least. We
encapsulate this requirement below.
Assumption C.9. Fix a self-parametrized N ETSOR+ program satisfying Assumption 5.1. Assume
a.s.
each input C-var θ is sampled in a way such that θ −−→ θ̊ as n → ∞ for some deterministic scalar
θ̊ ∈ R.
12

We keep the definition here informal in terms of programming language convention to be accessible to the
general machine learning audience. For those with PL background, see Appendix J.

39

Now, we shall define µ and Σ for self-parametrized N ETSOR+ programs just as in N ETSOR+
programs. The only complication here is that we also need to keep track of the limit values of the
C-vars in order to do so. See Definition C.10 below.
Definition C.10. Fix a N ETSOR+ program with scalar variables satisfying Assumption C.9. For the
purpose of this definition, write g 1 , . . . , g M for the entirety of the G-vars in the program, including
input G-vars.
New Notations For each H-var h introduced by Nonlin+ , we introduce the notations ϕh , Θh , ϑhi , `h
h
as follows: denote the associated parametrized nonlinearity by ϕh (−; −) : RM × R` → R
(implicitly padded so that it has as many input slots as G-vars in the program) and its parameters by
h
i
Θh = (ϑh1 , . . . , ϑh`h ) ∈ R` with length `h . For each G-var g i , we also set ϕg (x1 , . . . , xM ) = xi
i
i
and Θg = () ∈ R0 to be the empty vector (so that `g = 0).
Likewise, for each C-var θ introduced by Moment, we introduce the notations ϕθ , Θθ , ϑθi , `θ as
θ
follows: denote the associated parametrized nonlinearity by ϕθ (−; −) : RM × R` → R (implicitly
padded so that it has as many input slots as G-vars in the program) and its parameters by Θθ =
θ
(ϑθ1 , . . . , ϑθ`θ ) ∈ R` with length `θ .
Extending the (˚) notation from Assumption C.9 and the Recursive Definition of µ and Σ Given
µin and Σin as in Assumption 5.1, we define µ and Σ on G-vars, along with “limit scalars” θ̊ for each
C-var θ (extending θ̊ given by Assumption C.9 for input θ), as follows: For any pair of G-vars g, g 0
(among g 1 , . . . , g M ), we define recursively
 in
(g)
if g is input
µ
P
P
def
i
µ(g) =
a
µ(y
)
if g = i ai y i , (LinComb)
i
i

0
otherwise


Σin (g, g 0 )
if g, g 0 are inputs

P
P


i
0

if g = i ai y i , (LinComb)
Pi ai Σ(y , g )
P
def
i
if g 0 = i ai y i , (LinComb)
Σ(g, g 0 ) =
i ai Σ(g, y )

0
0

2

σW
EZ ϕh (Z; Θ̊h )ϕh (Z; Θ̊h ) if g = W h, g 0 = W h0 , (MatMul)



0
otherwise

(37)

(this is the same as Eq. (2) except the MatMul case) and for each C-var θ introduced by Moment,
def

θ̊ = E ϕθ (Z; Θ̊θ ).
Z

(38)

In all of the equations above, Z ∼ N (µ, Σ) is a random Gaussian vector with an entry for each G-var
in the program, and Θ̊u denotes (ϑ̊u1 , . . . , ϑ̊u`u ), for H-var or C-var u.
0

Note that since ϕh , ϕh , and ϕθ only depend on entries of Z corresponding to G-vars previous to
h, h0 , or θ, the expectations involving Z only depend on entries of µ and Σ already defined, so there
is no circular logic in this recursive definition of µ and Σ.
Note that the notation ϕh will be overloaded in a semantically consistent way in the context of
N ETSOR◦ programs; see Definition E.6.
We are finally ready to formulate the Master Theorem for self-parametrized N ETSOR+ programs,
which basically is just Theorem C.4 but explicitly allowing parameters of the form Eq. (35) (“empirical
moments”) in Nonlin+ .
Theorem C.11 (Self-Parameterized N ETSOR+ Master Theorem). Fix any self-parametrized
N ETSOR+ program satisfying Assumption C.9 and Assumption C.3. For H-var or C-var u, adopt the
notation ϕu , Θu , `u from Definition C.10 and also let µ, Σ, θ̊ be as computed in Definition C.10. Let
g 1 , . . . , g M be all of the G-vars in the program (including all input G-vars).
Suppose for every H-var or C-var u, ϕu (−; Θu ) is parameter-controlled at Θ̊u .
40

1. Then for any l, for any random vector Θ ∈ Rl that converges almost surely to a deterministic
vector Θ̊, as n → ∞, and for any ψ(−; −) : RM × Rl → R parameter-controlled at Θ̊,
n
1X
a.s.
ψ(gα1 , . . . , gαM ; Θ) −−→
E
ψ(Z; Θ̊),
n α=1
Z∼N (µ,Σ)
a.s.

where −−→ means almost sure convergence.
2. In addition, for each C-var θ in the program,
a.s.

θ −−→ θ̊.
This theorem almost trivially follows from Theorem C.4, since the parameter vectors Θh intuitively
should converge to deterministic limits Θ̊h . The only slight complication is that this convergence
intuitvely follows from Theorem C.4 itself in what may be a circular logic, so we need to be slightly
careful to unwind this logic into a valid inductive argument. We do so below, assuming Theorem C.4
(which is proved in Appendix I).
a.s.

Proof. Notice that the 2nd claim about θ −−→ θ̊ follows immediately from the 1st claim, so we will
prove the 1st claim here.
Assume that the G-vars g 1 , . . . , g M are in order of appearance in the program, and that g 1 , . . . , g m0
(with m0 ≤ M ) are all of the input G-vars. We perform simultaneous induction on two claims
Moments(m) and CVarLimits(m) in m, defined below
Moments(m) For any l, for any random vector Θ ∈ Rl that converges almost surely to a deterministic vector Θ̊ as n → ∞, and for any ψ(−; −) : Rm × Rl → R parameter-controlled at
Θ̊,
n
1X
a.s.
ψ(gα1 , . . . , gαm ; Θ) −−→
E
ψ(Z; Θ̊)
n α=1
Z∼N (µ|m ,Σ|m )
where µ|m and Σ|m are the restriction of µ and Σ to g 1 , . . . , g m .
CVarLimits(m) For each C-var θ introduced before g m ,
a.s.

θ −−→ θ̊
as n → ∞, where θ̊ is as computed in Definition C.10.
When m = M , we would have Theorem C.11 by Moments(M ).
Base case: m = m0 (input G-vars only). Moments(m0 ) trivially follows from Theorem C.4.
CVarLimits(m0 ) follows from Assumption C.9.
Now suppose Moments(m) and CVarLimits(m) are true; we aim to show Moments(m + 1) and
CVarLimits(m + 1).
a.s.

Inductive case: CVarLimits(m + 1) By CVarLimits(m), it suffices to show θ −−→ θ̊ for all θ
introduced after g m but before g m+1 . We do so by another induction (an inner induction) in order of
C-var appearance.
The inner base case is the first C-var θ introduced after g m . Its parameters Θθ are among those
introduced before g m , so by induction hypothesis CVarLimits(m),
a.s.

Θθ −−→ Θ̊θ .
By the assumption of Theorem C.11 that ϕθ is parameter-controlled at Θ̊θ , we have
n
1X θ 1
a.s.
θ=
ϕ (gα , . . . , gαm ; Θθ ) −−→
E
ϕθ (Z; Θ̊θ ) = θ̊
n α=1
Z∼N (µ|m ,Σ|m )
by induction hypothesis Moments(m) (where we have explicitly truncated the input slots of ϕθ to
reflect its dependence only on g 1 , . . . , g m ). The inner inductive case, for a later θ, follows the same
a.s.
logic, once we assume the inner inductive hypothesis that each θ0 introduced before θ has θ0 −−→ θ̊0 .
41

Inductive case: Moments(m+1) The claim is trivially true by Moments(m) if g m+1 is introduced
via LinComb, so consider the case when g m+1 is introduced via MatMul
g m+1 := W h
where h : H(n) is an H-var with associated nonlinearity ϕh and parameters Θh as defined in
a.s.
Definition C.10. By the claim CVarLimits(m + 1) we proved above, Θh −−→ Θ̊h . By the assumption
of Theorem C.11, ϕh is parameter-controlled at the parameter limit Θ̊h . Thus, the subprogram up
to and including the introduction of g m+1 satisfies the assumptions of Theorem C.4. Consequently,
Moments(m + 1) is true by Theorem C.4.
This completes the simultaneous induction of Moments and CVarLimits and thus the proof of
Theorem C.11.
C.2

Gaussian Process Behavior of N ETSOR+ Programs

We can generalize the Gaussian process behavior (Corollary 5.5) to cases involving Nonlin+ :
Corollary C.12 (Computing the GP Kernel for N ETSOR+ programs). Adopt
the same assumptions
√
√
and notations as in Theorem C.4. Suppose the program outputs (v > x1 / n, . . . , v > xk / n), where
• v : G(n), vα ∼ N (0, σv2 ), is an input G-var not used elsewhere in the program and is
sampled independently from all other G-vars, and
• xi was introduced as xi := φi (g 1 , . . . , g M ; Θi ) for parametrized nonlinearity φi and
parameter vector Θi that converges a.s. to a deterministic vector Θ̊i as n → ∞. Assume φi
is parameter-controlled at Θ̊i .
Then the output vector converges in distribution to N (0, K) where
Kij = σv2

φi (Z; Θ̊i )φj (Z; Θ̊j )

E

Z∼N (µ,Σ)

(39)

with µ, Σ computed by replacing each parametrized φ(−; Θ) with the parameterless φ(−; Θ̊) in
Eq. (2), as in Theorem C.4.
The proof is a straightforward application of Theorem E.8 and Proposition G.4. Likewise, for
self-parametrized programs, we have a similar result:
Corollary C.13 (Computing the GP Kernel for self-parametrized N ETSOR+ programs). Adopt
the same
√ assumptions√and notations as in Theorem C.11. Suppose the program outputs
(v > x1 / n, . . . , v > xk / n), where
• v : G(n), vα ∼ N (0, σv2 ), is an input G-var not used elsewhere in the program and is
sampled independently from all other G-vars, and
i

i

i

• xi was introduced as xi := ϕx (g 1 , . . . , g M ; Θx ) for self-parametrized nonlinearity ϕx
i
i
and parameter vector Θx (composed of C-vars) as defined in Definition C.10. Let Θ̊x be
i
i
the limit parameter as in Definition C.10. Note that ϕx is parameter-controlled at Θ̊x by
assumption of Theorem C.11.
Then the output vector converges in distribution to N (0, K) where
Kij = σv2

i

E

i

j

j

ϕx (Z; Θ̊x )ϕx (Z; Θ̊x ),

Z∼N (µ,Σ)

with µ, Σ defined in Eq. (37).

D

Example GP Kernel Computation with N ETSOR+

D.1

Layernorm: Concrete Example (Program 9)

(40)

Consider the example layernorm network in Program 9. This is a self-parametrized N ETSOR+
program.
42

Self-parametrized N ETSOR+ program 9 Layernorm Network
Input: W 1 x, W 1 x0 : G(n)
Input: W 2 : G(n)
Input: v : G(n)
// Mean and variance of W 1 x
// MomentP
n
ν 1 := n1 α=1 (W 1 x)α : C
Pn
1
1
var := n α=1 (W 1 x)2α − (ν 1 )2 : C
// Nonlin+  1

1
1
x1 := ReLU (W√x)−ν
: H(n)
1
var

// Same thing for x0
// Mean and variance of W 1 x0
// MomentP
n
ν 10 := n1 α=1 (W 1 x0 )α : C
P
n
var10 := n1 α=1 (W 1 x0 )2α − (ν 10 )2 : C
+
// Nonlin
 1 0 10 
)−ν 1
x10 := ReLU (W √xvar
: H(n)
10
h20 := W 2 x10 : G(n)
// Mean and variance of h20
// MomentP
n
ν 20 := n1 α=1 h2α 0 : C
P
n
1
var20 := n α=1 (h2α 0 )2 − (ν 20 )2 : C
// Nonlin+ 

20
−ν 20 1
x20 := ReLU h√var
: H(n)
20
√
√
> 2
> 20
Output: (v x / n, v x / n)

h2 := W 2 x1 : G(n)
// Mean and variance of h2
// MomentP
n
ν 2 := n1 α=1 h2α : C
P
n
var2 := n1 α=1 (h2α )2 − (ν 2 )2 : C
+
// Nonlin 

2
2
1
x2 := ReLU h√−ν
: H(n)
var 2

Setup Suppose the inputs x, x0 6= 0 are in Rm . The network has parameters W 1 ∈ Rn×m , W 2 ∈
Rn×n , and v ∈ Rn . Let us sample them as follows
1
2
2
2
Wαβ
∼ N (0, σw
/m), Wαβ
∼ N (0, σw
/n), vα ∼ N (0, σv2 ),
for σw , σv > 0. This corresponds to the N ETSOR+ sampling data µin = 0 and Σin given as
2
Σin (W 1 x, W 1 x) = σw
kxk2 /m,

2 > 0
Σin (W 1 x, W 1 x0 ) = σw
x x /m,

2
Σin (W 1 x0 , W 1 x0 ) = σw
kx0 k2 /m,

Σin (v, v) = σv2 , and Σin (g, g 0 ) = 0 for any other pairs of input G-vars g, g 0 .
D.1.1

Computing µ, Σ, and Limit Parameters θ̊

Let’s compute the values of µ, Σ, θ̊ in order of the appearance of the variables, according to
Definition C.10. For each C-var or H-var u, we also show that ϕu is parameter-controlled at ϑ̊u .
First, one can quickly notice that µ(g) = 0 for all G-vars g, so we shall focus on computing Σ and θ̊.
C-var ν 1

Here we have introduced ν 1 via Moment by
n
1
1 X ν1
ν 1 :=
ϕ ((W 1 x)α ), where ϕν (z) = z,
n α=1
1

and there are no parameters. The function ϕν is then obviously controlled and trivially parametercontrolled. Finally, by Eq. (38), we set
def

ν̊ 1 =
C-var var1

E

2 kxk2 /m)
z∼N (0,σw

z = 0.

Note here
n

var1 :=

1 X var1
ϕ
((W 1 x)α ; ν 1 ),
n α=1

1

def

where ϕvar (z; θ) = z 2 − θ2 .
1

(Here superscript-2 denotes square, not an index). Since ϕvar (−; −) is pseudo-Lipschitz in both its
inputs and its parameter jointly, it is parameter-controlled at θ = ν̊ 1 = 0 by Example C.2.
In addition, var
˚ 1 is computed by Eq. (38) as
def

var
˚1 =

1

E
2

z∼N (0,σw kxk2 /m)

ϕvar (z;ν̊ 1 ) =

43

E
2

z∼N (0,σw kxk2 /m)

z2 =

2
σw
kxk2 .
m

H-var x1

The first H-var introduced in the program is x1 := ReLU



(W 1 x)−ν 1 1
√
var 1


. It can be

written as a Nonlin+ with
1

x1 := ϕx (W 1 x; ν 1 , var1 )
1

where ϕx (−; −) : R × R2 → R, and
x1



def

ϕ (z; θ1 , θ2 ) = ReLU

z − θ1
√
θ2


.
1

Since σw > 0 and x 6= 0,
˚ 1 6= 0, and we claim that ϕx is parameter-controlled at
 we have var
2
σ
(ν̊ 1 , var
˚ 1 ) = 0, mw kxk2 .
1

Indeed, ϕx (−;ν̊ 1 , var
˚ 1 ) is obviously controlled, so that condition 1 of Definition C.1 is satisfied.
In addition, for any z ∈ R,




1
1
z − ν̊ 1
z − θ1
− ReLU √
ϕx (z; θ1 , θ2 ) − ϕx (z;ν̊ 1 , var
˚ 1 ) = ReLU √
θ2
var
˚1
z − θ1
z − ν̊ 1
≤ √
−√
θ2
var
˚1

 

1
1
θ
ν̊ 1
√1 − √
= z √ −√
−
θ2
θ2
var
˚1
var
˚1


1
1
ν̊ 1
θ
√1 − √
≤ z √ −√
+
θ2
θ2
var
˚1
var
˚1
s
2 
2 p
1
1
θ1
ν̊ 1
√ −√
≤
z2 + 1
+ √ −√
θ2
θ2
var
˚1
var
˚1
r
2 
2
1
√1 − √ 1
√θ1 − √ ν̊
by Cauchy-Schwarz. Note that
+
equals 0 and is continuous
θ2
θ2
var
˚ 1
var
˚ 1
√
1
1
1
at (θ1 , θ2 ) = (ν̊ 1 , var
˚ ) because var
˚ 6= 0. Then since z 2 + 1 is controlled in z, ϕx satisfies
1
property 2 of Definition C.1. Altogther, we have shown that ϕx is indeed parameter-controlled at
(ν̊ 1 , var
˚ 1 ).
G-var h2

By the MatMul case of Eq. (37),
Σ(h2 , W 1 x) = Σ(h2 , W 1 x0 ) = 0,

2
Σ(h2 , h2 ) = σw
E φ(z;ν̊ 1 , var
˚ 1 )2 ,
z

σ2

where z ∼ N (µ(W 1 x), Σ(W 1 x, W 1 x)) = N (0, mw kxk2 ), and


z − θ1
def x1
φ(z; θ1 , θ2 ) = ϕ (z; θ1 , θ2 ) = ReLU √
.
θ2
We can then simplify

2
z
1 2
2
2
 = σw
Σ(h2 , h2 ) = σw
E ReLU  q
E
ReLU(ζ)2 = σw
.
2
z
2
ζ∼N (0,1)
σw
2
kxk
m
C-var ν 2

Similar to the case of ν 1 , we can express ν 2 via Moment by
n

ν 2 :=

1 X ν2 2
ϕ (hα ),
n α=1

2

where ϕν (z) = z,

2

and there are no parameters. The function ϕν is then obviously controlled and trivially parametercontrolled. Finally, by Eq. (38), we set
def

ν̊ 2 =

E

z∼N (µ(h2 ),Σ(h2 ,h2 ))

44

z=

E

2 )
z∼N (0, 21 σw

z = 0.

C-var var2

Similar to the case of var1 , we can express var2 via Moment by
n

1 X var2 2 2
ϕ
(hα ; ν ),
var :=
n α=1

2

def

where ϕvar (z; θ) = z 2 − θ2 .

2

2

(Here z 2 and θ2 are the squares of z and θ). Since ϕvar (−; −) is pseudo-Lipschitz in both its inputs
and its parameter jointly, it is parameter-controlled at θ = ν̊ 2 = 0 by Example C.2.
In addition, var
˚ 2 is computed by Eq. (38) as
2

def

var
˚2 =
H-var x2

E

z∼N (µ(h2 ),Σ(h2 ,h2 ))

ϕvar (z;ν̊ 2 ) =

z2 =

E1

2 )
z∼N (0, 2 σw

1 2
σ .
2 w

Similar to the case of x1 , we can express x2 via Nonlin+ by
2

x2 := ϕx (h2 ; ν 2 , var2 )
2

where ϕx (−; −) : R × R2 → R, and
x2



def

ϕ (z; θ1 , θ2 ) = ReLU

z − θ1
√
θ2


.
2

Since σw > 0, we also have var
˚ 2 > 0. Then by the same reasoning as in the case of x1 , ϕx is
x2
parameter-controlled at Θ̊ = (ν̊ 2 , var
˚ 2 ).
C-vars ν 10 , var10 and H-var x10
x1 . We end up with

These calculations proceed similarly to those for ν 1 , var1 and
var
˚ 10 =

ν̊ 10 = 0,

2
σw
kx0 k2 ,
m

and, for each u ∈ {ν 10 , var10 , x10 }, the associated nonlinearity ϕu is parameter-controlled at limit
parameter Θu .
G-var h20

By the MatMul case of Eq. (37),

2
Σ(h2 , h20 ) = σw
E 0 φ(z;ν̊ 1 , var
˚ 1 )φ(z;ν̊ 10 , var
˚ 10 ),
z,z

2
Σ(h20 , h20 ) = σw
E0 φ(z 0 ;ν̊ 10 , var
˚ 10 )2
z

and Σ(h20 , g) = 0 for all other G-var g (by the “otherwise” case of Eq. (37)), where



σ 2 kxk2 x> x0
(z, z 0 ) ∼ N (µ|W 1 x,W 1 x0 , Σ|W 1 x,W 1 x0 ) = N 0, w
m x> x0 kx0 k2
and
def

x1

x10

φ(z; θ1 , θ2 ) = ϕ (z; θ1 , θ2 ) = ϕ


(z; θ1 , θ2 ) = ReLU

z − θ1
√
θ2


.

We can simplify
2
Σ|h2 ,h20 = σw

0

0

(z̃, z̃ ) ∼ N

E ReLU(z̃)ReLU(z̃ ),

z̃,z̃ 0

2
= σw
VReLU

>

x x
kxkkx0 k

1
>

0

0

x x
kxkkx0 k

0,

1

x> x0
kxkkx0 k

x> x0
kxkkx0 k

1

!!

!

1

,
def

>

0

x x
where VReLU is as given in Fact B.2. In particular, with c = kxkkx
0 k , this yields

Σ(h20 , h20 ) = Σ(h2 , h2 ) =

1 2
σ ,
2 w

Σ(h2 , h20 ) =
45

2 p
σw
( 1 − c2 + (π − arccos c)c).
2π

(41)

C-vars ν 20 , var20 and H-var x20
x2 . We end up with

These calculations proceed similarly to those for ν 2 , var2 and

1 2
σ ,
2 w
and, for each u ∈ {ν 20 , var20 , x20 }, the associated nonlinearity ϕu is parameter-controlled at limit
parameter Θu .
var
˚ 20 =

ν̊ 20 = 0,

D.1.2

Computing the GP Kernel

It is easy to see that the set of H-vars are all linearly√independent
√ almost surely. Therefore we
may apply Corollary C.13. By Corollary C.13, (v > x2 / n, v > x20 / n) converges in distribution to
N (0, K) where

2
2
20 
φ(z; Θ̊x )2
φ(z; Θ̊x )φ(z; Θ̊x )
2
K = σv E 0
2
20
20
z,z
φ(z; Θ̊x )φ(z; Θ̊x )
φ(z 0 ; Θ̊x )2


def
√ 1
where φ(z; θ1 , θ2 ) = ReLU z−θ
and (z, z 0 ) ∼ N (µ|h2 ,h20 , Σ|h2 ,h20 ) with µ|h2 ,h2 0 = 0 and
θ
2

2

Σ|h2 ,h20 given in Eq. (41). Since ϑ̊x1 = ν̊ 2 = ϑ̊x1
1 2
2 σw , we can simplify

20

2

= ν̊ 20 = 0 and ϑ̊x2 = var
˚ 2 = ϑ̊x2

20

= var
˚ 20 =

 2σ 2

2
K = σv2 VReLU (σw
/2)−1 Σ|h2 ,h2 0 = 2v VReLU Σ|h2 ,h20 .
σw
D.2

Layernorm: General Case

As mentioned in Appendix A, layernorm in general can be implemented with Nonlin+ .
Suppose y 1 , . . . , y k : H(n) are H-vars defined by y i := φi (g 1 , . . . , g M ; Θi ) for (possibly self)parametrized nonlinearities φi (−; −) : Rm → R, i ∈ [k] and parameters Θi (possibly dependent on
previous G-vars). Suppose that each Θi converges almost surely to a deterministic vector Θ̊i , and
suppose each φi is parameter-controlled at Θ̊i . Each of y i has mean
def 1

ν(y i ) =

n
X

n α=1

n

yαi =

1X i 1
φ (gα , . . . , gαM ; Θi )
n α=1

and variance
def 1

σ 2 (y i ) =

n
X

n

(yαi )2 − ν(y i )2 =

n α=1

1X i 1
φ (gα , . . . , gαM ; Θi )2 − ν(y i )2 .
n α=1

Under generic conditions (i.e. Assumption C.3 and parameter-control), Theorem C.4 or Theorem C.11
applies, so that



2 h

i2
a.s.
def
a.s.
def
ν(y i ) −−→ ν̊(y i ) = E φi Z; Θ̊i , and σ 2 (y i ) −−→ σ̊ 2 (y i ) = E φi Z; Θ̊i − E φi Z; Θ̊i
Z

Z

Z

where Z ∼ N (µ, Σ). Layernorm(y i ) can then be expressed via a self-parametrized (Definition C.8)
Nonlin+ rule like so
√
def
Layernorm(y i ) = ψ(y i ; ν(y i ), σ 2 (y i )), where ψ(z; a, b) = (z − a)/ b.
It’s easy to check that ψ(z; a, b) is parameter-controlled at å, b̊ as long as b̊ 6= 0. Assuming rank
stability (Assumption C.3) is not violated by the new variables, Theorem C.4 holds, so that, intuitively,
this application of Nonlin+ can be replaced with a straightforward application of Nonlin:
“Layernorm(y i ) = ψ(y i ; ν(y i ), σ 2 (y i ))” → “Layernorm(y i ) = ψ(y i ;ν̊(y i ),σ̊ 2 (y i ))”.
Therefore, if we define the kernel matrices
Ωij = lim y i> y j /n
n→∞

Ω̄ij = lim Layernorm(y i )> Layernorm(y j )/n,
n→∞

46

then
1 (yi − ν(y i ))> (yj − ν(y j ))
p
n→∞ n
σ 2 (y i )σ 2 (y j )

Ω̄ij = lim

yi> yj /n − ν(y i )ν(y j )
p
n→∞
σ 2 (y i )σ 2 (y j )

= lim

yi> yj /n − ν̊(y i )ν̊(y j )
p
n→∞
σ̊ 2 (y i )σ̊ 2 (y j )

= lim

Ω̄ = D−1/2 (Ω − ν̊ν̊ > )D−1/2 ,
where ν̊ is the column vector (ν̊(y 1 ), . . . ,ν̊(y k ))> and D = Diag(Ω − ν̊ν̊ > ).
In summary,
Computing Layernorm Kernel
Suppose y 1 , . . . , y k : H(n) are H-vars defined by y i := φi (g 1 , . . . , g M ; Θi ) for (possibly
self-)parametrized nonlinearities φi (−; −) : Rm → R, i ∈ [k] and parameters Θi . Assume
that each Θi converges almost surely to a deterministic vector Θ̊i , and that each φi is
parameter-controlled at Θ̊i . If we define the kernel matrices
Ωij = lim y i> y j /n
n→∞

Ω̄ij = lim Layernorm(y i )> Layernorm(y j )/n,
n→∞

then, assuming generic conditions (see main text above),
Ω̄ = D−1/2 (Ω − ν̊ν̊ > )D−1/2 ,
where D = Diag(Ω − ν̊ν̊ > ) and ν̊ is the vector given by ν̊i = E φi (Z; Θ̊i ), Z ∼ N (µ, Σ).

D.3

Transformer (Program 10)

The Transformer Variant, in Mathematical Terms We’ll work with the following transformer
model. Let x01 , . . . , x0t be a sequence of inputs (the superscript will be layer index, and the subscript
will be token index). Then each layer l of our transformer works like the following
kil = U l xl−1
∈ Rn
i
hli = Layernorm(kil + MaskedAttentioni (kil , {kjl }tj=1 , {kjl }tj=1 ))
xli = Layernorm(W l2 relu(W l1 hli + bl1 ) + bl2 + W l1 hli )
l

l1

where U , W , W

l2

l1

(42)

l2

are weights and b , b are the biases, and

MaskedAttentionj (q, {k i }ri=1 , {v i }ri=1 ) =
where

r
X
aji v i ,

i=1
j
> 1
> j
ai = SoftMax(q k /n, . . . , q k /n, −∞, . . . , −∞)i

(43)

as described in Appendix A.
Note that we make the following simplifications for ease of presentation, but all of them can be
removed at the expense of more complex N ETSOR programs.
1. We are forgoing positional embeddings
2. The keys, values, and queries here are the same, compared to the standard version, where
they are different linear projections of xl−1
i
3. There is only 1 head, compared to the standard multi-head attention
4. The skip connection has base W l2 hli instead of just hli
47

Self-parametrized N ETSOR+ program 10 Transformer
Input: U 1 x01 , . . . , U 1 x0t : G(n)
Input: ∀l = 1, . . . , L : W l1 , W l2 : A(n, n)
Input: ∀l = 2, . . . , L : U l : A(n, n)
Input: ∀l = 1, . . . , L : bl1 , bl2 : G(n)
Input: v : G(n)
1: for l = 1, . . . , L do
2:
for i = 1, . . . , t do
3:
// if l = 1, apply LinComb
4:
// if l ≥ 2, apply MatMul
: G(n)
5:
kil := U l xl−1
i
6:
end for
7:
for i = 1, . . . , t do
8:
for j = 1, . . . , t do
9:
// Moment
10:
cij := kil > kjl /n : C
11:
end for
12:
// With aij being shorthand for
13:
// SoftMax(ci1 , . . . , cii , −∞, . . . , −∞)j
14:
// Mean,P
post attention
Pt
n
15:
νi := n1 α=1 (kil + j=1 aij kjl )α : C
16:
// Variance,
attention
Ppost
Pt
n
17:
vari = n1 α=1 (kil + j=1 aij kjl )2α − νi2 : C
+
18:
// applying Nonlin
to express attention+layernorm
Pt
√
l
l
19:
hi := (ki + j=1 aij kjl − νi 1)/ vari : H(n)
20:
end for
21:
for i = 1, . . . , t do
22:
yil1 := W l1 hli : G(n)
23:
ŷil1 := yil1 + bl1 : G(n)
l1
24:
x̂l1
i := ReLU(ŷi ) : H(n)
l2
l2 l1
25:
yi := W x̂i : G(n)
26:
ŷil2 := yil2 + bl2 : G(n)
27:
// Layernorm
Pn mean and variance
28:
νi0 := n1 α=1 (ŷil2 )α + (yil1 )α : C
Pn
29:
vari0 := n1 α=1 ((ŷil2 )α + (yil1 )α )2 − (νi0 )2 : C
30:
// Layernorm
p
31:
xli := (ŷil2 + yil1 − νi0 1)/ vari0 : H(n)
32:
end for
33: end for
√
√
> L
Output: (v > xL
1 / n, . . . , v xt / n)
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
∼ N (0, σu2 /m)
l2
2
• bl1
α , bα ∼ N (0, σb ) for all l.

• vα ∼ N (0, σv2 )
D.3.1

Expressing the Composition of Attention, Skip Connection, and Layernorm via
Nonlin+ and Moment

Program 10 captures the computation of this transformer on an input sequence. Let us explain how
Eq. (42) is expressed in Program 10. Throughout the below, we will use the easy observation that
µ(g) = 0 for all G-vars g. For any layer l, we proceed as follows.
48

Attention Weights First, cij in Line 10 represents a pre-SoftMax logit for the attention weights.
They are introduced via Moment by
n
1 X cij l
cij :=
ϕ ((ki )α , (kjl )α ), where ϕcij (z1 , z2 ) = z1 z2 .
n α=1
This implies
c̊ij =

l

E

Z∼N (µ,Σ)

l

Z ki Z kj = Σ(kil , kjl ),

(44)

where we used µ(g) = 0 for all G-vars g.
Layernorm Mean and Variance Next, νi in Line 15 and vari in Line 17 represent the mean and
variance of the post-attention embedding of the ith token. They are introduced via Moment by
n
1 X νi l
νi :=
ϕ ((k1 )α , . . . , (ktl )α ; ci1 , . . . , cii )
n α=1
n

1 X vari l
vari :=
((k1 )α , . . . , (ktl )α ; ci1 , . . . , cii , νi )
ϕ
n α=1
where
def

ϕνi (z1 , . . . , zt ; θ1 , . . . , θi ) = zi +

t
X

aj zj ,

j=1

where (a1 , . . . , at ) = SoftMax(θ1 , . . . , θi , −∞, . . . , −∞),

(45)

and similarly,
def

ϕvari (z1 , . . . , zt ; θ1 , . . . , θi , ν) = (zi +

t
X

aj zj )2 − ν 2 ,

j=1

where (a1 , . . . , at ) are as in Eq. (45).
Note that both ϕνi and ϕvari are pseudo-Lipschitz in both their inputs and parameters jointly, so that
they are parameter-controlled by Example C.2.
Their limit parameters can be computed as
t
X
ν̊i = µ(kil ) +
åj µ(kjl ) = 0
j=1

where (å1 , . . . ,åt ) = SoftMax(θ̊1 , . . . , θ̊i , −∞, . . . , −∞),
since µ = 0 identically, and
X
X
var
˚ i = Σ(kil , kil ) + 2
åj Σ(kil , kjl ) +
åj åj 0 Σ(kjl , kjl 0 )

(46)
(47)

j,j 0

j

with åj same as in Eq. (46).
Putting Them All Together
introduced via Nonlin+ by

Finally, hli in Line 19 represents the post-layernorm activations and is
l

hli := ϕhi (k1l , . . . , ktl ; ci1 , . . . , cii , νi , vari )
where
l

ϕhi (z1 , . . . , zt ; θ1 , . . . , θi , ν, var) := (zi +

t
X

√
aj zj − ν)/ var

(48)

j=1

where (a1 , . . . , at ) are as in Eq. (45).
hli

If var
˚ i > 0, then one can show that ϕ is parameter-controlled at (c̊i1 , . . . ,c̊ii ,ν̊i , var
˚ i ) via the same
reasoning as in Appendix D. When is var
˚ i > 0? From Eq. (47), because the ai are all nonnegative,
var
˚ i = 0 implies that Σ(kil , kil ) = 0. This is impossible if all of the input tokens xi are nonzero and
the weight variances satisfy σw , σu > 0, as one can easily see.
49

D.3.2

Computing the GP Kernel

By Corollary C.13, the output vector converges in distribution to N (0, K), where K ∈ Rt×t , and
Kij = σv2

L

E

L

L

L

ϕxi (Z; Θ̊xi )ϕxj (Z; Θ̊xj ).

Z∼N (µ,Σ)

L

Here Θxi = {νi0 , vari0 } as given in Lines 28 and 29, and
√
L
L2
l1
ϕxi (Z; ν, var) = (Z ŷi + Z yi − ν)/ var.
Simultaneously,
L2

L1

ν̊i0 = E Z ŷi + Z yi ,
Z

L2

L1

var
˚ 0i = E(Z ŷi + Z yi )2 − (ν̊i0 )2 .
Z

Thus, to compute K, it suffices to compute the restriction Σ|y1L1 ,...,ytL1 ,ŷ1L2 ,...,ŷtL2 , from which K can
be computed by the equations above.
L1
L2
However, notice that by the “otherwise” case Eq. (37), Σ(hL2
and hL1
i , hi ) = 0 because ĥi
i
L1
L2
L1
are introduced by MatMul with different A-vars, and consequently Σ(ĥL2
i , hi ) = Σ(hi , hi ) +
Σ(bl2 , hL1
i ) = 0. Therefore, we only need to compute Σ|y1L1 ,...,ytL1 and Σ|ŷ1L2 ,...,ŷtL2 separately. Then
K is given by

K = σv2 D−1/2 (Σ|y1L1 ,...,ytL1 + Σ|ŷ1L2 ,...,ŷtL2 )D−1/2 ,

(49)

where D is the diagonal matrix with diagonal equal to the diagonal of Σ|y1L1 ,...,ytL1 + Σ|ŷ1L2 ,...,ŷtL2 .
D.3.3

Computing Σ

Let
Σŷ

l2 def

= Σ|ŷ1l2 ,...,ŷtl2 ,

Σy

l1 def

= Σ|y1l1 ,...,ytl1 ,

l def

Σk = Σ|k1l ,...,ktl

l
resp. be the restriction of Σ to {ŷil2 }i , {yil1 }i , and {k̂√
i }i . As explained
√ above, the kernel of the
> L
Gaussian process underlying the output vector (v x1 / n, . . . , v > xL
t / n) can be computed from
L2
Σŷ .
l2

l1

l

In this section, we shall describe equations tying together Σŷ , Σy , Σk that will allow us to compute
L2
Σŷ recursively.
l1

l

Computing Σy from Σk . The G-var yil1 is introduced as yil1 := W l1 hli . Then given Eq. (48),
we have, for any i, i0 ∈ [t],


2
X
X 0
X
0
σ
w
Σ(kil , kil0 ) +
Σ(yil1 , yil10 ) = √
åij Σ(kjl , kil0 ) +
åij 0 Σ(kil , kjl 0 ) +
åij åij 0 Σ(kjl , kjl 0 ) ,
var
˚ i var
˚ i0
0
0
j
j
j,j
(50)
where
(åi1 , . . . ,åit ) = SoftMax(c̊i1 , . . . ,c̊ii , −∞, . . . , −∞)
= SoftMax(Σ(kil , k1l ), . . . , Σ(kil , kil ), −∞, . . . , −∞)
l1

l

by Eq. (44), and likewise for i0 . This reduces computing Σy to computing Σk .
l2

l1

Computing Σŷ from Σy . By some simple calculations in the vein of Appendix B.1.2, we can
also see
 l1

l2
2
VReLU Σy + σb2 + σb2 .
Σŷ = σw
(51)
50

Computing Σk

l+1

l2

from Σŷ .

Finally, following the same reasoning as in Appendix D.1, we get

ν̊i0 = 0,

l

var
˚ 0i = Σ(ŷil2 , ŷil2 ) + Σ(yil1 , yil1 ),

l

ϕxi is parameter-controlled at Θ̊xi as long as var
˚ 0i > 0, and

Σk

l2

l+1

l2

l1

= σu2 D−1/2 (Σŷ + Σy )D−1/2

(52)

l1

where D = Diag(Σŷ + Σy ).
Putting them all together, Eqs. (50) to (52) along with Eq. (49) yield the complete set of equations to
compute the GP kernel of a transformer.

D.3.4

Vectorized Implementation: Single Sequence

Eqs. (49), (51) and (52) are already in vectorized forms. The following equation expresses Eq. (50)
in a vectorized form as well:

l

l

2
Σy = σ w
D−1/2 (I + ∆)Σk (I + ∆)> D−1/2

where
l

l

• ∆ = SoftMax(Mask(Σk )), with SoftMax applied to each row, and Mask(Σk ) is the same
l
as Σk , except that its upper triangular portion (above the diagonal) is all set to −∞, and

l

• D is the diagonal matrix with diagonal equal to the diagonal of (I + ∆)Σk (I + ∆)> .
Here, ∆ is the attention weights, masked so that a token’s embedding cannot depend on those of
future tokens. The identity matrix I appears due to the skip connection. And the multiplication by
D−1/2 is as result of layernorm.

D.3.5

Vectorized Implementation: Double Sequence

Program 10 only expresses the computation of a transformer on a single sequence. In general, the GP
kernel will also have covariances between the embeddings of tokens of one sequence and those of
tokens of another sequence. One can derive the computation of these covariances just as we did above
for a single sequence. Below, we will just summarize the vectorized implementation for computing
l
the joint kernel over multiple input sequences. One should think of Σl below as the tensor of Σk
l
over every pair of sequences, and one should think of Σ̂l as the same for Σy .
51

Computing Transformer Kernel
Suppose we have p input sequences {(x1a , . . . , xta )}pa=1 , each with t tokens. Suppose each
sequence is processed by a transformer as in Program 10, and the transformer’s parameters
are sampled with nonzero variances as follows.
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
∼ N (0, σu2 /m)
l2
2
• bl1
α , bα ∼ N (0, σb ) for all l.

• vα ∼ N (0, σv2 )
Then the transformer’s outputs, one scalar for each input token, converge in distribution to a
Gaussian N (0, K) where K ∈ Rpt×pt can be computed as follows:
1. Initialize Σ0 ∈ Rt×p×t×p by Σ0iajb ← σu2 x>
ia xjb /m for all a, b ∈ [p] and i, j ∈ [t].
2. For l = 1, . . . , L, do
(a) For a = 1, . . . , p, do
i. Σl−1,a ← Σl−1
•a•a be the ath “diagonal block”
la
ii. ∆ ← SoftMax(Mask(Σl−1,a )), where Mask replaces the upper triangular portion (above the diagonal) with −∞, and SoftMax is applied
row-wise.
(b) ∆l ← block diagonal matrix with ∆l1 , . . . , ∆lp as blocks.
(c) // below, we treat each tensor as a (pt × pt) matrix.
(d) Σ̂l ← (I + ∆l )Σl−1 (I + ∆l )>
2
(e) Σ̂l ← σw
D−1/2 Σ̂l D−1/2 , where D = Diag(Σl )
2
(f) Σl ← σw
VReLU (Σ̂l + σb2 ) + σb2

(g) Σl ← σu2 D−1/2 (Σl + Σ̂l )D−1/2 , where D = Diag(Σl + Σ̂l )
σ2

3. Return σv2 ΣL
u

See our repo github.com/thegregyang/GP4A for an implementation of this algorithm.

E

Different Versions of Tensor Programs

Definition E.1. A N ETSOR− program is a N ETSOR program without the LinComb rule.
Remark E.2. Any N ETSOR program is semantically identical to a N ETSOR− program, by absorbing
any usage of LinComb into a downstream nonlinearity (e.g., if g := g 1 + g 2 , and h := φ(g), write
h := φ(g 1 + g 2 ) directly as an application of Nonlin), or if there is no downstream nonlinearity,
treat it as an application of Nonlin. Because LinComb allows one to express certain gadgets such as
skip connection and convolutions more easily, we chose to present N ETSOR as the canonical version
of Tensor Program here. See Appendix J for a formal specification of N ETSOR− .
By the remark above, the following N ETSOR− Master Theorem is equivalent to Theorem 5.4.
Theorem E.3 (N ETSOR− Master Theorem). Fix any N ETSOR− program satisfying Assumption 5.1
and with all nonlinearities controlled. If g 1 , . . . , g M are all of the G-vars (including all input G-vars),
then for any controlled ψ : RM → R, as n → ∞,
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
(2)
(note
that
the
cases
involving
LinComb
i,j=1
in Eq. (2) are now vacuous in this setting with N ETSOR− program). See Fig. 1 for an illustration.
To prove Theorem 5.4, we will in fact prove Theorem E.3; see Appendix H.
52

Definition E.4. A N ETSOR◦ program (pronounced “Net-Sor-O”) is a N ETSOR program but where
Nonlin rules allow nonlinearities φ to take H-vars. N ETSOR◦ programs are thus a superset of
N ETSOR programs. Similarly, a N ETSOR◦+ (pronounced “Net-Sor-O-Plus”) program is a N ETSOR+
program but where Nonlin+ rules allow nonlinearities φ to take H-vars.
Remark E.5. Any N ETSOR◦ program is semantically identical to a N ETSOR program: If g := W h
is any application of MatMul, we can rewrite h as a function of G-vars only by unwinding its
definition recursively (e.g., if h := φ(h1 , g) and h1 := ψ(g 1 , g 2 ), then we can write directly
h := φ(ψ(g 1 , g 2 ), g) using a single application of Nonlin in G-vars). Likewise, any N ETSOR◦+
program can be rewritten as a N ETSOR+ program without losing any information.
N ETSOR◦ programs can be more concise than N ETSOR programs by reusing H-vars more efficiently;
see Program 11 for GRU expressed in N ETSOR◦ , and compare to Program 5. However, the Master
Theorem is more complicated to state, and the task of unwinding the nonlinearity just shifts from the
program to the scaling limit computation stage; see Eq. (53) below. This is why we did not present
N ETSOR◦ as the canonical version of Tensor Programs.
Definition E.6. Fix a N ETSOR◦ program. For any H-var h, let ϕh be the unwinded nonlinearity expressing h as a function of only G-vars, as described in Remark E.5, i.e. h = ϕh (g 1 , . . . , g M ). For example, if h := φ(h1 , g 3 ) and h1 := ψ(g 1 , g 2 ), then h = φ(ψ(g 1 , g 2 ), g 3 ) and ϕh = φ(ψ(−, −), −).
Similarly, in a N ETSOR◦+ program, if h is an H-var, let ϕh be the unwinded nonlinearity (possibly
with parameters) expressing h as a function only G-vars, h = ϕh (g 1 , . . . , g M ; Θ).
For example, if h := φ(h1 , g 3 ; θ2 ) and h1 := ψ(g 1 , g 2 ; θ1 ), then h = φ(ψ(g 1 , g 2 ; θ1 ), g 3 ; θ2 ) and
ϕh (−, −, −; θ1 , θ2 ) = φ(ψ(−, −; θ1 ), −; θ2 ).
Note that this ϕh notation is consistent with the semantics of the same notation defined in
Definition C.10, where there is nothing to unwind.
The extended mean and covariance µ and Σ can still be computed as before in a N ETSOR◦ program.
The only difference is that we are using the unwinded nonlinearities ϕh instead.
 in
(g)
if g is input
µ
P
P
i
µ(g) =
a
µ(y
)
if g = i ai y i , introduced by LinComb ,
i
i

0
otherwise

in
0

Σ (g, g )
if g, g 0 are inputs

P
P


i
0

if g = i ai y i , introduced by LinComb
Pi ai Σ(y , g )
P
i
Σ(g, g 0 ) =
if g 0 = i ai y i , introduced by LinComb
i ai Σ(g, y )

0

2

σW
EZ ϕh (Z)ϕh (Z) if g = W h, g 0 = W h0 , introduced by MatMul w/ same A-var W



0
otherwise
(53)
0

where ϕh and ϕh is as defined in Definition E.6 and Z ∼ N (µ, Σ).
Theorem E.7 (N ETSOR◦ Master Theorem). Fix any N ETSOR◦ program satisfying Assumption 5.1
and with all unwinded nonlinearities ϕh controlled, for all H-vars h. If g 1 , . . . , g M are all of the
G-vars (including all input G-vars), then for any controlled ψ : RM → R, as n → ∞,
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
(53).
See
Fig.
1
for
an
illustration.
i,j=1
Theorem E.8. Fix any N ETSOR◦+ program satisfying Assumption 5.1 and Assumption C.3. Suppose
for each parametrized unwinded nonlinearity ϕh (−; Θ), the parameters Θ are instantiated with
random variables that converge almost surely to some deterministic vector Θ̊ as n → ∞, and assume
ϕh is parameter-controlled at Θ̊. If g 1 , . . . , g M are all of the G-vars (including all input G-vars),
then for any l, for any random vector Θ ∈ Rl that converges almost surely to a deterministic vector
53

N ETSOR◦ program 11 GRU, with Gating Function σ and Activation Function φ
// Embeddings of input sequence
Input: Uz x1 , . . . , Uz xt : G(n)
Input: Ur x1 , . . . , Ur xt : G(n)
Input: Uh x1 , . . . , Uh xt : G(n)
// Parameters
Input: Wz , Wr , Wh : A(n, n)
Input: bz , br , bh : G(n)
// Initial GRU state
Input: h0 : G(n)
// Readout layer
Input: v : G(n)
// Time step 1
h1z := Wz h0 : G(n)
z̃ 1 := h1z + Uz x1 + bz : G(n)
h1r := Wr h0 : G(n)
r̃1 := h1r + Ur x1 + br : G(n)
// σ is gating function, typically sigmoid; applying Nonlin
ĥ0 := h0 σ(r̃1 ) : H(n)
h1h := Wh ĥ0 : G(n)
h̃1 := h1h + Uh x1 + bh : G(n)
// Apply Nonlin
// φ is activation function, typically tanh
h1 := (1 − σ(z̃ 1 )) h0 + σ(z̃ 1 ) φ(h̃1 ) : H(n)
// Time step 2
h2z := Wz h1 : G(n)
z̃ 2 := h2z + Uz x2 + bz : G(n)
h2r := Wr h1 : G(n)
r̃2 := h2r + Ur x2 + br : G(n)
// No longer need to unwind h1 as in Program 5
ĥ1 = σ(r̃1 ) h1 : H(n)
h2h := Wh ĥ1 : G(n)
h̃2 := h2h + Uh x2 + bh : G(n)
// No longer need to unwind h1 as in Program 5
h2 := (1 − σ(z̃ 2 )) h1 + σ(z̃ 2 ) φ(h̃2 ) : H(n)
// Time step 3
..
.
// Time step t
// Define z̃ t , r̃t , h̃t just like above
..
.
// No longer need to unwind ht − 1 as in Program 5
t
t
t
ht := (1 − σ(z̃√
)) ht−1 + σ(z̃
√ ) φ(h̃ ) : H(n)
> 1
> t
Output: (v h / n, . . . , v h / n)

Θ̊, as n → ∞, and for any ψ : RM × Rl → R parameter-controlled at Θ̊,
n

1X
a.s.
ψ(gα1 , . . . , gαM ; Θ) −−→
E
ψ(Z; Θ̊),
n α=1
Z∼N (µ,Σ)
a.s.

where −−→ means almost sure convergence, Z ∈ RM , and µ ∈ RM and Σ ∈ RM ×M are given in
Eq. (53), calculated by replacing each parametrized unwinded nonlinearity ϕ(−; Θ) with parameterless nonlinearity ϕ(−; Θ̊).
54

F

Programs with Variable Dimensions

Notation In this section, we let dim(x) denote the dimension of an H-var x.
Before this section, we have mostly assumed that all dimensions in a N ETSOR (or N ETSOR+ )
program are equal. This is not necessary, and was done only to more quickly present the main ideas
of this work. In general, we can allow the H-vars in a program to vary in dimension, subject to the
obvious dimensionality constraints imposed by the different rules:
(
Pk
If y := i=1 ai xi or y := φ(x1 , . . . , xk ), then the dim(y) = dim(xi ) for each i.
(54)
If y := W x and y 0 := W x0 , then dim(x) = dim(x0 ) and dim(y) = dim(y 0 ).
Definition F.1. Given an equivalence relation ≃ on the input G-vars of a program, we extend this to
an equivalence relation on all H-vars of the program by
h ≡ h0 ⇐⇒ h ≃ h0 OR h and h0 are constrained to have the same dimension by (54).

(55)

We call any such equivalence class a Common Dimension Class, or CDC.
Intuitively, the dimensions of H-vars in each CDC are all the same, and this common dimension is
allowed to vary between CDCs.
Example F.2. In Program 1, the CDCs are {W 1 x, b1 , h1 , x1 } and {b2 , v, h̃2 , h2 , x2 }. In Program 2,
all G-vars are in the same CDC, and given the body of the program, this is the only way to partition
the H-vars into CDCs, because the reuse of W across time step ties all H-var dimensions to be equal.
Assumption F.3. Fix a N ETSOR program with some equivalence relation on the input G-vars, and
thus with induced CDCs over its H-vars. Assume the dimensions in each CDC are the same, but
the dimensions of different CDCs can vary. Suppose for each A-var W : A(m0 , m), we sample
2
2
Wαβ ∼ N (σW
/m) for some σW
> 0. Suppose further for each CDC C with dimension n, for each
α ∈ [n], we sample, i.i.d., {xα : x ∈ C and x is input G-var} ∼ N (µC , ΣC ) for some mean µC and
covariance ΣC over input G-vars in C.
Then the following result is an easy extension of Theorem 5.4.
Theorem F.4 (N ETSOR Master Theorem; Variable Dimensions). Fix any N ETSOR program satisfying
Assumption F.3 and with all nonlinearities controlled. For any CDC C, if g 1 , . . . , g M are all of the
G-vars (including all input G-vars) in C, then for any controlled ψ : RM → R, as all dimensions in
the program tend to infinity (not just the dimension of C) 13 ,
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
Z∼N (µC ,ΣC )
Z∼N (µC ,ΣC )
a.s.

1

M

where −−→ means almost sure convergence, Z = (Z g , . . . , Z g ) ∈ RM , and µC = {µC (g i )}M
i=1 ∈
M ×M
RM and ΣC = {ΣC (g i , g j )}M
are given in Eq. (56). See Fig. 1 for an illustration.
i,j=1 ∈ R
Definition F.5. For any CDC C and G-vars g, g 0 in C, define recursively
 C
(g)
if g is input
µ
P
P
C i
µC (g) =
a
µ
(y
)
if
g = i ai y i , introduced by LinComb ,
i
i

0
otherwise


ΣC (g, g 0 )
if g, g 0 are inputs

P
P


C
i
0

if g = i ai y i , introduced by LinComb
Pi ai Σ (y , g )
P
ΣC (g, g 0 ) =
ai ΣC (g, y i )
if g 0 = i ai y i , introduced by LinComb
i

0

2

σW
EZ ϕh (Z)ϕh (Z) if g = W h, g 0 = W h0 , introduced by MatMul w/ same A-var W



0
otherwise
(56)
0

0

where Z ∼ N (µC , ΣC ) with C 0 denoting the CDC of h and h0 .
Essentially the same proof of Theorem 5.4 goes through for Theorem F.4, by noting that this proof
only requires the minimum of all dimensions to go to infinity.
13

Note that we do not require the dimensions of different CDCs to have a convergent, finite but nonzero, ratio

55

G

Theoretical Tools

In this section, we list a series of theoretical tools needed to prove the Master Theorems.
G.1

Probability Facts
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
Lemma G.1. Let {Xn }n≥1 be a sequence of random variables with zero mean. If for some p ∈ N
and for all n, E Xn2p ≤ cn−1−ρ , for some ρ > 0, then Xn → 0 almost surely.
Proof. By Markov’s inequality, for any  > 0,
X
n

Pr(|Xn | > ) = Pr(Xn2p > 2p ) ≤ E Xn2p /2p ≤ cn−1−ρ /2p
X
Pr(|Xn | > ) ≤
cn−1−ρ /2p < ∞.
n

By Borel-Cantelli Lemma, almost surely, |Xn | ≤  for all large n. Then, if we pick a sequence
{k > 0}k converging to 0, we have that, almost surely, for each k, |Xn | ≤ k for large enough n —
i.e. almost surely, Xn → 0.
The following is a standard fact about multivariate Gaussian conditioning
n1
Proposition G.2. Suppose Rn1 +n2 3 x ∼ N (µ, K), where
 we partition x = (x1 , x2 ) ∈ R ×
K
K
d
11
12
Rn2 , µ = (µ1 , µ2 ) ∈ Rn1 × Rn2 , and K =
. Then x1 =x2 N (µ|x2 , K|x2 ) where
K21 K22
+
µ|x2 = µ1 − K12 K22
(x2 − µ2 )
+
K|x2 = K11 − K12 K22
K21 .

Lemma G.3 (Stein’s lemma). For jointly Gaussian random variables Z1 , Z2 with zero mean, and
any function φ : R → R where E φ0 (Z1 ) and E Z1 φ(Z2 ) exists, we have
E Z1 φ(Z2 ) = Cov(Z1 , Z2 ) E φ0 (Z2 ).
Proposition G.4 (Convergence of output vector to Gaussian given convergent 2nd moments). Cona
sider a sequence (in t ∈ N) of collections of random vectors {xab ∈ Rna }rb=1
, a = 1, . . . , m, where
0

d

na and xab can depend on t but m and ra are fixed. Suppose as t → ∞, n1a xab> xab −
→ Σ∞
ab,ab0 for
∞
∞
a
2
some deterministic PSD matrix Σ = {Σab,a0 b0 }a,b,a0 ,b0 . If v ∼ N (0, σa I) is sampled independently for each a, and independently from {xab }a,b , then
√
d
→ N (0, Σ)
{v a> xab / na }a,b −
where the covariance Σ = {Σab,a0 b0 }a,b,a0 ,b0 has
 2 ∞
σa Σab,ab0
Σab,a0 b0 =
0

if a = a0
else.

Proof. WLOG, we assume σa = 1 for all a = 1, . . . , m. Let f : R
continuous function. We need to show that
E f ({v a> xab }a,b ) →

E

P

a ra

→ R be a bounded

f (Z)

Z∼N (0,Σ)
0

Note that if we define the PSD matrix Σ̂ by Σ̂ab,ab0 = n1a xab> xab and Σ̂ab,a0 b0 = 0 if a 6= a0 , then
E f ({v a> xab }a,b ) = E

E

Σ̂ Z∼N (0,Σ̂)

56

f (Z)

where the distribution over Σ̂ is induced by the distribution over {xab }. The function f˜(Σ̂) :=
d

EZ∼N (0,Σ̂) f (Z) is bounded because f is bounded. Thus, as Σ̂ −
→ Σ∞ by assumption, we have
E f ({v a> xab }a,b ) = E f˜(Σ̂) → f˜(Σ∞ ) =
Σ̂

E

Z∼N (0,Σ∞ )

f (Z)

as t → ∞.
G.2

Review of Moore-Penrose Pseudoinverse

We recall Moore-Penrose pseudoinverse and some properties of it.
Definition G.5. For A ∈ Rn×m , a pseudoinverse of A is defined as a matrix A+ ∈ Rm×n that
satisfies all of the following criteria
• AA+ A = A
• A+ AA+ = A+
• (AA+ )> = AA+
• (A+ A)> = A+ A
The following facts are standard
• if A has real entries, then so does A+ .
• The pseudoinverse always exists and is unique.
• When A is invertible, A+ = A−1 .
• (A> )+ = (A+ )> , which we denote as A+> .
• A+ = (A> A)+ A> = A> (AA> )+ .
• AA+ is the orthogonal projector to the column space of A; I − A+ A is the orthogonal
project to the null space of A.
• if A has singular value decomposition A = U ΛV where U and V are orthogonal and Λ has
the singular values on its diagonal, then A+ = V > Λ+ U > where Λ+ inverts all nonzero
entries of Λ.
Pn
• For any collection of vectors {vi }ni=1 in a Hilbert space, w 7→ i,j=1 vi (Σ+ )ij hvj , wi,
where Σij = hvi , vj i, is the projection operator to the linear span of {vi }ni=1 .
G.3

Gaussian Conditioning Trick

The Gaussian conditioning trick was introduced by Bolthausen [5] for solving the TAP equation in
statistical physics. Later, this idea was used in Bayati and Montanari [3] to study the Approximate
Message Passing algorithm in compressed sensing.
We present a slightly more general versions of lemmas from Bayati and Montanari [3] that deal with
singular matrices.
Lemma G.6. Let z ∈ Rn be a random vector with i.i.d. N (0, σ 2 ) entries and let D ∈ Rm×n be a
linear operator. Then for any constant vector b ∈ Rn the distribution of z conditioned on Dz = b
satisfies:
d

z =Dz=b D+ b + Πz̃
where D+ is the (Moore-Penrose) pseudoinverse, Π is the orthogonal projection onto subspace
{z : Dz = 0}, and z̃ is a random vector of i.i.d. N (0, σ 2 ).
Proof. When D = [Im×m |0m×n−m ], this claim is immediate. By rotational symmetry, this shows
that, for any vector space V and vector v orthogonal to it, conditioning z on V + v yields a Gaussian
centered on v with covariance determined by ΠV z. Then the lemma in the general case is implied by
noting that {z : Dz = b} can be decomposed as {z : Dz = 0} + D+ b.
57

Lemma G.7. Let A ∈ Rn×m be a matrix with random Gaussian entries, Aij ∼ N (0, σ 2 ). Consider
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

Proof. We apply Lemma G.6 to D : A 7→ (AQ, P > A). The pseudoinverse of D applied to (Y, X > )
can be formulated as the unique solution of

argmin kAk2F : AQ = Y, P > A = X >
A

where k − kF denotes Frobenius norm. We check that E is a 1) a solution to AQ = Y, P > A = X >
and 2) the minimal norm solution.
We have EQ = Y Q+ Q + P +> X > Q − P +> P > Y Q+ Q. Note that Y Q+ Q = Y because Y =
AQ =⇒ Y Q+ Q = AQQ+ Q = AQ = Y . So EQ = Y + P +T (X > Q − P > Y ). But
X > Q = P > AQ = P > Y , so EQ = Y as desired. A similar, but easier reasoning, gives P > E = X > .
This verifies that E is a solution.
To check that E is minimal norm, we show that it satisfies the stationarity of the Lagrangian
L(A, Θ, Γ) = kAk2F + hΘ, Y − AQi + hΓ, X − A> P i.
∂L
So ∂A
= 0 =⇒ 2A = ΘQ> + P Γ> for some choices of Θ ∈ Rn×q and Γ ∈ Rm×p . For
Θ = 2Y (Q> Q)+ and Γ> = 2(P > P )+ [X > − P > Y Q> ], we can check that

ΘQ> + P Γ> = 2Y (Q> Q)+ Q> + 2P (P > P )+ [X > − P > Y Q+ ]
= 2Y Q+ + 2P +> X > − 2P +> P > Y Q+
= 2E
as desired.
G.4 α-Controlled Functions
We generalize Definition 5.3 slightly as follows.
Definition G.8 (α-controlled).
For α > 0, a function φ : Rk → R is said to be α-controlled if for
P
C k
|xi |α +c
i=1
some C, c > 0, |φ(x)| ≤ e
for all x ∈ Rk .
We present a few helper lemmas to facilitate our reasoning with α-controlled functions. The next
lemma is easy to show using the equivalence of norms in finite dimensional Euclidean space.
Lemma G.9. Let φ : Rk → R. The following are equivalent
1. φ is α-controlled
α

Ckxkp +g(x)
2. For some p ≥ 1 and some g(x) = okxkp →∞ (kxkα
p ), C, c > 0, |φ(x)| ≤ e
α

3. For all p ≥ 1, there is some C, c > 0, |φ(x)| ≤ eCkxkp +c
α

Lemma G.10. Let Ckα : R≥0 → R, c 7→ Ez∼N (0,Ik ) eckzk2 . Then
1. Ckα < ∞ iff α < 2
2. for α ≥ 1,
α

E

z∼N (µ,Σ)

α

α/2

eCkzk2 ≤ eCkµk2 Ckα (CαkΣk2 )

where kΣk2 denotes the spectral norm of Σ.
58

3. for any α-controlled φ : Rk → R with α ≥ 1, there is C > 0 such that for all µ ∈ Rk and
k × k PSD matrix Σ,
α

E

z∼N (µ,Σ)

α/2

|φ(z)| ≤ CeCkµk2 Ckα (CαkΣk2 )

where kΣk2 denotes the spectral norm of Σ.
Note that the RHS is a montonic function in kµk2 and kΣk2 , in the sense that if kµk2 and kΣk2 don’t
decrease, then the RHS will not decrease either.
Proof. The first claim is obvious and the third follows from the second easily. For the second,
√

α

E

eCkzk2 ≤

z∼N (µ,Σ)

α

E

eCk Σz+µk2

E

eCα(k Σzk2 +kµk2 )

z∼N (0,I)
√

≤

α

α

z∼N (0,I)
α/2

α

≤ eCkµk2

E

eCαkΣk2

kzkα
2

z∼N (0,I)
α

α/2

= eCkµk2 Ckα (CαkΣk2 ).

H

Proof of N ETSOR Master Theorem

In this section, we prove Theorem E.3, i.e. the Master Theorem for programs without LinComb. By
Remark E.2, this would also show Theorem 5.4.
A Bit of Notation and Terminology Note that, for each n, the randomness of our program specified
by Theorem 5.4 comes from the sampling of the input variables. Let U be the product space obtained
from multiplying together the corresponding probability space for each n. Each sample from
this product probability space thus correspond to a sequence {S(n)}n of instantiatiations of input
variables. Below, when we say “almost surely” (often abbreviated “a.s.”), we mean “almost surely
over the probability of U.” We will also often make statements of the form
almost surely (or, a.s.), for all large n, A(n) is true
where A(n) is a claim parametrized by n. This means that for all but a U-probability-zero set of
sequences {S(n)}n of input variable instantiations, A(n) is true for large enough n. Note that the
order of the qualifiers is very important here.
We induct, but on what? A natural way of going about proving Theorem 5.4 is by inducting on
the number of variables in a program. It turns out this is not enough to prove our claim in its full
generality (see below), and it would be more fruitful to perform a simultaneous induction on our
claim (Moments) along with another statement, parametrized by m,
Moments(m) For any controlled ψ : Rm → R, as n → ∞,
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
59

Let us explain in brief why we need to consider CoreSet satisfying Basis and NullAvoid.
• Basis reduces the consideration of Moments to only the core set G-vars, since every other
G-var is asymptotically a linear combination of them.
• When we apply the Gaussian conditioning technique Proposition G.2, we need to reason
about the pseudo-inverse
Λ+ of some submatrix Λ of a covariance matrix. Each entry of Λ
Pn
1
is of the form n α=1 φi (gα1 , . . . , gαm−1 )φj (gα1 , . . . , gαm−1 ) for a collection of controlled
scalar functions {φi }i . This Λ will be a random variable which converges a.s. to a detera.s.
minstic limit Λ̊ as n → ∞. It should be generically true that Λ+ −−→ Λ̊+ as well, which
is essential to make the Gaussian conditioning argument go through. But in general, this
is guaranteed only if Λ’s rank doesn’t drop suddenly in the n → ∞ limit. We thus need to
guard against the possibility that g 1 , . . . , g m , in the limit, suddenly concentrate on a small
set on which {φi (g 1 , . . . , g m )}i are linearly dependent. This is where NullAvoid comes in.
It tells us that g 1 , . . . , g m will avoid any such small set asymptotically, so that indeed the
rank of Λ will not drop in the limit.
Proof organization We will show that Moments and CoreSet are true for input variables, as the
base case, and
Moments(m − 1) and CoreSet(m − 1) =⇒ Moments(m) and CoreSet(m)
as the inductive step. By induction, we obtain Moments(M ), which is Theorem 5.4.
The base cases are easy and we will dispatch with them immediately after this in Appendix H.1, but
the inductive step is much more complicated, and we will need to set up notation in Appendix H.2.
During this setup, we prove some basic limit theorems using the induction hypothesis. However,
the full generality of these claims requires some consequences of CoreSet, which we call “rank
stability” and “zero stability” (related to Assumption C.3). These notions are introduced and proved
in Appendix H.3.
We would then finally be able to handle the inductive steps at this point. We first prove
Moments(m − 1) and CoreSet(m − 1) =⇒ CoreSet(m)
in Appendix H.4 because it is easier. Then we prove
Moments(m − 1) and CoreSet(m − 1) =⇒ Moments(m)
in Appendix H.5.
H.1

Base Cases: Moments and CoreSet for Input Variables

Base case: Moments(input vars) Suppose the input variables are x1 , . . . , xk : G(n) (so that
µin ∈ Rk , Σin ∈ Rk×k ). We need to show that for any controlled function ψ : Rk → R,
n

1X
a.s.
ψ(x1α , . . . , xkα ) −−→
E
ψ(Z),
n α=1
Z∼N (µ,Σ)
where ψ on the RHS ignores all coordinates corresponding to non-input G-vars. Since µ and Σ
restricted to input variables are just µin and Σin (see Eq. (2)), the RHS expectation is just
E

Z∼N (µ,Σ)

ψ(Z) =

E

Z in ∼N (µin ,Σin )

ψ(Z in )

and the almost sure convergence we desire is just a result of the law of large numbers.
Base Case: CoreSet(input vars) Let x1 , . . . , xk be the input G-vars as above. Pick the core set
M to be any subset of [k] such that rank Σin |M = rank Σin . Then it’s straightforward to verify
Basis and NullAvoid.
60

H.2

Inductive Case: Setup

We now assume Moments(m − 1) and CoreSet(m − 1) and want to reason about g m to show
Moments(m) and CoreSet(m). Suppose
g m := Ah where A : A(n, n) and h : H(n) was introduced by h := φ(g 1 , . . . , g m−1 )
(WLOG padding coordinates if necessary; if h = g i is a G-var, then pretend φ just projects to the ith
coordinate). For brevity, we will just write g = g m . Consider all previous instances where A is used:
ĝ i := Aĥi , i = 1, . . . , r.
Define

def

def

Ĝ = [ĝ 1 | . . . |ĝ r ] ∈ Rn×r , Ĥ = [ĥ1 | . . . |ĥr ].
1

(57)

r

We will also use Ĝ to denote the set of G-vars {ĝ , . . . , ĝ } when we later write expressions like
Σ(Ĝ, Ĝ). Let B be the σ-algebra spanned by all previous G-vars g 1 , . . . , g m−1 (and hence also all
previous H-vars). Conditioning on B, A is constrained by Ĝ = AĤ, and we have by Lemma G.7,
d

g =B (ĜĤ + + ÃΠ⊥
)h
Ĥ
where Ã is an independent copy of A and ΠĤ = Ĥ Ĥ + = Ĥ(Ĥ > Ĥ)+ Ĥ > is the projection to the
column space of Ĥ.
If we define
def

ω = ĜĤ + h,

def

σ = σA

q
kΠ⊥
hk2 /n
Ĥ

(58)

then
d

g =B ω + σy, with y ∼ N (0, In )

(59)

For brevity, we will define the following matrices and vectors of fixed dimension
def

def

Λ̂ = Ĥ > Ĥ/n ∈ Rr×r , η̂ = Ĥ > h/n ∈ Rr .

(60)

Suppose ĥi was introduced by ĥi := φ̂i (g 1 , . . . , g M ), where φ̂i depends at most on g 1 , . . . , g m−1 .
˚
By induction hypothesis Moments(m − 1), Λ̂ and η̂ all converge a.s. to corresponding limit values Λ̂
and ˚
η̂, since their entries are moments of Z 1 , . . . , Z m−1 :
a.s. ˚ def
Λ̂ij −−→ Λ̂ij = E φ̂i (Z)φ̂j (Z) = (σA )−2 Σ(ĝ i , ĝ j )
a.s.
def
η̂i −−→ ˚
η̂i = E φ̂i (Z)φ(Z) = (σA )−2 Σ(ĝ i , g).

˚
It turns out that, as a consequence of Lemma H.4 below, a.s. for all large enough n, rank Λ̂ = rank Λ̂.
Therefore, as pseudoinverse is continuous on matrices of fixed rank, we get the following proposition
a.s. ˚
Proposition H.1. Λ̂+ −−→ Λ̂+ .
Using this proposition, we compute the limits of the conditional mean ω and variance σ 2 .
a.s.

def

Lemma H.2. σ 2 −−→ σ̊ 2 = Σ(g, g) − Σ(g, Ĝ)Σ(Ĝ, Ĝ)+ Σ(Ĝ, g)
Proof. Note that
2
σA
σ2
σ2
(h> h − h> ΠĤ h) = A (h> h − h> Ĥ(Ĥ > Ĥ)+ Ĥ > h) = A (h> h − η̂ > Λ̂+ η̂).
n
n
n
Because φ is polynomially-bounded, so is φ(z)2 as well. By induction hypothesis,

σ2 =

n
1 >
1X
a.s.
−2
h h=
φ(gα1 , . . . , gαm−1 )2 −−→
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
η̂ and Λ̂ −−→ Λ̂. By Proposition H.1, Λ̂+ −−→ Λ̂+ . Combining all of these limits
together yields the desired claim.

61

def
a.s.
def ˚
Lemma H.3. Let v = Λ̂+ η̂, so that v −−→ v̊ = Λ̂+˚
η̂. Then for some vector ε̂ ∈ Rr that go to 0 a.s.
with n, ω = Eh = Ĝ(v̊ + ε̂)
a.s. ˚
Proof. Using Eq. (60), we can re-express ω as ω = ĜΛ̂+ η̂. By Proposition H.1, Λ̂+ −−→ Λ̂+ , so
def
a.s.
that setting ε̂ = v − v̊, we get ε̂ −−→ 0. Thus, ω = Ĝ(v̊ + ε̂) as desired.

H.3

Rank Stability and Zero Stability

In this section, we prove the following consequence of CoreSet(m − 1) and Moments(m − 1).
Lemma H.4 (Rank Stability). For any collection of controlled functions {ψj : Rm−1 → R}lj=1 , let
K ∈ Rl×l be the random matrix (depending on n) defined by
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

Then, a.s. for all large n, for all α ∈ [n],
ψi (gα1 , . . . , gαm−1 ) =

X

Fij ψj (gα1 , . . . , gαm−1 ).

j∈I

This will be primarily a corollary of the following Lemma H.5.
Lemma H.5 (Zero Stability). If ψ : Rm−1 → R≥0 is a nonnegative function such that
n

1X
a.s.
ψ(gα1 , . . . , gαm−1 ) −−→ 0
n α=1
then, almost surely, for large enough n,
ψ(gα1 , . . . , gαm−1 ) = 0
for all α ∈ [n].
We give the proof of Lemma H.4 now, assuming Lemma H.5.
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
62

and Ψ is a nonnegative function. By Lemma H.5, we have that: almost surely, for large enough n,
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

(note that only for i 6∈ I is v i nonzero), then we have, a.s. for large n, v i> Kv i = 0, or
X
ψi (gα1 , . . . , gαm−1 ) =
Fij ψj (gα1 , . . . , gαm−1 ).
j∈I

In the rest of this section, we prove Lemma H.5. It helps to first show that the linear relations given
in Basis carries over to the n → ∞ limit.
Proposition H.6. Let Σ|M be the submatrix of Σ with rows and columns corresponding to
{g i : i ∈ M}. Then rank Σ = rank Σ|M = |M|. Furthermore, if Z = (Z 1 , . . . , Z m−1 ) ∼
N (µ|m−1 , Σ|m−1 ), where µ|m−1 , Σ|m−1 are the restrictions of µ, Σ to g 1 , . . . , g m−1 , then
X
d
Zi =
aj Z j
j∈M

where {aj }j∈M are the coefficients corresponding to g i given in Basis.
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
63

Now we show Lemma H.5.
Proof of Lemma H.5. By Moments(m − 1),
n

1X
ψ(gα1 , . . . , gαm−1 ) →
E
ψ(Z).
n α=1
Z∼N (µ|m−1 ,Σ|m−1 )
By Proposition H.6, if Z ∼ N (µ|m−1 , Σ|m−1 ) and Z|M is the part of Z corresponding to M, then
Z|M has density. The law of Z|M (namely N (µ|M , Σ|M ), where µ|M , Σ|M are the restriction of
µ and Σ to M) is absolutely continuous against the Lebesgue measure of RM and vice
versa, so that a set of Lebesgue measure zero is measure zero under N (µ|M , Σ|M ), and
vice versa; and
Z|M is basis of Z. Basis yields a linear function λ such that λ({gαj }j∈M ) = {gαi }m−1
i=1 for all α,
d

almost surely asymptotically, and λ(Z|M ) = Z, so that
ψ(Z) =

E

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
H.4

Inductive Step: CoreSet(m)

In this section, we show
Moments(m − 1) and CoreSet(m − 1) =⇒ CoreSet(m).
More explicitly, we need to think about whether to add m to the core set M of [m − 1] in order to
maintain the Basis and NullAvoid properties.
We proceed by casework on whether σ̊ = 0.
H.4.1

If σ̊ = 0

We will show that the core set properties are maintained if we don’t add m to the core set.
def

Consider the space L = L2 (N (µ|M , Σ|M )) of square-integrable real functions against the measure
N (µ|M , Σ|M ) defined on RM . Let hφ, ψi = EY ∼N (µ|M ,Σ|M ) φ(Y )ψ(Y ) be the inner product of
this space. Just like in a finite-dimensional inner product space, given a finite collection of functions
S = {ψ i }ki=1 , the orthogonal projection operator ΠS to the span of S (inside L) is given by
ΠS φ =

k
X

ai ψ i ,

i=1

for any φ ∈ L, where
a = Λ+ b ∈ Rk ,
bj = hψ j , φi, b ∈ Rk ,
Λij = hψ i , ψ j i, Λ ∈ Rk×k .
64

Recall that g = Ah where h was introduced by h := φ(g 1 , . . . , g m−1 ), for some controlled φ, and
likewise ĝ i = Aĥi where ĥi = φ̂i (g 1 , . . . , g m−1 ), for each i ∈ [r]. By Basis, we know that, a.s. for
large enough n, each of g 1 , . . . , g m−1 is a (unique, constant-in-n) linear combination of {g j }j∈M .
Therefore, we can express
h = φ({g j }j∈M ),

∀i ∈ [r], ĥi = φ̂i ({g j }j∈M )

and

def

for some functions φ, φ̂i ∈ L. For convenience, set S = {φ̂i }i .
One can see then, as in the proof of Lemma H.2,
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
under Lebesgue measure by Lemma H.4), φ is a linear combination of {φ̂i }ri=1 , i.e.
X
∀x 6∈ U, φ(x) =
ci φ̂i (x)
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
Lemma H.7. If σ̊ = 0, then there are coefficients {ci }ri=1 such that a.s. for large enough n,
X
g=
ci ĝ i .
i∈[r]

H.4.2

If σ̊ > 0

It’s clear that g cannot be in the linear span of {ĝ i }i∈[r] asymptotically, so we will add g to the core
set, and the Basis property follows immediately. In the below, we shall write M for the old core set,
def
and M0 = M ∪ {g} for the new one.
It remains to show NullAvoid for M0 . Because the conditional variance of gαm given g 1 , . . . , g m−1 is
σ 2 , and because σ̊ > 0, this assumption implies that, a.s. for all large enough n,
gαm |g 1 , . . . , g m−1 has density for all α ∈ [n].
(61)
By “has density” here, we in particular mean that any Lesbegue measure zero set in R has zero
probability under the conditional distribution of gαm given g 1 , . . . , g m−1 .
0

Now, to prove NullAvoid holds for M0 : Let {Anα ⊆ RM }n∈N,α∈[n] be a triangular array of
def

Lesbegue measure zero sets. For each Anα , define Bnα = {x ∈ RM : λ(Anα |x ) 6= 0}, where
Anα |x = {y ∈ R : (x, y) ∈ Anα ⊆ RM × R} is the “slice” of Anα at x, and λ is the 1-dimensional
0
Lebesgue measure. Because each Anα has measure zero in RM , necessarily each Bnα also has
M
measure zero in R . Applying NullAvoid to the triangular array {Bnα ⊆ RM }n∈N,α∈[n] , we get
that: a.s. for large enough n,
∀α ∈ [n], {gαi }i∈M 6∈ Bnα .
Therefore, by Eq. (61), a.s. for large enough n,
∀α ∈ [n], {gαi }i∈M0 6∈ Anα .
This finishes the proof of NullAvoid for M0 , and also CoreSet(m).
65

Lemma H.8. Assume Moments(m − 1). Suppose ψ : Rm−1 → R is controlled. Then as n → ∞,
1
a.s.
max |ψ(gα1 , . . . , gαm−1 )| −−→ 0
np α∈[n]
for any p > 0.
Proof. For any q > 0, we have the elementary bound
sX
max |ψ(gα1 , . . . , gαm−1 )| ≤ q
|ψ(gα1 , . . . , gαm−1 )|q .
α∈[n]

α∈[n]

Thus, for any q > 0,
v
u
1 u1 X
1
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

H.5

Inductive Step: Moments(m)

In this section, we show
Moments(m − 1) and CoreSet(m − 1) =⇒ Moments(m).
More specifically, we will show that for any controlled ψ : Rm → R,
n

1X
a.s.
ψ(gα1 , . . . , gαm ) −−→
E
ψ(Z)
n α=1
Z∼N (µ,Σ)
where again on the RHS ψ ignores all coordinates Z m+1 , . . . , Z M (corresponding to g m+1 , . . . , g M ).
By Lemma H.7, if σ̊ = 0, then almost surely, for large enough n, g = g m is just a (fixed) linear
combination of g 1 , . . . , g m−1 , so Moments is trivially true. Therefore, in the below, we assume
σ̊ > 0.

(?)

This assumption will be crucial for our arguments involving smoothness induced by Gaussian
averaging.
To clarify notation in the following, we will write EX [expression] to denote the expectation
over only the randomization in X, and E [ expression| B] to denote the expectation taken over all
randomness except those in B.
Proof Plan

Note that
n

1X
ψ(gα1 , . . . , gαm ) −
E
ψ(Z) ≤ A + B + C
n α=1
Z∼N (µ,Σ)

(62)

where
n

def

A=


1X
ψ(gα1 , . . . , gαm ) − E ψ gα1 , . . . , gαm−1 , ωα + σz
z
n α=1

n
r
X

1X
B=
E ψ gα1 , . . . , gαm−1 , ωα + σz − E ψ gα1 , . . . , gαm−1 ,
v̊i ĝαi + σ̊z
z
n α=1 z
i=1
!
n
r
X
X
def 1
C=
E ψ gα1 , . . . , gαm−1 ,
v̊i ĝαi + σ̊z −
E
ψ(Z)
n α=1 z
Z∼N (µ,Σ)
i=1
def

66

!

with z ∼ N (0, 1). Note that B and C are random variables in B. We will show that each of A, B, C
goes to 0 almost surely, which would finish the proof of Theorem 5.4.
a.s.

a.s.

Roughly speaking, A −−→ 0 because of a law of large number, B −−→ 0 because of the smoothness
a.s.
in Ez ψ induced by Gaussian averaging, and C −−→ 0 by induction hypothesis. We start with the last
item, since it’s the easiest.
H.5.1 C Converges Almost Surely to 0
a.s.

In this section we show that C −−→ 0 by a straightforward reduction to the inductive hypothesis.
Let Ẑ 1 , . . . , Ẑ r be the components of Z ∼ N (µ, Σ) corresponding to ĝ 1 , . . . , ĝ r , and let Ẑ be the column vector with these entries. Note that, by Proposition G.2, Z m (corresponding to g m ), conditioned
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

where we have set Ψ(Z 1 , . . . , Z m−1 ) = Ez∼N (0,1) ψ(Z 1 , . . . , Z m−1 ,v̊ > Ẑ +σ̊z). Ψ is a controlled
function since ψ is. Applying the induction hypothesis to Ψ, we obtain
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
H.5.2 A Converges Almost Surely to 0
a.s.

In this section we show A −−→ 0 by a bounding moments of A and then finishing with Lemma G.1.
def

For each α ∈ [n], let ψα (x) = ψ(gα1 , . . . , gαm−1 , ωα + σx), with ω and σ defined in Eq. (58). This
is a random function depending on the randomness of gα1 , . . . , gαm−1 , and it changes with n as well.
Note by Eq. (59),
n
1X
d
A =B
ψα (ξα ) − E0 ψα (ξα0 )
ξ
n α=1
where ξ, ξ 0 ∼ N (0, I).
Now the 2k-moment of A for any integer k ≥ 1 satisfies
" n 
2k
X
1
0
2k
E[A | B] = 2k E
ψα (ξα ) − E0 ψα (ξα )
+ ···
ξ
n
α=1

#
B

where the · · · include only terms that involve only powers of ψα (ξα ) − Eξ0 ψα (ξα0 ) greater than 1 for
each α. Indeed, other terms are killed by the conditional mean, since each ψα (ξα ) − Eξ0 ψα (ξα0 ) has
67

zero (conditional) mean and is independent from others when conditioned on B. We can push the
conditional mean operator inside each product by conditional independence. Then, applying power
mean inequality and AM-GM to bound each mixed moment with linear combinations of the 2kth
powers, we get
"
#
2k
n
Dn2k−1 1 X
def D
2k
0
E[A | B] ≤
·
E ψα (ξα ) − E0 ψα (ξα )
B = U
(63)
2k
ξ
n
n α=1
n
a.s.

where D is some absolute constant. Thus, to show A −−→ 0, it suffices to bound U and then apply
Lemma G.1. This is equivalent to bounding the uncentered moments Ez∼N (0,1) |ψα (x)|q for q = 2k.
Suppose ψ is λ-controlled and satisfies
|ψ(x)| ≤ eC

λ
i |xi | +c

P

for some C, c > 0 and λ < 2.

(64)

We have
h
i
λ Pm−1
i λ
|ψα (z)|q ≤ E eCq(|ωα +σz| + i=1 |gα | )+cq
z
z∼N (0,1)
h
i
λ
λ
λ Pm−1
i λ
≤ E eCq2 (|ωα | +|σz| + i=1 |gα | )+cq
z
h
i
λ
λ Pm−1
i λ
λ λ
λ
= eCq2 (|ωα | + i=1 |gα | )+cq E eCq2 σ |z|
E

z

=e

P
i λ
Cq2λ (|ωα |λ + m−1
i=1 |gα | )+cq

R

where R = C1λ (Cq2λ σ λ ) > 0 is deterministic and Ckλ is as defined in Lemma G.10. Now,
λ
r
r
|ωα |λ =

X

vi ĝαi

≤ rλ

i=1

X

|vi |λ |ĝαi |λ .

i=1

Additionally, almost surely, |vi | < |v̊i | + 1, for all i ∈ [r] simultaneously, for large enough n because
a.s.
vi −−→ v̊i . Let L = Cq2λ rλ maxri=1 (|v̊i | + 1) and L0 = cq, where C, c are as in Eq. (64). Then,
almost surely, for large enough n, for all z 1 , . . . , z m−1 ∈ R,
P

λ Pm−1
Pm−1 i λ
0
def
Cq2λ | ri=1 vi z i | + i=1
|z i |λ +cq
e
≤ eL +L i=1 |z | = ψ̂(z 1 , . . . , z m−1 ).
Obviously ψ̂ is λ-controlled. Then, again a.s. for large enough n, simultaneously for all α,
E

z∼N (0,1)

|ψα (z)|q ≤ Rψ̂(gα1 , . . . , gαm−1 ),

so that

n
n
1X
1X
a.s.
E
|ψα (z)|q ≤ R
ψ̂(gα1 , . . . , gαm−1 ) −−→ R E ψ̂(Z)
Z
n α=1 z∼N (0,1)
n α=1

as n → ∞, by induction hypothesis, where Z ∼ N (µ, Σ). Consequently, almost surely, the U in
Eq. (63) (as a function of g 1 , . . . , g m−1 ) is uniformly bounded in n. Applying Lemma G.1 for large
enough q yields the result.
H.5.3 B Converges Almost Surely to 0
a.s.

In this section we show B −−→ 0. The main insight here is integrating a function against Gaussian
induces smoothness in the function. We will assume that σ̊ > 0, so that σ > 0 almost surely for large
enough n. This is because σ̊ = 0 implies that g m is in the linear span of {g 1 , . . . , g m−1 } almost
surely by Lemma H.4, and Moments(m) then holds trivially.
For each α ∈ [n], w ∈ R, τ ≥ 0, let
def

Ψα (w; τ 2 ) =

E

z∼N (0,1)


ψ gα1 , . . . , gαm−1 , w + τ z .

2

(Here and in all that follows, τ is the square of τ , and the 2 is not an index). This is a random
function, with randomness induced by g 1 , . . . , g m−1 .
By Lemma G.3, Ψα is differentiable in w, and
∂w Ψα (w; τ 2 ) = τ −1
E

z∼N (0,1)

zψ(gα1 , . . . , gαm−1 , w + τ z).

We can obtain the following smoothness condition on Ψα .
68

Lemma H.9. For any w, τ,  ∈ R with , τ > 0,
λ

λ

λ

|Ψα (w; τ 2 ) − Ψα (w + ; τ 2 )| ≤ ||τ −1 R(τ )Ψ̂(gα1 , . . . , gαm−1 )eC4 (|w| +|| ) ,
def

λ Pm−1
i λ
i=1 |gα | +c

where Ψ̂(gα1 , . . . , gαm−1 ) = eC2

def

λ λ

λ

and R(τ ) = Ez |z|eC2 τ |z| .

Proof. Clearly, with z ∼ N (0, 1),
|∂w Ψα (w; τ 2 )| ≤ τ −1 E |zψ(gα1 , . . . , gαm−1 , w + τ z)|
z

≤τ

−1

λ

Pm−1

E |z|eC (|w+τ z| +

i=1

λ

λ

i λ
|gα
| )+c

z

λ

λ

Pm−1

≤ τ −1 E |z|eC2 (|w| +τ |z| +

i=1

i λ
|gα
| )+c

z

λ

λ

= τ −1 Ψ̂(gα1 , . . . , gαm−1 )R(τ )eC2 |w| .
Then
|Ψα (w; τ 2 ) − Ψα (w + ; τ 2 )|
Z w+
dξ ∂ξ Ψα (ξ; τ 2 )
≤
w

≤τ

−1

R(τ )Ψ̂(gα1 , . . . , gαm−1 )

= τ −1 R(τ )Ψ̂(gα1 , . . . , gαm−1 )
≤τ

−1

R(τ )Ψ̂(gα1 , . . . , gαm−1 )

Z w+
Zw
Z0 

λ

λ

dξ eC2 |ξ|
λ

λ

dξ eC2 |w+ξ|
λ

λ

λ

λ

dξ eC4 |w| eC4 |ξ|

0
λ

λ

λ

λ

= τ −1 R(τ )Ψ̂(gα1 , . . . , gαm−1 )eC4 |w| ||eC4 || .

Therefore, with z ∼ N (0, 1),
"
E ψ(gα1 , . . . , gαm−1 ,
z

= Ψα

r
X

#

"

vi ĝαi + σz) − E ψ(gα1 , . . . , gαm−1 ,
z

i=1
r
X
i=1

!
vi ĝαi ; σ 2

− Ψα

r
X

r
X

#
v̊i ĝαi + σz)

i=1

!
v̊i ĝαi ; σ 2

i=1
P

λ



| ri=1 v̊i ĝαi | +|α |λ | |,
≤ σ −1 R(σ)Ψ̂(gα1 , . . . , gαm−1 )e
α
P
def
r
where α = i=1 (vi − v̊i )ĝαi . Because Ψ̂ is λ-controlled,
C4λ

n

1X
Ψ̂(gα1 , . . . , gαm−1 )
n α=1
a.s.

converges almost surely to a deterministic limit. At the same time, since vi −−→ v̊i , we also have
a.s.
α −−→ 0 as n → ∞, so that
"
#
"
#
n
r
r
X
X
1X
a.s.
1
m−1
i
1
m−1
i
E ψ(gα , . . . , gα ,
vi ĝα + σz) − E ψ(gα , . . . , gα ,
v̊i ĝα + σz) −−→ 0.
z
n α=1 z
i=1
i=1
A similar argument shows that we can replace σ with σ̊:
"
#
"
#
n
r
r
X
X
1X
a.s.
1
m−1
i
1
m−1
i
E ψ(gα , . . . , gα ,
v̊i ĝα + σz) − E ψ(gα , . . . , gα ,
v̊i ĝα + σ̊z) −−→ 0.
z
n α=1 z
i=1
i=1
a.s.

By triangular inequality, these limits show that B −−→ 0 as desired.
69

I

Proof of N ETSOR+ Master Theorem

In this section we describe how to augment the proof of Theorem E.3 given in Appendix H to yield the
proof of Theorem C.4. The key points to note here are 1) the presence of LinComb rules in N ETSOR+
but not in N ETSOR− , 2) the rank stability assumption Assumption C.3 used in Theorem C.4, and 3)
an additional term in Eq. (62) due to fluctuations in the parameter Θ.
I.1 LinComb
As remarked in Remark E.2, any usage of LinComb in a N ETSOR+ program can be absorbed into
downstream nonlinearities or be expressed as Nonlin+ rule. So WLOG, we can assume that the
N ETSOR+ program has no applications of LinComb.
I.2

Rank Stability

By Remark C.6, we see that rank stability assumption is necessary for the N ETSOR+ Master Theorem.
Whereas in Appendix H, we had to intricately weave together an induction on rank stability (more
generally, CoreSet) and an induction on moment convergence (Moments), here to show Theorem C.4,
we just need 1) to induct on Moments and 2) to invoke Assumption C.3 whenever we need to use
Lemma H.4, which is when we need to show that pseudo-inverse commutes with almost surely limit,
such as in Proposition H.1, and when we need to ensure either σ is almost surely 0 or is almost surely
positive, as in Appendix H.5.3.
I.3

Fluctuation of the Parameters

When we have parameters in nonlinearities, Eq. (62) needs to be modified to contain an additional
term D:
n

1X
ψ(gα1 , . . . , gαm ; Θ) −
E
ψ(Z; Θ̊) ≤ D + A + B + C
n α=1
Z∼N (µ,Σ)
where
n

def

D=

1X
ψ(gα1 , . . . , gαm ; Θ) − ψ(gα1 , . . . , gαm ; Θ̊)
n α=1

and A, B, C are as in Eq. (62) but replacing ψ(−) there with ψ(−; Θ̊). Because ψ(−; −) is parametera.s.
controlled at Θ̊ by assumption, ψ(−; Θ̊) is controlled, and A, B, C −−→ 0 with the same arguments
as before (except using rank stability assumption Assumption C.3 where appropriate, instead of
CoreSet).
Now, by the other property of parameter-control, we have
n

D≤

1X
ψ(gα1 , . . . , gαm ; Θ) − ψ(gα1 , . . . , gαm ; Θ̊)
n α=1
n

≤

1X
f (Θ)ψ̄(gα1 , . . . , gαm )
n α=1
n

= f (Θ)

1X
ψ̄(gα1 , . . . , gαm )
n α=1

for some controlled ψ̄ : Rm → R and some f : Rl → R≥0 ∪ {∞} that is continuous at Θ̊ and
a.s.
a.s.
has f (Θ̊) = 0 (where ψ̄ and
depend on Θ̊). Since Θ −−→ Θ̊, we have f (Θ) −−→ 0. In
Pn f can both
1
1
m
addition, by Moments, n α=1 ψ̄(gα , . . . , gα ) converges a.s. as well to a finite constant. Therefore,
a.s.

D −−→ 0
as desired.
70

program ::= stmt*
stmt ::= Input var :: type
| var := expr :: type
expr ::= MatMul (var, var )
| fun( var* )
var ::= h id i
fun ::= h function Rk → R for some k ≥ 0 i
type ::= G(nat) | H(nat) | A(nat, nat)
nat ::= h any integer ≥ 1 i
Figure 4: N ETSOR− Grammar; see Definition E.1.
expr : type

var := expr :: type
var : type

a : A(n1 , n2 )
h : H(n2 )
MatMul(a, h) : G(n1 )

g1 , . . . , gk : G(n)
f : Rk → R
f(g1 , . . . , gk ) : H(n)

Figure 5: N ETSOR− Inference Rules
I.4

Summary

The proof of Theorem C.4, WLOG for programs without LinComb, would proceed as follows:
We induct on Moments with the same setup as Appendix H.2, except using Assumption C.3 for
Proposition H.1. Then we prove the inductive step for Moments as in Appendix H.5. We modify
Eq. (62) to add a term D as in Appendix I.3, which goes to 0 a.s. as argued there. The same arguments
a.s.
a.s.
for A, B, C −−→ 0, exhibited in Appendix H.5 still hold, except that in the proof of B −−→ 0, we
apply Assumption C.3 (instead of Lemma H.4) to allow us to assume σ̊ > 0 and σ > 0 almost surely.

J

Formal Specification of Tensor Programs

In the main text, we have adopted an informal approach to specifying the N ETSOR language and
its siblings, in order to make the material accessible to a wide audience. Here we give the formal
specifications for N ETSOR− (Figs. 4 to 6), N ETSOR (Figs. 7 to 9), and self-parametrized N ETSOR+
(Figs. 10 to 12). For ease of presentation, we have represented matrix multiplication explicitly via
an operation MatMul (likewise for Moment in self-parametrized N ETSOR+ ), and have we used
double colon :: instead of single colon : for type annotation.

JaK = W ∈ Rn1 ×n2
JhK = v ∈ Rn2
JMatMul(a, h)K = W v

∀i ∈ [k], Jgi K = vi ∈ Rn
JfK = f : Rk → R
n
Jf(g1 , . . . , gk )K = u ∈ R with uα = f (v1α , . . . , vkα )

Figure 6: N ETSOR− Semantics
71

program ::= stmt*
stmt ::= Input var :: type
| var := expr :: type
expr ::= MatMul (var, var )
| fun( var* )
| var (+ var)+
var ::= h id i
fun ::= h function Rk → R for some k ≥ 0 i
type ::= G(nat) | H(nat) | A(nat, nat)
nat ::= h any integer ≥ 1 i
Figure 7: N ETSOR Grammar; see Definition 4.1. Compared to N ETSOR− grammar, the only new
item is LinComb in expr.

expr : type

a : A(n1 , n2 )
h : H(n2 )
MatMul(a, h) : G(n1 )

var := expr :: type
var : type

g1 , . . . , gk : G(n)
f : Rk → R
f(g1 , . . . , gk ) : H(n)

g1 , . . . , gk : G(n)
g1 + · · · + gk : G(n)

Figure 8: N ETSOR Inference Rules

JaK = W ∈ Rn1 ×n2
JhK = v ∈ Rn2
JMatMul(a, h)K = W v

∀i ∈ [k], Jgi K = vi ∈ Rn
JfK = f : Rk → R
n
Jf(g1 , . . . , gk )K = u ∈ R with uα = f (v1α , . . . , vkα )

∀i ∈ [k], Jgi K = vi ∈ Rn
Jg1 + · · · + gk K = v1 + · · · + vk ∈ Rn
Figure 9: N ETSOR Semantics

72

program ::= stmt*
stmt ::= Input var :: type
| var := expr :: type
expr ::= MatMul (var, var )
| fun( var* ; var*)
| var (+ var)+
| Moment(fun; var*; var*)
var ::= h id i
fun ::= h parametrized function Rk × Rl → R for some k, l ≥ 0 i
type ::= C | G(nat) | H(nat) | A(nat, nat)
nat ::= h any integer ≥ 1 i
Figure 10: Self-Parametrized N ETSOR+ Grammar; see Definition C.8. Compared to N ETSOR
grammar, we have added a new type C and a new expression Moment.

expr : type

var := expr :: type
var : type

a : A(n1 , n2 )
h : H(n2 )
MatMul(a, h) : G(n1 )

g1 , . . . , gk : G(n)
g1 + · · · + gk : G(n)

g1 , . . . , gk : G(n)
c1 , . . . , cl : C
f : Rk × R l → R
f(g1 , . . . , gk ; c1 , . . . , cl ) : H(n)
g1 , . . . , gk : G(n)
c1 , . . . , cl : C
f : Rk × R l → R
Moment(f; g1 , . . . , gk ; c1 , . . . , cl ) : C
Figure 11: Self-Parametrized N ETSOR+ Inference Rules

JaK = W ∈ Rn1 ×n2
JhK = v ∈ Rn2
JMatMul(a, h)K = W v

∀i ∈ [k], Jgi K = vi ∈ Rn
Jg1 + · · · + gk K = v1 + · · · + vk ∈ Rn

∀i ∈ [k], Jgi K = vi ∈ Rn
∀j ∈ [l], Jcj K = cj ∈ R
JfK = f : Rk × Rl → R
n
Jf(g1 , . . . , gk ; c1 , . . . , cl )K = u ∈ R with uα = f (v1α , . . . , vkα ; c1 , . . . , cl )
∀i ∈ [k], Jgi K = vi ∈ Rn

∀j ∈ [l], Jcj K = cj ∈ R
JfK = f : Rk × Rl → R
n
1X
JMoment(f; g1 , . . . , gk ; c1 , . . . , cl )K =
f (v1α , . . . , vkα ; c1 , . . . , cl )
n α=1
Figure 12: Self-Parametrized N ETSOR+ Semantics

73


```

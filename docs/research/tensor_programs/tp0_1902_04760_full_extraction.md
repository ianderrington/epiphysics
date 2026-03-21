---
title: "Scaling Limits of Wide Neural Networks (arXiv:1902.04760) — Full Text Extraction"
description: >-
  Raw full-text extraction of TP0 in the Tensor Programs series for reproducible computational analysis.
date: 2026-03-21T00:00:00.000Z
draft: true
author:
  name: "epiphysics-open-source"
contentType: article
series: "Tensor Programs Sources"
coverImage:
  url: ./images/tp0_1902.04760.png
  alt: "Mathematical derivations from Tensor Programs series paper TP0"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
feedback:
  enabled: true
---

> [!note]
> Source PDF: `docs/research/tensor_programs/sources/TP0_1902.04760.pdf`
>
> Extracted text: `docs/research/tensor_programs/sources/TP0_1902.04760.txt`
>
> DOI: https://doi.org/10.48550/arXiv.1902.04760

## Full extracted text

```text
Scaling Limits of Wide Neural Networks with Weight Sharing:
Gaussian Process Behavior, Gradient Independence, and Neural Tangent
Kernel Derivation

arXiv:1902.04760v3 [cs.NE] 4 Apr 2020

Greg Yang 1

Abstract
Several recent trends in machine learning theory and practice, from the design of state-of-the-art Gaussian Process
to the convergence analysis of deep neural nets (DNNs) under stochastic gradient descent (SGD), have found
it fruitful to study wide random neural networks. Central to these approaches are certain scaling limits of such
networks. We unify these results by introducing a notion of a straightline tensor program that can express most
neural network computations, and we characterize its scaling limit when its tensors are large and randomized. From
our framework follows 1. the convergence of random neural networks to Gaussian processes for architectures such
as recurrent neural networks, convolutional neural networks, residual networks, attention, and any combination
thereof, with or without batch normalization; 2. conditions under which the gradient independence assumption –
that weights in backpropagation can be assumed to be independent from weights in the forward pass – leads to
correct computation of gradient dynamics, and corrections when it does not; 3. the convergence of the Neural
Tangent Kernel, a recently proposed kernel used to predict training dynamics of neural networks under gradient
descent, at initialization for all architectures in (1) without batch normalization. Mathematically, our framework is
general enough to rederive classical random matrix results such as the semicircle and the Marchenko-Pastur laws,
as well as recent results in neural network Jacobian singular values. We hope our work opens a way toward design
of even stronger Gaussian Processes, initialization schemes to avoid gradient explosion/vanishing, and deeper
understanding of SGD dynamics in modern architectures.

1. Introduction
Several recent trends in machine learning theory and practice have found it fruitful to study wide random neural networks,
such as neural network inspired Gaussian Processes, signal propagation in DNNs, small learning rate SGD dynamics, and
even, in some sense, the celebrated Approximate Message Passing algorithm for compressed sensing. We review these
subjects and more in Section 2. All of these works involve some theory that derives, rigorously or semirigorously, some
scaling limit of a neural network as its width goes to infinity. In this paper, we give a unifying treatment to such scaling
limits: • We define a notion of tensor programs which can express most neural network computations, and a natural notion
of tensor program scaling that corresponds to increasing width with Glorot initialization (Glorot & Bengio, 2010). Our main
theorems characterize the scaling limits in the two most common scenarios that roughly correspond to DNN inference and
backpropagation, as well as in the general tensor program case. They are proved via a Gaussian conditioning technique first
used in Bolthausen (2012) for analyzing the TAP equations in spin glass theory. • We obtain corollaries that fully justify
semirigorous derivations in prior works and strengthen previous results in the different strands of research mentioned above.
In the next section we highlight the most important corollaries and discuss other briefly, leaving their details to the appendix.
By standard architecture we mean any DNN architecture that is some composition of multilayer perceptrons (MLP)s,
recurrent neural networks (RNNs) (e.g., Long-Short Term Memory (LSTM) (Hochreiter & Schmidhuber, 1997) or Gated
Recurrent Unit (GRU) (Cho et al., 2014)), skip connections (He et al., 2016; Huang et al., 2016), (self-)attention (Bahdanau
et al., 2014; Vaswani et al., 2017), convolution (LeCun et al., 1998; 1999), and/or batch normalization (batchnorm) (Ioffe &
Szegedy, 2015). We use readout layer to mean any linear layer converting some hidden states to an output vector. While
1

Microsoft Research AI. Correspondence to: hgregyang@microsoft.comi.

1

most of our corollaries are stated for standard architectures, they are typically more general, but we just highlight the most
relevant cases for a deep learning audience.

2. Related Works and Our Corollaries
We formulate informal versions of our main corollaries and comment on other results inline, marked by a star F.
2.1. Gaussian Behavior of Wide Neural Networks
In 1995, Neal first discovered the Gaussian Process behavior of wide neural networks. He showed that under certain
conditions, a single-layer neural network with random parameters can converge in distribution to a Gaussian process as
its width goes to infinity. Later works extended the conditions under which this scaling limit takes place (Williams, 1997;
Le Roux & Bengio, 2007; Hazan & Jaakkola, 2015). Recently, Lee et al. (2018); Matthews et al. (2018) empirically
and/or theoretically investigated analogous correspondences for infinite width, finite depth deep MLPs, and likewise Novak
et al. (2018), for deep convolution networks. Daniely et al. (2016) also proved similar results in the framework of kernel
methods, where they introduced a notion of “computational skeleton,” similar to tensor programs introduced here, that
covers feedforward computation with no weight-sharing (so that, for example, it can express locally connected networks but
not convolutional networks)1 .
Many previous works have exploited this DNN-GP correspondence implicitly or explicitly to build new models (Cho & Saul,
2009; Lawrence & Moore, 2007; Damianou & Lawrence, 2013; Wilson et al., 2016b;a; Bradshaw et al., 2017; van der Wilk
et al., 2017; Kumar et al., 2018; Blomqvist et al., 2018; Borovykh, 2018). In particular, Lee et al. (2018); Garriga-Alonso
et al. (2018); Novak et al. (2018) directly converted DNN to GP using this correspondence. Lee et al. (2018) constructed the
state-of-the-art (SOTA) permutation-invariant GP on MNIST, and Novak et al. (2018) achieved SOTA on CIFAR10 for any
GP with untrainable kernel.
In this paper, we generalize the DNN-GP correspondence to standard architectures and very general nonlinearities.
Corollary 2.1 (DNN-GP correspondence, informal). Let f be a network of fixed standard architecture, with linear readout
layer, and with nonlinearities bounded uniformly by exp(O(x2− )) for some  > 0. Fix a finite input set X of the right
signature (e.g. set of batches for batchnorm network; set of sequences for RNN). Sampling f ’s parameters from iid Gaussians
induces a distribution of functions on X . If the readout layer weights are sampled independently from hidden parameters,
then this distribution weakly converges to a Gaussian process as the network widths go to infinity (with fixed input and
output dimensions). See Appendices D.1 and D.4.
In contrast, Matthews et al. (2018) requires φ to be linearly bounded in norm; Daniely et al. (2016) requires φ be twicedifferentiable with |φ|, |φ0 |, |φ00 | all bounded, or that φ = ReLU; and a sufficient condition given in Novak et al. (2018) is
that φ0 exists and is bounded by exp(O(x2− )), though it is unclear how the more general set of 3 conditions given there
compares with ours.
We hope this corollary opens the door to the design of more powerful GPs, in the way of Lee et al. (2018); Novak et al.
(2018) by converting state-of-the-art DNNs. 2
2.2. Signal Propagation in Neural Networks
Glorot & Bengio (2010); He et al. (2015) derived the popular Glorot and He initializations from consideration of hidden
state norms in a DNN with random weights. A recent line of work generalizes their studies significantly by examining
the evolution with depth of covariance between f (xi ), f (xj ) and between ∇x f (xi ), ∇x f (xj ) for distinct inputs xi and xj ,
when the DNN f is wide and parameters of f are randomized. This evolution is referred to as (forward and backward)
signal propagation in the literature (Poole et al., 2016; Schoenholz et al., 2017; Yang & Schoenholz, 2017; 2018; Hanin &
Rolnick, 2018; Chen et al., 2018; Yang et al., 2018; Pennington et al., 2017). It has been used to optimize initialization
hyperparameters to prevent gradient explosion/vanishing, even to allow training of a 10,000 layer CNN without batchnorm
or skip connections (Xiao et al., 2018).
1

even though they claim that dealing with weight-tying is straightforward. It’s unclear what they had in mind, however, as there is a
significant difference in the scaling behavior of sharing matrix transposes vs sharing no matrix transposes (see Thm 5.1 and Thm 6.3)
2
For a gentler introduction to these GP results and several extensions, we recommend the reader to look at Yang (2019).

2

Suppose {xi }i is a set of inputs. Let f l be an l-layer MLP with activation φ and uniform width n. If Σlij =
1
1
l
`
2
`
l i
l j
l i
l j
n Ehf (x ), f (x )i and Πij = n Eh∇x f (x ), ∇x f (x )i, with expectation taken over Wij ∼ N (0, σw /n), bi ∼
N (0, σb2 ) for each layer `, then the signal propagation literature posits that, in the n → ∞ limit, the dynamics of Σl
and Πl are summarized by
2
Σ l = σw
E[φ(z)φ(z)> : z ∼ N (0, Σl−1 )] + σb2

Π

l

2
= σw
E[φ0 (z)φ0 (z)> : z ∼ N (0, Σl )]

Π

l−1

(1)
.

(2)

Note that Σl essentially is the kernel of the corresponding GP, and Eq. (1) is the same one used in the DNN-GP correspondence. Pennington et al. (2017) more generally computed the singular value distribution of the input-output Jacobian matrix
of an MLP and characterized conditions under which this distribution concentrates around 1. To make this computation and
to derive Eq. (2), they and others (Schoenholz et al., 2017; Yang & Schoenholz, 2017; 2018; Chen et al., 2018; Xiao et al.,
2018; Pennington et al., 2017) relied on
Assumption 2.2 (Gradient Independence Assumption). In backpropagation, whenever we multiply by W > for some weight
matrix W , we multiply by an iid copy instead.
that was first discovered by Schoenholz et al. (2017) to make good predictions and later formulated explicitly by Yang &
Schoenholz (2017). In this paper we show
Corollary 2.3 (Assm 2.2 is conditionally correct, informal). In a MLP having nonlinearities with polynomially bounded
weak derivatives, Assm 2.2 leads to the correct equation Eq. (2) and the correct singular value distribution computation
from Pennington et al. (2017), as long as the readout layer is sampled independently from other parameters and has mean 0.
In general, Assm 2.2 does not induce correct computations – for example when the last layer is global mean pooling – and
we rigorously give the correct equations, and more generally a way to compute the singular value distribution of the neural
network Jacobian, both generalized to all standard architectures without batchnorm. See Appendices D.1 and D.5.
As an example, we computed the scaling limit for the gradient norms of an LSTM and compared it against empirical
simulation (Fig. 1). The theoretical prediction is very precise already for 1000 neurons, which is typical for applications of
LSTM.
Note that this literature also studies the limit of iterating Eqs. (1) and (2) (large depth limit), but our results only apply to a
fixed number of iterations, and so do not rigorously justify such limits.
Chen et al. (2018) estimates the signal propagation in tied-weights RNNs with the equations for that in untied-weights
RNNs. They find this a fantastic approximation for simple RNNs but not quite so for gated RNNs. F As a corollary of
Thm 4.3 we show that, indeed, the tied- and untied-weights theories agree for simple RNNs, but not for general (say, gated)
RNNs. We give the simplest counterexample of weight-tied residual network. See Appendix D.6.
Recently, Li & Nguyen (2018) investigated (forward only) signal propagation in weight-tied autoencoders. F A version of
their main theorem allowing for arbitrary polynomially bounded activations, without restriction on smoothness, also follows
as corollary of Thm 6.3. See Appendix D.6.
We hope Cor 2.3 will allow future works to optimize initialization hyperparameters and prevent gradient explosion/vanishing
problems for modern architectures in the way of Schoenholz et al. (2017); Yang & Schoenholz (2017; 2018); Chen et al.
(2018); Xiao et al. (2018); Yang et al. (2018).
2.3. Neural Tangent Kernel
For any parametrized function f (x; θ), the Neural Tangent Kernel can be in general defined as Kθ (x, x0 ) =
h∇θ f (x; θ), ∇θ f (x0 ; θ)i (Jacot et al., 2018). In the case when f (x; θ) is a feedforward neural network, with parameters appropriately scaled (see Appendix D.1), there is a scaling limit of Kθ → K∞ when θ is randomized and f ’s widths
grow to infinity (Jacot et al., 2018). This convergence allows one to predict the evolutionPof f (x; θ) due to gradient
descent on θ. For example, if we apply gradient flow on a training set X and loss function |X1 | (x,y)∈X 12 (f (x) − y)2 , for
codomain(f ) = R, Jacot et al. (2018) derived
∂ft
1
=−
Kθ (X , X )(ft − f ∗ )
∂t
|X | t
3

100
10 1
gradnorm

10 2

LSTM gradient norms
empirical1
theoretical1
empirical2
theoretical2

10 3
10 4
10 5
10 6
80.0

82.5

85.0

87.5

90.0
time

92.5

95.0

97.5

100.0

Figure 1: For two different random initializations of the LSTM with 1000 neurons along with a readout layer (at each
time step), we run 100 steps forward on inputs of zero vectors and 20 steps of backpropagation-through-time. We collect
the gradient norms k∂y 100 /∂ht k, t = 80, . . . , 100, where y is the readout and h is the hidden state, and plot its mean and
standard deviations (empirical1 and empirical2). Then we compute the large width limit of these gradient norms according
to Thm 5.1 and overlaid them on top (theoretical1 and theoretical2). The agreement is so precise that the theoretical curves
completely obscure the means of the empirical data.

where f ∗ is the “ground truth“ function that sends x 7→ y for every (x, y) ∈ X , and f and f ∗ are thought of dimension
|X | vectors. Jacot et al. (2018) proved that under suitable conditions, with training time T fixed and width → ∞,
Kθt (X , X ) → K∞ (X , X ) for all 0 ≤ t ≤ T . This means that, in the large width regime, f (in the function space) evolves
approximately according to a linear differential equation under gradient flow. In this paper we show
Corollary 2.4 (NTK convergence, informal). Fix a finite input set X . Let f be a network of fixed standard architecture,
with linear readout layer, and having nonlinearities with polynomially bounded weak derivatives (so in particular cannot
have batchnorm). Then over X , Kθ → K∞ almost surely as the widths of f go to infinity and θ suitably randomized, for
some K∞ . See Appendices D.1 and D.7.
While Jacot et al. (2018) is groundbreaking in producing an equation to predict the behavior of gradient descent in the small
learning rate, large width regime, its proof of the convergence Kθ → K∞ relies on taking the widths to infinity one by
one starting from the first layer3 . This is an unrealistic limit, as in practice, the widths are typically of the same order of
magnitude4 . In comparison, Cor 2.4 proves that the limit exists as the widths tend to infinity together, and it generalizes to
arbitrary standard architectures. F We give an example computation of the NTK for a CNN in Appendix D.7; this is a new
result that has not appeared in prior literature.
Amari et al. (2018); Karakida et al. (2018) recently used Assm 2.2 to study the empirical Fisher information matrix (FIM),
over finitely many datapoints drawn from isotropic Gaussian, of random neural networks, specifically its spectral properties.
If we let Jf be the |X | × |θ| matrix whose rows are {∇x f (x; θ)}x∈X , then (empirical) FIM ∝ Jf Jf > while NTK is
Jf > Jf 5 . Thus the spectral properties of empirical FIM and NTK are identical up to scaling. F By Cor 2.4, we can then
justify the computations of Amari et al. (2018); Karakida et al. (2018) rigorously.
2.4. Other Works
Very recently, Du et al. (2018b;a); Allen-Zhu et al. (2018b;c); Zou et al. (2018) formally proved that GD or SGD can reduce
an overparametrized DNN’s training error to 0 by showing that random initialization imbues the network with certain good
3
An earlier version of this paper claimed that it assumes gradient independence; this is incorrect, as the sequential limit obviates the
need for it
4
Indeed, when the last layer is global mean pooling rather than random Gaussians, the sequential limit obtains a different answer than
simultaneous limit
5
Karakida et al. (2018) called NTK the dual matrix

4

properties6 and, with small learning rate, the network never moves too far from its initialization7 . Allen-Zhu et al. (2018a);
Cao & Gu (2019) also show generalization bounds under various data assumptions using a similar reasoning.
There is a long line of work investigating random classic spiking or hopfield networks, for example Landau & Sompolinsky
(2018); Crisanti & Sompolinsky (2018); Kadmon & Sompolinsky (2015); Stern et al. (2014); Rajan et al. (2010); Sompolinsky
et al. (1988); Amit et al. (1985). In the reinforcement learning literature, Osband et al. (2018); Burda et al. (2018a;b) used
random DNNs for exploration. Other than the works discussed above, Li & Saad (2018); Giryes et al. (2016); Gabri et al.
(2018); Reeves (2017); Fletcher & Rangan (2017) also considered neural networks with random weights.
F Our technique is general enough to rederive the semicircle law for the Gaussian Orthogonal Ensemble and the MarchenkoPastur Law for Wishart matrices (Tao, 2012). See Appendices D.2 and D.3.
Approximate Message Passing is an algorithm for recovering a ground truth vector from noisy measurements (Compressed
Sensing) (Donoho et al., 2009). In one view, the algorithm repeatedly applies a certain neural network to the noisy
measurement, and it succeeds if the result eventually converges to the ground truth vector. Previous works have shown that
when the measurement matrix is randomized and the dimension goes to infinity, this algorithm satisfies a set of equations
called State Evolution that can be used to reason about its behavior (Bayati & Montanari, 2011; Berthier et al., 2017). Their
proofs are based on the same Gaussian conditioning technique used here. F In Appendix D.8, we detail the algorithm and
State Evolution, and prove the validity of State Evolution equations for arbitrary polynomially bounded nonlinearities and
test functions, removing the smoothness assumption of Bayati & Montanari (2011) (in exchange for a stronger moment
condition on the measurements).
This concludes the discussion of related works and our corollaries. We now present the tensor program framework and our
main theorems.

3. Tensor Programs
Consider programs of the following form, which we call tensor programs. Each line contains an assignment and a dimension
annotation and can have the following types.
VecIn (G) a vector input x
l

l : gl := x ∈ Rn
MatIn (A) a matrix input A
l

l

l : Al := A ∈ Rn1 ×n2
T (A) transpose of an A-var
l

l

j

j

l : Al := (Aj )> ∈ Rn1 ×n2 = Rn2 ×n1
MatMul (G) if Ak and gj have nk2 = nj , then an assignment via a linear mapping
l

k

l

k

l : gl := Ak gj ∈ Rn = Rn1
or similarly for H-vars
l : gl := Ak hj ∈ Rn = Rn1
where j, k < l

LinComb (G) if nj1 = · · · = njk , then an assignment via linear combination of G-vars that appeared in previous lines:
with alji ∈ R,
l

j1

l : gl := alj1 gj1 + · · · + aljk gjk ∈ Rn = Rn .
Nonlin (H) if nj1 = · · · = njk , then an assignment via some general (possibly nonlinear) function fl : Rk → R, acting
coordinatewise,
l
j1
l : hl := fl (gj1 , . . . , gjk ) ∈ Rn = Rn .
6
7

using tools similar to ones in the signal propagation literature
using reasoning similar to Jacot et al. (2018)

5

Here (G) marks those variables that we call G-vars, and similarly we have A-vars and H-vars. Vars introduced by VecIn
and MatIn are also called (vector and matrix) input vars. The initial “l :” marks the line number, and each new variable
formed from this line is labeled with a superscript l. A partial program with nl and input G- and A-vars unspecified is called
a (program) skeleton, typically denoted by Greek letters like π. This skeleton can be thought of as a generalization of the
skeleton in Daniely et al. (2016) in the language of a straightline program that allows weight sharing (transposed or not) and
simple type checking.
3.1. Examples
Such tensor programs can express the computation in most neural network scenarios. In Appendix B, we give example
programs for computations in (1) MLP, forward and backward passes (B.1); (2) batch of input (B.2); (3) residual networks
(B.3); (4) simple RNN (B.4); (5) batchnorm (B.5); (6) CNNs (B.6). It’s also clear from these examples that any combination
of such computation can be expressed faithfully in a tensor program. On the other hand, tensor programs don’t capture all
neural network computations, and one example is layer normalization (Ba et al., 2016), but see Section 8 for how to still
compute its scaling limit in this framework.
3.2. Setup
Lines of type T, MatMul, LinComb, and Nonlin induce equality constraints on the dimensions nl . Given a skeleton π and a
possible set of additional dimensional constraints Λ ⊆ {“nl = nm ”}gl ,gm , consider the smallest equivalence relation ∼
on G-vars such that gl ∼ gm if “nl = nm ” ∈ Λ or if they are constrained to have equal dimension by some line of type T,
MatMul, LinComb, or Nonlin. We call each class a common dimension class (CDC) of (π, Λ) and write c(gl ) for the class
of a G-var gl . The collection of all common dimension classes is written as C(π,Λ) , or just C when π and Λ are understood
from context. An algorithm to compute CDCs is presented in Appendix A.
In this work, for every skeleton π (equipped with Λ), we study the behavior of vars in its realizations when the input vars are
appropriately randomized and as the dimensions nl → ∞. More precisely, we consider a sequence (in t ∈ N) of dimensions
lt
lt
lt
{nlt }gl orhl ∪ {nlt
1 , n2 }Al respecting ∼, along with input G- and A-vars g , A of appropriate dimensions. For each c ∈ C,
let nct = nlt for gl ∈ c. We extend the notations glt and hlt to the non-input G- and H-vars computed from these inputs.
lt 2
lt
lt
8
At time t, we sample independently Alt
ij ∼ N (0, (σ ) /n2 ) for a set {σ }Al . For each c ∈ C, we also sample
cin t
cin t
cin t
independently gi ∼ N (µ , K ) for each i, j. Here cin is the set of input G-vars in c, gci in t = (glt
i )gl ∈cin , and
µcin t : cin → R, K cin t : cin × cin → R are specified mean and covariance at time t.

Thus given (π, Λ), the data {nct }c∈C , {σ lt }Al , {µcin t }c∈C , and {K cin t }c∈C realize a random program
π({nct }c∈C , {σ lt }Al , {µcin t }c∈C , {K cin t }c∈C ). Its vars are random variables and our theorems will concern certain “moments” of them.
0

We assume that, as t → ∞, for all c, c0 ∈ C: (1) nct is increasing with t and nct → ∞. (2) limt→∞ nct /nc t = αc,c0 ∈ (0, ∞)
for some constant αc,c0 depending only on c, c0 . (3) σ lt → σ l∞ for some finite σ l∞ > 0 for each input A-var Al .
(4) µcin t → µcin ∞ and K cin t → K cin ∞ for some finite µcin ∞ , K cin ∞ , and rank K cin t = rank K cin ∞ for all large t.

Discussion Tensor programs are meant to represent the “body” of a neural network where all dimensions are large
compared to input and output dimensions. The CDCs are used to capture the varying widths of practical neural networks;
for example, while widths typically increase and decrease in classical networks, they are held constant in blocks in residual
networks (see Appendix B.3 for an example). For the first read-through, we recommend the reader to assume all dimensions
are the same so that there is a single CDC consisting of all G-vars.
The sampling of A-vars reflects variants of Glorot initialization (Glorot & Bengio, 2010) used in practice. The sampling of
input G-vars models the distribution of the first hidden layer across multiple inputs, sampling of the first layer parameters
(see Appendix B.1 for an example), and/or sampling of bias vectors. Most often, the vector vars should be thought of as
hidden layer quantities whose dimensions go to infinity; neural network inputs (of fixed dimension) are indirectly expressed
as above, and outputs (of fixed dimension) are obtained as some coordinates of a vector var.
8

We could as well assume that there is an infinite 2D array of independent Gaussian variables {Ålij ∼ N (0, 1)}∞
i,j=1 , and at time t,
p
ct
nlt
.
In
that
case,
we
do
not
need
n
to
increase
stricty
with
t
2

lt l
set Alt
ij = σ Åij /

6

Thms 4.3 and 5.1 below say that, under certain conditions, G-vars converge to Gaussians of specific mean and covariances
(hence the name “G-var”). But Thm 6.3 shows that in general this may not be true.
Notation We will often identify functions Z : A → B with vectors in B A (which should be thought of as dictionaries
with keys in A). Given a subset U ⊆ A, Z U is the subvector of Z supported on U , or as a function is the restriction of
def
a.s.
Z on U . For ψ : B U → C, ψ(Z) = ψ(Z U ), i.e. we automatically ignore the values of Z outside U . We use −−→ for
convergence almost surely.

4. Programs with No Transposes
For any c ∈ C, we recursively define


µcin ∞ (gl )
if gl ∈ cin
P
P
c l
l
c
j
µ (g ) =
aji µ (g i ) if gl := i alji gji
i


0
if gl := Ak gj or gl := Ak hj

(3)

and recursively define


K cin ∞ (gl , gm )


P m c l ji



Pi aji K (g , g )
m c ji
m
K c (gl , gm ) =
i aji K (g , g )


k∞ 2
a

(σ ) Ez [f (z)fb (z)]



0

if gl , gm ∈ cin
P
ji
if gm := i am
ji g
P
if gl := i alji gji
if gl := Ak ha , gm := Ak hb
else

(4)

0

0

where ha := fa (gj1 , . . . , gjk ), hb := fb (gj1 , . . . , gjk0 ), and z ∼ N (µc , K c ). We also make branch 4 cover the case when
gl := Ak ga or gm := Ak gb by “typecasting” ga to an H-var and setting fa = id (similarly for gb ). Note that, as discussed in
Notations above, fa will ignore irrelevant components of a, and the expectations only depend on the entries of µc and K c
that correspond to already-defined values, so this describes a valid recursion.
We introduce the following technical assumption.
Assumption 4.1 (Almost Sure Rank Convergence). For any Ak and any collection S ⊆ {G- or H-var h : gl :=
ct
Ak h for some l}, let H t ∈ Rn ×|S| be the matrix whose columns are hmt or gmt for each hm or gm in S. If
1
t> t
H ∈ R|S|×|S| converges almost surely to some C ∗ with t → ∞, then almost surely rank H t = rank C ∗ for
nct H
all large t.
If we don’t have lines of type LinComb, and no fl is a polynomial, then the C ∗ s are all full rank, implying rank convergence
by the upper semicontinuity of rank. LinComb lines may add linear dependencies, but they are constant with t, so that
rank H t = rank C ∗ in the limit and we still have rank convergence.
Definition 4.2. For α > 0, a function φ : Rk → R is said to be α-controlled if for some C, c > 0, |φ(x)| ≤ eC
for all x ∈ Rk .

Pk

α
i=1 |xi | +c

Theorem 4.3. Consider dimension constraints Λ and a skeleton π without T lines, i.e. no transpose allowed. Suppose all fl
are α-controlled for some α < 2. Sample all input vars as in Section 3.2 and assume almost sure rank convergence. Then
for any c ∈ C and any α-controlled function φ : Rc → R, α < 2,
nct

1 X
a.s.
φ(gct
−→ E φ(Z)
i )−
ct
n i=1
lt
c
g
c
c
where gct
i = (gi )gl ∈c and R 3 Z = (Z )g∈c ∼ N (µ , K ).

Discussion Roughly speaking, G-vars created from the same matrix Ak have nonzero correlations, but otherwise are
d
c
c
asymptotically independent modulo LinComb. Intuitively, gct
i “ = ”N (µ , K ) for large t, iid for each i.
7

1 : A1 := A1
..
.
LA : ALA := ALA
LA + 1 : gLA +1 := x1
..
.

L + 1 : AL+1 := (A1 )>
..
.

LA + Lg : gLA +Lg := xLg

L + LA : AL+LA := (ALA )>

LA + Lg + 1 : . . . := . . .
..
.

noninput line types

L : . . . := . . .

last line

L + LA + 1 : gL+LA +1 := v 1
..
.
L + LA + L∇ : gL+LA +L∇ := v L∇
(b) Extended program π̃

(a) Program π

Figure 2

There is an apparent contradiction
in Thm 4.3 if we consider deep linear networks with tied (y = W L x ∈ Rn , W ∈ Rn×n )
QL
(l)
and untied weights (y = l=1 W x, ∀l[W (l) ∈ Rn×n ]). Via simple computations of µc and K c , one sees that, by Thm 4.3,
as the width n → ∞, y is distributed “similarly” in either case (in that α-controlled moments match asymptotically). This
seems to contradict our intuition that W L x should blow up or decay exponentially, with L, along the direction of the
eigenvector of W corresponding to the largest eigenvalue of W ; whereas in the untied case it’s easy to see that each yi
converges in distribution to an i.i.d. Gaussian.
This apparent paradox is resolved by noting that Thm 4.3 only applies for fixed skeletons (so fixed L in this example), as
widths → ∞. By Rider (2003), the maximum eigenvalue of W scales like 1 + O(n−1/2 ) if Wij ∼ N (0, 1/n), and so does
that of W L for fixed L. Furthermore, as n increases, the components of x corresponding to large eigenvalues (≥ 1) of W
decrease in magnitude to 0 in probability, by the circular law (Tao, 2012). So the L at which the exponentiating effect of
W L kicks in increases with n.

5. Backprop with Zero Mean Gradients
Let π be a skeleton with L lines but no T. WLOG, suppose all input vars appear at the start, with matrix inputs first, as
in Fig. 2a. Consider an extension π̃ of π in the following way: The first few appended lines are transposes of A-vars
∇
in π, followed by a series of new vector input vars {v l }L
l=1 , as in Fig. 2b. Lines appended below this can be arbitrary
non-input lines except that (1) lines of type MatMul must use a transposed matrix AL+1 to AL+LA and hl or gl must have
been introduced after π (i.e. l > L), and (2) any hl for l > L + LA + L∇ , as a function of v 1 , . . . , v L∇ , must be odd:
for any fixed values of {gl }l≤L , hl (−v 1 , . . . , −v L∇ , {gl }l≤L ) = −hl (v 1 , . . . , v L∇ , {gl }l≤L ); likewise gl must be odd for
l > L + LA . This in particular means that LinComb lines cannot involve gl for l ≤ L.
If π expresses the forward computation of an NN f without matrix transposes, then π̃ has enough power to express the
backpropagation of f and compute the gradients with respect to hidden states. For example, if f (x) = v > ρ(x), so that
∂f
∂f
> ∂ρ
∂x = v ∂x , then ∂x is an odd function of v and can be expressed as a π̃ as above (see Appendix B.1 for a concrete
example). In general, the multiple {v i } allow for multiple NN outputs.
CDCs are naturally defined for π̃ (see Appendix A) just like before. We extend µc and K c to vars introduced in π̃: For
8

l, m > 0, and k ≤ LA , set µc (gL+l ) = 0 and when l > L or m > L, set K c (gl , gm ) =


K cin ∞ (gl , gm )
if gl , gm are input vars


P
P

ji
m c l ji


if gm := i am
Pi aji K (g , g )
ji g
P
m
m c ji
if gl := i alji gji
i aji K (g , g )


k∞
2
a
b

(σ ) α Ez f (z)f (z) if gl := AL+k ha , gm := AL+k hb



0
else
c1 (Ak )t

where α = αc1 (Ak ),c2 (Ak ) = limt→∞ nc2 (Ak )t , and branch 4 covers the case when gl := AL+k ga or gm := AL+k gb by taking
n
fa or fb to be identity. Note that covariances between vars of π and new vars in π̃ are 0.
cin t L+LA +i
∇
Theorem 5.1. Sample {v it }L
(g
) → 0 for all i ∈ [L∇ ]) and independently from the
i=1 with zero mean (i.e. µ
lt Lg
cin t l l0
0 9
input vars {x }l=1 (i.e. K (g , g ) = 0 if l > L ≥ l ) . Sample all other vars in π̃ according to Section 3.2. Assume all
fl of π̃ are polynomially bounded and π̃ satisfies almost sure rank convergence. Then for any dimension constraints Λ, any
c ∈ C(π̃,Λ) , and any polynomially bounded function φ : Rc → R,
nct

1 X
a.s.
φ(gct
−→ E φ(Z)
i )−
nct i=1
lt
c
c
where gct
i = (gi )gl ∈c and Z ∼ N (µ , K ).

Note that our result here does not apply to batchnorm, whose Jacobian has a singularity on a 1-dimensional affine subspace
(and in particular, at the origin). This theorem allows one to justify the gradient independence assumption rigorously; see
Appendix D.5.

6. General Tensor Programs
Thm 5.1 does not give the correct computation if {v it }i do not have zero mean: Consider a one-hidden-layer MLP with
0
1
0
1
>
quadratic activation, f (x) = 1> φ(W x), φ(−) = 12 (−)2 , x ∈ Rn , W ∈ Rn ×n , 1 ∈ Rn . Then ∂f
∂x = W (1 (W x)) =
∂f
>
1
0
0
W W x. If n = n , and Wij ∼ N (0, 1/n ), then E ∂xi = xi . If we have assumed Thm 5.1 is correct, then we would
Pn0 ∂f a.s.
Pn0
1
0>
−
−
→
E
have (incorrectly) computed E n10 i=1 ∂x
W x)i = 0 where W 0 is an iid copy of W .
0
i=1 (W
n
i
Below, we develop a theory of the scaling limit of general tensor programs, from which follows the correct way of computing
gradients when v it do not have 0 mean.
We first introduce “extended syntax” programs, which are equivalent semantically to programs of original syntax, and then
show that we can “compile” original syntax programs to extended syntax programs with no transposes, with the same
scaling limit in a suitable sense.
Definition 6.1. Extended syntax programs are those that allow all line types of Section 3 and in addition
Comp (H) if nj1 = · · · = njk , then an assignment via some general (possibly nonlinear) function fl : Rk → R
l

j1

l : hl := fl (h1 , . . . , hk ) ∈ Rn = Rn
where h1 , . . . , hk are previous G- or H-vars, and fl acts coordinatewise.

So in essence, extended syntax programs just allow Nonlin lines to take H-vars in addition to G-vars. While in the original
syntax, H-vars must feed into lines of type MatMul, in extended syntax they can also be used to create new H-vars via
coordinatewise action.
One can define CDCs for extended syntax programs just as before (see Appendix A). Each extended syntax program is
equivalent to an original syntax program, by expanding the definition of each H-var to a function of previous G-vars. For
9
In our previous example of f (x) = v > ρ(x), this corresponds to the readout layer v sampled with zero mean and independently from
x and other parameters of ρ.

9

example, if hl := fl (hk , gm ), and hk := fk (gr ), then the expanded definition of hl is fl (fk (gr ), gm ). We call this the
l
l
expanded definition of hl , and write fh for this expanded function, so that hl = fh (gl1 , . . . , glm ) for some l1 , . . . , lm < l;
l
l
for G-vars, we also define fg = id. (In our example above, fh (x, y) = fl (fk (x), y)). So by replacing each line of
type Comp with its expanded definition, we can convert an extended syntax program to an original syntax program with the
same semantics for all vector vars.
Definition 6.2. Let π be an original syntax skeleton with associated sampling data {σ lt }Al , {µcin t , K cin t }c∈C . We define an
extended syntax skeleton π̌, called the detransposition of π, by induction on line number as follows. During this process,
we keep track of an injective mapping ϕ taking vector (resp. matrix) vars of π to vector (resp. matrix) vars of π̌, along
with a specialized mapping ϕg taking a G-var of π produced by MatMul to a G-var of π̌. We use a check ˇ to denote
objects of the detransposition. We also simultaneously set {σ̌ lt }Ǎl , {µcˇin t }c and {K cˇin t }c of the detransposition. They
propagate according to the usual rules, Eqs. (3) and (4), to determine µč and K č . Let l be the current line number of π we
are processing, and let ` denote the 1 + length of the current π̌ (this is where we are adding new lines in π̌).
1. If gl := x is a VecIn line, then add a line of the same type to π̌, ` : ǧ` := x. Set ϕ(gl ) ← ǧ` , µcˇin t (ǧ` ) ← µcin t (gl ),
where č = c(ǧl ) and c = c(gl ). Set K cˇin t (ǧ` , ϕ(gm )) ← K cin t (gl , gm ) for all input G-vars gm with m < l.
2. If Al := A is a MatIn line, then add to π̌ the line ` : Ǎ` := A. Set ϕ(Al ) ← Ǎ` and σ̌ `t ← σ lt for all t ∈ [1, ∞].
`
0
0
m>
3. If Al := Am> is a T line,
q then add to π̌ an input line ` : Ǎ := A for a new input A sampled iid as A . Set

ϕ(Al ) ← Ǎ` and σ̌ `t ←

n1 (Amt ) mt
, ∀t ∈ [1, ∞].
n2 (Amt ) σ

4. If gl := alj1 gj1 + · · · + aljk gjk is an LinComb line in π, we add a line of the same type in π̌:
` : ǧ` := alj1 ϕ(gj1 ) + · · · + aljk ϕ(gjk )
and set ϕ(gl ) ← ǧ` if each of ϕ(gji ) is a G-var in π̌; or we add a line of type Comp
` : ȟ` := alj1 ϕ(gj1 ) + · · · + aljk ϕ(gjk )
and set ϕ(gl ) ← ȟ` if some ϕ(gji ) is an H-var in π̌.
5. If hl := fl (gj1 , . . . , gjk ) is a line of type Nonlin, then we add to π̌ a line of type Comp
` : ȟ` := f̌` (ϕ(gj1 ), . . . , ϕ(gjk ))
where f̌` = fl , and we set ϕ(hl ) ← ȟ` . (If all ϕ(gji ) are G-vars then we also typecast this line to Nonlin)
6. Suppose gl := Ahm is a line of type MatMul in π, where A is some previous A-var. Consider the A-var A0 where
A0 := A> if A is an input A-var, or A := A0> if A is a transposed var. Let g i := A0 hi , i = 1, . . . , s, be all previous
lines of type MatMul involving A0 , where hi can be G- or H-var. Define C ∈ Rs×s , v ∈ Rs by
i

j

i

m

Cij = E fϕ(h ) (Z)fϕ(h ) (Z),
vi = E fϕg (g ) (Z)fϕ(h ) (Z),
where Z ∼ N (µč , K č ) (the expectation will only depend on components of Z corresponding to previous lines).
(At )
Compute a = αC + v ∈ Rs , where α = limt nn12 (A
t ) . Then we add the following to π̌:
` : ǧ` := ϕ(A)ϕ(hm )
s
X
` + 1 : ȟ`+1 := ǧ` +
aj ϕ(hj )

MatMul
Comp

j=1

If ϕ(hj ) are all G-vars, we typecast line ` + 1 to LinComb and write ǧ`+1 instead. Set ϕ(gl ) ← ȟ`+1 and ϕg (gl ) ← ǧ` .
See Appendix B.1.1 for a concrete example of detransposition . Below, for any c ∈ Cπ , let c̄ be c ∪ {h : c(h) = c}, i.e. the
collection of H- or G-vars with the same dimension constraint; see Appendix A.
10

Theorem 6.3. Let π be an original syntax program with sampling instructions, and π̌ be the detransposition of π, with ϕ
the mapping from vector vars of π to vector vars of π̌. Assume all fl of π are polynomially bounded, and that almost sure
rank convergence holds for π̌. Sample input vars of π according to Section 3.2. Then for any dimension constraints Λ, any
c ∈ C(π,Λ) , and any polynomially bounded function φ : Rc̄ → R,
nct

1 X
a.s.
φ(hct
−→ E φ((fϕ(h) (Z))h∈c̄ )
i )−
nct i=1
č
č
where hct
i is the sequence of the ith coordinates of all vector vars in c̄, and Z ∼ N (µ , K ).
m

If all fl in π are differentiable, then we can take a in Item 6 of Defn 6.2 to be ασ 2 (E ∂Z ϕg (gi ) fϕ(h ) (Z))i∈[s] 10 , where
σ = σ r∞ and r is the line number of ϕ(A0 ), and the above almost sure convergence will still hold.
See Appendices D.1 to D.3 for example applications of this theorem to random MLP, and rederivation of the semicircle and
Marchenko-Pastur laws. Thm 6.3 has the following basic intuition. Let g = A> F ((Ahj )kj=1 ) for A ∈ Rn×m , hi ∈ Rm , F :
Rk×n → Rn , ((z j ∈ Rn )kj=1 ) 7→ F ((z j )kj=1 ). Here F should be thought of the stretch of π that separates g from previous
G-vars induced by A. Then, semirigorously, as n, m → ∞ and Aij ∼ N (0, 1/n), for any i ∈ [m],
n
o
j k
\i j k
0
E y i ≈ E A>
:i F ((A h\i )j=1 ) + hF , (A:i hi )j=1 i
where A\i is A without ith column, hj\i is hj without ith coordinate, and F 0 is the Jacobian of F at (A\i hj\i )kj=1 . Now
Pk
j k
j Pn
∂Fm
0
0
>
\i j k
E A>
:i hF , (A:i hi )j=1 i =
j=1 hi
m=1 ∂z j because F is independent of A:i . Likewise, A:i F ((A h\i )j=1 ) is approxm

imately a Gaussian with 0 mean. Then g is roughly a Gaussian plus a linear combination of {hj }kj=1 . So, unlike restricted
programs in Thms 4.3 and 5.1, we do not expect g to be “Gaussian” in the limit, as hj could be the image of an activation
function. We can, however, still keep track of g’s decomposition into a Gaussian and a linear combination part — this is the
key idea behind detransposition, and in particular, its step 6. There, ~a0j are the coefficients of this linear combination, while
~ai records the correlation between g and previous G-vars induced by A> . Each ~a0j can be seen to be exactly the coefficient
computed heuristically here by applying Stein’s lemma (Lem E.8) when r = 0 in step 6.

7. Proof Techniques
While our tensor program framework is new and Bayati & Montanari (2011) is concerned with a much simpler setting
of AMP algorithms, its technique of Gaussian conditioning is useful to us (Lem E.3): If A is a Gaussian matrix, then
conditioned on G = AH, G0 = A> H 0 , the distribution of A is E + ΠÃΠ0 for some mean matrix E, projection matrices
Π, Π0 , and Ã distributed iid as A. If we let G and H be previous G- and H-vars in MatMul lines involving A, and similarly
for G0 , H 0 with respect to A> , this allows us to induct on line number by conditioning on previous lines.
Compared to Bayati & Montanari (2011), our input G-vars have all finite moments, whereas the analogous quantities in
Bayati & Montanari (2011) just have a bounded number of them. This allows us to simplify the induction somewhat, and
remove the smoothness assumption on (the functions playing the same role as) fl that is required in Bayati & Montanari
(2011). The latter is a result of two facts: 1. Gaussian averaging is smooth: E[Φ(z) : z ∼ N (µ, Σ)] is generically smooth
in µ and Σ. 2. if Π ∈ Rn×n is a projection matrix of rank n − O(1), then Πz for an isotropic Gaussian vector z has
approximately independent coordinates, in so far as a law of large number is concerned. This is shown by first bounding
the
P
off-diagonal correlations of Π using linear programming duality (Lem E.19) and then bounding the moments of i φ(Πz)i
using the Hermite expansion of φ and the previous bound on correlations of Πz (Thm E.21). Again, these two tools were not
accessible to Bayati & Montanari (2011) because of their assumptions of only a finite number of input moments. Note that a
more straightforward application of the logic of Bayati & Montanari (2011) would not allow us to reason about nonsmooth
functions such as the step function which appears as the gradient of ReLU.
10
even if not all fl are differentiable, as long as the covariance {K č (ϕg (g i ), ϕg (g j ))}i,j∈[s] is nonsingular, we may take the distributional derivatives and interpret the expectation as the application of this (tempered) distribution to the Gaussian density function. Then the
theorem holds under this interpretation. Even if the covariance is singular, we may consider a subset {ϕg (g i )}i∈I of maximal rank, and
still apply the tempered distribution interpretation; see the proof for more details.

11

8. Discussion
In this paper, we have introduced a notion of a tensor program able to express almost all neural network computations in
modern deep learning, and characterized its scaling limits. As corollaries, we generalized the DNN-GP correspondence,
rigorously derived correct equations for signal propagation in neural networks, and proved the convergence of NTK, among
many other results discussed in Section 2.
While our results assume Gaussian sampling, we expect the results to hold when we sample from other “nice” distributions
(say, with a few finite moments). In the random matrix and statistical physics literature, this universality is very common. In
our case, the central limit intuition for DNN-GP correspondence, for example, would indeed hint at this.
We also believe that the rank convergence assumptions are not necessary, but just side effects of our Gaussian conditioning
technique. One should be able to remove them by considering some stability property of tensor programs.
Our framework, while surprisingly general, as presented doesn’t cover a few deep learning layers, but can be easily extended
to do so in all but one case: • Dropout. Our framework can already cover “Gaussian dropout”; binary dropout can be
incorporated easily as well by introducing Bernoulli random variables in the way of Schoenholz et al. (2017). • Layernorm.
Our framework only allows fl with a fixed signature, as “width” grows, for example batchnorm with a fixed batch size.
However, as we take width to infinity, the signature for layernorm also changes. But our theorems show that the mean and
variance of the layer converges a.s. to a deterministic limit, so that in the forward pass, layernorm is asymptotically the
same as a linear, coordinatewise fl . A brief computation shows that the gradient of layernorm can also be asymptotically
expressed via a tensor program in a similar way. Nevertheless, non-“coordinatewise” fl is worth investigating in the future,
perhaps to take inspiration from the work of Berthier et al. (2017) that studied this scenario in the setting of State Evolution
for AMP. • Batchnorm, when reasoning about gradients. Our framework does not allow singularities in fl , whereas during
backprop batchnorm’s derivative contains a singularity at the origin. Yang et al. (2018) demonstrates that empirically our
equations should still extend to this case. We leave this to future work.
Our scaling limit results only apply to fixed tensor program skeletons. This would be enough to derive the behavior of a DNN
on a dataset which is small compared to the width. But perhaps more reasonable is when the dataset size is commensurate or
perhaps even larger than the width of the network. This would require taking a joint limit in both the skeleton size, over the
data distribution, and over the dimensions {nl }l ; see Pennington & Worah (2017; 2018) for analogous settings for 2 or 3
layer networks and Gaussian data. We leave the investigation of this to future work.
The tensor program framework naturally lends to an automation of computations regarding random neural networks, given
the program underlying it. Our community might find valuable a module in PyTorch or Tensorflow that computes the
corresponding µc and K c automatically given the tape (for PyTorch) or the computation graph (for Tensorflow).
We hope the tools presented in this work will be adopted by any researcher interested in studying random neural networks.

Acknowledgement
Thanks are due to Jascha Sohl-Dickstein, Sam Schoenholz, Jeffrey Pennington, Raphael Berthier, Ilya Razenshteyn,
Pengchuan Zhang, Hadi Salman, and Zeyuan Allen-Zhu for discussions and help on initial drafts

12

References
Allen-Zhu, Z., Li, Y., and Liang, Y. Learning and Generalization in Overparameterized Neural Networks, Going Beyond
Two Layers. arXiv:1811.04918 [cs, math, stat], November 2018a. URL http://arxiv.org/abs/1811.04918.
Allen-Zhu, Z., Li, Y., and Song, Z. A Convergence Theory for Deep Learning via Over-Parameterization. arXiv:1811.03962
[cs, math, stat], November 2018b. URL http://arxiv.org/abs/1811.03962.
Allen-Zhu, Z., Li, Y., and Song, Z. On the Convergence Rate of Training Recurrent Neural Networks. arXiv:1810.12065
[cs, math, stat], October 2018c. URL http://arxiv.org/abs/1810.12065.
Amari, S.-i., Karakida, R., and Oizumi, M. Fisher Information and Natural Gradient Learning of Random Deep Networks.
arXiv:1808.07172 [cond-mat, stat], August 2018. URL http://arxiv.org/abs/1808.07172.
Amit, D. J., Gutfreund, H., and Sompolinsky, H. Spin-glass models of neural networks. Physical Review A, 32(2):1007–1018,
August 1985. doi: 10.1103/PhysRevA.32.1007. URL https://link.aps.org/doi/10.1103/PhysRevA.32.
1007.
Ba, J. L., Kiros, J. R., and Hinton, G. E. Layer Normalization. arXiv:1607.06450 [cs, stat], July 2016. URL http:
//arxiv.org/abs/1607.06450.
Bahdanau, D., Cho, K., and Bengio, Y. Neural Machine Translation by Jointly Learning to Align and Translate.
arXiv:1409.0473 [cs, stat], September 2014. URL http://arxiv.org/abs/1409.0473.
Bayati, M. and Montanari, A. The dynamics of message passing on dense graphs, with applications to compressed
sensing. IEEE Transactions on Information Theory, 57(2):764–785, February 2011. ISSN 0018-9448, 1557-9654. doi:
10.1109/TIT.2010.2094817. URL http://arxiv.org/abs/1001.3448.
Berthier, R., Montanari, A., and Nguyen, P.-M. State Evolution for Approximate Message Passing with Non-Separable
Functions. arXiv:1708.03950 [cs, math], August 2017. URL http://arxiv.org/abs/1708.03950.
Blomqvist, K., Kaski, S., and Heinonen, M. Deep convolutional Gaussian processes. arXiv preprint arXiv:1810.03052,
2018.
Bolthausen, E. An iterative construction of solutions of the TAP equations for the Sherrington-Kirkpatrick model.
arXiv:1201.2891 [cond-mat, physics:math-ph], January 2012. URL http://arxiv.org/abs/1201.2891.
Borovykh, A. A gaussian process perspective on convolutional neural networks. arXiv preprint arXiv:1810.10798, 2018.
Bradshaw, J., Matthews, A. G. d. G., and Ghahramani, Z. Adversarial examples, uncertainty, and transfer testing robustness
in gaussian process hybrid deep networks. arXiv preprint arXiv:1707.02476, 2017.
Burda, Y., Edwards, H., Pathak, D., Storkey, A., Darrell, T., and Efros, A. A. Large-Scale Study of Curiosity-Driven
Learning. arXiv:1808.04355 [cs, stat], August 2018a. URL http://arxiv.org/abs/1808.04355.
Burda, Y., Edwards, H., Storkey, A., and Klimov, O. Exploration by Random Network Distillation. arXiv:1810.12894 [cs,
stat], October 2018b. URL http://arxiv.org/abs/1810.12894.
Cao, Y. and Gu, Q. A Generalization Theory of Gradient Descent for Learning Over-parameterized Deep ReLU Networks.
arXiv:1902.01384 [cs, math, stat], February 2019. URL http://arxiv.org/abs/1902.01384.
Chen, M., Pennington, J., and Schoenholz, S. Dynamical Isometry and a Mean Field Theory of RNNs: Gating Enables
Signal Propagation in Recurrent Neural Networks. In Proceedings of the 35th International Conference on Machine
Learning, volume 80 of Proceedings of Machine Learning Research, pp. 873–882, Stockholmsmssan, Stockholm Sweden,
July 2018. PMLR. URL http://proceedings.mlr.press/v80/chen18i.html.
Cho, K., van Merrienboer, B., Gulcehre, C., Bahdanau, D., Bougares, F., Schwenk, H., and Bengio, Y. Learning Phrase
Representations using RNN Encoder-Decoder for Statistical Machine Translation. arXiv:1406.1078 [cs, stat], June 2014.
URL http://arxiv.org/abs/1406.1078.
13

Cho, Y. and Saul, L. K. Kernel methods for deep learning. In Advances in neural information processing systems, pp. 342–
350, 2009. URL http://papers.nips.cc/paper/3628-kernel-methods-for-deep-learning.
Crisanti, A. and Sompolinsky, H. Path Integral Approach to Random Neural Networks. Physical Review E, 98(6), December
2018. ISSN 2470-0045, 2470-0053. doi: 10.1103/PhysRevE.98.062120. URL http://arxiv.org/abs/1809.
06042.
Damianou, A. and Lawrence, N. Deep gaussian processes. In Artificial Intelligence and Statistics, pp. 207–215, 2013.
Daniely, A., Frostig, R., and Singer, Y. Toward Deeper Understanding of Neural Networks: The Power of Initialization and a Dual View on Expressivity. In Lee, D. D., Sugiyama, M., Luxburg, U. V., Guyon, I., and Garnett, R. (eds.), Advances in Neural Information Processing Systems 29, pp. 2253–2261. Curran Associates, Inc.,
2016. URL http://papers.nips.cc/paper/6427-toward-deeper-understanding-of-neuralnetworks-the-power-of-initialization-and-a-dual-view-on-expressivity.pdf.
Deshpande, Y., Abbe, E., and Montanari, A. Asymptotic mutual information for the balanced binary stochastic block model.
Information and Inference: A Journal of the IMA, 6(2):125–170, June 2017. ISSN 2049-8764. doi: 10.1093/imaiai/iaw017.
URL https://academic.oup.com/imaiai/article/6/2/125/2739335.
Donoho, D. and Montanari, A. High dimensional robust M-estimation: asymptotic variance via approximate message
passing. Probability Theory and Related Fields, 166(3):935–969, December 2016. ISSN 1432-2064. doi: 10.1007/s00440015-0675-z. URL https://doi.org/10.1007/s00440-015-0675-z.
Donoho, D. L., Maleki, A., and Montanari, A. Message Passing Algorithms for Compressed Sensing. Proceedings
of the National Academy of Sciences, 106(45):18914–18919, November 2009. ISSN 0027-8424, 1091-6490. doi:
10.1073/pnas.0909892106. URL http://arxiv.org/abs/0907.3574.
Du, S. S., Lee, J. D., Li, H., Wang, L., and Zhai, X. Gradient Descent Finds Global Minima of Deep Neural Networks.
arXiv:1811.03804 [cs, math, stat], November 2018a. URL http://arxiv.org/abs/1811.03804.
Du, S. S., Zhai, X., Poczos, B., and Singh, A. Gradient Descent Provably Optimizes Over-parameterized Neural Networks.
arXiv:1810.02054 [cs, math, stat], October 2018b. URL http://arxiv.org/abs/1810.02054.
Fletcher, A. K. and Rangan, S. Inference in Deep Networks in High Dimensions. arXiv:1706.06549 [cs, math, stat], June
2017. URL http://arxiv.org/abs/1706.06549.
Gabri, M., Manoel, A., Luneau, C., Barbier, J., Macris, N., Krzakala, F., and Zdeborov, L. Entropy and mutual information
in models of deep neural networks. arXiv:1805.09785 [cond-mat, stat], May 2018. URL http://arxiv.org/abs/
1805.09785.
Garriga-Alonso, A., Aitchison, L., and Rasmussen, C. E. Deep Convolutional Networks as shallow Gaussian Processes.
arXiv:1808.05587 [cs, stat], August 2018. URL http://arxiv.org/abs/1808.05587.
Giryes, R., Sapiro, G., and Bronstein, A. M. Deep Neural Networks with Random Gaussian Weights: A Universal
Classification Strategy? IEEE Transactions on Signal Processing, 64(13):3444–3457, July 2016. ISSN 1053-587X,
1941-0476. doi: 10.1109/TSP.2016.2546221. URL http://arxiv.org/abs/1504.08291.
Glorot, X. and Bengio, Y. Understanding the difficulty of training deep feedforward neural networks. In Teh, Y. W. and
Titterington, M. (eds.), Proceedings of the Thirteenth International Conference on Artificial Intelligence and Statistics,
volume 9 of Proceedings of Machine Learning Research, pp. 249–256, Chia Laguna Resort, Sardinia, Italy, May 2010.
PMLR. URL http://proceedings.mlr.press/v9/glorot10a.html.
Hanin, B. and Rolnick, D. How to Start Training: The Effect of Initialization and Architecture. arXiv:1803.01719 [cs, stat],
March 2018. URL http://arxiv.org/abs/1803.01719.
Hazan, T. and Jaakkola, T. Steps Toward Deep Kernel Methods from Infinite Neural Networks. arXiv:1508.05133 [cs],
August 2015. URL http://arxiv.org/abs/1508.05133.
14

He, K., Zhang, X., Ren, S., and Sun, J. Delving deep into rectifiers: Surpassing human-level performance on
imagenet classification. In Proceedings of the IEEE international conference on computer vision, pp. 1026–
1034, 2015. URL http://www.cv-foundation.org/openaccess/content_iccv_2015/html/He_
Delving_Deep_into_ICCV_2015_paper.html.
He, K., Zhang, X., Ren, S., and Sun, J.
Deep Residual Learning for Image Recognition.
pp. 770–
778, 2016. URL https://www.cv-foundation.org/openaccess/content_cvpr_2016/html/He_
Deep_Residual_Learning_CVPR_2016_paper.html.
Hochreiter, S. and Schmidhuber, J. Long Short-Term Memory. Neural Comput., 9(8):1735–1780, November 1997. ISSN
0899-7667. doi: 10.1162/neco.1997.9.8.1735. URL http://dx.doi.org/10.1162/neco.1997.9.8.1735.
Hu, T.-C. and L. Taylor, R. On the strong law for arrays and for the bootstrap mean and variance. International Journal of
Mathematics and Mathematical Sciences, 20, 1997. doi: 10.1155/S0161171297000483.
Huang, G., Liu, Z., van der Maaten, L., and Weinberger, K. Q. Densely Connected Convolutional Networks.
arXiv:1608.06993 [cs], August 2016. URL http://arxiv.org/abs/1608.06993.
Ioffe, S. and Szegedy, C. Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift.
arXiv:1502.03167 [cs], February 2015. URL http://arxiv.org/abs/1502.03167.
Jacot, A., Gabriel, F., and Hongler, C. Neural Tangent Kernel: Convergence and Generalization in Neural Networks.
arXiv:1806.07572 [cs, math, stat], June 2018. URL http://arxiv.org/abs/1806.07572.
Kabashima, Y., Krzakala, F., Mzard, M., Sakata, A., and Zdeborov, L. Phase Transitions and Sample Complexity in
Bayes-Optimal Matrix Factorization. IEEE Transactions on Information Theory, 62(7):4228–4265, July 2016. ISSN
0018-9448. doi: 10.1109/TIT.2016.2556702.
Kadmon, J. and Sompolinsky, H. Transition to Chaos in Random Neuronal Networks. Physical Review X, 5(4), November
2015. ISSN 2160-3308. doi: 10.1103/PhysRevX.5.041030. URL https://link.aps.org/doi/10.1103/
PhysRevX.5.041030.
Kamilov, U. S., Rangan, S., Fletcher, A. K., and Unser, M. Approximate Message Passing with Consistent Parameter
Estimation and Applications to Sparse Learning. arXiv:1207.3859 [cs, math], July 2012. URL http://arxiv.org/
abs/1207.3859.
Karakida, R., Akaho, S., and Amari, S.-i. Universal Statistics of Fisher Information in Deep Neural Networks: Mean Field
Approach. arXiv:1806.01316 [cond-mat, stat], June 2018. URL http://arxiv.org/abs/1806.01316.
Kumar, V., Singh, V., Srijith, P., and Damianou, A. Deep Gaussian Processes with Convolutional Kernels. arXiv preprint
arXiv:1806.01655, 2018.
Landau, I. D. and Sompolinsky, H. Coherent chaos in a recurrent neural network with structured connectivity. bioRxiv,
October 2018. doi: 10.1101/350801. URL http://biorxiv.org/lookup/doi/10.1101/350801.
Lawrence, N. D. and Moore, A. J. Hierarchical Gaussian process latent variable models. In Proceedings of the 24th
international conference on Machine learning, pp. 481–488. ACM, 2007.
Le Roux, N. and Bengio, Y. Continuous neural networks. In Artificial Intelligence and Statistics, pp. 404–411, 2007.
LeCun, Y., Bottou, L., Bengio, Y., and Haffner, P. Gradient-based learning applied to document recognition. Proceedings of
the IEEE, 86(11):2278–2324, 1998.
LeCun, Y., Haffner, P., Bottou, L., and Bengio, Y. Object recognition with gradient-based learning. In Shape, contour and
grouping in computer vision, pp. 319–345. Springer, 1999.
Lee, J., Bahri, Y., Novak, R., Schoenholz, S., Pennington, J., and Sohl-dickstein, J. Deep Neural Networks as Gaussian
Processes. In International Conference on Learning Representations, 2018. URL https://openreview.net/
forum?id=B1EA-M-0Z.
15

Li, B. and Saad, D. Exploring the Function Space of Deep-Learning Machines. Physical Review Letters, 120(24), June
2018. ISSN 0031-9007, 1079-7114. doi: 10.1103/PhysRevLett.120.248301. URL http://arxiv.org/abs/1708.
01422.
Li, P. and Nguyen, P.-M. On Random Deep Weight-Tied Autoencoders: Exact Asymptotic Analysis, Phase Transitions, and
Implications to Training. September 2018. URL https://openreview.net/forum?id=HJx54i05tX.
Matthews, A. G. d. G., Rowland, M., Hron, J., Turner, R. E., and Ghahramani, Z. Gaussian Process Behaviour in Wide
Deep Neural Networks. arXiv:1804.11271 [cs, stat], April 2018. URL http://arxiv.org/abs/1804.11271.
Neal, R. M. BAYESIAN LEARNING FOR NEURAL NETWORKS. PhD Thesis, University of Toronto, 1995.
Novak, R., Xiao, L., Lee, J., Bahri, Y., Abolafia, D. A., Pennington, J., and Sohl-Dickstein, J. Bayesian Deep Convolutional
Networks with Many Channels are Gaussian Processes. arXiv preprint arXiv:1810.05148, 2018.
O’Donnell, R. Analysis of boolean functions. Cambridge University Press, New York, NY, 2014. ISBN 978-1-107-03832-5.
Osband, I., Aslanides, J., and Cassirer, A. Randomized Prior Functions for Deep Reinforcement Learning. arXiv:1806.03335
[cs, stat], June 2018. URL http://arxiv.org/abs/1806.03335.
Pennington, J. and Worah, P. Nonlinear random matrix theory for deep learning. In Advances in Neural Information
Processing Systems, pp. 2634–2643, 2017.
Pennington, J. and Worah, P. The Spectrum of the Fisher Information Matrix of a Single-Hidden-Layer Neural Network. In
Advances in Neural Information Processing Systems 31, pp. 10, 2018.
Pennington, J., Schoenholz, S., and Ganguli, S. Resurrecting the sigmoid in deep learning through dynamical isometry: theory and practice. In Guyon, I., Luxburg, U. V., Bengio, S., Wallach, H., Fergus, R., Vishwanathan, S.,
and Garnett, R. (eds.), Advances in Neural Information Processing Systems 30, pp. 4788–4798. Curran Associates,
Inc., 2017. URL http://papers.nips.cc/paper/7064-resurrecting-the-sigmoid-in-deeplearning-through-dynamical-isometry-theory-and-practice.pdf.
Poole, B., Lahiri, S., Raghu, M., Sohl-Dickstein, J., and Ganguli, S. Exponential expressivity in deep neural networks
through transient chaos. In Advances In Neural Information Processing Systems, pp. 3360–3368, 2016.
Rajan, K., Abbott, L. F., and Sompolinsky, H. Stimulus-Dependent Suppression of Chaos in Recurrent Neural Networks.
Physical Review E, 82(1), July 2010. ISSN 1539-3755, 1550-2376. doi: 10.1103/PhysRevE.82.011903. URL http:
//arxiv.org/abs/0912.3513.
Reeves, G. Additivity of Information in Multilayer Networks via Additive Gaussian Noise Transforms. arXiv:1710.04580
[cs, math, stat], October 2017. URL http://arxiv.org/abs/1710.04580.
Rider, B. A limit theorem at the edge of a non-Hermitian random matrix ensemble. Journal of Physics A: Mathematical
and General, 36(12):3401, 2003. ISSN 0305-4470. doi: 10.1088/0305-4470/36/12/331. URL http://stacks.iop.
org/0305-4470/36/i=12/a=331.
Schniter, P. and Rangan, S. Compressive Phase Retrieval via Generalized Approximate Message Passing. IEEE Transactions
on Signal Processing, 63(4):1043–1055, February 2015. ISSN 1053-587X. doi: 10.1109/TSP.2014.2386294.
Schoenholz, S. S., Gilmer, J., Ganguli, S., and Sohl-Dickstein, J. Deep Information Propagation. 2017. URL https:
//openreview.net/pdf?id=H1W1UN9gg.
Sompolinsky, H., Crisanti, A., and Sommers, H. J. Chaos in Random Neural Networks. Phys. Rev. Lett., 61(3):259–262,
July 1988. doi: 10.1103/PhysRevLett.61.259. URL https://link.aps.org/doi/10.1103/PhysRevLett.
61.259.
Stern, M., Sompolinsky, H., and Abbott, L. F. Dynamics of Random Neural Networks with Bistable Units. Physical
review. E, Statistical, nonlinear, and soft matter physics, 90(0):062710, December 2014. ISSN 1539-3755. URL
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4348075/.
Tao, T. Topics in random matrix theory. Graduate studies in Mathematics, 132, 2012.
16

van der Wilk, M., Rasmussen, C. E., and Hensman, J. Convolutional Gaussian Processes. In Advances in Neural Information
Processing Systems 30, pp. 2849–2858, 2017.
Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, \., and Polosukhin, I. Attention is All
You Need. In Advances in Neural Information Processing Systems, pp. 5998–6008, 2017.
Williams, C. K. I. Computing with Infinite Networks. In Advances in neural information processing systems, pp. 7, 1997.
Wilson, A. G., Hu, Z., Salakhutdinov, R., and Xing, E. P. Deep kernel learning. In Artificial Intelligence and Statistics, pp.
370–378, 2016a.
Wilson, A. G., Hu, Z., Salakhutdinov, R. R., and Xing, E. P. Stochastic Variational Deep Kernel Learning. In Advances in
Neural Information Processing Systems, pp. 2586–2594, 2016b.
Xiao, L., Bahri, Y., Sohl-Dickstein, J., Schoenholz, S., and Pennington, J. Dynamical Isometry and a Mean Field
Theory of CNNs: How to Train 10,000-Layer Vanilla Convolutional Neural Networks. In Proceedings of the 35th
International Conference on Machine Learning, volume 80 of Proceedings of Machine Learning Research, pp. 5393–
5402, Stockholmsmssan, Stockholm Sweden, July 2018. PMLR. URL http://proceedings.mlr.press/v80/
xiao18a.html.
Yang, G. and Schoenholz, S. S. Mean Field Residual Network: On the Edge of Chaos. In Advances in neural information
processing systems, 2017.
Yang, G. and Schoenholz, S. S. Deep Mean Field Theory: Layerwise Variance and Width Variation as Methods to Control
Gradient Explosion. February 2018. URL https://openreview.net/forum?id=rJGY8GbR-.
Yang, G., Pennington, J., Rao, V., Sohl-Dickstein, J., and Schoenholz, S. S. A Mean Field Theory of Batch Normalization.
September 2018. URL https://openreview.net/forum?id=SyMDXnCcF7.
Yang, G. Tensor Programs I: Wide Feedforward or Recurrent Neural Networks of Any Architecture are Gaussian Processes
In Advances in neural information processing systems, 2019.
Zou, D., Cao, Y., Zhou, D., and Gu, Q. Stochastic Gradient Descent Optimizes Over-parameterized Deep ReLU Networks.
arXiv:1811.08888 [cs, math, stat], November 2018. URL http://arxiv.org/abs/1811.08888.

17

A. Common Dimension Classes
We present an algorithm below to compute each CDC c of (π, Λ). We write c(g) for the CDC associated to the G-var g, and
we as well associate CDC c(h) to each H-var and left- and right- CDCs c1 (A), c2 (A) to each A-var. Here gl and gm should
Λ
be interpreted as elements of the set c and not as vectors. We induct on lines in the skeleton π. First let ∼ be the smallest
Λ
equivalence relation on G-vars such that gl ∼ gm if (nl , nm ) ∈ Λ.
Λ

1. VecIn gl . Set c(gl ) ← {gm : gm ∼ gl }.
2. MatIn Al . Set c1 (Al ) ← {}, c2 (Al ) ← {}.
def

3. T Al = (Ak )> . Set c1 (Al ) ← c2 (Ak ), c2 (Al ) ← c1 (Ak ).
4. MatMul
Λ

(a) If gl := Ak gj : Merge c(gj ) ← c(gj ) ∪ c2 (Ak ) → c2 (Ak ) and c(gl ) ← c1 (Ak ) ∪ {gm : gm ∼ gl } → c1 (Ak ).
Λ

(b) If gl := Ak hj : Merge c(hj ) ← c(hj ) ∪ c2 (Ak ) → c2 (Ak ) and c(gl ) ← c1 (Ak ) ∪ {gm : gm ∼ gl } → c1 (Ak ).
S
Λ
5. LinComb gl := alj1 gj1 + · · · + aljk gjk . Merge c(gji ) ← {gm : gm ∼ gl } ∪ i0 c(gji0 ) → c(gl ) for all i.
l

j1

6. Nonlin hl := fl (gj1 , . . . , gjk ) ∈ Rn = Rn . Merge c(gji ) ←

S

l
ji0
i0 c(g ) → c(h ) for all i.

7. Comp similar to Nonlin.

B. Example Programs
B.1. MLP

1 : g1 := W 1 x
2

1

3

1

network input multiplied by weight matrix

2 : g := b

layer 1 bias
2

3 : g := g + g
4

layer 1 preactivation

3

4 : h := φ(g )
5

5 : A := W

layer 1 activation

2

layer 2 weights

6

2

7

5 4

6 : g := b

layer 2 biases

7 : g := A h

8 : g8 := g7 + g6
9

layer 2 preactivations

8

9 : h := φ(g )

layer 2 activations

Pn0
In line 1 above, we could also spend a few more lines and equivalently set g1 := i=1 xi g−i where g−i := W:i1 . For
brevity, we adopt the current approach, but later for reasoning about backprop, this way of expression W 1 x is useful. Note
that we can also express x as its own deterministic input G-var and W 1 as an input A-var, but the program given here is
more consistent with our scaling limit, which takes the hidden layer width to infinity but keeps the input dimension fixed.
Backprop of fully-connected, feedforward:
10 : g10 := ∇h9 L
0

11 : h

11

8

:= φ (g )

12 : A

12

5 >

:= (A )

13 : g

13

:= A12 h11

14 : h

14

0

3

:= φ (g )

last layer gradient
10

layer 2 preactivation gradient

g

layer 1 activation gradient
13

layer 1 preactivation gradient

g

18

Here ∇h9 L can be any vector but in the context of neural networks, it can be thought as the gradient of some loss function L
obtained through some readout layer.
B.1.1. D ETRANSPOSITION
We demonstrate the detransposition π̌ of the above program π. Line 1 to line 9 are almost copied verbatim to π̌ because the
only matrix multiplications involve new A-vars.

1 : ǧ1 := W 1 x

ϕ(g1 ) = ǧ1

2 : ǧ2 := b1

ϕ(g2 ) = ǧ2

3 : ǧ3 := ǧ1 + ǧ2

ϕ(g3 ) = ǧ3

4 : ȟ4 := φ(ǧ3 )

ϕ(h4 ) = ȟ4

5 : ǧ5 := b2

ϕ(g5 ) = ǧ5

6 : Ǎ6 := W 2

ϕ(A6 ) = Ǎ6

7 : ǧ7 := Ǎ6 ȟ4

begin MatMul conversion; ϕg (g7 ) = ǧ7

8 : ǧ8 := ǧ7 + 0

end MatMul conversion; ϕ(g7 ) = ǧ8

9 : ǧ9 := ǧ8 + ǧ5

ϕ(g8 ) = ǧ9

10 : ȟ10 := φ(ǧ9 )

ϕ(h9 ) = ȟ10

Now to convert line 10 to 14 of π
11 : ǧ11 := ∇h9 L

ϕ(g10 ) = ǧ11

12 : ȟ12 := φ0 (ǧ9 )

ǧ11

ϕ(h11 ) = ȟ12

13 : Ǎ13 := iid copy of W 2>

ϕ(A12 ) = Ǎ13

14 : ǧ14 := Ǎ13 ȟ12

begin MatMul conversion; ϕg (g13 ) = ǧ14

15 : ȟ15 := ǧ14 + a0 ȟ4
16 : ȟ16 := φ0 (ǧ3 )

end MatMul conversion; ϕ(g13 ) = ȟ15

ȟ15

where
4

7

11

a0 = α(E fϕ(h ) (Z)2 )−1 E fϕg (g ) (Z)fϕ(h
4

7

)

(Z)

12

= α(E fȟ (Z 0 )2 )−1 E fǧ (Z)fȟ (Z)
= α(E φ(Z30 )2 )−1 E Z7 φ0 (Z9 )Z11
with Z, Z 0 ∼ N (µč , K č ) and α = lim n1 (A6 )/n2 (A6 ).
B.2. Batched input
For the second input y in the batch
15 : g15 := W 1 y 0
16

16 : g

15

:= g

+g

17

:= φ(g )

18

5 17

:= A h

19

18

17 : h
18 : g
19 : g

20

20 : h

2nd input multiplied by (same) weight matrix
2

using same bias as before

16

:= g

+g

layer 1 activation
using same weight matrix
6

using same bias

19

:= φ(g )

layer 2 activations
19

Gradients:

21 : g21 := ∇h20 L
0

last layer gradient for input y

22

:= φ (g )

23

12 22

:= A h

24

0

22 : h
23 : g
24 : h

19

21

layer 2 preactivation gradient

g

layer 1 activation gradient; using same weights

16

:= φ (g )

23

layer 1 preactivation gradient

g

B.3. Residual network
Style 1: resblock merges after weights

1 : g1 := W 1 x

network input multiplied by weight matrix

2 : g2 := b1
3

resblock 1 bias

1

2

3 : g := g + g
4

resblock 1 preactivation

3

4 : h := φ(g )
5

5 : A := W

resblock 1 activation

2

6

2

7

5 4

resblock 1 merge weights

6 : g := b

resblock 1 merge biases

7 : g := A h

8 : g8 := g1 + g7 + g6

return to main branch

Style 2: resblock merges before weights

1 : g1 := W 1 x
2

2 : g := b

1

3

1

network input multiplied by weight matrix
resblock 1 bias
2

3 : g := g + g
4

3

4 : h := φ(g ) + g
5

5 : A := W

resblock 1 preactivation
1

resblock 1 activation, merge back to main branch

2

6 : g6 := b2
7 : g7 := A5 h4
8 : g8 := g7 + g6
9

8

resblock 2 preactivation
3

9 : h := φ(g ) + φ(g ) + g

1

merge of 2nd resblock; semantically same as h9 := φ(g8 ) + h4

B.4. Simple RNN
This is almost the same as the feedforward case except we tie the weights across time, and have inputs for each time step.
20

1 : g1 := h0

hidden state at t = 0

2

2 : g := b

RNN bias

3

3 : A := W

RNN weights

4

1

5

3 1

4 : g := U x + a

affine transform of input at t = 1

5 : g := A g

6 : g6 := g5 + g2 + g4
7 : h7 := φ(g6 )
8

2

9

3 7

hidden state at t = 1

8 : g := U x + a

affine transform of input at t = 2, with same U and a

9 : g := A h

10 : g10 := g9 + g2 + g8
11 : h11 := φ(g10 )

hidden state at t = 2

More advanced RNNs like GRU or LSTM can be similarly expressed.
B.5. Batchnorm, fully-connected
Let φ̃(h) = φ((h − h̄)/std(h)) be batchnorm followed by coordinatewise nonlinearity
φ, where h ∈ RB should be
q
PB
PB
1
2
interpreted as a single neuron across a batch, and h̄ = B1 i=1 hi , std(h) =
i=1 (hi − h̄) . For example, let
B
x1 , . . . , x4 be the batch of inputs.
1 : g1 := W 1 x1
2 : g2 := W 1 x2
3 : g3 := W 1 x3
4 : g4 := W 1 x4
5 : g5 := b1
6

1

6 : g := g + g

layer 1 bias
5

7 : g7 := g2 + g5
8 : g8 := g3 + g5
9 : g9 := g4 + g5
10 : h10 := φ̃(g6 , g7 , g8 , g9 )1
11

11 : h

layer 1 input 1 activations

:= φ̃(g6 , g7 , g8 , g9 )2

layer 1 input 2 activations

12 : h12 := φ̃(g6 , g7 , g8 , g9 )3

layer 1 input 3 activations

13

13 : h

:= φ̃(g6 , g7 , g8 , g9 )4

layer 1 input 4 activations

The transformer without layernorm (in particular, the softmax and self-attention mechanism) can be expressed in a similar
way.
B.6. Convolution
l
For any convolution weights {Wβij
}β∈ker,i∈c0 ,j∈[c] , Wβl is a dense matrix. Suppose x is an image input to the network with
s pixels and c channels, {xαj }α∈pos,j∈[c] , so that xα is vector of dimension c. Then the αth pixel, across all channels, of the
convolution W l applied to x can be described as
X
Wβl xα+β
β∈ker

21

Define
x̃α0 j 0 =

X

1
Wβij
xα+β,j

For demonstration, assume ker = {0, 1} and pos = [3] and the convolution is circular, and for simplicity assume we don’t
have biases.
1 : g1 := W01 x1
2 : g2 := W01 x2
3 : g3 := W01 x3
4 : g4 := W11 x1
5 : g5 := W11 x2
6 : g6 := W11 x3
7 : g7 := g1 + g5
8

2

layer 1 pixel 1 preactivations

6

8 : g := g + g

layer 1 pixel 2 preactivations

9 : g9 := g3 + g4

layer 1 pixel 3 preactivations

10

7

:= φ(g )

layer 1 pixel 1 activations

11

8

:= φ(g )

layer 1 pixel 2 activations

12

9

layer 1 pixel 3 activations

10 : h
11 : h
12 : h

:= φ(g )

13

13 : A := W02
14 : A14 := W12
15 : g15 := W02 h10
16 : g16 := W02 h11
17 : g17 := W02 h12
18 : g18 := W12 h10
19 : g19 := W12 h11
20 : g20 := W12 h12
21
15
19
21 : g

22

22 : g

23

23 : g

:= g

16

:= g

17

:= g

layer 2 weights

+g

layer 2 pixel 1 preactivations

+g

20

layer 2 pixel 2 preactivations

+g

18

layer 2 pixel 3 preactivations

24

21

:= φ(g )

layer 2 pixel 1 activations

25

22

:= φ(g )

layer 2 pixel 2 activations

26

23

layer 2 pixel 3 activations

24 : h
25 : h
26 : h

:= φ(g )

C. Additional Notations
We will use teletype font g, h, A, etc, to denote variables or nodes as defined in the straightline program. The superscripts in
this case, like gl , will mean that line number associated to such a variable. In contrast, we will use normal font g, h, A, etc,
to denote arbitrary variables of the correct type in a program (though sometimes we use h to also denote var of type H or G),
but the superscripts, such as in g i , are not attached to the semantics of the program. In either case, glk or gki will denote
the scalar value at the kth position of gl or g i . We write line(g) for the line number of the G-node g so that g = gline(g)
(same for H-nodes and A-nodes). We write n(g) for the dimension of a G-node so that nline(g) = n(g) (similar for H-node).
Similarly, n1 (A) and n2 (A) gives the first and second dimensions of an A-node A. Let Gπ be the collection of all G-nodes
of a skeleton π, Hπ be the collection of all H-nodes, and let Gπin be the collection of all input G-nodes. Sometimes we need
22

to talk about all G-nodes on or before line L. We will use Gπ≤L to denote such a set. When π is clear from context, we
suppress the subscript π for brevity.
def

def

Definition C.1. If c is a CDC, then let c≤m = {gl ∈ c : l ≤ m} and c<m = {gl ∈ c : l < m}.
Given a kernel K : Rm × Rm → R and subsets X , Y ⊆ Rm , write K(X , Y) for the corresponding |X | × |Y| submatrix of
K, and write K|X = K(X , X ) to be the restriction of K to X .
d

d

Given two random variables X, Y , and a σ-algebra A, the notation X|A = Y or X =A Y means that for any integrable
function φ and for any random varible Z measurable on A, E φ(X)Z = E φ(Y )Z. We say that X is distributed as (or
d

is equal in distribution to) Y conditional on A. In case A is the trivial σ-algebra, we just write X = Y . The expression
d
a.s.
t
X−
→ Y means X converges to Y in distribution. If random variables X t −−→ X ∞ , then we write X ∞ = lima.s.
t→∞ X .
n
n
Definition C.2. For a function Φ : R → R , we define
def

VΦ(Σ) = E[Φ(z)Φ(z)> : z ∼ N (0, Σ)]
for a PSD matrix Σ. When φ : R → R, we write Vφ to mean V applied to the function that acts coordinatewise by φ.

D. Consequences
D.1. Warmup: MLP
We warm up by considering the GP correspondence, gradient dynamics, and NTK convergence of MLPs first. We define a
0
fully-connected, feedforward neural network f (x; θ), x ∈ Rn as follows
def

x0 (x) = x
def

hl (x) = √

1
nl−1

W l xl−1 (x) + bl

def

xl (x) = φ(hl (x))
1
def
f (x; θ) = √ v > xL (x)
nL
l

L

l

l−1

with bl ∈ Rn , v ∈ Rn , and W l ∈ Rn ×n for l = 1, . . . , L. These form the parameters θ of f . (Note here that we follow
l 2
prior notation and use h for “preactivation,” but it is in fact equivalent to a G-var). We sample Wijl ∼ N (0, (σw
) ), vi ∼
√
L+1 2
l
l 2
N (0, (σw ) ) and bi ∼ N (0, (σb ) ). We can think of this parametrization as “pulling out the 1/ nl from Glorot
initialization.” This parametrization doesn’t change the forward kernel Σl (defined below), but it does change the scaling of
gradients.
0

Define kernels ΣL+1 : (Rn )2 → R by
0

1 2 1
Σ (x, x ) = (σw
) 0
1

0 def

n

Σ

n
X

xi x0i + (σb1 )2

i=1

l def

l 2
= (σw
) Vφ(Σl−1 ) + (σbl )2

def

L+1 2
ΣL+1 = (σw
) Vφ(ΣL ).

For any parametrized function f (x; θ), the Neural Tangent Kernel can be in general defined as Kθ (x, x0 ) =
h∇θ f (x; θ), ∇θ f (x0 ; θ)i. In the case when f (x; θ) is defined as above, there is a scaling limit of Kθ when θ is randomized (Jacot et al., 2018). The “proof” given by Jacot et al. (2018) was a sketch and most importantly was silent about
its application of the gradient independence assumption (used when applying induction). Below we give a formal proof
of NTK convergence, but first we introduce a “gradient kernel.” Suppose we take n1 , . . . , nL → ∞ in such a way that
0
nl /nm → αl,m for constants αl,m ∈ (0, ∞). Then define Πl : (Rn )2 → R by
def

L+1 2
ΠL (x, x0 ) = (σw
)
def

Πl = αl+1,l Vφ0 (Σl+1 )
23

Πl+1 .

0

Theorem D.1. Fix a finite set of inputs X ⊆ Rn . As n1 , . . . , nL → ∞ with nl /nm → αl,m , with parameter sampled as
above,
d

f (X ; θ) −
→ N (0, ΣL+1 |X )
if the nonlinearity φ is α-controlled with α < 2; and


nl
nL X
∂f
a.s.
ψ
{
(x)}
−−→ E[ψ(ζ) : ζ ∼ N (0, Πl |X )], for all polynomially bounded ψ, l ≥ 1
x∈X
nl i=1
∂xli
a.s.

Kθ |X −−→

L
X

αl,L Πl

l 2
Σl + (σw
) − (σbl )2
L+1 2
+ ΣL+1 /(σw
)
l )2
(σw

Vφ0 (Σl )

l=1

=

L
L
X
K

Vφ0 (Σm )

l=1 m=l

l 2
Σl + (σw
) − (σbl )2
L+1 2
+ ΣL+1 /(σw
) .
l )2
(σw

if the nonlinearity φ has a polynomially bounded weak derivative.
This theorem formally justifies the computations made in Poole et al. (2016); Schoenholz et al. (2017); Jacot et al. (2018)
l
Remark D.2. If we set σw
= σbl = 1 for all l, then we can recover the NTK recurrence relation given in Jacot et al. (2018).
The β factor in Jacot et al. (2018) on the bias can also be easily accounted for, but we will not consider such a parametrization
here.
Proof. Since X is finite, it suffices to just consider two inputs x01 = x, x02 = x0 . We can form a tensor program to
model a fully-connected, feedforward network, with a batch of inputs. We construct it implicitly as follows, where we use
superscripts in •(•) to denote semantically relevant quantities.
Pn0
Define the input vars g̃(i) := W:i1 , A(l) := W l for l = 2, . . . L, and ḡ(l) := bl for l = 1, . . . , L. Define g(1a) := i=1 g̃(i) x0a
i
for a = 1, 2, ĝ(la) := g(la) + ḡ(l) (this represents hl ), h(la) := φ(ĝ(la) ) (this represents xl ), g(l+1,a) := A(l+1) h(la) . For
simplicity, we assume that n1 (A(l) ) 6= n2 (A(l) ) for all l, so that each “layer” belongs to a different CDC. Below, we write K
for K c where c is automatically understood based on the arguments; similarly we write µ for µc with c implied.
(l)

(l)

l
We have the corresponding sampling hyperparameters σ line(A )t = σw
, σ line(ḡ )t = σbl , µcin t = 0 for all input G-vars, and
(i)
(l)
cin t
1
0 2
l 2
K
is such that g̃j ∼ N (0, (σw /n ) ) and ḡj ∼ N (0, (σb ) ), for all j in appropriate ranges.

Then we can compute µ = 0 and
K(ĝ(la) , ĝ(lb) ) = Σl (x, x0 )
K(g(la) , g(lb) ) = K c (ĝ(la) , g(lb) )
= Σl (x, x0 ) − (σbl )2
K(ĝ(la) , ḡ(l) ) = (σbl )2
and K(g, g 0 ) = 0 for all other pairs of G-vars g, g 0 .
Thus, by Thm 4.3, for any (< 2)-controlled ψ,
nl

1 X
ψ(hl (x0a ))ψ(hl (x0b ))
nl i=1
nl

1 X
= l
ψ(ĝ(la) )ψ(ĝ(lb) )
n i=1
a.s.

−−→

E

(z,z 0 )∼N (0,Σl |x,x0 )

24

ψ(z)ψ(z 0 )


Σl (x, x) Σl (x, x0 )
where Σ |x,x0 =
. Obviously, given hL (x) for all x, f (x; θ) is a Gaussian process with kernel
Σl (x0 , x) Σl (x0 , x0 )
PnL
a.s.
L+1 2 1
K(x, x0 ) = (σw
) nL i=1 φ(hL (x))φ(hL (x0 )) and mean 0. Since K −−→ ΣL+1 over the randomization of parameters
in layer < L, we have that f itself is a Gaussian process with this kernel, in the limit.


l

Now we think about backprop.
∂f
√1 v. We can thus extend the tensor program by g(La) := v, h(la) := g(la)
We have ∂x
φ0 (ĝ(la) ), g(l−1,a) :=
L =
nL
√
√
∂f
∂f
A(l)> h(la) , for a = 1, 2 and for l = L − 1, . . . , 2. Here g(l) represents ∂x
nL and h(l) represents ∂h
nL . For brevity
l
l
(l)>
(l)
(la) (lb)
we just wrote A
for an implicitly defined transposed var of A . We can compute K(g , g ) = Πl (x, x0 ), and
0
K(g, g ) = 0 for all other G-var pairs g, g 0 not appearing in the original tensor program.
L+1 2
Because v ∼ N (0, (σw
) ), and all g(la) , h(la) are odd in v (being linear in v), Thm 5.1 can be applied. Then, for
l = 1, . . . , L,


nl ,nl−1
nl ,nl−1 
∂f
1 X
1
1 X ∂f
1
∂f
∂f 0 l−1 0
l−1
0
√
√
(x)
(x ) = l
(x)xj (x)
(x )xj (x )
nl i,j=1 ∂Wijl
n i=j=1
∂Wijl
nl−1 ∂hli
nl−1 ∂hli
 l
  l−1

n
n
1 X ∂f
∂f 0   X l−1
0 
= l−1 l
(x) l (x )
xj (x)xl−1
j (x )
l
n n
∂h
∂h
i
i
i=1
j=1
 l
  l−1

n
n
1 X (la) (lb)   X (l−1,a) (l−1,b) 
= l−1 l
h h
h
h
n n
i=1
j=1


a.s.
−−→ E z la φ0 (zal )z lb φ0 (zbl ) E φ(zal−1 )φ(zbl−1 )

by Thm 5.1
= E z la z lb E φ0 (zal )φ0 (zbl ) E φ(zal−1 )φ(zbl−1 )
where (z la , z lb ) ∼ N (0, K|g(la) ,g(lb) ), and independently (zal , zbl ) ∼ N (0, K|ĝ(la) ,ĝ(lb) ). Thus the above is just [Πl
Vφ0 (Σl )

l 2
) ](x, x0 ).
(Σl − (σbl )2 )/(σw

On the other hand,
1 X ∂f
∂f
1 X ∂f
∂f
(x) l (x0 ) = l
(x) l (x0 )
l
l
n i ∂bi
n i ∂hli
∂bi
∂hi
!
1 X (la) (lb)
h h
= l
n
i
a.s.

−−→ E z la φ0 (zal )z lb φ0 (zbl )
= E z la z lb E φ0 (zal )φ0 (zbl )
Vφ0 (Σl )](x, x0 )
P ∂f
P
∂f
L 0 a.s.
L+1 2
where z la , z lb , zal , zbl are sampled as above. Also, n1L i ∂v
(x) ∂v
(x0 ) = n1L i hL
−→ ΣL+1 (x, x0 )/(σw
)
i (x)hi (x ) −
i
i
as deduced before.
= [Πl

Thus
a.s.

ΘL −−→

L
X

αl,L Πl

Vφ0 (Σl )

L−1
Y

L−1
K

l=1

=

L
X

αl,L

l=1

=

L K
L
X
l=1 m=l

αm+1,m

l 2
Σl + (σw
) − (σbl )2
L+1 2
+ ΣL+1 /(σw
)
l
(σw )2

Vφ0 (Σm+1 )

Vφ0 (Σl )

l 2
Σl + (σw
) − (σbl )2
L+1 2
+ ΣL+1 /(σw
)
l
(σw )2

m=l

m=l

Vφ0 (Σm )

l 2
Σl + (σw
) − (σbl )2
L+1 2
+ ΣL+1 /(σw
)
l )2
(σw

25

Global mean pooling as readout layer. Now suppose that f (x; θ) = n1L 1> xL (x). As in the proof above, we can
construct a program π for computing f and its gradients over two inputs x01 , x02 :
Forward Define the input vars g̃(i) := W:i1 , A(l) := W l for l = 2, . . . L, and ḡ(l) := bl for l = 1, . . . , L. Define
Pn0
(la)
g(1a) := i=1 g̃(i) x0a
:= g(la) + ḡ(l) (this represents hl ), h(la) := φ(ĝ(la) ) (this represents xl ),
i for a = 1, 2, ĝ
(l+1,a)
(l+1) (la)
g
:= A
h .
Backward We set g(La) := 1, h(la) := g(la) φ0 (ĝ(la) ), g(l−1,a) := A(l)> h(la) , for a = 1, 2 and for l = L − 1, . . . , 2.
∂f
∂f
(l)
Here g(l) represents nL ∂x
represents nL ∂h
l and h
l.
Now we construct the detransposition π̌ of π (see Appendix B.1.1 for a concrete example of detransposition).
The forward part of π̌ is almost identical to that of π:
ˇ(i) := W:i1 , Ǎ(l) := W l for l = 2, . . . L, and ḡ
ˇ(l) := bl for l = 1, . . . , L. Define
Forward Define the input vars g̃
0
P
n
ˇ(la) ) (this represents xl ),
ˇ(la) := ǧ(la) + ḡ
ˇ(i) x0a
ˇ(l) (this represents hl ), ȟ(la) := φ(ĝ
ǧ(1a) := i=1 g̃
i for a = 1, 2, ĝ
(l+1,a)
(l+1) (la)
ǧ
:= Ǎ
ȟ . Finally, we set ϕ(•) = ˇ• for all vars defined here.
Here we have automatically simplified the detransposition of g(la) produced from Defn 6.2, by identifying ϕ(gl ) and ϕg (gl ),
which in this case are the same.
Now the backward part
Backward Let Ǎ(l)0 be an input A-var sampled iid as A(l)> . We set ȟ
:= ǧ(La) := 1 (representing nL times
(la)
(la)
(la)
:= ȟ
φ0 ( ˇ
ĝ(la) ), ϕg (g(l−1,a) ) = ˇ
g̃(l−1,a) := Ǎ(l)0 ȟ , ϕ(g(l−1,a) ) =
the gradient at xL ), ϕ(h(la) ) = ȟ
(La)

(l−1,a)
ȟ
:= ˇ
g̃(l−1,a) + a(l−1,a) h(l−1,a) for a = 1, 2 and for l = L − 1, . . . , 2, and for a(la) computed via the derivative
rule of Thm 6.3. Specifically, we have, by a simple induction,
L 2
a(L−1,a) = αL,L−1 (σw
) E[φ00 (y) : y ∼ N (0, ΣL
aa )]
l+1 2
l+1 2
a(la) = a(l+1,a) αl+1,l (σw
) E ∂y (φ(y)φ0 (y)) = a(l+1,a) αl+1,l (σw
) (E φ0 (y)2 + φ(y)φ00 (y)),

with y ∼ N (0, Σl+1
aa )
The derivatives here should be interpreted as tempered distributions in general, testing against the Gaussian density of
y. Note that if φ is odd, then φ00 is odd, so that aL−1,ap
= 0 = ala for all l < L − 1. If φ is ReLU, then φ00 is the Dirac
L−1,a
Delta tempered distribution at 0, so that a
= 1/ 2πΣL
aa .
d

d

ˇ(la) , ˇ
In the forward pass, (ĝ(la) , ĝ(lb) )“ = ”N (0, Σl |a,b ) as before. In the backward pass, (g̃
g̃(lb) )“ = ”N (0, Πl |a,b ), where
L 2
ΠL−1 |a,b = αL,L−1 (σw
) Vφ0 (ΣL |a,b )
l+1 2
Πl |a,b = αl+1,l (σw
) (Πl+1 |a,b

Vφ0 (Σl+1 |a,b ) + (a(l+1,a) , a(l+1,b) )⊗2

Vφ(Σl+1 |a,b ))

and
nl

1 X (la) (lb) a.s. l
h hi −−→ Πab Vφ0 (Σl )ab + a(la) a(lb) V(φφ0 )(Σl )ab
nl i=1 i
Thus
Corollary D.3. The NTK of the MLP above with global mean pooling readout layer converges a.s. to
a.s.

NTK(xa , xb ) −−→
L−1

Vφ0 (ΣL )ab

L 2
L 2
l 2
X
 Σl + (σw
ΣL
) − (σbl )2
ab + (σw ) − (σb )
+
αl,L Πlab Vφ0 (Σl )ab + a(la) a(lb) V(φφ0 )(Σl )ab ab
L
l
σw
σw
l=1

26

Corollary D.4. If the readout layer is global mean pooling in an MLP and the last layer nonlinearity is odd, then the
Gradient Independence Assumption can be applied to give the correct computation of the gradient covariance and the NTK.
Now that we have warmed up a little, we will work with tensor programs and apply Thms 4.3, 5.1 and 6.3 more informally.
D.2. Warmup: Semicircle Law
Thm 6.3 has enough power to rederive the semicircle law for the Gaussian Orthogonal Ensemble (Tao, 2012).
Definition D.5. The Gaussian Orthogonal Ensemble (GOE) is the sequence of matrices (Wn )n≥0 defined as follows: Let
def

Xij ∼ N (0, 1), iid, for all i, j ∈ N. Then set Wn = √12n (Xij + Xji )i,j∈[n] .
Pn
def
Definition D.6. The empirical spectral distribution (ESD) µWn of Wn is given by µWn = n1 i=1 δλi (Wn ) , where δx is
the Dirac Delta measure at x, and λi are the eigenvalues in decreasing (in i) order.
√
Definition D.7. The semicircle law µsc is defined to be the distribution with density ∝ 4 − x2 .
Definition D.8. A random distribution µ on R, i.e. a random variable taking values in the space of probability distributions
on R, converges to a deterministic distribution µ∗ almost surely, if for all compactly supported continuous function f ,
a.s.
Ez∼µ f (z) −−→ Ez∼µ∗ f (z).
To prove that µWn converges almost surely to the semicircle law µsc , it suffices to compute the (polynomial) moments of
µWn and show that it converges almost surely to the moments of µsc as n → ∞ (Tao, 2012). It’s well known that the odd
moments of µsc are 0 and for even k, EX∼µsc X k = Ck/2 , where Cj is the jth Catalan number defined by
C0 = 1,

Cj =

j−1
X

Ci Cj−1−i .

i=0

Now,
E

X∼µWn

Xk = E

1

Wn n


tr Wnk = E

E

1 > k
v Wn v.

Wn v∼N (0,In ) n

The latter expectation can be expressed as a tensor program: We couple the p
time index t to t = n. √
Define the A-var
2
1t
A1t to be an input var, with n1 (A1t ) = n2 (A1t ) = n, sampled A1t
ij ∼ N (0, 1/ 2n (A )) = N (0, 1/ 2n), and define
A2t = A1t> . Thus A1t + A2t represents Wn . Set g 0 := v, an input var, sampling gi0 ∼ N (0, 1). Inductively, set
g 0j := A1 g i−1 , g 00j := A2 g i−1 , and g j := g 0j + g 00j . Thus g j represents Wnj v (where
represents an
Pn the superscript j P
n
index in g j while it represents an exponent in Wnj ). We aim to compute the limit of n1 i=1 vi (Wnk v)i = n1 i=1 gi0 gik as
n → ∞.
This limit is prescribed by Thm 6.3. The detransposition π̌ of the above program can be described by the following: Define
Ǎ1 := ϕ(A1 ), Ǎ2 := ϕ(A2 ) (so that they are independently sampled in π̌), and
ȟ0 := ǧ 0 := v = ϕ(g 0 ),
ǧ 0j := Ǎ1 ȟj−1 = ϕg (g 0j ),
ǧ 00j := Ǎ2 ȟj−1 = ϕg (g 00j ),
ȟ0j := ǧ 0j +

j−2
X

a0 ji ȟ00i = ϕ(g 0j ),

i=0

ȟ00j := ǧ 00j +

j−2
X

a00 ji ȟ0i = ϕ(g 00j ),

i=0

ȟj := ȟ0j + ȟ00j = ϕ(g j ),
j

j

where a0 ji (resp. a00 ji ) is computed by differentiating fȟ via Thm 6.3, because it can be easily seen that fȟ is always a
Pj−1 j ǧ0 r
00r
0
ȟj
linear function of {ǧ 0r , ǧ 00r }j−1
+ Z ǧ ) + bj0 Z ǧ for
r=1 . In fact, a symmetry argument shows that f (Z) =
r=1 br (Z
27

some coefficients {bjr }jr=0 . An easy inductive argument shows that bjr satisfies the recurrence
b00 = 1,
∀r 6∈ [0, j], bjr = 0,
∀r < j, bjr =

j−2
X

bir bj−1
i+1 ,

i=r

bjj = 1
These equations have the unique solution
bjr =

(
C(j−r)/2
0

if j − r is even
else.

Simultaneously, another easy inductive argument shows that µč = 0 and K č (ǧ 0 , ǧ j ) = 0 for all j > 0. Thus Thm 6.3 yields,
for Z ∼ N (µč , K č ),
!
n
k−1
X
1
1 X 0 k a.s.
k
ǧ 0
k
ǧ 0 r
ǧ 00r
k ǧ 0
tr(Wn ) =
g g −−→ E Z
br (Z + Z ) + b0 Z
n
n i=1 i i
r=1
0

= E bk0 (Z ǧ )2
(
Ck/2
k
= b0 =
0

if k is even
else.

as desired.
D.3. Warmup: Marchenko-Pastur Law
Suppose Yij ∼ N (0, 1) for all i, j ∈ N, and Y (n) = (Yij )i∈[mn ],j∈[n] for a sequence of {mn }n satisfying limn→∞ mnn →
α ∈ (0, ∞). The Marchenko-Pastur Law says that the spectral distribution of n1 Y (n) Y (n)> converges almost surely to
µmp(α) , defined as
1 p
(b − x)(x − a)I[a,b] (x) dx
(1 − α−1 )+ δ0 +
α2πx
√ 2
√
where (r)+ = r if r > 0 and 0 else, and a = (1 − α) and b = (1 + α)2 . We can again show this via the moment
method.
√
We define a tensor program π as follows. Couple n = t. Let A := Y (n) / n be an input A-var and let A0 := A> . Let
g 0 := v ∼ N (0, Imn ) = N (0, In(g0 ) ) be an input G-var. Define recursively
g i := A0 g i−1

g i := Ag i

a.s. 1
a.s.
1
1
> k
>
> k
We seek to compute lima.s.
n mn tr(AA ) = limn mn Ev∈N (0,Imn ) v (AA ) v = limt→∞ n(g 0t )

Pn(g0t )
i=1

gi0t gikt .

The detransposition π̌ of the above, is as follows.√Set Ǎ, Ǎ0 to be input A-vars, corresponding to ϕ(A), ϕ(A0 ), and sampled
iid as such, so that σ ∞ (Ǎ) = 1 and σ ∞ (Ǎ0 ) = α. Then define
ȟ0 := ǧ 0 = v ∼ N (0, Imn )
g̃ˇi := Ǎ0 ȟi = ϕg (g i )
i−1
g̃ˇi := Ǎȟ
= ϕg (g i )
i
ȟ := g̃ˇi +

i−1
X

j

aij ȟ = ϕ(g i )

j=0

ȟi := g̃ˇi +

i−1
X

aij ȟj = ϕ(g i )

j=0

28

where aij (resp. aij ) is computed through the derivative rule of Thm 6.3. By a simple inductive argument, we see that we can
express
ȟi =

i−1
X

i

bij ǧ j ,

ȟ =

j=0

i−1
X

bij ǧ j

j=0

for some set of coefficients {bij , bij }i≥j≥0 . Then it’s easy to see that they satisfy the recurrence
b00 = b00 = 1,
∀j < i, bij =

i−1
X

k
bi−1
k bj ,

bii = 1,

k=j

∀j < i, bij = α

i
X

,
bik bk−1
j

bii = 1.

k=j+1

We claim that the solution to these equations is given by
bij = Mi−j ,
∀j < i, bij = αMi−j ,

bii = 1,

where Mr = E[xr : x ∼ µmp(α) ]. It suffices to verify the following Catalan-like identity
Ms = α

s−2
X

Mr Ms−1−r + (1 + α)Ms−1 .

(5)

r=1

This can be done by the change of variable in the integral of E[xr : x ∼ µmp(α) ] to get
√
E[xr : x ∼ µmp(α) ] = E[( αy + 1 + α)r−1 : y ∼ µsc ]


b(r−1)/2c
X
k
r−1−2k r − 1
=
α (1 + α)
Ck
2k
k=0

where Ck is the kth Catalan number. Then one can verify Eq. (5) by expanding and applying the Catalan identity
Pk−1
Ck = i=0 Ci Ck−1−i repeatedly.
Finally, an easy inductive argument shows that µč = 0 and K č (ǧ 0 , ǧ j ) = 0 for all j > 0. Thus, we have
0t

0t

n(g )
n(ǧ )
X
X
a.s.
a.s.
0
1
1
1
0t kt
lim
g
g
=
lim
E
ǧi0t ȟkt
bk0 (Z ǧ )2 = bk0 = Mk
tr(AA> )k = lim
E
i i
i =
0t
0t
č
č
n mn
t
t n(g )
n(ǧ ) i=1
Z∼N (µ ,K )
i=1
a.s.

as desired.
D.4. DNN-GP correspondence
Suppose ρ = F (z; θ) is the part of a neural network that takes an input embedding z = (z 1 , . . . , z B ) and produces
a representation ρ = (ρ1 , . . . , ρm ) of it. For example, z can be Ax for an input x and an embedding matrix A, or
1
B
(Ax1 , . . . , AxB ) for a sequence/batch of inputs (xi )B
i=1 (say when x , . . . , x is a sequence of tokens to be processed by an
RNN, or when they form a batch, perhaps to be processed by batchnorm), or (A1 x1 , . . . , AB xB ) when they form the pixel
vectors across the channels of an input image in the case of CNN, perhaps in combination with RNNs/batchnorm. Similarly,
ρ can be a vector representation in a MLP or a sequence/batch of vector representations in the case of RNN/batchnorm/CNN.
The neural network then converts ρ to an output via some linear transformation, say ρ 7→ (v 1> ρ1 , . . . , v m> ρm ), where each
v i is a vector of appropriate size, and v i is allowed to equal to v j whenever they have the same shape. Note that this scenario
is general enough to cover simultaneous computation of a neural network on a batch of input, where ρ can be partitioned
into the corresponding representations of each parallel output.
29

Suppose F (z; θ) can be represented by a tensor program π where z and θ appear as input G- and A-vars; let the output
(ρ1 , . . . , ρm ) be represented by H- or G-vars h1 , . . . , hm of π. When the input embedding is linear, z = (A1 x1 , . . . , AB xB ),
and its matrices A1 , . . . , AB are sampled from zero mean Gaussian distributions, (z 1 , . . . , z B ) is jointly Gaussian with a
covariance depending on pairwise products between x1 , . . . , xB . Furthermore, if θ is randomized by Gaussians according to
Section 3.2 (with some set of compatible sampling hyperparameters σ l , µcin , etc), then by Thm 6.3 we get
Corollary D.9 (DNN-GP correspondence). If all fl of π are polynomially bounded and almost sure rank convergence
a.s.
holds for π̌, then n(h1 i ) hi> hj −−→ Cij for some PSD matrix C, whenever n(hi ) = n(hj ), as the dimensions {nl }l of
π go to infinity. The kernel C can be computed via Thm 6.3. A fortiori, if each v i of the readout layer is sampled
from N (0, 1/n(v i )), where for each i 6= j, either v i = v j or v i is independent from v j , then the neural network output
d

(v 1> ρ1 , . . . , v m> ρm ) −
→ N (0, C 0 ) in this limit, for
0
Cij
=

(
Cij
0

if v i = v j
otherwise.

For example,
1. if z = (Ax1 , . . . , AxB ) is just a batch of inputs where each Axi is processed by the same neural network f in parallel,
and the network outputs (v > ρ1 , . . . , v > ρm ) for readout weights v, then Cor D.9 says f converges to a Gaussian Process
in distribution in the infinite width limit.
2. if z = (Axij )BS
i=j=1 represents the embedding of a batch of B sequences of length S, and the network is an RNN that
processes each sequence in parallel, in a seq2seq fashion, then Cor D.9 says f converges to a (multivariate) Gaussian
Process in distribution in the infinite width limit.
3. we obtain similar GP convergence results for any standard architecture.
D.5. Gradient Independence Assumption
Thm D.1 already shows that gradient independence assumption leads to the correct computation for MLPs.
In general, if, as before, F (z; θ) is the body of the network that takes an input embedding to a representation, and it can
be represented by a tensor program π having no line of type T, then backprop can be represented by an extended program
as in Section 5 with v i being readout layer weights. Thus, if v i are sampled with zero mean and all nonlinearities have
polynomially bounded weak derivatives, then Thm 5.1 applies and we can compute the gradient dynamics by computing K c
and µc according to Section 5, which allows us to pretend that the G-vars in π are independent from the weights used in the
backward pass. This is in particular true if F (z; θ) has a standard architecture without batchnorm (with no transposed weight
sharing in the forward pass). Batchnorm is not covered by our theorems because its gradient has singularities, for example
at the origin. However, based on the simulations of Yang et al. (2018), Thm 5.1 seems to hold even when batchnorm is
involved.
Singular value distribution. Let F (z; θ) be as above. Denote by J its Jacobian in z. Pennington et al. (2017) applied
free probability theory to compute the eigenvalues of JJ > and hence of the singular value of J, when F (z; θ) represents a
MLP. Thus J can be expressed as DL W L · · · D2 W 2 D1 W 1 for weight matrices W l for each layer l and diagonal matrices
Dl = Diag({φ0 (hl+1 )}). Specifically, the authors compute the Stieljes transform of JJ > and then its S-transform by
leveraging the latter’s compatibility with matrix multiplication. Crucial in this computation is the assumption that Dl and
W l are asymptotically free, allowing the application of S-transform. We now justify this assumption.
The Stieljes and S-transform methods can be thought of a more nicely packaged way of applying the moment method (Tao,
2012), i.e. computing tr((JJ > )k ) for each k. Thus it suffices to show that, in the computation of tr((JJ > )k ), {Dl }l can
be thought of as independent of {W l }l .
Now tr((JJ > )k ) = Ea∼N (0,I) a> (JJ > )k a. The computation (JJ > )k a can be expressed with a tensor program: If π
represents the computation of F (forward pass), π 0 represents J > , i.e. backprop from gradient vector a (so that π̃ = π|π 0
is an extended program of the form described in Section 5), and π 00 represents J, then (JJ > )k a is given by the output of
π̂ = π|(π 0 kπ 00 k · · · kπ 0 kπ 00 ). Here, | denotes concatenation and k denotes “piping”, so that the output of ρ is inserted as the
30

input of τ in ρkτ . Then lim Ea∼N (0,I) a> (JJ > )k a can be computed via Thm 6.3. Finally, it only remains to notice that
K(g, h0 ) = 0 for any G-var of π and H-var (of G-var) of (π 0 kπ 00 k · · · kπ 0 kπ 00 ) other than a because h0 is always odd in a
(apply the same reasoning from proof of Thm 5.1). Thus lima.s. Ea∼N (0,I) a> (JJ > )k a has the same limit as if the A-vars
of π are independent from the rest of π̂.
In fact, this reasoning, applied to mixed moments, establishes that {Di }i ∪ {W j }j are almost surely asymptotically free.
0

Corollary D.10. In the MLP above, let its hidden layer widths {nl }l go to infinity such that nl /nl → αl,l0 ∈ (0, ∞) for
some constants αl,l0 . Then, for X1 , . . . , Xk chosen from {Dl , W l , W l> }l such that the sizes match and X1 · · · Xk is a
square matrix,
1
1
a.s.
tr (X1 · · · Xk ) − L tr (ϕ(X1 ) · · · ϕ(Xk )) −−→ 0,
nL
n
where ϕ(W l ) = W l and ϕ(Dl ) = an iid copy of Dl , independent from all other values of ϕ.
This corollary is sufficient to justify the Stieljes transformation calculations of (Pennington et al., 2017), and show that the
singular value distributions converge to their limits, almost surely.
More generally, even with weight tying and arbitrary architecture, we can compute the singular value distribution of the
neural network Jacobian, by expressing the moment computations as tensor programs, just like the above, and crank the
machinery of Thm 6.3. Appendix D.3 can be thought of the most basic such case of linear regression.
D.6. Signal Propagation
We begin by examining the simple RNN and the weight-tied autoencoder, before reviewing some mean field equations
that appeared in prior literature, which can be justified rigorously. Finally, we close by looking at the weight-tied residual
network, which is perhaps the simpliest “RNN” where the weight-tying leads to a different behavior than not tying the
weights (in contrast to the simple RNN vs MLP).
Simple RNN A simple RNN that takes in input only at time 1 and outputs only at time L can be thought of as an MLP
with parameters tied across layers:
def

x0 (x) = x
def 1
hl (x) = √ W xl−1 (x) + b
n
def

xl (x) = φ(hl (x))
def 1
RNN(x; θ) = √ v > xL (x)
n
2
for W ∈ Rn×n and x, v, b ∈ Rn . We will sample Wij ∼ N (0, σW
/n), bi ∼ N (0, σb2 ). The computation of
{RNN(xi ; θ)}B
over
a
batch
of
inputs
can
be
expressed
by
a
tensor
program
with
no line of type T (essentially the program
i=1
0
0
in Appendix B.1 but with weights and biases tied). By Thm 4.3, we can compute K c (hl (xi ), hl (xi )) = 0 whenever l 6= l0 ,
2
and that K c |{hl (xi )}i = σW
Vφ(K c |{hl−1 (xi )}i ) + σb2 . This is, of course, exactly the same as the K c computed if W and
b are not tied across layers (see Appendix D). This therefore mathematically proves what the experiments of Chen et al.
(2018) suggested.

Corollary D.11. Suppose φ is α-controlled for α < 2. Assume almost sure rank convergence. Then for any α-controlled
ψ : RL → R, as n → ∞,
n
n
1X
1X
a.s.
j
j
ψ(h1RNN (xj )i , . . . , hL
ψ(h1MLP (xj )i , . . . , hL
−→ 0,
RNN (x )i ) −
MLP (x )i ) −
n i=1
n i=1

where hlRNN (hlMLP ) denotes the hidden state of the RNN (MLP), with the weights and biases in each model identically
sampled.
31

Autoencoder

A weight-tied autoencoder is described by the following equations (we follow Li & Nguyen (2018) here)
def

x0 (x) = x
def

xl (x) = W l σ l−1 (xl−1 ) + bl , ∀l ∈ {1, . . . , L}
def

x̂L = W L> φL (xL ) + v L
def

x̂l (x) = W l> φl (x̂l+1 ) + v l
0

l

l−1

l

l−1

for input x ∈ Rn , a set of weights W l ∈ Rn ×n , encoder biases bl ∈ Rn , decoder biases v l ∈ Rn , for l = 1, . . . , L.
We also have the decoder and encoder activation functions φl : R → R, σ l : R → R. The parameters are sampled iid
according to
2
l−1
Wijl ∼ N (0, σW
),
l /n

bli ∼ N (0, σb2l ),

vil ∼ N (0, σv2l ).

We consider taking the limit where nl → ∞, ∀l, with nl /nl−1 → αl ∈ (0, ∞).
Li & Nguyen (2018) proved a (forward) signal propagation theorem of the above weight-tied autoencoder that uses the
L
following quantities. Define {τl }L
l=1 and {τ̄l }l=0 inductively:
1
kσ 0 (x)k2 ,
n0
2
2
τ12 = σW
1 τ̄0 ,
τ̄02 =

τ̄l2 = τl2 + σb2l ,

∀l ∈ {1, . . . , L},

2
l−1
τl2 = σW
(τ̄l−1 z)2 ,
l Eσ

∀l ∈ {2, . . . , L}

z

where z ∼ N (0, 1). Next define {γl , ρl }L+1
l=2 inductively:
1
E τ̄L z1 φL (τ̄L z1 ),
ρL+1 = E φL (τ̄L z1 )2 ,
z1
τ̄L2 z1


q
1
l−1
l 2
l−1
2
2
l
γl = 2
E τ̄l−1 z1 φ
α σW l γl+1 σ (τ̄l−1 z1 ) + α σW l ρl+1 + σvl z2 ,
τ̄l−1 z1 ,z2

2
q
2
l−1
2 z
l σ2 ρ
α
+
σ
ρl = E φl−1 αl σW
γ
σ
(τ̄
z
)
+
,
∀l ∈ {L − 2, . . . , 2}
l l+1
l−1 1
W l l+1
vl 2

γL+1 =

z1 ,z2

where z1 , z2 ∼ N (0, 1).
By expressing the autoencoder computation on a single input x as a tensor program and applying Thm 6.3, we obtain a
version of the main theorem of Li & Nguyen (2018) that assumes no smoothness of the nonlinearities and of test functions. If
X t , Y t ∈ Rn(t) are two sequences of random vectors in t, then write X t ∼
= Y t to mean that for any polynomially bounded
Pn(t)
Pn(t)
1
1
t
t
ψ : R → R, n(t) i=1 ψ(Xi ) and n(t) i=1 ψ(Yi ) converge a.s. to the same limit, as n(t) → ∞.
Corollary D.12. Let the activation functions {σ l , φl }l be polynomially bounded. Then in the limit {nl }l → ∞ as described
above,
1. xl ∼
= N (0, τ̄l Inl ), ∀l ∈ {1, . . . , L}.
q
2
l−1
2 ρ
2
~1 , z~2 ∼ N (0, Inl−1 ) independently.
2. x̂l ∼
(τ̄l−1 z~1 ) + αl σW
= α l σW
l γl+1 σ
l l+1 + σv l z2 , ∀l ∈ {2, . . . , L} where z
3. the autoencoder output x̂ satisfies
2
0
x̂ ∼
= φ0 (α1 σW
1 γ2 σ (x) +

q
2 ρ + σ2 z
α1 σW
1 2
v 1 ~2 ),

where z~2 ∼ N (0, In0 ) independent of x.
Li & Nguyen (2018)’s main theorem is almost the same as this, except that
32

1. Li & Nguyen (2018) requires σ l to be nontrivial in the sense that for any τ > 0, Ez∼N (0,1) σ l (τ z)2 > 0. But this
P
is equivalent to saying that σ l is not a.e. 0. Indeed,
if σ l (x) = i ai hi (x) is its Hermite expansion in orthonormal
P
Hermite basis hi , then Ez∼N (0,1) σ l (τ z)2 = i a2i τ 2i , which can be 0 for positive τ iff all ai s vanish.
2. All nonlinearities σ l , φl are required by Li & Nguyen (2018) to be globally Lipschitz (and hence linearly bounded).
Here we only need them to be polynomially bounded.
3. The equivalence relation ∼
= is defined differently in Li & Nguyen (2018).
p

There, X t ∼
→ 0 for any sequence of uniformly pseudo-Lipschitz functions. A sequence of
= Y t if φt (X t ) − E φt (Y t ) −
functions φt : Rn(t) → R is said to be uniformly pseudo-Lipschitz if there exists a constant C, independent of n, such
that for any x, y ∈ Rn(t) ,


kxk kyk kx − yk
√
.
|φn (x) − φn (y)| ≤ C 1 + √ + √
n
n
n
In contrast, the test functions φt we allow are coordinatewise functions — a stronger assumption than the above — but
does not need to be smooth, just polynomially bounded — a weaker assumption than the above. We also guarantee
almost sure convergence, a stronger result than their convergence in probability. It would be interesting in future work
to study whether one can remove the smoothness assumption even for noncoordinatewise test functions.
D.6.1. J USTIFYING SEMIRIGOROUS EQUATIONS
Below, we give several examples of signal propagation equations derived heuristically in prior works, which can now be
justified rigorously using the tensor program framework.
MLP (Schoenholz et al., 2017)

See Appendix D.1.
0

Residual Network (Yang & Schoenholz, 2017) We define a residual network f (x; θ), x ∈ Rn as follows
def

x0 (x) = x
def

hl (x) = √

1

W l xl−1 (x) + bl
nl−1
def 1
xl (x) = √ V l φ(hl (x)) + xl−1 (x) + al
nl
1
def
f (x; θ) = √ w> xL (x)
nL
l

L

l

l

l

l−1

with al , bl ∈ Rn , w ∈ Rn , V l ∈ Rn ×n , and W l ∈ Rn ×n for l = 1, . . . , L. These form the parameters θ of f . We
l 2
L+1 2
sample Wijl ∼ N (0, (σw
) ), Vijl ∼ N (0, (σVl )2 ), wi ∼ N (0, (σw
) ), ali ∼ N (0, (σal )2 ), and bli ∼ N (0, (σbl )2 ). Define
0
kernels ΣL+1 : (Rn )2 → R by
n0

1 X
Σ̃ (x, x ) = 0
xi x0i
n i=1
0

0 def

def

l 2 l−1
Σl = (σw
) Σ̃
+ (σbl )2
def

Σ̃l = Σ̃l−1 + (σVl )2 Vφ(Σl ) + σa2
def

L+1 2 L
ΣL+1 = (σw
) Σ .
0

Then for any finite subset X ⊆ Rn , for α-controlled φ,
d

f (X ; θ) −
→ N (0, ΣL+1 |X ).
33

Convolutional Network (Xiao et al., 2018) Consider a convolutional network
def

x0αi (x) = xαi
def 1
hlαi (x) = √
nl

X

l
l
Wβij
xl−1
α+β,j (x) + bi

j∈[nl−1 ]
β∈[sl−1 ]

def

xlαi (x) = φ(hlαi (x))
where hlαi denotes the preactivation at the lth layer, the ith channel, each with sl neurons, and the αth neuron, and likewise
for xlαi . nl is the number of channels in layer l.
l
l 2 l
Suppose we have a non-negative vector (vβl )β∈ker that sums up to 1 and Wβij
∼ N (0, (σW
) vβ ), blβi ∼ N (0, (σbl )2 ). By
Pnl
def
Thm 4.3, {hlα• (xa )}α,a are “jointly Gaussian” in the limit. Define Σlαa,βb = lima.s. n1l i=1 hlαi (xa )hlβi (xb ), for any i.
Then with ? denoting 2D circular cross correlation, Xiao et al. (2018) calculated, semirigorously,
l 2
Σl+1 = (σW
) Diag(v l ) ? Vφ(Σl ) + (σbl )2
X
l 2
Σl+1
=
(σ
)
vγl Vφ(Σl )α+γ;a,β+γ;b + (σbl )2 .
W
αa,βb
γ∈[sl ]

These equations can now be recovered rigorously using Thm 4.3.
Now suppose the last layer (layer L) is linear with output,
1

def

f (x; θ) = √

X

nL−1 sL−1

L L−1
Wαi
xαi ∈ R

L−1

α∈[s
]
i∈[nL−1 ]

L
and the weights are sampled according to Wαi
∈ N (0, 1). Then, we can compute via Thm 4.3,



1
tr Vφ(ΣL−1 )•a,•a tr Vφ(ΣL−1 )•a,•b
d
(f (xa ; θ), f (xb ; θ)) −
→ N 0, L−1
.
tr Vφ(ΣL−1 )•a,•b tr Vφ(ΣL−1 )•b,•b
s
def

Define, via Thm 5.1, Πlαa,βb = lima.s.

Pnl

∂f
∂f
i=1 ∂xlαi (xa ) ∂xlβi (xb ), for any i. Then Xiao et al. (2018) essentially calculated,

semirigorously,
ΠL−1
αa,βb =

1
I(α = β).
sL−1

and in all previous layers, the recurrence
l 2
Πl−1 = (σw
) Diag(v l# ) ? (Vφ0 (Σl )

Πl )

where v l# is the reverse of v l . These equations can now be justified rigorously using Thm 5.1.


z−z̄√
Batchnorm (Yang et al., 2018) Given φ : R → R, let Bφ : RB → RB , z 7→ φ kz−z̄k/
. This is an application of
B
batchnorm followed by coordinatewise action by φ, where z should be thought of as a fixed unit across a batch of size B.
If ~x = (xi , . . . , xB ) is a batch of inputs xi ∈ Rn0 , then define a deep batchnorm network f (~x; θ) : RB×n0 → RB×1 by
def

~x0 (~x) = ~x
1
~hl (~x) def
= (√
W l xl−1 (~x)i + bl )B
i=1
l−1
n
def
~xl (~x) = Bφ (~hl (~x))

B
1
def
> L
f (~x; θ) = √ w x (~x)i
.
nL
i=1
34

l 2
L+1 2
Here B and n0 will be fixed and nl → ∞ for l > 0. We sample Wijl ∼ N (0, (σw
) ), wi ∼ N (0, (σw
) ) and
l
l 2
l
B×n0 2
B×B
bi ∼ N (0, (σb ) ). Define multivariate kernels Σ : (R
) →R
by
def

1 2
Σ1 (~x, ~x0 )ij = (σw
)

1 > 0
xi xi + (σb1 )2
n0

def

l 2
Σl |{~x,~x0 } = (σw
) VBφ (Σl−1 |{~x,~x0 } ) + (σbl )2
def

L+1 2
ΣL+1 |{~x,~x0 } = (σw
) VBφ (ΣL |{~x,~x0 } ).

0

Then for any finite set of batches X ⊆ RB×n , for α-controlled φ,
d

f (X ; θ) −
→ N (0, ΣL+1 |X ).
Yang et al. (2018) also calculated the gradient dynamics of such a deep batchnorm network, but our theorems cannot
rigorously justify them due to the singularity of the Jacobian of batchnorm.
D.6.2. A TASTE OF WEIGHT- TYING
Weight-tied Residual Network The simpliest “recurrent neural network” for understanding when weight-tying can have
a different behavior than not is perhaps in a residual network with weights tied across layers.
In this section, fix a matrix W ∈ RN ×N and a function φ : R → R. Consider the dynamics
ht = W φ(ht−1 ) + ht−1 , ht ∈ RN .
2
What is the “average behavior” of this dynamics as N → ∞, if we were to sample Wij ∼ N (0, σw
/N )? Thm 4.3 applies
t
here when φ is α-controlled, and it tells us that “(hi )i are i.i.d. samples of a zero-mean Gaussian distribution, in the limit
N → ∞,” as far as α-controlled test functions are concerned.

By Thm 4.3, we can make the following
def

Definition D.13. Define K(l, m) = lima.s. N1

P
def
a.s. 1 PN
l m
l
m
i=1 hi hi and C(l, m) = lim
i=1 hi
j Wij φ(hj ).
N

PN

Theorem D.14. K and C satisfy the following equations in the limit N → ∞.
K(l, m) = C(l, m − 1) + K(l, m − 1)

(6)

= C(m, l − 1) + K(m, l − 1)

(7)

2
= σw
Vφ(K l−1,m−1 )12 + K(l − 1, m − 1) + C(l − 1, m − 1) + C(m − 1, l − 1)
2
C(l, m) = C(l − 1, m) + σw
Vφ(K l−1,m )12



K(a, a) K(a, b)
a,b
where K is the matrix
.
K(a, b) K(b, b)
In addition, for all m, l ≥ 0, K(l, m) = K(m, l), K(0, m) = K(m, 0) = K(0, 0), C(0, m) = 0.
Proof. The identities at the end are obvious. We will focus on proving Eqs. (6) to (9). We have
a.s.

N

1 X l m
hh
N i=1 i i


N
X
a.s. 1 X

= lim
hl 
Wij φ(hm−1
) + hm−1
j
i
N i=1 i
j

K(l, m) = lim

a.s.

= lim

N
N
a.s. 1 X
1 X lX
hi
Wij φ(hm−1
) + lim
hli him−1
j
N i=1
N
j
i=1

= C(l, m − 1) + K(l, m − 1)
35

(8)
(9)

which gives Eq. (6) and also Eq. (7) by symmetry.
Now
a.s.

C(l, m) = lim
a.s.

= lim

N

1 X lX
h
Wij φ(hm
j )
N i=1 i j
N
N
X
a.s. 1 X
1 XX
m
Wik φ(hl−1
hl−1
Wij φ(hm
j )
i
k )Wij φ(hj ) + lim
N i=1
N i=1
j
j,k

a.s.

= lim
a.s.

= lim

N X
X

1
N i=1

j,k

N X
X

1
N i=1

m
Wik φ(hl−1
k )Wij φ(hj ) + C(l − 1, m)

m
Wij2 φ(hl−1
j )φ(hj ) + C(l − 1, m)

j

2
= σw
Vφ(K l−1,m )12 + C(l − 1, m)

yielding Eq. (9).
Finally, Eq. (8) is given by expanding C(l, m − 1) by Eq. (6) and expanding K(l, m − 1) by Eq. (7).

One can see immediately that the growth of hl norm is much faster here than for untied-weights residual network.
We now study the simultaneous evolution of two vectors hl and ~l .
PN
def
def
Definition
D.15. Define
Kh~ (l, m) = lima.s. N1 i=1 hli ~m
= K~h (m, l)
i
P
P
P
P
def
N
N
a.s. 1
a.s. 1
l
l
m
m
lim
i=1 hi
i=1 ~i
j Wij φ(~j ), C~h (l, m) = lim
j Wij φ(hj ).
N
N

and

Ch~ (l, m)

def

=

Theorem D.16.
Kh~ (l, m) = Ch~ (l, m − 1) + Kh~ (l, m − 1)

(10)

= C~h (m, l − 1) + K~h (m, l − 1)

(11)

l−1,m−1
2
= σw
Vφ(Kh~
)12 + Kh~ (l − 1, m − 1) + Ch~ (l − 1, m − 1) + C~h (m − 1, l − 1)
l−1,m
2
Ch~ (l, m) = Ch~ (l − 1, m) + σw
Vφ(Kh~
)12

l−1,m
where Kh~
is the matrix




Khh (l − 1, l − 1) Kh~ (l − 1, m)
.
Kh~ (l − 1, m)
K~~ (m, m)

Proof.
a.s.

N

1 X l m
h~
N i=1 i i


N
X
a.s. 1 X

= lim
hl 
Wij φ(~m−1
) + ~m−1
j
i
N i=1 i
j

Kh~ (l, m) = lim

a.s.

= lim

N
N
a.s. 1 X
1 X lX
hi
Wij φ(~jm−1 ) + lim
hli ~m−1
i
N i=1
N
j
i=1

= Ch~ (l, m − 1) + Kh~ (l, m − 1)
36

(12)
(13)

a.s.

Ch~ (l, m) = lim
a.s.

= lim

N

1 X lX
h
Wij φ(~m
j )
N i=1 i j
N
N
X
a.s. 1 X
1 XX
m
Wik φ(hl−1
hl−1
Wij φ(~m
j )
i
k )Wij φ(~j ) + lim
N i=1
N i=1
j
j,k

l−1,m
2
= σw
Vφ(Kh~
)12 + Ch~ (l − 1, m)

Now for the backward pass. Define ht := ∇ht E, gt := W T ht for a loss function E. Then
ht−1 = ht + (W T ht ) ◦ φ0 (ht−1 )
So
a.s.

lim
a.s.

lim

N
N
1 X s t a.s. 1 X s+1 t
hi hi = lim
h hi + gis+1 φ0 (hsi )hti
N i=1
N i=1 i
N
N
1 X t s a.s. 1 X X
Wji htj Wj 0 i htj 0
gi gi = lim
N i=1
N i=1 0
j,j

a.s.

2
= σw
lim
a.s.

lim

N

1 X t t
h h
N i=1 k k

N
N
a.s. 1 X
1 X t s 0 r
hi gi φ (hi ) = lim
ht+1 gis φ0 (hri ) + git+1 gis φ0 (hti )φ0 (hri )
N i=1
N i=1 i
a.s.

N

1 X t+1 s 0 r
2
h gi φ (hi ) + σw
= lim
N i=1 i

a.s.

N

1 X t+1 s
lim
h hi
N i=1 i

!

!
N
1 X 0 t 0 r
lim
φ (hi )φ (hi )
N i=1
a.s.

Suppose we backprop a zero mean Gaussian vector with normalized norm 1. For a weight-tied residual network that runs S
steps, we have boundary conditions
N

a.s.

1 X S S
h h =1
lim
N i=1 i i
a.s.

lim
a.s.

lim

N

1 X S+1 t
h
hi = 0, ∀t
N i=1 i
N

1 X S s 0 r
h g φ (hi ) = 0, ∀s, r
N i=1 i i

These equations then yield the dynamics of gradients in a weight-tied residual network.
D.7. Neural Tangent Kernel
Again, let F (z; θ) be the body
network
suppose it’s represented by a tensor program π. For every
P of a neural
P as above, and
∂F
∂F
input A-var A of π, ∂F
=
⊗
h
+
h
⊗
>
g:=Ah
g:=A
h
∂A
∂g
∂g , where the sums are over vars satisfying the subscripts in
the sums. If the network has scalar output is given by f (x) = v > F (E(x); θ) where E is an embedding function, then the
37

contribution of A to the NTK of f is
X X
X
∂F
∂F
def
NTKA (x, y) =
(v >
(E(x)))i (v >
(E(y)))i
hj (E(x))hj (E(y))
∂g
∂g
i
j
g:=Ah

X X

+

g:=A> h

hi (E(x))hi (E(y))

X

i

(v >

j

∂F
∂F
(E(x)))j (v >
(E(y)))j .
∂g
∂g

(14)

Each of the four subsums in Eq. (14) can be computed via Thm 6.3 (or Thm 5.1 if π doesn’t use T lines) when we expand
the computation of f over x and y as well as its gradients into a single tensor program. Note that Eq. (14) scales like (nl )2 ;
dividing by this factor roughly corresponds to using the parametrization of Jacot et al. (2018). The contribution to NTK
from input G-vars is similar and even simpler to compute.
The above computation would hold as long as we can apply Thm 6.3, which requires that we have almost sure rank
convergence of the relevant programs and that the nonlinearities of f have polynomially bounded weak derivatives.
We give an example by computing the NTK of a CNN (which has not appeared in prior literature).
CNN

Assume the notation of the CNN section of Appendix D.6.1.

l
The contribution to the NTK of weights Wβij
for l < L is
l

a.s.

lim

l−1

,n
X nX

∂f
∂f
(xa )
(xb )
l
l
∂Wβij
∂Wβij
β∈ker i,j=1
l

a.s.

= lim

l−1

,n
X nX

1
nl−1

β∈ker i,j=1
l

l−1

,n
X nX
1
= l l−1
nn
i,j=1

=

X ∂f
X ∂f
l−1
(x
)x
(x
))(
(xb )xl−1
a
a
α+β,j
α0 +β,j (xb ))
l
l
∂h
∂h
0i
0
αi
α
α
α

2k+1
X

Πlαa,α0 b Vφ(Σl )αa,α0 b Vφ0 (Σl−1 )α+β;a,α0 +β;b

α,α0 =1

β∈ker

2k+1
X

(

Πlαa,α0 b Vφ(Σl )αa,α0 b

α,α0 =1

= hΠl•a,•b

X

Vφ0 (Σl−1 )α+β;a,α0 +β;b

β∈ker

Vφ(Σl•a,•b ), I ? Vφ0 (Σl−1
•a,•b )i

l
l 2
l
Note that if we sample Wβij
∼ N (0, (σw
) ) and replace Wβij
with

q

l
vβl Wβij
, then in the above expression we replace I

with Diag(v l ).
Similarly, the contribution of bli for l < L is
nl
a.s. X ∂f

lim

∂bli
i=1

nl
a.s. X X

= lim

(

i=1

=

X

α

(xa )

∂f
(xb )
∂bli

X ∂f
∂f
(xa ))(
(xb ))
l
∂hαi
∂hlα0 i
α0

Πlαa,α0 b Vφ0 (Σl )αa,α0 b

α,α0

= h11T , Πl•a,•b

Vφ0 (Σl )•a,•b i

= hΠl•a,•b , Vφ0 (Σl )•a,•b i
The last layer weights (in the linear layer setting) contribute
X
a.s.
1
1
L−1
L−1
xL−1
)•a,•b .
lim L−1 L−1
αi (xa )xαi (xb ) = L−1 tr Vφ(Σ
n
s
s
α,i
38

Therefore
Corollary D.17. The NTK of the CNN defined above converges almost surely to
a.s.

NTK(xa , xb ) −−→

1
sL−1

tr Vφ(ΣL−1 )•a,•b +

X

hΠl•a,•b

l
0
l
Vφ(Σl•a,•b ), I ? Vφ0 (Σl−1
•a,•b )i + hΠ•a,•b , Vφ (Σ )•a,•b i

l<L

as long as φ has a polynomially bounded weak derivative.
D.8. Approximate Message Passing
We follow Bayati & Montanari (2011); Berthier et al. (2017) for a brief introduction to Approximate Message Passing.
Given an n × N matrix A, the compressed sensing problem asks for a way to reconstruct a (sparse) vector x0 ∈ RN from a
(small) vector of linear observations y = Ax0 + w ∈ Rn . Here w is a noise vector and A is assumed to be known. The
Approximate Message Passing algorithm (Donoho et al., 2009) starts with an initial guess x0 = 0 and proceed by
xt+1 = ηt (A> z t + xt ),
z t = y − Axt + αt z t−1
PN 0
for an appropriate sequence of nonlinearities {ηt : R → R}t≥0 and αt = n1 i=1 ηt−1
((A> z t−1 + xt−1 )i ) ∈ R. The
t
algorithm succeeds if x converges to a good approximation of x0 . Similar algorithms have been applied to robust regression
(Donoho & Montanari, 2016), Bayesian estimation (Kamilov et al., 2012), low rank matrix recovery (Kabashima et al.,
2016), phase retrieval (Schniter & Rangan, 2015), and community detection in graphs (Deshpande et al., 2017).
The behavior of the AMP algorithm is accurately described by a formalism called “stated evolution” (SE), as n, N → ∞
with constant ratio n/N → δ ∈ (0, ∞), that bears some resemblance to the evolution of kernels in the GP correspondence
of deep neural networks (see Section 2.1) and to the gradient dynamical equations in the signal propagation analysis of
DNNs (see Section 2.2). SE was introduced in Donoho et al. (2009) and later suitably formalized and rigorously proved for
random Gaussian A and suitably smooth ηt in Bayati & Montanari (2011). A more general version of the algorithm where
ηt : RN → RN (instead of acting coordinatewise) was analyzed and a similar SE equations proved in Berthier et al. (2017).
As a corollary to one of our main theorems Thm 6.3, we show that, in the main theorem of Bayati & Montanari (2011), we
can forgo smoothness assumptions on ηt when each component of x0 is sampled iid from a Gaussian. We’ll work with the
following more general version of AMP from Bayati & Montanari (2011). The algorithm is defined by two sequences of
functions {ft : R2 → R}t≥0 , {gt : R2 → R}t≥0 . Given w ∈ Rn , x0 ∈ RN , define the sequence of vectors ht , q t ∈ RN
and z t , mt ∈ Rn , by fixing the initial condition q 0 , and obtaining {bt }t≥0 , {mt }t≥0 , {ht }t≥1 , and {q t }t≥1 through
ht+1 = A> mt − ξt q t ,

mt = gt (bt , w),

bt = Aq t − λt mt−1 ,

q t = ft (ht , x0 ),

where ξt = N1σ2 hbt , gt (bt , w)i and λt = nτ12 hht , ft (ht , x0 )i, 11 and σt and τt are defined via
t

def

τt2 = E gt (σt (Z, W ))2 ,

t−1

def N

σt2 =

n

E ft (τt−1 Z, X0 )2 ,

2
where Z ∼ N (0, 1), W ∼ N (0, σw
), X0 ∼ N (0, σx20 )

2
for sampling hyperparameters σw
, σx20 .

By translating the above computation into a tensor program and applying Thm 6.3, we obtain
Corollary D.18. Let {q0 (N )}N ≥0 and {A(N )}N ≥0 be resp. a sequence of initial conditions and a sequence of matrices
A ∈ Rn×N indexed by N with iid entries Aij ∼ N (0, 1/n). Assume n/N → δ ∈ (0, ∞). Consider the sequence of
2
vectors {x0 (N ), w(N )}N ≥0 whose empirical distributions converge weakly to N (0, σx20 ) and N (0, σw
). Suppose that the
functions ft and gt are polynomially bounded for all t. Then for any polynomially bounded function ψ : R2 → R and all
11
Note that here we are using h, i to denote (unscaled) inner product, which is different from the usage of this notation in Bayati &
Montanari (2011).

39

t ≥ 0,
N

1 X
a.s.
ψ(ht+1
, x0,i ) −−→ E ψ(τt Z, X),
i
N i=1
n

1X
a.s.
ψ(bti , wi ) −−→ E ψ(σt Z, W ),
n i=1
2
as N → ∞, where X0 ∼ N (0, σx20 ) and W ∼ N (0, σw
) independent of Z ∼ N (0, 1).

This version differs from theorem 2 of Bayati & Montanari (2011) in the following ways
PN
Pn
1. Bayati & Montanari (2011) defined ξt = N1 i=1 gt0 (bti , wi ) and λt = n1 i=1 ft0 (hti , x0,i ), where the derivatives are
taken against the first argument. This is asymptotically equivalent to our formulation here by Stein’s lemma Lem E.8.
Our formulation has the benefit of being defined for gt and ft without weak derivatives.
2. We are requiring that the x0 and w have empirical distributions that converge to Gaussians; with a bit more effort,
we can also prove a result that allow them to converge to any distribution with all moments. This is a much stronger
assumption than Bayati & Montanari (2011), who only assume that the limit distributions have some finite number of
bounded moments.
3. We don’t have any smoothness assumptions on the nonlinearities ft and gt , whereas Bayati & Montanari (2011)
requires them to be Lipschitz.
4. We don’t have any smoothness assumptions on the test function ψ, whereas Bayati & Montanari (2011) requires them
to be pseudo-Lipschitz of some order 12 .
This concludes our discussion of various corollaries of our main theorems. We now turn to their proofs. First let us present
the necessary lemmas.

E. Lemmas
E.1. The Conditioning Trick
We first recall Moore-Penrose pseudoinverse and some properties of it.
Definition E.1. For A ∈ Rn×m , a pseudoinverse of A is defined as a matrix A+ ∈ Rm×n that satisfies all of the following
criteria
• AA+ A = A
• A+ AA+ = A+
• (AA+ )> = AA+
• (A+ A)> = A+ A
The following facts are standard
• if A has real entries, then so does A+ .
• The pseudoinverse always exists and is unique.
• When A is invertible, A+ = A−1 .
• (A> )+ = (A+ )> , which we denote as A+> .
12
A function f : Rs → R is pseudo-Lipschitz of order k if there is a universal constant C s.t. |f (x) − f (y)| ≤ C(1 + |f (x)|k−1 +
|f (y)|k−1 )kx − yk. Note that this implies f is bounded by a polynomial of degree k

40

• A+ = (A> A)+ A> = A> (AA> )+ .
• AA+ is the orthogonal projector to the column space of A; I − A+ A is the orthogonal project to the null space of A.
• if A has singular value decomposition A = U ΛV where U and V are orthogonal and Λ has the singular values on its
diagonal, then A+ = V > Λ+ U > where Λ+ inverts all nonzero entries of Λ.
Pn
• For any collection of vectors {vi }ni=1 in a Hilbert space, w 7→ i,j=1 vi (Σ+ )ij hvj , wi, where Σij = hvi , vj i, is the
projection operator to the linear span of {vi }ni=1 .
We present a slightly more general versions of lemmas from Bayati & Montanari (2011) that deal with singular matrices.
Lemma E.2. Let z ∈ Rn be a random vector with i.i.d. N (0, v 2 ) entries and let D ∈ Rm×n be a linear operator. Then for
any constant vector b ∈ Rn the distribution of z conditioned on Dz = b satisfies:
d

z =Dz=b D+ b + Πz̃
where D+ is the (Moore-Penrose) pseudoinverse, Π is the orthogonal projection onto subspace {z : Dz = 0}, and z̃ is a
random vector of i.i.d. N (0, v 2 ).
Proof. When D = [Im×m |0m×n−m ], this claim is immediate. By rotational symmetry, this shows that, for any vector space
V and v orthogonal to it, conditioning z on V + v yields a Gaussian centered on v with covariance determined by ΠV z. Then
the lemma in the general case is implied by noting that {z : Dz = b} can be decomposed as {z : Dz = 0} + D+ b.
Lemma E.3. Let A ∈ Rn×m be a matrix with random Gaussian entries, Aij ∼ N (0, σ 2 ). Consider fixed matrices
Q ∈ Rm×q , Y ∈ Rn×q , P ∈ Rn×p , X ∈ Rm×p . Suppose there exists a solution in A to the equations Y = AQ and
X = A> P . Then the distribution of A conditioned on Y = AQ and X = A> P is
d

⊥
A =Y =AQ,X=A> P E + Π⊥
P ÃΠQ

where
E = Y Q+ + P +> X > − P +> P > Y Q+ ,
+
⊥
+
+
+
Ã is an iid copy of A, and Π⊥
P = I −ΠP = P P and ΠQ = I −ΠQ = QQ in which ΠP = I −P P and ΠQ = I −QQ
are the orthogonal projection to the space spanned by the column spaces of P and Q respectively.

Proof. We apply Lem E.2 to D : A 7→ (AQ, P > A). The pseudoinverse of D applied to (Y, X > ) can be formulated as the
unique solution of

argmin kAk2F : AQ = Y, P > A = X >
A

where k − kF denotes Frobenius norm. We check that E is a 1) a solution to AQ = Y, P > A = X > and 2) the minimal
norm solution.
We have EQ = Y Q+ Q + P +> X > Q − P +> P > Y Q+ Q. Note that Y Q+ Q = Y because Y = AQ =⇒ Y Q+ Q =
AQQ+ Q = AQ = Y . So EQ = Y + P +T (X > Q − P > Y ). But X > Q = P > AQ = P > Y , so EQ = Y as desired. A
similar, but easier reasoning, gives P > E = X > . This verifies that E is a solution.
To check that E is minimal norm, we show that it satisfies the stationarity of the Lagrangian
L(A, Θ, Γ) = kAk2F + hΘ, Y − AQi + hΓ, X − A> P i.
∂L
So ∂A
= 0 =⇒ 2A = ΘQ> + P Γ> for some choices of Θ ∈ Rn×q and Γ ∈ Rm×p . For Θ = 2Y (Q> Q)+ and
>
Γ = 2(P > P )+ [X > − P > Y Q> ], we can check that

ΘQ> + P Γ> = 2Y (Q> Q)+ Q> + 2P (P > P )+ [X > − P > Y Q+ ]
= 2Y Q+ + 2P +> X > − 2P +> P > Y Q+
= 2E
as desired.
41

E.2. Probability Facts
Theorem E.4 (Strong Law of Large Numbers for triangular arrays (Hu & L. Taylor, 1997)). Let {Xn,i : 1 ≤ i ≤ n, n ≥ 1}
be a triangular
independent with mean equal to zero for each n
Pn array of random variables with (Xn,1 , . . . , Xn,n ) mutuallyP
n
and n−1 i=1 E |Xn,i |2+ρ ≤ cnρ/2 for some 0 < ρ < 1, c < ∞. Then n1 i=1 Xi,n → 0 almost surely as n → ∞.
Lemma E.5. Let {Xn }n≥1 be a sequence of random variables with zero mean. If for some p ∈ N and for all n,
E Xn2p ≤ cn−1−ρ , for some ρ > 0, then Xn → 0 almost surely.
Proof. By Markov’s inequality, for any  > 0,

X

Pr(|Xn | > ) = Pr(Xn2p > 2p ) ≤ E Xn2p /2p ≤ cn−1−ρ /2p
X
Pr(|Xn | > ) ≤
cn−1−ρ /2p < ∞.

n

n

By Borel-Cantelli Lemma, almost surely, |Xn | ≤  for all large n. Then, if we pick a sequence {k > 0}k converging to 0,
we have that, almost surely, for each k, |Xn | ≤ k for large enough n — i.e. almost surely, Xn → 0.
The following is a standard fact about multivariate Gaussian conditioning
n1 +n2
n1
n2
Proposition E.6. Suppose
 R
3 x ∼ N (µ, K), where we partition x = (x1 , x2 ) ∈ R × R , µ = (µ1 , µ2 ) ∈
K11 K12
d
Rn1 × Rn2 , and K =
. Then x1 =x2 N (µ|x2 , K|x2 ) where
K21 K22
+
µ|x2 = µ1 − K12 K22
(x2 − µ2 )
+
K|x2 = K11 − K12 K22
K21 .

Lemma E.7. Let Φ : Rn → R be measurable. Then for z ∼ N (ζ, Σ),
d
d2
E Φ(z)
E Φ(z) = 2
dζ 2
dΣ
whenever both sides exist.
Proof. First assume Σ is invertible. We check
−1
1
d − 1 (ζ−z)Σ−1 (ζ−z)
e 2
= −Σ−1 (ζ − z)e− 2 (ζ−z)Σ (ζ−z)
dζ
 1
−1
d2 − 1 (ζ−z)Σ−1 (ζ−z)  −1
e 2
= −Σ + Σ−1 (ζ − z)(ζ − z)> Σ−1 e− 2 (ζ−z)Σ (ζ−z)
2
dζ
−1
−1
1
 − 21 (ζ−z)Σ (ζ−z)
d e− 2 (ζ−z)Σ (ζ−z)
1
−1
−1
> −1 e
−Σ
+
Σ
(ζ
−
z)(ζ
−
z)
Σ
=
dΣ det(2πΣ)1/2
2
det(2πΣ)1/2
1 d2 − 1 (ζ−z)Σ−1 (ζ−z)
.
=
e 2
2 dζ 2

Integrating against Φ gives the result. For general Σ, apply a continuity argument, since the set of invertible Σs is dense
inside the set of all PSD Σ.
Lemma E.8 (Stein’s lemma). For jointly Gaussian random variables Z1 , Z2 with zero mean, and any function φ : R → R
where E φ0 (Z1 ) and E Z1 φ(Z2 ) exists, we have
E Z1 φ(Z2 ) = Cov(Z1 , Z2 ) E φ0 (Z2 ).
42

E.3. α-controlled functions
The next lemma is easy to show using the equivalence of norms in finite dimensional Euclidean space.
Lemma E.9. Let φ : Rk → R. The following are equivalent
1. φ is α-controlled
α

Ckxkp +g(x)
2. For some p ≥ 1 and some g(x) = okxkp →∞ (kxkα
p ), C, c > 0, |φ(x)| ≤ e
α

3. For all p ≥ 1, there is some C, c > 0, |φ(x)| ≤ eCkxkp +c
α

Lemma E.10. Let Ckα : R≥0 → R, c 7→ Ez∼N (0,Ik ) eckzk2 . Then
1. Ckα < ∞ iff α < 2
2. for α ≥ 1,
α

E

z∼N (µ,Σ)

α

α/2

eCkzk2 ≤ eCkµk2 Ckα (CαkΣk2 )

where kΣk2 denotes the spectral norm of Σ.
3. for any α-controlled φ : Rk → R with α ≥ 1, there is C > 0 such that for all µ ∈ Rk , Σ ∈ PSDk ,
α

E

z∼N (µ,Σ)

α/2

|φ(z)| ≤ CeCkµk2 Ckα (CαkΣk2 )

where kΣk2 denotes the spectral norm of Σ.
Note that the RHS is a montonic function in kµk2 and kΣk2 , in the sense that if kµk2 and kΣk2 don’t decrease, then the
RHS will not decrease either.
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

=e

Ckµkα
2

α/2

Ckα (CαkΣk2 ).

E.4. Hermite Polynomials
We follow a presentation roughly given by O’Donnell (2014).
1 2

Definition
E.11. Let Hen (x) be the probabilist’s Hermite polynomial, given by the generating function ext− 2 t =
P∞
tn
2
n=0 Hen (x) n! . Let L (R; N (0, 1)) be the space of square-integrable functions against the standard Gaussian measure,
equipped with inner product hφ, ψiG = Ex∼N (0,1) φ(x)ψ(x) and norm kφk2G = hφ, φiG . Let Hn (x) = Hen (x)/kHen kG
be the normalized versions.
Fact E.12. {Hen (x)}n≥0 form an orthogonal basis for L2 (R; N (0, 1)) and {Hn (x)}n≥0 form an orthonormal basis for
L2 (R; N (0, 1)).
√
Fact E.13. kHen k2G = n! so that Hn (x) = Hen (x)/ n!.
43

Suppose u1 , . . . , uk are unit vectors in Rk , and let ρij := hui , uj i. Construct a zero mean Gaussian vector z = (z1 , . . . , zk )
d

such that E zi zj = ρij . Note that z = U g where g = (g1 , . . . , gk ) is a standard Gaussian vector and U = (uij )ki,j=1 is the
matrix with ui as rows. Then for any s = (s1 , . . . , sk ) we can compute
E exp(hs, zi) = E exp(s> U g) = E

Y

exp(gi (U > s)i )

i

=

Y

>

E exp(gi (U s)i )

i

by independence of {gi }i

1 > 2
=
exp
(U s)i
2
i
!
1X > 2
= exp
(U s)i
2 i


1 > 2
= exp
kU sk
2


X
1
hui , uj isi sj 
= exp 
2 i,j


X
1
= exp 
ρij si sj  .
2 i,j
Y

Dividing by exp

1
2

2
i si

P





, we obtain


!
X

E exp

si zi − s2i

= exp 

i

E

YX
i

X
(mi )k
i=1

ρij si sj 

i<j

Hem (zi )(m!)−1 sm
i =

m

YX
n
(n!)−1 (ρij si sj )
i<j n

Y smi
i
i


X

mi !

E

Y

X

Hemi (zi ) =

i

(n(ij) )i<j

Y P n(ij) Y ρnij(ij)
si j6=i
n !
i<j (ij)
i

where mi ≥ 0 for all i, and n(ij) = n(ji) ≥ 0 are indexed by unordered sets {i, j}. Matching coefficients of s, we get
Theorem E.14. For any sequence (mi ≥ 0)ki=1 ,
!
E

Y

Hemi (zi ) =

i

E

Y
i

Hmi (zi ) =

Y

mr ! 

Y ρnij(ij)




n
!
(ij)
r
i<j

!
Yp
Y ρnij(ij)

mr ! 
n
!
(ij)
r
i<j

whenever there are (n(ij) ≥ 0)i<j such that, for all i, mi =

P

j6=i n(ij) . E

Q

i Hemi (zi ) = 0 otherwise.

In particular,
Theorem E.15. If φi : R → R has Hermite expansion φi (z) =
44

P∞

u=0 aiu Hu (z) =

P∞

u=0 biu Heu (z) where biu

=

√
aiu / u!, then
!
E

Y

X

φi (zi ) =

i

Y

(n(ij) )i<j

X

=

(n(ij) )i<j

X

=

(n(ij) )i<j

where mi =

brmr mr ! 

Y ρnij(ij)




n
!
(ij)
r
i<j

!
Y
Y ρnij(ij)
p

armr mr ! 
n
!
(ij)
r
i<j


s
! Y
Y
mi
n(ij)
 ρij 
armr
{n
}
j6
=
i
(ij)
r
i<j

P

j6=i n(ij) , whenever the RHS is absolutely convergent.

Lemma E.16. Suppose φi , i ∈ [k] are as in Thm E.15, with additionally the constraint that we have an index set I ⊆ [k]
such that bi0 = ai0 = 0 (i.e. E φi (zi ) = 0) for all i ∈ I. Assume that, for some λ < 1/2, |ρij | ≤ λ/(k − 1) for all i 6= j.
Then
!
k
k
Y
Y
E
φi (zi ) ≤ Ck,|I|
kφr kG λd|I|/2e
r=1

i=1

for some constant Ck,|I| depending on k and |I| but independent of {φi }i and λ.
Proof. In the notation of Thm E.15,

E

k
Y

mi
{n(ij) }j6=i

≤ (k − 1)mi by the multinomial theorem. Thus

X

φi (zi ) ≤

i=1



(n(ij) )i<j :
∀r∈I,mr ≥1

X

≤

(n(ij) )i<j :
∀r∈I,mr ≥1

X

≤

(n(ij) )i<j :
∀r∈I,mr ≥1
k
Y

=

k
Y

armr

r=1
k
Y

mr
{n(rj) }j6=r

k
Y

!


Y n(ij)
 ρij 


i<j

!


Y  λ n(ij)


k
−
1
i<j

p
kφr kG (k − 1)mr

r=1

!
kφr kG

λ

P

i<j n(ij)

r=1

!
kφr kG

s




B|I| λd|I|/2e (1 + o(1)) .

r=1

where BV is the number of ways to cover V vertices with dV /2e edges, and o(1) is a term that goes to 0 as λ → 0 and
is bounded above by a function of k whenever λ < 1/2. Then an appropriate Ck,|I| can be chosen to obtain the desired
result.
Lemma E.17. Suppose φi , i ∈ [k] are as in Thm E.15, with additionally the constraint that, we have some index √
set
I ⊆ [3, k] such that for all i ∈ I, bi0 = ai0 = 0 (i.e. E φi (zi ) = 0). Assume that |ρ12 | ≤ 1/2, for some λ < 1/ 8,
|ρij | ≤ λ/(k − 1) for all i 6= j and {i, j} 6= {1, 2}. Then

E

k
Y

φi (zi )

0
≤ Ck,|I|

k
Y

!
kφr kG

λd|I|/2e

r=1

i=1

for some constant Ck0 depending on k and I but independent of {φi }i and λ.
45

Proof. Define P = {(i, j) : 1 6= i < j 6= 2} and Q = {(i, j) : i < j
Qk
R = r=1 kφr kG . As in the above proof,
|E

k
Y

φi (zi )| ≤

i=1

k
Y

X

≤

(n(ij) )i<j :
∀r∈I,mr ≥1

(n(ij) )i<j :
∀r∈I,mr ≥1

X

=R

(n(ij) )i<j :
∀r∈I,mr ≥1

X

≤R

(n(ij) )i<j :
∀r∈I,mr ≥1

X

≤R

armr

!



(i = 1 XOR j = 2)}. Also write


Y



n
ρij(ij)  2−n(12)

(i,j)∈P

v


u 2 
k p
u Y mr  mr − n(12)  Y
Y  λ n(ij)
 2−n(12)
Rt
(k − 1)mr 
n
k
−
1
{n
}
(12)
(rj)
j6
∈
{1,2}
r=1
r=3

X

≤R

mr
{n(rj) }j6=r

r=1

(n(ij) )i<j :
∀r∈I,mr ≥1

X

s

&

(n(ij) )i<j :
∀r∈I,mr ≥1

(i,j)∈P

v
u 2 
Pi<j n(ij) −n(12)

u Y mr 
Pk
1
λ
m
t
2−n(12)
(k − 1)mr −n(12) (k − 1) 2 r=3 r
k
−
1
n
(12)
r=1
v
u 2 
u Y mr  P
t
λ i<j n(ij) −n(12) 2−n(12)
n
(12)
r=1
 m1 +m2 
P
2
2−n(12) λ i<j n(ij) −n(12)
n(12)



n(12) + 12 m(12) −n(12) Pi<j n(ij) −n(12)
2
λ
n(12)
X

where m(12) =

n(ij)

(i,j)∈Q

≤ 2R



X
(n(ij) )(i,j)∈P :
∀r∈I,mr ≥1

≤ 2R

X

1
1 − 1/2

1+ 12 m(12)

P

λ

(i,j)∈P n(ij)

P
√ P
( 2λ) (i,j)∈Q n(ij) λ (i,j)∈P\Q n(ij)

(n(ij) )(i,j)∈P :
∀r∈I,mr ≥1



≤ 2R 2|I|/4 B|I| λd|I|/2e (1 + o(1))
where B|I| is the number of ways of covering |I| vertices with d |I|
2 e edges, and o(1) is a term that goes to 0 as λ → 0 and is
√
0
upper bounded by a function of k for all λ < 1/ 8. Choosing the appropriate constant Ck,|I|
then gives the result.
E.5. Moment Bounds of Lightly Correlated Gaussians
Lemma E.18. Let Π ∈ Rn×n be an orthogonal projection matrix. Then each diagonal entry Πii ∈ [0, 1].
Proof. Because Π = Π2 , we have for each i, Πii =

2
j Πij

P

=⇒ Πii (1 − Πii ) =

2
j6=i Πij ≥ 0

P

=⇒ Πii ∈ [0, 1].
def

Lemma E.19. Let Π ∈ Rn×n be an orthogonal projection matrix of rank k. Consider
the correlation matrix C =
P
2
D−1/2 ΠD−1/2 where D = Diag(Π). Then the off-diagonal entries of C satisfy i<j Cij
≤ 2.5(n − k)2 , assuming
k ≥ n/2.
P
P
P
2
2
Proof. Because Π = Π2 , we have for each i, Πii = j Π2ij = j Πii Πjj Cij
=⇒ 1 − Πii = j6=i Πjj Cij
. At the same
2
2
time, each Cij ∈ [0, 1]. Thus we seek an upper bound on the following linear program in the n(n − 1)/2 variables C(ij)
46

(which identiy Cij = Cji = C(ij) ).

Maximize

X

2
C(ij)

i6=j

s.t. ∀i, 1 − Πii =

X

2
Πjj C(ij)

j6=i
2
∈ [0, 1].
∀i < j, C(ij)

This LP has the dual

Minimize

X

τij +

X

i<j

(1 − Πii )ζi

i

s.t. ∀i < j, τij + ζi Πjj + ζj Πii ≥ 1
∀i < j, τij ≥ 0
∀i, ζi ∈ R.

Any feasible value of the dual LP is an upper bound on the original LP. We now set the dual variables.
def

2

2

+n
WLOG, assume Π11 ≥ · · · ≥ Πnn . Then necessarily, 1 ≥ Πii ≥ nk for each i ∈ [k]. First define ρ = nk + nk = k nk
≥ 2.
2

Note that ρ − 2 = (n−k)
nk .

def

Dual variables for 1 ≤ i < j ≤ k. Now set ζi = ρΠ1ii for i ∈ [k]. Then for 1 ≤ i < j ≤ k,

def

τij = 1 − (ζi Πjj + ζj Πii )

1
−1
=1−
rij + rij
ρ

where rij = Πii /Πjj ≥ 1. Note that 1) τij is nonnegative: indeed, since r + r−1 is increasing in r for r ≥ 1, and
2
(n−k)2
−1
−1
rij ≤ r1k ≤ n/k, we have rij + rij
≤ ρ, so that τij ≥ 0; 2) τij ≤ (n−k)
n2 +k2 : rij + rij ≥ 2 so τij ≤ 1 − 2/ρ = n2 +k2 .



def
Π
ζj for j > k. Now set ζj = Π111 1 − 2Πjj11 for k < j ≤ n. Note that ζj ≥ 1/2.

τij for i ≤ k < j. Then for i ≤ k < j, set

def

τij = 1 − ζi Πjj − ζj Πii
Πjj
=1−
− ζj Πii .
ρΠii
47

Note that for Π11 = x ≥ y ≥ k/n,


Πjj
Πjj
+ ζj x −
+ ζj y
ρx
ρy
Πjj y − x
=
+ ζj (x − y)
ρ xy


−1 Πjj
= (x − y) ζj − (xy)
ρ




Πjj
−1
−1 Πjj
= (x − y) x
1−
− (xy)
2x
ρ


Πjj
Πjj
= (x − y)x−1 1 −
− y −1
2x
ρ


k/n
−1
−1 k/n
≥ (x − y)x
1−
− (k/n)
2x
ρ


1 1
≥ (x − y)x−1 1 − −
2 2

(15)

≥ 0.
Π

Thus for all i ≤ k < j, τ1j ≤ τij . Simultaneously, Eq. (15) also shows that ρxjj + ζj x −
ii
that τij − τ1j ≤ Π11Π−Π
≤ n−k
n . We check that τ1j ≥ 0:
11

Πjj
− ζj Π11
ρΠ11


Πjj
Πjj
=1−
− 1−
ρΠ11
2Π11


Πjj 1 1
=
−
Π11 2 ρ


Πjj 1 (n − k)2
∈ 0,
Π11 2ρ nk


(n − k)2
⊆ 0,
nk

τ1j = 1 −

n(n−k)
Combined with our deduction above, we get τij ≤ τ1j + n−k
= n−k
n ≤
nk
k .

τij for k < i < j. For k < i < j, we set
def

τij = 1 − (ζi Πjj + ζj Πii )





Πjj
Πii
Πii
Πjj
=1−
1−
+
1−
Π11
2Π11
Π11
2Π11


Πjj + Πii
Πjj Πii
=1−
−
Π11
Π211
(Π11 − Πjj )(Π11 − Πii )
=
Π211
∈ [0, 1].
48



Πjj
ρy + ζj y



≤ (x − y)x−1 , so

Summary of dual variables. In summary, we have
h
ni
def
∀1 ≤ i ≤ k, ζi = (ρΠii )−1 ∈ ρ−1 , ρ−1

 k

Πjj
1 n
def 1
∀k < i ≤ n, ζi =
1−
∈
,
Π11
2Π11
2 k


2
(n − k)
∀1 ≤ i < j ≤ k, τij ∈ 0, 2
n + k2


n−k
∀i ≤ k < j ≤ n, τij ∈ 0,
k
∀k < i < j ≤ n, τij ∈ [0, 1].
Objective value given by the dual variables. Now we compute
X
X
τij +
(1 − Πii )ζi
i<j

i


=


X
i<j≤k

+

X
i≤k<j

+

X

 τij +

k
X

+

i=1

k<i<j

!

n
X

(1 − Πii )ζi

i=k+1

n − k (n − k)(n − k − 1)
k(k − 1) (n − k)2
+ k(n − k)
+
2
n2 + k 2
k
2




1
1
1 n
< (n − k)2
+1+
+ (n − k)
+
4
2
ρ k




≤



n−k n
n
+ k
+ (n − k)
n kρ
k

≤ 2.5(n − k)2
assuming k ≥ n/2.

Lemma E.20. Let z ∼ N (0, Π) where Π ∈ Rn×n is an orthogonal projection matrix of rank k. Suppose φi : R → R for
each i has finite variance Var (φi (x) : x ∼ N (0, Πii )). Then
! 
X
n
X
5(n − k)2
√
Var
φi (zi ) ≤
+1
Var (φi (x) : x ∼ N (0, Πii )) .
2
i=1
i
In particular, if n − k = O(1), then Var (

Pn

i=1 φi (zi )) = Θ (

P

i Var (φi (x) : x ∼ N (0, Πii ))) .

Proof. Let C √= D−1/2 ΠD−1/2 , D = Diag(Π), be the correlation matrix of Π.
Ex∼N (0,1) [φi ( Πii x)]. Then
n
X

Var
z∼N (0,Π)

!
φi (zi )

=

E

z∼N (0,C)

i=1

=

E

z∼N (0,C)

n
X

√
Let ψi (y) = φi ( Πii y) −

!2
ψi (zi )

i=1

X

ψi (zi )ψj (zj ).

i,j

Expand ψi in the Hermite orthonormal basis,
ψi (x) = ai1 H1 (x) + ai2 H2 (x) + · · ·
where Hj (x) is the jth Hermite polynomial, normalized so that Ez∼N (0,1) Hj (z)2 = 1, (note that H0 (x) = 1 and does
def

not appear here because Ex∼N (0,1) ψi (x) = 0 by construction). For any locally integrable φ : R → R, let kφk2G =
49

Ez∼N (0,1) φ(z)2 , so that kψi k2G =
X
i<j

2
k aik = Var (φi (x) : x ∼ N (0, Πii )) . Then,

P

E

z∼N (0,C)

ψi (zi )ψj (zj ) =

∞
XX

k
aik ajk Cij

i<j k=1

≤

v


u
X
X
u
2k 
t
a2ik a2jk  
Cij

∞ u
X

i<j

k=1

v
u
∞
Xu
u1
t
≤
2

X


!2 
X
2

Cij
a2
ik

i<j

i

k=1

≤ 2−1/2

i<j

since |Cij | ≤ 1
!

∞
X

X

k=1

i

a2ik

(2.5(n − k)2 )
by Lem E.19

=
On the other hand,

P

2
i Ex∼N (0,1) ψi (x) =

2 X

5(n − k)
23/2

kψi k2G

i

2
i kψkG , so that

P

X
5(n − k)2
√
+1
kψi k2G
E
ψi (zi )ψj (zj ) ≤
z∼N (0,C)
2
i
i,j
X

5(n − k)2
√
+1
Var (φi (x) : x ∼ N (0, Πii )) .
=
2
i

X



Theorem E.21. Let z ∼ N (0, Π) where Π ∈ Rn×n is an orthogonal projection matrix of rank n − O(1), where O(1)
denotes a quantity that stays bounded as n → ∞. Suppose φi : R → R for each i ∈ [n] has finite centered moments
Pn
def
Ex [(φi (x) − Ex0 φi (x0 ))r ], for x, x0 ∼ N (0, Πii ), for all r ≤ 2p, where p ≥ 6. Then for Q = n1 i=1 φi (zi ), as n → ∞,



2p
2p
−1.5
0
0
E[(Q − E Q) ] ≤ O n
max E φi (x) − E0 φi (x )
: x, x ∼ N (0, Πii ) .
i∈[n] x

x

If in addition, each φi has finite centered moments up to r ≤ 2pL for some L > 1, then
v


u n 

2pL
X
u
1
t
E[(Q − E Q)2p ] ≤ O n−1.5+1/L L
E φi (x) − E0 φi (x0 )
: x, x0 ∼ N (0, Πii )  .
x
n i=1 x
Here O(−) hides constants that do not depend on n, any of the functions φi , or Π.
Proof. Let C √= D−1/2 ΠD−1/2 , D = Diag(Π), be the correlation matrix of Π.
Ex∼N (0,1) [φi ( Πii x)].

√
Let ψi (y) = φi ( Πii y) −

Order the off-diagonal entries of the correlation matrix in the order of decreasing squared value:
2
2
2
C(ij)
(1) ≥ C(ij)(2) ≥ . . . ≥ C(ij)(N ) ,


P 2
where N = n2 , and (ij)(t) = (it j t ) are unordered pairs of distinct indices it 6= j t . Since t C(ij)
t ≤ R for some constant
√
R, by Lem E.19, we deduce that |C(ij)t | ≤ n−1/4 for all t > R n.
50

2p
Pn
P
Q2p
= E n−2p σ:[2p]→[n] a=1 ψσ(a) (yσ(a) ), where y ∼
Consider the (2p)th centered moment E n1 i=1 ψi (yi )
N (0, C). We shall bound the sum to show that this moment is not too large.
First note the naive bound via AM-GM,
E

2p
Y

2p

ψσ(a) (yσ(a) ) ≤ E

a=1

1 X
ψσ(a) (yσ(a) )2p
2p a=1

≤ max

[ψi (y)2p ]

E

i∈[n] y∼N (0,1)

= max E[(φi (zi ) − E φi (zi ))2p : zi ∼ N (0, Πii )]
i∈[n]

def

= B2p .

(16)

P
1/L
m
L
Now, for any collection of numbers {xi ∈ R}m
and
any
L
>
0,
we
have
the
trivial
bound
max
|x
|
≤
|x
|
,
i
i
j
i=1
j=1
q P
def
n
and this bound is tighter the larger L is. Thus B2p ≤ n1/L L n1 i=1 (E[ψi (y)2p ])L ≤ n1/L B2p,L , where B2p,L =
q P
n
L 1
2pL ], for any L.
i=1 E[ψi (y)
n
P
Q2p
We can categorize the n2p terms of E σ:[2p]→[n] a=1 ψσ(a) (yσ(a) ) as follows. Here we use O(−) to hide any constant
not depending on n or the functions ψi .
• Suppose σ is injective.
Q2p
√
t
– Suppose
for
each
a
=
6
b,
(σ(a)σ(b))
=
(ij)
for
some
t
>
R
n.
By
Lem
E.16,
E
a=1 ψσ(a) (yσ(a) ) ≤
Q


2p
−1/4 p
C
n
for some constant C independent of {ψr }r and n. Thus the contribution of all
r=1 kψσ(r) kG
such σ to the sum is at most

!
!2p 
2p
n
X
Y
X
.
C
kψσ(r) kG n−p/4 ≤ O n−p/4
kψσ(r) kG
σ

r=1

i=1

 √
√
R n · n2p−2 =
– Suppose for some a, b ∈ [2p], (σ(a)σ(b)) = (ij)t for t ≤ R n. There are at most 2 2p
2

√
O(n2p−1.5 ) such σ (indeed, there are R n of choosing such a t, 2 2p
2 ways of choosing their preimages under σ
out of 2p, and ≤ n2p−2 ways of choosing the rest of the values of σ). By Eq. (16), the contribution of all such σ
to the sum is at most O(n2p−1.5 B2p ).
• Suppose for some a∗ 6= b∗ in [2p], σ(a∗ ) = σ(b∗ ), but σ|[n]\{a∗ ,b∗ } is injective and takes range outside {σ(a∗ )}. There
 n−1 
2p−1
are 2p
) such σ.
2 n 2p−2 = O(n
√
– Suppose for each a 6= b, (σ(a)σ(b)) = (ij)t for some t > R n, so that |Cσ(a)σ(b) | ≤ n−1/4 . We apply Lem E.16
2
2
to the functions {ψσ(a
∗ ) } ∪ {ψσ(a) }a6∈{a∗ ,b∗ } , with ψσ(a∗ ) being the sole function whose expectation is not 0, so
that the I of Lem E.16 has size 2p − 2, and the λ of Lem E.16 is (k − 1)n−1/4 . Then Lem E.16 gives


2p
Y
Y
2

E
ψσ(a) (zσ(a) ) ≤ Ckψσ(a
kψσ(a) kG  (n−1/4 )(2p−2)/2
∗ ) kG
a6∈{a∗ ,b∗ }

a=1


2

= Ckψσ(a
∗ ) kG


Y

kψσ(a) kG  n−(p−1)/4

a6∈{a∗ ,b∗ }

for some constant C. Thus the collective contribution of such σ to the sum is at most



! n
!2p−2 
n
X
Y
X
X
2
.

kψσ(a) kG  n−(p−1)/4 ≤ O n−(p−1)/4
kψi2 kG
kψi kG
Ckψσ(a
∗ ) kG
σ

a6∈{a∗ ,b∗ }

i=1

51

i=1



√
√
n−2
– Suppose for some a, b ∈ [2p], (σ(a)σ(b)) = (ij)t for t ≤ R n. There are at most 2p
2 n · R n · 2p−3 =
O(n2p−1.5 ) such σ. Using Eq. (16) again, we can upper bound the contribution of such σ by O(n2p−1.5 B2p ).
• Otherwise, there are more than one pair of inputs that collide under σ. There are at most O(n2p−2 ) such σ. Using
Eq. (16), we upper bound their contributions by O(n2p−2 B2p ).
To summarize,
E

X

2p
Y



0
00
ψσ(a) (yσ(a) ) ≤ O n1.75p B2p
+ n1.75(p−1) B2p
+ n2p−1.5 B2p

σ:[2p]→[n] a=1



0
00
≤ O n1.75p B2p
+ n1.75(p−1) B2p
+ n2p−1.5+1/L B2p,L
E

n
n
1X
1X
φi (zi ) − E
φi (zi )
n i=1
n i=1

!2p
0
00
≤ O n−0.25p B2p
+ n−0.25p−1.75 B2p
+ n−1.5 B2p





0
00
≤ O n−0.25p B2p
+ n−0.25p−1.75 B2p
+ n−1.5+1/L B2p,L
where
n

!2p

n

!

0
B2p
=

1X
kψi kG
n i=1

00
B2p
=

1X 2
kψ kG
n i=1 i

n

1X
kψi kG
n i=1

!2p−2
.

0
00
By the power mean inequality, we get that B2p
, B2p
≤ B2p ≤ n1/L B2p,L . Substitution then gives the desired result.

This theorem can be significantly strengthened with more careful case work and applying more involved versions of
Lems E.16 and E.17.
Lemma E.22. Suppose φ : R → R is polynomially bounded: ∀x, |φ(x)| ≤ C(1 + |x|p ) for some C. Then for y ∼ N (0, 1),
|∂µ Var φ(σy + µ)| ≤ Rσ −1 (1 + σ 2p + |µ|2p )
for a universal constant R depending only on p but not on µ or σ.
Proof. By Lem E.7,
∂µ E φ(σy + µ)2 = σ −1 E yφ(σy + µ)2
∂µ E φ(σy + µ)2 ≤ σ −1 C 2 E |y|(1 + |σy + µ|p )2
≤ σ −1 C 2 E |y|(1 + 2p−1 (σ p |y|p + |µ|p ))2
≤ σ −1 3C 2 E |y|(1 + 22p−2 (σ 2p |y|2p + |µ|2p ))
≤ σ −1 C 0 (1 + σ 2p + |µ|2p )
where C 0 depends only on p but not on µ or σ. Similarly,
|∂µ E φ(σy + µ)| ≤ σ −1 C 00 (1 + σ p + |µ|p )
|E φ(σy + µ)| ≤ C 000 (1 + σ p + |µ|p )
for constants C 00 , C 000 depending only on p but not on µ or σ. Therefore,
|∂µ Var φ(σy + µ)| ≤ ∂µ E φ(σy + µ)2 + 2 |E φ(σy + µ)| |∂µ E φ(σy + µ)|
≤ σ −1 C 0 (1 + σ 2p + |µ|2p ) + 2C 000 (1 + σ p + |µ|p )σ −1 C 00 (1 + σ p + |µ|p )
≤ C 0000 σ −1 (1 + σ 2p + |µ|2p )
52

for constant C 0000 depending only on p but not on µ or σ.

F. Proof of Main Theorems
Theorem 4.3. Consider dimension constraints Λ and a skeleton π without T lines, i.e. no transpose allowed. Suppose all fl
are α-controlled for some α < 2. Sample all input vars as in Section 3.2 and assume almost sure rank convergence. Then
for any c ∈ C and any α-controlled function φ : Rc → R, α < 2,
nct

1 X
a.s.
φ(gct
−→ E φ(Z)
i )−
nct i=1
lt
c
g
c
c
where gct
i = (gi )gl ∈c and R 3 Z = (Z )g∈c ∼ N (µ , K ).

Proof. WLOG we assume that all input vars appear in the beginning of the program. We do induction on the length of the
program.
Pnct
d
a.s.
cin t
Base case. We show that for each c, n1ct i=1 φ(gci in t ) −−→ E φ(z) where gci in t = (glt
, K cin t ) and
i )gl ∈cin = N (µ
cin ∞
cin ∞
z ∼ N (µ
,K
).
For α-controlled φ, α ∈ [1, 2), for every q > 0, there is monotonic function f such that Ex∼N (µ,K) |φ(x)|q ≤
Pnct
f (kµk2 , kΣk2 ) by Lem E.10 uniformly over all µ, K. If we let Xnct ,i = φ(gci in t ) − E φ(gci in t ), then n1ct i=1 E |Xn,i |2+ρ
Pnct
is bounded uniformly over all t as µcin t and K cin t are bounded uniformly over all t. So by Thm E.4, n1ct i=1 φ(gci in t ) −
a.s.
E φ(gci in t ) −−→ 0. Because Ez∼N (µcin t ,K cin t ) φ(z) → Ez∼N (µcin ∞ ,K cin ∞ ) φ(z) as t → ∞ (for example by an easy
application of dominated convergence), we have our desired result.
Inductive Case. The inductive case for lines of type LinComb is obvious, as α-controlled functions are closed under
composition with linear transforms.
Suppose at time t, g t = gLt = At ht is a line of type MatMul and ht = f (gl01 t , . . . , gl0k0 t ) is a line of type Nonlin
where gl01 t , . . . , gl0k0 t (resp. At ) are some previous G-vars (resp. A-var). (The case for g t = At g 0t for a G-var g 0t
def
def
def
can be reduced to this case by setting f = id and ht = f (g 0t )). Set c = c1 = c(g) = c1 (A) and c2 = c(h) = c2 (A).
i
i
i r
Suppose g := Ah , i = 1, . . . , r, are all previous lines of type MatMul involving A. Here {g }i=1 are G-vars and {hi }ri=1
are G- or H-vars, defined by Nonlin lines hi := f i (gli1 , . . . , gliki ) for a collection of functions {f i : R → R}ri=1 . Let
def

def

c1 t

c2 t

Gt = [g 1t | · · · |g rt ] ∈ Rn ×r , H t = [h1t | · · · |hrt ] ∈ Rn ×r , so that Gt = At H t . We will abuse notation and sometimes
use G to mean the collection of G-vars {g j }rj=1 . Let At be the σ-algebra spanned by the G-vars appearing before g. By the
conditioning trick Lem E.3,
d

t
g t =At (Gt (H t )+ + Ãt Π⊥
H t )h

where Ãt is an independent copy of At and ΠH t = H t (H t )+ is projection to the space spanned by the columns of
def

H t . Each q
ith coordinate of g t is independent conditioned on At , with mean µti = Gti: (H t )+ ht and standard deviation
def

At
t 2
t
kΠ⊥
is a shorthand for σ line(A)t . For simplicity, we assume σ At = 1 for all t; the
H t h k /n2 (A ) where σ

σ t = σ At

general case follows very easily from the reasoning below and the fact that σ At converges to a finite, nonzero value.
a.s.

def

Claim F.0.1. (σ t )2 −−→ (σ ∞ )2 = K c (g, g) − K c (g, G)K c (G, G)+ K c (G, g).
Proof: Note that (σ t )2 = nc12 t (ht> ht − ht> ΠH t ht ) = nc12 t (ht> ht − ht> H t (H t> H t )+ H t> ht ). By induction hypothesis,
because f (z)2 is α-controlled for some α < 2,
c t

1
n c2 t

t> t

h

h =

n 2
1 X

nc2 t i=1

a.s.

f (gl01 t , . . . , gl0k0 t )2 −−→ E[f (z l01 , . . . , z l0k0 )2 : z ∼ N (µc , K c )] = K c (g, g),
53

where z = (z l )gl ∈c . Likewise, because both f and {f j }j are α-controlled jointly for some α < 2, by induction hypothesis,
c t

1

t> jt

h

n c2 t

h

=

n 2
1 X

nc2 t i=1

f (gl01 t , . . . , gl0k0 t )f j (glj1 t , . . . , gljkj t )

a.s.

−−→ E[f (z l01 , . . . , z l0k0 )f j (z lj1 , . . . , z ljkj ) : z ∼ N (µc , K c )]
= K c (g, g j )
c t

1
nc2 t

j 0 t> jt

h

h

=

n 2
1 X

nc2 t

0

l

t

f j (glj0 1 t , . . . , g jkj0 )f j (glj1 t , . . . , gljkj t )

i=1
l 0

0

a.s.

−−→ E[f j (z lj0 1 , . . . , z j kj0 )f j (z lj1 , . . . , z ljkj ) : z ∼ N (µc , K c )]
0

= K c (g j , g j ).
a.s.

Finally, by the rank convergence assumption we get (H t> H t )+ −−→ K c (G, G)+ .
t + t a.s.

Claim F.0.2. (H ) h −−→ v



∞ def

= K c (G, G)+ K c (G, g).
a.s.

Proof: This is similar to the above. (H t )+ ht = (H t> H t )+ H t> ht −−→ K c (G, G)+ K c (G, g).



|c<L |

LetPL = line(g). Let φ : R
→ R be α-controlled with α ∈ [1, 2), such that for coefficients C, c > 0, |φ(x)| ≤
α
eC i |xi | +c . Since for every q > 0,
h
i
h
i
E |φ(git , gic<L t )|q At = E |φ(µti + σ t z, gci <L t )|q : z ∼ N (0, 1)
≤ Ee


P
Cq |µti +σ t z|α + ĝ∈c

<L


|ĝit |α +cq

z

≤ Ee


P
Cqα |µti |α +|σ t z|α + ĝ∈c

<L


|ĝit |α +cq

z

=e
=e


P
Cqα |µti |α + ĝ∈c

<L


|ĝit |α +cq

t α

α

E eCqα(σ ) |z|
z


P
Cqα |µti |α + ĝ∈c

<L


|ĝit |α +cq

C1α (Cqα(σ t )α ),

we have
ct

ct



n
n
i
P
X
1 X h
1 1
Cqα |µti |α + ĝ∈c
|ĝit |α +cq
t c<L t q
t α
t
<L
E |φ(gi , gi )| A ≤ ct Cα (Cqα(σ ) )
e
nct i=1
n
i=1
ct


n
X C 0 qαP |vt gjt |α +P
t α
1 1
+cq
t α
j i
j
ĝ∈c<L |ĝi |
≤ ct Cα (Cqα(σ ) )
e
n
i=1
ct


n
X C 0 qαP (|v∞ |+1)|gjt |α +P
t α
1 1
+cq
t α
j
j
ĝ∈c<L |ĝi |
i
≤ ct Cα (Cqα(σ ) )
e
n
i=1

for large enough t, almost surely
ct

def

=

n
X
1 1
t α
C
(Cqα(σ
)
)
ψ(gic<L t )
α
nct
i=1

(17)

for some constant C 0 , where ψ is a α-controlled function. Thus by our claims above, this converges as nct → ∞ to
C1α (Cqα(σ ∞ )α )

E

z∼N (µc ,K c )

ψ(z c<L ),

where z c<L = (z l )l∈c,l<L . Therefore it is also almost surely uniformly bounded in t, so that with q = 2 + ρ, we can apply
54

i
h
Thm E.4 to Xnct ,i = φ(git , gci <L t ) − E φ(git , gic<L t ) At to conclude that
nct

i
h
1 X
a.s.
φ(git , gic<L t ) − E φ(git , gci <L t ) At −−→ 0.
ct
n i=1
After applying the following claim and the induction hypothesis on
 


X
gci <L t 7→ E φ 
gijt vj∞ + σ ∞ z, gci <L t  : z ∼ N (0, 1) ,
j

we get
 


nct
r
X
j
1 X
a.s.
φ(git , gci <L t ) −−→ E φ 
ζ line(g ) vj∞ + σ ∞ z, ζ c<L  : z ∼ N (0, 1), ζ ∼ N (µc , K c ) .
nct i=1
j=1
P
j
d
This yields the desired theorem by noting that conditioned on ζ c<L , j ζ line(g ) vj∞ + σ ∞ z = ζ L via Proposition E.6.
i
h P
i
Pnct h
a.s.
Claim F.0.3. n1ct i=1 E φ(git , gci <L t ) At − E φ( j gijt vj∞ + σ ∞ z, gci <L t ) : z ∼ N (0, 1) −−→ 0.
d

P jt
jt ∞
j gi vj + o(1)(
j |gi |) + (1 + o(1))z, where
def
L
c<L
L
c<L

Proof: From the claims above we have that almost surely, git =At

P

ot (1) is a quantity that decreases to 0 with t and doesn’t depend on i. Let Φ(x , x ; σ) = E[φ(x + σz, x ) :
z ∼ N (0, 1)] = E[φ(z, xc<L ) : z ∼ N (xL , σ 2 )]. Then by Lem E.7, Φ is differentiable in xL and ∂xL Φ(xL , xc<L ; σ) =
σ −1 E[zφ(xL + σz, xc<L ) : z ∼ N (0, 1)]. Clearly,
|∂xL Φ(xL , xc<L ; σ)| ≤ σ −1 E[|zφ(xL + σz, xc<L )| : z ∼ N (0, 1)]
L

c<L

α

≤ σ −1 E[|z|eC (|x +σz| +kx
L α

≤ σ −1 eCα(|x |

+kxc<L kα
α
c<L

L α

def

kα
α )+c

: z ∼ N (0, 1)]

)+c E[|z|eCασα |z|α : z ∼ N (0, 1)]

α

= σ −1 eCα(|x | +kx kα )+c R(σ)
Z xL +
L
c<L
L
c<L
dξ ∂ξ Φ(ξ, xc<L ; σ)
|Φ(x , x ; σ) − Φ(x + , x ; σ)| =
xL

≤σ

−1

Z xL +

c<L

kα
α )+c

| dξ| eCα (|x | +|ξ| +kx

c<L α
kα

R(σ)

α

| dξ| eCα(|ξ| +kx

xL

≤ σ −1 R(σ)

Z 

2

L α

α

)+c

0
2

L α

α

≤ σ −1 R(σ)||eCα (|x | +|| +kx

c<L α
kα

)+c .

Hence


nct
i
X
1 X h
E φ(git , gci <L t ) At − E  φ(
gijt vj∞ + σ t z, gci <L t ) z ∼ N (0, 1)
nct i=1
j
ct

n
X jt Cα2 |P gjt v∞ |α +ot (1)(P |gjt |)α +kgc<L t kα +c
1 X t −1
t
j
α
j i
j
i
i
(σ ) R(σ )ot (1)(
|gi |)e
≤ ct
n i=1
j
nct

t −1

≤ (σ )

1 X
R(σ )ot (1) ct
Ψ(gci <L t )
n i=1
t

55

Pnct
for some α-controlled function Ψ. By induction hypothesis, n1ct i=1 Ψ(gci <L t ) converges almost surely, so that the entire
quantity decreases to 0 due to ot (1). A similar argument shows that we can replace σ t with σ ∞ .


cin t L+LA +i
∇
Theorem 5.1. Sample {v it }L
(g
) → 0 for all i ∈ [L∇ ]) and independently from the
i=1 with zero mean (i.e. µ
lt Lg
cin t l l0
0 13
input vars {x }l=1 (i.e. K (g , g ) = 0 if l > L ≥ l ) . Sample all other vars in π̃ according to Section 3.2. Assume
all fl of π̃ are polynomially bounded and π̃ satisfies almost sure rank convergence. Then for any dimension constraints Λ,
any c ∈ C(π̃,Λ) , and any polynomially bounded function φ : Rc → R,
nct

1 X
a.s.
φ(gct
−→ E φ(Z)
i )−
ct
n i=1
lt
c
c
where gct
i = (gi )gl ∈c and Z ∼ N (µ , K ).

Note that we impose a more stringent condition here, compared to Thm 4.3, that fl are polynomial bounded, because, as it
will be apparent from the reasoning below, we need to reason about compositions of φ and fl ; if we still allow fl and φ to
be α-controlled in general, then their composition in general is not integrable against Gaussian measures.
Proof. Thm 4.3 already show that this is true for all gl in π. Because we assume that v it are sampled independently from
xlt , this is also true up to line L + LA + L∇ . We induct on the line number starting from ` = L + LA + L∇ + 1.
If line ` does not produce a new G-var, then there is nothing to prove.
If line ` is of type LinComb, then the induction hypothesis is obviously true.
In the following, suppose line ` is of type MatMul.
Setup This line involves a transposed matrix, ` : g` := AL+a hl , where AL+a = (Aa )> by line L + a and l > L (the
argument for gl instead of hl is similar and simpler). Let c = c1 = c1 (AL+a ) = c(g` ) and c2 = c2 (AL+a ) = c(hl ).
Conditioning on all G-vars that appeared before, we have constraints of the form g it = AL+a,t hit for i = 1, . . . , r,
and g 0it = Aat h0it for i = 1, . . . , s. Here {g i }ri=1 and {g 0i }si=1 are previous G-vars and {hi }ri=1 and {h0i }si=1 are
c1 t
previous G- or H-vars. Letting Gt = [g 1t | · · · |g rt ] ∈ Rn ×r (where g it are treated as column vectors), and similarly
c2 t
c2 t
c1 t
for H t ∈ Rn ×r , G0t ∈ Rn ×s , H 0t ∈ Rn ×s , we get the expressions Gt = AL+a,t H t , G0t = Aat H 0t . We will abuse
notation and sometimes use G to also denote the corresponding collection of G-vars; likewise for G0 , H, H 0 . By the
construction of π̃, g i = AL+a hi are lines that appear after π, and g 0i = Aa h0i are lines that appear in π. In addition, for each
i ∈ [r], hi is an H-var that appears after π.
Let At be the σ-algebra spanned by the values of all G-vars that appeared before line ` at time t. By the conditioning trick,
we have
d

t ⊥
lt
g`t =At (E t + Π⊥
H 0 t Ã ΠH t )h

with
E = Gt H t+ + H 0t+> G0t> − H 0t+> G0t> H t H t+
t

= Gt (H t> H t )+ H t> + H 0t (H 0t> H 0t )+ G0t> − H 0t (H 0t> H 0t )+ G0t> H t (H t> H t )+ H t>
where Ãt is sampled independently and identically as AL+a,t . Note that
d

g`t =At µt + σ t Π⊥
H 0t y, with y ∼ N (0, Inc1 t )
def

µt = E t hlt
nc2 t
def
lt 2
c2 t
(σ t )2 = (σ at )2 c1 t kΠ⊥
H t h k /n
n
13
In our previous example of f (x) = v > ρ(x), this corresponds to the readout layer v sampled with zero mean and independently from
x and other parameters of ρ.

56

where, to recall, (σ at )2 /n2 (Aat ) = (σ at )2 /n1 (AL+a,t ) is the sampling variance of each entry of Aat and AL+a,t . For brevity,
we use the following shorthands
def

Σ0t = H 0t> H 0t /nc1 t ∈ Rs×s

def

def

β t = G0t> hlt /nc2 t ∈ Rs

Σt = H t> H t /nc2 t ∈ Rr×r

def

Υt = G0t> H t /nc2 t ∈ Rs×r

def

ω t = H t> hlt /nc2 t ∈ Rr
so that

µt = Gt Σt+ ω t +

nc2 t 0t 0t+ t nc2 t 0t 0t+ t t+ t
H Σ β − c1 t H Σ Υ Σ ω .
nc1 t
n

By induction hypothesis, Σt , Σ0t , Υt , ω t , β t all converge almost surely to corresponding limit values: Let α = αc2 ,c1 =
c2 t
limt→∞ nnc1 t ; if λi = line(hi ), λ0i = line(h0i ), then, with Z ∼ N (µc , K c ),
a.s.

def

a.s.

def

a.s.

def

λi
λj
k∞ −2 −1 c i j
Σtij −−→ Σ∞
) α K (g , g )
ij = E f (Z)f (Z) = (σ
0

0

λi
λj
k∞ −2 c 0i 0j
Σ0tij −−→ Σ0∞
) K (g , g )
ij = E f (Z)f (Z) = (σ
a.s.

ωit −−→ ωi∞ = E fλi (Z)fl (Z) = (σ k∞ )−2 α−1 K c (g i , g` )

a.s.

Υti −−→ 0

βit −−→ 0.

The last two limits go to 0 because H t and hlt are odd in v 1 , . . . v L∇ , which are sampled independently from G0t as
a.s.
a.s.
remarked above. Consequently, by our rank assumption, Σt+ −−→ Σ∞+ , Σ0t+ −−→ Σ0∞+ .
a.s.

def

Claim F.0.1. (σ t )2 −−→ (σ ∞ )2 = K c (g` , g` ) − K c (g` , G)K c (G, G)+ K c (G, g` ) with t.
Proof: We have
(σ t )2
lt
c2 t
= hlt> Π⊥
H t h /n
nc2 t
at
2
(σ ) nc1 t
= khlt k2 /nc2 t − hlt> ΠH t hlt /nc2 t
= khlt k2 /nc2 t − (hlt> H t /nc2 t )(H t> H t /nc2 t )+ (H t> hlt /nc2 t )
= khlt k2 /nc2 t − ω t> Σt+ ω t .
Pnc2 t
2 a.s.
Now khlt k2 /nc2 t = nc12 t i=1 (hlt
−→ E[fl (Z)2 : Z ∼ N (µc , K c )] = (σ k∞ )−2 α−1 K c (g` , g` ) by induction hypothei ) −
sis. On the other hand, again by induction hypothesis and the rank assumption, the second term converges almost surely
c2 t
to (σ k∞ )−2 α−1 K c (g` , G)K c (G, G)+ K c (G, g` ). Combined with the simple fact that (σ at )2 nnc1 t → (σ ∞t )2 α, we get the
desired result.

t def

t a.s.

Let v = Σt+ ω t , for t ∈ [1, ∞], so that, by our rank condition, v −−→ v ∞ = Σ∞+ ω ∞ , which we can check is equal to
K c (G, G)+ K c (G, g` ).
Claim F.0.2. For some vectors εt ∈ Rr , ε0t ∈ Rs that go to 0 almost surely with t, µt = E t hlt = Gt (v ∞ + εt ) + H 0t ε0t .
a.s.

a.s.

a.s.

a.s.

Proof: Follows immediately from the fact derived above that Σt+ −−→ Σ∞+ , ω t −−→ ω ∞ , Υt −−→ 0, β t −−→ 0.
2p



Convergence almost surely. Let φ be a function with |φ(x)| ≤ C(1 + kxk ), p ∈ N; φ will be our test function. With
57

w ∼ N (0, 1), Z ∼ N (µc , K c ),
nct

1 X
c<` t
φ(g`t
) − E φ(Z)] ≤ A + B + C
i , gi
Z
nct i=1
with
ct

def

A=

n
1 X

nct i=1 w
ct

def

B=



r
X
c t
Eφ
vj∞ gijt + σ ∞ w, gi <`  − E φ(Z)

n
1 X

Z

j=1





r
q
X
c<` t
c t
− Eφ
vj∞ gijt + σ ∞ w, gi <` 
E φ µti + σ t (Π⊥
H 0t )ii w, gi

nct i=1 w

w

j=1

ct

def

C=



n
q
1 X  `t c<` t 
t
t
⊥ ) w, gc<` t
(Π
φ
g
,
g
−
E
φ
µ
+
σ
0
t
ii
i
i
i
i
H
w
nct i=1

We shall show that each of A, B, C goes to 0 almost surely as t → ∞.
a.s.

Claim F.0.3. A −−→ 0.
Proof: Note that if Rc 3 ζ ∼ N (µc , K c ),
r
X

j

vj∞ ζ g + σ ∞ w

j=1

= (ζ G )> K c (G, G)+ K c (G, g` ) + (K c (g` , g` ) − K c (g` , G)K c (G, G)+ K c (G, g` ))w
d

`

=ζ c<` ζ g .
P

r
c<` t
c t
∞ jt
∞
Since Ew φ
v
g
+
σ
w,
g
is purely a polynomially-bounded function of gi <` , this claim is given by the
i
j=1 j i
induction hypothesis.

a.s.

Claim F.0.4. C −−→ 0.
def

c

t

def

Proof: Fix the values of gc<` t . For each i ∈ [nct ], let φti (x) = φ(µti + σ t x, gi <` ), and φ̃ti (x) = φti (x) −
t nct
Ex0 ∼N (0,(Π⊥ 0t )ii ) φti (x0 ). By Thm E.21 applied to Π⊥
0 t and {φi }i=1 , we get, for any ρ ≥ 6 and any q > 1,
H
H
v


2ρ

u
nct
nct
h
i
u
X
X
1
1
t

E
φ̃ti (zi )2ρq 
E
φ̃ti (zi ) ≤ O (nct )−1.5+1/q q
ct
ct
⊥ ) )
n
n
z
∼N
(0,(Π
z∼N (0,Π⊥
)
i
ii
0
t
0
t
H
H
i=1
i=1
t
where the constant
hidden
i in O(−) is independent of q, t, the functions φi , and ΠH 0t . We first show that the sum
h
Pnct
1
t
2ρq
is uniformly bounded almost surely in t over the probability of {At }t≥1 , for any q > 1. Indeed,
i=1 Ezi φ̃i (zi )
nct

with z ∼ N (0, Π⊥
H 0 t ),
"

2ρq #
nct
nct
nct
i

1 X h t
1 2ρq−1 X
1 2ρq X  t
2ρq
t
2ρq
t 0
E φ̃i (zi )
≤ ct 2
E φi (zi ) + E0 φi (zi )
E φi (zi )2ρq
≤ ct 2
ct
z
z
z
zi
n i=1 i
n
n
i
i
i=1
i=1
nct
i
1 2ρq X h
c t
= ct 2
E φ(µti + σ t zi , gi <` )2ρq
zi
n
i=1
nct
i
1 0 X h t 4ρpq
c t
E |µi |
+ |σ t zi |4ρpq + kgi <` k4ρpq
≤ ct C
zi
n
i=1
t→∞
a.s.

ct


n 
X
1
c t
≤ ct C 00
|µti |4ρpq + (2|σ ∞ | + 1)4ρpq E |zi |4ρpq + kgi <` k4ρpq
zi
n
i=1
58

for some constants C 0 , C 00 > 0, where this last inequality holds for large enough t, almost surely. By induction hypothesis
and the fact that (Π⊥
H 0t )ii ∈ [0, 1] for all i,


nct 
1 X
c<` t 4ρpq
∞
4ρpq
4ρpq
(2|σ | + 1)
E |zi |
+ kgi k
zi
nct i=1

is uniformly bounded in t, almost surely. Thus it remains to bound


4ρpq
nct
nct
r
1 X t 4ρpq
1 X X jt ∞
0 t
|µ |
= ct
g (v + εtj ) + h0 jt
i εj
nct i=1 i
n i=1 j=1 i j
a.s.

where εt , ε0t −−→ 0, by Claim F.0.2

4ρpq 
4ρpq
r
r
nct
X jt
1 000 X X jt ∞ 
jt
gi vj
gi εtj + h0 i ε0j t 
+
≤ ct C
n
j=1
j=1
i=1

4ρpq 
4ρpq
nct
r
r
X
1 000 X X jt ∞ 

≤ ct C
|gijt | + |h0 jt
gi vj
+
i |
n
i=1
j=1
j=1

t→∞
a.s.

for some constant C 000 , where the last inequality holds for large enough t, almost surely. Because each h0 jt
i is a polynomially
c t
bounded function of gi <` , each summand of the RHS is as well 14 . So by induction hypothesis, this converges to a finite
value, and hence is uniformly bounded in t, almost surely, as desired.
 P ct
2ρ
n
Thus, almost surely, Ez∼N (0,Π⊥ 0t ) n1ct i=1 φ̃ti (zi )
≤ c(nct )−1.25 for some c, by choosing q large enough. By
H

Lem E.5 and the fact that nct strictly increases with t, we have

ct

ct



n
n
q
1 X t
1 X  `t c<` t 
a.s.
t
t
⊥ ) w, gc<` t
φ̃
(z
)
=
ψ
g
,
g
−
E
ψ
µ
+
σ
(Π
−−→ 0, where w ∼ N (0, 1).
i
i
i
i
i
H 0 t ii
w
nct i=1 i
nct i=1


a.s.

Claim F.0.5. B −−→ 0.

Proof: We apply a similar argument as the one in the proof of Thm 4.3 that leverages the smoothness of Gaussian average
over Ã. The major difference here is that we have to deal with the varying variances (Π⊥
H 0 t )ii for each t, but this can be
done by using the fact that rank H 0t = O(1).
def

Define Φ(x` , xc<` ; σ) = E[φ(x` + σw, xc<` ) : w ∼ N (0, 1)]. Then by Lem E.7, Φ is differentiable in x` and σ 2
with ∂x` Φ(x` , xc<` ; σ) = σ −1 E[wφ(x` + σw, xc<` ) : w ∼ N (0, 1)] and ∂σ2 Φ(x` , xc<` ; σ) = 12 σ −2 Ew∼N (0,1) φ(x` +
14
This is the only place where we need the assumption that all fl are polynomially bounded. Otherwise, their composition might not ne
integrable against the Gaussian measure.

59

σw, xc<` )(w2 − 1). Clearly,

|∂x` Φ(x` , xc<` ; σ)| ≤ σ −1 C E[|w|(1 + |x` | + |σw| + kxc<` k)2p : w ∼ N (0, 1)]
≤ σ −1 42p−1 C E[|w|(1 + |x` |2p + |σw|2p + kxc<` k2p ) : w ∼ N (0, 1)]
≤ σ −1 C 0 (1 + |x` |2p + kxc<` k2p + σ 2p )
1
|∂σ2 Φ(x` , xc<` ; σ)| ≤ σ −2
E
|φ(x` + σw, xc<` )||w2 − 1|
2
w∼N (0,1)
≤ Dσ −2

E

(1 + |x` |2p + |σw|2p + kxc<` k2p )|w2 − 1|

w∼N (0,1)

≤ D0 σ −2 (1 + |x` |2p + kxc<` k2p + σ 2p )
q
=⇒ k∇x` ,σ2 Φ(x` , xc<` ; σ)k = |∂x` Φ(x` , xc<` ; σ)|2 + |∂σ2 Φ(x` , xc<` ; σ)|2
≤ D00 (1 + σ −2 )(1 + |x` |2p + kxc<` k2p + σ 2p )

for some constant C 0 , D, D0 , D00 depending only on p and C. Thus

p
|Φ(x` , xc<` ; σ) − Φ(x` + ϑ, xc<` ; σ 2 + ς 2 )|
Z 1
p
≤ (|ϑ| + ς 2 )
dt k∇x` ,σ2 Φ(x` + ϑt, xc<` ; σ 2 + ς 2 t)k
0


Z 1
1
00
2
≤ D (|ϑ| + ς )
dt 1 + 2
(1 + |x` + ϑt|2p + kxc<` k2p + (σ 2 + ς 2 t)p )
σ + ς 2t
0


Z 1
1
2
≤ C̃(|ϑ| + ς )
dt 1 + 2 (1 + |x` |2p + ϑ2p t2p + kxc<` k2p + σ 2p + ς 2p tp )
σ
0


1
≤ C̃ 0 (|ϑ| + ς 2 ) 1 + 2 (1 + |x` |2p + ϑ2p + kxc<` k2p + σ 2p + ς 2p )
σ

def

for some constants C̃, C̃ 0 depending only on p and C. Partition [nct ] = U t V where U = {i : (Π⊥
H 0t )ii < 1/2} and V is
its complement. Note that |U | ≤ 2 rank H 0t ≤ 2s. So



nct
q


1 X
t
t
⊥ ) w, gc<` t − E φ Gt Σ∞+ ω ∞ + σ ∞ w, gc<` t
(Π
E
φ
µ
+
σ
0t ii
i
i:
i
i
H
ct
w
n i=1 w


nct
q


1 X
c t
t ∞+ ∞ c<` t
∞
= ct
Φ µti , gi <` ; σ t (Π⊥
)
−
Φ
G
Σ
ω
,
g
;
σ
0
t
ii
i:
i
H
n i=1
X 

q


1
c t
t ∞+ ∞ c<` t
∞
)
Φ
G
Σ
ω
,
g
;
σ
≤ ct
Φ µti , gi <` ; σ t (Π⊥
+
0t
ii
i:
i
H
n
i∈U


q

 
X
t c<` t
t
t ∞+ ∞ c<` t
∞
⊥
+
Φ µi , gi ; σ (ΠH 0 t )ii − Φ Gi: Σ
ω , gi ; σ
.
i∈V

60

(18)
(19)

The first sum (18) converges almost surely to 0:


q


1 X
c t
t c<` t
t
⊥ )
+ Φ Gti: Σ∞+ ω ∞ , gi <` ; σ ∞
Φ
µ
,
g
;
σ
(Π
i i
H 0 t ii
ct
n
i∈U


q


2s
t c<` t
t
t ∞+ ∞ c<` t
∞
⊥ )
≤ ct max
Φ
µ
Φ
G
,
g
;
σ
+
Σ
ω
,
g
;
σ
(Π
0 t ii
i
i:
i
i
H
n i∈[nct ]
v

N
u
q
u 1 X
2s
c<` t
t
⊥
t
N
t
≤ ct 1−1/N
Φ µi , gi ; σ (ΠH 0 t )ii
nct
(n )
i∈[nct ]
v
u
N

2s
u 1 X
c t
N
+ ct 1−1/N t ct
Φ Gti: Σ∞+ ω ∞ , gi <` ; σ ∞
n
(n )
ct

(20)

i∈[n ]


N
c t
Φ Gti: Σ∞+ ω ∞ , gi <` ; σ ∞
converges a.s. to a finite value, by Claim F.0.3, so for
q

N
P
c t
large N , the second term in Eq. (20) converges to 0. Similarly, n1ct i∈[nct ] Φ µti , gi <` ; σ t (Π⊥
converges a.s.
H 0 t )ii
to a finite value, as in the proof of Claim F.0.4, so for large N , the first term of Eq. (20) and thus Eq. (20) itself go to 0
almost surely.
for any N > 0. Now n1ct

P

i∈[nct ]

We proceed with the second sum (19):


q


1 X
t c<` t
t
t ∞+ ∞ c<` t
∞
⊥ )
Φ
µ
,
g
;
σ
(Π
−
Φ
G
Σ
ω
,
g
;
σ
0
t
ii
i i
i:
i
H
nct
i∈V


1
1 X
c<` 2p
t 2p
√
(%i + |(σ ∞ )2 − (σ t )2 (Π⊥
≤ C̃ 0 1 +
+ %2p
+ max(σ ∞ , σ t )2p )
H 0 t )ii |)(1 + |µi |
i + kgi k
∞
t
2
nct
min(σ , σ / 2)
i∈V

def

def

c

<` 2p
where %i = Gti: εt + H 0ti:ε0t with εt , ε0t = o(1) a.s. coming from Claim F.0.2. Write Yi = (1 + |µti |2p + %2p
+
i + kgi k

max(σ ∞ , σ t )2p ). Since 1 + min(σ∞ 1,σt /√2)2 is obviously uniformly bounded in t, via Cauchy-Schwarz, the sum above
is bounded by a constant multiple of
s
s
1 X
1 X 2
⊥
(%i + |(σ ∞ )2 − (σ t )2 (ΠH 0 t )ii |)2
Yi .
ct
n
nct
i∈V

i∈V

q P
Using similar techniques as before, by applying induction hypothesis, n1ct i∈V Yi2 can be shown to be uniformly
bounded in t, almost surely. All it remains to show is that the first term in the product above converges to 0 a.s.. Now
s
1 X
2
(%i + |(σ ∞ )2 − (σ t )2 (Π⊥
H 0t )ii |)
nct
i∈V
s
s
s
1 X 2
1 X ∞ 2
1 X t 4
t
2
2
2
%
+
((σ
)
−
(σ
)
)
+
(σ ) (1 − (Π⊥
≤
i
H 0 t )ii )
nct
nct
nct
i∈V
i∈V
i∈V
s
s
X
1 X 2
1
≤
%i + |(σ ∞ )2 − (σ t )2 | + (σ t )2
1 − (Π⊥
H 0 t )ii
nct
nct
i∈V

i∈V

since 1 − (Π⊥
H 0 t )ii ∈ [0, 1/2]
r
1 X t t 2
1 X 0 t 0t 2
2 rank H 0t
≤
(Gi: ε ) +
(H i: ε ) + |(σ ∞ )2 − (σ t )2 | + (σ t )2
ct
ct
n
n
nct
i∈V
i∈V
r
s
s
1 X t 2
1 X
2 rank H 0t
t
0t
∞ 2
t 2
t 2
t
0
2
≤ kε k
kG
k
+
kε
k
kH
k
+
|(σ
)
−
(σ
)
|
+
(σ
)
.
i:
i:
nct
nct
nct
s

s

i∈V

i∈V

61

By induction hypothesis,

q

1
nct

t 2
i∈V kGi: k converges and so is also uniformly bounded in t, almost surely. Then, because

P

a.s.

kεt k −−→ 0, the first term converges to 0 a.s.. Likewise for the second term. The final two terms also obviously converge to
0 almost surely with t. This completes the proof of our claim.


We are finally ready to prove Thm 6.3, but a few lemmas first would help our effort significantly.
Lemma F.1. Let X = (X1 , . . . , Xn ) be a multivariate Gaussian with 0 mean and nondegenerate covariance. For any
L2 (X)-integrable function f ,
E Xi f (X) =
=

n
X

Cov(Xi , Xj )
E(Xj − E[Xj |X\j ])f (X)
Var(X
j |X\j )
j=1

n
X
Cov(Xi , Xj ) E(Xj − Cov(Xj , X\j ) Cov(X\j , X\ j)+ X\j )f (X)

Var(Xj ) − Cov(Xj , X\j ) Cov(X\j , X\J )+ Cov(X\j , Xj )

j=1

Proof. By a density argument, it suffices to consider only the case when f is C ∞ . Then by Stein’s lemma,
E Xi f (X) =

n
X

Cov(Xi , Xj ) E ∂j f (X).

j=1

By Stein’s lemma again,
E ∂j f (X) = E

E

X\j Xj |X\j

∂j f (X)

(Xj − Cov(Xj , X\j ) Cov(X\j , X\ j)+ X\j )f (X)
X\j Xj |X\j Var(Xj ) − Cov(Xj , X\j ) Cov(X\j , X\J )+ Cov(X\j , Xj )

= E

E

(Xj − Cov(Xj , X\j ) Cov(X\j , X\ j)+ X\j )f (X)
.
X Var(Xj ) − Cov(Xj , X\j ) Cov(X\j , X\J )+ Cov(X\j , Xj )

=E

def

Definition F.2. Let gl = Ahm be a line in π and let g i = A0 hi , i = 1, . . . , s be all previous MatMul lines that involve A0 .
Here A0 is the A-var such that A0 := A> if A is an input A-var, or A := A0> if A is a transposed var. Then, by the construction
Ps
Ps
l
j
def
of π̌, ϕ(gl ) = ϕg (gl ) + j=1 aj ϕ(hj ) for some coefficients a defined in Defn 6.2. Define fϕh (g ) = j=1 aj fϕ(h ) , so
l

l

l

fϕ(g ) = fϕg (g ) + fϕh (g ) .
Let gl := Ahm be a MatMul line in π and set č = c(ϕ(gl )). Consider the Hilbert space L2 (Z) of L2 functions of Z ∼
N (µč , K č ) (equivalently, square-integrable random variables in the σ-algebra generated by Z). Write hf, gi = E f (Z)g(Z)
for its inner product.
Lemma F.3. Fix a line number λ ≥ l. Let g i = A0 hi , i = 1, . . . , s be all MatMul lines strictly before line λ that involve
Ak> . Define C ∈ Rs×s , v ∈ Rs by
i

j

i

m

Cij = hfϕ(h ) , fϕ(h ) i
vi = hfϕg (g ) , fϕ(h ) i.
Then for all i ∈ [s],
i

l

vi = α−1 hfϕ(h ) , fϕh (g ) i
l

i

fϕh (g ) = α(fϕ(h ) )si=1 C + v = α

X

i,j∈[s]
t

t

where α = limt→∞ n2 (A )/n1 (A ) = αc2 (A),c1 (A) .
62

i

(C + )ij vj fϕ(h )

def

Proof. Let I 0 = {i : line(ϕg (g i )) < l}.
i

l

We show vi = α−1 hfϕ(h ) , fϕh (g ) i for all i ∈ I 0 . Note first of all that a in Defn F.2 is defined by Defn 6.2 as αCI+0 vI 0 ,
where , CI 0 = (Cij )i,j∈I 0 , and vI 0 = (vi )i∈I 0 .
def

0 def

i

0

i

Suppose Z I = {Z ϕg (g ) }i∈I is a maximal linearly independent set in Z I = {Z ϕg (g ) }i∈I 0 . Note that Z I (as well as Z I )
is also independent of all Z ǧ where ǧ is produced by MatMul involving a matrix that is not ϕ(A0 ) or where ǧ is an input
m
var (by the construction of K č ). Let Z 0 the collection of all such Z ǧ . Then EZ J fϕ(h ) (Z) is purely a function of Z I , by
0
m
expressing other elements of Z I as linear combinations of Z I . Thus, by Lem F.1 applied to Z I and EZ 0 fϕ(h ) , there exist
coefficients {aj }j∈I such that, for each i ∈ I,
i

m

i

m

vi = E Z ϕg (g ) E fϕ(h ) (Z) = E Z ϕg (g ) E0 fϕ(h ) (Z)
Z
ZI
Z 0 |Z I
ZI
X
=
aj K č (ϕg (g i ), ϕg (g j ))
j∈I
i

= hZ ϕg (g ) ,

X

j

aj Z ϕg (g ) i

j∈I

=

(σ

k∞ 2

)

i

hfϕ(h ) ,

α

X

j

aj fϕ(h ) i

j∈I

by construction of K c .
This equality is extended to all i ∈ I 0 via linear combination. Thus,
X
j
(σ k∞ )2 ϕ(hi )
h(f
)i∈I 0 ,
aj fϕ(h ) i
α
j∈I
X
l
+
ϕh (g )
ϕ(hi )
f
=α
f
(CI 0 )ij vj

(vi )i∈I 0 =

i,j∈I 0

X

= (σ k∞ )2

i

j

fϕ(h ) (CI+0 )ij hfϕ(h ) ,

i,j∈I 0

X

= (σ k∞ )2 ΠI 0

X

j

aj fϕ(h ) i

j∈I
j

aj fϕ(h )

j∈I

= (σ

k∞ 2

)

j

X

aj fϕ(h )

j∈I
i

where ΠI 0 is the projection operator on L2 (Z) that projects to the linear span of {fϕ(h ) }i∈I 0 (see Defn E.1 and the basic
facts underneath).
i

So all along, vi = α1 hfϕ(h ) , ϕh (gl )i for all i ∈ I 0 .
i

l

We show vi = α−1 hfϕ(h ) , fϕh (g ) i for all i 6∈ I 0 . Suppose g i = A0 hi has line number greater than l. Then, we have that,
0
m
i
conditioned on Z I , fϕ(h ) and fϕg (g ) are independent. Indeed, with the conditioning, the randomness in the former only
j
comes from {Z ϕg (g ) }j6∈I 0 and the randomness in the latter only comes from Z 0 , and the two are independent. Thus,

vi = E 0

ϕg (g i )

E f

Z|Z I 0

ZI



ϕ(hm )
(Z)
E 0f
(Z)
Z|Z I



č
č
+ I
= E0 KiI
0 (KI 0 I 0 ) Z
ZI


0

m

E 0 fϕ(h ) (Z)

Z|Z I

č
č
+
ϕg (g i ) ϕ(hm )
= KiI
,f
i)i∈I 0
0 (KI 0 I 0 ) (hZ

63



where K č is the row vector (K č (ϕg (g i ), ϕ(g j )))j∈I 0 and KIč 0 I 0 is the submatrix (K č (ϕg (g i ), ϕ(g j )))i,j∈I 0 . Again by the
construction of K č , this simplifies to
X
i
j
vi =
hfϕ(h ) , fϕ(h ) i(C + )jk vk
j,k∈I 0
i

l

vi = hfϕ(h ) , α−1 fϕh (g ) i
Therefore,
i

X

fϕ(h ) (C + )ij vj

i,j∈[s]
i

X

= α−1

j

l

fϕ(h ) (C + )ij hfϕ(h ) , fϕh (g ) i

i,j∈[s]

=α

−1

l

Πfϕh (g )
l

= α−1 fϕh (g ) .
j

l

where Π is the projection operator to the span of {fϕ(h ) }j∈[s] , and the last equality follows because fϕh (g ) is already in
this span.

Theorem 6.3. Let π be an original syntax program with sampling instructions, and π̌ be the detransposition of π, with ϕ
the mapping from vector vars of π to vector vars of π̌. Assume all fl of π are polynomially bounded, and that almost sure
rank convergence holds for π̌. Sample input vars of π according to Section 3.2. Then for any dimension constraints Λ, any
c ∈ C(π,Λ) , and any polynomially bounded function φ : Rc̄ → R,
nct

1 X
a.s.
φ(hct
−→ E φ((fϕ(h) (Z))h∈c̄ )
i )−
ct
n i=1
č
č
where hct
i is the sequence of the ith coordinates of all vector vars in c̄, and Z ∼ N (µ , K ).
m

If all fl in π are differentiable, then we can take a in Item 6 of Defn 6.2 to be ασ 2 (E ∂Z ϕg (gi ) fϕ(h ) (Z))i∈[s] 15 , where
σ = σ r∞ and r is the line number of ϕ(A0 ), and the above almost sure convergence will still hold.
Proof. We proceed by induction on line number of π. All line types are trivial except MatMul. So suppose in π, line l is
gl := Ahm , and the induction hypothesis holds for l and c = c(gl ). Set c1 = c and c2 = c(hm ). Let A0 be the A-var such
that A0 := A> if A is an input A-var, and A := A0> otherwise.
Let g i := Ahi , i = 1, . . . , r, be all MatMul lines involving A that appear before line l, and let g 0i := A0 h0i , i = 1, . . . , s,
be all MatMul lines involving A0 that appear before line l. Note that c(g i ) = c(h0i ) = c1 and c(hi ) = c(g 0i ) = c2 . Set
c2 t
c1 t
c2 t
c1 t
H t = [h1t | · · · |hrt ] ∈ Rn ×r , and likewise for Gt ∈ Rn ×r , H 0t ∈ Rn ×s , G0t ∈ Rn ×r . Let A be the σ-algebra
generated by all vector vars before gl .
As in the proof of Thm 5.1,
d

t ⊥ mt
g lt =At µt + Π⊥
H 0t Ã ΠH t h
c2 t

c2 t

where Ãt is random matrix sampled iid as A, and µt = Gt Σt+ ω t + nnc1 t H 0t Σ0t+ β t − nnc1 t H 0t Σ0t+ Υt Σt+ ω t and
def

Σ0t = H 0t> H 0t /nc1 t ∈ Rs×s

def

β t = G0t> hm /nc2 t ∈ Rs .

Σt = H t> H t /nc2 t ∈ Rr×r
ω t = H t> hm /nc2 t ∈ Rr

def

def

Υt = G0t> H t /nc2 t ∈ Rs×r

def

15
even if not all fl are differentiable, as long as the covariance {K č (ϕg (g i ), ϕg (g j ))}i,j∈[s] is nonsingular, we may take the distributional derivatives and interpret the expectation as the application of this (tempered) distribution to the Gaussian density function. Then the
theorem holds under this interpretation. Even if the covariance is singular, we may consider a subset {ϕg (g i )}i∈I of maximal rank, and
still apply the tempered distribution interpretation; see the proof for more details.

64

By induction hypothesis, Σt , Σ0t , Υt , ω t , β t all converge almost surely to corresponding limit values: Let α = αc2 ,c1 =
c2 t
limt→∞ nnc1 t . With Z ∼ N (µč , K č ),
i

j

a.s.

def

a.s.

def

a.s.

def

i

m

a.s.

def

0i

j

a.s.

def

0i

m

ϕ(h )
Σtij −−→ Σ∞
(Z)fϕ(h ) (Z)
ij = E f
0i

0j

ϕ(h )
Σ0tij −−→ Σ0∞
(Z)fϕ(h ) (Z)
ij = E f

ωit −−→ ωi∞ = E fϕ(h ) (Z)fϕ(h ) (Z)
ϕ(g )
Υtij −−→ Υ∞
(Z)fϕ(h ) (Z)
i = Ef

βit −−→ βi∞ = E fϕ(g ) (Z)fϕ(h ) (Z).
As in the proof of Thm 5.1, we can apply Thm E.21 and Gaussian average smoothness to integrate out Ãt and obtain the
following claim
Claim F.3.1. With w ∼ N (0, 1),
nct

1 X
c<l t
c t a.s.
) − E φ(Gti: a + H 0ti: a0 + σ ∞ w, hi <l ) −−→ 0
φ(glt
i , hi
w
nct i=1
where
def

a = Σ∞+ ω ∞
def

a0 = αΣ0∞+ (β ∞ − Υ∞ Σ∞+ ω ∞ )
def

č
l
σ ∞ = K č (ϕg (gl ), ϕg (gl )) − K č (ϕg (gl ), ϕg (G))K č |+
ϕg (G) K (ϕg (G), ϕg (g ))

with č = c(ϕg (gl )).
Combining this with the induction hypothesis and Thm 4.3, we have
Claim F.3.2. With w ∼ N (0, 1) and Z ∼ N (µč , K č ),


nct
r
s
X
X
j
0 j0
1 X
a.s.
c
t
<l
φ(glt
) − E φ
aj fϕ(g ) (Z) +
a0j 0 fϕ(h ) (Z) + σ ∞ w, {fϕ(h) (Z)}h∈(c̄)<l  −−→ 0
i , hi
w,Z
nct i=1
0
j=1
j =1

In the following, we consider the inner product space of L2 -integrable functions of Z (equivalently, square-integrable
def
random variables in the σ-algebra generated by Z), with inner product hf, gi = E f (Z)g(Z) with Z ∼ N (µč , K č ). We
m
abuse notation and let any vector-var in π̌ (e.g. ȟm ) denote the corresponding function (e.g. fȟ ). Note that we can rewrite
β ∞ − Υ∞ Σ∞+ ω ∞



X
= hϕ(g 0i ), ϕ(hm )i −
hϕ(g 0i ), ϕ(hj )i(Σ∞+ )jk hϕ(hk ), ϕ(hm )i
j,k

i∈s

0i
m
0i
⊥
m
= (hΠ⊥
ϕ(H) ϕ(g ), ϕ(h )i)i∈s = (hϕ(g ), Πϕ(H) ϕ(h )i)i∈s
def

where Πϕ(H) is the projection operator to the span of ϕ(H) = {ϕ(hi )}ri=1 and Π⊥
ϕ(H) is its orthogonal complement.
Claim F.3.3.
r
X
j=1

aj ϕh (g j ) = α

s
X

ϕ(h0i )(Σ0∞+ )ij hΠϕ(H) ϕg (g 0j ), ϕ(hm )i.

i,j=1

65

Proof:
By Lem F.3,
r
X

j

aj ϕh (g ) = α

j=1

r
X

(Σ∞+ )jq hϕ(hq ), ϕ(hm )i

j,q=1

=α

X

ϕ(h0a )(Σ0∞+ )ab hϕg (g 0b ), ϕ(hj )i

a,b∈[s]

X

X

0a

ϕ(h )(Σ

0∞+

)ab hϕg (g 0b ), ϕ(hj )i(Σ∞+ )jq hϕ(hq ), ϕ(hm )i

a,b∈[s] j,q∈[r]

=α

X

ϕ(h0a )(Σ0∞+ )ab hϕg (g 0b ), Πϕ(H) ϕ(hm )i

a,b∈[s]



as desired.
Claim F.3.4.
r
X

aj ϕh (g j ) +

s
X

0

a0j 0 ϕ(h0j ) = α

j 0 =1

j=1

s
X

ϕ(h0i )(Σ0∞+ )ij hϕg (g 0j ), ϕ(hm )i.

i,j=1

Proof: As noted above,
a0j 0 = α

X

(Σ0∞+ )j 0 k (β ∞ − Υ∞ Σ∞+ ω ∞ )k

k∈[s]

=α

X

0i
m
(Σ0∞+ )j 0 k hΠ⊥
ϕ(H) ϕ(g ), ϕ(h )i

k∈[s]

=α

X

0i
m
(Σ0∞+ )j 0 k hΠ⊥
ϕ(H) ϕg (g ), ϕ(h )i

k∈[s]

because ϕ(g 0i ) − ϕg (g 0i ) ∈ span ϕ(H)
s
X

0

a0j 0 ϕ(h0j ) = α

j 0 =1

By the previous claim, adding

X

0

0i
m
ϕ(h0j )(Σ0∞+ )j 0 k hΠ⊥
ϕ(H) ϕg (g ), ϕ(h )i.

j 0 ,k∈[s]

Pr

j
⊥
j=1 aj ϕh (g ) cancels Πϕ(H) and gives the desired result.



Therefore,
r
X

aj ϕ(g j ) +

s
X

0

a0j 0 ϕ(h0j ) + σ ∞ w

j 0 =1

j=1

= (σ ∞ w +

r
X
j=1

d

l

s
X

aj ϕg (g j )) + α

ϕ(h0i )(Σ0∞+ )ij hϕg (g 0j ), ϕ(hm )i

i,j=1
l

l

=H<l ϕg (g ) + ϕh (g ) = ϕ(g )
where H<l is the σ-algebra generated by {fϕ(h) (Z)}h∈(c̄)<l , and (c̄)<l is the collection of all vector vars in c̄ with line
number < l. So we can complete our induction by stating
nct

l
1 X
a.s.
c<l t
φ(glt
) − E φ(fϕ(g ) (Z), {fϕ(h) (Z)}h∈(c̄)<l ) −−→ 0.
i , hi
ct
w,Z
n i=1

—————66

For the second claim, let Cij = hϕ(h0i ), ϕ(h0j )i for all i, j ∈ [s]. We can compute, as in the proof of Lems F.1 and F.3,
X
ϕh (gl ) = α
ϕ(h0i )(C + )ij hϕg (g 0j ), hm i
i,j∈[s]
m

X

=α

ϕ(h0i )(C + )ij K č (ϕg (g 0j ), ϕg (g 0k )) E ∂Z ϕg (g0k ) fh (Z)

i,j,k∈[s]

by Stein’s Lemma Lem E.8
m

X

=α

ϕ(h0i )(C + )ij σ 2 hϕ(h0j ), ϕ(h0k )i E ∂Z ϕg (g0k ) fh (Z)

i,j,k∈[s]

X

= ασ 2 Πϕ(H)

m

ϕ(h0k ) E ∂Z ϕg (g0 k ) fh (Z)

k∈[s]

= ασ

2

X

m

ϕ(h0k ) E ∂Z ϕg (g0 k ) fh (Z)

k∈[s]
m

where σ = σ r∞ and r = line(ϕ(A0 )). This computation goes through as long as fh is differentiable, which is implied by
m
all fl in π being differentiable, or if the covariance K č (ϕg (G0 ), ϕg (G0 )) is nondegenerate (which allows us to consider fh ,
a polynomially bounded function, as a tempered distribution, whose derivatives are also tempered distributions, giving a
valid interpretation to the expectation).
When K č (ϕg (G0 ), ϕg (G0 )) is singular, let I be a minimal subset of [s] such that {ϕ(h0i )}i∈I is linearly independent. We
can compute similarly,
X
ϕh (gl ) = α
ϕ(h0i )(CI+ )ij hϕg (g 0j ), hm i
i,j∈I

X

=α

m

ϕ(h0i )(CI+ )ij K č (ϕg (g 0j ), ϕg (g 0k )) E ∂Z ϕg (g0k ) fhI (Z)

i,j,k∈I

by Stein’s Lemma Lem E.8
X

=α

m

ϕ(h0i )(CI+ )ij σ 2 hϕ(h0j ), ϕ(h0k )i E ∂Z ϕg (g0k ) fhI (Z)

i,j,k∈I

X

= ασ 2 Πϕ(H)

m

ϕ(h0k ) E ∂Z ϕg (g0 k ) fhI (Z)

k∈I

= ασ

2

X

m

ϕ(h0k ) E ∂Z ϕg (g0 k ) fhI (Z)

k∈I
m

m

0j

where cI is the restriction of C to I, and fhI is the version of fh that expands Z ϕg (g ) , j 6∈ I to linear combinations of
0i
0i
{Z ϕg (g ) }i∈I . Then this computation goes through always, since {Z ϕg (g ) }i∈I has a density.

67


```

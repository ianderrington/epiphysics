---
title: "Tensor Programs III: Neural Matrix Laws (arXiv:2009.10685) — Full Text Extraction"
description: >-
  Raw full-text extraction of TP3 in the Tensor Programs series for reproducible computational analysis.
date: 2026-03-21T00:00:00.000Z
draft: true
author:
  name: "epiphysics-open-source"
contentType: article
series: "Tensor Programs Sources"
coverImage:
  url: ./images/tp3_2009.10685.png
  alt: "Mathematical derivations from Tensor Programs series paper TP3"
tts:
  enabled: true
  provider: openai
  voice: onyx
  enableSpeed: true
feedback:
  enabled: true
---

> [!note]
> Source PDF: `docs/research/tensor_programs/sources/TP3_2009.10685.pdf`
>
> Extracted text: `docs/research/tensor_programs/sources/TP3_2009.10685.txt`
>
> DOI: https://doi.org/10.48550/arXiv.2009.10685

## Full extracted text

```text
Tensor Programs III: Neural Matrix Laws

arXiv:2009.10685v3 [cs.NE] 8 May 2021

Greg Yang
Microsoft Research AI
gregyang@microsoft.com

Abstract
In a neural network (NN), weight matrices linearly transform inputs into preactivations that are then transformed nonlinearly into activations. A typical NN
interleaves multitudes of such linear and nonlinear transforms to express complex
functions. Thus, the (pre-)activations depend on the weights in an intricate manner.
We show that, surprisingly, (pre-)activations of a randomly initialized NN become
independent from the weights as the NN’s widths tend to infinity, in the sense of
asymptotic freeness in random matrix theory. We call this the Free Independence
Principle (FIP), which has these consequences: 1) It rigorously justifies the calculation of asymptotic Jacobian singular value distribution of an NN in Pennington et al.
[36, 37], essential for training ultra-deep NNs [48]. 2) It gives a new justification of
gradient independence assumption used for calculating the Neural Tangent Kernel
of a neural network. FIP and these results hold for any neural architecture. We
show FIP by proving a Master Theorem for any Tensor Program, as introduced
in Yang [50, 51], generalizing the Master Theorems proved in those works. As
warmup demonstrations of this new Master Theorem, we give new proofs of the
semicircle and Marchenko-Pastur laws, which benchmarks our framework against
these fundamental mathematical results.

1

Introduction

A neural network (NN), at a high level, is an interleaved composition of linear and nonlinear
transformations. Its weights are the matrices involved in the linear transformations. The image
(resp. input) of nonlinear transformations are called activations (resp. preactivations). Thus, a priori,
(pre-)activations depend in complicated ways on the weights. We show that, surprisingly, the (pre)activations become roughly independent from the weights in the sense of random matrix theory,
when the NN is randomly initialized and as its width tends to infinity. More formally, we prove that
the weights are asymptotically free from the diagonal matrices whose diagonals are the images of
preactivation vectors under any bounded coordinatewise function.1 This result holds for any neural
architecture (i.e. architectural universality)2 . We call this result the Free Independence Principle
(FIP). A major application of FIP is in rigorously justifying a prevalent free independence assumption
in the calculation of NN Jacobian singular value distribution [25, 36, 37, 43, 48], as we overview
below.
Besides FIP, we also prove several other interesting results. In the next few subsections, we discuss
the context required to state them. A summary of all of our contributions appears at the end of this
introduction, and the reader in a hurry may feel free to skip directly to it.
1

Note, however, that we make no claim about trained weights, just random weights.
In this work, architecture refers to the network topology along with the random initialization of parameters,
as specified by a N ETSOR> program (Definition 2.1).
2

1.1

Random Matrix Theory in Deep Learning

Random matrix theory (RMT) has a successful history of being applied in deep learning [25, 36,
37, 43, 48]. For example, RMT has been used to calculate the Jacobian3 singular value distribution
of a wide neural network, which is an important indicator of its architectural soundness: If this
distribution becomes very diffuse as the network gets deeper (i.e. more layers), then an error signal
(i.e. the gradient) will be badly distorted as it is backpropagated. On the other hand, if the distribution
concentrates around 1 even when the network gets deeper, then the error signal is largely preserved,
and all layers of the networks receive adequate signal to improve. This idea is known as dynamical
isometry [36] and has been successfully applied in practice to train ultra-deep networks (as deep as
10,000 layers! [48]).
This calculation of the NN Jacobian singular values distribution can be seen as a vast nonlinear
generalization of the classical problem of calculating the singular value distribution for an iid random
matrix. The solution of this latter problem is famously given by (the square root of) the MarchenkoPastur distribution. A related classical random matrix law is the semicircle law, which says that the
eigenvalue distribution of the sum A + A> of a random real iid matrix A and its transpose A> is
asympotically shaped like a semicircle. Like the utility of NN Jacobian singular values, MarchenkoPastur and the semicircle law have both been impactful in science and engineering and are considered
two fundamental laws of random matrix theory. In fact, the semicircle law was first motivated by a
study of the distribution of energy levels of an atom [21].
Up until recently, the study of the NN Jacobian singular value distribution lacked a rigorous foundation.
The first calculation of it assumed (free) independence (between the weights and the preactivations)
that was only empirically checked but not proved. It was unknown how widespread this phenomenon
actually was. One purpose of this work is filling in that hole: FIP reveals the architectural universality
of this free independence (i.e. the neural network can be as complex as any modern manifestations
and the principle still holds).
1.2

New Approach to Random Matrix Theory

Another purpose of this work is to illustrate a new way to go about random matrix theory, one that
allows us to methodically attack the nonlinear problems of deep neural networks. In contrast, classical
methods of random matrix theory typically heavily rely on the linearity of classical random matrix
ensembles. The expansion technique is one such method. We review how it’s used in linear problems
and show it is ineffective for (nonlinear) neural networks problems.
The expansion technique of classical RMT For example, a typical quantity to calculate is the
expectation of the trace of some matrix power tr(A> A)k for some iid random matrix A. One
common way to proceed is expanding this expression in terms of monomials of the entries of A,
and then counting the different kinds of monomials that arise: such as monomials multilinear in the
entries of A, or monomials where every entry appears quadratically, etc. Given this expansion, the
trace expectation then follows easily.
The expansion technique is ineffective in neural network problems Now, in the (nonlinear)
case of neural networks, the matrix A is usually something more complicated. Take, for example,
A = D2 BD1 B for some iid matrix B and diagonal matrices Di that depend nonlinearly on B. This
dependence can, for example, take the following form: for some iid vector v and φ = tanh (to
be applied coordinatewise), we define u1 = φ(Bv), u2 = φ(Bu1 ) and set Di to have diagonal ui .
Such ensemble A commonly appears as the Jacobian of a neural network. Inspired by the classical
expansion technique described above, one may attack this problem by expanding tr(A> A)k in terms
of entries of A or in terms of entries of B. Because the entries of A are correlated in complicated
ways, it will be hard to use the expansion in A. On the other hand, we cannot even expand tr(A> A)k
cleanly in B because of the nonlinear dependence of Di on B (particularly because of φ)4 .
3

Here we are concerned with the input-output Jacobian of a neural network on a fix input. Some works
consider the Jacobian with respect to the parameters, where the Jacobian has dimension #parameters × #data
points (e.g. [35]). This is a related but distinct case from the input-output Jacobian, which is what we focus on
in this work.
4
We can Taylor expand Di in terms of entries of B but that gets ugly really fast.

2

Thus the usual expansion technique runs into a wall very quickly.
Our proposed method We express the trace tr(A> A)k as an expectation Ev v > (A> A)k v
where v is a standard Gaussian vector5 .
Then we inductively analyze the vectors
Av, A> Av, AA> Av, (A> A)2 v, . . . , (A> A)k v, in a way we will soon describe below. Finally, this
analysis of (A> A)k v will allow us to calculate Ev v > (A> A)k v.
It turns out that the vectors v, Av, A> Av, AA> Av, (A> A)2 v, . . . , (A> A)k v will
1. all have approximately iid coordinates in the large dimension limit, in a suitable sense, i.e.
{(Av)α }α are approximately iid, and similarly for {(A> Av)α }α , {((A> A)2 v)α }α , etc,
where α denotes coordinate index;
2. but the sequence of coordinates vα , (Av)α , (A> Av)α , . . . , ((A> A)k v)α are correlated for
each fixed index α, in the same way across all α.
By analyze, we mean to calculate such correlations. Then Ev v > (A> A)k v is given by the correlation
between vα and ((A> A)k v)α .
Example Let us use the classical example of iid A to make these two points more concrete.
If v ∈ Rn is a standard Gaussian vector, and A ∈ Rn×n , Aαβ ∼ N (0, 1/n) is iid and independent
from v, then it’s not hard to see Av has coordinates which tend to iid Gaussians via some kind
of central limit argument (illustraing point (1)). Next, we will soon see intuitively that A> Av is
asymptotically the sum of v and a random Gaussian vector with iid coordinates, independent from v
(illustrating point (1)). Thus A> Av is coordinatewise correlated with v, illustrating point (2).
To get this intuition, write each coordinate
X
X
X
(A> Av)α =
Aβα Aβγ vγ =
A2βα vα +
Aβα Aβγ vγ ,
β,γ

β

β, γ ∈ [n].

(1)

β;γ6=α

Because each Aβα has variance 1/n, the first sum will converge via law of large numbers to vα .
In the second sum, one can note that each summand is uncorrelated with others (and higher order
correlations drop off rapidly with n), so one may expect the second sum to P
converge to a Gaussian
through some central limit behavior. We can calculate that the second sum β;γ6=α Aβα Aβγ vγ for
different αs will be uncorrelated, so their limits for different α should be independent Gaussians.
Likewise, it should be asymptotically independent from v for the same reason.
This finishes our example and illustrates the overarching philosophy of our proposed
method. But it is still tedious if we have to manually derive the correlation between
vα , (Av)α , (A> Av)α , . . . , ((A> A)k v)α . In addition, it’s not entirely clear at this point that this
method can handle the nonlinear ensemble example A = D2 BD1 B given above. This is where the
Tensor Programs framework is crucial, which we overview now.
1.3

The Tensor Programs Framework

The Tensor Programs framework can be thought of as a clean, scalable, and rigorous packaging of
the intuition explained in the last section. We first demonstrate how one can apply this framework
to compute the correlations between vα , (Av)α , (A> Av)α , . . . , ((A> A)k v)α . Then we describe in
more general terms what the framework is about.
Calculating Ev v > (A> A)k v with Tensor Programs The framework associates a random variable
Z u ∈ R to each u ∈ {v, Av, A> Av, . . . , (A> A)k v}, representing the distribution of coordinates of
>
u in the large n limit. It also comes with a set of symbolic rules to derive Z Av given Z v , Z A Av
Av
v
given Z and Z , and so on. For example, consistent with the intuition laid out in Section 1.2, Z v
and Z Av are defined as independent standard Gaussians (since v and Av are asymptotically standard
>
Gaussian vectors, independent from each other), and Z A Av = Z v + S for a standard Gaussian
v
Av
S ∈ R independent from Z (and Z ). Finally, we can calculate limn→∞ Ev v > (A> A)k v =
>
k
E Z v Z (A A) v .
5

but this identity holds for any v with iid, zero-mean, unit-variance entries

3

def
This set of Z-rules handle nonlinearities. For example, we have Z φ(v) =
φ(Z v ) for any φ : R → R
(where φ on the LHS is applied coordinatewise to the vector v, but is applied in the usual sense to
the scalar random variable Z v on the RHS.) This reflects the intuition that Z φ(v) is the distribution
of φ(v)’s coordinates. As such, it is not hard to see our proposed method in Section 1.2 can deal
with nonlinear random matrix ensembles like the example A = D2 BD1 B given there. The full
description of these rules can be found in Box 1, but we will not dive into more details here.

Tensor Programs in general While a major focus of this paper is on RMT, the original motivation
of Tensor Programs is in understanding wide neural networks. There were 3 lines of research that
molded the framework, which we briefly overview so we can later state some other contributions of
this paper: (Research Line 1) In 1994, Radford Neal [31] discovered that shallow neural networks
with random weights converge to Gaussian processes as their widths tend to infinity. This Neural
Network-Gaussian Process correspondence has become a fascinating topic ever since, with a flurry of
activities in recent years extending it [9, 17, 22, 23, 28, 32, 47]. (Research Line 2) Relatedly, a line
of work, closely connected to the study of Jacobian singular values mentioned above, researched how
signal propagates inside a neural network with random weights [7, 14–16, 36, 38–40, 52–54], and
use such insights to improve the initialization scheme or architecture of neural networks. (Research
Line 3) Recently, Jacot et al. and others [2–5, 11, 19, 24, 55] found that, when trained with gradient
descent, wide, fully connected neural networks evolve like linear models. This resolved many open
questions regarding the training and generalization of neural networks, and was followed by intense
activity generalizing these results to more modern neural architectures [1, 5, 12, 18, 26, 49].
In all three lines of research, each new architecture required a new paper. For example, going from
fully connected networks to convolutional neural networks required careful thinking about how the
newly added dimension of pixel position in the latter changes the argument for the former. It was the
expectation that every architecture is special in some way, and extending the theory to catch up with
modern practice would require a paper covering every major architectural advancement starting from
convolutional neural networks (e.g. normalization layers, attention, etc). Considering the breakneck
pace of empirical deep learning, this “catch-up” might never happen.
It was against this backdrop that the Tensor Programs framework [49–51] surprisingly showed all
three lines of research can be unified into one and simultaneously be generalized to all practically
relevant neural architectures, now or in the future. There are two major insights that make this
possible:
Insight 1 Every computation done in deep learning can be written as a program (i.e. a composition)
of matrix multiplication and coordinatewise nonlinearities6 (for example, a simple neural
network can be written this way as h = W x, y = φ(h) for some activation function φ, like
tanh, applied coordinatewise; the example of A = D2 BD1 B given above can be written
likewise).
Insight 2 In every such computation, if the matrices are randomized, then every vector computed
over the course of such a program has roughly iid coordinates when the matrices’ sizes
are large. However, for each α, the αth coordinates of different vectors will in general
be correlated, in the same way across α, and in a way that can be inductively calculated
from the program structure. The machinery of Tensor Programs allows one to mechanically
perform this calculation.
Note that insight 2 is a generalization of (1) and (2) in Section 1.2, and is reflected in the
Ev v > (A> A)k v example above. Given these two insights, it then becomes rather straightforward to
generalize the three lines of research to any relevant architecture.
1.4

Tensor Programs Master Theorems

The Tensor Programs framework was first laid out in (the unpublished manuscript) Yang [49] but
was written densely. Subsequently, [50] and [51] rewrote, in an accessible, pedagogical way, the
parts of Yang [49] that deal with research lines 1 and 3 above (resp. generalizing Neal and Jacot
et al.) (and research line 2 is essentially covered by the combination of [50] and [51]). The main
6

A coordinatewise nonlinearity is, in the simplest case, a function that is applied to each coordinate of an
input vector independently. More generally, see Nonlin.

4

technical result of each of [50] and [51] is a Master Theorem that tells one how to mechanically track
the correlation between vectors computed in a program. The difference between their versions of the
Master Theorems is in the generality of programs considered: In [50], the Master Theorem applies to
programs that allow one to re-use matrices, but one cannot use both a matrix and its transpose at the
same time. For example, it applies to the computation AAv but not to A> Av (both computations
reuse the matrix A but the latter do so through its transpose A> ). The Master Theorem of [51]
allows A> , but only under some restrictive condition. For example, it 1) allows DA> u where D is a
diagonal matrix with diagonal given by Av, and u and v are independent standard Gaussian vectors,
but 2) disallows A> Av.
Nevertheless, the restrictions of [50] and [51]’s Master Theorems are natural for their respective
settings. Thus, [50] and [51] are able to generalize research lines 1 and 3 to their most practically
relevant scenarios (which is more than enough for the purpose of deep learning), but not all practically
conceivable scenarios (for example, when a weight matrix and its transpose are both used in the
forward pass of a neural network). Furthermore, their Master Theorems are not enough for proving
the random matrix results of this paper, which requires machinery that handles programs like A> Av.
A major contribution of this paper is to prove a Master Theorem for any Tensor Program, without the
restrictions above7 . From this would naturally follow the aforementioned generalizations of [50, 51]
as well as all of the RMT results in this paper.
The Tensor Programs Series This paper will complete the rewriting of Yang [49]. Between [50],
[51], and this paper, most results of Yang [49] are now re-presented in an accessible way. This paper
also finishes the foundation for the current version of the Tensor Programs machinery, which we will
rely on crucially for several future papers. We intend this paper to be an authoritative reference for
the technical details and the formulation of this foundation, going forward.
Summary of Our Contributions 1. We prove the unrestricted Master Theorem, as explained above
(Section 2). 2. Give new proofs of the semicircle and Marchenko-Pastur laws, benchmarking our
theoretical framework against these fundamental mathematical results (Section 3 and Appendix H).
3. Prove the Free Independence Principle (FIP) (Section 4). 4. Apply FIP to rigorously compute the
Jacobian singular value distribution of a randomly initialized NN (Section 5).
For readers familiar with [50, 51], we also: 5. Generalize the GP (research line 1) and NTK (research
line 3) results of [50, 51] by allowing the transpose of any weight matrix in the NN forward
computation (Appendices B and C). 6. Use FIP to give a new proof of how Simple GIA Check allows
one to assume GIA when computing NTK rigorously (Appendix D).
Taken together with [50, 51], this paper shows the versatility and power of the Tensor Programs
technique: To calculate (or show the existence of) some limit, one can just express the quantity of
concern in a Tensor Program and apply the Master Theorem mechanically.

N ETSOR>: Language for Neural Computation

2

There are many versions of languages for Tensor Programs, but we shall focus on one version called
N ETSOR> here. This entire section is summarized in Fig. 1, which we encourage the reader to
regularly consult over the course of this section. Originally, N ETSOR>8 was motivated by a desire
to understand the behavior of large (wide) neural networks. For example, a simple L-hidden-layer
perceptron can be described by alternating applications of nonlinearities and matrix multiplication:
For weight matrices W 1 ∈ Rn×d and W 2 , . . . , W L ∈ Rn×n , and nonlinearity φ : R → R, such a
neural network on input ξ ∈ Rd is given by h1 (ξ) = W 1 ξ ∈ Rn , and9
xl (ξ) = φ(hl (ξ)) ∈ Rn ,

hl+1 (ξ) = W l+1 xl (ξ) ∈ Rn ,

7

for l = 1, . . . , L − 1,

(2)

A version of this general Master Theorem was already presented in Yang [49]. Here we focus on giving a
more organized, pedagogical proof of it as well as a succinct outline.
8
pronounced netsert or netser-T. The ts is pronounced like in tsar. The or is pronounced as in tensor. Another
way of thinking is N ETSOR is just tensor with ten reversed.
9
Following neural network convention, φ(x) = (φ(x1 ), . . . , φ(xn )).

5

= ( 𝑍𝑣1 𝑍𝑣2 𝑍𝑣3

𝑍𝒱

Setup

2
iid 𝒩 0, 𝜎𝑊
/𝑛

𝒲=

entries

𝑣

1

𝑣2

)

𝑘

)

𝑣𝑗

𝒱=

𝑊

MatMul

Nonlin
2
𝒩 0, 𝜎𝑊
𝔼 𝑍𝑥 2

𝑍 𝑊𝑥 = 𝑍ሶ 𝑊𝑥 + 𝑍መ 𝑊𝑥

1

𝑘

𝑍 𝜙(𝑥 ,…,𝑥 ) = 𝜙 ( 𝑍 𝑥
𝑥1

Correction due to (𝑊, 𝑥) correlation

1

𝑍𝑥
𝑥

2

2

𝑍𝑥
𝑥

3

𝑍𝑥

3

𝑥

Netsor⊤ Rules

𝜙(
𝜙(
𝑊

𝑥

)
)
)

𝜙(
𝜙(
𝜙(
ℎ1
𝜓(
𝜓(

1

𝜓(
𝜓(
𝜓(
𝜓(

ℎ2

ℎ3

ℎ𝑘

)
)
)

𝑛→∞

Average
𝑛
1
෍
𝑛

𝑘

)
)
)

𝜙(

Master Theorem

𝑗

𝑍𝑣

𝑣3

𝑎. 𝑠.

𝔼𝜓 ( 𝑍 ℎ1 𝑍 ℎ2 𝑍 ℎ3

𝑍ℎ

𝑘

)

)
)
)

Figure 1: Graphical summary of N ETSOR> and its Master Theorem. Vectors v i are initial vectors of
the program, but xi and hi can be any vector in the program.
and the network output is f (ξ) = v > xL (ξ) for some weight vector v ∈ Rn .10 Thus, intuitively, a
language of solely nonlinearity application and matrix multiplication seems to strike a good balance
between 1) simplicity (and ease of analysis), and 2) generality. Indeed, as shown in Yang [50, 51],
such a language can express practically all of modern deep learning, beyond the toy example here.
Yang [51] formalized a version of this language, called N ETSOR>, which we recall here.
Definition 2.1. A N ETSOR> program is a sequence of Rn vectors (which we will refer to as vectors
in the program) inductively generated via one of the following ways from an initial set V of random
Rn vectors and a set W of random n × n matrices
Nonlin Given φ : Rk → R and x1 , . . . , xk ∈ Rn , we can generate11 φ(x1 , . . . , xk ) ∈ Rn , where
def
φ(x1 , . . . , xk )α =
φ(x1α , . . . , xkα ),

for each α ∈ [n].

MatMul Given W ∈ Rn×n and x ∈ Rn , we can generate W x ∈ Rn or W > x ∈ Rn .
10

For simplicity, we omit biases and set equal the widths of all layers, but these two simplifications can easily
be removed; see Appendix F.
11
Again, φ is applied coordinatewise. Here φ and k should be thought of as fixed while n → ∞.

6

For example, in Eq. (2), hl (ξ) = W l xl−1 (ξ) is an instance of MatMul, while xl (ξ) = φ(hl (ξ)) is an
instance of Nonlin. We are interested in understanding the behavior of N ETSOR> programs when n
is large, and when V and W are sampled as follows:
2
Setup 2.2 (N ETSOR>). 1) For each initial W ∈ W, we sample iid Wαβ ∼ N (0, σW
/n) for some
2
0
variance
σ
associated
to
W
,
independent
of
other
W
∈
W;
2)
for
some
multivariate
Gaussian
 W
Z V = Z h : h ∈ V ∈ RV , we sample the initial set of vectors V like {hα : h ∈ V} ∼ Z V iid for
each α ∈ [n].

Example 2.3. For example, we will often be interested in understanding the behavior of Eq. (2) when
W 1 , . . . , W L are sampled randomly. In this case, W consists of W 2 , . . . , W L ∈ Rn×n , each of
l
which is sampled like Wαβ
∼ N (0, 1/n). On the other hand, V consists of h1 (ξ) = W 1 ξ, which is
d

1
distributed like h1 (ξ)α = N (0, kξk2 /d) if W 1 ∈ Rn×d is sampled like Wαβ
∼ N (0, 1/d).12 If we
1
compute the MLP in Eq. (2) on other inputs ξ1 , . . . , ξk as well, then V = {W ξ, W 1 ξ1 , . . . , W 1 ξk }
1
1
with Z V being the multivariate Gaussian with covariance Cov(Z W ξi , Z W ξj ) = ξi> ξj /m.

As discussed in Section 1.2, to understand a random matrix, it suffices to understand random vectors
calculated from it. How should we understand the random vectors in a N ETSOR> program as
n → ∞? As hinted in Yang [50, 51], it turns out that every vector will have roughly iid coordinates
in this limit, even though matrix multiplication by W or W > will introduce correlation between
coordinates for any finite n. Following Yang [51], we shall define in Box 1 a random variable Z h that
describes this asymptotic coordinate distribution of each vector h; but first, let’s use a few examples
to motivate the rules governing Z h .
1

Example 2.4. In Example 2.3, by Setup 2.2, we already have Z h (ξ) = N (0, kξk2 /n), reflecting the
fact that each coordinate h1 (ξ)α is an iid sample of N (0, kξk2 /n). For brevity, we drop the explicit
1
1
dependence of h and x on ξ below. Next, since x1 = φ(h1 ), we intuitively have Z x = φ(Z h ), as φ
is applied to each coordinate separately.
Now, h2 = W 2 x1 has approximately iid Gaussian coordinates, due to W 2 being sampled independent
of x1 and a central limit argument. By some simple back-of-the-envelope calculation, the Gaussian
1
coordinates should asymptotically have zero mean and variance E(Z x )2 , and they are uncorrelated
2
1
1
1
with x1 . Thus, it makes sense to set Z h = N (0, E(Z x )2 ), independent from Z x and Z h .
l

Our reasoning above can be repeated, and we derive, recursively, that Z h
l−1
l
l
l
l
r
r
N (0, E(Z x )2 ), Z x = φ(Z h ), with Z h , Z x independent from Z h , Z x for all r < l.

=

In this example, the derivation of the Zs seems like a fairly simple repackaging of the central limit
theorem. However, when both a matrix A and its transpose get involved, the derivation can become
complex and subtle quickly, as we show below.
Example 2.5. This is already apparent in the A> Av example in the introduction, where v ∈ Rn is
a standard Gaussian vector, and A ∈ Rn×n , Aαβ ∼ N (0, 1/n) is iid and independent from v. By
Eq. (1), A> Av is roughly v + g for some standard Gaussian vector g independent from v. Therefore,
>
we should set Z A Av = Z v + G for a standard Gaussian G ∈ R independent from Z v .
Compare this with ÃAv for some independent copy Ã of A> . Then the calculation of Example 2.4
would have Z ÃAv be a standard Gaussian independent from Z v . This shows the derivation of the Zs
can require nuance, depending on the interaction between a matrix and its transpose.
It will turn out that, for any vector u that may depend on A and A> , A> u is always a sum of an
asymptotically Gaussian part and a correction term. The Gaussian part comes from assuming A to be
independent from A> and applying a central limit argument as in Example 2.4. The correction term
captures the interaction between A and A> . For instance, if we take u = Av in the A> Av example
above, then the Gaussian part is g and the correction term is v. In contrast, ÃAv doesn’t have the
correction term because Ã and A are independent.
12

In neural network settings, we are interested in the limit where the intermediate dimensions n → ∞ but the
input dimension d stays fixed. Thus, we treat the input-to-hidden matrix W 1 differently from other W l .

7

In the formal definition (Box 1) of Zs, this decomposition of A> u is reflected in the definition of
>
>
>
>
>
Z A u as a sum Ż A u + Ẑ A u . Here Ẑ A u represents the Gaussian part and Ż A u represents the
correction.
Finally, we state the formal definition of Z. Here, the ZNonlin and ZHat rules are probably intuitive
given the examples above, but the ZDot rule may appear cryptic at first. We digest the ZDot rule
more slowly in Remark 2.9 after Box 1.
Box 1

Key Takeaways for Understanding a N ETSOR> Program

Each vector h will have coordinates roughly distributed as some random variable Z h ∈ R (in
a sense to be formalized in Theorem 2.10), which are symbolically defined recursively as:
ZInit If h ∈ V, then Z h is defined as the random variable given in Setup 2.2. We also set
def
def
Ẑ h =
Z h and Ż h =
0.
ZNonlin For any fixed (i.e. constant as n → ∞) k and φ : Rk → R, we have
1

k

1

k

def
Z φ(x ,...,x ) =
φ(Z x , . . . , Z x ).
def
2
ZMatMul Z W x =
Ẑ W x + Ż W x for every Wαβ ∼ N (0, σW
/n) and vector x, where

ZHat Ẑ W x is a Gaussian variable with zero mean. Let VW denote the set of all
vectors in the program of the form W y for some y. Then {Ẑ W y : W y ∈ VW }
is defined to be jointly Gaussian with zero mean and covariance


def 2
Cov Ẑ W x , Ẑ W y =
σW E Z x Z y , for any W x, W y ∈ VW .
Furthermore,
{Ẑ W y : W y ∈ VW } is mutually independent from {Ẑ v : v ∈
S
V ∪ W̄ 6=W VW̄ }, where W̄ ranges over W ∪ {A> : A ∈ W}.
ZDot By the definition in this box, Z x is always a deterministic function of a set
of Ẑ • random variables. Then the partial derivative ∂Z x /∂ Ẑ • can be defined
symbolically and is another random variable. Then we set
X
∂Z x
def 2
,
Ż W x =
σW
Zy E
∂ Ẑ W > y
>

summing over Ẑ W y , W > y ∈ VW > , that Z x is a function of (where VW > is
defined in ZHat). There is some nuiance in this definition, so see Remark 2.11
and 2.12.
The rules above are largely the same as in [51], except the definition of Ẑ W x and Ż W x . In the
restricted N ETSOR> programs of [51], Ż W x turns out to be 0 (see Theorem D.1), so Ẑ W x was
implicitly identified with Z W x . However, a general N ETSOR> program will have Ż W x 6= 0.
Remark 2.6. Note that Z x , Ẑ x , Ż x only depend on how x is computed in the N ETSOR> program
(i.e. the program structure), not the specific (random) value of x.
l
Example 2.7. In Example 2.4, Ż h as defined in ZDot is always zero (because we never use W l>
1
1
in Eq. (2)), and by ZMatMul, we simply have Z h = Ẑ h = N (0, kξk2 /d), and recursively,
l
l
l−1
l
l
Z h = Ẑ h = N (0, E(Z x )2 ), Z x = φ(Z h ), exactly as derived in Example 2.4.
Example 2.8. Write x = A> Av in Example 2.5 as an explicit N ETSOR> program y = Av, x = A> y.
y
Then by ZHat, Ẑ x = N (0, 1), independent from Z y and Z v . By ZDot, Ż x = Z v E ∂∂Z
=
Ẑ Av
Av

Z v E ∂(Ẑ ∂ Ẑ+AvŻ

Av

)

= Z v E 1 = Z v . This verifies the decomposition A> Av ≈ v + g in Example 2.5.

Remark 2.9 (Intuition for definition of Z h ). The rules ZInit and ZNonlin aptly follow the stated
intuition of “Z h as coordinate distribution of h.” The ZMatMul rule is more complex, so let’s digest
it a bit.
First suppose W > is never used in the program. Then Ż W x vanishes, and Z W x = Ẑ W x . The
definition of Ẑ W x then roughly says W x is an isotropic Gaussian vector, which is correlated with
8

2
other vectors of the form W x̄ in a natural way: hW x, W x̄i ≈ σW
hx, x̄i, where h, i denotes dot
product.

However, if W > is used previously, then this “Gaussian description” of W x needs a correction. The
definition of Ż W x says this correction is a linear combination of previous vectors y i such that W > y i
has been used to compute x.
Let us illustrate the meaning of the coefficients of this linear combination through some simple
calculations. If W ∈ Rn×n , Wαβ ∼ N (0, 1/n), and x ∈ Rn , then W x should be correlated with
W . If x depends on W > y i for a collection of vectors {y i }i , then we can detect this correlation as
follows: with h, i denoting dot product, for each i,
hy i , W xi = hW > y i , xi.
Thus, if x is correlated with W > y i , then W x should also be correlated with y i . The ZDot rule,
remarkably, says that such correlations are the only correction needed to the “Gaussian description”
of W x: W x splits into the sum of 1) a component with coordinates ≈ Ż W x that resides in the linear
span of {y i }i , which is entirely determined by the inner products hy i , W xi = hW > y i , xi for all i,13
and 2) another orthogonal component with coordinates ≈ Ẑ W x that comes from naively assuming
W > to be independent of W .
The following Master Theorem rigorously relates the symbolically constructed random variables Z h
to the vectors h in the program and their analytic limits. It is one of our main results and will also be
our main workhorse in this paper.
Theorem 2.10 (N ETSOR> Master Theorem). Fix a N ETSOR> program. Suppose the initial matrices
W and vectors V are sampled in the fashion of Setup 2.2. Assume all nonlinearities φ used in Nonlin
are polynomially bounded. Then for any fixed k and any polynomially bounded14 ψ : Rk → R, as
n → ∞,
n
1
k
1X
a.s.
ψ(h1α , . . . , hkα ) −−→ E ψ(Z h , . . . , Z h ),
(3)
n α=1
i

for any collection of vectors h1 , . . . , hk in the program, where Z h are defined in Box 1.15
Theorem 2.10 says that each “coordinate slice” (h1α , . . . , hkα ) can be thought of as an iid copy of
1
k
(Z h , . . . , Z h ). Indeed, as consequences of the Master Theorem, Theorems A.5 and A.6 formalize
this intuition into a convergence in distribution. Versions of Theorem 2.10 with convergence in mean
(instead of almost sure) are also available (Theorems A.1 and A.2). Theorem 2.10 strictly generalizes
the Master Theorem in Yang [51]. The N ETSOR Master Theorem in Yang [50] allows nonlinearities
growing faster than polynomially, but otherwise is also a special case of Theorem 2.10. We outline
the proof of Theorem 2.10 in Section 6 and give a full proof in Appendix L.
Remark 2.11 (Partial derivative). The partial derivative in ZDot should be interpreted as follows.
By a simple inductive argument, Z x for every vector x in the program is defined uniquely as a
1
k
deterministic function ϕ(Ẑ x , . . . , Ẑ x ) of some x1 , . . . , xk in V or introduced by MatMul.16 For
instance, in Example 2.8, Z x = Ẑ x + Ẑ v if v ∈ V, so ϕ is given by ϕ(a, b) = a + b. Then
i

1

k

def
∂Z x /∂ Ẑ x =
∂i ϕ(Ẑ x , . . . , Ẑ x ),

def
∂Z x /∂ Ẑ z =
0 for any z 6∈ {x1 , . . . , xk }.

and

Note this definition depends on the precise way the program is written, not just on the underlying
mathematics. For example, if y, z ∈ V and x = φ(W (y + z)), then Z x = φ(Ẑ W (y+z) ) so that
∂Z x /∂ Ẑ W y = ∂Z x /∂ Ẑ W z = 0. If instead, we have x = φ(W y+W z), then Z x = φ(Ẑ W y + Ẑ W z )
>
so that ∂Z x /∂ Ẑ W (x+y) = 0. However, in both cases, Ż W x = (Z y + Z z ) E φ0 (Ẑ W (y+z) ).
13

The set of coefficients { n1 hW > y i , xi ≈ E Z W
W

> i

y

x

> i

y

Z x }i is linearly related to the coefficients

{E Ẑ
Z }i , as can be seen from an easy inductive argument. The latter is then linearly related to the partial
derivative expectations of ZDot by Remark 2.12.
14
φ : Rk → R is polynomially-bounded if |φ(x)| ≤ Ckxkp + c for some p, C, c > 0, for all x ∈ Rk .
15
Difference with [49, Thm 6.3]: We have gotten rid of the “rank convergence” assumption (which we
call “rank stability” in this paper) by showing that it comes for free. See Theorem 6.3 and see CoreSet and
Lemma L.11 in Appendix L.
16
In the context of N ETSOR>+ introduced later in Appendix E, this is still true, but ϕ here will take the form
of a parametrized nonlinearity ϕ(−; θ̊1 , . . . , θ̊l ) with some deterministic parameters θ̊1 , . . . , θ̊l .

9

Remark 2.12 (Partial derivative expectation). The quantity E
>

∂Z x
is well defined if Z x is differen∂ Ẑ W > y
>

tiable in Ẑ W y . However, even if this is not the case, e.g. if x = θ(W y) where θ is the Heavyside
step function, we can still define this expectation by leveraging Stein’s lemma (Lemma K.4):

In ZDot, suppose {W > y i }ki=1 are all elements of VW > introduced before x. Define the matrix
i
j
> i
def
def
C ∈ Rk×k by Cij =
E Z y Z y and define the vector b ∈ Rk by bi =
E Ẑ W y Z x . If a = C + b
+
(where C denotes the pseudoinverse of C), then in ZDot we may set
2
σW
E

∂Z x

= ai .
(4)
∂ Ẑ W > yi
This definition agrees with the partial derivative expectation by Stein’s lemma (Lemma K.4) when the
latter is well defined. Theorem 2.10 holds with this broader definition of partial derivative expectation.
Extensions In Appendix E, we describe N ETSOR>+ , an extension to N ETSOR> by allowing
programs to compute the average coordinate of a vector, and use such scalars in Nonlin. In
Appendix F, we also describe modification to the Master Theorems if, instead of requiring all
matrices in W to be square, we allow rectangular matrices.

3

Semicircle Law

The Semicircle Law [45, 46] is a classical result, of central importance in statistics, physics, and
engineering [8, 20, 29, 44], on the spectrum of a random Hermitian matrix with independent, zeromean entries. It says that, as the size of the matrix tends to infinity, the distribution of its eigenvalues
tends to a semicircle distribution.
√
Definition 3.1. The semicircle distribution µsc is the distribution with density ∝ 4 − x2 .
Theorem 3.2 (Semicircle Law for GOE). For each n ≥ 1, define the random symmetric matrix17 A =
A(n) = W + W > for iid Gaussian matrix W ∈ Rn×n , Wαβ ∼ N (0, 1/2n). Let λ1 , . . . , λn ∈ R
be the eigenvalues of A; these are random variables. Then for every compactly supported, continuous
ϕ : R → R, as n → ∞, we have
n

1X
a.s.
ϕ(λα ) −−→ E ϕ(λ).
λ∼µsc
n α=1
In this section, we give a new proof of this beautiful result using the N ETSOR> Master Theorem.
Our purpose is two-fold: we 1) give concrete examples of how to compute with the Master Theorem,
especially the new Ż W x rule, and 2) demonstrate our framework is at least powerful enough to prove
this cornerstone result. In Appendix H, we also prove the Marchenko-Pastur Law with this technique.
By the well-known Moment Method (see Fact G.2), it suffices to prove
a.s.

n−1 tr Ar −−→

E λr ,

λ∼µsc

r = 1, 2, . . .

It is well known that the semicircle distribution has moments given by the Catalan numbers Ck

Ck if r = 2k
r
E λ =
λ∼µsc
0
otherwise
where the Catalan numbers Ck are the unique numbers satisfying
C0 = 1,

Ck+1 =

k
X

Ci Ck−i .

(5)

i=0

The first few Catalan numbers are C0 = 1, C1 = 1, C2 = 2, C3 = 5, C4 = 14. For more background,
see Tao [42].
17
This is known as the Gaussian Orthogonal Ensemble (GOE). While we will only talk about the GOE case
here, the semicircle law holds for generic random matrices with iid entries. We hope to show universality of
N ETSOR> Master Theorem in the future, which would automatically generalize our proof here to such cases.

10

3.1

The Main Proof Idea

We need to show for all integers k,
a.s.

a.s.

n−1 tr A2k −−→ Ck , and n−1 tr A2k+1 −−→ 0.
To do so, we use a trivial but useful equality: for any M ∈ Rn×n
tr M = E z > M z,
Then

z ∼ N (0, I).

for

z

(6)

tr A2k = E z > A2k z,
z

which we can express as a N ETSOR> program: Let V = {z}, and W = {W } (with sampling data
2
Z z = N (0, 1), σW
= 1/2). With z 0 = z, we define recursively
y t = W > z t−1 ,

xt = W z t−1 ,

z t = xt + y t .

(7)

Then, mathematically, we have computed
z t = At z,

tr At = E z > z t .

and thus

z

Note At is the tth power of A but the t in xt , y t , z t appear as indices. By the Master Theorem (and
some additional arguments below), it then suffices to show
E ZzZz
3.2

2k

= Ck , E Z z Z z

2k+1

a.s.

a.s.

= 0 so that n−1 E z > z 2k −−→ Ck , n−1 E z > z 2k+1 −−→ 0
z

z

Examples of First Few Moments
t

t

t

We first construct the random variables Z z , Z x , Z y , for z t , xt , y t defined in Eq. (7). While we can
do the proof much more succinctly, in the pedagogical spirit, let’s do the first few manually to get a
feel for it.
0

1

1

1

1

First Moment First we have Z z = N (0, 1) by definition. Then Z x = Ẑ x + Ż x = Ẑ x because
1
1
0
2
we have not used W > yet, so Ż x = 0. Now, by ZHat, E(Ẑ x )2 = σW
E(Z z )2 = 1/2 · 1 = 1/2.
1
1
0
Therefore, Z x = Ẑ x is a Gaussian with zero mean and variance 1/2, independent from Z z .
1

0

1

A similar reasoning shows Ẑ y = N (0, 1/2) as well, independent from Z z and Z x . Next we apply
1
1
ZDot to calculate Ż y . But y 1 does not depend on any vector of the form W > •, so Ż y = 0. Thus,
1
1
Z y = Ẑ y , as a summary,
0

Z z = N (0, 1),

1

1

Z x = N (0, 1/2),
i

Z y = N (0, 1/2),

i

all independent from each other. In general, Z y and Z x are symmetric, as illustrated here. Then
 1 2
1
1
1
1
0
a.s.
Z z = Z x + Z y =⇒ E Z z
= 1 and n−1 tr A −−→ E Z z Z z = 0.
Second Moment

Next,
2

2

2

Z x = Ẑ x + Ż x
2
1
1
1
with Ẑ x independent from Z y , Z z , but jointly Gaussian with Ẑ x = Z x with (co-)variance
2
1
2
1
1
0
1
1
1
E(Ẑ x )2 = E(Z z )2 = , Cov(Ẑ x , Ẑ x ) = E Z z Z z = 0 (i.e. independent).
2
2
2
On the other hand, since y 1 = W > z 0 is the only usage of W > in defining x2 ,
1

2

Ż x =

1 z0 ∂Z z
1 0
1 0
Z E
= Zz E 1 = Zz .
1
y
2
2
2
∂ Ẑ

Altogether, we have
2
2
2
2
2
2
2
2
1 0
1 0
Z x = Ẑ x + Ż x = Ẑ x + Z z , and symmetrically, Z y = Ẑ y + Ż y = Ẑ y + Z z .
2
2
2
2
0
Since Ẑ x and Ẑ y are zero-mean and independent from Z z , we have
2

2

2

2

2

Z z = Z x + Z y = Ẑ x + Ẑ y + Z z

0

a.s.

2

0

0

=⇒ n−1 tr A2 −−→ E Z z Z z = E(Z z )2 = 1 = C1 .
11

3.3

Proof for General Moments
t

t

0

Overview Notice how Z z , t = 1, 2, above are of the form Z Z = τt Z z + S for some τt ∈ R
0
t
and some zero-mean S independent from Z z . We will show this is the case for all Z z , so that
t
0
0
0
E Z z Z z = E(τt Z z + S)Z z = τt . By Theorem 3.3 below (which is just the Master Theorem
plus a standard truncation argument to turn the almost sure convergence into almost sure convergence
a.s.
of conditional expectations), this means n−1 tr At = n−1 Ez z > z t −−→ τt . Finally, we will show
τ2k+1 = 0 and τ2k satisfies the same recurrence as Ck , which then yields the desired result.
The following theorem is a direct consequence of the more general Theorem A.2.
Theorem 3.3. With the same premise as in Theorem 2.10, suppose further ψ is quadratically bounded
and all nonlinearities used in Nonlin are linearly bounded. Let S ⊆ V be a subcollection of initial
vectors. Then
n
1
k
1 X
a.s.
E
ψ(h1α , . . . , hkα ) −−→ E ψ(Z h , . . . , Z h ).
(8)
n S α=1
where ES denotes conditional expectation given the values of vectors in V \ S and of matrices in W.
s

s

0

Calculations In general, {Ẑ x }s , {Ẑ y }s , Z z are zero-mean and independent from one another.
s
We have {Ẑ x }s is jointly Gaussian with covariance
s

r

Cov(Ẑ x , Ẑ x ) =

s−1
r−1
1
E Zz Zz
2

s

and {Ẑ y }s satisfies symmetric covariance identities. In addition, by ZDot,
t−1

Ż x

t+1

=

t−1

t

1 X zs
∂Z z
Z E
,
2 s=0
∂ Ẑ ys+1

Ż y

t+1

=

t

1 X zs
∂Z z
Z E
2 s=0
∂ Ẑ xs+1

It’s easy to see that there are deterministic coefficients bts ∈ R (independent of n) so that
t

Zz =

t
X

s

s

0

bts (Ẑ x + Ẑ y ) + bt0 Z z .

(9)

s=1

Then

t

a.s.

0

n−1 tr At −−→ E Z z Z z = bt0 .

Note
∂Z z

t

∂Z z

=
s

t

∂ Ẑ ys

∂ Ẑ x

= bts .

Consequently,
t−1

Ż x

t+1

= Ż y

t+1

=

1 X zs t
Z bs+1
2 s=0

and
Z

z t+1

= Ẑ

xt+1

+ Ẑ

y t+1

+ Ż

xt+1

+ Ż

y t+1

= Ẑ

xt+1

+ Ẑ

y t+1

+

t−1
X

s

Z z bts+1

s=0

= Ẑ

x

t+1

+ Ẑ

y

t+1

+

t−1
X

bts+1

s=0

= Ẑ x

t+1

+ Ẑ y

t+1

+

s
X

!
bsr (Ẑ x

r

+ Ẑ

y

r

0
) + bs0 Z z

r=1

t−1
t−1
t−1
X
X
r
r X
0
(Ẑ x + Ẑ y )
bsr bts+1 +
bs0 bts+1 Z z
s=r

r=1

s=0

Matching coefficients with Eq. (9), this implies
bt+1
t+1 = 1,

bt+1
=
r

t−1
X
s=r

12

bsr bts+1 , ∀r ≤ t − 1.

Using the Catalan identity Eq. (5), we can check that the solution is

C(t−r)/2 if t − r is even
t
br =
0
otherwise.
Then
a.s.

n−1 tr A2k −−→ b2k
0 = Ck ,

a.s.

n−1 tr A2k+1 −−→ b2k+1
=0
0

as desired.
3.4

Comparison with the Classical Proof

The classical way of calculating the expected moments E tr Ak is to expand this trace as a sum of
products Aα1 α2 · · · Aαk α1 of entries of A, and then notice that all summands contribute vanishingly
other than those that have each unique term Aαi αi+1 appear with power 2. Then the computation of
E tr Ak to top order can be seen to boil down to a counting problem of non-crossing partitions. Since
the solution of such counting problem is exactly the Catalan numbers, we have the desired result.
In contrast to this classical proof, our proof by Tensor Programs is purely symbolic (i.e. does not
require manually identifying leading and subleading terms and doing the combinatorics). The role of
the mathematician here has been mostly to express the moment computation as a N ETSOR> program,
and the rest follows from the Master Theorem (and can be done by a computer). While perhaps after
unwinding, this technique may be implicitly doing a sort of combinatorics similar to the classical
proof, we believe this particular way of repackaging is useful. Indeed, when the matrix ensemble in
question involves nonlinear dependencies, such as in a neural network Jacobian, our techique applies
readily (see Section 5), while the classical proof is hard to transfer as we can no longer expand the
matrix power in terms of the matrix entries because of the nonlinear dependencies18 .
Universality On the other hand, a current drawback of this Tensor Programs proof is the limitation
of the Master Theorem to Gaussian matrices. However, we expect universality will hold in our case,
and the Master Theorem can be proven for general, iid matrices, for example through some version
of the Lindeberg Replacement Trick. We leave this to future work.

4

The Free Independence Principle of N ETSOR> Programs

A powerful analogue of independence (of scalar random variables) in random matrix theory is called
Asymptotic Free Independence, or Asymptotic Freeness, defined below in Definition 4.1.
Definition 4.1. Fix k. Consider collections of random matrices Wn1 , . . . , Wnk ⊆ Rn×n for each
n ≥ 1, of constant cardinalities (with n). (For example, each Wni can be {W, W > } for some weight
matrix W in a neural network). We say Wn1 , . . . , Wnk are almost surely asymptotically free19 , if
!
k
Y

a.s.
n−1 tr
Pi (Wnji ) − τi
−−→ 0
i=1

where τi = n−1 tr(Pi (Wnji )), Pi is a (noncommutative) polynomial in |Wnji | variables, and
j1 , . . . , jk ∈ [k] are indices with no two adjacent ji equal, with {Pi }i , {ji }i independent of n.20 21
18
One can still naively expand through the nonlinearities by Taylor expansion, but 1) this requires the
nonlinearities to be smooth, and 2) this asks for significant effort for the mathematician to count and bound the
lower order terms. In contrast, the proof by Tensor Programs will be, for the most part, mechanical, following
the Master Theorem, and allows nonsmooth nonlinearities.
19
We can also speak of asymptotically free in expectation, in which case, we want the expectation of the trace
to converge to 0. In most scenarios (where we have tail bounds on the matrix operator norms), this is a weaker
notion than almost
Q sure asymptotic freeness.
20
Note here is a non-commutative product, where in its expansion, i goes from right to left.
21
One can also formulate the asymptotic freeness of subalgebras of a non-commutative algebra, in which case
our definition here is equivalent to the freeness of the subalgebras generated by the respective collections of
random matrices.

13

Whereas the independence of scalar random variables allows one to compute the expectation of
their sum and product easily, the asymptotic freeness of random matrices allows one to compute
the asymptotic spectral distributions of their sum and (matrix) product easily. Independence implies
that two random variables are in “general position” and thus cannot conspire to fluctuate in the
same direction. Likewise, asymptotic freeness of two random matrices, intuitively, implies that their
respective eigenvectors and eigenvalues lie in general position to each other, so that their spectral
distributions would combine in predictable ways were they to be summed or multiplied. For more
background, see [42].
A priori, because the activations and preactivations of a neural network depend in a highly nonlinear
and complex manner in the weight matrices (and biases), one can hardly suspect that activations can
be “independent” from the weight matrices in some way. However, we will show, in a randomly
initialized neural network of any architecture, the weight matrices are asymptotically free from (the
diagonal matrices formed from) the preactivations of the network. This will follow from the much
more general Free Independence Principle of N ETSOR> programs, Theorem 4.2. We give a proof in
Appendix J that follows the same overall strategy as the proof of the Semicircle Law in Section 3.
Theorem 4.2 (Free Independence Principle, for Tensor Programs). Consider any N ETSOR> program
π with polynomially bounded nonlinearities and Setup 2.2. Then the random matrix collections
{W, W > } for every W ∈ W, along with the collection of diagonal matrices D(π) (defined immediately below in Definition 4.3) are asymptotically free as n → ∞.
Definition 4.3. Suppose X is a subset of (Rn ) vectors in a program. Let D(X ) denote the (infinite)
collection of diagonal matrices formed from bounded, coordinatewise images of X :
def
D(X ) =
{Diag(ψ(x1 , . . . , xk )) : k ≥ 0; x1 , . . . , xk ∈ X ; ψ : Rk → R bounded} ⊆ Rn×n .
(10)
If π is a program, we write D(π) to denote D({all vectors in π}).

Note ψ in Eq. (10) is distinct from the nonlinearities in the program π. For example, if π expresses
the forward pass of a ReLU MLP, then π has unbounded nonlinearity (ReLU) but ψ in Eq. (10)
can be the step function, which is bounded. We have kept ψ bounded in Eq. (10) for technical
reasons (similar to the appearance of bounded continuous functions in the definition of convergence
in distribution). But we believe Theorem 4.2 holds when ψ is more generally polynomially bounded.
This generalization would follow if Theorem 2.10 holds for almost sure convergence of conditional
means; see Conjecture A.4.
Intuition and Discussion One can perhaps accept N ETSOR> programs as a formalization of
“reasonable ways” to compute vectors (and their diagonal matrices) from a set of random matrices.
Then FIP says that a random Gaussian matrix is asymptotically free from any diagonal matrix that
“depends on it in a reasonable way.” This formalizes the intuition that singular vectors of Gaussian
matrices are in general position to singular vectors of diagonal matrices, so one may expect these
matrices to be asymptotically free.
We shall see next that Theorem 4.2 allows us to easily compute the asymptotic Jacobian singular
value distribution of a randomly initialized neural network.
Extension to N ETSOR>+ programs with variable dimensions Theorem 4.2 holds as stated for
N ETSOR> programs with variable dimensions. It also holds for N ETSOR>+ programs with variable
dimensions if nonlinearities are parameter-controlled and rank stability (Assumption E.7) is satisfied.

5

Jacobian Singular Values of a Randomly Initialized Neural Network

Notation We denote the empirical spectral distribution of a random matrix W by µW .22 We write
µW  µV to denote the free multiplicative convolution of µW and µV .23
Review of semirigorous computation of Jacobian singular value distribution in prior works.
Analyses in previous works [36] are mostly semirigorous and proceed, for example, as follows:
P
i.e. µW = n1 n
α=1 δλα , where δλα is the Dirac Delta distribution centered on the αth eigenvalue λα .
If W and V are asymptotically free random matrices, then µW  µV converges to the asymptotic spectral
distribution of W V . See Speicher [41] for more details on free probability.
22

23

14

If f (ξ) is an MLP as in Eq. (2) with width n, then the Jacobian J = ∂hL /∂h1 ∈ Rn×n , on a fixed
input ξ, can be written as24
J = W L DL−1 W L−1 DL−2 · · · W 2 D1 ,
where W are its weight matrices and Dl = Diag(φ0 (hl )) are the diagonal matrices with activation
derivatives on the diagonals. Then the singular values of J are the square roots of the spectrum of
l

J > J = D1 W 2> · · · DL−1 W L> W L DL−1 · · · W 2 D1 .
1
Now here’s the non-rigorous part: With the random initialization Wαβ
∼ N (0, 1/d) and
2
L
Wαβ , . . . , Wαβ ∼ N (0, 1/n), prior works assume that the random matrix collections
{W 2 , W 2> }, . . . , {W L , W L> }, {D1 }, . . . , {DL−1 } are asymptotically free.
(11)
Then, with this assumption, noting that the spectrum of AB and BA agree for any two matrices A, B
of appropriate sizes25 , we have
µJ > J = µD1 W 2> ···DL−1 W L> W L DL−1 ···W 2 D1 = µ(D1 )2 W 2> ···DL−1 W L> W L DL−1 ···W 2
so that, by the freeness asumption of D1 from the other matrices, we have
lim µJ > J = lim µ(D1 )2  lim µW 2 ···DL−1 W L> W L DL−1 ···W 2
n→∞

n→∞

n→∞

where  denotes multiplicative free convolution. Repeating this logic yields
lim µJ > J = lim µ(D1 )2  lim µW 2 W 2>  · · ·  lim µW L W L> .
n→∞

n→∞

n→∞

n→∞

Since limn→∞ µW i W i> is just the Marchenko-Pastur distribution (Eq. (26)) and limn→∞ µ(Dl )2 is
l
(at least, at the time, heuristically) distributed like φ0 (Z h ), the standard S-transform technique (see
Speicher [41]) allows one to explicitly compute limn→∞ µJ > J .
Our contribution Of course, by Theorem 4.2 and the N ETSOR> program Eq. (2), Eq. (11) is now
completely rigorous. In fact, Theorem 4.2 implies a much more general result.
Corollary 5.1 (Free Independence Principle). In any randomly initialized neural network expressible
in N ETSOR> program π with polynomially bounded Nonlin, the weight matrices are asymptotically free from (the diagonal matrices formed from) bounded images of all preactivations: the
random weight matrix collections {W, W > } for matrices W ∈ W, along with D(π) (defined
in Definition 4.3), are asymptotically free. Furthermore, for any mutually independent partition
X1 , . . . , Xk of {Z x : x ∈ π}, the random diagonal matrix collections D({x : Z x ∈ X1 }), . . . , D({x :
Z x ∈ Xk }) are asymptotically free.
Since almost all neural networks can be written in N ETSOR>, as shown in Yang [50, 51], Corollary 5.1
is a very universal result. By this corollary, the entire computation above in fact (after easily checking
1
L−1
Zh , . . . , Zh
are mutually independent) yields a proof of the following almost sure convergence:
Theorem 5.2. Consider an MLP f (ξ) as in Eq. (2) with L hidden layers, width n, and nonlinearity
φ with bounded weak derivative26 φ0 . Then its Jacobian J = ∂hL /∂h1 ∈ Rn×n on a fixed input
ξ ∈ Rd has the n → ∞ limit
a.s.

(L−1)
µJ > J −−→ µφ0 (Z h1 )  · · ·  µφ0 (Z hL−1 )  µmp

where µmp is the Marchenko-Pastur distribution with shape ratio 1 (see Eq. (26)), µφ0 (Z hl ) is the
l

a.s.

distribution of the random variable φ0 (Z h ), and −−→ denotes almost sure convergence of random
measures (Definition G.1).
Most nonlinearities φ in deep learning practice have bounded weak derivatives (such as tanh or
ReLU), and thus is covered by Theorem 5.2. When φ is identity, Theorem 5.2 just recovers the
Marchenko-Pastur Law. Note here the dependence of µJ > J on input ξ comes purely through
µφ0 (Z h1 ) , . . . , µφ0 (Z hL −1 ) .
24
Note we study the Jacobian of the body of the network, whose dimensions n tend to infinity. The perhaps
more natural input-output Jacobian has finite dimensions, so there’s no asymptotic distribution to speak of.
25
This can be seen by applying Sylvester’s Determinant Theorem det(zI − AB) = det(zI − BA) on the
characteristic polynomials of AB and BA.
26
i.e. φ is almost everywhere differentiable and φ0 is a function that agrees with this derivative almost
everywhere. ReLU is a typical example of φ, whose weak derivative is the step function and is bounded.

15

Generalizations Theorem 5.2 generalizes straightforwardly to the case when the MLP has non-unit
(L−1)
width ratios, in which case the µmp
should be replaced by free multiplicative convolution of
Marchenko-Pastur distributions of different shape ratios (see Eq. (26)). Also, like the remark below
Theorem 4.2, we expect Theorem 5.2 holds if φ0 is just polynomially bounded and Corollary 5.1
holds if D is defined using polynomially bounded (instead of bounded) ψ. We leave this to future
work.
Computing the Jacobian Singular Value Distribution of Any Neural Architecture More generally, Corollary 5.1 allows us to compute the Jacobian singular value of neural networks of any
architecture (such as residual networks, recurrent networks, convolutional networks, etc).
Indeed, the Jacobian can always be expressed as a polynomial in the matrices and (the diagonal
matrices formed from) vectors of an appropriate N ETSOR> program. By Corollary 5.1, these random
matrix collections are asymptotically free. The asymptotic spectral distribution of such a polynomial
in asymptotically free matrices can be computed via operator-valued free probability [30, Chapter
10]. Thus our result here yields a general algorithm for computing the asymptotic singular value
distribution of the Jacobian of a randomly initialized neural network of any architecture. Alternatively,
one can always resort to explicit moment computations via Tensor Programs, as in Section 3.
Simple GIA Check Implies GIA It turns out that the Neural Tangent Kernel depends on the
computation of backpropagation only through quantities that can be expressed as 2nd moment of
Jacobian singular values, if Simple GIA Check (Condition 1) holds. By the results of this section, we
thus can replace the matrices W > in backpropagation with copies that are independent from W the
forward pass. See Appendix D for more details.

6

Proof Sketch of the Master Theorem

Here we explain the main ideas of the proof of Theorem 2.10. The Master Theorems of Yang
[50, 51] all use some subset of these ideas for their proofs, so this section also summarizes the core
insights there. We start by proving an easier version of Theorem 2.10 that assumes all nonlinearities
in Nonlin are sufficiently smooth (Section 6.1). Then we show how to remove the smoothness
assumption (Sections 6.2 and 6.2.2). Finally, we give an outline in Section 6.3 for proving the form
of Ż in Box 1.
6.1

Master Theorem Proof Sketch with Sufficient Regularity Assumptions

A natural intuition for proving the Master Theorem is to perform induction on the number of
vectors. Suppose further for simplicity that all matrices W ∈ W, W ∈ Rn×n are sampled like
Wαβ ∼ N (0, 1/n) . Here we sketch the proof of the simpler statement that Eq. (3) converges to
some limit, when all nonlinearities φ used in Nonlin are smooth enough. We will discuss the form
of the limit itself in another section (Section 6.3). Under these assumptions, the core idea is similar
to the proof of Bayati and Montanari [6] for Approximate Mesage Passing (but we will not require
knowledge of this proof below).
Definition 6.1. We say a vector is a G-var if it is in V or it is introduced by MatMul.27
Suppose the program has G-vars g 1 , . . . , g m introduced in that order. Since all other vectors can
be expressed as a Nonlin image of them, it suffices to prove Eq. (3) for g 1 , . . . , g m , i.e. for any
sufficiently smooth ψ : Rm → R, we have
n

1
m
1X
a.s.
ψ(gα1 , . . . , gαm ) −−→ E ψ(Z g , . . . , Z g ).
n α=1

(12)

The base case is when g 1 , . . . , g m ∈ V are the initial vectors. Then Eq. (12) converges by law of
large numbers.
27
The letter G elicits the intuition that the vector is roughly Gaussian plus a correction term. We will not use
the terms A-var and H-var from Yang [49, 50, 51], in favor of more intuitive terms matrix and vector in the
program.

16

For the inductive case, suppose g m+1 = Ah, where h = φ(g 1 , . . . , g m ), for some sufficiently smooth
φ : Rm → R, and WLOG for A ∈ W. We want to show Eq. (12) for m ← m + 1. The key idea is to
condition A on g 1 , . . . , g m , and then try to reduce Eq. (12) for m + 1 to Eq. (12) for m through a law
of large numbers on the remaining randomness in g m+1 . This conditioning puts a linear constraint
on A in the form of
X = AY,

U = A> V

for matrices X, Y, U, V with previous vectors as columns. For example, if the program is {g 2 =
Ag 1 , g 3 = A> g 2 }, then conditioning on g 1 , g 2 , g 3 , we have X = g 2 , Y = g 1 , U = g 3 , V = g 2 .
By standard formulas for Gaussian conditioning (see Lemma K.9), we can derive the following
conditional distribution28
d

A =g1 ,...,gm E + Π1 ÃΠ2 ,



d
g m+1 =g1 ,...,gm E + Π1 ÃΠ2 h,

where Ã is an iid copy of A, E ∈ Rn×n is the “conditional mean”, and Π1 , Π2 ∈ Rn×n are
two orthogonal projection matrices into subspaces of dimension n − O(1). Then we can see each
coordinate gαm+1 is conditionally distributed like (Eh)α + σΠ1 ζ where σ 2 = kΠ2 hk2 /n and
ζ ∼ N (0, I). Now we make several approximations that can be made rigorous using the smoothness
of ψ:
1. Since Π1 has small corank, we approximate Π1 ≈ I.29
2. It turns out σ 2 can be rewritten as a continuous function of quantities in the form of Eq. (12),
a.s.
so by induction hypothesis, σ −−→ σ̊ for some deterministic limit σ̊ ≥ 0 (see Lemma L.6).
We make the approximation σ ≈ σ̊.
Pr
3. Similarly, it turns out Eh = i=1 ai hi where hi are some previous vectors (which are
necessarily Nonlin images of g 1 , . . . , g m ), and each ai is a (continuous function of) average
a.s.
of Eq. (12)’s form (see Lemma L.7). They converge ai −−→ åi by induction hypothesis, so
we approximate ai ≈ åi . Noet that the specific forms of ai and hi here will dictate the form
m+1
of Ż g
; see Section 6.3.
In summary, we have now approximated, for each α ∈ [n],
d

gαm+1 ≈g1 ,...,gm

r
X

åi hiα + σ̊ζα ,

ζα ∼ N (0, 1).

(13)

i=1

Thus, as gαm+1 is iid in α ∈ [n] with this approximation, by law of large numbers, we should expect
Eq. (12) for m ← m + 1 to concentrate around its conditional expectation for large n:
n

1X
a.s.
ψ(gα1 , . . . , gαm , gαm+1 ) − S −−→ 0,
n α=1
n
r
X
1X
E
ψ gα1 , . . . , gαm ,σ̊z +
åi hiα
where S =
n α=1 z∼N (0,1)
i=1
def

!
.

Now S is in the form of Eq. (12) so we can apply induction hypothesis. This finishes the proof sketch.
In this proof sketch, we have substituted many quantities for their limits (that are inductively proven
to exist). This is only possibly because we assume all nonlinearities are sufficiently smooth. What if
we don’t have this assumption? (This is important, for example, for expressing the backpropagation
of a ReLU neural network, since ReLU’s (weak) derivative is not continuous).
28

d

see Appendix K.1 for definition of =
this is roughly because Π1 is multiplied to Ã, which generically sends a vanishing amount of its image to
the subspace represented by Π1 .
29

17

6.2

Getting Rid of Smoothness Assumption

The key insight into the removal of smoothness assumption on Nonlin is that, we get smoothness for
free from averaging. Here’s the main strategy: If we can show the conditional concentration
n
1X
a.s.
ψ(gα1 , . . . , gαm , gαm+1 ) − S̄ −−→ 0,
n α=1
"
#
n
1X
def
1
m m+1
1
m
where S̄ = E
ψ(gα , . . . , gα , gα ) g , . . . , g
,
(14)
n α=1
then S̄ can be expressed as an average of smooth functions of gα1 , . . . , gαm and some scalars
a1 , . . . ar , σ (as in Items 2 and 3 above) that converge to deterministic limits. The smoothness
of these functions come from the Gaussian averaging inside the conditional expectation, even if
ψ itself is not smooth. This works as long as σ > 0; we shall discuss this assumption more thoroughly in Section 6.2.2. With this smoothness, we can again replace a1 , . . . , ar , σ with their limits
å1 , . . . ,år ,σ̊, and then the proof is finished by the induction hypothesis, as in Section 6.1.
Thus, if we can prove Eq. (14) without using smoothness of ψ, then we would be done. Revisiting the
approximations we made in our first-attempt proof, we see that we need to remake our law of large
number argument (Item 1) without substituting Π1 ≈ I. This substitution has been quite convenient,
as it made gαm+1 conditionally iid in α, so that the usual law of large numbers can apply. Now, we
have to manually wrestle with the correlations between gαm+1 and gβm+1 for pairs α, β ∈ [n].
6.2.1

Law of Large Numbers for Images of Weakly Correlated Gaussians

We thus prove a new law of large numbers for this case. It says that the average of images of weakly
correlated Gaussians will converge deterministically.
Theorem 6.2 (LLN for Images of Weakly Correlated Gaussians (Simplified)). Consider a triangular
array {ζ1n , . . . , ζnn }n≥1 of Gaussian
where each row is given by ζ n ∼ N (0, Σn ) and
Pvariables,
n
n 2
the covariance matrix Σ satisfies α6=β (Σαβ ) /(Σnαα Σnββ ) = O(1). Consider any polynomiallybounded φ : R → R. Then the triangular array {φ(ζ1n ), . . . , φ(ζnn )}n≥1 satisfies a strong law of
large numbers.30
This theorem will be applicable to Σn = Π1 as Π1 is a projection matrix with low corank and can
therefore be seen to have small off-diagonal entries (see Remark K.20). This would then finish the
proof of Eq. (14) without assuming smoothness of Nonlin.
Let us then sketch a proof of Theorem 6.2. It is instructive to first show a weak law of large numbers
(Corollary K.22) by bounding the variance of the fluctuation around the mean (Theorem K.21).
2
Pn
Suppose, for simplicity, φ is even, so that E φ(ζαn ) = 0. Then we need to bound E n1 α=1 φ(ζαn ) .
Expanding the square, we have n diagonal terms n12 E φ(ζαn )2 , α ∈ [n], and n(n − 1) cross terms
1
n
n
n2 E φ(ζα )φ(ζβ ), α 6= β. The former contributes O(1/n). We shall show the latter is, too.
Let φ(x) = b1 H1 (x) + b2 H2 (x) + · · · be the Hermite expansion of φ, with Hi denoting the ith
Hermite polynomial. Note that there’s no b0 term because φ has mean 0. Then a neat identity
Fact K.13 says, for any jointly Gaussian (z1 , z2 ) with zero-mean, unit variance, and covariance c, we
have
E φ(z1 )φ(z2 ) = b21 c + b22 c2 + · · · .
(15)
If we assume Σn has unit diagonal, then by this identity, we have
s
2i
X
1 X
1 X 2 X n i 1 1 X 2
n
n
n
E
φ(ζ
)φ(ζ
)
=
b
Σ
≤
b
n
Σ
α
β
i
αβ
i
αβ
n2
n2
n2
i≥1
i≥1
α6=β
α6=β
α6=β

s
2 3,4
X
X
2 1
≤ 
b2i 
Σnαβ
= O(1/n).
n
i≥1

α6=β

30
The full theorem (Corollary K.24) allows each ζαn to have its own φα : R → R and this is in fact what’s
needed to finish the proof of Theorem 2.10. However, for conveying the main insights, we will be content with
the simplified statement here.

18

Here we used 1) power mean inequality, 2) Σnαβ ≤ 1 =⇒ (Σnαβ )2i ≤ (Σnαβ )2 for i ≥ 1, 3)

2
P
P
2
n
2
= O(1) by assumption. This finishes
i≥1 bi = Ez∼N (0,1) φ(z) = O(1), and 4)
α6=β Σαβ
the proof sketch of the weak version of Theorem 6.2 under the simplifying assumptions of even φ
and Σn having unit diagonal (which can be removed easily by complicating the proof a bit).
To prove
version of Theorem 6.2, we need to bound the higher moments
p
Pn the strong
E n1 α=1 φ(ζαn ) , p ≥ 4. This requires a similar analysis as the above, but much more technically
involved. For example, Eq. (15) generalizes to higher-order cross terms E φ(z1 ) · · · φ(zk ) for jointly
Gaussian (z1 , . . . , zk ), but the resulting expression Theorem K.15 is difficult to use directy. Instead,
we need to divide into cases and bound it: either all pairs (zi , zj ) have uniformly weak correlations
(Lemma K.16), or some pair has really large correlation comparatively (Lemma K.17). For full
details, check Theorem K.23.
6.2.2

Rank Stability

We have glossed over two important points in the above sketches: A) The scalars σ and ai in Eq. (13)
depend on the pseudo-inverse of some Gram matrix of vectors in the program. Even though this
Gram matrix will converge almost surely, its rank could drop suddenly in the limit, causing its
pseudo-inverse to diverge, so that σ and ai also diverge (see Proposition L.5). B) if σ = 0 (the
“conditional standard deviation of g m+1 given g 1 , . . . , g m ”), then the conditional expectation involves
no “averaging” so the argument of “getting smoothness for free” does not work (see Appendix L.6).
More precisely, there are several scenarios for σ and its limit σ̊:
a.s.

1. σ̊ > 0 so, since σ −−→ σ̊, σ > 0 almost surely as well.
2. σ̊ = 0 and σ = 0 a.s. for large n.
3. σ̊ = 0 and σ > 0 a.s., only converging to 0 at n = ∞.
In the case of 1), the arguments of Section 6.2 go through, but this most likely won’t work in the cases
of 2) and 3). Intuitively, P
case 2) can perhaps allow us to reduce g m+1 toPa deterministic function of
n
n
g 1 , . . . , g m , and show n1 α=1 ψ(gα1 , . . . , gαm , gαm+1 ) is a.s. equal to n1 α=1 ψ̄(gα1 , . . . , gαm ) for an
appropriate ψ̄, so we can apply the induction hypothesis. But this argument cannot apply to case 3),
because of the randomness in g m+1 even after conditioning.
It turns out the intuition for case 2) is correct and case 3) doesn’t happen! This will follow from the
property of rank stability, which will simultaneously solve both problem A) and B):
Theorem 6.3 (Rank Stability). Let y, y 1 , . . . , y k be any collection of vectors in a N ETSOR> program.
1
k
If Z y = b1 Z y + . . . + bk Z y , then almost surely, for large enough n, y = b1 y 1 + · · · + bk y k .
m+1

1

m

Indeed, if σ̊ = 0, then it turns out we can show Z g
is a linear combination of Z g , . . . , Z g , so
m+1
rank stability tells us g
is the same linear combination of g 1 , . . . , g m (almost surely, for large
n), i.e. we are in case 2). Thereafter, we can straightforwardly reduce to induction hypothesis. On
the other hand, this also shows case 3) can never occur. Now it just suffices to show Theorem 6.3,
which can be done essentially by a simultaneous induction with the main induction hypothesis. See
Appendix L for more details.
6.3

The Calculation of Ż

As remarked in Remark 2.9, the adjunction relation hy, W xi = hW > y, xi is importantly related to
the existence and form of Ż W x . If we assume the Master Theorem, then this adjunction implies the
>
identity E Z y Z W x = E Z W y Z x for any x, y in the program. In fact, a very similar identity exists
as well for Ż:
>
E Z y Ż W x = E Ẑ W y Z x .
This is proved in Lemma L.3. With this identity, we can verify (Lemma L.10) that, in the notation of
Eq. (13) (using the precise form of åi omitted here),
r
X

i

åi Ż h = Ż g

i=1

19

m+1

.

Additionally, straightforward computation (Lemma L.19) shows
r
X

i

d

åi Ẑ h + σ̊z =g1 ,...,gm Ẑ g

m+1

, z ∼ N (0, 1).

i=1

Then we can rewrite Eq. (13) heuristically as
d

r
X

d

i=1
r
X

gαm+1 ≈g1 ,...,gm
≈g1 ,...,gm

åi hiα + σ̊ζα ,
åi Z

i=1

hi

ζα ∼ N (0, 1).

+ σ̊ζα =

r
X

!
åi Ż

hi

i=1

+

r
X

!
åi Ẑ

hi

+ σ̊ζα

= Ż g

m+1

+ Ẑ g

m+1

,

i=1

as desired.

7

Related Works

Jacobian Singular Value Distribution of a Neural Network Pennington et al. [36, 37] originally
studied the multilayer-perceptron (MLP)’s Jacobian singular value distribution, in the limit of large
width. Ling et al. [25], Tarnowski et al. [43] generalized this analysis to residual MLPs and Xiao et al.
[48] to convolutional networks. These works assumed certain asymptotic freeness as in Eq. (11),
which was first proven rigorously by Yang [49] and presented in a more accessible way here. Recently,
Pastur [34] gave a new, direct proof of this asymptotic distribution for MLP by induction in its depth
and standard random matrix machinery. In comparison, our technique here is more general, both
in the type of architectures allowed (any that is expressible in N ETSOR>, which by Yang [50, 51]
includes practically all architectures) and in the nonlinearities involved (Pastur [34] assumes φ, φ0 are
both bounded but we only require φ0 is bounded).
In this paper, we are concerned with the input-output Jacobian of a neural network on a fix input.
Other works have considered the Jacobian with respect to the parameters, where the Jacobian has
dimension #parameters × #data points (e.g. [35]). This is a related but distinct case from the
input-output Jacobian.
Ż W x as the Onsager Correction Term This Ż W x has appeared before, in a limited setting, in the
literature of asymmetric message passing as the Onsager correction term. Asymmetric message
passing [10] is an algorithm that tries to recover a ground truth signal v from a noisy measurement
W v of it obtained by a matrix W . This algorithm repeatedly multiplies the measurement by W and
its transpose W > , interleaving with coordinatewise nonlinearities. In between matrix multiplications,
this Onsager correction term is subtracted explicitly. Bayati and Montanari [6] famously proved the
recovery properties of this algorithm as the matrix size tends to infinity. This algorithm can be written
down in a N ETSOR> program, and (a version of) Bayati and Montanari [6]’s results can be realized
as a corollary of the N ETSOR> Master Theorem (see Yang [49]). In contrast, the Master Theorem
keeps track of the Onsager correction term throughout arbitrary computation. This allows us to prove
powerful theorems like the Semicircle Law and the Free Independence Principle, as shown in this
paper.
The Tensor Programs Series This paper is the third in the Tensor Programs series, following Yang
[50, 51]. The unrestricted Master Theorem, the new proofs of semicircle and Marchenko-Pastur laws,
and the singular value distribution result for multilayer-perceptron originally appeared in Yang [49],
but here we present a clear, pedagogical presentation of them, with some technical improvements
as well. The Free Independence Principle is new and unique to this paper. Compared to the Master
Theorem of Yang [51], our Master Theorem here does not assume the BP-like condition (which
implies that W > can be assumed independent from W , i.e. GIA), but rather works for any N ETSOR>
program.

8

Conclusion

In this work, we proved a Master Theorem for any N ETSOR> program and applied this new theorem
to give new proofs of the semicircle and Marchenko-Pastur laws, as well as to propose and prove the
20

Free Independence Principle (FIP). FIP then allows us to calculate the asymptotic Jacobian singular
value distribution of a neural network. These results suggest a new way to approach nonlinear random
matrix theory pertaining to deep learning. More generally, in combination with Yang [50, 51], they
demonstrate the versatility of the Tensor Programs technique.

Acknowledgements
We thank Boris Hanin, Sam Schoenholz, Zhiyuan Li, Jeffrey Pennington, Etai Littwin, Ilya Razenshteyn, Bobby He, Ryan O’Donnell, Edward Hu, Michael Santacroce, Jason Lee, Judy Shen, Jascha
Sohl-Dickstein for feedback on working copies of this manuscript.

References
[1] Sina Alemohammad, Zichao Wang, Randall Balestriero, and Richard Baraniuk. The recurrent
neural tangent kernel, 2020.
[2] Zeyuan Allen-Zhu, Yuanzhi Li, and Yingyu Liang. Learning and Generalization in Overparameterized Neural Networks, Going Beyond Two Layers. arXiv:1811.04918 [cs, math, stat],
November 2018. URL http://arxiv.org/abs/1811.04918.
[3] Zeyuan Allen-Zhu, Yuanzhi Li, and Zhao Song. A Convergence Theory for Deep Learning
via Over-Parameterization. arXiv:1811.03962 [cs, math, stat], November 2018. URL http:
//arxiv.org/abs/1811.03962.
[4] Zeyuan Allen-Zhu, Yuanzhi Li, and Zhao Song. On the Convergence Rate of Training Recurrent
Neural Networks. arXiv:1810.12065 [cs, math, stat], October 2018. URL http://arxiv.
org/abs/1810.12065.
[5] Sanjeev Arora, Simon S. Du, Wei Hu, Zhiyuan Li, Ruslan Salakhutdinov, and Ruosong Wang.
On Exact Computation with an Infinitely Wide Neural Net. arXiv:1904.11955 [cs, stat], April
2019. URL http://arxiv.org/abs/1904.11955.
[6] Mohsen Bayati and Andrea Montanari. The dynamics of message passing on dense graphs,
with applications to compressed sensing. IEEE Transactions on Information Theory, 57(2):
764–785, February 2011. ISSN 0018-9448, 1557-9654. doi: 10.1109/TIT.2010.2094817. URL
http://arxiv.org/abs/1001.3448.
[7] Minmin Chen, Jeffrey Pennington, and Samuel Schoenholz. Dynamical Isometry and a Mean
Field Theory of RNNs: Gating Enables Signal Propagation in Recurrent Neural Networks.
In Proceedings of the 35th International Conference on Machine Learning, volume 80 of
Proceedings of Machine Learning Research, pages 873–882, Stockholmsmässan, Stockholm
Sweden, July 2018. PMLR. URL http://proceedings.mlr.press/v80/chen18i.html.
[8] Romain Couillet and Merouane Debbah. Random Matrix Methods for Wireless Communications. Cambridge University Press, Cambridge, 2011. ISBN 978-0-511-994746. doi: 10.1017/CBO9780511994746. URL http://ebooks.cambridge.org/ref/id/
CBO9780511994746.
[9] Amit Daniely, Roy Frostig, and Yoram Singer. Toward Deeper Understanding of Neural Networks: The Power of Initialization and a Dual View on Expressivity. In D. D.
Lee, M. Sugiyama, U. V. Luxburg, I. Guyon, and R. Garnett, editors, Advances in
Neural Information Processing Systems 29, pages 2253–2261. Curran Associates, Inc.,
2016. URL http://papers.nips.cc/paper/6427-toward-deeper-understandingof-neural-networks-the-power-of-initialization-and-a-dual-view-onexpressivity.pdf.
[10] David L. Donoho, Arian Maleki, and Andrea Montanari. Message Passing Algorithms for
Compressed Sensing. Proceedings of the National Academy of Sciences, 106(45):18914–
18919, November 2009. ISSN 0027-8424, 1091-6490. doi: 10.1073/pnas.0909892106. URL
http://arxiv.org/abs/0907.3574.
21

[11] Simon S. Du, Xiyu Zhai, Barnabas Poczos, and Aarti Singh. Gradient Descent Provably
Optimizes Over-parameterized Neural Networks. arXiv:1810.02054 [cs, math, stat], October
2018. URL http://arxiv.org/abs/1810.02054.
[12] Simon S. Du, Kangcheng Hou, Barnabás Póczos, Ruslan Salakhutdinov, Ruosong Wang, and
Keyulu Xu. Graph neural tangent kernel: Fusing graph neural networks with graph kernels,
2019.
[13] Adrià Garriga-Alonso, Laurence Aitchison, and Carl Edward Rasmussen. Deep Convolutional
Networks as shallow Gaussian Processes. arXiv:1808.05587 [cs, stat], August 2018. URL
http://arxiv.org/abs/1808.05587.
[14] Boris Hanin. Which Neural Net Architectures Give Rise To Exploding and Vanishing Gradients?
January 2018. URL https://arxiv.org/abs/1801.03744.
[15] Boris Hanin and David Rolnick. How to Start Training: The Effect of Initialization and
Architecture. arXiv:1803.01719 [cs, stat], March 2018. URL http://arxiv.org/abs/1803.
01719.
[16] Soufiane Hayou, Arnaud Doucet, and Judith Rousseau. On the Selection of Initialization and
Activation Function for Deep Neural Networks. arXiv:1805.08266 [cs, stat], May 2018. URL
http://arxiv.org/abs/1805.08266.
[17] Tamir Hazan and Tommi Jaakkola. Steps Toward Deep Kernel Methods from Infinite Neural Networks. arXiv:1508.05133 [cs], August 2015. URL http://arxiv.org/abs/1508.05133.
[18] Jiri Hron, Yasaman Bahri, Jascha Sohl-Dickstein, and Roman Novak. Infinite attention: Nngp
and ntk for deep attention networks, 2020.
[19] Arthur Jacot, Franck Gabriel, and Clément Hongler. Neural Tangent Kernel: Convergence
and Generalization in Neural Networks. arXiv:1806.07572 [cs, math, stat], June 2018. URL
http://arxiv.org/abs/1806.07572.
[20] Steven Kivelson, Dung-Hai Lee, and Shou-Cheng Zhang. Global phase diagram in the quantum
Hall effect. Physical Review B, 46(4):2223–2238, July 1992. ISSN 0163-1829, 1095-3795. doi:
10.1103/PhysRevB.46.2223. URL https://link.aps.org/doi/10.1103/PhysRevB.46.
2223.
[21] A. M. Lane, R. G. Thomas, and E. P. Wigner. Giant Resonance Interpretation of the NucleonNucleus Interaction. Physical Review, 98(3):693–701, May 1955. ISSN 0031-899X. doi:
10.1103/PhysRev.98.693. URL https://link.aps.org/doi/10.1103/PhysRev.98.693.
[22] Nicolas Le Roux and Yoshua Bengio. Continuous neural networks. In Artificial Intelligence
and Statistics, pages 404–411, 2007.
[23] Jaehoon Lee, Yasaman Bahri, Roman Novak, Sam Schoenholz, Jeffrey Pennington, and Jascha
Sohl-dickstein. Deep Neural Networks as Gaussian Processes. In International Conference on
Learning Representations, 2018. URL https://openreview.net/forum?id=B1EA-M-0Z.
[24] Jaehoon Lee, Lechao Xiao, Samuel S. Schoenholz, Yasaman Bahri, Jascha Sohl-Dickstein, and
Jeffrey Pennington. Wide Neural Networks of Any Depth Evolve as Linear Models Under
Gradient Descent. arXiv:1902.06720 [cs, stat], February 2019. URL http://arxiv.org/
abs/1902.06720.
[25] Zenan Ling, Xing He, and Robert C. Qiu. Spectrum concentration in deep residual learning: a
free probability approach. arXiv:1807.11694 [cs, stat], February 2019. URL http://arxiv.
org/abs/1807.11694. arXiv: 1807.11694.
[26] Etai Littwin, Tomer Galanti, and Lior Wolf. On the optimization dynamics of wide hypernetworks, 2020.
[27] V A Marčenko and L A Pastur. DISTRIBUTION OF EIGENVALUES FOR SOME SETS OF
RANDOM MATRICES. Mathematics of the USSR-Sbornik, 1(4):457–483, April 1967. ISSN
0025-5734. doi: 10.1070/SM1967v001n04ABEH001994. URL http://stacks.iop.org/
0025-5734/1/i=4/a=A01?key=crossref.1d0b803ddab02373cb6b0690a61e734a.
22

[28] Alexander G. de G. Matthews, Mark Rowland, Jiri Hron, Richard E. Turner, and Zoubin
Ghahramani. Gaussian Process Behaviour in Wide Deep Neural Networks. arXiv:1804.11271
[cs, stat], April 2018. URL http://arxiv.org/abs/1804.11271.
[29] F. Mezzadri and N. C. Snaith, editors. Recent Perspectives in Random Matrix Theory and
Number Theory. Cambridge University Press, 1 edition, June 2005. ISBN 978-0-521-62058-1
978-0-511-55049-2. doi: 10.1017/CBO9780511550492. URL https://www.cambridge.
org/core/product/identifier/9780511550492/type/book.
[30] J.A. Mingo and R. Speicher. Free Probability and Random Matrices. Fields Institute Monographs. Springer New York, 2017. ISBN 978-1-4939-6942-5. URL https://books.google.
com/books?id=d7wpDwAAQBAJ.
[31] Radford M Neal. BAYESIAN LEARNING FOR NEURAL NETWORKS. PhD Thesis, University
of Toronto, 1995.
[32] Roman Novak, Lechao Xiao, Jaehoon Lee, Yasaman Bahri, Daniel A Abolafia, Jeffrey Pennington, and Jascha Sohl-Dickstein. Bayesian Deep Convolutional Networks with Many Channels
are Gaussian Processes. arXiv preprint arXiv:1810.05148, 2018.
[33] Ryan O’Donnell. Analysis of boolean functions. Cambridge University Press, New York, NY,
2014. ISBN 978-1-107-03832-5.
[34] Leonid Pastur. On random matrices arising in deep neural networks. gaussian case, 2020.
[35] Jeffrey Pennington and Pratik Worah. The Spectrum of the Fisher Information Matrix of a
Single-Hidden-Layer Neural Network. In Advances in Neural Information Processing Systems
31, page 10, 2018.
[36] Jeffrey Pennington, Samuel Schoenholz, and Surya Ganguli. Resurrecting the sigmoid in deep
learning through dynamical isometry: theory and practice. In I. Guyon, U. V. Luxburg,
S. Bengio, H. Wallach, R. Fergus, S. Vishwanathan, and R. Garnett, editors, Advances
in Neural Information Processing Systems 30, pages 4788–4798. Curran Associates, Inc.,
2017. URL http://papers.nips.cc/paper/7064-resurrecting-the-sigmoid-indeep-learning-through-dynamical-isometry-theory-and-practice.pdf.
[37] Jeffrey Pennington, Samuel S. Schoenholz, and Surya Ganguli. The Emergence of Spectral
Universality in Deep Networks. arXiv:1802.09979 [cs, stat], February 2018. URL http:
//arxiv.org/abs/1802.09979. arXiv: 1802.09979.
[38] George Philipp and Jaime G. Carbonell. The Nonlinearity Coefficient - Predicting Overfitting
in Deep Neural Networks. arXiv:1806.00179 [cs, stat], May 2018. URL http://arxiv.org/
abs/1806.00179.
[39] Ben Poole, Subhaneil Lahiri, Maithreyi Raghu, Jascha Sohl-Dickstein, and Surya Ganguli.
Exponential expressivity in deep neural networks through transient chaos. In Advances In
Neural Information Processing Systems, pages 3360–3368, 2016.
[40] Samuel S. Schoenholz, Justin Gilmer, Surya Ganguli, and Jascha Sohl-Dickstein. Deep Information Propagation. 2017. URL https://openreview.net/pdf?id=H1W1UN9gg.
[41] Roland Speicher. Free Probability Theory. arXiv:0911.0087 [math], October 2009. URL
http://arxiv.org/abs/0911.0087.
[42] Terence Tao. Topics in random matrix theory. Graduate studies in Mathematics, 132, 2012.
[43] Wojciech Tarnowski, Piotr Warchoł, Stanisław Jastrz˛ebski, Jacek Tabor, and Maciej A. Nowak.
Dynamical Isometry is Achieved in Residual Networks in a Universal Way for any Activation
Function. arXiv:1809.08848 [cs, stat], September 2018. URL http://arxiv.org/abs/
1809.08848.
[44] Felix von Oppen, Bertrand I. Halperin, and Ady Stern. Conductivity tensor of striped quantum
Hall phases. Physical Review Letters, 84(13):2937–2940, March 2000. ISSN 0031-9007,
1079-7114. doi: 10.1103/PhysRevLett.84.2937. URL http://arxiv.org/abs/cond-mat/
9910132. arXiv: cond-mat/9910132.
23

[45] Eugene P. Wigner. Characteristic Vectors of Bordered Matrices With Infinite Dimensions. The
Annals of Mathematics, 62(3):548, November 1955. ISSN 0003486X. doi: 10.2307/1970079.
URL https://www.jstor.org/stable/1970079?origin=crossref.
[46] Eugene P. Wigner. On the Distribution of the Roots of Certain Symmetric Matrices. The
Annals of Mathematics, 67(2):325, March 1958. ISSN 0003486X. doi: 10.2307/1970008. URL
https://www.jstor.org/stable/1970008?origin=crossref.
[47] Christopher K I Williams. Computing with Infinite Networks. In Advances in neural information
processing systems, page 7, 1997.
[48] Lechao Xiao, Yasaman Bahri, Jascha Sohl-Dickstein, Samuel Schoenholz, and Jeffrey Pennington. Dynamical Isometry and a Mean Field Theory of CNNs: How to Train 10,000Layer Vanilla Convolutional Neural Networks. In Proceedings of the 35th International
Conference on Machine Learning, volume 80 of Proceedings of Machine Learning Research, pages 5393–5402, Stockholmsmässan, Stockholm Sweden, July 2018. PMLR. URL
http://proceedings.mlr.press/v80/xiao18a.html.
[49] Greg Yang. Scaling Limits of Wide Neural Networks with Weight Sharing: Gaussian Process
Behavior, Gradient Independence, and Neural Tangent Kernel Derivation. arXiv:1902.04760
[cond-mat, physics:math-ph, stat], February 2019.
[50] Greg Yang. Tensor programs i: Wide feedforward or recurrent neural networks of any architecture are gaussian processes. In Advances in Neural Information Processing Systems, pages
9947–9960, 2019.
[51] Greg Yang. Tensor programs ii: Neural tangent kernel for any architecture, 2020.
[52] Greg Yang and Sam S. Schoenholz. Deep mean field theory: Layerwise variance and width
variation as methods to control gradient explosion, 2018. URL https://openreview.net/
forum?id=rJGY8GbR-.
[53] Greg Yang and Samuel S. Schoenholz. Mean Field Residual Network: On the Edge of Chaos.
In Advances in neural information processing systems, 2017.
[54] Greg Yang, Jeffrey Pennington, Vinay Rao, Jascha Sohl-Dickstein, and Samuel S. Schoenholz.
A Mean Field Theory of Batch Normalization. arXiv:1902.08129 [cond-mat], February 2019.
URL http://arxiv.org/abs/1902.08129.
[55] Difan Zou, Yuan Cao, Dongruo Zhou, and Quanquan Gu. Stochastic Gradient Descent Optimizes
Over-parameterized Deep ReLU Networks. arXiv:1811.08888 [cs, math, stat], November 2018.
URL http://arxiv.org/abs/1811.08888.

24

A

N ETSOR> Master Theorem for Convergence in Mean and in Distribution

A.1

Convergence in Mean

Theorem A.1. For the same premise as in Theorem 2.10, if ψ is bounded, then we have the convergence in mean
n
1
k
1X
L1
ψ(h1α , . . . , hkα ) −−→ E ψ(Z h , . . . , Z h ).
(16)
n α=1
This in particular means the convergence of expectations
n
1
k
1 X
E
ψ(h1α , . . . , hkα ) = E ψ(h1β , . . . , hkβ ) → E ψ(Z h , . . . , Z h ),
n α=1

for any β ≥ 1.

(17)

In fact, we have almost sure convergence and convergence in mean of conditional expectations as
well: For each n, let B be a sub-σ-algebra of the σ-algebra induced by random sampling in Setup 2.2.
Then
" n
#
X
1
k
1
a.s.
L1
1
k
E
ψ(hα , . . . , hα ) | B − E ψ(Z h , . . . , Z h ) −−→ 0, −−→ 0.
(18)
n
α=1
Proof. Eqs. (16) and (18) follow from Theorem 2.10, the boundedness of ψ, and (conditional)
dominated convergence. The first equality of Eq. (17) follows from the symmetry in α, and the
convergence of expectations follows from convergence in mean.
In Theorem A.2 below, we also show convergence in mean when ψ is quadratically bounded and
all nonlinearities are linearly bounded. We say a function φ : Rk → R is linearly bounded (resp.
quadratically bounded) if for all x1 , . . . , xk ∈ R, φ(x1 , . . . , xk ) ≤ C(1 + |x1 | + · · · + |xk |) (resp.
C(1 + |x1 |2 + · · · + |xk |2 )) for some constant C > 0. Note that such a linearly bounded φ, applied
coordinatewise to vectors h1 , . . . , hk ∈ Rn , preserves `2 norm:
n
n
(k + 1)C 2 X
C2 X
1
(1 + |h1α | + · · · + |hkα |)2 ≤
1 + |h1α |2 + · · · + |hkα |2
kφ(h1 , . . . , hk )k2 ≤
n
n α=1
n
α=1


1 2
k 2
kh
k
kh
k
≤ (k + 1)C 2 1 +
+ ··· +
.
(19)
n
n

Theorem A.2. Theorem A.1 also holds if ψ is quadratically bounded and all nonlinearities φ used
in Nonlin are linearly bounded.
Proof. As in the proof of Theorem A.1, it suffices to prove the convergence in mean. Below, we say
“random variable R is bounded with high probability” if there exist absolute constants C, c > 0 such
that, for all r ≥ C, we have R ≤ r with probability at least 1 − C exp(−cn).
Because each Gaussian matrix W ∈ W has bounded operator norm with high probability (Fact A.3),
each application of MatMul preserves `2 norm with high probability. Likewise, each application of
Nonlin preserves `2 norm by Eq. (19). Finally, by classic concentration of measure, each v ∈ V has
bounded `2 norm with high probability. Thus, by induction, all vectors in the program have bounded
`2 norm with high probability. Because ψ is quadratically bounded, this implies
n

def
Q=

1X
ψ(h1α , . . . , hkα )
n α=1

is bounded with high probability. In particular, this quantity has a subexponential tail
Pr(Q > r) ≤ Ce−crn , ∀r > C =⇒ E[QI(Q > C)] ≤

C −cCn
e
→ 0.
cn

Thus we may apply standard truncation technique to Q, decomposing it as Q = QI(Q ≤ C) +
QI(Q > C). The latter converges in mean to 0, as shown above, while the former converges in mean
by dominated convergence.
25

Fact A.3 (Upper tail estimate for iid random matrix, Corollary 2.3.5 of Tao [42]). For W ∈ Rn×n
with Wαβ ∼ N (0, 1/n), there exist absolute constants C, c > 0 such that
Pr(kW kop > r) ≤ Ce−crn
for all r ≥ C.
We believe
Conjecture A.4. Theorem A.1 holds for any polynomially bounded ψ.
As in the proof of Theorem A.2, this amounts to proving a tail bound on the LHS of Eq. (16).
Intuitively, because the source of the randomness is from Gaussian sampling and the nonlinearities
are all polynomially bounded, this quantity should have a sub-Weibull tail beyond some constant
upper bound. But making this rigorous is subtle, and we leave this for future work.
A.2

Convergence in Distribution of Coordinates

Theorem A.5 (Convergence in Distribution of Coordinates). Assume the same premise as in
Theorem 2.10. For any α ≥ 1, we have the convergence in distribution of
1

d

k

(h1α , . . . , hkα ) −
→ (Z h , . . . , Z h ).
1

k

Proof. For any bounded continuous function ψ, E ψ(h1α , . . . , hkα ) → E ψ(Z h , . . . , Z h ) by
Theorem A.1.
A slightly more involved version of this symmetry argument also shows that different coordinate
slices are independent from one another in the large n limit.
Theorem A.6. Assume the same premise as in Theorem 2.10. For any α1 , . . . , αr ≥ 1, all different
for each other, we have the convergence in distribution of
 1

 h1
k
hα1 · · · hkα1
Z1
· · · Z1h
d  .
 ..
..  −
..  ,
..
..
 .
.
.
.  →  ..
. 
h1αr

1

k

···

1

1

hkαr

Zrh

···

k

Zrh

k

1

k

where (Z1h , . . . , Z1h ), . . . , (Zrh , . . . , Zrh ) are iid copies of (Z h , . . . , Z h ).
Proof. We proceed by induction on r. The base case of r = 1 has already been proven in
Theorem A.5. Now assume the inductive hypothesis is proven for r − 1 and we seek to show
it is also true for r. It suffices to prove, for all bounded continuous functions f1 , . . . , fr : Rk → R, 31
E

r
Y

fi (h1αi , . . . , hkαi ) →

i=1

r
Y

1

k

E fi (Z h , . . . , Z h ).

i=1

By Theorem 2.10, we have, for all i ∈ [r],
n

1
k
1X
a.s.
fi (h1β , . . . , hkβ ) −−→ E fi (Z h , . . . , Z h ).
n

β=1

Thus, taking the product over all i ∈ [r] and then taking expectation, we have
1
nr

X
β1 ,...,βr

E

r
Y

fi (h1βi , . . . , hkβi ) →

i=1

r
Y

1

k

E fi (Z h , . . . , Z h ),

i=1

by dominated convergence and the boundedness of fi . Now in the LHS, only o(nr ) of the summands
have some pair from β1 , . . . , βr equal to each other. Each such o(nr ) summands, by induction
or we can just consider the families fi (x) = eiti x (or their real and imaginary parts), where {ti }ri=1 varies
over Rr .
31

26

hypothesis, converges to some finite quantity. Thus their total contribution to the LHS is vanishing
with n. Hence, we have
E

β1 ,...,βr
all distinct

E

r
Y

a.s.

fi (h1βi , . . . , hkβi ) −−→

i=1

r
Y

1

k

E fi (Z h , . . . , Z h ).

i=1

Finally, we note that the inner expectation in the LHS here is symmetric in all such distinct β1 , . . . , βr ,
so
r
r
Y
Y
1
k
a.s.
E
fi (h1βi , . . . , hkβi ) −−→
E fi (Z h , . . . , Z h )
i=1

i=1

for any distinct β1 , . . . , βr , and in particular, for β1 , . . . , βr = α1 , . . . , αr , as desired.
A.3

Extensions to N ETSOR>+ and Programs with Variable Dimensions

All of the theorems above hold as stated for programs with variable dimensions (Appendix F), if
these programs are setup as in Setup F.5. Likewise, Theorems A.1, A.5 and A.6 hold for N ETSOR>+
programs (Appendix E) as well, if rank stability (Assumption E.7) is satisfied and all nonlinearities
ϕu (−; −) are parameter-controlled at Θ̊u (see Theorems E.11 and F.10). Similarly,
Theorem A.7. Theorem A.2 holds for N ETSOR>+ programs if rank stability is satisfied and the
following conditions on nonlinearities hold:
• for every vector h with defining nonlinearity ϕh (−; −) and limit parameters Θ̊h , ϕh (~x; Θ̊h )
is linearly bounded in ~x, and for any Θ,
|ϕh (~x; Θ) − ϕh (~x; Θ̊h )| ≤ f (Θ − Θ̊h )φ(~x)

(20)

for some linearly bounded φ and some continuous function f , taking values in R, with
f (0) = 0.
• for every scalar c with defining nonlinearity ϕc (−; −) and limit parameters Θ̊c , ϕc (~x; Θ̊c )
is quadratically bounded in ~x and Eq. (20) is satisfied for some quadratically bounded φ
and some continuous function f , taking values in R, with f (0) = 0.

B

Generalized Architectural Universality of Neural Network-Gaussian
Process

Wide, randomly initialized neural networks are distributed like Gaussian processes (GP) [13, 23, 28,
31, 32, 50]. Yang [50] systematically generalized this result from toy neural networks to all modern
neural networks. This result was proved by 1) showing that the kernel of input embeddings converge
almost surely to a deterministic kernel K, and 2) because the readout layer(s) are independently
initialized from the rest of the network, the distribution of random neural network function converges
to a GP with this kernel K. Part 1 assumed that no weight matrix is the transpose of another weight
matrix, and with this assumption, it follows from the N ETSOR Master Theorem [50]. However, with
the N ETSOR> Master Theorem, we can straightforwardly get rid of this assumption, and the logic
above still holds. We thus conclude
Theorem B.1. Consider any neural network whose forward propagation is expressible in a
N ETSOR> program, and whose output layer(s) are independently sampled from other parameters and not used in the interior of the network. Then we have the convergence in distribution of the
neural network function to a Gaussian Process, as the network widths tend to infinity.32
We can also consider what happens when the output layer(s) are not independent from other parameters. For example, we can consider the case where the output can be expressed as the first
coordinate y1 of a vector y = W u ∈ Rn for some embedding u of the input. Here W could have
d
been used in the interior of the network. Then in general, Ż y is nonzero, and y1 −
→ Z y converges to a
non-Gaussian distribution, which can still nevertheless be calculated using Box 1 and Theorem 2.10.
32

Of course, to compute the GP kernel requires going through the N ETSOR> Master Theorem (in particular,
computing Ż and Ẑ), and it would be incorrect to just assume all instances of W > to be independent from W .

27

C

Generalized Architectural Universality of Neural Tangent Kernel

Jacot et al. [19] showed that, in the limit of large width, a neural network undergoing training by
gradient descent evolves like a linear model with a kernel, called the Neural Tangent Kernel (NTK).
Yang [51] showed how to calculate this the infinite-width limit of this NTK for any architecture,
when a commonly satisfied condition, called Simple GIA Check, is satisfied. This condition allows us
to assume W > to be independent from W in the computation of NTK (this heuristic is called the
Gradient Independence Assumption, or GIA).
Condition 1 (Simple GIA Check). No weight matrix is the transpose of another weight matrix; the
output layer is sampled independently and with zero mean from all other parameters and is not used
anywhere else in the interior of the network33 .
Using Theorem 2.10, we may now generalize the result of Yang [51] to when Simple GIA Check is
not satisfied (Theorem C.1). Before that, let’s gather some concrete intuition for this generalization.
Example Yang [51] demonstrated a simple neural network not satisfying Simple GIA Check, and,
if we assume W > to be independent from W , then the resulting NTK computation would be wrong.
Now, with the help of N ETSOR> Master Theorem, we may finally perform the correct computation.
The neural network in question computes
x1 = W 1 ξ + 1,

h2 = W 2 x1 ,

x2 = φ(h2 ),

y = 1> x2 /n

(21)

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

dx1 = W 2> dh2 = 2W 2> h2 = 2W 2> W 2 x1 .

(22)

Yang [51] showed that E dx1α = 2 E x1α = 1 but if we were to assume W 2> be independent from
W 2 , then we would get the erroneous answer E dx1α = 0. Here, let us compute Z • for each vector
1
above using Box 1, and see we get a consistent result with E Z dxα = 2.
2

2

2

In the forward pass, we have Z h = N (0, 1) and likewise in the backward pass, Z dh = 2Z h =
1
1
N (0, 4). Next, we need to compute Ẑ dx and Ż dx . Just like in the Master Theorem of Yang
1
[51], Ẑ dx is the random variable that we would get if we assume W > be independent from W :
1
2
2
2
Ẑ dx = N (0, E(Z dh )2 ) = N (0, 4) and is independent from Z dh and Z h . On the other hand,
1

dh2

1

dh2

∂Z
1
Ż dx is a scalar multiple Ż dx = x1 E ∂Z
∂h2 of x . The multiple is E ∂h2 = E 2 = 2. Putting
them all together, we get
1

1

1

Z dx = Ẑ dx + Ż dx = N (0, 4) + 2x1
1

1

which has mean E Z dx = 2 E Z x = 2.
More generally, by Theorem 2.10, we trivially have the following result:
Theorem C.1. Consider any neural network whose forward and backpropagation are expressible
in a N ETSOR> program34 , and which does not need to satisfy Simple GIA Check. Suppose the
network is parametrized in the NTK parametrization. If all of the network’s nonlinearities have
polynomially bounded weak derivatives, then its NTK, on standard Gaussian initialization of the
network parameters, converges to a deterministic kernel as its widths tend to infinity, over any finite
set of inputs.
As with the NNGP in Appendix B, this infinite-width NTK can be computed in a straightforward
way using Theorem 2.10, following the examples of Yang [51].

D

Simple GIA Check Implies Gradient Independence Assumption

We give a new proof of the following in this section through FIP.
33
34

i.e. if the output weight is v and the output is v > x, then x does not depend on v.
as shown in Yang [51], this includes practically all architectures used in modern deep learning

28

Theorem D.1. If a neural network expressible35 in a N ETSOR> program satisfies Simple GIA
Check (Condition 1), then its NTK can be computed assuming that W > used in backpropagation is
independent from W used in forward propagation.
Yang [51] showed that, for any pair of inputs ξ, ξ¯ ∈ Rd , the Neural Tangent Kernel of a NN f depends
on backpropagation only through the quantities h∇y(ξ) f (ξ), ∇y(ξ̄) f ( ¯
ξ)i. If the network satisfied
Simple GIA Check (Condition 1), i.e. the network output is computed like f (ξ) = n−1/2 v > e(ξ) for
some embedding e(ξ) of ξ and vα ∼ N (0, 1) independent of e, then we can rewrite ∇y(ξ) f (ξ) =
n−1/2 v > J(ξ) where J(ξ) = ∂e(ξ)/∂y(ξ). Therefore,
¯ = n−1 v > J(ξ)J(ξ)
¯ > v.
h∇y(ξ) f (ξ), ∇y(ξ̄) f (ξ)i
By reversing the trace trick (Eq. (6)), this quantity has the same limit as n−1 tr J(ξ)J( ¯
ξ)> . If π is the
¯
program expressing the forward and backward propagations of f (ξ) and f (ξ), then this is a moment
in D(π) and {W, W > }, W ∈ W. By FIP (Theorem 4.2), this moment stays the same if all W ∈ W
are assumed independent from D(π), i.e. if transposed weight matrices W > in the backward pass are
independent from W used in the forward pass (which produced the diagonals of D(π)).

N ETSOR>+ : Adding Scalars to N ETSOR>

E

In this section, we discuss the extension of N ETSOR> with scalars that can be computed from
(essentially) averaging some vector in the program. This is not used substantially until Appendix I,
so the reader should feel free to skip ahead and come back only as needed.
Definition E.1. A N ETSOR>+ program36 is just a sequence of Rn vectors and scalars in R inductively generated via one of the following ways from an initial set C of random scalars, an initial set V
of random Rn vectors, and a set W of random Rn×n matrices
Nonlin+ Given φ : Rk × Rl → R, previous scalars θ1 , . . . , θl ∈ R and vectors x1 , . . . , xk ∈ Rn ,
we can generate a new vector
φ(x1 , . . . , xk ; θ1 , . . . , θl ) ∈ Rn
where φ(−; θ1 , . . . , θl ) applies coordinatewise to each “α-slice” (x1α , . . . , xkα ).
Moment Given same setup as above, we can also generate a new scalar
n

1X
φ(x1α , . . . , xkα ; θ1 , . . . , θl ) ∈ R.
n α=1
MatMul Given W ∈ Rn×n and x ∈ Rn , we can generate W x ∈ Rn or W > x ∈ Rn
We say a vector is a G-var if it is in V or it is introduced by MatMul.
We will typically discuss N ETSOR>+ programs when C, V, and W are sampled as follows. Note V
and W are sampled the same way here as in Setup 2.2.
Setup E.2 (N ETSOR>+ ). 1) each random scalar c in C converges to a deterministic limit c̊ ∈ R
2
2
as n → ∞; 2) for each initial W ∈ W, Wαβ ∼ N (0, σW
/n) for an associated variance σW
; 3)
V
g
|V|
there is a multivariate Gaussian Z = {Z : g ∈ V} ∈ R such that the initial set of vectors V are
sampled like {gα : g ∈ V} ∼ Z V iid for each α ∈ [n].
Definition E.3 (Key Intuition for N ETSOR>+ ). Just like in the N ETSOR> case, each vector h in
the program has roughly iid coordinates when n  1, each of which is distributed like a random
variable Z h . In addition, each scalar θ in the program will converge to a deterministic limit θ̊. We’ll
recursively define Z h and θ̊ as follows.
35

i.e. its forward and backward propagations at initialization can be written in a N ETSOR> program. As
shown in Yang [50, 51], this covers almost all classic and modern neural networks.
36
What we refer to as N ETSOR>+ program is the same as “simplified N ETSOR>+ ” in Yang [51]

29

ZInit If h ∈ V, then Z h is defined as the distribution of each coordinate of h given in Setup E.2.
def
def
We also set Ẑ h =
Z h and Ż h =
0. Likewise, if θ ∈ C, then θ̊ is defined as the limit of θ
specified in Setup E.2.
ZMatMul Same as in ZMatMul in N ETSOR>
ZNonlin+ Given φ : Rk × Rl → R, previous scalars θ1 , . . . , θl ∈ R and vectors x1 , . . . , xk ∈ Rn ,
we have
1
k
1
k
def
Z φ(x ,...,x ;θ1 ,...,θl ) =
φ(Z x , . . . , Z x ; θ̊1 , . . . , θ̊l ).
Pn
ZMoment Given same setup as above and scalar θ = n1 α=1 φ(x1α , . . . , xkα ; θ1 , . . . , θl ), then
1

k

def
θ̊ =
E φ(Z x , . . . , Z x ; θ̊1 , . . . , θ̊l ).
1

k

Here θ̊1 , . . . , θ̊l are deterministic, so the expectation is taken over Z x , . . . , Z x .
E.1

N ETSOR>+ Master Theorem for Pseudo-Lipschitz Nonlinearities

Pseudo-Lipschitz functions are, roughly speaking, functions whose weak derivatives are polynomially bounded.
Definition E.4. A function f : Rk → R is called pseudo-Lipschitz of degree d if |f (x) − f (y)| ≤
Pk
Ckx − yk(1 + i=1 |xi |d + |yi |d ) for some C.
Here are some basic properties of pseudo-Lipschitz functions:
• The norm k · k in Definition E.4 can be any norm equivalent to the `2 norm, e.g. `p , p ≥ 1,
Pk
norms. Similarly, i=1 |xi |d + |yi |d can be replaced by kxkdp + kykdp , for any p ≥ 1.
• A pseudo-Lipschitz function is polynomially bounded.
• A composition of pseudo-Lipschitz functions of degrees d1 and d2 is pseudo-Lipschitz of
degree d1 + d2 .
• A pseudo-Lipschitz function is Lipschitz on any compact set.
Master Theorem We state the Master Theorem below assuming a generic regularity condition
called rank stability (Assumption E.7), which we shall describe shortly. The proof will follow from a
more general, but more wordy Master Theorem in the next section (Theorem E.11).
Theorem E.5 (Pseudo-Lipschitz N ETSOR>+ Master Theorem). Fix a N ETSOR>+ program. Suppose the initial matrices W, vectors V, and scalars C are sampled in the fashion of Setup E.2. Suppose
the program satisfies the rank stability assumption below (Assumption E.7). Assume all φ used in
Nonlin+ are pseudo-Lipschitz (or, we can assume the slightly weaker Assumption E.6). Then
• For any fixed k and any polynomially-bounded ψ : Rk → R, as n → ∞,
n
1
k
1X
a.s.
ψ(h1α , . . . , hkα ) −−→ E ψ(Z h , . . . , Z h ),
n α=1
i

for any vectors h1 , . . . , hk in the program, where Z h are as defined in Definition E.3.
• Any scalar θ in the program tends to θ̊ almost surely, where θ̊ is as defined in Definition E.3.
Assumption E.6. Suppose
1. If a function φ(; −) : R0+l → R with only parameter arguments is used in Moment, then φ
is continuous in those arguments.
2. Any other function φ(−; −) : Rk+l → R with parameters (where k > 0) used in Nonlin+
or Moment is pseudo-Lipschitz in all of its arguments (both inputs and parameters).
Statement 1 in Assumption E.6 essentially says that if we have scalars θ1 , . . . , θl in the program,
then we can produce a new scalar by applying a continuous function (a weaker restriction than a
pseudo-Lipschitz function) to them. Indeed, if θ1 , . . . , θl converge almost surely, then this new scalar
does too.
30

Rank Stability The following assumption says that the vectors in a program should not change
any linear dependence relations abruptly in the infinite n limit.
Assumption E.7 (Rank Stability). Fix a N ETSOR>+ program that is setup by Setup E.2. We say this
program satisfies rank stability if for any matrix W ∈ Rn×n in the program37 and any collection H
of vectors h such that W h appears in the program, we have rank H = rank{Z h : h ∈ H}, almost
surely, for sufficiently large n.38
Most commonly, {Z h : h ∈ H} will be linearly independent for all such H, and therefore, by
the lower semicontinuity of rank, Assumption E.7 is automatically satisfied. We shall discuss the
necessity of Assumption E.7 below (Remark E.13).
E.2

N ETSOR>+ Master Theorem for Parameter-Controlled Nonlinearities

Parameter-Control Theorem E.5 will follow from the more general Master Theorem we state in
this section, which allows for more general nonlinearities which only needs to be mildly smooth in
the scalar parameters θ1 , . . . , θl , but not necessarily in x1α , . . . , xkα :
Definition E.8 (Parameter-Control). We say a parametrized function φ(−; −) : Rk × Rl → R is
polynomially parameter-controlled or just parameter-controlled for short39 , at Θ̊ ∈ Rl if
1. φ(−; Θ̊) is polynomially bounded, and
2. there are some polynomially bounded φ̄ : Rk → R and some function f : Rl → R≥0 ∪ {∞}
that has f (Θ̊) = 0 and that is continuous at Θ̊, such that, for all x1 , . . . , xk ∈ R and Θ ∈ Rl ,
|φ(x1 , . . . , xk ; Θ) − φ(x1 , . . . , xk ; Θ̊)| ≤ f (Θ)φ̄(x1 , . . . , xk ).

Note that f and φ̄ here can depend on Θ̊. The following examples come from Yang [50].
Example E.9. Any function that is (pseudo-)Lipschitz in x1 , . . . , xk and Θ is polynomially parametercontrolled. An example of a discontinuous function that is polynomially parameter-controlled is
φ(x; θ) = step(θx): For θ̊ 6= 0, we have
|φ(x; θ) − φ(x; θ̊)| ≤

|θ̊ − θ|
|θ̊|

,

so we can set f (θ) = |θ̊−θ|
and φ̄ = 1 in Definition E.8.
|θ̊|
Next, note that we can always express a vector in a N ETSOR>+ program as a nonlinear image of
previous G-vars. For example, if z = φ(x1 , x2 ; θ1 ), x1 = W v, x2 = ψ(y; θ2 ), y = W u, then z
def
can be directly expressed in terms of G-vars: z = φ̂(W v, W u; θ1 , θ2 ) =
φ(W v, ψ(W u; θ2 ); θ1 ).
Therefore, we can make the following definition
Definition E.10 (ϕ• , Θ• Notation). For any Rn vector x in a N ETSOR>+ program (Definition E.1),
let ϕx and Θx be the parametrized nonlinearity and the scalars such that x = ϕx (z 1 , . . . , z k ; Θx )
+
c
c
for some G-vars z 1 , . . . , z k . Likewise, for any scalar c in a N ETSOR
Pn > program, let ϕ and Θ be
the parametrized nonlinearity and the scalars such that c = n1 α=1 ϕx (zα1 , . . . , zαk ; Θc ) for some
G-vars z 1 , . . . , z k .
Theorem E.11 (Parameter-Controlled N ETSOR>+ Master Theorem). Fix a N ETSOR> program.
Suppose the initial matrices W, vectors V, and scalars C are sampled in the fashion of Setup E.2.
Suppose the program satisfies the rank stability assumption (Assumption E.7). Assume ϕu (−; −) is
parameter-controlled at Θ̊u for all vectors and scalars u. Then
i.e. either W ∈ W or W > ∈ W
In the case of variable dimension N ETSOR>+ programs, this is the same except W ∈ Rn×m can have
unequal dimensions and the limit is taken in the manner of Setup F.5.
39
This overloads the meaning of parameter-controlled from Yang [50], where the definition replaces the
2−
“polynomially bounded” in the definition here with “bounded by eCk·k +c for some C, c,  > 0.” In this paper,
we shall never be concerned with the latter (more generous) notion of boundedness, so there should be no risk of
confusion.
37

38

31

• For any random vector Θ ∈ Rl that converges almost surely to a deterministic vector Θ̊ as
n → ∞, and for any ψ(−; −) : Rk × Rl → R parameter-controlled at Θ̊,
n
1
k
1X
a.s.
ψ(gα1 , . . . , gαk ; Θ) −−→ E ψ(Z g , . . . , Z g ; Θ̊).
n α=1
i

for any G-vars g 1 , . . . , g k , where Z g are as defined in Definition E.3.
• Any scalar θ in the program tends to θ̊ almost surely, where θ̊ is as defined in Definition E.3.
Since pseudo-Lipschitz parametrized functions and parameterless polynomially bounded functions
are both parameter-controlled, Theorem E.11 implies Theorem E.5 trivially. Proof of Theorem E.11
can be found in Appendix M
Necessity of the Master Theorems’ Assumptions The following remarks from [50] show the
necessity of parameter control and of rank stability in Theorem E.11.
Remark E.12 (Necessity of parameter-control). Suppose ψ(x; θ) = I(θx 6= 0). For θ 6= 0, ψ is 1
everywhere except ψ(0; θ) = 0. For θ = 0, ψ is identically 0. Thus it’s easily seen that ψ is not
parameter-controlled at θ = 0.
Now, if g ∈ Rn is sampled like gα ∼ N (0, 1) and if θ = 1/n so that θ → θ̊ = 0, then
n
1X
a.s.
ψ(gα ; θ) −−→ 1
n α=1
but

E ψ(Z g ; θ̊) = E 0 = 0.
So our Master Theorem can’t hold in this case.
Remark E.13 (Necessity of Rank Stability Assumption E.7). Suppose we have two Initial G-vars
g 1 , g 2 ∈ Rn which are sampled independently as gα1 , gα2 ∼ N (0, 1). Let W ∈ Rn×n be sampled as
Wαβ ∼ N (0, 1/n). Then we can define h2 = θg 2 where θ = exp(−n) as a function of n, using
a.s.
a.s.
Nonlin+ , so that h2α −−→ 0. Additionally, let ḡ 1 = W g 1 and ḡ 2 = W h2 . Again, ḡα2 −−→ 0 but for
2
1
any finite n, ḡ is linearly independent from ḡ . Thus rank stability does not hold here, since the rank
1
2
of {ḡ 1 , ḡ 2 } is 2 for all finite n, yet {Z ḡ , Z ḡ } = {N (0, 1), 0} has rank 1.
Now consider the (parameterless) nonlinearity ψ(x, y) that is 1 except on the line y = 0, where it is
0. Then
n
1X
a.s.
ψ(ḡα1 , ḡα2 ) −−→ 1
n α=1
since ḡα2 is almost surely nonzero, but
1

2

1

E ψ(Z ḡ , Z ḡ ) = E ψ(Z ḡ , 0) = E 0 = 0.
Note this example uses the non-smoothness of ψ in an essential way. Therefore, we conjecture that
rank stability assumption can be removed in Theorem E.5.
Remark E.14 (Rank stability already holds for N ETSOR> programs). It turns out that, as long as
we only have parameterless nonlinearities, we get rank stability Assumption E.7 for free. This is
formulated explicitly in Lemma L.11. It is as a result of our proof of Theorem 2.10 that interleaves
an inductive proof of this rank stability (more generally, the inductive hypothesis CoreSet) with an
inductive proof of the “empirical moment” convergence (the inductive hypothesis Moments).
Relative Utilities of Theorem E.5 and Theorem E.11 While pseudo-Lipschitz functions are
closed under composition (at the expense of increasing degree), this is in general not true for
parameter-control. Thus, the assumptions of Theorem E.11 are relatively more cumbersome to check:
one has to manually unwind the nonlinearities into ϕx and then check this nested function is parametercontrolled. However, this increased flexibility of the parameter-control condition allows us to prove
useful theorems that is not possible with the just Theorem E.5. For example, if ϕx (z; θ) = z/θ, then
ϕx is not pseudo-Lipschitz, but it is parameter-controlled if θ̊ > 0. This fact is used in Yang [50, 51]
to compute the Gaussian Process kernel and the Neural Tangent Kernel of a randomly initialized
neural network with layernorm.
32

E.3

Getting Rid of Rank Stability Assumption through More Test Function Smoothness

Sometimes, the rank stability assumption Assumption E.7 can be difficult to check, so it is convenient
to have a version of the Master Theorem without it. As shown in Remark E.13, to do so, it’s not
enough to only have parameter-control; we need to have some smoothness in the nonlinearities
and the test functions. It turns out we can obtain a version of Theorem E.5 without assuming rank
stability.
Theorem E.15 (Pseudo-Lipschitz N ETSOR>+ Master Theorem without Rank Stability). Fix a
Tensor Program initialized accordingly to Setup E.2. Assume all nonlinearities are pseudo-Lipschitz
(or, we can assume the slightly weaker Assumption E.6). Then
1. For any fixed k and any pseudo-Lipschitz ψ : Rk → R, as n → ∞,
n

1
k
1X
a.s.
ψ(h1α , . . . , hkα ) −−→ E ψ(Z h , . . . , Z h ),
n α=1
i

for any vectors h1 , . . . , hk in the program, where Z h are as defined in Definition E.3.
2. Any scalar θ in the program tends to θ̊ almost surely, where θ̊ is as defined in Definition E.3.
Difference between Theorem E.5 and Theorem E.15 is 1) Theorem E.5 needs rank stability
Assumption E.7 and 2) the test function ψ in Theorem E.15(1) is pseudo-Lipschitz.
Proving Theorem E.15 The main difficulty with proving Theorem E.5 without rank stability is
that even if the covariance matrix of the Z random variables converges, its pseudo-inverse may not.
This is a crucial step in the Gaussian conditioning trick, so we need to more carefully modify the
proof skeleton of Theorem 2.10 (in contrast to the proof of Theorem E.11, which just needed to
modify some minor bounds in the proof skeleton). The main idea is to carefully extend the core-set
argument of Appendix L. See Appendix N for the proof.

F

Programs with Variable Dimension

We can also allow the matrices and vectors to have variable dimensions (not all equal to n). This
is useful in reasoning about neural networks of varying widths in each layer, and in proving the
Marchenko-Pastur law for arbitrary rectangular shape ratio (see Appendix H). The reader should feel
free to skip ahead and read this section only when approaching these topics.
Here we need to spend a few words on the right analogue of “large-n” limit we should take. The basic
idea is that, every time we apply one of the MatMul, Nonlin+ , or Moment rules, we implicitly set
equal some dimensions of the matrices and/or vectors involved. These equalities partitions the vectors
into classes sharing common dimensions. The limit we shall take is one in which the dimension of
each class tends to infinity, such that the dimension ratio of each pair of distinct classes tends to a
fixed number strictly in (0, ∞).
Notation In this section, we let dim(x) denote the dimension of a vector x. We present a relatively
self-contained exposition, but inevitably this will be highly similar to the nonvariable-dimension case,
so we highlight important differences in red.
Definition F.1. A N ETSOR> program (with variable dimensions) is just a sequence of vectors
inductively generated via one of the following ways from an initial set V of random vectors and a set
W of random matrices
Nonlin (Same as in Definition 2.1) Given φ : Rk → R and x1 , . . . , xk ∈ Rn in the same CDC, we
can generate φ(x1 , . . . , xk ) ∈ Rn
MatMul Given W ∈ Rn×m (resp. W ∈ Rm×n ) and x ∈ Rm , we can generate W x ∈ Rn (resp.
W > x ∈ Rn )
Definition F.2. A N ETSOR>+ program (with variable dimension) is just a sequence of vectors
inductively generated via one of the following ways from an initial set C of random scalars, an initial
set V of random vectors, and a set W of random matrices
33

Nonlin+ (Same as in Definition E.1) Given φ : Rk × Rl → R, previous scalars θ1 , . . . , θl ∈ R and
vectors x1 , . . . , xk ∈ Rn in the same CDC, we can generate a new vector
φ(x1 , . . . , xk ; θ1 , . . . , θl ) ∈ Rn
where φ(−; θ1 , . . . , θl ) applies coordinatewise to each α-slice (x1α , . . . , xkα ).
Moment (Same as in Definition E.1) Given same setup as above, we can also generate a new scalar
n

1X
φ(x1α , . . . , xkα ; θ1 , . . . , θl ) ∈ R
n α=1
MatMul Same as in Definition F.1 above.
Note that in both definitions above, the essential change is that the matrix in MatMul is now allowed
to have different dimensions on two sides.
The initial vectors in V can have varying dimensions. When we take the “large dimension” limit, we
may seek to hold certain pairs of such dimensions to be equal. We formalize this as an equivalence
relation between vectors in V: x ≃ y if we hold dim(x) = dim(y) as this dimension tends to infinity.
In addition, we have the following natural constraints on the dimensions of vectors involved in each
rule.

If y = φ(x1 , . . . , xk ), then dim(y) = dim(xi ), ∀i.
(23)
If y = W x and ȳ = W x̄, then dim(x) = dim(x̄) and dim(y) = dim(ȳ).
This allows us to extend the equivalence relation ≃ on V as discussed above to all vectors in the
program.
Definition F.3. Given an equivalence relation ≃ on the vectors of a program, we extend this to an
equivalence relation on all vectors of the program as the smallest equivalence relation containing the
relation
h ≡ h0 ⇐⇒ h ≃ h0 OR h and h0 are constrained to have the same dimension by (23).

(24)

We call any such equivalence class a Common Dimension Class, or CDC. We denote this common
dimension of vectors in a CDC c by dim(c).
Intuitively, the dimensions of vectors in each CDC are all the same but can be different in different
CDCs. The CDCs form a partition of all the vectors in a program. Each matrix in W “straddles”
between two (possible the same) CDCs.
Example F.4. Consider the MLP in Eq. (2) but with variable widths: f (ξ; θ) = W L+1 xL (ξ) with
0
input ξ ∈ Rn and output dimension nL+1 = 1, where we recursively define, for l = 2, . . . , L,
l

hl (ξ) = W l xl−1 (ξ) ∈ Rn ,
l

xl (ξ) = φ(hl (ξ)),

h1 (ξ) = W 1 ξ ∈ Rn

1

l−1

l
where each W l ∈ Rn ×n . Suppose we sample Wαβ
∼ N (0, 1/nl−1 ). The vectors in the
1
1
l
l
program are h (ξ), x (ξ), . . . , h (ξ), x (ξ). In Definition F.3, if ≃ is empty, then the CDCs will
just be {h1 (ξ), x1 (ξ)}, . . . , {hl (ξ), xl (ξ)} (each with common dimension nl ). If instead we set
h1 (ξ) ≃ · · · ≃ hl (ξ), then there is only one CDC with common dimension n1 = · · · = nL .
Setup F.5 (Variable Dimension N ETSOR> or N ETSOR>+ ). We will consider N ETSOR> or
N ETSOR>+ programs initialized as follows.
2
Matrix sampling For each initial W ∈ Rn×m in W, we sample Wαβ ∼ N (0, σW
/m) for an
d

def n 2
2
2
>
associated variance σW
. In this setting, we also set σW
)αβ =
> = m σW so that (W
2
N (0, σW > /n).

Vector sampling For every CDC c, there is a multivariate Gaussian Z c∩V = {Z g : g ∈ c ∩ V} ∈
Rc∩V such that the vectors in c ∩ V are sampled like {gα : g ∈ c ∩ V} ∼ Z c∩V iid for each
α ∈ [dim(c)].
Scalar sampling For a N ETSOR>+ program, the scalars in C are sampled the same way as in
Setup E.2.
34

How the limit is taken We shall consider a limit where for every matrix W ∈ Rn×m in W, the
dimensions n, m (which are dimensions of corresponding CDCs) tend to ∞ such that their
n 2
2
ratio n/m → ρ ∈ (0, ∞) for some finite but nonzero ρ. Note this implies σW
> = m σW →
def
2
2
2 def 2
σ̊W
> = ρσW . We also define σ̊W = σW for convenience.
Definition F.6. Given this setup, each vector h again has roughly iid coordinates distributed like
Z h , which is defined as follows. Likewise, for N ETSOR>+ programs, each scalar θ will tend to a
deterministic limit θ̊, as defined below. This is exactly the same as in Box 1 or Definition E.3 except
that σW should be replaced by σ̊W . We highlight the places where this occurs in red below.
ZInit Same as in Box 1 or Definition E.3.
def
2
ZMatMul For every Wαβ ∼ N (0, σW
/n) and vector x in the program, we set Z W x =
Ẑ W x + Ż W x
where

ZHat Ẑ W x is a Gaussian variable with zero mean. Let VW denote the set of all vectors in
the program of the form W y for some y. Then {Ẑ W y : W y ∈ VW } is defined to be
jointly Gaussian with zero mean and covariance


def 2
Cov Ẑ W x , Ẑ W y =
σ̊W E Z x Z y , for any W x, W y ∈ VW .
Furthermore,
{Ẑ W y : W y ∈ VW } is mutually independent from {Ẑ v : v ∈ V ∪
S
>
W̄ 6=W VW̄ }, where W̄ ranges over W ∪ {A : A ∈ W}.
ZDot With partial derivative interpreted naively (but see Remark 2.11 and F.7),
X
∂Z x
def 2
Ż W x =
σ̊W
Zy E
,
∂ Ẑ W > y
summing over W > y ∈ VW > introduced before x.
ZNonlin Same as in Box 1 or Definition E.3.
ZMoment Same as in Definition E.3.
x
Remark F.7 (Partial derivative expectation). The partial derivative expectation E ∂Z
can be
∂ Ẑ W > xi
defined without derivatives as in Remark 2.12, with the only change being the dependence on the
dimension ratio, which we highlight in red below: In ZDot above, suppose {W > y i }ki=1 are all
i
j
def
elements of VW > introduced before x. Define the matrix C ∈ Rk×k by Cij =
E Z y Z y and define
> i
def
the vector b ∈ Rk by bi =
E Ẑ W y Z x . If a = ρ−1 C + b (where C + denotes the pseudoinverse of C
and ρ = lim m/n is the limit ratio of dimensions of W ∈ Rm×n ), then in ZDot we may set
2
σW
E

∂Z x
∂ Ẑ W > yi

= ai .

(25)

Then by straightforward modifications of the proofs of the nonvariable-dimension cases, we can
prove the following Master Theorems.
Theorem F.8 (Variable Dimension N ETSOR> Master Theorem). Fix a N ETSOR> program (with
variable dimensions). Suppose the initial matrices W and vectors V are sampled in the fashion
of Setup F.5. Assume all φ used in Nonlin are polynomially bounded. Then for any fixed k and
any polynomially bounded ψ : Rk → R, as the dimensions of the vectors tend to ∞ as specified in
Setup F.5, we have
n

1
k
1X
a.s.
ψ(h1α , . . . , hkα ) −−→ E ψ(Z h , . . . , Z h ),
n α=1
i

for any collection of vectors h1 , . . . , hk ∈ Rn in the program, where Z h are defined in Definition F.6.
Theorem F.9 (Variable Dimension Pseudo-Lipschitz N ETSOR>+ Master Theorem). Fix a
N ETSOR> program (with variable dimensions). Suppose the initial matrices W, vectors V, and
scalars C are sampled in the fashion of Setup F.5. Suppose the program satisfies the rank stability
assumption (Assumption E.7). Assume each nonlinearity of Nonlin+ is pseudo-lipschitz. Then
35

• For any fixed k and any polynomially-bounded ψ : Rk → R, in the limit described in
Setup F.5,
n
1
k
1X
a.s.
ψ(h1α , . . . , hkα ) −−→ E ψ(Z h , . . . , Z h ),
n α=1
i

for any vectors h1 , . . . , hk ∈ Rn in the same CDC, where Z h are as defined in
Definition F.6.
• Any scalar θ in the program tends to θ̊ almost surely, where θ̊ is as defined in Definition F.6.
Again, Theorem F.9 strictly generalized by the following Master Theorem for Parameter-Controlled
nonlinearities.
Theorem F.10 (Variable Dimension Parameter-Controlled N ETSOR>+ Master Theorem). Fix a
N ETSOR> program (with variable dimensions). Suppose the initial matrices W, vectors V, and
scalars C are sampled in the fashion of Setup F.5. Suppose the program satisfies the rank stability
assumption (Assumption E.7). Assume ϕu (−; −) is parameter-controlled at Θ̊u for all vectors and
scalars u. Then
• For any random vector Θ ∈ Rl that converges almost surely to a deterministic vector Θ̊,
and for any ψ(−; −) : Rk × Rl → R parameter-controlled at Θ̊, we have
n

1
k
1X
a.s.
ψ(gα1 , . . . , gαk ; Θ) −−→ E ψ(Z g , . . . , Z g ; Θ̊).
n α=1

in the limit described in Setup F.5, for any G-vars g 1 , . . . , g k ∈ Rn in the same CDC, where
i
Z g are as defined in Definition F.6.
• Any scalar θ in the program tends to θ̊ almost surely, where θ̊ is as defined in Definition F.6.

G

Random Matrix Theory Background

In random matrix theory, we often are concerned with what the spectrum of a random matrix looks
like when the matrix is large. The answer to this question is typically phrased in a convergence
theorem which says the spectrum as a histogram converges to some distribution. We single out the
notion of convergence we are concerned with in this paper.
Definition G.1. Let µn be a random measure (such as the spectral distribution of a random matrix)
on R for each n = 1, 2, . . .. Let µ be a deterministic measure on R. We say µn converges almost
a.s.
surely
to µ, written µnR −−→ µ, if for every compactly supported continuous function ϕ, we have
R
a.s.
ϕ(x) dµn (x) −−→ R ϕ(x) dµ(x) (where the almost sure convergence is over the randomness of
R
µn ).
The Moment Method is a standard technique in probability theory to establish convergence in
distribution. In the context of random matrix theory, this method goes like the following:
• Under general conditions (see Carleman’s condition Fact G.3), a distribution is “pinned
down” by its moments: if all moments of a distribution µ converges to the moment of a target
distribution µ∗ , then we can in general say that µ → µ∗ for some notion of convergence →.
• For a Hermitian matrix A with eigenvalues λ1 , . .P
. , λn , the empirical distribution µ of its
n
eigenvalues has moments given by Eλ∼µ λr = n1 α=1 (λα )r = n1 tr Ar .
• Thus, to prove that the spectral distribution µ of a random matrix converges to some
distribution µ∗ , we need to show, for all r ≥ 0, we have tr Ar → Eλ∼µ∗ λr , for some notion
of convergence →.
This method implies that, to check the convergence in Definition G.1, it suffices to check the
convergence of moments:
36

Fact G.2 (Moment Method). In the context of Definition G.1 where µn and µ are probability
a.s.
measures, µn −−→ µ if 1) µ satisfies Carleman’s Condition (Fact G.3) and so does µn almost surely
for large enough n, and 2) for every k = 1, 2, . . .,
a.s.

E xk −−→ E xk

x∼µn

x∼µ

a.s.

where the convergence −−→ is over the randomness of the measure µn .
For more background on the Moment Method, see [42].
Fact G.3 (Carleman’s Condition). Let µ be a measure on R such that all moments
Z ∞
Mk =
xn dµ(x), k = 0, 1, 2, . . .
−∞

are finite. If

∞
X

− 1

M2k 2k = ∞,

k=1

then µ is the only measure on R with {Mk }k as its moments.

H

Proving the Marchenko-Pastur Law by Tensor Programs

Marchenko-Pastur law [27] is another cornerstone random matrix result on the level of semicircle
law. It says that the spectrum µAA> of (what’s known as Wishart) matrices AA> , where A ∈
Rm×n , Aαβ ∼ N (0, 1/n), converges in distribution if the shape ratio m/n → ρ for a finite but
a.s.
nonzero ρ ∈ (0, ∞): (see Definition G.1 for meaning of −−→)
1 p
a.s.
def
µAA> −−→ µmp (x) =
relu(1 − ρ−1 )δ(x) +
(b − x)(x − a)I[a,b] (x) dx
(26)
ρ2πx
√
√
where δ(x) is the Dirac Delta, relu(x) = xI(x > 0), a = (1 − ρ)2 , and b = (1 + ρ)2 . This
distribution also yields the (square of) of the singular value distributions of A.
In this section, we use N ETSOR> with variable dimensions (Appendix F) to prove this law. Like for
the semicircle law, our purpose is to 1) demonstrate concrete examples of computing with N ETSOR>
with variable dimensions, and 2) “benchmark” and show our framework powerful enough to prove
this nontrivial result.
Like in Section 3, we adopt the Moment Method (Fact G.2). This means that we need to show that
the moments of AA> converge to the corresponding moments of µ:
k
1
tr AA> → E λk , for all k = 1, 2, . . .
(27)
λ∼µmp
n
k
To calculate this moment tr AA> , we use the trace trick to rewrite it as
k
k
1
1
tr AA> =
E
v > AA> v.
n
n v∼N (0,I)
We can then express the RHS in a N ETSOR> program with variable dimensions: Let V = {v}, W =
{A}, and introduce new vectors via MatMul like so
ui = A> v i−1 ,

v i = Aui ,

i = 1, . . . , k,

where we have set v = v for convenience. Then mathematically, v i = (AA> )i v. By Theorem 3.3,
0

k
k
1
v > v k a.s.
tr AA> = E
−−→ E Z v Z v .
v
n
n
Thus, we are done if can demonstrate
k

E ZvZv =
i

Now, all that is left is to compute Z v .
37

E

λ∼µmp

λk

H.1

Explicit Calculations of the First Few Moments

To give a concrete feel for the proof, we first calculate the first few moments as examples. Before we
2
2
2
begin, note that σ̊A
= 1 and σ̊A
> = ρ (where σ̊A> is as defined in Setup F.5).
1

2
First Moment First we have Z v = N (0, 1), Z u = N (0,σ̊A
> ) = N (0, ρ), independent of each
other. Then
1
1
1
Z v = Ẑ v + Ż v ,
u1

1

1

2 v
Z E ∂Z
where Ż v = σ̊A
= Z v and Ẑ v = N (0, ρ) independent of everything else. Thus, the
∂ Ẑ u1
>
first moment of AA has limit
1
1
1
a.s.
tr AA> −−→ E Z v Z v = E Z v Ż v = E(Z v )2 = 1 = E λ
λ∼µmp
n
> 1

2

2

2

Next, we have Z u = Z A v = Ẑ u + Ż u where
!
v1
1
2
1
∂Z
2
= ρZ u ,
Ż u = σ̊A
Zu E
>
1
v
∂ Ẑ

Second Moment

1

2

and Ẑ u is zero-mean and jointly Gaussian with Ẑ u , with
 
 2
 1 2
2
 1 2 
2
v
v1
Var Ẑ u = σ̊A
E
Z
=
ρ
E
Ẑ
+
E
Ż v
= ρ(ρ + 1) = ρ2 + ρ
>
 2

1
1
2
v1 v
Cov Ẑ u , Ẑ u = σ̊A
Z = ρ E Ż v Z v = ρ.
> EZ
2

2

2

2

Then Z v = Z Au = Ẑ v + Ż v , where
Ż

v2

2
= σ̊A

Z

v1

∂Z u
E

2

∂ Ẑ u2

v

+Z E

∂Z u

2

!

∂ Ẑ u1

1

= Z v + ρZ v .

Thus, the second moment of AA> has limit
 1

2 a.s.
2
1
tr AA> −−→ E Z v Z v = E Z v Z v + ρZ v = 1 + ρ = E λ2 .
λ∼µmp
n
H.2

Proof for General Moments

In general, we have
i

• {Ẑ v }i is jointly Gaussian with covariance
 i

j
i
j
Cov Ẑ v , Ẑ v = E Z u Z u ,
i

• {Ẑ u }i is jointly Gaussian with covariance
 i

j
i−1
j−1
Cov Ẑ u , Ẑ u = ρ E Z v Z v ,
• and
i

Ż v =

i−1
X

j

Zv E

j=0

∂Z u
∂ Ẑ u

i

,
j+1

i

Ż u = ρ

i−1
X
j=1

j

Zu E

∂Z v

i−1

∂ Ẑ vj

.

(28)

Expanding all Z • into Ẑ • + Ż • recursively, it is easy to see that there are coefficients {aij }i,j , {bij }i,j
such that
i
i
X
X
i
j
i
j
Zv =
aij Ẑ v , Z u =
bij Ẑ u .
(29)
j=0

j=1

38

0

Since Ẑ v = Ẑ v is independent from all other Ẑ • , we thus seek to prove
k

ak0 = E Z v Z v =

E

λ∼µmp

λk .

Given Eq. (29), we see
∂Z v

i

i

,
j

bij = E

∂Z u

i

i−1
X

∂ Ẑ u

j=0

aij = E

∂ Ẑ v

∂Z u

.

∂ Ẑ uj

Plugging Eq. (29) into Eq. (28), we see
i

Ż v =

i−1
X

j

Zv E

=
j+1

j=0

=
Then

i
X

i−1
X

j
X

j=0

l=0

l

j

Z v bij+1

!
ajl Ẑ v

l

i−1
X

bij+1 =

Ẑ v

l

i−1
X
ajl bij+1 .

l=0

i

i

i

i

ail Ẑ v = Z v = Ẑ v + Ż v = Ẑ v +

l=0

j=l
i−1
X

Ẑ v

l

l=0

i−1
X
ajl bij+1 .
j=l

Matching coefficients, we obtain the recurrence relation
aii = 1,

ail =

and for all l = 0, . . . , i − 1,

i−1
X
ajl bij+1 .

(30)

j=l

Similarly
Ż

ui

=ρ

i−1
X

Z

uj

∂Z v
E

j=1

=ρ
Then

i
X

l

i−1
X

j
X

j=1

l=1

i−1

=ρ

∂ Ẑ vj

i−1
X
j=1

!
l

bjl Ẑ u

i

j

Z u ai−1
j

aji−1 = ρ

i−1
X

i

i

i

l=1

i−1
X
bjl aji−1 .
j=l

l=1

bil Ẑ u = Z u = Ẑ u + Ż u = Ẑ u + ρ

l

Ẑ u

i−1
X

Ẑ u

l=1

l

i−1
X
bjl aji−1 .
j=l

Matching coefficients, we get
bii = 1,

and for all l = 1, . . . , i − 1, bil = ρ

i−1
X
bjl ai−1
j .

(31)

j=l
def
Let Mr =
Eλ∼µmp λr . Then we claim that the solution to the recurrence Eq. (30) and Eq. (31) is
given by
aij = Mi−j , bii = 1, and bij = ρMi−j for all i − j ≥ 1.
Plugging into Eq. (30) and Eq. (31), we see it remains to show the following Catalan-like identity
s−2
X
Ms = ρ
Mr Ms−1−r + (1 + ρ)Ms−1 .
(32)

r=1

This can be done by a change of variables to express Eλ∼µmp λr as an expectation over the semicircle
law µsc :
√
Mr = E λr = E (1 + ρ + λ ρ)r−1 .
λ∼µmp

λ∼µsc

Expanding the power and using the Catalan identity Eq. (5) for the moments of the semicircle law,
we have


b(r−1)/2c
X
k
r−1−2k r − 1
Mr =
α (1 + α)
Ck
(33)
2k
k=0

where Ck is the kth Catalan number. Then one can verify Eq. (32) by expanding Mr into Catalan
Pk−1
numbers using Eq. (33), and repeatedly applying the Catalan identity Ck = i=0 Ci Ck−1−i . This
finishes the proof of the Marchenko-Pastur law.
39

I

Subprogram and Subprogram Independence

To prove Theorem 4.2, we need to introduce a notion of subprograms and then the independence of
subprograms. Our key lemma in this section is Lemma I.5, which shows that, if a subprogram is
sufficiently uncorrelated from the previous subprogram, then it is also independent from it.
Definition I.1. A program can be written down formally as a sequence of lines, each assigning a new
vector generated from Nonlin or MatMul to a new variable, like the examples above. A subprogram
of a program is a span of such lines. Given a program π and subprograms π1 , . . . , πk , we write
π = π1 | · · · |πk if π consists of π1 followed by π2 followed by π3 , and so on, ending with πk . Each
vector in π is introduced in a unique subprogram πi , for which we write v ∈ πi . By convention, all
initial vectors in V are included in the first subprogram π1 .
For example, the simple N ETSOR> program represented by Eq. (2) can be split into two subprograms,
one which introduces xl , hl for l = 1, . . . , R, and another with l = R+1, . . . , L. As another example,
Eq. (21) and Eq. (22) are two subprograms that comprise the program expressing the forward and
backward propagations of the network. In general, forward propagation and backward propagation
form natural subprograms, where the latter depends on (the preactivations computed in) the former.
Next, we introduce the notion of subprogram independence, which generalizes the main property of
Simple GIA Check (Condition 1). Before that, we first recall the notation for distributional equality.
d

Notations Given two random variables X, Z, and a σ-algebra A, the notation X =A Z means that
for any integrable function φ and for any random varible Z measurable on A, E φ(X)Z = E φ(Z)Z.
We say that X is distributed as (or is equal in distribution to) Z conditional on A. In case A is the
d
a.s.
trivial σ-algebra, we just write X = Z. If X and Z agrees almost surely, then we write X = Z.
Definition I.2. Consider a program divided into two subprograms: π = π1 |π2 . For each W ∈ W,
we create an iid copy W̄ . Let π̄2 be the same as π2 except that each matrix W used in π2 is replaced
with W̄ in π̄2 . Let x1 , . . . , xk denote the vectors of π1 , y 1 , . . . , y p denote the vectors of π2 , and
ȳ 1 , . . . , ȳ p denote the vectors of π̄2 . We say π2 is independent from π1 if we have the distributional
equality
1
k
1
p
1
k
1
p
d
(Z x , . . . , Z x , Z y , . . . , Z y ) = (Z x , . . . , Z x , Z ȳ , . . . , Z ȳ )
or equivalently, the conditional distributional equality
1

p

1

d

p

(Z y , . . . , Z y ) =Z x1 ,...,Z xk (Z ȳ , . . . , Z ȳ ).
For example, if π1 expresses the forward computation of a network satisfying Simple GIA Check
(Condition 1), and π2 expresses the backward computation, then we can assume W > used in π2
(backpropagation) is independent from W used in π1 (forward propagation). This then implies π2 is
independent from π1 . On the other hand, the subprogram given by Eq. (22) is not independent from
the subprogram given by Eq. (21), as we calculated.
Note Definition I.2 is purely about the structure of the subprograms (which is the only thing the
random variables Z • depend on), not the values of the vectors or matrices in the program.
We will talk about polynomials of matrices below, e.g. W W > W 2 (W > )2 if W is a square matrix.
Definition I.3 (Noncommutative Polynomial). Given a matrix W ∈ Rm×n , a (noncommutative)
monomial in {W, W > } is a product aX1 X2 · · · Xk for some a ∈ R, k ≥ 0, where each Xi ∈
{W, W > } (with appropriate matching shapes). Its degree is k. A (noncommutative) polynomial in
{W, W > } is a linear combination of such monomials. Its degree is the maximum degree of all of its
nonzero monomials.
Remark I.4. If W and v are a matrix and a vector of a program, and A is a polynomial in {W, W > },
then one can naturally express the product Av in N ETSOR>. For example, if A = W (W > )2 W , then
Av = u where
v 1 = W v, v 2 = W > v 1 , v 3 = W > v 2 , u = W v 3 .
Below, when we say a program calculates Av, we mean a program of this form.
The following is the key workhorse of this section. It says that, in a program π1 |π2 , if π2 1) consists
of only MatMul and 2) only depends on π1 through a single vector v uncorrelated with most vectors
40

of π1 , then π2 is independent from π1 . As we will comment shortly, this gives another proof of the
Gradient Independence Assumption when Simple GIA Check (Condition 1) is satisfied.
Lemma I.5 (Independence from Uncorrelation). Consider a N ETSOR> program π = π1 |π2 , and
π2 calculates Av (in the sense of Remark I.4) where v is a vector of π1 and A is a polynomial in
{W, W > } for some W ∈ W. If E Z v Z x = E Z v Ẑ y = 0 for every x, y ∈ π1 with y = W x or
y = W > x, then π2 is independent from π1 .
Note if W v or W > v appears in π1 , then the premise implies Z v = 0 and the theorem becomes
vacuously true. So to get nontrivial implications, W v and W > v should not appear in π1 . Given
Lemma I.5, we can obtain a more explicit form of Z Av by some straightforward calculation.
Lemma I.6. In the setting of Lemma I.5, we have
Z Av = τ Z v + S
where S is zero-mean and independent from {Z u : u ∈ π1 }, and τ = limn→∞ n1 tr A.
Proof. By Lemma I.5, we can assume that W (where A is a polynomial in {W, W > }) is independent
from everything in π1 . Then a simple induction on the degree of A in W shows that
Z Av = τ Z v + S

(34)

u

where S is zero-mean and independent from {Z : u ∈ π1 }.
However, at this point, we don’t know what τ would be. To understand τ , we proceed as follows. Let
v̄ be sampled iid according to v̄α ∼ Z v (which can be constructed with a N ETSOR> program40 ), so
d
that Z v̄ = Z v . Then we can easily see from the definition of Z that Z Av̄ = τ Z v̄ + S̄ where τ here is
d
the same as τ in Eq. (34) and (Z v̄ , S̄) = (Z v , S). Then by the Master Theorem,
τ E(Z v̄ )2 = E Z Av̄ Z v̄ = lim

1 >
1
v̄ Av̄ = lim
tr A E(Z v̄ )2
n→∞ n

n→∞ n

we get τ = limn→∞ n1 tr A as desired.
Extension to N ETSOR>+ and Variable Dimensions Both Lemmas I.5 and I.6 hold as stated for
N ETSOR>+ programs (see Appendix E) and programs with variable dimensions (see Appendix F).
Note that, in programs with variable dimensions, the τ in Lemma I.6 vanishes if v and Av are in
different CDCs.
Another Look at How Simple GIA Check Implies GIA The lemmas above give us another proof
that the gradient independence assumption leads to correct calculations given Simple GIA Check
(Theorem D.1). To demonstrate Lemmas I.5 and I.6 in action, before proving FIP, we give a proof of
Theorem D.1 for MLP.
Proof sketch for an MLP. Consider the MLP f (ξ) = W L+1 xL (ξ) with input ξ ∈ Rd and output
dimension 1, where we recursively define, for l = 1, . . . , L,
g l (ξ) = W l xl−1 (ξ)

dxl−1 (ξ) = W l> dg l (ξ)

xl (ξ) = φ(g l (ξ))

dg l (ξ) = φ0 (g l (ξ))

dxl (ξ).

Here, the dimensionalities are W 1 ∈ Rn×d ; W 2 , . . . , W L ∈ Rn×n ; W L+1 ∈ R1×n , and for all
l ∈ [L], g l , xl , dxl , dg l ∈ Rn .
Let πF be the program that computes g l , xl , l = 1, . . .√, L, on an input ξ. Below, we abbreviate
g l = g l (ξ) and so on. In this program, V = {g 1 , dxL = nW L+1 }, 41 and W = {W 2 , . . . , W L }.42
The vector v can always be expressed as φ(g 1 , . . . , g k ) for some G-vars g 1 , . . . , g k and some function
i
1
k
φ : Rk → R. Then v̄ can be constructed as φ(ḡ 1 , . . . , ḡ k ) where {ḡα
, . . . , ḡα
} ∼ N (µ, Σ) with µi = E Z g
gi gk
and Σij = E Z Z .
√
41
Here dxl should be interpreted as n∂f /∂xl , and likewise for dg l .
42
l
For concreteness (which will not matter much below): we sample Wαβ
∼ N (0, 1/n) for l = 2, . . . , L + 1,
40

d

1
and suppose gα
= N (0, 1), induced by appropriate sampling of W 1 .

41

Now let’s see how to apply Lemmas I.5 and I.6 to show Theorem D.1. The first step of the backward
pass is dg L = φ0 (g L ) dxL . Let π1 denote πF plus this line. Let π2 be the next line dxL−1 =
L
W L> dg L . Then π1 , π2 along with v = dg L satisfies the condition of Lemma I.5. Indeed, Z dg is
L
L−1
L−1
L
L
uncorrelated from Z g and Z x
= Ẑ x
because Z dg is linear in Z dx , which is by definition
1
L
sampled independently from all W , . . . , W . Thus, by Lemma I.5, we may rigorously treat W L>
as independent from W L for the purpose of computing any quantity of the form of the Theorem 2.10
L−1
L
for the program π1 |π2 . In particular, by Lemma I.6, Z dx
= τ Z dg + S, where S is zero-mean
L−1
= S.
and independent from {Z u : u ∈ π1 }, and τ = limn→∞ n1 tr W L> = 0, i.e. Z dx
L−1

L−1

L−1

L−1

Then we can repeat this reasoning inductively: Z dg
= φ0 (Z g ) · Z dx
= φ0 (Z g ) · S is
g L−1
xL−2
xL−2
dg L−1
uncorrelated from Z
and Z
= Ẑ
because Z
is linear in S. This lets us apply
Lemmas I.5 and I.6 to π2 being the line dxL−2 = W L−1> dg L−1 , π1 being all previous lines, and v
being dg L−1 . So on and so forth.
I.1

Proving Lemma I.5

Here we prove Lemma I.5. It will use the following trivial but useful facts.
Proposition I.7. For any x ∈ π, Z x is measurable against the σ-algebra generated by {Ẑ y :
G-var y ∈ π}. .
Lemma I.8. Fix a matrix W . If E Z v Ẑ W h = 0 for all G-var W h introduced before v, then
E ∂Z v /∂ Ẑ W h = 0 for all such W h as well.
Proposition I.7 follows from a simple inductive argument, and Lemma I.8 follows from Eq. (4).
Qp
Proof of Lemma I.5. It suffices to prove the case when we assume A = i=1 W ti , ti ∈ {1, >}, can
be expressed as a monomial of degree p in {W, W > }. Let W̄ be an iid copy of W as in Definition I.2
and likewise let π̄2 , y 1 , . . . , y p , ȳ 1 , . . . , ȳ p be as in Definition I.2. By our assumption, π2 computes
y 1 = W t1 v and y i = W ti y i−1 for i = 2, . . . , p, and likewise π̄2 computes ȳ 1 = W̄ t1 v and
ȳ i = W̄ ti ȳ i−1 for i = 2, . . . , p.
Define X to be the σ-algebra generated by {Z x : x ∈ π1 }. Note that by Proposition I.7, X is also
the σ-algebra generated by {Ẑ x : G-var x ∈ π1 }. Then we need to show
1

p

d

1

p

(Z y , . . . , Z y ) =X (Z ȳ , . . . , Z ȳ ).
We proceed by induction on p. The base case of p = 0 is vacuously true.
Suppose the induction hypothesis holds for p = q − 1
1

(Z y , . . . , Z y

q−1

d

1

) =X (Z ȳ , . . . , Z ȳ

q−1

).

and we shall prove it for p = q. A simple inductive argument (as in our proof of the semicircle law;
see Section 3.3) shows that for each i ∈ [q − 1], we have
i

Z ȳ = τi Z v + S̄i

(35)

for some τi ∈ R and some zero-mean S̄i independent from X (and thus also independent from Z v ).
Since we have assumed A to be a monomial in {W, W > }, we can suppose WLOG that tq = 1 so
q
q
q
q
q
q
that y q = W y q−1 . By definition, Z y = Ẑ y + Ż y and Z ȳ = Ẑ ȳ + Ż ȳ . We shall show
1

(Z y , . . . , Z y

q−1

q

q

d

1

, Ẑ y , Ż y ) =X (Z ȳ , . . . , Z ȳ

q−1

q

q

, Ẑ ȳ , Ż ȳ )

which would imply the IH for p = q.
q

q

q

Case Ẑ y : By definition, Ẑ y (resp. Ẑ ȳ ) is zero-mean, jointly Gaussian with {Ẑ W x : x, W x ∈ π}
(resp. {Ẑ W̄ x : x, W̄ x ∈ π̄2 }), and independent from {Ẑ Qx : x, Qx ∈ π} for any Q 6= W (resp. for
q
1
q−1
any Q 6= W̄ ). By Proposition I.7, these facts fully determine the distributions of Z y , . . . , Z y , Ẑ y
1
q−1
q
q
i
and of Z ȳ , . . . , Z ȳ , Ẑ ȳ conditioned on X . We thus need to show that A) Cov(Ẑ y , Ẑ y ) =
q
i
q
q
Cov(Ẑ ȳ , Ẑ ȳ ) for all i = 1, . . . , q −1, and B) Cov(Ẑ y , Ẑ g ) = Cov(Ẑ ȳ , Ẑ g ) for all G-var g ∈ π1 .
42

i

A) For any i = 2, . . . , q − 1, we either have y i = W y i−1 or y i = W > y i−1 . 1) In the latter case, Ẑ y
q
i
q
q
i
is independent from Ẑ y , and likewise Ẑ ȳ is independent from Ẑ ȳ , so trivially Cov(Ẑ y , Ẑ y ) =
q
i
Cov(Ẑ ȳ , Ẑ ȳ ) = 0. 2) In the former case,
q

i

Cov(Ẑ y , Ẑ y ) = Cov(Ẑ W y

q−1

, Ẑ W y

i−1

)

q−1
i−1
q−1
i−1
2
2
= σW
E Zy Zy
= σW
E Z ȳ Z ȳ
q

by IH

i

= Cov(Ẑ ȳ , Ẑ ȳ )
as desired. For i = 1, we either have y 1 = W v or y 1 = W > v, and a similar logic shows
q
1
q
1
Cov(Ẑ y , Ẑ y ) = Cov(Ẑ ȳ , Ẑ ȳ ) as well.
B) If g ∈ π1 is a G-var with g = Qx for some Q 6= W and x ∈ π1 , then by definition, Ẑ g is
q
q
independent from both Ẑ y and Ẑ ȳ . Now suppose instead g = W x for some x ∈ π1 . Then
q

2
Cov(Ẑ y , Ẑ g ) = σW
E Zy

q−1

2
Z x = σW
E Z ȳ

q−1

Zx

by IH

2
= σW
(τq−1 E Z v Z x + E S̄q−1 Z x ) = 0

= Cov(Ẑ

W̄ ȳ q−1

, Ẑ

Wx

ȳ q

by Eq. (35)

g

) = Cov(Ẑ , Ẑ ).

x

Here E S̄q−1 Z = 0 because S̄q−1 is zero-mean and independent from Z x as x ∈ π1 , and E Z v Z x =
0 by the premise of this theorem.
q−1
P
q
q
q
∂Z y
2
x
Case Ż y : By definition, Ż y is a linear combination Ż y = σW
(y,x)∈P Z E ∂ Ẑ y , where
q
P is the set of all y = W > x introduced before y q in π. Likewise, Ż ȳ is a linear combination
q−1
P
ȳ
q
2
ȳ i−1
Ż ȳ = σW
E ∂Z
where I is the set of all i ∈ [q − 1] such that ȳ i = W̄ > ȳ i−1 , and
i∈I Z
∂ Ẑ ȳi
for convenience here we have set y 0 = ȳ 0 = v. Clearly, by IH,
!
X i−1 ∂Z yq−1
ȳ 1
ȳ q−1
ȳ q
ȳ q d
y1
y q−1
yq
2
y
.
(Z , . . . , Z
, Ẑ , Ż ) =X Z , . . . , Z
, Ẑ , σW
Z
E
∂ Ẑ yi
i∈I
y q−1

Note that {(y i , y i−1 ) : i ∈ I} ⊆ P. So it suffices to show that E ∂Z∂ Ẑ y = 0 for all (y, x) ∈
P \ {(y i , y i−1 ) : i ∈ I}. Fix one such y, which must have been introduced in π1 .
y q−1

Now by Eq. (35), E ∂Z∂ Ẑ y
independent from X 3 Ẑ
>

y

ȳ q−1

= E ∂Z∂ Ẑ y

v

= E τq−1 ∂∂Z
+
Ẑ y

∂ S̄
, we have E ∂ Ẑq−1
y
>

∂ S̄q−1
.
∂ Ẑ y

Since S̄q−1 is zero-mean and
v

= 0. At the same time, by Lemma I.8, E ∂∂Z
=0
Ẑ y

because E Z v Ẑ W h = 0 for all G-var W h ∈ π1 by the premise of this theorem. Combining these
y q−1

results together, we get E ∂Z∂ Ẑ y

J

= 0 as desired.

Proving Free Independence Principle

Proof of Theorem 4.2. For each i = 1, . . . , t, let Ai be a polynomial in {W, W > } for some W ∈ W
or in {Diag(x) : x ∈ π}, such that consecutive Ai and Ai+1 are always polynomials in different
collections. (Here superscripts always denote indices). Then we need to show
1
1
1
a.s.
tr(At − I tr At ) · · · (A1 − I tr A1 ) −−→ 0.
n
n
n
We apply the trace trick to re-express this as
1
1
1
a.s.
E v > (At − I E ut> At ut ) · · · (A1 − I E u1> A1 u1 )v −−→ 0
(36)
n
n
n
where expectation is taken over v, u1 , . . . , ut ∼ N (0, I). We will express this as a N ETSOR>+
program and apply Theorem A.7 to show this convergence. This N ETSOR>+ program takes the
form of π|π 0 where π is the program in the theorem statement defining W ∈ W and x ∈ π, and π 0
computes n1 v > (At − n1 ut> At ut ) · · · (A1 − n1 u1> A1 u1 )v, as we describe in more detail below43 . .
43

For concreteness (which won’t matter in the proof below): The initial set of vectors Vπ|π0 is then the initial
vectors of π along with {v, u1 , . . . , ut }, Vπ|π0 = Vπ ∪ {v, u1 , . . . , ut }. Likewise, the initial matrices Wπ|π0
are the same as those of π, Wπ .

43

Inside π 0 , we let v 0 = v and compute v i as follows in subprograms of π 0 :
v i = (Ai −

1 i> i i i−1
u A u )v ,
n

∀i ∈ [t].

Then the quantity in Eq. (36) is just n1 v > v t .
Example If Ai = (W > )2 W for some W ∈ W then we can unpack v i = (Ai − n1 ui> Ai ui )v i−1
into the subprogram
g 1 = W v i−1

g2 = W > g2

h2 = W > h1

h3 = W > h2

g 3 = W > g 3 = Ai v i−1
1
c = ui> h3
n

h1 = W ui
v i = g 3 − c · v i−1 .

Here c is computed using Moment and v i is computed using Nonlin+ , and everything else uses
MatMul. Similarly, if Ai = Diag(x) for some x ∈ π with bounded coordinates, then we can unpack
v i = (Ai − n1 ui> Ai ui )v i−1 into
g=x

v i−1

h=x

ui

c=

1 i>
u h
n

v i = g − c · v.

Here c is computed using Moment and everything else is computed using Nonlin+ . Note that, in
both examples, the nonlinearities involved satisfy the nonlinearity conditions of Theorem A.7. One
can easily see this is true in general for the entire subprogram π 0 . By induction on t, we prove the
following claim, which would imply Eq. (36).
i

Claim J.1. For each v i , i ≥ 1, the associated random variable Z v is zero-mean and 1) independent
def
from X i−1 =
{Z x : x introduced before or is v i−1 } if Ai is not diagonal or 2) uncorrelated from
i−1
i−1 def
X
and X̂
= {Ẑ x : G-var x introduced before or is v i−1 } if Ai is diagonal.
i

Here, “uncorrelated” means E Z v R = 0 for all R ∈ X i−1 ∪ X̂ i−1 . Applying this claim to v t , we get
E

v,u1 ,...,ut

a.s.

t

v > (At − ut> At ut ) · · · (A1 − u1> A1 u1 )v = v > v t −−→ E Z v Z v = 0

by Theorem A.744 , as desired, assuming rank stability (Assumption E.7). We shall check rank
stability after proving this claim.
Proof. We proceed by induction on t, starting with t = 1. Our key tool is Lemma I.6.
BaseCase: By the cyclic property of trace, we can WLOG suppose A1 is a polynomial in {W, W > }
for some W ∈ W. Furthermore, we can assume WLOG that A1 is a monomial in W
a.s.
def
and W > . Then n1 u1> A1 u1 −−→ τ 1 =
limn→∞ n1 tr A1 . by something? By Lemma I.6,
1
1
1
v
A v
1 v
Z =Z
= τ Z + S where S is zero-mean and independent from X 0 . Then Z v =
1
1 1> 1 1
Z A v−( n u A u )v = S satisfies the required zero-mean and independence property.
Induction:
i−1

NondiagonalCase By IH, Z v
is uncorrelated from X i−2 ∪ X̂ i−2 . So we can apply
Lemma I.6 in the same fashion as in the base case to obtain the desired result.
DiagonalCase: Suppose Ai = Diag(x) for some x ∈ π. By the non-consecutive assumpi−1
tion, Ai−1 is not diagonal. So IH tells us Z v
is independent from X i−2 . One
i
vi
v i−1
x
x
can see easily that Z = Z
(Z − E Z ). We need to prove E Z v R = 0 for all
R ∈ X i−1 ∪ X̂ i−1 . We divide into cases:
i−1
i
1. Suppose R ∈ X i−2 ∪ X̂ i−2 . Then E Z v R = E Z v (Z x − E Z x )R =
i−1
i−1
E Z v E(Z x − E Z x )R = 0 because Z v
is independent from Z x and R
and is zero-mean.
44

While Theorem A.7 is stated for a program (and not a subprogram), its proof can be readily adapted to the
subprogram case.

44

i−1

2. Suppose R ∈ X̂ i−1 \ X̂ i−2 . Then R is possibly correlated with Z v
but
i−1
i
{R, Z v } is independent from X i−2 3 x by Lemma I.5. Therefore, E Z v R =
i−1
i−1
E Z v (Z x − E Z x )R = E Z v R E(Z x − E Z x ) = 0.
i−2
3. Suppose R ∈ X i−1 \ X i−2 . Then R decomposes into R = τ Z v
+ S by
Lemma I.6 for some τ ∈ R and S zero-mean and independent from X i−2 . Then
E Zv R = E Zv

i

i−1

= E Zv

= E Zv

i−1

(Z x − E Z x )(τ Z v

= τ EZ
= 0.

v i−1

i−1

(Z x − E Z x )R

x

x

(Z − E Z )Z

i−1

i−2

v i−2

+ S)
+ E Zv

i−1

(Z x − E Z x )S

i−1

i−1

Here E Z v (Z x − E Z x )S = E Z v S E(Z x − E Z x ) = 0 because {Z v , S}
i−1
i−2
i−1
is independent from Z x . Similarly, E Z v (Z x − E Z x )Z v
= E Z v E(Z x −
i−2
i−1
E Z x )Z v
= 0 because by IH Z v
is zero-mean and independent from X i−2 3
x
v i−2
Z ,Z
.

Finally, to see rank stability (Assumption E.7), we simply note two points: 1) The subprogram π is a
N ETSOR> program and thus it has rank stability automatically (Remark E.14). 2) Ẑ x has nonzero
variance for every G-var x computed in π 0 . Since each vector used in MatMul in π 0 depends linearly
on some unique Ẑ x , this shows that the rank in Assumption E.7 is always full, and thus rank stability
holds.

K

Mathematical Tools

We will use the following trivial but useful fact repeatedly.
Lemma K.1. For an integer m, and complex numbers ai ∈ C, i ∈ [k],
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
K.1

Probability Facts
d

Notations Given two random variables X, Z, and a σ-algebra A, the notation X =A Z means that
for any integrable function φ and for any random varible Z measurable on A, E φ(X)Z = E φ(Z)Z.
We say that X is distributed as (or is equal in distribution to) Z conditional on A. In case A is the
d
a.s.
trivial σ-algebra, we just write X = Z. If X and Z agrees almost surely, then we write X = Z. The
d
a.s.
expression X −
→ Z (resp. X −−→ Z) means X converges to Z in distribution (resp. almost surely).
Lemma K.2. Let {Xn }n≥1 be a sequence of random variables with zero mean. If for some p ∈ N
and for all n, E Xn2p ≤ cn−1−λ , for some λ > 0, then Xn → 0 almost surely.
Proof. By Markov’s inequality, for any  > 0,

X
n

Pr(|Xn | > ) = Pr(Xn2p > 2p ) ≤ E Xn2p /2p ≤ cn−1−λ /2p
X
Pr(|Xn | > ) ≤
cn−1−λ /2p < ∞.
n

45

By Borel-Cantelli Lemma, almost surely, |Xn | ≤  for all large n. Then, if we pick a sequence
{k > 0}k converging to 0, we have that, almost surely, for each k, |Xn | ≤ k for large enough n —
i.e. almost surely, Xn → 0.
The following is a standard fact about multivariate Gaussian conditioning
n1
Proposition K.3. Suppose Rn1 +n2 3 x ∼ N (µ, K), where
 we partition x = (x1 , x2 ) ∈ R ×
K11 K12
d
Rn2 , µ = (µ1 , µ2 ) ∈ Rn1 × Rn2 , and K =
. Then x1 =x2 N (µ|x2 , K|x2 ) where
K21 K22
+
µ|x2 = µ1 + K12 K22
(x2 − µ2 )
+
K|x2 = K11 − K12 K22
K21 .

Lemma K.4 (Stein’s Lemma). For jointly Gaussian random variables Z1 , Z2 with means Z 1 , Z 2 ,
and any differentiable function φ : R → R where both E φ0 (Z1 ) and E Z1 φ(Z2 ) exist, we have
E(Z1 − Z 1 )φ(Z2 ) = Cov(Z1 , Z2 ) E φ0 (Z2 ).
More generally, for jointly Gaussian random variables Z1 , . . . , Zk with means Z 1 , . . . , Z k , and any
differentiable function φ : Rk → R, we have
E(Z1 − Z 1 )φ(Z1 , . . . , Zk ) =

k
X

Cov(Z1 , Zj ) E ∂j φ(Z1 , . . . , Zk )

j=1

whenever both sides are finite.
Lemma K.5. Let X = (X1 , . . . , Xk ) ∈ Rk be a multivariate Gaussian with 0 mean and nondegenerate covariance Ω. Let Xī denote the vector (X1 , . . . , Xi−1 , Xi+1 , . . . , Xk ) ∈ Rk−1 . Likewise,
let Ωiī ∈ Rk−1 (resp. Ωīi ∈ Rk−1 ) be the ith row (resp. column) with entry i removed, and
Ωīī ∈ R(k−1)×(k−1) be the submatrix of Ω obtained by removing the ith row and ith column. Then
for any i ∈ [k] and any f : Rk → R,
E Xi f (X) =

k
X

aj Ωji

j=1

whenever both sides are defined, where
def
aj =

E(Xj − Ωj j̄ Ω+
X )f (X)
E(Xj − E[Xj | Xj̄ ])f (X)
j̄ j̄ j̄
=
.
Var(Xj | Xj̄ )
Ωjj − Ωj j̄ Ω+
Ω
j̄ j̄ j̄j

Note that, for any j, aj does not depend on i.
Proof. By a standard density argument, we may assume f is differentiable. Then by multivariate
Stein’s Lemma (Lemma K.4),
E Xi f (X) =

k
X

Ωij E ∂j f (X).

j=1

By applying bivariate Stein’s Lemma (Lemma K.4) to conditional distributions, we get
E ∂j f (X) = E

E ∂j f (X) = E

Xj̄ Xj |Xj̄

E

Xj̄ Xj |Xj̄

(Xj − E[Xj | Xj̄ ])f (X)
(Xj − E[Xj | Xj̄ ])f (X)
=E
.
X
Var(Xj | Xj̄ )
Var(Xj | Xj̄ )

The other equality follows from straightforward calculations.
Lemma K.6. Let Φ : Rn → R be measurable. Then for z ∼ N (ζ, Σ), the following Hessian and
gradient matrices are equal:
d2
d
E Φ(z) = 2
E Φ(z)
2
dζ
dΣ
whenever both sides exist.
46

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
1  −1
d e− 2 (ζ−z)Σ (ζ−z)
−1
> −1 e
=
−Σ
+
Σ
(ζ
−
z)(ζ
−
z)
Σ
dΣ det(2πΣ)1/2
2
det(2πΣ)1/2
2
1 d − 1 (ζ−z)Σ−1 (ζ−z)
=
.
e 2
2 dζ 2

Integrating against Φ gives the result. For general Σ, apply a continuity argument, since the set of
invertible Σs is dense inside the set of all PSD Σ.
K.2

Gaussian Conditioning Trick

Review of Moore-Penrose Pseudoinverse We first recall Moore-Penrose pseudoinverse and some
properties of it.
Definition K.7. For A ∈ Rn×m , a pseudoinverse of A is defined as a matrix A+ ∈ Rm×n that
satisfies all of the following criteria
AA+ A = A,

A+ AA+ = A+ ,

(AA+ )> = AA+ ,

(A+ A)> = A+ A.

The following facts are standard.
• If A has real entries, then so does A+ .
• The pseudoinverse always exists and is unique.
• When A is invertible, A+ = A−1 .
• (A> )+ = (A+ )> , which we denote as A+> .
• A+ = (A> A)+ A> = A> (AA> )+ .
• AA+ is the orthogonal projector to the column space of A; I − A+ A is the orthogonal
project to the null space of A.
• If A has singular value decomposition A = U ΛV where U and V are orthogonal and Λ has
the singular values on its diagonal, then A+ = V > Λ+ U > where Λ+ inverts all nonzero
entries of Λ.
Pn
• For any collection of vectors {vi }ni=1 in a Hilbert space, w 7→ i,j=1 vi (Σ+ )ij hvj , wi,
where Σij = hvi , vj i, is the projection operator to the linear span of {vi }ni=1 .
We present a slightly more general versions of lemmas from Bayati and Montanari [6] that deal with
singular matrices.
Lemma K.8. Let z ∈ Rn be a random vector with i.i.d. N (0, v 2 ) entries and let D ∈ Rm×n be a
linear operator. Then for any constant vector b ∈ Rn the distribution of z conditioned on Dz = b
satisfies:
d

z =Dz=b D+ b + Πz̃
where D+ is the (Moore-Penrose) pseudoinverse, Π is the orthogonal projection onto subspace
{z : Dz = 0}, and z̃ is a random vector of i.i.d. N (0, v 2 ).
Proof. When D = [Im×m |0m×n−m ], this claim is immediate. By rotational symmetry, this shows
that, for any vector space V and v orthogonal to it, conditioning z on V + v yields a Gaussian centered
on v with covariance determined by ΠV z. Then the lemma in the general case is implied by noting
that {z : Dz = b} can be decomposed as {z : Dz = 0} + D+ b.
47

Lemma K.9. Let A ∈ Rn×m be a matrix with random Gaussian entries, Aij ∼ N (0, σ 2 ). Consider
fixed matrices Q ∈ Rm×q , Z ∈ Rn×q , P ∈ Rn×p , X ∈ Rm×p . Suppose there exists a solution in A
to the equations Z = AQ and X = A> P . Then the distribution of A conditioned on Z = AQ and
X = A> P is
d

⊥
A =Z=AQ,X=A> P E + Π⊥
P ÃΠQ

where
E = ZQ+ + P +> X > − P +> P > Y Q+ ,
⊥
+
+
Ã is an iid copy of A, and Π⊥
P = I − ΠP and ΠQ = I − ΠQ in which ΠP = P P and ΠQ = QQ
are the orthogonal projection to the space spanned by the column spaces of P and Q respectively.

Proof. We apply Lemma K.8 to D : A 7→ (AQ, P > A). The pseudoinverse of D applied to (Z, X > )
can be formulated as the unique solution of

argmin kAk2F : AQ = Z, P > A = X >
A

where k − kF denotes Frobenius norm. We check that E is a 1) a solution to AQ = Z, P > A = X >
and 2) the minimal norm solution.
We have EQ = ZQ+ Q + P +> X > Q − P +> P > Y Q+ Q. Note that Y Q+ Q = Z because Z =
AQ =⇒ Y Q+ Q = AQQ+ Q = AQ = Z. So EQ = Z + P +T (X > Q − P > Z). But X > Q =
P > AQ = P > Z, so EQ = Z as desired. A similar, but easier reasoning, gives P > E = X > . This
verifies that E is a solution.
To check that E is minimal norm, we show that it satisfies the stationarity of the Lagrangian
L(A, Θ, Γ) = kAk2F + hΘ, Z − AQi + hΓ, X − A> P i.
∂L
= 0 =⇒ 2A = ΘQ> + P Γ> for some choices of Θ ∈ Rn×q and Γ ∈ Rm×p . For
So ∂A
Θ = 2Z(Q> Q)+ and Γ> = 2(P > P )+ [X > − P > ZQ> ], we can check that

ΘQ> + P Γ> = 2Z(Q> Q)+ Q> + 2P (P > P )+ [X > − P > ZQ+ ]
= 2ZQ+ + 2P +> X > − 2P +> P > ZQ+
= 2E
as desired.
K.3

Hermite Polynomials

We follow a presentation roughly given by O’Donnell [33].
Definition K.10. Let Hen (x) be the probabilist’s Hermite polynomial, given by the generating funcP∞
n
1 2
tion ext− 2 t = n=0 Hen (x) tn! . Let L2 (R; N (0, 1)) be the space of square-integrable functions
against the standard Gaussian measure, equipped with inner product hφ, ψiG = Ex∼N (0,1) φ(x)ψ(x)
and norm kφk2G = hφ, φiG . Let Hn (x) = Hen (x)/kHen kG be the normalized versions.
Fact K.11. {Hen (x)}n≥0 form an orthogonal basis for L2 (R; N (0, 1)) and {Hn (x)}n≥0 form an
orthonormal basis for L2 (R; N (0, 1)).
√
Fact K.12. kHen k2G = n! so that Hn (x) = Hen (x)/ n!.
Fact K.13. Let φ, ψ : R → R be square integrable against N (0, 1). Suppose we have the expansions
in the orthonormal Hermite basis
φ(x) = a0 H0 (x) + a1 H1 (x) + · · · ,

ψ(x) = b0 H0 (x) + b1 H1 (x) + · · · .

Let (z1 , z2 ) ∼ N (0, C) where C11 = C22 = 1 and C12 = ρ ∈ [−1, 1]. Then we have the absolutely
convergence series
E φ(z1 )ψ(z2 ) = a0 b0 + a1 b1 ρ + a2 b2 ρ2 + · · · .
48

def
Suppose u1 , . . . , uk are unit vectors in Rk , and let λij =
hui , uj i. Construct a zero mean Gaussian

d

vector z = (z1 , . . . , zk ) such that E zi zj = λij . Note that z = U g where g = (g1 , . . . , gk )
is a standard Gaussian vector and U = (uij )ki,j=1 is the matrix with ui as rows. Then for any
s = (s1 , . . . , sk ) we can compute
Y
E exp(hs, zi) = E exp(s> U g) = E
exp(gi (U > s)i )
i

=

Y

>

by independence of {gi }i

E exp(gi (U s)i )

i

=

Y


exp

i

1 > 2
(U s)i
2



1X > 2
(U s)i
2 i

= exp

!




X
1 > 2
1
= exp
kU sk = exp 
hui , uj isi sj 
2
2 i,j


X
1
λij si sj  .
= exp 
2 i,j
P 
Dividing by exp 21 i s2i , we obtain


!
X
X
E exp
si zi − s2i = exp 
λij si sj 


i

E

YX
i

i<j

Hem (zi )(m!)−1 sm
i =

m

YX

(n!)−1 (λij si sj )

n

i<j n

X Y smi Y
i
E
Hemi (zi ) =
mi !
k
i
i

(mi )i=1

X
(n(ij) )i<j

Y P n(ij) Y λnij(ij)
si j6=i
n !
i<j (ij)
i

where mi ≥ 0 for all i, and n(ij) = n(ji) ≥ 0 are indexed by unordered sets {i, j}. Matching
coefficients of s, we get
Theorem K.14. For any sequence (mi ≥ 0)ki=1 ,

!
Y
Y
Y λnij(ij)

E
Hemi (zi ) =
mr ! 
n
!
(ij)
r
i
i<j

!
Y
Yp
Y λnij(ij)

E
Hmi (zi ) =
mr ! 
n
!
(ij)
r
i
i<j
P
Q
whenever there are (n(ij) ≥ 0)i<j such that, for all i, mi =
j6=i n(ij) . E
i Hemi (zi ) = 0
otherwise.
In particular,
P∞
Theorem K.15. If φi : R → √R has Hermite expansion φi (z) =
u=0 aiu Hu (z) =
P∞
u=0 biu Heu (z) where biu = aiu / u!, then

!
Y
X
Y
Y λnij(ij)

E
φi (zi ) =
brmr mr ! 
n !
r
i
i<j (ij)
(n(ij) )i<j

!
X
Y
Y λnij(ij)
p

=
armr mr ! 
n(ij) !
r
i<j
(n(ij) )i<j


s
! Y
X
Y
mi
n(ij)
 λij 
=
armr
{n(ij) }j6=i
r
i<j
(n(ij) )i<j

49

where mi =

P

j6=i n(ij) , whenever the RHS is absolutely convergent.

Lemma K.16. Suppose φi , i ∈ [k] are as in Theorem K.15, with additionally the constraint that we
have an index set I ⊆ [k] such that bi0 = ai0 = 0 (i.e. E φi (zi ) = 0) for all i ∈ I. Assume that, for
some λ < 1/2, |λij | ≤ λ/(k − 1) for all i 6= j. Then

E

k
Y

k
Y

φi (zi ) ≤ Ck,|I|

!
λd|I|/2e

kφr kG

r=1

i=1

for some constant Ck,|I| depending on k and |I| but independent of {φi }i and λ.


mi
mi
Proof. In the notation of Theorem K.15, {n(ij)
by the multinomial theorem. Thus
}j6=i ≤ (k − 1)

E

k
Y

X

φi (zi ) ≤

i=1

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



! Y
 λnij(ij) 
i<j

!
kφr kG

p

(k − 1)mr

r=1


Y  λ n(ij)


k−1
i<j

!
kφr kG

P

λ

i<j n(ij)

r=1

!
kφr kG

s



B|I| λd|I|/2e (1 + o(1)) .

r=1

where BV is the number of ways to cover V vertices with dV /2e edges, and o(1) is a term that goes
to 0 as λ → 0 and is bounded above by a function of k whenever λ < 1/2. Then an appropriate
Ck,|I| can be chosen to obtain the desired result.

Lemma K.17. Suppose φi , i ∈ [k] are as in Theorem K.15, with additionally the constraint that, we
have some index set I ⊆ [3, k]√
such that for all i ∈ I, bi0 = ai0 = 0 (i.e. E φi (zi ) = 0). Assume that
|λ12 | ≤ 1/2, for some λ < 1/ 8, |λij | ≤ λ/(k − 1) for all i 6= j and {i, j} 6= {1, 2}. Then

E

k
Y

0
φi (zi ) ≤ Ck,|I|

k
Y

!
kφr kG

λd|I|/2e

r=1

i=1

for some constant Ck0 depending on k and I but independent of {φi }i and λ.
50

Proof. Define P = {(i, j) : 1 6= i < j 6= 2} and Q = {(i, j) : i < j and (i = 1 XOR j = 2)}.
Qk
Also write R = r=1 kφr kG . As in the above proof,
k
Y

|E

φi (zi )|

i=1
k
Y

X

≤

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



!
Y n(ij)

λij  2−n(12)
(i,j)∈P

(i,j)∈P

v
u 2 
Pi<j n(ij) −n(12)

u Y mr 
Pk
1
λ
t
2−n(12)
(k − 1)mr −n(12) (k − 1) 2 r=3 mr
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
2

n(12)

(n(ij) )i<j :
∀r∈I,mr ≥1

X

≤R

mr
{n(rj) }j6=r

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
(rj) j6∈{1,2} r=3
r=1

X

≤R

armr

r=1

(n(ij) )i<j :
∀r∈I,mr ≥1

X

s

(n(ij) )i<j :
∀r∈I,mr ≥1



2−n(12) λ

P

i<j n(ij) −n(12)


n(12) + 21 m(12) −n(12) Pi<j n(ij) −n(12)
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
λ

P

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
o(1) is a term that
2 e edges, and√
goes to 0 as λ → 0 and is upper bounded by a function of k for all λ < 1/ 8. Choosing the
0
appropriate constant Ck,|I|
then gives the result.
K.4

Bounding the Off-Diagonal Correlations of a Projection Matrix

Lemma K.18. Let Π ∈ Rn×n be an orthogonal projection matrix. Then each diagonal entry
Πii ∈ [0, 1].
Proof. Because Π = Π2 , we have for each i, Πii =
0 =⇒ Πii ∈ [0, 1].

2
j Πij

P

=⇒ Πii (1 − Πii ) =

2
j6=i Πij ≥

P

Lemma K.19. Let Π ∈ Rn×n be an orthogonal projection matrix of rank k. Suppose its diagonal
def
entries are strictly positive. Consider the correlation
C =
D−1/2 ΠD−1/2 where D =
P matrix
2
Diag(Π). Then the off-diagonal entries of C satisfy i<j Cij ≤ 0.5(r2 + r), where r = n − k.
51

P
P
2
Proof. Because Π = Π2 , we have for each i, Πii = j Π2ij = j Πii Πjj Cij
=⇒ 1 − Πii =
P
2
2
At
the
same
time,
each
C
∈
[0,
1].
Thus
we
seek
an
upper
bound
on
the following
Π
C
.
ij
j6=i jj ij
2
linear program in the n(n − 1)/2 variables C(ij) (which identiy Cij = Cji = C(ij) ).
X
2
Maximize
C(ij)
i6=j

s.t. ∀i, 1 − Πii =

X

2
Πjj C(ij)

j6=i
2
∀i < j, C(ij)
∈ [0, 1].

This LP has the dual
X

Minimize

τij +

i<j

n
X

(1 − Πii )ζi

i=1

s.t. ∀i < j, τij + ζi Πjj + ζj Πii ≥ 1
∀i < j, τij ≥ 0
∀i, ζi ∈ R.
Any feasible value of the dual LP is an upper bound on the original LP. We now set the dual variables.
We will set τij = 1 − ζi Πjj − ζj Πii for all i < j, so that the objective is now
 
n
X
n
− (k − 1)
ζi .
2
i=1

1.0
0.9
0.8
0.7
0.6
0.5
0.4
0.3
0.2

k/2

11

x4

22
33

x3

x or xt
f(t)

(t)

It remains to 1) set the variables ζi and 2) verify that 1 − ζi Πjj + ζj Πii ≥ 0 for all i < j.

44

x2

0

x1

55

66

0

1

2

3

t

4

5

tx or t

k/2
6

0

1

2

3

t

4

5

6

Figure 2: Illustration of π̂, xt , and tx .
WLOG, assume Π11 ≥ · · · ≥ Πnn > 0. Define the function π : (0, n] → R as the piecewise constant
extension of the diagonal of Π to a real function on (0, n]:
def
π(t) =
Πii ,

where

i = dte.

Note π is nonincreasing and takes values in (0, 1]. Define f as the integral of π:
Z s
def
f (s) =
π(t) dt.
0

Note f is increasing and concave because π is positive and nonincreasing, so f has an inverse f −1 .
Additionally, f (0) = 0, f (n) = k.
Let

def −1
tx =
f (k/2 + x),

def
xt =
f (t) − k/2.

Now define π̂ : [−k/2, k/2] → (0, 1] by
π̂(x) = π(tx ) = π(dtx e),

so that for all t ∈ (0, n], π̂(xt ) = π(t).
52

Fig. 2 illustrates the above definitions. Suppose
{x1 , . . . , xn } and {−x1 , . . . , −xn } are disjoint and do not contain 0.

(37)

We can
this WLOG as the set of Π satisfying this property is dense and the function
P assume
2
Π 7→
Cij
is continuous so our bound applies to all Π be continuity. This assumption implies that
any line segment [−δ, +δ] has at most one endpoint in {x1 , . . . , xn }.
Now we define ζ̂ : [−k/2, k/2] → R as the
unique function satisfying
ζ̂(x)π̂(−x) + ζ̂(−x)π̂(x) = 1.

(38)

𝑥1
−𝑘/2

𝑥4

0

(39)

(40)

Then define the next segment on the side with less green
by the reflection formula
1 − 𝜁መ −𝑥 𝜋ො 𝑥
𝜁መ 𝑥 =
𝜋ො −𝑥

1
Note Eq. (38) implies ζ̂(0) = 2π̂(0)
and

ζ̂(x)
ζ̂(−x)
1
+
=
.
π̂(x) π̂(−x)
π̂(x)π̂(−x)

𝑥3

Start by defining the segment containing 0 by
1
𝜁መ 0 =
2𝜋ො 0
Mark defined segments as green

and
ζ̂(x) = ζ̂(y) if dtx e = dty e

𝑥2

By Eq. (39), ζ̂ is constant on each subinterval of [−k/2, k/2] in the partition induced by
{x1 , . . . , xn }. A second of thought shows there
is a unique ζ̂ satisfying Eq. (38) and Eq. (39);
this is illustrated by by Fig. 3.

𝑥5
𝑘/2

repeat

Thus we may set the dual variables
def
ζi =
ζ̂(x),

where dtx e = i.

We check this is a valid assignment of dual variables (in that τij ≥ 0 are satisfied) in Claim K.3.
Let r = n − k. It turns out, given Claim K.1
and Claim K.2, we have
n
X

ζi ≥

n+r
2

Figure 3: Illustration of how to define ζ̂.
so that the objective value given the above dual
variables is
 
n
n+r
1
1
1
−
(n − r − 1) = (n2 − n) − (n2 − r2 − n − r) = (r2 + r)
2
2
2
2
2
i=1

as desired.
Claim K.1.

n
X

Z k/2

ζ̂(x)
ζi =
dx =
π̂(x)
−k/2
i=1

Z k/2
0

dx
.
π̂(x)π̂(−x)

Proof. The first equality follows from
Z
Z f (i)−k/2
Z f (i)
ζ̂(x)
ζ̂(x)
ζi
ζi
dx =
dx =
dx = (f (i) − f (i − 1))
= ζi .
π̂(x)
π̂(x)
π(i)
π(i)
x:dtx e=i
f (i−1)−k/2
f (i−1)
The second equality follows from folding the integral around x = 0 and applying Eq. (38).
Claim K.2. With r = n − k,
Z k/2
0

dx
n+r
≥
π̂(x)π̂(−x)
2
53

R k/2

dx
=
−k/2 π̂(x)

Pn

i=1 1 = n by same reasoning as in Claim K.1. We also have π̂(x) ≤
R k/2
1
dx
π̂(x) ≥ 1 for all x. Thus 0
π̂(x)π̂(−x) is at least

Proof. Note

1 =⇒
(Z
)
Z k/2
k/2
1
inf
g(x)g(−x) dx | g : [−k/2, k/2] → [1, ∞),
g(x) dx = n, g nondecreasing .
2
−k/2
−k/2

It’s not hard to see this infimum is achieved by g ∗ (x) = 1 for all x ∈ [−k/2, k/2) with a delta jump
of mass n − k = r at the point k/2. The value for this g ∗ (x) is 21 (k + 2r) = n+r
2 .
Claim K.3. For any x, y ∈ [−k/2, k/2],
ζ̂(x)π̂(y) + ζ̂(y)π̂(x) ≤ 1.
Proof. We show the equivalent claim that
ζ̂(x)
ζ̂(y)
1
+
≤
.
π̂(x) π̂(y)
π̂(x)π̂(y)
Suppose −x < y, then by telescoping and Claim K.4,

dty e 
X
ζi+1
ζ̂(y)
ζ̂(x)
ζ̂(−x)
ζi
ζ̂(x)
+
=
+
+
−
π̂(x) π̂(y)
π̂(x) π̂(−x)
π(i + 1) π(i)
i=dt−x e


dty e 
X
1
1
1
1
+
−
.
π̂(x)π̂(−x)
π(i + 1) π(i) π̂(−xi )

=

i=dt−x e

1
1
Note that because xi ≥ −x for all i in the sum, we have −xi ≤ x and π̂(−x
≤ π̂(x)
. Therefore, by
i)
telescoping again,

dty e 
X
ζ̂(x)
ζ̂(y)
1
1
1
1
+
≤
+
−
π̂(x) π̂(y)
π̂(x)π̂(−x)
π(i + 1) π(i) π̂(x)
i=dt−x e

1
1
=
=
π(dty e)π̂(x)
π̂(y)π̂(x)
as desired.
Now suppose y < −x. Then by telescoping and Claim K.4,

dt−x e 
X
ζ̂(x)
ζ̂(y)
ζ̂(x)
ζ̂(−x)
ζi+1
ζi
+
=
+
−
−
π̂(x) π̂(y)
π̂(x) π̂(−x)
π(i + 1) π(i)
i=dty e

dt−x e 

=

X
1
−
π̂(x)π̂(−x)

i=dty e

1
1
−
π(i + 1) π(i)



1
.
π̂(−xi )

1
1
Note that because xi ≤ −x for all i in the sum, we have −xi ≥ x and π̂(−x
≥ π̂(x)
. Therefore, by
i)
telescoping again,

dt−x e 
X
ζ̂(y)
1
1
1
1
ζ̂(x)
+
≤
−
−
π̂(x) π̂(y)
π̂(x)π̂(−x)
π(i + 1) π(i) π̂(x)
i=dty e

1
1
=
=
π(dty e)π̂(x)
π̂(y)π̂(x)
as desired.
Claim K.4. For any i = 1, . . . n − 1, we have
ζi+1
ζi
1
−
=
π(i + 1) π(i)
π̂(−xi )
54



1
1
−
π(i + 1) π(i)


.

Proof. By Eq. (40), for any x ∈ {x1 , . . . , xn−1 }, we have
ζ̂(x + )
ζ̂(x − )
1
1
−
=
−
≥0
π̂(x + ) π̂(x − )
π̂(x + )π̂(−x) π̂(x − )π̂(−x)
for sufficiently small  > 0. This is because, by Eq. (37), π̂(−x + ) = π̂(−x − ) and ζ̂(−x + ) =
ζ̂(−x − ), and we obtain the above by subtracting Eq. (40) for x +  and x − . In particular, letting
i = dtx− e so that i + 1 = dtx+ e, we have the desired claim.
P
2
≤ 2r2 + 6r
Remark K.20. Bobby He provided a much simpler argument to show that i<j Cij
(which is slightly weaker than Remark K.20 but suffices for our downstream needs):
def
¯ ≤ 2r. We split the
Let J =
{i : Πii ≥ 1/2} and J¯ = [n] \ J. Then because tr Πii = n − r, |J|
squared sum of off-diagonal entries into
X
X
X
X
2
2
2
2
Cij
=
Cij
+2
Cij
+
Cij
.

i6=j

i∈J
j∈J¯

i6=j
i,j∈J

i6=j
i,j∈J¯

We bound each of the terms separately.
X
X
X
X
2
Cij
≤4
Π2ij ≤ 4
Π2ij = 4(tr Π2 −
Π2ii ) ≤ 4(k − n(k/n)2 ) = 4(n − k)k/n ≤ 4r.
i6=j
i,j∈J

i6=j
i,j∈J

2

X
i∈J
j∈J¯

i

i6=j

2
Cij
=2

X

Π2ij /Πii Πjj ≤ 4

i∈J
j∈J¯

X

Π2ij /Πjj = 4

X

¯ ≤ 8r.
Πjj /Πjj = 4|J|

j∈J¯

i∈J
j∈J¯

P
Above, we used the fact that Π2 = Π =⇒ Πjj + i Π2ij . Finally, because |Cij | ≤ 1, we have
X
2
¯ 2 ≤ 4r2 .
Cij
≤ |J|
i6=j
i,j∈J¯

Summing the above and dividing by two yields the desired result.
K.5

Law of Large Numbers for Images of Weakly Correlated Gaussians

Theorem K.21.
Let z ∼ N (0, Π) where Π ∈ Rn×n is a matrix with nonzero diagonal entries and
P
satisfying i<j Π2ij /(Πii Πjj ) ≤ R for some constant R. Consider functions φi : R → R, i ∈ [n],
with finite variance Var (φi (x) : x ∼ N (0, Πii )) < ∞. Then
!
n
 √
X
X
Var
φi (zi ) ≤ R 2 + 1
Var (φi (x) : x ∼ N (0, Πii )) .
i=1

i

Note, by Remark K.20, if Π is an orthogonal projection matrix of rank k, then we may take
R = 0.5((n − k)2 + (n − k)). By Theorem K.21 and Chebyshev’s inequality, we have the following.
Corollary K.22 (Weak Law of Large Numbers for Images of Weakly Correlated Gaussians). Consider a triangular array {ζ1n , . . . , ζnn }n≥1 of Gaussian variables, where each row is given by
ζ n ∼ N (0, Σn ) and the covariance matrix Σn has nonzero diagonal entries and satisfies
X
(Σnαβ )2 /(Σnαα Σnββ ) ≤ R(n)
α<β
def
for some R(n) > 0. Let φnα : R → R, α ∈ [n], n ≥ 1, be functions with mean µnα =
Eζαn φnα (ζαn ).
Then, as n → ∞, we have the following convergence in probability

n

1X n n
p
(φ (ζ ) − µnα ) −
→0
n α=1 α α
55

if the following holds
√
n
R(n) 2 + 1 X
Var
(φnα (ζαn )) → 0.
n
ζα
n2
α=1
Note that, if the variance Varζαn (φnα (ζαn )) is uniformly bounded by some T > 0, then R(n) can grow
like n1−ε and we still have convergence in probability.
−1/2
Proof of Theorem K.21. Let C = DP
ΠD−1/2 , D = Diag(Π), be the correlation matrix
√ of Π.
2
The premise of the theorem implies i<j Cij
≤ R. Define functions ψi by ψi (y) = φi ( Πii y) −
√
Ex∼N (0,1) [φi ( Πii x)]. Then
!
!2
n
n
X
X
X
Var
φi (zi ) =
E
ψi (zi )
=
E
ψi (zi )ψj (zj ).
z∼N (0,Π)

i=1

z∼N (0,C)

z∼N (0,C)

i=1

i,j

Expand ψi in the Hermite orthonormal basis,
ψi (x) = ai1 H1 (x) + ai2 H2 (x) + · · ·
where Hj (x) is the jth Hermite polynomial, normalized so that Ez∼N (0,1) Hj (z)2 = 1 (note
that H0 (x) = 1 and does not appear here because Ex∼N (0,1) ψi (x) = 0 by construction). For
P 2
def
any locally integrable φ : R → R, let kφk2G =
Ez∼N (0,1) φ(z)2 , so that kψi k2G =
k aik =
Var (φi (x) : x ∼ N (0, Πii )) . Then,
X
i<j

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
uX 2 2  X 2k 
t
aik ajk
Cij

∞
Xu

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
k=1

≤2

−1/2

i<j


!2 
X
X
2

a2
Cij
i<j

∞
X
X
k=1

since |Cij | ≤ 1

ik

i

!
a2ik

R

by premise

i

R X
=√
kψi k2G
2 i
P
P
On the other hand, i Ex∼N (0,1) ψi (x)2 = i kψk2G , so that
 √
X
X
E
ψi (zi )ψj (zj ) ≤ R 2 + 1
kψi k2G
i,j

z∼N (0,C)

i

 √
X
= R 2+1
Var (φi (x) : x ∼ N (0, Πii )) .
i

Theorem K.23.
Let z ∼ N (0, Π) where Π ∈ Rn×n is a matrix with nonzero diagonal entries and
P
satisfying i<j Π2ij /(Πii Πjj ) ≤ R for some constant R independent of n. Consider functions
def
φi : R → R for each i ∈ [n] with mean µi =
Ezi φi (zi ). Suppose each φi has finite (2p)th centered
def 1 Pn
2p
moment Ezi (φi (zi ) − µi ) , where p ≥ 6. Then for Q =
i=1 φi (zi ),
n

2p

E[(Q − E Q)2p ] ≤ Cn−1.5 max E (φi (zi ) − µi )
i∈[n]

56

for some constant C depending on p and R, but not on n or the functions φi . If in addition, each φi
has finite centered moments of order 2pL for some L > 1, then
v
u n
u1 X
2pL
L
E (φi (zi ) − µi ) .
E[(Q − E Q)2p ] ≤ Cn−1.5+1/L t
n i=1
Note, by Remark K.20, an orthogonal projection matrix of rank n − O(1) satisfies the off-diagonal
condition of Theorem K.23. Combining Theorem K.23 and Lemma K.2, we obtain the following.
Corollary K.24 (Strong Law of Large Numbers for Images of Weakly Correlated Gaussians).
Consider a triangular array {ζ1n , . . . , ζnn }n≥1 of Gaussian variables, where each row is given
by ζ n ∼ N (0, Σn ) and the covariance matrix Σn has nonzero diagonal entries and satisfies
X
(Σnαβ )2 /(Σnαα Σnββ ) ≤ R
α<β

for some R > 0 independent of n. Let φnα : R → R, α ∈ [n], n ≥ 1, be functions with mean
def
µnα =
Eζαn φnα (ζαn ). Then, as n → ∞,
n

1X n n
a.s.
(φ (ζ ) − µnα ) −−→ 0
n α=1 α α
if one of the following condition holds:
• For some p ≥ 6 and some S independent of n,
E (φnα (ζαn ) − µnα )2p ≤ S.

n
ζα

• For some q > 12 and some S independent of n,
n

1X
E (φn (ζ n ) − µnα )2q < S.
n α=1 ζαn α α
−1/2
Proof of Theorem K.23. Define P
the correlation matrix C = D−1/2
, D = Diag(Π).
√ ΠD
√ The
2
premise of the theorem implies i<j Cij ≤ R. Let ψi (y) = φi ( Πii y) − Ex∼N (0,1) [φi ( Πii x)]
be the scaled, centered version of φi .

Order the off-diagonal entries of the correlation matrix in the order of decreasing squared value:
2
2
2
C(ij)
(1) ≥ C(ij)(2) ≥ . . . ≥ C(ij)(N ) ,


where N = n2 , and (ij)(t) = (i(t) j (t) ) are unordered pairs of distinct indices i(t) 6= j (t) . Since
P 2
t C(ij)(t) ≤ R, by Remark K.20, we deduce that
√
|C(ij)(t) | ≤ n−1/4
for all t > R n.
(41)
Consider the (2p)th centered moment
!2p
n
1X
E
ψi (yi )
= n−2p E
n i=1

X

2p
Y

ψσ(a) (yσ(a) ),

σ:[2p]→[n] a=1

where y ∼ N (0, C). We shall bound the sum to show that this moment is not too large.
First note the naive bound via AM-GM,
2p
Y

2p

1 X
E
ψσ(a) (yσ(a) ) ≤ E
ψσ(a) (yσ(a) )2p ≤ max
E [ψi (y)2p ]
2p
i∈[n] y∼N (0,1)
a=1
a=1
def
= max E[(φi (zi ) − E φi (zi ))2p : zi ∼ N (0, Πii )] =
B2p .

i∈[n]

57

(42)

Now, for any collection of numbers {xi ∈ R}m
i=1 and any L > 0, we have the trivial bound
P
1/L
m
L
maxi |xi | ≤
, and this bound is tighter the larger L is. Thus
j=1 |xj |
v
u n
u1 X
1/L L
t
B2p ≤ n
(E[ψi (y)2p ])L ≤ n1/L B2p,L ,
n i=1
q P
n
def L 1
2pL ], for any L.
where B2p,L =
i=1 E[ψi (y)
n
We can categorize the n2p terms of
X

E

σ:[2p]→[n]

2p
Y

ψσ(a) (yσ(a) )

(43)

a=1

as follows.
• Suppose σ is injective.
√
– Suppose for each a 6= b, (σ(a)σ(b)) = (ij)(t) for some t > R n, so that
|Cσ(a)σ(b) | ≤ n−1/4 by Eq. (41). By Lemma K.16,
2p
Y

E

2p
Y

ψσ(a) (yσ(a) ) ≤ C1

!
kψσ(r) kG



n−1/4

p

r=1

a=1

for some constant C1 dependent on p but not on R, {ψr }r , or n. Thus the contribution
of all such σ to the sum Eq. (43) is
!
!
2p
2p
X
Y
X
Y
kψσ(r) kG n−p/4
C1
kψσ(r) kG n−p/4 ≤
C1
all such σ

r=1

r=1

all σ

≤ C1 n

n
X

−p/4

!2p
kψσ(r) kG

i=1
0
= C1 n1.75p B2p

where we have set
n

0 def
B2p
=

1X
kψi kG
n i=1

!2p
.

√
– Suppose
for some a, b ∈ [2p], (σ(a)σ(b)) = (ij)(t) for t ≤ R n. There are at most

√
2p−2
2 2p
≤ C2 n2p−1.5 such σ, for some C2 depending on p and R but not n
2 R n·n

√
(or {ψr }r ). Indeed, there are R n of choosing such a t, 2 2p
2 ways of choosing their
preimages under σ out of 2p, and ≤ n2p−2 ways of choosing the rest of the values of
σ. By Eq. (42), the contribution of all such σ to the sum is at most C2 n2p−1.5 B2p .
• Suppose for some a∗ 6= b∗ in [2p], σ(a∗ ) = σ(b∗ ), but σ|[n]\{a∗ ,b∗ } is injective and takes
 n−1 
2p−1
range outside {σ(a∗ )}. There are 2p
such σ, where C3 depends only
2 n 2p−2 ≤ C3 n
on p (but not on R, {ψr }r , and n).
√
– Suppose for each a 6= b, (σ(a)σ(b)) = (ij)(t) for some t > R n, so that
2
|Cσ(a)σ(b) | ≤ n−1/4 . We apply Lemma K.16 to the 2p − 1 functions {ψσ(a
∗)} ∪
2
{ψσ(a) }a6∈{a∗ ,b∗ } , with ψσ(a∗ ) being the sole function whose expectation is not 0, so
that the I of Lemma K.16 has size 2p − 2, and the λ of Lemma K.16 is (2p − 2)n−1/4 .
58

Then Lemma K.16 gives
2p
Y

E


2

ψσ(a) (zσ(a) ) ≤ C4 kψσ(a
∗ ) kG


Y

kψσ(a) kG  (n−1/4 )(2p−2)/2

a6∈{a∗ ,b∗ }

a=1


2

= C4 kψσ(a
∗ ) kG


Y

kψσ(a) kG  n−(p−1)/4

a6∈{a∗ ,b∗ }

for some constant C4 depending on p but not on n, R, or {ψr }r . Thus the collective
contribution of such σ to the sum is 
at most

X
Y
2

C4 kψσ(a
kψσ(a) kG  n−(p−1)/4
∗ ) kG
a6∈{a∗ ,b∗ }

all such σ

 X
n
p
≤ C4 n−(p−1)/4
kψ 2 kG
2 i=1 i

X

2p−2
Y

kψπ(a) kG

π:[2p−2]→[n]\{i} a=1

  n
2p−2
X
Y
p X 2
≤ C4 n
kψi kG
kψπ(a) kG
2 i=1
π:[2p−2]→[n] a=1
! n
!2p−2
n
X
X
−(p−1)/4
2
= C5 n
kψi kG
kψi kG
−(p−1)/4

1.75(p−1)

i=1
00
B2p ,

i=1

= C5 n

where C5 = C4 p2 and depends only on p, but not on n, R, or {ψr }r , and where we
have set
!
!2p−2
n
n
1X 2
1X
00
kψ kG
kψi kG
.
B2p =
n i=1 i
n i=1
√
– Suppose
for some a, b ∈ [2p], (σ(a)σ(b)) = (ij)(t) for t ≤ R n. There are at most

√
2p
n−2
2p−1.5
such σ, where C6 depends only on p and R, but not
2 n · R n · 2p−3 = C6 n
on n or {ψr }r . Using Eq. (42) again, we can upper bound the contribution of such σ
by C6 n2p−1.5 B2p .
• Otherwise, there are more than one pair of inputs that collide under σ. There are at most
C7 n2p−2 such σ, where C7 depends only on p, but not on n, R, or {ψr }r . Using Eq. (42),
we upper bound their contributions by C7 n2p−2 B2p .
To summarize, using O(−) to hide the constants C∗ which don’t depend on n or the functions ψi :
2p


X Y
0
00
E
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

!2p
n

1X
0
00
φi (zi ) − µi )
≤ O n−0.25p B2p
+ n−0.25p−1.75 B2p
+ n−1.5 B2p
n i=1


0
00
≤ O n−0.25p B2p
+ n−0.25p−1.75 B2p
+ n−1.5+1/L B2p,L

0
00
By the power mean inequality, we get that B2p
, B2p
≤ B2p ≤ n1/L B2p,L . Substitution then gives
the desired result.

This theorem can be significantly strengthened with more careful case work and applying more
involved versions of Lemmas K.16 and K.17, but we will not be concerned with this here.
59

Proof of N ETSOR> Master Theorem

L

In this section, we will give the proof for our main theorem.
A Bit of Notation and Terminology Note that, for each n, the randomness of our program specified
by Theorem 2.10 comes from the sampling of the initial vectors V and matrices W. Let U be the
product space obtained from multiplying together the corresponding probability space for each
n. Each sample from this product probability space thus correspond to a sequence {S(n)}n of
instantiatiations of V and W. Below, when we say “almost surely” (often abbreviated “a.s.”), we
mean “almost surely over the probability of U.” We will also often make statements of the form
almost surely (or, a.s.), for all large n,

A(n) is true

where A(n) is a claim parametrized by n. This means that for all but a U-probability-zero set of
sequences {S(n)}n , A(n) is true for large enough n. Note that the order of the qualifiers is very
important here.
Let g 1 , . . . , g M be all of the G-vars (including those of V) in the program. It suffices to prove
Theorem 2.10 where k = M and the vector {hi }i are the G-vars g 1 , . . . , g M , since all other vectors
are Nonlin images of them. For convenience, we also assume that for all g ∈ V, we have E Z g = 0;
this is without loss of generality (WLOG) since any nonzero mean can be absorbed into applications
of Nonlin.
We induct, but on what? A natural way of going about proving Theorem 2.10 is by inducting on
the number of variables in a program. While this would be the main backbone of the proof, it turns
out such a proof would require us to assume a certain rank condition (Lemma L.11) on g 1 , . . . , g M
which is not so easy to check. Thus, it would be more fruitful to perform a simultaneous induction
on our claim (Moments) along with another statement, parametrized by m, that would prove such a
condition for us.
Moments(m) For any polynomially-bounded ψ : Rm → R, as n → ∞,
n

 1

m
1X
a.s.
ψ(gα1 , . . . , gαm ) −−→ E ψ Z g , . . . , Z g
.
n α=1
CoreSet(m) There exists a “core set” M ⊆ [m] such that,
Basis(m) almost surely, for large enough n, for every iP
∈ [m], there exist unique constants
(not depending on n) {aj }j∈M such that g i = j∈M aj g j . Note the uniqueness
implies that {g i }i∈M is linearly independent.
Density(m) The distribution of the random vector
j

{Z g }j∈M ∈ RM
is absolutely continuous w.r.t. the Lebesgue measure in RM , and vice versa.45 In other
words, for every measurable set U ⊆ RM ,
j

Pr[{Z g }j∈M ∈ U ] = 0 ⇐⇒ U has Lebesgue measure 0.
NullAvoid(m) for every triangular array of Lesbegue measure zero sets {Unα ∈
RM }n∈N,α∈[n] , almost surely for all large enough n, for all α ∈ [n], we have
{gαi }i∈M 6∈ Unα .
In other words, the values {gαi }α∈M of the core set “avoid” Lebesgue measure zero
sets asymptotically. Intuitively, this says that the distribution of these values are not
singular. (Note the LHS depends on n although we are suppressing it notationally)
Let us explain in brief why we need to consider CoreSet satisfying Basis and NullAvoid.
45

Compared to the proof of the Master Theorem in Yang [51], this is a new inductive hypothesis. This is
trivially true in the NTK case since the distribution in question is Gaussian with full support.

60

• Basis reduces the consideration of Moments to only the core set G-vars, since every other
G-var is asymptotically a linear combination of them.
• When we apply the Gaussian conditioning technique Proposition K.3, we need to reason
about
Λ+ of some covariance matrix Λ. Each entry of Λ is of the form
Pn the pseudo-inverse
1
1
m−1
)φj (gα1 , . . . , gαm−1 ) for a collection of polynomially bounded
α=1 φi (gα , . . . , gα
n
scalar functions {φi }i . This Λ will be a random variable which converges a.s. to a detera.s.
minstic limit Λ̊ as n → ∞. It should be generically true that Λ+ −−→ Λ̊+ as well, which
is essential to make the Gaussian conditioning argument go through. But in general, this
is guaranteed only if Λ’s rank doesn’t drop suddenly in the n → ∞ limit. We thus need to
guard against the possibility that g 1 , . . . , g m , in the limit, suddenly concentrate on a small
set on which {φi (g 1 , . . . , g m )}i are linearly dependent. This is where NullAvoid comes in.
It tells us that g 1 , . . . , g m will avoid any such small set asymptotically, so that indeed the
rank of Λ will not drop in the limit.
We will show that Moments and CoreSet are true for initial G-vars in V, as the

Proof organization
base case, and

Moments(m − 1) and CoreSet(m − 1) =⇒ Moments(m) and CoreSet(m)
as the inductive step. By induction, we obtain Moments(M ), which is Theorem 2.10.
The base cases are easy and we will dispatch with them immediately after this in Appendix L.3, but
the inductive step is much more complicated, and we will need to set up notation in Appendix L.4.
During this setup, we prove some basic limit theorems using the induction hypothesis. However, the
full generality of these claims requires some consequences of CoreSet, which we call “rank stability”
and “zero stability.” These notions are introduced and proved in Appendix L.5.
We would then finally be able to handle the inductive steps at this point. We first prove
Moments(m − 1) and CoreSet(m − 1) =⇒ CoreSet(m)
in Appendix L.6 because it is easier. Then we prove
Moments(m − 1) and CoreSet(m − 1) =⇒ Moments(m)
in Appendix L.7.
Before we proceed with the induction, let us set up establish some matrix notations that will make
the proof significantly easier to express.
L.1

Preliminaries: Square-Integrable Random Variables and Matrix Notation

Definition L.1. Consider the space L of square-integrable random variables. This space has inner
product given by (X, Y ) 7→ E XY for any X, Y ∈ L. We will often use matrix notation in square
brackets to express certain sum of (inner) products between elements of L and real scalars in R. For
example, for X 1 , . . . , X k , Y 1 , . . . , Y k , X, Y ∈ L and a1 , . . . , ak , a ∈ R, we write
 1
 
Y
a1
k
k
X
 
  X
[X 1 , . . . , X k ]  ...  =
E X iY i ∈ R
[Y 1 , . . . , Y k ]  ...  =
ai Y i ∈ L
i=1
i=1
ak
Yk
 1






X
E X 1Y
X1
aX 1
 .. 
 . 
 .. 
 . 
k
k
 .  [Y ] =  ..  ∈ R
 .  [a] =  ..  ∈ L .
Xk

E XkY

Xk

aX k

In addition,


X1
E X 1Y 1
 ..  1

..
k
 .  [Y , . . . , Y ] = 
.


Xk

E XkY 1

···
..
.
···


E X 1Y k

..
k×k
,
∈R
.

E XkY k

but note that this “outer product” is not a rank-1 matrix, but rather full rank typically. In general,
a matrix in Lk×l multiplied by a matrix Ll×m on the right produces a matrix Rk×m , where the
61

elementwise product is provided by the inner product of L; a matrix in Lk×l multiplied by a matrix
Rl×m on the right produces a matrix Lk×m , where the elementwise product is provided by the
scalar multiplication of L. In general, this mixed-type matrix multiplication is not associative,
i.e. A(BC) 6= (AB)C. We will always read a series of matrix multiplication from the right:
ABCD = A(B(CD)).
Fact L.2. Just like in a finite-dimensional inner product space, given a finite collection S =
{X i }ki=1 ⊆ L, the orthogonal projection operator ΠS to the span of S (inside L) is given by
k
X

def
ΠS Y =

ai X i ,

i=1

for any Y ∈ L, where
a = Λ+ b ∈ Rk ,

bj = E X j Y, b ∈ Rk ,

Λij = E X i X j , Λ ∈ Rk×k .

In the matrix notation of Definition L.1, this can be expressed as
 
"
# X1
 .. 
Λ+
ΠS Y = [X 1 , . . . , X k ]
 .  [Y ]
Xk

+  1 
X
X
1
k  .. 
1
k   .. 
= [X , . . . , X ]  .  [X , . . . , X ]  .  [Y ].


X


1

k

X

(44)

k

We denote the the projection to the orthogonal complement of the linear span of S by
def
Π⊥
S = I − ΠS .

L.2

Preliminaries: Adjunction Relation Between Ẑ and Ż

A sort of “adjunction” holds between Ẑ and Ż, as we describe below. This is a crucial calculation
needed to prove that the “Onsager correction term” Ż is right.
Lemma L.3. For any vectors x, h ∈ Rn and matrix W ∈ Rn×n in the program, we have46
>

E Ẑ W x Z h = E Z x Ż W h .
Compare with the identity
>

E Z W xZ h = E Z xZ W h
which, assuming Theorem 2.10, would follow from (W > x)> h = x> (W h).
Proof. Fix g = W h and we will prove, for all u = W > v in the program,
E Ẑ u Z h = E Z v Ż g .
Let G be the set of G-vars introduced before g (so g 6∈ G). Note that by Proposition I.7, Z h is a
def
def
deterministic function of Ẑ G =
{Ẑ x : x ∈ G}. Let E be a subset of G such that Ẑ E =
{Ẑ x : x ∈ E}
G
has a nonsingular covariance matrix and generates the same σ-algebra as Ẑ . Then, because Ẑ G is
jointly Gaussian, Ẑ G is a linear function of Ẑ E , and Z h is a deterministic function of Ẑ E .
Suppose u1 , . . . , uk are all G-vars in G introduced via MatMul with W >
ui = W > v i
for H-vars v 1 , . . . , v k . Assume WLOG that for ` ≤ k, we have {u1 , . . . , u` } = {u1 , . . . , uk } ∩ E,
1
`
j
so that Ẑ u , . . . , Ẑ u also have full rank covariance. Note that any Ẑ u , j ∈ [k], has to be a linear
i
combination of {Ẑ u }`i=1 .
In the variable dimension case, if x ∈ Rm , h ∈ Rn , W ∈ Rm×n , and n/m → ρ, then we have
>
ρ E Ẑ W x Z h = E Z x Ż W h .
46

62

Any G-var ḡ where ḡ = W > h̄ for some h̄ must be one of ui , i ∈ [k], or ḡ 6∈ E. We will divide up the
proof of Lemma L.3 into two cases.
i

i

Case 1. For any i ∈ [k], we have E Ẑ u Z h = E Z v Ż g .
Case 2. For any G-var ḡ 6∈ E such that ḡ = W > h̄ for some h̄, we have E Ẑ ḡ Z h = E Z h̄ Ż g .
Proof of Case 1. By treating Z h as a deterministic function of Ẑ E , Lemma K.5 says there are
coefficients {ax ∈ R : x ∈ E} such that
X
i
i
E Ẑ u Z h =
ax Cov(Ẑ u , Ẑ x ).
x∈E
i

However, if x ∈ E \ {u1 , . . . , uk } (i.e. x 6= W > y for some y), then Cov(Ẑ u , Ẑ x ) = 0 by ZHat for
all i = 1, . . . , k. Thus the sum above over x ∈ E reduces to a sum over x ∈ E ∩ {u1 , . . . , uk } =
{u1 , . . . , u` }:
i

E Ẑ u Z h =

`
X

i

j

auj Cov(Ẑ u , Ẑ u ) =

j=1

`
X

i

j

2
auj σW
E Zv Zv = E Zv

j=1

i

`
X

j

2
auj σW
Zv .

j=1

Note that this argument works for any ui with i ≤ `, and the constants {auj }`j=1 remain the same for
all ui :
`
i
i X
j
2
∀i ∈ [`], E Ẑ u Z h = E Z v
auj σW
Zv .
j=1
i

j

By the observation above that any Ẑ u , j ∈ [k], is a linear combination of {Ẑ u }`i=1 , this equality is
also extended to all i ∈ [k]:
∀i ∈ [k],

i

E Ẑ u Z h = E Z v

i

`
X

j

2
auj σW
Zv .

(45)

j=1
def
Set Y =

2
vj
g
j=1 auj σW Z . To prove our claim for case 1, it suffices to show that Ż = Y .

P`

Recall that in Remark 2.12, the matrix C ∈ Rk×k and b ∈ Rk , in the matrix notation of Definition L.1,
are given by
 v1 
 u1 
Z
Ẑ
1
k




C =  ...  [Z v , . . . , Z v ], b =  ...  [Z h ].
Zv

k

Ẑ u

k

By Eq. (45), we can also re-express b as the following product of a k × 1 vector and a 1 × 1 vector,
 v1 
Z


b =  ...  [Y ] .
Zv

k

Thus, from Remark 2.12,
"
1

k

Ż g = [Z v , . . . , Z v ]

#" #
C+



# Z v1
 .. 
 .  [Y ] = ΠY

"
1

k

b = [Z v , . . . , Z v ]

C+

Zv
1

k

k

where Π is the orthogonal projection in L to the subspace spanned by {Z v , . . . , Z v }, as discussed
in Fact L.2. Since Y is already in this subspace, we just get
Ż g = Y
as desired.
63

1

k

Proof of Case 2. Let U denote the random column vector (Z u , . . . , Z u )> . Then, conditioned on
U , the random variable Z h has randomness coming only from {Ẑ x : x ∈ E \ {u1 , . . . , uk }}. So
conditioned on U , Z h is independent from Ẑ ḡ , by ZHat. Therefore,


E Ẑ ḡ Z h = E E[Z h | U ] E[Ẑ ḡ | U ] .
(46)
U

i

j

We now will massage the RHS into the desired form. Let C ∈ Rk×k , Cij = Cov(Ẑ u , Ẑ u ) be
i
i
the covariance matrix of Ẑ u , and let b ∈ Rk , bi = Cov(Ẑ ḡ , Ẑ u ). Then by standard Gaussian
conditioning formula (Proposition K.3), we have
E[Ẑ ḡ | U ] = b> C + U,
as a linear function of U . Plugging into Eq. (46), in the matrix notation of Definition L.1, we have
 u1 
Ẑ


E Ẑ ḡ Z h = b> C +  ...  [Z h ].
k

Ẑ u
i

i

By Case 1, we have E Ẑ u Z h = E Z v Ż g , so we can write
 v1 
Ẑ

ḡ h
> +  .. 
E Ẑ Z = b C  .  [Ż g ] = E b> C + V Ż g ,
Ẑ v

k

1

k

i

j

2
where V is the random column vector (Z v , . . . , Z v )> . Now, because Cij = σW
E Z v Z v and
2
h̄ v i
bi = σW E Z Z , we see
b> C + V = ΠZ h̄ ,
1
k
where Π is the orthogonal projection to the subspace of L spanned by {Z v , . . . , Z v }. Putting this
all together, we have, by the self-adjoint property of Π,

E Ẑ ḡ Z h = E(ΠZ h̄ )Ż g = E Z h̄ (ΠŻ g ).
1

k

However, since Ż g is already a linear combination of {Z v , . . . , Z v } by definition (ZDot), we have
ΠŻ g = Ż g . Thus we obtain
E Ẑ ḡ Z h = E Z h̄ Ż g ,
as desired.
Lemma L.4. Consider a G-var g = W h in our program. Suppose g i = W > hi , i = 1, . . . , `,
includes all G-vars of the form W > x introduced before h. If we set Z H be the column vector
1
`
[Z h , . . . , Z h ]> and define C ∈ R`×` , b ∈ R` by
i

j

i

def
def
Cij =
E Z h Z h , bi =
E Ẑ g Z h ,
then, using the matrix notation of Definition L.1, we have
"

g

Ż = Z

H>

+

h1

h`

C b = [Z , . . . , Z ]

C

#" #

+

b .

(47)

Note, by assumption, ` here is at least k in Remark 2.12. If {g i }i are exactly the G-vars of the form
W > x introduced before h, then Eq. (47) is equivalent to Eq. (4) in Remark 2.12. So this lemma says
this expression always evaluates to Ż g as long as {g i }i is no smaller.
Proof. By Lemma L.3, we can re-express
i

bi = E Z h Ż g .
Then by Fact L.2,
Z H> C + b = Z H > C + E Z H Ż g = ΠH Ż g
1

`

where ΠH is the orthogonal projection operator to the span of {Z h , . . . , Z h }; see Fact L.2. But by
i
ZDot, Ż g is already a linear combination of {Z h : g i introduced before h}. Thus
ΠH Ż g = Ż g
as desired.
64

L.3

Base Cases: Moments and CoreSet for Initial Vectors

Base case: Moments(V) Since the vectors in V are sampled iid coordinatewise, Moments(V) just
follows from the strong law of large numbers.
Base Case: CoreSet(V) Pick the core set M to be (the indices of) any subset U ⊆ V such that Z U
forms a linear basis of Z V . Then it’s straightforward to verify Basis, Density, and NullAvoid.
L.4

Inductive Case: Setup

We now assume Moments(m − 1) and CoreSet(m − 1) and want to reason about g m to show
Moments(m) and CoreSet(m). In this section, we will set up the notation and helper lemmas toward
this goal. We need to (unfortunately) introduce a large number of symbols. To alleviate possible
confusion, we provide an index of all such symbols in Appendix L.4.3.
L.4.1

Definitions

Suppose
g m = Ah and h = φ(g 1 , . . . , g m−1 )
(48)
for some polynomially-bounded φ. For brevity, we will just write g = g m . Consider all previous
instances where A or A> is used:
xi = Ay i , i = 1, . . . , r, and uj = A> v j , j = 1, . . . , s.
(49)
Define the matrices X ∈ Rn×r , U ∈ Rn×s , Y ∈ Rn×r , V ∈ Rn×s with xi , ui , y i , v i as columns
def
def
def
def
X=
[x1 | . . . |xr ],
U=
[u1 | . . . |us ],
Y=
[y 1 | . . . |y r ],
V=
[v 1 | . . . |v s ].
(50)
1
m−1
Let B be the σ-algebra spanned by all previous G-vars g , . . . , g
; since all previous vectors are
deterministic images of these G-vars, B is also the σ-algebra generated by all previous vectors before
g. Conditioning on B, A is linearly constrained by X = AY, U = A> V. Thus we have, by the
Gaussian conditioning trick (Lemma K.9),
d

⊥
g =B (E + Π⊥
V ÃΠY )h
def

+

(51)
>

+

>

where Ã is an independent copy of A, and ΠY = YY = Y(Y Y) Y is the projection to the
column space of Y (likewise for ΠV ), and
def
E=
XY+ + V+> U> − V+> U> YY+

= X(Y> Y)+ Y> + V(V> V)+ U> − V(V> V)+ U> Y(Y> Y)+ Y> .

(52)

We can make obvious the conditional distribution of g if we rewrite Eq. (51) as
d

g =B ω + σΠ⊥
V z,
def
with ω =
Eh ∈ Rn ,

with z ∼ N (0, In )
q
def
2
σ=
σA kΠ⊥
Y hk /n ∈ R.

(53)
(54)

where ω, σ, Π⊥
V are all deterministic conditioned on B, and the only randomness after conditioning
comes from z. We will see below that ω can be expressed explicitly as a linear combination in X and
V (Lemma L.7), and σ converges to a deterministic limit σ̊ (Lemma L.6). But to get there, we need
to first define a few useful matrices and vectors of fixed dimensions
def
def
def
Υ=
Y> Y/n ∈ Rr×r Λ =
V> V/n ∈ Rs×s Γ =
U> Y/n ∈ Rs×r
(55)
def
def
γ=
Y> h/n ∈ Rr
δ=
U> h/n ∈ Rs .
By induction hypothesis Moments(m − 1), Υ, Λ, Γ, γ, δ all converge a.s. to corresponding deterministic limits Υ̊, Λ̊, Γ̊,γ̊, δ̊:
a.s.

i

j

i

j

a.s.

i

j

i

j

def
Υij −−→ Υ̊ij =
E Z y Z y = (σA )−2 Cov(Ẑ x , Ẑ x )
def
Λij −−→ Λ̊ij =
E Z v Z v = (σA )−2 Cov(Ẑ u , Ẑ u )
i

a.s.

i

def
γi −−→ γ̊i =
E Z y Z h = (σA )−2 Cov(Ẑ x , Ẑ g )

a.s.

def

ui

Γij −−→ Γ̊ij = E Z Z
a.s.

yj

i

def
δi −−→ δ̊i =
E Zu Zh

65

(56)

It turns out that, as a consequence of Lemma L.11 below, we have: a.s. for all large enough n,
rank Υ = rank Υ̊ and rank Λ = rank Λ̊. Therefore, as pseudoinverse is continuous on matrices of
fixed rank, we get the following proposition
a.s.

a.s.

Proposition L.5. Υ+ −−→ Υ̊+ and Λ+ −−→ Λ̊+ .
Using this proposition, we compute the limit of σ 2 .
Lemma L.6. The quantity σ, defined in Eq. (54), converges to a deterministic limit σ̊ almost surely:
a.s.

def
2
σ 2 −−→ σ̊ 2 =
σA
(E(Z h )2 − γ̊ > Υ̊+ γ̊).

(57)

Proof. Note that
σ2 =

2
σA
σ2
σ2
(h> h − h> ΠY h) = A (h> h − h> Y(Y> Y)+ Y> h) = A (h> h − γ > Υ+ γ).
n
n
n

Because φ is polynomially-bounded, so is φ(z)2 . By induction hypothesis (Moments(m − 1)),
n
1
m−1
1X
1 >
a.s.
h h=
φ(gα1 , . . . , gαm−1 )2 −−→ E φ(Z g , . . . , Z g
)2 = E(Z h )2 .
n
n α=1
a.s.

a.s.

a.s.

By Eq. (56), γ −−→ γ̊ and Υ −−→ Υ̊. By Proposition L.5, Υ+ −−→ Υ̊+ . Combining all of these
limits together yields the desired claim.
Using Eqs. (52) and (55), we can re-express ω as
ω = XΥ+ γ + VΛ+ δ − VΛ+ ΓΥ+ γ.
Define d ∈ Rr and e ∈ Rs by
def
d=
Υ+ γ,
def

+

so that
+

e = Λ (δ − ΓΥ γ), so that

a.s.
def
d −−→ d˚=
Υ̊+ γ̊,
a.s.

and

e −−→ e̊ = Λ̊ (δ̊ − Γ̊Υ̊+ γ̊).
def

+

(58)

Then the next lemma follows trivially.
Lemma L.7. For ω defined in Eq. (54), we have
ω = Eh = Xd + Ve = X(d˚+ ε̂) + V(e̊ + ε̌),
for some random vectors ε̂ ∈ Rr , ε̌ ∈ Rs that go to 0 a.s. with n,
L.4.2

Helper Lemmas

Using the matrix notation of Definition L.1 and the expression for the projection operator, we can
rewrite d˚and e̊ as follows. The punchline of this section is Lemma L.10, which says
r
X

i
d˚i Ż x +

i=1

s
X

j

e̊j Z v = Ż g .

j=1

Proposition L.8. Let Π : L → L be the orthogonal projection operator onto the linear span of
r
1
{Z y , . . . , Z y }. Then,

  y1 

  u1 
Ẑ
Z
 .  h
 .  ⊥ h
+
+



.
d˚= 
[Z
],
e̊
=
(59)
Υ̊
Λ̊
 . 
 ..  [Π Z ].
Zy

r

Ẑ u

s

and
2
2
σ̊ 2 = σA
E Z h Π⊥ Z h = σA
E(Π⊥ Z h )2 .

66

(60)

Proof. The identity for d˚is obvious. We derive the identity for e̊, and the proof of Eq. (60) follows
similarly. First, we expand the definitions of δ̊, Γ̊, Υ̊,γ̊ in matrix notation of Definition L.1.
 1
 1
 1
 1
Zu
Zu
Zy
Zy
r
1
r
 .  h
 .  y1




δ̊ =  ..  [Z ], Γ̊ =  ..  [Z , . . . , Z y ], Υ̊ =  ...  [Z y , . . . , Z y ], γ̊ =  ...  [Z h ].
s

s

Zu

Zu

Zy

r

Zy

r

Then with the matrix form of Π in mind (Eq. (44)), we derive
 1
 1
 u1 
Ẑ
Zu
Zu
 . 
 .  ⊥ h
 .  ⊥ h
+
h
δ̊ − Γ̊Υ̊ γ̊ =  ..  [(I − Π)Z ] =  ..  [Π Z ] =  ..  [Π Z ].
Z

us

Z

us

Ẑ

(61)

us

Here the last equality follows from the following
 1

 ⊥ u1 
 u1 
1
Π Ẑ
Ẑ
Zu
Π⊥ Z u
 .  ⊥ h
 .  h
 .  h
 .  ⊥ h
.
.
.
[Π
Z
]
=
[Z
]
=
[Z
]
=
 . 
 . 
 . 
 ..  [Π Z ]
s

Π⊥ Z u

Zu

s

Π⊥ Ẑ u
j

s

s

Ẑ u
j

j

where the middle equality follows because each Z u − Ẑ u = Ż u is a linear combination of
i
{Z y }ri=1 by ZDot. Finally, plugging in Eq. (61) to Eq. (58), we have

e̊ = Λ̊+ (δ̊ − Γ̊Υ̊+ γ̊) = 

Λ̊+

  u1 
Ẑ
.  ⊥ h

 ..  [Π Z ].
s
Ẑ u

Using Eq. (59), we can write the following
Lemma L.9. Let Π : L → L be the orthogonal projection operator onto the linear span of
1
r
{Z y , . . . , Z y }. Then
r
X


i
1
s
d˚i Ż x = [Z v , . . . , Z v ] 

Λ̊+

i=1

  u1 
Ẑ
. 
h

 ..  [ΠZ ].
s
Ẑ u

(62)

Proof. By Lemma L.4, for each i ∈ [r],

i

1

s

Ż x = [Z v , . . . , Z v ] 

Λ̊+

  u1 
Ẑ
.  yi

 ..  [Z ]
Ẑ u

s

because {uj }sj=1 contains all G-vars of the form W > vector introduced before xi . By Proposition L.8,

d˚= 

Υ̊+

  y1 
Z
.  h

 ..  [Z ].
r
Zy
67

Then
r
X

 
i

1

r

d˚i Ż x = [Ż x , . . . , Ż x ] ˚
d

i=1


1

s

= [Z v , . . . , Z v ] 

Λ̊+

  u1 
Ẑ

y1
yr
  .. 
.  [Z , . . . , Z ]
s
Ẑ u

  y1 
Z

h
+
  .. 
×
Υ̊
.  [Z ]
r
Zy

  u1 
Ẑ
 . 
v1
vs 
h
+

= (Z , . . . , Z )
Λ̊
 ..  [ΠZ ]
s
Ẑ u


as desired.
By combining Lemma L.9 with Proposition L.8, we get
Lemma L.10.
r
s
X
X
i
j
d˚i Ż x +
e̊j Z v = Ż g .
i=1

j=1

Proof. By realizing the Π⊥ and Π in Eq. (59) and Eq. (62) “cancel” to get identity, we have

  u1 
Ẑ
r
s
X
X
i
j
1
s
.  h

d˚i Ż x +
e̊j Z v = [Z v , . . . , Z v ] 
Λ̊+
 ..  [Z ]
i=1

s

j=1

Ẑ u
#" #

"
v1

vs

= [Z , . . . , Z ]

C+

b .

where C = Λ̊ and b are as in Eq. (4). By definition (ZDot), we have the desired result.
L.4.3

Index of Symbols

g = g m , h, φ · · · · · · Eq. (48)
ΠV , ΠY · · · · · · Eq. (51)

xi , y i , uj , v j · · · · · · Eq. (49)
E · · · · · · Eq. (52)

X, Y, U, V · · · · · · Eq. (50)
ω, σ · · · · · · Eq. (54)

Υ, Λ, Γ, γ, δ · · · · · · Eq. (55)
˚ · · · · · · Eq. (58)
d, e, d,e̊

Υ̊, Λ̊, Γ̊,γ̊, δ̊ · · · · · · Eq. (56)

σ̊ · · · · · · Eq. (57)

In addition, B denotes the σ-algebra spanned by g 1 , . . . , g m−1 .
L.5

Rank Stability and Zero Stability

In this section, we prove the following consequence of CoreSet(m − 1) and Moments(m − 1).
Lemma L.11 (Rank Stability). For any collection of polynomially-bounded functions {ψj : Rm−1 →
R}lj=1 , let K ∈ Rl×l be the random matrix (depending on n) defined by
n
1X
Kij =
ψi (gα1 , . . . , gαm−1 )ψj (gα1 , . . . , gαm−1 ).
n α=1
By Moments(m − 1),
a.s.

K −−→ K̊
for some matrix K̊ ∈ Rl×l .
68

1. Then, almost surely, for large enough n,
ker K = ker K̊, im K = im K̊, and rank K = rank K̊.
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

Lemma L.11 will be primarily a corollary of the following Lemma L.12.
Lemma L.12 (Zero Stability). If ψ : Rm−1 → R≥0 is a nonnegative function such that
n
1X
a.s.
ψ(gα1 , . . . , gαm−1 ) −−→ 0
n α=1
then, almost surely, for large enough n,
ψ(gα1 , . . . , gαm−1 ) = 0
for all α ∈ [n].
We give the proof of Lemma L.11 now, assuming Lemma L.12.
a.s.

Proof. Let z ∈ Rl be in the null space of K̊, i.e. z > K̊z = 0. Then we also have z > Kz −−→
z > K̊z = 0. But
!2
n
l
X
X
1
def
z > Kz =
Ψ(gα1 , . . . , gαm−1 ), where Ψ(gα1 , . . . , gαm−1 ) =
zi ψi (gα1 , . . . , gαm−1 )
n α=1
i=1
and Ψ is a nonnegative function. By Lemma L.12, we have that: almost surely, for large enough n,
Ψ(gα1 , . . . , gαm−1 ) = 0 for all α ∈ [n]

=⇒ z > Kz = 0.

Proof of Claim 1. If we apply this argument to a basis {z 1 , . . . , z t } of ker K̊, then we get,
a.s. for all large n,

ker K̊ ⊆ ker K,

so that
a.s. for all large n, rank K̊ ≥ rank K.
Because the rank function is lower semicontinuous (i.e. the rank can drop suddenly, but cannot
a.s.
increase suddenly), and K −−→ K̊, we also have
a.s. for all large n, rank K̊ ≤ rank K.
Combined with the above, this gives the desired result on rank. The equality of null space then
follows from the equality of rank, and the equality of image space follows immediately, as the image
space is the orthogonal complement of the null space.
Proof of Claim 2. If we apply the above argument to each z i defined by inner product as
X
∀x ∈ Rl , x> z i = xi −
Fij xj ,
j∈I
i

(note that only for i 6∈ I is z nonzero), then we have, a.s. for large n, z i> Kz i = 0, or
X
ψi (gα1 , . . . , gαm−1 ) =
Fij ψj (gα1 , . . . , gαm−1 ), ∀α ∈ [n].
j∈I

69

In the rest of this section, we prove Lemma L.12. It helps to first show that the linear relations given
in Basis carries over to the n → ∞ limit.
Proposition L.13. By the Basis property, each g i , i ∈ M ⊆ [m − 1], has a set of unique constants
{aj }j∈M (independent of n) such that, almost surely, for large enough n,
X
gi =
aj g j .
j∈M

Then for each i ∈ [m − 1],
i

a.s.

Zg =

X

j

aj Z g .

j∈M
def
(xi −
Proof. Let ψ(x1 , . . . , xm−1 ) =

j 2
j∈M aj x ) . Then by Basis(m − 1) and Moments(m − 1),

P

n

 1

m−1
1X
a.s.
ψ(gα1 , . . . , gαm−1 ) −−→ E ψ Z g , . . . , Z g
= 0.
n α=1
This implies that
i

Zg −

X

j

i

a.s.

a.s.

aj Z g = 0 ⇐⇒ Z g =

j∈M

X

aj Z g

j

j∈M

as desired.

Now we show Lemma L.12.
Proof of Lemma L.12. By Moments(m − 1) and the premise of Lemma L.12,
n
1
m−1
1X
ψ(gα1 , . . . , gαm−1 ) → E ψ(Z g , . . . , Z g
) = 0.
n α=1
i

def
Let Z M =
{Z g }i∈M . By Density(m − 1), the law of Z M has density, i.e. a set is measure zero
against its law iff it has measure zero against Lebesgue measure. Furthermore, Basis yields a linear
function F such that
a.s. for large enough n, for all α ∈ [n], F ({gαj }j∈M ) = (gα1 , . . . , gαm−1 ).
By Proposition L.13, the same linear function satisfies
1

F (Z M ) = (Z g , . . . , Z g

m−1

).

Therefore,
1

m−1

0 = E ψ(Z g , . . . , Z g
) = E ψ ◦ F (Z M ).
Because ψ, and thus ψ ◦ F , is a nonnegative function, the nullity of the expectation implies that, other
than a set U of measure 0 under the distribution of Z M , ψ ◦ F is 0. This set U also has Lebesgue
measure zero as the law of Z M has density, as discussed above.
If in NullAvoid(m − 1), we set Unα = U for all n and all α ∈ [n], then we get that: almost surely,
for all large enough n, for all α ∈ [n],
{gαi }i∈M 6∈ U ⇐⇒ ψ ◦ F ({gαi }i∈M ) = 0 ⇐⇒ ψ(gα1 , . . . , gαm−1 ) = 0,
as desired.
L.6

Inductive Step: CoreSet(m)

In this section, we show
Moments(m − 1) and CoreSet(m − 1) =⇒ CoreSet(m).
More explicitly, we need to think about whether to add m to the core set M of [m − 1] in order to
maintain the Basis, Density, and NullAvoid properties.
We proceed by casework on whether σ̊ = 0.
70

L.6.1

If σ̊ = 0.

We will show that the core set properties are maintained if we don’t add m to the core set.
M can be kept the same Recall that g = Ah and xi = Ay i where h was introduced by
h = φ(g 1 , . . . , g m−1 ), for some polynomially bounded φ. Suppose we likewise have y i =
φ̂i (g 1 , . . . , g m−1 ), for each i ∈ [r], for polynomially bounded φ̂i : Rm−1 → R (where φ̂i only
depends on the G-vars that came before y i , but we implicitly pad coordinates of φ̂i to allow it to take
all of g 1 , . . . , g m−1 as inputs). By Basis, we know that, a.s. for large enough n, each of g 1 , . . . , g m−1
is a (unique, constant-in-n) linear combination of {g j }j∈M . Therefore, we can express
h = ψ({g j }j∈M ),

and

∀i ∈ [r],

y i = ψ̂ i ({g j }j∈M )

(63)

for some polynomially bounded ψ, ψ̂ i : RM → R. Let Π : L → L be the orthogonal projection
1
r
2
onto the subspace spanned by Z y , . . . , Z y . By Eq. (60), we have σ̊ 2 = σA
E(Π⊥ Z h )2 . Therefore,
σ̊ = 0 implies that
a.s.
Z h = ΠZ h .
1
r
Since Z h , Z y , . . . , Z y are resp. deterministic images of Z M under the functions ψ, ψ̂ 1 , . . . , ψ̂ r ,
this shows that ψ is a linear combination of ψ̂ 1 , . . . , ψ̂ r almost surely under the law of Z M . But by
Density(m − 1), the law of Z M is absolutely continuous w.r.t. the Lesbegue measure (and vice versa),
so this statement also holds under Lesbegue measure: For a set U ⊆ RM of Lesbegue measure zero
and a set of coefficients c1 , . . . , cr ∈ R, we have
∀~x 6∈ U,

ψ(~x) =

r
X

ci ψ̂ i (~x).

i=1

By NullAvoid(m − 1) applied to Unα = U for all n and α ∈ [n], we also have that: a.s. for large
enough n,
ψ({g j }j∈M ) =
g = Ah = Aψ({g j }j∈M ) =

r
X
i=1
r
X

ci ψ̂ i ({g j }j∈M ),

so that by Eq. (63)

ci Aψ̂ i ({g j }j∈M ), =

i=1

r
X
i=1

ci Ay i =

r
X

ci xi .

i=1

This shows that, if we keep the core set as M, then Basis is still satisfied. Since the core set is not
changing, Density and NullAvoid just follows from the induction hypothesis. For usage later in the
proof of Moments(m), we record our observation here as a lemma.
Lemma L.14. If σ̊ = 0, then there are coefficients c1 , . . . , cr ∈ R independent of n such that a.s.
for large enough n,
r
X
g=
ci xi .
i=1

L.6.2

If σ̊ > 0.

It’s clear that g cannot be in the linear span of {xi }i∈[r] asymptotically, so we will add g to the core
set, and the Basis property follows immediately. In the below, we shall write M for the old core set,
def
and M0 =
M ∪ {g} for the new one.
It remains to show Density and NullAvoid for M0 .
Density(m) holds By definition (ZMatMul), we have
Z g = Ẑ g + Ż g = Ẑ g +

s
X

aj Z v

j

j=1

where aj are the partial derivative expectations in ZDot (whose specific values we will not care about)
j
1
m−1
and Eq. (4). Note that for all j ∈ [s], Z v only depends on Ẑ g , . . . , Ẑ g
. Let Z be the σ-algebra
71

1

m−1

1

generated by Z g , . . . , Z g
, which is the same as the σ-algebra generated by Ẑ g , . . . , Ẑ g
Proposition I.7. Then conditioned on Z, we can follow a quick calculation to see that
g d

Ẑ =Z σ̊z +

r
X

m−1

by

i
d˚i Ẑ x

i=1

where z ∼ N (0, 1) is independent from Z, and d˚is as in Lemma L.7. This allows us to write
1

d

Z g =Z σ̊z + F (Ẑ g , . . . , Ẑ g

m−1

)

for some deterministic function F . Since σ̊ > 0, this shows that the distribution of Z g conditioned
on Z is absolutely continuous w.r.t. the 1-dimensional Lebesgue measure, and vice versa. If we apply
i
1
m−1
Lemma L.15 below with X1 = Z g , X2 = {Z g }i∈M , and Y = (Ẑ g , . . . , Ẑ g
), then the lemma
premise Eq. (65) follows from the above reasoning, and the lemma premise Eq. (64) follows from
induction hypothesis Density(m − 1) (for M). This then yields Density(m) (for M0 ), as desired.
Lemma L.15. Consider a random vector X = (X1 , X2 ) ∈ Ra × Rb and another random vector
Y ∈ Rc . Suppose X2 is deterministic conditioned on Y . Let λ denote the Lebesgue measure in any
Euclidean space. If
• for every measurable set U ⊆ Rb ,
Pr(X2 ∈ U ) = 0 ⇐⇒ λ(U ) = 0,

and

(64)

Pr(X1 ∈ U | Y = y) = 0 ⇐⇒ λ(U ) = 0,

(65)

• for every y ∈ Rc , and every measurable set U ⊆ Ra ,

then for every measurable set V ⊆ Ra × Rb ,
Pr(X ∈ V ) = 0 ⇐⇒ λ(V ) = 0.
Proof. Fix V ⊆ Ra × Rb . We have
Z
Pr(X ∈ V ) =

Pr(X ∈ V | Y = y) d Pr(Y = y)
Z

=

Pr(X1 ∈ Vx2 (y) | Y = y) d Pr(Y = y),

(66)

where x2 (y) is the deterministic value of X2 conditioned on Y = y, and Vx2 = {x1 : (x1 , x2 ) ∈ V }.
Likewise,
Z
λ(V ) = λ(Vx2 ) dλ(x2 ).
(67)
Then
Pr(X ∈ V ) = 0 ⇐⇒ Pr(Pr(X1 ∈ VX2 | Y ) > 0) = 0
Y

X1

by Eq. (66)

⇐⇒ Pr(λ(VX2 ) > 0) = 0

by Eq. (65)

⇐⇒ Pr(λ(VX2 ) > 0) = 0

because X2 is deterministic given Y

Y

X2

⇐⇒ λ(x2 : λ(Vx2 ) > 0) = 0
⇐⇒ λ(V ) = 0
as desired.

Now we tackle NullAvoid.
72

by Eq. (64)
by Eq. (67)

NullAvoid(m) holds First, let’s assume that, a.s. for large enough n, Π⊥
V has no zero diagonal
entry; we shall show this fact below in Lemma L.16. Because the conditional variance of gαm given
g 1 , . . . , g m−1 is σ 2 (Π⊥
V )αα , and because σ̊ > 0 by assumption in this section, this implies that, a.s.
for all large enough n,
gαm , conditioned on g 1 , . . . , g m−1 , has density for all α ∈ [n].

(68)

By “has density” here, we in particular mean that any Lesbegue measure zero set in R has zero
probability under the conditional distribution of gαm given g 1 , . . . , g m−1 .
Now, assuming Lemma L.16, we prove NullAvoid holds for M0 .
0

Let {Unα ⊆ RM }n∈N,α∈[n] be a triangular array of Lesbegue measure zero sets. For each Unα ,
def
define Bnα =
{~x ∈ RM : λ(Unα |~x ) 6= 0}, where Unα |~x = {y ∈ R : (~x, y) ∈ Unα ⊆ RM × R}
is the “slice” of Unα at ~x, and λ is the 1-dimensional Lebesgue measure. Because each Unα has
0
measure zero in RM , necessarily each Bnα also has measure zero in RM . Applying NullAvoid to
the triangular array {Bnα ⊆ RM }n∈N,α∈[n] , we get that: a.s. for large enough n,
{gαi }i∈M 6∈ Bnα .

∀α ∈ [n],
Therefore, by Eq. (68), a.s. for large enough n,
∀α ∈ [n],

{gαi }i∈M0 6∈ Unα .

This finishes the proof of NullAvoid for M0 , and also CoreSet(m), save for Lemma L.16 below.
Lemma L.16. Almost surely, for large enough n, Π⊥
V has no zero diagonal entry.
Proof. WLOG, assume Λ̊ is full rank. Otherwise, by Lemma L.11(2), we can replace v 1 , . . . , v s by
a linearly independent spanning set v i1 , . . . , v ik such that 1) each v j is almost surely, for all large n,
a linear combination of them and such that 2) their 2nd moment matrix is full rank in the limit. Then
the projection matrix associated to v i1 , . . . , v ik is, almost surely, for all large n, the same as ΠV .
By the Sherman-Morrison formula (Fact L.17),

(ΠV )αα = f

1 > −1
ȟα Λ−α ȟα
n



P
where f (x) = x/(1 + x), ȟα is the column vector (vα1 , . . . , vαs )> , and Λ−α = n1 β6=α ȟβ ȟβ > .
Thus, unless Λ−α is singular for some α, all diagonal entries of Π⊥
V = I − ΠV are nonzero. So it
suffices to show that,
a.s. for large enough n,

Λ−α is nonsingular for all α.

To do this, it pays to note that Λ−α = Λ − n1 ȟα ȟ>
α , so that
1
1 >
|λmin (Λ−α ) − λmin (Λ)| ≤ k ȟα ȟ>
ȟ ȟα .
α kop =
n
n α
By Lemma L.18 below (which bounds the max by a high moment),
1 >
a.s.
ȟα ȟα −−→ 0,
α∈n n

max
and consequently

a.s.

max |λmin (Λ−α ) − λmin (Λ)| −−→ 0.

α∈[n]
a.s.

Because Λ −−→ Λ̊, we know that, a.s. for large enough n, λmin (Λ) is bounded away from 0 by a
constant (independent of n). Altogether, this implies that all Λ−α are nonsingular, as desired.
Fact L.17 (Sherman-Morrison formula). For any nonsingular matrix A ∈ Rl×l and vector a ∈ Rl ,
we have
a> A−1 a
a> (A + aa> )−1 a =
.
1 + a> A−1 a
73

Consequently, for any full rank matrix H, the αth diagonal entry of its associated projection matrix
ΠH = H(H > H)−1 H > can be written as
(ΠH )αα =

>
Hα (H−α
H−α )−1 Hα>
>
1 + Hα (H−α H−α )−1 Hα>

where Hα is the αth row of H, and H−α is H with the αth row removed.
Lemma L.18. Assume Moments(m − 1). Suppose ψ : Rm−1 → R is polynomially bounded. Then
as n → ∞,
1
a.s.
max |ψ(gα1 , . . . , gαm−1 )| −−→ 0
p
n α∈[n]
for any p > 0.
Proof. For any q > 0, we have the elementary bound
sX
max |ψ(gα1 , . . . , gαm−1 )| ≤ q
|ψ(gα1 , . . . , gαm−1 )|q .
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
Because, by Moments(m − 1), n1 α∈[n] |ψ(gα1 , . . . , gαm−1 )|q −−→ C for some finite constant C as
n → ∞, the RHS above converges a.s. to 0 as soon as we take q > 1/p, and therefore so does the
LHS.

L.7

Inductive Step: Moments(m)

In this section, we show
Moments(m − 1) and CoreSet(m − 1) =⇒ Moments(m).
More specifically, we will show that for any polynomially-bounded ψ : Rm → R,
n

1
m
1X
a.s.
ψ(gα1 , . . . , gαm ) −−→ E ψ(Z g , . . . , Z g ).
n α=1

By Lemma L.14, if σ̊ = 0, then almost surely, for large enough n, g = g m is just a (fixed) linear
combination of g 1 , . . . , g m−1 , so Moments is trivially true. Therefore, in the below, we assume
σ̊ > 0.

(?)

This assumption will be crucial for our arguments involving smoothness induced by Gaussian
averaging.
To clarify notation in the following, we will write EX [expression] to denote the expectation over
only the randomness in X, E [ expression| B] to denote the expectation taken over all randomness except those in B, and E[expression] to denote expectation taken over all randomness in
expression.
Proof Plan

By triangle inequality, we decompose
n

1
m
1X
ψ(gα1 , . . . , gαm ) − E ψ(Z g , . . . , Z g ) ≤ A + B + C
n α=1

74

(69)

˚ (Eq. (58)) as in Appendix L.4, and with
where, with ω, σ (Eq. (54)), σ̊ (Eq. (57)), ΠV (Eq. (51)), d,e̊
z ∼ N (0, 1), we have defined


q
n
X
def 1
A=
ψ(gα1 , . . . , gαm ) − E ψ gα1 , . . . , gαm−1 , ωα + σz (Π⊥
)
V αα
z
n α=1


q
n
X
⊥
def 1
1
m−1
B=
E ψ gα , . . . , gα , ωα + σz (ΠV )αα
n α=1 z


r
s
X
X
d˚i xiα +
e̊j vαj + σ̊z 
− E ψ gα1 , . . . , gαm−1 ,
z

i=1

j=1




n
r
s
X
X
X
1
m
1
def
E ψ gα1 , . . . , gαm−1 ,
C=
d˚i xiα +
e̊j vαj + σ̊z  − E ψ(Z g , . . . , Z g ) .
z
n α=1
i=1
j=1
Note that B and C are random variables in B, but A has additional randomness even after conditioning
on B. We will show that each of A, B, C goes to 0 almost surely, which would finish the proof of
Theorem 2.10.
High Level Logic Roughly speaking,
a.s.

A −−→ 0 because of a law of large numbers,
a.s.

B −−→ 0 because of the smoothness in Ez ψ induced by Gaussian averaging, and
a.s.

C −−→ 0 by induction hypothesis.
a.s.

We start by proving C −−→ 0, since it’s the easiest.
L.7.1

C Converges Almost Surely to 0
a.s.

In this section we show that C −−→ 0 by a straightforward reduction to the induction hypothesis.
1

r

1

s

A simple inductive argument with Box 1 shows that Z x , . . . , Z x , Z v , . . . , Z v are all deterministic,
1
m−1
polynomially-bounded functions of Z g , . . . , Z g
. Thus we may define the function Ψ : Rm−1 →
R by


r
s
X
X
1
m−1
1
m−1
i
j
def
Ψ(Z g , . . . , Z g
)=
E
ψ Z g , . . . , Z g
,
d˚i Z x +
e̊j Z v + σ̊z  .
z∼N (0,1)

i=1

j=1
1

r

1

s

The function Ψ is polynomially bounded since ψ is, and Z x , . . . , Z x , Z v , . . . , Z v are
1
m−1
i
polynomially-bounded functions of Z g , . . . , Z g
. Observe that the function that expresses Z x
m−1
1
in terms of Z g , . . . , Z g
is the same function that expresses xiα in terms of gα1 , . . . , gαm−1 for all
vj
α ∈ [n]; likewise for Z and vαj . Applying the induction hypothesis Moments(m − 1) to Ψ, we
obtain


n
r
s
X
X
1X
1
m−1
i
j
E ψ gα , . . . , gα ,
d˚i xα +
e̊j vα + σ̊z 
n α=1 z
i=1
j=1
n

=


1X
Ψ gα1 , . . . , gαm−1
n α=1
1

a.s.

−−→ E Ψ(Z g , . . . , Z g

m−1

)

by Moments(m − 1)

r
s
X
1
m−1 X
i
j
= E ψ Z g , . . . , Z g
,
d˚i Z x +
e̊j Z v + σ̊z  .


i=1

75

j=1

By Lemma L.19 below, this is precisely
 1

m−1
m
E ψ Zg , . . . , Zg
, Zg
as desired.
1
m−1
. Then for z ∼ N (0, 1) sampled
Lemma L.19. Let Z be the σ-algebra generated by Z g , . . . , Z g
independently of Z,
r
s
X
X
i
j
d
Z g =Z σ̊z +
d˚i Z x +
e̊j Z v
i=1

j=1

where d˚and e̊ are as in Eq. (58) and σ̊ is as in Eq. (57).
i

i

i

Proof. We can split each Z x into Ẑ x + Ż x , to obtain
r
s
X
X
i
j
σ̊z +
d˚i Z x +
e̊j Z v
i=1

=

σ̊z +

r
X

j=1

!
i

d˚i Ẑ x



r
s
X
X
i
j
d˚i Ż x +
e̊j Z v 
+
i=1

i=1

=

σ̊z +

r
X

j=1

!
i
d˚i Ẑ x

+ Ż g

by Lemma L.10

i=1
d

=Z Ẑ g + Ż g
= Zg,

see below for justification

as desired. It remains to justify the second-to-last equality, which is easily done via the usual formula
1
r
for Gaussian conditioning (Proposition K.3): Let Ẑ be the column vector (Ẑ x , . . . , Ẑ x )> . Then
we know that Ẑ and Ẑ g are jointly Gaussian with zero mean47 . The covariance between Ẑ and Ẑ g
2
2
is σA
γ̊ and Ẑ has covariance matrix σA
Υ̊ by Eq. (56). Then by Proposition K.3, we know that,
g
conditioned on Z, Ẑ is distributed as a Gaussian with mean
r
X
i
2 > 2
σA
γ̊ (σA Υ̊)+ Ẑ = d˚> Ẑ =
d˚i Ẑ x ,
i=1

by Eq. (58) and variance
2 > 2
2
E(Z g )2 − σA
γ̊ (σA Υ̊)+ σA
γ̊ = σ̊
by Lemma L.6. This is exactly what we needed.

L.7.2

A Converges Almost Surely to 0
a.s.

In this section we show A −−→ 0.
For each α ∈ [n], define the function ψα : R → R by
def
ψα (x) =
ψ(gα1 , . . . , gαm−1 , ωα + σx),

with ω and σ defined in Eq. (54). This is a random function depending on the random vectors
gα1 , . . . , gαm−1 , and it changes with n as well. We also consider the “centered version” ψ̃α : R → R
of ψα ,
def
ψ̃α (x) =
ψα (x) − E ψα (y)
y
⊥
with expectation taken over y ∼ N (0, (ΠV )αα ) (but not gα1 , . . . , gαm−1 ). Note by Eq. (53),
n
1X
d
A =B
ψ̃α (zα )
n α=1

where z ∼ N (0, Π⊥
V ).
47

recall we have assumed WLOG that E Z g = 0 for all g ∈ V; see discussion at the beginning of Appendix L.

76

Proof idea To prove our claim, we will show that, for almost all (i.e. probability 1 in the
probability space U defined in the beginning of Appendix L) sequences of (g 1 , . . . , g m−1 ) =
(g 1 (n), . . . , g m−1 (n)) in n — which we shall call amenable sequences of g 1 , . . . , g m−1 — we
have a moment bound
!2λ
n
1X
2λ
E[A |B] =
E
ψ̃α (zα )
< Cn−1.25
(70)
n
z∼N (0,Π⊥
)
V
α=1
for some large λ and some constant C > 0 depending only on λ and the particular sequence of
{(g 1 (n), . . . , g m−1 (n))}n . Then we apply Lemma K.2 to show that, conditioned on any amenable
sequence, A converges to 0 almost surely over all randomness remaining after conditioning. Since
almost all sequences are amenable, this shows that the convergence is also almost sure without the
conditioning.
The moment bound For λ ≥ 6 and any q > 1, we first apply Theorem K.23 to get the bound
v
!2λ
u
n
n
X
u1 X
1
−1.5+1/q q
t
E
ψ̃α (zα )
≤ cn
E ψ̃α (zα )2λq
z
n α=1
n α=1
where on both sides z ∼ N (0, Π⊥
V ), and c is a constant depending only on λ and m, but not on n,
the functions ψα , or g 1 , . . . , g m−1 . To obtain Eq. (70), we will show that
n

1X
E ψ̃α (zα )2λq
n α=1

(71)

is uniformly bounded (in n), almost surely over the randomness of the sequences
{g 1 (n), . . . , g m−1 (n)}n . We take all such sequences to be the amenable sequences. For q > 4, we
then get the desired moment bound Eq. (70).
It remains to show the almost sure uniform boundedness.
Almost sure uniform boundedness Intuitively, Eq. (71) should converge almost surely to a deterministic value by applying some version of the induction hypothesis, so it should be almost surely
uniformly bounded in n. The obstacle is that the variance (Π⊥
V )αα of zα depends not only on
gα1 , . . . , gαm−1 , but also on gβ1 , . . . , gβm−1 for other indices β 6= α as well. So a priori it is not clear
how to apply the Moments(m − 1) in a straightforward way. We thus first process Eq. (71) a bit. Let
def
µα =

E

x∼N (0,(Π⊥
V )αα )

ψα (x).

Then, abbreviating Ez for expectation taken over z ∼ N (0, Π⊥
V ), we have the following inequalities
of random variables in B:
n
n
1X
1X
E ψ̃α (zα )2λq =
E(ψα (zα ) − µα )2λq
n α=1 z
n α=1 z

≤

n

1 2λq−1 X 
2
E ψα (zα )2λq + µ2λq
α
z
n
α=1

≤

n
1 2λq X
2
E ψα (zα )2λq
z
n
α=1

=

n
1 2λq X
2
E ψ(gα1 , . . . , gαm−1 , ωα + σzα )2λq ,
z
n
α=1

by Lemma K.1
see below

p
where in the second inequality we applied power mean inequality µα ≤ 2λq Ez ψα (zα )2λq . Suppose,
WLOG, that ψ is polynomially bounded by an inequality |ψ(x)| ≤ Ckxkpp + c for some p, C, c > 0.
In the below, we will silently introduce constants C1 , C2 , . . . via Lemma K.1 and merge with old
77

constants, such that they will only depend on λ, p, q. Continuing the chain of inequalities above
n
n
X
2λq
1
1X
E ψ̃α (zα )2λq ≤ c + C22λq
E |gα1 |p + . . . + |gαm−1 |p + |ωα + σzα |p
z
n α=1 z
n
α=1

≤c+
≤c+

n
X
2λq
1
C1
E |gα1 |p + . . . + |gαm−1 |p + |ωα |p + |σzα |p
n α=1 z
n
X
1
C2
E |g 1 |2λqp + . . . + |gαm−1 |2λqp + |ωα |2λqp + |σzα |2λqp .
n α=1 z α
(72)

We now proceed to show that the summands of Eq. (72) are almost surely uniformly bounded, which
a.s.
finishes our proof of A −−→ 0.
• By Moments(m − 1),
n

1X
E |g 1 |2λqp + . . . + |gαm−1 |2λqp
n α=1 z α
almost surely converges to a deterministic value, so it is almost surely uniformly bounded in
n.
a.s.

• In addition, σ −−→ σ̊, so that, almost surely, for large enough n, we have σ ≤ σ̊ + 1. (The
order of the qualifiers is important here; in general this statement cannot be made uniformly
in n). Therefore, almost surely, for large enough n,
n
n
1X
1X
E |σzα |2λqp ≤
|σ̊ + 1|2λqp E |zα |2λqp .
z
n α=1 z
n α=1

This is almost surely uniformly bounded in n because Var(zα ) = (Π⊥
V )αα ∈ [0, 1] for all
α by Lemma K.18, so that Ez |zα |2λqp (which is purely a monotonic function of Var(zα ))
is bounded as well.
Pn
• It remains to bound n1 α=1 |ωα |2λqp . We extract our reasoning here into the Lemma L.20
a.s.
below, as we will need to reuse this for later. This finishes the proof of A −−→ 0.
Lemma L.20. For any polynomially bounded function ϕ : R → R,
n

1X
|ϕ(ωα )|
n α=1
is almost surely uniformly bounded in n.
Proof. It suffices to prove this for ϕ(x) = |x|d for any d > 0.
Expanding ω according to Lemma L.7, we get
n
n
r
s
X
1X
1X X i ˚
|ωα |d =
xα (di + ε̂i ) +
vαj (e̊j + ε̌j )
n α=1
n α=1 i=1
j=1

d

for (fixed dimensional) ε̂ ∈ Rr , ε̌ ∈ Rs that go to 0 almost surely with n. Applying Lemma K.1, we
get
n
n
X r
X
1X
1
|ωα |d ≤ C3
xi d˚i
n α=1
n α=1 i=1 α

d

+

s
X
j=1

We bound each summand separately.
78

d

vαj e̊i

+

r
X
i=1

d

xiα ε̂i

+

s
X
j=1

d

vαj ε̌j

.

• By induction hypothesis,
n

r

1X X i˚
x di
n α=1 i=1 α

d

converges a.s. to a deterministic value, so it is a.s uniformly bounded in n.
• By
of ε̂, we have almost surely, for large enough n,
Prthe a.s. decaying
Pr property
i
| i=1 xiα ε̂i | ≤
i=1 |xα | (again, the order of qualifier is very important here). By
induction hypothesis,
!d
n
r
1X X i
|x |
n α=1 i=1 α
converges a.s. to a deterministic value, yielding the a.s. uniform-boundedness of it and of
n

r

1X X i
x ε̂i
n α=1 i=1 α

d

.

• Likewise, because for each j, v j is a polynomially-bounded function of g 1 , . . . , g m−1 48 ,
the summands of

d
d
s
n
s
n X
X
X
X
1
1
j
j

v e̊j
|v |
and
n α=1 j=1 α
n α=1 j=1 α
are polynomially-bounded functions of g 1 , . . . , g m−1 too. So by induction hypothesis, these
sums converge a.s., implying the a.s. uniform-boundedness of them and of
n

s

1X X j
v ε̌j
n α=1 j=1 α

L.7.3

d

.

B Converges Almost Surely to 0
a.s.

In this section we show B −−→ 0.
def
Some Notations For brevity, we will set dα =
(Π⊥
V )αα . In addition, for each α ∈ [n], w ∈ R,
τ ≥ 0, define the function Ψα (−; −) : R × R≥0 → R by

def
Ψα (w; τ 2 ) =
E
ψ gα1 , . . . , gαm−1 , w + τ z .

z∼N (0,1)

2

(Here and in all that follows, τ is the square of τ , and the 2 is not an index). This is a random
function, with randomness induced by g 1 , . . . , g m−1 .
Our proof idea is to write


n
r
s
X
X

1X
B=
Ψα ωα ; σ 2 dα − Ψα 
d˚i xiα +
e̊j vαj ;σ̊ 2 
n α=1
i=1
j=1


r
s
X
X

1X
≤
Ψα ωα ; σ 2 dα + Ψα 
d˚i xiα +
e̊j vαj ;σ̊ 2 
n
i=1
j=1
α∈J¯


r
s
X
X

1X
Ψα ωα ; σ 2 dα − Ψα 
d˚i xiα +
e̊j vαj ;σ̊ 2 
+
n
i=1
j=1

(73)

(74)

α∈J

48
This is the most crucial place where we need the assumption that all nonlinearities in the program are
polynomially bounded. Otherwise, for faster growing functions, the compositions of such nonlinearities might
not be integrable against the Gaussian measure

79

def
where J t J¯ = [n] is a partition of [n] with J =
{α : dα ≥ 1/2} and J¯ is its complement. Note that
¯
|J| ≤ 2 rank V ≤ 2s is uniformly bounded in n. We then show each summand of Eq. (73) goes to 0
a.s. individually. Finally we use the smoothness of Ψα (Eq. (76)) induced by the Gaussian averaging
in z to show each summand of Eq. (74) is almost surely o(1), finishing the proof.

Eq. (73) converges to 0 a.s. We first look at the term




r
s
r
s
X
X
X
X
X
¯
|J|
1
Ψα 
d˚i xiα +
e̊j vαj ;σ̊ 2  ≤
d˚i xiα +
max Ψα 
e̊j vαj ;σ̊ 2 
n
n
α∈[n]
i=1
j=1
i=1
j=1
α∈J¯
v

q
u
u X
r
s
X
X
2s q
u1
≤ 1−1/q t
Ψα 
d˚i xiα +
e̊j vαj ;σ̊ 2 
n
n
i=1
j=1
α∈[n]

(75)
¯
for 
any q > 0.
Here we used
Now
 q |J| ≤ 2 rank V ≤ 2s as noted above.
Pr ˚ i
Ps
j
2
Ψα
d
x
+
e̊
v
;σ̊
is
a
fixed
(independent
of
α
and
n)
polynomially-bounded
i=1 i α
j=1 j α
function of gα1 , . . . , gαm−1 , so by induction hypothesis,

q
r
s
X
X
1 X
Ψα 
d˚i xiα +
e̊j vαj ;σ̊ 2 
n
i=1
j=1
α∈[n]

is a.s. uniformly bounded in n, so that using a large q ≥ 2, we see Eq. (75) converges a.s. to 0.
Next, we apply a similar reasoning to the other term and obtain
v
u

1X
2s u 1 X
q
2
|Ψα (ωα ; σ 2 dα )|
Ψα ωα ; σ dα ≤ 1−1/q q
t
n
n
n
¯
α∈[n]

α∈J

We in fact already know that
q
1 X
Ψα ωα ; σ 2 dα
n
α∈[n]

is a.s. uniformly bounded in n from Eq. (72) in Appendix L.7.2, so that
 a.s.
1X
Ψα ωα ; σ 2 dα −−→ 0
n
¯
α∈J

from which follows the same for Eq. (73).
Eq. (74) converges to 0 a.s. As mentioned above, to prove this we will use the following smoothness bound of Ψα , whose proof will be delayed to the end of the section. Suppose, WLOG, that
the polynomially boundedness of ψ presents itself in an inequality |ψ(x)| ≤ Ckxkpp + C, for some
p, C > 0, where p is an integer. This p will appear explicitly in this smoothness bound below.
Lemma L.21 (Smoothness of Ψα ). Let w, ∆w ∈ R, τ 2 , ∆τ 2 ∈ R≥0 . Then
Ψα (w + ∆w; τ 2 + ∆τ 2 ) − Ψα (w; τ 2 )


≤ R(|∆w| + ∆τ 2 )(1 + τ −2 ) Sα + |w|p + |∆w|p + τ p + (∆τ 2 )p/2
for some constant R > 0, and where
def
Sα =
1 + |gα1 |p + · · · + |gαm−1 |p .

To bound Eq. (74), first we expand
ωα =

r
X

xiα (d˚i + ˆi ) +

i=1

s
X
j=1

80

vαj (e̊j + ˇj )

(76)

where, by Lemma L.7, ˆ ∈ Rr , ˇ ∈ Rs are vectors that go to 0 almost surely with n. Then we apply
the smoothness bound Eq. (76) to get, for each α ∈ J


r
s
X
X


Ψα ωα ; σ 2 dα − Ψα 
d˚i xiα +
e̊j vαj ;σ̊ 2  ≤ R 1 + min(σ 2 dα ,σ̊ 2 )−1 Xα Yα
i=1

j=1


≤ R 1 + min(σ 2 /2,σ̊ 2 )−1 Xα Yα
using the definition of J that dα ≥ 1/2, ∀α ∈ J. Here we have defined
r
s
X
X
def
Xα =
|ωα −
d˚i xiα −
e̊j vαj | + |σ 2 dα − σ̊ 2 |
i=1

=

r
X

j=1

xiα ˆi +

i=1

s
X
j=1

p

def

vαj ˇj + |σ 2 dα − σ̊ 2 |

Yα = Sα + |ωα | +

r
X

xiα ˆi +

i=1

s
X

p

vαj ˇj

+ max(σ 2 dα ,σ̊ 2 )p/2 + |σ 2 dα − σ̊ 2 |p/2 .

j=1

Thus,


r
s
X
X

1X
Eq. (74) =
e̊j vαj ;σ̊ 2 
Ψα ωα ; σ 2 dα − Ψα 
d˚i xiα +
n
i=1
j=1
α∈J

X
1
1 + min(σ 2 /2,σ̊ 2 )−1
Xα Yα
n
α∈J
s
s
 1X
1X 2
2
2 −1
2
≤ R 1 + min(σ /2,σ̊ )
Xα
Yα .
n
n
≤R

α∈J

α∈J

a.s.


Since σ −−→ σ̊ and we have assumed σ̊ > 0 by Eq. (?), we have 1 + min(σ 2 /2,σ̊ 2 )−1 is almost
surely uniformly bounded in n.
Therefore, Eq. (74) can be shown to converge a.s. to 0 if we show
s
1X 2
Yα is a.s. uniformly bounded in n, and
n
α∈J
s
1 X 2 a.s.
Xα −−→ 0
n
α∈J

a.s.

We prove these two claims in Lemmas L.22 and L.23 below, which would finish our proof of B −−→ 0,
and of our mainq
theorem Theorem 2.10 as well.
P
1
2 a.s.
Lemma L.22.
−→ 0.
α∈J Xα −
n
Proof. Note that
Xα ≤

r
X
i=1

xiα ˆi +

s
X

vαj ˇj + |σ̊ 2 − σ 2 | + |σ 2 − σ 2 dα |

j=1

def

= Pα + Qα + Rα .
Then by triangle inequality (in `2 -norm),
s
s
s
s
1X 2
1X 2
1X 2
1X 2
Xα ≤
Pα +
Qα +
Rα .
n
n
n
n
α∈J

α∈J

α∈J

α∈J

We now show that each term above converges a.s. to 0, which would finish the proof of Lemma L.22.
81

a.s.

a.s.

• Because ˆ −−→ 0 and ˇ −−→ 0, we have, for some constant C > 0,


r
s
1X 2
1 X X i 2 X j 2 
Pα ≤ C
(xα ˆi ) +
(vα ˇj )
n
n
i=1
j=1
α∈J
α∈J


r
s
1 X X i 2 X j 2 
(xα ) +
(vα )
≤ C max{|ˆ
i |, |ˇ
j |} ×
i,j
n
i=1
j=1
α∈J


r
s
1 X X i 2 X j 2 
(xα ) +
≤ C max{|ˆ
i |, |ˇ
j |} ×
(vα )
i,j
n
i=1
j=1
α∈[n]

a.s.

−−→ C × 0 × E = 0
where E is the Gaussian expectation that n1
a.s. to, by inductive hypothesis.

P

α∈[n]

P
r

i 2
i=1 (xα ) +

Ps

j 2
j=1 (vα )



converges

• The quantity Qα actually doesn’t depend on α, so that
s
1X 2
a.s.
Qα ≤ |σ̊ 2 − σ 2 | −−→ 0
n
α∈J

by Lemma L.6.
2
• Notice Rα
= σ 4 (1 − dα )2 ≤ σ 4 (1 − dα ) because 1 − dα ∈ [0, 1/2] for α ∈ J. Thus,
1X 2
1X
1 X
1
Rα ≤ σ 4
1 − dα ≤ σ 4
1 − dα = σ 4 rank V
n
n
n
n
α∈J

α∈J

α∈[n]

by the definition that dα = (Π⊥
V )αα . But of course rank V ≤ s is bounded relative to n.
So this quantity goes to 0 almost surely) as desired.

Lemma L.23.

q P
1
n

2
α∈J Yα is a.s. uniformly bounded in n.

Proof. We have
s
s
s
s
s
1X 2
1X 2
1X
1X
1X
2
2p
Yα ≤
Sα +
|ωα | +
X̂α +
max(σ 2 dα ,σ̊ 2 )p
n
n
n
n
n
α∈J
α∈J
α∈J
α∈J
α∈J
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
X̂α 2 + t
max(σ 2 dα ,σ̊ 2 )p
n
n
n
n
α∈[n]

α∈[n]

α∈[n]

where
def
X̂α =

r
X
i=1

xiα ˆi +

s
X

α∈[n]

p

vαj ˇj

+ |σ 2 dα − σ̊ 2 |p/2

j=1

We proceed to show that each of 4 summands above are individually a.s. uniformly bounded in n.
• Sα2 is a polynomially bounded function of gα1 , . . . , gαm−1 , so that by Moments(m − 1),
1 X 2 a.s.
Sα −−→ C
n
α∈[n]

for some constant C, so it is also a.s. uniformly bounded in n.
82

• By Lemma L.20, we get
1 X
|ωα |2p
n
α∈[n]

is a.s. uniformly bounded in n.
• Using the same reasoning as in the proof of Lemma L.22, one can easily show
1 X
a.s.
X̂α 2 −−→ 0
n
α∈[n]

so it is also a.s. uniformly bounded.
• Since dα ≤ 1, we have max(σ 2 dα ,σ̊ 2 ) ≤ max(σ 2 ,σ̊ 2 ), which is independent of α. Therefore,
1 X
1 X
a.s.
max(σ 2 dα ,σ̊ 2 )p ≤
max(σ 2 ,σ̊ 2 )p = max(σ 2 ,σ̊ 2 )p/2 −−→ σ̊ p .
n
n
α∈[n]

α∈[n]

and it is also a.s. uniformly bounded in n.

Finally, we deliver the promised proof of Lemma L.21.
Proof of Lemma L.21. By Lemma K.4, Ψα is differentiable in w, and
∂w Ψα (w; τ 2 ) = τ −1
∂τ 2 Ψα (w; τ 2 ) =

E

z∼N (0,1)

zψ(gα1 , . . . , gαm−1 , w + τ z)

(77)

1 −2
τ
E (z 2 − 1)ψ(gα1 , . . . , gαm−1 , w + τ z).
2
z∼N (0,1)

(78)

Recall that |ψ(x)| ≤ Ckxkpp + C. We will silently introduce constants C1 , C2 , . . . depending only
on p, merging with old constants, typically via Lemma K.1 or by integrating out some integrands
depending only on p. With z ∼ N (0, 1),
|∂w Ψα (w; τ 2 )| ≤ τ −1 E |z||ψ(gα1 , . . . , gαm−1 , w + τ z)|
z

≤ τ −1 C E |z| 1 + |gα1 |p + · · · + |gαm−1 |p + |w + τ z|p

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
−2
≤ τ C3 1 + |gα1 |p + · · · + |gαm−1 |p + |w|p + τ p .

|∂τ 2 Ψα (w; τ 2 )| ≤

Therefore, for any ∆w ∈ R, ∆τ 2 ∈ R≥0 , we have
Ψα (w + ∆w; τ 2 + ∆τ 2 ) − Ψα (w; τ 2 )
Z 1

=
dt ∆w · ∂w Ψα (w + ∆wt; τ 2 + ∆τ 2 t) + ∆τ 2 · ∂τ 2 Ψα (w + ∆wt; τ 2 + ∆τ 2 t)
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

83

where

def
Sα =
1 + |gα1 |p + · · · + |gαm−1 |p ,
2
which is independent of t. Since ∆τ ≥ 0, (τ 2 + ∆τ 2 t)−1 ≤ τ −2 , and we get

Ψα (w + ∆w; τ 2 + ∆τ 2 ) − Ψα (w; τ 2 )
Z 1 

2
−1
−2
≤ C4 (|∆w| + ∆τ )(τ + τ )
dt Sα + |w + ∆wt|p + (τ 2 + ∆τ 2 t)p/2
0

Z 1



dt Sα + |w|p + |∆w|p tp + τ p + (∆τ 2 )p/2 tp/2

0
2
−1
−2
≤ C6 (|∆w| + ∆τ )(τ + τ ) Sα + |w|p + |∆w|p + τ p + (∆τ 2 )p/2

≤ C5 (|∆w| + ∆τ 2 )(τ −1 + τ −2 )

where in the end we have integrated out tp and tp/2 . We finally apply the simplification τ −1 ≤
1 −2
1
by AM-GM to get the desired Eq. (76).
2 + 2τ

M

Proof of N ETSOR>+ Master Theorem Assuming Rank Stability

In this section we describe how to augment the proof of Theorem 2.10 given in Appendix L to yield
the proof of Theorem E.11. This is very similar to the proof of the N ETSOR+ Master Theorem in
Yang [50]. The key points to note here are 1) the rank stability assumption Assumption E.7 used in
Theorem E.11, and 2) an additional term in Eq. (69) due to fluctuations in the parameter Θ.
M.1

Rank Stability

By Remark E.13, we see that rank stability assumption is necessary for the parameter-controlled
N ETSOR>+ Master Theorem. In the proof of the N ETSOR> Master Theorem (Appendix L), we
had to intricately weave together an induction on rank stability (more generally, CoreSet) and an
induction on moment convergence (Moments). However, here, to show Theorem E.11, we just need
1) to induct on Moments and 2) to invoke Assumption E.7 whenever we need to use Lemma L.11,
which is when we need to show that pseudo-inverse commutes with almost surely limit, such as in
Proposition L.5, and when we need to ensure either σ is almost surely 0 or is almost surely positive,
as in Appendix L.7.3.
M.2

Fluctuation of the Parameters

As in Appendix L, we will induct on the G-vars g 1 , . . . , g m in the program to show that
1. For any random vector Θ ∈ Rl that converges almost surely to a deterministic vector Θ̊ as
n → ∞, and for any ψ(−; −) : Rm × Rl → R parameter-controlled at Θ̊,
n
1
m
1X
a.s.
ψ(gα1 , . . . , gαm ; Θ) −−→ E ψ(Z g , . . . , Z g ; Θ̊).
n α=1
i

for any G-vars g 1 , . . . , g m , where Z g are as defined in Definition E.3.
2. Each scalar θ that is a deterministic function of g 1 , . . . , g m converges a.s. to θ̊.
The latter trivially follows from former, so we will focus on proving the former in the inductive step.
When we have parameters in nonlinearities, Eq. (69) needs to be modified to contain an additional
term D:
n

1
m
1X
ψ(gα1 , . . . , gαm ; Θ) − E ψ(Z g , . . . , Z g ; Θ̊) ≤ D + A + B + C
n α=1

where
n

def
D=

1X
ψ(gα1 , . . . , gαm ; Θ) − ψ(gα1 , . . . , gαm ; Θ̊)
n α=1
84

and A, B, C are as in Eq. (69) but replacing ψ(−) there with ψ(−; Θ̊). Because ψ(−; −) is parametera.s.
controlled at Θ̊ by assumption, ψ(−; Θ̊) is controlled, and A, B, C −−→ 0 with the same arguments
as before (except using rank stability assumption Assumption E.7 where appropriate, instead of
CoreSet).
Now, by the other property of parameter-control, we have
D≤

n
n
1X
1X
ψ(gα1 , . . . , gαm ; Θ) − ψ(gα1 , . . . , gαm ; Θ̊) ≤
f (Θ)ψ̄(gα1 , . . . , gαm )
n α=1
n α=1
n

= f (Θ)

1X
ψ̄(gα1 , . . . , gαm )
n α=1

for some controlled ψ̄ : Rm → R and some f : Rl → R≥0 ∪ {∞} that is continuous at Θ̊ and has
a.s.
f (Θ̊) = 0 (where ψ̄ and f can both depend on Θ̊). Since Θ −−→ Θ̊ by induction hypothesis, we have
Pn
a.s.
1
1
f (Θ) −−→ 0. In addition, by Moments, n α=1 ψ̄(gα , . . . , gαm ) converges a.s. as well to a finite
constant. Therefore,
a.s.

D −−→ 0
as desired.
M.3

Summary

The proof of Theorem E.11 would proceed as follows: We induct on Moments with the same setup as
Appendix L.4, except using Assumption E.7 for Proposition L.5. Then we prove the inductive step
for Moments as in Appendix L.7. We modify Eq. (69) to add a term D as in Appendix M.2, which
a.s.
goes to 0 a.s. as argued there. The same arguments for A, B, C −−→ 0, exhibited in Appendix L.7
a.s.
still hold, except that in the proof of B −−→ 0, we apply Assumption E.7 (instead of Lemma L.11) to
allow us to assume σ̊ > 0 and σ > 0 almost surely.

N

Proof of N ETSOR>+ Master Theorem without Assuming Rank Stability

In this section, we prove Theorem E.15.
Pn
a.s.
Definition N.1. We say a vector v ∈ Rn has vanishing moments if n1 α=1 vα2k −−→ 0 for all
integer k > 0 as n → ∞. We say it has bounded moments if there are finite Ck ∈ R such that
Pn
1
2k a.s.
−→ Ck for all k.
α=1 vα −
n
Assume each Nonlin+ instruction only takes G-vars instead of any vector in the program.
Proof Plan We will inductively rewrite the program and maintain a 1) core set M of G-vars whose
elements are orthogonal as vectors and have non-vanishing moments and 2) a set M of G-vars with
vanishing moments. In particular, the vectors in M will take the form Av for some matrix A and
some v with vanishing moments. Any vector in the original program will always be (mathematically)
a linear combination of vectors in M and M. Then Moments largely reduces to that of M, which
has rank stability.
Every non-initial vector g of M is created by MatMul, say g = Ah for some matrix A and vector h.
For any matrix A, define M∗A to be the collection of all such h.
N.1

Induction Hypotheses

Let g 1 , . . . , g M be all of the G-vars in the program, including initial vectors, in order of appearance.
We inductively rewrite the program and expand M and M, maintaining the following induction
hypothesis for each m ∈ [M ].
IH(m) The following hold simultaneously
85

Rewrite(m) g 1 , . . . , g m are mathematically linear combinations of vectors in M and M
whose coefficients are definable using Moment applied to M and M.
Moments(m) Let z 1 , . . . , z k be all vectors in M and z̄ 1 , . . . , z̄ k̄ be all vectors in M. For
any pseudo-Lipschitz ψ : Rk+k̄ → R,
n

1
k
1X
a.s.
ψ(zα1 , . . . , zαk , z̄α1 , . . . , z̄αk̄ ) −−→ E ψ(Z z , . . . , Z z , 0, . . . , 0).
n α=1

Orthogonal(m) For all n, for any matrix
A, M∗A forms an orthogonal system of vectors
√
where each vector has `2 norm n
VanSet(m) Every vector of M has vanishing moments
By induction, we will have Rewrite(M ) and Moments(M ), which together with Lemma N.3 imply
Theorem E.15.
N.2

Base Case

WLOG, we may assume the initial vectors have identity covariance by applying Gram-Schmidt.
These vectors are added to M. Currently, M is empty. Moments is then automatic by the Strong
Law of Large Numbers; the other clauses of the induction hypothesis are obvious.
N.3

Induction

Assume IH(m − 1). We seek to show IH(m).
Suppose g = g m = Ah for some vector h. By Rewrite(m − 1), we have
h = φ(z 1 , . . . , z k , z̄ 1 , . . . , z̄ k̄ ; θ1 , . . . , θl )
where 1) z 1 , . . . , z k are all of the vectors in M, 2) z̄ 1 , . . . , z̄ k̄ are all of the vectors in M, 3) θ1 , . . . , θl
are scalars created by Moment from z 1 , . . . , z k , z̄ 1 , . . . , z̄ k̄ and so converge a.s. to θ̊1 , . . . , θ̊l by
Moments(m − 1), and 4) φ is pseudo-Lipschitz jointly in all of them.
Let

def
h0 =
φ(z 1 , . . . , z k , 0, . . . , 0; θ1 , . . . , θl ) and

def
∆h =
h − h0 .

(Note both h0 and ∆h are expressible by Nonlin+ in terms of z 1 , . . . , z k , z̄ 1 , . . . , z̄ k̄ ; θ1 , . . . , θl ).
Because z̄ 1 , . . . , z̄ k̄ have vanishing moments by induction hypothesis and φ is pseudo-Lipschitz, ∆h
has vanishing moments as well by Lemma N.3. We insert A∆h into M; we will prove that A∆h has
vanishing moments below in Lemma N.2.
def
Now define ĥ0 =
h0 − Πh0 where Π is the projection onto the linear span of M∗A . Πh0 can be
P
> 0
written as a Nonlin+ like so: Πh0 = v∈M∗ v nh v, where we used the induction hypothesis that
A
√
kvk2 = n and M∗A is orthogonal. Then ĥ0 can also be written as a Nonlin+ .
0

We proceed by casework on whether Z ĥ = 0.
0

1) Suppose Z ĥ = 0. Then Aĥ0 has vanishing moments by the same Gaussian conditioning technique
as in Appendix L, which is possible because we only need to condition on z 1 , . . . , z k , which are all
of the G-vars that ĥ0 depends on, and Orthogonal(m − 1) implies they have rank stability. Then
we add Aĥ0 to M. Because g = Ah = A(h0 + ∆h) = A(ĥ0 + Πh0 + ∆h), we can rewrite all
P
> 0
instances of g in the program as the sum of Aĥ0 , A∆h (in M), and AΠh0 = v∈M∗ v nh Av (a
A
linear combination of M).
0 2

0

0 2

a.s.

def
2) Suppose Z ĥ 6= 0. Define h1 =
h0 / kĥnk via Nonlin+ (which is valid since kĥnk −−→
0
E(Z ĥ )2 6= 0 by induction hypothesis). We add Ah1 to M. Because g = Ah = A(h0 + ∆h) =
0 2

A( kĥnk h1 + Πh0 + ∆h), we can rewrite all instances of g in the program as the sum of A∆h (in
0 2
P
> 0
M), kĥnk Ah1 , and AΠh0 = v∈M∗ v nh Av (linear combinations of M).
A

86

With the above updates to M and/or M, it’s clear that Rewrite(m), Orthogonal(m) and VanSet(m)
are true. So it remains to prove Moments(m).
Moments(m) In the case 1) above (where we did not expand M), Moments(m) follows straightforwardly from Moments(m − 1) and Lemma N.3.
In the case 2) above (where we added Ah1 to M), we need to show
n

1
1
k
1X
a.s.
ψ(Ah1α , zα1 , . . . , zαk , z̄α1 , . . . , z̄αk̄ ) −−→ E ψ(Z Ahα , Z z , . . . , Z z , 0, . . . , 0)
n α=1

for any pseudo-Lipschitz ψ. Since h1 is expressible as a Nonlin+ of purely z 1 , . . . , z k and some
parameters, we can just condition on zα1 , . . . , zαk and proceed as in Appendix L, after replacing
z̄α1 , . . . , z̄αk̄ by zeros by Lemma N.3. (Note this argument wouldn’t have worked if we naively put
g = Ah in place of Ah1 because h depends on z̄ 1 , . . . , z̄ k̄ ).
This finishes the induction, barring for the promised Lemma N.2 below.
Lemma N.2. A∆h has vanishing moments.
It’s clear that A∆h at least has vanishing second moment because A has a uniformly (in n) bounded
operator norm from standard matrix concentration bounds. We need to work a bit harder to get all
moments to vanish.
Proof. We condition on z 1 , . . . , z k , z̄ 1 , . . . , z̄ k̄ . Suppose
uj = A> v j ,

j = 1, . . . , s,

and

ūj = A> v̄ j ,

j = 1, . . . , s̄

are respectively the elements of M and M that are images of MatMul with A> . As in the (Ẑ,
Ż)-decomposition in the n → ∞ limit, we can write A∆h, for finite n, as a sum of 1) a Gaussian
vector with vanishing 2nd moment and 2) a linear combination of {v j }sj=1 and {v̄ j }s̄j=1 , where the
j
j
2
2
coefficient of v j (resp. v̄ j ) converges to σA
E ∂Z ∆h /∂Z v = 0 (resp. σA
E ∂Z ∆h /∂Z v̄ < ∞).
The former has vanishing moments of all order by Gaussianity. Since v j has bounded moments and
v̄ j has vanishing moments, the latter also has vanishing moments.
Lemma N.3. Let z 1 , . . . , z k have bounded moments, z̄ 1 , . . . , z̄ k̄ have vanishing moments, and
θ1 , . . . , θl ∈ R converge almost surely to deterministic θ̊1 , . . . , θ̊l ∈ R. Then for any pseudo-Lipschitz
ψ and t > 0,
n

1X
a.s.
|ψ(zα1 , . . . , zαk , z̄α1 , . . . , z̄αk̄ ; θ1 , . . . θl ) − ψ(zα1 , . . . , zαk , 0, . . . , 0; θ̊1 , . . . , θ̊l )|t −−→ 0.
n α=1
Proof. Holder’s inequality.

87


```

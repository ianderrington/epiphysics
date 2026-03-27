# Epiphysics

**The empirical science of Epimechanics.**

Epimechanics is a theoretical framework — the mathematical grammar of how representations change under forces, applicable to any substrate. Epiphysics is the empirical program that tests it.

## The Core Insight

All representations have mechanical structure (trivially — it's calculus). Good representations have *simple* mechanical structure — simple enough to predict dynamics at minimal computational cost. The existence of an optimal representation is a theorem (Shannon, Rissanen, Solomonoff). That the optimal representation has Lagrangian structure is the conjecture this project investigates.

## Structure

- **[Theory](./theory/)** — Epimechanics: the formal framework (Parts 0-5)
- **[Applications](./applications/)** — Testing the framework in specific domains
- **[Research](./research/)** — Papers, proofs, and open problems
- **[Popular](./popular/)** — "The Physics of Common Sense" — accessible introductions
- **[Experiments](./experiments/)** — Empirical tests (planned)

## Key Results

- **Theorem (U(1) uniqueness):** Under product-state independence, compositional consistency, recursive closure, and compact connected Lie regularity, the unique nontrivial amplitude phase group is $\mathrm{U}(1)$. See [Compositional Fixed-Point Derivation](./docs/theory/amplitude-phase-fixed-point-paper.md).
- **Conjecture:** Information-theoretically optimal representations have Lagrangian structure.
- **Open problem:** Does this hold for irreversible systems?

## Status

Theory: developed. Applications: 2 written, more planned. Experiments: protocol designed, not yet run.

## URL

[epiphysics.xyz](https://epiphysics.xyz) (coming soon)

## Development Process

This project is developed collaboratively between human researchers and semi-autonomous AI agents. The agents assist with:

- **Theory development** — adversarial review, proof verification, gap identification
- **Documentation** — maintaining consistency across papers, terminology audits
- **Quality assurance** — automated checks for circularity, notation consistency, claim status

All substantive theoretical claims are human-authored and human-verified. AI contributions are logged and auditable (see `docs/research/audits/`).

## Author

Ian Derrington

## Contributing

Contributions welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

For AI-assisted contributions: include audit trails and clearly distinguish proved results (✅) from conditional claims (⚠️) and conjectures (❌).

## License

MIT

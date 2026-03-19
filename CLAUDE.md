# Epiphysics — Claude Code Instructions

## Project Overview
Epiphysics is the empirical science of Epimechanics. Theory in `docs/theory/`, applications in `docs/applications/`, research in `docs/research/`, experiments in `docs/experiments/`. Site is Next.js deployed to epiphysics.xyz via Vercel.

## Key Conventions
- X is a REPRESENTATION, not reality (Hoffman's Interface Theory)
- An entity is ANYTHING representable; ρ_ac measures persistence, not entity-hood
- Mass is tensorial: p_i = M_ij Ẋ^j (scalar p = MẊ is isotropic approximation)
- The Lagrangian is the STRONGEST STRUCTURAL POSTULATE — label it as such
- ρ_ac is EMERGENT at the loop level, not the bond level
- All content needs `tts:` and `feedback:` in frontmatter
- Sidenotes: keep SHORT (1 medium paragraph max). Use `[!sidenote]`, `[!caveat]`, `[!tip]`, `[!note]`, `[!important]`

## Content Structure
- `docs/` → rendered by Next.js as the site
- `docs/theory/` → Parts 0-5 of Epimechanics
- `docs/applications/` → domain-specific tests (tag sections: relabeling/structural/novel)
- `docs/research/` → papers, proofs, protocols
- `docs/experiments/` → empirical tests (not yet run)

## Build
```bash
npm install && npm run dev    # dev
npm run build                 # must pass before push
```

## GitHub
Repo: ianderrington/epiphysics
Always push to main. Vercel auto-deploys.
Do NOT commit .env.local or secrets.

## Naming
- Framework = Epimechanics (EMech)
- Empirical program = Epiphysics (EPhy)
- Never use "Physics of Metaphysics" (old name)
- Never use "the framework" when "Epimechanics" is clearer

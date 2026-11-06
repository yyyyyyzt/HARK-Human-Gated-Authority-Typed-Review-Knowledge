# HARK — authority-typed review knowledge for evidence-bearing document review

Paper and artifact repository for

> **HARK: Authority-Typed Review Knowledge for Evidence-Bearing Document Review** —
> prepared for submission to *Computers* (MDPI), Section *AI-Driven Innovations*; not yet submitted.

This repository holds **both** deliverables of the project: the manuscript and its submission
materials (`paper/`), and the system the manuscript evaluates (`plugins/hark/`). The plugin's
development history lives in a separate repository, `dsh-plugin-dev-guide`; **the paper is written
here**. The system is an extension package for DeepSeek Harness (DSH), an open-source conversational
agent harness.

HARK reviews technical solution proposals written in Markdown and returns a *suggested* verdict plus
per-rule findings. Each finding either carries a quote located in the document or is produced by a
verifier as an explicit absence record — the model is never allowed to assert absence. Rules carry an
operational authority: `hard` (the verifier decides), `hybrid` (the verifier locates a span and the
model judges only inside it), `soft` (a pending item for the expert, never counted). A deterministic
policy turns the set of qualified findings into the suggested verdict; the final verdict is written by
the reviewer, and every disposition is stored as a decision record.

**Scope of this artifact.** What is implemented and evaluated: the typed rules, the located-quote
gate, the deterministic policy, the decision records, and a host-independent engine. What is **not**
implemented, and is stated as a target contract in the paper: certified human approval, an effective
authority cap enforced across every write path, and content-addressed snapshot/restore of a
configuration. The repository should not be read as claiming those guarantees.

[![DOI](https://zenodo.org/badge/1445355414.svg)](https://doi.org/10.5281/zenodo.23955205)

**Repository:** <https://github.com/yyyyyyzt/HARK-Human-Gated-Authority-Typed-Review-Knowledge> ·
**Archived release:** `v1.0.0` · **DOI:** [10.5281/zenodo.23955205](https://doi.org/10.5281/zenodo.23955205)
(all versions: 10.5281/zenodo.23955204) · **Manuscript snapshot:** `b566b08`

## What is in this repository

| Path | Contents |
|---|---|
| `paper/mdpi-article/` | the manuscript: `main.tex` (41 inline references, 23 pages), `main.pdf`, the upload package `main.zip`, MDPI class files, and `revision/` (diff against the baseline, machine-readable patch manifest, validation record, Chinese revision log) |
| `paper/mdpi-submission/` | submission materials: cover letter, upload checklist and section/topic alignment, Chinese translated digest, graphical abstract, journal-format survey |
| `paper/audit/` | the 2026-11-05 read-only audit that preceded the revision: five-role panel reports, critical adjudication, evidence, reference papers |
| `paper/data/public/synthetic/` | evaluation corpus: 100 proposals, 253 planted defects, ground truth, generator manifest and self-check output |
| `paper/data/public/eval-runs/` | the nine published runs (three configurations × three repetitions) as raw JSON, plus `summary.md` and `skipped.json` |
| `plugins/hark/` | the extension package: pure-function engine (`src/engine`), tools, storage domain, HTTP API and dashboard, rule package and lexicon (`rules/`), review preset and skill, design documents |
| `plugins/hark/rules/capability-open-access.rules.yaml` | the shipped rule package: 28 rules (10 hard, 13 hybrid, 5 soft) with declarative verifiers and a 25-family cue lexicon |

## Reproduce the results

Requirements: Node.js ≥ 22.19.

```bash
# 1. build the plugin (the evaluation imports lib/, not src/)
cd plugins/hark
pnpm install --ignore-scripts     # or: npm install
pnpm run build

# 2. regenerate the corpus and its self-check (deterministic, seed 20261029)
node scripts/eval/gen-synthetic.mjs --out ../../paper/data/public/synthetic

# 3. run the three deterministic configurations, three repetitions each
node scripts/eval/run-ablation.mjs --out out
```

`run-ablation.mjs` writes `out/eval-runs/*.json` and `out/summary.md`. For the `S-full` configuration
the published run reports TP/FP/FN 168/0/85, precision 1.000, recall 0.664, micro-F1 0.798, weighted
recall 0.649, verdict accuracy 85.0 %, macro-F1 0.832 and Cohen's κ 0.763; for the `B0` keyword
baseline, 47/124/206, precision 0.275, recall 0.186, micro-F1 0.222, accuracy 28.0 %, κ −0.043.
The ablation takes a few seconds on a laptop-class machine (4.5 s in the stored run). The three
repetitions of each configuration produce identical metrics and core outputs because no model is
involved; the JSON files differ only in run id and timestamp.

The four model-dependent configurations (`B1`, `S-gate`, `S-policy`, `S-memory`) are listed in
`paper/data/public/skipped.json` with the reason each is not part of the published numbers: they need
an LLM adapter (`--adapter ./your-adapter.mjs`) or online expert feedback.

## Manuscript

The manuscript source is `paper/mdpi-article/main.tex`; it compiles with two `pdflatex` passes (no
BibTeX: all 41 references are inline `\bibitem`s). See `paper/mdpi-article/README.md` for the exact
command, the validation record and the items that still need author confirmation (each author's
CRediT role, and domain review of two historical hard predicates). The Zenodo metadata was corrected
in place on 2026-11-05 and `paper/zenodo/verify.sh` passes; the runbook remains in
`paper/zenodo/README.md`. The Chinese
digest in `paper/mdpi-submission/zh-translation.md` mirrors the manuscript section by section.

## Install the plugin (optional)

The plugin runs inside a DSH installation; see `plugins/hark/README.zh.md` for the Chinese
installation guide (profile install, desktop client, release tags). The paper's evaluation does
**not** require a DSH installation — the engine is a pure function library.

## Data and confidentiality

The synthetic corpus is generated by this repository and is released in full. The three internal
proposals discussed in the paper's development-team subsection and the 30 historical expert opinions
are internal documents of an operating utility: only aggregate statistics derived from them are
reported, and the anonymisation procedure is implemented in
`plugins/hark/scripts/eval/anonymize.mjs`.

## Citation

`CITATION.cff` carries the metadata. The archival DOI is minted by Zenodo for release `v1.0.0`,
built from commit `cbe1d33`. The manuscript cites repository snapshot `b566b08`, which is three
commits ahead of that archived commit (DOI wiring, quote validation and release notes), with the
evaluation data byte-identical.

## Licence

MIT — see `LICENSE`.

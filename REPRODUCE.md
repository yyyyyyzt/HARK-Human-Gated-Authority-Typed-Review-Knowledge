# Reproducing the numbers in the paper

All reported numbers come from `paper/data/public/eval-runs/*.json` (raw output) and
`paper/data/public/summary.md` (table rendered by the runner). Nothing in the Results section is
entered by hand.

## 1. Prerequisites

* Node.js ≥ 22.19 (the plugin is built with TypeScript 5.9 and `tsdown`).
* No model, GPU or network access is needed: the published configurations use the deterministic
  `flag` judge, so the whole evaluation is a pure function of the corpus and the rule package.

```bash
cd plugins/wsgw-solution-review
pnpm install --ignore-scripts
pnpm run build          # produces lib/, which the evaluation imports
```

## 2. Regenerate the corpus

```bash
node scripts/eval/gen-synthetic.mjs --out ../../paper/data/public/synthetic
```

Deterministic for the default seed (`20261029`): 100 proposals, 253 planted defects over the 23
verifiable rules (98 absent, 37 negated, 52 placeholder, 66 keyword-present-but-empty). The same
command writes `selfcheck.json`, which reports `"violations": []` and the per-kind detection table
used in the paper.

## 3. Run the ablation

```bash
node scripts/eval/run-ablation.mjs --out out --repetitions 3
```

| Configuration | P | R | F1 [95 % CI] | R<sub>w</sub> | Acc. | mF1 | κ | κ<sub>w</sub> |
|---|---|---|---|---|---|---|---|---|
| B0 keyword | 0.275 | 0.186 | 0.222 [0.176, 0.267] | 0.162 | 28.0 % | 0.275 | −0.043 | −0.059 |
| S-full | 1.000 | 0.664 | 0.798 [0.762, 0.836] | 0.649 | 85.0 % | 0.832 | 0.763 | 0.739 |
| S-verifier | 1.000 | 0.664 | 0.798 [0.762, 0.836] | 0.649 | 85.0 % | 0.832 | 0.763 | 0.739 |

Wall clock for the nine runs: about 15 s. The three repetitions of each configuration produce
identical metrics, so the bootstrap intervals resample proposals, not repetitions.

## 4. What is not reproducible offline

`paper/data/public/skipped.json` records the four configurations that need either a model adapter
(`B1` whole-document prompting, `S-gate` gate disabled, `S-policy` model-written verdict) or online
expert feedback (`S-memory`). Supplying an adapter is a matter of implementing the small interface in
`scripts/eval/common.mjs` (`loadAdapter`) and passing `--adapter`.

## 5. Table and figure provenance

| Paper element | Source |
|---|---|
| Table 4 (package composition) | `plugins/wsgw-solution-review/rules/capability-open-access.rules.yaml` |
| Table 8, Figure 3 (issue- and verdict-level results) | `eval-runs/*.json` → `metrics` |
| Table 9 (per tier and severity) | `eval-runs/*.json` → `perRule` grouped by `tier` / `severity` |
| Table 10, Figure 4 (per planted kind) | `synthetic/selfcheck.json` → `detection`, and `perSolution` |
| Table 11 (minor threshold) | rerun `run-ablation.mjs --minor-threshold 1|2|3|4` |
| Table 12 (end-to-end case) | `synthetic/solutions/syn-hist-30.md` and the matching `perSolution` entry |

## 6. Pilot statistics

The five internal runs reported in the pilot subsection live in the harness' storage domain
(`wsgw_solution_review.json`: tables `reviews`, `issues`, `feedback`, `exemplars`), not in this
repository, because the proposals are internal documents. The aggregate counts quoted in the paper
(58 findings, 40 verifier-located, 12 model-judged, 6 operator-added, 3 gate refusals, 18 decisions,
13 rules with statistics, 21 exemplars) are reproducible from that file with any JSON reader; the
schema is documented in `plugins/wsgw-solution-review/docs/design.md` §6–§7.

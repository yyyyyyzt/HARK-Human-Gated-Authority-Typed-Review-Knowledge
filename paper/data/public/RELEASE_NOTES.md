# HARK v1.0.0 — artifact for the *Computers* (MDPI) submission

HARK (Human-Gated Authority-Typed Review Knowledge) is a plugin for an open-source conversational
agent harness that performs preliminary review of technical solution proposals.

**What the review does.** Every rule carries a type that decides who may conclude it:

| Tier | Verifier | Who may raise a finding |
|---|---|---|
| `hard` | required, decisive | only the verifier (LLM may rephrase, never assert) |
| `hybrid` | required | verifier locates candidate spans, LLM judges inside them only |
| `soft` | forbidden | LLM may raise; always pending, never counted |

A tool-side evidence gate refuses any finding whose quote cannot be located in the document, so a
finding is either anchored or downgraded to *pending*. A deterministic policy turns the confirmed set
into the suggested verdict (Fail on a blocker, Revise on a major or enough minors, Pass otherwise);
only the expert writes the final verdict. Expert decisions form an audited learned layer that retunes
parameters and collects phrasing exemplars but never promotes a rule's tier.

**What is in the release.**

* the plugin: engine, tools, storage domain, dashboard and the review preset (`plugins/hark/`);
* the shipped rule package — 28 rules (10 hard, 13 hybrid, 5 soft), six declarative verifier families,
  a 25-family cue lexicon (`plugins/hark/rules/capability-open-access.rules.yaml`);
* the evaluation corpus — 100 proposals with 253 planted defects, ground truth, generator manifest and
  the generator's self-check output (`paper/data/public/synthetic/`);
* the nine published runs (3 configurations × 3 repetitions) as raw JSON (`paper/data/public/eval-runs/`);
* the ablation runner and corpus generator (`plugins/hark/scripts/eval/`);
* the manuscript source in the MDPI *Computers* template (`paper/mdpi-article/`).

**Headline numbers** (deterministic configurations, 100 proposals, 253 planted defects):

| Configuration | P | R | F1 [95% CI] | R_w | Verdict acc. | κ |
|---|---|---|---|---|---|---|
| B0 keyword | 0.275 | 0.186 | 0.222 [0.176, 0.267] | 0.162 | 28.0% | −0.043 |
| S-full | 1.000 | 0.664 | 0.798 [0.762, 0.836] | 0.649 | 85.0% | 0.763 |

Reproduce with `pnpm install && pnpm run build` then
`node plugins/hark/scripts/eval/run-ablation.mjs --repetitions 1` (see `REPRODUCE.md`).

Licence: MIT. The synthetic corpus is generated; the historical expert opinions behind the internal
pilot cannot be released for confidentiality.

# Ablation summary

- dataset: `synthetic-v1-seed20261029-n2000` (2000 solutions)
- rule pack: `capability-open-access.rules.yaml` (28 rules)
- judge: `flag` / model `none`; repetitions 1; minorThreshold 3
- generated: 2026-11-06T02:14:39.850Z in 107.9 s
| 配置 | judge | 重复 | P | R | F1 (95% CI) | R_w | 结论准确率 | 宏 F1 | κ | κ_w | 证据有效率 | 待人工覆盖 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| B0 | flag/none | 1 | 0.274 | 0.164 | 0.205 [0.193, 0.215] | 0.155 | 37.2% | 0.348 | 0.034 | 0.031 | 100.0% | 0.0% |
| S-full | flag/none | 1 | 1.000 | 0.595 | 0.746 [0.736, 0.755] | 0.578 | 75.3% | 0.747 | 0.632 | 0.595 | 74.4% | 80.8% |
| S-verifier | flag/none | 1 | 1.000 | 0.595 | 0.746 [0.736, 0.755] | 0.578 | 75.3% | 0.747 | 0.632 | 0.595 | 74.4% | 80.8% |
| B1 | — | 0 | skipped: requires llm adapter (--adapter <module>) | | | | | | | | | |
| S-gate | — | 0 | skipped: requires llm adapter (--adapter <module>) | | | | | | | | | |
| S-policy | — | 0 | skipped: requires llm adapter (--adapter <module>) | | | | | | | | | |
| S-memory | — | 0 | skipped: online-only: no expert feedback in an offline dataset | | | | | | | | | |

与 S-full 的配对比较（按方案配对；Wilcoxon 符号秩检验用于问题级 F1，McNemar 用于结论正误；Holm 校正）：

| 配置 | ΔF1 | Wilcoxon p | McNemar b/c | McNemar p | Holm p (W) | Holm p (M) |
|---|---|---|---|---|---|---|
| B0 | -0.505 | 0.000 | 987/224 | 0.000 | 0.000 | 0.000 |
| S-verifier | +0.000 | 1.000 | 0/0 | 1.000 | 1.000 | 1.000 |


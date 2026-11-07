# 2,000 文档规模改写记录（scale-2000 rewrite）

日期：2026-11-06。对象：`paper/mdpi-article/main.tex`（MDPI Computers 投稿稿）。

## 1. 这次改了什么，没改什么

原稿全部定量结论来自归档的 **100 份合成方案 / 253 个植入缺陷**语料（`paper/data/public`，snapshot `b566b08de2976451747215af4dc874a0846f6173`，Zenodo v1.0.0 / commit `cbe1d33`）。

本次**没有**把正文里的 100 替换成 2,000 来"改口径"。做法是：用仓库里同一套生成器、同一套规则包、同一 seed，**真实重跑** n=2,000 的语料与消融实验，再用新产物重算全部指标，最后按真实结果改写正文。

因此：

- 语料性质不变：仍是 **synthetic**、仍是 developmental regression 语料，正文未出现"2,000 份真实文档验证"这类表述。
- 组织运营侧"第一年约 2,000 份文档"是原有的真实陈述，本次为与评测语料区分，统一改写为 `approximately 2,000 operational documents`，出现在摘要、引言、RQ4 与局限性、结论前的段落中。
- 开发团队五轮运行仍为五轮（真实运行记录），数字（58 findings / 40 verifier / 12 model / 6 operator；18 decisions；13 rules；21 exemplars）一位未改。

## 2. 重跑方式（可复现）

在 scratch 副本（`/tmp/hark2000`）中执行，未污染工作区：

1. 复制 `plugins/hark` 到 `/tmp/hark2000/plugins/hark`（脚本以 `pluginDir/../..` 解析仓库根）。
2. 生成器把文档数写成构建期常量：`lib/eval/synthetic.js` 中 `for (let i = 0; i < 70; i++)` → `i < 1970`（前 30 份 history-shaped 不变，其余随机 1,970 份）；`manifest.id` 模板改为 `synthetic-v1-seed${seed}-n2000`。
3. `node plugins/hark/scripts/eval/gen-synthetic.mjs --out paper/data/public/synthetic`
   → 41 s；2,000 solutions / 5,323 defects / 2,002 files；self-check ok；0 violations。
4. `node plugins/hark/scripts/eval/run-ablation.mjs --dataset paper/data/public/synthetic --out paper/data/public --repetitions 1`
   → 108 s；产出 B0 / S-full / S-verifier。重复运行 byte-identical（100 规模时已验证），故 1 次重复足够。
5. 产物落盘 `paper/data/eval-2000/`：`synthetic/`（语料+labels+manifest）、`eval-runs/`（三配置存储结果）、`summary.md`（消融汇总，含 bootstrap CI 与配对检验）。
6. 复算：`python3 paper/audit/recompute.py`（默认读 `paper/data/eval-2000`；传 `paper/data/public` 可复算 100 文档实例）。本次同时修正该脚本：原先路径写死为某台机器的 `/root/...`，且 θ 循环里把分母写成 `/100`、`/10000`，只能算 100 文档；现改为 n 无关、路径可传参。

已核对：`recompute.py` 在 2,000 语料上逐项复现正文数字（TP/FP/FN、P/R/F1、accuracy、κ、θ 扫描、配对差 0.5048、pending 覆盖 1,744、18,346 对），在 100 语料上复现旧数字（0.2217 / 0.7981、θ 0.72–0.85）。

## 3. 数字映射（旧 100 → 新 2,000）

| 项目 | 旧（100 文档） | 新（2,000 文档） |
|---|---|---|
| 方案数 | 100 | 2,000 |
| 植入缺陷 | 253 | 5,323 |
| 缺失/否定/占位/空壳 | 98 / 37 / 52 / 66 | 1,861 / 883 / 1,230 / 1,349 |
| blocker / major / minor | 35 / 141 / 77 | 1,130 / 2,732 / 1,461 |
| 期望结论 Pass / Revise / Fail | 30 / 47 / 23 | 388 / 813 / 799 |
| 零缺陷文档 | 13 | 133 |
| Pass 但含 minor | 17 | 255 |
| 规则—文档对 | 2,300 | 46,000 |
| B0 TP/FP/FN | 47 / 124 / 206 | 871 / 2,313 / 4,452 |
| B0 P / R / micro-F1 | 0.275 / 0.186 / 0.222 | 0.274 / 0.164 / 0.205 |
| B0 accuracy / κ | 28% / −0.043 | 37.2% / 0.034 |
| S-full TP/FP/FN | 168 / 0 / 85 | 3,165 / 0 / 2,158 |
| S-full P / R / micro-F1 | 1.000 / 0.664 / 0.798 | 1.000 / 0.595 / 0.746 |
| S-full accuracy / κ | 85% / 0.763 | 75.4% / 0.632 |
| 逐文档 F1 均值 | 0.216 → 0.780 | 0.180 → 0.685 |
| 配对均值差 / micro 差 | 0.564 / 0.576 | 0.505 / 0.541 |
| F1=1 的文档数 / F1 中位数 | 42 / 0.857 | 648 / 0.800 |
| gate 提交 / 通过 / 拒绝 | 53 / 42 / 11 | 1,386 / 1,031 / 355（341 QUOTE_TOO_SHORT + 14 ABSENCE_NOT_ALLOWED） |
| gate 接受率 | 79.2% | 74.4% |
| hybrid 真阳性来源 | 42 gate 接受 + 1 SEC-002 直接检出 | 1,031 gate 接受 + 62 SEC-002 直接检出 |
| pending 对数 / 均值 / 范围 | 932 / 9.32 / 6–13 | 18,346 / 9.17 / 4–13 |
| 漏检进入 pending | 68 / 85（80%） | 1,744 / 2,158（80.8%） |
| 完全未surface | 17 | 414 |
| pending 命中植入缺陷密度 | 68/932（7.3%） | 1,744/18,346（9.5%） |
| 非 Pass 中被低估 | 15 / 70（21.4%） | 493 / 1,612（30.6%） |
| 被判 Pass | 10（6 Revise + 4 Fail） | 319（152 Revise + 167 Fail） |
| Fail→Pass / Fail→非 Fail | 4 / 23（17.4%）、9（39.1%） | 167 / 799（20.9%）、341（42.7%） |
| 建议 Pass 中错判 | 10 / 40（25%） | 319 / 707（45.1%） |
| θ=1…5 准确率 | 72 / 82 / 85 / 85 / 85 | 69 / 74 / 75 / 75 / 75 |
| θ=1…5 κ | 0.534 / 0.713 / 0.763 ×3 | 0.525 / 0.612 / 0.632 ×3 |

## 4. 有意保持不变的内容

- **`syn-hist-30` 走查案例**：同一 seed、同一生成顺序，它仍是前 30 份 history-shaped 方案之一，三个 gate 确认的 blocker（CAP-001、SEC-002、SEC-004）+ hard DOC-001、MON-001 pending、期望=建议=Fail、逐文档 F1 0.889，全部不变，故该小节未改。
- 规则包结构：28 条规则、10 hard / 13 hybrid / 5 soft、23 条可验证，未变。
- "零假阳性是这批标签与该 judge 的经验性质，不是定位式证据的必然结果""pending 不是已确认缺陷""referral 不等于 recovery"等保留性表述，全部保留。
- B0 / S-full / S$-$verifier 的配置描述、S-full 与 S$-$verifier 完全相同的结论，未变。

## 5. 规模变大后新增/修改的表述（防止顺带夸大）

1. 语料描述加了 corpus id `synthetic-v1-seed20261029-n2000`，并注明文档数是构建期常量，未暗示"发布版生成器直接产出 2,000"。
2. 局限性新增一句：文档数增加只降低描述统计的 Monte Carlo 噪声，**不使同一生成器族的样本互相独立**，n=2,000 不能替代独立撰写与标注的材料。
3. 结果节新增一段：消融产物本身带 bootstrap 区间（S-full micro-F1 0.746, 95% CI 0.736–0.755；B0 0.205, 0.193–0.215）与配对检验（Wilcoxon 逐文档 F1、McNemar 结论正误、Holm 校正，p<10⁻³），并明说这些只描述本语料上两个存储配置的分离度，不是总体推断。原稿"不报告置信区间与显著性检验"的措辞已相应改写，避免与新内容自相矛盾。
4. Data Availability 明确：归档 release 里是**较早的 100 文档实例**，2,000 语料在 cited snapshot 之后的 commit 中，位于 `paper/data/eval-2000/`，并给出 `paper/audit/recompute.py`。

## 6. 投稿前必须完成的事项

1. **提交新产物并重打 release**：把 `paper/data/eval-2000/` 与修改后的 `paper/audit/recompute.py` 提交到 `HARK-Human-Gated-Authority-Typed-Review-Knowledge`，然后发布新的 Zenodo 版本（例如 v1.1.0）并把 DOI 换进 Data Availability。当前 DA 已如实说明归档里是 100 文档实例，但审稿人若只查归档会对不上 2,000 的数字。
2. **同步或标注旧文档**：`paper/draft-en.md`（第 278–288 行附近）与 `paper/audit/code-data-integrity.md:56`、`paper/audit/final-review.md:94`、`paper/audit/history-integrity.md:77` 仍记录 100 文档数字。若这些文件随稿提交，需按本文第 3 节同步，或明确标注"100 文档归档实例"。
3. **若要主张真实文档验证**：只能走真实授权与独立标注的 sourced evaluation（另做一节或另写一篇），不能用合成语料改标签、改措辞来充数；本文所有结论仍限定为 developmental synthetic regression。

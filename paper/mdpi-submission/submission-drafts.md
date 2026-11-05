# MDPI *Computers* 投稿操作稿

> 对应稿件：`paper/mdpi-article/main.tex`（2026-11-05 修订稿，23 页 A4，41 条内联文献）。
> 本文件只写「在投稿系统里怎么填、传什么、还差什么」，不再承担论文内容说明；
> 正式 cover letter 见同目录 `cover-letter.md`，中文译述见 `zh-translation.md`。
> MDPI 一稿多投禁止：同一时间只投 *Computers* 一处。

## 1. Section 与 Topic

**Section**：`AI-Driven Innovations`。其余五个 Section 明确错位——Blockchain、Cloud Continuum、Human–Computer Interactions、ICT Infrastructures for Cybersecurity、IoT and Industrial IoT。本稿贡献是 LLM agent 的评审知识表示与治理（操作权限分型、定位证据门禁、确定性结论策略、可追溯的处置记录），属 AI 方法与系统，`AI-Driven Innovations` 是唯一自然归属。

**Topic**：首选 `AI Agents: Progress, Architecture, and Applications`，次选 `AI-Driven Software Engineering and Next-Generation Web Services`。

| Topic scope 原文 | 本稿对应 |
|---|---|
| LLM-driven agent architectures | 宿主扩展包：工具组 + storage domain + 面板，§3.8 |
| planning / reasoning / decision-making | 三阶段协议；建议结论由确定性策略从已确认集合推出，§3.5 |
| tool use / memory / RAG | 证据门禁在工具侧强制；决策记录按规则号存储，不做向量检索，§3.4–3.6 |
| evaluation of agentic systems | 100 份合成方案 / 253 处植入缺陷，P/R/F1/κ 与阈值敏感性，§4 |
| human–agent collaboration | 模型不能声称缺失、不能写最终结论；审批与权限上限作为目标契约如实标注，§3.7 / §6 |

Topic 选填（下拉含 "None"）；选 Topic 只是让同主题编辑看到，不影响送审。

## 2. Cover letter

用 `cover-letter.md` 的正文原样粘贴。要点顺序：问题 → 论文做了什么 → 有界证据（168/0/85、0.798 vs 0.222、85%、κ 0.763，以及 68/85 转待处理、4/23 Fail→Pass、42/53 门禁）→ 为何适合 *Computers* → 可复现与声明。

三条不要写进去：不要写「零误报证明证据门禁有效」（正文明确说这是该标签与该判断者的经验结果）；不要写「人在闸门内/已实现审批」（认证式审批是目标契约）；不要写推荐审稿人（系统里另填，可留空）。

## 3. 稿件上传

- 主文件用 **LaTeX ZIP**：`main.zip`（19 个文件，含 `Definitions/`、`main.tex`、`main.pdf`、修订记录）。编辑部与排版编辑要能用 `pdflatex` 重编译；本机与 Tectonic 0.17.0 均验证 23 页、0 error、0 Overfull。
- 若赶时间可走 **Free Format Submission**（只传 `main.pdf`），但会失去模板声明区格式，不推荐。
- 摘要 191 词（MDPI 建议约 200，已达标）；关键词 7 个；正文 7 节、12 表、2 幅 TikZ 图、1 段算法伪代码。
- 模板字段 `\articlenumber{0}`、卷期、收稿/修回/录用日期保持默认，由编辑部填写。
- 作者区已是真值：7 位作者、单一单位、通讯作者邮箱与 ORCID 0009-0002-1803-1529；其余 6 位不显示空 ORCID 图标。
- 声明区七项均为真值（CRediT 14 项、no external funding、IRB/Informed Consent Not applicable、Data Availability 含快照 `b566b08` 与 Zenodo DOI、Generative AI 披露、无利益冲突并披露全员隶属被评审组织）。CRediT 已按作者确认的分工重排：Z.Y. 主导；K.W./Q.W. 为 Validation；H.W. 另担 Resources 与 Supervision；其余作者仅审阅。投稿前请每位作者确认自己的角色。

## 4. Supplementary File(s)

单个 ZIP，≤ 250 MB。建议内容与 caption：

- `paper/data/public/synthetic/`（100 份合成方案、`truth.json`、`manifest.json`、`selfcheck.json`）
- `paper/data/public/eval-runs/*.json`（九个确定性运行）与 `paper/data/public/summary.md`
- `plugins/hark/scripts/eval/*.mjs`（生成器、消融、脱敏）
- `plugins/hark/rules/capability-open-access.rules.yaml`（28 条规则包）
- `REPRODUCE.md`（英文复现说明）

```
Supplementary material for "HARK: Authority-Typed Review Knowledge for
Evidence-Bearing Document Review".

Contents: (i) the synthetic corpus of 100 technical solution proposals with
253 planted defects over 23 verifiable rules, the generator seed (20261029),
the planted-defect ground truth and the generator self-check; (ii) the stored
deterministic ablation outputs behind the results table, including the keyword
baseline B0 and the combined configuration S-full; (iii) the corpus generator,
ablation runner and anonymiser, and the shipped 28-rule package (10 hard,
13 hybrid, 5 soft); (iv) REPRODUCE.md with the exact commands and the adapter
interface for model-based configurations. No personal or organisational data
is included; the corpus is fully synthetic.
```

## 5. Copyright permission

正文图（Fig. 1–2）为作者自绘 TikZ，表 1–12 为自有数据与自有归纳，无第三方复现材料 → 版权项勾 "not applicable"，表单备注：

> All figures and tables are original and created by the authors; no third-party material is reproduced.

`main.tex` 自带的 MDPI 版权声明行保持模板默认。

## 6. Graphical abstract

- 文件：`graphical-abstract.png`（1100 × 560 px，200 dpi），源文件 `graphical-abstract.tex`。
- 已按修订稿口径更新：不再声称 "human-gated learning" 或 "audited, reversible"，改为「规则分型 → 校验器定位 → 证据门禁 → 确定性建议 → 专家处置并留存决策记录」，底部四条改为可被正文支撑的表述。
- 重生成：`pdflatex graphical-abstract && pdftoppm -r 200 -png -singlefile graphical-abstract.pdf graphical-abstract`。

## 7. 图表清单

| 项 | 现状 | 投稿动作 |
|---|---|---|
| Fig. 1 架构与反馈流 | `main.tex` 内 TikZ，矢量 | 随主文件编译；无需单传 |
| Fig. 2 操作路径与边界 | 同上 | 同上 |
| Table 1–12 | 纯 LaTeX | 随主文件 |
| 图形摘要 | 1100 × 560 PNG | 表单单独上传 |

图内字号 ≥ 6 pt、线宽 ≥ 0.5 pt；位图 ≥ 1100 px 宽 / 300 dpi；单图 ≤ 20 MB。

## 8. 投稿前仍需人工确认

1. **CRediT 逐条确认**（`main.tex` 的 `Author Contributions`）：Z.Y. 主导概念、方法、软件、分析、调查、数据、初稿、可视化与项目管理；K.W./Q.W. 为 Validation；H.W. 另担 Resources 与 Supervision；其余作者仅 Writing—Review & Editing。请每位作者确认自己的角色。
2. **Zenodo 元数据**：正文如实写归档提交 `cbe1d33`，快照在其后三个提交（DOI 写入、引语校验、发布说明），数据逐字节一致。归档文件不可改，但已发布记录的元数据需在原记录上更正（保留 DOI）；默认不发 v1.1.0。
3. **MON-001 / DOC-001 / hard 谓词**：由领域负责人复核（正文已把 hard 定位为「当前解析器可见的代理」，不是业务充分性判定）；若改谓词或标签，第 4 节全部数字需重算，不能沿用。
4. **建议审稿人**（可选）：3 位、近三年无合作、不同机构；留空不影响送审。
5. **投稿系统字段**：Funding 填 "This research received no external funding."；Data Availability 填仓库 + DOI；AI 使用按稿件披露口径填写。

## 9. 中文材料

`zh-translation.md` 是用稿中文译述（标题、摘要、方法、结果数字、局限与结论），供内部审阅与单位备案，不是投稿件。正式提交一律用英文 `main.tex` / `main.pdf`。

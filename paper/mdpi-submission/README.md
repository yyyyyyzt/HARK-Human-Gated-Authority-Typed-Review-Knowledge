# 投稿系统材料（MDPI *Computers*）

本目录是**投稿操作面**：投稿系统里要填的字段、要上传的说明文件、要贴的 cover letter 文本、
以及给作者与单位备案用的中文译述。稿件本体不在这里——权威源文件是
[`../mdpi-article/main.tex`](../mdpi-article/main.tex) 与 [`../mdpi-article/main.pdf`](../mdpi-article/main.pdf)。

> 目标：*Computers*（ISSN 2073-431X，EI/Compendex），Section **AI-Driven Innovations**，
> Topic 首选 **AI Agents: Progress, Architecture, and Applications**。一稿多投禁止。

## 文件与用途

| 文件 | 用途 | 状态 |
|---|---|---|
| [`cover-letter.md`](cover-letter.md) | 投稿系统的 cover letter 正文（英文），含贡献、有界证据与 target contracts 声明 | 2026-11-05 按 23 页修订稿重写；**发布前须作者通读**，尤其不要改回旧题的「human-gated」表述 |
| [`submission-drafts.md`](submission-drafts.md) | 上传清单、Section/Topic 对齐、补充材料 caption、图形摘要说明、三条禁写、投稿前人工确认项 | 与修订稿同步 |
| [`zh-translation.md`](zh-translation.md) | 修订稿的中文逐节压缩译述（含全部结果数字与新口径），供内部审阅与单位备案 | **非投稿件**；正式投稿只用英文 |
| [`graphical-abstract.tex`](graphical-abstract.tex) / [`graphical-abstract.png`](graphical-abstract.png) | 图形摘要（1100×560 PNG，投稿系统单独上传） | 2026-11-05 重新生成：`Typed rules, located evidence, accountable disposition` |
| [`journal-style-survey.md`](journal-style-survey.md) | 8 篇 *Computers* 高被引论文的版式/体量基准与逐项对照 | 已按 23 页稿更新对照数字 |
| [`style-samples/`](style-samples/) | 采样 PDF、抓取脚本与指标 JSON（survey 的证据） | 存档 |

## 上传时用到的具体数字（与稿件一致）

- 稿件：**23 页 A4**，摘要 **191 词**，7 个关键词，7 个一级节，**12 张表、2 幅 TikZ 图**、1 段算法伪代码，**41 条**内联参考文献（ACS 数字制，按首引顺序 1–41）。
- 源码包：`../mdpi-article/main.zip`，**19 个文件**（含 `Definitions/`、`main.pdf`、修订记录），可直接上传。
- 正文关键结果：micro-F1 **0.798**（B0 关键词 **0.222**），TP/FP/FN **168/0/85**（B0 **47/124/206**），结论一致率 **85%**（κ **0.763**），68/85 漏检转待处理，门禁接受 **42/53**，23 份期望 Fail 中 **4** 份被判 Pass，θ=3。
- 规则包：28 条 = 10 hard + 13 hybrid + 5 soft；4 条 blocker 全为 hybrid。

## 三条禁写（防夸大）

1. 不写「零误报证明门禁可靠」——零 FP 是该标签与该判断者上的观察属性，不是定位证据的必然结果；42/53 是门禁接受率，不是语义证据有效率。
2. 不写「已实现认证式人工批准 / 完整有效权限 / 内容寻址恢复」——这三项是 **target contracts**，摘要、§3.7、§5、§6 都明确未实现。
3. 不写「独立专家验证、学习增益、跨文档族泛化」——五轮运行是三份内部方案上的开发团队工作流证据，仅两次到达最终结论。

## 投稿前仍需人确认

1. **CRediT 14 项逐条**是否与实际相符（`main.tex` 声明区；尤其 Software 只给 Z.Y.，Supervision 给 D.J. 与 H.W.）。
2. **Zenodo 版本**：正文如实写「归档源码 v1.0.0 比引用快照早两个提交」。默认不发 v1.1.0；若发，新 DOI 要同步替换 Data Availability。
3. **MON-001 / DOC-001 / hard 谓词**的领域复核（§4.5 已把这些写成解析器可见代理，而非业务充分性判定）。
4. **建议审稿人**：cover letter 未列，投稿系统里按 MDPI 要求填写（避免与作者同机构、近三年合作者）。
5. 系统字段：文章号/卷期/日期留空由编辑部填写；版权协议选 CC BY 4.0；ORCID 仅通讯作者展示。

## 重新生成

```bash
# 图形摘要
pdflatex -interaction=nonstopmode graphical-abstract.tex
pdftoppm -r 200 -png -singlefile graphical-abstract.pdf graphical-abstract
# 稿件与源码包在 ../mdpi-article/，见该目录 README
```

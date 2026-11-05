# Zenodo：需要你做的唯一一件事

Zenodo 上已发布的记录 **23955205**（DOI `10.5281/zenodo.23955205`）里，**文件是对的，元数据是错的**：作者还是 `Author A`–`Author F`，标题和描述还是旧的 “human-gated / plugin” 口径。Zenodo 的归档文件不可修改，但**已发布记录的元数据可以在线更正，DOI 保持不变**。不需要发 v1.1.0。

本目录的文件：

| 文件 | 用途 |
|---|---|
| `metadata.json` | 所有字段的准确值（含 7 位作者、ORCID、单位、关键词、related identifier、notes） |
| `description.html` | 描述字段的 HTML 版，优先粘贴这个 |
| `description.txt` | 纯文本版；表单没有 HTML/源码模式时用这个 |
| `verify.sh` | 改完后运行，逐项核对公开 API 返回值 |

## 0. 先确认两件事

1. 用**创建该记录的 Zenodo 账号**登录（换账号会看不到 `Edit` 按钮）。
2. 打开 <https://zenodo.org/records/23955205>，确认右上/右侧有 **Edit**（铅笔）按钮。当前记录是 published、revision 3，没有未完成的 draft。

改之前留个底：

```bash
curl -sS https://zenodo.org/api/records/23955205 -o /tmp/zenodo-before.json
```

如果改坏了，`/tmp/zenodo-before.json` 里的 `metadata` 就是回滚依据。

## 1. 进入编辑

在记录页点 **Edit**。如果弹出 “You are about to edit a published record”，继续；DOI 不会变。

**不要点 “New version”。** 那会创建 v1.1.0 并生成新的版本 DOI，正文的 Data Availability 和 `CITATION.cff` 都要跟着改。

## 2. 逐字段替换

| 表单字段 | 填什么 |
|---|---|
| **Title** | `HARK: Authority-Typed Review Knowledge for Evidence-Bearing Document Review` |
| **Publication date** | 保持 `2026-11-04`（这是归档产物的发布日期，不要改成今天） |
| **Resource type** | 保持 `Software`（不要改成 Publication） |
| **Creators** | 删掉 `Author A`–`Author F`，按下面 7 行顺序添加 |
| **Description** | 切到 HTML / 源码模式，粘贴 `description.html`；没有源码模式就粘贴 `description.txt` 并保留空行 |
| **License** | 保持 `MIT` |
| **Keywords** | 7 个，逐条替换（见下） |
| **Version** | 保持 `1.0.0` |
| **Language** | `English` |
| **Related works** | 删除现有的 `.../tree/v1.0.0`，新增一条 `Is supplement to` → 归档提交 URL（见下） |
| **Notes**（若有该字段） | 粘贴 `metadata.json` 的 `notes` 值 |

### Creators（严格按此顺序）

| # | Family name | Given name | ORCID | Affiliation |
|---|---|---|---|---|
| 1 | Yang | Zhitong | `0009-0002-1803-1529` | State Grid Customer Service Center, Tianjin 300300, China |
| 2 | Wang | Kai | 留空 | State Grid Customer Service Center, Tianjin 300300, China |
| 3 | Wang | Qingxian | 留空 | State Grid Customer Service Center, Tianjin 300300, China |
| 4 | Li | Qi | 留空 | State Grid Customer Service Center, Tianjin 300300, China |
| 5 | Song | Lin | 留空 | State Grid Customer Service Center, Tianjin 300300, China |
| 6 | Jin | Dahai | 留空 | State Grid Customer Service Center, Tianjin 300300, China |
| 7 | Wang | Hong | 留空 | State Grid Customer Service Center, Tianjin 300300, China |

只有通讯作者 Yang, Zhitong 填 ORCID；其余六位留空，不要填占位符。

### Keywords（7 个）

```
large language models
document review
authority typing
evidence grounding
neuro-symbolic verification
human-in-the-loop
reproducibility
```

### Related works

- Relation：`Is supplement to`（API 值 `isSupplementTo`）
- Identifier：`https://github.com/yyyyyyzt/HARK-Human-Gated-Authority-Typed-Review-Knowledge/tree/cbe1d330c7b15cce278ca62f6dfb604a76489502`
- Resource type：`Software`
- Scheme：`URL`

现有那条 `.../tree/v1.0.0` 指向后来移动过的 tag（`c20f7fb`），不是 Zenodo 实际归档的提交（`cbe1d33`），所以应替换而不是保留。若表单不允许删除原条目，就新增 commit URL，并在 Notes 里说明 tag 已移动。

## 3. 发布这次元数据修改

点 **Publish**（不是 “Save draft”）。Zenodo 会提示这是对已发布记录的元数据编辑；**DOI、记录 URL、文件都不变**。

发布后刷新记录页，确认：

- 标题是新的；
- 作者是 7 位真名，第一位有 ORCID 链接；
- 描述里有 “prepared for submission” 和 “target contracts … not implemented”；
- Related works 指向 `cbe1d33`；
- 文件仍然只有一个，大小 1,814,296 B。

## 4. 跑核对脚本

```bash
cd paper/zenodo
chmod +x verify.sh
./verify.sh
```

全部 `OK` 即完成；有 `FAIL` 按提示回到表单对应字段。脚本只读公开 API，不需要 token。

## 5. 不要做的事

- **不要**点 “New version”（会生成新 DOI）。
- **不要**删除或替换归档 zip（文件是 v1.0.0 的字节，删了就无法恢复）。
- **不要**改 Resource type、License、Version、Publication date。
- **不要**改 DOI 或 concept DOI。
- **不要**在 GitHub 上重新打 `v1.0.0` tag；tag 已经移动过一次，再动只会让 provenance 更乱。

## 6. 改完之后

- GitHub 仓库里的 `.zenodo.json` 已经同步成同一套元数据，但它只影响**未来**的归档，不会回溯这条记录。
- 正文、`CITATION.cff`、README 的 DOI 都不需要改。
- 如果以后要发新版本，再走 “New version”，届时才需要同步替换 Data Availability 里的 DOI。

## 备注：为什么不在这个仓库里用 API 自动改

编辑已发布记录需要 owner 的 `deposit:write` token，而且 Zenodo 对已发布记录走的是 draft → publish 流程；在没有你的 token、也无法先在一份一次性记录上验证的情况下，给一个未测试的 `PUT` 脚本风险高于收益。上面的 UI 路径是 Zenodo 官方支持、可回滚的路径；`verify.sh` 负责把“改没改对”变成可执行的检查。

# Release status

* **GitHub repository:** <https://github.com/yyyyyyzt/HARK-Human-Gated-Authority-Typed-Review-Knowledge>
* **Release `v1.0.0`:** published; **DOI `10.5281/zenodo.23955205`** (all-version DOI `10.5281/zenodo.23955204`),
  badge `https://zenodo.org/badge/1445355414.svg`.
* The DOI is already wired into `\dataavailability` of `paper/mdpi-article/main.tex`, the README badge and
  `CITATION.cff`, so nothing else is pending on the artifact side.

## Still to fill before submission (human data)

* authors A–F → real names, one affiliation, six e-mails, six ORCIDs (`\Author`, `\address`, `\corres`);
* `CRediT` block in `Author Contributions` (currently per-role placeholders);
* `Funding` line if a grant applies (currently "no external funding");
* `CITATION.cff` / `.zenodo.json` → the same names and ORCIDs;
* Suggested reviewers: not needed, the field can stay empty in the MDPI form.

## 4. 已发布版本与 main 的差异

- 归档 release：`v1.0.0` → commit `c20f7fb`（Zenodo DOI `10.5281/zenodo.23955205`）。
- `main` 在其后有提交（权限闸门 `AUTHORITY_UNCONFIRMED`、checklist 通道、文档更新）。若要冻结一份与稿件完全一致的归档，
  请在 GitHub 发布 `v1.1.0` release，Zenodo 会生成新 DOI；拿到后替换稿件 `\dataavailability` 与 README 徽章。

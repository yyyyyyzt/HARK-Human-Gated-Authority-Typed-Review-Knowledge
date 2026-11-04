# Release status

* **GitHub repository:** created — <https://github.com/yyyyyyzt/HARK-Human-Gated-Authority-Typed-Review-Knowledge>
  (`main` pushed, tag `v1.0.0` pushed).
* **Zenodo:** still needs one click — publishing the GitHub release mints the DOI.

## What is left (1 click, needs the Zenodo-linked GitHub account)

1. Open <https://github.com/yyyyyyzt/HARK-Human-Gated-Authority-Typed-Review-Knowledge/releases/new?tag=v1.0.0>
2. Title: `HARK v1.0.0 — artifact for the Computers submission`
3. Paste the body from `paper/data/public/RELEASE_NOTES.md` (or just `git log --oneline` output).
4. **Publish release.** Zenodo archives the tag and mints a DOI within a minute; the DOI appears at
   <https://zenodo.org/account/settings/github/> next to the repository, and as a badge on the GitHub release.
5. Send the DOI back: it goes into `\dataavailability` of `paper/mdpi-article/main.tex` and the badge line
   of `README.md` (both currently carry the literal string `PLACEHOLDER`).

## Still to fill before submission (human data)

* authors A–F → real names, one affiliation, six e-mails, six ORCIDs (`\Author`, `\address`, `\corres`);
* `CRediT` block in `Author Contributions` (currently per-role placeholders);
* `Funding` line if a grant applies (currently "no external funding");
* `CITATION.cff` / `.zenodo.json` → the same names and ORCIDs;
* Suggested reviewers: not needed, the field can stay empty in the MDPI form.

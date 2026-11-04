# Release checklist (what a human has to do)

Two steps need account access; everything else is prepared.

## 1. Create the GitHub repository (1 click)

Option A — web: <https://github.com/new>, name `arbiter`, owner `yyyyyyzt`,
**empty** (no README, no licence), visibility public.

Option B — give the agent a token with `repo` scope and it creates the repo and pushes:

```bash
curl -s -H "Authorization: token $GH_TOKEN" https://api.github.com/user/repos \
  -d '{"name":"arbiter","private":false,"description":"Artifact: verifiability-typed review knowledge for LLM-assisted solution review"}'
```

Then, from this directory:

```bash
git push -u origin main --tags          # origin = git@github.com:yyyyyyzt/arbiter.git
```

## 2. Mint the DOI on Zenodo (2 clicks, needs the Zenodo login)

1. Log in at <https://zenodo.org> with the GitHub account (Settings → GitHub → grant access).
2. In <https://zenodo.org/account/settings/github/>, flip the switch for `yyyyyyzt/arbiter`.
3. On GitHub, publish a release `v1.0.0` (or run `gh release create`); Zenodo archives that release
   and mints a DOI within a minute. Copy the DOI.
4. Paste the DOI into the paper (`\dataavailability`) and into the badge line of `README.md`.

Alternative without GitHub: Zenodo → *New upload* → drop `arbiter-v1.0.0.tar.gz`,
metadata is already in `.zenodo.json`, then *Publish*.

## 3. Fill the placeholders in the paper

* authors A–F → real names, one affiliation, six e-mails, six ORCIDs;
* `Data Availability` → repository URL + DOI;
* `CITATION.cff` / `.zenodo.json` → same names and ORCIDs.

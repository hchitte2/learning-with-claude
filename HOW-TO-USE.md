# How to Use This Repo

My daily routine for learning with Claude Code, and for saving my progress to GitHub.

## Every day: one lesson (about 20 minutes)

**1. Open Terminal and go to your topic folder**
```bash
cd ~/learning-with-claude/p1-it-terms
```

**2. Start Claude**
```bash
claude
```

**3. Start the lesson**
Type `/teach` and press **Enter**. It remembers where you stopped last time.

**4. Answer its questions**
Use the **↑ ↓** arrow keys to pick an answer and **Enter** to choose.

**5. Open the lesson**
Type **"open the lesson"**. It opens in your browser. Read it and do the quiz **without looking back**.

**6. Ask questions any time**
Type them in the terminal. If an answer confuses you, type `/wait-what` and Claude explains it more simply.

**7. Save your work to GitHub**
Type **"commit and push my progress"**. This is what builds your daily history on GitHub.

**8. Exit**
Type `/exit`.

## Starting a new project

Open the plan to find the next project's folder name and its `/teach` prompt:
```bash
code ~/learning-with-claude/ITHENA-LEARNING-PLAN.md
```
Then create the folder and start Claude in it, for example:
```bash
cd ~/learning-with-claude
mkdir p2-kpis
cd p2-kpis
claude
```
Paste that project's `/teach` prompt from the plan.

## Finishing a project

1. Practise like an interview: `/grill-me Ask me what an Ithena reviewer would ask about Project 2`
2. Then type **"tick Project 2 in the plan, update the README, commit and push"**.

## Check your progress

Open [github.com/hchitte2/learning-with-claude](https://github.com/hchitte2/learning-with-claude). Each day you push shows up as a commit.

## If you want to push without Claude

```bash
cd ~/learning-with-claude
git add -A
git commit -m "p1: finished lesson 2"
git push
```

## My skills at a glance

| Type this | When |
|---|---|
| `/teach` | Every day, to learn |
| `/wait-what` | You didn't understand Claude's answer |
| `/grill-me` | Practising for questions about a project |
| `/handoff` | You must stop in the middle and continue later |
| `/exit` | Done for today |

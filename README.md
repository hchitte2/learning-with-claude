# Learning with Claude

My learning workspace. I use [Claude Code](https://claude.com/claude-code) as a tutor with the [`/teach` skill](https://github.com/mattpocock/skills/tree/main/skills/productivity/teach): each session is one short lesson with a quiz, and the files here record what I've learned over time.

## Topics

Each topic has its own folder.

| Topic | Started | Why |
|-------|---------|-----|
| *First topic coming soon* | | |

## What's in a topic folder

These files are created by `/teach` as I learn, so a new topic starts empty.

| Path | What it is |
|------|------------|
| `MISSION.md` | Why I'm learning this topic and what success looks like |
| `lessons/` | One short lesson per session, with a quiz |
| `reference/` | Cheat sheets distilled from the lessons |
| `learning-records/` | What I've actually mastered, in order |
| `RESOURCES.md` | The trusted sources the lessons are based on |
| `GLOSSARY.md` | Terms I've learned, defined in my own words |

## How a session works

1. Open Claude Code in the topic folder: `cd <topic> && claude`.
2. Run `/teach` and work through the lesson and its quiz, asking follow-up questions as I go.
3. Save progress: `git add -A && git commit -m "<topic>: <what I learned>" && git push`.

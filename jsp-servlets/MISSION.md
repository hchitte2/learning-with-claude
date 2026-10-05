# Mission: JSP, Servlets and JDBC

## Why
Ithena is assessing me for a role, and I will walk them through my Project 5 JSP login app on a screen share, then answer their questions. The code was drafted with Claude Code, so I need to understand it well enough to explain every part as my own, without notes, and defend its design choices.

## Success looks like
- I can narrate what happens when a user clicks Log in, from the browser to the database and back, naming the file that handles each step.
- I can explain what Tomcat, a servlet, a JSP, JDBC, a session, and a filter are, using my own code as the example.
- I can answer "why did you build it this way?" for the main design choices: MVC, JSPs under `WEB-INF`, `PreparedStatement`, password hashing and reset, sessions and POST logout, H2 instead of an ODBC DSN.
- I can answer Project 5's four "Explain it" questions in [ITHENA-LEARNING-PLAN.md](../ITHENA-LEARNING-PLAN.md) out loud, without notes.
- I can start the app locally and demo every page: register, log in, landing page, forgot password, log out.

## Constraints
- About two weeks: the walkthrough is by roughly 18 October 2026 (exact date to confirm), and eight other Ithena projects share that time.
- Two to three sessions of about 20 minutes for this project, per the learning plan.
- New to Java, HTTP, and SQL, so each lesson builds these only as far as the Project 5 code needs.

## Out of scope
- Writing a new JSP/Servlet app from scratch, or live-coding changes.
- Spring, Spring Boot, JSF, and other frameworks.
- General Java mastery beyond reading this code (streams, concurrency, advanced generics).
- The app's CSS and JavaScript. The other Ithena projects have their own topic folders.

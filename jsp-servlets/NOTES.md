# Teaching notes

## Learner and context
- New to Java, HTTP, and SQL (self-reported 2026-10-04). See [learning-records/0001](learning-records/0001-starting-point.md).
- Ithena is a company assessing the learner for a role. Format: live screen-share walkthrough of the code plus a demo, then Q&A. Not live coding.
- Deadline: within two weeks of 2026-10-04 (about 2026-10-18). Ask for the exact date when it comes up.
- The code was drafted with Claude Code (the Ithena README says so in "How I Used AI"). Expect "why did you choose X?" questions; teach the reasoning, not only the mechanics.

## Where the code lives
- Repo: `~/Ithena_Intro_Assignment`. Source is on branch `feat/project-5-jsp-login` (also on `coding-projects`), latest commit `8786432`. On `main`, `Project_5_JSP_Login/` holds only build output (`target/`).
- Read files without switching branches: `git -C ~/Ithena_Intro_Assignment show feat/project-5-jsp-login:Project_5_JSP_Login/<path>`.
- Stack: Jakarta Servlet 6.1 (`jakarta.*`, not `javax.*`), Tomcat 11.0.26 run by the Cargo Maven plugin, JSTL 3.0, H2 2.x in MySQL mode, database file in `~/.jsp-login/`.
- Running it: the project needs JDK 17, but `java` on the PATH is 11. Use `JAVA_HOME=$(/usr/libexec/java_home -v 17) ./mvnw package cargo:run` from a checkout of the branch, then open http://localhost:8080/jsp-login.

## Things in the code to prepare the learner for
- `PasswordHasher.java` says `ITERATIONS = 210_000; // OWASP recommendation`, and the Project 5 README repeats 210,000. OWASP raised PBKDF2-HMAC-SHA512 to 220,000 on 2026-03-26 (see RESOURCES.md). Raise this in lesson 3 so the learner can answer it if asked, and decide whether to update the code.
- On 2026-10-04 the Project 5 branch was not on GitHub yet (the remote only had an older `main`). The learner's plan says it goes onto `main` with Monday's push.

## How to teach this learner
- Every example comes from the learner's own files (`LoginServlet`, `UserDao`, `login.jsp`, and so on), with file and line references.
- Layer colour code, used in every lesson and reference: browser blue, Tomcat slate, servlet ochre, JSP green, JDBC/database plum. Defined in `assets/course.css`.
- Each lesson ends with a "Say it to Ithena" rehearsal: a timed spoken answer to a likely interview question, checked against a checklist.
- Start each lesson after the first with a few retrieval questions from earlier lessons (spacing).

## The wider plan
- `../ITHENA-LEARNING-PLAN.md` (the learner's own plan, committed 2026-10-04) covers all nine Ithena projects. Project 5 is second, after Project 1. It budgets **2–3 sessions of about 20 minutes** per project, so keep this topic to three lessons.
- The plan names this folder `p5-jsp-login`; this workspace is `jsp-servlets`. Asked the learner whether to rename.
- The plan lists Project 5's "Master" and "Explain it" items. The lessons must cover all of them. Project 5 is done when the learner can answer the "Explain it" questions out loud without notes, then rehearse with `/grill-me`.
- When the project is done, the plan says to tick it in the plan, add the topic to the README's Topics table, then commit and push. Do that only when the learner asks.
- The plan says Projects 5 and 8 go onto `main` with Monday's push (2026-10-05).

## Lesson sequence (four lessons, about 20 minutes each)
Lesson 2 as first planned held seven ideas, too many for one sitting, so it was split on 2026-10-05. That makes four lessons, one more than the plan's "2–3 sessions".
1. **The login click**: HTTP request and response, the cast (Tomcat, servlet, JSP, JDBC), the five-step login journey. *Written 2026-10-04.* Covers plan question 1. **The learner marked it done on 2026-10-05; no quiz score or rehearsal result shared yet**, so no learning record has been written. Ask for the score, then use lesson 2's warm-up results as the evidence.
2. **How the app remembers who is logged in**: stateless HTTP, `JSESSIONID` and `HttpSession`, `getSession(true/false)`, `AuthFilter`, POST logout with `invalidate()`, the 30-minute timeout, and three protections: a new session at login (session fixation), `HttpOnly` plus `SameSite=Lax`, and POST logout plus `no-store`. Includes a browser lab using DevTools. *Written 2026-10-05.*
3. **How pages are built**: forward vs redirect (Post/Redirect/Get, the `/registered` one-time page), JSPs under `WEB-INF`, EL and JSTL basics, and `fn:escapeXml` for XSS. Covers plan question 4 and the XSS half of question 3. Lesson 1's forward/redirect sidenote already points here.
4. **The database and passwords**: the `users` table, `PreparedStatement` vs string concatenation (SQL injection), salted PBKDF2 and why the app resets instead of retrieving, the 210,000 vs 220,000 iteration point, H2 (embedded, in-process) vs an ODBC DSN, the startup listener, and what to change for production. Covers plan questions 2 and 3.
5. Then `/grill-me` for an interleaved mock interview, as the plan says.

Java syntax (classes, methods, annotations, exceptions, `Optional`) is taught inside these lessons when the code needs it. Start each lesson after the first with retrieval questions from earlier lessons (spacing).

## Running experiments on the app
- The learner may have their own copy running on port 8080 from `~/Ithena_Intro_Assignment/Project_5_JSP_Login`, with real data in `~/.jsp-login/`. Never touch either.
- For experiments, run a scratch copy (`git archive` of `main`) on port 8181, with the Cargo RMI and AJP ports changed and `DB_URL` pointing at a scratch database. Stop it **by PID only**. On 2026-10-05 a `pkill -f` pattern also matched and stopped the learner's own server. No data was lost, but it had to be reported and restarted.
- Verified on 2026-10-05 with curl against the scratch copy: the first `GET /login` sets `JSESSIONID` (JSPs join a session by default); a correct login sets a new `JSESSIONID` plus a 302 to `/home`; `/home` sends `Cache-Control: no-store`; `GET /logout` redirects to `/home`; `POST /logout` sends no `Set-Cookie`; the old cookie afterwards gets a 302 to `/login?required`. Cookie flags: `Path=/jsp-login; HttpOnly; SameSite=Lax`.

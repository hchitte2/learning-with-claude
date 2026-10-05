# JSP, Servlets and JDBC Resources

All links were checked on 2026-10-04. Project 5 uses the modern `jakarta.*` packages (Servlet 6.1, Pages 4.0, Tomcat 11). Many older tutorials use `javax.*`; the ideas are the same, but the package names differ.

## Knowledge

### HTTP (the language the browser and Tomcat speak)
- [MDN: "An overview of HTTP"](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)
  The clearest free introduction to requests, responses, and statelessness. Use for: the first mental model of the web; lesson 1's primary reading.
- [MDN: "HTTP request methods"](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)
  What GET and POST mean. Use for: why login and logout are POSTs.
- [MDN: "Sending form data"](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data)
  How form fields become `name=value` pairs, in the URL for GET or the body for POST. Use for: what `req.getParameter` reads.
- [MDN: "Redirections in HTTP"](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Redirections)
  302 vs 303, and redirecting after a POST so a refresh doesn't resubmit. Use for: forward vs redirect, the `/registered` page.
- [MDN: "Using HTTP cookies"](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)
  Session cookies, `HttpOnly`, `Secure`, `SameSite`. Use for: how the app remembers who is logged in.

### Servlets, Tomcat, and JSP (primary specs)
- [Jakarta Servlet 6.1 specification](https://jakarta.ee/specifications/servlet/6.1/jakarta-servlet-spec-6.1)
  The authority on what a servlet and a container are. Use for: §1.1–1.3 (definitions and a request walkthrough), §2.2 (one instance per servlet), §7 (sessions), §8.1.1 (`@WebServlet`), §9.4 (forward).
- [Jakarta Servlet 6.1 API docs](https://jakarta.ee/specifications/servlet/6.1/apidocs/jakarta.servlet/jakarta/servlet/http/httpservlet)
  The javadoc for `HttpServlet`, `HttpServletRequest`, `HttpServletResponse` (`sendRedirect` sends a 302), `HttpSession`, `RequestDispatcher`, `HttpFilter`, and `ServletContextListener`. Use for: checking exactly what a method in Project 5 does.
- [Jakarta Pages 4.0 specification](https://jakarta.ee/specifications/pages/4.0/jakarta-server-pages-spec-4.0)
  The JSP spec. Use for: "the JSP page is translated to create a servlet class" (Translation and Execution Steps; §11.2).
- [Jakarta Standard Tag Library 3.0 specification](https://jakarta.ee/specifications/tags/3.0/jakarta-tags-spec-3.0)
  JSTL. Use for: `<c:if>` (§5.3), `fn:escapeXml` (§15.5), and why escaping output prevents cross-site scripting (§4.2).
- [Apache Tomcat: "Which version do I want?"](https://tomcat.apache.org/whichversion.html)
  Tomcat 11 = Servlet 6.1, Pages 4.0, EL 6.0, Java 17+. Use for: answering "which versions are you on, and why do you need JDK 17?"
- [Tomcat 11 docs: Introduction](https://tomcat.apache.org/tomcat-11.0-doc/introduction.html) and [Deployment](https://tomcat.apache.org/tomcat-11.0-doc/appdev/deployment.html)
  What a Context (web application) is, the context path, and the WAR layout. Use for: why every URL starts with `/jsp-login`, and what `WEB-INF` is.
- [Jakarta EE Tutorial: Servlets](https://jakarta.ee/learn/docs/jakartaee-tutorial/current/web/servlets/servlets.html)
  The official tutorial, using `jakarta.*` packages. Use for: a second explanation of the servlet lifecycle, filters, and listeners.

### JDBC and SQL
- [Oracle Java Tutorials: JDBC Basics](https://docs.oracle.com/javase/tutorial/jdbc/basics/index.html)
  Connections, statements, result sets. Written for JDK 8, but the concepts are unchanged. Use for: lesson 3 (the database). The key pages are [Using Prepared Statements](https://docs.oracle.com/javase/tutorial/jdbc/basics/prepared.html), [Retrieving Values from Result Sets](https://docs.oracle.com/javase/tutorial/jdbc/basics/retrieving.html), and [Processing SQL Statements](https://docs.oracle.com/javase/tutorial/jdbc/basics/processingsqlstatements.html) (try-with-resources).
- [Java 17 `java.sql` API docs](https://docs.oracle.com/en/java/javase/17/docs/api/java.sql/java/sql/package-summary.html)
  The javadoc for `Connection`, `PreparedStatement`, `ResultSet`, and `DriverManager`. Use for: exact method behaviour.

### Security (the "why" behind the design)
- [OWASP: SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
  Prepared statements are "Defense Option 1". Use for: defending `PreparedStatement` in `UserDao`.
- [OWASP: Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#pbkdf2)
  Hashing, salts, and work factors. **As of 2026-03-26 it recommends 220,000 iterations for PBKDF2-HMAC-SHA512; Project 5 uses 210,000, the earlier figure.** The sheet changes often, so re-check before lesson 3.
- [OWASP: Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#renew-the-session-id-after-any-privilege-level-change)
  Renewing the session ID at login prevents session fixation. Use for: why `LoginServlet` invalidates the old session.
- [OWASP: Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#output-encoding-for-html-contexts)
  Output encoding. Use for: why the JSPs wrap user data in `fn:escapeXml`.

### Expert explanations
- [BalusC on Stack Overflow: "How do servlets work? Instantiation, sessions, shared variables and multithreading"](https://stackoverflow.com/questions/3106452/how-do-servlets-work-instantiation-sessions-shared-variables-and-multithreading)
  The canonical deep answer (about 1,960 votes) from a top servlet/JSF expert. Use for: going deeper after the three lessons, once "one servlet instance, many requests" makes sense.
- [BalusC: "Design patterns web based applications"](https://stackoverflow.com/questions/3541077/design-patterns-web-based-applications)
  MVC with servlets and JSPs. Use for: defending Project 5's servlet-plus-JSP split.
- [Stack Overflow servlets tag info](https://stackoverflow.com/tags/servlets/info) and [JSP tag info](https://stackoverflow.com/tags/jsp/info)
  Curated mini-tutorials and FAQs. The servlets wiki uses `javax.*` imports.

### Java (just enough to read the code)
- [dev.java: Getting Started](https://dev.java/learn/first-steps/first-java-code/getting-started/), [Creating Classes](https://dev.java/learn/language/oop/classes-objects/creating-classes/), [Exceptions](https://dev.java/learn/language/annotations-exceptions/exceptions/what-is-an-exception/), [try-with-resources](https://dev.java/learn/language/annotations-exceptions/exceptions/catching-handling/#the-try-with-resources-statement), [Annotations](https://dev.java/learn/language/annotations-exceptions/annotations/)
  Oracle's official Java tutorials. Use for: reading classes, `throws`, `try (...)`, and `@WebServlet`.

### Optional, with caveats
- [Telusko: "Servlet & JSP Tutorial | Full Course" (YouTube, about 6 hours, 2019)](https://www.youtube.com/watch?v=OuBUUkQfBYM)
  Very popular (about 1.95M views). Covers GET/POST, forward vs redirect, sessions, JSP translation, JDBC, MVC, and filters. Caveats: uses `javax.*` and teaches scriptlets and JSTL SQL tags, which Project 5 deliberately avoids. Use selected chapters only.
- [_Head First Servlets and JSP_, 2nd ed. (O'Reilly, 2008)](https://www.oreilly.com/library/view/head-first-servlets/9780596516680/)
  A classic conceptual introduction to the container, lifecycle, and sessions, but built around a 2008 certification and `javax.*`. Concepts only.

## Wisdom (Communities)

- [r/javahelp](https://www.reddit.com/r/javahelp/)
  Well moderated (15 rules). Note the rule "No AI generated content of any kind!": ask about concepts in your own words; don't paste the AI-drafted code as-is.
- [Stack Overflow: servlets](https://stackoverflow.com/questions/tagged/servlets) / [jsp](https://stackoverflow.com/questions/tagged/jsp)
  The largest archive of answered servlet questions. Use for: searching first; most beginner questions are already answered there.
- [CodeRanch: Servlets](https://coderanch.com/f/7/Servlets) and [JSP](https://coderanch.com/f/50/JSP) forums
  Moderated, but slow in 2026 (new threads every few weeks to months).
- [Jakarta EE community](https://jakarta.ee/community/)
  The official community hub. Use for: current direction of the platform, if Ithena asks whether JSP is still used.

## Gaps
- No current beginner book teaches servlets and JSP with `jakarta.*` packages; the classic books predate the 2020 rename.
- No busy community dedicated to plain servlets/JSP. Most activity is around Spring Boot, which is out of scope.

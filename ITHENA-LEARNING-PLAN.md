# Learning Plan: Ithena Introductory Assignment

**Goal:** explain every project of my Ithena assignment in my own words, without notes. The assignment expects me to explain my code, approach, and workflow.

Each project gets its own topic folder here and its own `/teach` sessions (about 20 minutes each, usually 2–3 per project).

## Progress

- [ ] 1. Project 1: Common Terms, Vendors, and Products (`p1-it-terms`)
- [ ] 2. Project 5: JSP Login Page (`p5-jsp-login`)
- [ ] 3. Project 8: API (`p8-rest-api`)
- [ ] 4. Project 6: Requirements Gathering (`p6-requirements`)
- [ ] 5. Project 3: DBMS Middleware (`p3-middleware`)
- [ ] 6. Project 2: Common KPIs (`p2-kpis`)
- [ ] 7. Project 7: Big Data (`p7-big-data`)
- [ ] 8. Project 4: Internet of Things (`p4-iot`)
- [ ] 9. Project 9: Data Science (`p9-ml-basics`)

The order puts the shared vocabulary (Project 1) first and the code (Projects 5 and 8) next, because reviewers are most likely to ask about the code.

## How to run a session

1. Create the project's folder and open Claude Code in it:
   ```bash
   cd ~/learning-with-claude
   mkdir p1-it-terms && cd p1-it-terms
   claude
   ```
2. Paste the project's `/teach` prompt from below.
3. The first time, `/teach` asks **why** you're learning. Answer with the project's **mission**.
4. Do the lesson's quiz from memory, without scrolling back, and ask follow-up questions when anything is unclear.
5. A project is done when you can answer its **Explain it** questions out loud without notes. Then rehearse with
   `/grill-me Ask me what an Ithena reviewer would ask about Project <N>, one round at a time`.
6. Save your progress by telling Claude: *"Tick this project in ITHENA-LEARNING-PLAN.md, add the topic to the README's Topics table, then commit and push."*

Other skills while you learn: `/wait-what` when an explanation doesn't land, and `/handoff` if you stop in the middle of a lesson.

> **Projects 5 and 8:** their code goes onto `main` with Monday's push. Before that, run `git checkout coding-projects` in `~/Ithena_Intro_Assignment` so Claude can read the code, then `git checkout main` when you're done.

---

## Project 1: Common Terms, Vendors, and Products
**Folder:** `p1-it-terms`

```
/teach The core enterprise IT terms from my Project 1 (ERP, server hardware, DBMS, ETL, BI, mobility) and how they fit together in a BI system. Start from my document at ~/Ithena_Intro_Assignment/Project_1_Common_Terms/Common_Terms_Vendors_Products.md
```
**Mission:** Talk confidently about the IT landscape Ithena works in: what each term means, who the main vendors are, and how the pieces connect.

**Master:**
- Each of the 6 terms in one sentence.
- The data flow: ERP → ETL → database/warehouse → BI → mobile.
- ETL vs. ELT.
- The leading vendors and flagship products for each term.

**Explain it:**
- A client's reports don't match their ERP numbers. Which pieces would you check, in what order?
- What's the difference between ETL and ELT, and why is ELT common today?
- Name two leading BI tools and one way they differ.

## Project 5: JSP Login Page
**Folder:** `p5-jsp-login`

```
/teach How my JSP login app works: servlets, JSP views, JDBC, sessions, and password hashing. Base the lessons on my code in ~/Ithena_Intro_Assignment/Project_5_JSP_Login (start with its README).
```
**Mission:** Explain my Project 5 code and design choices to Ithena reviewers, without notes.

**Master:**
- MVC in this app: servlets (controllers), JSPs (views), and the DAO (SQL).
- HTTP sessions and cookies: how login and logout work.
- JDBC with `PreparedStatement`, and how it prevents SQL injection.
- Salted PBKDF2 password hashing, and why the app resets passwords instead of retrieving them.
- Building and running on Tomcat: `./mvnw package cargo:run`.

**Explain it:**
- Walk through everything that happens after a user clicks "Log in".
- Why can't the app email a forgotten password back to the user?
- How does the app block SQL injection and XSS?
- Why do the JSPs live inside `WEB-INF/`?

## Project 8: API
**Folder:** `p8-rest-api`

```
/teach REST APIs and HTTP: resources, methods, status codes, and calling a third-party API from a backend. Base the lessons on my weather app in ~/Ithena_Intro_Assignment/Project_8_API (start with API_Concepts.md).
```
**Mission:** Design, call, and explain REST APIs, and walk through my weather app.

**Master:**
- REST constraints, especially statelessness and the uniform interface.
- HTTP methods, idempotency, and the status codes my app returns (200, 400, 404, 500, 502).
- Why the backend keeps the API key away from the browser.
- SOAP vs. REST.
- Testing with a fake `fetch`, so tests need no network connection.

**Explain it:**
- Why does the app have a backend instead of calling OpenWeatherMap from the browser?
- When does my API return 502 instead of 500?
- When would you use PUT, PATCH, or POST?

## Project 6: Requirements Gathering
**Folder:** `p6-requirements`

```
/teach Requirements gathering for BI projects: elicitation, functional vs. technical requirements, gap analysis, and writing a report specification. Start from ~/Ithena_Intro_Assignment/Project_6_Requirements_Gathering/Requirements_Gathering.md
```
**Mission:** Run a requirements workshop for a BI dashboard and write its specification.

**Master:**
- The 7 steps of the process.
- Functional vs. technical requirements, with examples of each.
- Gap analysis results: fit, partial fit, and gap.
- What a report specification must define: KPI rules, granularity, refresh frequency, and access.

**Explain it:**
- Classify these: "Reports load in 3 seconds" and "Users can export to Excel".
- A stakeholder keeps adding requests after sign-off. What do you do?
- What would you ask a sales VP before building their dashboard?

**Practice:** run `/to-questionnaire` to draft the questions you'd send that sales VP.

## Project 3: DBMS Middleware
**Folder:** `p3-middleware`

```
/teach Database middleware: drivers (ODBC/JDBC), application servers, messaging, replication (CDC), and API layers. Start from ~/Ithena_Intro_Assignment/Project_3_DBMS_Middleware/DBMS_Middleware.md
```
**Mission:** Explain how applications talk to databases, and pick the right middleware for a scenario.

**Master:**
- The 5 middleware jobs, with one product for each.
- What a database driver does, and ODBC vs. JDBC.
- Change data capture (CDC) replication, such as GoldenGate or AWS DMS, and why BI teams rely on it.
- Exposing a database as a REST API, such as with ORDS.

**Explain it:**
- How does a Java app connect to SQL Server? Name each piece in between.
- A client wants near-real-time reports without slowing their production database. What would you use?
- Why did Project 5 use JDBC instead of an ODBC DSN?

## Project 2: Common KPIs
**Folder:** `p2-kpis`

```
/teach Business KPIs: how to choose, define, and calculate them like a BI consultant. Use the 25 KPIs in ~/Ithena_Intro_Assignment/Project_2_Common_KPIs/Common_KPIs.md as the examples.
```
**Mission:** Define and calculate KPIs for any business area, the way a BI consultant would.

**Master:**
- What makes a good KPI: measurable, tied to a goal, with an owner and a target.
- Leading vs. lagging indicators.
- Calculating gross margin, CAC, CLV, employee turnover, and inventory turnover by hand.
- Which source system each KPI's data comes from.

**Explain it:**
- Revenue is $500k and COGS is $300k. What is the gross margin?
- Why do companies compare CLV to CAC?
- Pick 3 KPIs for a coffee chain and say where each one's data comes from.

## Project 7: Big Data
**Folder:** `p7-big-data`

```
/teach Big Data architecture and sizing: HDFS, Spark, Kafka, data lakes vs. warehouses, and estimating cluster size and cost. Start from ~/Ithena_Intro_Assignment/Project_7_Big_Data/Big_Data.md
```
**Mission:** Explain big data architecture and size a small cluster for a client scenario.

**Master:**
- The 5 Vs.
- The roles of HDFS, Spark, and Kafka, and data lakes vs. data warehouses.
- The trade-offs between on-premises, managed cloud, and lakehouse platforms.
- Sizing math: rows per second → rows per day → GB per day → storage including replication.

**Explain it:**
- Work out 10 devices × 10 rows/second for a day. Why doesn't it match the assignment's "~1M rows/day"?
- Why does HDFS keep 3 copies of every block?
- What has to change when the setup grows to 1,000 devices?

## Project 4: Internet of Things
**Folder:** `p4-iot`

```
/teach IoT platforms: devices, MQTT, device management, edge computing, and digital twins. Start from ~/Ithena_Intro_Assignment/Project_4_IoT/IoT.md
```
**Mission:** Describe how an IoT solution is built end to end, and compare the major platforms.

**Master:**
- The flow from device to gateway to platform to analytics.
- MQTT publish/subscribe vs. HTTP.
- Edge computing, and when it's needed.
- Digital twins.

**Explain it:**
- Why would a factory process data at the edge instead of in the cloud?
- What does MQTT do better than plain HTTP for sensors?
- What do AWS IoT Core and Azure IoT Hub have in common?

## Project 9: Data Science
**Folder:** `p9-ml-basics`

```
/teach Machine learning basics: supervised vs. unsupervised learning, k-NN vs. k-means, random forests, confusion matrices, and data preparation in Python. Start from ~/Ithena_Intro_Assignment/Project_9_Data_Science/Data_Science.md
```
**Mission:** Explain core machine learning ideas clearly and apply them in Python.

**Master:**
- Supervised vs. unsupervised learning.
- Reading a confusion matrix, and precision vs. recall.
- Random forests and bagging.
- Normalization, and handling imbalanced data (SMOTE).
- Euclidean distance in Python.

**Explain it:**
- For fraud detection, which matters more, precision or recall? Why?
- Describe k-NN and k-means in one sentence each.
- Calculate the distance between [1, 3] and [2, 5] by hand.

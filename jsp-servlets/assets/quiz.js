/*
  Practice components for every lesson. Load at the end of <body>:
  <script src="../assets/quiz.js"></script>

  1. Multiple choice
     <div class="q mcq">
       <p class="prompt">Question?</p>
       <div class="options" data-shuffle>        (data-shuffle is optional)
         <button type="button">Wrong answer</button>
         <button type="button" data-correct>Right answer</button>
       </div>
       <p class="feedback" aria-live="polite"></p>
       <div class="explain" hidden><p>Why the right answer is right.</p></div>
     </div>

  2. Put steps in order (list them in the correct order; the script shuffles them)
     <div class="q order">
       <p class="prompt">Put these in order.</p>
       <div class="order-lists">
         <div><h4>Steps</h4><ol class="pool"><li>First</li><li>Second</li></ol></div>
         <div><h4>Your order</h4><ol class="answer"></ol></div>
       </div>
       <div class="controls">
         <button type="button" class="btn primary" data-check>Check order</button>
         <button type="button" class="btn" data-reset>Start over</button>
       </div>
       <p class="feedback" aria-live="polite"></p>
       <div class="explain" hidden>…</div>
     </div>

  3. Rehearsal: a timed spoken answer, checked against a list
     <div class="rehearse" data-key="unique-key">
       <p class="question">“Interview question?”</p>
       <div class="controls">
         <button type="button" class="btn" data-timer="60">Start 60-second timer</button>
         <span class="timer-readout"></span>
       </div>
       <label for="id">Notes</label><textarea id="id"></textarea>
       <div class="controls"><button type="button" class="btn primary" data-reveal>Compare with the checklist</button></div>
       <div class="reveal" hidden>
         <ul class="checklist"><li><label><input type="checkbox"> Point</label></li></ul>
         <p class="checklist-count" aria-live="polite"></p>
         <div class="model-answer">…</div>
       </div>
     </div>

  4. Score: <p class="scoreboard" data-scoreboard></p> shows the first-try score.
*/
(function () {
  "use strict";

  // Browser storage can be missing or blocked; drafts are a convenience only.
  var store = {
    get: function (key) {
      try { return window.localStorage.getItem("teach:" + key); } catch (e) { return null; }
    },
    set: function (key, value) {
      try { window.localStorage.setItem("teach:" + key, value); } catch (e) { /* ignore */ }
    }
  };

  var score = { total: 0, answered: 0, firstTry: 0 };

  function updateScore() {
    var text;
    if (score.answered === 0) {
      text = "Answer the questions above. Your first-try score appears here.";
    } else if (score.answered < score.total) {
      text = "<strong>" + score.firstTry + " of " + score.answered + "</strong> right on the first try so far ("
        + (score.total - score.answered) + " to go).";
    } else {
      text = "First-try score: <strong>" + score.firstTry + " of " + score.total + "</strong>. "
        + (score.firstTry === score.total
          ? "Come back in a day or two and try again from memory."
          : "Reread the parts you missed, then ask your teacher about anything that still feels fuzzy.");
    }
    document.querySelectorAll("[data-scoreboard]").forEach(function (el) { el.innerHTML = text; });
  }

  function recordFirstTry(q, correct) {
    if (q.dataset.scored) return;
    q.dataset.scored = "true";
    score.answered += 1;
    if (correct) score.firstTry += 1;
    updateScore();
  }

  function shuffle(items) {
    var a = items.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function reveal(q) {
    var explain = q.querySelector(".explain");
    if (explain) explain.hidden = false;
  }

  /* ---------- Multiple choice ---------- */

  function setupMcq(q) {
    score.total += 1;
    var box = q.querySelector(".options");
    var buttons = Array.prototype.slice.call(box.querySelectorAll("button"));
    var feedback = q.querySelector(".feedback");

    if (box.hasAttribute("data-shuffle")) {
      shuffle(buttons).forEach(function (b) { box.appendChild(b); });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (q.dataset.done) return;
        q.dataset.done = "true";
        var correct = btn.hasAttribute("data-correct");
        var rightBtn = box.querySelector("[data-correct]");

        buttons.forEach(function (b) {
          b.disabled = true;
          if (b === rightBtn) b.classList.add("is-right");
          else if (b === btn) b.classList.add("is-wrong");
          else b.classList.add("is-faded");
        });
        q.classList.add(correct ? "is-right" : "is-wrong");
        feedback.innerHTML = correct
          ? '<span class="verdict">Right.</span>'
          : '<span class="verdict">Not quite.</span> The answer is “' + rightBtn.innerHTML + '”.';
        reveal(q);
        recordFirstTry(q, correct);
      });
    });
  }

  /* ---------- Ordering ---------- */

  function setupOrder(q) {
    score.total += 1;
    var pool = q.querySelector(".pool");
    var answer = q.querySelector(".answer");
    var check = q.querySelector("[data-check]");
    var reset = q.querySelector("[data-reset]");
    var feedback = q.querySelector(".feedback");

    var items = Array.prototype.slice.call(pool.children).map(function (li, index) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "token";
      btn.innerHTML = li.innerHTML;
      btn.dataset.step = String(index);
      var wrap = document.createElement("li");
      wrap.appendChild(btn);
      btn.addEventListener("click", function () {
        if (q.dataset.done) return;
        clearMarks();
        (wrap.parentNode === pool ? answer : pool).appendChild(wrap);
        refresh();
      });
      return wrap;
    });

    function clearMarks() {
      items.forEach(function (li) { li.firstChild.classList.remove("is-right", "is-wrong"); });
    }

    function deal() {
      var order = shuffle(items);
      // Never start with the steps already in the right order.
      if (order.every(function (li, i) { return li === items[i]; })) order.reverse();
      pool.innerHTML = "";
      answer.innerHTML = "";
      order.forEach(function (li) { pool.appendChild(li); });
    }

    function refresh() {
      check.disabled = pool.children.length > 0;
      if (!q.dataset.done) feedback.textContent = "";
    }

    check.addEventListener("click", function () {
      var placed = Array.prototype.slice.call(answer.children);
      var right = 0;
      placed.forEach(function (li, i) {
        var ok = li.firstChild.dataset.step === String(i);
        if (ok) right += 1;
        li.firstChild.classList.add(ok ? "is-right" : "is-wrong");
      });
      var allRight = right === items.length;
      recordFirstTry(q, allRight);
      q.classList.remove("is-right", "is-wrong");
      q.classList.add(allRight ? "is-right" : "is-wrong");
      if (allRight) {
        q.dataset.done = "true";
        check.disabled = true;
        reset.disabled = true;
        feedback.innerHTML = '<span class="verdict">Right.</span> Every step is in place.';
        reveal(q);
      } else {
        feedback.innerHTML = '<span class="verdict">' + right + " of " + items.length
          + " in the right place.</span> Click a step to send it back, then check again.";
      }
    });

    reset.addEventListener("click", function () {
      if (q.dataset.done) return;
      clearMarks();
      q.classList.remove("is-wrong");
      deal();
      refresh();
    });

    deal();
    refresh();
  }

  /* ---------- Rehearsal ---------- */

  function setupRehearse(r) {
    var key = r.dataset.key || "rehearse";
    var textarea = r.querySelector("textarea");
    var revealBtn = r.querySelector("[data-reveal]");
    var panel = r.querySelector(".reveal");
    var boxes = Array.prototype.slice.call(r.querySelectorAll(".checklist input"));
    var count = r.querySelector(".checklist-count");
    var timerBtn = r.querySelector("[data-timer]");
    var readout = r.querySelector(".timer-readout");

    if (textarea) {
      var draft = store.get(key + ":draft");
      if (draft) textarea.value = draft;
      textarea.addEventListener("input", function () { store.set(key + ":draft", textarea.value); });
    }

    function updateCount() {
      if (!count) return;
      var ticked = boxes.filter(function (b) { return b.checked; }).length;
      count.textContent = "You covered " + ticked + " of " + boxes.length + " points."
        + (ticked === boxes.length ? " That answer would land well." : " Try the question again tomorrow, out loud.");
    }
    boxes.forEach(function (b) { b.addEventListener("change", updateCount); });

    if (revealBtn && panel) {
      revealBtn.addEventListener("click", function () {
        panel.hidden = false;
        revealBtn.disabled = true;
        updateCount();
      });
    }

    if (timerBtn && readout) {
      var seconds = parseInt(timerBtn.dataset.timer, 10) || 60;
      var startLabel = timerBtn.textContent;
      var handle = null;
      var left = seconds;

      function show() {
        var m = Math.floor(left / 60);
        var s = left % 60;
        readout.textContent = m + ":" + (s < 10 ? "0" : "") + s;
      }
      function stop() {
        window.clearInterval(handle);
        handle = null;
        timerBtn.textContent = startLabel;
      }

      timerBtn.addEventListener("click", function () {
        if (handle) { stop(); return; }
        left = seconds;
        readout.classList.remove("is-done");
        show();
        timerBtn.textContent = "Stop timer";
        handle = window.setInterval(function () {
          left -= 1;
          show();
          if (left <= 0) {
            stop();
            readout.textContent = "Time";
            readout.classList.add("is-done");
          }
        }, 1000);
      });
    }
  }

  document.querySelectorAll(".mcq").forEach(setupMcq);
  document.querySelectorAll(".order").forEach(setupOrder);
  document.querySelectorAll(".rehearse").forEach(setupRehearse);
  updateScore();
})();

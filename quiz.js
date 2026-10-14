/* Practice quiz. Each question lists the correct answer FIRST; options are shuffled at run time. */
(function () {
  const QUESTIONS = [
    { q: 'What is an obligation under Art. 1156?',
      o: ['A juridical necessity to give, to do or not to do', 'Any promise made between two people', 'A moral duty enforced only by conscience', 'An agreement with consent, object and cause'],
      e: 'Art. 1156 calls it a juridical necessity: the courts can compel performance or award damages. A purely moral duty is not enforceable. Consent, object and cause describe a contract (Art. 1318), not an obligation.', r: 'Obligation and its elements' },
    { q: 'Which of these is NOT a source of obligations under Art. 1157?',
      o: ['Customs', 'Quasi-contracts', 'Quasi-delicts', 'Acts or omissions punished by law'],
      e: 'The five sources are law, contracts, quasi-contracts, delicts (acts or omissions punished by law) and quasi-delicts. Customs can be a source of law (Art. 11) but are not a listed source of obligations.', r: 'Sources of obligations' },
    { q: 'Student C mistakenly pays Student D\'s lab fees at the cashier. Which source of obligation applies?',
      o: ['Quasi-contract (solutio indebiti)', 'Contract', 'Delict', 'Quasi-delict'],
      e: 'Payment by mistake is a quasi-contract under Art. 2154: a lawful, voluntary, unilateral act with no consent between the parties, based on the rule against unjust enrichment. No crime or negligence is involved.', r: 'Quasi-contracts' },
    { q: 'A driver carelessly hits a pedestrian. They had no prior contract. Which source applies?',
      o: ['Quasi-delict', 'Delict', 'Quasi-contract', 'Contract'],
      e: 'Art. 2176 covers damage caused by fault or negligence with no pre-existing contract, proven by preponderance of evidence. It would be a delict only if a crime were committed, which needs proof beyond reasonable doubt.', r: 'Quasi-delicts' },
    { q: 'A debtor is in delay without any demand when:',
      o: ['Time was of the essence, such as a cake ordered for a birthday party', 'He is simply a few days late', 'The creditor did not complain', 'The obligation is a simple loan'],
      e: 'Art. 1169 gives four cases: the law says so, the obligation says so, time is of the essence, or demand would be useless. In every other case delay needs a judicial or extrajudicial demand, so lateness alone is not enough.', r: 'Delay' },
    { q: 'A specific horse promised to a buyer dies from lightning before delivery. The debtor was not in delay. What happens?',
      o: ['The obligation is extinguished', 'The debtor must deliver another horse', 'The debtor must pay damages', 'The buyer may rescind and claim damages'],
      e: 'A specific thing lost by a fortuitous event without the debtor\'s fault extinguishes the obligation (Art. 1262). It would be different if the debtor were already in delay (Art. 1165) or if the thing were generic.', r: 'Fortuitous event' },
    { q: 'Which statement about generic things is correct?',
      o: ['Genus nunquam perit: the debtor must still deliver the same class and quality', 'They are extinguished when destroyed', 'They are identified by a serial number', 'They can be delivered only with the creditor\'s consent'],
      e: 'A generic thing is described only by its class, so it can never truly perish. The debtor must source another of the same quality. Only specific things are extinguished by loss.', r: 'Things, duties' },
    { q: 'When does the creditor acquire a real right over a determinate thing?',
      o: ['When it is delivered', 'When the obligation arises', 'When the contract is perfected', 'When the debtor is in default'],
      e: 'Art. 1164 gives the creditor a right to the fruits from the time the obligation arises, but no real right until delivery. Before delivery he has only a personal right against the debtor.', r: 'Things, duties' },
    { q: 'Which of these is a period rather than a condition?',
      o: ['Payable upon the death of the debtor', 'Payable if the debtor passes the bar exam', 'Payable if it rains tomorrow', 'Payable if the buyer is promoted'],
      e: 'A period is a day that must come, even if its date is unknown, and death is certain. The others may or may not happen, which makes them conditions.', r: 'Conditions and periods' },
    { q: 'A debtor with a term becomes insolvent and gives no security. What is the effect?',
      o: ['He loses the benefit of the period, so the debt is demandable at once', 'The debt is extinguished', 'The creditor must wait until the term arrives', 'The debt becomes joint'],
      e: 'Art. 1198(1) makes the obligation immediately demandable. The other grounds are failing to give promised guaranties, impairing the security, violating an undertaking, and attempting to abscond.', r: 'Conditions and periods' },
    { q: 'In an alternative obligation to deliver a Toyota or a Nissan, the debtor offers half of each. May the creditor refuse?',
      o: ['Yes, performance of one prestation must be complete', 'No, half of each equals one', 'No, the debtor chooses freely', 'Yes, but only if the creditor wanted the Toyota'],
      e: 'Art. 1199 requires complete performance of one prestation. The debtor cannot choose part of one and part of another, and the creditor cannot be forced to accept a mixture.', r: 'Alternative and facultative' },
    { q: 'Maria must deliver her Fortuner but may substitute her Everest. The Fortuner is destroyed by a flood before she substitutes. What happens?',
      o: ['The obligation is extinguished', 'She must deliver the Everest', 'She must pay damages', 'The creditor may choose the Everest'],
      e: 'This is a facultative obligation: only the Fortuner is due and the Everest is merely a substitute. Loss of the principal by a fortuitous event extinguishes it. In an alternative obligation, losing one option would not.', r: 'Alternative and facultative' },
    { q: 'When is an obligation with several debtors solidary?',
      o: ['Only when stated by law or contract, or when its nature requires it', 'Whenever there are two or more debtors', 'Whenever the debt is large', 'Whenever the creditor demands it'],
      e: 'Under Art. 1207 joint is the default, so each debtor pays only his proportionate share. Solidarity must be expressly provided by law or stipulation, or be required by the nature of the obligation.', r: 'Joint and solidary' },
    { q: 'A baker delivers only the bottom tier of a three-tier cake ordered for a party. Was the obligation fulfilled?',
      o: ['No, it was indivisible, so partial performance does not satisfy it', 'Yes, one-third is paid', 'Yes, if the buyer accepts the bottom tier', 'It is divisible, so the baker may deliver the rest later'],
      e: 'The test is whether partial performance fulfills or defeats the purpose. A cake for an event is indivisible and time was of the essence, so the baker is liable. Delivering 100 sacks of rice in batches, by contrast, is divisible.', r: 'Divisible and indivisible' },
    { q: 'If the penal clause of a contract is void, what happens to the principal obligation?',
      o: ['It stays valid', 'It is void too', 'It becomes a facultative obligation', 'It becomes joint'],
      e: 'Art. 1230: nullity of the penal clause does not affect the principal obligation. The reverse is not true: if the principal is void, the penal clause is void too, because the accessory follows the principal.', r: 'Principal and accessory' },
    { q: 'Which is NOT an essential element of a contract (Art. 1318)?',
      o: ['A condition or period', 'Consent', 'Object certain', 'Cause'],
      e: 'The essential elements are consent, object certain and cause. A condition, period, mode or penalty clause is an accidental element that exists only if the parties add it.', r: 'Elements (Art. 1318)' },
    { q: 'An offeree accepts but changes the price. This is:',
      o: ['A counter-offer', 'A valid acceptance', 'An option contract', 'A mistake of fact'],
      e: 'Acceptance must be absolute and unconditional. Changing the terms rejects the original offer and creates a new one that the first party may accept or reject.', r: 'and consent' },
    { q: 'Fraud that was the determining cause of a contract is called:',
      o: ['Causal fraud (dolo causante), which makes the contract voidable', 'Incidental fraud, which allows only damages', 'Absolute simulation, which makes it void', 'Mistake of law, which makes it enforceable'],
      e: 'Without causal fraud the party would not have contracted, so the contract may be annulled. Incidental fraud only changes the terms, so it gives damages and not annulment.', r: 'Vices of consent' },
    { q: 'A contract is absolutely simulated. It is:',
      o: ['Void', 'Voidable', 'Rescissible', 'Unenforceable'],
      e: 'In absolute simulation the parties never intended to be bound, so the contract is fictitious and void. In relative simulation, the hidden real agreement may be valid if it is lawful and does not prejudice third persons.', r: 'Vices of consent' },
    { q: 'Which kind of defective contract can be cured by ratification?',
      o: ['Voidable', 'Void', 'Absolutely simulated', 'One with an illegal cause'],
      e: 'Voidable and unenforceable contracts can be cured by ratification. Void contracts have no effect from the start and cannot be confirmed.', r: 'four kinds' },
    { q: 'A buyer purchases a house to live near his family. That reason is the:',
      o: ['Motive, which does not affect validity', 'Cause, which is essential', 'Object, which must be determinate', 'Consideration, which must be lawful'],
      e: 'Motive is the personal reason. Cause is the immediate legal reason (the house in exchange for the price). Motive generally does not affect the validity of a contract.', r: 'Object, cause' },
    { q: 'Which debt is exempt from compensation?',
      o: ['A deposit (depositum)', 'The price of goods', 'Rent', 'A loan of money'],
      e: 'Arts. 1287 and 1288 exempt depositum, commodatum, claims for support due by gratuitous title, civil liability from a penal offense, and taxes owed to the government. Ordinary money debts can be compensated.', r: 'exempt debts' },
    { q: 'Chef Tony owes P80,000 for equipment and is owed P30,000 for catering, both due. How much does he still owe?',
      o: ['P50,000', 'P30,000', 'P80,000', 'Nothing'],
      e: 'Partial compensation extinguishes both debts up to the concurrent amount of P30,000. The balance is P80,000 minus P30,000 = P50,000.', r: 'Worked examples' }
  ];

  const box = document.getElementById('quiz');
  const toggle = document.getElementById('quiz-toggle');
  let deck = [], pos = 0, score = 0, missed = [];

  const shuffle = (a) => {
    a = a.slice();
    for (let k = a.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [a[k], a[j]] = [a[j], a[k]];
    }
    return a;
  };
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  };

  function start(list) {
    deck = shuffle(list); pos = 0; score = 0; missed = [];
    show();
  }

  function show() {
    if (pos >= deck.length) return finish();
    const item = deck[pos];
    const opts = shuffle(item.o.map((t, k) => ({ t, ok: k === 0 })));
    box.replaceChildren();

    const prog = el('div', 'qprog');
    prog.append(el('span', '', 'Question ' + (pos + 1) + ' of ' + deck.length), el('span', '', 'Score: ' + score));
    const bar = el('div', 'bar'); const fill = el('i');
    fill.style.width = (pos / deck.length * 100) + '%'; bar.append(fill);
    const list = el('div', 'opts');
    const fb = el('div', 'fb'); fb.setAttribute('aria-live', 'polite');
    box.append(prog, bar, el('h2', 'qtext', item.q), list, fb);

    opts.forEach((o) => {
      const b = el('button', 'opt', o.t); b.type = 'button';
      b.onclick = () => answer(b, o, opts, list, fb, item);
      o.btn = b; list.append(b);
    });
    window.scrollTo(0, 0);
  }

  function tag(btn, text) { btn.append(el('span', 'tag', text)); }

  function answer(btn, chosen, opts, list, fb, item) {
    list.querySelectorAll('button').forEach((b) => { b.disabled = true; });
    const right = opts.find((o) => o.ok);
    right.btn.classList.add('right'); tag(right.btn, 'Correct answer');
    fb.className = 'fb ' + (chosen.ok ? 'good' : 'bad');
    if (chosen.ok) { score++; }
    else { chosen.btn.classList.add('wrong'); tag(chosen.btn, 'Your answer'); missed.push(item); }

    fb.append(el('p', 'verdict', chosen.ok ? 'Correct.' : 'Not quite. The right answer is: ' + right.t));
    const why = el('p', 'why'); why.append(el('strong', '', 'Why: '), document.createTextNode(item.e));
    fb.append(why);

    const actions = el('div', 'actions');
    const next = el('button', 'btn', pos + 1 < deck.length ? 'Next question' : 'See results');
    next.type = 'button'; next.onclick = () => { pos++; show(); };
    actions.append(next);
    if (!chosen.ok) {
      const rev = el('button', 'btn alt', 'Review this topic'); rev.type = 'button';
      rev.onclick = () => { leave(); jumpTo(item.r); };
      actions.append(rev);
    }
    fb.append(actions);
    next.focus();
  }

  function finish() {
    box.replaceChildren();
    const pct = Math.round(score / deck.length * 100);
    box.append(el('h2', 'qtext', 'Quiz complete'), el('p', 'score', score + ' / ' + deck.length + ' (' + pct + '%)'));
    box.append(el('p', '', missed.length
      ? 'Review what you missed below, then try those questions again.'
      : 'Perfect score. Try the full set again to keep it fresh.'));
    if (missed.length) {
      const ul = el('ul', 'missed');
      missed.forEach((m) => { const li = el('li'); li.append(el('strong', '', m.q), el('br'), document.createTextNode('Answer: ' + m.o[0])); ul.append(li); });
      box.append(ul);
    }
    const actions = el('div', 'actions');
    if (missed.length) { const b = el('button', 'btn', 'Retry missed questions'); b.type = 'button'; b.onclick = () => start(missed.slice()); actions.append(b); }
    const all = el('button', missed.length ? 'btn alt' : 'btn', 'Start over'); all.type = 'button'; all.onclick = () => start(QUESTIONS);
    const back = el('button', 'btn alt', 'Back to reviewer'); back.type = 'button'; back.onclick = leave;
    actions.append(all, back); box.append(actions);
    window.scrollTo(0, 0);
  }

  function jumpTo(text) {
    const h = [...document.querySelectorAll('#doc h3')].find((x) => x.textContent.toLowerCase().includes(text.toLowerCase()));
    if (h) h.scrollIntoView();
  }

  function enter() {
    document.body.classList.add('quiz-mode'); box.hidden = false;
    toggle.textContent = 'Back to reviewer';
    if (!box.childElementCount) start(QUESTIONS);
  }
  function leave() {
    document.body.classList.remove('quiz-mode'); box.hidden = true;
    toggle.textContent = 'Take the quiz';
  }
  toggle.onclick = () => (document.body.classList.contains('quiz-mode') ? leave() : enter());
})();

/* ============================================================
   ZOE CONFERENCE 2026 — "In the Beginning…" · THE BOOK
   One illuminated manuscript; scrolling turns its pages.
   Desktop = open spreads · Mobile = single-page notebook
   Reduced motion = the book laid flat, spread by spread.
   ============================================================ */
(function () {
  'use strict';

  /* ------------------------------------------------------------
     CONFIG — paste the live registration link here when ready.
     Every .js-register button picks it up automatically.
     ------------------------------------------------------------ */
  var REGISTER_URL = ''; // e.g. 'https://registrations.example.com/zoe2026'

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    /[?&]flat=1/.test(window.location.search); // ?flat=1 forces the laid-flat fallback (QA / accessibility)
  var MOBILE_BP = 860;

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  /* ---------- Register links ---------- */
  function wireRegister(scope) {
    (scope || document).querySelectorAll('.js-register').forEach(function (a) {
      if (REGISTER_URL) {
        a.setAttribute('href', REGISTER_URL);
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
      } else if (a.getAttribute('href') === '#') {
        a.setAttribute('href', 'mailto:zoe@thelifechurch.com?subject=Zoe%20Conference%20Registration');
      }
    });
  }

  /* ---------- Loader ---------- */
  var loader = document.getElementById('loader');
  function dismissLoader() { if (loader) loader.classList.add('is-done'); }
  if (document.readyState !== 'loading') setTimeout(dismissLoader, 500);
  else document.addEventListener('DOMContentLoaded', function () { setTimeout(dismissLoader, 500); });
  setTimeout(dismissLoader, 1800);

  /* ============================================================
     CONTENT — every page of the book, as data.
     ============================================================ */
  var FLOURISH =
    '<div class="flourish" aria-hidden="true"><svg viewBox="0 0 120 12" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1">' +
    '<path d="M2 6 H46 M74 6 H118"/>' +
    '<path d="M52 6c2.6-3.2 5.6-3.2 8 0-2.4 3.2-5.4 3.2-8 0Z"/>' +
    '<path d="M68 6c-2.6-3.2-5.6-3.2-8 0 2.4 3.2 5.4 3.2 8 0Z" opacity=".001"/>' +
    '<circle cx="60" cy="6" r="1.7" fill="currentColor" stroke="none"/>' +
    '<path d="M49 6c-2-2.4-4.4-2.4-6 0 1.6 2.4 4 2.4 6 0Z"/>' +
    '<path d="M71 6c2-2.4 4.4-2.4 6 0-1.6 2.4-4 2.4-6 0Z"/>' +
    '</svg></div>';

  var RUNNING_HEAD = 'Zoe · In the Beginning · MMXXVI';

  /* --- single pages --- */
  var COVER = {
    cls: 'pg--cover', chrome: 'none', body:
      '<img class="cover__icon" src="images/z-icon.png" alt="">' +
      '<p class="cover__eyebrow">The Life Church presents</p>' +
      '<img class="cover__title" src="images/title-gold-trim.png" alt="In the Beginning…">' +
      '<p class="cover__sub">ZOE · MMXXVI</p>'
  };

  var ENDPAPER = {
    cls: 'pg--endpaper', chrome: 'none', body:
      '<div class="endpaper__plate"><img src="images/z-icon.png" alt=""><p>Ex Libris · Zoe</p></div>'
  };

  var TITLE_PAGE = {
    chrome: 'none', body:
      '<div class="titlepage">' +
      '<img class="titlepage__icon" src="images/z-icon.png" alt="">' +
      '<p class="titlepage__presents">The Life Church presents</p>' +
      '<img class="titlepage__art" src="images/title-gold-trim.png" alt="In the Beginning…">' +
      '<p class="titlepage__conf">ZOE CONFERENCE</p>' +
      '<p class="titlepage__dates">September the 25th &amp; 26th, Two Thousand Twenty-Six</p>' +
      '<p class="titlepage__where">The Life Church · Memphis, Tennessee</p>' +
      '</div>'
  };

  var PLATE_EDEN = {
    cls: 'pg--plate', chrome: 'none', body:
      '<div class="plate__art" style="background-image:url(\'art/plate-eden.jpg\')"></div>' +
      '<p class="plate__caption"><strong>THE GARDEN</strong> · “And the Lord God planted a garden eastward in Eden.” — Genesis 2:8</p>'
  };

  var THEME_PAGE = {
    cls: 'pg--center', body:
      '<p class="chapter-no">Chapter the First</p>' +
      '<h2 class="h-display">In the Beginning…</h2>' +
      '<p class="body-copy dropcap">Before anything else — before calendars and carpools, before the noise — there was a garden, and a God who walked in it. Every story worth telling starts the way ours does: with life, planted on purpose.</p>' +
      '<p class="body-copy"><em>Zoe</em> — <strong>ζωή</strong> — is the Greek word for <strong>life</strong>. For two days this September we go back to the beginning together: to be planted again, watered again, and to grow in the company of women.</p>' +
      FLOURISH +
      '<p class="fine" style="text-align:center">September 25 &amp; 26 · The Life Church · Memphis</p>'
  };

  var LETTER_ONE = {
    body:
      '<p class="eyebrow">A letter from Pastor Leslie</p>' +
      '<div class="letter letter--one">' +
      '<p class="dropcap">Dear friend,</p>' +
      '<p>Every September, something beautiful happens under our roof: women from every season and every story gather in one room — and God meets us there.</p>' +
      '<p>This year’s theme takes us all the way back — <em>In the Beginning…</em> — to a garden where life first bloomed, and to the God who still plants, still tends, and still makes things grow.</p>' +
      '<p>Whatever season you find yourself in, there is a place in this story with your name on it. Bring your Bible, bring a friend, and come expectant — I believe God wants to plant something brand new in you. I’d be so honored to have you join me!</p>' +
      '<p class="signoff">With love &amp; anticipation,</p>' +
      '<img class="signature" src="images/signature.png" alt="Pastor Leslie’s signature">' +
      '<p class="signature-name">Pastor Leslie &amp; the Zoe Team</p>' +
      '</div>'
  };

  var PLATE_FLOWER = {
    cls: 'pg--plate', chrome: 'none', body:
      '<div class="plate__art" style="background-image:url(\'art/plate-rose-closeup.jpg\')"></div>' +
      '<p class="plate__caption"><strong>THE FIRST BLOOM</strong> · “…and it was very good.” — Genesis 1:31</p>'
  };

  var LETTER_MOBILE = {
    body:
      '<p class="eyebrow">A letter from Pastor Leslie</p>' +
      '<div class="letter">' +
      '<p class="dropcap">Dear friend, every September something beautiful happens under our roof: women from every season gather in one room — and God meets us there.</p>' +
      '<p>This year’s theme takes us all the way back — <em>In the Beginning…</em> — to a garden where life first bloomed. Whatever season you’re in, there’s a place in this story with your name on it. Bring your Bible, bring a friend, and come expectant.</p>' +
      '<p class="signoff">With love &amp; anticipation,</p>' +
      '<img class="signature" src="images/signature.png" alt="Pastor Leslie’s signature">' +
      '<p class="signature-name">Pastor Leslie &amp; the Zoe Team</p>' +
      '</div>'
  };

  var LISA_PORTRAIT = {
    cls: 'pg--plate', chrome: 'none', body:
      '<div class="portrait">' +
      '<div class="portrait__art"><img src="art/portrait-lisa.jpg" alt="Lisa Harper" onerror="this.src=\'images/lisa-harper.jpg\'"></div>' +
      '<p class="portrait__caption"><strong>LISA HARPER</strong> · Nashville, Tennessee</p>' +
      '</div>'
  };

  var LISA_BIO = {
    cls: 'pg--center', body:
      '<p class="eyebrow">Guest Speaker</p>' +
      '<h2 class="h-name">Lisa Harper</h2>' +
      '<p class="body-copy dropcap">Lisa Harper is a compelling communicator whose writing and speaking emphasize that acquiring knowledge about God pales next to an intimate relationship with Jesus. Her style combines sound biblical exposition and exegesis with engaging anecdotes and comedic wit.</p>' +
      '<p class="body-copy">She’s been featured on numerous television and radio programs, hosts the <em>Lisa Harper’s Back Porch Theology</em> podcast, is a best-selling author and has spoken at hundreds of churches and women’s events. Lisa lives in Nashville with her daughter, Missy.</p>' +
      FLOURISH
  };

  var MANNY_BIO = {
    cls: 'pg--center', body:
      '<p class="eyebrow">Guest Speaker</p>' +
      '<h2 class="h-name">Dr. Manny Arango</h2>' +
      '<p class="body-copy dropcap">Dr. Manny Arango is a Bible nerd and the founder of ARMA Courses, an online educational platform equipping Christians to become biblically literate. He earned a doctorate in New Testament studies from North Baptist Theological Seminary.</p>' +
      '<p class="body-copy">Manny and his beautiful wife, Tia, are the senior pastors of The Garden, which launched in February 2026 in Houston, TX. They have been married for 12 years and have a son named Theophilus.</p>' +
      FLOURISH
  };

  var MANNY_PORTRAIT = {
    cls: 'pg--plate', chrome: 'none', body:
      '<div class="portrait">' +
      '<div class="portrait__art"><img src="art/portrait-manny.jpg" alt="Dr. Manny Arango" onerror="this.src=\'images/manny-arango.jpg\'"></div>' +
      '<p class="portrait__caption"><strong>DR. MANNY ARANGO</strong> · Houston, Texas</p>' +
      '</div>'
  };

  var FRIDAY = {
    body:
      '<div class="day">' +
      '<div class="day__art day__art--evening"></div>' +
      '<p class="day__when">Friday · September 25</p>' +
      '<h3 class="day__title">Evening Session &amp; After Show</h3>' +
      '<p class="day__hours">7:00 – 10:00 in the evening</p>' +
      '<p class="body-copy">Check-in opens at 6:00p. Stay after the session for the first-ever Zoe After Show — live entertainment, audience games, prizes and unforgettable moments.</p>' +
      '<div class="where"><strong>The Life Church — Houston Levee</strong>650 Houston Hill Road · Eads, TN 38028</div>' +
      '</div>'
  };

  var SATURDAY = {
    body:
      '<div class="day">' +
      '<div class="day__art day__art--morning"></div>' +
      '<p class="day__when">Saturday · September 26</p>' +
      '<h3 class="day__title">Daytime Sessions</h3>' +
      '<p class="day__hours">9:00 in the morning – 1:00</p>' +
      '<p class="body-copy">Breakfast is included. Doors open one hour before each session — allow time for parking and check-in.</p>' +
      '<div class="where"><strong>Wear the wristband</strong>Your registration wristband admits you both days.</div>' +
      '</div>'
  };

  function ledgerRow(name, note, price) {
    return '<li><span><span class="ledger__name">' + name + '</span><br><span class="ledger__note">' + note + '</span></span>' +
      '<span class="ledger__dots" aria-hidden="true"></span>' +
      '<span class="ledger__price"><sup>$</sup>' + price + '</span></li>';
  }

  var RATES = {
    body:
      '<p class="eyebrow">The Ledger</p>' +
      '<h2 class="h-name">Rates &amp; Registration</h2>' +
      '<ul class="ledger">' +
      ledgerRow('Early', 'through August 2', '69') +
      ledgerRow('Regular', 'August 3 – September 13', '79') +
      ledgerRow('Last Chance', 'from September 14', '89') +
      ledgerRow('Students', '6th grade – college, to age 23', '25') +
      '</ul>' +
      '<p class="fine">Every ticket admits you to the whole conference — all sessions, Friday’s After Show, Saturday breakfast and a special gift. Registration fees are non-refundable, but tickets may be given to a friend.</p>'
  };

  var SCHOLARSHIPS = {
    cls: 'pg--center', body:
      '<p class="eyebrow">Scholarships &amp; Sponsorship</p>' +
      '<p class="body-copy dropcap">No woman should miss Zoe for want of a ticket. Partial scholarships are available for ladies of The Life Church — apply at <strong>zoeconference.com/scholarship</strong> to be added to the list as funds become available.</p>' +
      '<p class="body-copy">Want to make a way for someone else? Give at <strong>thelifechurch.com/give</strong> and choose the “Zoe Conference Scholarship” fund.</p>' +
      FLOURISH +
      '<p style="text-align:center"><a class="btn-page js-register" href="#">Reserve your place</a></p>'
  };

  var PLATE_ROSES = {
    cls: 'pg--plate', chrome: 'none', body:
      '<div class="plate__art" style="background-image:url(\'art/plate-roses.jpg\')"></div>' +
      '<p class="plate__caption"><strong>FOR THE HEROINES</strong> · in our midst</p>'
  };

  var FOUNDATION = {
    cls: 'pg--center', body:
      '<p class="eyebrow">Life Women’s Foundation</p>' +
      '<h2 class="h-name">Kindness, Written In</h2>' +
      '<p class="body-copy dropcap">Life Women’s Foundation was established to show God’s kindness and honor the journey of women in our world — because simple acts of generosity speak louder than words, and can lift a life in a difficult season.</p>' +
      '<p class="body-copy">Each year we celebrate heroines in our midst: surprising them with gifts, lavishing them with love and cheering them on as God works in their lives.</p>' +
      '<p class="fine">Sow into the Foundation at the conference through our annual offering and the Foundation Store — all proceeds benefit the Foundation.</p>'
  };

  var FAQ_LEFT = {
    body:
      '<p class="eyebrow">Questions &amp; Answers</p>' +
      '<dl class="qa">' +
      '<dt>Can I bring my children?</dt><dd>We don’t offer childcare, and children — including infants — aren’t permitted in the building. Daughters in 6th–12th grade are welcome at the student rate.</dd>' +
      '<dt>What’s included?</dt><dd>All sessions, Friday’s After Show, Saturday breakfast and a special gift — plus photo moments and the Zoe Foundation Store.</dd>' +
      '<dt>What is the After Show?</dt><dd>Friday night’s hosted event after the session: live entertainment, audience games, prizes and giveaways.</dd>' +
      '<dt>Is seating assigned?</dt><dd>Seating is general admission; doors open one hour before each session.</dd>' +
      '</dl>'
  };

  var FAQ_RIGHT = {
    body:
      '<dl class="qa">' +
      '<dt>Are there refunds?</dt><dd>All sales are final, but tickets may be given to a friend or family member.</dd>' +
      '<dt>Will I get e-tickets?</dt><dd>Yes — a PDF arrives with your confirmation email. Show it on your phone or print it.</dd>' +
      '<dt>Is Spanish translation available?</dt><dd>Yes — translation services are available in Spanish during the conference.</dd>' +
      '<dt>What should I bring?</dt><dd>A Bible, a notebook and a friend.</dd>' +
      '</dl>' +
      FLOURISH +
      '<p class="fine" style="text-align:center">Every answer, in full: <strong>zoeconference.com/faqs</strong><br>Need help? <a href="mailto:zoe@thelifechurch.com">zoe@thelifechurch.com</a></p>'
  };

  var FINALE_LEFT = {
    cls: 'pg--center', body:
      '<p class="chapter-no">Epilogue</p>' +
      '<h2 class="h-display">…or rather, a beginning.</h2>' +
      '<p class="body-copy dropcap">Every story starts somewhere. Yours might start in a garden — two days in September, a company of women, and the God who still walks with us in the cool of the day.</p>' +
      '<p class="body-copy">We’ve saved you a seat, and a page. Come write your chapter.</p>' +
      FLOURISH +
      '<p class="fine" style="text-align:center">September 25 &amp; 26, 2026 · The Life Church · Memphis</p>'
  };

  var REGISTER_PAGE = {
    chrome: 'none', body:
      '<div class="register-page">' +
      '<img class="titlepage__icon" src="images/z-icon.png" alt="">' +
      '<h2 class="register__title">Reserve your page</h2>' +
      '<p class="register__dates">September 25 &amp; 26 · MMXXVI</p>' +
      '<a class="btn-register js-register" href="#">Register Now</a>' +
      '<p class="register__contact">The Life Church — Houston Levee · Eads, Tennessee<br>Questions? <a href="mailto:zoe@thelifechurch.com">zoe@thelifechurch.com</a></p>' +
      '</div>'
  };

  /* --- the spreads (desktop) --- */
  var SPREADS = [
    { id: 'titlepage',  label: 'Title Page',            hold: 0.85, left: ENDPAPER,     right: TITLE_PAGE },
    { id: 'theme',      label: 'In the Beginning…',     hold: 1.0,  left: PLATE_EDEN,   right: THEME_PAGE },
    { id: 'letter',     label: 'A Letter',              hold: 1.15, left: LETTER_ONE,   right: PLATE_FLOWER },
    { id: 'lisa',       label: 'Lisa Harper',           hold: 1.0,  left: LISA_PORTRAIT, right: LISA_BIO, jump: 'speakers' },
    { id: 'manny',      label: 'Manny Arango',          hold: 1.0,  left: MANNY_BIO,    right: MANNY_PORTRAIT },
    { id: 'schedule',   label: 'The Two Days',          hold: 1.05, left: FRIDAY,       right: SATURDAY, jump: 'details' },
    { id: 'rates',      label: 'The Ledger',            hold: 1.05, left: RATES,        right: SCHOLARSHIPS, jump: 'rates' },
    { id: 'foundation', label: 'The Foundation',        hold: 1.0,  left: PLATE_ROSES,  right: FOUNDATION },
    { id: 'faqs',       label: 'Questions & Answers',   hold: 1.25, left: FAQ_LEFT,     right: FAQ_RIGHT, jump: 'faqs' },
    { id: 'finale',     label: 'Your Page',             hold: 1.0,  left: FINALE_LEFT,  right: REGISTER_PAGE, jump: 'register' }
  ];

  /* --- the pages (mobile, single-leaf) --- */
  var MOBILE_PAGES = [
    { def: TITLE_PAGE,     label: 'Title Page' },
    { def: PLATE_EDEN,     label: 'The Garden' },
    { def: THEME_PAGE,     label: 'In the Beginning…' },
    { def: LETTER_MOBILE,  label: 'A Letter' },
    { def: PLATE_FLOWER,   label: 'The First Bloom' },
    { def: LISA_PORTRAIT,  label: 'Lisa Harper', jump: 'speakers' },
    { def: LISA_BIO,       label: 'Lisa Harper' },
    { def: MANNY_BIO,      label: 'Manny Arango' },
    { def: MANNY_PORTRAIT, label: 'Manny Arango' },
    { def: FRIDAY,         label: 'Friday', jump: 'details' },
    { def: SATURDAY,       label: 'Saturday' },
    { def: RATES,          label: 'The Ledger', jump: 'rates' },
    { def: SCHOLARSHIPS,   label: 'Scholarships' },
    { def: FOUNDATION,     label: 'The Foundation' },
    { def: FAQ_LEFT,       label: 'Questions', jump: 'faqs' },
    { def: FAQ_RIGHT,      label: 'Questions' },
    { def: REGISTER_PAGE,  label: 'Your Page', jump: 'register' }
  ];

  /* ============================================================
     RENDER
     ============================================================ */
  var bookWrap = document.getElementById('bookWrap');
  var scrollSection = document.getElementById('bookScroll');
  var scrollHint = document.getElementById('scrollHint');
  var folioIndicator = document.getElementById('folioIndicator');

  function pageHTML(def, side, folio) {
    var cls = 'pg pg--' + side + (def.cls ? ' ' + def.cls : '');
    if (def.chrome === 'none') {
      return '<div class="' + cls + '">' + def.body + '</div>';
    }
    var foot = folio ? '<div class="pg__folio">· ' + folio + ' ·</div>' : '';
    return '<div class="' + cls + '">' +
      '<div class="pg__head">' + RUNNING_HEAD + '</div>' +
      '<div class="pg__body">' + def.body + '</div>' + foot +
      '</div>';
  }

  /* Builds the physical book. Returns {leaves, labels, jumpTimes-ready meta} */
  function buildBook(single) {
    bookWrap.classList.toggle('book-wrap--single', single);
    var html = '';
    html += '<div class="book" id="book">';
    html += '<div class="board board--right" id="boardRight"></div>';
    html += '<div class="board board--left" id="boardLeft"></div>';
    html += '<div class="block-edge block-edge--right" id="edgeRight"></div>';
    html += '<div class="block-edge block-edge--left" id="edgeLeft"></div>';

    var leaves = [];   // {frontHTML, backHTML, label, jump}
    var folio = 0;
    function nextFolio(def) { return def.chrome === 'none' ? 0 : ++folio; }

    if (!single) {
      // leaf 0: cover | first spread's left page
      leaves.push({ front: pageHTML(COVER, 'recto'), back: pageHTML(SPREADS[0].left, 'verso', nextFolio(SPREADS[0].left)), cover: true, label: 'Cover', jump: 'cover' });
      for (var i = 0; i < SPREADS.length - 1; i++) {
        leaves.push({
          front: pageHTML(SPREADS[i].right, 'recto', nextFolio(SPREADS[i].right)),
          back: pageHTML(SPREADS[i + 1].left, 'verso', nextFolio(SPREADS[i + 1].left)),
          label: SPREADS[i].label, jump: SPREADS[i].jump, spread: i
        });
      }
      var last = SPREADS[SPREADS.length - 1];
      var staticHTML = pageHTML(last.right, 'recto', nextFolio(last.right));
      html += '<div class="page-static page-static--right">' + staticHTML + '</div>';
    } else {
      var blank = { cls: 'pg--blank', chrome: 'none', body: '' };
      leaves.push({ front: pageHTML(COVER, 'recto'), back: pageHTML(blank, 'verso'), cover: true, label: 'Cover', jump: 'cover' });
      for (var m = 0; m < MOBILE_PAGES.length - 1; m++) {
        leaves.push({
          front: pageHTML(MOBILE_PAGES[m].def, 'recto', nextFolio(MOBILE_PAGES[m].def)),
          back: pageHTML(blank, 'verso'),
          label: MOBILE_PAGES[m].label, jump: MOBILE_PAGES[m].jump, spread: m
        });
      }
      var lastPg = MOBILE_PAGES[MOBILE_PAGES.length - 1];
      html += '<div class="page-static page-static--right">' + pageHTML(lastPg.def, 'recto', nextFolio(lastPg.def)) + '</div>';
    }

    leaves.forEach(function (leaf, i) {
      html += '<div class="leaf' + (leaf.cover ? ' leaf--cover' : '') + '" data-leaf="' + i + '" style="z-index:' + (60 - i) + '">' +
        '<div class="leaf__face leaf__face--front">' + leaf.front + '</div>' +
        '<div class="leaf__face leaf__face--back">' + leaf.back + '</div>' +
        '</div>';
    });

    html += '<div class="cast cast--right" id="castRight"></div>';
    html += '<div class="cast cast--left" id="castLeft"></div>';
    html += '</div>';
    bookWrap.innerHTML = html;
    wireRegister(bookWrap);
    return leaves;
  }

  /* ============================================================
     ANIMATE — one scrubbed timeline; each leaf turn = 1 beat
     ============================================================ */
  var tl = null;
  var jumpTimes = {};   // name -> timeline time
  var spreadMarks = []; // {time, label, page, pages}

  function buildTimeline(single) {
    var leaves = buildBook(single);
    var leafEls = Array.prototype.slice.call(bookWrap.querySelectorAll('.leaf'));
    var book = document.getElementById('book');
    var boardLeft = document.getElementById('boardLeft');
    var edgeLeft = document.getElementById('edgeLeft');
    var castRight = document.getElementById('castRight');
    var castLeft = document.getElementById('castLeft');
    var TOPZ = 220;

    // starting pose: closed book, centered on its cover
    if (!single) gsap.set(book, { xPercent: -25 });

    /* holds[i] = dwell after leaf i flips (i.e. reading time of what it reveals) */
    var holds = leaves.map(function (leaf, i) {
      if (single) return MOBILE_PAGES[i] && /Questions|Ledger|Letter/.test(MOBILE_PAGES[i].label) ? 1.0 : 0.8;
      return SPREADS[i] ? SPREADS[i].hold : 1.0;
    });

    // total beats -> scroll length
    var INTRO = 0.45, OUTRO = 1.1;
    var total = INTRO + OUTRO;
    leaves.forEach(function (_, i) { total += 1 + holds[i]; });
    scrollSection.style.height = Math.round(total * 62) + 'vh';

    jumpTimes = { cover: 0.001 };
    spreadMarks = [{ time: 0, label: 'Cover', page: 0 }];

    tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: scrollSection,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.7,
        pin: '#stage',
        anticipatePin: 1,
        onUpdate: onScrollUpdate
      }
    });

    var t = INTRO;
    leaves.forEach(function (leaf, i) {
      var el = leafEls[i];
      var front = el.querySelector('.leaf__face--front');
      var back = el.querySelector('.leaf__face--back');

      tl.set(el, { zIndex: TOPZ }, t);
      tl.to(el, {
        rotationY: -180, duration: 1, ease: 'power1.inOut',
        onUpdate: function () {
          var p = this.progress();
          front.style.setProperty('--shade', (p < 0.5 ? (p / 0.5) * 0.55 : 0).toFixed(3));
          back.style.setProperty('--shade', (p >= 0.5 ? (1 - (p - 0.5) / 0.5) * 0.55 : 0.55).toFixed(3));
          castRight.style.opacity = (p < 0.6 ? Math.sin((p / 0.6) * Math.PI) * 0.5 : 0).toFixed(3);
          castLeft.style.opacity = (p > 0.4 ? Math.sin(((p - 0.4) / 0.6) * Math.PI) * 0.42 : 0).toFixed(3);
        }
      }, t);
      if (i === 0 && !single) {
        tl.to(book, { xPercent: 0, duration: 1, ease: 'power1.inOut' }, t);
        tl.to([boardLeft, edgeLeft], { opacity: 1, duration: 0.45 }, t + 0.5);
      }
      tl.set(el, { zIndex: i + 1 }, t + 1);

      t += 1;
      var revealed = leaves[i + 1] || null;
      spreadMarks.push({ time: t, label: revealed ? revealed.label : (single ? MOBILE_PAGES[MOBILE_PAGES.length - 1].label : SPREADS[SPREADS.length - 1].label), page: i + 1 });
      t += holds[i];
    });
    tl.to({}, { duration: OUTRO }, t);

    /* jump targets: the moment the spread with that content is OPEN.
       Content of spread k is visible after leaf k has flipped. */
    if (!single) {
      SPREADS.forEach(function (s, k) {
        if (s.jump) jumpTimes[s.jump] = timeAfterLeaf(k, holds);
      });
    } else {
      MOBILE_PAGES.forEach(function (p, k) {
        if (p.jump) jumpTimes[p.jump] = timeAfterLeaf(k, holds);
      });
    }
    function timeAfterLeaf(k, holds) {
      var tt = INTRO;
      for (var j = 0; j <= k; j++) tt += 1 + (j < k ? holds[j] : 0);
      return tt + 0.02;
    }

    /* accessibility: only the open spread is reachable by keyboard / AT */
    accessFaces = {
      leaves: leafEls.map(function (el) {
        return { front: el.querySelector('.leaf__face--front'), back: el.querySelector('.leaf__face--back') };
      }),
      staticPg: bookWrap.querySelector('.page-static')
    };
    accessSingle = single;
    lastAccessPage = -1;
    updateFaceAccess(0);

    window.__zoeBook = { tl: tl, jumpTimes: jumpTimes, spreadMarks: spreadMarks };
    wireRegister(document);
  }

  /* ---------- Hidden-page focus/AT management ---------- */
  var accessFaces = null, accessSingle = false, lastAccessPage = -1;
  function setAccess(el, visible) {
    if (!el) return;
    if (visible) { el.inert = false; el.removeAttribute('aria-hidden'); }
    else { el.inert = true; el.setAttribute('aria-hidden', 'true'); }
  }
  function updateFaceAccess(page) {
    if (!accessFaces) return;
    var n = accessFaces.leaves.length;
    accessFaces.leaves.forEach(function (f, i) {
      setAccess(f.front, i === page);                    // current right page / single page
      setAccess(f.back, !accessSingle && i === page - 1); // current left page (spread mode)
    });
    setAccess(accessFaces.staticPg, page === n);
  }

  function onScrollUpdate(st) {
    var p = st.progress;
    if (scrollHint) scrollHint.classList.toggle('is-hidden', p > 0.015);
    if (!folioIndicator || !tl) return;
    var time = p * tl.duration();
    var current = spreadMarks[0];
    for (var i = 0; i < spreadMarks.length; i++) {
      if (spreadMarks[i].time <= time + 0.5) current = spreadMarks[i];
    }
    var show = p > 0.03 && p < 0.985 && current.page > 0;
    folioIndicator.classList.toggle('is-visible', show);
    if (show) folioIndicator.textContent = '‹ ' + current.label + ' · leaf ' + current.page + ' of ' + (spreadMarks.length - 1) + ' ›';
    if (current.page !== lastAccessPage) {
      lastAccessPage = current.page;
      updateFaceAccess(current.page);
    }
  }

  /* ---------- Jump navigation ---------- */
  var lenis = null;
  var jumpRetry = null;
  function cancelJumpRetry() {
    if (jumpRetry) { clearTimeout(jumpRetry); jumpRetry = null; }
  }
  /* the reader taking over (wheel/touch) always outranks a pending correction */
  window.addEventListener('wheel', cancelJumpRetry, { passive: true });
  window.addEventListener('touchstart', cancelJumpRetry, { passive: true });

  function jumpTo(name) {
    if (reduceMotion) {
      var target = document.getElementById('flat-' + name);
      if (target) target.scrollIntoView({ behavior: 'auto' });
      else window.scrollTo(0, 0); // brand/cover has no flat anchor — top of the book
      return;
    }
    if (!tl || !tl.scrollTrigger) return;
    cancelJumpRetry();
    var time = jumpTimes[name] != null ? jumpTimes[name] : 0;
    function targetY() {
      var st = tl.scrollTrigger;
      return st.start + (time / tl.duration()) * (st.end - st.start);
    }
    if (lenis) {
      lenis.scrollTo(targetY(), { duration: 1.8 });
      /* a late window-load ScrollTrigger.refresh() can interrupt the glide —
         if we didn't arrive (and nothing outranked us), finish the trip.
         y is recomputed at fire time in case refresh changed the mapping. */
      jumpRetry = setTimeout(function () {
        jumpRetry = null;
        var y = targetY();
        if (Math.abs(window.scrollY - y) > 8) lenis.scrollTo(y, { duration: 0.7 });
      }, 2050);
    } else {
      window.scrollTo({ top: targetY(), behavior: 'smooth' });
    }
  }

  document.querySelectorAll('[data-jump]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (a.classList.contains('js-register') && REGISTER_URL) return; // let real link work
      e.preventDefault();
      closeMenu();
      jumpTo(a.getAttribute('data-jump'));
    });
  });

  /* ---------- Nav chrome ---------- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var mmenu = document.getElementById('mobileMenu');
  function onScrollNav() { nav.classList.toggle('nav--scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();
  function closeMenu() {
    if (!burger) return;
    var wasOpen = burger.classList.contains('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    mmenu.classList.remove('is-open');
    mmenu.setAttribute('aria-hidden', 'true');
    if (wasOpen) burger.focus(); // don't strand keyboard focus in a hidden menu
  }
  if (burger) {
    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mmenu.classList.toggle('is-open', open);
      mmenu.setAttribute('aria-hidden', String(!open));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mmenu.classList.contains('is-open')) closeMenu();
    });
  }

  /* ---------- Dust motes ---------- */
  function startDust() {
    var canvas = document.getElementById('dust');
    if (!canvas || reduceMotion) return;
    var ctx = canvas.getContext('2d');
    var motes = [];
    function resize() {
      canvas.width = canvas.clientWidth * devicePixelRatio;
      canvas.height = canvas.clientHeight * devicePixelRatio;
    }
    resize();
    window.addEventListener('resize', resize);
    for (var i = 0; i < 42; i++) {
      motes.push({
        x: Math.random(), y: Math.random(),
        r: 0.6 + Math.random() * 1.7,
        vx: (Math.random() - 0.5) * 0.00012,
        vy: -0.00005 - Math.random() * 0.00013,
        a: 0.06 + Math.random() * 0.2,
        tw: Math.random() * Math.PI * 2
      });
    }
    (function frame(ts) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      motes.forEach(function (m) {
        m.x += m.vx; m.y += m.vy; m.tw += 0.01;
        if (m.y < -0.02) { m.y = 1.02; m.x = Math.random(); }
        if (m.x < -0.02) m.x = 1.02; if (m.x > 1.02) m.x = -0.02;
        var alpha = m.a * (0.6 + 0.4 * Math.sin(m.tw));
        ctx.beginPath();
        ctx.fillStyle = 'rgba(230,207,159,' + alpha.toFixed(3) + ')';
        ctx.arc(m.x * canvas.width, m.y * canvas.height, m.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(frame);
    })();
  }

  /* ============================================================
     REDUCED MOTION — lay the book flat
     ============================================================ */
  function buildFlat() {
    var stageSection = document.getElementById('bookScroll');
    stageSection.innerHTML = '';
    stageSection.removeAttribute('style');
    var html = '<div class="flatbook">';
    html += '<div class="flatbook__intro">' +
      '<img src="images/title-gold-trim.png" alt="In the Beginning…">' +
      '<p class="folio-indicator is-visible" style="position:static;transform:none">Zoe Conference · September 25 &amp; 26, 2026 · Memphis</p>' +
      '</div>';
    var folio = 0;
    function nf(def) { return def.chrome === 'none' ? 0 : ++folio; }
    SPREADS.forEach(function (s) {
      var anchor = s.jump ? ' id="flat-' + s.jump + '"' : '';
      html += '<div class="flat-spread"' + anchor + '>' +
        pageHTML(s.left, 'verso', nf(s.left)) +
        pageHTML(s.right, 'recto', nf(s.right)) +
        '</div>';
    });
    html += '</div>';
    stageSection.innerHTML = html;
    wireRegister(stageSection);
  }

  /* ============================================================
     BOOT + responsive rebuild
     ============================================================ */
  function isSingle() { return window.innerWidth < MOBILE_BP; }
  var currentSingle = null;

  function boot() {
    if (reduceMotion || !window.gsap || !window.ScrollTrigger) {
      buildFlat();
      wireRegister(document);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    if (window.Lenis) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.0 });
      window.__lenis = lenis;
      lenis.on('scroll', function () { ScrollTrigger.update(); });
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    currentSingle = isSingle();
    buildTimeline(currentSingle);
    /* Lenis was created before the book set the page height — re-measure,
       and again on window load, or every glide clamps to a stale limit */
    if (lenis) lenis.resize();
    window.addEventListener('load', function () {
      if (lenis) lenis.resize();
      ScrollTrigger.refresh();
    });
    startDust();

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (isSingle() === currentSingle) { ScrollTrigger.refresh(); return; }
        var progress = tl && tl.scrollTrigger ? tl.scrollTrigger.progress : 0;
        if (tl) { tl.scrollTrigger.kill(true); tl.kill(); tl = null; }
        currentSingle = isSingle();
        buildTimeline(currentSingle);
        if (lenis) lenis.resize();
        ScrollTrigger.refresh();
        var st = tl.scrollTrigger;
        var y = st.start + progress * (st.end - st.start);
        /* Lenis ignores external scrolls while a glide is settling — go through it */
        if (lenis) lenis.scrollTo(y, { immediate: true });
        else window.scrollTo(0, y);
      }, 250);
    });
  }

  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();

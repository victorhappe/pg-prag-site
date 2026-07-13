/* =========================
   MOBILMENU
========================= */

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });
}

/* =========================
   PG COUNTDOWN
========================= */

const targetDate = new Date("2026-07-11T12:00:00+02:00").getTime();

const countdown = document.querySelector(".countdown");

const countdownEls = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

let countdownInterval;

function updateCountdown() {
  if (!countdown) return;

  const now = Date.now();
  const distance = targetDate - now;

  if (distance <= 0) {
    countdown.innerHTML = "<h3>🍻 PG ER I GANG 🍻</h3>";

    const overlay = document.querySelector("#pgStartOverlay");

    if (overlay && !localStorage.getItem("pgStartShown")) {
      overlay.classList.remove("hidden");
      localStorage.setItem("pgStartShown", "true");

      launchCelebration();

      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 5000);
    }

    clearInterval(countdownInterval);
    return;
  }

  if (!countdownEls.days || !countdownEls.hours || !countdownEls.minutes || !countdownEls.seconds) {
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdownEls.days.textContent = String(days).padStart(2, "0");
  countdownEls.hours.textContent = String(hours).padStart(2, "0");
  countdownEls.minutes.textContent = String(minutes).padStart(2, "0");
  countdownEls.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000);

/* =========================
   STARTANIMATION
========================= */

function launchCelebration() {
  const beerContainer = document.querySelector("#beerRain");
  const confettiContainer = document.querySelector("#confetti");

  if (!beerContainer || !confettiContainer) return;

  beerContainer.innerHTML = "";
  confettiContainer.innerHTML = "";

  for (let i = 0; i < 40; i++) {
    const beer = document.createElement("div");

    beer.className = "beer";
    beer.textContent = "🍺";
    beer.style.left = `${Math.random() * 100}vw`;
    beer.style.animationDuration = `${3 + Math.random() * 2}s`;
    beer.style.animationDelay = `${Math.random()}s`;

    beerContainer.appendChild(beer);
  }

  const colors = ["#f5c15d", "#ffffff", "#2ecc71", "#3498db", "#e74c3c"];

  for (let i = 0; i < 140; i++) {
    const piece = document.createElement("div");

    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${2 + Math.random() * 3}s`;
    piece.style.animationDelay = `${Math.random()}s`;

    confettiContainer.appendChild(piece);
  }
}

/* =========================
   HEMMELIG PG-RUTE
========================= */

const routeStops = [
  {
    number: 1,
    time: "12:00",
    name: "Airbnb – Suiten",
    game: "Sauna Mania, Cocktail Crashout, Pub Race",
    address: "Smíchov, 150 00 Prag 5, Tjekkiet",
  },
  {
    number: 2,
    time: "13:30",
    name: "Rocky O'Reilly's",
    game: "Bar Race",
    address: "Štěpánská 32, 110 00 Nové Město, Tjekkiet",
  },
  {
    number: 3,
    time: "14:45",
    name: "Oktoberfest Pub",
    game: "Tid, timing og talent",
    address: "Rytířská 411/4, 110 00 Staré Město, Tjekkiet",
  },
  {
    number: 4,
    time: "16:00",
    name: "Valhalla Beer Club",
    game: "Styr på procenten",
    address: "Vodičkova 36, 110 00 Nové Město, Tjekkiet",
  },
  {
    number: 5,
    time: "17:15",
    name: "Fat Cat Downtown",
    game: "Hyggestop",
    address: "Karlova 44, 110 00 Staré Město, Tjekkiet",
  },
  {
    number: 6,
    time: "18:30",
    name: "Jáma Garden Pub",
    game: "Pop quiz / gameshow",
    address: "V Jámě 1671/7, 110 00 Nové Město, Tjekkiet",
  },
  {
    number: 7,
    time: "19:45",
    name: "My People Bar",
    game: "Vodka Vand",
    address: "Michalská 970/20, 110 00 Staré Město, Tjekkiet",
  },
  {
    number: 8,
    time: "21:00",
    name: "The Dubliner",
    game: "Blind Beer",
    address: "Týn 639/1, 110 00 Staré Město, Tjekkiet",
  },
  {
    number: 9,
    time: "22:30+",
    name: "Airbnb – Afterparty",
    game: "Vinder announced",
    address: "Smíchov, 150 00 Prag 5, Tjekkiet",
  },
];

const judgeBtn = document.querySelector("#judgeBtn");
const judgePanel = document.querySelector("#judgePanel");
const judgeLocked = document.querySelector("#judgeLocked");
const routeList = document.querySelector("#routeList");
const mapsLink = document.querySelector("#mapsLink");

if (judgeBtn) {
  judgeBtn.addEventListener("click", () => {
    const code = prompt("Indtast dommerkode:");

    if (code === "dirtyhaslund") {
      judgeLocked?.classList.add("hidden");
      judgePanel?.classList.remove("hidden");

      renderRoute();
      loadPgRouteMap();
    } else if (code !== null) {
      alert("Forkert kode. Ruten forbliver hemmelig.");
    }
  });
}

function renderRoute() {
  if (!routeList) return;

  routeList.innerHTML = "";

  routeStops.forEach((stop) => {
    routeList.insertAdjacentHTML(
      "beforeend",
      `
        <article class="route-stop-card">
          <div class="route-number">${stop.number}</div>

          <div>
            <h4>${stop.name}</h4>
            <p>${stop.game}</p>
            <small>${stop.address}</small>
          </div>

          <span class="route-time">${stop.time}</span>
        </article>
      `,
    );
  });

  if (mapsLink) {
    const addresses = routeStops.map((stop) => encodeURIComponent(stop.address)).join("/");

    mapsLink.href = `https://www.google.com/maps/dir/${addresses}`;
  }
}

/* =========================
   LEAFLET-KORT
========================= */

let pgMapInitialized = false;

function loadPgRouteMap() {
  if (pgMapInitialized) return;

  const mapElement = document.querySelector("#pgMap");

  if (!mapElement || typeof L === "undefined") {
    console.error("Leaflet eller #pgMap kunne ikke findes.");
    return;
  }

  pgMapInitialized = true;

  const map = L.map("pgMap").setView([50.0755, 14.4378], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  const stops = [
    [50.062802, 14.409415],
    [50.07968257024647, 14.42595589698607],
    [50.0840296734399, 14.421169996986292],
    [50.08151624966299, 14.425433754657204],
    [50.08626944937062, 14.418742239315312],
    [50.08016105374984, 14.42540869513737],
    [50.086395632939066, 14.420287881644283],
    [50.088192345804345, 14.423215510479924],
    [50.062802, 14.409415],
  ];

  routeStops.forEach((stop, index) => {
    const numberIcon = L.divIcon({
      className: "number-marker",
      html: `<span>${stop.number}</span>`,
      iconSize: [38, 38],
      iconAnchor: [19, 19],
    });

    L.marker(stops[index], {
      icon: numberIcon,
    }).addTo(map).bindPopup(`
        <strong>${stop.number}. ${stop.name}</strong>
        <br>
        ${stop.game}
        <br>
        ${stop.address}
      `);
  });

  L.polyline(stops, {
    color: "#f5c15d",
    weight: 5,
    opacity: 0.9,
    dashArray: "10, 10",
  }).addTo(map);

  map.fitBounds(stops, {
    padding: [30, 30],
  });

  setTimeout(() => {
    map.invalidateSize();
  }, 100);
}

/* =========================
   P GAMES
========================= */

const games = ["Tid mod timing", "Split the G", "Ikke bestil samme øl som en anden", "Gæt ABV", "Øl i strakt arm", "Fodres øl", "Øl stafet", "Hyggestop", "Pub Race", "Hink en Nisse", "Meyer / Hestevædeløb", "Bund en øl", "Vodka Vand", "Øl må ikke røre bord", "Bund med sugerør", "Bedste skumskæg"];

const gameGrid = document.querySelector("#gameGrid");

if (gameGrid) {
  games.forEach((game) => {
    const gameItem = document.createElement("div");

    gameItem.className = "game-item";
    gameItem.textContent = game;

    gameGrid.appendChild(gameItem);
  });
}

/* =========================
   RANDOM CHALLENGE
========================= */

const randomGameBtn = document.querySelector("#randomGameBtn");

const randomGameResult = document.querySelector("#randomGameResult");

if (randomGameBtn && randomGameResult) {
  randomGameBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * games.length);

    randomGameResult.textContent = `🎲 ${games[randomIndex]}`;
  });
}

/* =========================
   LEADERBOARD
========================= */

const teamPoints = {
  team1: Number(localStorage.getItem("team1")) || 0,
  team2: Number(localStorage.getItem("team2")) || 0,
  team3: Number(localStorage.getItem("team3")) || 0,
};

function updateLeaderboard() {
  const team1Points = document.querySelector("#team1Points");

  const team2Points = document.querySelector("#team2Points");

  const team3Points = document.querySelector("#team3Points");

  if (team1Points) {
    team1Points.textContent = teamPoints.team1;
  }

  if (team2Points) {
    team2Points.textContent = teamPoints.team2;
  }

  if (team3Points) {
    team3Points.textContent = teamPoints.team3;
  }
}

function changePoints(team, amount) {
  if (!(team in teamPoints)) return;

  teamPoints[team] += amount;

  localStorage.setItem(team, String(teamPoints[team]));

  updateLeaderboard();
}

updateLeaderboard();

/* =========================
   GEMTE HOLD
========================= */

function getSavedTeams() {
  try {
    return JSON.parse(localStorage.getItem("pgTeams"));
  } catch (error) {
    console.error("De gemte hold kunne ikke læses:", error);

    return null;
  }
}

const savedTeams = getSavedTeams();

function findPlayerTeam(playerName, fallbackTeam) {
  if (!savedTeams) return fallbackTeam;

  const teamNameMap = {
    team1: "Dirty TwoKnights",
    team2: "The Drunken Archers",
    team3: "The Lords of Beerkstein",
  };

  for (const [teamKey, members] of Object.entries(savedTeams)) {
    if (Array.isArray(members) && members.includes(playerName)) {
      return teamNameMap[teamKey] || teamKey;
    }
  }

  return fallbackTeam;
}

function loadSavedTeamsIntoPage() {
  if (!savedTeams) return;

  const teamElements = {
    team1: document.querySelector("#mainTeam1"),
    team2: document.querySelector("#mainTeam2"),
    team3: document.querySelector("#mainTeam3"),
  };

  Object.entries(teamElements).forEach(([teamKey, element]) => {
    if (!element) return;

    const members = savedTeams[teamKey];

    if (!Array.isArray(members)) return;

    element.innerHTML = members
      .map((player, index) => {
        const icon = index === 0 ? "👑" : "👤";

        return `<li>${icon} ${player}</li>`;
      })
      .join("");
  });
}

loadSavedTeamsIntoPage();

/* =========================
   SPILLERKORT
========================= */

const players = [
  {
    name: "Alfred Spikes",
    rating: 87,
    role: "Captain",
    team: "Dirty TwoKnights",
    img: "images/alfred.jpg",
    move: "Split the G",
    strength: "Shotgun",
    weakness: "Vodka Vand",
  },
  {
    name: "Dirty Hashlund",
    rating: 87,
    role: "Putter",
    team: findPlayerTeam("Dirty Hashlund", "Team ukendt"),
    img: "images/anton.jpg",
    move: "Being Dirty",
    strength: "Bar Games",
    weakness: "Stout",
  },
  {
    name: "Lithium",
    rating: 89,
    role: "Captain",
    team: "The Drunken Archers",
    img: "images/august.jpg",
    move: "Split the G",
    strength: "Hyggestop",
    weakness: "Mlíko",
  },
  {
    name: "Dobbelt Felix",
    rating: 86,
    role: "Birdie Hunter",
    team: findPlayerTeam("Dobbelt Felix", "Team ukendt"),
    img: "images/felix.jpg",
    move: "Pub Race",
    strength: "Bund en øl",
    weakness: "Ølquiz",
  },
  {
    name: "Joey",
    rating: 84,
    role: "Rookie",
    team: findPlayerTeam("Joey", "Team ukendt"),
    img: "images/joseph.jpg",
    move: "Lucky Bounce",
    strength: "Lokal Charme",
    weakness: "Vodka Vand",
  },
  {
    name: "14",
    rating: 85,
    role: "Long Driver",
    team: findPlayerTeam("14", "Team ukendt"),
    img: "images/kjartan.jpg",
    move: "Beer Sprint",
    strength: "Tempo",
    weakness: "Styr på Procenten",
  },
  {
    name: "Kåre Nivå fra Duvå",
    rating: 84,
    role: "Iron Player",
    team: findPlayerTeam("Kåre Nivå fra Duvå", "Team ukendt"),
    img: "images/kaare.jpg",
    move: "Water Hazard",
    strength: "Stabil Bund",
    weakness: "IPA",
  },
  {
    name: "Hyggestoppet",
    rating: 81,
    role: "Referee",
    team: "Dommerholdet",
    img: "images/mads.jpg",
    move: "Rulebook",
    strength: "Saunamania",
    weakness: "Vodka Vand",
  },
  {
    name: "Pony Toby",
    rating: 89,
    role: "Captain",
    team: "The Lords of Beerkstein",
    img: "images/tobias.jpg",
    move: "Shotgun",
    strength: "Hyggestop",
    weakness: "Sauna Mania",
  },
  {
    name: "Praktikanten",
    rating: 81,
    role: "Referee",
    team: "Dommerholdet",
    img: "images/victor.jpg",
    move: "Yellow Card",
    strength: "Tequila Shots",
    weakness: "Bund en øl",
  },
  {
    name: "Victatoren",
    rating: 83,
    role: "Wildcard",
    team: findPlayerTeam("Victatoren", "Team ukendt"),
    img: "images/kramp.jpg",
    move: "Chaos Card",
    strength: "Tid mod timing",
    weakness: "Blind Beer",
  },
];

const playerGrid = document.querySelector("#playerGrid");

if (playerGrid) {
  players.forEach((player) => {
    playerGrid.insertAdjacentHTML(
      "beforeend",
      `
        <article
          class="player-card"
          tabindex="0"
          aria-label="${player.name}"
        >
          <div class="player-card-inner">
            <div class="player-front">
              <div class="player-top">
                <div>
                  <span class="player-rating">
                    ${player.rating}
                  </span>

                  <span class="player-role">
                    ${player.role}
                  </span>
                </div>

                <span class="flag">🇩🇰</span>
              </div>

              <img
                src="${player.img}"
                alt="${player.name}"
                class="player-img"
              >

              <div class="player-name">
                ${player.name}
              </div>

              <div class="player-badge">
                <i class="fa-solid fa-beer-mug-empty"></i>
              </div>
            </div>

            <div class="player-back">
              <h3>${player.name}</h3>

              <p>
                <strong>Hold</strong><br>
                ${player.team}
              </p>

              <p>
                <strong>Special move</strong><br>
                ${player.move}
              </p>

              <p>
                <strong>Styrke</strong><br>
                ${player.strength}
              </p>

              <p>
                <strong>Svaghed</strong><br>
                ${player.weakness}
              </p>
            </div>
          </div>
        </article>
      `,
    );
  });

  document.querySelectorAll(".player-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.classList.toggle("flipped");
      }
    });
  });
}

/* =========================
   MEDIEVAL DINNER
========================= */

const dinnerUnlockDate = new Date("2026-07-10T19:30:00+02:00").getTime();

let dinnerCountdownInterval;

function updateDinnerCountdown() {
  const locked = document.querySelector("#dinnerLocked");

  const unlocked = document.querySelector("#dinnerUnlocked");

  if (!locked || !unlocked) return;

  const distance = dinnerUnlockDate - Date.now();

  if (distance <= 0) {
    locked.classList.add("hidden");
    unlocked.classList.remove("hidden");

    clearInterval(dinnerCountdownInterval);
    return;
  }

  const daysElement = document.querySelector("#dinnerDays");

  const hoursElement = document.querySelector("#dinnerHours");

  const minutesElement = document.querySelector("#dinnerMinutes");

  const secondsElement = document.querySelector("#dinnerSeconds");

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);

  const minutes = Math.floor((distance / (1000 * 60)) % 60);

  const seconds = Math.floor((distance / 1000) % 60);

  if (daysElement) {
    daysElement.textContent = String(days).padStart(2, "0");
  }

  if (hoursElement) {
    hoursElement.textContent = String(hours).padStart(2, "0");
  }

  if (minutesElement) {
    minutesElement.textContent = String(minutes).padStart(2, "0");
  }

  if (secondsElement) {
    secondsElement.textContent = String(seconds).padStart(2, "0");
  }
}

updateDinnerCountdown();

dinnerCountdownInterval = setInterval(updateDinnerCountdown, 1000);

const quizQuestions = [
  {
    question: "Hvilken flod løber gennem Prag?",
    options: ["A) Donau", "B) Elben", "C) Vltava (Moldau)", "D) Oder"],
    answer: "C) Vltava (Moldau)",
    fact: "Vltava er Tjekkiets længste flod og løber gennem hjertet af Prag.",
  },

  {
    question: "Prag Slot er kendt for at være...",
    options: ["A) Europas højeste slot", "B) Verdens største gamle slotskompleks", "C) Verdens ældste slot", "D) Europas største museum"],
    answer: "B) Verdens største gamle slotskompleks",
    fact: "Prague Castle står i Guinness World Records.",
  },

  {
    question: "Hvad hedder Prags berømte astronomiske ur?",
    options: ["A) Big Ben", "B) Orloj", "C) Astrolux", "D) Chronos"],
    answer: "B) Orloj",
    fact: "Uret blev installeret i 1410 og er et af verdens ældste fungerende astronomiske ure.",
  },

  {
    question: "Hvilken tjekkisk øl blev verdens første pilsner?",
    options: ["A) Budvar", "B) Kozel", "C) Staropramen", "D) Pilsner Urquell"],
    answer: "D) Pilsner Urquell",
    fact: "Den første pilsner blev brygget i Plzeň i 1842.",
  },

  {
    question: "Tjekkiet topper ofte verdensstatistikken i...",
    options: ["A) Kaffeforbrug", "B) Vinforbrug", "C) Ølforbrug pr. indbygger", "D) Vodkaforbrug"],
    answer: "C) Ølforbrug pr. indbygger",
    fact: "En gennemsnitlig tjekke drikker omkring 150 liter øl om året.",
  },

  {
    question: "Hvor mange statuer står der langs Karlsbroen?",
    options: ["A) 20", "B) 25", "C) 30", "D) 36"],
    answer: "C) 30",
    fact: "De fleste er kopier – originalerne står på museum.",
  },

  {
    question: "Hvad hedder valutaen i Tjekkiet?",
    options: ["A) Euro", "B) Zloty", "C) Koruna", "D) Forint"],
    answer: "C) Koruna",
    fact: "Tjekkiet har stadig ikke indført euro.",
  },

  {
    question: "Hvilken af disse personer blev født i Prag?",
    options: ["A) Franz Kafka", "B) Albert Einstein", "C) Mozart", "D) Beethoven"],
    answer: "A) Franz Kafka",
    fact: "Kafka blev født i Prag i 1883.",
  },

  {
    question: "Hvilken farve har sporvognene, som er et symbol på Prag?",
    options: ["A) Grøn", "B) Rød", "C) Blå", "D) Gul"],
    answer: "B) Rød",
    fact: "De røde sporvogne er et af Prags mest ikoniske kendetegn.",
  },

  {
    question: "Hvornår blev Karlsbroen påbegyndt?",
    options: ["A) 1212", "B) 1357", "C) 1492", "D) 1601"],
    answer: "B) 1357",
    fact: "Grundstenen blev ifølge legenden lagt 9. juli 1357 kl. 05:31.",
  },
];

const quizList = document.querySelector("#quizList");
const quizJudgeBtn = document.querySelector("#quizJudgeBtn");
const hideAnswersBtn = document.querySelector("#hideAnswersBtn");

function renderQuiz() {
  if (!quizList) return;

  quizList.innerHTML = quizQuestions
    .map(
      (item, index) => `
        <article class="quiz-card">
          <div class="quiz-number">${index + 1}</div>

          <div class="quiz-content">
            <h3>${item.question}</h3>

            <div class="quiz-options">
              ${item.options.map((option) => `<p>${option}</p>`).join("")}
            </div>

            <div class="quiz-answer hidden">
              <strong>Rigtigt svar:</strong>
              <p>${item.answer}</p>
              <small>${item.fact}</small>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

renderQuiz();

if (quizJudgeBtn) {
  quizJudgeBtn.addEventListener("click", () => {
    const code = prompt("Indtast dommerkode:");

    if (code === "dirtyhaslund") {
      document.querySelectorAll(".quiz-answer").forEach((answer) => {
        answer.classList.remove("hidden");
      });

      quizJudgeBtn.classList.add("hidden");
      hideAnswersBtn?.classList.remove("hidden");
    } else if (code !== null) {
      alert("Forkert kode. Facit forbliver skjult.");
    }
  });
}

if (hideAnswersBtn) {
  hideAnswersBtn.addEventListener("click", () => {
    document.querySelectorAll(".quiz-answer").forEach((answer) => {
      answer.classList.add("hidden");
    });

    hideAnswersBtn.classList.add("hidden");
    quizJudgeBtn?.classList.remove("hidden");
  });
}

renderRoute();
loadPgRouteMap();

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});

const targetDate = new Date("2026-07-11T12:00:00+02:00").getTime();
const countdownEls = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    document.querySelector(".countdown").innerHTML = "<h3>PG ER I GANG 🍻</h3>";

    const overlay = document.querySelector("#pgStartOverlay");

    if (overlay && !localStorage.getItem("pgStartShown")) {
      overlay.classList.remove("hidden");
      localStorage.setItem("pgStartShown", "true");

      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 5000);
    }

    return;
  }

  countdownEls.days.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
  countdownEls.hours.textContent = Math.floor((distance / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, "0");
  countdownEls.minutes.textContent = Math.floor((distance / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  countdownEls.seconds.textContent = Math.floor((distance / 1000) % 60)
    .toString()
    .padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

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

judgeBtn.addEventListener("click", () => {
  const code = prompt("Indtast dommerkode:");

  if (code === "dirtyhaslund") {
    judgeLocked.classList.add("hidden");
    judgePanel.classList.remove("hidden");
    renderRoute();
    loadPgRouteMap();
  }
});

function renderRoute() {
  routeList.innerHTML = "";

  routeStops.forEach((stop) => {
    routeList.innerHTML += `
      <article class="route-stop-card">
        <div class="route-number">${stop.number}</div>

        <div>
          <h4>${stop.name}</h4>
          <p>${stop.game}</p>
          <small>${stop.address}</small>
        </div>

        <span class="route-time">${stop.time}</span>
      </article>
    `;
  });

  const addresses = routeStops.map((stop) => encodeURIComponent(stop.address)).join("/");
  mapsLink.href = `https://www.google.com/maps/dir/${addresses}`;
}

const games = ["Tid mod timing", "Split the G", "Ikke bestil samme øl som en anden", "Gæt ABV", "Øl i strakt arm", "Fodres øl", "Øl stafet", "Hyggestop", "Pub Race", "Hink en Nisse", "Meyer / Hestevædeløb", "Bund en øl", "Vodka Vand", "Øl må ikke røre bord", "Bund med sugerør", "Bedste skumskæg"];

const huntItems = [
  "Drik en mlíko",
  "Tag en tur med letbanen",
  "Find 67 et sted i Prag",
  "Tag en selfie med en statue",
  "Find en gade med brosten og læg på den",
  "Tag et billede på Karlsbroen",
  "Bestil en øl på tjekkisk",
  "Køb en snack for under 30 CZK",
  "Få en fremmed til at tage et gruppebillede",
  "Find 69 et sted i Prag",
  "Find en bygning med gyldne detaljer",
  'Få en lokal til at sige "Skål!" på video',
  "Tag et billede med en gademusikant",
  "Find en kirke",
  "Få en highfive af en fremmed gammel mand",
  "Lav armbøjninger på Old Town Square",
  "Gå ind på en bar og spørg en gæst: “are you also running away from France?”",
  "Tag en selfie med et dansk flag",
  "Drik en mørk øl",
  "Find en pub med over 10 fadøl",
  "Få en fremmed til at lære dig et tjekkisk ord",
  "Lav en menneskepyramide",
  "Bund en liter vand",
  "Find en vinbar og bestil et glas",
  "Find et hus med en blå dør",
  "Tag en selfie med en cykel",
  "Find en pub med træbænke",
  "Tag et billede af et ur kl. 18.18",
  "Lav en rekreation af Olsen Banden, hvor I går i række efter hinanden ved en havn",
  "Hæld en øl i hovedet på en holdkammerat, der ligger ned",
  "Find et sted med levende musik",
  "Find et springvand",
  "Smag en hvedeøl",
  "Syng PG-sangen ved kanalen",
  "Find en bil med dansk nummerplade",
  "Drik skør sodavand",
  "Færdiggør en sixpack fra et supermarked",
  "Smag en lokal snaps, I ikke kender",
  "Find en bænk med udsigt",
  "Find en gade uden biler",
  "Smag en lokal pølse / glizzy",
  "Find et skakbræt i det fri",
  "Få bartenderen til at skrive holdnavnet på en serviet",
  "Færdiggør en flaske vin — supermarkedsvin er fint",
  "Tag et billede af en due",
  "Find et skilt med et tal over 100",
  "ALLE fra holdet bunder en flaske vand",
  "Bund en øl hurtigere end en fremmed lokal",
  "Find et apotek",
  "Drik en IPA",
  "Find en boghandel med MEIN KAMPF",
  "Find et træ, der er højere end bygningen ved siden af",
  "Find et rundt vindue",
  "Tag et billede af en båd",
  "Tag et spil kævle i en lokal park",
  "Find et sted, hvor man kan få ØLspa",
  "Tag en stor bid af en citron",
  "Tag et kreativt selfie med en skraldespand",
  "Find en klokke, der hænger udendørs",
  "Spot en veteranbil",
];

const gameGrid = document.querySelector("#gameGrid");
games.forEach((game) => {
  const div = document.createElement("div");
  div.className = "game-item";
  div.textContent = game;
  gameGrid.appendChild(div);
});

const huntList = document.querySelector("#huntList");
huntItems.forEach((item, index) => {
  const label = document.createElement("label");
  label.className = "hunt-item";
  label.innerHTML = `<input type="checkbox" data-id="hunt-${index}"> <span>${item}</span>`;
  huntList.appendChild(label);
});

document.querySelectorAll(".hunt-item input").forEach((input) => {
  const saved = localStorage.getItem(input.dataset.id);
  input.checked = saved === "true";
  input.addEventListener("change", () => {
    localStorage.setItem(input.dataset.id, input.checked);
  });
});

const teamPoints = {
  team1: Number(localStorage.getItem("team1")) || 0,
  team2: Number(localStorage.getItem("team2")) || 0,
  team3: Number(localStorage.getItem("team3")) || 0,
};

function updateLeaderboard() {
  document.querySelector("#team1Points").textContent = teamPoints.team1;
  document.querySelector("#team2Points").textContent = teamPoints.team2;
  document.querySelector("#team3Points").textContent = teamPoints.team3;
}

function changePoints(team, amount) {
  teamPoints[team] += amount;
  localStorage.setItem(team, teamPoints[team]);
  updateLeaderboard();
}

updateLeaderboard();

const randomGameBtn = document.querySelector("#randomGameBtn");
const randomGameResult = document.querySelector("#randomGameResult");

randomGameBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * games.length);
  randomGameResult.textContent = `🎲 ${games[randomIndex]}`;
});

function updateHuntProgress() {
  const checkboxes = document.querySelectorAll(".hunt-item input");
  const checked = document.querySelectorAll(".hunt-item input:checked").length;
  const total = checkboxes.length;
  const percentage = (checked / total) * 100;

  document.querySelector("#huntProgress").style.width = `${percentage}%`;
  document.querySelector("#huntProgressText").textContent = `${checked} / ${total} challenges klaret`;
}

document.querySelectorAll(".hunt-item input").forEach((input) => {
  input.addEventListener("change", updateHuntProgress);
});

updateHuntProgress();

const players = [
  {
    name: "Alfred Spikes",
    rating: 87,
    role: "Captain",
    team: "Team Kammerklunker",
    img: "images/alfred.jpg",
    move: "Split the G",
    strength: "Shotgun",
    weakness: "Vodka Vand",
  },

  {
    name: "Dirty Hashlund",
    rating: 84,
    role: "Putter",
    team: "Team Kammerklunker",
    img: "images/anton.jpg",
    move: "Being Dirty",
    strength: "Bar Games",
    weakness: "Stout",
  },

  {
    name: "Lithium",
    rating: 89,
    role: "Captain",
    team: "Team Whatever",
    img: "images/august.jpg",
    move: "Split the G",
    strength: "Hyggestop",
    weakness: "Mlíko",
  },

  {
    name: "Dobbelt Felix",
    rating: 82,
    role: "Birdie Hunter",
    team: "Team Bagtroppen",
    img: "images/felix.jpg",
    move: "Pub Race",
    strength: "Bund en øl",
    weakness: "Ølquiz",
  },

  {
    name: "Joey",
    rating: 80,
    role: "Rookie",
    team: "Team Whatever",
    img: "images/joseph.jpg",
    move: "Lucky Bounce",
    strength: "Lokal Charme",
    weakness: "Vodka Vand",
  },

  {
    name: "14",
    rating: 85,
    role: "Long Driver",
    team: "Team Bagtroppen",
    img: "images/kjartan.jpg",
    move: "Beer Sprint",
    strength: "Tempo",
    weakness: "Styr på Procenten",
  },

  {
    name: "Kåre Nivå fra Duvå",
    rating: 81,
    role: "Iron Player",
    team: "Team Kammerklunker",
    img: "images/kaare.jpg",
    move: "Water Hazard",
    strength: "Stabil Bund",
    weakness: "IPA",
  },

  {
    name: "Hyggestoppet",
    rating: 83,
    role: "Referee",
    team: "Dommerholdet",
    img: "images/mads.jpg",
    move: "Rulebook",
    strength: "Saunamania",
    weakness: "Vodka Vand",
  },

  {
    name: "Pony Toby",
    rating: 86,
    role: "Eagle Hunter",
    team: "Team Whatever",
    img: "images/tobias.jpg",
    move: "Shotgun",
    strength: "Hyggestop",
    weakness: "Sauna Mania",
  },

  {
    name: "Praktikanten",
    rating: 88,
    role: "Referee",
    team: "Dommerholdet",
    img: "images/victor.jpg",
    move: "Yellow Card",
    strength: "Gæt en Øl",
    weakness: "Bunde en øl",
  },

  {
    name: "Victatoren",
    rating: 83,
    role: "Wildcard",
    team: "Team Bagtroppen",
    img: "images/kramp.jpg",
    move: "Chaos Card",
    strength: "Tid mod timing",
    weakness: "Blind Beer",
  },
];

const playerGrid = document.querySelector("#playerGrid");

players.forEach((player) => {
  playerGrid.innerHTML += `
    <article class="player-card">
      <div class="player-card-inner">
        <div class="player-front">
          <div class="player-top">
            <div>
              <span class="player-rating">${player.rating}</span>
              <span class="player-role">${player.role}</span>
            </div>
            <span class="flag">🇩🇰</span>
          </div>

          <img src="${player.img}" alt="${player.name}" class="player-img">

          <div class="player-name">${player.name}</div>

          <div class="player-badge">
            <i class="fa-solid fa-beer-mug-empty"></i>
          </div>
        </div>

        <div class="player-back">
          <h3>${player.name}</h3>
          <p><strong>Hold</strong><br>${player.team}</p>
          <p><strong>Special move</strong><br>${player.move}</p>
          <p><strong>Styrke</strong><br>${player.strength}</p>
          <p><strong>Svaghed</strong><br>${player.weakness}</p>
        </div>
      </div>
    </article>
  `;
});

let pgMapInitialized = false;

function loadPgRouteMap() {
  if (pgMapInitialized) return;
  pgMapInitialized = true;

  const map = L.map("pgMap").setView([50.0755, 14.4378], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  const stops = [
    [50.062802, 14.409415], // 1 Airbnb
    [50.07968257024647, 14.42595589698607], // 2 Rocky
    [50.0840296734399, 14.421169996986292], // 3 Oktoberfest
    [50.08151624966299, 14.425433754657204], // 4 Valhalla
    [50.08626944937062, 14.418742239315312], // 5 Fat Cat
    [50.08016105374984, 14.42540869513737], // 6 Jáma
    [50.086395632939066, 14.420287881644283], // 7 My People
    [50.088192345804345, 14.423215510479924], // 8 Dubliner
    [50.062802, 14.409415], // 9 Airbnb
  ];

  routeStops.forEach((stop, index) => {
    const numberIcon = L.divIcon({
      className: "number-marker",
      html: `<span>${stop.number}</span>`,
      iconSize: [38, 38],
      iconAnchor: [19, 19],
    });

    L.marker(stops[index], { icon: numberIcon }).addTo(map).bindPopup(`<strong>${stop.number}. ${stop.name}</strong><br>${stop.game}<br>${stop.address}`);
  });

  L.polyline(stops, {
    color: "#f5c15d",
    weight: 5,
    opacity: 0.9,
    dashArray: "10, 10",
  }).addTo(map);

  map.fitBounds(stops);
}

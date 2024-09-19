const table = document.getElementById("tableBody") as HTMLTableElement;
const pgPos = document.getElementById("pgPos") as HTMLDivElement;
const sgPos = document.getElementById("sgPos") as HTMLDivElement;
const sfPos = document.getElementById("sfPos") as HTMLDivElement;
const pfPos = document.getElementById("pfPos") as HTMLDivElement;
const cPos = document.getElementById("cPos") as HTMLDivElement;
const serchPlayers = document.querySelector(
  "#serchPlayers"
) as HTMLButtonElement;
const scooterForm = document.querySelector(
  "#serchPlayerForm"
) as HTMLFormElement;
const threePercent = document.getElementById(
  "threePercent"
) as HTMLInputElement;
const twoPercent = document.getElementById("twoPercent") as HTMLInputElement;
const points = document.getElementById("points") as HTMLInputElement ;
const pointsLabel = document.getElementById("pointsLabel") as HTMLLabelElement ;
const twoPercentLabel = document.getElementById(
  "twoPercentLabel"
) as HTMLLabelElement;
const threePercentLabel = document.getElementById(
  "threePercentLabel"
) as HTMLLabelElement;

points.addEventListener("input", (event) => pointsLabel.textContent = event.target.value );
    
threePercent.addEventListener("input", (event) => threePercentLabel.textContent = event.target.value);

twoPercent.addEventListener("input", (event) => twoPercentLabel.textContent = event.target.value);


const URL_NBA: string = "https://nbaserver-q21u.onrender.com/api/filter";
let playersInNba: PlearInNBA[] = [
  {
    playerName: "Anthony Brown",
    position: "SF",
    twoPercent: 44,
    threePercent: 53,
    points: 127,
  },
];

//window.onload = () =>   renderTable(table, players);

//window.onload = () =>renderCard(document.getElementById("pgPos") as HTMLDivElement, playersInNba[0]);
function findCard(postion: string, players: PlearInNBA): any {
  switch (postion) {
    case "PG":
      renderCard(pgPos, players);
      break;
    case "SF":
      renderCard(sfPos, players);
      break;
    case "SG":
      renderCard(sgPos, players);
      break;
    case "PF":
      renderCard(pfPos, players);
      break;
    case "C":
      renderCard(cPos, players);
      break;
    default:
      break;
  }
}
function renderCard(card: HTMLDivElement, player: PlearInNBA) {
  card.innerHTML = ``;
  const name = document.createElement("p");
  const twoPercent = document.createElement("p");
  const threePercent = document.createElement("p");
  const points = document.createElement("p");

  card.appendChild(name);
  card.appendChild(threePercent);
  card.appendChild(twoPercent);
  card.appendChild(points);

  name.textContent = player.playerName;
  threePercent.textContent = `threePercent: ${player.threePercent}%`;
  twoPercent.textContent = `twoPercent: ${player.twoPercent} %`;
  points.textContent = `points: ${player.points}`;
}

scooterForm.addEventListener("submit", (e) => createOcjcte(e));
async function createOcjcte(e: Event): Promise<void> {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  // המרת FormData לאובייקט רגיל
  const formObject: playerSearch = {} as playerSearch;
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  playersInNba = await postToApi(URL_NBA, formObject);
  renderTable(table, playersInNba);
}

async function renderTable(
  table: HTMLTableElement,
  data: PlearInNBA[]
): Promise<void> {
  table.innerHTML = ""; // Clear table before re-rendering
  data.forEach((players) => insertNewScooterRow(players, table));
}

function insertNewScooterRow(
  player: PlearInNBA,
  tableDiv: HTMLTableElement
): void {
  const appedndButton: HTMLButtonElement = document.createElement("button");
  appedndButton.textContent = `add ${player.playerName} to Current Team`;
  appedndButton.classList.add("addButton");
  // Create an empty <tr> element and add it to the 1st position of the table:
  const row = tableDiv.insertRow(-1);
  row.classList.add("playerFromApi");

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);
  const cell6 = row.insertCell(5);

  // Add some text to the new cells:
  cell1.textContent = player.playerName;
  cell2.textContent = player.position;
  cell3.textContent = player.points.toString();
  cell4.textContent = player.twoPercent.toString() + "%";
  cell5.textContent = player.threePercent.toString() + "%";
  appedndButton.addEventListener("click", () =>
    findCard(player.position, player)
  );
  cell6.appendChild(appedndButton);
}

async function getPlayers(playerSearch: playerSearch): Promise<void> {}

async function postToApi(
  url: string,
  data: playerSearch
): Promise<PlearInNBA[]> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const players = await response.json();
  return players;
}

function getFromLocalStorage(key: string) {
  const value = localStorage.getItem(key);
  if (value === undefined || value === null) return [];
  return toObject(value);
}

function toString(value) {
  return JSON.stringify(value);
}

function toObject(value) {
  return JSON.parse(value);
}
function saveOnArryInLS(value) {
  let list = getFromLocalStorage("List of soldiers");
  list.push(value);
  saveAtLocalStorge(list, "List of soldiers");
}
function saveAtLocalStorge(value, key = "List of soldiers") {
  value = toString(value);
  localStorage.setItem(key, value);
}

interface playerSearch {
  position: string;
  points: number;
  twoPercent: number;
  threePercent: number;
}
interface PlearInNBA {
  position: string;
  twoPercent: Number;
  threePercent: Number;
  points: Number;
  playerName: string;
}

// const players: PlearInNBA[]
// = [
// {
//     playerName: "Anthony Brown",
//     position: "SF",
//     twoPercent: 44,
//     threePercent: 53,

//     points: 127,
//   },
//   {
//     _id: "66eb269bb98c576ab28abd4f",
//     playerName: "Caleb Martin",
//     age: 24,
//     position: "SF",
//     twoPercent: 36,
//     threePercent: 54,
//     games: 18,
//     team: "CHO",
//     season: [2020],
//     points: 111,
//     __v: 0,
//   },
//   {
//     _id: "66eb26a6b98c576ab28ac129",
//     playerName: "Dahntay Jones",
//     age: 35,
//     position: "SF",
//     twoPercent: 41,
//     threePercent: 50,
//     games: 35,
//     team: "CLE",
//     season: [2017, 2015, 2016],
//     points: 43,
//     __v: 0,
//   },
//   {
//     _id: "66eb26d2b98c576ab28ad02f",
//     playerName: "Jalen Jones",
//     age: 24,
//     position: "SF",
//     twoPercent: 47,
//     threePercent: 67,
//     games: 20,
//     team: "NOP",
//     season: [2019, 2018],
//     points: 86,
//     __v: 0,
//   },
//   {
//     _id: "66eb26d7b98c576ab28ad244",
//     playerName: "Georgios Kalaitzakis",
//     age: 23,
//     position: "SF",
//     twoPercent: 42,
//     threePercent: 50,
//     games: 9,
//     team: "MIL",
//     season: [2022],
//     points: 16,
//     __v: 0,
//   },
//   {
//     _id: "66eb26dcb98c576ab28ad402",
//     playerName: "Landry Fields",
//     age: 26,
//     position: "SF",
//     twoPercent: 45,
//     threePercent: 50,
//     games: 56,
//     team: "TOR",
//     season: [2014, 2015],
//     points: 114,
//     __v: 0,
//   },
//   {
//     _id: "66eb26e9b98c576ab28ad864",
//     playerName: "Jordan Miller",
//     age: 24,
//     position: "SF",
//     twoPercent: 57,
//     threePercent: 50,
//     games: 8,
//     team: "LAC",
//     season: [2024],
//     points: 13,
//     __v: 0,
//   },
//   {
//     _id: "66eb2731b98c576ab28aedd9",
//     playerName: "Xavier Sneed",
//     age: 25,
//     position: "SF",
//     twoPercent: 50,
//     threePercent: 50,
//     games: 4,
//     team: "CHO",
//     season: [2023],
//     points: 17,
//     __v: 0,
//   },
// ];

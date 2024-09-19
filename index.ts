const KEY_L_S = "My Fantasy Team"
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
const points = document.getElementById("points") as HTMLInputElement;
const pointsLabel = document.getElementById("pointsLabel") as HTMLLabelElement;
const twoPercentLabel = document.getElementById(
  "twoPercentLabel"
) as HTMLLabelElement;
const threePercentLabel = document.getElementById(
  "threePercentLabel"
) as HTMLLabelElement;

points.addEventListener(
  "input",
  (event) => (pointsLabel.textContent = event.target.value)
);

threePercent.addEventListener(
  "input",
  (event) => (threePercentLabel.textContent = event.target.value)
);

twoPercent.addEventListener(
  "input",
  (event) => (twoPercentLabel.textContent = event.target.value)
);

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

window.onload = () => renderAllCardfromLocalStorge();

function renderAllCardfromLocalStorge(): void {
  let value:any;
  let playersInTeam = getFromLocalStorage(KEY_L_S);
  for (let key in playersInTeam) {
    if (playersInTeam.hasOwnProperty(key)) {
        value = playersInTeam[key];
        findCard(key,value)
    }
  }
}

function findCard(postion: string, players: PlearInNBA): any {
  switch (postion) {
    case "PG":
      renderCard(pgPos, players);
      saveOnObjInLS(postion, players)
      break;
    case "SF":
      renderCard(sfPos, players);
      saveOnObjInLS(postion, players)
      break;
    case "SG":
      renderCard(sgPos, players);
      saveOnObjInLS(postion, players);
      break;
    case "PF":
      renderCard(pfPos, players);
      saveOnObjInLS(postion, players);
      break;
    case "C":
      renderCard(cPos, players);
      saveOnObjInLS(postion, players);
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
  cell6.classList.add("divOfBotton")  ;
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

function getFromLocalStorage(key: string = KEY_L_S) {
  const value = localStorage.getItem(key);
  if (value === undefined || value === null) return {};
  console.log("fund");
  return toObject(value);
}

function toString(value) {
  return JSON.stringify(value);
}

function toObject(value) {
  return JSON.parse(value);
}
function saveOnObjInLS(key, value) {
  let obj = getFromLocalStorage(KEY_L_S);
  obj[key] = value;
  saveAtLocalStorge(obj, KEY_L_S);
}
function saveAtLocalStorge(value, key = KEY_L_S) {
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


"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const KEY_L_S = "My Fantasy Team";
const table = document.getElementById("tableBody");
const pgPos = document.getElementById("pgPos");
const sgPos = document.getElementById("sgPos");
const sfPos = document.getElementById("sfPos");
const pfPos = document.getElementById("pfPos");
const cPos = document.getElementById("cPos");
const serchPlayers = document.querySelector("#serchPlayers");
const scooterForm = document.querySelector("#serchPlayerForm");
const threePercent = document.getElementById("threePercent");
const twoPercent = document.getElementById("twoPercent");
const points = document.getElementById("points");
const pointsLabel = document.getElementById("pointsLabel");
const twoPercentLabel = document.getElementById("twoPercentLabel");
const threePercentLabel = document.getElementById("threePercentLabel");
points.addEventListener("input", (event) => (pointsLabel.textContent = event.target.value));
threePercent.addEventListener("input", (event) => (threePercentLabel.textContent = event.target.value));
twoPercent.addEventListener("input", (event) => (twoPercentLabel.textContent = event.target.value));
const URL_NBA = "https://nbaserver-q21u.onrender.com/api/filter";
let playersInNba = [
    {
        playerName: "Anthony Brown",
        position: "SF",
        twoPercent: 44,
        threePercent: 53,
        points: 127,
    },
];
window.onload = () => renderAllCardfromLocalStorge();
function renderAllCardfromLocalStorge() {
    let value;
    let playersInTeam = getFromLocalStorage(KEY_L_S);
    for (let key in playersInTeam) {
        if (playersInTeam.hasOwnProperty(key)) {
            value = playersInTeam[key];
            findCard(key, value);
        }
    }
}
//window.onload = () =>renderCard(document.getElementById("pgPos") as HTMLDivElement, playersInNba[0]);
function findCard(postion, players) {
    switch (postion) {
        case "PG":
            renderCard(pgPos, players);
            saveOnObjInLS(postion, players);
            break;
        case "SF":
            renderCard(sfPos, players);
            saveOnObjInLS(postion, players);
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
function renderCard(card, player) {
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
function createOcjcte(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const formData = new FormData(e.target);
        // המרת FormData לאובייקט רגיל
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        playersInNba = yield postToApi(URL_NBA, formObject);
        renderTable(table, playersInNba);
    });
}
function renderTable(table, data) {
    return __awaiter(this, void 0, void 0, function* () {
        table.innerHTML = ""; // Clear table before re-rendering
        data.forEach((players) => insertNewScooterRow(players, table));
    });
}
function insertNewScooterRow(player, tableDiv) {
    const appedndButton = document.createElement("button");
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
    appedndButton.addEventListener("click", () => findCard(player.position, player));
    cell6.appendChild(appedndButton);
}
function getPlayers(playerSearch) {
    return __awaiter(this, void 0, void 0, function* () { });
}
function postToApi(url, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const players = yield response.json();
        return players;
    });
}
function getFromLocalStorage(key = KEY_L_S) {
    const value = localStorage.getItem(key);
    if (value === undefined || value === null)
        return {};
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

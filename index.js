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
    cell6.classList.add("divOfBotton");
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

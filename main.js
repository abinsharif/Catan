import * as func from './functions.js';
const canvas = document.getElementById("catan-board");
export const ctx = canvas.getContext("2d");

export const hs = 50,d=44,dy=75; // Size of each hexagon
const X = canvas.width / 2;
const Y = 100;
const brdrows = [3,4,5,4,3];
const btnrol = document.getElementById('rol');
// Number of hexes per terrain type
const hexes = [
    {type: "forest", count: 4, color:"#2C5E1A"},
    {type: "pasture", count: 4, color:"#A9D35A"},
    {type: "field", count: 4, color:"#FFD700"},
    {type: "hill", count: 3, color:"orangered"},
    {type: "mountain", count: 3, color:"dimgray"},
    {type: "desert", count: 1, color:"sandybrown"}
];
const hexTypes = [];
const plr = {
    name:'',
    color:'red',
    settle:5,
    city:4,
    road:15,
    card:[0,0,0,0,0] //wood,brick,wool,grain,ore
};

const woodCount = document.getElementById('wood-count');
const brickCount = document.getElementById('brick-count');
const woolCount = document.getElementById('wool-count');
const grainCount = document.getElementById('grain-count');
const oreCount = document.getElementById('ore-count');
const numbersCopy = [...numbers];

woodCount.textContent = plr.card[0];
brickCount.textContent = plr.card[1];
woolCount.textContent = plr.card[2];
grainCount.textContent = plr.card[3];
oreCount.textContent = plr.card[4];
let numbers = [];
for (let i = 2; i <= 12; i++) {
    if (i === 2 || i === 12) {
        numbers.push(i);
    } else if (i !== 7) {
        numbers.push(i);
        numbers.push(i);
    }
}

for (let i = 0; i < hexes.length; i++) {
    for (let j = 0; j < hexes[i].count; j++) {
        hexTypes.push(i);
    }
}

function drawBoard() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < brdrows[i]; j++) {
            let x = X + (j - (brdrows[i] - 1) / 2) * d * 2;
            let index = Math.floor(Math.random() * hexTypes.length);
            let typeIndex = hexTypes[index];
            hexTypes.splice(index, 1);
            let number;
            if (typeIndex === 5) { // desert
                number = null;
            } else {
                number = numbersCopy[Math.floor(Math.random() * numbersCopy.length)];
                let index = numbersCopy.indexOf(number);
                numbersCopy.splice(index, 1);
            }
            func.drawHexagon(x, Y + dy * i, hexes[typeIndex].color, number);
        }
    }
}

function init() {
    drawBoard();
    
    btnrol.addEventListener("click", function() {
        const roll = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 2;
        document.getElementById('dnum').innerHTML = roll;

        // Check if the rolled number matches any of the hexagon numbers
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < brdrows[i]; j++) {
                let x = X + (j - (brdrows[i] - 1) / 2) * d * 2;
                let index = Math.floor(Math.random() * hexTypes.length);
                let typeIndex = hexTypes[index];
                let number;
                if (typeIndex === 5) { // desert
                    number = null;
                } else {
                    number = numbersCopy[Math.floor(Math.random() * numbersCopy.length)];
                }

                if (number === roll) {
                    // Gain resources based on the hexagon type
                    switch (hexes[typeIndex].type) {
                        case "forest":
                            plr.card[0]++; // Wood
                            break;
                        case "pasture":
                            plr.card[2]++; // Wool
                            break;
                        case "field":
                            plr.card[3]++; // Grain
                            break;
                        case "hill":
                            plr.card[1]++; // Brick
                            break;
                        case "mountain":
                            plr.card[4]++; // Ore
                            break;
                    }
                }
            }
        }

        // Update the resource counts
        woodCount.textContent = plr.card[0];
        brickCount.textContent = plr.card[1];
        woolCount.textContent = plr.card[2];
        grainCount.textContent = plr.card[3];
        oreCount.textContent = plr.card[4];
    });
    
}
init();
//func.drawHarbors();
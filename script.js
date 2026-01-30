const rarities = [
  { name: "Common", chance: 55, color: "#b0b0b0", value: 5 },
  { name: "Uncommon", chance: 25, color: "#4fd17b", value: 15 },
  { name: "Rare", chance: 13, color: "#4cc3ff", value: 40 },
  { name: "Epic", chance: 6, color: "#9b6bff", value: 120 },
  { name: "Legendary", chance: 1, color: "#ffd84f", value: 400 }
];

let balance = 250;
const balanceEl = document.querySelector(".money");

function rollRarity() {
  const roll = Math.random() * 100;
  let sum = 0;

  for (let r of rarities) {
    sum += r.chance;
    if (roll <= sum) return r;
  }
}

function openCase(caseName, cost) {
  if (balance < cost) {
    alert("Not enough money!");
    return;
  }

  balance -= cost;
  balanceEl.textContent = `$${balance}`;

  const rarity = rollRarity();

  showResult(caseName, rarity);
}

function showResult(caseName, rarity) {
  const result = document.createElement("div");
  result.className = "result";
  result.innerHTML = `
    <h2>${caseName}</h2>
    <p style="color:${rarity.color}; font-size:22px;">
      ${rarity.name}
    </p>
    <span>Worth $${rarity.value}</span>
  `;

  document.body.appendChild(result);

  setTimeout(() => {
    result.remove();
  }, 2500);
}

/* Attach clicks */
document.querySelectorAll(".case").forEach(c => {
  const price = parseInt(c.querySelector("p").textContent.replace("$",""));
  const name = c.querySelector("h3").textContent;

  c.onclick = () => openCase(name, price);
});
const legendaryItems = [
  { name: "Netherite Sword", material: "Netherite", weight: 8 },
  { name: "Dragon Egg", material: "Dragon", weight: 12 },
  { name: "Beacon", material: "Obsidian", weight: 15 },
  { name: "Totem of Undying", material: "Gold", weight: 6 }
];

const materialValues = {
  Wood: 1,
  Stone: 2,
  Iron: 5,
  Gold: 8,
  Diamond: 12,
  Netherite: 20,
  Obsidian: 6,
  Dragon: 30
};
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
function showResult(caseName, rarity) {
  let item = null;

  if (rarity.name === "Legendary") {
    item = legendaryItems[Math.floor(Math.random() * legendaryItems.length)];
    legendaryAnimation(item);
  } else {
    item = {
      name: rarity.name + " Item",
      material: "Iron",
      weight: 2
    };
    normalResult(item, rarity);
  }

  inventory.push(item);
  saveInventory();
}
function legendaryAnimation(item) {
  const overlay = document.createElement("div");
  overlay.className = "legendary";

  overlay.innerHTML = `
    <h1>✨ LEGENDARY ✨</h1>
    <h2>${item.name}</h2>
    <p>${item.material} • Weight ${item.weight}</p>
  `;

  document.body.appendChild(overlay);

  setTimeout(() => overlay.remove(), 3500);
}
function normalResult(item, rarity) {
  const div = document.createElement("div");
  div.className = "result";
  div.innerHTML = `
    <h2>${item.name}</h2>
    <p style="color:${rarity.color}">${rarity.name}</p>
  `;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 2000);
}

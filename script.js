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

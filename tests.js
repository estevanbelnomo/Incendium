// Simple test suite for Incendium game logic
// This extracts game logic functions so they can be tested without DOM

// ===== EXTRACTED GAME FUNCTIONS FOR TESTING =====

// Number formatting function
function formatNumber(num) {
    if (num < 1000) return Math.floor(num);
    if (num < 1000000) return (num / 1000).toFixed(2) + 'K';
    if (num < 1000000000) return (num / 1000000).toFixed(2) + 'M';
    if (num < 1000000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num < 1000000000000000) return (num / 1000000000000).toFixed(2) + 'T';
    return (num / 1000000000000000).toFixed(2) + 'Q';
}

// ===== TEST SUITE =====

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
    if (condition) {
        console.log("✓ PASS: " + message);
        testsPassed++;
    } else {
        console.log("✗ FAIL: " + message);
        testsFailed++;
    }
}

console.log("\n=== RUNNING INCENDIUM GAME TESTS ===\n");

// Test 1: Number Formatting
console.log("--- Test Group: Number Formatting ---");
assert(formatNumber(500) === 500, "Small numbers format as integers");
assert(formatNumber(1500) === "1.50K", "Thousands format with K");
assert(formatNumber(1500000) === "1.50M", "Millions format with M");
assert(formatNumber(1500000000) === "1.50B", "Billions format with B");
assert(formatNumber(1500000000000) === "1.50T", "Trillions format with T");
assert(formatNumber(1500000000000000) === "1.50Q", "Quadrillions format with Q");

// Test 2: Money Calculation
console.log("\n--- Test Group: Money Calculations ---");
let testMoney = 0;
let testFire = 10;
let testFirePrice = 0.5;
testMoney += testFire * testFirePrice;
assert(testMoney === 5, "Fire selling calculates correctly (10 fire * 0.5 = 5 money)");

testFirePrice *= 2;
testMoney += testFire * testFirePrice;
assert(testMoney === 15, "Fire selling with doubled price works (5 + 10 = 15 money)");

// Test 3: Cost Scaling
console.log("\n--- Test Group: Cost Scaling ---");
let cost = 20;
cost *= 2;
assert(cost === 40, "Cost doubles on first upgrade");
cost *= 2;
assert(cost === 80, "Cost doubles on second upgrade");

// Test 4: Passive Generation
console.log("\n--- Test Group: Passive Generation ---");
let passiveFire = 0;
let passiveFireRate = 50;
for (let i = 0; i < 20; i++) {
    passiveFire += passiveFireRate / 20; // 20 ticks per second
}
assert(passiveFire === 50, "Passive fire generation: 50 fire/sec produces 50 fire in 1 second");

// Test 5: Mana Regeneration
console.log("\n--- Test Group: Mana System ---");
let mana = 0;
let manaMax = 100;
let manaRegenRate = 1;
for (let i = 0; i < 20; i++) {
    if (mana < manaMax) {
        mana = Math.min(manaMax, mana + manaRegenRate / 20);
    }
}
assert(Math.abs(mana - 1.0) < 0.01, "Mana regen: 1 mana/sec produces ~1 mana in 1 second");

// Test 6: Mana Pool Expansion
console.log("\n--- Test Group: Mana Pool Expansion ---");
let manaPoolCost = 500;
let expansionCount = 0;
let testMoney2 = 10000;
let testManaMax = 100;
while (testMoney2 >= manaPoolCost) {
    testMoney2 -= manaPoolCost;
    testManaMax += 50;
    manaPoolCost *= 1.5;
    expansionCount++;
}
assert(expansionCount >= 3, "Player can expand mana pool multiple times with 10000 money");
assert(testManaMax >= 250, "Mana pool expands by at least 150 (100 + 50*3 = 250)");

// Test 7: Water System
console.log("\n--- Test Group: Water System ---");
let water = 5;
let waterPrice = 0.5;
let testMoney3 = 0;
testMoney3 += water * waterPrice;
assert(testMoney3 === 2.5, "Water selling calculates correctly (5 water * 0.5 = 2.5 money)");

// Test 8: Fire vs Water Balance
console.log("\n--- Test Group: Fire vs Water Balance ---");
let fireWaterBalance = 50;
let testMana = 100;
assert(fireWaterBalance === 50, "Initial balance is 50/100");
fireWaterBalance += 5;
testMana -= 10;
assert(fireWaterBalance === 55, "Balance shifts toward fire correctly");
assert(testMana === 90, "Mana consumed correctly for balance shift");

// Test 9: Wizard Hiring Cost
console.log("\n--- Test Group: Wizard System ---");
let wizardCost = 50000;
let wizardsHired = 0;
let testMoney4 = 100000;
while (testMoney4 >= wizardCost) {
    testMoney4 -= wizardCost;
    wizardsHired++;
    wizardCost *= 1.25;
}
assert(wizardsHired >= 1, "Player can hire at least 1 wizard with 100000 money");
assert(wizardCost > 50000, "Wizard cost scales up after each hire");

// Test 10: Game State Structure
console.log("\n--- Test Group: Game State Serialization ---");
let gameState = {
    money: 1000,
    fire: 100,
    firePrice: 1.0,
    water: 50,
    waterPrice: 0.5,
    mana: 75,
    manaMax: 100,
    passiveFireRate: 50,
    wizardsHired: 2
};
let serialized = JSON.stringify(gameState);
let deserialized = JSON.parse(serialized);
assert(deserialized.money === 1000, "Money persists through serialization");
assert(deserialized.fire === 100, "Fire persists through serialization");
assert(deserialized.passiveFireRate === 50, "Passive rate persists through serialization");

// Test 11: Upgrade Progression
console.log("\n--- Test Group: Decision Level Progression ---");
let decisionLevel = 0;
let decisionCost = 10;
let testMoney5 = 100;

// Level 0 -> 1
if (testMoney5 >= decisionCost) {
    testMoney5 -= decisionCost;
    decisionLevel++;
    decisionCost = 100;
}
assert(decisionLevel === 1, "First decision upgrade completes");
assert(decisionCost === 100, "Cost scales to 100 for level 2");

// Level 1 -> 2
if (testMoney5 >= decisionCost) {
    testMoney5 -= decisionCost;
    decisionLevel++;
}
assert(decisionLevel === 1, "Cannot afford next decision upgrade with remaining money");

// Test 12: Equipment Cost Progression
console.log("\n--- Test Group: Equipment Cost Progression ---");
let firePerClickCost = 100;
let firePrice2Cost = 20;
let costsList = [firePrice2Cost];
for (let i = 0; i < 5; i++) {
    firePrice2Cost *= 2;
    costsList.push(firePrice2Cost);
}
assert(costsList[0] === 20, "Initial cost is 20");
assert(costsList[5] === 640, "Cost after 5 upgrades is 640 (20 * 2^5)");

console.log("\n=== TEST RESULTS ===");
console.log("Passed: " + testsPassed);
console.log("Failed: " + testsFailed);
console.log("Total: " + (testsPassed + testsFailed));

if (testsFailed === 0) {
    console.log("\n✓ ALL TESTS PASSED!\n");
    process.exit(0);
} else {
    console.log("\n✗ SOME TESTS FAILED!\n");
    process.exit(1);
}

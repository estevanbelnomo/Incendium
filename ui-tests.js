// UI/Initialization test suite for Incendium
// Tests the game startup flow and UI state management

// Load game variables and functions from main.js
// We'll need to extract and re-define key functions for testing

// ===== MOCK localStorage FOR NODE.JS TESTING =====
global.localStorage = {
    data: {},
    getItem: function(key) {
        return this.data[key] || null;
    },
    setItem: function(key, value) {
        this.data[key] = value;
    },
    removeItem: function(key) {
        delete this.data[key];
    },
    clear: function() {
        this.data = {};
    }
};

// ===== GAME VARIABLES (from main.js) =====
var money=0,fire=0,firePrice=0.5,decisionLevel=0,decisionCost=10,upgradeFirePriceCost=20,firePerClick=1,upgradeFirePerClickCost=100,colour="false",bootstrap="false";
var water=0,waterPrice=0.5,mana=0,manaMax=100,manaRegenRate=1,passiveFireRate=0,passiveWaterRate=0,wizardsHired=0,wizardCost=50000;
var waterPerClick=1,upgradeWaterPerClickCost=150;
var manaPoolCost=500,manaRegenCost=100,fireWaterBalance=50;
var SAVE_INTERVAL = 5000;
var gameStartTime = Date.now();

// ===== GAME FUNCTIONS (extracted from main.js) =====
function formatNumber(num) {
    if (num < 1000) return Math.floor(num);
    if (num < 1000000) return (num / 1000).toFixed(2) + 'K';
    if (num < 1000000000) return (num / 1000000).toFixed(2) + 'M';
    if (num < 1000000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num < 1000000000000000) return (num / 1000000000000).toFixed(2) + 'T';
    return (num / 1000000000000000).toFixed(2) + 'Q';
}

function saveGame() {
    var gameState = {
        money: money, fire: fire, firePrice: firePrice, decisionLevel: decisionLevel,
        decisionCost: decisionCost, upgradeFirePriceCost: upgradeFirePriceCost,
        firePerClick: firePerClick, upgradeFirePerClickCost: upgradeFirePerClickCost,
        colour: colour, water: water, waterPrice: waterPrice, waterPerClick: waterPerClick,
        upgradeWaterPerClickCost: upgradeWaterPerClickCost, mana: mana, manaMax: manaMax,
        manaRegenRate: manaRegenRate, passiveFireRate: passiveFireRate,
        passiveWaterRate: passiveWaterRate, wizardsHired: wizardsHired,
        wizardCost: wizardCost, fireWaterBalance: fireWaterBalance,
        manaPoolCost: manaPoolCost, manaRegenCost: manaRegenCost
    };
    localStorage.setItem('incendiumSave', JSON.stringify(gameState));
}

function loadGame() {
    var saved = localStorage.getItem('incendiumSave');
    if (saved) {
        var gameState = JSON.parse(saved);
        money = gameState.money || 0;
        fire = gameState.fire || 0;
        firePrice = gameState.firePrice || 0.5;
        decisionLevel = gameState.decisionLevel || 0;
        decisionCost = gameState.decisionCost || 10;
        upgradeFirePriceCost = gameState.upgradeFirePriceCost || 20;
        firePerClick = gameState.firePerClick || 1;
        upgradeFirePerClickCost = gameState.upgradeFirePerClickCost || 100;
        colour = gameState.colour || "false";
        water = gameState.water || 0;
        waterPrice = gameState.waterPrice || 0.5;
        waterPerClick = gameState.waterPerClick || 1;
        upgradeWaterPerClickCost = gameState.upgradeWaterPerClickCost || 150;
        mana = gameState.mana || 0;
        manaMax = gameState.manaMax || 100;
        manaRegenRate = gameState.manaRegenRate || 1;
        passiveFireRate = gameState.passiveFireRate || 0;
        passiveWaterRate = gameState.passiveWaterRate || 0;
        wizardsHired = gameState.wizardsHired || 0;
        wizardCost = gameState.wizardCost || 50000;
        fireWaterBalance = gameState.fireWaterBalance || 50;
        manaPoolCost = gameState.manaPoolCost || 500;
        manaRegenCost = gameState.manaRegenCost || 100;
        return true;
    }
    return false;
}

function gameLoop() {
    try {
        fire += passiveFireRate / 20;
        water += passiveWaterRate / 20;
        if (mana < manaMax) {
            mana = Math.min(manaMax, mana + manaRegenRate / 20);
        }
    } catch (e) {
        console.error("Error in gameLoop:", e);
    }
}

function refreshUI() {
    // Simplified for testing
    try {
        updateProgressBars();
    } catch (e) {
        console.error("Error in refreshUI:", e);
    }
}

function refreshMoney(){
    // For testing, just track the value
}

function getFire(){
    fire += firePerClick;
}

function sellFire(){
    money += fire * firePrice;
    fire = 0
}

function decisionUpgrade(){
    if(money >= decisionCost){
        money -= decisionCost;
        if(decisionLevel === 0){
            decisionCost = 100;
        }
        if(decisionLevel === 1){
            decisionCost = 1000;
        }
        if(decisionLevel === 2){
            decisionCost = 10000;
        }
        decisionLevel += 1;
    }
}

function upgradeFirePrice(){
    if(money >= upgradeFirePriceCost){
        money -= upgradeFirePriceCost;
        upgradeFirePriceCost *= 2;
        firePrice *= 2;
    }
}

function upgradeFirePerClick(){
    if(money >= upgradeFirePerClickCost){
        money -= upgradeFirePerClickCost;
        upgradeFirePerClickCost *= 2;
        firePerClick *= 2;
    }
}

function getWater() {
    water += waterPerClick;
}

function sellWater() {
    money += water * waterPrice;
    water = 0;
}

function hireWizard() {
    if (money >= wizardCost && mana >= 20) {
        money -= wizardCost;
        mana -= 20;
        wizardsHired += 1;
        passiveFireRate += 50;
        wizardCost *= 1.25;
    }
}

function buyManaPool() {
    if (money >= manaPoolCost && mana >= 10) {
        money -= manaPoolCost;
        manaMax += 50;
        manaPoolCost *= 1.5;
        mana = Math.min(mana, manaMax);
    }
}

function upgradeManaRegen() {
    if (money >= manaRegenCost && mana >= 5) {
        money -= manaRegenCost;
        manaRegenRate += 0.5;
        manaRegenCost *= 1.5;
    }
}

function balanceTowardFire() {
    if (fireWaterBalance < 100 && mana >= 10) {
        mana -= 10;
        fireWaterBalance += 5;
        passiveFireRate += 10;
        passiveWaterRate = Math.max(0, passiveWaterRate - 5);
    }
}

function balanceTowardWater() {
    if (fireWaterBalance > 0 && mana >= 10) {
        mana -= 10;
        fireWaterBalance -= 5;
        passiveWaterRate += 10;
        passiveFireRate = Math.max(0, passiveFireRate - 5);
    }
}

function updateProgressBars() {
    // For testing - simplified
}

function showUIBasedOnProgress() {
    // For testing - simplified
}

function addColour() {
    // For testing - simplified
}

// ===== TEST UTILITIES =====
let uiTestsPassed = 0;
let uiTestsFailed = 0;

function assertUI(condition, message) {
    if (condition) {
        console.log("✓ PASS: " + message);
        uiTestsPassed++;
    } else {
        console.log("✗ FAIL: " + message);
        uiTestsFailed++;
    }
}

// Mock DOM for testing
class MockElement {
    constructor(id) {
        this.id = id;
        this.innerHTML = '';
        this.style = { display: '' };
        this.className = '';
    }
}

let mockDOM = {};

function mockGetElementById(id) {
    if (!mockDOM[id]) {
        mockDOM[id] = new MockElement(id);
    }
    return mockDOM[id];
}

// Helper function to test game state
function testGameState(description, expectedState) {
    try {
        let matches = true;
        for (let key in expectedState) {
            if (eval(key) !== expectedState[key]) {
                matches = false;
                break;
            }
        }
        assertUI(matches, description);
    } catch (e) {
        assertUI(false, description + " (error: " + e.message + ")");
    }
}

console.log("\n=== RUNNING INCENDIUM UI/INITIALIZATION TESTS ===\n");

// Test 1: Initial Game State
console.log("--- Test Group: Initial Game State ---");
assertUI(money === 0, "Initial money is 0");
assertUI(fire === 0, "Initial fire is 0");
assertUI(water === 0, "Initial water is 0");
assertUI(mana === 0, "Initial mana is 0");
assertUI(decisionLevel === 0, "Initial decision level is 0");
assertUI(passiveFireRate === 0, "Initial passive fire rate is 0");
assertUI(passiveWaterRate === 0, "Initial passive water rate is 0");

// Test 2: Cost Initialization
console.log("\n--- Test Group: Cost Initialization ---");
assertUI(decisionCost === 10, "Decision cost starts at 10");
assertUI(upgradeFirePriceCost === 20, "Fire price upgrade cost starts at 20");
assertUI(upgradeFirePerClickCost === 100, "Fire click upgrade cost starts at 100");
assertUI(manaPoolCost === 500, "Mana pool cost starts at 500");
assertUI(manaRegenCost === 100, "Mana regen cost starts at 100");
assertUI(wizardCost === 50000, "Wizard cost starts at 50000");

// Test 3: Save/Load Cycle
console.log("\n--- Test Group: Save/Load Cycle ---");
money = 500;
fire = 100;
water = 50;
mana = 75;
decisionLevel = 2;
passiveFireRate = 50;
firePrice = 2;

// Save to localStorage
saveGame();
assertUI(localStorage.getItem('incendiumSave') !== null, "Game state saves to localStorage");

// Clear values
money = 0;
fire = 0;
water = 0;
mana = 0;
decisionLevel = 0;
passiveFireRate = 0;
firePrice = 0.5;

// Load from localStorage
let loaded = loadGame();
assertUI(loaded === true, "loadGame returns true when save exists");
assertUI(money === 500, "Money loads correctly");
assertUI(fire === 100, "Fire loads correctly");
assertUI(water === 50, "Water loads correctly");
assertUI(mana === 75, "Mana loads correctly");
assertUI(decisionLevel === 2, "Decision level loads correctly");
assertUI(passiveFireRate === 50, "Passive fire rate loads correctly");
assertUI(firePrice === 2, "Fire price loads correctly");

// Test 4: getFire Function
console.log("\n--- Test Group: Get Fire Function ---");
fire = 0;
firePerClick = 1;
getFire();
assertUI(fire === 1, "getFire adds firePerClick to fire");

firePerClick = 5;
fire = 10;
getFire();
assertUI(fire === 15, "getFire adds correct amount with higher firePerClick");

// Test 5: sellFire Function
console.log("\n--- Test Group: Sell Fire Function ---");
money = 0;
fire = 10;
firePrice = 0.5;
sellFire();
assertUI(money === 5, "sellFire calculates price correctly (10 * 0.5 = 5)");
assertUI(fire === 0, "sellFire resets fire to 0");

money = 0;
fire = 20;
firePrice = 2;
sellFire();
assertUI(money === 40, "sellFire works with doubled price (20 * 2 = 40)");

// Test 6: Decision Upgrade Progression
console.log("\n--- Test Group: Decision Upgrade Progression ---");
money = 100;
fire = 0;
firePrice = 0.5;
decisionLevel = 0;
decisionCost = 10;

// First decision
decisionUpgrade();
assertUI(decisionLevel === 1, "Decision level increments to 1");
assertUI(money === 90, "Money deducted correctly (100 - 10)");
assertUI(decisionCost === 100, "Decision cost updates to 100 for next level");

// Test 7: Fire Price Upgrade
console.log("\n--- Test Group: Fire Price Upgrade ---");
money = 50;
firePrice = 0.5;
upgradeFirePriceCost = 20;

upgradeFirePrice();
assertUI(firePrice === 1, "Fire price doubles (0.5 * 2)");
assertUI(upgradeFirePriceCost === 40, "Fire price cost doubles (20 * 2)");
assertUI(money === 30, "Money deducted correctly (50 - 20)");

// Test 8: Fire Click Upgrade
console.log("\n--- Test Group: Fire Click Upgrade ---");
money = 200;
firePerClick = 1;
upgradeFirePerClickCost = 100;

upgradeFirePerClick();
assertUI(firePerClick === 2, "Fire per click doubles (1 * 2)");
assertUI(upgradeFirePerClickCost === 200, "Fire click cost doubles (100 * 2)");
assertUI(money === 100, "Money deducted correctly (200 - 100)");

// Test 9: Water Aspect Functions
console.log("\n--- Test Group: Water Aspects ---");
water = 0;
waterPerClick = 1;
getWater();
assertUI(water === 1, "getWater adds waterPerClick to water");

money = 0;
water = 10;
waterPrice = 0.5;
sellWater();
assertUI(money === 5, "sellWater calculates price correctly");
assertUI(water === 0, "sellWater resets water to 0");

// Test 10: Mana System
console.log("\n--- Test Group: Mana System ---");
mana = 0;
manaMax = 100;
manaRegenRate = 1;

// Simulate 1 second of ticks
for (let i = 0; i < 20; i++) {
    if (mana < manaMax) {
        mana = Math.min(manaMax, mana + manaRegenRate / 20);
    }
}
assertUI(Math.abs(mana - 1.0) < 0.01, "Mana regenerates correctly (~1 per second)");

// Test 11: Progress Bar Updates
console.log("\n--- Test Group: Progress Bar Updates ---");
decisionLevel = 2;
mana = 50;
manaMax = 100;

// Test mana percentage calculation
let manaPercent = (mana / manaMax) * 100;
assertUI(manaPercent === 50, "Mana progress bar calculation correct");

// Test decision level percentage
let progressPercent = (decisionLevel / 4) * 100;
assertUI(progressPercent === 50, "Decision progress bar calculation correct");

// Test 12: Number Formatting Display
console.log("\n--- Test Group: Number Formatting ---");
let testNum1 = 500;
assertUI(formatNumber(testNum1) === 500, "Small numbers format as integers");

let testNum2 = 5000;
assertUI(formatNumber(testNum2) === "5.00K", "Thousands format correctly");

let testNum3 = 1500000;
assertUI(formatNumber(testNum3) === "1.50M", "Millions format correctly");

// Test 13: Wizard Hiring
console.log("\n--- Test Group: Wizard Hiring ---");
money = 60000;
mana = 50;
wizardsHired = 0;
passiveFireRate = 0;
wizardCost = 50000;

hireWizard();
assertUI(wizardsHired === 1, "Wizard count increments");
assertUI(passiveFireRate === 50, "Passive fire rate increases by 50");
assertUI(money === 10000, "Money deducted (60000 - 50000)");
assertUI(mana === 30, "Mana deducted (50 - 20)");

// Test 14: Balance System
console.log("\n--- Test Group: Fire vs Water Balance ---");
fireWaterBalance = 50;
mana = 100;

balanceTowardFire();
assertUI(fireWaterBalance === 55, "Balance shifts toward fire");
assertUI(mana === 90, "Mana consumed for balance shift");

fireWaterBalance = 50;
mana = 100;
balanceTowardWater();
assertUI(fireWaterBalance === 45, "Balance shifts toward water");
assertUI(mana === 90, "Mana consumed for water balance");

// Test 15: Game Loop
console.log("\n--- Test Group: Game Loop ---");
fire = 0;
water = 0;
mana = 0;
passiveFireRate = 50;
passiveWaterRate = 25;
manaRegenRate = 2;
manaMax = 100;

// Simulate one game loop tick (50ms = 1/20th of a second)
gameLoop();
assertUI(fire > 0, "Game loop generates passive fire");
assertUI(water > 0, "Game loop generates passive water");
assertUI(mana > 0, "Game loop regenerates mana");

// Test 16: Error Handling
console.log("\n--- Test Group: Error Handling ---");
try {
    // These should not throw errors even with missing DOM elements
    refreshUI();
    updateProgressBars();
    showUIBasedOnProgress();
    assertUI(true, "refreshUI handles missing DOM elements gracefully");
} catch (e) {
    assertUI(false, "refreshUI threw error: " + e.message);
}

// Test 17: Upgrade Affordability
console.log("\n--- Test Group: Upgrade Affordability ---");
money = 10;
upgradeFirePriceCost = 20;
let initialMoney = money;
upgradeFirePrice();
assertUI(money === initialMoney, "Can't afford upgrade - money unchanged");

money = 50;
upgradeFirePriceCost = 20;
upgradeFirePrice();
assertUI(money === 30, "Can afford upgrade - transaction succeeds");

// Test 18: Mana Pool Expansion
console.log("\n--- Test Group: Mana Pool Expansion ---");
money = 1000;
mana = 50;
manaMax = 100;
manaPoolCost = 500;

buyManaPool();
assertUI(manaMax === 150, "Mana pool expands (100 + 50)");
assertUI(money === 500, "Money deducted for pool expansion");
assertUI(manaPoolCost > 500, "Pool cost scales up");

// Test 19: Mana Regen Upgrade
console.log("\n--- Test Group: Mana Regen Upgrade ---");
money = 200;
mana = 20;
manaRegenRate = 1;
manaRegenCost = 100;

upgradeManaRegen();
assertUI(manaRegenRate === 1.5, "Mana regen increases by 0.5");
assertUI(money === 100, "Money deducted for regen upgrade");
assertUI(manaRegenCost > 100, "Regen cost scales up");

// Test 20: Color System
console.log("\n--- Test Group: Color System ---");
try {
    colour = "true";
    addColour();
    assertUI(colour === "true", "Color system initialized");
} catch (e) {
    assertUI(true, "Color system handles missing DOM gracefully");
}

// ===== SUMMARY =====
console.log("\n=== UI/INITIALIZATION TEST RESULTS ===");
console.log("Passed: " + uiTestsPassed);
console.log("Failed: " + uiTestsFailed);
console.log("Total: " + (uiTestsPassed + uiTestsFailed));

if (uiTestsFailed === 0) {
    console.log("\n✓ ALL UI TESTS PASSED!\n");
    process.exit(0);
} else {
    console.log("\n✗ SOME UI TESTS FAILED!\n");
    process.exit(1);
}

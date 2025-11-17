//Creates Variable List For Future Use.
var money=0,fire=0,firePrice=0.5,decisionLevel=0,decisionCost=10,upgradeFirePriceCost=20,firePerClick=1,upgradeFirePerClickCost=100,colour="false",bootstrap="false";

// New game systems
var water=0,waterPrice=0.5,mana=0,manaMax=100,manaRegenRate=1,passiveFireRate=0,passiveWaterRate=0,wizardsHired=0,wizardCost=50000;
var waterPerClick=1,upgradeWaterPerClickCost=150;
var manaPoolCost=500,manaRegenCost=100,fireWaterBalance=50;

// Save/Load system
var SAVE_INTERVAL = 5000; // Save every 5 seconds
var gameStartTime = Date.now();

// Number formatting function
function formatNumber(num) {
    if (num < 1000) return Math.floor(num);
    if (num < 1000000) return (num / 1000).toFixed(2) + 'K';
    if (num < 1000000000) return (num / 1000000).toFixed(2) + 'M';
    if (num < 1000000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num < 1000000000000000) return (num / 1000000000000).toFixed(2) + 'T';
    return (num / 1000000000000000).toFixed(2) + 'Q';
}

// Save game to localStorage
function saveGame() {
    var gameState = {
        money: money,
        fire: fire,
        firePrice: firePrice,
        decisionLevel: decisionLevel,
        decisionCost: decisionCost,
        upgradeFirePriceCost: upgradeFirePriceCost,
        firePerClick: firePerClick,
        upgradeFirePerClickCost: upgradeFirePerClickCost,
        colour: colour,
        water: water,
        waterPrice: waterPrice,
        waterPerClick: waterPerClick,
        upgradeWaterPerClickCost: upgradeWaterPerClickCost,
        mana: mana,
        manaMax: manaMax,
        manaRegenRate: manaRegenRate,
        passiveFireRate: passiveFireRate,
        passiveWaterRate: passiveWaterRate,
        wizardsHired: wizardsHired,
        wizardCost: wizardCost,
        fireWaterBalance: fireWaterBalance,
        manaPoolCost: manaPoolCost,
        manaRegenCost: manaRegenCost
    };
    localStorage.setItem('incendiumSave', JSON.stringify(gameState));
}

// Load game from localStorage
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
        refreshUI();
        return true;
    }
    return false;
}

// Game loop for passive generation
function gameLoop() {
    try {
        // Passive fire generation
        fire += passiveFireRate / 20; // 20 ticks per second

        // Passive water generation
        water += passiveWaterRate / 20;

        // Mana regeneration (capped at manaMax)
        if (mana < manaMax) {
            mana = Math.min(manaMax, mana + manaRegenRate / 20);
        }

        refreshUI();
    } catch (e) {
        console.error("Error in gameLoop:", e);
    }
}

// Refresh all UI elements
function refreshUI() {
    try {
        refreshMoney();

        // Update resource displays (check if elements exist)
        var fireAspectNum = document.getElementById("fireAspectNum");
        if (fireAspectNum) fireAspectNum.innerHTML = Math.floor(fire);

        var waterNum = document.getElementById("waterNum");
        if (waterNum) waterNum.innerHTML = Math.floor(water);

        var manaNum = document.getElementById("manaNum");
        if (manaNum) manaNum.innerHTML = Math.floor(mana) + "/" + manaMax;

        // Update passive rate display
        var passiveFireRateEl = document.getElementById("passiveFireRate");
        if (passiveFireRateEl) passiveFireRateEl.innerHTML = Math.floor(passiveFireRate);

        var passiveFireRateDisplayEl = document.getElementById("passiveFireRateDisplay");
        if (passiveFireRateDisplayEl) passiveFireRateDisplayEl.innerHTML = Math.floor(passiveFireRate);

        var passiveWaterRateEl = document.getElementById("passiveWaterRate");
        if (passiveWaterRateEl) passiveWaterRateEl.innerHTML = Math.floor(passiveWaterRate);

        // Format large numbers for display
        var moneyNum = document.getElementById("moneyNum");
        if (moneyNum) {
            if (money >= 1000) {
                moneyNum.innerHTML = formatNumber(money);
            } else {
                moneyNum.innerHTML = Math.floor(money);
            }
        }

        // Update progress bars
        updateProgressBars();
    } catch (e) {
        console.error("Error in refreshUI:", e);
    }
}

// Start the game loop
window.addEventListener('load', function() {
    try {
        console.log("=== INCENDIUM GAME STARTING ===");
        console.log("loadGame() starting...");
        var hasLoaded = loadGame();
        console.log("loadGame() result:", hasLoaded);

        if (hasLoaded) {
            console.log("Loaded existing game");
            // Hide shop section and show game UI for loaded games
            var shopSection = document.getElementById("shopSection");
            if (shopSection) shopSection.style.display = "none";

            var title = document.getElementById("title");
            if (title) title.style.display = "";

            if (colour === "true") {
                addColour();
            }
            showUIBasedOnProgress();
            refreshUI();
        } else {
            console.log("New game - showing shop section");
            // For new games, show the start screen
            var shopSection = document.getElementById("shopSection");
            if (shopSection) {
                shopSection.style.display = "flex";
                console.log("Shop section displayed, current display:", window.getComputedStyle(shopSection).display);
            } else {
                console.error("ERROR: shopSection element not found!");
            }
        }

        console.log("Setting up autosave...");
        // Set up autosave (wait 2 seconds before first save)
        setTimeout(function() {
            setInterval(saveGame, SAVE_INTERVAL);
        }, 2000);

        console.log("Starting game loop...");
        // Set up game loop
        setInterval(gameLoop, 50); // 20 ticks per second

        console.log("=== INCENDIUM READY ===");
    } catch (e) {
        console.error("CRITICAL ERROR in game startup:", e);
        console.error("Stack:", e.stack);
    }
});

// When Buy Shop button is pressed at start of the game, this triggers.
function buyShop() {
    var loanChoice = prompt("Oh! It Does Not Look Like You Have Any Money! Here, I'll give you a loan! Is 1000 okay, or would you like 50000?");
    //checks what the user said
    if(loanChoice === "1000"){
        var loanChoice2 = prompt("Great! And When Would You Like To Pay Off The Loan? ASAP or Never?");
        if(loanChoice2 === "ASAP"){
            alert("OK Then! Let's Get Started!");
            money = 1000;
            document.getElementById("shopSection").style.display = "none";
            document.getElementById("title").style.display = "";
            showUIBasedOnProgress();
            refreshUI();
            return;
        }
        if(loanChoice2 === "Never"){
            alert("ERROR! You Must Upgrade Your Decision Making Skills Before You Can Do This!");
            return;
        }
        //If user typed something not expected.
        else{
            alert("That Was Not An Option! Please Try Again!");
            return;
        }
    }
    if(loanChoice === "50000"){
        alert("ERROR! You Must Upgrade Your Decision Making Skills Before You Can Do This!");
    }
    else{
        alert("That Was Not An Option! Please Try Again!");
    }
}

//Adds firePerClick to fire.
function getFire(){
    fire += firePerClick;
    document.getElementById("fireAspectNum").innerHTML = fire;
}

//Adds fire * firePrice to money, then takes away all fire.
function sellFire(){
    money += fire * firePrice;
    fire = 0
    document.getElementById("fireAspectNum").innerHTML = fire;
    refreshMoney();
}

//Refreshes the money onscreen.
function refreshMoney(){
    if (money >= 1000) {
        document.getElementById("moneyNum").innerHTML = formatNumber(money);
    } else {
        document.getElementById("moneyNum").innerHTML = Math.floor(money);
    }

    // Update balance display
    if (document.getElementById("fireWaterBalanceNum")) {
        document.getElementById("fireWaterBalanceNum").innerHTML = Math.floor(fireWaterBalance);
    }
}

//Handles unlocking more content with a special output each time the user buys the upgrade.
function decisionUpgrade(){
    if(money >= decisionCost){
        money -= decisionCost;
        if(decisionLevel === 0){
            alert("0.5 Sounds Like Far Too Little Profit For A Mighty Fire Aspect! Why Don't We Upgrade The Price!");
            decisionCost = 100;
            document.getElementById("upgradeFirePrice").className = "";
        }
        if(decisionLevel === 1){
            alert("Hmm... I Think You Should Start To Improve Your Efficiency Of Getting Fire Aspects.");
            decisionCost = 1000;
            document.getElementById("upgradeFirePerClick").className = "";
        }
        if(decisionLevel === 2){
            alert("This all looks rather dull... Why don't we make things look nicer!");
            alert("Also, You must get tired of clicking... I'm sure you can think of someone to outsource it to.");
            decisionCost = 10000;
            document.getElementById("upgradeButtonAPI").className = "";
            document.getElementById("hireWizard").className = "";
        }
        decisionLevel += 1;
        refreshMoney();
        document.getElementById("decisionCost").innerHTML = decisionCost;
    }
}

//Doubles the sell value of each fire.
function upgradeFirePrice(){
    if(money >= upgradeFirePriceCost){
        money -= upgradeFirePriceCost;
        upgradeFirePriceCost *= 2;
        firePrice *= 2;
        refreshMoney();
        document.getElementById("upgradeFirePriceCost").innerHTML = upgradeFirePriceCost;
        document.getElementById("firePrice").innerHTML = firePrice;
    }
}

//Doubles the number of fire you get per click.
function upgradeFirePerClick(){
    if(money >= upgradeFirePerClickCost){
        money -= upgradeFirePerClickCost;
        upgradeFirePerClickCost *= 2;
        firePerClick *= 2;
        refreshMoney();
        document.getElementById("upgradeFirePerClickCost").innerHTML = upgradeFirePerClickCost;
        document.getElementById("firePerClick").innerHTML = firePerClick;
    }
}

//Gives colour to the buttons.
function upgradeButtonAPI(){
    if(money >= 200){
        money -= 200;
        colour = "true";
        addColour();
        refreshMoney();
    }
}

function addColour(){
    document.getElementById("getFire").className = "redBackground";
    document.getElementById("sellFire").className = "redBackground";
    document.getElementById("money").className = "greenColour";
    document.getElementById("decisionUpgrade").className = "blueBackground";
    document.getElementById("upgradeFirePrice").className = "blueBackground";
    document.getElementById("upgradeFirePerClick").className = "blueBackground";
    document.getElementById("upgradeButtonAPI2").className = "yellowBackground";
}

// Update progress bars and indicators
function updateProgressBars() {
    // Mana progress bar
    var manaPercent = (mana / manaMax) * 100;
    var manaProgressEl = document.getElementById("manaProgress");
    if (manaProgressEl) {
        manaProgressEl.style.width = manaPercent + "%";
    }

    // Decision level progress bar
    var progressPercent = (decisionLevel / 4) * 100;
    var progressBarEl = document.getElementById("progressBar");
    if (progressBarEl) {
        progressBarEl.style.width = progressPercent + "%";
    }

    // Update decision level display
    var levelDisplay = document.getElementById("decisionLevelDisplay");
    if (levelDisplay) {
        levelDisplay.innerHTML = decisionLevel + "/4";
    }
}

// Function to show/hide UI sections based on progression
function showUIBasedOnProgress() {
    // Show fire section
    document.getElementById("fireSection").style.display = "";
    document.getElementById("progressionSection").style.display = "";
    document.getElementById("progressStatItem").style.display = "";

    // Decision Level 1: Fire Upgrades
    if (decisionLevel > 0) {
        document.getElementById("fireUpgradesSection").style.display = "";
    }

    // Decision Level 2: More fire upgrades visible
    if (decisionLevel > 1) {
        // Fire upgrades already visible
    }

    // Decision Level 3: Wizard and Cosmetics
    if (decisionLevel > 2) {
        document.getElementById("wizardSection").style.display = "";
        document.getElementById("cosmeticsSection").style.display = "";
        document.getElementById("passiveRateItem").style.display = "";
    }

    // Decision Level 4: Water, Mana, Balance
    if (decisionLevel > 3) {
        document.getElementById("waterSection").style.display = "";
        document.getElementById("manaSection").style.display = "";
        document.getElementById("balanceSection").style.display = "";
        document.getElementById("waterStatItem").style.display = "";
        document.getElementById("manaStatItem").style.display = "";
    }
}

// Water aspect functions
function getWater() {
    water += waterPerClick;
    document.getElementById("waterNum").innerHTML = Math.floor(water);
}

function sellWater() {
    money += water * waterPrice;
    water = 0;
    document.getElementById("waterNum").innerHTML = Math.floor(water);
    refreshMoney();
}

function upgradeWaterPrice() {
    if (money >= 20) {
        money -= 20;
        waterPrice *= 1.5;
        refreshMoney();
        document.getElementById("upgradeWaterPriceCost").innerHTML = Math.floor(20);
    }
}

function upgradeWaterPerClick() {
    if (money >= upgradeWaterPerClickCost) {
        money -= upgradeWaterPerClickCost;
        upgradeWaterPerClickCost *= 2;
        waterPerClick *= 2;
        refreshMoney();
        document.getElementById("upgradeWaterPerClickCost").innerHTML = Math.floor(upgradeWaterPerClickCost);
        document.getElementById("waterPerClick").innerHTML = waterPerClick;
    }
}

// Mana system functions
function buyManaPool() {
    if (money >= manaPoolCost && mana >= 10) {
        money -= manaPoolCost;
        manaMax += 50;
        manaPoolCost *= 1.5;
        mana = Math.min(mana, manaMax);
        refreshMoney();
        document.getElementById("manaPoolCost").innerHTML = Math.floor(manaPoolCost);
        document.getElementById("manaNum").innerHTML = Math.floor(mana) + "/" + manaMax;
    }
}

function upgradeManaRegen() {
    if (money >= manaRegenCost && mana >= 5) {
        money -= manaRegenCost;
        manaRegenRate += 0.5;
        manaRegenCost *= 1.5;
        refreshMoney();
        document.getElementById("manaRegenCost").innerHTML = Math.floor(manaRegenCost);
    }
}

// Hire wizard for passive fire generation
function hireWizard() {
    if (money >= wizardCost && mana >= 20) {
        money -= wizardCost;
        mana -= 20;
        wizardsHired += 1;
        passiveFireRate += 50;
        wizardCost *= 1.25;
        refreshMoney();
        document.getElementById("wizardCost").innerHTML = Math.floor(wizardCost);
        document.getElementById("passiveFireRate").innerHTML = Math.floor(passiveFireRate);
    }
}

// Upgrade button graphics (second level)
function upgradeButtonAPI2() {
    if (money >= 1000) {
        money -= 1000;
        document.getElementById("upgradeButtonAPI2").className = "purpleBackground";
        refreshMoney();
    }
}

// Water vs Fire balance mechanic
function balanceTowardFire() {
    if (fireWaterBalance < 100 && mana >= 10) {
        mana -= 10;
        fireWaterBalance += 5;
        passiveFireRate += 10;
        passiveWaterRate = Math.max(0, passiveWaterRate - 5);
        refreshMoney();
    }
}

function balanceTowardWater() {
    if (fireWaterBalance > 0 && mana >= 10) {
        mana -= 10;
        fireWaterBalance -= 5;
        passiveWaterRate += 10;
        passiveFireRate = Math.max(0, passiveFireRate - 5);
        refreshMoney();
    }
}

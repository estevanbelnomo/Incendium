# Incendium

A fire-themed incremental (idle) game featuring dual-resource management, passive generation, and strategic progression mechanics.

**Original Developer:** Sparticle999
**Current Version:** 2.0 - Full Feature Complete

---

## Game Overview

Incendium is a fast-paced incremental game where players gather fire and water aspects, accumulate wealth, and unlock new mechanics through decision-based progression. The game features persistent save functionality, passive income generation, and a unique balance system between competing resources.

### Core Gameplay Loop

1. **Click to Gather** - Collect Fire Aspects and Water Aspects
2. **Sell for Profit** - Convert gathered aspects into money
3. **Invest in Upgrades** - Increase efficiency and unlock new features
4. **Progress Through Decisions** - Unlock new content via decision milestones
5. **Passive Generation** - Hire wizards and unlock passive systems for AFK play

---

## Implemented Features

### ✓ Core Systems
- **Persistent Save System** - Game state auto-saves to localStorage every 5 seconds
- **Game Loop** - 20 ticks per second for smooth passive generation
- **Number Formatting** - Large numbers display as K, M, B, T, Q for readability

### ✓ Resource Systems
- **Fire Aspects** - Primary resource, can be clicked or generated passively
- **Water Aspects** - Secondary resource, unlocked at Decision Level 4
- **Money** - Currency earned from selling aspects, used for all upgrades
- **Mana** - Advanced resource gating special abilities and unlocks

### ✓ Progression Systems
- **4 Decision Levels** - Progressive unlocks that reveal new game mechanics:
  - Level 0→1: Unlock Fire price upgrades
  - Level 1→2: Unlock efficiency improvements
  - Level 2→3: Unlock graphics upgrades and wizard hiring
  - Level 3→4: Unlock water mechanics and balance system

### ✓ Upgrade Paths
- **Fire Upgrades** - Increase click power and sell price
- **Water Upgrades** - Increase click power and sell price (Level 4+)
- **Wizard System** - Hire wizards to generate passive fire (costs money + mana)
- **Mana Upgrades** - Expand mana pool and improve regeneration rates
- **Cosmetic Upgrades** - Button graphics enhancements

### ✓ Advanced Mechanics
- **Passive Generation** - Fire and Water generate automatically based on upgrades
- **Mana Regeneration** - Mana pools regenerate passively, capped at maximum
- **Fire vs Water Balance** - Use mana to shift between fire and water generation
- **Cost Scaling** - Upgrade costs increase exponentially to drive progression

---

## Game Balance

| Feature | Initial Cost | Scaling | Notes |
|---------|--------------|---------|-------|
| Decision Making | 10 → 100 → 1,000 → 10,000 | Exponential | Gates all content |
| Fire Price Upgrade | 20 | 2x each | Doubles sell value |
| Fire Click Upgrade | 100 | 2x each | Doubles fire per click |
| Wizard Hire | 50,000 | 1.25x each | +50 passive fire/sec |
| Mana Pool | 500 | 1.5x each | +50 max mana |
| Mana Regen | 100 | 1.5x each | +0.5 mana/sec |

---

## Testing

The game includes a comprehensive test suite (`tests.js`) with 28 tests covering:
- Number formatting
- Money calculations
- Cost scaling mechanics
- Passive generation systems
- Mana mechanics
- Fire/water balance
- Wizard hiring
- Game state serialization
- Decision progression
- Equipment cost scaling

**Status:** ✓ All tests passing

Run tests with: `node tests.js`

---

## Technical Stack

- **HTML5** - Game structure and UI
- **Vanilla JavaScript** - Game logic (no frameworks)
- **CSS3** - Styling
- **Bootstrap 3.3.6** - Responsive layout
- **localStorage** - Persistent save system

---

## File Structure

```
Incendium/
├── index.html      - Main game interface
├── main.js         - Complete game logic (~400 lines)
├── interface.css   - Game styling
├── tests.js        - Test suite (28 tests)
└── README.md       - This file
```

---

## Upcoming Enhancements

### UI/UX Improvements
- Visual redesign for modern aesthetics
- Better button organization and grouping
- Clearer progression indicators
- Improved number display formatting
- Mobile responsiveness optimization

### Future Features (Beyond Current Scope)
- Training Soldiers system
- Advanced graphics customization
- Leaderboard / progression tracking
- Achievements and milestones
- Audio/visual effects

---

## Contributors

- **Sparticle999** - Original concept and initial implementation
- **Loganator4625** - Gameplay ideas
- **Claude Code** - Feature implementation and system integration (v2.0)

Suggestions and pull requests greatly appreciated!

---

## License

This project is open source and available for modification and distribution.


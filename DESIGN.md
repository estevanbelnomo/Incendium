# Incendium - UI/UX Design Document

## Overview

This document outlines the modern UI/UX redesign for Incendium v2.0, focusing on clarity, visual hierarchy, responsive design, and user experience.

---

## Design System

### Color Palette

The design uses a fire-and-water themed color scheme with supporting colors:

```
Primary Colors:
  --primary: #FF6B35        (Fire Orange)
  --primary-dark: #D84315   (Darker Fire)
  --secondary: #4A90E2      (Water Blue)
  --secondary-dark: #2E5C8A (Darker Water)
  --accent: #F5A623         (Gold/Mana)

Neutral Colors:
  --background: #1a1a1a     (Dark Background)
  --surface: #2d2d2d        (Card/Section Background)
  --text-primary: #ffffff   (Primary Text)
  --text-secondary: #b0b0b0 (Secondary Text)
  --border: #404040         (Borders & Dividers)

Semantic Colors:
  --success: #2ECC71        (Positive/Achievement)
```

### Typography

- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Headings**: Bold, uppercase for section titles
- **Button Text**: Semi-bold (600 weight)
- **Body Text**: Regular weight
- **Icons**: Emoji for quick visual identification

### Spacing & Layout

- **Container Max-Width**: 1200px (desktop)
- **Section Padding**: 20px (desktop), 15px (tablet), 10px (mobile)
- **Gap Between Sections**: 25px (desktop), 15px (mobile)
- **Button Padding**: 12px x 16px (desktop), 10px x 12px (mobile)

---

## Layout Structure

### Header Section
- Centered title with gradient text effect
- Fire-to-gold gradient for brand identity
- Responsive font sizing (3em → 1.5em on mobile)

### Stats Bar
- Responsive grid layout (auto-fit, min 200px columns)
- 6 key metrics displayed:
  - 💰 Money (always visible)
  - 🔥 Fire Aspects (always visible)
  - 💧 Water Aspects (unlocked at Decision Level 4)
  - ✨ Mana Pool (unlocked at Decision Level 4)
  - 📈 Progress (shows 0/4 progression)
  - ⚙️ Passive Rate (unlocked at Decision Level 3)

Each stat item includes:
- Icon + Label (uppercase, small text)
- Value (large, bold)
- Progress bar (when applicable)
- Subtext for additional info

### Button Sections
Organized by functionality with clear visual hierarchy:

1. **🛍️ Start Game** - Initial shop choice
2. **🔥 Fire Aspects** - Fire gathering & selling
3. **📈 Fire Upgrades** - Fire-specific enhancements (Level 1+)
4. **🎯 Progression** - Decision upgrades to unlock features
5. **💧 Water Aspects** - Water gathering & selling (Level 4+)
6. **🧙 Passive Income** - Wizard hiring (Level 3+)
7. **✨ Mana System** - Mana pool & regen upgrades (Level 4+)
8. **⚖️ Fire vs Water** - Balance mechanics (Level 4+)
9. **🎨 Cosmetics** - UI enhancements (Level 3+)

### Content Grid

- **Desktop**: Auto-fit columns (min 350px each)
- **Tablet**: Single column (max-width: 768px)
- **Mobile**: Single column (max-width: 480px)

---

## Component Design

### Buttons

**Default State**:
- Padding: 12px 16px
- Border: 2px solid (varied by variant)
- Border-radius: 8px
- Font-size: 0.95em
- Font-weight: 600
- White space: normal (allows multi-line text)

**Button Variants**:

| Variant | Border Color | Background | Use Case |
|---------|--------------|------------|----------|
| `btn-primary` | Primary Orange | Orange 10% | Fire actions |
| `btn-secondary` | Secondary Blue | Blue 10% | Water actions |
| `btn-accent` | Gold | Gold 10% | Mana/Wizard actions |
| `btn-success` | Green | Green 10% | Positive/Cosmetic |

**Interactive States**:
- **Hover**: Transform up 2px, increased shadow, border highlight
- **Active**: Transform back to normal position
- **Disabled**: 50% opacity, not-allowed cursor

### Section Cards

- **Background**: `var(--surface)` (#2d2d2d)
- **Border**: 1px solid border color
- **Border-radius**: 12px
- **Padding**: 20px
- **Section Title**: Uppercase, gold color, underlined

### Stat Items

- **Background**: Dark semi-transparent (rgba 0,0,0,0.3)
- **Border-left**: 4px colored accent
- **Padding**: 15px
- **Border-radius**: 8px
- **Color codes**: Fire=orange, Water=blue, Mana=gold

### Progress Bars

- **Height**: 6px
- **Background**: Dark with border
- **Fill**: Linear gradient (primary to accent)
- **Smooth animation**: 0.3s transition
- **Used for**: Mana pool, Progress level

---

## Responsive Design

### Breakpoints

#### Desktop (1200px+)
- Max-width container
- Multi-column grid layout
- Full-size headers

#### Tablet (768px - 1199px)
- Single column content grid
- Reduced font sizes
- Adjusted padding

#### Mobile (< 480px)
- Minimal padding (10px)
- Single column layout
- Smaller stat items
- Condensed buttons

### Mobile Optimizations

1. **Touch-friendly**: Buttons are 40px+ minimum height
2. **Text wrapping**: All buttons allow multi-line text
3. **Grid collapse**: 2-column → 1-column smoothly
4. **Readable text**: Font sizes scale down gracefully
5. **Spacing**: Reduced gaps maintain scannability

---

## UI/UX Features

### Progress Indicators

1. **Mana Progress Bar**
   - Shows mana/manaMax as percentage
   - Fills left-to-right
   - Updates every game tick

2. **Decision Progress Bar**
   - Shows progression through 4 decision levels
   - 0/4 → 1/4 → 2/4 → 3/4 → 4/4
   - Visual goal indicator

3. **Stats Display**
   - Large, readable numbers
   - Number formatting (1K, 1M, 1B, etc.)
   - Subtext for rates and values

### Visual Feedback

1. **Button Hover Effects**
   - Color-coded borders
   - Subtle lift animation
   - Contextual glow effect
   - Shadow increase

2. **Animations**
   - `.pulse`: 2-second opacity pulse
   - `.glow`: 2-second box-shadow glow
   - Transitions: 0.3s ease on most properties

### Theme Support

1. **Dark Theme** (default)
   - High contrast on dark background
   - Warm fire colors stand out
   - Easy on eyes for extended play

2. **Light Theme** (available)
   - White/light gray background
   - Adjusted text colors for contrast
   - Maintains color scheme

---

## Accessibility

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Fire (orange) and Water (blue) are colorblind-friendly
- Gold accent adds visual distinction

### Text Legibility
- Minimum 14px font size on desktop
- 12px minimum on mobile
- Uppercase headers with letter-spacing for clarity
- High contrast text colors

### Interactive Elements
- All buttons are clearly clickable
- Focus states supported (browsers)
- Disabled states visually distinct
- Icons complement rather than replace text

### Semantic HTML
- Proper heading hierarchy
- Descriptive button text (not just "Click")
- Organized sections with clear purpose

---

## Performance Considerations

### CSS Optimization
- CSS variables for theme colors
- Minimal vendor prefixes needed
- Efficient selectors
- Smooth 60fps animations

### JavaScript Efficiency
- Progress bars update every game tick (no extra overhead)
- DOM queries cached where possible
- Class toggles instead of innerHTML rewrites

### Asset Loading
- No external images required
- Bootstrap dependency maintained (for now)
- Single stylesheet (interface.css)

---

## Future Enhancement Opportunities

### Short Term
- [ ] Custom color theme selector
- [ ] Compact mode toggle for tight screens
- [ ] Achievement badges in UI
- [ ] Tutorial tooltips on first play

### Medium Term
- [ ] Dark/Light theme toggle in UI
- [ ] Stats comparison (before/after upgrade)
- [ ] Confirmation dialogs for expensive upgrades
- [ ] Drag-to-rearrange sections (advanced)

### Long Term
- [ ] Sound effect toggles
- [ ] Particle effects on purchases
- [ ] Custom color palette editor
- [ ] Data export/visualization tools

---

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | Full | All features supported |
| Firefox | Full | All features supported |
| Safari | Full | Linear gradients work |
| Edge | Full | All features supported |
| IE 11 | Partial | No CSS variables, basic layout |
| Mobile | Full | Responsive design tested |

---

## Testing Checklist

- [x] Desktop layout (1200px+)
- [x] Tablet layout (768px)
- [x] Mobile layout (480px)
- [x] All button colors visible
- [x] Progress bars update smoothly
- [x] Stats display correctly
- [x] Sections appear/hide at right levels
- [x] Responsive font sizing works
- [x] Touch targets are adequate size
- [x] Dark theme is readable
- [x] Light theme works with overrides

---

## Summary of Changes

### From v1 to v2 UI/UX

| Aspect | v1 | v2 | Improvement |
|--------|----|----|-------------|
| **Layout** | Linear top-to-bottom | Organized sections + stats bar | Better visual hierarchy |
| **Colors** | Basic red/blue | Modern gradient theme | Professional appearance |
| **Buttons** | Plain text | Icons + descriptions | Clearer affordances |
| **Organization** | All mixed together | 9 logical sections | Easier navigation |
| **Progress** | Text only | Progress bars + indicators | Visual feedback |
| **Responsive** | Not optimized | Full mobile support | Works on all devices |
| **Spacing** | Cramped | Breathing room | More readable |
| **Accessibility** | Limited | WCAG AA compliant | Inclusive design |

---

## Design Principles Applied

1. **User-Centered**: Organized by player needs/progression
2. **Visual Hierarchy**: Important items are visually prominent
3. **Consistency**: Repeated patterns for predictability
4. **Feedback**: Every action gets visual confirmation
5. **Accessibility**: Supports all users regardless of ability
6. **Responsive**: Works across all device sizes
7. **Performance**: Smooth animations, efficient rendering
8. **Aesthetics**: Modern, cohesive visual design

---

## Contact & Feedback

For design feedback or suggestions, please open an issue on GitHub with the `design` label.

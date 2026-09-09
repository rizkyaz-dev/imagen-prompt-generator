---
name: Tactile Prompt Canvas
colors:
  surface: '#f6faff'
  surface-dim: '#d5dae0'
  surface-bright: '#f6faff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4fa'
  surface-container: '#e9eef4'
  surface-container-high: '#e4e9ef'
  surface-container-highest: '#dee3e9'
  on-surface: '#171c21'
  on-surface-variant: '#5a4136'
  inverse-surface: '#2b3136'
  inverse-on-surface: '#ecf1f7'
  outline: '#8e7164'
  outline-variant: '#e2bfb0'
  surface-tint: '#a04100'
  primary: '#a04100'
  on-primary: '#ffffff'
  primary-container: '#ff6b00'
  on-primary-container: '#572000'
  inverse-primary: '#ffb693'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#0062a1'
  on-tertiary: '#ffffff'
  tertiary-container: '#059eff'
  on-tertiary-container: '#003357'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7a3000'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#d0e4ff'
  tertiary-fixed-dim: '#9ccaff'
  on-tertiary-fixed: '#001d35'
  on-tertiary-fixed-variant: '#00497b'
  background: '#f6faff'
  on-background: '#171c21'
  surface-variant: '#dee3e9'
typography:
  headline-xl:
    fontFamily: DM Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  gutter: 1.5rem
  margin-desktop: 2rem
  margin-mobile: 1rem
---

## Brand & Style

This design system delivers a tactile, physical workspace tailored for generative image engineering and prompt manipulation in a light environment. It embodies an analog studio environment translated into a software console: dials, extruded switches, pill keys, and molded canvas bays. The interface prioritizes direct manipulation, calm cognitive load, and focused creative exploration.

The aesthetic fuses contemporary **Neumorphism (Soft UI)** with utility-driven product design. Interfaces should look and feel as though they were precision-milled out of a single sheet of light matte polymer. Rather than layering floating card elevations or stark borders, shapes emerge organically from the light foundation plane using matched light source angles and dual shadows. High-energy actions and active states are punctuated by an assertive amber-orange accent, breaking through the soft light field to provide unmistakable feedback.

## Colors

The palette is built upon a uniform light neutral canvas with high-contrast text and a focused primary accent:

- **Foundation & Surface (`#EAFF5` / `#F8FAFC`):** Both the master canvas and component surfaces are tuned for a cohesive light mode environment. Form and hierarchy are derived from directional illumination rather than background differentiation.
- **Primary Accent (`#FF6B00`):** Reserved strictly for focal interactive affordances: active toggles, primary generation actions, selected chips, and critical metrics.
- **Text Primary (`#0F172A`):** Dark slate providing crisp, WCAG AAA-compliant readability against the light soft background.
- **Text Secondary (`#64748B`):** Muted slate for metadata, inactive labels, parameter scale markings, and subtle helper copy.
- **Shadow Dark (`rgba(0, 0, 0, 0.08)` / `#CBD5E1`):** The ambient cast shadow positioned in the bottom-right direction.
- **Shadow Light (`rgba(255, 255, 255, 0.8)` / `#FFFFFF`):** The ambient specular highlight positioned in the top-left direction.

Never introduce differing panel fills or contrasting grey tints; tonal differentiation breaks the physical continuum that makes soft UI cohesive.

## Typography

The typographic hierarchy utilizes `DM Sans` for headlines and `Inter` for body and labels. Because soft UI surfaces eliminate sharp borders, type weight and micro-spacing carry the structural legibility of the studio interface.

- **Headlines:** Set in Medium and Semi-Bold weights with subtle negative letter-spacing to ground toolbars, canvas headers, and stage markers.
- **Body:** Kept clean and unadorned. Use standard weights for prompt syntax displays, negative prompt definitions, and parameter explanations.
- **Labels & Monospace Accents:** Set with elevated tracking (`0.01em` to `0.05em`) in medium or semibold weights to simulate stamped industrial equipment labels, parameter badges, and aspect ratio notations.

## Layout & Spacing

Soft surfaces require breathing room; placing components too close together causes opposing shadows and highlights to collide, muddying the physical illusion.

- **Base Rhythm:** Follows an 8px base unit (with a 4px sub-grid for icons and compact micro-controls).
- **Studio Layout Model:** A 12-column fluid grid on desktop anchored by a fixed left configuration dock (320px–380px) and a fluid viewport canvas. Gutters are standardized to 24px (`1.5rem`) to guarantee shadow buffers.
- **Responsive Adaptations:**
  - **Desktop (1200px+):** Three-tier layout: Master Studio Settings (left), Prompt Workbench (center-top), Generation Stage & Iterations (center-bottom/right).
  - **Tablet (768px - 1199px):** Collapsible drawer architecture; parameters condense into extruded slide-out trays.
  - **Mobile (<768px):** Single-column stacked stream. Deep-raised panels reduce elevation spread to prevent horizontal clipping, with gutters stepping down to 16px (`1rem`).

## Elevation & Depth

All physical depth relies on a consistent global light source oriented from top-left (`-135deg`) to bottom-right (`45deg`) tailored for light mode. Every state transition simulates an authentic physical movement in z-space.

### Elevation Tokens & Values
- **Extruded Surface (Resting cards, modules, unselected pills):**
  `box-shadow: 6px 6px 12px #CBD5E1, -6px -6px 12px #FFFFFF;`
- **Deep Raised (Floating control palettes, active modal bays, generation preview frame):**
  `box-shadow: 9px 9px 18px #CBD5E1, -9px -9px 18px #FFFFFF;`
- **Inset / Sunken (Text input bays, slider grooves, pressed state, inactive switch troughs):**
  `box-shadow: inset 4px 4px 8px #CBD5E1, inset -4px -4px 8px #FFFFFF;`
- **Accent Raised (Primary CTA, active run buttons):**
  `box-shadow: 6px 6px 14px rgba(255, 107, 0, 0.25), -4px -4px 10px #FFFFFF;`
- **Flat Ground (Dividers, structural base):**
  `box-shadow: none;`

Transitions between extruded and sunken states should be calibrated to `150ms ease-out` to produce an authentic tactile click.

## Shapes

The interface balances soft geometry between macro-containers and interactive touch targets:

- **Large Structural Frames & Cards:** Fixed `20px` corner radius. This softens technical parameters without drifting into juvenile or bubble-like silhouettes.
- **Interactive Units (Buttons, Chips, Segmented Controls, Search Pills, Sliders):** Fully rounded pill geometry (`9999px`). The continuous curve distributes highlight gradients evenly along the perimeter.
- **Internal Wells (Image output viewports, code/prompt containers):** `16px` inner radius to nest proportionately within outer `20px` cards.

## Components

### Buttons
- **Primary CTA ("Generate", "Synthesize"):** Fully rounded pill (`9999px`). Solid `#FF6B00` fill with white label text. Displays `Accent Raised` shadow. On active/pressed: translates 1px downward with `box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2), inset -2px -2px 5px rgba(255, 255, 255, 0.5)`.
- **Secondary / Utility Button:** Surface fill (`#EAFF5`) with `#0F172A` text. `Extruded Surface` shadow. Pressed state snaps immediately to `Inset / Sunken`.

### Chips & Aspect Ratio Selectors
- Pill-shaped (`9999px`).
- **Unselected:** Surface `#EAFF5`, `Extruded Surface` shadow, text `#64748B`.
- **Selected:** Sunken trough (`Inset / Sunken`) with text `#FF6B00` and an illuminated 6px circular dot indicator in `#FF6B00`.

### Prompt Input Bay & Textareas
- Deep sculpted cavity using `Inset / Sunken`.
- Background matches surface `#EAFF5`.
- Text typed in `#0F172A` with `#64748B` placeholder.
- **Focused State:** Maintained inset shadow accented by a subtle inner glow: `box-shadow: inset 4px 4px 8px #CBD5E1, inset -4px -4px 8px #FFFFFF, 0 0 0 1.5px rgba(255, 107, 0, 0.4)`.

### Switches & Toggles
- **Track:** Capsule container using `Inset / Sunken`.
- **Thumb:** Circular extruded disc (`Extruded Surface`).
- **Checked Track:** Receives `#FF6B00` tinted floor highlight; thumb shifts with crisp snap and emits a subtle accent glow.

### Sliders (CFG Scale, Seed, Step Count)
- **Track:** 8px thick horizontal channel with `Inset / Sunken`.
- **Thumb:** 24px circular disc with `Extruded Surface`, centered with a tiny 4px debossed `#FF6B00` pip.

### Output Canvas Card
- Outer shell rounded to `20px` with `Deep Raised` elevation.
- Houses the rendered viewport inside an inset bezel (`Inset / Sunken` frame with 12px padding) to frame generated images like museum plates.
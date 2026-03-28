# Design System Specification: The Tropical Professional

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Concierge"**

This design system moves beyond the utility of a standard marketplace to create an editorial-grade experience for the Bali home services market. We are bridging the gap between high-end hospitality and rugged reliability. 

To achieve this, we reject the "boxed" layout common in tech. Instead, we use **Organic Asymmetry** and **Tonal Layering**. By utilizing expansive white space (the "Airy" requirement) alongside sophisticated typography scales, we create a sense of calm authority. This isn't just a list of plumbers; it’s a curated portfolio of craftsmanship. We break the grid by allowing images to bleed or overlap containers, signaling a premium, non-templated intentionality.

---

## 2. Colors & Surface Architecture

### The Palette
We use a Material-derived logic with high-contrast modifications for Bali’s high-sunlight environment.

*   **Primary (Trust):** `primary` (#000666) and `primary_container` (#1A237E). Use these for high-authority moments and navigation anchors.
*   **Secondary (Action):** `secondary` (#AC332A) and `secondary_container` (#FD6E60). This "Sunset Coral" is reserved strictly for conversion points (CTAs) and critical alerts.
*   **Tertiary (Warmth):** `tertiary_fixed` (#FFDCC3). A soft clay tone used for subtle backgrounds to provide warmth and an "island" feel without being unprofessional.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections or cards. 
Structure must be created through background shifts. A `surface_container_lowest` (#FFFFFF) card should sit on a `surface_container_low` (#F3F4F5) background. This creates a soft, modern boundary that feels architectural rather than "drawn."

### Glass & Gradient Rule
While we avoid "heavy" gradients, use a **Signature Wash**: a linear transition from `primary` to `primary_container` (at a 135° angle) for Hero sections. For floating elements like the Bottom Navigation bar, use **Glassmorphism**: 
*   **Backdrop:** `surface_container_lowest` at 85% opacity.
*   **Effect:** 20px Backdrop Blur.
*   **Result:** The UI feels integrated with the content scrolling beneath it.

---

## 3. Typography: The Editorial Voice

We pair **Plus Jakarta Sans** (Display/Headlines) for a modern, geometric personality with **Inter** (Body/Labels) for world-class legibility.

| Level | Token | Font | Size | Weight | Intent |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Plus Jakarta Sans | 3.5rem | 700 | Hero marketing statements |
| **Headline** | `headline-md` | Plus Jakarta Sans | 1.75rem | 600 | Service category headers |
| **Title** | `title-lg` | Inter | 1.375rem | 600 | Provider names / Card titles |
| **Body** | `body-md` | Inter | 0.875rem | 400 | Description and reviews |
| **Label** | `label-md` | Inter | 0.75rem | 500 | Metadata / Status tags |

**Editorial Note:** Use `on_surface_variant` (#454652) for body text to reduce harsh contrast against pure white, maintaining a premium "ink on paper" feel.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are replaced by **Ambient Occlusion**.

*   **The Layering Principle:** Depth is achieved by stacking. 
    *   Level 0: `surface` (#F8F9FA) - The base canvas.
    *   Level 1: `surface_container_low` (#F3F4F5) - Inset sections or secondary content.
    *   Level 2: `surface_container_lowest` (#FFFFFF) - Primary interactive cards.
*   **Ambient Shadows:** For "Floating" elements (e.g., FABs or active modals), use a shadow color of `on_surface` at 6% opacity with a 32px blur and 8px Y-offset.
*   **The "Ghost Border":** If a visual divider is required for accessibility, use `outline_variant` (#C6C5D4) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary (The Command):** `primary` background with `on_primary` text. `xl` (1.5rem) rounding. No shadow.
*   **Secondary (The Action):** `secondary` background. Reserved for "Book Now" or "Emergency Repair."
*   **Tertiary (The Ghost):** No background. `primary` text. Used for "Cancel" or "View Less."

### Service Provider Cards (Distinct Styles)
To help users distinguish between individual pros and large companies:
*   **Solo Artisans:** Use a `surface_container_lowest` card with a circular avatar and `title-md`. Focus on personal reviews.
*   **Agencies:** Use a `surface_container_high` card with a subtle `secondary_fixed` accent bar on the left. Focus on "Team Size" and "Licensed" badges.

### Inputs & Search
*   **The Search Bar:** Should be `surface_container_lowest` with a deep `md` (0.75rem) shadow. It must appear to "float" over the map or list for one-handed thumb access.
*   **Input Fields:** Use `surface_variant` background with a `sm` (0.25rem) bottom-only focus indicator in `primary`.

### List Items
*   **Rule:** Forbid 1px dividers. Use a `spacing-4` (1.4rem) vertical gap to separate list items. Use tonal shifts (`surface_container_low`) to group related list items together into a "block."

---

## 6. Do’s and Don’ts

### Do
*   **Do** use the `24` (8.5rem) spacing token for bottom padding on all screens to clear the floating bottom navigation.
*   **Do** use high-quality photography of tropical textures (teak wood, stone, greenery) as background elements in Hero sections.
*   **Do** utilize `primary_fixed_dim` for "Verified" badges to ensure they stand out without vibrating against white backgrounds.

### Don't
*   **Don't** use 100% black (#000000). Use `on_surface` (#191C1D) to maintain the soft-premium feel.
*   **Don't** use sharp corners. Every interaction point must use at least the `DEFAULT` (0.5rem) rounding scale to feel approachable.
*   **Don't** crowd the interface. If a screen feels "busy," increase the spacing token by two steps (e.g., move from `4` to `6`).

---

## 7. Spacing & Rhythm
We operate on a custom scale to ensure a "breathable" island vibe.

*   **Micro-spacing (1-2):** For icon-to-text relationships.
*   **Structural-spacing (4-6):** For content padding within cards.
*   **Sectional-spacing (10-16):** For separating distinct service categories or legal blocks.

*Note: Always prioritize one-handed use by placing primary actions in the "Natural" thumb zone (bottom 40% of the screen).*
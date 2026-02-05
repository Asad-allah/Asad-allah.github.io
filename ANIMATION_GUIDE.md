# 🎨 Artistic Animation Guide

This guide explains all the new animation components and effects added to your portfolio.

## 📦 New Components Overview

### 1. **EnhancedCursor** (`components/ui/EnhancedCursor.jsx`)
Replaces your old cursor with a multi-layered animated cursor:
- Main dot that scales on hover
- Ring that follows with spring physics
- Ambient glow that trails behind
- Click ripple effects
- Auto-hides on touch devices

### 2. **AnimatedBackground** (`components/ui/AnimatedBackground.jsx`)
Replaces static ambient orbs with:
- Animated gradient mesh using SVG
- Floating orbs with organic movement
- Subtle grid pattern overlay
- Color-shifting gradients

### 3. **ParticleField** (`components/ui/ParticleField.jsx`)
Interactive particle network:
- Connects nearby particles with lines
- Mouse repulsion effect
- Configurable particle count and color
- Canvas-based for performance

### 4. **TextScramble** (`components/ui/TextScramble.jsx`)
Matrix-style text decode effect:
```jsx
<TextScramble text="Hello World" duration={1500} />
<HoverScramble text="Hover me!" />
```

### 5. **RevealText** (`components/ui/RevealText.jsx`)
Multiple text reveal animations:
- `WordReveal` - Words fly in with 3D rotation
- `CharReveal` - Character by character
- `LineReveal` - Slides up from mask
- `BlurReveal` - Fades in with blur

### 6. **TiltCard** (`components/ui/TiltCard.jsx`)
3D tilt effect with glare:
```jsx
<TiltCard tiltAmount={10} glareEnabled={true} scale={1.02}>
  <YourContent />
</TiltCard>
```

### 7. **FloatingElement** (`components/ui/FloatingElement.jsx`)
Smooth floating animations:
- `FloatingElement` - Basic up/down float
- `OrganicFloat` - Multi-axis organic movement
- `ParallaxLayer` - Scroll-based parallax

### 8. **MagneticButton** (`components/ui/MagneticButton.jsx`)
Magnetic attraction effect:
```jsx
<MagneticButton strength={0.3}>
  <button>Hover me</button>
</MagneticButton>
```

### 9. **ScrollProgress** (`components/ui/ScrollProgress.jsx`)
Top progress bar showing scroll position.

## 🚀 Usage Examples

### Hero Section with All Effects
```jsx
import HeroEnhanced from "@/components/HeroEnhanced";

// In your App.jsx
<HeroEnhanced />
```

### Projects with 3D Tilt
```jsx
import ProjectsBentoEnhanced from "@/components/ProjectsBentoEnhanced";

<ProjectsBentoEnhanced />
```

### Individual Components

#### Text Scramble Effect
```jsx
import TextScramble, { HoverScramble } from "@/components/ui/TextScramble";

// On scroll into view
<TextScramble text="AI Engineer" duration={1500} />

// On hover
<HoverScramble text="Hover to decode" />
```

#### 3D Tilt Card
```jsx
import TiltCard from "@/components/ui/TiltCard";

<TiltCard 
  tiltAmount={10}      // Max rotation degrees
  glareEnabled={true}  // Show shine effect
  scale={1.02}         // Scale on hover
>
  <img src="..." />
</TiltCard>
```

#### Floating Animation
```jsx
import { OrganicFloat } from "@/components/ui/FloatingElement";

<OrganicFloat>
  <img src="..." />
</OrganicFloat>
```

#### Word Reveal Animation
```jsx
import { WordReveal } from "@/components/ui/RevealText";

<h1>
  <WordReveal 
    text="Selected Works" 
    staggerDelay={0.1}
  />
</h1>
```

#### Magnetic Effect
```jsx
import { MagneticWrapper } from "@/components/ui/MagneticButton";

<MagneticWrapper strength={0.2}>
  <a href="...">Link that follows cursor</a>
</MagneticWrapper>
```

## 🎨 Customization

### Adjust Particle Count
```jsx
<ParticleField 
  particleCount={50}  // Default: 30
  color="rgba(0,0,0,0.1)"
  speed={0.5}
/>
```

### Custom Cursor Colors
Edit `EnhancedCursor.jsx`:
```jsx
backgroundColor: isHovering ? "rgba(253, 224, 71, 0.3)" : "#111827"
```

### Scroll Reveal Timing
Edit `ScrollRevealTextEnhanced` in HeroEnhanced.jsx:
```jsx
const step = 1 / words.length;
const end = start + step * 1.5;  // Adjust for faster/slower reveal
```

## ⚡ Performance Tips

1. **Particle Count**: Keep under 50 for mobile
2. **Cursor**: Automatically disabled on touch devices
3. **Tilt Cards**: Use `will-change: transform` sparingly
4. **Images**: Always use optimized formats (WebP)

## 🎯 Best Practices

### Use `will-change` for GPU acceleration:
```css
.animated-element {
  will-change: transform, opacity;
}
```

### Reduce motion for accessibility:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

### Lazy load heavy components:
```jsx
const HeavyComponent = lazy(() => import("./HeavyComponent"));
```

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Animations feel sluggish | Reduce particle count, disable blur filters |
| Cursor not showing | Check if device is touch-based (auto-hides) |
| 3D tilt not working | Ensure parent has `perspective` set |
| Text scramble stuck | Check if text prop changes unexpectedly |
| Scroll animations choppy | Use `useSpring` with lower stiffness |

## 📱 Responsive Considerations

All components automatically adapt:
- **Cursor**: Hidden on touch devices
- **Particles**: Reduced count on mobile
- **Tilt**: Disabled on small screens
- **Text**: Responsive sizing with clamp()

## 🎨 Color Scheme Integration

Components use your existing color palette:
- Primary: `#111827` (Charcoal)
- Accent: `#FDE047` (Yellow-300)
- Background: `#FAFAFA` (Off-white)

Update CSS variables in `index.css` to change globally.

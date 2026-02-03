# 🎨 Guide des Animations – L'Instant Barbier

## Composants Animés

### 1. **AnimatedHeading** – Titres avec révélation progressive

```tsx
import { AnimatedHeading } from '@/components'

// Utilisation basique
<AnimatedHeading level="h2">Titre animé</AnimatedHeading>

// Options avancées
<AnimatedHeading
  level="h1"
  centered
  delay={0.2}
  className="custom-class"
>
  Titre centré
</AnimatedHeading>
```

**Props :**

- `level` : 'h1' | 'h2' | 'h3' (défaut: 'h2')
- `centered` : boolean - Centre le titre
- `delay` : number - Délai d'animation en secondes
- `className` : Classes CSS additionnelles

---

### 2. **AnimatedCard** – Cartes avec effet hover et scroll

```tsx
import { AnimatedCard } from '@/components'

// Grille de cartes avec stagger
;<div className='grid grid-cols-3 gap-6'>
  {items.map((item, index) => (
    <AnimatedCard key={item.id} index={index}>
      {/* Contenu de la carte */}
    </AnimatedCard>
  ))}
</div>
```

**Props :**

- `index` : number - Pour effet stagger (délai progressif)
- `delay` : number - Délai de base
- `className` : Classes CSS additionnelles

**Effets :**

- ✨ Apparition progressive au scroll
- 🎯 Hover avec scale et lift
- 💫 Glow doré au survol

---

### 3. **Section** – Sections avec animations optionnelles

```tsx
import { Section } from '@/components'

// Sans animation
<Section>
  <Container>Contenu</Container>
</Section>

// Avec animation
<Section animate animationType="fade-up" delay={0.2}>
  <Container>Contenu animé</Container>
</Section>
```

**Props :**

- `animate` : boolean - Active l'animation
- `animationType` : 'fade-up' | 'fade-in' | 'scale'
- `delay` : number - Délai d'animation
- `id` : string - ID pour ancres
- `className` : Classes CSS additionnelles

---

### 4. **Button** – Bouton CTA enrichi

```tsx
import { Button } from '@/components'

;<Button href={PLANITY_URL}>Prendre rendez-vous</Button>
```

**Effets intégrés :**

- 🌟 Glow pulsant au hover
- ✨ Shimmer animé
- 📐 Coins décorés
- 🎯 Scale subtil
- 💫 Border animée

---

## Classes d'animation CSS

### Keyframes disponibles

```css
.animate-float          /* Flottement 8s */
.animate-shimmer        /* Brillance 3s */
.animate-glow           /* Pulsation lumineuse 2s */
.animate-gentle-bounce  /* Rebond subtil 2s */
.animate-pulse-glow     /* Pulsation d'opacité 3s */
```

### Utilisation

```tsx
<div className='animate-gentle-bounce'>Élément qui rebondit doucement</div>
```

---

## Logo amélioré

Le logo dans le Header a été agrandi (28x28) et enrichi :

- 💫 Double glow layer (20px + 10px blur)
- ✨ Animation pulse sur un layer
- 🎯 Hover : scale 1.1 + rotation 6°
- 🌟 Drop shadow doré
- ⚡ Transition 700ms

---

## Hook personnalisé (optionnel)

Pour des animations avancées avec GSAP :

```tsx
import { useScrollAnimation, useScrollStagger } from '@/hooks/useScrollAnimation'

// Animation unique
const ref = useScrollAnimation<HTMLDivElement>({
  animation: 'fade-up',
  duration: 1,
  delay: 0.2
})

<div ref={ref}>Contenu animé</div>

// Animation stagger (enfants)
const containerRef = useScrollStagger<HTMLDivElement>({
  animation: 'fade-up',
  stagger: 0.1
})

<div ref={containerRef}>
  <div>Enfant 1</div>
  <div>Enfant 2</div>
  <div>Enfant 3</div>
</div>
```

---

## Bonnes pratiques

### Performance

- ✅ Utiliser `once: true` pour les animations (déjà activé)
- ✅ Les animations GSAP clearProps après execution
- ✅ Framer Motion optimisé pour scroll

### Accessibilité

- ✅ `prefers-reduced-motion` respecté automatiquement
- ✅ Animations non bloquantes
- ✅ Focus states préservés

### Délais recommandés

- Sections : 0.2s entre chaque
- Cartes en grille : 0.1s stagger
- Éléments séquentiels : 0.15s stagger

---

## Exemple complet

```tsx
import { AnimatedHeading, AnimatedCard, Section, Container, Button } from '@/components'

export default function MyPage() {
  return (
    <main className='min-h-screen pt-20'>
      <Section animate animationType='fade-up'>
        <Container>
          <AnimatedHeading level='h1' centered>
            Bienvenue
          </AnimatedHeading>

          <div className='grid grid-cols-3 gap-6 mt-12'>
            {services.map((service, i) => (
              <AnimatedCard key={service.id} index={i}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </AnimatedCard>
            ))}
          </div>

          <div className='text-center mt-12'>
            <Button href='/contact'>Contactez-nous</Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
```

---

## 🎯 Prochaines étapes

1. ✅ Logo agrandi et animé
2. ✅ Composants d'animation créés
3. ✅ Boutons enrichis
4. 🔄 Appliquer aux pages existantes
5. 📱 Optimiser pour mobile

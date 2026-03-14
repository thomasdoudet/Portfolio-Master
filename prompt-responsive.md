# Prompt Claude Code — Rendre le portfolio responsive

## Contexte

Mon portfolio est un site HTML/CSS/JS vanilla avec GSAP + ScrollTrigger. Il est actuellement optimisé uniquement pour desktop. Je dois le rendre responsive pour mobile et tablette.

**Structure des fichiers :**
```
/
├── index.html
├── css/
│   ├── style.css       (styles page d'accueil + partagés)
│   └── projets.css     (styles pages projets)
├── script/
│   ├── main.js         (JS partagé)
│   └── projets.js (JS pages projets)
├── projets/
│   ├── ceremonie.html
│   ├── trailer.html
│   ├── sweat.html
│   ├── interbde.html
│   └── jpo.html
```

## Règle absolue

**NE JAMAIS modifier le rendu desktop actuel.** Tout le travail responsive doit se faire uniquement via des `@media` queries. Les styles existants hors media queries ne doivent pas être touchés, déplacés ou réécrits. On ajoute, on ne modifie pas.

## Breakpoints à utiliser

```css
/* Tablette paysage */
@media (max-width: 1024px) { }

/* Tablette portrait */
@media (max-width: 768px) { }

/* Mobile */
@media (max-width: 480px) { }
```

## Approche technique

Ajouter les media queries **à la fin** de `style.css` et **à la fin** de `projets.css`. Ne pas intercaler les media queries entre les règles existantes.

## Fichier par fichier — ce qu'il faut adapter

### 1. `css/style.css` — Adaptations responsive

#### Navigation (`nav`)
- **Desktop :** `padding: 20px 80px` — ne pas toucher
- **Tablette :** `padding: 20px 40px`
- **Mobile :** `padding: 16px 24px`
- **Mobile :** Réduire le gap des `.nav-links` à `24px`
- **Mobile petit (480px) :** Envisager un menu hamburger OU réduire encore la taille des liens. À toi de juger ce qui est le plus propre — si tu fais un hamburger, le JS correspondant va dans `main.js`. Le menu hamburger doit garder la même DA (fond `var(--bg)`, texte `var(--cream)`, animation fluide)

#### Grid lines (`.grid-lines`)
- **Tablette :** `padding: 0 40px`, réduire à 3 lignes
- **Mobile :** `padding: 0 24px`, réduire à 2 lignes ou masquer complètement (`display: none`)

#### Curseur custom (`.cursor`, `.cursor-ring`)
- **Tablette/Mobile :** Masquer le curseur custom (`display: none`) et rétablir le curseur natif (`body { cursor: auto; }`)

#### Hero (`#hero`)
- **Desktop :** `padding: 0 80px` — ne pas toucher
- **Tablette :** `padding: 0 40px`
- **Mobile :** `padding: 0 24px`
- Le nom `.hero-name` utilise déjà `clamp()` donc il devrait s'adapter. Vérifier que ça ne déborde pas sur mobile.
- `.hero-name .line2` : passer en `flex-wrap: wrap` ou `flex-direction: column` sur mobile si le nom + le rôle débordent
- `.hero-quote` : `max-width: 100%` sur mobile
- `.hero-corner` : masquer sur mobile (trop petit pour être vu)
- `.hero-scroll-hint` : garder visible

#### Statement (`#statement`)
- **Tablette :** `padding: 100px 40px`
- **Mobile :** `padding: 80px 24px`
- La taille du texte utilise `clamp()`, vérifier que c'est lisible

#### Galerie horizontale (`#gallery-section`)
- **Desktop :** Scroll horizontal avec GSAP pin — ne pas toucher
- **Tablette/Mobile :** **Désactiver le scroll horizontal GSAP** et passer en layout vertical classique
  - `.gallery-track` : `flex-direction: column`, `gap: 24px`, pas de `will-change: transform`
  - `.gallery-item.large`, `.medium`, `.tall` : `width: 100%`, hauteur adaptée (`height: 50vh` ou `auto` avec `aspect-ratio`)
  - Le JS dans `main.js` doit conditionner le ScrollTrigger horizontal : ne l'activer que si `window.innerWidth > 768px`
  - Mettre à jour la fonction `initGallery()` pour gérer ce cas
- `.gallery-intro` : `flex-direction: column` sur mobile, `gap: 16px`

#### Marquee (`#marquee`)
- Réduire la taille de font sur mobile (le `clamp()` devrait suffire, vérifier)
- `padding: 40px 0` sur mobile

#### À propos (`#apropos`)
- `.apropos-grid` : passer de `grid-template-columns: 1fr 1fr` à `1fr` (une seule colonne) sur tablette et mobile
- L'image passe en premier (elle est déjà en premier dans le DOM), pleine largeur
- `gap: 48px` sur tablette, `gap: 32px` sur mobile
- `.apropos-text h2` : vérifier que le `clamp()` fonctionne bien
- `.services-list li` : `font-size: 18px` sur mobile
- **Padding section :** tablette `40px`, mobile `24px`

#### Contact / Footer (`#contact`)
- **Padding :** tablette `40px`, mobile `24px`
- `.contact-heading` : vérifier que le `clamp()` ne fait pas déborder le texte
- `.footer-bar` : `flex-direction: column`, `gap: 16px`, `text-align: center` sur mobile
- `.footer-socials` : `justify-content: center` sur mobile

### 2. `css/projets.css` — Adaptations responsive

#### Project Hero (`.proj-hero`)
- **Padding :** tablette `0 40px 60px`, mobile `0 24px 40px`
- `.proj-hero-back` : `top: 80px; left: 40px` tablette, `top: 70px; left: 24px` mobile
- `.proj-meta` : `flex-wrap: wrap`, `gap: 20px` sur mobile
- `.proj-hero-title` : vérifier le `clamp()`

#### Statement projet (`.proj-statement`)
- **Padding :** tablette `80px 40px`, mobile `60px 24px`

#### Overview (`.proj-overview`)
- Passer en **une seule colonne** sur tablette/mobile (`grid-template-columns: 1fr`)
- **Padding :** tablette `0 40px 80px`, mobile `0 24px 60px`

#### Strip rôle/outils (`.proj-strip`)
- **Tablette :** garder les 3 colonnes mais `padding: 48px 40px`, `gap: 40px`
- **Mobile :** passer en **une seule colonne** (`flex-direction: column`), `padding: 32px 24px`, `gap: 32px`

#### Full-width image (`.proj-fullimg`)
- **Tablette :** `padding: 40px`
- **Mobile :** `padding: 24px` ou `padding: 0` (image bord à bord)
- `aspect-ratio: 16/9` peut devenir `4/3` sur mobile pour plus de présence

#### Side-by-side images (`.proj-duo`)
- **Mobile :** passer en une colonne (`grid-template-columns: 1fr`)
- **Padding :** tablette `0 40px 40px`, mobile `0 24px 24px`

#### Text + Image (`.proj-text-img`)
- **Tablette/Mobile :** passer en une colonne (`grid-template-columns: 1fr`)
- **Padding :** tablette `40px`, mobile `24px`
- La classe `.reverse` ne doit plus inverser sur mobile (tout est empilé)
- L'image passe après le texte sur mobile (ordre naturel du DOM)
- `.proj-text-img-visual` : `aspect-ratio: 4/3` sur mobile au lieu de `3/4`

#### Résultats (`.proj-results`)
- `.proj-results-grid` : `grid-template-columns: 1fr` sur mobile (empiler les chiffres)
- Ou `repeat(3, 1fr)` mais avec des chiffres plus petits
- **Padding :** tablette `80px 40px`, mobile `60px 24px`

#### Galerie finale (`.proj-gallery`)
- `.proj-gallery-grid` : passer de 3 colonnes à **2 colonnes** sur tablette, **1 colonne** sur mobile
- Les classes `.span-2` et `.tall` ne doivent plus s'appliquer sur mobile (tout en `grid-column: span 1`, `grid-row: span 1`)
- **Padding :** tablette `40px`, mobile `24px`

#### Video embed (`.proj-video`)
- **Padding :** tablette `40px`, mobile `0` (vidéo bord à bord)

#### Next project (`.proj-next`)
- **Padding :** tablette `80px 40px`, mobile `60px 24px`

### 3. `js/main.js` — Adaptations JS

#### Curseur custom
Wrapper le code du curseur dans un check :
```javascript
const isMobile = window.matchMedia('(max-width: 768px)').matches;
if (!isMobile) {
  // tout le code du curseur ici
}
```

#### Galerie horizontale
La fonction `initGallery()` doit vérifier la largeur avant d'activer le pin horizontal :
```javascript
function initGallery() {
  if (window.innerWidth <= 768) {
    // Pas de scroll horizontal, juste des reveals classiques sur chaque item
    gsap.utils.toArray('.gallery-item').forEach(item => {
      gsap.fromTo(item,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: .8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    return;
  }
  
  // Code desktop existant (scroll horizontal) — ne pas modifier
  const totalWidth = track.scrollWidth;
  // ... etc
}
```

#### Resize handler
Le resize handler existant doit tuer et recréer correctement les ScrollTriggers en fonction du nouveau breakpoint. S'assurer que passer de mobile à desktop (et inversement) ne casse rien.

### 4. `js/projets.js` — Adaptations JS

#### Parallax images
Désactiver ou réduire le parallax sur mobile (trop de mouvement sur petit écran) :
```javascript
if (window.innerWidth > 768) {
  // Parallax desktop
}
```

### 5. Pages HTML — Adaptations

#### Viewport meta
Vérifier que TOUTES les pages (index + projets) ont bien :
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

#### Navigation hamburger (si implémenté)
Si tu crées un menu hamburger, le HTML du bouton doit être ajouté dans TOUTES les pages (index + les 5 projets). Le bouton doit être masqué en desktop et visible uniquement en mobile.

## Contraintes

- **Mobile-first : NON.** On part du desktop existant et on ajoute des overrides responsive. Ne pas réécrire les styles de base.
- **Pas de framework CSS** (pas de Bootstrap, Tailwind, etc.)
- **Tester visuellement** chaque breakpoint après les modifications
- **Les animations GSAP doivent rester fluides** sur mobile — réduire la complexité si nécessaire (moins de parallax, pas de pin horizontal)
- **Les `clamp()` déjà en place** dans le CSS gèrent une partie du responsive pour les tailles de texte — ne pas les remplacer, juste vérifier qu'ils fonctionnent bien aux petites tailles
- **Conserver la DA** : même palette, mêmes fonts, même esprit "éditorial/cinématographique" sur mobile

## Ce qu'il ne faut PAS faire

- Ne pas modifier les styles desktop existants (hors media queries)
- Ne pas supprimer les grid lines, corner marks ou le grain — les masquer proprement via media queries si besoin
- Ne pas casser le scroll horizontal desktop de la galerie
- Ne pas ajouter de librairies JS supplémentaires
- Ne pas utiliser `!important` sauf en dernier recours absolu
- Ne pas toucher au contenu textuel

## Ordre de travail recommandé

1. Commencer par `style.css` — ajouter les media queries à la fin du fichier
2. Adapter `main.js` — conditionner curseur + galerie horizontale
3. Tester `index.html` sur les 3 breakpoints
4. Passer à `projets.css` — ajouter les media queries à la fin
5. Adapter `projets.js` — conditionner parallax
6. Tester une page projet (ex: `ceremonie.html`) sur les 3 breakpoints
7. Vérifier toutes les autres pages projets
8. Ajouter le hamburger menu si nécessaire (en dernier)

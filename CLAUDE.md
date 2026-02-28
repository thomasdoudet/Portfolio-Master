# CLAUDE.md — Portfolio Thomas Doudet

## Contexte du projet

Portfolio personnel de **Thomas Doudet**, vidéaste et designer graphique issu d'un BUT MMI (Métiers du Multimédia et de l'Internet). Ce portfolio est destiné à des candidatures en masters axés sur la réalisation/production audiovisuelle et la création numérique. L'esthétique est **cinématique, éditoriale et sobre** — pas un portfolio tech/startup, mais plutôt l'atmosphère d'un générique de film ou d'un programme de festival.

## Stack technique

- **HTML / CSS / JavaScript** — fichiers statiques, pas de framework
- **GSAP 3.12+ avec ScrollTrigger** — animations et scroll-driven effects
- **Google Fonts** — Cormorant Garamond (serif italic) + Space Grotesk (sans-serif)
- CDN pour GSAP : `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` et `ScrollTrigger.min.js`
- Pas de bundler, pas de npm, pas de framework JS — tout en vanilla

## Fichier existant : index.html

Le fichier `index.html` à la racine est un **prototype fonctionnel de la page d'accueil** déjà développé. Il contient :
- ✅ Le design system (variables CSS, couleurs, typographies)
- ✅ Le curseur custom (dot + ring avec GSAP)
- ✅ Les lignes de grille de construction en arrière-plan (5 lignes verticales fixes)
- ✅ La navigation fixe (logo + liens)
- ✅ Le hero avec nom animé + rôle rotatif + citation
- ✅ La section statement ("Chaque projet naît d'une intention...")
- ✅ La galerie horizontale de projets (scroll horizontal GSAP + parallax)
- ✅ Le marquee défilant (CINÉMA · ÉMOTION · ART...)
- ✅ La section À propos (grille image + bio + compétences)
- ✅ Le footer contact ("Travaillons ensemble" + email + socials)
- ✅ Les animations de reveal au scroll (`.reveal`, `.reveal-left`)

### Ce qui doit être corrigé/amélioré dans l'existant

1. **Typographie sans-serif** : actuellement `Syne` → **remplacer par `Space Grotesk`** partout. Mettre à jour le lien Google Fonts et la variable CSS `--sans`.

2. **Ordre des sections homepage** : l'ordre actuel est Hero → Statement → Galerie projets → Marquee → À propos → Contact. Le nouvel ordre doit être :
   1. Hero
   2. Statement ("Chaque projet naît d'une intention...")
   3. **À propos** (déplacé avant les projets)
   4. **Parcours** (NOUVELLE SECTION — scroll horizontal, voir plus bas)
   5. Galerie projets
   6. **2ème texte impactant** (NOUVEAU — un second statement)
   7. Marquee
   8. Contact + Footer

3. **Section À propos** : le contenu est placeholder. Garder la structure (grille image + texte + compétences) mais préparer l'espace pour du vrai contenu.

4. **Section Parcours** : entièrement nouvelle, détaillée ci-dessous.

5. **Pages projet individuelles** : à créer, template détaillé ci-dessous.

---

## Design System

### Couleurs
```css
:root {
  --bg:        #0A0E1A;   /* Fond principal — bleu nuit très sombre */
  --bg2:       #0D1120;   /* Fond alternatif légèrement plus clair */
  --cream:     #F5E6C8;   /* Texte principal — crème chaud */
  --muted:     #C4B89A;   /* Texte secondaire — beige sourd */
  --dim:       rgba(245, 230, 200, 0.35);
  --line:      #1A1F30;   /* Lignes de grille, séparateurs subtils */
  --line-num:  #2A3050;   /* Numéros de grille, labels discrets */
  --accent:    #1E2233;   /* Accents, bordures */
}
```

### Typographies
| Rôle | Police | Style | Taille type |
|------|--------|-------|-------------|
| Titres principaux (H1, hero, noms) | Cormorant Garamond | Italic, 300 | 96-160px (clamp) |
| Titres secondaires (H2, statements) | Cormorant Garamond | Italic, 300 | 36-72px (clamp) |
| Citations, pull quotes | Cormorant Garamond | Italic, 300-400 | 18-28px |
| Navigation, logo | Space Grotesk | Medium 500 | 12-14px, uppercase, letter-spacing .08-.15em |
| Labels, eyebrows, metadata | Space Grotesk | Regular 400 | 10-11px, uppercase, letter-spacing .12-.25em |
| Body text, descriptions | Space Grotesk | Regular 400 | 15-16px, line-height 1.6-1.75 |

### Espacements récurrents
- Padding horizontal global : `80px` (réduit en responsive)
- Gap entre sections : `80-160px`
- Espacement interne sections : `80px` padding vertical
- Gap galerie : `24px`

### Éléments récurrents
- **Eyebrow** : label centré avec lignes horizontales de chaque côté (`::before` / `::after`), 10px uppercase, `--line-num`
- **Lignes de grille** : 5 lignes verticales fixes (`position: fixed`), `--line` avec numéros `--line-num`
- **Corner marks** : petits angles décoratifs (L de 10-12px) aux coins des images/sections
- **Reveal animations** : `.reveal` (fade up 40px) et `.reveal-left` (fade left 50px), déclenchées par ScrollTrigger
- **Grain overlay** : texture SVG en `::before` sur le hero, opacity .04

---

## NOUVELLE SECTION : Parcours (scroll horizontal)

### Position dans la page
Entre "À propos" et "Galerie projets".

### Concept
Timeline horizontale du parcours de Thomas. Scroll vertical → mouvement horizontal (via GSAP ScrollTrigger pin + scrub). Inspiré de [2025.unseen.co](https://2025.unseen.co/).

### Structure

**Intro (visible avant le scroll horizontal)** :
- Eyebrow : "PARCOURS" (style standard avec lignes)
- Titre : "Du pixel à l'écran" — serif italic, ~64px, centré
- Ligne horizontale décorative (120px, centrée)

**5 blocs qui défilent horizontalement :**

| # | Titre | Sous-titre | Année | Notes |
|---|-------|-----------|-------|-------|
| 1 | Lycée | Les premières images | 2020 | Format image vertical |
| 2 | BUT R&T | Réseaux & Télécoms | 2021 | Montre la réorientation |
| 3 | MMI | Métiers du Multimédia et de l'Internet | 2022 | Bloc principal, plus grand |
| 4 | Le Studio | Production & Réalisation | 2024 | Image format cinéma (wide) |
| 5 | Alternance | Webmaster & Création | 2025 | |

Chaque bloc contient :
- Titre en serif italic ~100px (120px pour "MMI")
- Sous-titre en Space Grotesk 14px uppercase
- Texte placeholder (2-3 lignes, Space Grotesk 15px, `--muted`)
- 1-2 images placeholder (divs avec gradients, tailles variées)
- Séparateur vertical entre blocs (1px `--line`, marqueur année en haut)

### Effet parallax multi-vitesses
```
Titres :      vitesse × 0.7  (traînent, flottent)
Textes :      vitesse × 1.0  (normal)
Images :      vitesse × 1.3  (avancent plus vite)
```
Implémentation : chaque couche a un `data-speed` différent, animé par ScrollTrigger avec scrub.

### Distance totale
Environ 4-5× la largeur du viewport. Chaque bloc doit avoir assez d'espace pour respirer.

---

## PAGES PROJET INDIVIDUELLES

### Structure de fichiers
Chaque projet a sa propre page HTML. Pour l'instant, créer un template (`projet-template.html` ou directement une page comme `projet-ceremonie-walid.html`).

### Les 5 projets de Thomas
| Projet | Catégorie | Année |
|--------|-----------|-------|
| La Cérémonie des Walid | Production Live | 2025 |
| Trailer Le Studio | Vidéo | 2025 |
| Sweat MMI — We Are Walid | Design Graphique | 2025 |
| Sweat MMI — Walid's World | Design Graphique | 2024 |
| Shootings Inter-BDE | Photographie | 2024 |

### Layout d'une page projet (de haut en bas)

**1. Hero (100vh)** — Image plein écran en fond, overlay gradient (transparent en haut → `rgba(10,14,26,0.7)` en bas). Titre du projet en bas-gauche : serif italic 96-120px. Ligne décorative de 80px sous le titre.

**2. Barre de métadonnées** — Fond `--bg`. Une rangée horizontale avec : Année | Catégorie | Rôle | Compétences. Labels en 10px uppercase `--line-num`, valeurs en 15px `--muted`. Séparés par des lignes verticales.

**3. Contenu éditorial** — Layout organique de type magazine, PAS une alternance mécanique texte/image :
- Paragraphe d'intro centré (max-width 720px), drop cap en serif italic 64px
- Image pleine largeur (format cinéma 21:9 ou 16:9)
- Section asymétrique : colonne texte ~55% (avec pull quote en serif italic 28px, bordure gauche) + colonne images ~40% (2 images de tailles différentes, décalées verticalement)
- Paire d'images côte à côte (60% + 40%, gap 16px)
- Paragraphe de conclusion centré

**4. Galerie finale** — Eyebrow "GALERIE". Grille masonry 3 colonnes, images de hauteurs variées (3:4, 16:9, 1:1), gap 12px. Hover : scale 1.02 + bordure crème.

**5. Navigation inter-projets** — Deux moitiés : "← Projet précédent" à gauche, "Projet suivant →" à droite, séparées par ligne verticale centrale. Titres en serif italic 36px.

**6. Footer** — Identique à la homepage.

---

## Référence Figma

Le design Figma est accessible ici : `https://www.figma.com/design/zeBldZ7utZvp3bbURh5u18/`

Les frames Figma contiennent la direction artistique pour toutes les pages. En cas de doute sur un détail visuel, se référer au Figma. Le code existant dans `index.html` est déjà assez fidèle au design pour la homepage.

---

## Principes de développement

1. **Partir de l'existant** : le `index.html` actuel est la base. Ne pas réécrire ce qui fonctionne déjà — l'améliorer.

2. **Section par section** : développer et tester chaque section individuellement avant de passer à la suivante.

3. **GSAP partout** : toutes les animations passent par GSAP (pas de CSS animations complexes). ScrollTrigger pour les effets liés au scroll. Utiliser `scrub` pour les animations fluides, `toggleActions` pour les reveals one-shot.

4. **Images placeholder** : tant qu'il n'y a pas de vraies images, utiliser des `<div>` avec des `background: linear-gradient(...)` de couleurs sombres variées. Chaque placeholder doit avoir un gradient légèrement différent pour les distinguer.

5. **Mobile** : le responsive n'est pas la priorité immédiate mais garder le code propre pour l'ajouter facilement. Utiliser `clamp()` pour les tailles de police, des unités relatives quand c'est possible.

6. **Performance** : `will-change: transform` sur les éléments animés. Éviter les repaints inutiles. Préférer `transform` et `opacity` pour les animations.

7. **Accessibilité de base** : `lang="fr"`, attributs `alt` sur les images, structure sémantique (header, main, section, footer, nav).

---

## Ordre de travail recommandé

1. ✅ Corriger la font (Syne → Space Grotesk)
2. ✅ Réorganiser les sections dans le bon ordre
3. Développer la section Parcours (scroll horizontal + parallax)
4. Améliorer la galerie projets (contenu réel : Cérémonie des Walid, Trailer Le Studio, etc.)
5. Créer le template page projet
6. Créer les 5 pages projet individuelles
7. Polish : curseur, transitions, micro-animations, responsive

/**
 * projets.js — Scripts GSAP partagés pour toutes les pages projet
 * Charger APRÈS les CDN GSAP (gsap.min.js + ScrollTrigger.min.js)
 */

// ═══════════════════════════════════════════════════════════
// Navbar — masquer au scroll bas, réapparaître au scroll haut
// ═══════════════════════════════════════════════════════════
(function () {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastY = window.scrollY;
    let wasGoingDown = false;
    let scrollUpStartY = 0;
    let hidden = false;
    const SCROLL_UP_THRESHOLD = 300;

    window.addEventListener('scroll', () => {
        const currentY = window.scrollY;
        const goingDown = currentY > lastY;

        if (goingDown) {
            if (!wasGoingDown && currentY > 80 && !hidden) {
                gsap.to(navbar, {
                    y: '-100%',
                    opacity: 0,
                    duration: 0.35,
                    ease: 'power2.in'
                });
                hidden = true;
            }
            wasGoingDown = true;
        }
        else if (!goingDown && wasGoingDown) {
            scrollUpStartY = lastY;
            wasGoingDown = false;
        }

        if (!goingDown && hidden && !wasGoingDown) {
            const scrolledUp = scrollUpStartY - currentY;
            if (scrolledUp >= SCROLL_UP_THRESHOLD) {
                gsap.to(navbar, {
                    y: '0%',
                    opacity: 1,
                    duration: 0.45,
                    ease: 'power3.out'
                });
                hidden = false;
            }
        }

        lastY = currentY;
    }, {
        passive: true
    });
}());

// ═══════════════════════════════════════════════════════════
// Hero Entrance Animation
// ═══════════════════════════════════════════════════════════
const heroTl = gsap.timeline({
    delay: .3
});
heroTl
    .from('.proj-hero-back', {
        opacity: 0,
        x: -20,
        duration: .5
    })
    .to('.proj-meta', {
        opacity: 1, y: 0,
        duration: .6,
        ease: 'power3.out',
    }, '-=.2')
    .to('.proj-hero-title', {
        opacity: 1, y: 0,
        duration: .9,
        ease: 'power3.out',
    }, '-=.4');

// ═══════════════════════════════════════════════════════════
// Parallax — images pleine largeur
// ═══════════════════════════════════════════════════════════
gsap.utils.toArray('.proj-fullimg-wrap').forEach(wrap => {
    const img = wrap.querySelector('img, .ph');
    if (!img) return;

    gsap.fromTo(img, {
        y: -30,
        scale: 1.08
    }, {
        y: 30, scale: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: wrap,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        }
    });
});

// ═══════════════════════════════════════════════════════════
// Gallery — stagger à l'entrée dans le viewport
// ═══════════════════════════════════════════════════════════
gsap.utils.toArray('.proj-gallery-item').forEach((item, i) => {
    gsap.fromTo(item, {
        opacity: 0,
        y: 30
    }, {
        opacity: 1, y: 0,
        duration: .6,
        delay: i * .06,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
        }
    });
});

// ═══════════════════════════════════════════════════════════
// Image Stack — mask reveal au scroll (section épinglée)
// ═══════════════════════════════════════════════════════════
gsap.utils.toArray('.proj-text-img--stack').forEach(section => {
    const visual = section.querySelector('.proj-img-stack');
    if (!visual) return;

    const items = [...visual.querySelectorAll('.proj-img-stack-item')];
    const toReveal = items.slice(1); // toutes sauf la première
    if (!toReveal.length) return;

    // État initial : items empilés, masqués par clip-path
    gsap.set(toReveal, {
        clipPath: 'inset(100% 0 0% 0)'
    });

    // Timeline : chaque image se dévoile du bas vers le haut
    const tl = gsap.timeline();
    toReveal.forEach(item => {
        tl.to(item, {
            clipPath: 'inset(0% 0 0% 0)',
            ease: 'power2.inOut',
            duration: 1,
        });
    });

    // ScrollTrigger : épingle la section pendant la durée des transitions
    ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: 'top top',
        end: `+=${toReveal.length * window.innerHeight * 0.9}`,
        animation: tl,
        scrub: 1,
    });
});

// ═══════════════════════════════════════════════════════════
// Hero Scroll Exit — masque textes → zoom média → fondu fond
// ═══════════════════════════════════════════════════════════
(function () {
    const hero        = document.querySelector('.proj-hero');
    const heroImg     = document.querySelector('.proj-hero-img');
    const heroBack    = document.querySelector('.proj-hero-back');
    const heroMeta    = document.querySelector('.proj-meta');
    const heroTitle   = document.querySelector('.proj-hero-title');
    const heroCorners = document.querySelectorAll('.proj-corner');

    if (!hero || !heroImg) return;

    // Wrapper overflow:hidden autour d'un élément (effet masque)
    // paddingTop/Bottom en px : compense les jambages qui dépassent la boîte de layout
    // margin-top négatif : compense le padding-top pour ne pas décaler le layout
    function maskWrap(el, pt, pb) {
        if (!el) return;
        const wrap = document.createElement('div');
        wrap.style.cssText = `overflow:hidden; padding-top:${pt}px; padding-bottom:${pb}px; margin-top:-${pt}px;`;
        el.parentNode.insertBefore(wrap, el);
        wrap.appendChild(el);
    }
    maskWrap(heroMeta,  4, 12);
    maskWrap(heroTitle, 16, 40);

    // Cible le media pour le zoom (img, vidéo, iframe, ou placeholder)
    const media = heroImg.querySelector('img, video, iframe, .ph') || heroImg;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            markers: true,
        }
    });

    // Phase 1 — Textes glissent vers le bas (derrière masques overflow:hidden)
    // fromTo explicit : évite que GSAP capture les valeurs avant la fin de l'animation d'entrée
    tl.fromTo([heroBack, ...heroCorners],
        { opacity: 1 },
        { opacity: 0, duration: 0.28, ease: 'power2.in' }
    )
    .fromTo(heroMeta,
        { y: 0 },
        { y: '130%', duration: 0.38, ease: 'power3.in' },
        '<'
    )
    .fromTo(heroTitle,
        { y: 0 },
        { y: '150%', duration: 0.38, ease: 'power3.in' },
        "<+=0.1"
    )

    // Phase 2 — Zoom sur le média
    .to(media, {
        scale: 1.5,
        duration: 0.45,
        ease: 'none',
    }, 0.32)

    // Phase 3 — Fondu du fond → révèle la couleur de fond
    .to(heroImg, {
        opacity: 0,
        duration: 0.38,
        ease: 'none',
    }, 0.65);
}());

// ═══════════════════════════════════════════════════════════
// Statement — entrée cinématique (remplace le .reveal générique)
// ═══════════════════════════════════════════════════════════
(function () {
    const stmt = document.querySelector('.proj-statement-text');
    if (!stmt) return;

    gsap.fromTo(stmt,
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'power3.out',
            overwrite: true,
            scrollTrigger: {
                trigger: stmt,
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        }
    );
}());

// ═══════════════════════════════════════════════════════════
// Refresh ScrollTrigger
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    ScrollTrigger.refresh();
});

window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

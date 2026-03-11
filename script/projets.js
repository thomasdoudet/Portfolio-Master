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
                gsap.to(navbar, { y: '-100%', opacity: 0, duration: 0.35, ease: 'power2.in' });
                hidden = true;
            }
            wasGoingDown = true;
        } else if (!goingDown && wasGoingDown) {
            scrollUpStartY = lastY;
            wasGoingDown = false;
        }

        if (!goingDown && hidden && !wasGoingDown) {
            const scrolledUp = scrollUpStartY - currentY;
            if (scrolledUp >= SCROLL_UP_THRESHOLD) {
                gsap.to(navbar, { y: '0%', opacity: 1, duration: 0.45, ease: 'power3.out' });
                hidden = false;
            }
        }

        lastY = currentY;
    }, { passive: true });
}());

// ═══════════════════════════════════════════════════════════
// Hero Entrance Animation
// ═══════════════════════════════════════════════════════════
const heroTl = gsap.timeline({ delay: .3 });
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
        },
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
        },
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
    gsap.set(toReveal, { clipPath: 'inset(100% 0 0% 0)' });

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
// Refresh ScrollTrigger
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    ScrollTrigger.refresh();
});

window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

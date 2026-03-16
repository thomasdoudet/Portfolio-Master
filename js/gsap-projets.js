/**
 * gsap-projets.js — Scripts GSAP partagés pour toutes les pages projet
 * Charger APRÈS les CDN GSAP (gsap.min.js + ScrollTrigger.min.js)
 */

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════
// Custom Cursor
// ═══════════════════════════════════════════════════════════
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

if (cursor && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        gsap.to(cursor, { x: mx, y: my, duration: 0 });
    });

    gsap.ticker.add(() => {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        gsap.set(ring, { x: rx, y: ry });
    });

    document.addEventListener('mouseleave', () => {
        gsap.to([cursor, ring], { opacity: 0, duration: .3 });
    });
    document.addEventListener('mouseenter', () => {
        gsap.to([cursor, ring], { opacity: 1, duration: .3 });
    });

    // Expand cursor on interactive elements
    const interactives = document.querySelectorAll('a, .proj-gallery-item, .proj-strip-col li');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(cursor, { width: 48, height: 48, duration: .3 }));
        el.addEventListener('mouseleave', () => gsap.to(cursor, { width: 8,  height: 8,  duration: .3 }));
    });
}

// ═══════════════════════════════════════════════════════════
// Hero Entrance Animation
// ═══════════════════════════════════════════════════════════
const heroTl = gsap.timeline({ delay: .3 });
heroTl
    .from('.proj-hero-back', { opacity: 0, x: -20, duration: .5 })
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
// Scroll Reveals — .reveal (fade up) + .reveal-left (fade left)
// ═══════════════════════════════════════════════════════════
gsap.utils.toArray('.reveal').forEach(el => {
    // Skip hero elements (animated by heroTl)
    if (el.closest('.proj-hero')) return;

    gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
            opacity: 1, y: 0,
            duration: .9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
            },
        }
    );
});

gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.fromTo(el,
        { opacity: 0, x: -50 },
        {
            opacity: 1, x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        }
    );
});

// ═══════════════════════════════════════════════════════════
// Parallax — images pleine largeur
// ═══════════════════════════════════════════════════════════
gsap.utils.toArray('.proj-fullimg-wrap').forEach(wrap => {
    const img = wrap.querySelector('img, .ph');
    if (!img) return;

    gsap.fromTo(img,
        { y: -30, scale: 1.08 },
        {
            y: 30, scale: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: wrap,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        }
    );
});

// ═══════════════════════════════════════════════════════════
// Gallery — stagger à l'entrée dans le viewport
// ═══════════════════════════════════════════════════════════
gsap.utils.toArray('.proj-gallery-item').forEach((item, i) => {
    gsap.fromTo(item,
        { opacity: 0, y: 30 },
        {
            opacity: 1, y: 0,
            duration: .6,
            delay: i * .06,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
        }
    );
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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ========================================
// Custom Cursor
// ========================================
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    
    gsap.to(cursorRing, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
    });
});

// Hide cursor when mouse leaves the document
document.addEventListener('mouseleave', () => {
    gsap.to(cursor, { opacity: 0, duration: 0.3 });
    gsap.to(cursorRing, { opacity: 0, duration: 0.3 });
});

document.addEventListener('mouseenter', () => {
    gsap.to(cursor, { opacity: 1, duration: 0.3 });
    gsap.to(cursorRing, { opacity: 1, duration: 0.3 });
});

// ========================================
// Navbar — masquer au scroll bas, réapparaître au scroll haut (avec délai de scroll)
// ========================================
(function () {
    const navbar = document.querySelector('.navbar');
    const statement = document.querySelector('.statement');
    if (!navbar || !statement) return;

    let lastY = window.scrollY;
    let wasGoingDown = false;
    let scrollUpStartY = 0;
    let hidden = false;
    const SCROLL_UP_THRESHOLD = 300;

    function getStatementBounds() {
        return statement.getBoundingClientRect().top + window.scrollY;
    }

    window.addEventListener('scroll', () => {
        const currentY = window.scrollY;
        const statementTop = getStatementBounds();
        
        // Ignorer complètement la logique si on est dans la zone statement (ou 200px avant)
        if (currentY >= statementTop - 200 && currentY < statementTop + window.innerHeight + 500) {
            return;
        }

        const goingDown = currentY > lastY;

        if (goingDown) {
            // On scroll vers le bas
            if (!wasGoingDown && currentY > 80 && !hidden) {
                gsap.to(navbar, { y: '-100%', opacity: 0, duration: 0.35, ease: 'power2.in' });
                hidden = true;
            }
            wasGoingDown = true;
        } else if (!goingDown && wasGoingDown) {
            // On vient de passer de "scroll vers le bas" à "scroll vers le haut"
            scrollUpStartY = lastY;
            wasGoingDown = false;
        }
        
        // Si on est en train de scroller vers le haut et le header est caché
        if (!goingDown && hidden && !wasGoingDown) {
            const scrolledUp = scrollUpStartY - currentY;
            if (scrolledUp >= SCROLL_UP_THRESHOLD) {
                gsap.to(navbar, { y: '0%', opacity: 1, duration: 0.45, ease: 'power3.out' });
                hidden = false;
            }
        }

        lastY = currentY;
    }, { passive: true });
})();

// ========================================
// Hero Title Animation — two-line slide-up
// ========================================
const heroNameLines = document.querySelectorAll('.hero-name-line');
if (heroNameLines.length > 0) {
    gsap.from(heroNameLines, {
        yPercent: 110,    /* slide up depuis le bas du clip */
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.13,
    });
}

// Scroll indicator — apparaît après le nom
gsap.to('.hero-scroll', {
    opacity: 1,
    duration: 0.9,
    ease: 'power3.out',
    delay: 1.0,
});

// ========================================
// Hero Role Rotation — sliding vertical with seamless loop
// Structure expected: .hero-role > .role-inner > .role-item* (last item is duplicate of first)
// ========================================
const roleInner = document.querySelector('.role-inner');
const roleItems = roleInner ? roleInner.querySelectorAll('.role-item') : [];
if (roleInner && roleItems.length > 1) {
    gsap.set(roleInner, { y: 0 });

    let currentRole = 0;
    const totalRoles = roleItems.length; // includes the duplicate at the end

    function getStepHeight() {
        const h = roleItems[0].getBoundingClientRect().height;
        return h || (parseFloat(getComputedStyle(roleItems[0]).fontSize) * 1.4);
    }

    let stepHeight = getStepHeight();
    window.addEventListener('resize', () => { stepHeight = getStepHeight(); });

    function rotateRole() {
        currentRole++;
        // When we reach the duplicated first item at the end, animate there then reset instantly to 0
        if (currentRole >= totalRoles - 1) {
            gsap.to(roleInner, {
                y: -(currentRole * stepHeight),
                duration: 0.6,
                ease: 'power3.inOut',
                onComplete: () => {
                    currentRole = 0;
                    gsap.set(roleInner, { y: 0 }); // snap back without animation
                }
            });
        } else {
            gsap.to(roleInner, { y: -(currentRole * stepHeight), duration: 0.6, ease: 'power3.inOut' });
        }
    }

    // Start after a short delay to match prior timing, then loop
    let intervalId = null;
    const startDelay = 2400;
    setTimeout(() => {
        rotateRole();
        intervalId = setInterval(rotateRole, 2600);
    }, startDelay);

    // Clean up on page unload to avoid timers lingering
    window.addEventListener('beforeunload', () => {
        if (intervalId) clearInterval(intervalId);
    });
}

// ========================================
// Statement Section — Pin + Animated Text Reveal (char by char)
// ========================================
const statementSection = document.querySelector('.statement');
const statementTitle = document.querySelector('.statement-title');
const statementText = document.querySelector('.statement-text');

if (statementSection && statementTitle && statementText) {
    // Wrap each character in the text with a span for letter-by-letter animation
    const originalText = statementText.innerText;
    statementText.innerHTML = originalText
        .split('')
        .map(char => `<span class="statement-char" style="opacity: 0; display: inline;">${char}</span>`)
        .join('');

    const statementChars = statementText.querySelectorAll('.statement-char');

    const statementTl = gsap.timeline({
        scrollTrigger: {
            trigger: statementSection,
            start: 'top top',
            end: () => `+=${window.innerHeight * 4}`, // Longer pin duration for full text animation + margin
            pin: true,
            scrub: 1,
            anticipatePin: 1,
        }
    });

    // Animate title: fade in + slight scale/y
    statementTl.fromTo(statementTitle,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' }
    );

    // Animate text: char by char fade in with stagger
    statementTl.fromTo(statementChars,
        { opacity: 0 },
        { 
            opacity: 1, 
            duration: 0.02,
            stagger: 0.03, // 30ms between each character
            ease: 'power1.inOut'
        },
        '-=0.4' // Start slightly before title finishes
    );
}

// ========================================
// Reveal Animations on Scroll
// ========================================
function setupRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    const revealLeftElements = document.querySelectorAll('.reveal-left');
    
    revealElements.forEach((element) => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    revealLeftElements.forEach((element) => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}

setupRevealAnimations();

// ========================================
// Marquee Animation Loop
// ========================================
const marqueeContent = document.querySelector('.marquee-content');
if (marqueeContent) {
    gsap.fromTo(marqueeContent, 
        { x: 0 },
        { 
            x: -marqueeContent.offsetWidth,
            duration: 20,
            ease: 'none',
            repeat: -1
        }
    );
}

// ========================================
// Projects — reveals staggerés au scroll
// ========================================
const projectItems = document.querySelectorAll('.project-item');
if (projectItems.length > 0) {
    // Les titres glissent depuis la droite, staggerés
    projectItems.forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            x: 60,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.09,
            scrollTrigger: {
                trigger: '.projects-list',
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });
    });
}

// "Mes Projets" — slide up depuis le bas
gsap.from('.projects-heading', {
    opacity: 0,
    y: 60,
    duration: 1.0,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.projects',
        start: 'top 60%',
        toggleActions: 'play none none none',
    },
});

// ========================================
// Projects — cross-fade image de fond au hover
// ========================================
(function () {
    const projectBgs  = document.querySelectorAll('.project-bg');
    const projectList = document.getElementById('js-projects-list');
    const projectSection = document.querySelector('.projects');
    const projectItems = document.querySelectorAll('.project-item');
    if (!projectBgs.length || !projectList) return;

    let currentBg = -1; // -1 = aucune image visible

    function activateBg(index) {
        if (index === currentBg) return;
        if (currentBg !== -1) {
            gsap.to(projectBgs[currentBg], { opacity: 0, duration: 0.7, ease: 'power2.inOut' });
        }
        gsap.to(projectBgs[index], { opacity: 1, duration: 0.7, ease: 'power2.inOut' });
        currentBg = index;
    }

    function resetBg() {
        if (currentBg === -1) return;
        gsap.to(projectBgs[currentBg], { opacity: 0, duration: 0.55, ease: 'power2.inOut' });
        currentBg = -1;
    }

    projectItems.forEach((item) => {
        const index = parseInt(item.getAttribute('data-index'), 10);
        item.addEventListener('mouseenter', () => activateBg(index));
    });

    // Reset background when leaving the entire projects section
    if (projectSection) {
        projectSection.addEventListener('mouseleave', resetBg);
    }
}());

// ========================================
// Project Links — Dim others on hover
// ========================================
(function () {
    const projectItems = document.querySelectorAll('.project-item');
    const projectList = document.getElementById('js-projects-list');
    if (!projectItems.length) return;

    projectItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            // Restaurer d'abord tous les liens à 100%
            document.querySelectorAll('.project-item-link').forEach((link) => {
                gsap.killTweensOf(link);
                link.style.opacity = '1';
            });
            
            // Puis dim tous les AUTRES liens (sauf celui survolé)
            document.querySelectorAll('.project-item-link').forEach((link) => {
                if (link.closest('.project-item') !== item) {
                    gsap.to(link, { opacity: 0.5, duration: 0.3, ease: 'power2.out' });
                }
            });
        });

        // Reset opacity when leaving an item (even if staying in the list)
        item.addEventListener('mouseleave', () => {
            document.querySelectorAll('.project-item-link').forEach((link) => {
                gsap.to(link, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            });
        });
    });

    // Restore all links when leaving the list
    if (projectList) {
        projectList.addEventListener('mouseleave', () => {
            document.querySelectorAll('.project-item-link').forEach((link) => {
                gsap.to(link, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            });
        });
    }
}());

// ========================================
// Parcours Horizontal Scroll + Parallax
// ========================================
const parcoursTrack = document.querySelector('.parcours-track');
if (parcoursTrack) {
    // Distance totale que doit parcourir le track (slide-in depuis droite + scroll)
    const totalDistance = parcoursTrack.offsetWidth - window.innerWidth;
    const totalMove = window.innerWidth + totalDistance;

    // État initial : track hors viewport à droite
    gsap.set(parcoursTrack, { x: window.innerWidth });

    // ── TIMELINE UNIQUE + PIN UNIQUE ────────────────────────────────────────
    // Phase 1 (dur. 1) : "Parcours" passe de crème (#F5E6C8) → filigrane (25%)
    // Phase 2 (dur. 4) : track glisse de x:+vw → x:-totalDistance
    const parcoursTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.parcours',
            start: 'top top',
            end: () => `+=${totalMove * 1.0 + window.innerWidth * 0.3}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
        },
    });

    parcoursTl.to('.parcours-hero-text', {
        color: 'rgba(245, 230, 200, 0.25)',
        duration: 1,
        ease: 'none',
    });

    parcoursTl.to(parcoursTrack, {
        x: -totalDistance,
        duration: 4,
        ease: 'none',
    }, '-=0.1');

    // ── PARALLAX ────────────────────────────────────────────────────────────
    // Images avancent légèrement plus vite que les textes (facteur ×1.3 environ)
    parcoursTrack.querySelectorAll('.parcours-bloc').forEach((bloc) => {
        const img   = bloc.querySelector('.parcours-img-ph');
        const imgWrap = bloc.querySelector('.parcours-img-wrap') || img;
        const texts = bloc.querySelector('.parcours-bloc-texts');

        const stConfig = {
            trigger: bloc,
            containerAnimation: parcoursTl,
            start: 'left right',
            end:   'right left',
            scrub: true,
        };

        if (imgWrap)   gsap.fromTo(imgWrap,   { x: '35%' }, { x: '-35%', ease: 'none', scrollTrigger: { ...stConfig } });
        if (texts) gsap.fromTo(texts, { x: '-18%' }, { x:  '18%', ease: 'none', scrollTrigger: { ...stConfig } });
    });
}

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Refresh ScrollTrigger after all content is loaded
    ScrollTrigger.refresh();
});

// Refresh on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

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
// Hero Role Rotation — mot vertical, une entrée à la fois
// ========================================
const roleItems = document.querySelectorAll('.role-item');
if (roleItems.length > 1) {
    // Cacher tous sauf le premier
    gsap.set(roleItems, (i) => ({
        opacity: i === 0 ? 1 : 0,
        y:       i === 0 ? 0 : 18,
    }));

    const tl = gsap.timeline({ repeat: -1, delay: 2.4 });
    roleItems.forEach((item, i) => {
        const next = roleItems[(i + 1) % roleItems.length];
        tl.to(item, { opacity: 0, y: -18, duration: 0.38, ease: 'power2.in' }, '+=2.2');
        tl.fromTo(next,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0,  duration: 0.38, ease: 'power2.out' },
            '<+0.05'
        );
    });
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
    // Clone the content to create seamless loop
    const clone = marqueeContent.cloneNode(true);
    marqueeContent.parentElement.appendChild(clone);
    
    gsap.fromTo('.marquee-content', 
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

    document.querySelectorAll('.project-item').forEach((item) => {
        const index = parseInt(item.getAttribute('data-index'), 10);
        item.addEventListener('mouseenter', () => activateBg(index));
    });

    projectList.addEventListener('mouseleave', resetBg);
}());

// ========================================
// Parcours Horizontal Scroll + Parallax
// ========================================
const parcoursTrack = document.querySelector('.parcours-track');
if (parcoursTrack) {
    const totalDistance = parcoursTrack.offsetWidth - window.innerWidth;
    
    // Main horizontal scroll animation
    gsap.to(parcoursTrack, {
        scrollTrigger: {
            trigger: '.parcours',
            start: 'center center',
            end: 'bottom -=100%',
            scrub: 1,
            pin: true,
            markers: false
        },
        x: -totalDistance,
        ease: 'none'
    });
    
    // Parallax multi-vitesses
    const elements = parcoursTrack.querySelectorAll('[data-speed]');
    elements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed'));
        
        gsap.to(element, {
            scrollTrigger: {
                trigger: '.parcours',
                start: 'center center',
                end: 'bottom -=100%',
                scrub: 1,
                markers: false
            },
            x: totalDistance * (speed - 1) * 0.5,
            ease: 'none'
        });
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

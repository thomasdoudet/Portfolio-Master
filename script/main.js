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
// Hero Title Animation
// ========================================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    gsap.from(heroTitle, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out'
    });
}

// ========================================
// Hero Role Rotation
// ========================================
const roleItems = document.querySelectorAll('.role-item');
if (roleItems.length > 0) {
    const timeline = gsap.timeline({ repeat: -1 });
    
    roleItems.forEach((item, index) => {
        if (index > 0) {
            timeline.to(roleItems[index - 1], {
                opacity: 0,
                y: -20,
                duration: 0.5
            }, '1');
            
            timeline.fromTo(item, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 },
                '<'
            );
            
            timeline.to({}, {}, '+=2');
        }
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
// Horizontal Gallery Animation
// ========================================
const gallery = document.querySelector('.gallery-horizontal');
if (gallery) {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.to(gallery, {
        scrollTrigger: {
            trigger: '.projects',
            start: 'bottom 10%',
            end: 'bottom -50%',
            scrub: 1,
            markers: false
        },
        x: -500,
        duration: 3,
        ease: 'power1.inOut'
    });
}

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

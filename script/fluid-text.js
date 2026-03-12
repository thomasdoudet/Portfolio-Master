/**
 * Fluid Text Sizing — Adapte la font-size à la largeur du conteneur
 * Utilisation : Ajouter la classe `fluid-text` à un élément pour l'activer
 * 
 * @example
 * <p class="fluid-text">Mes Projets</p>
 */

function initFluidText() {
    const fluidElements = document.querySelectorAll('.fluid-text');
    
    if (fluidElements.length === 0) return;

    /**
     * Calcule et applique la font-size basée sur la largeur du conteneur
     * @param {HTMLElement} element - L'élément à redimensionner
     */
    function resizeElement(element) {
        const container = element.closest('section') || element.parentElement;
        
        if (!container) return;

        // Récupère les margins/paddings du conteneur
        const cs = getComputedStyle(container);
        const availableWidth = container.clientWidth
            - parseFloat(cs.paddingLeft)
            - parseFloat(cs.paddingRight);

        // Sauvegarde les styles inline actuels
        const originalInlineStyle = element.getAttribute('style');
        
        // Mesure la largeur du texte à 100px (font-size de référence)
        element.style.visibility = 'hidden';
        element.style.display = 'inline-block';
        element.style.whiteSpace = 'nowrap';
        element.style.fontSize = '100px';
        element.style.position = 'absolute';
        element.style.left = '-9999px';
        
        const textWidth = element.getBoundingClientRect().width;
        
        // Restaure les styles inline originaux
        if (originalInlineStyle) {
            element.setAttribute('style', originalInlineStyle);
        }
        else {
            element.removeAttribute('style');
        }

        // Calcule et applique la nouvelle font-size
        if (textWidth > 0) {
            const newFontSize = Math.floor((availableWidth / textWidth) * 100);
            element.style.fontSize = newFontSize - 1 + 'px';
        }
    }

    /**
     * Redimensionne tous les éléments fluid-text
     */
    function resizeAll() {
        fluidElements.forEach(element => resizeElement(element));
    }

    // Attendre que les polices soient chargées
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            resizeAll();
            window.addEventListener('resize', resizeAll);
        });
    }
    else {
        // Fallback pour les navigateurs sans Support FontFaceSet
        setTimeout(resizeAll, 1000);
        window.addEventListener('resize', resizeAll);
    }
}

// Initialiser quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFluidText);
}
else {
    initFluidText();
}

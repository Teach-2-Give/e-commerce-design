document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.querySelector('.products-grid') as HTMLElement;

    let draggedItem: HTMLElement | null = null;

    productsGrid.addEventListener('dragstart', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('product-card')) {
            draggedItem = target;
            event.dataTransfer?.setData('text/plain', ''); // Required for Firefox
            setTimeout(() => {
                target.style.opacity = '0.5'; // Reduce opacity while dragging
            }, 0);
        }
    });

    productsGrid.addEventListener('dragend', () => {
        if (draggedItem) {
            draggedItem.style.opacity = ''; // Reset opacity
            draggedItem = null;
        }
    });

    productsGrid.addEventListener('dragover', (event) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (draggedItem && target.classList.contains('product-card')) {
            const boundingRect = target.getBoundingClientRect();
            const offset = boundingRect.y + (boundingRect.height / 2);
            if (event.clientY - offset > 0) {
                target.style.borderBottom = '2px solid #000'; // Highlight drop position
            } else {
                target.style.borderTop = '2px solid #000'; // Highlight drop position
            }
        }
    });

    productsGrid.addEventListener('dragleave', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('product-card')) {
            target.style.borderTop = '';
            target.style.borderBottom = '';
        }
    });

    productsGrid.addEventListener('drop', (event) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (draggedItem && target.classList.contains('product-card')) {
            target.style.borderTop = '';
            target.style.borderBottom = '';
            const boundingRect = target.getBoundingClientRect();
            const offset = boundingRect.y + (boundingRect.height / 2);
            if (event.clientY - offset > 0) {
                productsGrid.insertBefore(draggedItem, target.nextElementSibling);
            } else {
                productsGrid.insertBefore(draggedItem, target);
            }
        }
    });
});

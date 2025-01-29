class AvatarEditor {
    constructor() {
        this.currentWearables = {
            hat: null,
            shirt: null,
            pants: null
        };
        
        this.initEditor();
    }

    initEditor() {
        // Load mock inventory
        const inventory = {
            hats: ['hat1.png', 'hat2.png'],
            shirts: ['shirt1.png', 'shirt2.png']
        };

        // Set up tab system
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchCategory(tab.dataset.category));
        });

        this.loadCategory('hats', inventory.hats);
    }

    switchCategory(category) {
        // Update tabs and content
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`.tab[data-category="${category}"]`).classList.add('active');
        this.loadCategory(category, inventory[category]);
    }

    loadCategory(category, items) {
        const grid = document.querySelector('.items-grid');
        grid.innerHTML = '';
        
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'clothing-item';
            itemElement.innerHTML = `
                <img src="img/clothes/${item}" 
                     data-category="${category}" 
                     data-item="${item}">
            `;
            
            itemElement.addEventListener('click', () => this.equipItem(category, item));
            grid.appendChild(itemElement);
        });
    }

    equipItem(category, item) {
        const slot = document.querySelector(`.wearable[data-slot="${category}"]`);
        slot.src = `img/clothes/${item}`;
        this.currentWearables[category] = item;
        console.log('Equipped:', this.currentWearables);
        // Here you would save to localStorage or backend
    }
}

// Initialize editor
new AvatarEditor();
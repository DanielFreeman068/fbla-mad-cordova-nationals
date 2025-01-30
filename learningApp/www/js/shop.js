class InventoryManager {
    constructor() {
        this.inventory = JSON.parse(localStorage.getItem('jolt-inventory')) || {
            ownedItems: [],
            equippedItems: []
        };
    }

    addItem(item) {
        if (!this.isOwned(item.id)) {
            this.inventory.ownedItems.push(item.id);
            this.save();
        }
    }

    equipItem(itemId) {
        if (this.isOwned(itemId)) {
            const category = this.getItemCategory(itemId);
            // Unequip other items in same category
            this.inventory.equippedItems = this.inventory.equippedItems.filter(id =>
                this.getItemCategory(id) !== category
            );
            this.inventory.equippedItems.push(itemId);
            this.save();
        }
    }

    isOwned(itemId) {
        return this.inventory.ownedItems.includes(itemId);
    }

    isEquipped(itemId) {
        return this.inventory.equippedItems.includes(itemId);
    }

    getItemCategory(itemId) {
        // shopItems is created at the bottom: new ShopManager()
        // We find which category has an item with matching itemId
        return Object.entries(shopItems).find(([category, items]) =>
            items.some(item => item.id === itemId)
        )[0];
    }

    save() {
        localStorage.setItem('jolt-inventory', JSON.stringify(this.inventory));
    }
}

class ShopManager {
    constructor() {
        this.inventoryManager = new InventoryManager();

        /**
         * 1) We define the full list of categories (hats, shirts, shorts, shoes, accessories, backpack).
         * 2) Each category calls createItems('someBaseName', itemCount, rarities).
         *    - The baseName is used for item IDs and display names.
         *    - The itemCount is how many items per category (e.g., 6).
         *    - The rarities array is cycled. 
         */
        this.items = {
            hats:        this.createItems('hat', 6, ['common', 'rare', 'epic']),
            shirts:      this.createItems('shirt', 6, ['common', 'rare', 'epic']),
            shorts:      this.createItems('shorts', 6, ['common', 'rare', 'epic']),
            shoes:       this.createItems('shoes', 6, ['common', 'rare', 'epic']),
            accessories: this.createItems('accessory', 6, ['common', 'rare', 'epic']),
            backpack:    this.createItems('backpack', 6, ['common', 'rare', 'epic'])
        };

        this.initShop();
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * This method returns a relevant Ionicon based on category name.
     * You can change these to whichever icons you prefer.
     */
    getCategoryIcon(category) {
        const icons = {
            hats:        'baseball-cap-outline', // or 'person-circle-outline'
            shirts:      'shirt-outline',
            shorts:      'cut-outline',          // Ionicons doesn't have a perfect "shorts" icon; do whatever you like
            shoes:       'footsteps-outline',
            accessories: 'diamond-outline',      // or 'ribbon-outline', 'glasses-outline', etc.
            backpack:    'bag-handle-outline'    // or 'briefcase-outline'
        };
        return icons[category] || 'cube-outline';
    }

    /**
     * Creates an array of items for a given baseName, count, and rarities.
     * - e.g., baseName='hat' -> 'Hat 1', 'Hat 2', ...
     * - `price` picks from [100, 250, 500, 750] repeating each item
     * - `img` is set to 'cap.png' for now (change if you want different images)
     */
    createItems(baseName, count, rarities) {
        return Array.from({ length: count }, (_, i) => ({
            id: `${baseName}-${i + 1}`,
            name: `${this.capitalize(baseName)} ${i + 1}`,
            price: [100, 250, 500, 750][i % 4],
            img: 'cap.png',
            rarity: rarities[i % rarities.length]
        }));
    }

    initShop() {
        const container = document.querySelector('.shop-container');
        
        Object.entries(this.items).forEach(([category, items]) => {
            const section = this.createCategorySection(category, items);
            container.appendChild(section);
        });
    }

    createCategorySection(category, items) {
        const section = document.createElement('section');
        section.className = 'category-section';
        section.innerHTML = `
            <h2 class="category-title">
                <ion-icon name="${this.getCategoryIcon(category)}"></ion-icon>
                ${this.capitalize(category)}
            </h2>
            <div class="items-grid"></div>
        `;

        const grid = section.querySelector('.items-grid');
        items.forEach(item => {
            const card = this.createItemCard(item);
            grid.appendChild(card);
        });

        return section;
    }

    createItemCard(item) {
        // Create the outer card container
        const card = document.createElement('div');
        card.className = `shop-item ${item.rarity} loading`;

        // Spinner
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        card.appendChild(spinner);

        // The item image
        const imgEl = document.createElement('img');
        // If your images are in 'images/clothes/', ensure 'cap.png' is placed there.
        imgEl.src = `images/clothes/${item.img}`;
        imgEl.classList.add('item-image');
        imgEl.alt = item.name;

        // Once it loads, remove the "loading" class (to hide the spinner)
        imgEl.addEventListener('load', () => {
            card.classList.remove('loading');
            spinner.remove(); // remove the spinner from the DOM
        });
        // If it fails, remove spinner + maybe swap to a placeholder
        imgEl.addEventListener('error', () => {
            card.classList.remove('loading');
            imgEl.src = 'images/placeholder.png';
        });

        card.appendChild(imgEl);

        // The item-details container
        const detailsEl = document.createElement('div');
        detailsEl.className = 'item-details';
        detailsEl.innerHTML = `
            <h4 class="item-name">${item.name}</h4>
            <div class="item-price">
                <ion-icon name="logo-bitcoin"></ion-icon>
                <span>${item.price.toLocaleString()}</span>
            </div>
            <button class="buy-btn" data-item="${item.id}">
                ${this.inventoryManager.isOwned(item.id) ? 'EQUIP' : 'BUY'}
            </button>
        `;
        card.appendChild(detailsEl);

        // If owned/equipped, add badges
        if (this.inventoryManager.isOwned(item.id)) {
            const ownedBadge = document.createElement('div');
            ownedBadge.className = 'owned-badge';
            ownedBadge.textContent = 'OWNED';
            card.appendChild(ownedBadge);
        }
        if (this.inventoryManager.isEquipped(item.id)) {
            const equippedBadge = document.createElement('div');
            equippedBadge.className = 'equipped-badge';
            equippedBadge.textContent = 'EQUIPPED';
            card.appendChild(equippedBadge);
        }

        // Button event
        const button = detailsEl.querySelector('.buy-btn');
        button.addEventListener('click', () => this.handleItemInteraction(item));
        
        return card;
    }

    handleItemInteraction(item) {
        if (this.inventoryManager.isOwned(item.id)) {
            this.equipItem(item);
        } else {
            this.purchaseItem(item);
        }
    }

    purchaseItem(item) {
        const currentCoins = parseInt(
            document.getElementById('coin-balance').textContent.replace(/,/g, '')
        );
        
        if (currentCoins >= item.price) {
            this.inventoryManager.addItem(item);
            document.getElementById('coin-balance').textContent = 
                (currentCoins - item.price).toLocaleString();
            
            this.refreshItemCard(item.id);
        } else {
            alert("Not enough coins!");
        }
    }

    equipItem(item) {
        this.inventoryManager.equipItem(item.id);
        this.refreshItemCard(item.id);
    }

    refreshItemCard(itemId) {
        // Look for the card with data-item="itemId"
        const card = document
            .querySelector(`[data-item="${itemId}"]`)
            ?.closest('.shop-item');
        if (card) {
            // Replace with a fresh card
            const newCard = this.createItemCard(this.getItemById(itemId));
            card.parentNode.replaceChild(newCard, card);
        }
    }

    getItemById(itemId) {
        for (const category of Object.values(this.items)) {
            const item = category.find(item => item.id === itemId);
            if (item) return item;
        }
        return null;
    }
}

// Initialize the shop
const shopItems = new ShopManager();

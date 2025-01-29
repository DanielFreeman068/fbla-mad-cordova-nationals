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
            this.inventory.equippedItems = 
                this.inventory.equippedItems.filter(id => 
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
        this.items = {
            hats: this.createItems('hat', 6, ['common', 'rare', 'epic']),
            clothing: this.createItems('shirt', 6, ['common', 'rare', 'legendary']),
            shoes: this.createItems('shoe', 6, ['common', 'epic']),
            eyewear: this.createItems('glasses', 6, ['rare', 'legendary'])
        };
        
        this.initShop();
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getCategoryIcon(category) {
        const icons = {
            hats: 'baseball-cap-outline',
            clothing: 'shirt-outline',
            shoes: 'footsteps-outline',
            eyewear: 'glasses-outline'
        };
        return icons[category] || 'cube-outline';
    }

    createItems(baseName, count, rarities) {
        return Array.from({ length: count }, (_, i) => ({
            id: `${baseName}-${i + 1}`,
            name: `${this.capitalize(baseName)} ${i + 1}`,
            price: [100, 250, 500, 750][i % 4],
            img: `${baseName}-${i + 1}.png`,
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
        const card = document.createElement('div');
        card.className = `shop-item ${item.rarity} loading`;
        card.innerHTML = `
            <div class="loading-spinner"></div>
            <img src="img/clothes/${item.img}" class="item-image" 
                 alt="${item.name}" onload="this.parentElement.classList.remove('loading')">
            <div class="item-details">
                <h4 class="item-name">${item.name}</h4>
                <div class="item-price">
                    <ion-icon name="logo-bitcoin"></ion-icon>
                    <span>${item.price.toLocaleString()}</span>
                </div>
                <button class="buy-btn" data-item="${item.id}">
                    ${this.inventoryManager.isOwned(item.id) ? 'EQUIP' : 'BUY'}
                </button>
            </div>
        `;

        if (this.inventoryManager.isOwned(item.id)) {
            card.innerHTML += '<div class="owned-badge">OWNED</div>';
        }
        if (this.inventoryManager.isEquipped(item.id)) {
            card.innerHTML += '<div class="equipped-badge">EQUIPPED</div>';
        }

        const button = card.querySelector('.buy-btn');
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
        const currentCoins = parseInt(document.getElementById('coin-balance').textContent.replace(/,/g, ''));
        
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
        const card = document.querySelector(`[data-item="${itemId}"]`)?.closest('.shop-item');
        if (card) {
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
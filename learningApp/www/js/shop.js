class ShopManager {
    constructor() {
        this.items = {
            hats: [
                { id: 'hat1', name: 'Baseball Cap', price: 200, img: 'hat1.png' },
                { id: 'hat2', name: 'Wizard Hat', price: 450, img: 'hat2.png' }
            ],
            shirts: [
                { id: 'shirt1', name: 'T-Shirt', price: 300, img: 'shirt1.png' },
                { id: 'shirt2', name: 'Hoodie', price: 600, img: 'shirt2.png' }
            ]
        };
        
        this.initShop();
    }

    initShop() {
        const grid = document.querySelector('.shop-grid');
        
        Object.entries(this.items).forEach(([category, items]) => {
            const categorySection = document.createElement('section');
            categorySection.innerHTML = `
                <h2>${category.toUpperCase()}</h2>
                <div class="category-grid" data-category="${category}"></div>
            `;
            
            items.forEach(item => {
                const itemCard = document.createElement('div');
                itemCard.className = 'shop-item';
                itemCard.innerHTML = `
                    <img src="img/clothes/${item.img}">
                    <h3>${item.name}</h3>
                    <p>${item.price} Coins</p>
                    <button class="buy-btn" data-item="${item.id}">Buy</button>
                `;
                
                itemCard.querySelector('.buy-btn').addEventListener('click', () => this.handlePurchase(item));
                categorySection.querySelector('.category-grid').appendChild(itemCard);
            });
            
            grid.appendChild(categorySection);
        });
    }

    handlePurchase(item) {
        // Mock purchase logic
        const currentCoins = parseInt(document.getElementById('coin-balance').textContent);
        if(currentCoins >= item.price) {
            document.getElementById('coin-balance').textContent = currentCoins - item.price;
            console.log(`Purchased: ${item.name}`);
            // Here you would add to inventory
        } else {
            alert("Not enough coins!");
        }
    }
}

// Initialize shop
new ShopManager();
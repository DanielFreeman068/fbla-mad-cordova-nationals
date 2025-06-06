import config from './config.js';

// A helper to extract the userId from the token
function getUserIdFromToken() {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId;
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
}

/*************************************************************
 *  InventoryManager - now uses data fetched from the DB
 *************************************************************/
class InventoryManager {
  constructor(allItems) {
    // We still store the entire items object, just in case.
    this.allItems = allItems;
    // Instead of reading from localStorage, we start with an empty list.
    this.inventory = { ownedItems: [] };
  }

  addItem(item) {
    if (!this.isOwned(item.id)) {
      this.inventory.ownedItems.push(item.id);
      // You might update the UI here, but the DB is updated in your backend.
    }
  }

  // Return true if this item is in ownedItems
  isOwned(itemId) {
    return this.inventory.ownedItems.includes(itemId);
  }

  // Return the category name (accessories, eyewear, hats, skins)
  getItemCategory(itemId) {
    for (const [catName, itemsArray] of Object.entries(this.allItems)) {
      if (itemsArray.some((it) => it.id === itemId)) {
        return catName;
      }
    }
    return null;
  }
}

/*************************************************************
 *  ShopManager
 *************************************************************/
class ShopManager {
  constructor() {
    // Create arrays for each category
    const accessories = this.createAccessoryItems();
    const eyewear = this.createEyewearItems();
    const hats = this.createHatsItems();
    const skins = this.createSkinsItems();

    // Combine them into one object
    this.items = { accessories, eyewear, hats, skins };

    // Pass them into InventoryManager (which now starts empty)
    this.inventoryManager = new InventoryManager(this.items);

    // First, fetch the owned items from the database
    this.fetchOwnedItems().then(() => {
      // Then fetch coin balance and render the shop
      this.fetchCoinBalance();
      this.initShop();
    });
  }

  // Fetch the user’s owned items from the backend and update the InventoryManager.
  async fetchOwnedItems() {
    const token = localStorage.getItem("authToken");
    const userId = getUserIdFromToken();
    try {
      const res = await fetch(`${config.IP}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch user data");
      const user = await res.json();
      // Update the inventory with the owned items from MongoDB.
      this.inventoryManager.inventory.ownedItems = user.ownedItems || [];
    } catch (error) {
      console.error("Error fetching owned items:", error);
    }
  }

  /*************************************************************
   *  Category item creation (unchanged)
   *************************************************************/
  createAccessoryItems() {
    const prices = [100, 250, 500, 750];
    const rarities = ["common", "rare", "epic", "legendary"];
    const accessoryData = [
      { id: "boomerang",      name: "Boomerang",       img: "boomerang.PNG" },
      { id: "camera",         name: "Camera",          img: "camera.PNG" },
      { id: "fishing_rod",    name: "Fishing Rod",      img: "fishing_rod.PNG" },
      { id: "lantern",        name: "Lantern",         img: "lantern.PNG" },
      { id: "lollipop",       name: "Lollipop",        img: "lollipop.PNG" },
      { id: "magic_wand",     name: "Magic Wand",       img: "magic_wand.PNG" },
      { id: "pumpkin_bucket", name: "Pumpkin Bucket",   img: "pumpkin_bucket.PNG" },
      { id: "rake",           name: "Rake",            img: "Rake.PNG" },
      { id: "shopping_bag",   name: "Shopping Bag",     img: "shopping_bag.PNG" },
      { id: "skateboard",     name: "Skateboard",       img: "skateboard.PNG" },
      { id: "snowglobe",      name: "Snowglobe",        img: "snowglobe.PNG" },
      { id: "spellbook",      name: "Spellbook",        img: "spellbook.PNG" },
      { id: "suitcase",       name: "Suitcase",         img: "suitcase.PNG" },
      { id: "sword",          name: "Sword",            img: "sword.PNG" },
      { id: "teddybear",      name: "Teddy Bear",       img: "teddybear.PNG" }
    ];
    return accessoryData.map((baseObj, i) => ({
      ...baseObj,
      price: prices[i % prices.length],
      rarity: rarities[i % prices.length],
      category: "accessories"
    }));
  }

  createEyewearItems() {
    const prices = [100, 250, 500, 750];
    const rarities = ["common", "rare", "epic", "legendary"];
    const eyewearData = [
      { id: "round_glasses",   name: "Round Glasses",   img: "round_glasses.PNG" },
      { id: "scuba_goggles",   name: "Scuba Goggles",   img: "scuba_goggles.PNG" },
      { id: "monocle",         name: "Monocle",         img: "monocle.PNG" },
      { id: "cyberpunk",       name: "Cyberpunk",       img: "cyberpunk.PNG" },
      { id: "sunglasses",      name: "Sunglasses",      img: "sunglasses.PNG" },
      { id: "superhero_mask",  name: "Superhero Mask",  img: "superhero_mask.PNG" }
    ];
    return eyewearData.map((baseObj, i) => ({
      ...baseObj,
      price: prices[i % prices.length],
      rarity: rarities[i % prices.length],
      category: "eyewear"
    }));
  }

  createHatsItems() {
    const prices = [100, 250, 500, 750];
    const rarities = ["common", "rare", "epic", "legendary"];
    const hatsData = [
      { id: "beanie",           name: "Beanie",           img: "beanie.PNG" },
      { id: "cap",              name: "Cap",              img: "cap.PNG" },
      { id: "cowboy_hat",       name: "Cowboy Hat",       img: "cowboy_hat.PNG" },
      { id: "graduation_cap",   name: "Graduation Cap",   img: "graduation_cap.PNG" },
      { id: "heart_clip",       name: "Heart Clip",       img: "heart_clip.PNG" },
      { id: "magic_hat",        name: "Magic Hat",        img: "magic_hat.PNG" },
      { id: "military_helmet",  name: "Military Helmet",  img: "military_helmet.PNG" },
      { id: "pirate_hat",       name: "Pirate Hat",       img: "pirate_hat.PNG" },
      { id: "plant_sprout",     name: "Plant Sprout",     img: "plant_sprout.PNG" },
      { id: "spartan_mask",     name: "Spartan Mask",     img: "spartan_mask.PNG" },
      { id: "sunhat",           name: "Sunhat",           img: "sunhat.PNG" },
      { id: "tophat",           name: "Tophat",           img: "tophat.PNG" }
    ];
    return hatsData.map((baseObj, i) => ({
      ...baseObj,
      price: prices[i % prices.length],
      rarity: rarities[i % prices.length],
      category: "hats"
    }));
  }

  createSkinsItems() {
    const prices = [100, 250, 500, 750];
    const rarities = ["common", "rare", "epic", "legendary"];
    const skinsData = [
      { id: "Avocado",   name: "Avocado",   img: "Avocado.PNG" },
      { id: "Clown",     name: "Clown",     img: "Clown.PNG" },
      { id: "Ghost",     name: "Ghost",     img: "Ghost.PNG" },
      { id: "IceCream",  name: "IceCream",  img: "IceCream.PNG" },
      { id: "LavaLamp",  name: "LavaLamp",  img: "LavaLamp.PNG" },
      { id: "Overalls",  name: "Overalls",  img: "Overalls.PNG" },
      { id: "Panda",     name: "Panda",     img: "Panda.PNG" },
      { id: "Potato",    name: "Potato",    img: "Potato.PNG" },
      { id: "Slime",     name: "Slime",     img: "Slime.PNG" }
    ];
    return skinsData.map((baseObj, i) => ({
      ...baseObj,
      price: prices[i % prices.length],
      rarity: rarities[i % prices.length],
      category: "skins"
    }));
  }

  /*************************************************************
   *  Rendering the Shop
   *************************************************************/
  initShop() {
    const container = document.querySelector(".shop-container");
    // Loop over each category (accessories, eyewear, hats, skins)
    Object.entries(this.items).forEach(([category, items]) => {
      const section = this.createCategorySection(category, items);
      container.appendChild(section);
    });
  }

  getCategoryIcon(category) {
    const icons = {
      accessories: "diamond-outline",
      eyewear:     "glasses-outline",
      hats:        "headset-outline",
      skins:       "person-outline",
    };
    return icons[category] || "cube-outline";
  }

  createCategorySection(category, items) {
    const section = document.createElement("section");
    section.className = "category-section";
    section.innerHTML = `
      <h2 class="category-title">
        <ion-icon name="${this.getCategoryIcon(category)}"></ion-icon>
        ${this.capitalize(category)}
      </h2>
      <div class="items-grid"></div>
    `;
    const grid = section.querySelector(".items-grid");
    items.forEach(item => {
      const card = this.createItemCard(item);
      grid.appendChild(card);
    });
    return section;
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  createItemCard(item) {
    const card = document.createElement("div");
    card.className = `shop-item ${item.rarity} loading`;

    // Spinner
    const spinner = document.createElement("div");
    spinner.className = "loading-spinner";
    card.appendChild(spinner);

    // Determine subfolder from category
    const catName = this.inventoryManager.getItemCategory(item.id);
    let folderPath = "images/clothes/";
    if (catName === "accessories") {
      folderPath += "Accessories/";
    } else if (catName === "eyewear") {
      folderPath += "Eyewear/";
    } else if (catName === "hats") {
      folderPath += "Hats/";
    } else if (catName === "skins") {
      folderPath += "Skins/";
    }

    // Set image source using a relative path (remove window.location.origin)
    const imgEl = document.createElement("img");
    imgEl.src = folderPath + item.img;
    imgEl.classList.add("item-image");
    imgEl.alt = item.name;
    imgEl.addEventListener("load", () => {
      card.classList.remove("loading");
      spinner.remove();
    });
    imgEl.addEventListener("error", () => {
      card.classList.remove("loading");
      spinner.remove();
      imgEl.src = "images/placeholder.png";
    });
    card.appendChild(imgEl);

    // Item details
    const detailsEl = document.createElement("div");
    detailsEl.className = "item-details";
    // Check if the item is owned based on the DB data fetched earlier.
    const isAlreadyOwned = this.inventoryManager.isOwned(item.id);
    detailsEl.innerHTML = `
      <h4 class="item-name">${item.name}</h4>
      <div class="item-price">
        <div class="coin-shop-icon">
            <div class="coin-inner-shop-icon">
                <span class="coin-symbol-shop-icon">$</span>
            </div>
        </div>
        <span>${item.price.toLocaleString()}</span>
      </div>
      <button class="buy-btn" data-item="${item.id}" ${isAlreadyOwned ? 'disabled' : ''}>
        ${isAlreadyOwned ? "OWNED" : "BUY"}
      </button>
    `;
    card.appendChild(detailsEl);

    // Owned badge if already purchased
    if (isAlreadyOwned) {
      const ownedBadge = document.createElement("div");
      ownedBadge.className = "owned-badge";
      ownedBadge.textContent = "OWNED";
      card.appendChild(ownedBadge);
    }

    // The buy button (only active if not owned)
    const button = detailsEl.querySelector(".buy-btn");
    button.addEventListener("click", () => this.purchaseItem(item));
    return card;
  }

  // Fetch coin balance from backend and update the counter
  async fetchCoinBalance() {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${config.IP}/shop/coins`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      });
      if (!res.ok) throw new Error("Failed to fetch coin balance");
      const data = await res.json();
      const coinEl = document.getElementById("coin-balance");
      coinEl.textContent = data.coins.toLocaleString();
    } catch (error) {
      console.error("Error fetching coin balance:", error);
    }
  }

  // Modified purchaseItem to call backend for purchasing
  async purchaseItem(item) {
    const token = localStorage.getItem("authToken");
    const coinEl = document.getElementById("coin-balance");
    try {
      const res = await fetch(`${config.IP}/shop/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          itemId: item.id,
          price: item.price,
          category: item.category
        })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Purchase failed");
        return;
      }
      // Update coin counter with backend response
      coinEl.textContent = data.coins.toLocaleString();
      // Update the local owned items based on the purchase response from the backend.
      this.inventoryManager.addItem(item);
      this.refreshItemCard(item.id);
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("An error occurred during purchase");
    }
  }

  refreshItemCard(itemId) {
    // Re-render the card so it now shows as "OWNED"
    const card = document.querySelector(`[data-item="${itemId}"]`)?.closest(".shop-item");
    if (card) {
      const newCard = this.createItemCard(this.getItemById(itemId));
      card.parentNode.replaceChild(newCard, card);
    }
  }

  getItemById(itemId) {
    for (const categoryArray of Object.values(this.items)) {
      const found = categoryArray.find(it => it.id === itemId);
      if (found) return found;
    }
    return null;
  }
}

/*************************************************************
 *  Create the shop
 *************************************************************/
const shopManager = new ShopManager();

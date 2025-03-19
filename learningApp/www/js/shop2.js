document.addEventListener("DOMContentLoaded", () => {
    // Retrieve token from localStorage (assumed stored under "authToken")
    const token = localStorage.getItem("authToken") || "";
    const coinCounterEl = document.getElementById("coin-balance");
    const shopContainer = document.querySelector(".shop-container");
  
    // Function: fetch and update coin balance from backend
    async function fetchCoinBalance() {
      try {
        const res = await fetch("/shop/coins", {
          headers: {
            "Authorization": "Bearer " + token,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch coin balance");
        const data = await res.json();
        coinCounterEl.textContent = data.coins.toLocaleString();
      } catch (error) {
        console.error("Error fetching coin balance:", error);
      }
    }
    fetchCoinBalance();
  
    // Sample shop items data
    const shopItemsData = {
      accessories: [
        { id: "boomerang", name: "Boomerang", price: 100, img: "boomerang.PNG", category: "accessories" },
        { id: "camera", name: "Camera", price: 250, img: "camera.PNG", category: "accessories" },
        { id: "fishing_rod", name: "Fishing Rod", price: 500, img: "fishing_rod.PNG", category: "accessories" },
        { id: "lantern", name: "Lantern", price: 750, img: "lantern.PNG", category: "accessories" }
        // ... add additional accessories as needed
      ],
      eyewear: [
        { id: "round_glasses", name: "Round Glasses", price: 100, img: "round_glasses.PNG", category: "eyewear" },
        { id: "scuba_goggles", name: "Scuba Goggles", price: 250, img: "scuba_goggles.PNG", category: "eyewear" },
        { id: "monocle", name: "Monocle", price: 500, img: "monocle.PNG", category: "eyewear" },
        { id: "cyberpunk", name: "Cyberpunk", price: 750, img: "cyberpunk.PNG", category: "eyewear" },
        { id: "sunglasses", name: "Sunglasses", price: 100, img: "sunglasses.PNG", category: "eyewear" },
        { id: "superhero_mask", name: "Superhero Mask", price: 250, img: "superhero_mask.PNG", category: "eyewear" }
      ],
      hats: [
        { id: "beanie", name: "Beanie", price: 100, img: "beanie.PNG", category: "hats" },
        { id: "cap", name: "Cap", price: 250, img: "cap.PNG", category: "hats" },
        { id: "cowboy_hat", name: "Cowboy Hat", price: 500, img: "cowboy_hat.PNG", category: "hats" },
        { id: "graduation_cap", name: "Graduation Cap", price: 750, img: "graduation_cap.PNG", category: "hats" },
        { id: "heart_clip", name: "Heart Clip", price: 100, img: "heart_clip.PNG", category: "hats" },
        { id: "magic_hat", name: "Magic Hat", price: 250, img: "magic_hat.PNG", category: "hats" },
        { id: "military_helmet", name: "Military Helmet", price: 500, img: "military_helmet.PNG", category: "hats" },
        { id: "pirate_hat", name: "Pirate Hat", price: 750, img: "pirate_hat.PNG", category: "hats" },
        { id: "plant_sprout", name: "Plant Sprout", price: 100, img: "plant_sprout.PNG", category: "hats" },
        { id: "spartan_mask", name: "Spartan Mask", price: 250, img: "spartan_mask.PNG", category: "hats" },
        { id: "sunhat", name: "Sunhat", price: 500, img: "sunhat.PNG", category: "hats" },
        { id: "tophat", name: "Tophat", price: 750, img: "tophat.PNG", category: "hats" }
      ],
      skins: [
        { id: "Avocado", name: "Avocado", price: 100, img: "Avocado.PNG", category: "skins" },
        { id: "Clown", name: "Clown", price: 250, img: "Clown.PNG", category: "skins" },
        { id: "Ghost", name: "Ghost", price: 500, img: "Ghost.PNG", category: "skins" },
        { id: "IceCream", name: "IceCream", price: 750, img: "IceCream.PNG", category: "skins" },
        { id: "LavaLamp", name: "LavaLamp", price: 100, img: "LavaLamp.PNG", category: "skins" },
        { id: "Overalls", name: "Overalls", price: 250, img: "Overalls.PNG", category: "skins" },
        { id: "Panda", name: "Panda", price: 500, img: "Panda.PNG", category: "skins" },
        { id: "Potato", name: "Potato", price: 750, img: "Potato.PNG", category: "skins" },
        { id: "Slime", name: "Slime", price: 100, img: "Slime.PNG", category: "skins" }
      ]
    };
  
    // Helper: Capitalize string
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
    // Helper: Category icons
    function getCategoryIcon(category) {
      const icons = {
        accessories: "diamond-outline",
        eyewear: "glasses-outline",
        hats: "headset-outline",
        skins: "person-outline",
      };
      return icons[category] || "cube-outline";
    }
  
    // Render shop items by category
    function renderShop() {
      shopContainer.innerHTML = "";
      Object.entries(shopItemsData).forEach(([category, items]) => {
        const section = document.createElement("section");
        section.className = "category-section";
        section.innerHTML = `
          <h2 class="category-title">
            <ion-icon name="${getCategoryIcon(category)}"></ion-icon>
            ${capitalize(category)}
          </h2>
          <div class="items-grid"></div>
        `;
        const grid = section.querySelector(".items-grid");
        items.forEach(item => {
          const card = createItemCard(item);
          grid.appendChild(card);
        });
        shopContainer.appendChild(section);
      });
    }
  
    // Create a shop item card
    function createItemCard(item) {
      const card = document.createElement("div");
      card.className = "shop-item";
  
      // Optional spinner while image loads
      const spinner = document.createElement("div");
      spinner.className = "loading-spinner";
      card.appendChild(spinner);
  
      // Determine folder based on category
      let folderPath = "images/clothes/";
      if (item.category === "accessories") folderPath += "Accessories/";
      else if (item.category === "eyewear") folderPath += "Eyewear/";
      else if (item.category === "hats") folderPath += "Hats/";
      else if (item.category === "skins") folderPath += "Skins/";
  
      // Create image element
      const img = document.createElement("img");
      img.src = folderPath + item.img;
      img.alt = item.name;
      card.appendChild(img);
  
      // Remove spinner when loaded
      img.addEventListener("load", () => spinner.remove());
      img.addEventListener("error", () => {
        spinner.remove();
        img.src = "images/placeholder.png";
      });
  
      // Details container
      const details = document.createElement("div");
      details.className = "item-details";
  
      // Item name
      const nameEl = document.createElement("h4");
      nameEl.className = "item-name";
      nameEl.textContent = item.name;
      details.appendChild(nameEl);
  
      // Price element with icon
      const priceEl = document.createElement("div");
      priceEl.className = "item-price";
      priceEl.innerHTML = `<ion-icon name="logo-bitcoin"></ion-icon><span>${item.price.toLocaleString()}</span>`;
      details.appendChild(priceEl);
  
      // Buy button
      const buyBtn = document.createElement("button");
      buyBtn.className = "buy-btn";
      buyBtn.textContent = "BUY";
      buyBtn.addEventListener("click", () => purchaseItem(item, buyBtn));
      details.appendChild(buyBtn);
  
      card.appendChild(details);
  
      // Check local inventory (if maintained locally) to mark as owned.
      const inventory = JSON.parse(localStorage.getItem("jolt-inventory")) || { ownedItems: [] };
      if (inventory.ownedItems.includes(item.id)) {
        buyBtn.disabled = true;
        buyBtn.textContent = "OWNED";
        const ownedBadge = document.createElement("div");
        ownedBadge.className = "owned-badge";
        ownedBadge.textContent = "OWNED";
        card.appendChild(ownedBadge);
      }
  
      return card;
    }
  
    // Purchase item function – connects to backend
    async function purchaseItem(item, button) {
      try {
        const res = await fetch("/shop/purchase", {
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
        // Update local inventory for immediate UI feedback
        const inventory = JSON.parse(localStorage.getItem("jolt-inventory")) || { ownedItems: [] };
        inventory.ownedItems.push(item.id);
        localStorage.setItem("jolt-inventory", JSON.stringify(inventory));
  
        // Update coin counter from response
        coinCounterEl.textContent = data.coins.toLocaleString();
  
        // Disable the buy button and mark as OWNED
        button.disabled = true;
        button.textContent = "OWNED";
      } catch (error) {
        console.error("Error during purchase:", error);
        alert("Error during purchase");
      }
    }
  
    // Render shop on load
    renderShop();
  });
  
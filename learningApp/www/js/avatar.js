import config from './config.js';

// Helper to decode JWT and get userId (declared only once)
function getUserIdFromToken() {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId; // Ensure this matches your backend payload key
  } catch (e) {
    console.error("Error decoding token:", e);
    return null;
  }
}

// Fetch user data from backend
async function fetchUserData() {
  const token = localStorage.getItem("authToken");
  const userId = getUserIdFromToken();
  try {
    const res = await fetch(`${config.IP}/users/${userId}`, {
      headers: { "Authorization": "Bearer " + token }
    });
    if (!res.ok) throw new Error("Failed to fetch user data");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

/*************************************************************
 *  InventoryManager - tracks locally purchased items
 *************************************************************/
class InventoryManager {
  constructor(allItems) {
    this.allItems = allItems;
    this.inventory = JSON.parse(localStorage.getItem("jolt-inventory")) || { ownedItems: [] };
  }

  addItem(item) {
    if (!this.isOwned(item.id)) {
      this.inventory.ownedItems.push(item.id);
      this.save();
    }
  }

  isOwned(itemId) {
    return this.inventory.ownedItems.includes(itemId);
  }

  save() {
    localStorage.setItem("jolt-inventory", JSON.stringify(this.inventory));
  }
}

/*************************************************************
 *  AvatarManager
 *  - Populates the avatar selector with only items the user owns
 *  - Handles custom CSS class assignment for eyewear and hats
 *************************************************************/
class AvatarManager {
  constructor(userData) {
    // Define clothing data within the class (ensure IDs are in lowercase)
    const colors = [
      { id: "blue", name: "Blue", img: "blue.png" },
      { id: "brown", name: "Brown", img: "brown.png" },
      { id: "gray", name: "Gray", img: "gray.png" },
      { id: "green", name: "Green", img: "green.png" },
      { id: "orange", name: "Orange", img: "orange.png" },
      { id: "peach", name: "Peach", img: "peach.png" },
      { id: "purple", name: "Purple", img: "purple.png" },
      { id: "red", name: "Red", img: "red.png" },
      { id: "white", name: "White", img: "white.png" },
      { id: "yellow", name: "Yellow", img: "yellow.png" }
    ];

    const skins = [
      { id: "avocado", name: "Avocado", img: "avocado.png" },
      { id: "clown", name: "Clown", img: "clown.png" },
      { id: "ghost", name: "Ghost", img: "ghost.png" },
      { id: "icecream", name: "Ice Cream", img: "icecream.png" },
      { id: "lavalamp", name: "Lava Lamp", img: "lavalamp.png" },
      { id: "overalls", name: "Overalls", img: "overalls.png" },
      { id: "panda", name: "Panda", img: "panda.png" },
      { id: "potato", name: "Potato", img: "potato.png" },
      { id: "slime", name: "Slime", img: "slime.png" }
    ];

    const accessories = [
      { id: "boomerang", name: "Boomerang", img: "boomerang.png" },
      { id: "camera", name: "Camera", img: "camera.png" },
      { id: "fishing_rod", name: "Fishing Rod", img: "fishing_rod.png" },
      { id: "lantern", name: "Lantern", img: "lantern.png" },
      { id: "lollipop", name: "Lollipop", img: "lollipop.png" },
      { id: "magic_wand", name: "Magic Wand", img: "magic_wand.png" },
      { id: "pumpkin_bucket", name: "Pumpkin Bucket", img: "pumpkin_bucket.png" },
      { id: "rake", name: "Rake", img: "rake.png" },
      { id: "shopping_bag", name: "Shopping Bag", img: "shopping_bag.png" },
      { id: "skateboard", name: "Skateboard", img: "skateboard.png" },
      { id: "snowglobe", name: "Snowglobe", img: "snowglobe.png" },
      { id: "spellbook", name: "Spellbook", img: "spellbook.png" },
      { id: "suitcase", name: "Suitcase", img: "suitcase.png" },
      { id: "sword", name: "Sword", img: "sword.png" },
      { id: "teddybear", name: "Teddy Bear", img: "teddybear.png" }
    ];

    const eyewear = [
      { id: "round_glasses", name: "Round Glasses", img: "round_glasses.png" },
      { id: "scuba_goggles", name: "Scuba Goggles", img: "scuba_goggles.png" },
      { id: "monocle", name: "Monocle", img: "monocle.png" },
      { id: "cyberpunk", name: "Cyberpunk", img: "cyberpunk.png" },
      { id: "sunglasses", name: "Sunglasses", img: "sunglasses.png" },
      { id: "superhero_mask", name: "Superhero Mask", img: "superhero_mask.png" }
    ];

    const hats = [
      { id: "beanie", name: "Beanie", img: "beanie.png" },
      { id: "cap", name: "Cap", img: "cap.png" },
      { id: "cowboy_hat", name: "Cowboy Hat", img: "cowboy_hat.png" },
      { id: "graduation_cap", name: "Graduation Cap", img: "graduation_cap.png" },
      { id: "heart_clip", name: "Heart Clip", img: "heart_clip.png" },
      { id: "magic_hat", name: "Magic Hat", img: "magic_hat.png" },
      { id: "military_helmet", name: "Military Helmet", img: "military_helmet.png" },
      { id: "pirate_hat", name: "Pirate Hat", img: "pirate_hat.png" },
      { id: "plant_sprout", name: "Plant Sprout", img: "plant_sprout.png" },
      { id: "spartan_mask", name: "Spartan Mask", img: "spartan_mask.png" },
      { id: "sunhat", name: "Sunhat", img: "sunhat.png" },
      { id: "tophat", name: "Tophat", img: "tophat.png" }
    ];

    // Save complete set of items as a property
    this.items = { colors, skins, accessories, eyewear, hats };

    // For non-colors, filter items based on ownedItems (case-insensitive)
    const normalize = str => str.toLowerCase();
    this.filteredItems = {
      colors: colors, // colors always available
      skins: skins.filter(item =>
        userData.ownedItems.some(owned => normalize(owned) === normalize(item.id))
      ),
      accessories: accessories.filter(item =>
        userData.ownedItems.some(owned => normalize(owned) === normalize(item.id))
      ),
      eyewear: eyewear.filter(item =>
        userData.ownedItems.some(owned => normalize(owned) === normalize(item.id))
      ),
      hats: hats.filter(item =>
        userData.ownedItems.some(owned => normalize(owned) === normalize(item.id))
      )
    };

    // Map tab names to keys in the avatar state
    this.categoryToKey = {
      colors: "color",
      skins: "skin",
      accessories: "accessory",
      eyewear: "eyewear",
      hats: "hat"
    };

    // Set initial avatar state from the saved avatar (if any) from the backend.
    // If no saved avatar, default to an empty configuration.
    this.avatarState = userData.avatar && typeof userData.avatar === "object"
      ? { ...userData.avatar }
      : { color: "", skin: "", accessory: "", eyewear: "", hat: "" };

    // Cache layer elements
    this.colorLayerEl = document.getElementById("color-layer");
    this.skinLayerEl = document.getElementById("skin-layer");
    this.accessoryLayerEl = document.getElementById("accessory-layer");
    this.eyewearLayerEl = document.getElementById("eyewear-layer");
    this.hatLayerEl = document.getElementById("hat-layer");

    // Render the initial preview
    this.updateAvatarPreview();
    // Initialize tab functionality and item grid
    this.initTabs();
  }

  updateAvatarPreview() {
    this.colorLayerEl.style.display = this.avatarState.color ? "block" : "none";
    if (this.avatarState.color) {
      this.colorLayerEl.src = "images/clothes/Colors/" + this.avatarState.color;
    }
    this.skinLayerEl.style.display = this.avatarState.skin ? "block" : "none";
    if (this.avatarState.skin) {
      this.skinLayerEl.src = "images/clothes/Skins/" + this.avatarState.skin;
    }
    this.accessoryLayerEl.style.display = this.avatarState.accessory ? "block" : "none";
    if (this.avatarState.accessory) {
      this.accessoryLayerEl.src = "images/clothes/Accessories/" + this.avatarState.accessory;
    }
    // For eyewear, update image and CSS classes
    this.eyewearLayerEl.style.display = this.avatarState.eyewear ? "block" : "none";
    if (this.avatarState.eyewear) {
      this.eyewearLayerEl.src = "images/clothes/Eyewear/" + this.avatarState.eyewear;
      this.eyewearLayerEl.classList.remove("eyewear-cyberpunk", "eyewear-round", "eyewear-scuba", "eyewear-monocle");
      if (this.avatarState.eyewear.toLowerCase() === "cyberpunk.png" ||
          this.avatarState.eyewear.toLowerCase() === "superhero_mask.png") {
        this.eyewearLayerEl.classList.add("eyewear-cyberpunk");
      } else if (this.avatarState.eyewear.toLowerCase() === "round_glasses.png" ||
                 this.avatarState.eyewear.toLowerCase() === "sunglasses.png") {
        this.eyewearLayerEl.classList.add("eyewear-round");
      } else if (this.avatarState.eyewear.toLowerCase() === "scuba_goggles.png") {
        this.eyewearLayerEl.classList.add("eyewear-scuba");
      } else if (this.avatarState.eyewear.toLowerCase() === "monocle.png") {
        this.eyewearLayerEl.classList.add("eyewear-monocle");
      }
    }
    // For hats, update image and custom classes
    this.hatLayerEl.style.display = this.avatarState.hat ? "block" : "none";
    if (this.avatarState.hat) {
      this.hatLayerEl.src = "images/clothes/Hats/" + this.avatarState.hat;
      this.hatLayerEl.classList.remove(
        "hat-beanie", "hat-cap", "hat-cowboy_hat", "hat-graduation_cap",
        "hat-heart_clip", "hat-magic_hat", "hat-military_helmet",
        "hat-pirate_hat", "hat-plant_sprout", "hat-spartan_mask",
        "hat-sunhat", "hat-tophat"
      );
      switch (this.avatarState.hat.replace(".png", "").toLowerCase()) {
        case "beanie":
          this.hatLayerEl.classList.add("hat-beanie");
          break;
        case "cap":
          this.hatLayerEl.classList.add("hat-cap");
          break;
        case "cowboy_hat":
          this.hatLayerEl.classList.add("hat-cowboy_hat");
          break;
        case "graduation_cap":
          this.hatLayerEl.classList.add("hat-graduation_cap");
          break;
        case "heart_clip":
          this.hatLayerEl.classList.add("hat-heart_clip");
          break;
        case "magic_hat":
          this.hatLayerEl.classList.add("hat-magic_hat");
          break;
        case "military_helmet":
          this.hatLayerEl.classList.add("hat-military_helmet");
          break;
        case "pirate_hat":
          this.hatLayerEl.classList.add("hat-pirate_hat");
          break;
        case "plant_sprout":
          this.hatLayerEl.classList.add("hat-plant_sprout");
          break;
        case "spartan_mask":
          this.hatLayerEl.classList.add("hat-spartan_mask");
          break;
        case "sunhat":
          this.hatLayerEl.classList.add("hat-sunhat");
          break;
        case "tophat":
          this.hatLayerEl.classList.add("hat-tophat");
          break;
      }
    }
  }

  initTabs() {
    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.populateItems(btn.getAttribute("data-category"));
      });
    });
    // Initially populate with colors
    this.populateItems("colors");
  }

  populateItems(category) {
    const grid = document.querySelector(".items-grid");
    grid.innerHTML = "";
    // Use full list for colors; for others, use filtered list based on owned items
    const categoryItems = category === "colors" ? this.items.colors : this.filteredItems[category];
    if (categoryItems.length === 0) {
      grid.innerHTML = `<p>No items available in this category</p>`;
      return;
    }
    categoryItems.forEach(item => {
      const card = document.createElement("div");
      card.className = "item-card";

      let folderPath = "images/clothes/";
      if (category === "colors") folderPath += "Colors/";
      else if (category === "skins") folderPath += "Skins/";
      else if (category === "accessories") folderPath += "Accessories/";
      else if (category === "eyewear") folderPath += "Eyewear/";
      else if (category === "hats") folderPath += "Hats/";

      const img = document.createElement("img");
      img.src = folderPath + item.img;
      img.alt = item.name;
      card.appendChild(img);

      const label = document.createElement("div");
      label.textContent = item.name;
      label.style.fontSize = "0.6rem";
      label.style.marginTop = "2px";
      card.appendChild(label);

      card.addEventListener("click", () => {
        this.avatarState[this.categoryToKey[category]] = item.img;
        this.updateAvatarPreview();
      });

      grid.appendChild(card);
    });
  }

  // Save Avatar modal functionality
  initSaveAvatarModal() {
    const saveBtn = document.getElementById("save-avatar-btn");
    const modal = document.getElementById("save-avatar-modal");
    const cancelBtn = document.getElementById("cancel-save-avatar");
    const confirmBtn = document.getElementById("confirm-save-avatar");

    saveBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    cancelBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    confirmBtn.addEventListener("click", () => {
      this.saveAvatar();
      modal.style.display = "none";
    });
  }

  async saveAvatar() {
    const token = localStorage.getItem("authToken");
    const userId = getUserIdFromToken();
    try {
      const res = await fetch(`${config.IP}/users/${userId}/avatar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ avatar: this.avatarState })
      });
      if (!res.ok) {
        alert("Failed to save avatar");
        return;
      }
      const data = await res.json();
      alert("Avatar saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving avatar");
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("authToken");
  const userId = getUserIdFromToken();
  let currentUser = null;
  try {
    const res = await fetch(`${config.IP}/users/${userId}`, {
      headers: { "Authorization": "Bearer " + token }
    });
    if (!res.ok) throw new Error("Failed to fetch user data");
    currentUser = await res.json();
  } catch (error) {
    console.error("Error fetching user data for avatar:", error);
  }

  // Initialize the avatar manager with the user data
  const avatarManager = new AvatarManager(currentUser);
  // Initialize the Save Avatar modal functionality
  avatarManager.initSaveAvatarModal();
});

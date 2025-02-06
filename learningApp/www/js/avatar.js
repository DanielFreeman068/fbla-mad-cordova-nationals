// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // --- Define the Items for Each Category ---
  
    // Colors available (from clothes/Colors/)
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
  
    // Skins available (from clothes/Skins/)
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
  
    // Accessories available (from clothes/Accessories/)
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
  
    // Eyewear available (from clothes/Eyewear/)
    const eyewear = [
      { id: "round_glasses", name: "Round Glasses", img: "round_glasses.png" },
      { id: "scuba_goggles", name: "Scuba Goggles", img: "scuba_goggles.png" },
      { id: "monocle", name: "Monocle", img: "monocle.png" },
      { id: "cyberpunk", name: "Cyberpunk", img: "cyberpunk.png" },
      { id: "sunglasses", name: "Sunglasses", img: "sunglasses.png" },
      { id: "superhero_mask", name: "Superhero Mask", img: "superhero_mask.png" }
    ];
  
    // Hats available (from clothes/Hats/)
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
  
    // Combine all categories in one object
    const items = {
      colors,
      skins,
      accessories,
      eyewear,
      hats
    };
  
    // Map tab category names to avatar state keys
    const categoryToKey = {
      colors: "color",
      skins: "skin",
      accessories: "accessory",
      eyewear: "eyewear",
      hats: "hat"
    };
  
    // The avatar state holds the currently equipped image filenames.
    // Since default.png was removed, all selections start as empty.
    const avatarState = {
      color: "",
      skin: "",
      accessory: "",
      eyewear: "",
      hat: ""
    };
  
    // --- References to Preview Layer Elements ---
    const colorLayerEl = document.getElementById("color-layer");
    const skinLayerEl = document.getElementById("skin-layer");
    const accessoryLayerEl = document.getElementById("accessory-layer");
    const eyewearLayerEl = document.getElementById("eyewear-layer");
    const hatLayerEl = document.getElementById("hat-layer");
  
    // Function to update the avatar preview based on avatarState.
    // If a layer’s state is empty, its element is hidden.
    function updateAvatarPreview() {
      if (avatarState.color) {
        colorLayerEl.src = "images/clothes/Colors/" + avatarState.color;
        colorLayerEl.style.display = "block";
      } else {
        colorLayerEl.style.display = "none";
      }
      if (avatarState.skin) {
        skinLayerEl.src = "images/clothes/Skins/" + avatarState.skin;
        skinLayerEl.style.display = "block";
      } else {
        skinLayerEl.style.display = "none";
      }
      if (avatarState.accessory) {
        accessoryLayerEl.src = "images/clothes/Accessories/" + avatarState.accessory;
        accessoryLayerEl.style.display = "block";
      } else {
        accessoryLayerEl.style.display = "none";
      }
      if (avatarState.eyewear) {
        eyewearLayerEl.src = "images/clothes/Eyewear/" + avatarState.eyewear;
        eyewearLayerEl.style.display = "block";
      } else {
        eyewearLayerEl.style.display = "none";
      }
      if (avatarState.hat) {
        hatLayerEl.src = "images/clothes/Hats/" + avatarState.hat;
        hatLayerEl.style.display = "block";
      } else {
        hatLayerEl.style.display = "none";
      }
    }
    updateAvatarPreview();
  
    // --- Tab Functionality ---
    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove the "active" class from all tabs and add it to the clicked tab
        tabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        populateItems(btn.getAttribute("data-category"));
      });
    });
  
    // Populate the items grid for the chosen category
    function populateItems(category) {
      const grid = document.querySelector(".items-grid");
      grid.innerHTML = ""; // Clear previous items
      const categoryItems = items[category];
      categoryItems.forEach((item) => {
        const card = document.createElement("div");
        card.className = "item-card";
  
        // Determine folder path based on category
        let folderPath = "images/clothes/";
        if (category === "colors") {
          folderPath += "Colors/";
        } else if (category === "skins") {
          folderPath += "Skins/";
        } else if (category === "accessories") {
          folderPath += "Accessories/";
        } else if (category === "eyewear") {
          folderPath += "Eyewear/";
        } else if (category === "hats") {
          folderPath += "Hats/";
        }
  
        // Create image element for the item
        const img = document.createElement("img");
        img.src = folderPath + item.img;
        img.alt = item.name;
        card.appendChild(img);
  
        // Optional: add a small label
        const label = document.createElement("div");
        label.textContent = item.name;
        label.style.fontSize = "0.6rem";
        label.style.marginTop = "2px";
        card.appendChild(label);
  
        // When the card is clicked, update the corresponding layer
        card.addEventListener("click", () => {
          avatarState[categoryToKey[category]] = item.img;
          updateAvatarPreview();
        });
  
        grid.appendChild(card);
      });
    }
  
    // Initialize the grid with the "colors" category (the default active tab)
    populateItems("colors");
  
    // --- Clear Selection Button Functionality ---
    const clearBtn = document.getElementById("clear-selection");
    clearBtn.addEventListener("click", () => {
      // Determine the active tab's category and clear its selection.
      const activeTab = document.querySelector(".tab-button.active");
      const category = activeTab.getAttribute("data-category");
      avatarState[categoryToKey[category]] = "";
      updateAvatarPreview();
    });
  });
  
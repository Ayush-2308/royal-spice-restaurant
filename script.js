const whatsappNumber = "918273126155";

const menuItems = [
  {
    name: "Dum Pukht Nalli Biryani",
    desc: "Slow-cooked lamb shank, saffron basmati, bone marrow jus, burani raita.",
    price: "₹1,295",
    category: "signature",
    image: "https://images.pexels.com/photos/32825912/pexels-photo-32825912.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    name: "Royal Awadhi Chicken Biryani",
    desc: "Free-range chicken, fried onion, mint, salan, cucumber raita.",
    price: "₹945",
    category: "signature",
    image: "https://images.pexels.com/photos/5410410/pexels-photo-5410410.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    name: "Paneer Lababdar Truffle Kulcha",
    desc: "Charred cottage cheese, tomato-cashew gravy, black truffle kulcha.",
    price: "₹725",
    category: "vegetarian",
    image: "https://images.pexels.com/photos/9797029/pexels-photo-9797029.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    name: "Subz Galouti Kebab",
    desc: "Lotus stem, jackfruit, smoked clove, saffron sheermal.",
    price: "₹675",
    category: "vegetarian",
    image: "https://images.pexels.com/photos/29850004/pexels-photo-29850004.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    name: "Tandoori Raan Platter",
    desc: "Whole baby lamb leg, royal marinade, pickled onion, mint chutney.",
    price: "₹2,850",
    category: "grill",
    image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    name: "Malai Broccoli & Morel",
    desc: "Creamy tandoor broccoli, Kashmiri morels, toasted almond dust.",
    price: "₹795",
    category: "grill",
    image: "https://images.pexels.com/photos/5410414/pexels-photo-5410414.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    name: "Coastal Pepper Prawn Curry",
    desc: "Fresh prawns, roasted coconut, curry leaves, appam crisps.",
    price: "₹1,150",
    category: "signature",
    image: "https://images.pexels.com/photos/12392831/pexels-photo-12392831.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    name: "Saffron Shahi Tukda",
    desc: "Rabri, pistachio praline, rose petal preserve, edible gold leaf.",
    price: "₹425",
    category: "dessert",
    image: "https://images.pexels.com/photos/14705146/pexels-photo-14705146.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    name: "Filter Coffee Rasmalai",
    desc: "Soft chenna dumplings, coffee milk, cocoa nib chikki.",
    price: "₹475",
    category: "dessert",
    image: "https://images.pexels.com/photos/5945656/pexels-photo-5945656.jpeg?auto=compress&cs=tinysrgb&w=500"
  }
];

const menuGrid = document.querySelector("#menuGrid");
const tabs = document.querySelectorAll(".tab");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const reservationForm = document.querySelector("#reservationForm");

function createWhatsAppUrl(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function renderMenu(filter = "all") {
  const items = filter === "all" ? menuItems : menuItems.filter((item) => item.category === filter);
  menuGrid.innerHTML = items.map((item) => {
    const message = `Hi Royal Spice, I would like to order ${item.name} (${item.price}). Please confirm availability and delivery time.`;
    return `
      <article class="menu-item" data-category="${item.category}">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <div>
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <div class="price-row">
            <strong>${item.price}</strong>
            <a href="${createWhatsAppUrl(message)}" target="_blank" rel="noopener">Order</a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderMenu(tab.dataset.filter);
  });
});

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(reservationForm);
  const message = [
    "Hi Royal Spice, I would like to reserve a table.",
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Date: ${data.get("date")}`,
    `Time: ${data.get("time")}`,
    `Guests: ${data.get("guests")}`,
    `Occasion: ${data.get("occasion")}`,
    `Notes: ${data.get("notes") || "None"}`
  ].join("\n");
  window.open(createWhatsAppUrl(message), "_blank", "noopener");
});

renderMenu();

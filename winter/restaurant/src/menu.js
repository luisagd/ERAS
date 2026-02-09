function createItem(name, price, desc) {
  const item = document.createElement("div");
  item.classList.add("menu-item");

  const header = document.createElement("div");
  header.classList.add("menu-item-header");

  const itemName = document.createElement("span");
  itemName.textContent = name;

  const itemPrice = document.createElement("span");
  itemPrice.textContent = price;

  header.appendChild(itemName);
  header.appendChild(itemPrice);

  const itemDesc = document.createElement("p");
  itemDesc.textContent = desc;

  item.appendChild(header);
  item.appendChild(itemDesc);

  return item;
}

export default function loadMenu() {
  const content = document.getElementById("content");

  const title = document.createElement("h1");
  title.textContent = "Menu";

  const section = document.createElement("div");
  section.classList.add("menu");

  section.appendChild(
    createItem("Smashed Burger", "$14", "Double patty, cheddar, pickles, special sauce.")
  );
  section.appendChild(
    createItem("Grilled Salmon", "$22", "Pan-seared Atlantic salmon, lemon butter, asparagus.")
  );
  section.appendChild(
    createItem("Mushroom Risotto", "$16", "Arborio rice, wild mushrooms, parmesan, truffle oil.")
  );
  section.appendChild(
    createItem("Caesar Salad", "$11", "Romaine, croutons, parmesan, house-made dressing.")
  );
  section.appendChild(
    createItem("Tiramisu", "$9", "Espresso-soaked ladyfingers, mascarpone, cocoa.")
  );

  content.appendChild(title);
  content.appendChild(section);
}

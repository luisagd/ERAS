export default function loadContact() {
  const content = document.getElementById("content");

  const title = document.createElement("h1");
  title.textContent = "Contact Us";

  const address = document.createElement("p");
  address.textContent = "742 Evergreen Terrace, Springfield";

  const phone = document.createElement("p");
  phone.textContent = "Phone: (555) 123-4567";

  const email = document.createElement("p");
  email.textContent = "Email: hello@thehungryfork.com";

  const hoursTitle = document.createElement("h2");
  hoursTitle.textContent = "Hours";

  const hours = document.createElement("p");
  hours.textContent = "Monday - Sunday: 11 AM - 10 PM";

  const wrapper = document.createElement("div");
  wrapper.classList.add("contact");
  wrapper.appendChild(title);
  wrapper.appendChild(address);
  wrapper.appendChild(phone);
  wrapper.appendChild(email);
  wrapper.appendChild(hoursTitle);
  wrapper.appendChild(hours);

  content.appendChild(wrapper);
}

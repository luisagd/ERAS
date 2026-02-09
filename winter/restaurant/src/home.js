export default function loadHome() {
  const content = document.getElementById("content");

  const headline = document.createElement("h1");
  headline.textContent = "The Hungry Fork";

  const subtitle = document.createElement("h2");
  subtitle.textContent = "Fine dining, zero pretension.";

  const description = document.createElement("p");
  description.textContent =
    "Nestled in the heart of downtown, The Hungry Fork has been serving " +
    "honest, scratch-made food since 2003. Our chefs use locally sourced " +
    "ingredients to bring you dishes that feel like home — but better. " +
    "Whether you are here for a weeknight dinner or a weekend celebration, " +
    "we have got a table waiting for you.";

  const hours = document.createElement("p");
  hours.classList.add("hours");
  hours.textContent = "Open daily — 11 AM to 10 PM";

  const wrapper = document.createElement("div");
  wrapper.classList.add("home");
  wrapper.appendChild(headline);
  wrapper.appendChild(subtitle);
  wrapper.appendChild(description);
  wrapper.appendChild(hours);

  content.appendChild(wrapper);
}

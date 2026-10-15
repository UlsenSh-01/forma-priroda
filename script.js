const filters = document.querySelectorAll("[data-filter]");
const products = document.querySelectorAll("[data-category]");
const emptyMessage = document.querySelector("#catalog-empty");
const catalogNote = document.querySelector("#catalog-note");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.dataset.filter;
    let visibleCount = 0;

    filters.forEach((button) => {
      const active = button === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    products.forEach((product) => {
      const visible = category === "all" || product.dataset.category === category;
      product.hidden = !visible;
      if (visible) visibleCount++;
    });

    emptyMessage.hidden = visibleCount !== 0;
    catalogNote.hidden = visibleCount === 0;
  });
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
const closeButton = lightbox.querySelector(".lightbox-close");
let previousFocus;

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    previousFocus = button;
    lightboxImage.src = button.dataset.src;
    lightboxImage.alt = button.querySelector("img").alt;
    lightboxCaption.textContent = button.dataset.caption;
    lightbox.showModal();
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  });
});

function closeLightbox() {
  lightbox.close();
}

closeButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox.addEventListener("close", () => {
  document.body.classList.remove("lightbox-open");
  lightboxImage.removeAttribute("src");
  previousFocus?.focus();
});
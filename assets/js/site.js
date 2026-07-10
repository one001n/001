if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function startAtTop() {
  if (!location.hash) {
    window.scrollTo(0, 0);
  }
}

startAtTop();
window.addEventListener("DOMContentLoaded", startAtTop);
window.addEventListener("load", startAtTop);
window.addEventListener("pageshow", startAtTop);
setTimeout(startAtTop, 100);
setTimeout(startAtTop, 500);

function setupComparisonGallery(panel) {
  const mainImage = panel.querySelector(".comparison-main img");
  const caption = panel.querySelector(".comparison-main figcaption");
  const thumbs = [...panel.querySelectorAll(".comparison-thumbs img")];
  let rotationId;

  if (!mainImage || thumbs.length < 2) {
    return;
  }

  let activeIndex = thumbs.findIndex((thumb) => thumb.getAttribute("src") === mainImage.getAttribute("src"));
  if (activeIndex < 0) {
    activeIndex = 0;
  }

  function showImage(index) {
    activeIndex = index;
    const selected = thumbs[activeIndex];
    mainImage.src = selected.src;
    mainImage.alt = selected.alt;

    if (caption) {
      caption.textContent = selected.alt.toLowerCase().startsWith("depois:") ? "Depois" : "";
    }

    thumbs.forEach((thumb, thumbIndex) => {
      thumb.classList.toggle("is-active", thumbIndex === activeIndex);
      thumb.setAttribute("aria-selected", thumbIndex === activeIndex ? "true" : "false");
    });
  }

  function startRotation() {
    clearInterval(rotationId);
    rotationId = setInterval(() => {
      showImage((activeIndex + 1) % thumbs.length);
    }, 3500);
  }

  thumbs.forEach((thumb, index) => {
    thumb.setAttribute("role", "button");
    thumb.setAttribute("aria-label", `Ver imagem ${index + 1} da galeria ${panel.dataset.gallery || ""}`.trim());

    thumb.addEventListener("click", () => {
      showImage(index);
      startRotation();
    });

    thumb.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showImage(index);
        startRotation();
      }
    });
  });

  showImage(activeIndex);
  startRotation();
}

document.querySelectorAll(".comparison-panel").forEach(setupComparisonGallery);

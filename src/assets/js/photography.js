import {loadPhotosWithExif} from "./photos.js";
import illustrations from "./illustrations.js";

const onImageClick = (image) => {
  const modal = document.querySelector("#photo-modal");
  if (!modal) {
    return;
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modal.innerHTML = "";
    }
  })

  const modalImage = document.createElement("img");
  modalImage.src = image.fullPath;
  modalImage.alt = image.alt;

  const modalDescription = document.createElement("p");
  modalDescription.textContent = image.description;

  const closeButton = document.createElement("span");
  closeButton.innerHTML = "&times;";
  closeButton.classList.add("close-button");
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
    modal.innerHTML = "";
  });

  modal.appendChild(modalImage);
  modal.appendChild(modalDescription);
  modal.appendChild(closeButton);

  modal.style.display = "flex";
}

function createImageGallery(element, images) {
  if (!element) {
    return;
  }

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const imageElement = document.createElement("img");
    imageElement.src = image.thumbnail;
    imageElement.alt = image.alt;
    imageElement.addEventListener("click", () => onImageClick(image));

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = image.description;

    const linkElement = document.createElement("li");
    linkElement.appendChild(imageElement);
    linkElement.appendChild(descriptionElement);

    element.appendChild(linkElement);
  }
}

createImageGallery(document.querySelector("#photography-gallery"), await loadPhotosWithExif());

createImageGallery(document.querySelector("#illustrations-gallery"), illustrations)

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
    const linkElement = document.createElement("li");

    if (image.exif && image.exif.Model) {
      const modelInfo = document.createElement("div");
      modelInfo.classList.add("camera-info");

      const cameraIcon = document.createElement("img");
      cameraIcon.src = "/assets/icons/camera.svg";
      cameraIcon.alt = "Camera Icon";
      modelInfo.appendChild(cameraIcon);

      const makeElement = document.createElement("p");
      makeElement.classList.add("camera-model");
      let text = image.exif.Model;
      if (image.exif.Make && !text.toLowerCase().startsWith(image.exif.Make.toLowerCase())) {
        text = `${image.exif.Make} ${text}`;
      }
      makeElement.textContent = text;
      modelInfo.appendChild(makeElement);

      linkElement.appendChild(modelInfo);

      const lensInfo = document.createElement("div");
      lensInfo.classList.add("camera-info");

      const lensIcon = document.createElement("img");
      lensIcon.src = "/assets/icons/lens.svg";
      lensIcon.alt = "Lens Icon";
      lensInfo.appendChild(lensIcon);

      const lensElement = document.createElement("p");
      lensElement.classList.add("camera-model");
      let lensContent = image.exif.LensModel || "Unknown Lens";
      lensContent = lensContent.replace(image.exif.Model, "").trim();
      lensElement.textContent = lensContent;
      lensInfo.appendChild(lensElement);

      linkElement.appendChild(lensInfo);
    }

    const imageElement = document.createElement("img");
    imageElement.src = image.thumbnail;
    imageElement.alt = image.alt;
    imageElement.classList.add("gallery-image");
    imageElement.addEventListener("click", () => onImageClick(image));
    linkElement.appendChild(imageElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("description");
    descriptionElement.textContent = image.description;
    linkElement.appendChild(descriptionElement);


    element.appendChild(linkElement);
  }
}

createImageGallery(document.querySelector("#photography-gallery"), await loadPhotosWithExif());

createImageGallery(document.querySelector("#illustrations-gallery"), illustrations)

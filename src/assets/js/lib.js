const imagesPath = "/assets/images/portfolio";

export function constructFullPath(image) {
  return {
    ...image,
    fullPath: `${imagesPath}/${image.name}.${image.extension}`,
    thumbnail: `${imagesPath}/${image.name}-thumb.${image.extension}`,
  }
}

export function createImageGallery(element, images) {
  if (!element) {
    return;
  }

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const linkElement = document.createElement("li");

    createExifInfo(linkElement, image.exif);

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


function createExifInfo(parent, exif) {
  if (!exif) {
    return;
  }

  if (exif.Model) {
    let modelText = exif.Model;
    if (exif.Make && !modelText.toLowerCase().startsWith(exif.Make.toLowerCase())) {
      modelText = `${exif.Make} ${modelText}`;
    }
    createCameraInfo(parent, {src: "/assets/icons/camera.svg", alt: "Camera Icon"}, modelText);
  }

  if (exif.LensModel) {
    let lensText = exif.LensModel || "Unknown Lens";
    lensText = lensText.replace(exif.Model, "").trim();
    createCameraInfo(parent, {src: "/assets/icons/lens.svg", alt: "Lens Icon"}, lensText);
  }
}

function createCameraInfo(parent, icon, text) {
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("camera-info");

  const iconElement = document.createElement("img");
  iconElement.src = icon.src;
  iconElement.alt = icon.alt;
  infoContainer.appendChild(iconElement);

  const textElement = document.createElement("p");
  textElement.classList.add("camera-model");
  textElement.textContent = text;
  infoContainer.appendChild(textElement);

  parent.appendChild(infoContainer);
}

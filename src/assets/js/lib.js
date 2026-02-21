const imagesPath = "/assets/images/portfolio";

export function constructFullPath(image) {
  return {
    ...image,
    path: `${imagesPath}/${image.name}.${image.extension}`,
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
    imageElement.src = image.path;
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

  const content = document.createElement("div");
  content.id = "modal-content";


  const modalImage = document.createElement("img");
  modalImage.src = image.path;
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

  content.appendChild(modalImage);
  content.appendChild(modalDescription);
  modal.appendChild(content);
  modal.appendChild(closeButton);

  modal.style.display = "flex";
}


function createExifInfo(parent, exif) {
  if (!exif) {
    return;
  }

  if (exif.make) {
    let modelText = exif.model;
    if (exif.make && !modelText.toLowerCase().startsWith(exif.make.toLowerCase())) {
      modelText = `${exif.make} ${modelText}`;
    }
    createCameraInfo(parent, {src: "/assets/icons/camera.svg", alt: "Camera Icon"}, modelText);
  }

  if (exif.lensModel) {
    let lensText = exif.lensModel || "Unknown Lens";
    lensText = lensText.replace(exif.model, "").trim();
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

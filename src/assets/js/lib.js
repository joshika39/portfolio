const imagesPath = "/assets/images/portfolio";

export function constructFullPath(image) {
  return {
    ...image,
    path: `${imagesPath}/${image.name}.${image.extension}`,
  }
}

function groupByCategory(images) {
  return images.reduce((acc, image) => {
    const category = image.category || "Other";

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(image);
    return acc;
  }, {});
}

export function createImageGallery(element, images) {
  if (!element) return;

  const grouped = groupByCategory(images);

  Object.entries(grouped).forEach(([category, images]) => {
    const section = document.createElement("div");
    section.classList.add("gallery-section");

    const title = document.createElement("h3");
    title.textContent = category;

    const list = document.createElement("ul");
    list.classList.add("gallery-section-content");
    images.forEach((image) => {
      const item = document.createElement("li");

      createExifInfo(item, image.exif);

      const img = document.createElement("img");
      img.src = image.path;
      img.alt = image.alt;
      img.classList.add("gallery-image");
      img.addEventListener("click", () => onImageClick(image));

      const desc = document.createElement("p");
      desc.classList.add("description");
      desc.textContent = image.description;

      item.appendChild(img);
      item.appendChild(desc);
      list.appendChild(item);
    });

    section.appendChild(title);
    section.appendChild(list);
    element.appendChild(section);
  });
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
  textElement.textContent = text;
  infoContainer.appendChild(textElement);

  parent.appendChild(infoContainer);
}

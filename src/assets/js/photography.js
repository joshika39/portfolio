import images from "./images.js";

const imagesPath = "/assets/images/portfolio";

const imageList = document.querySelector("#photography-gallery");

const onImageClick = (image) => {
  console.log(`Image clicked: ${image.name}`);
  const fullImageUrl = `${imagesPath}/${image.name}.${image.extension}`;
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
  modalImage.src = fullImageUrl;
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

for (let i = 0; i < images.length; i++) {
  const image = images[i];
  const imageElement = document.createElement("img");
  imageElement.src = `${imagesPath}/${image.name}-thumb.${image.extension}`;
  imageElement.alt = image.alt;
  imageElement.addEventListener("click", () => onImageClick(image));

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = image.description;

  const linkElement = document.createElement("li");
  linkElement.appendChild(imageElement);
  linkElement.appendChild(descriptionElement);

  imageList.appendChild(linkElement);
}

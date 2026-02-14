console.log("Photography script loaded.");

const imagesPath = "/assets/images/portfolio";

const images = [
  {
    alt: "HYROX Team in a break.",
    name: "ahoy-captain",
    extension: "jpg",
  },
  {
    alt: "Bilbao in sunshine.",
    name: "sunshine-bilbao",
    extension: "jpg",
  },
  {
    alt: "A cute orange cat.",
    name: "orange-cat",
    extension: "jpg",
  },
  {
    alt: "A gradient background for wallpaper.",
    name: "wp-gradient-2",
    extension: "jpg",
  },
  {
    alt: "A winter walk in Budapest.",
    name: "bp-winter-1",
    extension: "jpg",
  },
  {
    alt: "Spring is coming.",
    name: "spring-is-coming",
    extension: "jpg",
  },
  {
    alt: "A rainbow on the concrete.",
    name: "concrete-rainbow",
    extension: "jpg",
  },
  {
    alt: "On the Margaret Bridge in Budapest.",
    name: "margaret-bridge-1",
    extension: "jpg",
  }
];

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

  const closeButton = document.createElement("span");
  closeButton.innerHTML = "&times;";
  closeButton.classList.add("close-button");
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
    modal.innerHTML = "";
  });

  modal.appendChild(modalImage);
  modal.appendChild(closeButton);

  modal.style.display = "flex";
}

for (let i = 0; i < images.length; i++) {
  const image = images[i];
  const imageElement = document.createElement("img");
  imageElement.src = `${imagesPath}/${image.name}-thumb.${image.extension}`;
  imageElement.alt = image.alt;
  imageElement.addEventListener("click", () => onImageClick(image));

  const linkElement = document.createElement("li");
  linkElement.appendChild(imageElement);

  imageList.appendChild(linkElement);
}

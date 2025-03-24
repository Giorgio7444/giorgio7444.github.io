const setupTitle = () => {
  const letter = document.querySelector("#site-title .letter");
  const letters = ["a", "e", "i", "o", "u"];
  let counter = 0;
  setInterval(() => {
    letter.textContent = letters[counter];
    counter++;

    if (counter >= letters.length) counter = 0;
  }, 700);
};

let buttons = [];
let contents = [];
let currentButton = null;
const setupAccordion = () => {
  const accordion = document.querySelector(".accordion");
  const buttons = accordion.querySelectorAll("button");
  const contents = accordion.querySelectorAll(".content");
  let currentButton = null;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.parentElement.classList.remove("active"));
      contents.forEach((content) => (content.style.maxHeight = "0"));

      if (currentButton === button) {
        currentButton = null;
        return;
      }

      button.parentElement.classList.add("active");
      const content = button.parentElement.querySelector(".content");
      content.style.maxHeight = content.scrollHeight + "px";
      currentButton = button;

      setTimeout(() => {
        const elementTop = button.getBoundingClientRect().top + window.scrollY;
        const extraOffset = window.innerWidth * 0.01;
        window.scrollTo({
          top: elementTop - extraOffset,
          behavior: "smooth",
        });
      }, 450);      
    });
  });
};

const setupMenu = () => {
  const menuToggle = document.querySelector("#menu-toggle");
  const menuItems = document.querySelectorAll("#menu .item");
  gsap.set(menuToggle, { y: window.innerHeight - 200 });
  const speed = 0.5;
  const tl = gsap.timeline({ paused: true });
  tl.to("#site-title", speed, { y: "-=200%", ease: "power1.inOut" });
  tl.to("#logo-screen", speed, { x: "100%", ease: "power1.inOut" }, `-=${speed}`);
  tl.to("#menu-toggle", speed, { y: "-7vh", rotation: 45 }, `-=${speed / 3}`);
  tl.to(
    menuItems,
    {
      y: "-87vh",
      stagger: 0.06,
    },
    `-=${speed / 2}`
  );

  menuToggle.addEventListener("click", () => {
    if (tl.isActive()) return;
    
    if (menuToggle.classList.contains("active")) {
      tl.reverse();
    } else {
      tl.play();
    }

    menuToggle.classList.toggle("active");
    overflowHidden();
  });
};

const menuToggle = document.querySelector("#menu-toggle");

const overflowHidden = () => {
  if (menuToggle.classList.contains("active")) {
    document.body.style.overflowY = "auto";
  } else {
    document.body.style.overflowY = "hidden";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  setupTitle();
  setupAccordion();
  setupMenu();
  
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    },
})

});

console.log("Progetto d'esame di Pulli Giorgio per il corso di Linguaggi Multimediali 1 tenuto dal prof Molinari Antonio - Digital Design and Communication, LABA Brescia - A.A. 2024/2025");
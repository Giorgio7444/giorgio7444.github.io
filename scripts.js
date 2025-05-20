const setupTitle = () => {
  const letter = document.querySelector("#site-title .letter");
  const letters = ["benvenuta nel", "benvenute nel", "benvenuti nel", "benvenuto nel", "benvenutu nel"];
  let counter = 0;
  setInterval(() => {
    letter.textContent = letters[counter];
    counter++;
    if (counter >= letters.length) counter = 0;
  }, 600);
};

const setupAccordion = () => {
  const accordion = document.querySelector(".accordion");
  const buttons = accordion.querySelectorAll("button");
  const contents = accordion.querySelectorAll(".content, .contentps");
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
      const content = button.parentElement.querySelector(".content, .contentps");
      content.style.maxHeight = content.scrollHeight + "px";
      currentButton = button;

      setTimeout(() => {
        const elementTop = button.getBoundingClientRect().top + window.scrollY;
        const extraOffset = window.innerWidth * 0.005;
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
  const changeText = document.querySelector("#menu-toggle");
  const backgroundLayer = document.querySelector("#background-layer");

  gsap.set(menuToggle, { y: window.innerHeight - 200 });

  const speed = 0.5;
  const tl = gsap.timeline({ paused: true });

  tl.to("#site-title", speed, { y: "-=200%", ease: "power1.inOut" });
  tl.to("#menu-toggle", speed, { y: "-13vh", ease: "power1" }, `-=${speed / 3}`);
  tl.to(menuItems, { y: "-90vh", stagger: 0.1 }, `-=${speed / 2}`);

  const toggleBackground = (hide) => {
    if (!backgroundLayer) return;
    if (hide) {
      backgroundLayer.style.opacity = "0";
    } else {
      setTimeout(() => {
        backgroundLayer.style.opacity = "1";
      }, 600);
    }
  };

  menuToggle.addEventListener("click", () => {
    if (tl.isActive()) return;

    const isActive = menuToggle.classList.contains("active");

    if (isActive) {
      tl.reverse();
      toggleBackground(false);
    } else {
      tl.play();
      toggleBackground(true);
    }

    menuToggle.classList.toggle("active");
    overflowHidden(); // aggiorna scroll in base allo stato
  });

  changeText.addEventListener("click", () => {
    setTimeout(() => {
      changeText.textContent = menuToggle.classList.contains("active") ? "GO BACK!" : "LET'S GO!";
    }, 800);
  });
};

// 🔧 Gestione overflow centralizzata
const overflowHidden = () => {
  const menuToggle = document.querySelector("#menu-toggle");
  if (menuToggle.classList.contains("active")) {
    document.body.style.overflowY = "auto";
    localStorage.setItem("scroll-enabled", "auto");
  } else {
    document.body.style.overflowY = "hidden";
    localStorage.setItem("scroll-enabled", "hidden");
  }
};

// 🔁 Ripristino scroll dopo refresh o banner cookie
window.addEventListener("load", () => {
  const savedScroll = localStorage.getItem("scroll-enabled");
  if (savedScroll === "auto") {
    document.body.style.overflowY = "auto";
  } else {
    document.body.style.overflowY = "hidden";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  setupTitle();
  setupAccordion();
  setupMenu();
});

// 🖱 Hover effect dinamico
const itemHover = document.getElementById("item-hover");
if (itemHover) {
  itemHover.addEventListener("mouseenter", () => {
    itemHover.classList.add("highlight");
  });
  itemHover.addEventListener("mouseleave", () => {
    itemHover.classList.remove("highlight");
  });
}

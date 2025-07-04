
function isLocalStorageAvailable() {
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch(e) {
    return false;
  }
}


function getScrollState() {
  if (isLocalStorageAvailable()) {
    return localStorage.getItem("scroll-enabled");
  }
  return null;
}


function setScrollState(state) {
  if (isLocalStorageAvailable()) {
    localStorage.setItem("scroll-enabled", state);
  }
}

function initializeScroll() {
  const savedScroll = getScrollState();
  
  if (!savedScroll) {
    document.body.classList.add("no-scroll");
    document.body.style.overflowY = "hidden";
    setScrollState("hidden");
  } else if (savedScroll === "auto") {
    // Se esplicitamente abilitato, abilita scroll
    document.body.style.overflowY = "auto";
    document.body.classList.remove("no-scroll");
  } else {
    // Default: blocca scroll
    document.body.classList.add("no-scroll");
    document.body.style.overflowY = "hidden";
  }
}

function openAccordionItem(item) {
  const content = item.querySelector('.accordion-content, .content, .contentps');
  if (!content) return;

  content.addEventListener('transitionend', function handleTransition(e) {
    if (e.propertyName === 'max-height') {
      const masonryContainer = item.querySelector('.masonry-container');
      if (masonryContainer) {
        const masonry = Masonry.data(masonryContainer);
        if (masonry) {
          masonry.layout();
        } else {
          new Masonry(masonryContainer, {
            itemSelector: '.masonry-item',
            columnWidth: '.masonry-sizer',
            percentPosition: true,
          });
        }
      }
      content.removeEventListener('transitionend', handleTransition);
    }
  });

  content.style.maxHeight = content.scrollHeight + 'px';
}

const setupTitle = () => {
  const letter = document.querySelector("#site-title .letter");
  if (!letter) return;
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
  const contents = accordion.querySelectorAll(".content, .contentps, .accordion-content");
  let currentButton = null;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      document.body.style.overflowY = "auto";
      document.body.classList.remove("no-scroll");
      setScrollState("auto");
      
      buttons.forEach((btn) => btn.parentElement.classList.remove("active"));
      contents.forEach((content) => (content.style.maxHeight = "0"));

    
      const masonrySelector = button.dataset.masonrySelector;
      const masonryInit = button.dataset.masonryInit;
      if (masonrySelector && !masonryInit) {
        const masonrySettings = mansonrySettings[masonrySelector];
        console.log('masonrySelector', masonrySelector, masonrySettings);
        new Masonry(masonrySelector, masonrySettings);
        button.dataset.masonryInit = true;
      }

      if (currentButton === button) {
        currentButton = null;
        return;
      }

      const item = button.parentElement;
      item.classList.add("active");
      openAccordionItem(item);
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

  tl.to("#site-title", speed, { opacity: "0", ease: "power1.inOut" });
  tl.to("#menu-toggle", speed, { y: "-13vh", ease: "power1" }, `-=${speed / 3}`);
  tl.to(menuItems, { opacity: 1, y: "-95vh", stagger: 0.1 }, `-=${speed / 2}`);

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

  menuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    
    if (tl.isActive()) return;

    const isActive = menuToggle.classList.contains("active");

    if (isActive) {
      tl.reverse();
      toggleBackground(false);
      document.body.classList.add("no-scroll");
      document.body.style.overflowY = "hidden";
      setScrollState("hidden");
    } else {
      tl.play();
      toggleBackground(true);
      document.body.classList.remove("no-scroll");
      document.body.style.overflowY = "auto";
      setScrollState("auto");
    }

    menuToggle.classList.toggle("active");
  });

  changeText.addEventListener("click", () => {
    setTimeout(() => {
      changeText.textContent = menuToggle.classList.contains("active") ? "GO BACK!" : "LET'S GO!";
    }, 800);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initializeScroll();
  
  setupTitle();
  setupAccordion();
  setupMenu();
});

window.addEventListener("load", () => {
  const currentScroll = getScrollState();
  if (currentScroll === "auto") {
    document.body.style.overflowY = "auto";
    document.body.classList.remove("no-scroll");
  }
});

const itemHover = document.getElementById("item-hover");
if (itemHover) {
  itemHover.addEventListener("mouseenter", () => {
    itemHover.classList.add("highlight");
  });
  itemHover.addEventListener("mouseleave", () => {
    itemHover.classList.remove("highlight");
  });
}
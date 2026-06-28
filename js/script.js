// Переводы для всего сайта
const translations = {
  en: {
    works: "WORKS",
    links: "LINKS",
    contact: "CONTACT",
    bio: "Independent philosopher and writer.<br>Published in English, German, and Russian.",
    explore: "EXPLORE WORKS →"
  },
  de: {
    works: "WERKE",
    links: "LINKS",
    contact: "KONTAKT",
    bio: "Unabhängiger Philosoph und Schriftsteller.<br>Veröffentlicht auf Englisch, Deutsch und Russisch.",
    explore: "WERKE ENTDECKEN →"
  },
  ru: {
    works: "РАБОТЫ",
    links: "ССЫЛКИ",
    contact: "КОНТАКТЫ",
    bio: "Независимый философ и писатель.<br>Публикуется на английском, немецком и русском языках.",
    explore: "ПОСМОТРЕТЬ РАБОТЫ →"
  }
};

// Данные книг с ссылками и обложками
const books = [
  {
    id: "duckology",
    titles: {
      en: "Foundations of Duckology",
      de: "Grundlagen der Entologie",
      ru: "Основы уткологии"
    },
    covers: {
      en: "duckology_en.jpg",
      de: "duckology_de.jpg",
      ru: "duckology_ru.jpg"
    },
    availableLangs: ["en", "de", "ru"],
    links: {
      en: "https://www.amazon.com/dp/B0H62G31LY",
      de: "https://www.amazon.com/dp/B0H1MX4D9W",
      ru: "https://www.litres.ru/73986218/"
    }
  },
  {
    id: "moti",
    titles: {
      en: "The Moti Effect",
      ru: "Эффект Моти"
    },
    covers: {
      en: "moti_en.jpg",
      ru: "moti_ru.jpg"
    },
    availableLangs: ["en", "ru"],
    links: {
      en: "https://www.amazon.com/dp/B0H621XCNZ",
      ru: "https://www.litres.ru/74047139/"
    }
  },
  {
    id: "tqmm",
    titles: {
      en: "The Theory of the Quintessence of Milkshake Madness",
      ru: "Теория квинтэссенции безумия молочных коктейлей"
    },
    covers: {
      en: "TQMM_en.jpg",
      ru: "TQMM_ru.jpg"
    },
    availableLangs: ["en", "ru"],
    links: {
      en: "https://www.amazon.com/dp/B0H5TR3C8C",
      ru: "https://www.litres.ru/73974419/"
    }
  },
  {
    id: "translatence",
    titles: {
      en: "Translatence",
      ru: "Транслятив"
    },
    covers: {
      en: "translatence_en.jpg",
      ru: "translatence_ru.jpg"
    },
    availableLangs: ["en", "ru"],
    links: {
      en: "https://www.amazon.com/dp/B0H4X5XSJK",
      ru: "https://www.litres.ru/74063404/"
    }
  },
  {
    id: "salt",
    titles: {
      ru: "Соль и тишина"
    },
    covers: {
      ru: "Salt_and_sielence_ru.png"
    },
    availableLangs: ["ru"],
    links: {
      ru: "https://www.litres.ru/74090421/"
    }
  }
];

let currentSiteLang = "en";

// Переключение общего языка сайта
function setSiteLang(lang) {
  currentSiteLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.innerHTML = translations[lang][el.dataset.i18n] || translations.en[el.dataset.i18n];
  });

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  renderBooks();
}

// Переключение языка для отдельной книги
function setBookLang(bookId, lang) {
  const book = books.find(b => b.id === bookId);
  if (!book || !book.availableLangs.includes(lang)) return;

  const titleEl = document.querySelector(`#book-${bookId} h3`);
  const coverEl = document.querySelector(`#book-${bookId} img`);
  const linkEl = document.querySelector(`#book-${bookId} .book-link`);
  const buttons = document.querySelectorAll(`#book-${bookId} .book-lang-btn`);

  titleEl.textContent = book.titles[lang];
  coverEl.src = `images/${book.covers[lang]}`;
  linkEl.href = book.links[lang];

  buttons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

// Отрисовка всех книг
function renderBooks() {
  const grid = document.getElementById("bookGrid");
  grid.innerHTML = "";

  books.forEach(book => {
    const defaultLang = book.availableLangs.includes(currentSiteLang) ? currentSiteLang : book.availableLangs[0];
    const title = book.titles[defaultLang];
    const cover = book.covers[defaultLang];
    const link = book.links[defaultLang];

    const langButtons = book.availableLangs.map(lang => `
      <button class="book-lang-btn ${lang === defaultLang ? 'active' : ''}"
              data-lang="${lang}"
              onclick="setBookLang('${book.id}', '${lang}')">
        ${lang.toUpperCase()}
      </button>
    `).join("");

    grid.innerHTML += `
      <div class="book-card" id="book-${book.id}">
        <a href="${link}" target="_blank" class="book-link">
          <img src="images/${cover}" alt="${title}">
          <h3>${title}</h3>
        </a>
        <div class="book-lang-switch">${langButtons}</div>
      </div>
    `;
  });
}

// ✅ ЛОГИКА ПОЯВЛЕНИЯ ФОНА У МЕНЮ ПРИ ПРОКРУТКЕ
function handleNavScroll() {
  const nav = document.querySelector('.top-nav');
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

// Инициализация
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => setSiteLang(btn.dataset.lang));
});

// Подключаем отслеживание прокрутки
window.addEventListener('scroll', handleNavScroll);

// Начальная отрисовка
renderBooks();

document.addEventListener('DOMContentLoaded', () => {
  const headerContent = document.querySelector('.header__content');
  const burgerButton = document.getElementById('header-burger-open');

  if (headerContent && burgerButton) {
      const toggleActiveClass = () => {
          if (window.innerWidth < 768) {
              headerContent.classList.toggle('active');
              burgerButton.classList.toggle('active');
          }
      };

      burgerButton.addEventListener('click', toggleActiveClass);

      // Обновляем состояние при изменении размера экрана
      window.addEventListener('resize', () => {
          if (window.innerWidth >= 768) {
              headerContent.classList.remove('active');
              burgerButton.classList.remove('active');
          }
      });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // Найти все блоки с классом "trainingIndicators-exercise__content-block"
  const contentBlocks = document.querySelectorAll(".trainingIndicators-exercise__content-block");

  contentBlocks.forEach(block => {
    const topBlock = block.querySelector(".trainingIndicators-exercise__content-block__top");
    const expandButton = block.querySelector(".trainingIndicators-exercise__content-block__top-cards__card-btn");

    if (!topBlock || !expandButton) return; // Пропустить блоки без нужных элементов

    // Установить начальную высоту контентного блока равной высоте верхнего блока
    const initialHeight = topBlock.offsetHeight;
    block.style.height = `${initialHeight}px`;

    // Добавить обработчик клика на кнопку
    expandButton.addEventListener("click", () => {
      // Проверить, активен ли уже блок
      if (block.classList.contains("active")) {
        // Возврат в исходное состояние
        block.style.height = `${initialHeight}px`;
        block.classList.remove("active");
      } else {
        // Вычислить полную высоту всех внутренних элементов блока
        const allContentHeight = Array.from(block.children).reduce((total, child) => total + child.offsetHeight, 0);

        // Установить новую высоту и добавить класс active
        block.style.height = `${allContentHeight}px`;
        block.classList.add("active");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const productLists = document.querySelectorAll('.trainingIndicators-exercise__content-block__container'); // Находим все элементы с этим классом
  const maxScrollStep = 40; // Максимальная длина шага прокрутки

  // Функция плавного скроллинга для одного элемента
  function startSmoothScroll(container, targetScrollPosition) {
    let isScrolling = false;
    let animationFrameId;

    function smoothScrollStep() {
      const currentScrollPosition = container.scrollLeft;
      const difference = targetScrollPosition - currentScrollPosition;

      if (Math.abs(difference) > 1) {
        const scrollStep = Math.sign(difference) * Math.min(maxScrollStep, Math.abs(difference));
        container.scrollLeft += scrollStep;
        animationFrameId = requestAnimationFrame(smoothScrollStep);
      } else {
        isScrolling = false;
        container.scrollLeft = targetScrollPosition;
        cancelAnimationFrame(animationFrameId);
      }
    }

    if (!isScrolling) {
      isScrolling = true;
      animationFrameId = requestAnimationFrame(smoothScrollStep);
    }
  }

  // Проверка переполнения контейнера
  function isOverflowing(container) {
    return container.scrollWidth > container.clientWidth;
  }

  // Добавление обработчиков событий для всех контейнеров
  productLists.forEach((container) => {
    let targetScrollPosition = 0;

    // Обработчик колеса мыши
    container.addEventListener('wheel', (event) => {
      if (isOverflowing(container)) {
        event.preventDefault();
        targetScrollPosition += event.deltaY;
        targetScrollPosition = Math.max(
          0,
          Math.min(targetScrollPosition, container.scrollWidth - container.clientWidth)
        );
        startSmoothScroll(container, targetScrollPosition);
      }
    });

    // Обработчик для свайпа на мобильных устройствах
    let startX;

    container.addEventListener('touchstart', (event) => {
      if (isOverflowing(container)) {
        startX = event.touches[0].clientX;
        cancelAnimationFrame(animationFrameId); // Останавливаем предыдущее движение
      }
    });

    container.addEventListener('touchmove', (event) => {
      if (isOverflowing(container) && startX) {
        const touchX = event.touches[0].clientX;
        const scrollDelta = startX - touchX;
        targetScrollPosition += scrollDelta;
        targetScrollPosition = Math.max(
          0,
          Math.min(targetScrollPosition, container.scrollWidth - container.clientWidth)
        );
        startX = touchX;
        startSmoothScroll(container, targetScrollPosition);
      }
    });

    container.addEventListener('touchend', () => {
      startX = null;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sortingContainers = document.querySelectorAll(".listSimulators-hero__content-right__blocks-top__block");

  sortingContainers.forEach(container => {
    const sortingBtn = container.querySelector(".list-open");
    const sortingList = container.querySelector(".block-list");
    const sortingItems = container.querySelectorAll(".block-list__item");

    // Открытие/закрытие списка при клике на кнопку
    sortingBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      sortingBtn.classList.toggle("active");
      sortingList.classList.toggle("active");
    });

    // Закрытие списка при клике вне области
    sortingBtn.addEventListener("click", (event) => {
    });

    // Выбор элемента из списка
    sortingItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        // Удалить класс active у всех пунктов в этом контейнере
        sortingItems.forEach((el) => el.classList.remove("active"));

        // Добавить класс active к выбранному элементу
        item.classList.add("active");

        // Установить текст выбранного элемента в кнопку
        const selectedText = item.querySelector("p").textContent;
        sortingBtn.querySelector("p").textContent = selectedText;

        // Закрыть список
        sortingBtn.classList.remove("active");
        sortingList.classList.remove("active");
      });
    });
  });

  // Закрытие списка при клике вне области (global listener)
  document.addEventListener("click", (event) => {
    sortingContainers.forEach(container => {
      const sortingBtn = container.querySelector(".list-open");
      const sortingList = container.querySelector(".block-list");
      if (!sortingList.contains(event.target) && !sortingBtn.contains(event.target)) {
        sortingBtn.classList.remove("active");
        sortingList.classList.remove("active");
      }
    });
  });
});

document.querySelectorAll('.oralCountingSimulators-hero__content-blocks__right-content__btns').forEach(container => {
  // Находим все кнопки внутри текущего контейнера
  const buttons = container.querySelectorAll('.btn-global.choice');

  buttons.forEach(button => {
      button.addEventListener('click', () => {
          // Убираем класс active у всех кнопок
          buttons.forEach(btn => btn.classList.remove('active'));

          // Добавляем класс active текущей кнопке
          button.classList.add('active');

          // Находим элемент <p class="answer"> в другом месте (глобально, вне контейнера)
          const answerElement = document.querySelector('.oralCountingSimulators-hero__content-blocks__right-content__top-right__info .answer');

          if (answerElement) {
              // Устанавливаем значение из кнопки в элемент <p class="answer">
              answerElement.textContent = button.textContent.trim();
          }
      });
  });
});


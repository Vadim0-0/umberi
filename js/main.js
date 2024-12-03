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

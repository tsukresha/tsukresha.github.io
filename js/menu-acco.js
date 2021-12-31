const measureWidth = item => {
  let reqItemWidth = 0;
  const screenWidth = $(window).width();
  const container = item.closest(".products__menu");
  const titlesBlock = container.find(".products-menu__title");
  const titleWidth = titlesBlock.width() * titlesBlock.length;

  const textContainer = item.find(".products-menu__container");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  const isTablet = window.matchMedia("(max-width: 769px)").matches;
  const isMobile = window.matchMedia("(max-width: 480px)").matches;

  if (isTablet) {
    reqItemWidth = screenWidth - titleWidth;
  } 
  if (isMobile) {
    reqItemWidth = screenWidth - titlesBlock.width();
  }
  if (!isTablet && isMobile) {
    reqItemWidth = 500;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingRight - paddingLeft
  }

}

const closeEveryItemInContainer = container => {
  const items = container.find(".products-menu__item");
  const content = container.find(".products-menu__content");

  items.removeClass("active");
  content.width(0);
}

const openItem = item => {
  const hiddenContent = item.find(".products-menu__content");
  const reqWidth = measureWidth(item);
  const textBlock = item.find(".products-menu__container")

  item.addClass("active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
}

$(".products-menu__title").on("click", e => {
  e.preventDefault();


  const $this = $(e.currentTarget);
  const item = $this.closest(".products-menu__item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".products__menu")

  if (itemOpened) {
    closeEveryItemInContainer(container)
  } else {
    closeEveryItemInContainer(container)
    openItem(item);
  }
});

$(".products-menu__close").on("click", e => {
  e.preventDefault();

  closeEveryItemInContainer($(".products__menu"));
})
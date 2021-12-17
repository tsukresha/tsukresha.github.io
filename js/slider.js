const slider = $('.products__content').bxSlider({
  pager: false,
  controls: false
});

$(".product__slider-arrow--direction--left").click(e =>{
  e.preventDefault();
  slider.goToPrevSlide();
})

$(".product__slider-arrow--direction--right").click(e =>{
  e.preventDefault();
  slider.goToNextSlide();
})
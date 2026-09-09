const optimizedDisplayImages = new Set([
  "/products/armadillo/color-guide.jpg",
  "/products/armadillo/finished.jpg",
  "/products/chi-ru/color-guide.jpg",
  "/products/chi-ru/finished.jpg",
  "/products/chi-ru/lineart.png",
  "/products/lu/color-guide.jpg",
  "/products/lu/finished.jpg",
  "/products/lu/lineart.png",
  "/products/nine-colored-deer/color-guide.jpg",
  "/products/nine-colored-deer/finished.jpg",
  "/products/qu-ru/color-guide.jpg",
  "/products/qu-ru/finished.jpg",
  "/products/qu-ru/lineart.png",
  "/products/ren-ma/color-guide.jpg",
  "/products/ren-ma/finished.jpg",
  "/products/ren-ma/lineart.png",
  "/products/tian-gou/color-guide.jpg",
  "/products/tian-gou/finished.jpg",
  "/products/tian-gou/lineart.png",
  "/products/winged-monkey/color-guide.jpg",
  "/products/winged-monkey/finished.jpg",
  "/products/xuan-gui/color-guide.jpg",
  "/products/xuan-gui/finished.jpg",
  "/products/xuan-gui/lineart.png",
]);

/** Uses a lighter WebP copy for web viewing while preserving the supplied asset for printing. */
export function displayImageSrc(src: string) {
  return optimizedDisplayImages.has(src)
    ? src.replace(/\.(png|jpe?g)$/i, ".webp")
    : src;
}

import img from './img'
import _sandwiches from './img/sandwiches'
import _ingredients from './img/ingredients'
import _seasonings from './img/seasonings'

const resources = {
  img: {
    background: img.background,
    logo: img.logo,
    sandwiches: _sandwiches,
    ingredients: _ingredients,
    seasonings: _seasonings,
  }
}

export default resources

export function imageName(image: string) {
  return image.toLowerCase().replaceAll(' ', '')
}
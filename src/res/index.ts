import { palette } from './palette'
import img from './img'
import ingredients from './img/ingredients'
import seasonings from './img/seasonings'
import sandwiches from './img/sandwiches'


const resources = {
  img: {
    logo: img.logo,
    badckground: img.background,
    ingredient: { ...ingredients },
    seasoning: { ...seasonings },
    sandwich: {...sandwiches },
  },
  palette: { ...palette } 
} 

export default resources

export function imageName(image: string) {
  return image.toLowerCase().replaceAll(' ', '')
}
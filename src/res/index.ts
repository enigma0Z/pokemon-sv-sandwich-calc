import { palette } from './palette'

const resources = {
  palette: { ...palette } 
} 

export default resources

export function imageName(image: string) {
  return image.toLowerCase().replaceAll(' ', '')
}
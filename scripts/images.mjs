import { readdirSync, writeFileSync } from 'fs'

const basedir = 'src/res'

const directories = [
  'img', 'img/ingredients', 'img/sandwiches', 'img/seasonings'
];

const imageFileNames = (dir) => {
  const array = readdirSync([basedir, dir].join('/'))
    .filter((file) => {
      return file.endsWith('.png') || file.endsWith('.jpg')
    })

  return Array.from(new Set(array))
}

const generate = () => {
  for (let dir of directories) {

    const lines = []

    lines.push(
      'const images = {'
    )

    const images = imageFileNames(dir).map((name) => {
      return `  ${name.split('.')[0]}: require('./${name}'),`
    })

    lines.push(...images)

    lines.push(
      '}',
      '',
      'export default images'
    )

    writeFileSync([basedir, dir, 'images.js'].join('/'), lines.join('\n'), 'utf8')
  }
}

generate()
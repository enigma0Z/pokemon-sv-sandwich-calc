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

    const imports = imageFileNames(dir).map((name) => {
      return `import _${name.split('.')[0]} from './${name}'`
    })

    lines.push(...imports)

    lines.push(
      'const images: {[index: string]: string} = {'
    )

    const declarations = imageFileNames(dir).map((name) => {
      return `  ${name.split('.')[0]}: _${name.split('.')[0]},`
    })

    lines.push(...declarations)

    lines.push(
      '}',
      'export default images'
    )

    writeFileSync([basedir, dir, 'index.ts'].join('/'), lines.join('\n'), 'utf8')
  }
}

generate()
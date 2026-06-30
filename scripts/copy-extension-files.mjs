import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')

const files = [
  ['manifest.json', 'manifest.json'],
  ['background.js', 'background.js'],
]

for (const [src, dest] of files) {
  const destPath = join(dist, dest)
  mkdirSync(dirname(destPath), { recursive: true })
  copyFileSync(join(root, src), destPath)
  console.log(`Copied ${src} -> dist/${dest}`)
}

// Copy icons
const iconsDir = join(root, 'icons')
if (existsSync(iconsDir)) {
  const distIcons = join(dist, 'icons')
  mkdirSync(distIcons, { recursive: true })
  for (const icon of ['icon-16.png', 'icon-48.png', 'icon-128.png']) {
    copyFileSync(join(iconsDir, icon), join(distIcons, icon))
    console.log(`Copied icons/${icon} -> dist/icons/${icon}`)
  }
}

console.log('\nExtension ready in dist/')

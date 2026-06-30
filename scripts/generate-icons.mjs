import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import zlib from 'zlib'

const __dirname = dirname(fileURLToPath(import.meta.url))
const iconsDir = join(__dirname, '..', 'icons')
mkdirSync(iconsDir, { recursive: true })

function createPNG(size, r, g, b) {
  const width = size, height = size
  const rawData = Buffer.alloc(width * height * 4 + height)

  for (let y = 0; y < height; y++) {
    rawData[y * (width * 4 + 1)] = 0
    for (let x = 0; x < width; x++) {
      const offset = y * (width * 4 + 1) + 1 + x * 4
      rawData[offset] = r
      rawData[offset + 1] = g
      rawData[offset + 2] = b
      rawData[offset + 3] = 255
    }
  }

  const deflated = zlib.deflateSync(rawData)

  function crc32(buf) {
    let c = 0xffffffff
    for (let i = 0; i < buf.length; i++) {
      c = (c >>> 8) ^ crcTable[(c ^ buf[i]) & 0xff]
    }
    return (c ^ 0xffffffff) >>> 0
  }

  const crcTable = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1)
    }
    crcTable[n] = c
  }

  function chunk(type, data) {
    const len = Buffer.alloc(4)
    len.writeUInt32BE(data.length)
    const typeB = Buffer.from(type, 'ascii')
    const crcData = Buffer.concat([typeB, data])
    const crcVal = crc32(crcData)
    const crcB = Buffer.alloc(4)
    crcB.writeUInt32BE(crcVal)
    return Buffer.concat([len, typeB, data, crcB])
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflated),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const blue = [74, 158, 255]
for (const size of [16, 48, 128]) {
  const png = createPNG(size, ...blue)
  writeFileSync(join(iconsDir, `icon-${size}.png`), png)
  console.log(`Created icon-${size}.png (${png.length} bytes)`)
}

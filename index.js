const R = 1000
const sin = Math.sin, cos = Math.cos, PI = Math.PI
const curveY = (t) => (t / 4 | 0 + 50) * sin(t * 4 / (2 * PI))
const curveX = (t) => (t / 4 | 0 + 50) * cos(t * 4 / (2 * PI))

/* fetch file */
fetch('https://gist.githubusercontent.com/jsdario/54888d5c9bc1c1f671e5781c0f9c3faa/raw/8de8368bec64b0d6270c786dfb5019e49cffa7ac/simbolos.txt')
.then(res => res.text())
.then(symbols => {
  console.log('length of symbols', symbols.length)
  printDataOnCanvas(symbols)
})
// .then(symbols => printDataOnSvg(symbols))


function printDataOnCanvas (data) {
  const symbols = data.split('')
  const canvasRef = document.getElementById('entry-point')

  const canvas = createHiDPICanvas(
    canvasRef,
    Math.abs(curveX(symbols.length - 1)),
    Math.abs(curveY(symbols.length - 1))
  )

  const ratio = PIXEL_RATIO
  const context = canvas.getContext('2d')

  window.scrollTo(
    curveX(0) + canvas.width / (2 * ratio) - window.innerWidth / 2,
    curveY(0) + canvas.height / (2 * ratio) - window.innerHeight / 2
  )

  context.fillStyle = 'black'
  context.font = '12pt Arial'

  symbols.forEach((symbol, t) => {
    context.save()
    context.translate(
      curveX(t) + canvas.width / (2 * ratio),
      curveY(t) + canvas.height / (2 * ratio)
    )
    context.rotate(t * 4 / PI)
    context.fillText(
      symbol,
      0,
      0
    )
    context.restore()
  })
}

var PIXEL_RATIO = (function () {
    var ctx = document.createElement('canvas').getContext('2d'),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1

    return dpr / bsr
})()

createHiDPICanvas = function(canvas, w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO }
    canvas.width = w * ratio
    canvas.height = h * ratio
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0)
    return canvas
}

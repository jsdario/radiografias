const sin = Math.sin, cos = Math.cos, PI = Math.PI, exp = Math.exp,
abs = Math.abs, floor = Math.floor, log = Math.log

const pi2 = 2 * PI
const O = (t) => t / (pi2 * (1 + floor(log(t)))) // angle printing
const A = (t) => 12 * floor(4 + O(t) / pi2) // amplification or radius

const curveY = (t) => A(t) * sin(O(t))
const curveX = (t) => A(t) * cos(O(t))

/* fetch file */
const quixote_url = 'https://gist.githubusercontent.com/jsdario/6d6c69398cb0c73111e49f1218960f79/raw/f006a5221dd0ee5dddf0c638080d8eddcbe907a7/el_quijote.txt'

fetch(quixote_url)
.then(res => res.text())
.then(res => {
  const symbols = res.replace(/[^?.,:;!¡¿。、·*\(\)\[\]\-\–\_«»\"\']/g, '')
  console.log('length of symbols', symbols.length)
  printDataOnCanvas(symbols)
})
// .then(symbols => printDataOnSvg(symbols))


function printDataOnCanvas (data) {
  const symbols = data.split('')
  const canvasRef = document.getElementById('entry-point')

  const canvas = createHiDPICanvas(
    canvasRef,
    A(symbols.length) * 2,
    A(symbols.length) * 2
  )

  const context = canvas.getContext('2d')

  context.fillStyle = 'black'
  context.font = '12pt Fira'

  console.log('Started.')

  window.scrollTo(
    curveX(0) + canvas.width / (2 * PIXEL_RATIO) - window.innerWidth / 2,
    curveY(0) + canvas.height / (2 * PIXEL_RATIO) - window.innerHeight / 2
  )

  async.eachOf(symbols, (symbol, t, done) => {
    context.save()
    context.translate(
      curveX(t) + canvas.width / (2 * PIXEL_RATIO),
      curveY(t) + canvas.height / (2 * PIXEL_RATIO)
    )

    context.rotate(O(t) * 2)
    context.fillText(
      symbol,
      0,
      0
    )

    context.restore()
    done()
  }, () => console.log('Finished.'))
}


function createHiDPICanvas (canvas, w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO }
    canvas.width = w * ratio
    canvas.height = h * ratio
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0)
    return canvas
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

const sin = Math.sin, cos = Math.cos, PI = Math.PI, exp = Math.exp,
abs = Math.abs, floor = Math.floor, log = Math.log

const pi2 = 2 * PI
// T = chars.length
const O = (t) => t / (pi2 * (1 + t / 1000)) // angle printing
const A = (t) => pi2 * (pi2 + O(t) + log(O(t) + 1))// amplification or radius

const curveY = (t) => A(t) * sin(O(t))
const curveX = (t) => A(t) * cos(O(t))

/* fetch file */
const quixote_url = 'https://gist.githubusercontent.com/jsdario/6d6c69398cb0c73111e49f1218960f79/raw/f006a5221dd0ee5dddf0c638080d8eddcbe907a7/el_quijote.txt'

fetch(quixote_url)
.then(res => res.text())
.then(res => {
  const symbols = res.replace(/[^?.,:;!¡¿。、·*\(\)\[\]\-\–\_«»\'\']/g, '')

  printDataOnCanvas(symbols)
})

function printDataOnCanvas (data) {
  const symbols = data.split('')
  const T = symbols.length
  const canvasRef = document.getElementById('entry-point')
  const canvasWidth = Math.min(A(T) * 2, 8150)
  const canvasHeight = canvasWidth

  console.log({canvasWidth})

  const canvas = createHiDPICanvas(
    canvasRef,
    canvasWidth,
    canvasHeight
  )

  const context = canvas.getContext('2d')

  context.fillStyle = 'black'
  context.font = '24pt Fira'

  // context.fillText(
  //   'Q',
  //   canvasWidth / 2 - pi2 * 2,
  //   canvasHeight / 2
  // )

  context.font = 'bold 14pt Fira'

  window.scrollTo(
    curveX(0) + canvasWidth / 2 - window.innerWidth / 2,
    curveY(0) + canvasHeight / 2 - window.innerHeight / 2
  )

  async.eachOf(symbols, (symbol, t, done) => {
    context.save()
    const x = curveX(t) + canvasWidth / 2
    const y = curveY(t) + canvasHeight / 2
    // console.log(`(${x}, ${y})`)
    context.translate(
      x,
      y
    )

    // esta parte es bastante dificil
    // tengo que hacer que todos los caracteres esten rotados 90
    context.rotate(O(t) + PI / 2)
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

const PIXEL_RATIO = (function () {
    var ctx = document.createElement('canvas').getContext('2d'),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1

    return dpr / bsr
})()

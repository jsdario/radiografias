const sin = Math.sin, cos = Math.cos, PI = Math.PI, exp = Math.exp,
abs = Math.abs, floor = Math.floor, log = Math.log

const pi2 = 2 * PI
window.R = 1000
window.spiral_deg = (t) => t / (pi2 * (1 + t / window.R))
window.spiral_amp = (t) => pi2 * (pi2 + O(t) + log(O(t) + 1))

window.linear_deg = (t) => t / pi2
window.linear_amp = (t) => t / pi2

window.modular_amp = (t) => (t % R + 100) 

// T = chars.length
const O = t => spiral_deg(t)
const A = t => spiral_amp(t)

const curveY = (t) => A(t) * sin(O(t))
const curveX = (t) => A(t) * cos(O(t))

/* fetch file */
const quixote_url = 'https://gist.githubusercontent.com/jsdario/6d6c69398cb0c73111e49f1218960f79/raw/f006a5221dd0ee5dddf0c638080d8eddcbe907a7/el_quijote.txt'
const galatea_url = 'https://gist.githubusercontent.com/jsdario/07689a1f7f4a790dfe177a711129e67f/raw/b10b39c93addad7320721f13270a6e7ba6dc13bc/polifemo_y_galatea.txt'
const biblioteca_url = 'https://gist.githubusercontent.com/jsdario/1daee22f3f13fe6bc6a343f829565759/raw/3511dc6de6a7bf064c168b4f20b85a20d8f83b91/la_biblioteca_de_babel.txt'
const funes_el_memorioso = 'https://gist.githubusercontent.com/jsdario/1daee22f3f13fe6bc6a343f829565759/raw/3511dc6de6a7bf064c168b4f20b85a20d8f83b91/funes_el_memorioso.txt'
const evangelio_segun_marcos = 'https://gist.githubusercontent.com/jsdario/1daee22f3f13fe6bc6a343f829565759/raw/3511dc6de6a7bf064c168b4f20b85a20d8f83b91/evangelio_segun_marcos.txt'
const arbol_de_la_ciencia = 'https://gist.githubusercontent.com/jsdario/9a44887eba040f93f82b9f9159a1f95c/raw/eaf1c2012d91edbfa3ede408f5b190146c49a782/arbol_de_la_ciencia.txt'

fetch(arbol_de_la_ciencia)
.then(res => res.text())
.then(res => {
  const symbols = res.replace(/[^?.,:;!¡¿。、·*\(\)\[\]\-\–\_«»\'\'1234567890]/g, '')

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

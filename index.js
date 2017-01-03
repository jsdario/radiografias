
/* fetch file */
fetch('https://gist.githubusercontent.com/jsdario/54888d5c9bc1c1f671e5781c0f9c3faa/raw/8de8368bec64b0d6270c786dfb5019e49cffa7ac/simbolos.txt')
.then(res => res.text())
.then(symbols => printData(symbols))

/* print data*/
function printData (data) {
  const root = d3.select('.entry-point')
  .attr('width', 10000)
  .attr('height', 10000)
  // const circles = root.selectAll('circle')
  // .data(data).enter().append('circle')
  // .attr('r', 10)
  // .attr('fill', 'beige')
  // circles.attr('cx', curveX)
  // circles.attr('cy', curveY)
  const chars = root.selectAll('text')
  .data(data).enter().append('text')
  .attr('font-family', 'sans-serif')
  .attr('font-size', '12px')
  chars
  .attr('y', curveY)
  .attr('x', curveX)
  .text(s => s)
}

const R = 1000
const sin = Math.sin, cos = Math.cos, PI = Math.PI
const curveY = (node, t) => (t % R) * 5 * sin(t / (2 * PI))
const curveX = (node, t) => (t % R) * 5 * cos(t / (2 * PI))

let ox = -500, oy = -500
const svgFrame = document.querySelector('.entry-point')

const handleMove = (event) => {
  console.log({event})
  const { left, top } = svgFrame.getBoundingClientRect()
  const
    x = (event.pageX || document.body.scrollLeft + document.documentElement.scrollLeft) - left,
    y = (event.pageY || document.body.scrollTop + document.documentElement.scrollTop) - top

  svgFrame.setAttribute('viewBox', `${x + ox} ${y + oy} 1000 1000`)
}


// svgFrame.onmousemove = throttle(handleMove, 25)

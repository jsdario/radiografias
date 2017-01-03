require('isomorphic-fetch')
const fs = require('fs')

const quixote_url = 'https://gist.githubusercontent.com/jsdario/6d6c69398cb0c73111e49f1218960f79/raw/f006a5221dd0ee5dddf0c638080d8eddcbe907a7/el_quijote.txt'
const quixote_parte_2_url = 'https://gist.githubusercontent.com/jsdario/6d6c69398cb0c73111e49f1218960f79/raw/f006a5221dd0ee5dddf0c638080d8eddcbe907a7/el_quijote_parte_2.txt'

fetch(quixote_url)
.then(res => res.text())
.then(res => {
  const symbols = res.replace(/[^?.,:;!¡¿。、·*\(\)\[\]\-\–\_«»\"\']/g, '')

  fetch(quixote_parte_2_url)
  .then(res => res.text())
  .then(res => {
    const symbols_parte_2 = res.replace(/[^?.,:;!¡¿。、·*\(\)\[\]\-\–\_«»\"\']/g, '')
    fs.writeFileSync('symbols.txt', symbols.concat(symbols_parte_2))
  })
})
var { pdfToText } = require('pdf-to-text')
var http = require('http')
var fs = require('fs')

var pdf_url = 'http://blocs.xtec.cat/edubartrina/files/2012/12/El-%C3%A1rbol-de-la-ciencia.pdf'

var file = fs.createWriteStream('document.pdf')
http.get(pdf_url, function(response) {
  console.log('Downloading')
  response.pipe(file)
})

file.on('finish', () => {
  pdfToText('document.pdf', function(err, data) {
    if (err) throw(err)
     fs.writeFile('content.txt', data, function(err) {
      if(err) throw err

        console.log('The file was saved!')
    })
   console.log(data)
 })
})
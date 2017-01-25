function isUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}

var dropTextInput = document.getElementById('drop-text-input')
var dropTextOverlay = document.getElementById('drop-text-overlay')
var dropTextTrigger = document.getElementById('drop-text-trigger')
dropTextTrigger.onclick = () => {
  const visibility = dropTextOverlay.style.visibility

  if (dropTextInput.value.length > 1) {
    if (isUrl(dropTextInput.value)) {
      fetch(dropTextInput.value)
      .then(res => res.text())
      .then(res => {
        const symbols = res.replace(/[^?.,:;!¡¿。、·*\(\)\[\]\-\–\_«»\'\']/g, '')

        printDataOnCanvas(symbols)
      })
    } else {
      const symbols = dropTextInput.value.replace(/[^?.,:;!¡¿。、·*\(\)\[\]\-\–\_«»\'\']/g, '')
      printDataOnCanvas(symbols)
    }
  } 

  dropTextOverlay.style.visibility = visibility === 'hidden'
  ? 'visible'
  : 'hidden'
}


var isDragging = 0
window.addEventListener('dragover', (e) => {
  isDragging++
  dropTextOverlay.style.visibility = 'visible'
}, false)

window.addEventListener('dragleave', () => {
  isDragging--
  if (isDragging === 0) {
    dropTextOverlay.style.visibility = 'hidden'
  }
}, false)

const reader = new FileReader()
reader.onload = (e) => {
  const symbols = e.target.result.replace(/[^?.,:;!¡¿。、·*\(\)\[\]\-\–\_«»\'\']/g, '')
  printDataOnCanvas(symbols)
  dropTextOverlay.style.visibility = 'hidden'
}

window.addEventListener('drop', (e) => {
  e.preventDefault()
  e.stopPropagation()
  var file = (e.target.files || e.dataTransfer.files)[0]
  reader.readAsText(file)
  return false
}, false)

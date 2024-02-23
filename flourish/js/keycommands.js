
  document.addEventListener('keydown', (event) => {
    var name = event.key;
    if (name === 'Shift') return
    if (event.shiftKey) {
      name === 'Q' && dismissGoogleTranslate()
      name === 'A' && displayModal()
    } else {
      return;
    }
  }, false);
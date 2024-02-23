
// key commands section ------------------------------------->
const keyTogglerFunc = (itemId) => {
    if ($(itemId).is(':checked')) {
      $(itemId).prop('checked', false).trigger('change');
    } else {
      $(itemId).prop('checked', true).trigger('change');
    }
  }

  document.addEventListener('keydown', (event) => {
    var name = event.key;
    if (name === 'Shift') return
    if (event.shiftKey) {
      name === "!" && keyTogglerFunc('#ToggleHighlightHover')
      name === "@" && keyTogglerFunc('#ToggleHighlightLinks')
      name === "#" && keyTogglerFunc('#ToggleTextMagnifier')
      name === "$" && keyTogglerFunc('#ToggleImageDescription')
      name === '%' && keyTogglerFunc('#TogglePhotoFilter')
      name === "^" && keyTogglerFunc('#ToggleReadingMask')
      name === '&' && keyTogglerFunc('#ToggleReadingGuide')
      name === '*' && keyTogglerFunc('#ToggleTTS_click')
      name === 'Q' && resetflourishModal()
      name === 'A' && displayModal()
    } else {
      return;
    }
  }, false);
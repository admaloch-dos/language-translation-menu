
// reset modal ----------------------------->
const resetflourishModal = () => {
    $('#ToggleHighlightHover').prop('checked', false).trigger('change')
    $('#ToggleHighlightLinks').prop('checked', false).trigger('change')
    $('#ToggleTextMagnifier').prop('checked', false).trigger('change')
    $('#ToggleImageDescription').prop('checked', false).trigger('change')
    $('#TogglePhotoFilter').prop('checked', false).trigger('change')
    $('#ToggleReadingMask').prop('checked', false).trigger('change')
    $('#ToggleReadingGuide').prop('checked', false).trigger('change')
    $('#ToggleTTS_click').prop('checked', false).trigger('change')
    restoreDefaultFontSize()
    restoreDefaultFontType()
    restoreDefaultCursorSize()
    restoreSpacingDefault('#letter_spacing', ['letter_spacing'])
    restoreSpacingDefault('#word_spacing', ['word_spacing'])
    restoreSpacingDefault('#line_height', ['line_height'])
    colorPresetToDefault()
    resetColorPicker()
    restoreDefaultMaskSettings()
    restoreDefaultguideSettings()
    dismissGoogleTranslate()
    restoreDefaultMagnify('text', '.text-magnify-color-swatch', '.text-magnify-size-input', textMagObj, '.text-magnifier-preview')
    restoreDefaultMagnify('img', '.img-magnify-color-swatch', '.img-magnify-size-input', imgMagObj, '.img-magnifier-preview')
    removeAllCookies()
    setCurrLang('en')
    setTimeout(() => $(".audio_state").hide(), 500)
  }

  let resetIcon = document.getElementById('reset-flourish')
  resetIcon.addEventListener('click', () => {
    resetflourishModal()
  })

// code related to checking cookies/data/if widget is active or not
// data to determine if widget is still active / widget active items
let isWidgetActive = false
const cookiesArr = ['TTS_click_enabled', 'DarkContrastBackground', 'DesaturateBackground', 'InvertBackground', 'HighSaturationBackground',
  'LowSaturationBackground', 'AEC', '1P_JAR', 'NID', 'DV', 'translateLanguage', 'text-magnify-color-swatch', 'text-magnify-size-input', 'img-magnify-size-input', 'img-magnify-color-swatch', 'text-magnify-color-swatch', '.img-magnify-color-swatch', 'edit-reading-guide', 'edit-reading-mask', 'TTS_click_enabled', 'googtrans', 'readingMaskVal', 'BackgroundColorCookie', 'TextColorCookie', 'LinkColorCookie', 'TextMagnifier', 'HighlightLinks', 'ImageDescription', 'HighlightHover', 'FontSizeCookie', 'FT_Baskerville', 'FT_Dyslexic', 'CursorEnlargeCookie', 'PhotoSens', 'ReadingMask', 'CursorGuide', 'TTS_click_enabled', 'LinpageHeightVal', 'WordSpaceVal', 'LetterSpaceVal', 'speechPitch', 'speechRate', 'speechVol', 'voiceCookie']
let widgetItemObj = {
  isHighlighted: false,
  isOutlined: false,
  isTextMag: false,
  isImgMag: false,
  isFontBig: false,
  isFontChanged: false,
  isCursorBig: false,
  isLineHeightChanged: false,
  isWordSpaceChanged: false,
  isLetterSpaceChanged: false,
  'isDarkContrast': false,
  'isDesaturated': false,
  'isInverted': false,
  'isHighSat': false,
  'isLowSat': false,
  isTextColorChanged: false,
  isBackColorChanged: false,
  isLinkColorChanged: false,
  isPhotoSens: false,
  isReadingMask: false,
  isReadingGuide: false,
  isSpeech: false,
  isDyslexicFont: false,
  isBaskervilleFont: false,
  isTranslated: false,
}

// function to reset all cookies
const removeAllCookies = () => {
  for (let i = 0; i < cookiesArr.length; i++) {
    $.removeCookie(cookiesArr[i]);
  }
}


// reset widgetItemObj on cookie load
const isCookieActive = (input, value) => {
  if (input && input !== value) {
    return true
  } else {
    return false
  }
}

const areCookiesSet = () => {
  let updateCookies = widgetItemObj
  updateCookies.isHighlighted = isCookieActive($.cookie("HighlightHover"), 'false')
  updateCookies.isOutlined = isCookieActive($.cookie("HighlightLinks"), 'false')
  updateCookies.isTextMag = isCookieActive($.cookie("TextMagnifier"), 'false')
  updateCookies.isImgMag = isCookieActive($.cookie("ImageDescription"), 'false')
  updateCookies.isFontBig = isCookieActive($.cookie("FontSizeCookie"), 'null')
  updateCookies.isCursorBig = isCookieActive($.cookie("CursorEnlargeCookie"), 'null')
  updateCookies.isLineHeightChanged = isCookieActive($.cookie("LinpageHeightVal"), 'inherit')
  updateCookies.isWordSpaceChanged = isCookieActive($.cookie("WordSpaceVal"), 'inherit')
  updateCookies.isLetterSpaceChanged = isCookieActive($.cookie("LetterSpaceVal"), 'inherit')
  updateCookies.isLowSat = isCookieActive($.cookie("LowSaturationBackgroundCookie"), 'null')
  updateCookies.isHighSat = isCookieActive($.cookie("HighSaturationBackgroundCookie"), 'null')
  updateCookies.isInverted = isCookieActive($.cookie("InvertBackground"), 'null')
  updateCookies.isDesaturated = isCookieActive($.cookie("DesaturatedBackground"), 'null')
  updateCookies.isDarkContrast = isCookieActive($.cookie("DarkContrastBackground"), 'null')
  updateCookies.isTextColorChanged = isCookieActive($.cookie("TextColorCookie"), 'false')
  updateCookies.isBackColorChanged = isCookieActive($.cookie("BackgroundColorCookie"), 'false')
  updateCookies.isLinkColorChanged = isCookieActive($.cookie("LinkColorCookie"), 'false')
  updateCookies.isPhotoSens = isCookieActive($.cookie("PhotoSens"), 'false')
  updateCookies.isReadingMask = isCookieActive($.cookie("ReadingMask"), 'false')
  updateCookies.isReadingGuide = isCookieActive($.cookie("CursorGuide"), 'false')
  updateCookies.isSpeech = isCookieActive($.cookie("TTS_click_enabled"), 'false')
  updateCookies.isBaskervilleFont = isCookieActive($.cookie("BaskervilleFontCookie"), 'null')
  updateCookies.isDyslexicFont = isCookieActive($.cookie("DyslexicFontCookie"), 'null')
  return updateCookies
}
widgetItemObj = areCookiesSet()



// check if widget items eval to true if so  fade in helper box
const checkIfWidgetActive = () => {
  if (Object.values(widgetItemObj).indexOf(true) > -1) {
    isWidgetActive = true
    $('#flourish_check_icon').fadeIn()
    $('#toggle-flourish-list, #reset-flourish').fadeIn()
  } else {
    isWidgetActive = false
    $('#flourish_check_icon').fadeOut()
    $('#toggle-flourish-list, #reset-flourish, #item-delete-container').fadeOut()
    $("#toggle-flourish-list").removeClass("fa-toggle-on");
    $("#toggle-flourish-list").addClass("fa-toggle-off");
    $.removeCookie('deleteContainerActive');
  }
}
checkIfWidgetActive()

// active item add/delete section -------------->
const addWidgetControls = (item, text) => {
  const widgetList = document.querySelector('#widget-list')
  if (!document.querySelector(`li.${item}`)) {
    const listItem = document.createElement('li')
    listItem.classList.add(item, 'fade-in', 'close-list-items')
    listItem.innerHTML = `<svg class="close-active-item" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
  </svg> <span class="close-active-text">${text}</span> `
    widgetList.append(listItem)
    languageModalSpeechHandler('.close-active-text')
  }
  let closeItems = document.querySelectorAll('.close-list-items')
  closeItemHandler(closeItems)
}

const removeWidgetControls = (itemArr) => {
  itemArr.forEach(item => {
    $(`li.${item}`).fadeOut()
    setTimeout(() => {
      $(`li.${item}`).remove();
    }, 300);
  });
  checkIfWidgetActive()
}

// sometimes when you click to delete active list items it hides the sub menu
const preventHideActiveList = () => {
  const closeListItems = document.querySelectorAll('.close-list-items')
  closeListItems.forEach(item => {
// console.log(closeListItems.length)
    item.addEventListener('click', () => {
      const activeItemContainer = document.querySelector('#widget-list')
      if (item) {
        console.log('there are still items')
      } else {
        console.log('there are no more items')
      }
    })
  })
}

const closeItemHandler = (closeItems) => {
  closeItems.forEach(item => {
    item.addEventListener('click', (e) => {
      item.classList.contains('ToggleHighlightHover') && $('#ToggleHighlightHover').prop('checked', false).trigger('change')
      item.classList.contains('ToggleHighlightLinks') && $('#ToggleHighlightLinks').prop('checked', false).trigger('change')
      item.classList.contains('ToggleTextMagnifier') && $('#ToggleTextMagnifier').prop('checked', false).trigger('change')
      item.classList.contains('ToggleImageDescription') && $('#ToggleImageDescription').prop('checked', false).trigger('change')
      item.classList.contains('TogglePhotoFilter') && $('#TogglePhotoFilter').prop('checked', false).trigger('change')
      item.classList.contains('ToggleReadingMask') && $('#ToggleReadingMask').prop('checked', false).trigger('change')
      item.classList.contains('ToggleReadingGuide') && $('#ToggleReadingGuide').prop('checked', false).trigger('change')
      item.classList.contains('ToggleTTS_click') && $('#ToggleTTS_click').prop('checked', false).trigger('change')
      item.classList.contains('ColorPicker') && resetColorPicker()
      item.classList.contains('letter_spacing') && restoreSpacingDefault('#letter_spacing', ['letter_spacing'])
      item.classList.contains('word_spacing') && restoreSpacingDefault('#word_spacing', ['word_spacing'])
      item.classList.contains('line_height') && restoreSpacingDefault('#line_height', ['line_height'])
      item.classList.contains('Cursor_Enlarge_option') && restoreDefaultCursorSize()
      item.classList.contains('FontSizeMedium') && restoreDefaultFontSize()
      item.classList.contains('google-translate') && dismissGoogleTranslate()
      item.classList.contains('FT_Dyslexic') && restoreDefaultFontType()
      item.classList.contains('FT_Baskerville') && restoreDefaultFontType()
      let colorPreArr = ['DarkContrastBackground', 'DesaturateBackground', 'InvertBackground', 'HighSaturationBackground', 'LowSaturationBackground']
      for (let i = 0; i < colorPreArr.length; i++) {
        if (item.classList.contains(colorPreArr[i])) {
          colorPresetToDefault()
        }
      }
      checkIfWidgetActive()

      if (isWidgetActive) {
        // $('#toggle-flourish-list, #reset-flourish').show()
        console.log('there are still active items')
      } else {
        console.log('there are no active')
      }
    })
  })
  preventHideActiveList()
}

const addWidgetControlsOnLoad = () => {
  widgetItemObj.isHighlighted && addWidgetControls('ToggleHighlightHover', 'Highlight on hover')
  widgetItemObj.isOutlined && addWidgetControls('ToggleHighlightLinks', 'Highlight all links')
  widgetItemObj.isTextMag && addWidgetControls('ToggleTextMagnifier', 'Magnify text')
  widgetItemObj.isImgMag && addWidgetControls('ToggleImageDescription', 'Image description')
  widgetItemObj.isPhotoSens && addWidgetControls('TogglePhotoFilter', 'Photosensitivity filter')
  widgetItemObj.isReadingMask && addWidgetControls('ToggleReadingMask', 'Reading mask')
  widgetItemObj.isReadingGuide && addWidgetControls('ToggleReadingGuide', 'Reading guide')
  widgetItemObj.isSpeech && addWidgetControls('ToggleTTS_click', 'Text to speech')
  widgetItemObj.isLetterSpaceChanged && addWidgetControls('letter_spacing', 'Letter spacing')
  widgetItemObj.isWordSpaceChanged && addWidgetControls('word_spacing', 'Word spacing')
  widgetItemObj.isLineHeightChanged && addWidgetControls('line_height', 'Line height')
  if (widgetItemObj.isBackColorChanged || widgetItemObj.isTextColorChanged || widgetItemObj.isLinkColorChanged) {
    addWidgetControls('ColorPicker', 'Custom colors')
  }
  widgetItemObj.isDarkContrast && addWidgetControls('DarkContrastBackground', 'Dark contrast preset')
  widgetItemObj.isDesaturated && addWidgetControls('DesaturateBackground', 'Desaturate preset')
  widgetItemObj.isHighSat && addWidgetControls('HighSaturationBackground', 'High saturation')
  widgetItemObj.isLowSat && addWidgetControls('LowSaturationBackground', 'Low saturation')
  widgetItemObj.isInverted && addWidgetControls('InvertBackground', 'Inverted preset')
  widgetItemObj.isFontBig && addWidgetControls('FontSizeMedium', 'Change font size')
  widgetItemObj.isDyslexicFont && addWidgetControls('FontTypeDyslexic', 'Open-dyslexic font')
  widgetItemObj.isBaskervilleFont && addWidgetControls('FontTypeBaskerville', 'Libre-baskerville font')
  widgetItemObj.isCursorBig && addWidgetControls('Cursor_Enlarge_option', 'Change cursor')
}
addWidgetControlsOnLoad()




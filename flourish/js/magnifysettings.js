
// text magnifier and image magnifier settings section------------------->
const textMagColorControls = (colors, preview, cssObj) => {
  const colorPresets = document.querySelectorAll(colors)
  colorPresets.forEach(preset => {
    preset.addEventListener('mouseenter', () => {
      let hoverColor = $(preset).css("background-color");
      let hoverBackGroundColor = $(preset).css("border-color");
      $(preview).css({ 'color': hoverColor, 'background-color': hoverBackGroundColor, 'border-color': hoverColor });
    })
    preset.addEventListener('mouseleave', () => {
      $(preview).css({ 'color': cssObj.color, 'background-color': cssObj.backGroundColor, 'border-color': cssObj.color });
    })
    preset.addEventListener('click', () => {
      cssObj.color = $(preset).css("background-color");
      cssObj.backGroundColor = $(preset).css("border-color");

      colorPresets.forEach(items => {
        items.classList.remove('active')
      })
      preset.classList.add('active')
      $(preview).css({ 'color': cssObj.color, 'background-color': cssObj.backGroundColor, 'border-color': cssObj.color });
      $.cookie(colors.slice(1), preset.id, { expires: 30 })
    })
  })
}

const restoreMagColorDefault = (type, colors, cssObj, preview) => {
  const colorPresets = document.querySelectorAll(colors)
  colorPresets.forEach(items => {
    items.classList.remove('active')
  })
  let newId = null
  if (document.body.classList.contains('highcontrast') || document.body.classList.contains('inverted')) {
    newId = `#${type}-mag-color-4`
    cssObj.color = '#363636';
    cssObj.backGroundColor = '#ffffff';
  } else {
    newId = `#${type}-mag-color-1`
    cssObj.color = 'rgb(255,255,255)';
    cssObj.backGroundColor = 'rgb(54,54,54)';
  }
  $(preview).css({ 'color': cssObj.color, 'background-color': cssObj.backGroundColor, 'border-color': cssObj.color });
  document.querySelector(newId).classList.add('active')
  $.cookie(colors.slice(1), newId.slice(1), { expires: 30 })
}

// text and image mag SIZE control
const textMagSizeControls = (input, preview, cssObj) => {
  const textMagSizeInput = document.querySelector(input)
  textMagSizeInput.addEventListener('change', () => {
    let updatedPxSize = `${textMagSizeInput.value}px`
    cssObj.size = updatedPxSize;
    $.cookie(input.slice(1), updatedPxSize, { expires: 30 })
    $(preview).css("fontSize", updatedPxSize);
  })
}

const restoreDefaultMagnify = (type, colors, sizeInput, cssObj, preview) => {
  restoreMagColorDefault(type, colors, cssObj, preview)
  cssObj.size = '22px'
  $(sizeInput).val(22).change();
  $.cookie(sizeInput.slice(1), '22px', { expires: 30 })
  $(preview).css({ 'font-size': cssObj.size });
}

// func to handle cookies for text and img size and color
const magnifyCookieHandler = (type, cookie, preview, obj) => {
  if ($.cookie(cookie.slice(1))) {
    let cookieVal = $.cookie(cookie.slice(1))
    if (type === 'size') {
      obj.size = cookieVal
      $(cookie).val(parseInt(cookieVal)).change();
      $(preview).css("fontSize", obj.size);
    } else {
      const colorPresets = document.querySelectorAll(cookie)
      colorPresets.forEach(items => {
        items.classList.remove('active')
      })
      let cookieIdVal = `#${cookieVal}`
      document.querySelector(cookieIdVal).classList.add('active')
      obj.color = $(cookieIdVal).css("background-color");
      obj.backGroundColor = $(cookieIdVal).css("border-color");
      $(preview).css({ 'color': obj.color, 'background-color': obj.backGroundColor, 'border-color': obj.color });
    }
  }
}

// text magnify settings
textMagColorControls('.text-magnify-color-swatch', '.text-magnifier-preview', textMagObj)
textMagSizeControls('.text-magnify-size-input', '.text-magnifier-preview', textMagObj)

restoreDefaultTextMagSettings = () => {
  restoreDefaultMagnify('text', '.text-magnify-color-swatch', '.text-magnify-size-input', textMagObj, '.text-magnifier-preview')
}

//img description settings
textMagColorControls('.img-magnify-color-swatch', '.img-magnifier-preview', imgMagObj)
textMagSizeControls('.img-magnify-size-input', '.img-magnifier-preview', imgMagObj)

restoreDefaultImageSettings = () => {
  restoreDefaultMagnify('img', '.img-magnify-color-swatch', '.img-magnify-size-input', imgMagObj, '.img-magnifier-preview')
}

setTimeout(() => {
  magnifyCookieHandler('size', '.img-magnify-size-input', '.img-magnifier-preview', imgMagObj)
  magnifyCookieHandler('color', '.img-magnify-color-swatch', '.img-magnifier-preview', imgMagObj)
  magnifyCookieHandler('size', '.text-magnify-size-input', '.text-magnifier-preview', textMagObj)
  magnifyCookieHandler('color', '.text-magnify-color-swatch', '.text-magnifier-preview', textMagObj)
}, 1000)

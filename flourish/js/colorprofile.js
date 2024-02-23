
// website color profile section ---------------------------------->
const colorSchemeArr = [
  {
    id: 'DarkContrastBackground',
    class_: 'highcontrast',
    location: 'body',
    maskColor: '#ffffff',
    colorPickerReset: true,
    activeItemText: 'Dark contrast preset',
    activeItemObj: 'isDarkContrast',
  },
  {
    id: 'DesaturateBackground',
    class_: 'desaturated',
    location: 'body',
    maskColor: '#363636',
    colorPickerReset: true,
    activeItemText: 'Desaturate preset',
    activeItemObj: 'isDesaturated',
  },
  {
    id: 'InvertBackground',
    class_: 'inverted',
    location: 'body',
    maskColor: '#ffffff',
    colorPickerReset: true,
    activeItemText: 'Inverted preset',
    activeItemObj: 'isInverted',
  },
  {
    id: 'HighSaturationBackground',
    class_: 'highsaturation',
    location: 'html',
    maskColor: '#363636',
    colorPickerReset: false,
    activeItemText: 'High saturation',
    activeItemObj: 'isHighSat',
  },
  {
    id: 'LowSaturationBackground',
    class_: 'lowsaturation',
    location: 'html',
    maskColor: '#363636',
    colorPickerReset: false,
    activeItemText: 'Low saturation',
    activeItemObj: 'isLowSat',
  },
]

const makeColorPresetsFalse = (presetArr) => {
  for (let i = 0; i < presetArr.length; i++) {
    presetArr[i] = false
  }
}




const disableColorPicker = () => {
  $('#DarkContrastBG_option').removeClass('disable-colors')
  $('#DesaturateBG_option').removeClass('disable-colors')
  $('#InvertBG_option').removeClass('disable-colors')
  $('#ColorAdjust_option').addClass('disable-colors')
}
const enableColorPicker = () => {
  $('#ColorAdjust_option').removeClass('disable-colors')
}

const colorPresetToDefault = () => {
  changeMagAndMaskColor('black')
  $('#ColorAdjust_option').removeClass('disable-colors')
  // restoreMagColorDefault('text', '.text-magnify-color-swatch', textMagObj, '.text-magnifier-preview')
  // restoreMagColorDefault('img', '.img-magnify-color-swatch', imgMagObj, '.img-magnifier-preview')
  for (let i = 0; i < colorSchemeArr.length; i++) {
    const { id, class_, location, activeItemObj } = colorSchemeArr[i]
    widgetItemObj[activeItemObj] = false
    $.removeCookie(id);
    removeWidgetControls([id])
    $(location).removeClass(class_);
    // $("#DefaultBG_option").addClass('active').siblings().removeClass('active');
    document.querySelector('#defaultBackground').click()
  }
}

const colorPresetHandler = (currItemId) => {
  const currItemTag = `#${currItemId}`
  $(currItemTag).closest('li').addClass('active').siblings().removeClass('active');
  document.querySelector(currItemTag).click()
  if (currItemId === 'defaultBackground') {
    colorPresetToDefault()
  } else {
    if (currItemId === 'DarkContrastBackground' || currItemId === 'InvertBackground') {
      changeMagAndMaskColor('white')
    } else {
      changeMagAndMaskColor('black')
    }
    for (let i = 0; i < colorSchemeArr.length; i++) {
      const { id, class_, location, activeItemText, activeItemObj, maskColor, colorPickerReset } = colorSchemeArr[i]
      if (id === currItemId) {
        if (colorPickerReset) {
          resetColorPicker()
          disableColorPicker()
        } else {
          enableColorPicker()
        }
        widgetItemObj[activeItemObj] = true
        $.cookie(id, 'yes', { expires: 30 });
        addWidgetControls(id, activeItemText)
        $(location).addClass(class_);
      } else {
        widgetItemObj[activeItemObj] = false
        $.removeCookie(id);
        removeWidgetControls([id])
        $(location).removeClass(class_);
      }
      checkIfWidgetActive()
    }
  }

}

for (let i = 0; i < colorSchemeArr.length; i++) {
  if ($.cookie(colorSchemeArr[i].id) == "yes") {
    colorPresetHandler(colorSchemeArr[i].id)
    setTimeout(() => {
      $("#DefaultBG_option").removeClass('active')
    }, 300)

  }
}

const colorPresetOptions = document.querySelectorAll('.backgroundOptions')
colorPresetOptions.forEach(preset => {
  preset.addEventListener('click', () => {
    colorPresetHandler(preset.id)
  })
})
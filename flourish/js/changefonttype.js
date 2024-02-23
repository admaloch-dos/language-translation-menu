
// change font ----------------------------->
const fontTypeArr = [
    {
      id: 'FT_Baskerville',
      activeItemText: 'Libre-baskerville font',
      activeItemObj: 'isBaskervilleFont',
      class_: 'BaskervilleFont',
    },
    {
      id: 'FT_Dyslexic',
      activeItemText: 'Open-dyslexic font',
      activeItemObj: 'isDyslexicFont',
      class_: 'DyslexicFont',
    }
  ]



  const fontTypeOptions = document.querySelectorAll('.font-type-option')

  fontTypeOptions.forEach(font => {
    font.addEventListener('click', () => {
      fontTypeHandler(font.id)
    })
  })

  const restoreDefaultFontType = () => {

    for (let i = 0; i < fontTypeArr.length; i++) {
      const { id, class_, activeItemObj } = fontTypeArr[i]
      widgetItemObj[activeItemObj] = false
      $.removeCookie(id);
      removeWidgetControls([id])
      $('body').removeClass(class_);
    }
    widgetItemObj.isFontChanged = false
    $('#FT_Default').addClass('active').siblings().removeClass('active');
  }

  const fontTypeHandler = (currItemId) => {
    const currItemTag = `#${currItemId}`
    $(currItemTag).addClass('active').siblings().removeClass('active');
    if (currItemId === 'FT_Default') {
      restoreDefaultFontType()
    } else {
      widgetItemObj.isFontChanged = true
      for (let i = 0; i < fontTypeArr.length; i++) {
        const { id, class_, activeItemObj, activeItemText } = fontTypeArr[i]
        if (id === currItemId) {
          $('body').addClass(class_);
          widgetItemObj[activeItemObj] = true

          $.cookie(id, true, { expires: 30 });
          addWidgetControls(id, activeItemText)
        } else {
          widgetItemObj[activeItemObj] = false
          $.removeCookie(id);
          removeWidgetControls([id])
          $('body').removeClass(class_);
        }
      }
    }
    $.removeCookie('FM_FontTypeCookie');
    checkIfWidgetActive()
  }

  for (let i = 0; i < fontTypeArr.length; i++) {
    if ($.cookie(fontTypeArr[i].id) == "true") {
      fontTypeHandler(fontTypeArr[i].id)
      setTimeout(() => {
        $("#FT_Default").removeClass('active')
      }, 300)
    }
  }
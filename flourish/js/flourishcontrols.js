
const cookiesArr = ['AEC', '1P_JAR', 'NID', 'DV', 'translateLanguage', 'googtrans',]
let widgetItemObj = {
  isTranslated: false,
}

let isWidgetActive = false

// check if widget items eval to true if so  fade in helper box
const checkIfWidgetActive = () => {
  if (Object.values(widgetItemObj).indexOf(true) > -1) {
    isWidgetActive = true
    $('#flourish_check_icon').fadeIn()
  } else {
    isWidgetActive = false
    $('#flourish_check_icon').fadeOut()
  }
}
checkIfWidgetActive()
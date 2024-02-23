
// reading mask section -------------------------------------->

setTimeout(() => {
    turnOffItemsOnMobile()
  }, 200)

  let maxPageHeight = document.body.scrollHeight
  var resizeId;
  window.addEventListener("resize", () => {
    if (hasTouchScreen || window.innerWidth < 650) {
      turnOffItemsOnMobile()
    } else if (window.innerWidth > 650) {
      $(".reading-mask").fadeOut('fast')
      clearTimeout(resizeId);
      resizeId = setTimeout(resetMaskOnWidthChange, 400);
    }
    hideItemsonTouchScreen()
    // getRidOfReadingAssistance()
  });

  const resetMaskOnWidthChange = () => {
    if (document.body.classList.contains('ReadingMask_ON')) {
      maxPageHeight = document.body.scrollHeight
      $(".reading-mask").fadeIn()
    }
  }

  const hideItemsonTouchScreen = () => {
    if (window.innerWidth < 992 || hasTouchScreen) {
      $('#text-reading-assistance').addClass('d-none')
    } else {
      $('#text-reading-assistance').removeClass('d-none')
    }
  }
  hideItemsonTouchScreen()

  const turnOffItemsOnMobile = () => {
    if (hasTouchScreen || window.innerWidth < 650) {
      if ($('#ToggleReadingMask').is(':checked')) {
        $('#ToggleReadingMask').prop('checked', false).trigger('change');
      }
      if ($('#ToggleReadingGuide').is(':checked')) {
        $('#ToggleReadingGuide').prop('checked', false).trigger('change');
      }
      document.body.classList.remove('CursorGuide')
      $("#top_mask").fadeOut()
      $("#bottom_mask").fadeOut()
      $.removeCookie('readingMaskWidth');
      $.removeCookie('edit-reading-mask');
      $.removeCookie('CursorGuide');
      if ($.cookie("ReadingMask")) {
        document.body.classList.remove('ReadingMask_ON')
        $.removeCookie('ReadingMask');
      }
    }
  }
  $.removeCookie('readingMaskWidth');

  $(function () {
    $('[id="ToggleReadingMask"]').change(function () {
      if ($(this).is(':checked')) {
        showReadingMask()
      } else {
        hideReadingMask()
      }
      checkIfWidgetActive()
    });
  });

  const showReadingMask = () => {
    $.cookie("readingMaskWidth", window.innerWidth, { expires: 1 });
    $('#reset-mask-btn').css("display", "flex").hide().fadeIn('slow');
    $("#edit-reading-mask").css("display", "flex").hide().fadeIn()
    $.cookie("edit-reading-mask", true, { expires: 30 });
    $.cookie("ReadingMask", true, { expires: 30 });
    widgetItemObj.isReadingMask = true
    $("body").addClass("ReadingMask_ON");
    addWidgetControls('ToggleReadingMask', 'Reading mask')
    maxPageHeight = document.body.scrollHeight
    $(".reading-mask").fadeIn()
  }

  const hideReadingMask = () => {
    $("body").removeClass("ReadingMask_ON");
    $("body").removeClass("ReadingMask ");
    $("#edit-reading-mask").fadeOut()
    $.cookie("edit-reading-mask", false, { expires: 30 });
    $.removeCookie('ReadingMask');
    removeWidgetControls(['ToggleReadingMask'])
    widgetItemObj.isReadingMask = false
    $('#reset-mask-btn').css("display", "none")
    $(".reading-mask").fadeOut()
  }

  const resetMaskOnTranslate = () => {
    if (document.body.classList.contains('ReadingMask_ON')) {
      $('.reading-mask').fadeOut()
      maxPageHeight = document.body.scrollHeight
      setTimeout(() => $('.reading-mask').fadeIn(), 2500)
    }
  }

  setTimeout(() => {
    if ($.cookie('ReadingMask') === 'true') {
      maxPageHeight = document.body.scrollHeight
      showReadingMask()
    } else {
      $('#reset-mask-btn').css("display", "none")
    }
  }, 500)

  var opacityCookie = $.cookie("readingMaskOpacity");
  if (opacityCookie) {
    $("#reading-mask-opacity").val(opacityCookie);
    $(".reading-mask").css({ "opacity": opacityCookie })
  }

  document.querySelectorAll('.opacity-icons').forEach(icon => {
    icon.addEventListener('click', () => {
      selectChangeHandler(icon, 'opacity-icons', '#reading-mask-opacity option:selected')
      let newVal = $('#reading-mask-opacity').val();
      $(".reading-mask").css({ "opacity": newVal })
      $.cookie("readingMaskOpacity", newVal, { expires: 30 })
    })
  })

  const maskOpacityInput = document.getElementById('reading-mask-opacity')
  maskOpacityInput.addEventListener('change', () => {
    $(".reading-mask").css({ "opacity": maskOpacityInput.value })
    $.cookie("readingMaskOpacity", maskOpacityInput.value, { expires: 30 })
  })

  // change mask size*****************>
  let defaultMaskVal = 60
  let maskValue = defaultMaskVal

  var maskSizeCookieVal = $.cookie("readingMaskHeight");
  if (maskSizeCookieVal) {

    $("#mask-size-input").val(maskSizeCookieVal);
    maskValue = maskSizeCookieVal
  }

  const maskSizeInputRange = document.getElementById('mask-size-input')
  maskSizeInputRange.addEventListener('change', () => {
    let sizeInputVal = maskSizeInputRange.value
    maskValue = sizeInputVal
    $.cookie("readingMaskHeight", maskValue, { expires: 30 })
  })

  $(window).scroll(function (e) {
    maxPageHeight = document.body.scrollHeight
  });

  document.body.addEventListener('mousemove', (e) => {
    maxPageHeight = document.body.scrollHeight
    const bottomOverlayHeight = maxPageHeight - e.pageY
    const topOverlayHeight = maxPageHeight - bottomOverlayHeight - maskValue
    $('#bottom_mask').css({ top: e.pageY, height: bottomOverlayHeight + 'px' });
    $('#top_mask').css({ top: 0 - maskValue, height: topOverlayHeight + 'px' });
  })

  const changeColorPicker = (color, cssSelector, hexSelector, inputSelector,) => {
    $(inputSelector).val(color).trigger('change')
    $(cssSelector).css({ "background-color": color })
    $(hexSelector).text(color);
  }

  var maskColorCookieVal = $.cookie("readingMaskColor");
  if (maskColorCookieVal) {
    changeColorPicker(maskColorCookieVal, '.reading-mask', '#mask_hexVal', "#mask_color")
  }

  // change mask color
  const maskColorChangeInput = document.getElementById('mask_color')
  maskColorChangeInput.addEventListener('change', () => {
    changeColorPicker(maskColorChangeInput.value, '.reading-mask', '#mask_hexVal')
    $.cookie("readingMaskColor", maskColorChangeInput.value, { expires: 30 })
  })

  const resetMaskSettingsCookies = () => {
    $.removeCookie('readingMaskOpacity');
    $.removeCookie('readingMaskHeight');
    $.removeCookie('readingMaskColor');
  }

  const restoreDefaultMaskSettings = () => {
    let defaultColor = '#363636'
    if ($.cookie("InvertBackground") === 'yes' || $.cookie("DarkContrastBackground") === 'yes') {
      defaultColor = '#ffffff'
    }
    changeColorPicker(defaultColor, '.reading-mask', '#mask_hexVal', "#mask_color")
    const e = new Event("change");
    const element = document.querySelector("#reading-mask-opacity")
    element.value = '.66Q';
    element.dispatchEvent(e);
    $("#mask-size-input").val(defaultMaskVal);
    maskValue = defaultMaskVal
    resetMaskSettingsCookies()
  }

  if ($.cookie("edit-reading-mask") === 'true') {
    $("#edit-reading-mask").css("display", "flex").hide().fadeIn()
  }

  if ($.cookie('ReadingMask')) {
    $('#reset-mask-btn').css("display", "flex").hide().fadeIn('slow');
  }

  setTimeout(() => {
    if (document.body.classList.contains('ReadingMask_ON')) {
      $('.reading-mask').fadeIn()
    }
  }, 100);

// custom color adjustments
const resetColorInputs = (colorInput, hexInput, hexValue) => {
  const colorItem = document.querySelector(colorInput)
  colorItem.value = hexValue
  colorItem.dispatchEvent(new Event('change'));
  $(hexInput).html(hexValue);
}

const restoreDefaultColorPicker = () => {
  resetColorInputs('#background_color', '#bg_hexVal', defaultBgColor)
  resetColorInputs('#text_color', '#txt_hexVal', defaultTextColor)
  resetColorInputs('#link_color', '#link_hexVal', defaultLinkColor)
}

const deactivatePresets = () => {
  $('#ColorAdjust_option').removeClass('disable-colors')
  $('#DarkContrastBG_option').addClass('disable-colors')
  $('#DesaturateBG_option').addClass('disable-colors')
  $('#InvertBG_option').addClass('disable-colors')
}

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  .slice(1).map(n => parseInt(n, 10)
    .toString(16).padStart(2, '0')).join('')}`

const defaultLink = document.querySelector("a");
let defaultBgColor = rgb2hex(window.getComputedStyle(document.body, null).getPropertyValue('background-color'));
let defaultTextColor = rgb2hex(window.getComputedStyle(document.body, null).getPropertyValue('color'));
let defaultLinkColor = rgb2hex(window.getComputedStyle(defaultLink, null).getPropertyValue('color'));
restoreDefaultColorPicker()

let config = {
  regTextContrast: 5,
  largeTextContrast: 3,
  linkContrast: 3
}

let cache = {};
$("#reset-color-picker").click(function () {
  resetColorPicker()
});

const setupCache = () => {
  cache.bgColor = document.querySelector('#background_color');
  cache.textColor = document.querySelector('#text_color');
  cache.linkColor = document.querySelector('#link_color');
  cache.inputs = document.querySelectorAll('input.color_swatch');
  cache.BgtoText = document.querySelector('#textBackRatioContainer');
  cache.BgtoLink = document.querySelector('#linkBackRatioContainer');
  cache.TexttoLink = document.querySelector('#linkTextRatioContainer');
  cache.contrastValues = document.querySelector('.contrast_values');
}

const getLuminance = (r, g, b) => {
  const RsRGB = r / 255;
  const GsRGB = g / 255;
  const BsRGB = b / 255;
  var R = (RsRGB <= 0.03928) ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
  var G = (GsRGB <= 0.03928) ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
  var B = (BsRGB <= 0.03928) ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);
  var L = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  return L;
};

const calculateContrast = (L1, L2) => {
  const contrast = (L1 + 0.05) / (L2 + 0.05)
  return parseFloat(contrast.toFixed(2));
};

const hexToRGB = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const takeTwoColors = (c1, c2) => {
  const c1l = getLuminance(c1.r, c1.g, c1.b);
  const c2l = getLuminance(c2.r, c2.g, c2.b);
  if (c1l > c2l) {
    return calculateContrast(c1l, c2l);
  } else {
    return calculateContrast(c2l, c1l);
  }
};

const onInputChange = (e) => {
  widgetItemObj.isTextColorChanged = true
  widgetItemObj.isBackColorChanged = true
  widgetItemObj.isLinkColorChanged = true
  addWidgetControls('ColorPicker', 'Custom colors')
  checkIfWidgetActive()
  if ($('body').hasClass('highcontrast') || $('body').hasClass('inverted') || $('body').hasClass('desaturated')) {
    $("body").removeClass("highcontrast inverted desaturated")
    $.removeCookie('InvertBackground');
    $.removeCookie('DarkContrastBackground');
    $.removeCookie('DesaturateBackground');
    $("#DefaultBG_option").addClass('active').siblings().removeClass('active');
    removeWidgetControls(['DarkContrastBackground', 'DesaturateBackground', 'InvertBackground'])
    widgetItemObj.isDarkContrast = false
    widgetItemObj.isDesaturated = false
    widgetItemObj.isInverted = false
  }
  const value = e.target.value;
  $("#defaultContainer").hide();
  if (!cache.bgColor.value) {
    cache.bgColor.value = defaultBgColor;
  }
  if (!cache.textColor.value) {
    cache.textColor.value = defaultTextColor;
  }
  if (!cache.linkColor.value) {
    cache.linkColor.value = defaultLinkColor;
  }
  const bgColor = hexToRGB(cache.bgColor.value);
  const textColor = hexToRGB(cache.textColor.value);
  const linkColor = hexToRGB(cache.linkColor.value);

  //Switch selectors to #view, .Footer
  $('body *').not('#flourish_widget, #flourish_widget *, .modal_content *').css('color', cache.textColor.value);
  $('.SearchForm .input-group .input-group-append #submit_search').css('color', cache.textColor.value);
  $('#footerFeat_container, .Footer').css('color', cache.textColor.value);

  $('body').not('[class="flourish_modal_test"]').css('background-color', cache.bgColor.value);
  $('#Scroll_btn').attr('style', 'background-color: ' + cache.bgColor.value);
  $('#navContainer, #navContainer #main_navbar .dropdown-menu.backdrop_hover, #navContainer #main_navbar .dropdown-menu > .dropdown-submenu.firstLevel').attr('style', 'background-color: ' + cache.bgColor.value);
  $('#footerFeat_container, .Footer').css('background-color', cache.bgColor.value);
  $('#menudropdown .card-body').css('background-color', cache.bgColor.value);

  $('body a').not("#flourish_widget a").attr('style', 'color: ' + cache.linkColor.value);
  // $( "a" ).each(function( ) {
  //   $(this).hover(function() {
  //     $(this).css("color",cache.linkColor)
  //   });
  // });

  const bgTextContrast = takeTwoColors(bgColor, textColor);
  const bgLinkContrast = takeTwoColors(bgColor, linkColor);
  const textLinkContrast = takeTwoColors(textColor, linkColor);

  if (bgTextContrast >= 4.5) {
    $(cache.BgtoText).attr('class', 'pass').text('Pass');
  } else if (bgTextContrast <= 4.5) {
    $(cache.BgtoText).attr('class', 'fail').text('Fail');
  }
  if (bgLinkContrast >= 4.5) {
    $(cache.BgtoLink).attr('class', 'pass').text('Pass');
  } else if (bgLinkContrast <= 4.5) {
    $(cache.BgtoLink).attr('class', 'fail').text('Fail');
  }
  if (textLinkContrast >= 3) {
    $(cache.TexttoLink).attr('class', 'pass').text('Pass');
  } else if (textLinkContrast <= 3) {
    $(cache.TexttoLink).attr('class', 'fail').text('Fail');
  }

  passFailStyle(cache.BgtoText, '#text-contrast')
  passFailStyle(cache.BgtoLink, '#link-contrast')
  passFailStyle(cache.TexttoLink, '#link-text-contrast')

  $('#text-text').css({ 'color': cache.textColor.value, 'background-color': cache.bgColor.value });
  $('#link-text').css({ 'color': cache.linkColor.value, 'background-color': cache.bgColor.value });
  $('.link-text-text').css('background-color', cache.bgColor.value);
  $('.both-text').css({ 'color': cache.textColor.value });
  $('.both-link').css({ 'color': cache.linkColor.value });

  if (cache.textColor.value === defaultTextColor && cache.linkColor.value === defaultLinkColor && cache.bgColor.value === defaultBgColor) {
    $('.contrast-section-container ').fadeOut('slow')
    $('#reset-color-picker').fadeOut('slow')
  } else {
    $('.contrast-section-container ').fadeIn('slow')
    $('#reset-color-picker').css({ 'display': 'flex' }).hide().fadeIn()
  }
};

const passFailStyle = (classItem, changeItem) => {
  classItem.classList.contains('pass')
    ? $(changeItem).css('background-color', 'green').text("Pass")
    : $(changeItem).css('background-color', 'red').text("Fail")
}

const addEventListeners = () => {
  cache.bgColor.addEventListener('change', onInputChange);
  cache.textColor.addEventListener('change', onInputChange);
  cache.linkColor.addEventListener('change', onInputChange);
};

const initflourishListeners = () => {
  setupCache();
  addEventListeners();
}
initflourishListeners();

const resetColorPicker = () => {
  if (widgetItemObj.isTextColorChanged, widgetItemObj.isBackColorChanged, widgetItemObj.isLinkColorChanged) {
    resetColorInputs('#background_color', '#bg_hexVal', defaultBgColor)
    resetColorInputs('#text_color', '#txt_hexVal', defaultTextColor)
    resetColorInputs('#link_color', '#link_hexVal', defaultLinkColor)
    $('body').not('#flourish-widget-main, #flourish-widget-main *').attr('style', 'background: ' + '' + '!important');
    $('body').not('#flourish-widget-main, #flourish-widget-main *').attr('style', 'background-color:' + '' + '!important');
    $('body *').not('a, #flourish-widget-main, #flourish-widget-main *').attr('style', 'color: ' + '' + '!important');
    $('a').not('#flourish-widget-main, #flourish-widget-main *').attr('style', 'color: ' + '' + '!important');
    $.removeCookie('BackgroundColorCookie');
    $.removeCookie('TextColorCookie');
    $.removeCookie('LinkColorCookie');
    removeWidgetControls(['ColorPicker'])
    widgetItemObj.isTextColorChanged = false
    widgetItemObj.isBackColorChanged = false
    widgetItemObj.isLinkColorChanged = false
    checkIfWidgetActive()
    $('#color-scheme-presets').removeClass('disable-colors')
    $('#DarkContrastBG_option').removeClass('disable-colors')
    $('#DesaturateBG_option').removeClass('disable-colors')
    $('#InvertBG_option').removeClass('disable-colors')
    // $('#extra-links').fadeOut()
    // $('.preset-container').css('margin-top', '1.3rem');
    resetCustomPresets()
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.color = '';
        link.style.opacity = '';
      })
      link.addEventListener('mouseleave', () => {
        link.style.opacity = '';
        link.style.color = '';
      })
    })

  }
  $.removeCookie('customColorChange');
  document.getElementById('preset-color-btn').click()
}

$(document).ready(function () {
  $.fn.cssAsHex = function (colorProp) {
    var hexDigits = '0123456789abcdef';
    function hex(x) {
      return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    };
    function rgb2hex(rgb) {
      var rgbRegex = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      return '#' + hex(rgbRegex[1]) + hex(rgbRegex[2]) + hex(rgbRegex[3]);
    };
    return rgb2hex(this.css(colorProp));
  };

  //BackgroundColor
  $('#background_color').on("change", function () {
    $('body *').not('#flourish-widget-main *').css('background-color', 'none');
    var background_color = $(this).val()
    // $('body').not('a, #flourish_widget, #flourish_widget *, #flourish-triggers, #flourish-triggers *, .translate-language-span, .audio_state *').css('background', background_color, '!important')
    $('body, body *').not('#flourish-widget-main, #flourish-widget-main *, .audio_state *, .curr-active-item *').not('.dropdown-menu, .dropdown-menu *').css('background-color', background_color)
    $('#navContainer, #navContainer #main_navbar .dropdown-menu.backdrop_hover, #navContainer  #main_navbar .dropdown-menu > .dropdown-submenu.firstLevel').css('background-color', background_color)
    $('#Scroll_btn').css('background-color', background_color)
    $('.second-nav li, #menuTitle').css('background-color', background_color)


    $('#footerFeat_container, .Footer').css('background-color', background_color);
    $('#menudropdown .card-body').css('background-color', background_color);
    var hexBackgroundColor = $('body').cssAsHex('background-color');
    $("#bg_hexVal").html(hexBackgroundColor);
    $.cookie.raw = true; //to bypass the default cookie value which is encoded/decoded when writing/reading
    $.cookie('BackgroundColorCookie', hexBackgroundColor, { expires: 30 });
    deactivatePresets()
  });
  if ($.cookie('BackgroundColorCookie') != undefined) {
    setCookieColors('BackgroundColorCookie', '#background_color', "#bg_hexVal")
  }

  //TextColor
  $('#text_color').on("change", function () {
    var text_color = $(this).val()
    $('body *').not('#flourish-widget-main, #flourish-widget-main *, a, i').css('color', text_color);
    $('#search-container').css('border', `solid 1px ${text_color}`);
    $('#flourish_widget h2, #flourish_widget h3, #flourish_widget label, .hexVal, .translate-language-span, .flourish-contact-info-p, .headings, .flourish-setting-title, .filter-header, .lang-filter, .flourish-language-btn, .flourish-accordion-header').css('color', 'black');
    $('.translate-language-span:hover').css('background-color', 'white');
    $('.SearchForm .input-group .input-group-append #submit_search').css('color', text_color);
    $('#footerFeat_container, .Footer').css({ 'color': text_color, 'border-top': `1px solid ${text_color}` });
    $('#menudropdown .card-body').css('border', `1px solid ${text_color}`);
    $('.second-nav h6').css('color', text_color)




    var hexTextColor = $('body *').cssAsHex('color');
    $("#txt_hexVal").html(hexTextColor);
    $.cookie.raw = true;
    $.cookie('TextColorCookie', hexTextColor, { expires: 30 });
    deactivatePresets()
  });
  if ($.cookie('TextColorCookie') != undefined) {
    setCookieColors('TextColorCookie', '#text_color', "#txt_hexVal")
  }

  //LinkColor
  $('#link_color').on("change", function () {
    var link_color = $('body a').css('color');
    $('body a, body i').not('#flourish_widget, #flourish_widget *, #flourish-triggers, #flourish-triggers *, .HighlightLinks *, .HighlightHover *, .translate-language-span').css('color', link_color).addClass('flourish-link-style');
    var hexLinkColor = $('body a').cssAsHex('color');
    $("#link_hexVal").html(hexLinkColor);
    $.cookie.raw = true;
    $.cookie('LinkColorCookie', hexLinkColor, { expires: 30 });
    document.querySelectorAll('a:not(#flourish-modal-content a)').forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.color = link_color;
        link.style.backgroundColor = 'transparent';
        link.style.opacity = .7;
      })
      link.addEventListener('mouseleave', () => {
        link.style.opacity = 1;
        link.style.color = link_color;
      })
    })
  });




  if ($.cookie('LinkColorCookie') != undefined) {
    setCookieColors('LinkColorCookie', '#link_color', "#link_hexVal")
  }
});

const setCookieColors = (cookie, input, hex) => {
  const hexValue = $.cookie(cookie)
  const colorInput = document.querySelector(input)
  colorInput.value = hexValue
  colorInput.dispatchEvent(new Event('change'));
  $(hex).html(hexValue);
  $.cookie.raw = true;
}

// change font size section ------------------------->
const restoreDefaultFontSize = () => {
  $('body').removeClass('fontSizeMedium');
  $("#FS_Default").addClass('active').siblings().removeClass('active');
  $.removeCookie('FontSizeCookie');
  removeWidgetControls(['FontSizeMedium'])
  widgetItemObj.isFontBig = false
  checkIfWidgetActive()
}

const increaseFontSize = () => {
  $('#FS_Medium').addClass('active').siblings().removeClass('active');
  $("body").addClass("fontSizeMedium");
  addWidgetControls('FontSizeMedium', 'Change font size')
  widgetItemObj.isFontBig = true
  $.cookie('FontSizeCookie', true, { expires: 30 });
  checkIfWidgetActive()
}

$(document).ready(function () {
  if ($.cookie('FontSizeCookie') == 'true') {
    increaseFontSize()
  }
  $("#flourish_widget a.FontSizeMedium").click(function () {
    increaseFontSize()
  });
  $("#flourish_widget a.FontSizeDefault").click(function () {
    restoreDefaultFontSize()
  });
});

document.querySelectorAll('.custom-color-input').forEach(item => {
  item.addEventListener('click', () => {
    $.cookie('customColorChange', 'true', { expires: 30 });
    $.removeCookie('main-color-preset');
  })
})

setTimeout(() => {
  $(document).ready(function () {
    if ($.cookie('customColorChange') == 'true') {
      document.querySelector('#custom-color-btn').click()
    }

  });
}, 500)





// reading guide section --------------------->
$(document).ready(function () {
    $("input.switch-input[type=checkbox]").each(function () {
      var name = $(this).attr('name');
      if ($.cookie(name) && $.cookie(name) == "true") {
        $(this).prop('checked', $.cookie(name));
        $("body").addClass(name);
        if ($('[id="ToggleReadingGuide"]').is(':checked')) {
          $("body").addClass(name);
        }
      }
    });
    $("input.switch-input[type=checkbox]").change(function () {
      var name = $(this).attr("name");
      $.cookie(name, $(this).prop('checked'), { expires: 30, })
    });
  });

  if ($.cookie("edit-reading-guide") === 'true') {
    $("#edit-reading-guide").css("display", "flex").hide().fadeIn()
    $('#reset-guide-btn').css("display", "flex").hide().fadeIn('slow');
  }

  $(function () {
    $('[id="ToggleReadingGuide"]').change(function () {
      if ($(this).is(':checked')) {
        $('#reset-guide-btn').css("display", "flex").hide().fadeIn('slow');
        $("#edit-reading-guide").css("display", "flex").hide().fadeIn()
        $.cookie("edit-reading-guide", true, { expires: 30 });
        $("#tail").hide()
        $("body").addClass("CursorGuide");
        $("#tail").fadeIn(500)
        addWidgetControls('ToggleReadingGuide', 'Reading guide')
        widgetItemObj.isReadingGuide = true
      } else {
        $('#reset-guide-btn').fadeOut()
        $("#edit-reading-guide").fadeOut()
        $.cookie("edit-reading-guide", false, { expires: 30 });
        $("#tail").fadeOut(500)
        setTimeout(() => {
          $("body").removeClass('CursorGuide');
        }, 500);
        removeWidgetControls(['ToggleReadingGuide'])
        widgetItemObj.isReadingGuide = false
      }
      checkIfWidgetActive()
    });
  });

  // //////////// Reading guide size
  // change guide size
  let guideYVal = 8

  var guideSizeCookieVal = $.cookie("readingGuideHeight");
  if (guideSizeCookieVal) {
    guideYVal = guideSizeCookieVal
    $("#guide-size-input").val(guideYVal).change()
    $("#tail").css({ "height": guideYVal });
  }

  const guideSizeInputRange = document.getElementById('guide-size-input')
  guideSizeInputRange.addEventListener('change', () => {
    guideYVal = guideSizeInputRange.value
    $.cookie("readingGuideHeight", guideYVal, { expires: 30 })
    $("#tail").css({ "height": guideYVal });
  })

  $(document).bind('mousemove', function (e) {
    $('#tail').css({
      left: 0,
      top: e.pageY - (parseInt(guideYVal) + 12)
    });
  });

  var guideColorCookieVal = $.cookie("readingGuideColor");
  if (guideColorCookieVal) {
    changeColorPicker(guideColorCookieVal, '#tail', '#guide_hexVal', "#guide_color")
  }

  // change guide color
  const guideColorChangeInput = document.getElementById('guide_color')
  guideColorChangeInput.addEventListener('change', () => {
    changeColorPicker(guideColorChangeInput.value, '#tail', '#guide_hexVal')
    $.cookie("readingGuideColor", guideColorChangeInput.value, { expires: 30 })
  })

  //reset cookies
  const resetGuideSettingsCookies = () => {
    $.removeCookie('readingGuideHeight');
    $.removeCookie('readingGuideColor');
  }

  // restore default
  const restoreDefaultguideSettings = () => {
    let defaultColor = '#363636'
    if ($.cookie("InvertBackground") === 'yes' || $.cookie("DarkContrastBackground") === 'yes') {
      defaultColor = '#ffffff'
    }
    changeColorPicker(defaultColor, '#tail', '#guide_hexVal', "#guide_color")
    guideYVal = 8
    $("#guide-size-input").val(guideYVal)
    $("#tail").css({ "height": guideYVal });
    resetGuideSettingsCookies()
  }

// text magnify section ----------------------------------->
let textMagObj = {
    color: 'rgb(255,255,255)',
    backGroundColor: 'rgb(54,54,54)',
    size: '22px',
  }

  if ($.cookie('TextMagnifier') == "true") {
    $('#ToggleTextMagnifier').prop('checked', false).trigger('change')
    setTimeout(() => {
      $('#ToggleTextMagnifier').prop('checked', true).trigger('change')
      $('#reset-text-magnify-btn').css("display", "flex").hide().fadeIn('slow');
    }, 500)
  }

  let textMagY = 65
  window.onmousemove = function (e) {
    if (e.pageY >= $(document).height() - 120) {
      textMagY = 250
    } else if (e.pageY < 100) {
      textMagY = -0
    }
    else {
      textMagY = 65
    }
  }

  $(document).on('mousemove', function (e) {
    let textMagX = 15
    if (e.pageX > window.innerWidth / 1.3) {
      textMagX = -300
    }
    $('#text_magnify').css({
      left: e.pageX + textMagX,
      top: e.pageY - textMagY
    });
  });

  const hoverTextFunc = () => {
    if ($('#ToggleTextMagnifier').is(':checked')) {
      $('#reset-text-magnify-btn').css("display", "flex").hide().fadeIn('slow');
      $('#edit-text-magnify').css("display", "flex").hide().fadeIn();
      $('.text-mag-preview-container').css("display", "flex").hide().fadeIn();
      $("body").addClass("TextMagnifier");
      $('#ToggleZoom').prop('checked', false);
      let textTimer;
      let textMagnify
      $("p, a, :header, span, button, td, li").not('#flourish-triggers, #flourish-triggers ul, #flourish-triggers ul li, #flourish-triggers *, #reset-text-magnify-btn, #reset-img-magnify-btn').on("mouseenter", function () {
        clearTimeout(textTimer)
        textMagnify = $(this).text();
        if (textMagnify.length > 1000) {
          $('#text_magnify').css({ 'max-width': '1000px' });
        } else {
          $('#text_magnify').css({ 'max-width': '500px' });
        }
        textTimer = setTimeout(function () {
          if (textMagnify.replaceAll(/\s/g, '') !== '') {
            $("#text_magnify").text(textMagnify);
            $('#text_magnify').css({ 'color': textMagObj.color, 'background-color': textMagObj.backGroundColor, 'font-size': textMagObj.size });
            if (document.body.classList.contains('TextMagnifier')) {
              $('#text_magnify').show()
            }
          }
        }, 300);
      }).on("mouseleave", function () {
        textMagnify = ''
        $('#text_magnify').hide()
      });
      addWidgetControls('ToggleTextMagnifier', 'Text magnify')
      widgetItemObj.isTextMag = true
    } else {
      $('#reset-text-magnify-btn').fadeOut()
      $('#edit-text-magnify').fadeOut()
      $('.text-mag-preview-container').fadeOut()
      $("body").removeClass("TextMagnifier");
      $('#text_magnify').fadeOut()
      removeWidgetControls(['ToggleTextMagnifier'])
      widgetItemObj.isTextMag = false
    }
    checkIfWidgetActive()
  }

  $(window).scroll(function () {
    $('#text_magnify').fadeOut('fast')
  });

  $(function () {
    $('#ToggleTextMagnifier').change(function () {
      hoverTextFunc()
    });
  });

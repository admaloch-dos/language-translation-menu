
// image description ------------------------------>
let imgMagObj = {
    color: 'rgb(255,255,255)',
    backGroundColor: 'rgb(54,54,54)',
    size: '22px!important',
  }

  if ($.cookie('ImageDescription') == "true") {
    $('#ToggleImageDescription').prop('checked', false).trigger('change')
    setTimeout(() => {
      $('#ToggleImageDescription').prop('checked', true).trigger('change')
      $('#reset-img-magnify-btn').css("display", "flex").hide().fadeIn('slow');
    }, 500);
  }

  $(document).on('mousemove', function (e) {
    let imgMagY = 65
    let imgMagX = 15
    if (e.pageY >= $(document).height() - 120) {
      imgMagY = 100
    } else if (e.pageY < 100) {
      imgMagY = -0
    }
    else {
      imgMagY = 65
    }
    if (e.pageX > window.innerWidth / 1.3) {
      imgMagX = -200
    }
    $('#ImageDescription_magnify').css({
      left: e.pageX + imgMagX,
      top: e.pageY - imgMagY
    });
  });


  const imgMagFunc = () => {
    if ($('#ToggleImageDescription').is(':checked')) {
      $('#reset-img-magnify-btn').css("display", "flex").hide().fadeIn('slow');
      $('#edit-img-magnify').css("display", "flex").hide().fadeIn();
      $('.img-mag-preview-container').css("display", "flex").hide().fadeIn();
      $("body").addClass("ImageDescription");
      addWidgetControls('ToggleImageDescription', 'Image description')
      widgetItemObj.isImgMag = true
      let imgTimer;
      let imgAltMagnify = ''
      $('svg[alt], img[alt], i.fa[alt]').not('#toggle-flourish-list').on("mouseenter", function () {
        clearTimeout(imgTimer)
        let imgHideId = $(this).attr("data-id");
        imgAltMagnify = $(this).attr("alt");
        imgTimer = setTimeout(function () {
          if (imgAltMagnify.replaceAll(/\s/g, '') !== '') {
            $("#ImageDescription_magnify").text(imgAltMagnify);
            $('#ImageDescription_magnify').css({ 'color': imgMagObj.color, 'background-color': imgMagObj.backGroundColor, 'font-size': imgMagObj.size });
            if (document.body.classList.contains('ImageDescription') && imgHideId !== 'hide-img-hover') {
              $('#ImageDescription_magnify').show()
            }
          }
        }, 300);
      }).on("mouseleave", function () {
        imgAltMagnify = ''
        $('#ImageDescription_magnify').hide()
      });
    } else {
      $('#reset-img-magnify-btn').fadeOut()
      $('#edit-img-magnify').fadeOut()
      $('.img-mag-preview-container').fadeOut()
      $("body").removeClass("ImageDescription");
      $('#ImageDescription_magnify').fadeOut()
      removeWidgetControls(['ToggleImageDescription'])
      widgetItemObj.isImgMag = false
    }
    checkIfWidgetActive()
  }

  $(function () {
    $('#ToggleImageDescription').change(function () {
      imgMagFunc()
    });
  });

  $(window).scroll(function () {
    $('#ImageDescription_magnify').fadeOut('fast')
  });
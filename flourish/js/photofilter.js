
// photosensitivity filter section --------------------->
$(function () {
    $('[id="TogglePhotoFilter"]').change(function () {
      if ($(this).is(':checked')) {
        $("html").addClass("PhotoSens");
        addWidgetControls('TogglePhotoFilter', 'Photosensitivity filter')
        widgetItemObj.isPhotoSens = true
        if (!widgetItemObj.isLowSat) {
          $("html").addClass("lowsaturation");
        }
      } else {
        $("html").removeClass("PhotoSens");
        $("body").removeClass("PhotoSens");
        removeWidgetControls(['TogglePhotoFilter'])
        widgetItemObj.isPhotoSens = false
        if (!widgetItemObj.isLowSat) {
          $("html").removeClass("lowsaturation");
        }
      }
      checkIfWidgetActive()
    });
  });

  if ($.cookie('PhotoSens') == "true") {
    $('#TogglePhotoFilter').prop('checked', true).trigger('change')
    if (!widgetItemObj.isLowSat) {
      $("html").addClass("lowsaturation");
    }
  }

// change cursor size section ----------------------------->
const increaseCursorSize = () => {
    $('#Cur_Enlarge').addClass('active').siblings().removeClass('active');
    $("body").addClass("Cursor_Enlarge");
    addWidgetControls('Cursor_Enlarge_option', 'Increase cursor size')
    widgetItemObj.isCursorBig = true
    $.cookie('CursorEnlargeCookie', true, { expires: 30 });
    checkIfWidgetActive()
  }

  const restoreDefaultCursorSize = () => {
    $('body').removeClass('Cursor_Enlarge');
    $('#Cur_Default').addClass('active').siblings().removeClass('active');
    $.removeCookie('CursorEnlargeCookie');
    removeWidgetControls(['Cursor_Enlarge_option'])
    widgetItemObj.isCursorBig = false
    checkIfWidgetActive()
  }

  $(document).ready(function () {
    if ($.cookie('CursorEnlargeCookie') == 'true') {
      increaseCursorSize()
    }
    $("#Cur_Enlarge").click(function () {
      increaseCursorSize()
    });
    $("#Cur_Default").click(function () {
      restoreDefaultCursorSize()
    });
  });



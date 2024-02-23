// outline all links section ------------------------>
$(function () {
    $('[id="ToggleHighlightLinks"]').change(function () {
      if ($(this).is(':checked')) {
        $("body").addClass("HighlightLinks");
        addWidgetControls('ToggleHighlightLinks', 'Highlight all links')
        widgetItemObj.isOutlined = true
      } else {
        $("body").removeClass("HighlightLinks");
        removeWidgetControls(['ToggleHighlightLinks'])
        widgetItemObj.isOutlined = false
      }
      checkIfWidgetActive()
    });
  });
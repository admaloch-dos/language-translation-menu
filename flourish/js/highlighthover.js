
// highlight on hover section ------------------------>
$(function () {
    $('[id="ToggleHighlightHover"]').change(function () {
      if ($(this).is(':checked')) {
        $("body").addClass("HighlightHover");
        addWidgetControls('ToggleHighlightHover', 'Highlight on hover')
        widgetItemObj.isHighlighted = true
      } else {
        $("body").removeClass("HighlightHover");
        removeWidgetControls(['ToggleHighlightHover'])
        widgetItemObj.isHighlighted = false
      }
      checkIfWidgetActive()
    });
  });
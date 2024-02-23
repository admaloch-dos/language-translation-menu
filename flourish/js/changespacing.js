
// letter spacing word spacing line height section --------------------->
const setSpacingCss = (value, css) => {
    $("body p").not('#flourish_widget, #flourish_widget *, i, div').css(css, value); //Selects everything inside body except flourish modal and
    $(".Footer").css(css, value);
  }

  const selectChangeHandler = (icon, iconClass, itemId) => {
    if (icon.classList.contains(iconClass)) {
      if (icon.classList.contains('plus-icon')) {
        $(itemId).next().prop('selected', true).trigger('change');
      }
      if (icon.classList.contains('minus-icon')) {
        $(itemId).prev().prop('selected', true).trigger('change');
      }
    }
  }

  document.querySelectorAll('.spacing-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      selectChangeHandler(icon, 'letter-spacing-icon', '#letter_spacing option:selected')
      selectChangeHandler(icon, 'word-spacing-icon', '#word_spacing option:selected')
      selectChangeHandler(icon, 'line-height-icon', '#line_height option:selected')
    })
  })

  const restoreSpacingDefault = (itemId, removeItemArr) => {
    $(itemId).prop("selectedIndex", 0).trigger('change');
    checkIfWidgetActive()
    removeWidgetControls(removeItemArr)
  }
  // letter spacing
  $(document).ready(function () {
    var selectedVal = $.cookie("LetterSpaceVal");
    if (selectedVal) {
      $("#letter_spacing").val(selectedVal);
      $("#letter_spacing").prop("selected", true);
      $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div, .close-active-text').css("letter-spacing", selectedVal); //Selects everything inside body except flourish modal and header
      $(".Footer").css("letter-spacing", selectedVal);
      // changeIndent(selectedVal, '10px', '#LetterSpacing_option select'close-active-text, '6.5px')
    }
    $("#letter_spacing").on("change", function () {
      var selection1 = $(this).val();

      $(selection1).prop("selected", true);
      $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div, .close-active-text').css("letter-spacing", selection1); //Selects everything inside body except flourish modal and header
      $(".Footer").css("letter-spacing", selection1);
      $.cookie("LetterSpaceVal", selection1, { expires: 30 })
      // changeIndent(selection1, '10px', '#LetterSpacing_option select', '6.5px')
      widgetItemObj.isLetterSpaceChanged = selection1 === 'inherit' ? false : true
      selection1 === 'inherit' ? removeWidgetControls(['letter_spacing']) : addWidgetControls('letter_spacing', 'Letter spacing')
      checkIfWidgetActive()
    });

    //Word Spacing
    var selectedVal2 = $.cookie("WordSpaceVal");
    if (selectedVal2) {
      $("#word_spacing").val(selectedVal2);
      $("#word_spacing").prop("selected", true);
      $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("word-spacing", selectedVal2); //Selects everything inside body except flourish modal and header
      // changeIndent(selectedVal2, '10px', '#WordSpacing_option select', '6.5px')
    }
    $("#word_spacing").on("change", function () {
      var selection2 = $(this).val();
      $(selection2).prop("selected", true);
      $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("#word_spacing", selection2); //Selects everything inside body except flourish modal and header
      $(".Footer").css("#word_spacing", selection2);
      $.cookie("WordSpaceVal", selection2, { expires: 30 })
      // changeIndent(selection2, '10px', '#WordSpacing_option select', '6.5px')
      widgetItemObj.isWordSpaceChanged = selection2 === 'inherit' ? false : true
      selection2 === 'inherit' ? removeWidgetControls(['word_spacing']) : addWidgetControls('word_spacing', 'Word spacing')
      checkIfWidgetActive()

    });

    //Line Height
    var selectedVal3 = $.cookie("LinpageHeightVal");
    if (selectedVal3) {
      $("#line_height").val(selectedVal3);
      $("#line_height").prop("selected", true);
      $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("line-height", selectedVal3); //Selects everything inside body except flourish modal and header
      $(".Footer").css("line-height", selectedVal3);
    }
    $("#line_height").on("change", function () {
      var selection3 = $(this).val();
      $(selection3).prop("selected", true);
      $("body p").not('#flourish-widget-main, #flourish-widget-main *, i, div').css("line-height", selection3); //Selects everything inside body except flourish modal and header
      $(".Footer").css("line-height", selection3);
      $.cookie("LinpageHeightVal", selection3, { expires: 30 })
      widgetItemObj.isLineHeightChanged = selection3 === 'inherit' ? false : true
      checkIfWidgetActive()
      selection3 === 'inherit' ? removeWidgetControls(['line_height']) : addWidgetControls('line_height', 'Line height')

    });
  });
  //  old footer code
  $(document).ready(function () {
    var output2 = "";
    $('.navbar.Footer nav.affiliates li a, .navbar.Footer nav.additional_Links a').each(function () {
      var source2 = $(this).attr("href");
      var text2 = $(this).text();
      output2 += '<option value="' + source2 + '">' + text2 + '</option>';
      $("#select_page #footer_group").html(output2);
    });

    //////////// Change Letter Spacing ///////////////////
    $("#letter_spacing").on('change', function () {
      var getLetterSpace = $(this).val();
      $("body *").not('#flourish_widget, #flourish_widget *, i, div').css("letter-spacing", getLetterSpace); //Selects everything inside body except flourish modal and header
      $(".Footer").css("letter-spacing", getLetterSpace);
    });

    //////////// Change Word Spacing ///////////////////
    $("#word_spacing").on('change', function () {
      var getWordSpace = $(this).val();
      $("body *").not('#flourish_widget, #flourish_widget *, i, div').css("word-spacing", getWordSpace); //Selects everything inside body except flourish modal and header
      $(".Footer").css("word-spacing", getWordSpace);
    });
  }); //end of doc ready
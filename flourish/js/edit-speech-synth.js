const editSpeechControls = () => {
    // speech edit controls and round slider etc
    var speechVol = $.cookie("speechVolCookie");
    var speechRate = $.cookie("speechRateCookie");
    var speechPitch = $.cookie("speechPitchCookie");

    const getCookieVal = (cookie) => {
      let value = 5
      if ($.cookie(cookie)) {
        value = $.cookie(cookie)
      }
      return value
    }
    let volValue = getCookieVal(speechVol)

    const updateSpeechCookies = (item, value) => {
      resetSpeech()
      $.cookie(item, value, { expires: 30 })
    }

    // getMobileOperatingSystem();
    // roundSlider.js -- https://roundsliderui.com/
    $("#volume").roundSlider({
      sliderType: "min-range",
      radius: 60,
      showTooltip: true,
      width: 10,
      value: volValue.speechVol ? volValue.speechVol : 5,
      step: 1,
      handleSize: 0,
      max: 10,
      min: 0,
      handleShape: "square",
      circleShape: "half-top",
      change: function (e) {
        updateSpeechCookies('speechVol', e.value)
      }
    });


    $("#rate").roundSlider({
      sliderType: "min-range",
      radius: 60,
      showTooltip: true,
      width: 10,
      value: volValue.speechRate ? volValue.speechRate : 5,
      step: 1,
      handleSize: 0,
      max: 10,
      min: 0,
      handleShape: "square",
      circleShape: "half-top",
      change: function (e) {
        updateSpeechCookies('speechRate', e.value)
      }
    });

    $("#pitch").roundSlider({
      sliderType: "min-range",
      radius: 60,
      showTooltip: true,
      width: 10,
      value: volValue.speechPitch ? volValue.speechPitch : 5,
      step: 1,
      handleSize: 0,
      max: 10,
      min: 0,
      handleShape: "square",
      circleShape: "half-top",
      change: function (e) {
        updateSpeechCookies('speechPitch', e.value)
      }
    });




    const speechIcon = document.querySelectorAll('.speech-icon')
    speechIcon.forEach(icon => {
      icon.addEventListener('click', () => {
        let currValId = null;
        let currCookie = null;
        if (icon.classList.contains('speech-volume')) {
          currValId = '#volume'
          currCookie = 'speechVol'
        } else if (icon.classList.contains('speech-rate')) {
          currValId = '#rate'
          currCookie = 'speechRate'
        } else {
          currValId = '#pitch'
          currCookie = 'speechPitch'
        }
        let currRoundSlideValue = $(currValId).roundSlider("option", "value")
        if (icon.classList.contains('speech-plus-icon')) {
          $(currValId).roundSlider({ value: currRoundSlideValue + 1 });
          $.cookie(currCookie, currRoundSlideValue + 1, { expires: 30 })
        } else {
          $(currValId).roundSlider({ value: currRoundSlideValue - 1 });
          $.cookie(currCookie, currRoundSlideValue - 1, { expires: 30 })
        }
        resetSpeech()
      })
    })

    $("#volume input").addClass("volume_selector");
    $("#rate input").addClass("rate_selector");
    $("#pitch input").addClass("pitch_selector");
    $("<span class='headings'>Volume</span>").appendTo("#volume");
    $("<span class='headings'>Rate</span>").appendTo("#rate");
    $("<span class='headings'>Pitch</span>").appendTo("#pitch");
  }

  editSpeechControls()

  const resetVoiceSettings = () => {
    $("#volume").roundSlider({
      value: 5
    });
    $("#rate").roundSlider({
      value: 5
    });
    $("#pitch").roundSlider({
      value: 5
    });
  }

  const fullVoiceReset = () => {
    $.removeCookie('voiceCookie');
    resetVoiceSettings()
    resetSpeech()
    resetVoiceDefault()
  }

  const resetVoiceBtn = document.querySelector('#reset-voice-btn')
  resetVoiceBtn.addEventListener('click', () => {
    fullVoiceReset()
  })

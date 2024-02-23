
// Toggle Text-to-Speech click
$(function () {
  $('[id="ToggleTTS_click"]').change(function () {
    if ($(this).is(':checked')) {
      toggleSpeechOn()
    } else {
      toggleSpeechOff()
    }
  });
});

let voiceSelectCurrVal = ''

// voiceSelect.addEventListener("change", (event) => voiceSelect = event.target.value);

const toggleSpeechOn = () => {
  $(".audio_state").hide()
  $("body").addClass("TTS_click_enabled");
  $(".audio_state").fadeIn(600)
  $("#speech-settings").removeClass("disable");
  $('#reset-voice-settings').fadeIn()
  addWidgetControls('ToggleTTS_click', 'Text to speech')
  widgetItemObj.isSpeech = true
  addAudioPlayers('p, :header, button, td, th, label, strong, a, li, span, select')
  speechItemHandler()
  checkIfWidgetActive()
}

const toggleSpeechOff = () => {
  $("#speech-settings").addClass("disable");
  $('#reset-voice-settings').fadeOut()
  $(".audio_state").fadeOut(500)
  setTimeout(() => {
    $("body").removeClass("TTS_click_enabled");
    $.cookie('TTS_click_enabled', 'false');
    removeAudioState()
  }, 500);
  removeWidgetControls(['ToggleTTS_click'])
  widgetItemObj.isSpeech = false
  checkIfWidgetActive()
}



// reset all speech players to default volume icon
const resetSpeech = () => {
  synth.cancel();
  $(".trigger-audio").each(function (index) {
    if ($(this).hasClass('play-pause')) {
      $(this).addClass('inactive-item')
      $(this).removeClass('audio-paused audio-playing curr-active-item')
      $(this).addClass('audio-inactive ')
      $(this).children('.trigger-audio-icon').first().attr("src", "./flourish/img/trigger-audio.svg");
    } else {
      $(this).addClass('d-none')
    }
  });
}




const addAudioPlayers = (selectors) => {
  $(selectors).not("#language-btn-modal-header *").each(function () {
    const itemDisplay = window.getComputedStyle(this, null).display
    const itemOpacity = window.getComputedStyle(this, null).opacity
    const currTextItem = $(this).text()
    const itemType = this.nodeName

    if (currTextItem && currTextItem.replaceAll(/\s/g, '') !== '' && currTextItem.replaceAll(/\s/g, '') !== 'inherit' && currTextItem.replaceAll(/\s/g, '').length > 1 && itemDisplay !== 'none' && itemOpacity !== '0' && this.id !== 'preset-color-btn' && this.id !== 'custom-color-btn' && !$(this).parent().hasClass('TTS_content')) {

      if (itemType === 'SPAN' || itemType === 'LI' || itemType === 'TD' || itemType === 'TH') {
        if (!this.firstElementChild) {
          generateAudioPlayer(this)
        }
      }else if (itemType === 'SELECT') {
        if(this.value !== 'inherit') {
          generateAudioPlayer(this)
        }
      } else if (itemType === 'A') {
        if (!this.closest('p')) {
          generateAudioPlayer(this)
        }
      } else {
        generateAudioPlayer(this)
      }

    }
    if (this.classList.contains('hidden-span')) {
      generateAudioPlayer(this)
    }


  })
}
// if(!$(item).parent().hasClass('TTS_content'))
const generateAudioPlayer = (item) => {

  $(item).wrap('<section class="TTS_content"></section>');
  $('<div class="audio_state">\
  <button class="trigger-audio play-pause inactive-item audio-inactive" title="Trigger audio"><img data-id="hide-img-hover" alt="Text-to-speech icon"  class="trigger-audio-icon" src="./flourish/img/trigger-audio.svg" alt="trigger speech"></button>\<button class="trigger-audio reset-audio-btn d-none" title="Cancel"><img data-id="hide-img-hover"  src="./flourish/img/reset.png" alt="Reset text-to-speech icon"></button>\</div>').insertAfter(item);

}




/***** handler for speech items -- the speech btn and the play/pause/reset all have trigger audio class.. tehse conditionals test whcih one is which *****/
let speechInterval
const speechItemHandler = () => {
  $('div.audio_state .trigger-audio').each(function (index) {
    $(this).unbind('click').click(function (e) {

      e.preventDefault()
      clearInterval(speechInterval)
      if ($(this).hasClass('play-pause')) {
        if (!$(this).hasClass('curr-active-item') && !$(this).hasClass('reset-audio-btn')) {
          initAudioHandler(this)
        } if ($(this).hasClass('audio-inactive')) {
          startAudioHandler(this)
        } else if ($(this).hasClass('audio-playing')) {
          pauseAudioHandler(this)
        } else if ($(this).hasClass('audio-paused')) {
          resumeAudioHandler(this)
        }
      } else {
        resetAudioHandler(this)
      }
      e.stopPropagation(this)
    });
  });
}

const initAudioHandler = (item) => {
  console.log('init audio ran')
  resetSpeech()
  $(item).children('.trigger-audio-icon').first().attr("src", "./flourish/img/pause.png");
  $(item).addClass('curr-active-item').removeClass('inactive-item')
  $(item).closest('.audio_state').children('.reset-audio-btn').first().removeClass('d-none')
}

const startAudioHandler = (item) => {
  console.log('start audio ran')
  synth.cancel();
  speechSynthesisParams(item)
  synth.speak(ssu);
  startAudioBtns(item)
  forceSpeechInterval()
  resetCompletedAudio(item)
}


const startAudioBtns = (item) => {
  $(item).children('.trigger-audio-icon').first().attr("src", "./flourish/img/pause.png");
  $(item).removeClass('audio-inactive audio-paused').addClass('audio-playing')
}



const speechSynthesisParams = (item) => {
  const clear = () => { clearInterval(speechInterval) }
  const itemType = item.closest('.TTS_content').firstChild.nodeName.toLowerCase()
  if (itemType !== 'select') {
    ssu.text = $(item).parent("div.audio_state").prev(itemType).text();
  } else {
    ssu.text = $(item).parent().prev()[0].value
  }

  ssu.volume = parseFloat(volumeInput.value / 10);
  ssu.rate = parseFloat(rateInput.value / 5);
  ssu.pitch = parseFloat(pitchInput.value / 5 + .01);
  ssu.onerror = clear
  if (voiceSelect.value) {
    ssu.voice = speechSynthesis.getVoices().filter(function (voice) {
      synth.cancel();
      $(item).removeClass('audio-paused audio-playing')
      $(item).addClass('audio-inactive ')
      return voice.name == voiceSelect.value;
    })[0];
  }

}

const forceSpeechInterval = (item) => {
  // on chrome speechSynthesis has a bug where it stops playing if the passage is longer than 15 seconds
  const currOS = getOS()
  if (currOS !== 'Android') {
    speechInterval = setInterval(() => {
      if (!speechSynthesis.speaking) {
        clearInterval(speechInterval);
      } else {
        console.log('15 sec interval force continue - speech synthesis bug workaround')
        speechSynthesis.pause();
        speechSynthesis.resume();
      }
    }, 14000);
  }
}

const resetCompletedAudio = (item) => {
  ssu.addEventListener("end", (event) => {
    console.log('audio ended and is now reset. Press play to start from the beginning')
    synth.cancel();
    if ($(item).hasClass('curr-active-item')) {
      $(item).removeClass('audio-paused audio-playing')
      $(item).addClass('audio-inactive ')
      $(item).children('.trigger-audio-icon').first().attr("src", "./flourish/img/play.png");
    }
  });
}

const resumeAudioHandler = (item) => {
  console.log('resume audio ran')
  startAudioBtns(item)
  synth.resume()
  forceSpeechInterval()
}

const pauseAudioHandler = (item) => {
  console.log('pause audio ran')
  $(item).removeClass('audio-inactive audio-playing')
  $(item).addClass('audio-paused')
  $(item).children('.trigger-audio-icon').first().attr("src", "./flourish/img/play.png");
  synth.pause()
  const currOS = getOS()
  if (currOS !== 'Android') {
    speechInterval = setInterval(() => {
      console.log('15 sec pause - prevent breaking- speech synthesis bug workaround')
      speechSynthesis.resume();
      speechSynthesis.pause()
    }, 14000);
  }
}

const resetAudioHandler = (item) => {
  console.log('reset audio ran')
  synth.cancel()
  $(item).siblings('.play-pause').removeClass('audio-paused audio-playing').addClass('audio-inactive')
  $(item).siblings('.play-pause').children('.trigger-audio-icon').first().attr("src", "./flourish/img/play.png");
}





const removeAudioState = () => {
  document.querySelectorAll('.audio_state').forEach(item => {
    item.remove()
  })
  document.querySelectorAll('.TTS_content').forEach(item => {
    $(item).contents().unwrap();
  })
}

$("#Flourish_trigger").click(function () {
  resetSpeech()
});

// Cancels all utterances if the user leaves the site.
window.onbeforeunload = function (e) {
  resetSpeech()
};

function initSpeechSynthesis() {
  if (!('speechSynthesis' in window)) {
    alert("Sorry, your browser doesn't support text to speech!");
    return;
  }
  ssu = new SpeechSynthesisUtterance();
  ssu.lang = 'en-US';
};

document.querySelector('#flourish_reset').addEventListener('click', () => {
  fullVoiceReset()
  loadVoices()
})
document.querySelector('#reset-flourish').addEventListener('click', () => {
  fullVoiceReset()
  loadVoices()
})



document.querySelector('#flourish-more-languages-btn').addEventListener('click', () => {
  languageModalSpeechHandler('#all-languages-modal-content .translate-language-span')
})

document.querySelectorAll('.lang-filter').forEach(item => {
  item.addEventListener('click', () => {
    languageModalSpeechHandler('#all-languages-modal-content .translate-language-span, #all-languages-modal-content h5, #all-languages-modal-content h6')
  })
})

const languageModalSpeechHandler = (selectors) => {
  setTimeout(() => {
    if (document.body.classList.contains('TTS_click_enabled')) {
      addAudioPlayers(selectors)
      speechItemHandler()
    }
  }, 200)
}

const speechCookieHandler = () => {
  if ($.cookie('TTS_click_enabled') === 'true') {
    triggerSpeechToggle('true')
  }
}

const triggerSpeechToggle = (value) => {
  const e = new Event("change");
  const element = document.querySelector("#ToggleTTS_click")
  element.value = value;
  element.dispatchEvent(e);
  $("#speech-settings").removeClass("disable");
}

const resetTextToSpeech = () => {
  if (document.body.classList.contains('TTS_click_enabled')) {
    $('#ToggleTTS_click').prop('checked', false).trigger('change')
    setTimeout(() => {
      $('#ToggleTTS_click').prop('checked', true).trigger('change')
    }, 600)
  }
}

setTimeout(() => {
  speechCookieHandler()
}, 300)

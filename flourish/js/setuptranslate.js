// translate language section ------------------->
const dismissGoogleTranslate = () => {
    removeWidgetControls(['google-translate'])
    widgetItemObj.isTranslated = false
    $.removeCookie('translateLanguage');
    $.removeCookie('googTransCode');
    checkIfWidgetActive()
    var iframe = document.getElementsByClassName('goog-te-banner-frame')[0]
        || document.getElementById(':1.container');
    if (!iframe) return;
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var restore_el = innerDoc.getElementsByTagName("button");
    for (var i = 0; i < restore_el.length; i++) {
        if (restore_el[i].id.indexOf("restore") >= 0) {
            restore_el[i].click();
            return;
        }
    }
}

function googleTranslateElementInit() {

    new google.translate.TranslateElement({
        pageLanguage: 'en',
        layout: google.translate.TranslateElement
    }, 'google_translate_element');
    isTranslateSuccessful = true

}

const handleTranslateCookieLoad = () => {
    if ($.cookie('googtrans') && $.cookie('googtrans') !== '/en/en') {
        const googleTransCode = $.cookie('googtrans').slice(4)
        setCurrLang(googleTransCode)
        if ($.cookie('translateLanguage')) {
            const currLanguage = $.cookie('translateLanguage')
            widgetItemObj.isTranslated = true
            addWidgetControls('google-translate', `Translated to ${currLanguage}`)
            $('#tail').addClass('transform-tail')
        }
        checkIfWidgetActive()
    }
}

function triggerChange(element) {
    let changeEvent = new Event('change');
    element.dispatchEvent(changeEvent);
}

const translateWidgetControls = (selectVal, currLanguage) => {
    if (selectVal !== 'en') {

        removeWidgetControls(['google-translate'])

        widgetItemObj.isTranslated = true
        $.cookie("translateLanguage", currLanguage, { expires: 30 });
        addWidgetControls('google-translate', `Translated to ${currLanguage}`)

    } else {
        dismissGoogleTranslate()
    }
    checkIfWidgetActive()
}

const russianStyleLangs = ['az', 'be', 'bg', 'kk', 'ky', 'mk', 'mn', 'sr', 'tg', 'tt', 'uk']
const hindiStyleLanguages = ['bho', 'doi', 'gom', 'mai', 'mr', 'ne', 'sa']
const indonesianStyleLanguages = ['jv', 'su']

const translatePageHandler = (selector) => {

    if (selector) {
        console.log('initialize google translate successful')
        handleTranslateCookieLoad()
        selector.addEventListener("change", (event) => {
            $('#tail').addClass('transform-tail')

            const selectVal = event.target.value
            const currLanguage = selector.options[selector.selectedIndex].text

            translateWidgetControls(selectVal, currLanguage)
        });
        document.querySelectorAll('.lang-translate-selector').forEach(btn => {
            btn.addEventListener('click', () => {
                let voiceList = speechSynthesis.getVoices();
                voiceList.forEach(voiceItem => {
                    const slicedId = voiceItem.lang.split("-")[0];
                    if (voiceItem.lang === btn.id || slicedId === btn.id) {
                        triggerEventFunc('#voice', voiceItem.name)
                    }
                })
                russianStyleLangs.forEach(lang => {
                    if (btn.id === lang) {
                        triggerEventFunc('#voice', 'Google русский')
                    }
                })
                hindiStyleLanguages.forEach(lang => {
                    if (btn.id === lang) {
                        triggerEventFunc('#voice', 'Google हिन्दी')
                    }
                })
                indonesianStyleLanguages.forEach(lang => {
                    if (btn.id === lang) {
                        triggerEventFunc('#voice', 'Google Bahasa Indonesia')
                    }
                })
                let newSelectVal = btn.id
                selector.value = newSelectVal
                triggerChange(selector);
                setCurrLang(newSelectVal)
                resetMaskOnTranslate()

            })
        })
    }
}

//   to grab elements that are loaded asynchronously ex. google translate
const isElementLoaded = async selector => {
    while (document.querySelector(selector) === null) {
        await new Promise(resolve => requestAnimationFrame(resolve))
    }
    return document.querySelector(selector);
};

const maxAttempts = 3; // Maximum number of attempts
let attempts = 0; // Counter variable for attempts

const checkAndHandleTranslation = () => {
    isElementLoaded('.goog-te-combo').then((selector) => {
        translatePageHandler(selector);
    });
};

const attemptTranslation = () => {
    if (!document.querySelector('.goog-te-combo') && attempts < maxAttempts) {
        attempts === 0 ? console.log('Loading google translate...') : console.log('Google translate failed. Trying again...')

        attempts++;
        setTimeout(attemptTranslation, 2000); // Retry after 1 second
    } else if (!document.querySelector('.goog-te-combo') && attempts === maxAttempts) {
        console.log('Translation failed after maximum attempts. :(');
        $('.language-section-content').hide();
        $('#translate-failed-message').fadeIn();
    }
};

attemptTranslation();

const getCurrState = () => {
    const stateDataAttribute = (document.getElementById('flourish-widget-main').dataset.state)
    return stateDataAttribute
        ? stateDataAttribute.charAt(0).toUpperCase() + stateDataAttribute.slice(1)
        : "United States"
}

// grab state arr of common langs and iterate over full data set
//combine lang code - eng lang - and lang in its own lang.. filter out duplicates then return
const genCurrStateFullData = () => {
    let currState = getCurrState().trim().toLowerCase().replace(' ', '')
    let currStateLangCodes = usStatesLanguagesData.filter(usState => usState.state.trim().toLowerCase().replace(' ', '') === currState && usState)[0].languages
    let filterExtraCodes = currStateLangCodes.slice(0, 12);
    let fullStateArrData = worldLanguageData.filter(item => filterExtraCodes.includes(item.LanguageCode))
    fullStateArrData.sort(function (a, b) {
        return filterExtraCodes.indexOf(a.LanguageCode) - filterExtraCodes.indexOf(b.LanguageCode);
    });
    return fullStateArrData;
}

// func takes in arr and destination and generates valid lang btns
const genLanguageBtns = (arr, destination) => {
    for (let i = 0; i < arr.length; i++) {
        const langBtnContainer = document.createElement('div')
        langBtnContainer.classList.add('flourish-language-btn-container', "col-6", "col-sm-4", "col-lg-3")
        let divId = arr[i].LanguageCodeGoogleTrans ? arr[i].LanguageCodeGoogleTrans : `${arr[i].LanguageEnglish}-language-btn`
        langBtnContainer.innerHTML = `
      <div id="${divId}" class="flourish-language-btn lang-translate-selector">
          <img class="language-icons" src="./flourish/img/language/${arr[i].FlorishIconfilename}"
              alt="${arr[i].LanguageEnglish}-${arr[i].LanguageAutonym} Language icon">
              <span class="translate-language-span notranslate">${arr[i].LanguageAutonym}</span>
      </div>
      `
        destination.append(langBtnContainer)
    }
    const flourishLangSearchBtn = document.getElementById('flourish-language-search')
    flourishLangSearchBtn.parentNode.appendChild(flourishLangSearchBtn)
}

const stateBtnIconContainer = document.getElementById('flourish-language-presets')

genLanguageBtns(genCurrStateFullData(), stateBtnIconContainer)

// btns have a google translate code set as their id... if the language isn't supported there won't be a code and it will have the language + 'language-btn' added as id instead
const translateNotSupported = (item) => {
    if (item.id.includes('language-btn')) {
        $(function () {
            $('.flourish-popover').popover({
                container: '#flourish_widget'
            })
        })
        item.classList.add('disable', 'flourish-popover')
        if (!item.classList.contains('search-list-item')) {
            item.setAttribute("data-container", '#flourish_widget');
            item.setAttribute("data-trigger", 'hover');
            item.setAttribute("data-toggle", 'popover');
            item.setAttribute("data-placement", 'top');
            item.setAttribute("data-content", 'Language not currently supported');
        }
    }
}

document.querySelectorAll('.lang-translate-selector').forEach(item => translateNotSupported(item))





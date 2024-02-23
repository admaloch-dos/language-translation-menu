

// website color presets ---------------------------->
const colorPresetObj = [
  {
    id: 'color-preset-1',
    bgColor: '#D9D3D3',
    textColor: '#000000',
    linkColor: ['#AD007F', '#426426', '#8F4500', '#225D91', '#7532C8', '#B21515',]
  },
  {
    id: 'color-preset-2',
    bgColor: '#FEE543',
    textColor: '#000000',
    linkColor: ['#3A4BE4', '#B62F2F', '#00750E', '#A133A3', '#944F00']
  },



  {
    id: 'color-preset-3',
    bgColor: '#072664',
    textColor: '#FFFFFF',
    linkColor: ['#E07800', '#9D980B', '#F06666', '#009DE0', '#D06CD0', '#1FAC0C', '#F24AE4']
  },

  {
    id: 'color-preset-4',
    bgColor: '#1A1A1A',
    textColor: '#FF2929',
    linkColor: ['#F1E0FF', '#F3F4A9', '#A5F8EA', '#FFE6CC', '#BEF4BE', '#FFE0F8']
  },
  {
    id: 'color-preset-5',
    bgColor: '#002E18',
    textColor: '#FFFFFF',
    linkColor: ['#578FFF', '#FF5757', '#00A88C', '#999400', '#C966FF', '#00A80B', '#FF3DCB']
  },
  {
    id: 'color-preset-6',
    bgColor: '#CCF8FF',
    textColor: '#000000',
    linkColor: ['#886211', '#C70092', '#0C7A00', '#D51515', '#0B69BC', '#B300D6']
  },
  {
    id: 'color-preset-7',
    bgColor: '#F9CA94',
    textColor: '#000000',
    linkColor: ['#2B54B6', '#6B2BE3', '#1D6808', '#9C159E', '#066555', '#A81F5A']
  },
  {
    id: 'color-preset-8',
    bgColor: '#44064C',
    textColor: '#FFFFFF',
    linkColor: ['#999400', '#15A512', '#FF5252', '#00A398', '#FA00E5', '#8288E3']
  },

  {
    id: 'color-preset-9',
    bgColor: '#E3CCFF',
    textColor: '#000000',
    linkColor: ['#2D57B9', '#AD0088', '#1B691B', '#8B00D6', '#B31414', '#2A6365']
  },
  {
    id: 'color-preset-10',
    bgColor: '#37EBDC',
    textColor: '#000000',
    linkColor: ['#9C3A3A', '#A503A0']
  },
  {
    id: 'color-preset-11',
    bgColor: '#CAFFC2',
    textColor: '#000000',
    linkColor: ['#4054E7', '#D11515', '#C313B4',]
  },
  // {
  //   id: 'color-preset-12',
  //   bgColor: '#9EE5CB',
  //   textColor: '#000000',
  //   linkColor: ['#A63636', '#665F00', '#454BBF', '#6B40BA', '#8C4060', '#65585F']
  // },




  {
    id: 'color-preset-12',
    bgColor: '#591212',
    textColor: '#FFFFFF',
    linkColor: ['#009DE0', '#E07800', '#1FAC0C', '#9D980B', '#F24AE4']
  },



]

// swithc between custom and presets btn
const colorSectionBtns = document.querySelectorAll('.color-section-btn')
colorSectionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!btn.classList.contains('active')) {
      colorSectionBtns.forEach((item) => { item.classList.remove('active') })
      btn.classList.add('active')
    } if (btn.id === 'custom-color-btn') {
      $('#preset-schemes').hide()
      $('#custom-schemes').fadeIn()
    } else {
      $('#custom-schemes').hide()
      $('#preset-schemes').fadeIn()
    }
  })
})


const colorPresetItems = document.querySelectorAll('.main-color-presets')

colorPresetItems.forEach((item, i) => {
  item.style.backgroundColor = colorPresetObj[i].linkColor[0]
  item.style.border = `${colorPresetObj[i].textColor} solid 5px`
  item.style.boxShadow = `0 0 0 4px ${colorPresetObj[i].bgColor}, 0 0 0 5px rgba(0, 0, 0, .2)`
  item.addEventListener('click', () => {
    $.cookie('main-color-preset', colorPresetObj[i].id, { expires: 30 });
    $.removeCookie('alt-link');
    colorPresetItems.forEach((item) => { item.classList.remove('active') })
    $(item).addClass('active').siblings().removeClass('active');
    triggerEventFunc("#background_color", colorPresetObj[i].bgColor)
    triggerEventFunc("#text_color", colorPresetObj[i].textColor)
    $("#txt_hexVal").html(colorPresetObj[i].textColor);
    triggerEventFunc("#link_color", colorPresetObj[i].linkColor[0])
    const linkArr = createLinks(i)
    createLinkColorOptions(linkArr)
    handleLinkColorOptions()
    invertFlourishToggle(item)
    $.removeCookie('customColorChange');
  })
})

const createLinks = (indexInput) => {

  const linkArr = colorPresetObj[indexInput].linkColor
  $.cookie('alt-link', linkArr[0], { expires: 30 });
  return linkArr
}

const createLinkColorOptions = (linkArr) => {
  const linkContainer = document.querySelector('#alt-link-colors')
  linkContainer.innerHTML = ''
  for (let j = 0; j < linkArr.length; j++) {
    const newLinkColor = document.createElement('div')
    newLinkColor.style.backgroundColor = linkArr[j]
    newLinkColor.classList.add('alt-link-color')
    newLinkColor.id = linkArr[j]
    linkContainer.append(newLinkColor)
  }
}

const handleLinkColorOptions = () => {
  const linkColors = document.querySelectorAll('.alt-link-color')
  linkColors[0].classList.add('active')
  linkColors.forEach(linkColor => {
    linkColor.addEventListener('click', () => {
      triggerEventFunc("#link_color", linkColor.id)
      linkColors.forEach((colorItem) => { colorItem.classList.remove('active') })
      $(linkColor).addClass('active').siblings().removeClass('active');
      $.cookie('alt-link', linkColor.id, { expires: 30 });
    })
  })
}
const invertFlourishToggle = (item) => {
  const toggle = document.querySelector('#toggle-flourish-list')
  if (item.id === 'color-preset-3' || item.id === 'color-preset-4' || item.id === 'color-preset-5' || item.id === 'color-preset-8' || item.id === 'color-preset-12') {
    toggle.classList.add('invert-toggle')
    changeMagAndMaskColor('white')
  } else {
    toggle.classList.remove('invert-toggle')
    changeMagAndMaskColor('black')
  }
}
setTimeout(() => {
  let linkColor = null
  if ($.cookie('alt-link')) {
    linkColor = $.cookie('alt-link')
    document.getElementById('preset-color-btn').click();
  }
  if ($.cookie('main-color-preset')) {
    const presetId = $.cookie('main-color-preset')
    document.getElementById(presetId).click();
    if (linkColor) {
      document.getElementById(linkColor).click();
    }
  }
  else {

    handleLinkColorOptions()
    if (linkColor) {
      document.getElementById(linkColor).click();
    }
  }
}, 500)





const resetCustomPresets = () => {
  $.removeCookie('main-color-preset');
  $.removeCookie('alt-link');
  const defaultLinkColors = ['#3863FF', '#E60000', '#996900', '#727A00', '#278321', '#7C57E0', '#A648A8']
  createLinkColorOptions(defaultLinkColors)
  handleLinkColorOptions()
  document.querySelector('#toggle-flourish-list').classList.remove('invert-toggle')
  colorPresetItems.forEach((item) => { item.classList.remove('active') })
  document.querySelectorAll('.alt-link-color').forEach((colorItem) => { colorItem.classList.remove('active') })
}

const triggerItemClick = (item, value) => {
  const e = new Event("change");
  const element = document.querySelector(item)
  element.value = value;
  element.dispatchEvent(e);
}


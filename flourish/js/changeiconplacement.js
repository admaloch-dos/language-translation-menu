// change classes for main ada icon size based on innerwidth
const setFlourishIconPlacement = () => {
    const flourishMain = document.querySelector('#flourish-widget-main')
    if (window.innerWidth < 500) {
      flourishMain.classList.remove('trigger-medium', 'trigger-large')
      flourishMain.classList.add('trigger-small')
    } else if (window.innerWidth > 500 && window.innerWidth < 1200) {
      flourishMain.classList.remove('trigger-small', 'trigger-large')
      flourishMain.classList.add('trigger-medium')
    } else if (window.innerWidth > 1200) {
      flourishMain.classList.remove('trigger-small', 'trigger-medium')
      flourishMain.classList.add('trigger-large')
    }
  }
  setFlourishIconPlacement()

  // const changePopoverPlacement = () => {
  //   const flourishMain = document.querySelector('#flourish-widget-main')
  //   if (flourishMain.classList.contains('trigger-left')) {
  //     $('#toggle-flourish-list').data('placement', 'right');
  //   } else {
  //     $('#toggle-flourish-list').data('placement', 'left');
  //   }
  // }
  // changePopoverPlacement()

  window.addEventListener("resize", () => {
    setFlourishIconPlacement()
    // changePopoverPlacement()
  });
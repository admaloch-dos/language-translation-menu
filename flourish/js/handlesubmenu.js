
// active item sub menu on the side ---------------------------->
const addDeleteContainer = () => {
  $("#toggle-flourish-list").attr("src", "./flourish/img/toggle-on.svg");
  $("#toggle-flourish-list").removeClass('hide-active-list')
  $("#toggle-flourish-list").addClass('show-active-list')
  $("#item-delete-container").fadeIn()
  $.cookie("deleteContainerActive", 'true', { expires: 30 });
}

const removeDeleteContainer = () => {
  $("#toggle-flourish-list").attr("src", "./flourish/img/toggle-off.svg");
  $("#toggle-flourish-list").removeClass('show-active-list')
  $("#toggle-flourish-list").addClass('hide-active-list')
  $("#item-delete-container").fadeOut()
  $('.flourish-popover-item').popover('hide');
  $.removeCookie('deleteContainerActive');
}

// active item list listener
let toggleWidgetList = document.getElementById('toggle-flourish-list')
toggleWidgetList.addEventListener('click', () => {
  if (toggleWidgetList.classList.contains('show-active-list')) {
    removeDeleteContainer()
  } else {
    addDeleteContainer()
  }
})

if ($.cookie("deleteContainerActive")) {
  addDeleteContainer()
}

// close hover popover on click
document.querySelectorAll('.flourish-popover-item').forEach(item => {
  item.addEventListener('click', () => {
    $('.flourish-popover-item').popover('hide');
  })
})

// item delete container - close on offscreen click
$('body').click(function (event) {
  if (toggleWidgetList.classList.contains('show-active-list')) {
    if (!$(event.target).closest('.item-delete-container-remove').length && !$(event.target).is('.item-delete-container-remove')) {
      removeDeleteContainer()
    }
  }
});
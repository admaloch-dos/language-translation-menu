$(function () {
  $('[data-toggle="popover"]').popover()

})




$(function () {
  $('[data-toggle="popover-main"]').popover({
    container: 'body'
  })
})


var popOverSettings = {
  placement: 'top',
  container: 'body',
  html: true,
  selector: '[rel="popover-audio"]', //Sepcify the selector here
  content: function () {
      return $('#popover-content').html();
  }
}

$('body').popover(popOverSettings);
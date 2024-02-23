// func to display and close modal
const displayModal = () => {
    const overlay = document.querySelector('#flourish_widget')
    if (overlay.style.display !== "flex") {
      $("#flourish-triggers").fadeOut(700);
      $("#flourish_widget").css('opacity', '0');
      $("#flourish_widget").css("display", "flex")
      $("#flourish_widget").fadeTo(0, 1);
      $(".modal_content").fadeToggle(0);
      $(".modal_body").scrollTop(0);
      document.body.classList.add("prevent-body-overflow");
    } else {
      $("#flourish_widget").fadeTo(400, 0);
      $(".modal_content").fadeToggle(400);
      setTimeout(() => {
        document.body.classList.remove("prevent-body-overflow");
        $("#flourish_widget").css("display", "none")
        $("#flourish-triggers").fadeIn();
      }, 500);
    }
  }

  let flourish_widget = document.getElementById("flourish_widget");
  let Openflourish_widget = document.getElementById("flourish_icon");
  let Closeflourish_widget = document.getElementsByClassName("flourish_close")[0];
  Openflourish_widget.onclick = function () {
    displayModal()
  }

  Closeflourish_widget.onclick = function () {
    displayModal()
  }

  window.onclick = function (event) {
    if (event.target == flourish_widget) {
      // flourish_widget.style.display = "none";
      displayModal()
    }
  }
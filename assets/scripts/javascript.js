function darkmode() {
    var element = document.body;
    element.classList.toggle("white-mode");

    var texth1 = document.getElementById("text")
    texth1.classList.toggle("textdark")

/*
    $('#foo').css({
        'background-color': 'red',
        'color': 'white',
        'font-size': '44px'
    });
});
*/

}

// onresize, onload, onpagehide, onpageshow, onunload (when browser window is closed)

/*

var input = document.getElementById("checkb");
input.("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("checkb").click();
  }
});

*/

function toggleSwitch(event) {
  // console.log(event.keyCode)

  if (event.keyCode === 112) {
    document.getElementById("checkb").click()

  }

}

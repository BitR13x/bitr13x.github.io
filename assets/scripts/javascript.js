function darkmode() {
    var element = document.body;
    element.classList.toggle("white-mode");
    console.log(element.className)



    /*
    cookiearray = allcookies.split(';')

    for(var i=0; i<cookiearray.length; i++) {
       name = cookiearray[i].split('=')[0];
       value = cookiearray[i].split('=')[1];
       document.write ("Key is : " + name + " and Value is : " + value);
    }
    */




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


function toggleSwitch(event) {
  // console.log(event.keyCode)

  if (event.keyCode === 112) {
    document.getElementById("checkb").click()

  }

}

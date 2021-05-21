function cookies() {
  if (document.cookie) {
    document.getElementById("checkb").click()
  }

  var now = new Date()
  var cookieExpire = now.toUTCString()

  var time = new Date()
  time.setDate(time.getDate() + 2)
  var cookieTime = time.toUTCString()



  if (element.className == "white-mode") {
    document.cookie = "theme=white; expires=Thu, 18 Dec 2013 12:00:00 UTC;"
    document.cookie = "theme=dark; expires=" + cookieTime + ";"
    console.log(document.cookie)
  } else if (element.className != "white-mode") {
    document.cookie = "theme=dark; expires=Thu, 18 Dec 2013 12:00:00 UTC;"
    document.cookie = "theme=white; expires=" + cookieTime + ";"
    console.log(document.cookie)
  }
}


let tg = window.Telegram.WebApp;
let bay = document.getElementById("send")
let username = document.getElementById("user_name")


console.log(username.value)
bay.addEventListener("click", () => {
    document.getElementById("form").style.display = "block"
    console.log("test")
})
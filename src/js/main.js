
let tg = window.Telegram.WebApp;
let order = document.getElementById("order")
tg.expand()


let initdata = tg.initData
let dataunsave = tg.initDataUnsafe

order.addEventListener("click", () => {

    console.log("Init data above")
    let count = document.getElementById("count").value
    let code = document.getElementById("code").value
    let data = {
        count: count,
        code: code
    }
    tg.sendData(JSON.stringify(data))
    tg.close()
})

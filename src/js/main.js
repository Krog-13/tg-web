
let tg = window.Telegram.WebApp;
let order = document.getElementById("order")
tg.expand()


let initdata = tg.initData
let dataunsave = tg.initDataUnsafe

order.addEventListener("click", () => {

    console.log("Init data above")
    let price = document.getElementById("price").value
    let code = document.getElementById("code").value
    let data = {
        price: price,
        code: code
    }
    tg.sendData(JSON.stringify(data))
    tg.close()
})

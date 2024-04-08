const config = [
    {
        productID: 101,
        name: "Egor",
        price: 300,
        image_src: "src/images/pic0.jpg"
    },
    {
        productID: 102,
        name: "Ulyana",
        price: 1_000,
        image_src: "src/images/pic1.jpg"
    },
    {
        productID: 103,
        name: "Новогодняя Мегумин!",
        price: 150_000,
        image_src: "src/images/pic2.jpg"
    },
    {
        productID: 104,
        name: "Андроид!",
        price: 100,
        image_src: "src/images/pic5.jpg"
    },
    {
        productID: 105,
        name: "Лекции по физике",
        price: 20,
        image_src: "src/images/pic4.jpg"
    },
    {
        productID: 106,
        name: "Забыл что тут должно быть",
        price: 1_234,
        image_src: "src/images/pic3.jpg"
    }
    
];

;

let map = {}
let cart = []

function updateCartTotal(priceChange) {
    cartSumSpan = document.getElementById('cartSum');
    let cartTotal = parseInt(cartSumSpan.textContent);
    cartTotal += priceChange;
    cartSumSpan.innerText = cartTotal;
}

function changeSelectedItem(ProductIndex){
    let selectedItemNameElement = document.getElementById("selectedItemName");
    let selectedItemPricelement = document.getElementById("selectedItemPrice");
    let selectedItemImageElement = document.getElementById("selectedItemImage");

    selectedItemNameElement.textContent = config[ProductIndex].name;
    selectedItemPricelement.textContent = config[ProductIndex].price;
    selectedItemImageElement.src = config[ProductIndex].image_src;
}

let catalogueDiv = document.getElementsByClassName("catalogue")[0];

for (let i = 0; i < config.length; i++) {
    const item = config[i];
    console.log(`Name: ${item.name}, Price: ${item.price}`);

    map[item.productID] = i;
    cart.push({
        productID: item.productID,
        quantity: 0
    });

    var itemDiv = document.createElement('div');
    itemDiv.className = "item";
    itemDiv.innerHTML = `
        <img src="${item.image_src}">
        <p> ${item.name} </p>
        <span> ${item.price} тг </span>
        <p style="vertical-align: bottom;">
            
            В Корзине: <span id="quantity-${item.productID}"> 0 </span> 
            
        </p>
        <button class="removeButton" data-id="${item.productID}"> - </button> 
        <button class="addButton" data-id="${item.productID}"> + </button>
    `;

    let removeButton = itemDiv.querySelector('.removeButton');
    let addButton = itemDiv.querySelector('.addButton');

    addButton.addEventListener('click', function(){
        const productId = this.getAttribute('data-id');
        const index = map[productId];
        cart[index].quantity++;
        document.getElementById(`quantity-${productId}`).innerText = cart[index].quantity;
        updateCartTotal(item.price);
        UpdateCartTable()
    });

    removeButton.addEventListener('click', function(){
        const productId = this.getAttribute('data-id');
        const index = map[productId];
        if (cart[index].quantity > 0) {
            cart[index].quantity--;
            document.getElementById(`quantity-${productId}`).innerText = cart[index].quantity;
            updateCartTotal(-item.price);
            UpdateCartTable()
        }
    });

    catalogueDiv.appendChild(itemDiv);
}


//image_src = "assets/images/dendi/pic1.jpg";
let tg = window.Telegram.WebApp;
let buy = document.getElementById("buy")
let order = document.getElementById("order")
tg.expand()

/*
buy.addEventListener("click", () => {
    document.getElementById("main").style.display = "none"
    document.getElementById("form").style.display = "block"
    document.getElementById("address").value = "Leepstick"
    document.getElementById("myname").value = "Test"
});
*/

let initdata = tg.initData
let dataunsave = tg.initDataUnsafe

let cartButton = document.getElementsByClassName("cartButton")[0];

cartButton.addEventListener("click", function(){
    console.log("Init data above")
    console.log(initdata)
    console.log(dataunsave)
    console.log(dataunsave.user)
    /*
    let address = document.getElementById("address").value
    let price = document.getElementById("price").value
    let code = document.getElementById("code").value
    console.log(address)
    
    let data = {
        address: address,
        query_id: tg.initDataUnsafe.query_id,
        price: price,
        code: code
    }
    */

    data = cart; 
    console.log(data);

    tg.sendData(JSON.stringify(data))
    tg.close()
    
    /*
    document.getElementById("shop").style.display = 'none';

    cart.forEach(cartItem => {
        const product = config.find(product => product.productID === cartItem.productID);
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cartItem';
        itemDiv.innerHTML = `
            <img src="${product.image_src}" alt="${product.name}">
            <p>${product.name}</p>
            <p>Цена: ${product.price} тг</p>
            <p>Количество: ${cartItem.quantity}</p>
        `;
        cartContent.appendChild(itemDiv);
    });
    */
    
});

function UpdateCartTable(){
    const cartContent = document.querySelector('#cartContent tbody');
    cartContent.innerHTML = "";

    cart.forEach(cartItem => {
        const product = config.find(product => product.productID === cartItem.productID);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price} тг</td>
            <td>${cartItem.quantity}</td>
            <td>${product.price * cartItem.quantity} тг</td>
        `;
        cartContent.appendChild(row);
    });

    const cartTotal = cart.reduce((total, cartItem) => {
        const product = config.find(product => product.productID === cartItem.productID);
        return total + (product.price * cartItem.quantity);
    }, 0);
    document.getElementById('cartTotal').textContent = cartTotal + ' тг';
};

UpdateCartTable()
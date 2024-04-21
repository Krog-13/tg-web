/*
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
*/

let fetchedFileData;

function updateProducts(){
    let url = 'https://krog-dev.kz/product'
    const options = {
        method: 'GET', // Change method to GET
        headers: {
          // Add any headers you need
        },
      };

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response body as JSON
      })
      .then(data => {
        // Handle the response data here
        fetchedFileData = data;
        console.log(data);
      })
      .catch(error => {
        // Handle errors here
        console.error('There was a problem with the fetch operation:', error);
      });
}
updateProducts();
/*
fetchedFileData = {
    "products": [
        {
            "name": "iphone",
            "auction": true,
            "description": "Information about product something",
            "models": [
                {
                    "model": "11",
                    "photo_path": "bot/static/media/iphone11.jpg",
                    "price": 12000.0,
                    "id": 1
                },
                {
                    "model": "12",
                    "photo_path": "bot/static/media/optical.jpg",
                    "price": 4000.0,
                    "id": 4
                }
            ]
        },
        {
            "name": "mouse",
            "auction": false,
            "description": "Information about product something",
            "models": [
                {
                    "model": "optical",
                    "photo_path": "bot/static/media/optical.jpg",
                    "price": 4000.0,
                    "id": 2
                },
                {
                    "model": "wired",
                    "photo_path": "bot/static/media/iphone11.jpg",
                    "price": 12000.0,
                    "id": 3
                }
            ]
        }
    ]
}
*/

let config = [];

for(let i = 0; i < fetchedFileData['products'].length; i++){
    let rootItem = fetchedFileData['products'][i];

    for(let j = 0; j < rootItem['models'].length; j++){
        curModel = rootItem['models'][j];   
        let item = {
            productID: curModel['id'],
            name: curModel['model'],
            price: curModel['price'],
            image_src: curModel['photo_path']
        }
        config.push(item)
    }
}

console.log(config);

function hideElement(element) {
    if (element) {
        element.style.display = "none";
    } else {
        console.error("Element is null or undefined.");
    }
}

function showElement(element) {
    if (element) {
        element.style.display = "block";
    } else {
        console.error("Element is null or undefined.");
    }
}

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

function updateShowcaseSumSpan(price, quantity){
    showcaseSumSpan = document.getElementById("showcaseSumSpan");

    showcaseSumSpan.textContent = (price * quantity);
}

let catalogueDiv = document.getElementsByClassName("catalogue")[0];

function catalogueDivAddItem(item, i){
    console.log(`Name: ${item.name}, Price: ${item.price}`);

    map[item.productID] = i;
    cart.push({
        productID: item.productID,
        quantity: 0
    });

    var itemDiv = document.createElement('div');
    
    //itemDiv.setAttribute("data-id", item.productID);
    itemDiv.className = "item";
    itemDiv.innerHTML = `
        <img src="${item.image_src}" class="imgButton" data-id="${item.productID}">
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
    let imgButton = itemDiv.querySelector('.imgButton');

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

    imgButton.addEventListener('click', function(){
        hideElement(document.getElementById("mainshop"));
        hideElement(document.getElementById("cartButton"));
        showElement(document.getElementById("showcase"));
        showElement(document.getElementById("showcaseAddToCartButton"));

        const productId = this.getAttribute('data-id');
        const index = map[productId];
        let showcaseTitle = document.getElementById('showcaseTitleH1');
        showcaseTitle.textContent = config[index].name;
        let showcaseImage = document.getElementById('showcaseImage');
        showcaseImage.src = config[index].image_src;
        let showcaseDescription = document.getElementById('showcaseDescription');
        //showcaseDescription.src = config[index].name;
        showcaseDescription.src = "Опсание товара";
        let showcaseRemoveButton = document.getElementById('showcaseRemoveButton');
        showcaseRemoveButton.setAttribute("data-id", item.productID);
        //showcaseRemoveButton.removeEventListener("click");
        let showcaseAddButton = document.getElementById('showcaseAddButton');
        showcaseAddButton.setAttribute("data-id", item.productID);

        showcaseAddToCartButton.setAttribute("data-id", item.productID);
        //showcaseAddButton.removeEventListener("click");
    });

    catalogueDiv.appendChild(itemDiv);
}

for (let i = 0; i < config.length; i++) {
    const item = config[i];
    catalogueDivAddItem(item, i);
}

/*
console.log(fetchedFileData['products'].length);

for (let i = 0; i < fetchedFileData['products'].length; i++) {
    const curProduct = fetchedFileData['products'][i];
    const item = {
        productID: curProduct['models'][0].id,
        name: curProduct.name,
        price: curProduct['models'][0].price,
        image_src: curProduct['models'][0].photo_path
    };
    console.log(item);
    catalogueDivAddItem(item, i);
}

const config = [
    {
        productID: 101,
        name: "Egor",
        price: 300,
        image_src: "src/images/pic0.jpg"
    }
]

for (let i = 0; i < config.length; i++) {
    const item = config[i];
    
}
*/


document.getElementById('showcaseRemoveButton').addEventListener('click', function(){
    showcaseQuantitySpan = document.getElementById("showcaseQuantitySpan");
    let q = parseInt(showcaseQuantitySpan.textContent);
    if(q <= 0) q = 0; else q--;
    showcaseQuantitySpan.textContent = q;        

    const productId = this.getAttribute('data-id');
    const index = map[productId];
    document.getElementById('showcaseAddToCartButton').setAttribute("data-q", q);
    updateShowcaseSumSpan(config[index].price, q);
});

document.getElementById('showcaseAddButton').addEventListener('click', function(){
    showcaseQuantitySpan = document.getElementById("showcaseQuantitySpan");
    let q = parseInt(showcaseQuantitySpan.textContent);
    q++;
    showcaseQuantitySpan.textContent = q;

    const productId = this.getAttribute('data-id');
    const index = map[productId];
    updateShowcaseSumSpan(config[index].price, q);
    document.getElementById('showcaseAddToCartButton').setAttribute("data-q", q);
});

function backToShopMethod(){
    hideElement(document.getElementById("cartDiv"));
    hideElement(document.getElementById("showcase"));
    showElement(document.getElementById("mainshop"));
    showElement(document.getElementById("cartButton"));
    hideElement(document.getElementById("showcaseAddToCartButton"));

    document.getElementById('showcaseAddToCartButton').setAttribute("data-id", -1);
    document.getElementById('showcaseAddToCartButton').setAttribute("data-q", -1);

    updateShowcaseSumSpan(0, 0);
    document.getElementById("showcaseQuantitySpan").textContent = 0;
}

document.getElementById('showcaseAddToCartButton').addEventListener('click', function(){
    const productId = this.getAttribute('data-id');
    const index = map[productId];
    const q = this.getAttribute('data-q');
    cart[index].quantity = parseInt(cart[index].quantity) + parseInt(q);
    //console.log(cart);
    backToShopMethod();
    UpdateCartTable();
});

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

let initdata = tg.initData;
let dataunsave = tg.initDataUnsafe;

let orderButton = document.getElementById("orderButton");

orderButton.addEventListener("click", function(){
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

//document.getElementById("registrationFormButton").addEventListener("submit", orderButton);


function UpdateCartTable(){
    const cartContent = document.querySelector('#cartContent tbody');
    cartContent.innerHTML = "";
    let cartDiv = document.getElementById("cartDiv");
    //cartDiv.innerHTML = "<h1>Ваш заказ:</h1>";
    cartDiv.innerHTML = `
<div id="cartDivTitle">
    <button style="font-size: 20px;" id="cartBackToShopButton">&#129044;</button>
    <h1 id="cartTitleH1"> Ваш заказ: </h1>
</div>
`;
    /*
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
    */

    if(cart.some(cartItem => cartItem.quantity !== 0)){
        cart.forEach(cartItem => {
            //const product = config.find(product => product.productID === cartItem.productID);
            const product = config.find(product => product.productID === cartItem.productID);
            const cartItemDiv = document.createElement('div');

            if(cartItem.quantity === 0){
                return;
            }

            cartItemDiv.className = "cart-item";
            cartItemDiv.innerHTML = `
                <img src="${product.image_src}" alt="Товар">
                <div class="item-details">
                    <h3>${product.name}</h3>
                    <p>${product.price} тг</p>
                </div>
                <div class="quantity-control">
                    <button class="removeButton" data-id="${product.productID}">-</button>
                    <span>${cartItem.quantity}</span>
                    <button class="addButton" data-id="${product.productID}">+</button>
                </div>
            `;
            
            let removeButton = cartItemDiv.querySelector('.removeButton');
            let addButton = cartItemDiv.querySelector('.addButton');
        
            addButton.addEventListener('click', function(){
                const productId = this.getAttribute('data-id');
                const index = map[productId];
                cart[index].quantity++;
                document.getElementById(`quantity-${productId}`).innerText = cart[index].quantity;
                updateCartTotal(product.price);
                UpdateCartTable()
            });
        
            removeButton.addEventListener('click', function(){
                const productId = this.getAttribute('data-id');
                const index = map[productId];
                if (cart[index].quantity > 0) {
                    cart[index].quantity--;
                    document.getElementById(`quantity-${productId}`).innerText = cart[index].quantity;
                    updateCartTotal(- product.price);
                    UpdateCartTable()
                }
            });
            cartDiv.appendChild(cartItemDiv);
        });
    }
    else{
        let asdf = document.createElement('h2');
        asdf.textContent = "В корзине ничего нет!";
        cartDiv.appendChild(asdf);
    }

    document.getElementById("cartBackToShopButton").addEventListener('click', function(){
        hideElement(document.getElementById("cartDiv"));
        hideElement(document.getElementById("showcase"));
        showElement(document.getElementById("mainshop"));
        showElement(document.getElementById("cartButton"));
        hideElement(document.getElementById("orderButton"));
    });

    const cartTotal = cart.reduce((total, cartItem) => {
        const product = config.find(product => product.productID === cartItem.productID);
        return total + (product.price * cartItem.quantity);
    }, 0);

    //console.log(cartTotal);
    document.getElementById('cartTotal').textContent = cartTotal + ' тг';
    document.getElementById('cartSum').textContent = cartTotal;
};

document.getElementById("showcaseBackToShopButton").addEventListener('click', backToShopMethod);

document.getElementById("cartButton").addEventListener('click', function(){
    hideElement(document.getElementById("showcase"));;
    showElement(document.getElementById("cartDiv"));
    hideElement(document.getElementById("mainshop"));
    hideElement(document.getElementById("cartButton"));
    showElement(document.getElementById("orderButton"));

    document.getElementById("orderSum").textContent = parseInt(document.getElementById("cartSum").textContent);

});

UpdateCartTable()

hideElement(document.getElementById("showcase"));
hideElement(document.getElementById("cartDiv"));
hideElement(document.getElementById("showcaseAddToCartButton"));
hideElement(document.getElementById("OrderInformationDiv"));
//hideElement(document.getElementById("mainshop"));
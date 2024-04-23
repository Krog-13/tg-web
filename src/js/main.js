/*
const config = [
    {
        productID: 101,
        name: "Egor",
        price: 300,
        image_src: "pic0.jpg"
    },
    {
        productID: 102,
        name: "Ulyana",
        price: 1_000,
        image_src: "pic1.jpg"
    },
    {
        productID: 103,
        name: "Новогодняя Мегумин!",
        price: 150_000,
        image_src: "pic2.jpg"
    },
    {
        productID: 104,
        name: "Андроид!",
        price: 100,
        image_src: "pic5.jpg"
    },
    {
        productID: 105,
        name: "Лекции по физике",
        price: 20,
        image_src: "pic4.jpg"
    },
    {
        productID: 106,
        name: "Забыл что тут должно быть",
        price: 1_234,
        image_src: "pic3.jpg"
    }  
];
*/

ManualfetchedFileData = {
    "products": [
        {
            "name": "Human",
            "auction": true,
            "description": "Couple of persons, to chose",
            "models": [
                {
                    "model": "egor",
                    "photo_path": "pic0.jpg",
                    "price": 12000.0,
                    "id": 101
                },
                {
                    "model": "Ulyana",
                    "photo_path": "pic1.jpg",
                    "price": 4000.0,
                    "id": 102
                },
                {
                    "model": "Megumin",
                    "photo_path": "pic2.jpg",
                    "price": 8000.0,
                    "id": 103
                }
            ]
        },
        {
            "name": "Mouse",
            "auction": false,
            "description": "Information about product something",
            "models": [
                {
                    "model": "optical",
                    "photo_path": "pic3.jpg",
                    "price": 4000.0,
                    "id": 201
                },
                {
                    "model": "wired",
                    "photo_path": "pic4.jpg",
                    "price": 12000.0,
                    "id": 202
                }
            ]
        }
    ]
}

//ManualfetchedFileData = {"products":[{"name":"iphone","auction":true,"description":"Informationaboutproductsomething","models":[{"model":"11","photo_path":"iphone11.jpg","price":12000.0,"id":1},{"model":"12","photo_path":"optical.jpg","price":4000.0,"id":4}]},{"name":"mouse","auction":false,"description":"Informationaboutproductsomething","models":[{"model":"optical","photo_path":"optical.jpg","price":4000.0,"id":2},{"model":"wired","photo_path":"iphone11.jpg","price":12000.0,"id":3}]}]};

let map = {} // ProductID to config index 
let cnt = 0; // counter for map
let cart = [] // cart that will be sended to the server (purchase info only)
let config = []; // config data of items for showcase

let fetchedFileData = {"products": []};  // Data that we get

let catalogueDiv = document.getElementsByClassName("catalogue")[0];
let orderButton = document.getElementById("orderButton");
let registrationFormButton = document.getElementById("registrationFormButton");
let showcaseDiv = document.getElementById("showcase");
//let buy = document.getElementById("buy")
//let order = document.getElementById("order")
let tg = window.Telegram.WebApp;
let initdata = tg.initData;
let dataunsave = tg.initDataUnsafe;
tg.expand();

function hideElement(element) {
    if (element) {
        element.style.display = "none";
    } else {
        console.error("Element is null or undefined.");
    }
}

function catalogueDivAddItem(item){
    /*item = {
        productID: 101,
        name: "Egor",
        price: 300,
        image_src: "pic0.jpg"
    },*/

    //console.log(`Name: ${item.name}, Price: ${item.price}`);

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

    hideElement(addButton);
    hideElement(removeButton);

    imgButton.addEventListener('click', function(){
        hideElement(document.getElementById("mainshop"));
        hideElement(document.getElementById("cartButton"));
        showElement(document.getElementById("showcase"));
        showElement(document.getElementById("showcaseAddToCartButton"));

        const productId = this.getAttribute('data-id');

        showcaseDiv.setAttribute("productId", productId);
        updateShowcase();
    });

    catalogueDiv.appendChild(itemDiv);
}

function getData(){
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
            constractConfig(data);
            console.log(data);
        })
        .catch(error => {
            // Handle errors here
            constractConfig(ManualfetchedFileData);
            console.error('There was a problem with the fetch operation:', error);
        });
}

function constractConfig(data){
    fetchedFileData = data;
    console.log(fetchedFileData);

    for(let i = 0; i < fetchedFileData['products'].length; i++){
        let rootItem = fetchedFileData['products'][i];
    
        for(let j = 0; j < rootItem['models'].length; j++){            
            curModel = rootItem['models'][j];
            let item = {
                productID: curModel['id'],
                rootIndex: i,
                name: rootItem['name'],
                model: curModel['model'],
                price: curModel['price'],
                image_src: 'src/images/' + curModel['photo_path'],
                description: rootItem['description']
            }
            
            console.log(item.image_src);

            map[item.productID] = cnt;
            cnt++;
            cart.push({
                productID: item.productID,
                quantity: 0
            });

            config.push(item)
        }
        catalogueDivAddItem({ // only roots in catalogue
            productID: rootItem['models'][0]['id'],
            name: rootItem['name'],
            //model: curModel['model'], it should not be here
            price: rootItem['models'][0]['price'], // here should be minimum of all models and '+'
            image_src: 'src/images/' + rootItem['models'][0]['photo_path'],// path of first
            //description: rootItem['description']// useless for catalogue
        });
    }
    /*
    for (let i = 0; i < config.length; i++) {
        const item = config[i];
        catalogueDivAddItem(item);
    }
    */
    console.log(config);   
}

function updateCartTotal(priceChange) {
    cartSumSpan = document.getElementById('cartSum');
    let cartTotal = parseInt(cartSumSpan.textContent);
    cartTotal += priceChange;
    cartSumSpan.innerText = cartTotal;
    document.getElementById("orderSum").textContent = cartTotal;
}

function changeSelectedItem(ProductIndex){
    let selectedItemNameElement = document.getElementById("selectedItemName");
    let selectedItemPricelement = document.getElementById("selectedItemPrice");
    let selectedItemImageElement = document.getElementById("selectedItemImage");

    selectedItemNameElement.textContent = config[ProductIndex].name;
    selectedItemPricelement.textContent = config[ProductIndex].price;
    selectedItemImageElement.src = config[ProductIndex].image_src;
}

function showElement(element) {
    if (element) {
        element.style.display = "block";
    } else {
        console.error("Element is null or undefined.");
    }
}

function updateShowcaseModelButtons(rootIndex){
    console.log(rootIndex);
    showcaseModelContainer = document.getElementById("showcaseModelContainer");
    showcaseModelContainer.innerHTML = '';
    const curModels = fetchedFileData['products'][rootIndex]['models'];
    console.log(curModels);
    for(let i = 0; i < curModels.length; i++){
        let curModelButton = document.createElement('button');
        curModelButton.textContent = curModels[i]['model'];
        curModelButton.setAttribute("productId", curModels[i].id);

        curModelButton.addEventListener('click', function(){
            showcaseDiv.setAttribute("productId", this.getAttribute('productId'));
            updateShowcase();
        });
        
        showcaseModelContainer.appendChild(curModelButton);
    }
}

function updateShowcase(productId){
    //showcaseDiv.setAttribute("productId", item.productID);
    productId = showcaseDiv.getAttribute('productId');
    const index = map[productId];
    console.log(config[index]);

    updateShowcaseSumSpan(0, 0);
    document.getElementById("showcaseQuantitySpan").textContent = 0;
    
    let showcaseTitle = document.getElementById('showcaseTitleH1');
    let showcaseImage = document.getElementById('showcaseImage');
    let showcaseDescription = document.getElementById('showcaseDescription');
    let showcaseRemoveButton = document.getElementById('showcaseRemoveButton');
    let showcaseAddButton = document.getElementById('showcaseAddButton');
    let showcaseAddToCartButton = document.getElementById('showcaseAddToCartButton');

    showcaseTitle.textContent = config[index].name + ' ' +  config[index].model ;
    showcaseImage.src = config[index].image_src;
    showcaseDescription.textContent = config[index].description;

    showcaseRemoveButton.setAttribute("data-id", config[index].productId);
    showcaseAddButton.setAttribute("data-id", config[index].productID);
    showcaseAddToCartButton.setAttribute("data-id", config[index].productID);

    updateShowcaseModelButtons(config[index].rootIndex);
}

function updateShowcaseSumSpan(price, quantity){
    showcaseSumSpan = document.getElementById("showcaseSumSpan");

    showcaseSumSpan.textContent = (price * quantity);
}

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

    document.getElementById('showcaseAddToCartButton').setAttribute("data-id", 0);
    document.getElementById('showcaseAddToCartButton').setAttribute("data-q", 0);

    //updateShowcaseSumSpan(0, 0);
    document.getElementById("showcaseQuantitySpan").textContent = 0;
}

function backToCartMethod(){
    showlement(document.getElementById("cartDiv"));
    showElement(document.getElementById("registrationFormButton "));
    hideElement(document.getElementById("showcase"));
    hideElement(document.getElementById("mainshop"));
    hideElement(document.getElementById("cartButton"));
    hideElement(document.getElementById("showcaseAddToCartButton"));

    document.getElementById('showcaseAddToCartButton').setAttribute("data-id", 0);
    document.getElementById('showcaseAddToCartButton').setAttribute("data-q", 0);

    //updateShowcaseSumSpan(0, 0);
    document.getElementById("showcaseQuantitySpan").textContent = 0;
}

registrationFormButton.addEventListener('click', function(){
    hideElement(document.getElementById("showcase"));
    hideElement(document.getElementById("cartDiv"));
    hideElement(document.getElementById("showcaseAddToCartButton"));
    hideElement(document.getElementById("mainshop"));
    hideElement(document.getElementById("cartButton"));
    hideElement(document.getElementById("showcaseAddToCartButton"));
    hideElement(document.getElementById("registrationFormButton"));
    
    showElement(document.getElementById("orderButton"));
    showElement(document.getElementById("OrderInformationDiv"));
});

document.getElementById("registrationFormBackToShopButton").addEventListener('click', function(){
    hideElement(document.getElementById("showcase"));
    hideElement(document.getElementById("showcaseAddToCartButton"));
    hideElement(document.getElementById("mainshop"));
    hideElement(document.getElementById("cartButton"));
    hideElement(document.getElementById("showcaseAddToCartButton"));
    
    hideElement(document.getElementById("orderButton"));
    hideElement(document.getElementById("OrderInformationDiv"));

    showElement(document.getElementById("registrationFormButton"));
    showElement(document.getElementById("cartDiv"));
});

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

/*
buy.addEventListener("click", () => {
    document.getElementById("main").style.display = "none"
    document.getElementById("form").style.display = "block"
    document.getElementById("address").value = "Leepstick"
    document.getElementById("myname").value = "Test"
});
*/

orderButton.addEventListener("click", function(){



    var questionDivs = document.getElementsByClassName('questionInput');
    //var inputData = [];
    //for (var i = 0; i < questionDivs.length; i++) {
        //inputData.push(questionDivs[i].value);
        //console.log(questionDivs[i].value);
    //}

    // type of delivery 
    /*
        0 name  
        1 phone
        2 city 
        3 postal code
        4 adress
        5 comment
    */

    user_data = {
        "delivery_type": "PlaceHolder",
        "name" : questionDivs[0].value,
        "phone" : questionDivs[1].value,
        "city" : questionDivs[2].value,
        "postal_code" : questionDivs[3].value,
        "adress" : questionDivs[4].value,
        "comment" : questionDivs[5].value
    };

    console.log("Init data above")
    console.log(initdata)
    console.log(dataunsave)
    console.log(dataunsave.user)
    /*
test_data = {"data": [{"modelID": 1, "quantity": 1}, {"modelID": 2, "quantity": 2}],
                "address": 
                {"username":"Krog",

            "phone":"874720284373", 
            "city": "astana", 
            "post_index": "00001",
            "address": "st. Byqar ZHiray apt 45", 
            "comment": "Don not work homephone", 
            "deliver": true}}

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

    data = {cart, user_data}; 
    console.log(data);

    tg.sendData(JSON.stringify(data))
    tg.close()
    
    //alert(data);
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
                    <h3>${product.name} ${product.model}</h3>
                    <p>${product.price} тг</p>
                </div>
                <div class="quantity-control">
                    <button class="clearButton" data-id="${product.productID}"> Удалить </button>
                    <button class="removeButton" data-id="${product.productID}">-</button>
                    <span id="quantity-${product.productID}">${cartItem.quantity}</span>
                    <button class="addButton" data-id="${product.productID}">+</button>
                </div>
            `;
            
            let removeButton = cartItemDiv.querySelector('.removeButton');
            let addButton = cartItemDiv.querySelector('.addButton');
            let clearButton = cartItemDiv.querySelector('.clearButton');
        
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
                UpdateCartTable()
            });

            clearButton.addEventListener('click', function(){
                const productId = this.getAttribute('data-id');
                const index = map[productId];
                let t = cart[index].quantity;
                cart[index].quantity = 0;
                document.getElementById(`quantity-${productId}`).innerText = 0;
                updateCartTotal(- (product.price * t));
                UpdateCartTable()
            
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
        hideElement(document.getElementById("registrationFormButton"));
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
    showElement(document.getElementById("registrationFormButton"));

    document.getElementById("orderSum").textContent = parseInt(document.getElementById("cartSum").textContent);
});

getData();
UpdateCartTable();
hideElement(document.getElementById("showcase"));
hideElement(document.getElementById("cartDiv"));
hideElement(document.getElementById("showcaseAddToCartButton"));
hideElement(document.getElementById("OrderInformationDiv"));
//hideElement(document.getElementById("mainshop"));
//showElement(document.getElementById("registrationFormButton"));
//hideElement(document.getElementById("cartButton"));
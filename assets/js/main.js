ManualfetchedFileData = {
    "products": [
        {
            "name": "Human",
            "auction": true,
            "description": "Couple of persons, to chose",
            "models": [
                {
                    "model": "Eleyna",
                    "photo_path": "pic0.jpg",
                    "price": 12000.0,
                    "id": 101
                },
                {
                    "model": "chel",
                    "photo_path": "pic1.jpg",
                    "price": 4000.0,
                    "id": 102
                },
                {
                    "model": "chel 2",
                    "photo_path": "pic1.jpg",
                    "price": 4000.0,
                    "id": 103
                },
                {
                    "model": "chel 3",
                    "photo_path": "pic1.jpg",
                    "price": 4000.0,
                    "id": 104
                },
                {
                    "model": "chel 4",
                    "photo_path": "pic1.jpg",
                    "price": 4000.0,
                    "id": 105
                },
                {
                    "model": "pepe",
                    "photo_path": "pic2.jpg",
                    "price": 8000.0,
                    "id": 105
                }
            ]
        },
        {
            "name": "Mouse",
            "auction": false,
            "description": "Information about product something",
            "models": [
                {
                    "model": "Cat",
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
        },
        {
            "name": "qwer",
            "auction": true,
            "description": "Information about product something",
            "models": [
                {
                    "model": "Cat",
                    "photo_path": "pic4.jpg",
                    "price": 4300.0,
                    "id": 301
                }
            ]
        },
        {
            "name": "asdf",
            "auction": false,
            "description": "Information about product something",
            "models": [
                {
                    "model": "Cat",
                    "photo_path": "pic5.jpg",
                    "price": 4560.0,
                    "id": 401
                }
            ]
        },
        {
            "name": "zxcv",
            "auction": true,
            "description": "Information about product something",
            "models": [
                {
                    "model": "Cat",
                    "photo_path": "pic6.jpg",
                    "price": 1230.0,
                    "id": 501
                }
            ]
        }
    ]
}

const regions = {
    "Акмолинская область": [
        "Акколь",
        "Атбасар",
        "Ерейментау",
        "Есиль",
        "Кокшетау",
        "Курчатов",
        "Макинск",
        "Степногорск",
        "Степняк",
        "Тайынша",
        "Щучинск"
    ],
    "Актюбинская область": [
        "Алга",
        "Аркалык",
        "Жем",
        "Жетысай",
        "Канская",
        "Каратау",
        "Каркаралинск",
        "Каскелен",
        "Кентау",
        "Лисаковск",
        "Темир",
        "Темиртау",
        "Форт-Шевченко",
        "Шалкар"
    ],
    "Алматинская область": [
        "Есик",
        "Кентау",
        "Курдай",
        "Сарканд",
        "Талгар",
        "Текели",
        "Ушарал",
        "Уштобе"
    ],
    "Атырауская область": [
        "Атырау",
        "Кульсары"
    ],
    "Восточно-Казахстанская область": [
        "Алтай",
        "Зайсан",
        "Риддер",
        "Серебрянск",
        "Шемонаиха"
    ],
    "Жамбылская область": [
        "Жанатас",
        "Жаркент",
        "Жезказган",
        "Каратобе",
        "Курчум",
        "Мерке",
        "Тараз",
        "Улытау",
        "Уштобе",
        "Шу"
    ],
    "Западно-Казахстанская область": [
        "Аксай",
        "Уральск"
    ],
    "Карагандинская область": [
        "Абай",
        "Аркалык",
        "Балхаш",
        "Караганда",
        "Сарань",
        "Саркау",
        "Сатпаев",
        "Шахтинск"
    ],
    "Костанайская область": [
        "Аркалык",
        "Державинск",
        "Лисаковск",
        "Макинск",
        "Рудный",
        "Темир",
        "Темиртау",
        "Тобыл",
        "Токаревка",
        "Шалкар"
    ],
    "Кызылординская область": [
        "Аральск",
        "Байконур",
        "Казалинск",
        "Кызылорда",
        "Мартук",
        "Сырдарья"
    ],
    "Мангистауская область": [
        "Актау",
        "Форт-Шевченко"
    ],
    "Павлодарская область": [
        "Экибастуз",
        "Макинск",
        "Павлодар",
        "Семей"
    ],
    "Северо-Казахстанская область": [
        "Булаево",
        "Лениногорск",
        "Мамлютка",
        "Петропавловск",
        "Сергеевка",
        "Степногорск",
        "Степняк",
        "Тайынша",
        "Тобольск"
    ],
    "Туркестанская область": [
        "Арыс",
        "Арысь",
        "Кентау",
        "Ленгер",
        "Макинск",
        "Сарканд",
        "Сарыагаш",
        "Тараз",
        "Шардара"
    ]
}


let map = {} // ProductID to config index 
let cnt = 0; // counter for map
let cart = [] // cart that will be sended to the server (purchase info only)
let config = []; // config data of items for showcase
let userCity = null;
let userDelivery = true;
let IMAGE_DIR_PATH = 'assets/images/';// 'src/images/'; // not hard to guess


// do we need this? 
let fetchedFileData = {"products": []};  // Data that we get
// I don't really think we do

//let catalogueDiv = document.getElementsByClassName("catalogue")[0];
let catalogueDiv = document.getElementById('catalogue');
let orderButton = document.getElementById("orderButton");
let registrationFormButton = document.getElementById("registrationFormButton");
let showcaseDiv = document.getElementById("showcase");

//let buy = document.getElementById("buy")
//let order = document.getElementById("order")
let tg = window.Telegram.WebApp;
let initdata = tg.initData;
let dataunsave = tg.initDataUnsafe;
tg.expand();

orderButton.addEventListener("click", function(){

    userName = document.getElementById('name').value;
    userPhone = document.getElementById('phone').value;
    userPostalCode = document.getElementById('postalCode').value;
    userAddress = document.getElementById('address').value;
    userNotes = document.getElementById('notes').value;

    address = {
        "deliver": userDelivery,
        "username" : userName,
        "phone" : userPhone,
        "city" : userCity,
        "post_index" : userPostalCode,
        "address" : userAddress,
        "comment" : userNotes
    };

    console.log(address);

    console.log("Init data above");
    console.log(initdata);
    console.log(dataunsave);
    console.log(dataunsave.user);
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

    data = {data: cart, address};
    console.log(data);

    tg.sendData(JSON.stringify(data))
    tg.close()
    
    alert(data);
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

function hideElement(element) {
    if (element) {
        element.style.display = "none";
    } else {
        console.error(`\"${element}\" Element is null or undefined.`);
    }
}

function showElement(element) {
    if (element) {
        element.style.display = "block";
    } else {
        console.error(`\"${element}\" Element is null or undefined.`);
    }
}

function AuctionCatalogueDivAddItem(item){
    /*item = {
        productID: 101,
        name: "Egor",
        price: 300,
        image_src: "pic0.jpg"
    },*/
    /*
                    <div class="swiper-slide">
                        <div class="dz-card-overlay style-1">
                            <div class="dz-media">
                                <a >
                                    <img src="assets/images/featured/pic1.png" alt="image">
                                </a>
                            </div>
                            <div class="dz-info">
                                <h6 class="title"><a href="product-detail.html">Creamy Ice Coffe</a></h6>
                                <ul class="dz-meta">
                                    <li class="dz-price"><sup>$</sup>5.8<del>$9.9</del></li>
                                </ul>
                            </div>
                        </div>
                    </div>
    */
    var AuctionCatalogueDiv = document.getElementById("AuctionCatalogueDiv");
    var itemDiv = document.createElement('div');
    
    //itemDiv.setAttribute("data-id", item.productID);
    itemDiv.className = "swiper-slide";
  
    //console.log(item.image_src);

    itemDiv.innerHTML = `
    <div class="dz-card-overlay style-1">
        <div class="dz-media">
            <a data-id=\"${item.productID}\" class="imgButton">
                <img src=\"${item.image_src}\" alt="image">
            </a>
        </div>
        <div class="dz-info">
            <h6 class="title"><a data-id="${item.productID}">${item.name}</a></h6>
            <ul class="dz-meta">
                <li class="dz-price">${item.price}<sub>тг</sub></li>
            </ul>
        </div>
    </div>
    `;
    let imgButton = itemDiv.querySelector('.imgButton');

    imgButton.addEventListener('click', function(){
        hideElement(document.getElementById("mainshop"));
        //hideElement(document.getElementById("cartButton"));
        showElement(document.getElementById("showcase"));
        //showElement(document.getElementById("showcaseAddToCartButton"));

        const productId = this.getAttribute('data-id');

        showcaseDiv.setAttribute("productId", productId);
        updateShowcase();
    });
    /*
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

    //hideElement(addButton);
    //hideElement(removeButton);
    */
    AuctionCatalogueDiv.appendChild(itemDiv);
}

function catalogueDivAddItem(item){
    /*item = {
        productID: 101,
        name: "Egor",
        price: 300,
        image_src: "pic0.jpg"
    },*/

    //console.log(`Name: ${item.name}, Price: ${item.price}`);

    var itemDiv = document.createElement('li');
    
    //itemDiv.setAttribute("data-id", item.productID);
    itemDiv.className = "item";
  
    //console.log(item.image_src);

    itemDiv.innerHTML = `
    <li>
        <div class="dz-card list">
            <div class="dz-media">
                <a class="imgButton" data-id=\"${item.productID}\"><img src=\"${item.image_src}\" alt=""></a>
            </div>
            <div class="dz-content">
                <div class="dz-head">
                    <h6 class="title"><a class="imgButton">${item.name}</a></h6>
                </div>
                <ul class="dz-meta">
                    <li class="dz-price flex-1">${item.price} <sub>тг</sub></li>
                    <li class="dz-pts">50 Pts</li>
                </ul>
            </div>
        </div>
    </li>
    `;

    if(item.auction){
        var specDiv = document.createElement('div');
        specDiv.className = "dz-rating";
        specDiv.innerHTML = "<i class=\"fa fa-star\"></i>Акция!";
        itemDiv.querySelector('.dz-media').appendChild(specDiv);
    }
    
    let imgButtons = itemDiv.getElementsByClassName("imgButton");

    for (let i = 0; i < imgButtons.length; i++) {
        imgButtons[i].addEventListener('click', function(){
            hideElement(document.getElementById("mainshop"));
            //hideElement(document.getElementById("cartButton"));
            showElement(document.getElementById("showcase"));
            //showElement(document.getElementById("showcaseAddToCartButton"));
            const productId = this.getAttribute('data-id');
            showcaseDiv.setAttribute("productId", productId);
            updateShowcase();
        });
    }
    /*
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

    //hideElement(addButton);
    //hideElement(removeButton);

    imgButton.addEventListener('click', function(){
        hideElement(document.getElementById("mainshop"));
        hideElement(document.getElementById("cartButton"));
        showElement(document.getElementById("showcase"));
        showElement(document.getElementById("showcaseAddToCartButton"));

        const productId = this.getAttribute('data-id');

        showcaseDiv.setAttribute("productId", productId);
        updateShowcase();
    });
    */
    catalogueDiv.appendChild(itemDiv);
}

function constructConfig(data){
    fetchedFileData = data;
    // lmao logging same thing just couples of lines below
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
                image_src: IMAGE_DIR_PATH + curModel['photo_path'],
                description: rootItem['description'],
                auction: rootItem['auction']
            }
            
            //console.log(item.image_src);

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
            image_src: IMAGE_DIR_PATH + rootItem['models'][0]['photo_path'],// path of first
            auction: rootItem["auction"],
            //description: rootItem['description']// useless for catalogue
        });
        if(rootItem["auction"]){
            AuctionCatalogueDivAddItem({ // only roots in catalogue
                productID: rootItem['models'][0]['id'],
                name: rootItem['name'],
                //model: curModel['model'], it should not be here
                price: rootItem['models'][0]['price'], // here should be minimum of all models and '+'
                image_src: IMAGE_DIR_PATH + rootItem['models'][0]['photo_path'],// path of first
                auction: rootItem["auction"],
                //description: rootItem['description']// useless for catalogue
            });
        }
    }
    /*
    for (let i = 0; i < config.length; i++) {
        const item = config[i];
        catalogueDivAddItem(item);
    }
    */
    //console.log(config);   
}

function getData(){
    let url = 'https://krog-dev.kz/product'
    const options = {
        method: 'GET',
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
            constructConfig(data);
            //console.log(data);
            // Do we need to see it? nope
        })
        .catch(error => {
            // Handle errors here
            constructConfig(ManualfetchedFileData);
            console.error('There was a problem with the fetch operation:', error);
        });
}

function updateShowcaseSumSpan(price, quantity){
    showcaseSumSpan = document.getElementById("showcaseSumSpan");
    showcaseSumSpan.textContent = (price * quantity);
    //console.log(price * quantity);
}

/*
function updateShowcaseModelButtons(rootIndex){
    //console.log(rootIndex);
    showcaseModelContainer = document.getElementById("showcaseModelContainer");
    showcaseModelContainer.innerHTML = '';
    const curModels = fetchedFileData['products'][rootIndex]['models'];
    //console.log(curModels);
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
*/
function updateShowcase(){
    //showcaseDiv.setAttribute("productId", item.productID);
    productId = parseInt(showcaseDiv.getAttribute('productId'));
    const index = map[productId];

    updateShowcaseSumSpan(0, 0);
    document.getElementById("showcaseQuantityInput").value = 0;
    
    let showcaseTitle = document.getElementById('showcaseTitleH1');
    let showcaseImage = document.getElementById('showcaseImage');
    let showcaseDescription = document.getElementById('showcaseDescription');
    //let showcaseRemoveButton = document.getElementById('showcaseRemoveButton');
    //let showcaseAddButton = document.getElementById('showcaseAddButton');
    let showcaseAddToCartButton = document.getElementById('showcaseAddToCartButton');
    let showcasePriceSpan = document.getElementById("showcasePriceSpan");

    if(config[index]['auction']){
        showElement(document.getElementById("showcaseAuсtionDiv"));
    }
    else{
        hideElement(document.getElementById("showcaseAuсtionDiv"));
    }

    showcaseTitle.textContent = config[index].name + ' ' +  config[index].model ;
    showcaseImage.src = config[index].image_src;
    showcaseDescription.textContent = config[index].description;
    showcasePriceSpan.textContent = config[index].price;

    //showcaseRemoveButton.setAttribute("data-id", config[index].productID);
    //showcaseAddButton.setAttribute("data-id", config[index].productID);
    showcaseAddToCartButton.setAttribute("data-id", config[index].productID);

    //updateShowcaseModelButtons(config[index].rootIndex);
}

document.querySelector('#showcaseBackButton').addEventListener('click', function(){
    showElement(document.getElementById("mainshop"));
    hideElement(document.getElementById("showcase"));
});

document.getElementById("showcaseuQantityDiv").addEventListener('click', function(){
    let q = document.getElementById("showcaseQuantityInput").value;
    productId = parseInt(showcaseDiv.getAttribute('productId'));
    const index = map[productId];
    updateShowcaseSumSpan(config[index].price, q);
});

function updateCartTotal(priceChange) {
    cartSumSpan = document.getElementById('cartTotal');
    let cartTotal = parseInt(cartSumSpan.textContent);
    cartTotal += priceChange;
    cartSumSpan.innerText = cartTotal;
    //document.getElementById("orderSum").textContent = cartTotal;
}

function UpdateCartTable(){
    let cartContent = document.getElementById("cartContent");
    cartContent.innerHTML = '';

    if(cart.some(cartItem => cartItem.quantity !== 0)){
        cart.forEach(cartItem => {
            //const product = config.find(product => product.productID === cartItem.productID);
            const product = config.find(product => product.productID === cartItem.productID);
            const cartItemDiv = document.createElement('div');
            
            //console.log(product);

            if(cartItem.quantity === 0){
                return;
            }
            cartItemDiv.className = "dz-cart-list";
            cartItemDiv.innerHTML = `        
            <div class="dz-media">
                <img src="${product.image_src}" alt="">
            </div>
            <div class="dz-content">
                <h6 class="title"><a href="product-detail.html">${product.name} ${product.model}</a></h6>
                <ul class="dz-meta">
                    <li class="dz-price">${product.price} тг </li>
                    <li class="dz-review"></li>
                </ul>
                <div class=" d-flex align-items-center">
                    <div class="dz-stepper style-2">
                        <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected"><span class="input-group-btn input-group-prepend"><button class="btn btn-primary bootstrap-touchspin-down bootstrap-touchspin-injected" type="button">-</button></span><input readonly="" class="stepper form-control" type="text" value="${cartItem.quantity}" name="demo3"><span class="input-group-btn input-group-append"><button class="btn btn-primary bootstrap-touchspin-up bootstrap-touchspin-injected" type="button">+</button></span></div>
                    </div>
                    <a href="javascript:void(0);" class="dz-remove ms-auto"><i class="feather icon-trash-2"></i>Remove</a>
                </div>
            </div>`

            if(product.auction){
                var specDiv = document.createElement('i');
                specDiv.className = "feather icon-star-on";
                cartItemDiv.querySelector('.dz-review').appendChild(specDiv);
            }
            //console.log(cartItemDiv.querySelector('.dz-remove'));
            
            let removeButton = cartItemDiv.querySelector('.bootstrap-touchspin-down');
            let addButton = cartItemDiv.querySelector('.bootstrap-touchspin-up');
            let clearButton = cartItemDiv.querySelector('.dz-remove');
        
            //console.log(removeButton);
            //console.log(addButton);

            removeButton.setAttribute("data-id", product.productID);
            addButton.setAttribute("data-id", product.productID);
            clearButton.setAttribute("data-id", product.productID);
            
            addButton.addEventListener('click', function(){
                const productId = this.getAttribute('data-id');
                const index = map[productId];
                cart[index].quantity++;
                //document.getElementById(`quantity-${productId}`).innerText = cart[index].quantity;
                updateCartTotal(product.price);
                UpdateCartTable()
            });
        
            removeButton.addEventListener('click', function(){
                const productId = this.getAttribute('data-id');
                const index = map[productId];
                if (cart[index].quantity > 0) {
                    cart[index].quantity--;
                    //document.getElementById(`quantity-${productId}`).innerText = cart[index].quantity;
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
                //document.getElementById(`quantity-${productId}`).innerText = 0;
                updateCartTotal(- (product.price * t));
                UpdateCartTable();
            });

            cartContent.appendChild(cartItemDiv);
        });
    }
    else{
        let asdf = document.createElement('h2');
        asdf.textContent = "В корзине ничего нет!";
        cartContent.appendChild(asdf);
    }

    /*
    document.getElementById("cartBackToShopButton").addEventListener('click', function(){
        hideElement(document.getElementById("cartDiv"));
        hideElement(document.getElementById("showcase"));
        showElement(document.getElementById("mainshop"));
        showElement(document.getElementById("cartButton"));
        hideElement(document.getElementById("registrationFormButton"));
    });
    */


    const cartTotal = cart.reduce((total, cartItem) => {
        const product = config.find(product => product.productID === cartItem.productID);
        return total + (product.price * cartItem.quantity);
    }, 0);

    //console.log(cartTotal);
    document.getElementById('cartTotal').textContent = cartTotal + ' тг';
    //document.getElementById('cartSum').textContent = cartTotal;
};

document.getElementById('toCartButton').addEventListener('click', function(){
    UpdateCartTable();
    hideElement(document.getElementById("mainshop"));
    showElement(document.getElementById("cartDiv"));    
});

document.getElementById('toRegistrationFormButton').addEventListener('click', function(){
    hideElement(document.getElementById("cartDiv"));
    hideElement(document.getElementById("mainshop"));
    showElement(document.getElementById("registrationFrom"));    
});

document.getElementById("registrationFormBackToCartButton").addEventListener('click', function(){
    UpdateCartTable();
    hideElement(document.getElementById("mainshop"));
    hideElement(document.getElementById("registrationFrom"));
    showElement(document.getElementById("cartDiv"));
}); 

document.getElementById("CartBackToShopButton").addEventListener('click', function(){
    showElement(document.getElementById("mainshop"));
    hideElement(document.getElementById("cartDiv"));   
});

document.getElementById("showcaseAddToCartButton").addEventListener('click', function(){
    showElement(document.getElementById("mainshop"));
    hideElement(document.getElementById("showcase")); 
    
    productId = parseInt(showcaseDiv.getAttribute('productId'));
    const index = map[productId]; 

    cart[index].quantity += parseInt(document.getElementById("showcaseQuantityInput").value);
});

function constructregionDropdown(){
    let regionSelectorDiv = document.getElementById("regionSelectorDiv");
    for(const region in regions){
        let newA = document.createElement('a');
        newA.className = "dropdown-item";
        newA.textContent = region;
        newA.setAttribute("data-region", region);

        newA.addEventListener('click', function(){
            let citySelectorDiv = document.getElementById("citySelectorDiv");
            citySelectorDiv.innerHTML = '';
            let curRegion = this.getAttribute('data-region');
            document.getElementById("selectedRegion").textContent = curRegion;
            regions[curRegion].forEach(city => {
                let cityA = document.createElement('a');
                cityA.className = "dropdown-item";
                cityA.textContent = city;
                cityA.setAttribute("data-city", city);
                cityA.addEventListener('click', function(){
                    let curCity = this.getAttribute('data-city');
                    document.getElementById("selectedCity").textContent = curCity;
                    userCity = curCity;
                });
                citySelectorDiv.appendChild(cityA);
            });
        });
        regionSelectorDiv.appendChild(newA);
    }
}

var radio1 = document.getElementById("filterRadio1");
var radio2 = document.getElementById("filterRadio2");

radio1.addEventListener("change", function() {
    if (radio1.checked) {
        //console.log("Выбрано: Самовывоз");
        userDelivery = false;
    }
});

radio2.addEventListener("change", function() {
    if (radio2.checked) {
        //console.log("Выбрано: Доставка");
        userDelivery = true;
    }
});

getData();
constructregionDropdown();

//hideElement(document.getElementById("mainshop"));
hideElement(document.getElementById("showcase"));
hideElement(document.getElementById("cartDiv"));
hideElement(document.getElementById("registrationFrom"));
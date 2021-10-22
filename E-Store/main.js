let carts = document.querySelectorAll('.case button');
let products = [{
        name: 'Laptop',
        tag: 'Macbook',
        price: 5000,
        inCart: 0
    },
    {
        name: 'SmartPhone',
        tag: 'Mobile',
        price: 1000,
        inCart: 0
    },
    {
        name: 'Headset',
        tag: 'audio',
        price: 500,
        inCart: 0
    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumber(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumber() {
    let productNumbers = localStorage.getItem('cartNumber');
    if (productNumbers) {
        document.querySelector('.navbar span').textContent = productNumbers;
    }
}

function cartNumber(products) {
    let productNumbers = localStorage.getItem('cartNumber');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumber', productNumbers + 1);
        document.querySelector('.navbar span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumber', 1);
        document.querySelector('.navbar span').textContent = 1;
    }
    setItems(products);
}

function setItems(products) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    } else {
        products.inCart = 1;

        cartItems = {
            [products.tag]: products
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(products) {
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);
    } else {

        localStorage.setItem("totalCost", products.price);
    }
}


onLoadCartNumber();
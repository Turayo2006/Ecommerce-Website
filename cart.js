let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
let totalAmount = document.getElementById("total-amount");
let cartTable = document.getElementById("cart-table");
let cartContainer = document.getElementById("cart-container");



let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x + y, 0);
}

let calculation2 = () => {
    let cartIcon = document.getElementById("cartAmount2");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x + y, 0);
}

calculation();
calculation2();

let products = [
    {
        id: "a",
        img: "https://i.postimg.cc/kg9YYbTn/f1.jpg",
        name: "Carton Astronault Tshirts",
        price: 78,
        desc: ""
    },
    {
        id: "b",
        img: "https://i.postimg.cc/2yhT2kvb/f2.jpg",
        name: "Carton Leave Tshirts",
        price: 120,
        desc: ""
    },
    {
        id: "c",
        img: "https://i.postimg.cc/VL9DtNm2/f3.jpg",
        name: "Rose Multicolor Tshirts",
        price: 180,
        desc: ""
    },
    {
        id: "d",
        img: "https://i.postimg.cc/vZ3hPS1z/f4.jpg",
        name: "Pink Flower Tshirt",
        price: 250,
        desc: ""
    },
    {
        id: "e",
        img: "https://i.postimg.cc/q7FLrhx6/f5.jpg",
        name: "Purple Flowering Tshirts",
        price: 380,
        desc: ""
    },
    {
        id: "f",
        img: "https://i.postimg.cc/L86BZByZ/f7.jpg",
        name: "Short Knicker",
        price: 460,
        desc: ""
    },

    {
        id: "g",
        img: "https://i.postimg.cc/zDxJ2f0H/f6.jpg",
        name: "2 in 1 Double Routed",
        price: 460,
        desc: ""
    },

    {
        id: "h",
        img: "https://i.postimg.cc/x8qcBrpP/n6.jpg",
        name: "Ash Short",
        price: 460,
        desc: ""
    },
    {
        id: "abc",
        img: "https://i.postimg.cc/2Sq4mytJ/f8.jpg",
        name: "Carton Astronault Tshirts",
        price: 78,
        desc: ""
    },

    {
        id: "bca",
        img: "https://i.postimg.cc/KYjcC3sk/n3.jpg",
        name: "Carton Leave Tshirts",
        price: 120,
        desc: ""
    },

    {
        id: "cba",
        img: "https://i.postimg.cc/vHvQBtJx/n4.jpg",
        name: "Rose Multicolor Tshirts",
        price: 180,
        desc: ""
    },

    {
        id: "dca",
        img: "https://i.postimg.cc/908J8S4q/n5.jpg",
        name: "Pink Flower Tshirt",
        price: 250,
        desc: ""
    },



]


let generateCartItems = () => {
    // Clear any previous content in the tbody
    cartContainer.innerHTML = '' || [];

    if (basket.length !== 0) {
        // Create a table to display cart items
   return (cartContainer.innerHTML = basket.map((x) => {
        let { id, item } = x;
        let search = products.find((y) => y.id === id) || [];
        let { img, name, price } = search;
        let subtotal = item * price;
        
        return `
            <tr> 
                <td><i onclick="removeItem(${id})" class="far fa-times-circle"></i></td>
                <td><img width="100" src="${img}" alt="" /></td>
                <td>${name}</td>
                <td>$ ${price}</td>
                <td>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="productQuantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </td>
                <td>$ ${subtotal}</td>
            </tr>
        `;
    }).join(""));
    // Set the HTML content of the shopping cart element
} else {
    // Handle the case where the cart is empty
    shoppingCart.innerHTML = '';
    label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="shop.html">
            <button class="HomeBtn">Keep Shopping</button>
        </a>
    `;
}


calculation();
calculation2();
};

generateCartItems();



let TotalAmount = ()=>{
    if (basket.length !== 0){
        let amount = basket.map((x) =>{
            let {item, id} = x;
            let search = products.find((y) => y.id === id);  
            return item * search.price;
        })
        .reduce((x,y) => x+y, 0);
        // console.log(amount)
        totalAmount.innerHTML = `
        <tr>
        <td>Card-Subtotal</td>
        <td>$ ${amount}</td>
      </tr>
      <tr>
        <td>Shipping</td>
        <td>Free</td>
      </tr>
      
      <tr>
        <td><strong>Total</strong></td>
        <td><strong>$ ${amount}</strong></td>
      </tr>
      <a href="checkout.html">
      <button class="btn normal" style="margin-top: 20px">Proceed to checkout</button>
      </a>
        `;
    } else return;
}

TotalAmount();

generateCartItems();


let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }else{
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket))
    generateCartItems();
    update(selectedItem.id);
};

let decrement = (id) =>{
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;

    else if(search.item === 0) return;
else{
    search.item -= 1;
}

localStorage.setItem("data", JSON.stringify(basket));
basket = basket.filter((x) => x.item !== 0)
    generateCartItems();
    update(selectedItem.id);
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    calculation2();
    TotalAmount();
};

let removeItem = (id) => {
let selectedItem = id;
// console.log(selectedItem);
basket = basket.filter((x) => x.id !== selectedItem.id);
generateCartItems();
totalAmount();
calculation();
calculation2();
localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () =>{
    basket = [];
    generateCartItems();
    calculation();
    calculation2();
    localStorage.setItem("data", JSON.stringify(basket));
}



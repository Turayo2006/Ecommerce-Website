let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
let totalAmount = document.getElementById("total-amount");
let cartTable = document.getElementById("cart-table");



let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x + y, 0);
}

calculation();

let generateCartItems = ()=>{
    if(basket.length !== 0){
        
        let table = document.createElement("table");

        //create table headers
        table.innerHTML = `
           <thead>
          <tr>
            <td>Remove</td>
            <td>Image</td>
            <td>Product</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Subtotal</td>
          </tr>
        </thead>
        <tbody>
        ${basket.map((item) => {
            // Retrieve product data based on item ID
            let search = proItemsData.find((x) => x.id === item.id);
            if (!search) return ""; // Handle missing product

            let { img, name, price } = search;
            let TotalAmount = item.item * price;

            return `
                <tr>
                    <td>
                        <a href="#" onclick="removeItem(${item.id})">
                            <i class="far fa-times-circle"></i>
                        </a>
                    </td>
                    <td><img src="${img}" alt=""></td>
                    <td>${name}</td>
                    <td>$ ${price}</td>
                    <td>
                        <div class="buttons">
                            <i onclick="decrement(${item.id})" class="fa-solid fa-minus minus"></i>
                            <div id="${item.id}" class="productQuantity">${item.item}</div>
                            <i onclick="increment(${item.id})" class="fa-solid fa-plus plus"></i>
                        </div>
                    </td>
                    <td>$ ${totalAmount.toFixed(2)}</td>
                </tr>
            `;
        }).join("")}
    </tbody>
`;
// Replace the content of the shopping cart with the generated table
shoppingCart.innerHTML = "";
shoppingCart.appendChild(table);

        // Calculate and display the total cart amount
        let totalAmount = basket.reduce((total, item) => {
            let search = proItemsData.find((x) => x.id === item.id);
            if (!search) return total;
            return total + item.item * search.price;
        }, 0);

        totalAmountElement.textContent = `$ ${totalAmount.toFixed(2)}`;


} else{

        shoppingCart.innerHTML = '';
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to home</button>
        </a>
        `;
    }
    
};




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
    TotalAmount();
};

let removeItem = (id) => {
let selectedItem = id;
// console.log(selectedItem);
basket = basket.filter((x) => x.id !== selectedItem.id);
generateCartItems();
TotalAmount();
calculation();
localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () =>{
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let TotalAmount = ()=>{
    if (basket.length !== 0){
        let amount = basket.map((x) =>{
            let {item, id} = x;
            let search = basket.find((y) => y.id === id) || [];  
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
      <button class="btn normal" style="margin-top: 20px" href="#checkout.html">Proceed to checkout</button>
        `;
    } else return;
}

TotalAmount();

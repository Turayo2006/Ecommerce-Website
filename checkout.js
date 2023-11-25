// Get references to the elements in your checkout.html
let orderSummary = document.getElementById('order-summary');
let totalAmt = document.getElementById('total-amt');
let order = document.getElementById('order');
let totalAmount = document.getElementById('total-amount');

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Function to generate and display cart items in the order summary
let generateOrderSummary = () => {
    // Clear any previous content in the order summary
    orderSummary.innerHTML = '';
  
    if (basket.length !== 0) {
      // Create a container for the order summary
      return (orderSummary.innerHTML = basket.map((x) => {
        let { id, item } = x;
        let search = products.find((y) => y.id === id) || [];
        let { img, name, price } = search;

        return `
        <div class="cart-item">
        <img width="50" height="50" src="${img}" alt=""/>
        <div class="details">
        <div class="title-price-x">
        <h4 class="title-price">
        <p>${name}</p>
        <p class="cart-item-price">$${price}</p>
        </h4>
        </div>
        <div class="product-quantity">
        <div id=${id} class="productQuantity">${item}</div>
        <h3>$${item * search.price}</h3>
        </div>
        </div>
        </div>
        `;

}).join(""));
    }  else {
      // Handle the case where the cart is empty
      order.innerHTML = '';
  }

  }
  // Call the function to generate and display the order summary
  generateOrderSummary();



let TotalAmount = ()=>{
    if (basket.length !== 0){
        let amount = basket.map((x) =>{
            let {item, id} = x;
            let search = products.find((y) => y.id === id);  
            return item * search.price;
        })
        .reduce((x,y) => x+y, 0);
        totalAmount.innerHTML = `
       <strong>Total Summary</strong>
       <strong>$${amount}</strong>`
    }
}
        TotalAmount();
        generateOrderSummary();




 

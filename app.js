let proContainer = document.getElementById("pro-container");
let newShop = document.getElementById("new-arrival");
let productButtons = document.getElementById("button2")



let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (proContainer.innerHTML = proItemsData.map((x) =>{
        let {id, name, price, img} = x;
        let search = basket.find((x) => x.id === id) || []; 
        return `
        <div class="pro">
        <img src="${img}" alt="">
                <div class="des">
                  <span>adidas</span>
                  <h5>${name}</h5>
                  <div class="star">
                    <i class="fas fa-star"></i>
                     <i class="fas fa-star"></i>
                     <i class="fas fa-star"></i>
                     <i class="fas fa-star"></i>
                     <i class="fas fa-star"></i>
                  </div>
                  <h4>$ ${price}</h4>
                  <div class="buttons2">
                 <i onclick="decrement(${id})"  class="fa-solid fa-minus minus"></i>
                 <div id=${id} class="productQuantity">${search.item === undefined? 0: search.item}</div>
                 <i onclick="increment(${id})"  class="fa-solid fa-plus plus"></i>
                 </div>
                </div>
                <a onclick="increment(${id})" data-product-id="1" ><i class="fal fa-shopping-cart cart"></i></a>
                
                </div>
        `;
    }).join(""))
}

generateShop();


// for the new arrival

let newArrival = () => {
    return (newShop.innerHTML = newItemsData.map((x) =>{
        let {id, name, price, img} = x;
        let search = basket.find((x) => x.id === id) || []; 
        return `
        <div class="pro">
        <img src="${img}" alt="">
                <div class="des">
                  <span>adidas</span>
                  <h5>${name}</h5>
                  <div class="star">
                    <i class="fas fa-star"></i>
                     <i class="fas fa-star"></i>
                     <i class="fas fa-star"></i>
                     <i class="fas fa-star"></i>
                     <i class="fas fa-star"></i>
                  </div>
                  <h4>$ ${price}</h4>
                  <div class="buttons2">
                 <i onclick="decrement(${id})"  class="fa-solid fa-minus minus"></i>
                 <div id=${id} class="productQuantity">${search.item === undefined? 0: search.item}</div>
                 <i onclick="increment(${id})"  class="fa-solid fa-plus plus"></i>
                 </div>
                </div>
                <a data-product-id="1" onclick="increment(${id}, '+')"><i class="fal fa-shopping-cart cart"></i></a>
                </div>
        `;
    }).join(""))
}

newArrival();


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
  // console.log(basket);
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
  // console.log(basket);
  update(selectedItem.id);
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation()
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x + y, 0)
  // console.log();
}

calculation();

function initializeCart() {
    // Check if the cart already exists in local storage
    // localStorage.clear();
    if (!localStorage.getItem('cart')) {
        // If it doesn't exist, initialize it as an empty array
        localStorage.setItem('cart', JSON.stringify({}));
        console.log("Cart initialized.");
    } else {
        console.log("Cart already exists.");
    }
}

function itemExists(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart'));

    // Check if the item ID exists in the cart
    return itemId in cart;
}

function addCart(btn){
    let cart = JSON.parse(localStorage.getItem('cart'));
    const itemId= btn.value;

    if (itemExists(itemId)){//check if there's a similar item in the cart and addto the quantity if there isnt or create a new item if there isnt
        cart[itemId].quantity += 1;
    }else {
        cart[itemId]={
            quantity:1,
            name: btn.getAttribute('data-name'),
            price:parseInt(btn.getAttribute('data-price')),
            img:btn.getAttribute('data-img')

        };
    }
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    

  }

window.onload= initializeCart();



const addbtns= document.querySelectorAll('.drink-item button');
for (let i = 0; i < addbtns.length; i++) {
    addbtns[i].addEventListener('click', ()=>{
        console.log(addbtns[i].value);
        addCart(addbtns[i]);
    });
  }
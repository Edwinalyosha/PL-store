$('.cart-icon').click( function(event) {
    // Retrieve cart from local storage
    
});
// localStorage.clear();


$('#checkout').click(function(e){
    console.log('checkout');
    e.preventDefault();
    updateLocalCart();

    window.location.href = 'checkout.html'; 
    
    
});

$('#place-order').click(function(){
    const tel=$('#tel').val();// initialize so you can check for correctness

    let delivery_info={
        nickname:$('#nickname').val(),
        tel: tel,
        location:$('#delivery-location').val(),
        details:$('#details').val()
    }

    var cart = localStorage.getItem('cart');

    const data={
        cart:cart,
        delivery_info: delivery_info
    }

    var cart = localStorage.getItem('cart');
    if (cart) {
        // Send cart data to the server
        $.ajax({
            url: 'http://localhost:5020/api/place_order', // Your server endpoint
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                //alert the customer about what is next since the online part of the process is done
                alert('Your order has been placed successfully. Remember the nickname you entered for order tracking');
                console.log('Your order has been placed successfully. Remember the nickname you entered for order tracking')
            },
            error: function(xhr, status, error) {
                console.error('Failed to send cart data:', error);
            }
        });
    } else {
        console.log('No cart data found in local storage.');
    }
});


function updateLocalCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));

// Use regular function to properly bind "this"
$('.cart-item').each(function() {
    const itemId = $(this).attr('id'); // Get the itemId from the row id
    const quantity = parseInt($(this).find('input').val(), 10); // Get the quantity from the input field
    
    console.log('Reached item:', itemId, 'with quantity:', quantity);
    
    if (quantity > 0) {
        // Update the quantity of the item in the cart
        cart[itemId].quantity = quantity;
    } else {
        console.log('Removing item:', itemId);
        
        // Remove the cart item from localStorage if quantity is 0
        delete cart[itemId];
        
        // Remove the corresponding table row from the DOM
        $(this).closest('tr').remove();
    }
});

// Save the updated cart back to localStorage
localStorage.setItem('cart', JSON.stringify(cart));

console.log('Cart updated:', cart);

}



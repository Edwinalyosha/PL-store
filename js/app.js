const express= require('express');
const cors=require("cors");
const{Pool}=require('pg');
const bodyParser=require("body-parser");
const path=require('path');
const ejs= require('ejs');

const app=express();
//middleware
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'liquors',
  password: 'dorilla123',
  port: 5432,
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));


app.post('/api/view_cart', async (req, res) => {
  console.log('server reached');
    try {
      const cartData=req.body.cart;
      let cart=JSON.parse(cartData);
      let cartBack=[]

      for (const [itemId, quantity] of Object.entries(cart)) {
        
        const thing= await pool.query('SELECT p_name, p_price, f_name FROM products WHERE p_id = $1', [itemId]);
        if (thing.rows.length > 0) {
          const product = thing.rows[0];
          const productDetails = {
              itemId: itemId,
              quantity: quantity,
              name: product.p_name,
              price: product.p_price,
              fName: product.f_name,
          };
  
          // Add the product details to the cartBack array
          cartBack.push(productDetails);
          }
          console.log(cartBack);
          res.render('cart', {cartBack: cartBack});
        }

    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });


  app.post('/api/place_order', async (req, res) => {
    try {
      const cartData=req.body.cart;
      const orderData=req.body.delivery_info;
      let cart=JSON.parse(cartData);
      for (const [itemId, quantity] of Object.entries(cart)) {
        console.log('Order:');
        console.log(cartData);
        console.log('To:'); 
        console.log(orderData); 
        
        // Perform any operation needed with itemId and quantity such as fetching data from the database to be used to populate the ejs
        // Example operation: saving to database, checking inventory, etc.
        }
        res.status(200).json({ message: 'Order placed successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

  app.listen(5020, () => {
    console.log(`Server is running on port 5020`);
});
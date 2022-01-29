const Cart = require('../models/Cart');

module.exports = function(app){

    app.post("/addToCart", async (req, res) => {
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Access-Control-Allow-Origin', '*')
        // another common pattern
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        res.setHeader(
          'Access-Control-Allow-Headers',
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )
        const newCart = new Cart(req.body);

        try {
            const savedCart = await newCart.save();
            res.status(200).json(savedCart);
        } catch (err) {
            res.status(500).json(err);
        }
      });
        

    app.get("/getCart/:userId", async(req,res)=>{
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Access-Control-Allow-Origin', '*')
        // another common pattern
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        res.setHeader(
          'Access-Control-Allow-Headers',
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )
        try {
            const cart = await Cart.find({ userId: req.params.userId });
            res.status(200).json(cart);
          } catch (err) {
            res.status(500).json(err);
          }
        
})


};
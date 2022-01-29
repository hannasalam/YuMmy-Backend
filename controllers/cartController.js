const Cart = require('../models/Cart');

module.exports = function(app){

    app.post("/addToCart", async (req, res) => {
        const newCart = new Cart(req.body);

        try {
            const savedCart = await newCart.save();
            res.status(200).json(savedCart);
        } catch (err) {
            res.status(500).json(err);
        }
      });
        

    app.get("/getCart/:userId", async(req,res)=>{
        try {
            const cart = await Cart.find({ userId: req.params.userId });
            res.status(200).json(cart);
          } catch (err) {
            res.status(500).json(err);
          }
        
})


};
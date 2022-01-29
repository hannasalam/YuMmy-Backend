const User = require('../models/User');

module.exports = function(app){
 
  app.post("/login", async (req, res) => {
        const { name, password } = req.body;
        let user = await User.findOne({ name });
        console.log(user);
        if (!user) {
            user = await User.findOne({email: name})
            console.log(user)
            if(!user)
                return res.json({ status: "error", error: "Invalid username/password" });
        }

        if (password === user.password){

          return res.json({ status: "ok", user });
        }
        res.json({ status: "error", error: "Invalid username/password" });
      });
        

    app.post("/register", async(req,res)=>{
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Access-Control-Allow-Origin', '*')
        // another common pattern
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        res.setHeader(
          'Access-Control-Allow-Headers',
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )
        try{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });
          const createdUser = await user.save();
          res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            password : createdUser.password
            });
    }catch(error)
      {
        if(error.code===11000)
        {
          return res.json("User already exists. Try Logging in");
        }
      }
})

};
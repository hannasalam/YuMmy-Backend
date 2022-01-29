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
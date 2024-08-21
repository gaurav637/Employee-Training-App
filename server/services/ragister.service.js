const {Employee} = require('./models');
const bcrypt = require('bcrypt');

module.exports.RegisterEmployee = async (reqBody) => {
    try{
        const {name,email,password} = request.body;
        const checkEmail = await UserModel.findOne({ email }); // check email alreday used ?

        if(checkEmail){
            return response.status(400).json({
                message : "Already user exits",
                error : true,
            })
        }
        //password into hashpassword
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt);

        const payload = {
            name,
            email,
            password : hashpassword
        }
        const user = new UserModel(payload);
        const userSave = await user.save();
        return response.status(201).json({
            message : "User created successfully",
            data : userSave,
            success : true
        })

    }catch(err){
        console.log("Failed to register Employee! ",err.message);
        throw new Error("Failed to register Employee! ",err.message);
    }
}
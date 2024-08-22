const {Employee} = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.LoginEmployee = async (reqBody) => {
    try{
        const {email,password} = reqBody;
        const employee = await Employee.find({email: email});
        if(!employee){
            throw new Error("Employee Not Exist");
        }
        const hashPassword = employee.password;
        const matchPassword = await bcrypt.compare(hashPassword,password);
        if(!matchPassword){
            throw new Error("Wrong Password");
        }
        const token = await jwt.sign(
                    {id:employee._id},
                    process.env.SECRET_KEY,
                    {expiresIn:'30d'}
        );
        return token;
    }catch(err){
        console.log("error to login Employee! ",err.message);
        throw new Error("error to login Employee! ",err.message);
    }
}
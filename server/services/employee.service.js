const {Employee} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports.LoginEmployee = async (reqBody,res) => {
    try{
        const {email,password} = reqBody;
        const employee = await Employee.findOne({email});
        if(!employee){
            throw new Error("Employee Not Exist");
        }
        const hashPassword = employee.password;
        const matchPassword = await bcrypt.compare(password,hashPassword);
        if(!matchPassword){
            throw new Error("Incorrect Password");
        }
        const token = await jwt.sign(
                    {id:employee._id},
                    process.env.SECRET_KEY,
                    {expiresIn:'30d'}
        );
        res.cookie("token",token); 
        return token;
    }catch(error){
        console.log("error to login Employee! ",error.message);
        throw new Error(error.message);
    }
}

module.exports.RegisterEmployee = async (reqBody) => {
    try{
        const {email,password,name} = reqBody;
        const checkEmail = await Employee.findOne({ email: email }); // check email alreday used ?
        if(checkEmail){
            throw new Error("Already user exits");
        }
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt);
        const payload = {
            name,
            email,
            password : hashpassword
        }
        const employee = new Employee(payload);
        const employeeSave = await employee.save();
        return employeeSave;
        
    }catch(err){
        console.log("Failed to register Employee! ",err.message);
        throw new Error(err.message);
    }
}

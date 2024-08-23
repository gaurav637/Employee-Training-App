const {EmployeeService} = require('../services');

module.exports.loginEmployee = async (req,res) => {
    try{
        const result = await EmployeeService.LoginEmployee(req.body);
        if(!result){
            return res.status(401).json({
                Message: "Unauthorized!",
                Success: "False"
            });
        }
        return res.status(200).json({
            Message: "Login",
            Success: true,
            Data: result,
        });


    }catch(err){
        return res.status(500).json({
            Message: "Internal Server Error",
            Success: "False",
        });
    }
}

module.exports.registerEmployee = async (req,res) => {
    try{
        const employee = await EmployeeService.RegisterEmployee(req.body);
        if(!employee){
            return res.status(500).json({
                Message: "Employee Not Created!",
                Success: "false",
            });
        }
        return res.status(201).json({
            message : "Employee created successfully",
            data : employee,
            success : true
        })

    }catch(err){
        return res.status(500).json({
            Message: "Internal server Error!",
            Success: "false",
        });
    }
}
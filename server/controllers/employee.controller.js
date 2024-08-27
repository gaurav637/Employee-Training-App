const {EmployeeService} = require('../services');
const {Employee} = require('../models');


module.exports.loginEmployee = async (req, res) => {
    try {
      const token = await EmployeeService.LoginEmployee(req.body,res);
      if (!token) {
        return res.status(401).json({
          message: "Unauthorized! Invalid email or password.",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Login successful!",
        token: token,
        success: true,
      });
    } catch (error) {
      console.error("Error during login:", error.message);
      return res.status(500).json({
        message: error.message || error,
        success: false,
        error: true,
      });
    }
};
  

module.exports.registerEmployee = async (req,res) => {
    try{
        const employee = await EmployeeService.RegisterEmployee(req.body);
        if(!employee){
            return res.status(500).json({
                message: "Employee Not Created!",
                error: true,
            });
        }
        return res.status(201).json({
            message : "Employee created successfully",
            data : employee,
            success : true
        })

    }catch(err){
        return res.status(500).json({
            message: "Internal server Error!",
            error: true,
        });
    }
}

module.exports.getEmployeeProfile = async (req, res) => {
    try {
      const employee = await Employee.findById(req.user.id)
        .populate('trainingsEnrolled progress.training'); 
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found', error: true });
      }
      res.status(200).json({ data: employee, success: true });
    } catch (error) {
      res.status(500).json({ message: error.message, error: true });
    }
};
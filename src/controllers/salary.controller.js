const EmployeeModel = require('../models/salary.model');

// create new Admin
module.exports.createSalary = (req, res) =>{
    const employeeReqData = new EmployeeModel(req.body);
    console.log('employeeReqData', employeeReqData);
    EmployeeModel.createSalary(employeeReqData, (err, result)=>{
        if(err){
            res.json({success:0, message:err});
        }else if(result == "email is already been registered") {
            res.json({success:0,  message:result});
        }else{
            res.json({success:1,  message:"Data Added Successfully", data:result});
        }
    });
}
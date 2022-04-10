const EmployeeModel = require('../models/employee.model');

// create new Admin
module.exports.createAdmin = (req, res) =>{
    const employeeReqData = new EmployeeModel(req.body);
    console.log('employeeReqData', employeeReqData);
    EmployeeModel.createAdmins(employeeReqData, (err, result)=>{
        if(err){
            res.json({success:0, message:err});
        }else if(result == "email is already been registered") {
            res.json({success:0,  message:result});
        }else{
            res.json({success:1,  message:"Data Added Successfully", data:result});
        }
    });
}

// get all employees
module.exports.showEmployee = (req, res)=>{
    //console.log('get emp by id');
    EmployeeModel.getEmployees((err, company)=>{
        if(err)
        res.json({success:0, message:err, data:company});
        console.log('single employee data',company);
        res.json({success:1, message:"Data Fetch Successfully", data:company});
    })
}

// create new company
module.exports.createNewEmployee = (req, res) =>{
    const employeeReqData = new EmployeeModel(req.body);
    console.log('employeeReqData', employeeReqData);
    EmployeeModel.createEmployee(employeeReqData, (err, result)=>{
        if(err){
            res.json({success:0, message:err});
        }else if(result == "email is already been registered") {
            res.json({success:0,  message:result});
        }else{
            res.json({success:1,  message:"Data Added Successfully", data:result});
        }
    });
}

// get countrys
module.exports.auth = (req, res)=> {
    const employeeReqData = new EmployeeModel(req.body);
    //console.log('here all Company list');
    EmployeeModel.authenticate(employeeReqData, (err, result, token) =>{
        if(err){
            res.status(500).json({success:0, message:err, data:result});
        }else if(result =="User Dose Not Exits"){
            res.json({success:0, message:"User Dose Not Exist"});
        }else if(result =="Please enter valid password"){
            res.json({success:0, message:"Please enter valid password"});
        }
        else{
            res.json({success:1, message:"Data Fetch Successfully",token:token, data :result});
        }
    })
}


// Refresh token
module.exports.refreshToken = (req, res)=> {
    const employeeReqData = new EmployeeModel(req.body);
    //console.log('here all Company list');
    EmployeeModel.refresh(employeeReqData, (err, result) =>{
        if(err){
            res.status(500).json({success:0, message:err});
        }else{
            res.json({success:1, message:"refresh token successfully",token:result});
        }
    })
}
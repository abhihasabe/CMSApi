const CompanyModel = require('../models/employees.model');

// create new company
exports.createNewCompany = (req, res) =>{
    const companyReqData = new CompanyModel(req.body);
    console.log('companyReqData', companyReqData);
    CompanyModel.createCompany(companyReqData, (err, result, token)=>{
        if(err){
            res.status(500).json({success:0, message:err, data:result});
        }else if(result =="User Dose Not Exits"){
            res.json({success:0, message:"User Dose Not Exist"});
        }else{
            res.json({success:1, message:"Data Fetch Successfully",token:token, data :result});
        }
    });
}
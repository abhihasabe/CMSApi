const CompanyModel = require('../models/employees.model');

// create new company
exports.login = (req, res) =>{
    const companyReqData = new CompanyModel(req.body);
    console.log('companyReqData', companyReqData);
    CompanyModel.empLogin(companyReqData, (err, company)=>{
        if(err){
            res.json({success:0, message:err});
        }else if(company == "Email Already Exists") {
            res.json({success:0,  message:company});
        }else{
            res.json({success:1,  message:"Data Added Successfully"});
        }
    });
}
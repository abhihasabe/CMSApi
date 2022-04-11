const CompanyModel = require('../models/company.model');

// create new company
module.exports.createNewCompany = (req, res) =>{
    const companyReqData = new CompanyModel(req.body);
    console.log('companyReqData', companyReqData);
    CompanyModel.createCompany(companyReqData, (err, company)=>{
        if(err){
            res.json({success:0, message:err});
        }else if(company == "Email Already Exists") {
            res.json({success:0,  message:company});
        }else{
            res.json({success:1,  message:"Data Added Successfully"});
        }
    });
}


// get all employees
module.exports.showCompany = (req, res)=>{
    //console.log('get emp by id');
    CompanyModel.getCompany((err, company)=>{
        if(err)
        res.json({success:0, message:err, data:company});
        console.log('single employee data',company);
        res.json({success:1, message:"Data Fetch Successfully", data:company});
    })
}
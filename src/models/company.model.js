var dbConn  = require('../../config/db.config');

// var bcrypt = require('bcryptjs');

// var salt = bcrypt.genSaltSync(10);
// console.log(salt);

var Companys = function(companys){
    this.company_name       =   companys.company_name;
    this.company_type       =   companys.company_type;
    this.company_email      =   companys.company_email;
    this.company_phone      =   companys.company_phone;
    this.company_fax        =   companys.company_fax;
    this.company_address    =   companys.company_address;
    this.company_branch     =   companys.company_branch;
    this.company_pincode    =   companys.company_pincode;
    this.company_country    =   companys.company_country;
    this.company_website    =   companys.company_website;
    this.company_info       =   companys.company_info;
}


// create new company
Companys.createCompany = (companyReqData, result) =>{
    dbConn.query('SELECT * FROM company_table WHERE company_email=?', companyReqData.company_email, (err, res)=>{
        if(err){
            console.log('Error while fetching companys by id', err);
            result(null, err);
        }else{
            console.log('by id',res.length);
            if(res.length==0){
                dbConn.query('INSERT INTO company_table SET ? ', companyReqData, (err, res)=>{
                    if(err){
                        console.log('Error while inserting data');
                        result(null, err);
                }   else{
                        console.log('company created successfully');
                        result(null, res)
                    }
                });
            }else{
                result(null, "Email Already Exists");
            }
        }
    })
}

// get company
Companys.getCompany = (result) =>{
    dbConn.query('SELECT et.company_name, ctt.company_types_name, et.company_email, et.company_phone, et.company_fax, et.company_address, cmt.country_name, ct.city_name, et.company_address, et.company_pincode, et.company_website, et.company_info FROM company_table et, company_departments_types_table ctt, city_table ct, country_table cmt WHERE et.company_type=ctt.cid and et.company_country=cmt.cid and et.company_branch = ct.cid', (err, res)=>{
        if(err){
            console.log('Error while fetching companys Type', err);
            result(null,err);
        }else{
            console.log('companys Type fetched successfully');
            result(null,res);
        }
    })
}


module.exports = Companys;
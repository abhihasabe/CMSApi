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
    dbConn.query('SELECT company_table.company_name, company_departments_types_table.company_types_name, company_table.company_email, company_table.company_phone, company_table.company_fax, company_table.company_address, company_table.company_pincode, country_table.country_name, city_table.city_name, company_table.company_website, company_table.company_info FROM country_table INNER JOIN company_table ON country_table.cid = company_table.company_country INNER JOIN city_table ON city_table.cid = company_table.company_branch INNER JOIN company_departments_types_table ON company_departments_types_table.cid= company_table.company_type', (err, res)=>{
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
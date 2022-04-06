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
Companys.login = (employeeReqData, result) =>{
    dbConn.query('SELECT * FROM employee_table WHERE employee_email=?',employeeReqData.employee_email, (err, res)=>{
        if(err){
            console.log('Error while fetching companys Type', err);
            result(null,err);
        }else{
            if(res.length>0){
                bcrypt.compare(employeeReqData.password, res[0].password,function(err, results) {
                    // result == true
                    if(err){
                        console.log(" Comparision" ,err);
                    }else{
                        if(results==true){
                            var token = jwt.sign(
                                {
                                    employee_name:res[0].employee_name,
                                    email:res[0].employee_email
                            }, 'secret', 
                            {
                                expiresIn:"1h"
                            })
                            result(null,res[0], token);
                        }else{
                            console.log('User Dose Not Exits');
                            result(null,"User Dose Not Exits");
                        }
                    }
                });
            }else{
                console.log('User Dose Not Exits');
                result(null,"User Dose Not Exits");
            }
        }
    })
}

module.exports = Companys;
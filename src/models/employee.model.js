var dbConn  = require('../../config/db.config');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);

console.log(salt);

var Employee = function(employee){
    this.employee_name                  =   employee.employee_name;
    this.employee_dob                   =   employee.employee_dob;
    this.employee_gender                =   employee.employee_gender;
    this.employee_mobileno              =   employee.employee_mobileno;
    this.employee_alternate_mobileno    =   employee.employee_alternate_mobileno;
    this.employee_email                 =   employee.employee_email;
    this.employee_type                  =   employee.employee_type;
    this.employee_dept                  =   employee.employee_dept;
    this.employee_dateofjoining         =   employee.employee_dateofjoining;
    this.employee_working_location      =   employee.employee_working_location;
    this.employee_end_date              =   employee.employee_end_date;
    this.employee_blood_group           =   employee.employee_blood_group;
    this.employee_address               =   employee.employee_address;
    this.employee_aadharno              =   employee.employee_aadharno;
    this.employee_panno                 =   employee.employee_panno;
    this.employee_pfno                  =   employee.employee_pfno;
    this.employee_esicno                =   employee.employee_esicno;
    this.employee_wcpolicy              =   employee.employee_wcpolicy;
    this.employee_bank_acno             =   employee.employee_bank_acno;
    this.employee_company_id            =   employee.employee_company_id;
    //this.password                       =   employee.password;
    this.password                       =   employee.employee_name!=null?
                                                bcrypt.hashSync(employee.password, salt):
                                                employee.password;
}
// get employees
Employee.getEmployees = (result) =>{
    dbConn.query('SELECT et.employee_name, et.employee_dob, et.employee_gender, et.employee_mobileno, et.employee_alternate_mobileno, et.employee_email, utt.users_type_name, ctt.company_types_name, et.employee_dateofjoining, et.employee_working_location, et.employee_end_date, et.employee_blood_group, et.employee_address, et.employee_aadharno, et.employee_panno, et.employee_pfno, et.employee_esicno, et.employee_wcpolicy, et.employee_bank_acno, ct.city_name, cmt.company_name FROM employee_table et, company_departments_types_table ctt, city_table ct, company_table cmt, users_types_table utt WHERE et.employee_dept=ctt.cid and et.employee_working_location=ct.cid and et.employee_company_id = ct.cid and et.employee_type=utt.utID', (err, res)=>{
        if(err){
            console.log('Error while fetching companys Type', err);
            result(null,err);
        }else{
            console.log('companys Type fetched successfully');
            result(null,res);
        }
    })
}


// create new Admin
Employee.createAdmins = (employeeReqData, result) =>{
    dbConn.query('SELECT * FROM employee_table WHERE employee_email=?', employeeReqData.employee_email, (err, res)=>{
        if(err){
            console.log('Error while fetching employee by id', err);
            result(null, err);
        }else{
            console.log('by id',res.length);
            if(res.length==0){
                dbConn.query('INSERT INTO employee_table SET ? ', employeeReqData, (err, res)=>{
                    if(err){
                        console.log('Error while inserting data');
                        result(err, null);
                }   else{
                        console.log('employee created successfully');
                        result(null, employeeReqData)
                    }
                });
            }else{
                result(null, "email is already been registered");
            }
        }
    })
}

// create new company
Employee.createEmployee = (employeeReqData, result) =>{
    dbConn.query('SELECT * FROM employee_table WHERE employee_email=?', employeeReqData.employee_email, (err, res)=>{
        if(err){
            console.log('Error while fetching employee by id', err);
            result(null, err);
        }else{
            console.log('by id',res.length);
            if(res.length==0){
                dbConn.query('INSERT INTO employee_table SET ? ', employeeReqData, (err, res)=>{
                    if(err){
                        console.log('Error while inserting data');
                        result(err, null);
                }   else{
                        console.log('employee created successfully');
                        result(null, employeeReqData)
                    }
                });
            }else{
                result(null, "email is already been registered");
            }
        }
    })
}

// Login
Employee.authenticate = (employeeReqData,result) =>{
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
                        console.log(results);
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
                            console.log('Please enter valid password');
                            result(null,"Please enter valid password");
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


Employee.refresh = (employeeReqData,result) =>{
    var token = jwt.sign(
        {
            employee_name:employeeReqData.employee_name,
            email:employeeReqData.employee_email
    }, 'secret', 
    {
        expiresIn:"1h"
    })
    
    if(token!=null)
    result(null, token);
}


module.exports = Employee;
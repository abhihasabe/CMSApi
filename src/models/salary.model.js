var dbConn  = require('../../config/db.config');

var Expence = function(employee){
    this.salary_basic               =   employee.salary_basic;
    this.salary_hra                 =   employee.salary_hra;
    this.salary_other_allowances    =   employee.salary_other_allowances;
    this.salary_misc_expences       =   employee.salary_misc_expences;
    this.salary_prof_tax            =   employee.salary_prof_tax;
    this.salary_pf                  =   employee.salary_pf;
    this.salary_yearly_incentive    =   employee.salary_yearly_incentive;
    this.salary_diwali_bonus        =   employee.salary_diwali_bonus;
    this.emplyee_id                 =   employee.emplyee_id;
    this.salary_month               =   employee.salary_month;
}

// create salary
Expence.createSalary = (employeeReqData, result) =>{
    dbConn.query('INSERT INTO salary_table SET ? ', employeeReqData, (err, res)=>{
        if(err){
            console.log('Error while inserting data');
            result(err, null);
    }   else{
            console.log('Salary created successfully');
            result(null, res)
        }
    });
}

module.exports = Expence;
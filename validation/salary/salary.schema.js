const joi = require("@hapi/joi");

const schema = {
    salary: joi.object({
        salary_basic:                   joi.string().required(),
        salary_hra:                     joi.string().required(),
        salary_other_allowances:        joi.string().allow('',null),
        salary_misc_expences:           joi.string().allow('',null),
        salary_prof_tax:                joi.string().allow('',null),
        salary_pf:                      joi.string().allow('',null)                                                                          ,
        salary_yearly_incentive:        joi.string().allow('',null),
        salary_diwali_bonus:            joi.string().allow('',null),
        emplyee_id:                     joi.string().required(),
        salary_month:                   joi.string().required(),
    })
};

module.exports = schema;
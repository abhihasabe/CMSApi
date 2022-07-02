const {
    salary
} = require("./salary.schema");

module.exports = {
    addExpenceValidation: async (req, res, next) => {
        const value = await expence.validate(req.body);
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    }
};
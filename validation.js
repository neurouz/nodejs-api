const Joi = require("joi");

const RegisterUserValidation = async(data) => {
    const schema = Joi.object({
        firstName: Joi.string().max(255).required().label("Ime nije validno"),
        lastName: Joi.string().max(255).required().label("Prezime nije validno"),
        username: Joi.string().min(3).max(150).required().label("Korisničko ime nije validno"),
        password: Joi.string().min(8).max(1024).required().label("Lozinka nije validna")
    });
    await schema.validateAsync(data);
};

const LoginUserValidation = async(data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(150).required().label("Korisničko ime nije validno"),
        password: Joi.string().min(8).max(1024).required().label("Lozinka nije validna")
    });
    await schema.validateAsync(data);
}

module.exports.RegisterUserValidation = RegisterUserValidation;
module.exports.LoginUserValidation = LoginUserValidation;
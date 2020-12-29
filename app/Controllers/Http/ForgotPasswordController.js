'use strict'

const cryptp = require('crypto');
const User = use('App/Models/User');

class ForgotPasswordController {
  async store({ request, response }) {
    try{
      const email = request.input('email');

      const user = await User.findByOrFail('email', email);

      user.token = cryptp.randomBytes(10).toString('hex');
      user.token_created_at = new Date();

      await user.save();
    }catch(err){
      return response.status(err.status).send({ error: { message: 'Algo nao deu certo, esse e-mail existe?'}});
    }
  }
}


module.exports = ForgotPasswordController

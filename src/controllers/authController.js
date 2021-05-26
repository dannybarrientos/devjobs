const passport = require('../config/passport');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect : '/ok',
    failureRedirect : '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage : 'Ambos campos son obligatorio'
})
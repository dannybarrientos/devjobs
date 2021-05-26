const passport = require('../config/passport');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect : '/ok',
    failureRedirect : '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage : 'Ambos campos son obligatorio'
})

exports.mostrarPanel = (req, res) => {
    res.render('administracion', {
        nombrePagina: 'Panel de Adminitracion',
        tagline: 'Crear y Administra tus vacantes desde aquí ',
    })
}
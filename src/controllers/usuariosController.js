exports.formCrearCuenta = (req, res ) => { 
    res.render('crear-cuenta',{
        nombrePagina: 'Crear tu cuenta en devJobs',
        tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    })
}
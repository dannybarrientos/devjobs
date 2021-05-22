exports.formularioNuevaVacante = (req, res) =>{
    res.render('nueva-vacante',{
        nombrePagina:'Nueva Vacante',
        tagline: 'Llena el formulario y publicar tus vacantes'
    })
}
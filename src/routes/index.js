const  express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
const usuariosController = require('../controllers/usuariosController');


module.exports = () => {
    //TODO Home Page
    router.get('/', homeController.mostrarTrabajos);

    //TODO Crear Vacantes
    router.get('/vacantes/nueva', vacantesController.formularioNuevaVacante);
    router.post('/vacantes/nueva', vacantesController.agregarVacante);

    //TODO MOstrar vacantes (singular)
    router.get('/vacantes/:url', vacantesController.mostrarVacante);

    //TODO Editar Vacantes
    router.get('/vacantes/editar/:url',vacantesController.formEditarVacante);
    router.post('/vacantes/editar/:url',vacantesController.editarVacante);

    //TODO Crear Cuentas
    router.get('/crear-cuenta', usuariosController.formCrearCuenta)
    router.post('/crear-cuenta',
    usuariosController.validarRegistro,
    usuariosController.crearUsuario)

    return router;
}

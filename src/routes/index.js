const  express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');



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
    usuariosController.crearUsuario
    );

    //TODO Autenticar Usuarios
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion)
    router.post('/iniciar-sesion', authController.autenticarUsuario)

    //TODO Panel de adminitracion
    router.get('/administracion', authController.mostrarPanel)

    return router;
}

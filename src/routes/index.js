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
    router.get('/vacantes/nueva',
        authController.verificarUsuario,
        vacantesController.formularioNuevaVacante
    );

    router.post('/vacantes/nueva',
        authController.verificarUsuario,
        vacantesController.validarVacante,
        vacantesController.agregarVacante
     );

    //TODO MOstrar vacantes (singular)
    router.get('/vacantes/:url', vacantesController.mostrarVacante);

    //TODO Editar Vacantes
    router.get('/vacantes/editar/:url',
        authController.verificarUsuario,
        vacantesController.formEditarVacante
    );

    router.post('/vacantes/editar/:url',
        authController.verificarUsuario,
        vacantesController.editarVacante
    );

    //TODO Crear Cuentas
    router.get('/crear-cuenta', usuariosController.formCrearCuenta)
    router.post('/crear-cuenta',
    usuariosController.validarRegistro,
    usuariosController.crearUsuario
    );

    //TODO Autenticar Usuarios
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion)
    router.post('/iniciar-sesion', authController.autenticarUsuario)

    //TODO Cerrar Sesion
    router.get('/cerrar-sesion',
        authController.verificarUsuario,
        authController.cerrarSesion
    );

    //TODO Panel de adminitracion
    router.get('/administracion',
        authController.verificarUsuario,
        authController.mostrarPanel
    );
    //TODO Editar Perfil
    router.get('/editar-perfil',
        authController.verificarUsuario,
        usuariosController.formEditarPerfil
    );
    router.post('/editar-perfil',
        authController.verificarUsuario,
        usuariosController.editarPerfil
    );

    return router;
}

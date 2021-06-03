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
        vacantesController.validarVacante,
        vacantesController.editarVacante
    );

    //TODO Eliminar Vacantes
    router.delete('/vacantes/eliminar/:id',
        vacantesController.eliminarVacante
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

    //TODO Resetear password (email)
    router.get('/restablecer-password', authController.formRestablecerPassword);
    router.post('/restablecer-password', authController.enviarToken);

    //TODO Resetear password(Almacenar en la bases de datos)
    router.get('/restablecer-password/:token', authController.restablecerPassword);


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
        // usuariosController.validarPerfil,
        usuariosController.subirImagen,
        usuariosController.editarPerfil
    );

    //TODO Recibir Mensaje de Candidadtos
    router.post('/vacantes/:url',
        vacantesController.subirCV,
        vacantesController.contactar
    );
    //TODO Muestra los candidatos por vacante
    router.get('/candidatos/:id',
        authController.verificarUsuario,
        vacantesController.mostrarCandidatos
    );
    return router;
}

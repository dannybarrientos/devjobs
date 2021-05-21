"use strict";

exports.mostrarTrabajos = function (req, res) {
  res.render('home', {
    nombrePagina: 'devJobs',
    tagline: 'Encuenra y publica trabajos para desarrollador web',
    barra: true,
    boton: true
  });
};
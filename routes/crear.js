const express = require("express");
const Tecni = require("../schema/tecnicos");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { username, apellido, cedula, fechaNac, genero, ciudad, direccion, telefono, email } = req.body;

  if (!username || !apellido || !cedula || !fechaNac || !genero || !ciudad || !direccion || !telefono || !email) {
    return res.status(409).json(
      jsonResponse(409, {
        error: "Llena todos los campos",
      })
    );
  }

  try {
    const user = new Tecni();
    const userExists = await user.usernameExists(cedula);

    if (userExists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "Esa cedula ya esta registrada",
        })
      );
    } else {
      const user = new Tecni({ idUser: req.user.id, username, apellido, cedula, fechaNac, genero, ciudad, direccion, telefono, email });

      user.save();

      res.json(
        jsonResponse(200, {
          message: "Tecnico creado exitosamente",
        })
      );
    }
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creando Tecnico",
      })
    );
  }
});

module.exports = router;
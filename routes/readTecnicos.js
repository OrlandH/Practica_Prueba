const express = require("express");
const router = express.Router();
const Tecni = require("../schema/tecnicos");

router.get("/", async (req, res) => {
    try {
      const items = await Tecni.find({ idUser: req.user.id });
      return res.json(items);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al obtener los todos" });
    }
  });



module.exports = router;

const router = require("express").Router();
const {
  models: { Dog, Type },
} = require("./db");

router.get("/types", async (req, res, next) => {
  try {
    res.send(await Type.findAll());
  } catch (err) {
    next(err);
  }
});

router.get("/dogs", async (req, res, next) => {
  try {
    res.send(await Dog.findAll());
  } catch (err) {
    next(err);
  }
});

router.post("/dogs", async (req, res, next) => {
  try {
    res.status(201).send(await Dog.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put("/dogs/:id", async (req, res, next) => {
  try {
    const dog = await Dog.findByPk(req.params.id);
    res.send(await dog.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/dogs/:id", async (req, res, next) => {
  try {
    const dog = await Dog.findByPk(req.params.id);
    await dog.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

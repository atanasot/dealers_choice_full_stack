const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4 } = Sequelize;
const sequelize = new Sequelize(
  process.env.DATABASR_URL || "postgres://localhost/dealers_choice_full_stack"
);

// Setting up the models

const Dog = sequelize.define("dog", {
  // id: {
  //   type: UUID,
  //   defaultValue: UUIDV4,
  //   allowNull: false,
  //   primaryKey: true
  // },
  name: {
    type: STRING(20),
    unique: true,    //check for upper case name?
    allowNull: false, 
    validate: {
      notEmpty: {
        msg: "Please provide a doggie name",
      },
      len: {
        args: [1, 20],
        msg: "Name is too long!",
      },
    },
  }, // do maybe a virtual box for the input that's added by the user
});

const Type = sequelize.define("type", {
  name: {
    type: STRING(20),
    unique: true,
  },
});

Dog.belongsTo(Type);
Type.hasMany(Dog);



const syncAndSeed = async () => {
  try {
    await sequelize.sync({ force: true });
    // seeding the breed table
    const goldenDoodle = await Type.create({ name: "goldendoodle" });
    const doubleDoodle = await Type.create({ name: "doubledoodle" });
    const berneDoodle = await Type.create({ name: "bernedoodle" });
    const labraDoodle = await Type.create({ name: "labradoodle" });
    const teddyBearDoodle = await Type.create({ name: "teddybeardoodle" });
    const other = await Type.create({name: 'other'})

    //seeding the dogs table
    const [
      eros,
      milli,
      chance,
      fiona,
      skipper,
      rooster,
      ollie,
      cooper,
      monroe,
      tali
    ] = await Promise.all(
      [
        "Eros",
        "Milli",
        "Chance",
        "Fiona",
        "Skipper",
        "Rooster",
        "Ollie",
        "Cooper",
        "Monroe",
        "Tali"
      ].map((name) => Dog.create({ name }))
    );

    //setting up the associations manually
    eros.typeId = goldenDoodle.id;
    milli.typeId = doubleDoodle.id;
    chance.typeId = labraDoodle.id;
    fiona.typeId = goldenDoodle.id;
    skipper.typeId = teddyBearDoodle.id;
    ollie.typeId = goldenDoodle.id;
    cooper.typeId = berneDoodle.id;
    monroe.typeId = berneDoodle.id;
    rooster.typeId = other.id
    tali.typeId = other.id

    // save the typeId from up above
    await Promise.all([
      eros.save(),
      milli.save(),
      chance.save(),
      fiona.save(),
      skipper.save(),
      ollie.save(),
      cooper.save(),
      monroe.save(),
      rooster.save(),
      tali.save()
    ]);
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sequelize,
  syncAndSeed,
  models: {
    Dog,
    Type,
  },
};

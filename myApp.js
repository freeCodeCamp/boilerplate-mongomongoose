require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://joshuah91:JOSEphine@cluster0.5ppqk2h.mongodb.net/cluster0?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const Schema22 = mongoose.Schema;

const personSchema = new Schema22({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

// let Person;

const createAndSavePerson = (done) => {
  var reactAdmin = new Person({
    name: "Balogun Joshua",
    age: 32,
    favoriteFoods: ["plantain", "Chicken", "Yoghurt"],
  });
  reactAdmin.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};
var arrayOfPeople = [
  { name: "Jay Balz", age: 30, favoriteFoods: ["tacos"] },
  { name: "Josh Balo", age: 28, favoriteFoods: ["beans"] },
  { name: "Joshuah", age: 26, favoriteFoods: ["bread"] },
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.error(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, person) {
    if (err) return console.error(err);
    done(null, person);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, person) {
    if (err) return console.error(err);
    done(null, person);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, person) {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save(function (err, updatedPerson) {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, updatedDoc) {
      if (err) return console.error(err);
      done(null, updatedDoc);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, removedDoc) {
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (err, response) {
    if (err) return console.log(err);
    done(null, response);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const findFoodPerson = Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function (err, person) {
      if (err) return console.log(err);
      done(null, person);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

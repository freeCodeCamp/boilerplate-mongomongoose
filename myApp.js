require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = {
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
};
//LOOK UP ALL THE METHODS AT https://mongoosejs.com/docs/api.html#query_Query-sort!!!
const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Danijela",
    age: 24,
    favoriteFoods: ["pizza", "banana", "peas", "chocolate"]
  });
  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  {
    name: "Jane",
    age: "22",
    favoriteFoods: ["pizza", "carrot"]
  },
  {
    name: "Luke",
    age: "27",
    favoriteFoods: ["steak", "cheese"]
  }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, names) => {
    if (err) return console.error(err);
    done(null, names);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, person) => {
    if (err) return console.error(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate( { name: personName }, { age: ageToSet }, { new: true }, (err, updated) => {
    if (err) return console.error(err);
    done(null, updated);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove( { _id: personId }, (err, query) => {
    if (err) return console.error(err);
    done(null, query);
  });
  /* OR, if it's something other than id
  Person.findOneAndRemove ( {_id: personId}, (err, query) => {
    if (err) return console.error(err);
    done(null, query);
  });*/
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, query) => {
    if (err) return console.error(err);
    done(null, query);
  });
};
/*"If you don’t pass the callback as the last argument to Model.find() (or to the other search methods), the query is not executed. You can store the query in a variable for later use." -fCC*/
//A note: .find is run on a model. Every following method is run on a query.
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person
  .find({ favoriteFoods: foodToSearch })
  .sort({ name: "asc" })
  .limit(2)
  .select("-age")
  .exec((err, query) => {
    if (err) return console.error(err);
    done(null, query);
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

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('DB connection successful')
  }
);

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Pablo",
    age: 35,
    favoriteFoods: ["Milanesa Napolitana"],
  });
  person.save(function (err, data) {
    done(null, data);
  });
};

const arrayOfPeople = [
  { name: "Dani", age: 38, favoriteFoods: ["Asado"] },
  { name: "Joel", age: 27, favoriteFoods: ["Pizza"] },
  { name: "Caro", age: 24, favoriteFoods: ["Bombas de papa"] },
  { name: "Lorena", age: 31, favoriteFoods: ["Carne al horno con pure"] },
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, person) => {
    done(null, person);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: [food] }, (err, people) => {
    done(null, people);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, people) => {
    done(null, people);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, person) => {
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName },
    { age: ageToSet },
    { new: true },
    (err, person) => {
      done(null, person);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, (err, person) => {
    done(null, person);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, person) => {
    done(null, person);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      done(null, data);
    })
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

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });





/** 2) Create a person model */
const { Schema } = mongoose;

// Schema
let personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age:  Number,
  favoriteFoods: [{ type: String }]
});

// Compiling our schema into a model
const Person = mongoose.model('Person', personSchema);





/** 3) Create and Save a Record of a Model */

var createAndSavePerson = function(done) {
  const person = new Person({
    name: 'Foo', 
    age: 55, 
    favouriteFoods: ['avocado']
  });
  
  person.save((err, data) => {
    if(err) {
      done(err);
    }
    
    done(null, data);
  }) 
};





/** 4) Create Many Records with model.create() */

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err) {
      done(err);
    }
    
    done(null, data);
  }) 
};





/** 5) Use model.find() to Search Your Database */

var findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if(err) {
      done(err);
    }
    done(null, data);
  })
};





/** 6) Use model.findOne() to Return a Single Matching Document from Your Database*/

var findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if(err) {
      done(err);
    }
    done(null, data);
  })
};





/** 7) Use model.findById() to Search Your Database By _id */

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if(err) {
      done(err);
    }
    done(null, data);
  })
};





/** 8) Perform Classic Updates by Running Find, Edit, then Save */

var findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};





/** 9) Perform New Updates on a Document Using model.findOneAndUpdate() */

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName}, { $set: { age: ageToSet } }, { new: true }, (err, data) => {
    if(err) return console.log(err);  
      done(null, data)
  });
};





/** 10) Delete One Document Using model.findByIdAndRemove */

const removeById = (personId, done) => {
  
  Person.findByIdAndRemove(personId, (err, person) => {
    if(err) return console.log(err); 
  
      done(null, person)
    });
};





/** 11) Delete Many Documents with model.remove() */

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, data) => {
    if(err) done(err);
    
    done(null, data);
  })
};




/** 12) Chain Search Query Helpers to Narrow Search Results */

var queryChain = (done) => {
  var foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if(err) done(err);
    
      done(null, data);
    });
}

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

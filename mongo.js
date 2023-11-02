const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.xueahrk.mongodb.net/Puhelinluettelo?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length == 3){
    console.log("Phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
      })
}else if(process.argv.length == 5){
    const person = new Person({
        id: Math.floor(Math.random() * 69000000),
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console. log('added', person.name, "number", person.number, "to Phonebook")
        mongoose.connection.close()
    })
}else{
    console.log("invalid amount of arguments")
    mongoose.connection.close()
}
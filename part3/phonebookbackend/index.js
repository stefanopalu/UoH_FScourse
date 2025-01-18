require('dotenv').config()
const express = require('express')
const morgan = require('morgan');
const cors = require('cors')
const path = require('path');
const Person = require('./models/person')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')));
console.log('Serving static files from:', path.join(__dirname, 'dist'));

morgan.token('body', (req, res) => {
  if (["POST"].includes(req.method)) {
    return JSON.stringify(req.body)
  }
  return ""
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const errorHandler = (error, request, response, next) => {
  console.error("Error name:", error.name)
  console.error("Error message:", error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' 
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message 
    })
  }

  next(error)
}

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.countDocuments().then(count => {
    response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${new Date()}</p>
    `)
    })
})

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
  })
  
  person.save()
  .then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;
  console.log('Received PUT request with body:', body);

  if (!body.name || !body.number) {
    console.log('Error: Name or number missing');
    return response.status(400).json({ 
      error: 'name or number missing' 
    });
  }

  const person = {
    name: body.name,
    number: body.number,
  };
  
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
});

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
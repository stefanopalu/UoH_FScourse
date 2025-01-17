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

let persons = [
]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
        `)
  })

  app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
  })

  app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })

  const generateId = () => {
    const newId = Math.floor(Math.random() * 100000)
    const ids = persons.map(person => person.id)
    if (!ids.includes(newId)) {
        return newId
    } else {
        return generateId()
    }to
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'name or number missing' 
        })
      }
    
    const names = persons.map(person => person.name)
    if (names.includes(body.name)) {
        return response.status(400).json({ 
          error: 'name must be unique' 
        })
      }
      
      const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
      }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
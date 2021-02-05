import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import Person from './Person'
import PersonForm from './PersonForm'
import personService from '../services/persons'
import Notification from './Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newFilter, setNewFilter] = useState('')
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [shownPersons, setShownPersons] = useState([...persons])
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    useEffect(() => {
        setShownPersons(persons.filter(person =>
            person.name.toLowerCase().includes(newFilter.toLowerCase())
        ))
    }, [newFilter, persons])

    const addPerson = (event) => {
        event.preventDefault()
        const existingPerson = persons.find(person => person.name === newName)
        if (existingPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                updatePerson(existingPerson.id)
                setNewName('')
                setNewNumber('')
            }
        } else {
            const newPerson = { name: newName, number: newNumber }
            personService
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setSuccessMessage(`Added ${newName}`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const deletePerson = id => {
        const personName = persons.find(person => person.id === id).name
        if (window.confirm(`Delete ${personName} ?`)) {
            personService
                .remove(id)
                .then(setPersons(persons.filter(person => person.id !== id)))
        }
    }

    const updatePerson = id => {
        const currentPerson = persons.find(person => person.id === id)
        const updatedPerson = { ...currentPerson, number: newNumber }

        personService
            .update(id, updatedPerson)
            .then(returnedPerson => {
                setSuccessMessage(`Updated ${newName}`)
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 5000)
                setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            })
            .catch(error => {
                setErrorMessage(`Information of ${newName} has already been removed from server`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setPersons(persons.filter(person => person.id !== id))
            })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification successMessage={successMessage} errorMessage={errorMessage} />
            <Filter
                value={newFilter}
                onChange={event => setNewFilter(event.target.value)}
            />

            <h2>add a new</h2>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
            />

            <h2>Numbers</h2>
            <ul>
                {shownPersons.map(person =>
                    <Person
                        key={person.id}
                        person={person}
                        deletePerson={() => deletePerson(person.id)}
                    />
                )}
            </ul>
        </div>
    )
}

export default App
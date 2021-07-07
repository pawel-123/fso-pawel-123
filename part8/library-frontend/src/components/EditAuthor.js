import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const EditAuthor = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS} ]
  })

  const options = authors.map(author => {
    return {
      value: author.name, label: author.name
    }
  })

  const submit = event => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: Number(born) }})

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (selectedOption) {
      setName(selectedOption.value)
    }
  }, [selectedOption])

  useEffect(() => {
    
  })

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          {/* <input 
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
          <Select 
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born
          <input 
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">edit birth year</button>
      </form>
    </div>
  )
}

export default EditAuthor
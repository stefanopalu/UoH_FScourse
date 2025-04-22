import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select';
import { EDIT_AUTHOR } from '../queries'

const AuthorForm = ({authors}) => {
      const [name, setName] = useState('')
      const [born, setBorn] = useState('')
      const [selectedOption, setSelectedOption] = useState(null)

      const authorsNames = authors.map((author) => ({ value: author.name, label:author.name}))

      const [ changeYear ] = useMutation(EDIT_AUTHOR)

      const handleSelect = (selectedOption) => {
        setSelectedOption(selectedOption)
      }

      const submit = async (event) => {
        event.preventDefault()
    
        changeYear({ variables: {name: selectedOption.value, setBornTo: Number(born)}})
    
        setSelectedOption(null)
        setBorn('')
      }


return (
    <div>
        <h2>Ser birthyear</h2>
        <form onSubmit={submit}>
        <Select
            value={selectedOption}
            onChange={handleSelect}
            options={authorsNames}
            />
        <div>
            born
            <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            />
        </div>
        <button type="submit">update author</button>
        </form>
    </div>
)
}

export default AuthorForm

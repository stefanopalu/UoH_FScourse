import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const AuthorForm = () => {
      const [name, setName] = useState('')
      const [born, setBorn] = useState('')

      const [ changeYear ] = useMutation(EDIT_AUTHOR)

      const submit = async (event) => {
        event.preventDefault()
    
        changeYear({ variables: {name, setBornTo: Number(born)}})
    
        setName('')
        setBorn('')
      }

return (
    <div>
        <h2>Ser birthyear</h2>
        <form onSubmit={submit}>
        <div>
            name
            <input
            value={name}
            onChange={({ target }) => setName(target.value)}
            />
        </div>
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

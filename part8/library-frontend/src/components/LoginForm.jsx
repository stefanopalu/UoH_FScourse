import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setUser, setPage }) => {
    if (!show) return null

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
      if (result.error) {
          console.error("Login Error:", result.error);
      }
  
      if (result.data) {
          console.log("Login Response Data:", result.data); 
          const token = result.data.login.value
          const user = result.data.login.user
          setToken(token)
          setUser(user)
          localStorage.setItem('user-token', token)
          setPage("authors")
      }
  }, [result.data, result.error])

    const submit = async (event) => {
        event.preventDefault()
        login({ variables: {username, password}})
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                  username <input
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                  />
                </div>
                <div>
                  password <input
                    type='password'
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                  />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm
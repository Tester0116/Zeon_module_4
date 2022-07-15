import { getBackError } from '../scripts/Auth/index.js'

export const getBooks = async () => {
  let books = []

  return books
}

export const signInApi = async (username, password) => {
  await fetch('http://localhost:1717/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ username: username, password: password }),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.token === undefined) return getBackError(res, 'error', 'signIn')

      getBackError('success', 'success', 'signIn')

      localStorage.setItem('token', res.token)
      localStorage.setItem('userData', JSON.stringify(res.data))
    })
    .catch((err) => console.log(err))
}

export const signUpApi = async (username, name, password, age) => {
  await fetch('http://localhost:1717/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      firstName: name,
      age: age,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.token === undefined) return getBackError(res, 'error', 'signUp')

      getBackError('success', 'success', 'signUp')

      localStorage.setItem('token', res.token)
      localStorage.setItem('userData', JSON.stringify(res.data))
    })
    .catch((err) => console.log(err))
}

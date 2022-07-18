import { getBackError } from '../scripts/Auth/index.js'
import { _renderBooks } from '../scripts/Books/index.js'

// ******************** START GET BOOKS ********************
export const getBooksApi = async (token) => {
  await fetch('http://localhost:1717/books', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'x-auth': token,
    },
  })
    .then((response) => response.json())
    .then((res) => _renderBooks(res))
    .catch((err) => console.log(err))
}
// ******************** END GET BOOKS ********************

// ******************** START DELETE THE BOOK ********************
export const deleteBookApi = async (token, id) => {
  await fetch(`http://localhost:1717/books/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'x-auth': token,
    },
  })
    .then((response) => response.json())
    .then((res) => res.success && location.reload())
    .catch((err) => console.log(err))
}
// ******************** END DELETE THE BOOK ********************

// ******************** START SIGN IN ********************
export const signInApi = async (username, password, btn) => {
  btn.innerHTML = `
<div class="loader-block">
<div class='loader-elements'></div>
<div class='loader-elements'></div>
<div class='loader-elements'></div>
<div class='loader-elements'></div>
</div>
`
  btn.disabled = true

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
    .catch(
      (err) =>
        err.message == 'Failed to fetch' &&
        getBackError('problem with server', 'error', 'signIn')
    )
    .finally(() => {
      btn.innerHTML = 'Login'
      btn.disabled = false
    })
}

// ******************** END SIGN IN ********************

// ******************** START SIGN UP ********************
export const signUpApi = async (username, name, password, age, btn) => {
  btn.innerHTML = `
<div class="loader-block">
<div class='loader-elements'></div>
<div class='loader-elements'></div>
<div class='loader-elements'></div>
<div class='loader-elements'></div>
</div>
`
  btn.disabled = true

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
    .catch(
      (err) =>
        err.message == 'Failed to fetch' &&
        getBackError('problem with server', 'error', 'signUp')
    )
    .finally(() => {
      btn.innerHTML = 'Login'
      btn.disabled = false
    })
}
// ******************** END SIGN UP ********************

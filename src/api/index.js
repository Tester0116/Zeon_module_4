import { getBackError } from '../scripts/Auth/index.js'
import { _renderBooks } from '../scripts/Books/index.js'

// ******************** START CREATE BOOK ********************
export const addBookApi = async (
  token,
  name,
  author,
  isFavorite = false,
  publishYear,
  publishHouse,
  pagesNumber,
  genres,
  originalLanguage
) => {
  await fetch('http://localhost:1717/books/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'x-auth': token,
    },
    body: JSON.stringify({
      name: name,
      author: author,
      isFavorite: isFavorite,
      publishYear: Number(publishYear),
      publishHouse: publishHouse,
      pagesNumber: Number(pagesNumber),
      genres: genres,
      originalLanguage: originalLanguage,
    }),
  })
    .then((response) => response.json())
    .then(
      (res) => console.log(res)
      // res.id && location.reload()
    )
    .catch((err) => console.log(err))
}
// ******************** END CREATE BOOK ********************

// ******************** START EDIT BOOK ********************
export const editBookApi = async (
  token,
  id,
  name,
  author,
  isFavorite = false,
  publishYear,
  publishHouse,
  pagesNumber,
  genres,
  originalLanguage
) => {
  await fetch(`http://localhost:1717/books/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'x-auth': token,
    },
    body: JSON.stringify({
      name: name,
      author: author,
      isFavorite: isFavorite,
      publishYear: Number(publishYear),
      publishHouse: publishHouse,
      pagesNumber: Number(pagesNumber),
      genres: genres,
      originalLanguage: originalLanguage,
    }),
  })
    .then((response) => response.json())
    .then((res) => res.id && location.reload())
    .catch((err) => console.log(err))
}
// ******************** END EDIT BOOK ********************

// ******************** START FAVORITE BOOK ********************
export const favoriteBookApi = async (token, id, isFavorite = false) => {
  await fetch(`http://localhost:1717/books/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'x-auth': token,
    },
    body: JSON.stringify({
      isFavorite: isFavorite,
    }),
  })
    .then((response) => response.json())
    .then((res) => console.log('success set favorite'))
    .catch((err) => console.log(err))
}
// ******************** END FAVORITE BOOK ********************

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

// ******************** START GET INFO ABOUT BOOK ********************

export const getBooksInfoApi = async (token, id, moreInfoBlock) => {
  await fetch(`http://localhost:1717/books/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'x-auth': token,
    },
  })
    .then((response) => response.json())
    .then((res) => {
      moreInfoBlock.innerHTML = `
      <h2 class="more-info__container--name text-center" id="moreInfo_name">
      ${res.name}
    </h2>
    <div class="more-info__container--sides">
      <div class="more-info__container--leftSide">
      ${
        res.author &&
        `<h4 class="more-info__container--author" id="moreInfo_author">
          Author: <span>${res.author}</span>
        </h4>`
      }
      ${
        res.originalLanguage
          ? `
        <h4 class="more-info__container--language" id="moreInfo_language">
          original language: <span>${res.originalLanguage}</span>
        </h4>`
          : ''
      }
      ${
        res.genres.length !== 0
          ? ` <h4 class="more-info__container--genres" id="moreInfo_genres">
          genres: <span>${res.genres.join(', ')}</span>
        </h4>`
          : ''
      }
      </div>

      <div class="more-info__container--rightSide">
      ${
        res.publishYear
          ? `<h4 class="more-info__container--year" id="moreInfo_year">
          publish year: <span>${res.publishYear}</span>
        </h4>`
          : ''
      }
        ${
          res.pagesNumber
            ? `<h4 class="more-info__container--pages" id="moreInfo_pages">
          pages number: <span>${res.pagesNumber}</span>
        </h4>`
            : ''
        }
        ${
          res.publishHouse
            ? `<h4 class="more-info__container--house" id="moreInfo_house">
          publish house: <span>${res.publishHouse}</span>
        </h4>`
            : ''
        }
      </div>
    </div>
    `
    })
    .catch((err) => console.log(err))
}
// ******************** END GET INFO ABOUT BOOK ********************

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

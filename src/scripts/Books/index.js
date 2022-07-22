import {
  addBookApi,
  deleteBookApi,
  editBookApi,
  favoriteBookApi,
  getBooksApi,
  getBooksInfoApi,
} from '../../api/index.js'
import { checkToken } from '../checkToken.js'

checkToken()

const booksContainer = document.querySelector('.books')

const toggleActive = (book) => {
  book.classList.toggle('active')
}

const storeData = JSON.parse(localStorage.getItem('userData'))
const username = document.getElementById('localUsername')
username ? (username.textContent = storeData.username) : null
const exitBtn = document.getElementById('exitBtn')
exitBtn?.addEventListener('click', exit)

function exit(params) {
  localStorage.removeItem('token')
  localStorage.removeItem('userData')
  location.replace('/')
}
// ******************** START FETCH BOOKS ********************

const token = localStorage.getItem('token')
const loader = document.getElementById('booksLoader')

booksContainer && getBooksApi(token)

export const _renderBooks = (booksData) => {
  booksData.forEach((book, index) => {
    const element = document.createElement('div')
    element.classList.add('books__book')
    element.id = book.id
    element.addEventListener('click', () => toggleActive(element), false)

    element.innerHTML = `
    <img
    class="books__book--front"
    src="../../assets/img/front.jpg"
    alt="front"
  />
  <p class='books__book--author'>${book.author}</p>
  <h3 class='books__book--name'>${book.name}</h3>
  <span class='books__book--year'>2020</span>
  <img
  class="books__book--back"
  src="../../assets/img/back.jpg"
  alt="back"
/>
<div class="books__book-favoritesblock">
<input class="books__book--favorite favorite" type="checkbox" ${
      book.isFavorite && 'checked'
    }/>
<i class="favorite-icon"></i>
<img
  src="../assets/svg/trash-icon.svg"
  class="books__book--delete delete"
  alt="trash icon"
/>
</div>

<div class="books__book_more-info-block">
<img
  class="books__book_more-info-block--question question"
  src="../assets/img/question-icon.png"
  alt="info icon"
  title="click to learn more"
/>
<img
  src="../assets/img/rewrite-icon.png"
  class="books__book_more-info-block--rewrite rewrite"
  alt="pen icon"
  title="click to edit"
/>
</div>
`
    booksContainer.append(element)
  })
  loader.classList = 'dn'
}
// ******************** END FETCH BOOKS ********************

// ******************** START FAVORITE ACTIONS ********************
const favoriteHandler = (el, e) => {
  e.stopPropagation()
  const id = el.parentNode.parentNode.id

  favoriteBookApi(token, id, el.checked)
}
const deletePopup = document.getElementById('deleteBookPopup')
const yes = document.getElementById('yes')
const no = document.getElementById('no')
const moreInfoBlock = document.getElementById('moreInfoBlock')

const hidePopup = () => deletePopup.classList.remove('active')

const deleteBookHandler = (id) => {
  deleteBookApi(token, id)
  hidePopup()
}

const deleteHandler = (el, e) => {
  e.stopPropagation()
  const id = el.parentNode.parentNode.id
  deletePopup.classList.add('active')

  yes.addEventListener('click', () => deleteBookHandler(id))
  no.addEventListener('click', hidePopup)
}

const _moreInfoHandler = (el, e) => {
  e.stopPropagation()
  // start get elements
  const moreInfoContainer = document.getElementById('moreInfoContainer')
  const hideInfoBlockBtn = document.querySelectorAll('.hideInfoBlock')
  // end get elements

  moreInfoBlock.classList.add('active')
  const id = el.parentNode.parentNode.id

  getBooksInfoApi(token, id, moreInfoContainer)
  hideInfoBlockBtn?.forEach((el) =>
    el.addEventListener('click', () => moreInfoBlock.classList.remove('active'))
  )
}

setTimeout(() => {
  const favoritesIcon = document.querySelectorAll('.favorite')
  const deleteIcon = document.querySelectorAll('.delete')
  const questionIcon = document.querySelectorAll('.question')

  favoritesIcon?.forEach((el) =>
    el.addEventListener('click', (e) => favoriteHandler(el, e))
  )
  deleteIcon?.forEach((el) =>
    el.addEventListener('click', (e) => deleteHandler(el, e))
  )
  questionIcon?.forEach((el) =>
    el.addEventListener('click', (e) => _moreInfoHandler(el, e))
  )
}, 1000)

// ******************** END FAVORITE ACTIONS ********************

// ******************** START ADD BOOKS ********************
const showAddBook = document.getElementById('showAddBookPopup')
const hideAddBook = document.getElementById('hideBookPopup')
const addBookPopup = document.getElementById('addBookPopup')

// get inputs
const name = document.getElementById('name')
const author = document.getElementById('author')
const publishYear = document.getElementById('year')
const publishHouse = document.getElementById('house')
const pagesNumber = document.getElementById('pagesNumber')
const originalLanguage = document.getElementById('language')

showAddBook?.addEventListener('mousemove', btnEffect)

function btnEffect(e) {
  const x = e.pageX - showAddBook?.offsetLeft
  const y = e.pageY - showAddBook?.offsetTop

  showAddBook?.style.setProperty('--x', x + 'px')
  showAddBook?.style.setProperty('--y', y + 'px')
}

const toggleAddBookPopup = () => addBookPopup.classList.toggle('active')

showAddBook?.addEventListener('click', toggleAddBookPopup)
hideAddBook?.addEventListener('click', toggleAddBookPopup)

// *** start tag actions ***
const genreInput = document.getElementById('genres')
const text_area = document.getElementById('addBookTextArea')
const tags_container = document.querySelector('.tags')
const genres = []

const focusArea = (area, genre) => {
  area.classList.add('focused')
  genre.focus()
}

text_area?.addEventListener('click', () => focusArea(text_area, genreInput))

const splitTag = (e, genre, array, tagsBlock) => {
  if (e.code == 'Space') {
    if (genre.value !== ' ') {
      createSpan(array, genre.value, tagsBlock)
      array.push(genre.value)
    }
    genre.value = ''
  }
}

genreInput?.addEventListener('keyup', (e) =>
  splitTag(e, genreInput, genres, tags_container)
)

function createSpan(array, span_text, tagsBlock) {
  if (array.includes(span_text)) return
  const tag = document.createElement('span')

  tag.textContent = span_text

  tagsBlock.append(tag)

  const tags = document.querySelectorAll('.tags span')
  removeTag(tags)
}

function removeTag(tags) {
  tags.forEach((tag) => {
    tag.addEventListener('click', () => {
      tag.remove()
      const index = genres.indexOf(tag.textContent)
      genres.splice(index, 1)
    })
  })
}
// *** end tag actions ***

const addBookForm = document.getElementById('addBookForm')

const addBookHandler = (e) => {
  e.preventDefault()
  addBookApi(
    token,
    name.value,
    author.value,
    false,
    publishYear.value,
    publishHouse.value,
    pagesNumber.value,
    genres,
    originalLanguage.value
  )
}

addBookForm?.addEventListener('submit', addBookHandler)

// ******************** END ADD BOOKS ********************

// ******************** START EDIT BOOK ********************
const hideEditBook = document.getElementById('hideEditBookPopup')
const editBookPopup = document.getElementById('editBookPopup')

let id = ''
const toggleEditPopup = () => editBookPopup.classList.toggle('active')

const showEditPopup = (e, el) => {
  e.stopPropagation()
  id = el.parentNode.parentNode.id
  toggleEditPopup()
}

hideEditBook?.addEventListener('click', toggleEditPopup)

setTimeout(() => {
  const showEditBook = document.querySelectorAll('.rewrite')

  showEditBook?.forEach((el) =>
    el.addEventListener('click', (e) => showEditPopup(e, el))
  )
}, 1000)

// *** start tag actions ***
const editGenreInput = document.getElementById('editGenres')
const editTextArea = document.getElementById('editTextArea')
const editTags_container = document.querySelector('.editTags')
const editGenresArray = []

editTextArea?.addEventListener('click', () => focusArea(text_area, genreInput))

editGenreInput?.addEventListener('keyup', (e) =>
  splitTag(e, editGenreInput, editGenresArray, editTags_container)
)

// *** end tag actions ***

// get inputs
const editName = document.getElementById('editName')
const editAuthor = document.getElementById('editAuthor')
const editPublishYear = document.getElementById('editYear')
const editHouse = document.getElementById('editHouse')
const editPagesNumber = document.getElementById('editPagesNumber')
const editLanguage = document.getElementById('editLanguage')

const editBookForm = document.getElementById('editBookForm')

const editBookHandler = (e) => {
  e.preventDefault()
  editBookApi(
    token,
    id,
    editName.value,
    editAuthor.value,
    false,
    editPublishYear.value,
    editHouse.value,
    editPagesNumber.value,
    editGenresArray,
    editLanguage.value
  )
}

editBookForm?.addEventListener('submit', editBookHandler)

// ******************** END EDIT BOOK ********************

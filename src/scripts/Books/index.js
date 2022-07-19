import { addBookApi, deleteBookApi, getBooksApi } from '../../api/index.js'
import { checkToken } from '../checkToken.js'

checkToken()

const booksContainer = document.querySelector('.books')

const toggleActive = (book) => {
  book.classList.toggle('active')
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
    src="https://images.wallpaperscraft.ru/image/single/kub_figura_temnyj_142157_1280x720.jpg"
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
  alt="unfavorite icon"

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
}
const deletePopup = document.getElementById('deleteBookPopup')
const yes = document.getElementById('yes')
const no = document.getElementById('no')

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

setTimeout(() => {
  const favoritesIcon = document.querySelectorAll('.favorite')
  const deleteIcon = document.querySelectorAll('.delete')

  favoritesIcon?.forEach((el, index) =>
    el.addEventListener('click', (e) => favoriteHandler(el, e))
  )
  deleteIcon?.forEach((el, index) =>
    el.addEventListener('click', (e) => deleteHandler(el, e))
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
const tagInput = document.getElementById('genres')
const text_area = document.getElementById('addBookTextArea')
const tags_container = document.querySelector('.tags')
const genres = []

text_area?.addEventListener('click', () => {
  text_area.classList.add('focused')
  tagInput.focus()
})

tagInput?.addEventListener('blur', () => {
  if (tags_container.innerText == '') text_area.classList.remove('focused')
  else text_area.classList.add('focused')
})

tagInput?.addEventListener('keyup', (e) => {
  if (e.code == 'Space') {
    if (tagInput.value !== ' ') {
      createSpan(tagInput.value)
      genres.push(tagInput.value)
    }
    tagInput.value = ''
  }
})

function createSpan(span_text) {
  if (genres.includes(span_text)) return
  const tag = document.createElement('span')

  tag.textContent = span_text

  tags_container.append(tag)

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

const bookForm = document.getElementById('addBookForm')

const addBookHandler = (e) => {
  e.preventDefault()
  console.log(originalLanguage.value)
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

bookForm?.addEventListener('submit', addBookHandler)

// ******************** END ADD BOOKS ********************

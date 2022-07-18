import { deleteBookApi, getBooksApi } from '../../api/index.js'
import { checkToken } from '../checkToken.js'

checkToken()

const booksContainer = document.querySelector('.books')

const toggleActive = (book) => {
  book.classList.toggle('active')
}

// ******************** START FETCH BOOKS ********************

const token = localStorage.getItem('token')
const loader = document.getElementById('booksLoader')

getBooksApi(token)

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

const favoriteHandler = (el, e) => {
  e.stopPropagation()
}
const deleteHandler = (el, e) => {
  e.stopPropagation()
  const id = el.parentNode.parentNode.id
  deleteBookApi(token, id)
}

setTimeout(() => {
  const favoritesIcon = document.querySelectorAll('.favorite')
  const deleteIcon = document.querySelectorAll('.delete')

  favoritesIcon.forEach((el, index) =>
    el.addEventListener('click', (e) => favoriteHandler(el, e))
  )
  deleteIcon.forEach((el, index) =>
    el.addEventListener('click', (e) => deleteHandler(el, e))
  )
}, 1000)

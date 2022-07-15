const books = document.querySelectorAll('.book')

const toggleActive = (book) => {
  book.classList.toggle('active')
}

books.forEach((element) =>
  element.addEventListener('click', () => toggleActive(element), false)
)

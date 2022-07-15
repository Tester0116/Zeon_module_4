import { signInApi, signUpApi } from '../../api/index.js'

const formBox = document.getElementById('formBox')

// ***** SIGN UP *****
const signUpForm = document.getElementById('signUpForm')
const signUpBtn = document.getElementById('signUpBtn')
const signUpError = document.getElementById('signUpError')

const signUpSlide = () => {
  formBox.classList.add('active')
}

const signUp = (e) => {
  e.preventDefault()

  // *** Get elements  ***
  const signUpUsername = document.getElementById('signUpUsername').value
  const signUpName = document.getElementById('name').value
  const signUpFirstPassword = document.getElementById('firstPassword').value
  const signUpSecondPassword = document.getElementById('secondPassword').value
  const signUpAge = document.getElementById('age').value
  // *** end  ***

  if (signUpFirstPassword !== signUpSecondPassword) {
    signUpError.textContent = "passwords don't match"
    return signUpError.classList.add('error')
  }
  signUpError.classList.remove('error')
  signUpError.textContent = ' '

  signUpApi(signUpUsername, signUpName, signUpFirstPassword, signUpAge)
}

signUpBtn.addEventListener('click', signUpSlide)
signUpForm.addEventListener('submit', signUp)

// ******************** START SIGN IN ********************
const signInForm = document.getElementById('signInForm')
const username = document.getElementById('username')
const password = document.getElementById('password')
const signInBtn = document.getElementById('signInBtn')
const signInErrorText = document.getElementById('signInErrorText')

const signInSlide = () => {
  formBox.classList.remove('active')
}

const signIn = (e) => {
  e.preventDefault()
  signInApi(username.value, password.value)
}

signInBtn.addEventListener('click', signInSlide)
signInForm.addEventListener('submit', signIn)

// ******************** END SIGN IN ********************

export const getBackError = (errText, type, auth) => {
  const element = auth === 'signIn' ? signInErrorText : signUpError

  element.textContent = errText

  if (type == 'error') {
    element.classList.remove('success')
    return element.classList.add('error')
  } else {
    element.classList.remove('error')
    element.classList.add('success')
  }
  location.assign('books.html')
}

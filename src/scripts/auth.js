const signInBtn = document.getElementById('signInBtn')
const signUpBtn = document.getElementById('signUpBtn')
const formBox = document.getElementById('formBox')

const signUp = () => {
  formBox.classList.add('active')
}

signUpBtn.addEventListener('click', signUp)

const signIn = () => {
  formBox.classList.remove('active')
}

signInBtn.addEventListener('click', signIn)

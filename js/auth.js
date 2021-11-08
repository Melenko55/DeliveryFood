const auth = () => {
    const buttonAuth = document.querySelector('.button-auth')
    const modalAuth = document.querySelector('.modal-auth')
    const closeAuth = document.querySelector('.close-auth')
    const logInForm = document.getElementById('logInForm')
    const inputLogin = document.getElementById('login')
    const inputPassword = document.getElementById('password')
    const buttonOut = document.querySelector('.button-out')
    const userName = document.querySelector('.user-name')
    const buttonCart = document.querySelector(".button-cart")
    const logIn = ({login}) => {
        buttonAuth.style.display = 'none'

        buttonOut.style.display = 'flex'
        userName.style.display = 'flex'
        buttonCart.style.display = 'flex'

        userName.textContent = login
        modalAuth.style.display = 'none'
    }

    const logOut = () => {
        buttonCart.style.display = 'none'
        buttonAuth.style.display = 'flex'

        buttonOut.style.display = 'none'
        userName.style.display = 'none'
        userName.textContent = ''

        localStorage.removeItem('user')
    }

    buttonAuth.addEventListener('click', () => {
        modalAuth.style.display = 'flex'
    })

    closeAuth.addEventListener('click', () => {
        modalAuth.style.display = 'none'
    })

    logInForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const user = {
            login: inputLogin.value.trim(),
            password: inputPassword.value
        }
        
        if (!user.login) {
            //Коментарий в случае если нужно закрывать модальное окно
            // modalAuth.style.display = 'none'
            alert("You forgot to enter login! Try one more time")
            return
        }

        localStorage.setItem('user', JSON.stringify(user))
        logIn(user)
        
    });

    buttonOut.addEventListener('click', () => {
        logOut()
    })

    if (localStorage.getItem('user')) {
        logIn(JSON.parse(localStorage.getItem('user')))
    }
}
auth()
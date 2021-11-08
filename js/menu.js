const menu = () => {
    const cardsMenu = document.querySelector('.cards-menu')
    const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

    const changeTitle = (restaurant) => {
        const restaurantTitle = document.querySelector('.menu .restaurant-title')
        const rating = document.querySelector('.card-info .rating')
        const price = document.querySelector('.card-info .price')
        const category = document.querySelector('.card-info .category')
        
        restaurantTitle.textContent = restaurant.name
        rating.textContent = restaurant.stars
        price.textContent = `От ${restaurant.price} ₽`
        category.textContent = restaurant.kitchen
    }

    const addToCart = (cartItem) => {
        if (cartArray.some(item => item.id === cartItem.id)) {
            cartArray.map(item => {
                if (item.id === cartItem.id) {
                    item.count++
                }
                return item
            })
        } else {
            cartArray.push(cartItem)
        }
        
        localStorage.setItem('cart', JSON.stringify(cartArray))
    }

    const renderItems = (data) => {
        data.forEach( ({id, name, description, price, image}) => {
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
                <img src="${image}" alt="${name}" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title card-title-reg">${name}</h3>
                    </div>
                    <div class="card-info">
                        <div class="ingredients">${description}
                        </div>
                    </div>
                    <div class="card-buttons">
                        <button class="button button-primary button-add-cart">
                            <span class="button-card-text">В корзину</span>
                            <span class="button-cart-svg"></span>
                        </button>
                        <strong class="card-price-bold">${price} ₽</strong>
                    </div>
                </div>
            `

            card.querySelector('.button-card-text').addEventListener('click', () => {
                addToCart({ id, name, price,count: 1 })
            })
            cardsMenu.append(card)
        });
    }

    if (localStorage.getItem('restaurant')) {
        const restaurant = JSON.parse(localStorage.getItem('restaurant'))
        changeTitle(restaurant)
        fetch(`https://fooddelivery-2d4a7-default-rtdb.firebaseio.com/db/${restaurant.products}`)
        .then( (response) => response.json() )
        .then( (data) => renderItems(data) )
    } else {
        window.location.href = "/"
    }


}
menu()
const cardsMenu = document.querySelector('.cards-menu')

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

const renderItems = (data) => {
    data.forEach( ({name, description, price, image}) => {
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


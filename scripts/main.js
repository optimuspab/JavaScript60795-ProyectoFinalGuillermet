const filteredProducts = products.filter((producto) => {
    return producto.category === "web";
});

const webProductsCard = filteredProducts.reduce((acc, element) => {
    element.applyDiscount();
    const annualCost = Math.round(element.annualCost);
    const renovationCost = Math.round(element.renovationCost);
    const finalPrice = Math.round(element.finalPrice);
    const priceToShow = element.discount > 0 ? `<span class="text-danger"><del>$${element.price}</del></span>   $ ${finalPrice}` : `$${element.price}`;
    const discountToShow = element.discount > 0 ? `%${element.discount}` : `<del>%${element.discount}</del>`;
    const featuresHTML = element.features.map((feature) => `<li>${feature}</li>`).join('');

    return acc + `
        <div id="card" class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <h3 class="card-title">${element.title}</h3>
                            </li>
                            <li class="list-group-item">
                                <h4 class="card-subtitle">${element.subtitle}</h4>
                            </li>
                            <li class="list-group-item">
                                <p class="card-text lead">${element.description}</p>
                            </li>
                            <li class="list-group-item">
                                <h5 class="card-text">AHORRA: <span class="text-success">${discountToShow}</span></h5>
                            </li>
                            <li class="list-group-item">
                                <p class="card-text price text-primary" style="font-weight: bold;">${priceToShow}</p>
                            </li>
                            <li class="list-group-item">
                                <p class="card-text lead">
                                    Con un período de 1 año. Pagas <span class="text-success" style="font-weight: bold;">$ ${annualCost}</span> hoy.
                                    Renueva por <span class="text-success" style="font-weight: bold;">$ ${renovationCost}</span>.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-4 text-center">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <button id="cart-button" class="btn btn-primary select-button mt-3">Agregar al carrito</button>
                        </li>
                    </ul> 
                    <ul class="list-unstyled">
                        ${featuresHTML}
                    </ul>
                </div>
            </div>
        </div>
    `;
}, "");

const container = document.getElementById("web-gallery");

if (container) {
    container.innerHTML = webProductsCard;
}

//Web Theme

const navBar = document.getElementById("navbar-theme");
const themeButton = document.querySelector('#theme-toggle');
const cardTheme = document.querySelectorAll('#card');
const textFooter = document.querySelectorAll('#text-footer');

if (localStorage.getItem("dark-mode") === "yes") {
    document.body.classList.add('dark');
    themeButton.innerText = "Tema Claro";
    themeButton.classList.remove('btn-light');
    themeButton.classList.add('btn-dark');
    navBar.classList.toggle('dark-mode');
    cardTheme.forEach(card => {
        card.classList.remove('lightm');
        card.classList.add('darkm');
    });
    textFooter.forEach(text => {
        text.classList.remove('text-dark');
        text.classList.add('text-light');
    });
};

document.querySelector('#theme-toggle').addEventListener('click', () => {
    if (localStorage.getItem('dark-mode') === 'yes') {
        localStorage.setItem('dark-mode', 'no');
        themeButton.innerText = 'Tema Oscuro';
        themeButton.classList.remove('btn-light');
        themeButton.classList.add('btn-dark');
        navBar.classList.toggle('dark-mode');
        cardTheme.forEach(card => {
            card.classList.remove('darkm');
            card.classList.add('lightm');
        });
        textFooter.forEach(text => {
            text.classList.remove('text-light');
            text.classList.add('text-dark');
        });
    } else {
        localStorage.setItem('dark-mode', 'yes');
        themeButton.innerText = 'Tema Claro';
        themeButton.classList.add('btn-light');
        themeButton.classList.remove('btn-dark');
        navBar.classList.toggle('dark-mode');
        cardTheme.forEach(card => {
            card.classList.remove('lightm');
            card.classList.add('darkm');
        });
        textFooter.forEach(text => {
            text.classList.remove('text-dark');
            text.classList.add('text-light');
        });
    }
    document.body.classList.toggle('dark');
});


//Shopping cart

const productsCart = JSON.parse(localStorage.getItem("products")) || [];

const cartButton = document.querySelectorAll('#menu-cart-button');

function isCartNotEmpty() {
    return productsCart.length > 0;
};

if (isCartNotEmpty()) {
    cartButton.forEach(element => {
        element.classList.remove('bi-cart');
        element.classList.add('bi-cart-check');
    });
};

const productCounts = JSON.parse(localStorage.getItem("productCounts")) || {};

const addToCartButtons = document.querySelectorAll("#cart-button");

addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const selectedProduct = filteredProducts[index];

        if (productCounts[selectedProduct.title]) {
            productCounts[selectedProduct.title].count++;
        } else {
            productCounts[selectedProduct.title] = {
                count: 1,
                price: selectedProduct.finalPrice,
                annual: selectedProduct.annualCost,
                renovation: selectedProduct.renovationCost
            };
        }

        productsCart.push(selectedProduct);

        localStorage.setItem("products", JSON.stringify(productsCart));
        localStorage.setItem("productCounts", JSON.stringify(productCounts));


        document.querySelector(".container-notification").innerHTML = `
        <div class="container">
            <h2 class="mensaje">Tu producto <span class="text-success">${selectedProduct.title}</span> ha sido añadido al carrito. <h2>
            <a href="pages/cart.html">
                <span class="text-primary"><i id="menu-cart-button" class="bi bi-cart">Finalizar mi compra</i></span>
            </a>
            <div>
            <span id="cerrar-notificacion" class="text-danger">
                Cerrar
            </span>
        </div>
        </div>
        `
        document.querySelector(".container-notification").style.display = "block";

        cartButton.forEach(element => {
            element.classList.remove('bi-cart');
            element.classList.add('bi-cart-check');
        });

    });
});

const containerNotification = document.querySelector(".container-notification");

if (containerNotification) {
    containerNotification.onclick = (evento) => {
        if (evento.target.id === "cerrar-notificacion") {
            containerNotification.style.display = "none";
        }
    }
};

if (isCartNotEmpty()) {
    const productsListContainer = document.getElementById("selected-products-list");

    for (const title in productCounts) {
        if (productCounts.hasOwnProperty(title)) {
            const productCount = productCounts[title].count;
            const productPrice = productCounts[title].price;
            const productAnual = productCounts[title].annual;
            const productRenew = productCounts[title].renovation;

            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-condensed");

            const productContent = document.createElement("div");

            const titleElement = document.createElement("h6");
            titleElement.classList.add("my-0");
            titleElement.textContent = `${title} (${productCount})`;
            productContent.appendChild(titleElement);

            listItem.appendChild(productContent);

            const priceElement = document.createElement("span");
            priceElement.classList.add("text-primary");
            priceElement.textContent = "$ " + Math.round(productPrice * productCount);
            listItem.appendChild(priceElement);

            const checkboxAnual = document.createElement("div");
            checkboxAnual.classList.add("form-check");

            const inputAnnualCheck = document.createElement("input");
            inputAnnualCheck.classList.add("form-check-input");
            inputAnnualCheck.type = "checkbox";
            inputAnnualCheck.value = "";
            inputAnnualCheck.id = "annual-check";

            const labelAnnualCheck = document.createElement("label");
            labelAnnualCheck.classList.add("form-check-label");
            labelAnnualCheck.htmlFor = "annual-check";
            labelAnnualCheck.textContent = "Anual: $ " + Math.round(productAnual);

            checkboxAnual.appendChild(inputAnnualCheck);
            checkboxAnual.appendChild(labelAnnualCheck);
            listItem.appendChild(checkboxAnual);

            const checkboxRenew = document.createElement("div");
            checkboxRenew.classList.add("form-check");

            const inputRenewCheck = document.createElement("input");
            inputRenewCheck.classList.add("form-check-input");
            inputRenewCheck.type = "checkbox";
            inputRenewCheck.value = "";
            inputRenewCheck.id = "renewal-check";

            const labelRenewCheck = document.createElement("label");
            labelRenewCheck.classList.add("form-check-label");
            labelRenewCheck.htmlFor = "renewal-check";
            labelRenewCheck.textContent = "Renovación: $ " + Math.round(productRenew);

            checkboxRenew.appendChild(inputRenewCheck);
            checkboxRenew.appendChild(labelRenewCheck);
            listItem.appendChild(checkboxRenew);
                      
            const removeButton = document.createElement("button");
            removeButton.classList.add("btn", "btn-outline-danger", "btn-sm");
            removeButton.textContent = "Quitar";
            removeButton.addEventListener("click", () => removeFromCart(title));
            listItem.appendChild(removeButton);

            productsListContainer.appendChild(listItem);

        }
    }

    let checkoutPrice = 0;

    for (const title in productCounts) {
        if (productCounts.hasOwnProperty(title)) {
            const cartCount = productCounts[title].count;
            const cartPrice = productCounts[title].price;
            checkoutPrice += Math.round(cartPrice * cartCount);
        }
    }

    const priceListItem = document.createElement("li");
    priceListItem.classList.add("list-group-item", "d-flex", "justify-content-between");

    const checkoutPriceText = document.createElement("span");
    checkoutPriceText.classList.add("text-dark", "fw-bold");
    checkoutPriceText.textContent = "Total (USD)";

    const checkoutPriceNumber = document.createElement("strong");
    checkoutPriceNumber.classList.add("text-success");
    checkoutPriceNumber.textContent = "$ " + checkoutPrice;

    priceListItem.appendChild(checkoutPriceText);
    priceListItem.appendChild(checkoutPriceNumber);

    productsListContainer.appendChild(priceListItem);

}

const clearCartButton = document.createElement("button");
clearCartButton.classList.add("btn", "btn-danger", "mb-3");
clearCartButton.textContent = "Vaciar Carrito";
clearCartButton.addEventListener("click", clearCart);
document.getElementById("selected-products-list").appendChild(clearCartButton);

function updateCartView() {
    const productsListContainer = document.getElementById("selected-products-list");
    productsListContainer.innerHTML = "";

    const productCounts = JSON.parse(localStorage.getItem("productCounts")) || {};

    for (const title in productCounts) {
        if (productCounts.hasOwnProperty(title)) {
            const productCount = productCounts[title].count;
            const productPrice = productCounts[title].price;
            const productAnual = productCounts[title].annual;
            const productRenew = productCounts[title].renovation;

            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-condensed");

            const productContent = document.createElement("div");

            const titleElement = document.createElement("h6");
            titleElement.classList.add("my-0");
            titleElement.textContent = `${title} (${productCount})`;
            productContent.appendChild(titleElement);

            listItem.appendChild(productContent);

            const priceElement = document.createElement("span");
            priceElement.classList.add("text-primary");
            priceElement.textContent = "$ " + Math.round(productPrice * productCount);
            listItem.appendChild(priceElement);

            const checkboxAnual = document.createElement("div");
            checkboxAnual.classList.add("form-check");

            const inputAnnualCheck = document.createElement("input");
            inputAnnualCheck.classList.add("form-check-input");
            inputAnnualCheck.type = "checkbox";
            inputAnnualCheck.value = "";
            inputAnnualCheck.id = "annual-check";

            const labelAnnualCheck = document.createElement("label");
            labelAnnualCheck.classList.add("form-check-label");
            labelAnnualCheck.htmlFor = "annual-check";
            labelAnnualCheck.textContent = "Anual: $ " + Math.round(productAnual);

            checkboxAnual.appendChild(inputAnnualCheck);
            checkboxAnual.appendChild(labelAnnualCheck);
            listItem.appendChild(checkboxAnual);

            const checkboxRenew = document.createElement("div");
            checkboxRenew.classList.add("form-check");

            const inputRenewCheck = document.createElement("input");
            inputRenewCheck.classList.add("form-check-input");
            inputRenewCheck.type = "checkbox";
            inputRenewCheck.value = "";
            inputRenewCheck.id = "renewal-check";

            const labelRenewCheck = document.createElement("label");
            labelRenewCheck.classList.add("form-check-label");
            labelRenewCheck.htmlFor = "renewal-check";
            labelRenewCheck.textContent = "Renovación: $ " + Math.round(productRenew);

            checkboxRenew.appendChild(inputRenewCheck);
            checkboxRenew.appendChild(labelRenewCheck);
            listItem.appendChild(checkboxRenew);
                      
            const removeButton = document.createElement("button");
            removeButton.classList.add("btn", "btn-outline-danger", "btn-sm");
            removeButton.textContent = "Quitar";
            removeButton.addEventListener("click", () => removeFromCart(title));
            listItem.appendChild(removeButton);

            productsListContainer.appendChild(listItem);

            const clearCartButton = document.createElement("button");
            clearCartButton.classList.add("btn", "btn-danger", "mb-3");
            clearCartButton.textContent = "Vaciar Carrito";
            clearCartButton.addEventListener("click", clearCart);
            document.getElementById("selected-products-list").appendChild(clearCartButton);

        }
    }

    let checkoutPrice = 0;

    for (const title in productCounts) {
        if (productCounts.hasOwnProperty(title)) {
            const cartCount = productCounts[title].count;
            const cartPrice = productCounts[title].price;
            checkoutPrice += Math.round(cartPrice * cartCount);
        }
    }

    const priceListItem = document.createElement("li");
    priceListItem.classList.add("list-group-item", "d-flex", "justify-content-between");

    const checkoutPriceText = document.createElement("span");
    checkoutPriceText.classList.add("text-dark", "fw-bold");
    checkoutPriceText.textContent = "Total (USD)";

    const checkoutPriceNumber = document.createElement("strong");
    checkoutPriceNumber.classList.add("text-success");
    checkoutPriceNumber.textContent = "$ " + checkoutPrice;

    priceListItem.appendChild(checkoutPriceText);
    priceListItem.appendChild(checkoutPriceNumber);

    productsListContainer.appendChild(priceListItem);
}



function clearCart() {
    localStorage.removeItem("products");
    localStorage.removeItem("productCounts");

    updateCartView();
}

function removeFromCart(title) {
    const productsCart = JSON.parse(localStorage.getItem("products")) || [];
    const productCounts = JSON.parse(localStorage.getItem("productCounts")) || {};

    if (productCounts[title]) {
        productCounts[title].count--;

        if (productCounts[title].count === 0) {
            delete productCounts[title];
            localStorage.setItem("products", JSON.stringify(productsCart.filter(product => product.title !== title)));
        }

        localStorage.setItem("productCounts", JSON.stringify(productCounts));
    }

    updateCartView();
}

const formulario = document.querySelector('.needs-validation');

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputNombre = document.getElementById('firstName');
    const inputApellido = document.getElementById('lastName');
    const inputEmail = document.getElementById('email');
    const inputCredit = document.getElementById('credit');
    const inputDebit = document.getElementById('debit');
    const inputCCName = document.getElementById('cc-name');
    const inputCCNumber = document.getElementById('cc-number');
    const inputCCExpiration = document.getElementById('cc-expiration');
    const inputCCCVV = document.getElementById('cc-cvv');

    const feedbackNombre = inputNombre.nextElementSibling;

    if (inputNombre.value.trim() === '' || inputApellido.value.trim() === '' || inputEmail.value.trim() === '' || inputCCName.value.trim() === '' || inputCCNumber.value.trim() === '' || inputCCExpiration.value.trim() === '' || inputCCCVV.value.trim() === '') {
    
        feedbackNombre.style.display = 'block';
        return;

    } else {

        feedbackNombre.style.display = 'none';
    }

    if (!inputCredit.checked && !inputDebit.checked) {
        feedbackNombre.style.display = 'block';
        return;
    } else {

        feedbackNombre.style.display = 'none';
    }


    event.target.reset();
});


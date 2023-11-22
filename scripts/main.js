function initializePage() {
    function cardsBuilder(products) {
        return products.reduce((acc, element) => {
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
    }


    const webProductsArray = products.filter((producto) => {
        return producto.category === "web";
    });

    const vpsProductsArray = products.filter((producto) => {
        return producto.category === "vps";
    });

    const webProductsCard = cardsBuilder(webProductsArray);

    const containerWeb = document.getElementById("web-gallery");

    if (containerWeb) {
        containerWeb.innerHTML = webProductsCard;
    }

    const vpsProductsCard = cardsBuilder(vpsProductsArray);

    const containerVPS = document.getElementById("vps-gallery");

    if (containerVPS) {
        containerVPS.innerHTML = vpsProductsCard;
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

    const allProducts = products;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const selectedProduct = allProducts[index];

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

            Toastify({
                text: `Tu producto ${selectedProduct.title} ha sido añadido al carrito.`,
                duration: 5000,
                destination: "pages/cart.html",
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, transparent, #0056b3, #007bff )",
                },
            }).showToast();

            cartButton.forEach(element => {
                element.classList.remove('bi-cart');
                element.classList.add('bi-cart-check');
            });

        });
    });

    if (isCartNotEmpty()) {
        const productsListContainer = document.getElementById("selected-products-list");

        if (productsListContainer) {
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
                    priceElement.textContent = "Mes: $" + Math.round(productPrice * productCount);
                    listItem.appendChild(priceElement);

                    const annualElement = document.createElement("span");
                    annualElement.classList.add("text-primary");
                    annualElement.textContent = "Año: $" + Math.round(productAnual * productCount);
                    listItem.appendChild(annualElement);

                    const renewElement = document.createElement("span");
                    renewElement.classList.add("text-primary");
                    renewElement.textContent = "Renovación: $" + Math.round(productRenew * productCount);
                    listItem.appendChild(renewElement);

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
                    const cartAnnual = productCounts[title].annual;
                    const cartRenew = productCounts[title].renovation;

                    if (document.getElementById("monthly").checked) {
                        checkoutPrice += Math.round(cartPrice * cartCount);
                    } else if (document.getElementById("annual").checked) {
                        checkoutPrice += Math.round(cartAnnual * cartCount);
                    }
                }
            };

            const priceListItem = document.createElement("li");
            priceListItem.classList.add("list-group-item", "d-flex", "justify-content-between");

            const checkoutPriceText = document.createElement("span");
            checkoutPriceText.classList.add("text-dark", "fw-bold");
            checkoutPriceText.id = "currency-text";
            checkoutPriceText.textContent = "Total (USD)";

            const checkoutPriceNumber = document.createElement("strong");
            checkoutPriceNumber.classList.add("text-success");
            checkoutPriceNumber.id = "currency-number";
            checkoutPriceNumber.textContent = "$ " + checkoutPrice;

            priceListItem.appendChild(checkoutPriceText);
            priceListItem.appendChild(checkoutPriceNumber);

            productsListContainer.appendChild(priceListItem);

            const currencySwitch = document.createElement("li");
            currencySwitch.classList.add("list-group-item", "d-flex", "justify-content-between");

            const currencyContainer = document.createElement("div");
            currencyContainer.classList.add("form-check", "form-switch");

            const currencyInput = document.createElement("input");
            currencyInput.classList.add("form-check-input");
            currencyInput.type = "checkbox";
            currencyInput.id = "flexSwitchCheckCurrency";

            const currencyLabel = document.createElement("label");
            currencyLabel.classList.add("form-check-label");
            currencyLabel.htmlFor = "flexSwitchCheckCurrency";
            currencyLabel.textContent = "ARS";

            currencyContainer.appendChild(currencyInput);
            currencyContainer.appendChild(currencyLabel);

            currencySwitch.appendChild(currencyContainer);

            productsListContainer.appendChild(currencySwitch);

            const clearCartButton = document.createElement("button");
            clearCartButton.classList.add("btn", "btn-danger", "mb-3");
            clearCartButton.textContent = "Vaciar Carrito";
            clearCartButton.addEventListener("click", clearCart);
            document.getElementById("selected-products-list").appendChild(clearCartButton);

        }
    }

    function clearCart() {
        localStorage.removeItem("products");
        localStorage.removeItem("productCounts");

        updateCartView();

        Toastify({
            text: `Tu carrito esta vacío.`,
            duration: 5000,
            destination: "../index.html",
            newWindow: true,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, transparent, #0056b3, #007bff )",
            },
        }).showToast();
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

        Toastify({
            text: `${title} ha sido removido del carrito`,
            duration: 5000,
            destination: "cart.html",
            newWindow: true,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, transparent, #0056b3, #007bff )",
            },
        }).showToast();

    }

    function updateCartView(discount = 0) {
        const productsListContainer = document.getElementById("selected-products-list");
        productsListContainer.innerHTML = "";

        const productCounts = JSON.parse(localStorage.getItem("productCounts")) || {};

        for (const title in productCounts) {
            if (productCounts.hasOwnProperty(title)) {
                const cartCount = productCounts[title].count;
                const cartPrice = productCounts[title].price;
                const cartAnnual = productCounts[title].annual;
                const cartRenew = productCounts[title].renovation;

                const listItem = document.createElement("li");
                listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-condensed");

                const productContent = document.createElement("div");

                const titleElement = document.createElement("h6");
                titleElement.classList.add("my-0");
                titleElement.textContent = `${title} (${cartCount})`;
                productContent.appendChild(titleElement);

                listItem.appendChild(productContent);

                const priceElement = document.createElement("span");
                priceElement.classList.add("text-primary");
                priceElement.textContent = "Mes: $" + Math.round(cartPrice * cartCount);
                listItem.appendChild(priceElement);

                const annualElement = document.createElement("span");
                annualElement.classList.add("text-primary");
                annualElement.textContent = "Año: $" + Math.round(cartAnnual * cartCount);
                listItem.appendChild(annualElement);

                const renewElement = document.createElement("span");
                renewElement.classList.add("text-primary");
                renewElement.textContent = "Renovación: $" + Math.round(cartRenew * cartCount);
                listItem.appendChild(renewElement);

                const removeButton = document.createElement("button");
                removeButton.classList.add("btn", "btn-outline-danger", "btn-sm");
                removeButton.textContent = "Quitar";
                removeButton.addEventListener("click", () => removeFromCart(title));
                listItem.appendChild(removeButton);

                productsListContainer.appendChild(listItem);
            }

        }

        const checkoutPrice = calculateCheckoutPrice(productCounts, discount);

        displayCheckoutPrice(checkoutPrice);

        updatePriceDisplay();
        
    }

    const suscriptionMesInput = document.getElementById('monthly');
    const suscriptionAnualInput = document.getElementById('annual');
    const suscriptionRenewInput = document.getElementById('renew');

    suscriptionMesInput.addEventListener('change', function () {
        updateCartView();
    });

    suscriptionAnualInput.addEventListener('change', function () {
        updateCartView();
        suscriptionRenewInput.style.display = 'block';
    });

    suscriptionRenewInput.addEventListener('change', function () {
        updateCartView();
    });

    function validarCodigoPromocional(promoCode) {
        return promoCode === 'coderhouse';
    }

    let isPromoCodeApplied = false;

    document.getElementById('promoForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const promoCodeInput = document.getElementById('promoCodeInput');
        const promoCode = promoCodeInput.value.trim().toLowerCase();

        if (!isPromoCodeApplied && validarCodigoPromocional(promoCode)) {
            const checkoutPrice = calculateCheckoutPrice(productCounts);
            const discount = checkoutPrice * 0.1;
            updateCartView(discount);
            isPromoCodeApplied = true;

            Toastify({
                text: `Código promocional aplicado!`,
                duration: 5000,
                destination: "cart.html",
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, transparent, #0056b3, #007bff )",
                },
            }).showToast();
        } else if (isPromoCodeApplied) {
            Toastify({
                text: `El código promocional ya se ha aplicado.'`,
                duration: 5000,
                destination: "cart.html",
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, transparent, #DC4C64, #bb2d3b)",
                },
            }).showToast();
        } else {
            Toastify({
                text: `Código promocional inválido. Por favor, inténtelo de nuevo.`,
                duration: 5000,
                destination: "cart.html",
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, transparent, #DC4C64, #bb2d3b)",
                },
            }).showToast();
        }

        promoCodeInput.value = '';
    });


    function calculateCheckoutPrice(productCounts, discount = 0) {
        let checkoutPrice = 0;

        for (const title in productCounts) {
            if (productCounts.hasOwnProperty(title)) {
                const cartCount = productCounts[title].count;
                const cartPrice = productCounts[title].price;
                const cartAnnual = productCounts[title].annual;
                const cartRenew = productCounts[title].renovation;

                if (document.getElementById("monthly").checked) {
                    checkoutPrice += Math.round(cartPrice * cartCount);
                } else if (document.getElementById("annual").checked) {
                    checkoutPrice += Math.round(cartAnnual * cartCount);
                    if (document.getElementById("renew").checked) {
                        checkoutPrice += Math.round(cartRenew * cartCount);
                    }
                }
            }
        }

        return checkoutPrice - discount;
    }

    function displayCheckoutPrice(price) {
        const productsListContainer = document.getElementById("selected-products-list");

        const priceListItem = document.createElement("li");
        priceListItem.classList.add("list-group-item", "d-flex", "justify-content-between");

        const checkoutPriceText = document.createElement("span");
        checkoutPriceText.classList.add("text-dark", "fw-bold");
        checkoutPriceText.id = "currency-text";
        checkoutPriceText.textContent = "Total (USD)";

        const checkoutPriceNumber = document.createElement("strong");
        checkoutPriceNumber.classList.add("text-success");
        checkoutPriceNumber.id = "currency-number";
        checkoutPriceNumber.textContent = "$ " + price;

        priceListItem.appendChild(checkoutPriceText);
        priceListItem.appendChild(checkoutPriceNumber);

        productsListContainer.appendChild(priceListItem);

        const currencySwitch = document.createElement("li");
        currencySwitch.classList.add("list-group-item", "d-flex", "justify-content-between");

        const currencyContainer = document.createElement("div");
        currencyContainer.classList.add("form-check", "form-switch");

        const currencyInput = document.createElement("input");
        currencyInput.classList.add("form-check-input");
        currencyInput.type = "checkbox";
        currencyInput.id = "flexSwitchCheckCurrency";

        const currencyLabel = document.createElement("label");
        currencyLabel.classList.add("form-check-label");
        currencyLabel.htmlFor = "flexSwitchCheckCurrency";
        currencyLabel.textContent = "ARS";

        currencyContainer.appendChild(currencyInput);
        currencyContainer.appendChild(currencyLabel);

        currencySwitch.appendChild(currencyContainer);

        productsListContainer.appendChild(currencySwitch);

        const clearCartButton = document.createElement("button");
        clearCartButton.classList.add("btn", "btn-danger", "mb-3");
        clearCartButton.textContent = "Vaciar Carrito";
        clearCartButton.addEventListener("click", clearCart);
        productsListContainer.appendChild(clearCartButton);

    }

    // obtener valor del dolar

    let dolarToday = 0;

    async function dolarValue() {
        try {
            const response = await fetch("https://criptoya.com/api/dolar");
            const data = await response.json();

            const valorOficial = data.oficial;

            dolarToday = parseFloat(valorOficial);

            console.log(dolarToday);

        } catch (error) {
            console.error("Error al obtener el valor del dólar:", error);
        }
    }

    dolarValue();

    let currencyNumber = document.getElementById("currency-number");
    let currencyText = document.getElementById("currency-text");
    let currencySelector = document.getElementById("flexSwitchCheckCurrency");
    let currencyLabel = document.querySelector(".form-check-label[for='flexSwitchCheckCurrency']");
    let isARSSelected = false;
    
    function updatePriceDisplay() {
        if (isARSSelected) {
            currencyLabel.textContent = "Precio en USD";
            let num = currencyNumber.textContent.match(/\d/g);
            num = num.join("");
            num = parseFloat(num);
            currencyNumber.textContent = "$ " + num * dolarToday;
            currencyText.textContent = "Total (ARS)";
        } else {
            currencyLabel.textContent = "Precio en ARS";
            let num = currencyNumber.textContent.match(/\d/g);
            num = num.join("");
            num = parseFloat(num);
            currencyNumber.textContent = "$ " + Math.round(num / dolarToday);
            currencyText.textContent = "Total (USD)";
        }
    }


    currencySelector.addEventListener("change", function () {
        isARSSelected = !isARSSelected;
        updatePriceDisplay();
    });

    //Formulario finalización de compra

    const form = document.querySelector('.needs-validation');

    class CreditCardValidator {
        constructor() {
            this.cards = {
                mc: '5[1-5][0-9]{14}',
                ec: '5[1-5][0-9]{14}',
                vi: '4(?:[0-9]{12}|[0-9]{15})',
                ax: '3[47][0-9]{13}',
                dc: '3(?:0[0-5][0-9]{11}|[68][0-9]{12})',
                bl: '3(?:0[0-5][0-9]{11}|[68][0-9]{12})',
                di: '6011[0-9]{12}',
                jcb: '(?:3[0-9]{15}|(2131|1800)[0-9]{11})',
                er: '2(?:014|149)[0-9]{11}',
            };
        }

        validate(value, ccType) {
            value = String(value).replace(/[- ]/g, '');

            const cardInfo = this.cards;
            const results = [];

            if (ccType) {
                const expr = `^${cardInfo[ccType.toLowerCase()]}$`;
                return expr ? !!value.match(expr) : false;
            }

            for (const p in cardInfo) {
                if (value.match(`^${cardInfo[p]}$`)) {
                    results.push(p);
                }
            }

            return results.length ? results.join('|') : false;
        }
    }

    const creditCardValidator = new CreditCardValidator();

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {        
        const inputNombre = document.getElementById('firstName');
        const inputApellido = document.getElementById('lastName');
        const inputEmail = document.getElementById('email');
        const inputCCName = document.getElementById('cc-name');
        const inputCCNumber = document.getElementById('cc-number');
        const inputCCExpiration = document.getElementById('cc-expiration');
        const inputCCCVV = document.getElementById('cc-cvv');

        const isNombreValid = inputNombre.value.trim() !== '';
        const isApellidoValid = inputApellido.value.trim() !== '';
        const isEmailValid = isValidEmail(inputEmail.value);
        const isCCNameValid = inputCCName.value.trim() !== '';
        const isCCNumberValid = creditCardValidator.validate(inputCCNumber.value);
        const isCCExpirationValid = validateExpiration(inputCCExpiration.value);
        const isCCCVVValid = validateCVV(inputCCCVV.value);

        if (
            isNombreValid &&
            isApellidoValid &&
            isEmailValid &&
            isCCNameValid &&
            isCCNumberValid &&
            isCCExpirationValid &&
            isCCCVVValid
        ) {
            clearCart();

            form.reset();
    
            Toastify({
                text: '¡Formulario enviado con éxito!',
                duration: 3000,
                gravity: 'top',
                close: true,
                backgroundColor: 'green',
            }).showToast();
    
            return;
        }
        Toastify({
            text: 'Por favor, complete todos los campos correctamente.',
            duration: 3000, // Duración en milisegundos
            gravity: 'top', // Posición de la notificación
            close: true, // Agrega un botón de cierre
            backgroundColor: 'red', // Color de fondo
        }).showToast();
    }
        
        form.classList.add('was-validated');

    });
    

    form.addEventListener('input', function (event) {
        const input = event.target;
        if (input.checkValidity()) {
            input.classList.remove('is-invalid');
        } else {
            input.classList.add('is-invalid');
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    function validateCVV(cvv) {
        const cvvPattern = /^[0-9]{3,4}$/;
        return cvvPattern.test(cvv);
    };

    function validateExpiration(mmyy) {
        const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
        if (!regex.test(mmyy)) {
            return false;
        }
    
        const [mm, yy] = mmyy.split('/');
    
        const month = parseInt(mm, 10);
        const year = parseInt(yy, 10) + 2000;
    
        const currentYear = new Date().getFullYear();
    
        return month >= 1 && month <= 12 && year >= currentYear;
    }

}

document.addEventListener('DOMContentLoaded', function () {
    initializePage();
});

const products = [
    {
        "id": 1,
        "category": "web",
        "title": "Web Inicial",
        "subtitle": "PARA SITIOS SENCILLOS",
        "description": "Un hosting asequible y de bajo costo para empezar.",
        "price": 4.99,
        "discount": 0,
        "finalPrice": 0,
        "offer": false,
        "annualCost": 0,
        "features": [`<i class="bi bi-window-fullscreen"> 1 sitio web</i>`, `<i class="bi bi-database"> 1 base de datos</i>`, `<i class="bi bi-hdd"> 10 GB de almacenamiento</i>`, `<i class="bi bi-speedometer2"> 512 MB de RAM</i>`
        ],
        applyDiscount: function () {
            if (this.offer === true) {
                const discount = (this.discount / 100) * this.price;
                this.finalPrice = this.price - discount;
                this.annualCost = this.finalPrice * 12;
                this.renovationCost = this.price * 12;
            } else {
                this.finalPrice = this.price;
                this.annualCost = this.price * 12;
                this.renovationCost = this.price * 12;
            }
        }
    },
    {
        "id": 2,
        "category": "web",
        "title": "Web Económico",
        "subtitle": "PARA UN SOLO SITIO",
        "description": "Un plan rentable confiable, rápido y seguro, lo que es una gran opción de hosting para un solo sitio.",
        "price": 9.99,
        "discount": 30.00,
        "finalPrice": 0,
        "offer": true,
        "annualCost": 0,
        "renovationCost": 0,
        "features": [`<i class="bi bi-window-fullscreen"> 1 sitio web</i>`, `<i class="bi bi-database"> 10 base de datos</i>`, `<i class="bi bi-hdd"> 25 GB de almacenamiento</i>`, `<i class="bi bi-globe2"> Dominio gratis (valor de $ 11,
            99/año)</i>`, `<i class="bi bi-envelope"> Correo personalizado gratis (un valor de $ 23,
            88/año) - Primer año</i>`, `<i class="bi bi-file-lock"> Certificado SSL gratis (valor de $ 99,
            99/por año) - un año</i>`
        ],
        applyDiscount: function () {
            if (this.offer === true) {
                const discount = (this.discount / 100) * this.price;
                this.finalPrice = this.price - discount;
                this.annualCost = this.finalPrice * 12;
                this.renovationCost = this.price * 12;
            } else {
                this.finalPrice = this.price;
                this.annualCost = this.price * 12;
                this.renovationCost = this.price * 12;
            }
        }
    },
    {
        "id": 3,
        "category": "web",
        "title": "Web Deluxe",
        "subtitle": "PARA SITIOS MÚLTIPLES",
        "description": "Aloja hasta 10 sitios, y obtén el doble de almacenamiento del plan Económico y 15 bases de datos adicionales.",
        "price": 13.99,
        "discount": 28.00,
        "finalPrice": 0,
        "offer": true,
        "annualCost": 0,
        "renovationCost": 0,
        "features": [`<i class="bi bi-window-fullscreen"> 10 sitio web</i>`, `<i class="bi bi-database"> 25 base de datos</i>`, `<i class="bi bi-hdd"> 50 GB de almacenamiento</i>`, `<i class="bi bi-globe2"> Dominio gratis (valor de $ 11,
            99/año)</i>`, `<i class="bi bi-envelope"> Correo personalizado gratis (un valor de $ 23,
            88/año) - Primer año</i>`, `<i class="bi bi-file-lock"> Certificado SSL gratuito e ilimitado para todos tus sitios web3</i>`
        ],
        applyDiscount: function () {
            if (this.offer === true) {
                const discount = (this.discount / 100) * this.price;
                this.finalPrice = this.price - discount;
                this.annualCost = this.finalPrice * 12;
                this.renovationCost = this.price * 12;
            } else {
                this.finalPrice = this.price;
                this.annualCost = this.price * 12;
                this.renovationCost = this.price * 12;
            }
        }
    },
    {
        "id": 4,
        "category": "web",
        "title": "Web Ultimate",
        "subtitle": "MAYOR POTENCIA",
        "description": "Consigue un impulso importante para la velocidad del sitio y el volumen de la base de datos, lo que es una gran opción para el comercio electrónico.",
        "price": 17.99,
        "discount": 16.00,
        "finalPrice": 0,
        "offer": true,
        "annualCost": 0,
        "renovationCost": 0,
        "features": [`<i class="bi bi-window-fullscreen"> 25 sitio web</i>`, `<i class="bi bi-database"> 50 base de datos</i>`, `<i class="bi bi-hdd"> 75 GB de almacenamiento</i>`, `<i class="bi bi-globe2"> Dominio gratis (valor de $ 11,
            99/año)</i>`, `<i class="bi bi-envelope"> Correo personalizado gratis (un valor de $ 23,
            88/año) - Primer año</i>`, `<i class="bi bi-file-lock"> Certificado SSL gratuito e ilimitado para todos tus sitios web3</i>`
        ],
        applyDiscount: function () {
            if (this.offer === true) {
                const discount = (this.discount / 100) * this.price;
                this.finalPrice = this.price - discount;
                this.annualCost = this.finalPrice * 12;
                this.renovationCost = this.price * 12;
            } else {
                this.finalPrice = this.price;
                this.annualCost = this.price * 12;
                this.renovationCost = this.price * 12;
            }
        }
    },
    {
        "id": 5,
        "category": "vps",
        "title": "VPS Basic",
        "subtitle": "1 vCPU/2 GB de RAM",
        "description": "Para Pequeños Servicios.",
        "price": 9.99,
        "discount": 0.00,
        "finalPrice": 0,
        "offer": true,
        "annualCost": 0,
        "renovationCost": 0,
        "features": [`<i class="bi bi-cpu"> 1 núcleo vCPU</i>`, `<i class="bi bi-memory"> 2 GB de memoria RAM</i>`, `<i class="bi bi-nvme"> 40 GB de almacenamiento SSD NVMe</i>`, `<i class="bi bi-database-gear"> Respaldos instantáneos</i>`, `<i class="bi bi-ubuntu"> Linux solamente</i>`, `<i class="bi bi-sliders"> cPanel o Plesk disponible</i>`, `<i class="bi bi-ethernet"> 1 IP adicional disponible a pedido</i>`, `<i class="bi bi-globe"> 4 centros de datos globales</i>`
        ],
        applyDiscount: function () {
            if (this.offer === true) {
                const discount = (this.discount / 100) * this.price;
                this.finalPrice = this.price - discount;
                this.annualCost = this.finalPrice * 12;
                this.renovationCost = this.price * 12;
            } else {
                this.finalPrice = this.price;
                this.annualCost = this.price * 12;
                this.renovationCost = this.price * 12;
            }
        }
    },
    {
        "id": 6,
        "category": "vps",
        "title": "VPS Basic",
        "subtitle": "2 vCPU/4 GB de RAM",
        "description": "Diseñado para Pequeños Negocios.",
        "price": 19.99,
        "discount": 0.00,
        "finalPrice": 0,
        "offer": true,
        "annualCost": 0,
        "renovationCost": 0,
        "features": [`<i class="bi bi-cpu"> 2 núcleos vCPU</i>`, `<i class="bi bi-memory"> 4 GB de memoria RAM</i>`, `<i class="bi bi-nvme"> 100 GB de almacenamiento SSD NVMe</i>`, `Compatibilidad con <i class="bi bi-ubuntu"> Linux o </i><i class="bi bi-windows"> Windows</i>`, `<i class="bi bi-database-gear"> Respaldos instantáneos</i>`, `<i class="bi bi-sliders"> cPanel o Plesk disponible</i>`, `<i class="bi bi-ethernet"> 2 IP adicionales disponibles a pedido</i>`, `<i class="bi bi-globe"> 4 centros de datos globales</i>`
        ],
        applyDiscount: function () {
            if (this.offer === true) {
                const discount = (this.discount / 100) * this.price;
                this.finalPrice = this.price - discount;
                this.annualCost = this.finalPrice * 12;
                this.renovationCost = this.price * 12;
            } else {
                this.finalPrice = this.price;
                this.annualCost = this.price * 12;
                this.renovationCost = this.price * 12;
            }
        }
    },
    {
        "id": 7,
        "category": "vps",
        "title": "VPS Professional",
        "subtitle": "4 vCPU/8 GB de RAM",
        "description": "Para Servicios de Mayor Procesamiento.",
        "price": 39.99,
        "discount": 10.00,
        "finalPrice": 0,
        "offer": true,
        "annualCost": 0,
        "renovationCost": 0,
        "features": [`<i class="bi bi-cpu"> 4 núcleos vCPU</i>`, `<i class="bi bi-memory"> 8 GB de memoria RAM</i>`, `<i class="bi bi-nvme"> 200 GB de almacenamiento SSD NVMe</i>`, `Compatibilidad con <i class="bi bi-ubuntu"> Linux o </i><i class="bi bi-windows"> Windows</i>`, `<i class="bi bi-database-gear"> Respaldos instantáneos</i>`, `<i class="bi bi-sliders"> cPanel o Plesk disponible</i>`, `<i class="bi bi-ethernet"> 3 IP adicionales disponibles a pedido</i>`, `<i class="bi bi-globe"> 4 centros de datos globales</i>`
        ],
        applyDiscount: function () {
            if (this.offer === true) {
                const discount = (this.discount / 100) * this.price;
                this.finalPrice = this.price - discount;
                this.annualCost = this.finalPrice * 12;
                this.renovationCost = this.price * 12;
            } else {
                this.finalPrice = this.price;
                this.annualCost = this.price * 12;
                this.renovationCost = this.price * 12;
            }
        }
    },
    {
        "id": 8,
        "category": "vps",
        "title": "VPS Enterprise",
        "subtitle": "4 vCPU/16 GB de RAM",
        "description": "Para Servicios Demandantes en Recursos.",
        "price": 49.99,
        "discount": 15.00,
        "finalPrice": 0,
        "offer": true,
        "annualCost": 0,
        "renovationCost": 0,
        "features": [`<i class="bi bi-cpu"> 4 núcleos vCPU</i>`, `<i class="bi bi-memory"> 16 GB de memoria RAM</i>`, `<i class="bi bi-nvme"> 200 GB de almacenamiento SSD NVMe</i>`, `Compatibilidad con <i class="bi bi-ubuntu"> Linux o </i><i class="bi bi-windows"> Windows</i>`, `<i class="bi bi-database-gear"> Respaldos instantáneos</i>`, `<i class="bi bi-sliders"> cPanel o Plesk disponible</i>`, `<i class="bi bi-ethernet"> 3 IP adicionales disponibles a pedido</i>`, `<i class="bi bi-globe"> 4 centros de datos globales</i>`
    ],
        applyDiscount: function () {
            if (this.offer === true) {
                const discount = (this.discount / 100) * this.price;
                this.finalPrice = this.price - discount;
                this.annualCost = this.finalPrice * 12;
                this.renovationCost = this.price * 12;
            } else {
                this.finalPrice = this.price;
                this.annualCost = this.price * 12;
                this.renovationCost = this.price * 12;
            }
        }
    }
]
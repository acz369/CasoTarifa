const app = document.querySelector('.container')
const cardProducts = document.querySelector('#form');
const btnAdd = cardProducts.querySelector('a');
const idClient = document.querySelector('.id-client');
const infoPurchase = document.querySelector('.info-purchase');
const btnCalculate = document.querySelector('#calculate');
const url = "http://localhost:3000/api";
const listado = document.querySelector('.card');
let infoProduct;

document.addEventListener('readystatechange', () => {
    document.addEventListener('DOMContentLoaded', listProducts);
    cardProducts.addEventListener('click', addProduct);
    btnCalculate.addEventListener('click', calculateRate);
})

const getProducts = async () => {
    try {
        const resultado = await fetch(`${url}/products`);
        const products = await resultado.json();
        return products;
    } catch (error) {
        console.log(error);
    }
}

const getClients = async () => {
    try {
        const resultado = await fetch(`${url}/clients`);
        const client = await resultado.json();
        return client;
    } catch (error) {
        console.log(error);
    }
}


async function listProducts() {
    const products = await getProducts();

    products.forEach(product => {
        const { price, name, description } = product;
        const row = document.createElement('card');

        row.innerHTML += `
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">
                        <p class="card-text" id="price"> ${price} </p>
                        <p class="card-text" id="name"> ${name} </p>
                        <p class="card-text" id="description"> ${description} </p>
                        <a href="#" class="u-full-width button-primary button input" data-id="4">Add</a>
                    </div>
                </div>
            </div>
        </div>
        `;

        listado.appendChild(row);
    })
}

function addProduct() {
    const infoProduct = {
        price: cardProducts.querySelector('#price').textContent,
        name: cardProducts.querySelector('#name').textContent,
        description: cardProducts.querySelector('#description').textContent
    }
    idClient.style.display = 'block'
    return infoProduct
}

async function calculateRate(e) {
    e.preventDefault();
    const productSelected = addProduct()
    console.log(productSelected.price);
    let finalPrice = productSelected.price;
    const idClientSelect = document.querySelector('#id').value;
    const clients = await getClients();
    const clientSelect = clients.find(client => client.id == idClientSelect)
    console.log(productSelected);
    if (clientSelect.discount === 'yes' || clientSelect.discount === 'Yes') {
        finalPrice -= productSelected.price * 0.10
    }
    const row = document.createElement('card');
    row.innerHTML += `
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">
                        <p class="card-text" id="price"> ${finalPrice} </p>
                        <p class="card-text" id="name"> ${productSelected.name} </p>
                    </div>
                </div>
            </div>
        </div>
        `;
    infoPurchase.appendChild(row);
    setTimeout(() => {
        row.remove();
    }, 2000);

}




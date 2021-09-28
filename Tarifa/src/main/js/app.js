const url = "http://localhost:3000/api";
const app = document.querySelector('.container')
const cardProducts = document.querySelector('.card');
const idClient = document.querySelector('.id-client');
const infoPurchase = document.querySelector('.info-purchase');
const btnCalculate = document.querySelector('#calculate');
const listado = document.querySelector('#product-list');
const btnAdd = document.querySelector('tbody');
let productSelect;

document.addEventListener('readystatechange', () => {
    document.addEventListener('DOMContentLoaded', listProducts);    
    productSelect = btnAdd.addEventListener('click', addProduct);
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
        const row = document.createElement('tr');

        row.innerHTML += `
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <p class="text-sm leading-10 text-gray-700" id="price"> ${price} </p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <p class="text-sm leading-10 text-gray-700" id="name">${name}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">    
            <p class="text-sm leading-10 text-gray-700" id="description">${description}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
            <a href="#" class="add" >Add</a>
        </td>
        `;

        listado.appendChild(row);
    })
}

function addProduct(e) {
    var fila = e.target.parentNode;
    var filaP = fila.parentNode;
    const infoProduct = {
        price: filaP.children[0].textContent.trim(),
        name: filaP.children[1].textContent.trim(),
        description: filaP.children[2].textContent.trim()
    }
    productSelect = infoProduct;
    idClient.style.display = 'block'
    return infoProduct
}

async function calculateRate() {
    let finalPrice = productSelect.price;
    const idClientSelect = document.querySelector('#id').value;
    const clients = await getClients();
    const clientSelect = clients.find(client => client.id == idClientSelect)
    if (idClientSelect === '' || clientSelect === undefined) {
        alert("The field ID is invalid")
    } else {
        if (clientSelect.discount === 'yes' || clientSelect.discount === 'Yes') {
            finalPrice -= productSelect.price * 0.10
        }
        const row = document.createElement('card');
        row.innerHTML += `
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">
                        <p class="card-text" id="price"> ${finalPrice} </p>
                        <p class="card-text" id="name"> ${productSelect.name} </p>
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



}




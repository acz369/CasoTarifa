const app = document.querySelector('.container')
const cardProducts = document.querySelector('#form');
const url = "http://localhost:3000/api";
const listado = document.querySelector('.card');

document.addEventListener('readystatechange', () => {
    document.addEventListener('DOMContentLoaded', listProducts);
})

const getProducts = async () => {
    try {
        const resultado = await fetch(`${url}/products`);
        const products = await resultado.json();
        console.log(products);
        return products;
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
                        <p class="card-text"> ${price} </p>
                        <p class="card-text"> ${name} </p>
                        <p class="card-text"> ${description} </p>
                        <input type="submit" value="Prueba">
                    </div>
                </div>
            </div>
        </div>
        `;

        listado.appendChild(row);
    })
}



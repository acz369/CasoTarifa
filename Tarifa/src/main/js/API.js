const url = "http://localhost:3000/api";

export const getProducts = async () => {
    try {
        const resultado = await fetch(`${url}/products`);
        console.log(resultado);
        const products = await resultado.json();
        console.log(products);
        return products;
    } catch (error) {
        console.log(error);
    }
}

export const getClients = async id => {
    try {
        const resultado = await fetch(`${url}/${clients}`);
        const cliente = await resultado.json();
        return cliente;
    } catch (error) {
        console.log(error);
    }
}

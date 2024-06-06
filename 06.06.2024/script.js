fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const productsDiv = document.getElementById('products');

        // Iteriamo sui dati e creiamo gli elementi per il DOM
data.forEach(product => {
            // Creiamo un elemento div per la card del prodotto
            const productCard = document.createElement('div');
            productCard.className = 'card';

            // Aggiungiamo l'immagine
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.title;
            productCard.appendChild(img);

            // Aggiungiamo il titolo
            const title = document.createElement('h2');
            title.textContent = product.title;
            productCard.appendChild(title);

            // Aggiungiamo la descrizione
            const description = document.createElement('p');
            description.textContent = product.description;
            description.className = 'description';
            productCard.appendChild(description);

            // Aggiungiamo il prezzo
            const price = document.createElement('p');
            price.textContent = `Price: $${product.price}`;
            price.className = 'price';
            productCard.appendChild(price);

            // Aggiungiamo la card al div dei prodotti
            productsDiv.appendChild(productCard);
        });
    })
    .catch(error => console.error('Error on fetch data:', error));
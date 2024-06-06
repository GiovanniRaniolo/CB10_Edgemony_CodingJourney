const loadProductsBtn = document.getElementById('loadProductsBtn');

loadProductsBtn.addEventListener('click', () => {
    // Verifica
    if (document.querySelectorAll('.card').length > 0) {
        return; // Se i prodotti sono già stati caricati, esci dalla funzione
    }

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const productsDiv = document.getElementById('products');

            // Iteriamo sui dati
            data.forEach(product => {
                // Elemento div per la card del prodotto
                const productCard = document.createElement('div');
                productCard.className = 'card';

                // Immagine
                const img = document.createElement('img');
                img.src = product.image;
                img.alt = product.title;
                productCard.appendChild(img);

                // Titolo
                const title = document.createElement('h2');
                title.textContent = product.title;
                productCard.appendChild(title);

                // Descrizione
                const description = document.createElement('p');
                description.textContent = product.description;
                description.className = 'description';
                productCard.appendChild(description);

                // Prezzo
                const price = document.createElement('p');
                price.textContent = `Price: $${product.price}`;
                price.className = 'price';
                productCard.appendChild(price);

                // Aggiungiamo la card al div dei prodotti
                productsDiv.appendChild(productCard);
            });

            // Nascondi il bottone
            loadProductsBtn.style.display = 'none';
        })
        .catch(error => console.error('Error on fetch data:', error));
});

const loadProductsBtn = document.getElementById('loadProductsBtn');
const categorySelect = document.getElementById('categorySelect');

loadProductsBtn.addEventListener('click', () => {
    // Verifica se i prodotti sono già stati caricati
    if (document.querySelectorAll('.card').length > 0) {
        return; // Esci dalla funzione se i prodotti sono già stati caricati
    }

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const productsDiv = document.getElementById('products');

            // Itera sui dati
            data.forEach(product => {

                const productCard = document.createElement('div');
                productCard.className = 'card';
                productCard.dataset.category = product.category.toLowerCase(); // Aggiungi attributo data-category

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

                productsDiv.appendChild(productCard);
            });

            // Nascondi il bottone
            loadProductsBtn.style.display = 'none';

            categorySelect.style.display = 'block';
        })
        .catch(error => console.error('Error on fetch data:', error));
});

// Cambio di categoria
categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value.toLowerCase();

    // Seleziona tutte le card dei prodotti
    const productCards = document.querySelectorAll('.card');

    // Nasconde tutte le card dei prodotti
    productCards.forEach(card => {
        card.classList.add('hidden');
    });

    
    if (selectedCategory !== "") {
        // Mostra solo le card dei prodotti della categoria selezionata
        productCards.forEach(card => {
            const productCategory = card.dataset.category;
            if (productCategory === selectedCategory) {
                card.classList.remove('hidden'); // Rimuove la classe hidden se la categoria corrisponde
            }
        });
    } else {
        productCards.forEach(card => {
            card.classList.remove('hidden'); // Rimuove la classe hidden per mostrare tutte le card
        });
    }
});

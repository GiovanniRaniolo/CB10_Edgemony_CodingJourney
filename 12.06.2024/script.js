// API JS

const BASE_URL = "https://api.escuelajs.co/";
const getProductEndpoint = "api/v1/products";
const url = BASE_URL + getProductEndpoint;

const POST = async (product) => {
    // FETCH con metodo POST
    // richiede un body che verrà parsato a stringa con il metodo JSON.stringify()
    // dentro il body andranno i nostri dati che vogliamo comunicare al server
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(product),
    });

    const data = await res.json();
    console.log(url); //CONSOLE LOG

    return data.id;
};

const DELETE = async (productId) => {
    const deleteUrl = `${BASE_URL}${getProductEndpoint}/${productId}`;
    const res = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    });

    if (res.ok) {
        console.log(`Product with ID ${productId} deleted successfully`);
        showFeedback("Oggetto rimosso");
    } else {
        console.error(`Failed to delete product with ID ${productId}`);
        showFeedback("Errore nella rimozione dell'oggetto");
    }
};

// Funzione per mostrare il feedback visivo
const showFeedback = (message) => {
    const feedbackEl = document.querySelector('.feedback');
    feedbackEl.textContent = message;
    feedbackEl.style.display = 'block';

    setTimeout(() => {
        feedbackEl.style.display = 'none';
    }, 3000); // Nasconde il feedback dopo 3 secondi
};

//domUtils JS
const inputTitleEl = document.querySelector('.title');
const inputPriceEl = document.querySelector('.price');
const inputDescriptionEl = document.querySelector('.description');
const inputCategoryEl = document.querySelector('.category-id');
const inputImagesEl = document.querySelector('.images');
const buttonSendEl = document.querySelector('.button-send');
const deleteIdEl = document.querySelector('.delete-id'); // Seleziona l'elemento di input per l'ID da eliminare
const buttonDeleteEl = document.querySelector('.button-delete');

// Functions for input validation
function validateNumberInput(inputEl) {
    const value = inputEl.value;
    if (isNaN(value) || value === "") {
        inputEl.value = "";
        return false;
    }
    return true;
}

// events JS
buttonSendEl.addEventListener('click', async (e) => {
    e.preventDefault();
    const objProductForm = {
        title: inputTitleEl.value,
        price: inputPriceEl.value,
        description: inputDescriptionEl.value,
        categoryId: inputCategoryEl.value,
        images: [inputImagesEl.value],
    };

    const productId = await POST(objProductForm);
    console.log(`Product ID: ${productId}`);
});

buttonDeleteEl.addEventListener('click', async (e) => {
    e.preventDefault();
    const productId = deleteIdEl.value;
    if (productId) {
        await DELETE(productId);
    } else {
        console.error("Please enter a product ID to delete");
        showFeedback("Per favore inserisci un ID prodotto da eliminare");
    }
});

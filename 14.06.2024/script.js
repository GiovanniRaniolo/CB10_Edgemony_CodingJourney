// Funzione per stampare messaggi di log formattati
const logMessage = (type, message) => {
    switch (type) {
        case 'error':
            console.log("%c ERROR! " + message, "font-size: 2em; color: red;");
            break;
        case 'success':
            console.log("%c SUCCESS! " + message, "font-size: 2em; color: green;");
            break;
        case 'warning':
            console.log("%c WARNING! " + message, "font-size: 2em; color: yellow;");
            break;
        default:
            console.log(message); // In caso di tipo non riconosciuto, stampa solo il messaggio
    }
};

// API Endpoint
const BASE_URL = "https://api.escuelajs.co/";
const getProductEndpoint = "api/v1/products";
const url = BASE_URL + getProductEndpoint;

// HTTP Handle Request
const handleRequest = async (requestUrl, options) => {
    try {
        const res = await fetch(requestUrl, options);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Request failed');
        }

        if (res.status === 204) {
            return null;
        }

        return await res.json();
    } catch (error) {
        throw error;
    }
};

// GET Method
const GET = async (productId) => {
    try {
        const url = `${BASE_URL}${getProductEndpoint}/${productId}`;
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        };
        const response = await handleRequest(url, options);
        return response;
    } catch (error) {
        handleFeedback(error, `Error in search product: ${error.message}`);
    }
};

// POST Method
const POST = async (product) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(product),
        };

        const data = await handleRequest(url, options);
        handleFeedback(null, null, "Product created successfully");
        logMessage('success', "Product created");
        return data.id;
    } catch (error) {
        handleFeedback(error, `Error creating product: ${error.message}`);
        logMessage('error', "Failed to create product");
    }
};

// PUT Method
const PUT = async (productId, product) => {
    try {
        const putUrl = `${BASE_URL}${getProductEndpoint}/${productId}`;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(product),
        };

        const data = await handleRequest(putUrl, options);
        handleFeedback(null, null, "Product updated successfully");
        logMessage('success', "Product updated");
        return data.id;
    } catch (error) {
        handleFeedback(error, `Error updating product: ${error.message}`);
        logMessage('error', "Failed to update product");
    }
};

// DELETE Method
const DELETE = async (productId) => {
    try {
        const deleteUrl = `${BASE_URL}${getProductEndpoint}/${productId}`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        };

        await handleRequest(deleteUrl, options);
        handleFeedback(null, null, "Product deleted successfully");
        logMessage('success', "Product deleted");
    } catch (error) {
        handleFeedback(error, `Error deleting product: ${error.message}`);
        logMessage('error', "Failed to delete product");
    }
};

// DOM Elements
const inputIdEl = document.querySelector('.delete-id');
const inputTitleEl = document.querySelector('.title');
const inputPriceEl = document.querySelector('.price');
const inputDescriptionEl = document.querySelector('.description');
const inputCategoryEl = document.querySelector('.category-id');
const inputImagesEl = document.querySelector('.images');
const buttonSendEl = document.querySelector('.button-send');
const buttonDeleteEl = document.querySelector('.button-delete');
const buttonUpdateEl = document.querySelector('.button-update');
const buttonCheckEl = document.querySelector('.button-check');

// Event listener per invio prodotto
buttonSendEl.addEventListener('click', async (e) => {
    e.preventDefault();
    const title = inputTitleEl.value;
    const price = inputPriceEl.value;
    const description = inputDescriptionEl.value;
    const categoryId = inputCategoryEl.value;
    const images = [inputImagesEl.value];

    try {
        if (!title || !price || !description || !categoryId || !images[0]) {
            logMessage('warning', "All fields must be filled out");
            throw new Error("All fields must be filled out");
        }

        if (isNaN(price)) {
            logMessage('warning', "Invalid price");
            throw new Error("Invalid price");
        }

        if (isNaN(categoryId)) {
            logMessage('warning', "Invalid category ID");
            throw new Error("Invalid category ID");
        }

        const objProductForm = {
            title,
            price: parseFloat(price),
            description,
            categoryId: parseInt(categoryId),
            images,
        };

        const productId = await POST(objProductForm);
        handleFeedback(null, null, `Created with ID: ${productId}`);
        inputIdEl.value = productId;
    } catch (error) {
        handleFeedback(error, `Error creating product: ${error.message}`);
    }
});

// Event listener per eliminare prodotto
buttonDeleteEl.addEventListener('click', async (e) => {
    e.preventDefault();
    const productId = inputIdEl.value;

    try {
        if (!productId) {
            logMessage('warning', "Enter a product ID to delete");
            throw new Error("Enter a product ID to delete");
        }

        if (isNaN(productId)) {
            logMessage('warning', "Invalid product ID");
            throw new Error("Invalid product ID");
        }

        await DELETE(productId);
    } catch (error) {
        handleFeedback(error, `Error deleting product: ${error.message}`);
    }
});

// Event listener per aggiornare prodotto
buttonUpdateEl.addEventListener('click', async (e) => {
    e.preventDefault();
    const productId = inputIdEl.value;
    const title = inputTitleEl.value;
    const price = inputPriceEl.value;
    const description = inputDescriptionEl.value;
    const categoryId = inputCategoryEl.value;
    const images = [inputImagesEl.value];

    try {
        if (!productId) {
            logMessage('warning', "Enter a product ID to update");
            throw new Error("Enter a product ID to update");
        }

        if (!title || !price || !description || !categoryId || !images[0]) {
            logMessage('warning', "All fields must be filled out");
            throw new Error("All fields must be filled out");
        }

        if (isNaN(productId)) {
            logMessage('warning', "Invalid product ID");
            throw new Error("Invalid product ID");
        }

        if (isNaN(price)) {
            logMessage('warning', "Invalid price");
            throw new Error("Invalid price");
        }

        if (isNaN(categoryId)) {
            logMessage('warning', "Invalid category ID");
            throw new Error("Invalid category ID");
        }

        const objProductForm = {
            title,
            price: parseFloat(price),
            description,
            categoryId: parseInt(categoryId),
            images,
        };

        const updatedProductId = await PUT(productId, objProductForm);
        handleFeedback(null, null, "Product updated");
    } catch (error) {
        handleFeedback(error, `Error updating product: ${error.message}`);
    }
});

// Event listener per controllare prodotto
buttonCheckEl.addEventListener('click', async (e) => {
    e.preventDefault();
    const productId = inputIdEl.value;

    try {
        if (!productId) {
            logMessage('warning', "Enter a product ID to check");
            throw new Error("Enter a product ID to check");
        }

        if (isNaN(productId)) {
            logMessage('warning', "Invalid product ID");
            throw new Error("Invalid product ID");
        }

        const product = await GET(productId);

        if (!product) {
            throw new Error(`Product with ID ${productId} not found`);
        }

        // Populate the form fields with the product data
        inputTitleEl.value = product.title || '';
        inputPriceEl.value = product.price || '';
        inputDescriptionEl.value = product.description || '';
        inputCategoryEl.value = product.category?.id || '';
        inputImagesEl.value = (product.images && product.images.length > 0) ? product.images[0].replace(/[\[\]"]/g, '') : '';

        logMessage('success', "Product Fetched");
        handleFeedback(null, null, "Product fetched");
    } catch (error) {
        const errorMessage = error.message.includes("Product with ID") ? error.message : `Error fetching product: ${error.message}`;
        logMessage('error', "Failed to create product");
        handleFeedback(error, errorMessage);

        // Reset the input fields to their initial placeholder values
        inputTitleEl.value = '';
        inputPriceEl.value = '';
        inputDescriptionEl.value = '';
        inputCategoryEl.value = '';
        inputImagesEl.value = '';
    }
});

// Funzione per gestire errori e mostrare feedback visivo
const handleFeedback = (error, errorMessage = null, successMessage = null) => {
    const errorFeedbackEl = document.querySelector('.feedback.error');
    const successFeedbackEl = document.querySelector('.feedback.success');

    if (error) {
        console.error(error);
        errorFeedbackEl.textContent = errorMessage || `Error: ${error.message}`;
        errorFeedbackEl.style.display = 'block';
        successFeedbackEl.style.display = 'none';
    } else {
        successFeedbackEl.textContent = successMessage || 'Operation successful';
        successFeedbackEl.style.display = 'block';
        errorFeedbackEl.style.display = 'none';
    }

    setTimeout(() => {
        errorFeedbackEl.style.display = 'none';
        successFeedbackEl.style.display = 'none';
    }, 3000); // Nasconde il feedback dopo 3 secondi
};
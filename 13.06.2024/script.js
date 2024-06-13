// API Endpoint
const BASE_URL = "https://api.escuelajs.co/";
const getProductEndpoint = "api/v1/products";
const url = BASE_URL + getProductEndpoint;

//  HTTP Handle Request
const handleRequest = async (requestUrl, options) => {
    try {
        const res = await fetch(requestUrl, options);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Request failed');
        }

        return await res.json();
    } catch (error) {
        throw error;
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
        return data.id;
    } catch (error) {
        handleFeedback(error, `Error in creating product: ${error.message}`);
        throw error;
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
        return data.id;
    } catch (error) {
        handleFeedback(error, `Error in updating product: ${error.message}`);
        throw error;
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

        const res = await fetch(deleteUrl, options);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to delete product');
        }

        console.log(`Product with ID ${productId} deleted successfully`);
        handleFeedback(null, null, "Product deleted successfully"); // Feedback verde per successo
    } catch (error) {
        if (error.message.includes("Could not find any entity of type")) {
            handleFeedback(error, `Product with ID ${productId} not found`, null);
        } else {
            handleFeedback(error, `Error in deleting product: ${error.message}`);
        }
    }
};

// DOM Elements
let inputIdEl;

document.addEventListener('DOMContentLoaded', () => {
    inputIdEl = document.querySelector('.delete-id');

    const inputTitleEl = document.querySelector('.title');
    const inputPriceEl = document.querySelector('.price');
    const inputDescriptionEl = document.querySelector('.description');
    const inputCategoryEl = document.querySelector('.category-id');
    const inputImagesEl = document.querySelector('.images');
    const buttonSendEl = document.querySelector('.button-send');
    const buttonDeleteEl = document.querySelector('.button-delete');
    const buttonUpdateEl = document.querySelector('.button-update');

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
            throw new Error("All fields must be filled out");
        }

        if (isNaN(price)) {
            throw new Error("Received invalid number for price");
        }

        if (isNaN(categoryId)) {
            throw new Error("Received invalid number for category ID");
        }

        const objProductForm = {
            title,
            price: parseFloat(price),
            description,
            categoryId: parseInt(categoryId),
            images,
        };

        const productId = await POST(objProductForm);
        console.log(`Product ID: ${productId}`);
        handleFeedback(null, null, "Product created successfully");
    } catch (error) {
        console.error(`Failed to create product: ${error.message}`);
        handleFeedback(error, `Error in creating product: ${error.message}`);
    }
});

// Event listener per eliminare prodotto
buttonDeleteEl.addEventListener('click', async (e) => {
    e.preventDefault();
    const productId = inputIdEl.value;

    try {
        if (!productId) {
            throw new Error("Please enter a product ID to delete");
        }

        if (isNaN(productId)) {
            throw new Error("Received invalid number for product ID");
        }

        await DELETE(productId);
        handleFeedback(null, null, "Product deleted successfully");
    } catch (error) {
        console.error(`Failed to delete product: ${error.message}`);
        handleFeedback(error, `Error in deleting product: ${error.message}`);
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
                throw new Error("Please enter a product ID to update");
            }

            if (!title || !price || !description || !categoryId || !images[0]) {
                throw new Error("All fields must be filled out");
            }

            if (isNaN(productId)) {
                throw new Error("Received invalid number for product ID");
            }

            if (isNaN(price)) {
                throw new Error("Received invalid number for price");
            }

            if (isNaN(categoryId)) {
                throw new Error("Received invalid number for category ID");
            }

            const objProductForm = {
                title,
                price: parseFloat(price),
                description,
                categoryId: parseInt(categoryId),
                images,
            };

            const updatedProductId = await PUT(productId, objProductForm);
            console.log(`Updated Product ID: ${updatedProductId}`);
            handleFeedback(null, null, "Product updated successfully");
        } catch (error) {
            console.error(`Failed to update product: ${error.message}`);
            handleFeedback(error, `Error in updating product: ${error.message}`);
        }
    });
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
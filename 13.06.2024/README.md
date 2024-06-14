# Guida Completa e Dettagliata per Implementare Metodi POST, PUT e DELETE con Error Handling Visivo

Questa guida vi guiderà passo dopo passo nella creazione di una semplice applicazione web per inviare, aggiornare ed eliminare prodotti da un'API utilizzando i metodi HTTP POST, PUT e DELETE. Includeremo anche un sistema di feedback visivo per informare l'utente dell'esito delle operazioni. La guida è strutturata per chi ha poca esperienza con la programmazione e con JavaScript, spiegando ogni passaggio in dettaglio.

## Indice

- [Struttura del Progetto](#struttura-del-progetto)
- [HTML](#html)
- [CSS](#css)
- [JavaScript](#javascript)
  - [Configurazione dell'API Endpoint](#1-configurazione-dellapi-endpoint)
  - [Funzione `handleRequest`](#2-funzione-handlerequest-per-le-richieste-http)
  - [Metodo `POST` per Creare un Prodotto](#3-metodo-post-per-creare-un-prodotto)
  - [Metodo `PUT`](#4-metodo-put)
  - [Metodo `DELETE`](#5-metodo-delete)
  - [Gestione degli Elementi DOM e Event Listeners](#6-gestione-degli-elementi-dom-e-event-listeners)
  - [Funzione `handleFeedback`](#7-funzione-handlefeedback-per-gestire-errori-e-feedback-visivo)
- [Conclusione](#conclusione) 
- [Esempio di Utilizzo](#esempio-di-utilizzo)

## Struttura del Progetto

Il progetto è composto da tre linguaggi principali:

1.  **HTML**: La struttura del form e i bottoni per inviare, aggiornare ed eliminare i prodotti.
2.  **CSS**: Gli stili per i messaggi di feedback.
3.  **JavaScript**: La logica per gestire le richieste API e mostrare i messaggi di feedback.


## HTML

Il seguente codice HTML crea un form per inviare, aggiornare ed eliminare prodotti:


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestione Prodotti</title>
</head>
<body>
    <form action="submit" style="display: flex; flex-direction: column; max-width: 300px; gap: 12px">
        <input class="title" type="text" placeholder="Titolo" />
        <input class="price" type="number" placeholder="Prezzo" />
        <input class="description" type="text" placeholder="Descrizione" />
        <input class="category-id" type="number" placeholder="ID Categoria" />
        <input class="images" type="text" placeholder="Immagini (URL)" />
        <button class="button-send">Invia</button>
    </form>
    <div style="padding-top: 10px;">
        <input type="number" class="delete-id" placeholder="ID Prodotto">
        <button class="button-update">Aggiorna</button>
        <button class="button-delete">Elimina</button>
    </div>
    <div class="feedback-container">
        <div class="feedback error" style="display: none; background-color: #f44336; color: white; padding: 10px; margin-bottom: 10px;"></div>
        <div class="feedback success" style="display: none; background-color: #4CAF50; color: white; padding: 10px; margin-bottom: 10px;"></div>
    </div>
    <script type="module" src="./script.js"></script>
</body>
</html> 
```

### Spiegazione dell'HTML

-   **`<!DOCTYPE html>`**: Dichiara che il documento è un file HTML5.
-   **`<html lang="en">`**: Inizia il documento HTML e imposta la lingua del documento a inglese.
-   **`<head>`**: Contiene meta-informazioni sul documento come charset e viewport.
-   **`<body>`**: Contiene il contenuto visibile della pagina web.
-   **`<form>`**: Contiene campi di input e un pulsante per inviare un nuovo prodotto.
-   **`<input>`**: Campi di input per titolo, prezzo, descrizione, ID categoria e URL delle immagini.
-   **`<button>`**: Pulsanti per inviare, aggiornare ed eliminare prodotti.
-   **`<div class="feedback-container">`**: Contiene i messaggi di feedback per successo e errore.
-   **`<script type="module" src="./script.js"></script>`**: Include il file JavaScript che contiene la logica dell'applicazione.

## CSS

Gli stili per i messaggi di feedback sono inclusi direttamente nell'HTML come attributi di stile per semplicità:

html

Copia codice

```html
<div class="feedback error" style="display: none; background-color: #f44336; color: white; padding: 10px; margin-bottom: 10px;"></div>
<div class="feedback success" style="display: none; background-color: #4CAF50; color: white; padding: 10px; margin-bottom: 10px;"></div>
``` 

### Spiegazione del CSS

-   **`style="display: none; background-color: #f44336; color: white; padding: 10px; margin-bottom: 10px;"`**: Gli stili CSS sono definiti direttamente come attributi di stile. Questo approccio è usato qui per semplicità e facilità di comprensione.

## JavaScript


Il seguente codice JavaScript gestisce un'applicazione per la gestione di prodotti utilizzando chiamate API per le operazioni CRUD (Create, Read, Update, Delete). Esploreremo ogni parte del codice per capire come funziona e come interagisce con il DOM e le API.

#### 1. Configurazione dell'API Endpoint

```javascript
const BASE_URL = "https://api.escuelajs.co/";
const getProductEndpoint = "api/v1/products";
const url = BASE_URL + getProductEndpoint;
``` 
-   **`BASE_URL`**: URL di base dell'API. Tutte le richieste API partiranno da questo URL.
-   **`getProductEndpoint`**: Endpoint specifico per i prodotti. Questo viene aggiunto all'URL di base per ottenere l'URL completo dell'API.
-   **`url`**: L'URL completo per le richieste API.



#### 2. Funzione `handleRequest` per le Richieste HTTP




```javascript
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
```

**handleRequest**: Questa funzione è utilizzata per effettuare le chiamate HTTP tramite l'API `fetch`.

-   Accetta due parametri:
    -   `requestUrl`: L'URL della richiesta.
    -   `options`: Opzioni per la richiesta (metodo HTTP, intestazioni, corpo della richiesta).
-   Logica:
    -   Se la risposta non è ok (200-299), gestisce l'errore mostrando il messaggio di errore restituito dall'API.
    -   Se la richiesta ha successo, mostra un messaggio di feedback visivo di successo e restituisce i dati della risposta in formato JSON.

#### 3. Metodo `POST` per Creare un Prodotto

```javascript
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
``` 
**POST**: Questo metodo invia una richiesta POST per creare un nuovo prodotto.

-   Accetta un parametro `product`, che contiene i dati del prodotto da inviare.
-   Costruisce le opzioni per la richiesta POST, includendo il corpo della richiesta come JSON.
-   Utilizza `handleRequest` per eseguire effettivamente la richiesta.
-   Gestisce il feedback visivo tramite `handleFeedback`.
-   Restituisce l'ID del prodotto creato dalla risposta.

 

> **`product`**: Oggetto prodotto da inviare.   
> **`options`**: Opzioni della richiesta POST (metodo, intestazioni, corpo).  
> **`handleRequest`**: Chiama la funzione per gestire la richiesta.   
> **`handleFeedback`**: Mostra il feedback di successo o errore.   
> **`data.id`**: ID del prodotto creato.

#### 4. Metodo `PUT`

```javascript
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
``` 
**PUT**: Questo metodo esegue una richiesta PUT per aggiornare un prodotto esistente.

-   Accetta due parametri:
    -   `productId`: L'ID del prodotto da aggiornare.
    -   `product`: I nuovi dati del prodotto.
-   Costruisce l'URL PUT utilizzando l'endpoint e l'ID del prodotto.
-   Utilizza `handleRequest` per inviare la richiesta PUT.
-   Gestisce il feedback visivo tramite `handleFeedback`.
-   Restituisce l'ID del prodotto aggiornato dalla risposta.
  

> **`productId`**: ID del prodotto da aggiornare.   
> **`product`**: Oggetto prodotto con i nuovi dati.   
> **`putUrl`**: URL completo per la richiesta PUT.   
> **`options`**: Opzioni della richiesta PUT (metodo,  intestazioni, corpo).   
> **`handleRequest`**: Chiama la funzione per gestire la richiesta.   
> **`handleFeedback`**: Mostra il feedback di successo o errore.   
> **`data.id`**: ID del prodotto aggiornato.

####  5. Metodo `DELETE`

```javascript
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
        console.log(`Product with ID ${productId} deleted successfully`);
        handleFeedback(null, null, "Product deleted successfully");
    } catch (error) {
        if (error.message.includes("Could not find any entity of type")) {
            handleFeedback(error, `Product with ID ${productId} not found`, null);
        } else {
            handleFeedback(error, `Error in deleting product: ${error.message}`);
        }
    }
};
``` 
**DELETE**: Questo metodo invia una richiesta DELETE per eliminare un prodotto.

-   **Parametri**:
    
    -   `productId`: L'ID del prodotto che si desidera eliminare.
    - 
-   **Costruzione dell'URL**:
    
    -   `deleteUrl`: Concatena l'URL di base (`BASE_URL`) con l'endpoint dei prodotti e l'ID specifico del prodotto da eliminare.
-   **Opzioni della Richiesta**:
    
    -   Il metodo è impostato su `DELETE`.
    -   Le intestazioni (`headers`) specificano il tipo di contenuto come JSON.
-   **Gestione della Richiesta**:
    
    -   Utilizza `handleRequest` per inviare la richiesta `DELETE` all'URL specificato con le opzioni definite.
    -   Se l'operazione ha successo, viene registrato un messaggio di conferma nel console e tramite `handleFeedback`.
    -   In caso di errore, `handleRequest` gestisce il feedback visivo delle operazioni.
        -   Se il messaggio di errore contiene "Could not find any entity of type", indica che il prodotto non è stato trovato e mostra un feedback appropriato.
        -   Altrimenti, mostra un messaggio di errore generico.

> **`productId`**: ID del prodotto da eliminare.   
> **`deleteUrl`**: URL completo per la richiesta DELETE.   
> **`options`**: Opzioni dellarichiesta DELETE (metodo, intestazioni).    
> **`handleRequest`**:  funzione per effettuare la richiesta HTTP.       
> **`handleFeedback`**: Mostra il feedback di successo o errore.

#### 6. Gestione degli Elementi DOM e Event Listeners

```javascript
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
``` 

#### Event Listeners per Gestire Operazioni CRUD sui Prodotti

-   **Creazione di un Nuovo Prodotto**: L'evento `click` su `buttonSendEl` gestisce l'invio dei dati del nuovo prodotto al backend. Vengono validati i campi del form e, se tutto è corretto, viene chiamata la funzione `POST` per creare il prodotto.
    
-   **Eliminazione di un Prodotto Esistente**: L'evento `click` su `buttonDeleteEl` gestisce l'eliminazione di un prodotto esistente. Verifica che l'ID del prodotto sia valido e, in caso affermativo, chiama la funzione `DELETE` per rimuovere il prodotto dal backend.
    
-   **Aggiornamento di un Prodotto Esistente**: L'evento `click` su `buttonUpdateEl` gestisce l'aggiornamento dei dati di un prodotto esistente. Valida l'ID del prodotto e i campi del form, quindi chiama la funzione `PUT` per aggiornare i dati del prodotto nel backend.
    

Ogni evento è accompagnato da controlli di validazione per assicurarsi che i dati inseriti siano corretti prima di inviare le richieste al backend. Il feedback visivo sull'esito delle operazioni viene gestito tramite la funzione `handleFeedback`.

>  **`document.addEventListener('DOMContentLoaded', () => { ... });`**: Assicura che il DOM sia completamente caricato prima di eseguire il codice.

>  **`inputIdEl`**: Elemento input per l'ID del prodotto da eliminare o aggiornare.

>  **`inputTitleEl`**, **`inputPriceEl`**, **`inputDescriptionEl`**, **`inputCategoryEl`**, **`inputImagesEl`**: Elementi input per i dettagli del prodotto.

>  **`buttonSendEl`**, **`buttonDeleteEl`**, **`buttonUpdateEl`**: Bottoni per inviare, eliminare e aggiornare i prodotti.

>  **Event Listener per `buttonSendEl`**: Gestisce l'invio di un nuovo prodotto.

>  **Event Listener per `buttonDeleteEl`**: Gestisce l'eliminazione di un prodotto.

>  **Event Listener per `buttonUpdateEl`**: Gestisce l'aggiornamento di un prodotto.

#### 7. Funzione `handleFeedback` per Gestire Errori e Feedback Visivo

```javascript
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
        errorFeedbackEl.style.display = 'none'; // Nasconde il feedback di errore
    }

    setTimeout(() => {
        errorFeedbackEl.style.display = 'none';
        successFeedbackEl.style.display = 'none';
    }, 3000); // Nasconde il feedback dopo 3 secondi
};
``` 

-   **handleFeedback**: Questa funzione gestisce l'output visivo per feedback di successo o errori.
    -   Accetta tre parametri opzionali:
        -   `error`: Se presente, mostra un messaggio di errore.
        -   `errorMessage`: Messaggio di errore personalizzato.
        -   `successMessage`: Messaggio di successo personalizzato.
    -   Se è presente un errore, visualizza il messaggio di errore nell'elemento HTML `errorFeedbackEl` e nasconde `successFeedbackEl`.
    -   Se non ci sono errori, visualizza il messaggio di successo nell'elemento `successFeedbackEl` e nasconde `errorFeedbackEl`.
    -   Entrambi i feedback visivi vengono nascosti dopo 3 secondi utilizzando `setTimeout`.

>  **`errorFeedbackEl`**: Elemento DOM per il feedback di errore.

>  **`successFeedbackEl`**: Elemento DOM per il feedback di successo.

>  **`error`**: Oggetto errore. Se presente, mostra il messaggio di errore.

>  **`errorMessage`**: Messaggio di errore personalizzato.

>  **`successMessage`**: Messaggio di successo personalizzato.

>  **`setTimeout`**: Nasconde i messaggi di feedback dopo 3 secondi.

### Conclusione

Questo script JavaScript consente agli utenti di interagire con un'applicazione web per la gestione dei prodotti. Utilizza chiamate API per creare, aggiornare ed eliminare prodotti tramite i metodi HTTP POST, PUT e DELETE. La gestione degli errori e il feedback visivo sono implementati per guidare l'utente attraverso le operazioni e fornire informazioni chiare in caso di problemi.

-   **Configurazione dell'API**: Definizione dell'URL base e degli endpoint specifici per i prodotti.
-   **Metodi CRUD (POST, PUT, DELETE)**: Funzioni asincrone che inviano richieste HTTP all'API per eseguire operazioni CRUD sui prodotti.
-   **Gestione degli eventi e dei dati del form**: Utilizzo di event listeners per intercettare azioni degli utenti come l'invio di nuovi prodotti, l'aggiornamento e l'eliminazione, con validazione dei dati prima dell'invio.
-   **Feedback visivo**: Utilizzo della funzione `handleFeedback` per mostrare messaggi di successo o errori agli utenti, garantendo una migliore esperienza utente durante l'interazione con l'applicazione.

Questo approccio consente una gestione robusta e user-friendly delle operazioni sui prodotti tramite l'interfaccia web, utilizzando le migliori pratiche di sviluppo in mio possesso per garantire affidabilità e facilità d'uso.

### Esempio di Utilizzo

1.  **Invio di un Prodotto**:
    
    -   Compilate i campi del form con titolo, prezzo, descrizione, ID categoria e URL immagine.
    -   Cliccate sul pulsante "Invia".
    -   Vedrete un messaggio di successo se il prodotto viene creato con successo.
2.  **Eliminazione di un Prodotto**:
    
    -   Inserite l'ID del prodotto da eliminare nel campo ID Prodotto.
    -   Cliccate sul pulsante "Elimina".
    -   Vedrete un messaggio di successo se il prodotto viene eliminato con successo.
3.  **Aggiornamento di un Prodotto**:
    
    -   Inserite l'ID del prodotto da aggiornare nel campo ID Prodotto.
    -   Compilate i campi del form con i nuovi dettagli del prodotto.
    -   Cliccate sul pulsante "Aggiorna".
    -   Vedrete un messaggio di successo se il prodotto viene aggiornato con successo.

Con questa guida, dovreste essere in grado di implementare e comprendere un semplice sistema per gestire prodotti tramite un'API con feedback visivo per le operazioni di creazione, aggiornamento ed eliminazione.

### Come Eseguire il Progetto

- Clona la repository.

- Apri il file index.html in un browser.

- Usa il modulo per aggiungere un nuovo prodotto.

- Inserisci l'ID di un prodotto esistente e clicca su "Delete" per rimuoverlo.

- Usa il modulo form, Inserisci anche l'ID di un prodotto esistente e clicca su "Update" per modificarlo.

  

### Requisiti

- Un server che supporti le richieste HTTP POST e DELETE all'URL https://api.escuelajs.co/api/v1/products.

- Un browser moderno che supporti *JavaScript ES6*.

  

#### Autore

Questo progetto è stato realizzato con l'intento di imparare a gestire richieste HTTP e manipolazione del *DOM* in *JavaScript*.
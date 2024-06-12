# Guida Dettagliata al Codice

## Introduzione

Questo progetto permette di aggiungere e rimuovere prodotti da un server tramite un'interfaccia web. Utilizza funzioni asincrone per gestire le operazioni di rete, manipola il DOM per raccogliere input e mostra messaggi di feedback, e usa `fetch` per inviare richieste HTTP.

## Definizione dell'URL di Base

```
const BASE_URL = "https://api.escuelajs.co/";
const getProductEndpoint = "api/v1/products";
const url = BASE_URL + getProductEndpoint; 
```
 Definiamo l'URL di base dell'API, concatenando **BASE_URL** con **getProductEndpoint** per ottenere l'URL completo per accedere all'endpoint dei prodotti.

## Metodo POST

```javascript
const POST = async (product) => {
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
```

La funzione **POST** invia nuovi dati (un nuovo prodotto) al server:

- Funzione Asincrona: **POST** è asincrona, quindi può gestire operazioni che richiedono tempo senza bloccare l'esecuzione del codice.
- **Fetch**: Invia una richiesta *HTTP* POST all'URL definito.
- **Headers**: Imposta headers per indicare che il contenuto inviato è in formato *JSON*.
- **Body**: Converte l'oggetto product in una stringa *JSON* e lo invia come corpo della richiesta.
- Risposta della funziona: Converte la risposta in un oggetto *JSON* e restituisce l'ID del prodotto creato.

## Metodo DELETE

```javascript
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
```

La funzione **DELETE** rimuove un prodotto dal server:

- Costruzione dell'URL: Combina **BASE_URL**, **getProductEndpoint** e **productId** per ottenere l'URL specifico del prodotto da eliminare.
- **Fetch**: Invia una richiesta HTTP DELETE all'URL specifico.
- **Headers**: Imposta headers per indicare che il contenuto è in formato *JSON*.
- Controllo della Risposta: Se la risposta **(res.ok)** è positiva, mostra un messaggio di successo; altrimenti, mostra un messaggio di errore.

## Funzione per Mostrare il Feedback Visivo

```javascript
const showFeedback = (message) => {
    const feedbackEl = document.querySelector('.feedback');
    
    feedbackEl.textContent = message;
    feedbackEl.style.display = 'block';

    setTimeout(() => {
        feedbackEl.style.display = 'none';
    }, 3000); // Nasconde il feedback dopo 3 secondi
};
```

Questa funzione mostra un messaggio di feedback all'utente:

1. Selezione dell'Elemento: Trova l'elemento nel *DOM* con la classe **.feedback**.
2. Aggiorna il Testo: Imposta il testo del feedback e lo rende visibile.
3. Nascondi il Feedback: Usa *setTimeout* per nascondere il messaggio dopo 3 secondi.

## Elementi del DOM

```javascript
const inputTitleEl = document.querySelector('.title');
const inputPriceEl = document.querySelector('.price');
const inputDescriptionEl = document.querySelector('.description');
const inputCategoryEl = document.querySelector('.category-id');
const inputImagesEl = document.querySelector('.images');
const buttonSendEl = document.querySelector('.button-send');
const deleteIdEl = document.querySelector('.delete-id');
const buttonDeleteEl = document.querySelector('.button-delete');
```

Qui selezioniamo vari elementi del *DOM* che verranno usati per raccogliere input dall'utente e attivare le funzioni di invio e cancellazione dei prodotti.

## Event Listeners

```javascript
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
```

Questi listener gestiscono gli eventi di click sui pulsanti di invio e cancellazione:

### Invio del Prodotto:

1. Crea un oggetto **objProductForm** con i dati raccolti.
2. Chiama la funzione **POST** per inviare i dati al server.
3. Mostra l'ID del prodotto creato nella console.

### Cancellazione del Prodotto:

1. Preleva l'ID del prodotto dall'input.
2. Se l'ID è presente, chiama la funzione **DELETE** per rimuovere il prodotto dal server.
3. Se l'ID non è presente, mostra un messaggio di errore.

## Come Eseguire il Progetto
- Clona la repository.
- Apri il file index.html in un browser.
- Usa il modulo per aggiungere un nuovo prodotto.
- Inserisci l'ID di un prodotto esistente e clicca su "Delete" per rimuoverlo.

## Requisiti
- Un server che supporti le richieste HTTP POST e DELETE all'URL https://api.escuelajs.co/api/v1/products.
- Un browser moderno che supporti *JavaScript ES6*.

### Autore
Questo progetto è stato realizzato con l'intento di imparare a gestire richieste HTTP e manipolazione del *DOM* in *JavaScript*.
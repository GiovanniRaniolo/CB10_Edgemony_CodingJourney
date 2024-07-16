# useEffect Examples in React

This project demonstrates various use cases of the `useEffect` hook in React. Each example is implemented as a separate component, showcasing different scenarios and functionalities.

![screenshot](./public/screenshot.png)

## FirstRenderEffect

Executes an API call only on the first render of the component, using an empty dependency array [].

```jsx
import React, { useEffect, useState } from "react";

function FirstRenderEffect() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("Fetching data on first render");
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="mb-6 p-4 bg-white rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-2 text-center">
        First Render Effect
      </h2>
      <p className="text-blue-700 bg-yellow-400 text-center m-2 rounded-xl text-sm">
        Executes an API call only on the first render of the component, using an
        empty dependency array [].
      </p>

      {data ? (
        <div>
          <h3 className="font-bold text-gray-500">{data.title}</h3>
          <p className="text-gray-400">{data.body}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FirstRenderEffect;
```

## FirstRenderAndLocalStorage

Executes an API call on the first render and updates the state in localStorage, demonstrating how to handle side effects.

```jsx
import React, { useEffect, useState } from "react";

function FirstRenderAndLocalStorage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("Fetching data and setting localStorage on first render");
    fetch("https://jsonplaceholder.typicode.com/posts/2")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        localStorage.setItem("post2", JSON.stringify(data));
      });
  }, []);

  return (
    <div className="mb-6 p-4 bg-white rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-2 text-center">
        First Render and LocalStorage
      </h2>
      <p className="text-blue-700 bg-yellow-400 text-center m-2 rounded-xl text-sm">
        Executes an API call on the first render and updates the state in
        localStorage, demonstrating how to handle side effects.
      </p>
      {data ? (
        <div>
          <h3 className="font-bold text-gray-500">{data.title}</h3>
          <p className="text-gray-400">{data.body}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FirstRenderAndLocalStorage;
```

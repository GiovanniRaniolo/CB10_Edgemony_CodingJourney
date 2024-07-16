import React, { useEffect, useState } from "react";

function DependencyChangeEffect() {
  const [postId, setPostId] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(`Fetching data for post ${postId}`);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [postId]);

  return (
    <div className="mb-6 p-4 bg-white rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-2 text-center">
        Dependency Change Effect
      </h2>
      <p className="text-blue-700 bg-yellow-400 text-center m-2 rounded-xl text-sm">
        Executes an API call on the first render and every time the value of the
        dependency postId changes, showing how to handle effects that depend on
        state variables.
      </p>
      <input
        type="number"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
        min="1"
        max="100"
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
      />
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

export default DependencyChangeEffect;

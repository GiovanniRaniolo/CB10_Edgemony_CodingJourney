import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [postId, setPostId] = useState(1);
  const [post, setPost] = useState({ title: "", body: "" });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        const data = await response.json();
        setPost({ title: data.title, body: data.body });
      } catch (error) {
        console.error("Error in fetching data:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleChange = (event) => {
    setPostId(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className=" flex flex-col justify-between items-center w-full max-w-md p-4 bg-white rounded shadow-md  h-72">
        <input
          id="postId"
          type="number"
          value={postId}
          onChange={handleChange}
          min="1"
          max="100"
          placeholder="select a number from 1 to 100"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <label
          htmlFor="post id"
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[calc(40%+11rem)] shadow-md text-sm bg-blue-500 text-white p-2 rounded-lg"
        >
          select a number from 1 to 100
        </label>
        <h2 className="text-center mt-4 text-2xl font-bold text-gray-800">
          {post.title}
        </h2>
        <p className="mt-2 text-gray-600 text-center">{post.body}</p>
      </div>
    </div>
  );
}

export default App;

import React from "react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h3>Sidebar</h3>
        <ul>
          <li>
            <a href="#">Link 1</a>
          </li>
          <li>
            <a href="#">Link 2</a>
          </li>
          <li>
            <a href="#">Link 3</a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

function PostItem({ title, content, userId }) {
  return (
    <div className="post-item">
      <h2>{title}</h2>
      <p>{content}</p>
      <h3>User ID: {userId}</h3>
    </div>
  );
}

function Main() {
  const posts = [
    {
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      content:
        "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
      userId: 1,
    },
    {
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      content:
        "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
      userId: 1,
    },
    {
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      content:
        "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
      userId: 1,
    },
  ];

  return (
    <main>
      <Sidebar />
      <section id="post-list" className="post-list">
        {posts.map((post, index) => (
          <PostItem
            key={index}
            title={post.title}
            content={post.content}
            userId={post.userId}
          />
        ))}
      </section>
    </main>
  );
}

export { Main };

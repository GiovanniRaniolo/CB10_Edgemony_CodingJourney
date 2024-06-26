import posts from "../assets/posts.json";

function Sidebar() {
  const menuItems = [
    { label: "General", href: "#" },
    { label: "Teams", href: "#", count: 5 },
    { label: "Billing", href: "#" },
    { label: "Invoices", href: "#", count: 3 },
    { label: "Account", href: "#" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className={`sidebar-item ${item.count ? "general" : ""}`}
              >
                <span className="sidebar-text">{item.label}</span>
                {item.count && <span className="badge">{item.count}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function PostItem({ title, content, userId }) {
  return (
    <div className="post-item">
      <div className="background-article">
        <h2>{title}</h2>
        <p>{content}</p>
        <h3>User ID: {userId}</h3>
      </div>
    </div>
  );
}

function Main() {
  return (
    <main>
      <Sidebar />
      <section id="post-list" className="post-list">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            title={post.title}
            content={post.body}
            userId={post.userId}
          />
        ))}
      </section>
    </main>
  );
}

export { Main };

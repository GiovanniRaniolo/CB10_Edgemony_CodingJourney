function Header() {
  return (
    <header>
      <div className="container">
        <div className="wrapper">
          <div className="logo">Logo</div>
          <Menu />
        </div>
      </div>
    </header>
  );
}

function Menu() {
  return (
    <nav className="nav">
      <ul className="list">
        <MenuItem label={"About us"} />
        <MenuItem label="Blog" />
        {MenuItem({ label: "Contacts" })}
      </ul>
    </nav>
  );
}

function MenuItem(props) {
  const { label, href = "#" } = props;
  return (
    <li className="item">
      <a href="#">{label}</a>
    </li>
  );
}

export { Header };

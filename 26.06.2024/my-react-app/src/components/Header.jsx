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
        <MenuItem
          label={"About us"}
          href={"https://www.google.com"}
          target="_blank"
        />
        <MenuItem label="Blog" href="#" />
        <MenuItem label="Contacts" href="#" />
      </ul>
    </nav>
  );
}

function MenuItem(props) {
  const { label, href = "#", ...attrs } = props;
  return (
    <li className="item">
      <a href={href} {...attrs}>
        {label}
      </a>
    </li>
  );
}

export { Header };

import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="wrapper">
          <div className="logo">Logo</div>
          <FooterMenu />
        </div>
      </div>
    </footer>
  );
}

function FooterMenu() {
  const menuItems = [
    {
      label: "About us",
      children: [{ label: "Company" }, { label: "Careers" }, { label: "Docs" }],
    },
    {
      label: "Socials",
      children: [
        { label: "Twitter" },
        { label: "Linkedin" },
        { label: "Github" },
      ],
    },
  ];

  return (
    <ul className="menu">
      {menuItems.map((item, index) => (
        <FooterMenuItems key={index} item={item} />
      ))}
    </ul>
  );
}

function FooterMenuItems({ item }) {
  const { label, href = "#", children = [] } = item;

  return (
    <li className="item">
      <a href={href}>{label}</a>
      {children.length > 0 && (
        <ul>
          {children.map((child, index) => (
            <li key={index} className="item subitem">
              {child.label}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export { Footer };

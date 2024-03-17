function Header() {
  return (
    <header className="header">
      <a
        className="header__brand"
        href="./"
        title="Haz click para volver a la página inicial"
      >
        <img
          className="header__companyLogo"
          src="./images/favicon(!).png"
          alt="Logo proyectos molones"
        />
        <h1 className="header__title">HomeHelpers</h1>
      </a>
    </header>
  );
}

export default Header;

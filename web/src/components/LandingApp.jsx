import '../scss/App.scss';
import { Link } from 'react-router-dom';

function LandingApp(renderProject) {
  if (!Array.isArray(renderProject)) {
    renderProject = [];
  }
  const renderProjectList = renderProject.map((project) => {
    return (
      <article className="card" key={project.id}>
        <h2 className="card__projectTitle">
          <span className="card__projectTitle--text">
            Personal project card
          </span>
        </h2>
        <div className="card__author">
          <div className="card__authorPhoto"></div>
          <p className="card__job">{project.job}</p>
          <h3 className="card__name">{project.autor}</h3>
        </div>
        <div className="card__project">
          <h3 className="card__slogan">{project.name}</h3>
          <p className="card__slogan">{project.slogan}</p>
          <h3 className="card__descriptionTitle">{project.name}</h3>
          <p className="card__description">{project.desc}</p>
          <div className="card__technicalInfo">
            <p className="card__technologies">{project.technologies}</p>
            <a
              className="icon icon__www"
              href="#"
              title="Haz click para ver el proyecto online"
            >
              Web link
            </a>
            <a
              className="icon icon__github"
              href="#"
              title="Haz click para ver el código del proyecto"
            >
              GitHub link
            </a>
          </div>
        </div>
      </article>
    );
  });

  return (
    <div>
      <div className="container">
        <main className="main_landing">
          <section className="hero">
            <h2 className="title">HomeHelpers</h2>
            <p className="hero__text">
              Escaparate en línea para recoger ideas a través de la tecnología
            </p>
            <Link className="button--link" to="/create">
              Nuevo proyecto
            </Link>
          </section>

          <section className="preview">
            <div className="projectImage"></div>
            <div className="card_landing">
              {renderProjectList}
              <article className="card">
                <h2 className="card__projectTitle">
                  <span className="card__projectTitle--text">
                    Personal project card
                  </span>
                </h2>
                <div className="card__author">
                  <div className="card__authorPhoto"></div>
                  <p className="card__job">Full stack Developer</p>
                  <h3 className="card__name">Emmelie Bjôrklund</h3>
                </div>
                <div className="card__project">
                  <h3 className="card__slogan">Elegant Workspace</h3>
                  <p className="card__slogan">Diseños Exclusivos</p>
                  <h3 className="card__descriptionTitle">
                    Product description
                  </h3>
                  <p className="card__description">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nulla, quos? Itaque, molestias eveniet laudantium adipisci
                    vitae ratione
                  </p>
                  <div className="card__technicalInfo">
                    <p className="card__technologies">React JS - HTML - CSS</p>
                    <a
                      className="icon icon__www"
                      href="#"
                      title="Haz click para ver el proyecto online"
                    >
                      Web link
                    </a>
                    <a
                      className="icon icon__github"
                      href="#"
                      title="Haz click para ver el código del proyecto"
                    >
                      GitHub link
                    </a>
                  </div>
                </div>
              </article>
              <article className="card">
                <h2 className="card__projectTitle">
                  <span className="card__projectTitle--text">
                    Personal project card
                  </span>
                </h2>
                <div className="card__author">
                  <div className="card__authorPhoto"></div>
                  <p className="card__job">Full stack Developer</p>
                  <h3 className="card__name">Emmelie Bjôrklund</h3>
                </div>
                <div className="card__project">
                  <h3 className="card__slogan">Elegant Workspace</h3>
                  <p className="card__slogan">Diseños Exclusivos</p>
                  <h3 className="card__descriptionTitle">
                    Product description
                  </h3>
                  <p className="card__description">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nulla, quos? Itaque, molestias eveniet laudantium adipisci
                    vitae ratione
                  </p>
                  <div className="card__technicalInfo">
                    <p className="card__technologies">React JS - HTML - CSS</p>
                    <a
                      className="icon icon__www"
                      href="#"
                      title="Haz click para ver el proyecto online"
                    >
                      Web link
                    </a>
                    <a
                      className="icon icon__github"
                      href="#"
                      title="Haz click para ver el código del proyecto"
                    >
                      GitHub link
                    </a>
                  </div>
                </div>
              </article>
              <article className="card">
                <h2 className="card__projectTitle">
                  <span className="card__projectTitle--text">
                    Personal project card
                  </span>
                </h2>
                <div className="card__author">
                  <div className="card__authorPhoto"></div>
                  <p className="card__job">Full stack Developer</p>
                  <h3 className="card__name">Emmelie Bjôrklund</h3>
                </div>
                <div className="card__project">
                  <h3 className="card__slogan">Elegant Workspace</h3>
                  <p className="card__slogan">Diseños Exclusivos</p>
                  <h3 className="card__descriptionTitle">
                    Product description
                  </h3>
                  <p className="card__description">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nulla, quos? Itaque, molestias eveniet laudantium adipisci
                    vitae ratione
                  </p>
                  <div className="card__technicalInfo">
                    <p className="card__technologies">React JS - HTML - CSS</p>
                    <a
                      className="icon icon__www"
                      href="#"
                      title="Haz click para ver el proyecto online"
                    >
                      Web link
                    </a>
                    <a
                      className="icon icon__github"
                      href="#"
                      title="Haz click para ver el código del proyecto"
                    >
                      GitHub link
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default LandingApp;

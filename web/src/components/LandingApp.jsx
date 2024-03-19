import "../scss/App.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function LandingApp({ renderProject }) {
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
      <div>
        <main className="main_landing">
          <section className="hero">
            <h2 className="title">HomeHelpers</h2>
            <p className="hero__text">
              Encuentra con nosotros la tranquilidad que necesitas para tu hogar
            </p>
            <Link className="button--link" to="/create">
              Nuevo proyecto
            </Link>
          </section>

          <section className="preview">
            <div className="projectImage"></div>
            <div className="card_landing">{renderProjectList}</div>
          </section>
        </main>
      </div>
    </div>
  );
}

LandingApp.propTypes = {
  renderProject: PropTypes.array.isRequired,
};

export default LandingApp;

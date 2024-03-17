import PropTypes from 'prop-types';
function Card({ data }) {
  return (
    <>
      <article className="card">
        <h2 className="card__projectTitle">
          <span className="card__projectTitle--text">
            Personal project card
          </span>
        </h2>

        <div className="card__author">
          <div
            className="card__authorPhoto"
            style={{ backgroundImage: data.photo && `url(${data.photo})` }}
          ></div>
          <p className="card__job">
            {' '}
            {data.job === '' ? 'Fontanera' : data.job}
          </p>
          <h3 className="card__name">
            {data.autor === '' ? 'Alice Ball' : data.autor}
          </h3>
        </div>

        <div className="card__project">
          <h3 className="card__slogan">
            {' '}
            {data.name === '' ? 'Facilidad ante todo' : data.name}
          </h3>
          <p className="card__slogan">
            {data.slogan === '' ? 'Arreglos rápidos' : data.slogan}
          </p>
          <h3 className="card__descriptionTitle">Descripción del producto</h3>
          <p className="card__description">
            {data.desc === ''
              ? 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.Nulla, quos? Itaque, molestias eveniet laudantium adipisci vitae ratione.'
              : data.desc}
          </p>

          <div className="card__technicalInfo">
            <p className="card__technologies">
              {data.technologies === ''
                ? '9 años de experiencia en el sector'
                : data.technologies}
            </p>

            <a
              className="icon icon__www"
              href={data.demo}
              target="_blank"
              rel="noreferrer"
              title="Haz click para ver el proyecto online"
            >
              Web link
            </a>
            <a
              className="icon icon__github"
              href={data.repo}
              target="_blank"
              rel="noreferrer"
              title="Haz click para ver el código del proyecto"
            >
              GitHub link
            </a>
          </div>
        </div>
      </article>
    </>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
};
export default Card;

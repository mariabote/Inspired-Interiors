import PropTypes from 'prop-types';
import ButtonLarge from './ButtonLarge';
import GetAvatar from './GetAvatar';

function Form({
  data,
  changeData,
  updateAvatarAuthor,
  updateAvatarProject,
  onSubmit,
  responseFetch,
}) {
  const handleProyectName = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    changeData(inputName, inputValue);
  };

  return (
    <form className="addForm">
      <h2 className="title">Información</h2>
      <fieldset className="addForm__group">
        <legend className="addForm__title">Cuéntanos sobre el proyecto</legend>
        <input
          className="addForm__input"
          type="text"
          name="name"
          id="name"
          value={data.name}
          placeholder="Nombre del proyecto"
          onChange={handleProyectName}
        />
        <input
          className="addForm__input"
          type="text"
          name="slogan"
          id="slogan"
          value={data.slogan}
          placeholder="Slogan"
          onChange={handleProyectName}
        />
        <div className="addForm__2col">
          <input
            className="addForm__input"
            type="url"
            name="repo"
            id="repo"
            value={data.repo}
            placeholder="Repositorio"
            onChange={handleProyectName}
          />
          <input
            className="addForm__input"
            type="url"
            name="demo"
            id="demo"
            value={data.demo}
            placeholder="Demo"
            onChange={handleProyectName}
          />
        </div>
        <input
          className="addForm__input"
          type="text"
          name="technologies"
          id="technologies"
          value={data.technologies}
          placeholder="Tecnologías"
          onChange={handleProyectName}
        />
        <textarea
          className="addForm__input"
          type="text"
          name="desc"
          id="desc"
          value={data.desc}
          placeholder="Descripción"
          rows="5"
          onChange={handleProyectName}
        ></textarea>
      </fieldset>

      <fieldset className="addForm__group">
        <legend className="addForm__title">Cuéntanos sobre la autora</legend>
        <input
          className="addForm__input"
          type="text"
          name="autor"
          id="autor"
          value={data.autor}
          placeholder="Nombre"
          onChange={handleProyectName}
        />
        <input
          className="addForm__input"
          type="text"
          name="job"
          id="job"
          value={data.job}
          placeholder="Trabajo"
          onChange={handleProyectName}
        />
      </fieldset>

      <fieldset className="addForm__group--upload">
        <GetAvatar
          text=" Subir foto del proyecto"
          updateAvatar={updateAvatarProject}
        ></GetAvatar>

        <GetAvatar
          text=" Subir foto de la autora"
          updateAvatar={updateAvatarAuthor}
        ></GetAvatar>

        <ButtonLarge text="Guardar Proyecto" onSubmit={onSubmit} />
        {responseFetch !== '' && responseFetch.success && (
          <p>
            Tu proyecto ha sido creado en la siguiente dirección:{' '}
            <a target="_blank" rel="noreferrer" href={responseFetch.cardURL}>
              {responseFetch.cardURL}
            </a>
          </p>
        )}
        {responseFetch !== '' && !responseFetch.success && (
          <p>Ha ocurrido un error: {responseFetch.error}</p>
        )}
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  data: PropTypes.object.isRequired,
  changeData: PropTypes.func.isRequired,
  updateAvatarAuthor: PropTypes.func.isRequired,
  updateAvatarProject: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  responseFetch: PropTypes.array,
  success: PropTypes.bool,
};
export default Form;

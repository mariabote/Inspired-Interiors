import PropTypes from 'prop-types';

import Form from './Form';
import Hero from './Hero';
import Preview from './Preview';

function Create({ updateAvatarAuthor, updateAvatarProject, changeData, data, onSubmit, responseFetch }) {
  return (
    <main className="main">
      <Hero />
      <Preview data={data} />
      <Form
        updateAvatarAuthor={updateAvatarAuthor}
        updateAvatarProject={updateAvatarProject}
        changeData={changeData}
        data={data}
        onSubmit={onSubmit}
        responseFetch={responseFetch}
      />
    </main>
  );
}

Create.propTypes = {
  data: PropTypes.object.isRequired,
  changeData: PropTypes.func.isRequired,
  updateAvatarAuthor: PropTypes.func.isRequired,
  updateAvatarProject: PropTypes.func.isRequired,
  onSubmit:PropTypes.func,
  responseFetch:PropTypes.array
};

export default Create;

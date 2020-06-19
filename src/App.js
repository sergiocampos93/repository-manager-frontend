import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(result => setRepositories(result.data));
  }, []);
  async function handleAddRepository() {
    const {data} = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: 'http://github.com/novoprojeto',
      techs: [
        'eefaf', 'sgsefefse'
      ]
    });
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newList = repositories.filter(repository => repository.id != id);
    setRepositories(newList);
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => {

          return (
            <li key={repository.id}>
              <>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
              </button>
              </>
            </li>
          )

        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

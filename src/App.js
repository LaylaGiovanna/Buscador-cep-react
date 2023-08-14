import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './styles.css'

import api from './services/api'

function App() {

  const [input, setInput] = useState('');
  //input - saber o valor do estado //setInput - passar um novo estado

  const [cep, setCep] = useState('');

  async function handleSearch() {
    //01310930/json/

    if (input == '') {
      alert("Preencha algum CEP!")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      //ou seja pega a baseURL, + o valor digitado no input, + 
      //o /json que é o formato da chamada da api
      setCep(response.data);
      setInput('');

    } catch {
      alert("Ops, erro ao buscar o CEP.");
      setInput('') //limpa o campo para vazio

    }

  }

  return (
    <div className="container">
      <h1 className="title"> Buscador CEP</h1>

      <div className="container-input">
        <input
          id='input-cep'
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={8}

        //essa linha acima pega o valor que está la dentro e passando 
        //para a useState input
        ></input>

        <button id='button-search' className="button-search" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"></FiSearch>
        </button>


      </div>

      {/* Verificação de propriedade dentro de um objeto é com object.key.length, 
      ou seja pelo tamanho do objeto, se ele for maior que 0, é pq tem coisas dentro  */}
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;

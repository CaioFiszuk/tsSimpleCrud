import { useState, useEffect } from 'react';
import { api, type Dado } from '../utils/api';

function App() {
  const [dados, setDados] = useState<Dado[]>([]);

  const getDados = async () => {
    const response = await api.getDados();

    setDados(response);
  }

  useEffect(()=>{
   getDados();
  }, []);

  return (
    <>
     {
      dados && dados.length > 0 ? (
        <div>
          {
          dados.map((dado)=>(
            <div key={dado.id}>
              <h2>{dado.title}</h2>
              <p>{dado.content}</p>
            </div>
          ))
          }
        </div>
      ) : (
        <p>Não há dados</p>
      )
     }
    </>
  )
}

export default App;

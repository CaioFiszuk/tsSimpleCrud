import { useState, useEffect } from 'react';
import { api, type Dado } from '../utils/api';
import  Popup  from '../components/Popup';
import Form from '../components/Form';

function App() {
  const [dados, setDados] = useState<Dado[]>([]);
  const [createModal, setCreateModal] = useState(false);

  const openCreateModal = () => {
    setCreateModal(true);
  }

  const closeCreateModal = () => {
    setCreateModal(false);
  }

  const getDados = async () => {
    try{
      const response = await api.getDados();
      setDados(response);
    }catch(error){
      console.error(error);
    }
  }

  const handleCreateDados = async (data: { title: string; content: string }) => {
      try {
      const newDado = await api.createDado(data);
      setDados(prev => [...prev, newDado]);
      closeCreateModal();
    } catch(error) {
      console.error(error);
    }
  }

  const deleteDado = async (id: number) => {
    try {
      await api.deleteDado(id);
      setDados(prev => prev.filter(dado => dado.id !== id));
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(()=>{
   getDados();
  }, []);

  return (
    <>
    <button onClick={openCreateModal} className='create-button'>Criar</button>
     {
      dados && dados.length > 0 ? (
        <section className='main-box'>
          {
          dados.map((dado)=>(
            <div key={dado.id} className='main-box__element'>
              <h2>{dado.title}</h2>
              <p>{dado.content}</p>
              <button
                onClick={()=>deleteDado(dado.id)}
                className='delete-button'
              >
                Deletar
              </button>
            </div>
          ))
          }
        </section>
      ) : (
        <p>Não há dados</p>
      )
     }

     <Popup isOpen={createModal} onClose={closeCreateModal}>
      <Form handleSubmitForm={handleCreateDados} formName='Criar' buttonName='Criar'/>
     </Popup>
    </>
  )
}

export default App;

import { useState, useEffect } from 'react';
import { api, type Dado } from '../utils/api';
import  Popup  from '../components/Popup';
import Form from '../components/Form';

function App() {
  const [dados, setDados] = useState<Dado[]>([]);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [selectedDado, setSelecetedDado] = useState<Dado | null>(null);

  const openCreateModal = () => {
    setCreateModal(true);
  }

  const openUpdateModal = (dado: any) => {
    setSelecetedDado(dado)
    setUpdateModal(true);
  }

  const closeCreateModal = () => {
    setCreateModal(false);
  }

  const closeUpdateModal = () => {
    setUpdateModal(false);
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
      const dadoWithData = {
        id: newDado.id,
        ...data
      };
      setDados(prev => [...prev, dadoWithData]);
      closeCreateModal();
    } catch(error) {
      console.error(error);
    }
  }

  const handleDeleteDado = async (id: number) => {
    try {
      await api.deleteDado(id);
      setDados(prev => prev.filter(dado => dado.id !== id));
    } catch(error) {
      console.error(error);
    }
  }

  const handleUpdateDado = async (data: { title: string; content: string }) => {
    if (!selectedDado) return;

    try {
     const response = await api.updateDado(selectedDado.id, data);

     setDados((prev)=>{
      return prev.map(dado => dado.id === selectedDado.id ? response : dado);
     });

     closeUpdateModal();
      
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
                onClick={()=>handleDeleteDado(dado.id)}
                className='button delete'
              >
                Deletar
              </button>
              <button
                onClick={()=>openUpdateModal(dado)}
                className='button update'
              >
                Editar
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
      <Form 
        handleSubmitForm={handleCreateDados} 
        formName='Criar' 
        buttonName='Criar'
      />
     </Popup>

     <Popup isOpen={updateModal} onClose={closeUpdateModal}>
      <Form
        handleSubmitForm={handleUpdateDado}
        formName="Editar"
        buttonName="Editar"
        initialData={selectedDado}
      />
     </Popup>
    </>
  )
}

export default App;

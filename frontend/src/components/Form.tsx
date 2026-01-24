import { useState, useEffect } from "react";

type FormData = {
  title: string;
  content: string;
};

type FormProps = {
  handleSubmitForm: (data: { title: string; content: string }) => Promise<void> | void;
  formName: string;
  buttonName: string;
  initialData?: FormData | null;
};

function Form({handleSubmitForm, formName, buttonName, initialData}: FormProps) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleSubmitForm({title, content});
    
  };

    useEffect(() => {
      if (initialData) {
        setTitle(initialData.title || "");
        setContent(initialData.content || "");
      }
    }, [initialData]);

  return (
    <form className="form" onSubmit={handleSubmit}>
     <legend className='form__title'>{formName}</legend>

      <input 
        type="text" 
        placeholder='Título'
        className='form__input'
        name='title'
        value={title} 
        onChange={(e) => {
            setTitle(e.target.value);
        }}
        required
      />

    <input 
        type="text" 
        placeholder='Conteúdo'
        className='form__input'
        name='content'
        value={content} 
        onChange={(e) => {
            setContent(e.target.value);
        }}
        required
      />

      <button type="submit" className="form__button">{buttonName}</button>

    </form>
  );
}

export default Form;
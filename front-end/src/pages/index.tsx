import { useState } from 'react';
import Card from '../components/Card';
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });

  const [data, setData] = useState([
    {
      name: 'name',
      title: 'Digite o seu nome',
      type: 'text',
      inputText: 'Nome',
    },
    {
      name: 'email',
      title: 'Digite o seu e-mail',
      type: 'email',
      inputText: 'E-mail'
    },
    {
      name: 'phone',
      mask: '(99) 9999-9999',
      title: 'Digite o seu celular',
      type: 'phone',
      inputText: 'Celular'
    },
    {
      name: 'description',
      title: 'Digite uma descrição',
      type: 'text',
      inputText: 'Descrição'
    }
  ])

  async function nextPage(value) {
    try {
      const item = Object.keys(answers)[page];
      const newData = {...answers, [item]: value};
      if(page === data.length - 1) {
        await api.post('/contact', newData);
        setAnswers({
          name: '',
          email: '',
          phone: '',
          description: ''
        });
        setPage(0);
        toast.success('Sua solicitação de contato foi enviada com sucesso!');
      }
      else {
        setAnswers(newData);
        setPage(page + 1);
      }
    }
    catch {
      setPage(0);
      toast.error('Ocorreu um erro ao processar a requisição.');
    }
  }

  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden justify-center" 
           style={{ 
              background: `url('/img/large.jpeg') no-repeat top center fixed`, 
              backgroundSize: 'cover'
            }}>
          <Card 
          data={data}
          page={page}
          nextPage={nextPage}  />
      </div>
      <ToastContainer />
    </>
  );
}

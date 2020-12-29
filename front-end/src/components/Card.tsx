import { useState, useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import getValidationErrors from '../utils/getValidationErrors';
import { motion } from 'framer-motion';
import InputMask from 'react-input-mask';

interface DataProps {
  title: string;
  name: string;
  mask?: string;
  type: string;
  inputText: string;
}

interface CardProps {
  data: DataProps[]
  page: number;
  nextPage: Function;
}

const Card: React.FC<CardProps> = ({data, page, nextPage }) => {  
  const [inputValue, setInputValue] = useState('');
  const [cardAnimate, setCardAnimate] = useState(false);
  const [errors, setErrors] = useState(null);
  let {title, type, name, inputText} = data[page];

  const clickNextPage = useCallback(async()=> {
    try {
      let schema;

      switch(name) {
        case 'name':
          schema = Yup.string()
          .required('Preencha o campo de Nome.');
          break;
        case 'phone':
          schema = Yup.string()
          .matches(
            /\(\d{2,}\) \d{4,}\-\d{4}$/,
            "Digite telefone válido.")
          .required('Preencha o campo de Telefone.');
          break;
        case 'email':
          schema = Yup.string()
          .email('Digite um e-mail válido.')
          .required('Preencha o campo de E-mail.');
          break;
        case 'description':
          schema = Yup.string()
          .notRequired();
          break;
      }  

      await schema.validate(inputValue, {
        abortEarly: false,
      });

      if(page == data.length - 1) {
        setCardAnimate(false);
      }
      else {
        setCardAnimate(!cardAnimate);
      }

      setTimeout(() => {
        nextPage(inputValue);
        setInputValue('');
      }, 500);
    }
    catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        setErrors(errors);
        return;
      }
    }
    }, [inputValue, page]);
      
  const setInput = useCallback((event)=> {
      setInputValue(event.target.value);
      setErrors(null);
    },[]);

  useEffect(() => {
    setTimeout(() => {
      setCardAnimate(!cardAnimate);
    }, 500);
  }, [page])

  return (
    <motion.div 
      className="flex relative bg-primary shadow-2xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto my-auto p-10 pb-20 justify-center rounded-md flex-col"
      animate={{ 
        opacity: cardAnimate ? 1 : 0,
        translateY: cardAnimate ? 0 : 20,
      }}
      transition={{duration: 0.4}}
      style={{opacity: 0}}
      >
      <span className="px-2 text-primary text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">{title}</span>
      <InputMask className="card-question mt-6 bg-primary text-primary text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl max-w-full w-full px-2 h-10 outline-none"
        onChange={setInput}
        value={inputValue}
        mask={data[page]?.mask ? '(99) 99999-9999' : ''}
        name={name}
        type={type} placeholder={inputText} >
        </InputMask>
      {errors && <span 
      className="mt-6 text-xs sm:text-sm md:text-md text-danger">
        {Object.values(errors)}</span>}
      <motion.button 
        className="absolute text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl bottom-4 right-10 h-8 sm:h-10 w-16 sm:w-20 md:w-24  text-secondary mt-8 bg-secondary hover:bg-secondary-hover rounded" 
        style={{outline: 'none'}}
        onClick={clickNextPage} type="submit"
        >{page < data.length - 1? 'Proximo' :' Enviar'}</motion.button>
    </motion.div>
  );
}

export default Card;
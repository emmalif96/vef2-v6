import React, { useState } from 'react';

import { addTodo } from '../../api';

import Button from '../button/Button';
import Field from '../field/Field';
import Errors from '../errors/Errors';

import css from './Form.css';

// Form á forsíðu
export default function Form(props) {
  const { onCreated } = props;
  
  const [data, setData] = useState({ title: '', due: undefined });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    const result = await addTodo(data.title, data.due);
   
    
    if (!result.success) {
      setErrors(result.result);
      setLoading(false);
      return;
    }
    onCreated();
    setLoading(false);

  }
  
  function onChangeTitle(e) {
    setData({
      ...data,
      title: e.target.value,
    });
  }

  function onChangeDate(e) {
    let due = e.target.value;
    if(due.length === 0) {
      due = null; 
    }
    setData({
      ...data,
      due: e.target.value,
    });
  }
  
  return (
    <React.Fragment>
      <form className={css.form} onSubmit={onSubmit}>
        <h2 className={css.form__header}>Nýtt Verkefni</h2>
        {errors && 
        <Errors errors={errors} />}
        {loading && 
       <div>Hleð gögnum...</div>}
        <Field
          label={'Titill: '} 
          type={"textarea"}
          value={data.title} 
          onChange={onChangeTitle}>
          </Field>
          <Field
        label={'Klárast fyrir: '} 
        type={"datetime-local"}
        value={data.due} 
        onChange={onChangeDate}>
        </Field>
        <Button
         // onChange={onSubmit}
          children={'Búa til'}>
        </Button>
      </form>
      </React.Fragment>
    )
  }
  
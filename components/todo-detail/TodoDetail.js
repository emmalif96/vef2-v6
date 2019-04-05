import React, { useState } from 'react';
import { updateTodo, deleteTodo } from '../../api';
import Link from 'next/link';

import css from './todoDetail.css';
import Button from '../button/Button.js';
import Errors from '../errors/Errors.js';
// Stakt verkefni á /:id
export default function todoDetail(props) {
  const { id, todoDetail, refresh } = props; 
  const { title, completed, due, updated, created} = todoDetail.result;

  const [data, setData] = useState({ title: title, due: due, completed: completed });
  const [deleted, setDelete] = useState(false);
  const [errors, setErrors] = useState([]);


  function onChangeTitle(e) {
      setData({
        ...data,
        title: e.target.value,
      });
    }

    function onChangeChecked(e) {
        setData({
          ...data,
          completed: !data.completed,
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

    async function updateList(e) {
      e.preventDefault();
      setErrors([]);
      const result = await updateTodo(id, data.title, data.due, data.completed);
      if (!result.success) {
        setErrors(result.result);
        return; 
      }
      refresh();
    }

    async function deleteList(e) {
      e.preventDefault(e);
      await deleteTodo(id);
      setDelete(true);
    }

  return (
    <React.Fragment>
      {deleted && (
        <p>Verkefni eytt</p>
      )}
      {( errors && 
        <Errors errors={errors}></Errors>)}
      {!deleted && (
        <React.Fragment>
    <div className={css.todoDetail__list}>
    <legend className={css.todoDetail__term}>Titill:</legend>
    <input className={css.todoDetail__definition} 
    type="textarea"
    value={data.title}
    onChange={onChangeTitle}>
    </input> 

    <legend className={css.todoDetail__term}>Lokið: </legend>
    <input className={css.todoDetail__definition} 
    type="checkbox"
    checked={data.completed}
    onChange={onChangeChecked}>
    </input> 

    <legend className={css.todoDetail__term}>Klárist fyrir:</legend>
    <input className={css.todoDetail__definition} 
    type="datetime-local"
    value={data.due}
    onChange={onChangeDate}>
    </input> 

    
    <legend className={css.todoDetail__term}>Uppfært:</legend>
    <p className={css.todoDetail__definition}>{updated}</p>

    <legend className={css.todoDetail__term}>Búið til:</legend>
    <p className={css.todoDetail__definition}>{created}</p>
    </div>

    <div className={css.todoDetail__buttons}>
      <Button
        children={"Uppfæra"}
        onClick={updateList}>
      </Button>
      <Button
        children={"Eyða"}
        onClick={deleteList}>
      </Button>
    </div>     
     </React.Fragment>
     )}
      <Link as={`/`} href={`/`}>
    <a className={css.todoDetail__back}>Til Baka</a>
    </Link>
    </React.Fragment>
  );
}

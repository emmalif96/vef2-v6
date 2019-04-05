import React from 'react';

import css from './Todos.css';
import Link from 'next/link';
import Button from '../button/Button';
import TodoItem from '../todo-item/TodoItem';

// Listi af verkefnum á forsíðu
export default function Todos(props) {
  const {data, loading, onToggleHidden, hideCompleted, onChange} = props; 

  function change() {
    onChange();
  }
  
  return (
    <React.Fragment>
    <Button
    onClick={onToggleHidden}
    children={hideCompleted ? 'Sýna allt' : 'Fela búið'}>
    </Button>
    
    <div className={css.todos}>
    {loading && (
      (<p>Hleð gögnum...</p>)
      )}
      {!loading && (
        <React.Fragment>
        {data.result.map((item, i) => (
          <TodoItem
            id={item.id}
            title={item.title}
            due={item.due}
            completed={item.completed}
            onChange={change}>
          </TodoItem>
          ))}
        </React.Fragment>
        )}
    </div>
    </React.Fragment>
  );
}
        
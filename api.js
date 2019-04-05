/* todo isomorphic-fetch og útfæra köll í vefþjónustu með slóð úr config */
import 'isomorphic-fetch';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { apiUrl } = publicRuntimeConfig;

export async function deleteTodo(id) {
  /* todo */
  const options = {
    headers: {
      'content-type' : 'application/json',
    },
    method: 'DELETE'
  };

  const url = new URL(`/${id}`, apiUrl);
  await fetch(url.href, options);

}

export async function addTodo(title, due) {
  /* todo */
  const options = {
    body: JSON.stringify({
      title,
      due
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  };

  const url = new URL('/', apiUrl);
  const response = await fetch(url.href, options);

  const result = await response.json();
  return {
    success: response.ok,
    result
  }
}

export async function updateTodo(id, title, due, completed) {
  /* todo */
  const options = {
    body: JSON.stringify({
      title, completed, due,
    }),
    headers: {
      'content-type': 'application/json',
    },
    method: 'PATCH',
  };
  const url = new URL(`/${id}`, apiUrl);
  const response = await fetch(url.href, options);

  const result = await response.json();
  return {
    success: response.ok,
    result

  }
}

export async function getTodos(hideCompleted) {
  /* todo */
  let url; 
  if (hideCompleted) {
    console.log("Sýna einungis það sem er ekki búið");
    url = new URL(`/?completed=${false}`, apiUrl);
  } else {
    url = new URL('/', apiUrl);
  }

  const response = await fetch(url.href);

  const result = await response.json();

  return {
    success: response.ok,
    result
  }
}

export async function getTodo(id) {
  /* todo */
  const url = new URL(`/${id}`, apiUrl);

  const response = await fetch(url.href);

  const result = await response.json();

  return {
    success: response.ok,
    result
  }
}

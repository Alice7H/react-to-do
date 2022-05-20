import React from 'react'
import {render as rtlRender} from '@testing-library/react'
import {IntlProvider} from 'react-intl'
import Portuguese from './lang/pt-BR.json'

function render(ui, {locale = 'pt', ...renderOptions} = {}) {
  function Wrapper({children}) {
    return <IntlProvider locale={locale} messages={Portuguese}>{children}</IntlProvider>
  }
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

function insertToDoItems(qtd, fireEvent, getByPlaceholderText, getByRole){
  for(let i=0; i<qtd ; i++){
    const inputElement = getByPlaceholderText(/Tarefa 1/i);
    fireEvent.change(inputElement, {target: {value: `New Task ${i}`}});
    const linkElement = getByRole('button', { name: /Save/i });
    fireEvent.click(linkElement);
  }
}

function resetToDoList(fireEvent, getByText) {
  const linkElement = getByText(/Redefinir Lista/i);
  fireEvent.click(linkElement);
}

async function checkItem (number, fireEvent, getAllByRole){
  const buttonsCheck = await getAllByRole('button', { name: /Check/i });
  for(let i = 0; i < number; i++){
    fireEvent.click(buttonsCheck[i]);
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export {render, insertToDoItems, resetToDoList, checkItem}
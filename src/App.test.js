import React from 'react';
import App from './App';
import { render, fireEvent, insertToDoItems, resetToDoList, checkItem } from './test-utils';

test('O título é renderizado', () => {
  const {getByText} = render(<App />);
  const linkElement = getByText(/Lista de Afazeres/i);
  expect(linkElement).toBeInTheDocument();
});
test('O campo de input para adicionar afazeres renderiza', ()=>{
  const {getByPlaceholderText} = render(<App />);
  const linkElement = getByPlaceholderText(/Tarefa 1/i);
  expect(linkElement).toBeInTheDocument();
});
test('O botão de adicionar afazeres renderiza', ()=>{
  const {getByRole} = render(<App />);
  const linkElement = getByRole('button', { name: /Save/i });
  expect(linkElement).toBeInTheDocument();
});
test('O select de filtro renderiza a opção de afazer "todos" ', ()=>{
  const {getByRole} = render(<App />);
  const linkElement = getByRole('option', { name: /todos/i}).selected;
  expect(linkElement).toBe(true);
});
test('O botão de redefinir lista renderiza', () =>{
  const {getByText} = render(<App />);
  const linkElement = getByText(/Redefinir Lista/i);
  expect(linkElement).toBeInTheDocument();
});
test('A lista de afazeres renderiza o texto, o botão de concluir e de remover afazer', () => {
  const {getByText, getByPlaceholderText, getByRole,getByTestId} = render(<App/>);
  resetToDoList(fireEvent, getByText);
  insertToDoItems(1,fireEvent, getByPlaceholderText, getByRole);

  const list = getByTestId('toDoList');
  expect(list.textContent).toBe('New Task 0');

  const buttonChecked = getByRole('button', { name: /Check/i });
  expect(buttonChecked).toBeInTheDocument();

  const buttonRemove = getByRole('button', { name: /Remove/i });
  expect(buttonRemove).toBeInTheDocument();
});
test('Simulando o select de filtro de afazeres', () =>{
  const {getByTestId, getAllByTestId} = render(<App />);
  fireEvent.change(getByTestId('selectFilter'), { target: { value: "completed" } });
  let options = getAllByTestId('selectFilter-option');
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeTruthy();
  expect(options[2].selected).toBeFalsy();
})
test('As opções de filtro de afazer funcionam', async()=>{
  const {container, getByText, getByTestId, getAllByTestId, getByPlaceholderText, getByRole, getAllByRole} = render(<App />);
  resetToDoList(fireEvent, getByText);
  insertToDoItems(5, fireEvent, getByPlaceholderText, getByRole);
  await checkItem(2, fireEvent, getAllByRole);

  fireEvent.change(getByTestId('selectFilter'), { target: { value: "all" } });
  const items = await getAllByTestId("toDoListItem");
  expect(items.length).toBe(5);

  fireEvent.change(getByTestId('selectFilter'), { target: { value: "completed" } });
  const itemsCompleted = await getAllByTestId("toDoListItem");
  expect(itemsCompleted.length).toBe(2);

  fireEvent.change(getByTestId('selectFilter'), { target: { value: "uncompleted" } });
  const itemsComp = await getAllByTestId("toDoListItem");
  const itemUncompleted = itemsComp.filter(i => i.getElementsByClassName !=='completed');
  expect(itemUncompleted.length).toBe(3);

})
test('O botão de redefinir lista funciona', ()=>{
  const {getByPlaceholderText, getByRole, getByText, getByTestId} = render( <App/>);
  insertToDoItems(3, fireEvent, getByPlaceholderText, getByRole);

  const linkElement = getByText(/Redefinir Lista/i);
  fireEvent.click(linkElement);

  const list = getByTestId('toDoList');
  expect(list.textContent).toBe('Você não possui afazeres na lista');
})
test('O botão de adicionar afazeres não funciona se um valor não for adicionado no campo input', () => {
  const { getByRole, getByPlaceholderText, getByTestId } = render(<App />);
  const inputElement = getByPlaceholderText(/Tarefa 1/i);
  fireEvent.change(inputElement, {target: {value: ''}});
  const linkElement = getByRole('button', { name: /Save/i });
  fireEvent.click(linkElement);

  const list = getByTestId('toDoList');
  expect(list.textContent).toBe('Você não possui afazeres na lista');
})
test('O botão concluir afazer funciona', async()=>{
  const { getByPlaceholderText, getByRole, getAllByRole, container } = render(<App/>);
  insertToDoItems(3, fireEvent, getByPlaceholderText, getByRole);

  await checkItem (1, fireEvent, getAllByRole, container);
  const itemsCompleted = container.getElementsByClassName('completed');
  expect(itemsCompleted.length).toBe(1);
})
test('O botão de remover afazer funciona', async()=>{
  const { getByText, getByPlaceholderText, getByRole, getAllByRole, getAllByTestId } = render(<App/>);
  resetToDoList(fireEvent, getByText);
  insertToDoItems(3, fireEvent, getByPlaceholderText, getByRole);

  const buttonsRemove = await getAllByRole('button', { name: /Remove/i });
  fireEvent.click(buttonsRemove[0]);

  const items = await getAllByTestId('toDoListItem');
  expect(items.length).toBe(2);
})
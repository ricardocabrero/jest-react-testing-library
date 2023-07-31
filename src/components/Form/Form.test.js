import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { actionAdd } from '../../reducers/taskReducer';
import { Provider } from 'react-redux';
import Form from './Form';

describe('Form Component', () => {

   test('renders correctly', () => {
      const mockStore = configureMockStore();
      const initialState = {
         tasks: [
            { name: 'Task 1', id: 1, completed: false },
            { name: 'Task 2', id: 2, completed: false },
         ],
      };

      const store = mockStore(initialState);

      render(
         <Provider store={store}>
            <Form handleIsRepeat={() => {}}/>
         </Provider>
      );

      const inputElement = screen.getByPlaceholderText('task...');
      const buttonElement = screen.getByText('Send');

      expect(inputElement).toBeInTheDocument();
      expect(buttonElement).toBeInTheDocument();

      expect(inputElement.value).toBe('');
   });

   test('the corresponding message is displayed when item is repeat', async () => {
      const mockStore = configureMockStore();
      const initialState = {
         tasks: [
            { name: 'Task 1', id: 1, completed: false },
            { name: 'Task 2', id: 2, completed: false },
         ],
      };

      const store = mockStore(initialState);

      render(
         <Provider store={store}>
            <Form/>
         </Provider>
      );

      const inputElement = screen.getByPlaceholderText('task...');
      const buttonElement = screen.getByText('Send');

      fireEvent.change(inputElement, { target: { value: 'Task 1' } });
      fireEvent.click(buttonElement);

      expect(screen.getByText('This item already exists.')).toBeInTheDocument();
      await act(() => new Promise((resolve) => setTimeout(resolve, 2000)));
      expect(screen.queryByText('This item already exists.')).not.toBeInTheDocument();
   });

   test('the state should not be updated when a duplicate task is submitted', async() => {
      const mockStore = configureMockStore();
      const tasks = [
         { name: 'Task 1', id: 1, completed: false },
         { name: 'Task 2', id: 2, completed: false },
      ];
      const initialState = { tasks };

      const store = mockStore(initialState);

      render(
         <Provider store={store}>
            <Form/>
         </Provider>
      );

      const inputElement = screen.getByPlaceholderText('task...');
      const buttonElement = screen.getByText('Send');

      fireEvent.change(inputElement, { target: { value: 'Task 1' } });
      fireEvent.click(buttonElement);
      
      await act(() => new Promise((resolve) => setTimeout(resolve, 2000)));

      expect(initialState).toEqual({tasks});
      expect(inputElement.value).toBe('');
   });

   test('should dispatch actionAdd when submitting a new task', async () => {
      const mockStore = configureMockStore();
      const initialState = {
        tasks: [
          { name: 'Task 1', id: 1, completed: false },
        ],
      };
  
      const store = mockStore(initialState);
  
      render(
        <Provider store={store}>
          <Form/>
        </Provider>
      );
  
      const inputElement = screen.getByPlaceholderText('task...');
      const buttonElement = screen.getByText('Send');
  
      fireEvent.change(inputElement, { target: { value: 'New Task' } });
      expect(inputElement.value).toBe('New Task');

      fireEvent.click(buttonElement);
  
      await act(() => new Promise((resolve) => setTimeout(resolve, 2000)));
  
      const actions = store.getActions();
      const expectedAction = actionAdd({
        name: 'New Task',
        id: expect.any(Number),
        completed: false,
      });
      
      expect(actions).toEqual([expectedAction]);
      expect(inputElement.value).toBe('');
   });

   test('when value is empty submit event not add a new task', async () => {
      const mockStore = configureMockStore();
      const initialState = {
        tasks: [
          { name: 'Task 1', id: 1, completed: false },
        ],
      };
  
      const store = mockStore(initialState);
  
      render(
        <Provider store={store}>
          <Form />
        </Provider>
      );
  
      const inputElement = screen.getByPlaceholderText('task...');
      const buttonElement = screen.getByText('Send');
  
      fireEvent.change(inputElement, { target: { value: '' } });
      fireEvent.click(buttonElement);
  
      await act(() => new Promise((resolve) => setTimeout(resolve, 2000)));
  
      const actions = store.getActions();
      const expectedAction = actionAdd({
        name: 'New Task',
        id: expect.any(Number),
        completed: false,
      });
      
      expect(actions).not.toEqual([expectedAction]);
      expect(inputElement.value).toBe('');
   });

});
 
  
  
  
  
  



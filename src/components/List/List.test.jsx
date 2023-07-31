import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { actionRemove, actionToggleSelect } from '../../reducers/taskReducer';
import List from './List';

describe('List component', () => {

   test('renders correctly with tasks count', () => {
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
           <List />
         </Provider>
       );

      expect(screen.getByText(initialState.tasks.length)).toBeInTheDocument();
   });

   test('when all the tasks have property x equal to true, the text "Tasks completed!"', () => {   
      const mockStore = configureMockStore();
      const initialState = {
         tasks: [
            { name: 'Task 1', id: 1, completed: true },
         ],
      };

      const store = mockStore(initialState);

      render(
         <Provider store={store}>
           <List />
         </Provider>
       );

      const listItem = screen.getByRole('listitem'); 
      fireEvent.click(listItem);

      expect(screen.getByText('Tasks completed!')).toBeInTheDocument();

   });

   test('should call actionRemove when clicking on delete button', () => {
      const mockStore = configureMockStore();
      const initialState = {
         tasks: [
           { name: 'Task 1', id: 1, completed: false },
           { name: 'Task 2', id: 2, completed: true },
         ],
       };
   
       const store = mockStore(initialState);
   
       render(
         <Provider store={store}>
           <List />
         </Provider>
       );

       const deleteButton = screen.getAllByText('Delete')[0];
       fireEvent.click(deleteButton);

       const actions = store.getActions();
       const expectedAction = actionRemove(1);
       
       expect(actions).toEqual([expectedAction]);
   });

   test('should call actionToggleSelect when clicking on item element', () => {
      const mockStore = configureMockStore();
      const initialState = {
         tasks: [
           { name: 'Task 1', id: 1, completed: false },
           { name: 'Task 2', id: 2, completed: true },
         ],
       };
   
       const store = mockStore(initialState);
   
       render(
         <Provider store={store}>
           <List />
         </Provider>
       );

       const itemElement = screen.getAllByRole('listitem')[0];
       fireEvent.click(itemElement);

       const actions = store.getActions();
       const expectedAction = actionToggleSelect(1);
       
       expect(actions).toEqual([expectedAction]);
   });

});
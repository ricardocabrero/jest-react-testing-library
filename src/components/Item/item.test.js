import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Item from './Item';

describe('Item Component', () => {

   test('renders correctly', () => {
      const props = {
         handleToggle: () => {},
         hanleRemove: () => {},
         name: 'Task 1',
         id: 12345,
         completed: false
      }

      render(
         <Item 
         handleToggle={props['handleToggle']} 
         hanleRemove={props['hanleRemove']} 
         name={props['name']} 
         id={props['id']} 
         completed={props['completed']}/>
      );

      const paragraph = screen.getByText(props['name']);
      const itemLi = screen.getByRole('listitem');

      expect(paragraph).toBeInTheDocument();
      expect(itemLi).toHaveClass('normal');
   });

   test('element has class "normal completed" when completed is true', () => {
      const props = {
         handleToggle: () => {},
         hanleRemove: () => {},
         name: 'Task 1',
         id: 12345,
         completed: true
      }

      render(
         <Item 
         handleToggle={props['handleToggle']} 
         hanleRemove={props['hanleRemove']} 
         name={props['name']} 
         id={props['id']} 
         completed={props['completed']}/>
      );
      
      const li = screen.getByRole('listitem');
      expect(screen.getByText(props['name'])).toBeInTheDocument();
      expect(li).toHaveClass('normal completed');
   });

   test('handleToggle should trigger a func', () => {
      const mockHandler = jest.fn();
      
      const props = {
         handleToggle: mockHandler,
         hanleRemove: () => {},
         name: 'Task 1',
         id: 12345,
         completed: false
      }

      render(
         <Item 
         handleToggle={props['handleToggle']} 
         hanleRemove={props['hanleRemove']} 
         name={props['name']} 
         id={props['id']} 
         completed={props['completed']}/>
      );
            
      const li = screen.getByRole('listitem');

      fireEvent.click(li);
      expect(mockHandler).toHaveBeenCalledTimes(1);
      mockHandler.mockRestore();
   });

   test('handleDelete should trigger a func', () => {
      const mockHandler = jest.fn();
      
      const props = {
         handleToggle: () => {},
         hanleRemove:  mockHandler,
         name: 'Task 1',
         id: 12345,
         completed: false
      }

      render(
         <Item 
         handleToggle={props['handleToggle']} 
         hanleRemove={props['hanleRemove']} 
         name={props['name']} 
         id={props['id']} 
         completed={props['completed']}/>
      );
            
      const buttonDelete = screen.getByRole('button');

      fireEvent.click(buttonDelete);
      expect(mockHandler).toHaveBeenCalledTimes(1);
      mockHandler.mockRestore();
   });

})
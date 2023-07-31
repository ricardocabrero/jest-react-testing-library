import taskReducer, { actionAdd, actionRemove, actionToggleSelect }  from './taskReducer';
import configureMockStore from 'redux-mock-store';

describe('taskReducer', () => {
   
   const mockStore = configureMockStore();

   test('should return the initial state', () => {
      const initialState = [];
      const action = {};

      const newState = taskReducer(initialState, action);
      expect(newState).toEqual(initialState);
   });

   test('should handle ADD action', () => {
      const initialState = [];
      const store = mockStore(initialState);
  
      const task = { name: 'Task 1', id: 1, completed: false };
      const expectedAction = actionAdd(task);
  
      store.dispatch(expectedAction);
  
      const actions = store.getActions();
      const newState = taskReducer(initialState, expectedAction);
  
      expect(actions).toEqual([expectedAction]);
      expect(newState).toEqual([task]);
    });

    test('should handle REMOVE action', () => {
      const task = { name: 'Task 1', id: 1, completed: false };
      const initialState = [task];
      const store = mockStore(initialState);

      const expectedAction = actionRemove(task.id);
      store.dispatch(expectedAction);
  
      const actions = store.getActions();
      const newState = taskReducer(initialState, expectedAction);
  
      expect(actions).toEqual([expectedAction]);
      expect(newState).toEqual([]);
    });

    test('should handle TOGGLESELECT action', () => {
      const task1 = { name: 'Task 1', id: 1, completed: false };
      const task2 = { name: 'Task 2', id: 2, completed: false };
      const initialState = [task1, task2];
      const store = mockStore(initialState);

      const expectedTask1 = { name: 'Task 1', id: 1, completed: true }; //clicked
      const expectedTask2 = { name: 'Task 2', id: 2, completed: false };
      
      const expectedAction = actionToggleSelect(task1.id);
      store.dispatch(expectedAction);
  
      const actions = store.getActions();
      const newState = taskReducer(initialState, expectedAction);
  
      expect(actions).toEqual([expectedAction]);
      expect(newState).toEqual([expectedTask1, expectedTask2]);
    });

});

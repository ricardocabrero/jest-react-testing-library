const actions = {
   ADD: 'add',
   REMOVE: 'remove',
   TOGGLESELECT: 'toggleSelect',
}

//Item model
// item = { name: 'name', id: '123124299', completed: false }

const initialState = [];

export default function taskReducer(state = initialState, action) {
   switch (action.type) {
      case actions['ADD']:
         return state = [...state, action.payload]
      case actions['REMOVE']:
         return state.filter(item => item.id !== action.payload);
      case actions['TOGGLESELECT']:
         return state.map(item => item.id === action.payload ? ({...item, completed: !item.completed}) : item);
      default:
         return state
   }
}

export const actionAdd = (item) => ({
   type: actions['ADD'],
   payload: item,
});

export const actionRemove = (itemId) => ({
   type: actions['REMOVE'],
   payload: itemId,
});

export const actionToggleSelect = (itemId) => ({
   type: actions['TOGGLESELECT'],
   payload: itemId,
});
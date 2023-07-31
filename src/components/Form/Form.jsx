import PropTypes from 'prop-types';
import { useState } from "react"
import { actionAdd } from '../../reducers/taskReducer';
import { useSelector, useDispatch } from 'react-redux';

export default function Form() {

   const dispatch = useDispatch();
   const tasks = useSelector(state => state.tasks);
   const [inputValue, setInputValue] = useState('');
   const [isRepeatMessage, setIsRepeatMessage] = useState(false);
  
   function handleChange(e) {
      setInputValue(prev => prev = e.target.value);
   }

   function isRepeat() {
      return tasks.some(item => item.name === inputValue);
   }

   function handleSubmit(e) {
      e.preventDefault();

      if (isRepeat()) {
         setIsRepeatMessage(true);
         setTimeout(() => {   
            setInputValue(prev => prev = '');
            setIsRepeatMessage(false);
         }, 2000);
         return;
      }

      if (inputValue.trim() !== '') {
         dispatch(actionAdd({
            name: inputValue,
            id: new Date().getTime(),
            completed: false
         }));
         setInputValue('');
      }
   }

   return(
      <>
         {isRepeatMessage && <p>This item already exists.</p>}
         <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={inputValue} type="text" placeholder="task..." autoComplete="off"/>
            <button type="submit">Send</button>
         </form>
      </>
   )
}

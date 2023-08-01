import useForm from '../../hooks/useForm';
import { actionAdd } from '../../reducers/taskReducer';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Form.module.scss';

export default function Form() {
   const dispatch = useDispatch();
   const tasks = useSelector(state => state.tasks);

   const { handleChange, handleSubmit, inputValue, isRepeatMessage } = useForm(tasks);

   function handlerAction(inputValue) {
      dispatch(actionAdd({
         name: inputValue,
         id: new Date().getTime(),
         completed: false
      }));
   }

   return(
      <>
         {isRepeatMessage && <p className={styles.advise}>This item already exists.</p>}
         <form onSubmit={(e) => handleSubmit(e, handlerAction)}>
            <input onChange={handleChange} value={inputValue} type="text" placeholder="task..." autoComplete="off"/>
            <button type="submit">Send</button>
         </form>
      </>
   )
}

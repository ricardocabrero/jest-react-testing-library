import { actionRemove, actionToggleSelect } from '../../reducers/taskReducer';
import { useSelector, useDispatch } from 'react-redux';
import Item from '../Item/Item';
import styles from './list.module.scss';


export default function List() {

   const tasks = useSelector(state => state.tasks);
   const dispatch = useDispatch();

   function removeItem(e, itemId) {
      e.stopPropagation();
      dispatch(actionRemove(itemId));
   }

   function toggleItem(e) {
      dispatch(actionToggleSelect(Number(e.currentTarget.id)));
   } 

   function literalPlural(tasks) {
      return (tasks.length > 1) ? 's' : '';
   }

   return (
      <>
         <p>{tasks.length}{tasks.length && tasks.every(task => task.completed === true) ? <strong>&nbsp;{`Task${literalPlural(tasks)} completed!`}</strong> : undefined}</p>
         <ul className={styles.list}>
            {tasks.map(({name, id, completed}) => {
               return( 
               <Item
                  key={id}
                  handleToggle={toggleItem}
                  hanleRemove={removeItem}
                  name={name}
                  id={id}
                  completed={completed}
               />
               )
            })}
         </ul>
      </>
   )
}
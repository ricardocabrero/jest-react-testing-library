import PropTypes from 'prop-types';
import styles from './Item.module.scss';

export default function Item({handleToggle, hanleRemove, name, id, completed}) {
   return(
      <li 
      onClick={(e) => handleToggle(e)}
      id={id} 
      className={completed ? `${styles.normal} ${styles.completed}` : `${styles.normal}`}>
      <p>{name}</p>
      <button onClick={(e) => hanleRemove(e, id)}>Delete</button>
   </li>
   )
}

Item.propTypes = {
   handleToggle: PropTypes.func.isRequired,
   hanleRemove: PropTypes.func.isRequired,
   name: PropTypes.string.isRequired,
   id: PropTypes.number.isRequired,
   completed: PropTypes.bool.isRequired
}
import { useState } from "react";

export default function useForm(tasks) {
   const [inputValue, setInputValue] = useState('');
   const [isRepeatMessage, setIsRepeatMessage] = useState(false);

   function handleChange(e) {
      setInputValue((prev) => prev = e.target.value);
   }

   function isRepeat() {
      return tasks.some(item => item.name === inputValue);
   }

   function handleSubmit(e, handlerAction) {
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
         handlerAction(inputValue);
         setInputValue('');
      }
   }

   return {
      handleChange,
      handleSubmit,
      inputValue,
      isRepeatMessage
   }
}
import React, { useRef } from 'react'
import FormComponent from './formComponent'

function app() {
    const name = useRef();
    function handleSubmit(e){
        e.preventDefault();



        console.log(name.current.getValue())
        name.current.getFocus()
        name.current.setValue("")
    }
  return (
    <div>
<form onSubmit={handleSubmit}>
    <FormComponent ref={name}/>
    <button type='submit'>Submit</button>
</form>


    </div>
  );
}

export default app
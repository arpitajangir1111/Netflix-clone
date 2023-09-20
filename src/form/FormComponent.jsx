import { forwardRef, useImperativeHandle, useRef } from "react";

const FormComponent=forwardRef((props,ref) =>{
    const name = useRef();
    useImperativeHandle(ref,() =>({
        getValue: function(){
            return name.current.value;
        },

getFocus: function(){
    return name.current.focus()
},
setValue: function(newValue){
    name.current.value = newValue
}

    }));
    return <input type="text" placeholder="Enter a name" ref={name} />
});
export default FormComponent;
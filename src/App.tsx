import './App.css'
import {useState, useRef} from "react";


export default () => {
    const [message, setMessage] = useState<string>('');
    const typedValue = useRef({});

    const updateTypedValue = (event) => {
        typedValue.current[event.target.name] = event.target.value;
        setMessage(`${typedValue.current.prenom} ${typedValue.current.nom}`);
    }

    return <>
        <input name="prenom" onChange={updateTypedValue}/>
        <br/>
        <br/>
        <input name="nom" onChange={updateTypedValue}/>
        <br/>
        <br/>
        <h1 ref={message}></h1>
    </>
}

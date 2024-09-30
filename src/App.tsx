import './App.css'
import {useState, useRef} from "react";


export default () => {
    const [message, setMessage] = useState<string>();
    const prenomTypedValue = useRef(null);
    const nomTypedValue = useRef(null);

    const updateMessage = ()=> {
        const prenom = prenomTypedValue.current.value
        const nom = nomTypedValue.current.value
        setMessage(prenom + " " + nom);
    }

    return <>
        <input ref={prenomTypedValue} onChange={updateMessage}/>
        <br/>
        <br/>
        <input ref={nomTypedValue} onChange={updateMessage}/>
        <br/>
        <br/>
        <h1>{message}</h1>
    </>
}

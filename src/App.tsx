import './App.css'
import {useState, useRef} from "react";



export default () => {
    const [valueUseState, setValueUseState] = useState<number>(0);
    const valueUseRef = useRef(0);

    function incrementUseRef() {
        valueUseRef.current += 1
    }

    function incrementUseState() {
        setValueUseState(valueUseState + 1)
    }

    return <>
        <button onClick={incrementUseRef}>{valueUseRef.current}</button>
        <button onClick={incrementUseState}>{valueUseState}</button>
    </>
}

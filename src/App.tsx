import './App.css'
import React, {useState} from "react";



export default () => {
    const messageInfo = [
        {"min": 0, "max": 18.5, "message": "je suis en tranche maigreur"},
        {"min": 18.5, "max": 25, "message": "je suis en tranche normal"},
        {"min": 25, "max": 30, "message": "je suis en tranche surpoids"},
        {"min": 30, "max": 35, "message": "je suis en tranche obésité"},
        {"min": 35, "max": 40, "message": "je suis en tranche obésité massive"},
        {"min": 40, "max": 10000, "message": "je suis en tranche obésité sévère"},
    ]

    const [imc, setImc] = useState<number | null>(null);

    const updateMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget);
        const poids: number | null = toNumber(formData.get('poids'));
        const height: number | null = toNumber(formData.get('height'));

        if (poids !== null && height !== null) {
            setImc(poids / (height * height))
        } else {
            setImc(null)
        }
    }

    function getMessage(): string {
        if (imc == null) return "Veuillez saisir des valeurs valides"
        for (const item in messageInfo) {
            if (item.min < imc && imc < item.max) {
                return item.message
            }
        }
        return "Veuillez saisir des valeurs valides"
    }

    return <>
        <form method={'POST'} onSubmit={updateMessage}>
            <label>poids</label> <input name="poids"/>
            <br/>
            <label>Taille</label> <input name="height"/>
            <br/>
            <button type="submit" className="btn btn-success"><i className="fa fa-plus"/></button>
            <h1 color={getColorForValue(imc || 0)}>{getMessage()}</h1>
        </form>
    </>
}

function toNumber(value: FormDataEntryValue | null): number | null {
    const result = Number(value);

    if (isNaN(result)) {
        console.log(`${value} n'est pas un nombre`)
        return null;
    }

    return result;
}

function getColorForValue(value: number): string {
    const minValue = 18.5;
    const maxValue = 40;
    const greenRange = 25;

    if (value <= minValue) return 'red';
    if (value >= maxValue) return 'red';

    let redComponent: number;
    let greenComponent: number;

    if (value <= greenRange) {
        // Vert maximum à 25, puis transition vers rouge en diminuant la valeur
        const ratio = (value - minValue) / (greenRange - minValue);
        redComponent = 255 * (1 - ratio);
        greenComponent = 255;
    } else {
        // Vert maximum à 25, puis transition vers rouge en augmentant la valeur
        const ratio = (value - greenRange) / (maxValue - greenRange);
        redComponent = 255;
        greenComponent = 255 * (1 - ratio);
    }

    // Convertir en code hexadécimal
    const redHex = Math.round(redComponent).toString(16).padStart(2, '0');
    const greenHex = Math.round(greenComponent).toString(16).padStart(2, '0');
    const color = `#${redHex}${greenHex}00`;

    return color;
}

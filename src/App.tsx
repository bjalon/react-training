import './App.css'
import React, {useState} from "react";

interface iInfo {
    imc: number;
    tranche: string;
    kilo: number | null;
    taille: number | null;
    color: string | null;
}

export default () => {
    const defaultValue: iInfo = {
        imc: -1,
        tranche: "",
        kilo: null,
        taille: null,
        color: null,
    };

    const [info, setInfo] = useState<iInfo | null>(defaultValue);

    const updateInfo = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget);

        const myInfo = {...defaultValue}
        myInfo.kilo = toNumber(formData.get('poids'));
        myInfo.taille = toNumber(formData.get('height'));

        if (myInfo.kilo !== null && myInfo.taille !== null) {
            myInfo.imc = myInfo.kilo / (myInfo.taille * myInfo.taille)

            if (myInfo.imc < 18.5) {
                myInfo.tranche = "maigreur"
                myInfo.color = "tomato"
            } else if (18.5 < myInfo.imc && myInfo.imc < 25) {
                myInfo.tranche = "normal"
                myInfo.color = "green"
            } else if (25 < myInfo.imc && myInfo.imc < 30) {
                myInfo.tranche = "surpoids"
                myInfo.color = "tomato"
            } else if (30 < myInfo.imc && myInfo.imc < 35) {
                myInfo.tranche = "obésité"
                myInfo.color = "tomato"
            } else if (35 < myInfo.imc && myInfo.imc < 40) {
                myInfo.tranche = "obésité massive"
                myInfo.color = "tomato"
            } else if (myInfo.imc > 40) {
                myInfo.tranche = "obésité sévère"
                myInfo.color = "tomato"
            }
            setInfo(myInfo);
        } else {
            setInfo(null)
        }
    }

    return <>
        <form method={'POST'} onSubmit={updateInfo}>
            <label>poids</label> <input name="poids"/>

            <br/>
            <label>Taille</label> <input name="height"/>
            <br/>
            <button type="submit" className="btn btn-success"><i className="fa fa-plus"/></button>
            {info != null ? <h1 style={{color: info.color || 'black'}}>{info.tranche}</h1> :
                <h1>Veuillez saisir des valeurs correct</h1>}
        </form>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                <a className="navbar-brand" href="#">
                    <i className="fa-solid fa-weight-scale"></i>
                    Calcul IMC</a>
            </div>
        </nav>
        <div className="container">
            <div className="row">
                <div className="col-4 pt-4">
                    <h1 className="h3">Calculer votre IMC</h1>
                    <input
                        aria-label="Poids"
                        className="form-control"
                        placeholder="Poids en kg."
                    />

                    <input
                        aria-label="Taille"
                        className="form-control mt-3"
                        placeholder="taille en m."
                    />

                    <button className="btn btn-success mt-3 col-12">
                        <i className="fa-solid fa-weight-scale"></i>
                    </button>
                    <div className="alert alert-success mt-4" role="alert">
                        <h3>IMC : 24</h3>
                        <p>Normal</p>
                    </div>
                    <div className="alert alert-warning mt-4" role="alert">
                        <h3>IMC : 17</h3>
                        <p>Surpoids</p>
                    </div>
                    <div className="alert alert-warning mt-4" role="alert">
                        <h3>IMC : 31</h3>
                        <p>Obésité</p>
                    </div>
                    <div className="alert alert-danger mt-4" role="alert">
                        <h3>IMC : 36</h3>
                        <p>Obésité Massive</p>
                    </div>
                </div>
            </div>
        </div>

        <footer className="py-5 bg-dark">
            <div className="container px-4 px-lg-5">
                <p className="m-0 text-center text-white">
                    Copyright &copy; Seven Valley 2023
                </p>
            </div>
        </footer>
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

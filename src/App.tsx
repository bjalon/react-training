import {useRef, useState} from "react";
import "./App.css";
interface Iinfo {
    imc: string;
    tranche: string;
    classe: string;
    kilo: string;
    poids: string;
}
export default function App() {

    const taille = useRef(null)
    const poids = useRef(null)

    //let message = 'Bonjour';
    const [info, setInfo] = useState<Iinfo>({
        imc: "",
        tranche: "",
        classe: "",
        kilo: "",
        poids: "",
    });

    const calcul = () => {
        if (poids.current == null || taille.current == null || poids.current.value.length <= 0 || taille.current.value.length <= 0) {
            setInfo({
                imc: "",
                tranche: "",
                classe: "",
                kilo: "",
                poids: "",
            });
            return
        }

        const imc: number =
            parseFloat(poids.current.value) / (parseFloat(taille.current.value) * parseFloat(taille.current.value));
        let info: Iinfo = {
            imc: "",
            tranche: "",
            classe: "",
            kilo: "",
            poids: "",
        };

        if (imc > 25) {
            const poidsIdeal: number = 25 * parseFloat(taille.current.value) * parseFloat(taille.current.value);
            const kilo: number = poidsIdeal - parseFloat(poids.current.value);
            info.kilo = kilo.toFixed(1);
            info.poids = poidsIdeal.toFixed(1);
        }
        info.imc = imc.toFixed(1);
        if (imc < 18.5) {
            const poidsIdeal = 18.5 * parseFloat(taille.current.value) * parseFloat(taille.current.value);
            info.tranche = "maigreur";
            const kilo: number = poidsIdeal - parseFloat(poids.current.value);
            //info.kilo = '+'+kilo.toFixed(1);
            info.kilo = `+ ${kilo.toFixed(1)}`;
            info.poids = poidsIdeal.toFixed(1);
            info.classe='warning';
        } else if (imc < 25) {
            // 18.5 <imc <25
            info.tranche = "normal";
            info.classe='success';
        } else if (imc < 30) {
            info.tranche = "surpoids";
            info.classe='warning';
        } else if (imc < 35) {
            info.tranche = "obésité";
            info.classe='danger';
        } else if (imc < 40) {
            info.tranche = "obésité massive";
            info.classe='secondary';
        } else if (imc >= 40) {
            info.tranche = "obésité sévère";
            info.classe='info';
        }
        console.log(info);
        setInfo(info);
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <i className="fa-solid fa-weight-scale"></i>
                        Calcul IMC
                    </a>
                </div>
            </nav>
            <div className="container">
                <form method="post">
                    <div className="row">
                        <div className="col-4 pt-4">
                            <h1 className="h3">Calculer votre IMC</h1>
                            <input
                                ref={poids}
                                aria-label="Poids"
                                className="form-control"
                                placeholder="Poids en kg."
                                name="poids"
                                onChange={calcul}
                            />

                            <input
                                ref={taille}
                                aria-label="Taille"
                                className="form-control mt-3"
                                placeholder="taille en m."
                                name="taille"
                                onChange={calcul}
                            />
                            {info.imc.length > 0 && (
                                <>
                                    <div className={`alert mt-4 alert-${info.classe}`} role="alert">
                                        <h3>IMC : {info.imc}</h3>
                                        <p>{info.tranche}</p>
                                        {info.kilo.length > 0 && (
                                            <h4>
                                                objectif :{info.poids} kg ({info.kilo})
                                            </h4>
                                        )}
                                    </div>


                                </>
                            )}


                        </div>
                    </div>
                </form>
            </div>

            <footer className="py-5 bg-dark">
                <div className="container px-4 px-lg-5">
                    <p className="m-0 text-center text-white">
                        Copyright &copy; Seven Valley 2023
                    </p>
                </div>
            </footer>
        </>
    );
}
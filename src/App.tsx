import "./App.css";
import SearchComponent from "./components/SearchComponent.tsx";
import FavorisComponent from "./components/FavorisComponent.tsx";
import {useEffect, useState} from "react";
import Constants from "./tools/Constants.ts";

export default function App() {

    useEffect(() => {
        initFavoris()
    }, [])

    const [favorises, setFavorises] = useState<any[]>([])

    async function initFavoris() {
        const url = Constants.firebaseUrl + Constants.favorisDBName + ".json";
        const response = await fetch(url);
        const jsonResponse = await response.json();

        if (jsonResponse) {
            const ids = Object.keys(jsonResponse);
            if (ids.length > 0) {
                const myFavorises = []
                for (const id of ids) {
                    const favoris = {...jsonResponse[id]}
                    favoris.cpId = id
                    myFavorises.push(favoris);
                }
                setFavorises(myFavorises);
            }
        }
    }

    async function handleAddFavoris(favoris: any) {
        const url = Constants.firebaseUrl + Constants.favorisDBName + ".json";
        for (const myFavoris of favorises) {
            if (myFavoris.imdbID === favoris.imdbID) return
        }

        const newFavorises = [...favorises]
        newFavorises.push(favoris)
        await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(favoris),
        });
        setFavorises(newFavorises)
    }

    async function handleRemove(id: string) {
        const url = Constants.firebaseUrl + Constants.favorisDBName + `/${id}.json`;
        const newFavorises = []
        for (const favoris of favorises) {
            if (favoris.cpId !== id) newFavorises.push(favoris)
        }
        await fetch(url, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        setFavorises(newFavorises)
    }

    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                <a className="navbar-brand" href="#">
                    <i className="fa-solid fa-rocket me-4"></i>
                    Mes séries</a>
            </div>
        </nav>
        <div className="container mt-4" data-info="88zzefdc2275">
            <div className="row">
                <SearchComponent onAddFavoris={handleAddFavoris}/>

                <FavorisComponent favorises={favorises} onRemove={handleRemove}/>
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
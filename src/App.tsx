import "./App.css";
import SearchComponent from "./components/SearchComponent.tsx";
import FavorisComponent from "./components/FavorisComponent.tsx";
import {useEffect, useState} from "react";

export default function App() {

    useEffect(() => {
        const myFavorises = localStorage.getItem("favorises")
        if (myFavorises) {
            setFavorises(JSON.parse(myFavorises))
        }
    }, [])

    const [favorises, setFavorises] = useState<any[]>([])

    function handleAddFavoris(favoris: any) {
        for (const myFavoris of favorises) {
            if (myFavoris.imdbID === favoris.imdbID) return
        }

        const newFavorises = [...favorises]
        newFavorises.push(favoris)
        localStorage.setItem("favorises", JSON.stringify(newFavorises))
        setFavorises(newFavorises)
    }

    function handleRemove(id: string) {
        const newFavorises = []
        for (const favoris of favorises) {
            if (favoris.imdbID !== id) newFavorises.push(favoris)
        }
        localStorage.setItem("favorises", JSON.stringify(newFavorises))
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
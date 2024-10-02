import "./App.css";
import {useEffect, useState} from "react";
import Constants from "./tools/Constants.ts";
import {VipCreationFormComponent} from "./components/VipCreationFormComponent.tsx";
import {VipListItem} from "./components/VipListItem.tsx";
import Vip from "./models/Vip.ts";

export default function App() {

    useEffect(() => {
        initVips()
    }, [])

    const [vips, setVips] = useState<any[]>([])

    async function initVips() {
        const url = Constants.firebaseUrl + Constants.favorisDBName + ".json";
        const response = await fetch(url);
        const jsonResponse = await response.json();

        if (jsonResponse) {
            const ids = Object.keys(jsonResponse);
            if (ids.length > 0) {
                const myVips = []
                for (const id of ids) {
                    const vip = {...jsonResponse[id]}
                    vip.id = id
                    myVips.push(vip);
                }
                console.log(myVips);
                setVips(myVips);
            }
        }
    }

    async function onCreate(vip: Vip) {
        const url = Constants.firebaseUrl + Constants.favorisDBName + ".json";

        const newVips = [...vips]
        newVips.push(vip)
        await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vip),
        });
        setVips(newVips)
    }

    async function onDelete(id: string) {
        const url = Constants.firebaseUrl + Constants.favorisDBName + `/${id}.json`;
        const newVip = []
        for (const vip of vips) {
            if (vip.id !== id) newVip.push(vip)
        }
        await fetch(url, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        setVips(newVip)
    }

    async function toggleCheck(id: string) {
        let foundVip: Vip | null = null
        const newVips: Vip[] = []

        for (const vip of vips) {
            if (vip.id === id) {
                foundVip = {...vip};
                newVips.push(foundVip)
            } else {
                newVips.push(vip)
            }
        }
        if (foundVip) {
            foundVip.isPresent = !foundVip.isPresent

            const url = Constants.firebaseUrl + Constants.favorisDBName + `/${id}.json`;

            await fetch(url, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: `{"isPresent":${foundVip.isPresent}}`,
            });
            setVips(newVips)
        } else {
            alert("Vip non trouvé ?!??")
        }
    }

    return <>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                <a className="navbar-brand" href="#">
                    <i className="fa-solid fa-martini-glass-citrus me-4"></i>
                    VIP Cocktail</a>
            </div>
        </nav>
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <div className="bg-gris p-4">
                        <VipCreationFormComponent onCreate={onCreate}/>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-4">

                    <table className="table table-striped mt-4">
                        <tbody>


                        <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                        {
                            vips.map((vip: Vip) =>
                                <VipListItem key={vip.id} vip={vip} toggleCheck={toggleCheck} onDelete={onDelete}/>)
                        }
                        </tbody>
                    </table>


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
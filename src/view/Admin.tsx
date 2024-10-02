import "../App.css";
import {useEffect, useState} from "react";
import Constants from "../tools/Constants.ts";
import {VipCreationFormComponent} from "../components/VipCreationFormComponent.tsx";
import {VipListItem} from "../components/VipListItem.tsx";
import Vip from "../models/Vip.ts";
import NavComponent from "../components/NavComponent.tsx";
import {FooterComponent} from "../components/FooterComponent.tsx";
import {useNavigate} from "react-router-dom";

export default function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        initVips()
    }, [])

    const [vips, setVips] = useState<Vip[]>([])

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

    function handleClickVip(id: string) {
        navigate(`/edition/${id}`);
    }

    return <>

        <NavComponent selected={'admin'}/>
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <div className="bg-gris p-4">
                        <VipCreationFormComponent vip={null} onCreate={onCreate}/>
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
                                <VipListItem key={vip.id} vip={vip} toggleCheck={toggleCheck} onDelete={onDelete}
                                             onClick={handleClickVip}/>)
                        }
                        </tbody>
                    </table>


                </div>

            </div>
        </div>
        <FooterComponent/>
    </>
}
import "../App.css";
import {useEffect, useState} from "react";
import Constants from "../tools/Constants.ts";
import Vip from "../models/Vip.ts";
import NavComponent from "../components/NavComponent.tsx";
import {VipListItemReadOnly} from "../components/VipListItemReadOnly.tsx";
import {FooterComponent} from "../components/FooterComponent.tsx";

export default function Home() {

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

    return <>
        <NavComponent selected={'home'}/>
        <div className="container">
            <div className="row">
                <div className="col-4">

                    <table className="table table-striped mt-4">
                        <tbody>


                        <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                        </tr>
                        {
                            vips.map((vip: Vip) =>
                                <VipListItemReadOnly key={vip.id} vip={vip}/>)
                        }
                        </tbody>
                    </table>


                </div>

            </div>
        </div>

        <FooterComponent/>
    </>
}
import "../App.css";
import {useEffect, useRef, useState} from "react";
import Constants from "../tools/Constants.ts";
import {VipCreationFormComponent} from "../components/VipCreationFormComponent.tsx";
import Vip from "../models/Vip.ts";
import NavComponent from "../components/NavComponent.tsx";
import {redirect, useParams} from "react-router-dom";
import {FooterComponent} from "../components/FooterComponent.tsx";

export default function Edition() {
    const {id} = useParams()
    let count = useRef(0)

    useEffect(() => {
        initVip()
    }, [])

    const [vip, updateVip] = useState<Vip>()

    async function initVip() {
        const url = Constants.firebaseUrl + Constants.favorisDBName + `/${id}.json`;
        const response = await fetch(url);
        const jsonResponse = await response.json();

        if (jsonResponse) {
            count.current += 1;
            updateVip(jsonResponse);
        } else {
            console.log(`vip id not found ${id}`);
            redirect('/error')
        }
    }


    async function handleUpdate(myVip: Vip) {
        const url = Constants.firebaseUrl + Constants.favorisDBName + `/${id}.json`;

        await fetch(url, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(myVip),
        });
        redirect('admin')
    }

    return <>

        <NavComponent selected={'edition'}/>
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <div className="bg-gris p-4">
                        <VipCreationFormComponent key={count.current} vip={vip || null} onCreate={handleUpdate}/>
                    </div>
                </div>

            </div>
        </div>
        <FooterComponent/>
    </>
}
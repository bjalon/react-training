import {useState} from "react";
import Vip from "../models/Vip.ts";

const newVip = {
    id: "",
    firstname: "",
    name: "",
    isPresent: null,
};

interface VipCreationFormComponentProps {
    vip: Vip | null;
    onCreate: (vip: Vip) => void;
}

export function VipCreationFormComponent(props: VipCreationFormComponentProps) {

    console.log("aaa" + props.vip)
    const [vip, updateVip] = useState<Vip>(props.vip || {...newVip})

    function handleCreate() {
        props.onCreate(vip)
        updateVip({...newVip})
    }

    return <div className="row">
        <div className="col-4">
            <input
                aria-label="Prenom"
                className="form-control"
                placeholder="prenom"
                onChange={(elt) => {
                    const updatedVip = {...vip}
                    updatedVip.firstname = elt.target.value
                    updateVip(updatedVip)
                }}
            />
        </div>
        <div className="col-4">
            <input
                aria-label="Nom"
                className="form-control"
                placeholder="Nom"
                onChange={(elt) => {
                    const updatedVip = {...vip}
                    updatedVip.name = elt.target.value
                    updateVip(updatedVip)
                }}
            />
        </div>

        <div className="col-1">
            <button className="btn btn-success" onClick={handleCreate}>
                <i className="fa fa-plus"></i>
            </button>
        </div>
    </div>;
}
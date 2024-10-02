import Vip from "../models/Vip.ts";
import {useForm} from "react-hook-form"

interface VipCreationFormComponentProps {
    vip: Vip | null;
    onCreate: (vip: Vip) => void;
}

export function VipCreationFormComponent(props: VipCreationFormComponentProps) {
    console.log(props.vip)
    const {register, handleSubmit, formState: {errors},} = useForm({defaultValues: props.vip || {name: 'toto', isPresent: null}});

    return <>
        <form onSubmit={handleSubmit((data) => props.onCreate(data))}>

            <div className="row">
                <div className="col-4">
                    {errors.firstname && <span>Vous devez ecrire le prenom </span>}
                    <input
                        aria-label="Prenom"
                        className="form-control"
                        placeholder="prenom"
                        {...register('firstname', {required: true})}
                    />
                </div>
                <div className="col-4">
                    {errors.name && <span>Vous devez ecrire le nom </span>}
                    <input
                        aria-label="Nom"
                        className="form-control"
                        placeholder="Nom"
                        {...register('name', {required: true})}
                    />
                </div>
                <div className="col-1">
                    <button className="btn btn-success" type="submit">
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </div>
        </form>
    </>
}
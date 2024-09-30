import Person from "../models/Person.ts";

interface IPropsPerson {
    index: number;
    persons: Person;
    qui: (indice: number) => void;
}

export default function PersonComponent(props: IPropsPerson) {
    console.log(props);
    return (
        <div>
            <h1 onClick={() => props.qui(props.index)}>Je suis {props.persons.prenom} {props.persons.nom}</h1>
        </div>
    );
}
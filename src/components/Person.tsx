interface IPropsPerson {
    index: number;
    prenom: string;
    nom: string;
    qui: (indice: number) => void;
}

export default function Person(props: IPropsPerson) {
    console.log(props);
    return (
        <div>
            <h1 onClick={() => props.qui(props.index)}>Je suis {props.prenom} {props.nom}</h1>
        </div>
    );
}
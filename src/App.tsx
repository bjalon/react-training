import "./App.css";
import Person from "./components/Person.tsx";

const persons = [
    {prenom: "Brad", nom: "Pitt"},
    {prenom: "George", nom: "Clooney"},
]

const qui = (indice: number) => {
    console.log(persons[indice]);
}

export default function App() {
    return <>
        {
            persons.map((person, index) =>
                <Person key={index} index={index} prenom={person.prenom} nom={person.nom} qui={qui}/>)
        }
    </>
}
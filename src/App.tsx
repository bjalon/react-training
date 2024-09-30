import "./App.css";
import PersonComponent from "./components/PersonComponent.tsx";
import Person from "./models/Person.ts";

const persons: Person[] = [
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
                <PersonComponent key={index} index={index} persons={person} qui={qui}/>)
        }
    </>
}
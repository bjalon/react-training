import "./App.css";
import TuileComponent from "./components/TuileComponent.tsx";
import Tuile from "./models/Tuile.ts";
import React, {useEffect, useRef} from "react";
import shuffle from "./tools/Tools.ts";


const ids: number[] = Array.from({length: 64}, (_, index) => index);
const allTuiles: Tuile[] = ids.map((id) => {
    return {
        imgId: id % 32,
        isFound: false
    }
})
const shuffledTuiles: Tuile[] = shuffle(allTuiles);

interface MainState {
    tuiles: Tuile[],
    firstSelectedIndex: number,
    secondSelectedIndex: number,
}

export default function App() {

    const bothSelected = useRef(false);
    useEffect(() => {
        if (bothSelected.current) {
            bothSelected.current = false
            setTimeout(retry, 1000)
        }
    }, [bothSelected.current])

    const [state, updateState] = React.useState<MainState>({
        tuiles: shuffledTuiles,
        firstSelectedIndex: -1,
        secondSelectedIndex: -1
    });

    const retry = () => {
        const myState = {...state}
        const firstTuile = {...myState.tuiles[myState.firstSelectedIndex]};
        const secondTuile = {...myState.tuiles[myState.secondSelectedIndex]};
        console.log(`aaa ${firstTuile.imgId} / ${secondTuile.imgId}`)
        console.log(`bbb ${myState.firstSelectedIndex} / ${myState.secondSelectedIndex}`)
        if (firstTuile.imgId === secondTuile.imgId) {
            firstTuile.isFound = true;
            secondTuile.isFound = true;
            myState.tuiles[myState.firstSelectedIndex] = firstTuile;
            myState.tuiles[myState.secondSelectedIndex] = secondTuile;
        }
        myState.firstSelectedIndex = -1;
        myState.secondSelectedIndex = -1;
        updateState(myState)
    }

    const handleTricher = () => {
        const myState = {...state}
        for (const index in myState.tuiles) {
            const myIndex = parseInt(index);
            if (myIndex !== myState.firstSelectedIndex) {
                if (myState.tuiles[myIndex].imgId === myState.tuiles[myState.firstSelectedIndex].imgId) {
                    myState.secondSelectedIndex = myIndex
                }
            }
        }
        updateState(myState)
        bothSelected.current = true
    }

    const handleSelect = (index: number) => {
        const myState = {...state}
        if (myState.firstSelectedIndex === -1) {
            myState.firstSelectedIndex = index;
        } else {
            if (myState.secondSelectedIndex !== -1) {
                return
            }

            if (myState.firstSelectedIndex !== index) {
                myState.secondSelectedIndex = index;
                if (myState.tuiles[index].imgId == myState.tuiles[myState.firstSelectedIndex].imgId) {
                    alert("Match found");
                } else {
                    console.log("Match not found");
                }
                bothSelected.current = true
            } else {
                return
            }
        }
        updateState(myState)
    }

    return <>
        <div className="container">
            {
                state.tuiles.map((tuile, index) =>
                    <TuileComponent
                        key={index}
                        index={index}
                        isSelected={index == state.firstSelectedIndex || index == state.secondSelectedIndex}
                        tuile={tuile}
                        onSelect={handleSelect}
                    />
                )
            }
        </div>
        <br/><br/>
        <div id="demo">
            <button id="btnTricher" disabled={state.firstSelectedIndex === -1 || state.secondSelectedIndex !== -1}
                    onClick={handleTricher}>Tricher
            </button>
            <button id="btnTricher" onClick={retry}>Retry</button>
        </div>
    </>
}
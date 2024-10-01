import Tuile from "../models/Tuile.ts";

interface TuileProps {
    index: number;
    isSelected: boolean;
    tuile: Tuile;
    onSelect: (id: number) => void;
}

const TuileComponent = (props: TuileProps) => {

    const handleClick = () => {
        if (!props.tuile.isFound) {
            props.onSelect(props.index);
        }
    }
    if (props.tuile.isFound) {
        return <div>
            <img src={`./src/assets/img/dead.webp`} width="80" onClick={handleClick} alt='dead'/>
        </div>
    } else if (props.isSelected) {
        return <div className="green">
            <img src={`./src/assets/img/${props.tuile.imgId}.webp`} width="80" alt={`${props.tuile.imgId}`}/>
        </div>
    } else {
        return <div>
            <img src={`./src/assets/img/hidden.webp`} width="80" onClick={handleClick} alt='hidden'/>
        </div>
    }
};

export default TuileComponent;

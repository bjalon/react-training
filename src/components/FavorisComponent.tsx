import FavorisItem from "./sub/FavorisItem.tsx";

interface FavorisComponentProps {
    favorises: any[];
    onRemove: (id: string) => void;
}

export default function FavorisComponent(props: FavorisComponentProps) {
    return <div className="offset-3 col-4">
        <h1>Séries à regarder :</h1>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Séries</th>
                <th>Année</th>
                <th>rating</th>
                <th>Image</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {props.favorises.map(item => <FavorisItem info={item} onRemove={props.onRemove}/>)}
            </tbody>
        </table>
    </div>;
}
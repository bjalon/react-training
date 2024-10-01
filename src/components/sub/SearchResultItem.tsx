/* eslint-disable */
interface SearchResultItemProps {
    info: any;
    onClick: (info: any) => void;
}

export default function SearchResultItem(props: SearchResultItemProps) {
    console.log(props.info);
    return <tr>
        <td>{props.info.Title}</td>
        <td>{props.info.Year}</td>
        <td>
            <img
                src={props.info.Poster}
                alt={props.info.Title}
                width="80"
            />
        </td>
        <td className="align-middle">
            <button className="btn btn-outline-secondary" onClick={() => props.onClick(props.info)}>
                <i className="fa fa-plus"></i>
            </button>
        </td>
    </tr>;
}
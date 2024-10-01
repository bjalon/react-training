interface FavorisItemProps {
    info: any;
    onRemove: (id: string) => void;
}

export default function FavorisItem(props: FavorisItemProps) {
    function extractRating(ratings: any[]) {
        if (ratings && ratings.length > 0) {
            for (const item of ratings) {
                if (item.Source && item.Source == "Internet Movie Database") {
                    return item.Value;
                }
            }
        }
        return "??"
    }

    const rating = extractRating(props.info.Ratings)

    return <tr>
        <td>{props.info.Title}</td>
        <td>{props.info.Year}</td>
        <td>{rating}</td>
        <td>
            <img
                src={props.info.Poster}
                alt={props.info.Title}
                width="80"
            />
        </td>
        <td className="align-middle">
            <button className="btn btn-outline-danger" onClick={() => props.onRemove(props.info.imdbID)}>
                <i className="fa fa-trash"></i>
            </button>
        </td>
    </tr>;
}
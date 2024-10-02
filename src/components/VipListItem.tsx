import Vip from "../models/Vip.ts";

interface VipListItemProps {
    vip: Vip;
    onDelete: (id: string) => void;
    toggleCheck: (id: string) => void;
}

export function VipListItem(props: VipListItemProps) {
    let color = "warning";
    if (props.vip.isPresent !== null) {
        color = props.vip.isPresent ? "success" : "danger";
    }
    return <tr className={`table-${color}`}>
        <td>{props.vip.firstname}</td>
        <td>{props.vip.name?.toUpperCase()}</td>
        <td>
            <button className="btn btn-danger" onClick={() => props.onDelete(props.vip.id)}>
                <i className="fa fa-trash"></i>
            </button>
        </td>
        <td>
            <button className="btn btn-warning" onClick={() => props.toggleCheck(props.vip.id)}>
                <i className="fa fa-check"></i>
            </button>
        </td>
    </tr>;
}
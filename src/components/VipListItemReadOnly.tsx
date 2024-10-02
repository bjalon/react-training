import Vip from "../models/Vip.ts";

interface VipListItemReadOnlyProps {
    vip: Vip;
}

export function VipListItemReadOnly(props: VipListItemReadOnlyProps) {
    let color = "warning";
    if (props.vip.isPresent !== null) {
        color = props.vip.isPresent ? "success" : "danger";
    }
    return <tr className={`table-${color}`}>
        <td>{props.vip.firstname}</td>
        <td>{props.vip.name?.toUpperCase()}</td>
    </tr>;
}
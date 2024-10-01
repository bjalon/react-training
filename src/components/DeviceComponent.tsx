import Device from "../models/Device.ts";

interface deviceComponentProps {
    index: number;
    device: Device;
    update: (index: number, isUp: boolean) => void;
}

const DeviceComponent = (props: deviceComponentProps) => {
    return (
        <li
            onClick={() => props.update(props.index, !props.device.isUp)}
            className={`list-group-item list-group-item-${props.device.isUp ? 'success' : 'danger'}`}
        >
            <h4> {props.device.name} -- {props.device.isUp ? 'Allumé' : 'Eteint'}</h4>
        </li>
    );
};

export default DeviceComponent;

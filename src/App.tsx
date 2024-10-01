import "./App.css";
import Device from "./models/Device.ts";
import DeviceComponent from "./components/DeviceComponent.tsx";
import {useState} from "react";
const devices: Device[] =[
    {name:'PlayStation 5', isUp:true},
    {name:'Machine à café', isUp:false},
    {name:'Xbox', isUp:false}
]

export default function App() {
    const [myDevices, updateMyDevices] = useState<Device[]>(devices)

    const updateDeviceByIndex = (index: number, isUp: boolean) => {
        const myDevicesUpdated = [...myDevices]
        myDevicesUpdated[index].isUp = isUp
        updateMyDevices(myDevicesUpdated)
    }

    function doAllOn() {
        const myDevicesUpdated = [...myDevices]
        myDevicesUpdated.map((device) => device.isUp = true)
        updateMyDevices(myDevicesUpdated)
    }

    function doAllOff() {
        const myDevicesUpdated = [...myDevices]
        myDevicesUpdated.map((device) => device.isUp = false)
        updateMyDevices(myDevicesUpdated)
    }

    return <>
        {
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">

                        <h2>Les Appareils</h2>
                        <ul className="list-group">
                            {
                                myDevices.map((device: Device, index: number) =>
                                    <DeviceComponent index={index} device={device} update={updateDeviceByIndex} />)
                            }
                        </ul>
                        <br/>
                        <button className="btn btn-success" onClick={doAllOn}>ALL ON</button>

                        <button className="ml-2 btn btn-danger" onClick={doAllOff}>ALL OFF</button>
                    </div>
                </div>
            </div>
        }
    </>
}
import "./App.css";
import Device from "./models/Device.ts";
import DeviceComponent from "./components/DeviceComponent.tsx";
const devices: Device[] =[
    {name:'PlayStation 5', isUp:true},
    {name:'Machine à café', isUp:false},
    {name:'Xbox', isUp:false}
]

export default function App() {
    return <>
        {
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">

                        <h2>Les Appareils</h2>
                        <ul className="list-group">
                            {devices.map((device: Device, index: number) => <DeviceComponent index={index} device={device}/>)}
                        </ul>
                        <br/>
                        <button className="btn btn-success">ALL ON</button>

                        <button className="ml-2 btn btn-danger">ALL OFF</button>
                    </div>
                </div>
            </div>
        }
    </>
}
import {useEffect} from "react";

export default function App() {
    useEffect(() => {
        document.body.classList.add('bg-gray-100');
        return () => {
            document.body.classList.remove('bg-gray-100');
        };
    }, [])

    return <>
        <nav className="bg-white shadow p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">API Network</div>
                <input type="text" placeholder="Search Postman" className="border rounded-lg p-2"/>
                <div className="flex space-x-4 items-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Invite</button>
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                </div>
            </div>
        </nav>

        <div className="flex h-screen">

            <aside className="w-64 bg-gray-50 shadow-md p-4">
                <div className="text-xl font-semibold mb-4">Collections</div>
                <ul>
                    <li className="mb-2">
                        <span className="text-gray-500 text-xs">core-banking</span>
                        <ul className="ml-4">
                            <li className="text-green-500">GET wallets</li>
                            <li>POST pendingOperations</li>
                            <li>POST debts</li>
                        </ul>
                    </li>
                    <li>
                        <span className="text-gray-500 text-xs">countries</span>
                    </li>
                </ul>
            </aside>

            <main className="flex-1 p-6">
                <div className="bg-white shadow-md rounded-lg p-6">

                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-xl font-semibold">GET wallets</h1>
                            <p className="text-sm text-gray-500">core-banking</p>
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save</button>
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-2">Request URL</label>
                        <div className="flex items-center">
                            <select className="border p-2 rounded-l-lg">
                                <option>GET</option>
                                <option>POST</option>
                            </select>
                            <input type="text" value="{{HTTP}}://{{SERVER_HOSTNAME}}/wallets"
                                   className="border p-2 w-full rounded-r-lg"/>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-medium mb-2">Headers</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Key</label>
                                <input type="text" value="Tracking-Id" className="border p-2 w-full rounded-lg"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Value</label>
                                <input type="text" value="bf8963d8-bad7-4102-a15f-52bf559c9eb2"
                                       className="border p-2 w-full rounded-lg"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Description</label>
                                <input type="text" className="border p-2 w-full rounded-lg" placeholder="Description"/>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
                    </div>

                </div>
            </main>
        </div>
    </>
}
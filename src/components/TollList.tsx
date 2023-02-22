import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import TollListItem from "../elements/TollListItem"
import { baseURL } from "../utils/constants"

const TollList = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`${baseURL + "trips"}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                res.json().then(data => setData(data))
            })
            .catch(err => {
                console.log("error", err)
            })
    },[])

    return (
        <div className="px-6 lg:px-8 py-2">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Lahore Ring Road</h1>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        onClick={() => navigate("./add-new")}
                        className="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        New Entry
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Number Plate
                                    </th>
                                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                        From
                                    </th>
                                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                        To
                                    </th>
                                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                        Status
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-6 sm:pr-0">
                                        <span className="sr-only">Exit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.length > 0 ? data.map(el => (
                                    <TollListItem
                                        key={el["_id"]}
                                        data={el}
                                    />
                                )) : <tr><td>No record!</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TollList

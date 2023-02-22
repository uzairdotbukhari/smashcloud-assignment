import React from "react"
import { useNavigate } from "react-router"

const TollListItem = (props: any) => {
    const {
        data
    } = props
    const navigate = useNavigate()

    return (
        <tr>
            <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                {data?.numberPlate ?? "--"}
            </td>
            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                {data?.startingPoint ?? "--"}
            </td>
            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                {data?.endingPoint ?? "--"}
            </td>
            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                {data?.status ?? "--"}
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                <p onClick={() => navigate(`./edit/${data._id}`)} className="cursor-pointer text-indigo-600 hover:text-indigo-900">
                    Exit<span className="sr-only">, {"person.name"}</span>
                </p>
            </td>
        </tr>
    )
}

export default TollListItem

import React, { useEffect, useState } from "react"
import { CostSummary, TollDetailsProps } from "../utils/interfaces"
import InputField from "../elements/InputField"
import InputSelect from "../elements/InputSelect"
import { useForm } from "react-hook-form"
import { baseURL } from "../utils/constants"
import { toast } from 'react-toastify'
import { useParams } from "react-router"
import moment from "moment"
import { getBreakDownCost } from "../utils/helper"

const TollDetails = (props: TollDetailsProps) => {
    const {
        type
    } = props
    const { register, handleSubmit, reset, getValues } = useForm()
    const [costSummary, setSummary] = useState<CostSummary>({
        baseRate: null,
        discount: null,
        subTotal: null,
        total: null,
        totalKMs: null
    })
    const { id } = useParams()

    const submit = (data: any) => {
        if (type === "add") {
            let body = {
                ...data,
                "status": "active"
            }

            fetch(`${baseURL + "trips"}`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" }
            })
                .then(res => {
                    toast.success("Vehicle Entry Sucessfull!")
                    reset()
                })
                .catch(err => {
                    toast.error("An error occured!")
                    console.log("error", err)
                })
        }
        else {
            setSummary({ ...getBreakDownCost(data.startingPoint, data.exitPoint, data.numberPlate, data.entryDateTime) })
            let body = {
                ...data,
                "status": "completed"
            }
            fetch(`${baseURL + "trips/" + id}`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" }
            })
                .then(res => {
                    toast.success("Vehicle Exited!")
                })
                .catch(err => {
                    toast.error("An error occured!")
                    console.log("error", err)
                })
        }
    }

    useEffect(() => {
        if (type === "edit" && id !== undefined) {
            fetch(`${baseURL + "trips/" + id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
                .then(res => {
                    res.json().then(data => {
                        reset({ ...data })
                    })
                })
                .catch(err => {
                    console.log("error", err)
                })
        }
    }, [])

    return (
        <div className="px-6 lg:px-8 py-2">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">{type === "add" ? "Entry" : "Exit"}</h1>
                </div>
            </div>
            <hr className="my-4" />
            <div className="flex">
                <div className="w-1/2">
                    <form onSubmit={handleSubmit(submit)}>
                        <div>
                            <InputField
                                name={"numberPlate"}
                                defaultValue={""}
                                title={"Number Plate"}
                                type={"number"}
                                palceholder={"Number Plate"}
                                disabled={type === "edit"}
                                register={register("numberPlate", { required: true })}
                            />
                        </div>
                        <div>
                            <InputField
                                name={`${type === "add" ? "entryDateTime" : "exitDateTime"}`}
                                defaultValue={moment().format("YYYY-MM-DDTHH:mm")}
                                title={`${type === "add" ? "Entry Date Time" : "Exit Date Time"}`}
                                type={"datetime-local"}
                                palceholder={`${type === "add" ? "Entry Date Time" : "Exit Date Time"}`}
                                register={register(`${type === "add" ? "entryDateTime" : "exitDateTime"}`, { required: true })}
                            />
                        </div>
                        <div>
                            <InputSelect
                                name={`${type === "add" ? "startingPoint" : "exitPoint"}`}
                                defaultValue={getValues("startingPoint")}
                                title={`${type === "add" ? "Starting Point" : "Exit Point"}`}
                                register={register(`${type === "add" ? "startingPoint" : "exitPoint"}`, { required: true })}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {type === "add" ? "Submit" : "Calculate"}
                            </button>
                        </div>
                    </form>
                </div>
                {type === "edit" &&
                    <div className="w-1/2">
                        <div>
                            <h1 className="text-sm font-medium text-gray-700">Breakdown of cost</h1>
                            <hr className="my-2" />
                            <ul className="mt-2">
                                <li className="my-2">
                                    <span className="text-sm font-medium text-gray-700">Base Rate: </span>
                                    {costSummary.baseRate?.toFixed(2) ?? "--"}
                                </li>
                                <li className="my-2">
                                    <span className="text-sm font-medium text-gray-700">Distance: </span>
                                    {costSummary.totalKMs?.toFixed(2) ?? "--"}
                                </li>
                                <li className="my-2">
                                    <span className="text-sm font-medium text-gray-700">Sub Total: </span>
                                    {costSummary.subTotal?.toFixed(2) ?? "--"}
                                </li>
                                <li className="my-2">
                                    <span className="text-sm font-medium text-gray-700">Discount/Offer: </span>
                                    {costSummary.discount?.toFixed(2) ?? "--"}
                                </li>
                                <li className="my-2">
                                    <span className="text-sm font-bold text-gray-700">To be charged: </span>
                                    {costSummary.total?.toFixed(2) ?? "--"}
                                </li>
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default TollDetails

import React from 'react'
import { InputSelectProps } from '../utils/interfaces'

const options = [
    {
        title: "Zero point",
        value: "Zero point"
    },
    {
        title: "NS Interchange",
        value: "NS Interchange"
    },
    {
        title: "Ph4 Interchange",
        value: "Ph4 Interchange"
    },
    {
        title: "Ferozpur Interchange",
        value: "Ferozpur Interchange"
    },
    {
        title: "Lake City Interchange",
        value: "Lake City Interchange"
    },
    {
        title: "Raiwand Interchange",
        value: "Raiwand Interchange"
    },
    {
        title: "Bahria Interchange",
        value: "Bahria Interchange"
    }
]

const InputSelect = (props: InputSelectProps) => {
    const {
        name,
        title,
        defaultValue,
        onChange,
        register
    } = props

    return (
        <div className='my-3'>
            <label htmlFor={`id-${name}`} className="block text-sm font-medium text-gray-700">
                {title}
            </label>
            <div className="mt-1">
                <select
                    id={`id-${name}`}
                    name={name}
                    onChange={onChange}
                    defaultValue={defaultValue}
                    {...register}
                    className="w-64 block px-2 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    {options.map(el => (
                        <option
                            disabled={defaultValue === el.value}
                            key={el.value}
                            value={el.value}
                        >
                            {el.title}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default InputSelect

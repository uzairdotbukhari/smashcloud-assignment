import React from 'react'
import { InputFieldProps } from '../utils/interfaces'

const InputField = (props: InputFieldProps) => {
    const {
        name,
        title,
        palceholder,
        type,
        defaultValue,
        onChange,
        register,
        disabled
    } = props
    return (
        <div className='my-3'>
            <label htmlFor={`id-${name}`} className="block text-sm font-medium text-gray-700">
                {title}
            </label>
            <div className="mt-1">
                <input
                    id={`id-${name}`}
                    type={type}
                    name={name}
                    placeholder={palceholder}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    disabled={disabled}
                    {...register}
                    className="w-64 block px-2 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
        </div>
    )
}

export default InputField

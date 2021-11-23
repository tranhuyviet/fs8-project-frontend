import React from 'react'
import { NextPage } from 'next'

interface IInput {
    label: string
    type: string
    name: string
    error?: string
    value: string,
    onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

const Input = ({ label, type, name, error, value, onChange }: IInput) => {
    return (
        <div className="mt-4 flex flex-col">
            <label htmlFor={name} className="text-base font-poppins font-semibold tracking-wide capitalize">{label}</label>
            <input type={type} id={name} name={name} className="py-3 mt-1 form" value={value} onChange={onChange} />
            {error && (
                <p className="text-red-600 mt-1">{error}</p>
            )}
        </div>
    )
}

export default Input

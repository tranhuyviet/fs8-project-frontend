import React from 'react'
import { NextPage } from 'next'

interface IInput {
    label: string
    type: string
    name: string
}

const Input = ({ label, type, name }: IInput) => {
    return (
        <div className="mt-4 flex flex-col">
            <label htmlFor={name} className="text-base font-poppins font-semibold tracking-wide capitalize">{label}</label>
            <input type={type} id={name} name={name} className="py-3 mt-1 form" />
        </div>
    )
}

export default Input

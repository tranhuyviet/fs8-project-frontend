import React from 'react'

interface IGlobal {
    error: string
    className?: string
}

const GlobalErrorMessage = ({ error, className }: IGlobal) => {
    return (
        <div className={`bg-gray-200 shadow border border-red-500 p-4 flex items-center ${className}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 flex-none" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="ml-4 text-base">{error}</p>
        </div>
    )
}

export default GlobalErrorMessage

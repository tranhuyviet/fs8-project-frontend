import { NextPage } from 'next'
import React from 'react'
import { IConfirm, IAction } from '../../redux/slices/confirmDialogSlice'


interface IConfirmDialog {
    confirm: IConfirm,
    closeConfirm: () => void,
    handleDelete: () => Promise<void>,
    handleToggleBanUser?: () => Promise<void>
}

const ConfirmDialog: NextPage<IConfirmDialog> = ({ confirm, closeConfirm, handleDelete, handleToggleBanUser }) => {

    const handleYes = async () => {
        try {
            console.log('CONFIRM ACTION: ', confirm.action)
            // DELETE USER / CATEGORY / VARIANT / SIZE / PRODUCT
            if (confirm.action === IAction.delete) {
                await handleDelete()
            }
            // TOOGLE BANNED USER
            if (confirm.action === IAction.ban || confirm.action === IAction.unban) {
                await handleToggleBanUser()
            }
        } catch (error) {
            console.log('Delete error')
        }
    }

    return (
        <div className="absolute inset-0 min-w-screen mim-h-screen w-full h-full bg-gray-600 bg-opacity-50 z-40" >
            <div className="h-screen flex justify-center items-center ">
                {/* dialog */}
                <div className="min-w-[360px] min-h-[200px] bg-white opacity-100 bg-none z-50 flex flex-col items-center py-4 px-8 shadow-xl border-l-8 border-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-700  rounded-full bg-white border" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <p className="mt-2 text-base">{`Are you sure to `}<span className="uppercase text-red-700">{confirm.action}</span><span>{` `}</span><span className="font-bold">{confirm.name}</span>?</p>
                    <div className="flex justify-end mt-6 mb-4 space-x-4">
                        <button className="btn-reverse" type="button" onClick={closeConfirm}>No</button>
                        <button className="btn" onClick={handleYes}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog

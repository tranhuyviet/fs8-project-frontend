import React, { useState, useEffect } from 'react'
import fetchApi from '../../utils/fetchApi'
import useSWR from 'swr'
import moment from 'moment'
import ConfirmAlert from '../formElement/ConfirmAlert'
import { IUser } from '../../redux/slices/authSlice'
import axios from 'axios'
import _id from '../../pages/product/[_id]'

export interface IConfirm {
    show: boolean
    action: string
    name: string
    _id: string
}

const User = () => {
    const { data, error } = useSWR('/users', fetchApi)
    const [users, setUsers] = useState<IUser[]>()
    const [confirm, setConfirm] = useState<IConfirm>({
        show: false,
        action: '',
        name: '',
        _id: ''
    })


    console.log('users:', users)

    // CONFIRM DIALOG
    const openConfirm = (_id: string, name: string, action: string) => {
        setConfirm({
            show: true,
            action,
            name,
            _id
        })
    }

    const closeConfirm = () => {
        setConfirm({
            show: false,
            action: '',
            name: '',
            _id: ''
        })
    }

    // DELETE USER
    const handleDeleteUser = async () => {
        console.log('delete', confirm._id)
        if (confirm.action === 'delete' && confirm._id) {
            const { data } = await axios.delete(`/users/${confirm._id}`)
            if (data.status === 'success') {
                console.log('delete success')
                const updatedUser = users.filter(user => user._id !== confirm._id)
                setUsers(updatedUser)
                closeConfirm()
            }
        }
        return
    }



    useEffect(() => {
        if (data) setUsers(data.data)
    }, [data])

    if (error) return <p>Error: {error}</p>

    return (
        <div className="py-4 px-8">
            <h1 className="dashboardTitle">Dashboard User</h1>
            <div className="w-full mt-4 shadow-lg">
                {/* table header */}
                <div className="grid grid-cols-12 pl-4 uppercase text-xs font-semibold bg-gray-200 py-3 rounded-t-lg border border-gray-700">
                    <p className="col-span-6">name</p>
                    <p className="col-span-1 text-center">role</p>
                    <p className="col-span-1 text-center">banned</p>
                    <p className="col-span-2 text-center">created at</p>
                    <p className="col-span-2 text-center">Delete</p>
                </div>

                {/* table content */}
                <div className="border border-gray-700 border-t-0">
                    {users && users.map((user, index) => (
                        <div className="grid grid-cols-12 pl-4 py-2 border-b last:border-b-0" key={index}>
                            <div className="col-span-6 flex items-center">
                                {/* image (avatar) */}
                                <div>
                                    <img src={user.image || 'https://res.cloudinary.com/dzaxf70c4/image/upload/v1636489332/avatar_tcj5dx.png'} alt="avatar" className="w-[50px] h-[50px] rounded-full" />
                                </div>
                                {/* name and email */}
                                <div className="ml-2">
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-gray-500 text-xs">{user.email}</p>
                                </div>
                            </div>

                            <p className="col-span-1 text-center self-center">{user.role}</p>
                            <p className="col-span-1 text-center self-center">{user.banned.toString()}</p>
                            <p className="col-span-2 text-center self-center">{moment(user.createdAt).format('HH:mm DD.MM.YYYY')}</p>
                            <p className="col-span-2 text-center self-center font-semibold text-red-700 cursor-pointer" onClick={() => openConfirm(user._id, user.name, 'delete')}>Delete</p>
                        </div>
                    ))}
                </div>
            </div>
            {confirm.show && <ConfirmAlert confirm={confirm} closeConfirm={closeConfirm} handleDeleteUser={handleDeleteUser} />}
        </div>
    )
}

export default User
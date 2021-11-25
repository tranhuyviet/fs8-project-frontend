import React, { useState, useEffect } from 'react'
import fetchApi from '../../utils/fetchApi'
import useSWR from 'swr'
import moment from 'moment'
import ConfirmAlert from '../formElement/ConfirmAlert'
import { IUser } from '../../redux/slices/authSlice'
import axios from 'axios'
import _id from '../../pages/product/[_id]'
import classNames from 'classnames'

export interface IConfirm {
    show: boolean
    action?: IAction
    name: string
    _id: string
}

export enum IAction {
    no, // do nothing
    delete = 'DELETE',
    ban = 'BAN',
    unban = 'UNBAN',
}

const User = () => {
    const { data, error } = useSWR('/users', fetchApi)
    const [users, setUsers] = useState<IUser[]>()
    const [confirm, setConfirm] = useState<IConfirm>({
        show: false,
        action: IAction.no,
        name: '',
        _id: ''
    })

    // CONFIRM DIALOG
    const openConfirm = (_id: string, name: string, action: IAction) => {
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
            action: IAction.no,
            name: '',
            _id: ''
        })
    }

    // DELETE USER
    const handleDeleteUser = async () => {
        try {
            if (confirm.action === IAction.delete && confirm._id) {
                const { data } = await axios.delete(`/users/${confirm._id}`)
                if (data.status === 'success') {
                    const updatedUser = users.filter(user => user._id !== confirm._id)
                    setUsers(updatedUser)
                    closeConfirm()
                }
            }
            return
        } catch (error) {
            console.log(error)
        }

    }

    // BAN OR UNBANNED USER
    const handleToggleBanUser = async () => {
        try {
            if (confirm.action === IAction.ban || confirm.action === IAction.unban) {
                console.log('toggle banned user', confirm._id)
                const { data } = await axios.get(`/users/toggle-banned-user/${confirm._id}`)
                if (data.status === 'success') {
                    const updatedUser = users.find(user => user._id === confirm._id)
                    updatedUser.banned = data.data.banned
                    closeConfirm()
                }
            }
            return
        } catch (error) {
            console.log(error)
        }
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
                <div className="grid grid-cols-12 pl-4 uppercase text-xs font-semibold bg-gray-100 py-3 rounded-t-xl border ">
                    <p className="col-span-5">name</p>
                    <p className="col-span-1 text-center">role</p>
                    <p className="col-span-2 text-center">banned</p>
                    <p className="col-span-2 text-center">created at</p>
                    <p className="col-span-2 text-center">Delete</p>
                </div>

                {/* table content */}
                <div className="border  border-t-0">
                    {users && users.map((user, index) => (
                        <div className="grid grid-cols-12 pl-4 py-2 border-b last:border-b-0" key={index}>
                            <div className="col-span-5 flex items-center">
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
                            {/* <p className="col-span-1 text-center self-center">{user.banned.toString()}</p> */}
                            <div className="col-span-2 text-center self-center ">
                                <button className={classNames('font-semibold py-1 px-4 rounded-2xl shadow', { 'bg-green-100': !user.banned }, { 'bg-red-100': user.banned })} onClick={() => {
                                    if (user.banned) openConfirm(user._id, user.name, IAction.unban)
                                    if (!user.banned) openConfirm(user._id, user.name, IAction.ban)
                                }}>{user.banned === false ? 'Ban' : 'Unban'}</button>
                            </div>
                            <p className="col-span-2 text-center self-center">{moment(user.createdAt).format('HH:mm DD.MM.YYYY')}</p>
                            <p className="col-span-2 text-center self-center font-semibold text-red-700 cursor-pointer" onClick={() => openConfirm(user._id, user.name, IAction.delete)}>Delete</p>
                        </div>
                    ))}
                </div>
            </div>
            {confirm.show && <ConfirmAlert confirm={confirm} closeConfirm={closeConfirm} handleDeleteUser={handleDeleteUser} handleToggleBanUser={handleToggleBanUser} />}
        </div>
    )
}

export default User
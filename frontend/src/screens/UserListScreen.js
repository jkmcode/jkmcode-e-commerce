import React,{ useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'
import { useTranslation} from "react-i18next"

function UserListScreen({ history }) {

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success:successDelete } = userDelete

    useEffect(() => {
        if(userInfo && userInfo.IsAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }
        
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure you want to delete this user?')){
            dispatch(deleteUser(id))
        }

       
    }

    return (
        <div className='mt-3'>
            <div>
                <h1>{t('UserListScreen_list_of_users')}</h1>
            </div>
            {loading
            ? (<Loader/>)
            :error
                ? (<Message variant='danger'>{error}</Message>)
                : (
                    <Table striped bordered hover responsive className='table-lg'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>{t('UserListScreen_table_name')}</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.IsAdmin ? (
                                        <i className = 'fas fa-check' style={{ color: 'green'}}></i>
                                    ) : (
                                        <i className = 'fas fa-check' style={{ color: 'red'}}></i>
                                    )}</td>

                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='success' className='btn-sm'>
                                                <i class="fas fa-pencil-alt"></i>
                                            </Button>                                     
                                        </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                                <i class="fas fa-trash"></i>
                                            </Button>   
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                )}
        </div>
    )
}

export default UserListScreen

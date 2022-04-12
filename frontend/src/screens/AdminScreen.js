import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useTranslation} from "react-i18next"

function AdminScreen() {

    const { t } = useTranslation()

    return (
        <div className='margin-top-from-navbar text-center'>
            <Row>
                <LinkContainer to='/admin/userlist'> 
                    <Col className='btn-admin'>
                        {t('Admin_userlist_btn')}
                    </Col>
                </LinkContainer>

                <LinkContainer to='/admin/productlist'> 
                    <Col className='btn-admin'>
                        {t('Admin_productlist_btn')}
                    </Col>
                </LinkContainer>

                <LinkContainer to='/admin/orderlist'> 
                    <Col className='btn-admin'>
                        {t('Admin_orderlist_btn')}
                    </Col>
                </LinkContainer>

            </Row>
        </div>
    )
}

export default AdminScreen

import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useTranslation} from "react-i18next"

function CheckoutSteps({step1, step2, step3, step4}) {

    const { t } = useTranslation()

    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link className='font-bold'>{t('CheckoutSteps_login')}</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className='font-bold' disabled>{t('CheckoutSteps_login')}</Nav.Link>
                )}

            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link className='font-bold'>{t('CheckoutSteps_shipping')}</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className='font-bold' disabled>{t('CheckoutSteps_shipping')}</Nav.Link>
                )}

            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link className='font-bold'>{t('CheckoutSteps_payments')}</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className='font-bold' disabled>{t('CheckoutSteps_payments')}</Nav.Link>
                )}

            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link className='font-bold'>{t('CheckoutSteps_place_order')}</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link className='font-bold' disabled>{t('CheckoutSteps_place_order')}</Nav.Link>
                )}

            </Nav.Item>

        </Nav>
    )
}

export default CheckoutSteps

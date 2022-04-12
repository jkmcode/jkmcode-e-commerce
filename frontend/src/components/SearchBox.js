import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useTranslation} from "react-i18next"

function SearchBox() {

    const [keyword, setKeyword] = useState('')
    const { t } = useTranslation()

    let historyy = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            historyy.push(`/?keyword=${keyword}&page=1`)
        } else {
            historyy.push(historyy.push(historyy.location.pathname))
        }
    }

    return (
        <Form onSubmit={submitHandler} className="d-flex search-position">
            <Form.Control
                type='text'
                name='q'
                placeholder={t('SearchBox_placeholder')}
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5 rounded'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-1.5 mx-2 rounded'
            >
                <i className="fas fa-search"></i>
            </Button>
        </Form>
    )
}

export default SearchBox

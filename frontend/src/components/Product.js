import React, {MauseEventHandler, useState} from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import { useTranslation} from "react-i18next"

function Product({ product }) {

    const [choosePicker, setChoosePicker] = useState(false)
    

    const EnterchoosePicker = () =>{
        setChoosePicker(true)
    }

    const LeavechoosePicker = () =>{
        setChoosePicker(false)
    }
    
    return (
        <div >
            <Card className= {choosePicker ? 'enterpicker my-3 p-3 rounded' : 'leavepicker my-3 p-3 rounded'}
                 onMouseEnter={EnterchoosePicker}
                 onMouseLeave={LeavechoosePicker}>
                <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} />
                </Link>

                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title as="div">
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>
                

                    <Card.Text as="div">
                        <div className="my-3">
                            <Rating value={product.rating} text={` number of reviews: ${product.numReviews}`} color={'#f8e825'} />
                        </div>
                    </Card.Text>

                    <Card.Text as="h3">
                        ${product.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product

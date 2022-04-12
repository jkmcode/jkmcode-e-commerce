import React from 'react'

const Book = (props) =>{
    const { img, title, author } = props
    // attribute, eventHandler
    // Onclick, onMauseOver
    const clickHandler = (e) =>{
        console.log(e)
        console.log(e.target)
        alert('hello word');
    }

    const complexExample = (author) =>{
        console.log(author);
    }

    return (
        <article className='tutorial' onMouseOver={()=> {
            console.log(title)
        }}>
            <img className='img-tutorial' src={img}/>
            <h1 onClick={() => console.log(title)}>{title}</h1>
            <h3>{author}</h3>
            <button type='button' onClick={clickHandler} >reference example</button>       
            <button type='button' onClick={() => complexExample(author)} >complex example</button> 
        </article>        
    )
}

export default Book

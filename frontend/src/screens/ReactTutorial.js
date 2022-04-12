import React from 'react'

import '../index.css'

import {books} from '../tutorial/books'
import Book from '../tutorial/Book'

// function ReactTutorial(){
//     return (
//         <aside className='margin-top-from-navbar'>
//             <Person />
//             <Message />        
//         </aside>
        
//     )
    // return React.createElement('h1', {}, 'Fajnie działa')
//}

//export default ReactTutorial


// const Person = () => <h3>Jakaś osoba</h3>
// const Message = () => {
//     return <p>działa</p>
// }





function BookList(){
    return (
        <section className='margin-top-from-navbar'>
            {books.map((book, index)=>{
                return(
                    <Book key={index} {...book} ></Book>
                )
            })}
        </section>
        
    )
}



                



export default BookList







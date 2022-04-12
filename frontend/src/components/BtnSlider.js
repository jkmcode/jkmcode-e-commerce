import React from 'react'

//https://github.com/Ziratsu/Slider-React
//https://www.youtube.com/watch?v=og3wCO98HkQ
function BtnSlider({direction, moveSlide}) {
    return (
        <button
            onClick = {moveSlide} 
            className={direction === "next" ? 'btn-slide next' : 'btn-slide prev'}
        >


            {direction === 'next' ? <i class="fas fa-arrow-right"></i> : <i class="fas fa-arrow-left"></i>}
        </button>
            
        
    )
}

export default BtnSlider

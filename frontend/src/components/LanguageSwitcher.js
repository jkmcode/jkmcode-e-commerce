import React, { useState } from "react";
import { Nav, NavDropdown } from 'react-bootstrap';
import i18next from "i18next";
import Flags from 'country-flag-icons/react/3x2'
import cookies from 'js-cookie'
import GlobeIcon from '../images/globeIcon.js'


function LanguageSwitcher_supp(props){

    const Flag = Flags[props.country_flag];

    return(
        <Flag className='flag'/> 
    )
}

function LanguageSwitcher() {

    const language = [
        {
            code: 'en',
            name: 'English',
            country: 'GB',
        },

        {
            code: 'pl',
            name: 'Polski',
            country: 'PL',
        },
        
    ]    

    const [currentLanguageCode, setCurrentLanguageCode] = useState(cookies.get('i18next') || 'en') 
    const currentLanguage = language.find(l => l.code === currentLanguageCode)

    const handleChangeLng = (countryCode) => {
        i18next.changeLanguage(countryCode)
        setCurrentLanguageCode(countryCode) 
    }

    return (
        <Nav className="ml-auto lng-position">
            <LanguageSwitcher_supp country_flag={currentLanguage.country} />
            <NavDropdown 
                title={<GlobeIcon />}  
            >
                  
                {language.map(({code, name, country}) => (
                <div className="btn-lgn" key={country}>
                    <NavDropdown.Item                              
                        onClick = {() => handleChangeLng(code)}
                        disabled = {currentLanguage.code === code}
                        className= 'btn-language'
                    > 
                        <LanguageSwitcher_supp country_flag={country} />
                            {name}                       
                    </NavDropdown.Item>
                </div>
                ))}
            </NavDropdown>    
        </Nav>
               
    )

}

export default LanguageSwitcher
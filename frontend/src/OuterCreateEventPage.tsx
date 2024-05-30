import React from 'react';
import ButtonComponent from './buttonComponent';


const OuterCreateEventPage = ({props}) => {
    const handleClick = () => {
        // Go to next inner page
    }

    return (
        <div>
            <ButtonComponent  onClick={handleClick()}> 
                Back
            </ButtonComponent>
        </div>
        )
}





export default OuterCreateEventPage;
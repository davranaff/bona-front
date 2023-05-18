import React from 'react';
import "./button.css"


function Button({configure, typograph}) {
    return (
        <button {...configure}>{typograph}</button>
    );
}

export default Button;
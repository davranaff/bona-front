import React from 'react';
import './input.css'

function Input({configure}) {
    return (
        <input {...configure}/>
    );
}

export default Input;
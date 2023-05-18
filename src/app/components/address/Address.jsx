import React, {useState} from 'react';
import './address.css'

const Addresses = [
    {
        id: 1,
        address: "UAE DUBAI, str khalifa 24/2 home",
    },
    {
        id: 2,
        address: "UAE DUBAI, str khalifa 24/2 home",
    },
    {
        id: 3,
        address: "UAE DUBAI, str khalifa 24/2 home",
    }
]

function Address(props) {
    const [select, setSelect] = useState(Addresses[1])

    function selectAddress(value) {
        setSelect(value)
    }

    return (
        <div className={"address"}>
            <h1>My Addresses</h1>
            <ul>
                {Addresses.map( (value, index) => <li onClick={_ => selectAddress(value)} className={select.id === value.id && "is_active"}>
                    <span>{index + 1}</span>
                    <span>{value.address}</span>
                </li> )}
            </ul>
        </div>
    );
}

export default Address;
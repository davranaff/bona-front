import React, {useContext} from 'react';
import {BaseContext} from "@/pages/_app";
import "./modal.css"
import {AiOutlineClose} from "react-icons/ai";

function Modal({children}) {
    const {showModal, setShowModal} = useContext(BaseContext)

    return (
        showModal && <div className={"modal__background"} onClick={_ => setShowModal(false)}>
            <div className={"modal__content"} onClick={e => e.stopPropagation()}>
                <AiOutlineClose className={"close"} onClick={_ => setShowModal(false)}/>
                {children}
            </div>
        </div>
    );
}

export default Modal;
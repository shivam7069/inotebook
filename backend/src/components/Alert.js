import React from 'react'

export const Alert = (props) => {
    const capitalize=(word)=>{
        if(word === 'danger'){
            word = 'error'
        }
        return word
    }
    return (
        <div>
            {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
                <strong>{props.alert.msg}</strong> : {capitalize(props.alert.type)}
            </div>}
        </div>
    )
}



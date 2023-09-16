import React from 'react'
interface ButtonProps {
    id?: string,
    name?: string
    text: string;
    onClick: (e: any) => void;
    extraClass?: string,
    labelExtras?: string,
    marginTop?: string,
    disabled?: boolean,
    type?: 'button' | 'submit',
    onBlur?: (e: any) => void,
    error?: any
}

const ZojaButton = ({ extraClass, text, onClick, marginTop, name, id, disabled, type = "submit" }: ButtonProps) => {
    return (
        <div className={marginTop}>
            <button
                id={id}
                name={name}
                disabled={disabled}
                className={`${extraClass} tw-font-semibold tw-p-1.5 tw-rounded-[0.4rem] tw-text-md tw-transition-all tw-duration-500 tw-ease-out`}
                onClick={onClick}
                type={type}
            >{text}</button>
        </div>
    )
}

export default ZojaButton
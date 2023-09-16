import React, { useState } from 'react'
import { useEffect } from 'react'

const useClickOutside = (ref: any) => {
    const [isClickOutside, setIsClickOutside] = useState(false)

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsClickOutside(true)
            }else{
                setIsClickOutside(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)

    },[ref])

    return { isClickOutside }

}

export default useClickOutside
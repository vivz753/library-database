import { Dispatch, MutableRefObject, useRef, useEffect, useState } from 'react'

export default function useComponentVisible(initialIsVisible: boolean): [MutableRefObject<any>, boolean, Dispatch<any>] {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef<HTMLElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
			// console.log(ref.current)
			// console.log(event.target)
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        isComponentVisible && document.addEventListener('click', handleClickOutside, true);
        !isComponentVisible && document.removeEventListener('click', handleClickOutside, true);
    }, [isComponentVisible]);

    return [ ref, isComponentVisible, setIsComponentVisible ];
}
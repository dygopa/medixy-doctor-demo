import { debounce } from 'lodash';
import React, {useState, useEffect} from 'react'
import { twMerge } from 'tailwind-merge';

export const StickyNavbar = ({children}:{children:any}) => {

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true)


    const handleScroll = debounce(() => {
        const currentScrollPos = window.scrollY;
        setVisible(currentScrollPos > 200);
        setPrevScrollPos(currentScrollPos);
    }, 50);
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible, handleScroll]);


    return (
        <div className={twMerge([
            "py-3 px-[2%] h-fit bg-white border-b shadow sticky top-0 z-[990]",
            "xl:w-[81.5%] xl:right-0 xl:bg-green-500",
            //"xl:w-[81.5%] xl:left-[250px] xl:bg-green-500",
            "lg:w-[92%] lg:right-0 lg:bg-red-500",
            //"lg:w-[92%] lg:left-[105px] lg:bg-red-500",
            "md:w-[89.4%] md:right-0 md:bg-yellow-500",
            //"md:w-[89.4%] md:left-[105px] md:bg-yellow-500",
            "sm:w-full sm:right-0 sm:bg-purple-500",
            "w-full right-0 bg-purple-500",
            visible ? "visible" : "hidden"
        ])}>
            {children}
        </div>
    )
}

import { FiBell, FiX } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

const Notification = () => {
    return(
        <div className='w-full relative flex justify-between items-center h-fit py-2 gap-3 cursor-pointer'>
            <div className='w-1/6 relative flex flex-col justify-start items-center'>
                <div className={twMerge([
                    "flex flex-col justify-center items-center",
                    "w-[2.2rem] h-[2.2rem] text-[1rem] text-primary rounded bg-primary/20 p-[0.5rem]"
                ])}>
                    <FiBell/>
                </div>
            </div>
            <div className="w-5/6 relative flex flex-col justify-center items-start">
                <div className="w-full flex justify-between items-center">
                    <p className='text-slate-900 font-normal text-sm'>Cita agenda</p>
                    <p className='text-slate-500 font-normal text-xs'>10:40 am</p>
                </div>
                <p className='w-full text-ellipsis overflow-hidden whitespace-nowrap text-slate-500 font-light text-[0.8rem]'><b>Andres Morales</b> ha reservado una cita con exito.</p>
            </div>
        </div>
    )
}

export default Notification
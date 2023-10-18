import { Specialist } from '@/lib/domain/core/entities/specialists/specialist';
import React, { ChangeEvent, useContext, useRef } from 'react'
import { IUserCardContext, UserCardContext } from '../context/UserCardContext';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { FiUser } from 'react-icons/fi';

interface IAvatarProps {
    specialist: Specialist;
    disabled:boolean;
}

const Avatar = ({
    specialist,
    disabled
}: IAvatarProps) => {

    const { state, actions, dispatch } = useContext<IUserCardContext>(UserCardContext)
    const { updateAvatar } = actions
    const { data, loading, error, successful } = state.updateAvatar;

    let avatarRef = useRef<HTMLInputElement>(null);

    const toBase64 = (file: File) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    async function handleChangeAvatar(e: ChangeEvent<HTMLInputElement>) {
        let file = e.target.files![0] as File;

        let base64 = await toBase64(file);
        let splittedType = file!.type.split("/");
        var base64result = base64?.toString().split(",")[1];

        let obj = {
            id: specialist.accountId,
            data: base64result,
            type: `${splittedType[1]}`,
        };

        updateAvatar(obj, specialist.accountId)(dispatch);
    }

    const handleClickRef = () => avatarRef.current && avatarRef.current.click();

    return (
        <div className="col-span-1 relative flex flex-col justify-center items-center">
            {specialist?.avatar?.length > 0 || data ? (
                <>
                    <span className={twMerge([
                        "w-36 h-36 overflow-hidden rounded-md border block relative",
                        !disabled && "cursor-pointer"
                    ])}>
                        <input
                            accept="image/png, image/jpeg, application/pdf"
                            type="file"
                            ref={avatarRef}
                            className="opacity-0 top-0 left-0 w-full h-full z-50 absolute cursor-pointer"
                            onChange={(e) => {
                                !disabled && handleChangeAvatar(e);
                            }}
                        />
                        <Image
                            className="object-cover w-full h-full"
                            src={data ? data.toString() : specialist?.avatar}
                            alt=""
                            fill
                        />
                    </span>

                    {!disabled && <p className="text-[11px] text-slate-500 font-medium text-center mt-1">
                        Recomendado <br/> (.png, .jpg, .jpeg)
                    </p>}
                    {loading && (
                        <p className="text-[13px] text-slate-800 font-bold">
                            Guardando su foto de perfil...
                        </p>
                    )}
                </>
            ) : (
                <>
                    <input
                        accept="image/png, image/jpeg, application/pdf"
                        type="file"
                        ref={avatarRef}
                        className="hidden"
                        onChange={(e) => {
                            !disabled && handleChangeAvatar(e);
                        }}
                    />
                    <div
                        onClick={handleClickRef}
                        className={twMerge([
                            "w-36 h-36 overflow-hidden rounded-md border flex flex-col justify-center items-center ",
                            !disabled && "hover:bg-slate-200 cursor-pointer"
                        ])}
                    >
                        <FiUser size={60} />
                    </div>
                    {!disabled && <p className="text-[11px] text-slate-500 font-medium text-center mt-1">
                        Recomendado <br/> (.png, .jpg, .jpeg)
                    </p>}
                    {loading && (
                        <p className="text-[13px] text-slate-800 font-bold">
                            Guardando su foto de perfil...
                        </p>
                    )}
                </>
            )}
        </div>
    )
}

export default Avatar
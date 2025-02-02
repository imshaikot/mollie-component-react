import React, { FC, FormEvent } from "react";
import { useMollie } from "../hooks";


type Props = {
    children: React.ReactNode;
    onSubmit: (token?: string, error?: Error) => void;
    className?: string;
};

export const MollieForm: FC<Props> = ({ children, onSubmit, className }) => {
    
    const { _mollie } = useMollie();

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        return onSubmit(await _mollie.createToken());
    }

    return (
        <form className={className} onSubmit={handleFormSubmit}>
            {children}
        </form>
    )
}
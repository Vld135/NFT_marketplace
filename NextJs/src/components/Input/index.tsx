import { SyntheticEvent } from "react";

interface IInputProps {
    id: string;
    name: string;
    type: string;
    required: boolean;
}

const Input = ({ id, name, type, required }: IInputProps) => {
    return (
        <input
            id={id}
            name={name}
            type={type}
            required={required}
            className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
    );
}

export default Input;
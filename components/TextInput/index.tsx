import React, { FC } from "react";

interface TextInputInterface {
  name: string;
  label?: string;
  isVer?: boolean;
  type: string;
  register: any;
  error: any;
}
const TextInput: FC<TextInputInterface> = ({
  isVer = false,
  label,
  type,
  register,
  error,
  name,
}) => {
  return (
    <div className="form-control flex flex-col gap-2">
      <div className={`flex ${isVer ? "flex-col" : "items-center gap-2"}`}>
        {label !== undefined && (
          <label className={`label text-xs ${!isVer && "w-1/3"}`}>
            <span className="label-text text-xs">{label}</span>
          </label>
        )}
        <input
          id={name}
          key={name}
          {...register}
          type={type}
          className={`input rounded-lg input-sm input-bordered w-full ${
            error && "input-error"
          }`}
        />
      </div>
      {error !== undefined && (
        <div className="text-error text-xs text-end">{error.message}</div>
      )}
    </div>
  );
};

export default TextInput;

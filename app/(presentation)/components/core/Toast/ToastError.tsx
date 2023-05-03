import React from "react";

interface IToastErrorProps {
  message: string;
}

export default function ToastError({ message }: IToastErrorProps) {
  return (
    <div
      id="toast-bottom-left"
      className="flex fixed bottom-5 left-72 items-center p-4 space-x-4 w-full max-w-xs bg-danger text-gray-50 rounded-lg divide-x divide-gray-200 shadow space-x"
      role="alert"
      style={{ zIndex: 999 }}
    >
      <div className="text-sm font-normal">{message}</div>
    </div>
  );
}

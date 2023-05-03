import React from "react";

interface IProps {
  show: boolean;
  onHide: () => void;
  children: JSX.Element | JSX.Element[];
}

export default function Modal({ show, onHide, children }: IProps) {
  return (
    <div
      style={{ zIndex: 998 }}
      className={`fixed inset-0 ${show ? "" : "pointer-events-none"}`}
    >
      <div
        className={`fixed inset-0 bg-black ${
          show ? "opacity-50" : "pointer-events-none opacity-0"
        }`}
        onClick={onHide}
      />

      <div
        className={`fixed right-0 left-0 h-full bg-white shadow-lg w-full rounded-lg max-w-screen-sm p-12 ${
          show ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ margin: "5% auto", height: "auto" }}
      >
        {children}
      </div>
    </div>
  );
}

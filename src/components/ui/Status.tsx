import React from "react";

export const LoadingMessage = ({ label = "Loading..." }: { label?: string }) => (
    <p role="status" aria-live="polite" className="text-center p-8">{label}</p>
);

export const ErrorMessage = ({ message }: { message: string }) => (
    <p role="alert" className="text-center text-red-500 p-8">{message}</p>
);



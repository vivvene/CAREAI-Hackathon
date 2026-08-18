import React from "react";

function Button({ children, onClick, type = "button" }) {
  return (
    <button
      className="careai-button"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
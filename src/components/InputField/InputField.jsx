import React from 'react';

const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full py-3 px-4 my-1 rounded-lg bg-zinc-200 focus:outline-none"
      style={{ borderRadius: '25px', boxShadow: 'inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73' }}
    />
  );
};

export default InputField;
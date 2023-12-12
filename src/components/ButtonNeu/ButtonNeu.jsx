import React from 'react';

const ButtonNeu = ({ type, text, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="block font-bold py-3 px-6 rounded-lg w-full my-4 bg-zinc-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
      style={{ borderRadius: '25px', boxShadow: '2px 2px 6px #babecc, -5px -5px 10px #ffffff73' }}
    >
      {text}
    </button>
  );
};

export default ButtonNeu;

// import React from 'react'

const Button = (props) => {
  // console.log(props);
  return (
    <>
      <button
        type={props.type}
        className={`${props.wid} ${props.hgt} ${props.bgColor} ${props.hoverBgColor}  text-white text-[15px] font-semibold text-center rounded-[20px] border-[3px] border-solid ${props.borderColor} transition-colors duration-300`}
      >
        {props.buttonName}
      </button>
    </>
  );
};

export default Button;

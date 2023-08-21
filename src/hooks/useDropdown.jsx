import { useEffect, useRef, useState } from "react";

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef(null);
  console.log(dropDownRef.current);

  // toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(()=>{
    document.addEventListener("click",handleClickOutside)

    return () =>{
      document.removeEventListener("click",handleClickOutside)
    }
  },[]);

  return { isOpen, toggleMenu, dropDownRef };
};

export default useDropdown;

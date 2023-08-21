import { useState } from "react";

const useFormFields = (initState) => {
  const [input, setInput] = useState(initState);
  //   handle input change
  const hanldeInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setInput(initState);
  };
  return { input, hanldeInputChange, resetForm,setInput };
};

export default useFormFields;

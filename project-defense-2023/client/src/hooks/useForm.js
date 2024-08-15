import { useState } from "react";

export default function useForm(submitHandler, initial) {
  const [values, setValues] = useState(initial);

  const onChange = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    submitHandler(values);
  };

  const resetForm = () => {
    setValues(initial);
  };

  return { values, onChange, onSubmit, resetForm };
}

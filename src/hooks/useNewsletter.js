import { useState } from "react";

export const useNewsletter = () => {
  const [email, setEmail] = useState("");

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubscribe = (e) => {
    e.preventDefault();
    console.log("Email ingresado:", email);
    setEmail("");
  };

  return {
    email,
    onEmailChange,
    onSubscribe,
  };
};

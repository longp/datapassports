import React from "react";

export default function ErrorMessage({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <p role="alert">This is required</p>;
      case "minLength":
        return <p role="alert">Your last name needs a minmium of 2 characters</p>;
      case "pattern":
        return <p role="alert">Enter a valid email address</p>;
      case "min":
        return <p role="alert">Minmium age is 18</p>;
      case "validate":
        return <p role="alert">Username is already used</p>;
      default:
        return null;
    }
  }

  return null;
}

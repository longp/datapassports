import React from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import "./App.css";

function App() {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting }
  } = useForm();
  const onSubmit = data => {
  
    const element = document.createElement("a");
    const xmlData = objectToXml(data)
    const file = new Blob([xmlData], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.xml";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  
  const objectToXml = (obj) =>{
    let xml = '';
    for (const prop in obj) {
      xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
      if (obj[prop] instanceof Array) { 
        for (const array in obj[prop]) {
          xml += "<" + prop + ">";
          xml += objectToXml(new Object(obj[prop][array]));
          xml += "</" + prop + ">\n";
        }
      } else if(typeof obj[prop] == 'object') {
        xml += objectToXml(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
    }
    xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
  }

  return (
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
      <label for="firstName">First Name:</label>
      <input name="firstName" ref={register({ required: true })} />
      <ErrorMessage error={errors.firstName} />

      <label for="lastName">Last Name:</label>
      <input name="lastName" ref={register({ required: true, minLength: 2 })} />
      <ErrorMessage error={errors.firstName} />

      <label for="gender">Gender</label>
      <select name="gender" ref={register({ required: true })}>
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <ErrorMessage error={errors.gender} />

      <label for="username">Username</label>
      <input
        name="username"
        ref={register({ required: true })}
      />
      <ErrorMessage error={errors.username} />

      <label for="email">Email</label>
      <input
        id="email"
        name="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      <ErrorMessage error={errors.email} />

      <label for="age">Age</label>
      <input
        name="age"
        type="number"
        ref={register({ required: true, min: 18 })}
      />
      <ErrorMessage error={errors.age} />

      <label for="aboutyou">About you</label>
      <textarea name="aboutyou" ref={register} />

      <input disabled={isSubmitting}  type="submit" />

    </form>
  );
}

export default App
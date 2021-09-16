import React, { useState } from 'react';
import './style.css';

const FORM_JSON = [
  {
    texts: {
      header: 'Name Section',
    },
    inputs: [
      {
        label: 'Full Name',
        type: 'text',
        name: 'name',
        validation: {
          required: true,
          minLength: 4,
        },
        error: 'Name is required',
      },
    ],
  },
  {
    texts: {
      header: 'Password Section',
    },
    inputs: [
      {
        label: 'Password',
        type: 'password',
        name: 'password',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 10,
        },
        error: 'Password is required',
      },
      {
        label: 'Pincode',
        type: 'number',
        name: 'pincode',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
        },
        error: 'Invalid Pincode',
      },
    ],
  },
  {
    texts: {
      header: 'Address Section',
    },
    inputs: [
      {
        label: 'Address Line 1',
        type: 'text',
        name: 'addressLine1',
        validation: {
          required: true,
        },
        error: 'Invalid Address',
      },
      {
        label: 'Address Line 2',
        type: 'text',
        name: 'addressLine2',
        validation: {
          required: false,
        },
      },
      {
        label: 'Zipcode',
        type: 'number',
        name: 'zipcode',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 7,
        },
        error: 'Invalid Zipcode',
      },
    ],
  },
  {
    texts: {
      header: 'Thankyou for filling out the form',
    },
  },
];

export default function App() {
  // const [formInputObject, setFormInputObject] = useState({})

  const [formError, setFormError] = useState({});

  const formHandler = (e) => {
    e.preventDefault();
    const formElement = e;
    let fields = {};

    for (let i = 0; i < formElement.target.length; i++) {
      if (formElement.target[i].tagName === 'INPUT') {
        const inputName = formElement.target[i].name;
        fields[inputName] = formElement.target[i].value;
      }
    }

    let errorObject = {}

    FORM_JSON.map((section) => {
      section.inputs !== undefined &&
        section.inputs.map((input) => {
          const inputValue = fields[input.name];
          const validationRules = input.validation;

          console.log(input.name, " : ", inputValue);

          if (validationRules.required) {
            if (inputValue.trim() === '') {
              errorObject[input.name] = input.error;
              setFormError(errorObject);
            }
          }
        });
    });
  };

  // console.log('Outside', formError);

  return (
    <div>
      <h1>Dynamic Form Builder!</h1>
      <form onSubmit={formHandler}>
        {FORM_JSON.length !== 0 &&
          FORM_JSON.map((section, i) => (
            <>
              <h1>{section.texts.header}</h1>
              <div className="form-section">
                {section.inputs?.map((input, i) => (
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label htmlFor={input.name}>{input.label}</label>
                    <input type={input.type} name={input.name} />
                    <br></br>
                    {formError[input.name]}
                  </div>
                ))}
              </div>
            </>
          ))}
        <button>Submit Form</button>
      </form>
    </div>
  );
}

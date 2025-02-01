import { useState } from 'react';
import '../styles/register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    breed: '',
    otherBreed: '',
    shippingAddress: '',
    billingAddress: '',
    useSameAddress: false,
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (errors[name]) {
      
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      useSameAddress: checked,
      billingAddress: checked ? formData.shippingAddress : "",
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    let newErrors = { ...errors };

    if (name === 'phone' && !formData.name) {
      newErrors.name = 'Name is required.';
    }
    if (name === 'email' && !formData.email) {
      newErrors.email = 'Email is required.';
    } else if (name === 'email' && !formData.email.includes('@')) {
      newErrors.email = 'Email must contain @.';
    }

    setErrors(newErrors);
  };
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (!formData.name || !formData.email) {
      lert("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        breed: "",
        otherBreed: "",
        shippingAddress: "",
        billingAddress: "",
        useSameAddress: false,
      });
    }, 3000);
    console.log("Form Submitted:", formData);
    
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required.';
    if (!formData.email) {
      formErrors.email = 'Email is required.';
    } else if (!formData.email.includes('@')) {
      formErrors.email = 'Email must contain @.';
    }
    return formErrors;
  };

  return (
    <main className="main">
      <form className="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Sign up</legend>
          <div className="personal">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="personal">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="personal">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="personal">
            <label htmlFor="breed">Favorite dog breed:</label>
            <select
              id="breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
            >
              <option value="">--Please select--</option>
              <option value="Huskies">Huskies</option>
              <option value="Labrador">Labrador</option>
              <option value="Golden Retrievers">Golden Retrievers</option>
              <option value="Corgis">Corgis</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {formData.breed === "Other" && (
            <div className="personal">
              <label htmlFor="otherBreed">Please specify:</label>
              <input
                type="text"
                id="otherBreed"
                name="otherBreed"
                value={formData.otherBreed}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="personal">
            <label htmlFor="shippingAddress">Shipping Address:</label>
            <input
              type="text"
              id="shippingAddress"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
            />
          </div>
          <div className="personal">
            <label>
              <input
                type="checkbox"
                name="useSameAddress"
                checked={formData.useSameAddress}
                onChange={handleCheckboxChange}
              />
              Billing address same as shipping address
            </label>
          </div>
          <div className="personal">
            <label htmlFor="billingAddress">Billing Address:</label>
            <input
              type="text"
              id="billingAddress"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
              readOnly={formData.useSameAddress}
            />
          </div>
          <div className="personal">
            <label htmlFor="agreeTerms">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              Agree to terms and conditions
            </label>
          </div>
          <button type="submit">Register</button>
        </fieldset>
      </form>
      {submitted && (
        <div className="success-message-container">
          <p className="success-message">Submit Successful!</p>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="confetti"></div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Register;
import { useState } from 'react';
import '../styles/register.css';
import { userService } from '../services/database.js';

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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    
    try {
      // 准备要保存到数据库的数据
      const userData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        favorite_breed: formData.breed === 'Other' ? formData.otherBreed : formData.breed,
        shipping_address: formData.shippingAddress,
        billing_address: formData.billingAddress,
        theme_preference: 'light' // 默认主题
      };

      // 保存到数据库
      await userService.createUser(userData);
      
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
          agreeTerms: false,
        });
        setErrors({});
      }, 3000);
      
      console.log("User registered successfully:", userData);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
                disabled={loading}
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
              disabled={loading}
            />
          </div>
          <div className="personal">
            <label>
              <input
                type="checkbox"
                name="useSameAddress"
                checked={formData.useSameAddress}
                onChange={handleCheckboxChange}
                disabled={loading}
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
              disabled={loading}
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
                disabled={loading}
              />
              Agree to terms and conditions
            </label>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
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

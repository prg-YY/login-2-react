import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const initialValues = { username: "", email: "", password: "" }
  const [formValues, setFormValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(validate(formValues))
    setIsSubmit(true)
  }

  useEffect(() => {
    console.log(errors)
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(formValues)
    }
  }, [errors])
  const validate = (values) => {
    const errors1 = {}
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!values.username) {
      errors1.username = "UserName is required!"
    }
    if (!values.email) {
      errors1.email = "Email is required!"
    } else if (!regex.test(values.email)) {
      errors1.email = "This is not valid email format"
    }
    if (!values.password) {
      errors1.password = "Password is required!"
    } else if (values.password.length < 4) {
      errors1.password = "Password must be more than 4 characters"
    } else if (values.password.length > 10) {
      errors1.password = "Password cannot exceed more than 10 characters"
    }
    return errors1
  }
  return (
    <div className="container">
      {Object.keys(errors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in Successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>UserName</label>
            <input
              type="text"
              name="username"
              placeholder="UserName"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{errors.username}</p>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{errors.email}</p>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{errors.password}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default App

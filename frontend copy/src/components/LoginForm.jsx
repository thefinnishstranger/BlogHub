import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setLoginField, clearLoginForm } from "../redux/reducers/formSlice";
import { Button } from "react-bootstrap";
import Footer from "./Footer";

const LoginForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const { username, password } = useSelector(state => state.form.login);

  const handleUsernameChange = (event) => {
    dispatch(setLoginField({ field: "username", value: event.target.value }));
  };

  const handlePasswordChange = (event) => {
    dispatch(setLoginField({ field: "password", value: event.target.value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(username, password);
    dispatch(setLoginField({ field: "username", value: '' }))
    dispatch(setLoginField({ field: "password", value: '' }))
  };

  return (
    <form onSubmit={onSubmit} className="mt-4">
      <h2 className="text-center">Login</h2>
      <div className="username text-center">
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
          placeholder="username"
          required
        />
      </div>
      <div className="password text-center">
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
          placeholder="password"
          required
        />
      </div>
      <div className="d-grid gap-2 d-flex justify-content-center">
        <Button type="submit" variant="dark grey" className="login_button br-5" size="lg">login</Button>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default LoginForm;

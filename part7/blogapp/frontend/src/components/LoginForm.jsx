import PropTypes from "prop-types";
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  username,
  password,
  handleLogin,
  setUsername,
  setPassword,
}) => (
  <Form onSubmit={handleLogin}>
    <Form.Group>
      <Form.Label>Username</Form.Label>
      <Form.Control
        data-testid="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Password</Form.Label>
      <Form.Control
        data-testid="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </Form.Group>
    <Button className="my-3" variant="primary" type="submit">login</Button>
  </Form>
);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;

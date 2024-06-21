import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Spin,
  Typography,
  message,
} from 'antd';
import { login } from 'api/auth';
import Page from 'components/Page/Page';
import { useAuthContext } from 'context/AuthContext';
import { setToken } from 'helpers/auth.helpers';
import useScreenSize from 'hooks/useScreenSize';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { isDesktopView } = useScreenSize();
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await login({ values });
      if (data?.error) {
        throw data?.error;
      } else {
        setToken(data.jwt);
        setUser(data.user);
        message.success(`Welcome back ${data.user.username}!`);
      }
    } catch (error) {
      setError(error?.message ?? 'Something went wrong!');
    } finally {
      setIsLoading(false);
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <Page>
      <Row align="middle">
        <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
          <Card title="Login" className="card-wrapper">
            {error ? (
              <Alert
                className="alert_error"
                message={error}
                type="error"
                closable
                afterClose={() => setError('')}
              />
            ) : null}
            <Form
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Email is invalid',
                  },
                ]}
              >
                <Input placeholder="Email address" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login_submit_btn"
                >
                  Login {isLoading && <Spin size="small" />}
                </Button>
              </Form.Item>
            </Form>
            <Typography.Paragraph className="form_help_text">
              <Link to="/register">Register</Link>
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default Login;

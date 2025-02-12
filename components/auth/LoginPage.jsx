import { Button, Form, Input, InputNumber, message } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./../../styles/Auth.module.css";
import { useLoginMutation } from "../../store/slices/api/authApi";
import Link from "next/link";
import { setLoggedIn, setUser } from "../../store/slices/appSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import OTPInput from "react-otp-input";
import { showError } from "./../../utils/Utils";
import { useRouter } from "next/router";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const router = useRouter();
  const [initialValue, setInitialValue] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(SCREEN.LOGIN_REGISTER);
  const [login] = useLoginMutation();
  const handleLogin = async (payload) => {
    try {
      setLoading(true);
      const result = await login(payload).unwrap();
      if (result.status) {
        message.success("Login Successful");
        form.resetFields();
        dispatch(setLoggedIn(true));
        dispatch(setUser(result.user || {}));
      } else {
        showError(result.message);
      }
    } catch (err) {
      showError(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={`${styles.section}`}>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className={styles.logo}>
            <Image src="/logo.webp" alt="" layout="fill" objectFit="cover" />
          </div>
        </div> */}

        <div>
          <h3>Login / Register</h3>
          <Form
            layout="vertical"
            form={form}
            initialValues={initialValue}
            onFinish={handleLogin}
            onFinishFailed={(error) => {}}
            autoComplete="off"
          >
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input className={styles.input} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input className={styles.input} />
            </Form.Item>
            <Button
              htmlType="submit"
              loading={isLoading}
              className={styles.btn}
            >
              LOGIN
            </Button>
            <p>
              By clicking on Verify, I accept the Terms & Conditions & Privacy
              Policy
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};
const SCREEN = Object.freeze({
  LOGIN_REGISTER: "login-register",
  OTP_VERIFICATION: "otp-verification",
});
export default LoginPage;

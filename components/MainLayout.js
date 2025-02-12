import { Breadcrumb, Button, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "../store/slices/api/authApi";
import {
  setLoggedIn,
  setUser,
  setBusiness,
  setSubscriptionPlan,
} from "../store/slices/appSlice";
import LoginPage from "./auth/LoginPage";
import SideMenu from "./SideMenu";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import CustomBreadcrumb from "./utils/CustomBreadcrumb";
import { AiOutlineLogout } from "react-icons/ai";
import { MdLogout, MdOutlineLogout } from "react-icons/md";
import { apiSlice, authApiSlice } from "../store/slices/api/apiSlice";
const { Header, Content, Footer, Sider } = Layout;
import { useLogoutMutation } from "../store/slices/api/authApi";
import { useRouter } from "next/router";
const MainLayout = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.app?.isLoggedIn);
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const {
    data: response,
    isFetching: isGetUserFetching,
    isLoading: isGetUserLoading,
    isSuccess: isGetUserSuccess,
    isError: isGetUserError,
  } = useGetUserQuery();

  useEffect(() => {
    if (isGetUserSuccess) {
      if (response.status) {
        dispatch(setLoggedIn(true));
        dispatch(setUser(response?.user));
        dispatch(setBusiness(response?.business));
        dispatch(setSubscriptionPlan(response?.business?.subscription_plan));
      } else {
        dispatch(setLoggedIn(false));
      }
    }
    if (isGetUserError) {
      dispatch(setLoggedIn(false));
    }
  }, [response, isGetUserLoading, isGetUserSuccess, isGetUserError]);
  const handleLogout = async () => {
    try {
      const result = await logout().unwrap();
      if (result.status) {
        dispatch(apiSlice.util.resetApiState());
        router.replace("/");
      } else {
        router.replace("/");
      }
      dispatch(apiSlice.util.resetApiState());
      dispatch(authApiSlice.util.resetApiState());
    } catch (err) {
    } finally {
    }
  };
  return (
    <>
      {isGetUserLoading ? (
        <div style={{ height: "100vh", textAlign: "center" }}>
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          {!isLoggedIn ? (
            <LoginPage />
          ) : (
            <Layout style={{ minHeight: "100vh" }}>
              <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                reverseArrow={true}
                className="shadow"
              >
                <SideMenu />
              </Sider>
              <Layout>
                <Header
                  style={{
                    height: 64,
                    padding: 0,
                    lineHeight: "64px",
                    backgroundColor: "#fff",
                    alignItems: "center",
                  }}
                  className="flex-between pr-3"
                >
                  <Button
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                      border: "none",
                    }}
                  />
                  <Button
                    style={{
                      border: "none",
                      padding: 0,
                      color: "#00b33c",
                    }}
                    onClick={handleLogout}
                  >
                    <MdLogout style={{ marginRight: 5, paddingTop: 3 }} />
                    Logout
                  </Button>
                </Header>
                <Content
                  style={{
                    backgroundColor: "#f1f5f8",
                    margin: "10px",
                  }}
                >
                  {/* <CustomBreadcrumb /> */}
                  <div
                    style={{
                      padding: 24,
                      background: "#fff",
                    }}
                  >
                    <Component {...pageProps} />
                  </div>
                </Content>
                {/* <Footer>Footer</Footer> */}
              </Layout>
            </Layout>
          )}
        </>
      )}
    </>
  );
};

export default MainLayout;

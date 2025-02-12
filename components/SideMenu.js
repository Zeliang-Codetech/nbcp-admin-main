import { Avatar, Button, Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  MdContactSupport,
  MdOutlineDashboardCustomize,
  MdOutlineHeadphones,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useLogoutMutation } from "../store/slices/api/authApi";
import { apiSlice } from "./../store/slices/api/apiSlice";
import { useRouter } from "next/router";
import { AiOutlineGlobal } from "react-icons/ai";
import { Routes } from "../utils/Status";
import { FaBoxesStacked } from "react-icons/fa6";
import { RiFileList3Line } from "react-icons/ri";
const { Item, SubMenu } = Menu;
const SideMenu = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      const result = await logout().unwrap();
      if (result.status) {
        dispatch(apiSlice.util.resetApiState());
        router.replace("/");
      } else {
        router.replace("/");
      }
    } catch (err) {
    } finally {
    }
  };

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    switch (e.key) {
      case Routes.DASHBOARD:
        router.push(`/`);
        break;
      case Routes.COMPLAINTS:
        router.push("/complaints");
        break;
      case Routes.CLIENTS:
        router.push("/clients");
        break;
      case Routes.USERS:
        router.push("/users");
        break;
      case Routes.CATEGORIES:
        router.push("/master/categories");
        break;
      case Routes.CITIES:
        router.push("/master/cities");
        break;
      default:
    }
  };

  const [selectedKey, setSelectedKey] = useState("1");

  return (
    <>
      {/* <div className="position-relative mt-2" style={{ height: 50 }}>
        <Image src="/logo.png" alt="" layout="fill" objectFit="cover" />
      </div> */}
      <Menu
        mode="inline"
        onClick={handleMenuClick}
        defaultSelectedKeys={["1"]}
        style={{ backgroundColor: "white" }}
      >
        <>
          <Item key={Routes.DASHBOARD} icon={<MdOutlineDashboardCustomize />}>
            Dashboard
          </Item>

          <Item key={Routes.COMPLAINTS} icon={<RiFileList3Line />}>
            Complaints
          </Item>

          <SubMenu
            key={Routes.MASTERS}
            title="Manage"
            icon={<SettingOutlined className="menu_item" />}
          >
            <Item key={Routes.CATEGORIES}>Categories</Item>
            <Item key={Routes.CITIES}>Cities & Areas</Item>
          </SubMenu>

          <Item key={Routes.SUPPORT} icon={<MdOutlineHeadphones />}>
            Help & Support
          </Item>
        </>
      </Menu>
    </>
  );
};

export default SideMenu;

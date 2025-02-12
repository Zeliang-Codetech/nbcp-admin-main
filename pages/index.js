import React from "react";
import styles from "./../styles/dashboard.module.css";
import { useSelector } from "react-redux";
import { MdAnalytics, MdContentCopy } from "react-icons/md";
import { Button } from "antd";
import {
  ArrowUpOutlined,
  DashboardOutlined,
  WalletFilled,
} from "@ant-design/icons";
import { PiCursorFill } from "react-icons/pi";
import { FaShare, FaWhatsapp } from "react-icons/fa6";
import { AiOutlineLineChart } from "react-icons/ai";
import { GrDocument } from "react-icons/gr";
import { FiMap } from "react-icons/fi";
import Link from "next/link";
// import { WhatsappShareButton } from "react-share";
const DashboardPage = () => {
  const business = useSelector((state) => state.app?.business);

  return (
    <div className={styles.container}>
      <div className="row mt-5">
        <div className="col mr-3">
          <Card name="" icon={<AiOutlineLineChart />} link="/orders" />
        </div>
        <div className="col mr-3 ml-3">
          <Card name="" icon={<GrDocument />} link="/portfolios" />
        </div>
        <div className="col mr-3 ml-3">
          <Card name="" icon={<FiMap />} link="/catalogues" />
        </div>
        <div className="col ml-3">
          <Card name="" icon={<WalletFilled />} link="/" />
        </div>
      </div>
    </div>
  );
};

const Card = ({ name, icon, link }) => {
  return (
    <Link href={link}>
      <div className={styles.card}>
        <div className="text-center">
          <div className={styles.icon}>{icon}</div>
          <div>
            <h5>{name}</h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardPage;

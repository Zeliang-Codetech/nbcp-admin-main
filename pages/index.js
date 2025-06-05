import React, { useMemo } from "react";
import styles from "./../styles/dashboard.module.css";
import { useSelector } from "react-redux";
import { MdAnalytics, MdContentCopy } from "react-icons/md";
import { Button, Row, Col, Card as AntCard, Statistic } from "antd";
import {
  ArrowUpOutlined,
  DashboardOutlined,
  WalletFilled,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { PiCursorFill } from "react-icons/pi";
import { FaShare, FaWhatsapp } from "react-icons/fa6";
import { AiOutlineLineChart } from "react-icons/ai";
import { GrDocument } from "react-icons/gr";
import { FiMap } from "react-icons/fi";
import Link from "next/link";
import { useGetComplaintsQuery } from "../store/slices/api/complaintApi";
import { ComplaintStatus } from "../utils/Status";
// import { WhatsappShareButton } from "react-share";

const DashboardPage = () => {
  const business = useSelector((state) => state.app?.business);
  const {
    data: complaints = [],
    isLoading: isLoadingComplaints,
  } = useGetComplaintsQuery();

  // Calculate complaint statistics
  const complaintStats = useMemo(() => {
    const total = complaints.length;
    const resolved = complaints.filter(
      (complaint) => complaint.status === ComplaintStatus.RESOLVED
    ).length;
    const pending = complaints.filter(
      (complaint) => complaint.status === ComplaintStatus.PENDING
    ).length;
    const rejected = complaints.filter(
      (complaint) => complaint.status === ComplaintStatus.REJECTED
    ).length;

    return { total, resolved, pending, rejected };
  }, [complaints]);

  return (
    <div className={styles.container}>
      <h2 className="mb-4">Complaint Statistics</h2>
      <Row gutter={16} className="mb-5">
        <Col span={6}>
          <AntCard bordered={false} className={styles.statCard} style={{ backgroundColor: '#e6f7ff' }}>
            <Statistic
              title="Total Complaints"
              value={complaintStats.total}
              prefix={<FileTextOutlined />}
              loading={isLoadingComplaints}
              valueStyle={{ color: '#1890ff' }}
            />
          </AntCard>
        </Col>
        <Col span={6}>
          <AntCard bordered={false} className={styles.statCard} style={{ backgroundColor: '#f6ffed' }}>
            <Statistic
              title="Resolved Complaints"
              value={complaintStats.resolved}
              prefix={<CheckCircleOutlined />}
              loading={isLoadingComplaints}
              valueStyle={{ color: '#52c41a' }}
            />
          </AntCard>
        </Col>
        <Col span={6}>
          <AntCard bordered={false} className={styles.statCard} style={{ backgroundColor: '#fffbe6' }}>
            <Statistic
              title="Pending Complaints"
              value={complaintStats.pending}
              prefix={<ClockCircleOutlined />}
              loading={isLoadingComplaints}
              valueStyle={{ color: '#faad14' }}
            />
          </AntCard>
        </Col>
        <Col span={6}>
          <AntCard bordered={false} className={styles.statCard} style={{ backgroundColor: '#fff1f0' }}>
            <Statistic
              title="Rejected Complaints"
              value={complaintStats.rejected}
              prefix={<ClockCircleOutlined />}
              loading={isLoadingComplaints}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </AntCard>
        </Col>
      </Row>

      <h2 className="mb-4">Quick Links</h2>
      <div className="row mt-3">
        <div className="col mr-3">
          <Card name="Analytics" icon={<AiOutlineLineChart />} link="/orders" />
        </div>
        <div className="col mr-3 ml-3">
          <Card name="Complaints" icon={<GrDocument />} link="/complaints" />
        </div>
        <div className="col mr-3 ml-3">
          <Card name="Categories" icon={<FiMap />} link="/master/categories" />
        </div>
        <div className="col ml-3">
          <Card name="Cities" icon={<WalletFilled />} link="/master/cities" />
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

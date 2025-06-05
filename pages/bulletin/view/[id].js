import React from "react";
import { Button, Card, Spin, Breadcrumb } from "antd";
import { EditOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useGetBulletinQuery } from "../../../store/slices/api/bulletinApi";
import styles from "../../../styles/dashboard.module.css";
import Link from "next/link";

const ViewBulletinPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const {
    data: bulletin,
    isLoading,
    isSuccess,
  } = useGetBulletinQuery(id, { skip: !id });

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div className={styles.container}>
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item>
          <Link href="/bulletin">
            <a>Bulletins</a>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>View</Breadcrumb.Item>
      </Breadcrumb>
      
      <div className="flex-between mb-3">
        <h2>{bulletin?.heading}</h2>
        <div>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => router.push("/bulletin")} 
            className="btn mr-2"
          >
            Back
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => router.push(`/bulletin/edit/${id}`)}
            className="btn"
            type="primary"
          >
            Edit
          </Button>
        </div>
      </div>

      <Card>
        <div
          className="bulletin-content"
          dangerouslySetInnerHTML={createMarkup(bulletin?.content)}
        />
      </Card>
    </div>
  );
};

export default ViewBulletinPage;
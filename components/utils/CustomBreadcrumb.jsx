import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
const CustomBreadcrumb = () => {
  const router = useRouter();
  const { pathname } = router;
  const pathParts = pathname.split("/").filter((part) => part !== "");
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>
        <Link href="/">
          <a>
            <HomeOutlined />
          </a>
        </Link>
      </Breadcrumb.Item>
      {pathParts.map((part, index) => (
        <Breadcrumb.Item key={index}>
          <Link href={`/${pathParts.slice(0, index + 1).join("/")}`}>
            <a>{part}</a>
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;

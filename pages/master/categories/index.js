import React, { useState, useEffect } from "react";
import { Table, Input, Button, Dropdown, Menu, Form, message } from "antd";
import {
  EditOutlined,
  EnterOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import AddCategoryDrawer from "../../../components/master/category/AddCategoryDrawer";
import EditCategoryDrawer from "../../../components/master/category/EditCategoryDrawer";
import { useGetCategoriesQuery } from "./../../../store/slices/api/categoryApi";

const CategoryPage = () => {
  const router = useRouter();
  const [openAddCategoryDrawer, setOpenAddCategoryrawer] = useState(false);
  const [openEditCategoryDrawer, setOpenEditCategoryDrawer] = useState(false);
  const [category, setCategory] = useState({});
  const {
    data: categories = [],
    isFetching: isFetchingGetCategories,
    isLoading: isLoadingGetCategories,
    isSuccess: isSuccessGetCategories,
  } = useGetCategoriesQuery();

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  const handleRowClick = (brand, index, event) => {};
  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      align: "center",
      render: (data) => (
        <Button
          icon={<EditOutlined />}
          className="btn"
          onClick={() => {
            setCategory(data);
            setOpenEditCategoryDrawer(true);
          }}
        />
      ),
      width: "",
    },
  ];

  return (
    <div className="page_wrapper">
      {openAddCategoryDrawer && (
        <AddCategoryDrawer
          open={openAddCategoryDrawer}
          setOpen={setOpenAddCategoryrawer}
        />
      )}
      {openEditCategoryDrawer && (
        <EditCategoryDrawer
          open={openEditCategoryDrawer}
          setOpen={setOpenEditCategoryDrawer}
          data={category}
        />
      )}

      <div className="flex-between mb-3">
        <div></div>
        <div>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenAddCategoryrawer(true);
            }}
            className="btn"
          >
            Add Category
          </Button>
        </div>
      </div>
      <div className="">
        <Table
          loading={isLoadingGetCategories}
          columns={columns}
          dataSource={categories}
          size="small"
          onChange={onChange}
          onRow={(record, index, event) => ({
            onClick: () => handleRowClick(record, index, event),
          })}
          bordered
          rowKey={(data) => data._id}
        />
      </div>
    </div>
  );
};
export default CategoryPage;

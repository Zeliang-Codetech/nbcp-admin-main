import React, { useState, useEffect } from "react";
import { Table, Input, Button, Dropdown, Menu, Form, message, Popconfirm } from "antd";
import {
  EditOutlined,
  EnterOutlined,
  MoreOutlined,
  PlusOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import AddCityDrawer from "../../../components/master/city/AddCityDrawer";
import EditCityDrawer from "../../../components/master/city/EditCityDrawer";
import { 
  useGetCitiesQuery, 
  useDeleteCityMutation,
  useDeleteAreaMutation 
} from "../../../store/slices/api/cityApi";
import AddAreaDrawer from "../../../components/master/area/AddAreaDrawer";
import EditAreaDrawer from "../../../components/master/area/EditAreaDrawer";
import { showError } from "../../../utils/Utils";

const CityPage = () => {
  const router = useRouter();
  const [openAddCityDrawer, setOpenAddCityrawer] = useState(false);
  const [openEditCityDrawer, setOpenEditCityDrawer] = useState(false);
  const [openAddAreaDrawer, setOpenAddAreaDrawer] = useState(false);
  const [openEditAreaDrawer, setOpenEditAreaDrawer] = useState(false);
  const [city, setCity] = useState({});
  const [area, setArea] = useState({});
  const [isDeleteCityLoading, setIsDeleteCityLoading] = useState(false);
  const [isDeleteAreaLoading, setIsDeleteAreaLoading] = useState(false);
  const {
    data: cities = [],
    isFetching: isFetchingGetCities,
    isLoading: isLoadingGetCities,
    isSuccess: isSuccessGetCities,
  } = useGetCitiesQuery();
  const [deleteCity] = useDeleteCityMutation();
  const [deleteArea] = useDeleteAreaMutation();

  const handleDeleteCity = async (id) => {
    setIsDeleteCityLoading(true);
    try {
      const result = await deleteCity(id).unwrap();
      if (result.status) {
        message.success("City deleted successfully");
      } else {
        showError(result.message);
      }
    } catch (err) {
      showError(err?.data?.message || "Failed to delete city");
    } finally {
      setIsDeleteCityLoading(false);
    }
  };

  const handleDeleteArea = async (id) => {
    setIsDeleteAreaLoading(true);
    try {
      const result = await deleteArea(id).unwrap();
      if (result.status) {
        message.success("Area deleted successfully");
      } else {
        showError(result.message);
      }
    } catch (err) {
      showError(err?.data?.message || "Failed to delete area");
    } finally {
      setIsDeleteAreaLoading(false);
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const handleRowClick = (brand, index, event) => {};
  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      width: "50%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'ascend',
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      align: "center",
      render: (data) => (
        <>
          <Button
            icon={<EditOutlined />}
            className="btn mr-2"
            onClick={(e) => {
              e.stopPropagation();
              setCity(data);
              setOpenEditCityDrawer(true);
            }}
          />
          <Popconfirm
            title="Are you sure you want to delete this city?"
            onConfirm={(e) => {
              e.stopPropagation();
              handleDeleteCity(data._id);
            }}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ loading: isDeleteCityLoading }}
          >
            <Button
              icon={<DeleteFilled />}
              onClick={(e) => e.stopPropagation()}
              className="btn ml-2"
            />
          </Popconfirm>
        </>
      ),
      width: "",
    },
  ];

  return (
    <div className="page_wrapper">
      {openAddCityDrawer && (
        <AddCityDrawer open={openAddCityDrawer} setOpen={setOpenAddCityrawer} />
      )}
      {openEditCityDrawer && (
        <EditCityDrawer
          open={openEditCityDrawer}
          setOpen={setOpenEditCityDrawer}
          data={city}
        />
      )}
      {openAddAreaDrawer && (
        <AddAreaDrawer
          open={openAddAreaDrawer}
          setOpen={setOpenAddAreaDrawer}
        />
      )}

      {openEditAreaDrawer && (
        <EditAreaDrawer
          open={openEditAreaDrawer}
          setOpen={setOpenEditAreaDrawer}
          data={area}
        />
      )}
      <div className="flex-between mb-3">
        <div></div>
        <div>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenAddCityrawer(true);
            }}
            className="btn mr-2"
          >
            Add City
          </Button>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenAddAreaDrawer(true);
            }}
            className="btn"
          >
            Add Area
          </Button>
        </div>
      </div>
      <div className="">
        <Table
          loading={isLoadingGetCities}
          columns={columns}
          dataSource={cities}
          size="small"
          onChange={onChange}
          onRow={(record, index, event) => ({
            onClick: () => handleRowClick(record, index, event),
          })}
          bordered
          rowKey={(data) => data._id}
          expandable={{
            expandedRowRender: (city) => {
              const columns = [
                {
                  title: "NAME",
                  dataIndex: "name",
                  key: "name",
                  sorter: (a, b) => a.name.localeCompare(b.name),
                  sortDirections: ['ascend', 'descend'],
                },
                {
                  title: "AQI",
                  dataIndex: "aqi",
                  key: "aqi",
                },
                {
                  title: "",
                  dataIndex: "",
                  key: "",
                  align: "center",
                  render: (area) => (
                    <>
                      <Button
                        icon={<EditOutlined />}
                        className="mr-2"
                        onClick={() => {
                          setArea({ city_id: city._id, ...area });
                          setOpenEditAreaDrawer(true);
                        }}
                      />
                      <Popconfirm
                        title="Are you sure you want to delete this area?"
                        onConfirm={(e) => {
                          e.stopPropagation();
                          handleDeleteArea(area._id);
                        }}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ loading: isDeleteAreaLoading }}
                      >
                        <Button
                          icon={<DeleteFilled />}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </Popconfirm>
                    </>
                  ),
                },
              ];
              return (
                <Table
                  columns={columns}
                  dataSource={city?.areas ?? []}
                  pagination={false}
                  rowKey={(area) => area._id}
                />
              );
            },
          }}
        />
      </div>
    </div>
  );
};
export default CityPage;

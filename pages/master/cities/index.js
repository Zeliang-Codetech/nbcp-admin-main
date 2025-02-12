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
import AddCityDrawer from "../../../components/master/city/AddCityDrawer";
import EditCityDrawer from "../../../components/master/city/EditCityDrawer";
import { useGetCitiesQuery } from "../../../store/slices/api/cityApi";
import AddAreaDrawer from "../../../components/master/area/AddAreaDrawer";
import EditAreaDrawer from "../../../components/master/area/EditAreaDrawer";

const CityPage = () => {
  const router = useRouter();
  const [openAddCityDrawer, setOpenAddCityrawer] = useState(false);
  const [openEditCityDrawer, setOpenEditCityDrawer] = useState(false);
  const [openAddAreaDrawer, setOpenAddAreaDrawer] = useState(false);
  const [openEditAreaDrawer, setOpenEditAreaDrawer] = useState(false);
  const [city, setCity] = useState({});
  const [area, setArea] = useState({});
  const {
    data: cities = [],
    isFetching: isFetchingGetCities,
    isLoading: isLoadingGetCities,
    isSuccess: isSuccessGetCities,
  } = useGetCitiesQuery();

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  const handleRowClick = (brand, index, event) => {};
  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      width: "50%",
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
            setCity(data);
            setOpenEditCityDrawer(true);
          }}
        />
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
                // {
                //   title: "ID",
                //   dataIndex: "_id",
                //   key: "id",
                //   width: "5%",
                // },
                {
                  title: "NAME",
                  dataIndex: "name",
                  key: "name",
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
                        onClick={() => {
                          setArea({ city_id: city._id, ...area });
                          setOpenEditAreaDrawer(true);
                        }}
                      />
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

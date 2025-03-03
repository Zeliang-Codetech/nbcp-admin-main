import React from 'react';
import { useRouter } from 'next/router';
import { Card, Descriptions, Spin, Image } from 'antd';
import { useGetComplaintQuery } from '../../../store/slices/api/complaintApi';
import { getComplaintStatus } from '../../../utils/Utils';

const ComplaintViewPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: complaint,
    isLoading,
    error
  } = useGetComplaintQuery(id, {
    skip: !id
  });

  if (isLoading) {
    return (
      <div className="page_wrapper">
        <Spin />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="page_wrapper">
        <p>Complaint not found</p>
      </div>
    );
  }

  return (
    <div className="page_wrapper" style={{ height: '100%', overflowY: 'auto', padding: '0 10px' }}>
      <Card title="Complaint Details" className="mb-4">
        <Descriptions 
          bordered 
          column={2}
          style={{ overflowX: 'auto' }}
        >
          <Descriptions.Item label="ID">{complaint._id}</Descriptions.Item>
          <Descriptions.Item label="Category">{complaint.category_name}</Descriptions.Item>
          <Descriptions.Item label="City">{complaint.city_name}</Descriptions.Item>
          <Descriptions.Item label="Pincode">{complaint.pincode}</Descriptions.Item>
          <Descriptions.Item label="Status">{getComplaintStatus(complaint.status)}</Descriptions.Item>
          <Descriptions.Item label="Created At">{complaint.created_at}</Descriptions.Item>
          <Descriptions.Item label="Client Email">{complaint.client_details?.email}</Descriptions.Item>
          <Descriptions.Item label="Latitude">{complaint.latitude || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Longitude">{complaint.longitude || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Description" span={2}>
            {complaint.description}
          </Descriptions.Item>
          <Descriptions.Item label="Address" span={2}>
            {complaint.address}
          </Descriptions.Item>
          {complaint.image && (
            <Descriptions.Item label="Complaint Image" span={2}>
              <Image
                src={`https://omnitouch.s3.ap-south-1.amazonaws.com/${complaint.image}`}
                alt="Complaint Image"
                style={{ maxWidth: '300px', height: 'auto' }}
                className="complaint-image"
              />
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    </div>
  );
};

export default ComplaintViewPage;
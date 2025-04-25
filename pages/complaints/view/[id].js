import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Descriptions, Spin, Image, Select, Button, message } from 'antd';
import { 
  useGetComplaintQuery, 
  useUpdateComplaintStatusMutation 
} from '../../../store/slices/api/complaintApi';
import { getComplaintStatus, showError } from '../../../utils/Utils';
import { ComplaintStatus } from '../../../utils/Status';

const { Option } = Select;

const ComplaintViewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const {
    data: complaint,
    isLoading,
    error,
    refetch
  } = useGetComplaintQuery(id, {
    skip: !id
  });

  const [updateComplaintStatus] = useUpdateComplaintStatusMutation();

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

  // Initialize selected status from complaint data if not already set
  if (selectedStatus === null && complaint) {
    setSelectedStatus(complaint.status);
  }

  const handleStatusChange = async (value) => {
    setSelectedStatus(value);
    setIsUpdating(true);
    
    try {
      const result = await updateComplaintStatus({
        id: complaint._id,
        status: value
      }).unwrap();
      
      if (result.status) {
        message.success(result.message || "Status updated successfully");
        refetch(); // Refresh the complaint data
      } else {
        showError(result.message || "Failed to update status");
      }
    } catch (err) {
      showError(err?.data?.message || "An error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

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
          
          <Descriptions.Item label="Status">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div 
                style={{ 
                  backgroundColor: getComplaintStatus(selectedStatus).color,
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  marginRight: '8px'
                }} 
              />
              <Select
                value={selectedStatus}
                onChange={handleStatusChange}
                style={{ width: 150 }}
                loading={isUpdating}
                disabled={isUpdating}
                dropdownStyle={{ padding: '8px 0' }}
              >
                <Option value={ComplaintStatus.RESOLVED} style={{ backgroundColor: getComplaintStatus(ComplaintStatus.RESOLVED).color + '20', padding: '4px 8px' }}>
                  Resolved
                </Option>
                <Option value={ComplaintStatus.PENDING} style={{ backgroundColor: getComplaintStatus(ComplaintStatus.PENDING).color + '20', padding: '4px 8px' }}>
                  Pending
                </Option>
                <Option value={ComplaintStatus.REJECTED} style={{ backgroundColor: getComplaintStatus(ComplaintStatus.REJECTED).color + '20', padding: '4px 8px' }}>
                  Rejected
                </Option>
              </Select>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="Created At">{complaint.created_at}</Descriptions.Item>
          <Descriptions.Item label="Client Details">{complaint.client_details?.email || complaint.client_details?.phone}</Descriptions.Item>
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
                src={`https://omnitouchnpcb.s3.ap-south-1.amazonaws.com/${complaint.image}`}
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
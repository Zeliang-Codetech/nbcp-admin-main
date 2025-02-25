import { NextApiRequest, NextApiResponse } from 'next';
import { complaintApi } from '../../../store/slices/api/complaintApi';

const getComplaintById = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await complaintApi.getComplaintById(id);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch complaint' });
  }
};

export default getComplaintById;

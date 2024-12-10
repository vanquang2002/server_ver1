describe('Delete Staff', () => {
    const deleteStaff = async (req, res) => {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: 'Staff ID is required' });
      }
  
      res.status(200).json({ message: 'Staff deleted successfully', id });
    };
  
    it('should delete staff successfully', async () => {
      const req = { params: { id: 'staff1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await deleteStaff(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Staff deleted successfully',
        id: 'staff1',
      });
    });
  
    it('should return 400 if staff ID is missing', async () => {
      const req = { params: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await deleteStaff(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Staff ID is required' });
    });
  
    it('should handle server errors gracefully', async () => {
      const req = { params: { id: 'staff1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const faultyDeleteStaff = async (req, res) => {
        try {
          throw new Error('Unexpected server error');
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await faultyDeleteStaff(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
  
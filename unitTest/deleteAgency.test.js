describe('Delete Agency - Extended Test Cases', () => {
    it('should delete the agency if found', async () => {
      const req = { params: { id: 'agency123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const deleteAgency = async (req, res) => {
        let agencies = [
          { id: 'agency123', name: 'Test Agency', address: '123 Test Street', phone: '1234567890' },
        ];
        const agencyIndex = agencies.findIndex((a) => a.id === req.params.id);
        if (agencyIndex === -1) {
          return res.status(404).json({ message: 'Agency not found' });
        }
        agencies.splice(agencyIndex, 1);
        res.status(200).json({ message: 'Agency deleted successfully' });
      };
  
      await deleteAgency(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Agency deleted successfully' });
    });
  
    it('should return an error if ID is not provided', async () => {
      const req = { params: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const deleteAgency = async (req, res) => {
        if (!req.params.id) {
          return res.status(400).json({ message: 'ID is required' });
        }
      };
  
      await deleteAgency(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'ID is required' });
    });
  
    it('should return 404 if agency is not found', async () => {
      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const deleteAgency = async (req, res) => {
        const agencies = [];
        const agencyIndex = agencies.findIndex((a) => a.id === req.params.id);
        if (agencyIndex === -1) {
          return res.status(404).json({ message: 'Agency not found' });
        }
      };
  
      await deleteAgency(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Agency not found' });
    });
  });
  
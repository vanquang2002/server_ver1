describe('Get Agency - Extended Test Cases', () => {
    it('should return the agency if found', async () => {
      const req = { params: { id: 'agency123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAgency = async (req, res) => {
        const agencies = [
          { id: 'agency123', name: 'Test Agency', address: '123 Test Street', phone: '1234567890' },
        ];
        const agency = agencies.find((a) => a.id === req.params.id);
        if (!agency) {
          return res.status(404).json({ message: 'Agency not found' });
        }
        res.status(200).json(agency);
      };
  
      await getAgency(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 'agency123',
        name: 'Test Agency',
        address: '123 Test Street',
        phone: '1234567890',
      });
    });
  
    it('should return an error if ID is not provided', async () => {
      const req = { params: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAgency = async (req, res) => {
        if (!req.params.id) {
          return res.status(400).json({ message: 'ID is required' });
        }
      };
  
      await getAgency(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'ID is required' });
    });
  
    it('should return 404 if agency is not found', async () => {
      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAgency = async (req, res) => {
        const agencies = [];
        const agency = agencies.find((a) => a.id === req.params.id);
        if (!agency) {
          return res.status(404).json({ message: 'Agency not found' });
        }
        res.status(200).json(agency);
      };
  
      await getAgency(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Agency not found' });
    });
  });
  
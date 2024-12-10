describe('Get Agency By Customer ID', () => {
    it('should return an agency if found', async () => {
      const req = { params: { customerId: 'customer123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAgencyByCustomerId = async (req, res) => {
        const agencies = [
          { id: 'agency1', customerId: 'customer123', name: 'Agency One' },
          { id: 'agency2', customerId: 'customer456', name: 'Agency Two' },
        ];
        const agency = agencies.find((a) => a.customerId === req.params.customerId);
        if (!agency) {
          return res.status(404).json({ message: 'Agency not found' });
        }
        res.status(200).json(agency);
      };
  
      await getAgencyByCustomerId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 'agency1',
        customerId: 'customer123',
        name: 'Agency One',
      });
    });
  
    it('should return 404 if agency is not found', async () => {
      const req = { params: { customerId: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAgencyByCustomerId = async (req, res) => {
        const agencies = [
          { id: 'agency1', customerId: 'customer123', name: 'Agency One' },
        ];
        const agency = agencies.find((a) => a.customerId === req.params.customerId);
        if (!agency) {
          return res.status(404).json({ message: 'Agency not found' });
        }
        res.status(200).json(agency);
      };
  
      await getAgencyByCustomerId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Agency not found' });
    });
  
    it('should return 400 if no customerId is provided', async () => {
      const req = { params: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAgencyByCustomerId = async (req, res) => {
        if (!req.params.customerId) {
          return res.status(400).json({ message: 'Customer ID is required' });
        }
      };
  
      await getAgencyByCustomerId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Customer ID is required' });
    });
  
    it('should validate the format of the customerId', async () => {
      const req = { params: { customerId: 'invalid id' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAgencyByCustomerId = async (req, res) => {
        const idPattern = /^[a-zA-Z0-9_-]+$/; // Example ID format validation
        if (!idPattern.test(req.params.customerId)) {
          return res.status(400).json({ message: 'Invalid Customer ID format' });
        }
      };
  
      await getAgencyByCustomerId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Customer ID format' });
    });
  
    it('should handle server errors gracefully', async () => {
      const req = { params: { customerId: 'customer123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAgencyByCustomerId = async (req, res) => {
        try {
          throw new Error('Database error');
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getAgencyByCustomerId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
  
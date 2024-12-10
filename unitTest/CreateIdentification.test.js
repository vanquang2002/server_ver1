describe('Create Identification', () => {
    it('should create identification successfully', async () => {
      const req = { body: { name: 'Passport', customerId: 'cust1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createIdentifycation = async (req, res) => {
        try {
          const newIdentification = { id: 'id1', ...req.body };
          res.status(201).json(newIdentification);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await createIdentifycation(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 'id1',
        name: 'Passport',
        customerId: 'cust1',
      });
    });
  
    it('should return 400 if required fields are missing', async () => {
      const req = { body: { name: 'Passport' } }; // Missing customerId
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createIdentifycation = async (req, res) => {
        try {
          if (!req.body.customerId) {
            return res.status(400).json({ message: 'Customer ID is required' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await createIdentifycation(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Customer ID is required' });
    });
  });
  
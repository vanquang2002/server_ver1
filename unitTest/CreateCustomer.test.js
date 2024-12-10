describe('Create Customer', () => {
    it('should create a customer successfully', async () => {
      const req = { body: { name: 'John Doe', email: 'john@example.com' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createCustomer = async (req, res) => {
        try {
          const newCustomer = { id: 'cust1', ...req.body };
          res.status(201).json(newCustomer);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await createCustomer(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 'cust1',
        name: 'John Doe',
        email: 'john@example.com',
      });
    });
  
    it('should handle missing required fields', async () => {
      const req = { body: { name: 'John Doe' } }; // Missing email
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createCustomer = async (req, res) => {
        try {
          if (!req.body.email) {
            return res.status(400).json({ message: 'Email is required' });
          }
          const newCustomer = { id: 'cust1', ...req.body };
          res.status(201).json(newCustomer);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await createCustomer(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email is required' });
    });
  });
  
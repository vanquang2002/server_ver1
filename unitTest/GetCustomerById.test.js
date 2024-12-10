describe('Get Customer By ID', () => {
    it('should return the customer if found', async () => {
      const req = { params: { id: 'cust1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getCustomerById = async (req, res) => {
        try {
          const customers = [
            { id: 'cust1', name: 'John Doe', email: 'john@example.com' },
          ];
          const customer = customers.find((c) => c.id === req.params.id);
          if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
          }
          res.status(200).json(customer);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getCustomerById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 'cust1',
        name: 'John Doe',
        email: 'john@example.com',
      });
    });
  
    it('should return 404 if customer is not found', async () => {
      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getCustomerById = async (req, res) => {
        try {
          const customers = [
            { id: 'cust1', name: 'John Doe', email: 'john@example.com' },
          ];
          const customer = customers.find((c) => c.id === req.params.id);
          if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
          }
          res.status(200).json(customer);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getCustomerById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Customer not found' });
    });
  });
  
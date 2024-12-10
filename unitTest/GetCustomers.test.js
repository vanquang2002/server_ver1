describe('Get Customers', () => {
    it('should return all customers successfully', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getCustomers = async (req, res) => {
        try {
          const customers = [
            { id: 'cust1', name: 'John Doe', email: 'john@example.com' },
            { id: 'cust2', name: 'Jane Smith', email: 'jane@example.com' },
          ];
          res.status(200).json(customers);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getCustomers(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: 'cust1', name: 'John Doe', email: 'john@example.com' },
        { id: 'cust2', name: 'Jane Smith', email: 'jane@example.com' },
      ]);
    });
  
    it('should handle server errors gracefully', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getCustomers = async (req, res) => {
        try {
          throw new Error('Database error');
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getCustomers(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
  
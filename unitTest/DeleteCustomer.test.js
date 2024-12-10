describe('Delete Customer', () => {
    it('should delete the customer successfully', async () => {
      const req = { params: { id: 'cust1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const deleteCustomer = async (req, res) => {
        try {
          const customers = [{ id: 'cust1', name: 'John Doe' }];
          const index = customers.findIndex((c) => c.id === req.params.id);
          if (index === -1) {
            return res.status(404).json({ message: 'Customer not found' });
          }
          customers.splice(index, 1);
          res.status(200).json({ message: 'Customer deleted successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await deleteCustomer(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Customer deleted successfully',
      });
    });
  
    it('should return 404 if customer is not found', async () => {
      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const deleteCustomer = async (req, res) => {
        try {
          const customers = [{ id: 'cust1', name: 'John Doe' }];
          const index = customers.findIndex((c) => c.id === req.params.id);
          if (index === -1) {
            return res.status(404).json({ message: 'Customer not found' });
          }
          customers.splice(index, 1);
          res.status(200).json({ message: 'Customer deleted successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await deleteCustomer(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Customer not found' });
    });
  });
  
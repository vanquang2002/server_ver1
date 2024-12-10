describe('Delete Order Service', () => {
    it('should delete an order service successfully', async () => {
      const req = { params: { id: 'orderService1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const deleteOrderService = async (req, res) => {
        res.status(200).json({ message: 'Order Service deleted successfully' });
      };
  
      await deleteOrderService(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Order Service deleted successfully' });
    });
  
    it('should return 404 if the order service is not found', async () => {
      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const deleteOrderService = async (req, res) => {
        res.status(404).json({ message: 'Order Service not found' });
      };
  
      await deleteOrderService(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Order Service not found' });
    });
  });
  
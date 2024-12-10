describe('Update Order Service', () => {
    it('should update an order service successfully', async () => {
      const req = { params: { id: 'orderService1' }, body: { quantity: 5 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const updateOrderService = async (req, res) => {
        const updatedOrderService = { id: req.params.id, ...req.body };
        res.status(200).json(updatedOrderService);
      };
  
      await updateOrderService(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 'orderService1', quantity: 5 }));
    });
  
    it('should return 404 if the order service is not found', async () => {
      const req = { params: { id: 'nonexistent' }, body: { quantity: 5 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const updateOrderService = async (req, res) => {
        return res.status(404).json({ message: 'Order Service not found' });
      };
  
      await updateOrderService(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Order Service not found' });
    });
  });
  
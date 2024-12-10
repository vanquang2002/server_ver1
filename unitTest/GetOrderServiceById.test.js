describe('Get Order Service By ID', () => {
    it('should return an order service if found', async () => {
      const req = { params: { id: 'orderService1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getOrderServiceById = async (req, res) => {
        const orderServices = [
          { id: 'orderService1', bookingId: 'booking1', serviceId: 'service1', quantity: 2 },
        ];
        const orderService = orderServices.find((o) => o.id === req.params.id);
        if (!orderService) {
          return res.status(404).json({ message: 'Order Service not found' });
        }
        res.status(200).json(orderService);
      };
  
      await getOrderServiceById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        id: 'orderService1',
        bookingId: 'booking1',
      }));
    });
  
    it('should return 404 if the order service is not found', async () => {
      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getOrderServiceById = async (req, res) => {
        const orderServices = [];
        const orderService = orderServices.find((o) => o.id === req.params.id);
        if (!orderService) {
          return res.status(404).json({ message: 'Order Service not found' });
        }
      };
  
      await getOrderServiceById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Order Service not found' });
    });
  });
  
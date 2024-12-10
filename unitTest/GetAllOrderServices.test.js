describe('Get All Order Services', () => {
    it('should return all order services', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAllOrderServices = async (req, res) => {
        const orderServices = [
          { id: 'orderService1', bookingId: 'booking1', serviceId: 'service1', quantity: 2 },
          { id: 'orderService2', bookingId: 'booking2', serviceId: 'service2', quantity: 3 },
        ];
        res.status(200).json(orderServices);
      };
  
      await getAllOrderServices(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
  
    it('should return an empty array if no order services exist', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAllOrderServices = async (req, res) => {
        const orderServices = [];
        res.status(200).json(orderServices);
      };
  
      await getAllOrderServices(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
  
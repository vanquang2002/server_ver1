describe('Create Order Service', () => {
    it('should create a new order service successfully', async () => {
      const req = {
        body: {
          bookingId: 'booking123',
          serviceId: 'service123',
          quantity: 2,
          note: 'Additional towels',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createOrderService = async (req, res) => {
        const newOrderService = { id: 'orderService1', ...req.body };
        res.status(201).json(newOrderService);
      };
  
      await createOrderService(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        id: 'orderService1',
        bookingId: 'booking123',
        serviceId: 'service123',
        quantity: 2,
        note: 'Additional towels',
      }));
    });
  
    it('should return 400 if required fields are missing', async () => {
      const req = {
        body: {
          bookingId: 'booking123',
          // Missing serviceId
          quantity: 2,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createOrderService = async (req, res) => {
        if (!req.body.serviceId) {
          return res.status(400).json({ message: 'Service ID is required' });
        }
      };
  
      await createOrderService(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Service ID is required' });
    });
  });
  
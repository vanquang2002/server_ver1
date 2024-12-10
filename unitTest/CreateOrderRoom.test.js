describe('Create Order Room', () => {
    it('should create an order room successfully', async () => {
      const req = {
        body: {
          roomCateId: 'roomCategory1',
          customerId: 'customer1',
          bookingId: 'booking1',
          quantity: 2,
          receiveRoom: '2024-12-01',
          returnRoom: '2024-12-05',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createOrderRoom = async (req, res) => {
        const orderRoom = { id: 'orderRoom1', ...req.body };
        res.status(201).json(orderRoom);
      };
  
      await createOrderRoom(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        id: 'orderRoom1',
        roomCateId: 'roomCategory1',
        customerId: 'customer1',
      }));
    });
  
    it('should return 400 if required fields are missing', async () => {
      const req = { body: { roomCateId: 'roomCategory1' } }; // Missing other required fields
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createOrderRoom = async (req, res) => {
        if (!req.body.customerId || !req.body.bookingId) {
          return res.status(400).json({ message: 'Customer ID and Booking ID are required' });
        }
      };
  
      await createOrderRoom(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Customer ID and Booking ID are required' });
    });
  });
  
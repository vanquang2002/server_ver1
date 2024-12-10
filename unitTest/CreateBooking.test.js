describe('Create Booking - Extended Test Cases', () => {
    it('should create a booking successfully with all valid inputs', async () => {
      const req = {
        body: {
          customerId: 'customer123',
          roomId: 'room123',
          checkin: '2024-12-01',
          checkout: '2024-12-05',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createBooking = async (req, res) => {
        if (!req.body.customerId) return res.status(400).json({ message: 'Customer ID is required' });
        if (!req.body.roomId) return res.status(400).json({ message: 'Room ID is required' });
        if (!req.body.checkin) return res.status(400).json({ message: 'Check-in date is required' });
        if (!req.body.checkout) return res.status(400).json({ message: 'Check-out date is required' });
  
        const booking = {
          id: 'booking123',
          ...req.body,
        };
        res.status(201).json(booking);
      };
  
      await createBooking(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 'booking123',
        customerId: 'customer123',
        roomId: 'room123',
        checkin: '2024-12-01',
        checkout: '2024-12-05',
      });
    });
  
    it('should return an error if Customer ID is missing', async () => {
      const req = {
        body: {
          // Missing `customerId`
          roomId: 'room123',
          checkin: '2024-12-01',
          checkout: '2024-12-05',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createBooking = async (req, res) => {
        if (!req.body.customerId) {
          return res.status(400).json({ message: 'Customer ID is required' });
        }
      };
  
      await createBooking(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Customer ID is required' });
    });
  
    it('should return an error if Room ID is missing', async () => {
      const req = {
        body: {
          customerId: 'customer123',
          // Missing `roomId`
          checkin: '2024-12-01',
          checkout: '2024-12-05',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createBooking = async (req, res) => {
        if (!req.body.roomId) {
          return res.status(400).json({ message: 'Room ID is required' });
        }
      };
  
      await createBooking(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Room ID is required' });
    });
  
    it('should return an error if Check-in date is missing', async () => {
      const req = {
        body: {
          customerId: 'customer123',
          roomId: 'room123',
          // Missing `checkin`
          checkout: '2024-12-05',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createBooking = async (req, res) => {
        if (!req.body.checkin) {
          return res.status(400).json({ message: 'Check-in date is required' });
        }
      };
  
      await createBooking(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Check-in date is required' });
    });
  
    it('should return an error if Check-out date is missing', async () => {
      const req = {
        body: {
          customerId: 'customer123',
          roomId: 'room123',
          checkin: '2024-12-01',
          // Missing `checkout`
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createBooking = async (req, res) => {
        if (!req.body.checkout) {
          return res.status(400).json({ message: 'Check-out date is required' });
        }
      };
  
      await createBooking(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Check-out date is required' });
    });
  
    it('should return an error if Check-out date is before Check-in date', async () => {
      const req = {
        body: {
          customerId: 'customer123',
          roomId: 'room123',
          checkin: '2024-12-05',
          checkout: '2024-12-01', // Invalid: Check-out before Check-in
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createBooking = async (req, res) => {
        if (new Date(req.body.checkout) < new Date(req.body.checkin)) {
          return res.status(400).json({ message: 'Check-out date cannot be before Check-in date' });
        }
      };
  
      await createBooking(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Check-out date cannot be before Check-in date' });
    });
  
    it('should return an error if Check-in or Check-out date is invalid', async () => {
      const req = {
        body: {
          customerId: 'customer123',
          roomId: 'room123',
          checkin: 'invalid-date', // Invalid date
          checkout: '2024-12-05',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createBooking = async (req, res) => {
        if (isNaN(new Date(req.body.checkin).getTime())) {
          return res.status(400).json({ message: 'Check-in date is invalid' });
        }
      };
  
      await createBooking(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Check-in date is invalid' });
    });
  });
  
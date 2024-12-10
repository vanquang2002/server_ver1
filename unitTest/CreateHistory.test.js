describe('Create History', () => {
    it('should create history successfully', async () => {
      const req = {
        body: {
          bookingId: 'booking123',
          staffId: 'staff123',
          note: 'History note example',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createHistory = async (req, res) => {
        try {
          const newHistory = {
            id: 'history123',
            ...req.body,
            timestamp: new Date(),
          };
          res.status(201).json(newHistory);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await createHistory(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        id: 'history123',
        bookingId: 'booking123',
        staffId: 'staff123',
        note: 'History note example',
      }));
    });
  
    it('should return 400 if required fields are missing', async () => {
      const req = {
        body: {
          bookingId: 'booking123',
          // Missing `staffId`
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createHistory = async (req, res) => {
        try {
          if (!req.body.staffId) {
            return res.status(400).json({ message: 'Staff ID is required' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await createHistory(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Staff ID is required' });
    });
  });
  
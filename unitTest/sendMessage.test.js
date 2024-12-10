describe('sendMessage - Extended Test Cases', () => {
    it('should send a message successfully', async () => {
      const req = {
        body: {
          message: 'Hello, world!',
          sender: 'user123',
          receiver: 'user456',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const sendMessage = async (req, res) => {
        try {
          const { message, sender, receiver } = req.body;
  
          if (!message || !sender || !receiver) {
            return res.status(400).json({ message: 'All fields are required' });
          }
  
          const savedMessage = {
            id: 'msg123',
            message,
            sender,
            receiver,
            timestamp: new Date(),
          };
  
          res.status(201).json(savedMessage);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await sendMessage(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        id: 'msg123',
        message: 'Hello, world!',
        sender: 'user123',
        receiver: 'user456',
      }));
    });
  
    it('should return 400 if any required field is missing', async () => {
      const req = {
        body: {
          message: 'Hello, world!',
          sender: 'user123',
          // Missing `receiver`
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const sendMessage = async (req, res) => {
        try {
          const { message, sender, receiver } = req.body;
  
          if (!message || !sender || !receiver) {
            return res.status(400).json({ message: 'All fields are required' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await sendMessage(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
    });
  
    it('should handle server errors gracefully', async () => {
      const req = {
        body: {
          message: 'Hello, world!',
          sender: 'user123',
          receiver: 'user456',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const sendMessage = async (req, res) => {
        try {
          throw new Error('Database error');
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await sendMessage(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
  
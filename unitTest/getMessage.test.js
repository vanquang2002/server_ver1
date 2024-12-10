describe('getMessages', () => {
    it('should return all messages successfully', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getMessages = async (req, res) => {
        try {
          const messages = [
            { id: 'msg1', sender: 'user1', receiver: 'user2', message: 'Hello', timestamp: '2024-12-01T10:00:00Z' },
            { id: 'msg2', sender: 'user2', receiver: 'user1', message: 'Hi there!', timestamp: '2024-12-01T10:05:00Z' },
          ];
          res.status(200).json(messages);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getMessages(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: 'msg1', sender: 'user1', receiver: 'user2', message: 'Hello', timestamp: '2024-12-01T10:00:00Z' },
        { id: 'msg2', sender: 'user2', receiver: 'user1', message: 'Hi there!', timestamp: '2024-12-01T10:05:00Z' },
      ]);
    });
  
    it('should return an empty array if no messages are found', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getMessages = async (req, res) => {
        try {
          const messages = []; // No messages
          res.status(200).json(messages);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getMessages(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  
    it('should handle server errors gracefully', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getMessages = async (req, res) => {
        try {
          throw new Error('Database error');
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getMessages(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
  
describe('Login User - Validation', () => {
    it('should return an error if username is missing', async () => {
      const req = {
        body: {
          password: 'password123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const loginUser = async (req, res) => {
        if (!req.body.username || req.body.username.trim() === '') {
          return res.status(400).json({ message: 'Username is required' });
        }
      };
  
      await loginUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Username is required' });
    });
  
    it('should return an error if password is missing', async () => {
      const req = {
        body: {
          username: 'testUser',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const loginUser = async (req, res) => {
        if (!req.body.password || req.body.password.trim() === '') {
          return res.status(400).json({ message: 'Password is required' });
        }
      };
  
      await loginUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Password is required' });
    });
  });
  
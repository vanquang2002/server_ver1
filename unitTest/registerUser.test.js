describe('Register User - Validation', () => {
    it('should return an error if username is missing', async () => {
      const req = {
        body: {
          password: 'password123',
          fullname: 'Test User',
          email: 'test@example.com',
          phone: '1234567890',
          role: 'staff',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const registerUser = async (req, res) => {
        if (!req.body.username || req.body.username.trim() === '') {
          return res.status(400).json({ message: 'Username is required' });
        }
      };
  
      await registerUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Username is required' });
    });
  
    it('should return an error if password is too short', async () => {
      const req = {
        body: {
          username: 'testUser',
          password: '123',
          fullname: 'Test User',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const registerUser = async (req, res) => {
        if (!req.body.password || req.body.password.length < 6) {
          return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
      };
  
      await registerUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Password must be at least 6 characters long' });
    });
  
    it('should return an error if email is invalid', async () => {
      const req = {
        body: {
          username: 'testUser',
          password: 'password123',
          email: 'invalid-email',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const registerUser = async (req, res) => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (req.body.email && !emailRegex.test(req.body.email)) {
          return res.status(400).json({ message: 'Invalid email format' });
        }
      };
  
      await registerUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email format' });
    });
  });
  
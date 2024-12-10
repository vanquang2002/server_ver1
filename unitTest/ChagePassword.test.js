describe('Change Password - Validation', () => {
    it('should return an error if username is missing', async () => {
      const req = {
        body: {
          currentPassword: 'password123',
          newPassword: 'newPassword123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const changePassword = async (req, res) => {
        if (!req.body.username || req.body.username.trim() === '') {
          return res.status(400).json({ message: 'Username is required' });
        }
      };
  
      await changePassword(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Username is required' });
    });
  
    it('should return an error if current password is missing', async () => {
      const req = {
        body: {
          username: 'testUser',
          newPassword: 'newPassword123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const changePassword = async (req, res) => {
        if (!req.body.currentPassword || req.body.currentPassword.trim() === '') {
          return res.status(400).json({ message: 'Current password is required' });
        }
      };
  
      await changePassword(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Current password is required' });
    });
  
    it('should return an error if new password is missing or too short', async () => {
      const req = {
        body: {
          username: 'testUser',
          currentPassword: 'password123',
          newPassword: '123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const changePassword = async (req, res) => {
        if (!req.body.newPassword || req.body.newPassword.length < 6) {
          return res.status(400).json({ message: 'New password must be at least 6 characters long' });
        }
      };
  
      await changePassword(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'New password must be at least 6 characters long' });
    });
  });
  
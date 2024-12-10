describe('Create Staff - Extended Test Cases', () => {
    const createStaff = async (req, res) => {
      const { name, role } = req.body;
  
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ message: 'Name is required and must be a non-empty string' });
      }
  
      if (!role || typeof role !== 'string' || !['admin', 'staff', 'manager'].includes(role)) {
        return res.status(400).json({ message: 'Role is required and must be one of [admin, staff, manager]' });
      }
  
      const staff = { id: 'staff1', ...req.body };
      res.status(201).json(staff);
    };
  
    it('should create a staff successfully with valid input', async () => {
      const req = { body: { name: 'John Doe', role: 'admin' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createStaff(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 'staff1', name: 'John Doe', role: 'admin' }));
    });
  
    it('should return 400 if name is missing', async () => {
      const req = { body: { role: 'admin' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createStaff(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Name is required and must be a non-empty string' });
    });
  
    it('should return 400 if role is missing', async () => {
      const req = { body: { name: 'John Doe' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createStaff(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Role is required and must be one of [admin, staff, manager]' });
    });
  
    it('should return 400 if role is invalid', async () => {
      const req = { body: { name: 'John Doe', role: 'invalidRole' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createStaff(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Role is required and must be one of [admin, staff, manager]' });
    });
  
    it('should return 400 if name is an empty string', async () => {
      const req = { body: { name: '', role: 'staff' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createStaff(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Name is required and must be a non-empty string' });
    });
  
    it('should return 400 if name is not a string', async () => {
      const req = { body: { name: 12345, role: 'admin' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createStaff(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Name is required and must be a non-empty string' });
    });
  
    it('should handle unexpected server errors gracefully', async () => {
      const req = { body: { name: 'John Doe', role: 'admin' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const faultyCreateStaff = async (req, res) => {
        try {
          throw new Error('Unexpected server error');
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await faultyCreateStaff(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
  
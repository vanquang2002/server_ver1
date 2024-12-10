describe('Edit Staff', () => {
    const editStaff = async (req, res) => {
      const { id } = req.params;
      const { name, role } = req.body;
  
      if (!id) {
        return res.status(400).json({ message: 'Staff ID is required' });
      }
  
      if (name && (typeof name !== 'string' || name.trim().length === 0)) {
        return res.status(400).json({ message: 'Name must be a non-empty string' });
      }
  
      if (role && !['admin', 'staff', 'manager'].includes(role)) {
        return res.status(400).json({ message: 'Role must be one of [admin, staff, manager]' });
      }
  
      res.status(200).json({ message: 'Staff updated successfully', id, name, role });
    };
  
    it('should edit staff successfully', async () => {
      const req = {
        params: { id: 'staff1' },
        body: { name: 'Jane Doe', role: 'manager' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await editStaff(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Staff updated successfully',
        id: 'staff1',
        name: 'Jane Doe',
        role: 'manager',
      });
    });
  
    it('should return 400 if staff ID is missing', async () => {
      const req = { params: {}, body: { name: 'Jane Doe', role: 'manager' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await editStaff(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Staff ID is required' });
    });
  
    it('should return 400 if name is invalid', async () => {
      const req = {
        params: { id: 'staff1' },
        body: { name: '', role: 'manager' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await editStaff(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Name must be a non-empty string' });
    });
  
    it('should return 400 if role is invalid', async () => {
      const req = {
        params: { id: 'staff1' },
        body: { role: 'invalidRole' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await editStaff(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Role must be one of [admin, staff, manager]' });
    });
  });
  
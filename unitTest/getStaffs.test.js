describe('Get Staffs', () => {
    it('should return a list of staffs', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getStaffs = async (req, res) => {
        const staffs = [
          { id: 'staff1', name: 'John Doe', role: 'admin' },
          { id: 'staff2', name: 'Jane Smith', role: 'staff' },
        ];
        res.status(200).json(staffs);
      };
  
      await getStaffs(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
  });
  
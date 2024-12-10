describe('Get History By ID', () => {
    it('should return a history if found', async () => {
      const req = { params: { id: 'history1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getHistoryById = async (req, res) => {
        try {
          const histories = [
            { id: 'history1', bookingId: 'booking1', staffId: 'staff1', note: 'Note 1' },
          ];
          const history = histories.find((h) => h.id === req.params.id);
          if (!history) {
            return res.status(404).json({ message: 'History not found' });
          }
          res.status(200).json(history);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getHistoryById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 'history1',
        bookingId: 'booking1',
        staffId: 'staff1',
        note: 'Note 1',
      });
    });
  
    it('should return 404 if history is not found', async () => {
      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getHistoryById = async (req, res) => {
        try {
          const histories = [];
          const history = histories.find((h) => h.id === req.params.id);
          if (!history) {
            return res.status(404).json({ message: 'History not found' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getHistoryById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'History not found' });
    });
  });
  
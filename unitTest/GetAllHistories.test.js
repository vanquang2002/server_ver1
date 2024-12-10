describe('Get All Histories', () => {
    it('should return all histories successfully', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAllHistories = async (req, res) => {
        try {
          const histories = [
            { id: 'history1', bookingId: 'booking1', staffId: 'staff1', note: 'Note 1' },
            { id: 'history2', bookingId: 'booking2', staffId: 'staff2', note: 'Note 2' },
          ];
          res.status(200).json(histories);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getAllHistories(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: 'history1', bookingId: 'booking1', staffId: 'staff1', note: 'Note 1' },
        { id: 'history2', bookingId: 'booking2', staffId: 'staff2', note: 'Note 2' },
      ]);
    });
  });
  
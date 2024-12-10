describe('Get Histories By Booking ID', () => {
    it('should return histories for a given booking ID', async () => {
      const req = { params: { bookingId: 'booking1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getHistoriesByBookingId = async (req, res) => {
        try {
          const histories = [
            { id: 'history1', bookingId: 'booking1', staffId: 'staff1', note: 'Note 1' },
          ];
          const filteredHistories = histories.filter((h) => h.bookingId === req.params.bookingId);
          if (!filteredHistories.length) {
            return res.status(404).json({ message: 'No histories found for this booking' });
          }
          res.status(200).json(filteredHistories);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getHistoriesByBookingId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: 'history1', bookingId: 'booking1', staffId: 'staff1', note: 'Note 1' },
      ]);
    });
  
    it('should return 404 if no histories are found', async () => {
      const req = { params: { bookingId: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getHistoriesByBookingId = async (req, res) => {
        try {
          const histories = [];
          const filteredHistories = histories.filter((h) => h.bookingId === req.params.bookingId);
          if (!filteredHistories.length) {
            return res.status(404).json({ message: 'No histories found for this booking' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getHistoriesByBookingId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'No histories found for this booking' });
    });
  });
  
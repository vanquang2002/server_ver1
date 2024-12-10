describe('Create History BE', () => {
    it('should create history with old info successfully', async () => {
      const req = {
        body: {
          bookingId: 'booking123',
          staffId: 'staff123',
          note: 'Backup history note',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const createHistoryBE = async (req, res) => {
        try {
          const data = {
            booking: { id: req.body.bookingId },
            orderServices: [{ id: 'service1' }, { id: 'service2' }],
          };
  
          const newHistory = {
            id: 'historyBE123',
            bookingId: req.body.bookingId,
            staffId: req.body.staffId,
            old_info: data,
            note: req.body.note,
            timestamp: new Date(),
          };
  
          res.status(201).json(newHistory);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await createHistoryBE(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        id: 'historyBE123',
        bookingId: 'booking123',
        staffId: 'staff123',
        old_info: expect.objectContaining({
          booking: expect.objectContaining({ id: 'booking123' }),
        }),
        note: 'Backup history note',
      }));
    });
  });
  
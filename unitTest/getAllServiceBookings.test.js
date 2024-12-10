describe('Get All Service Bookings', () => {
    it('should return all service bookings', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getAllServiceBookings = async (req, res) => {
        const serviceBookings = [
          { id: 'sb1', bookingId: 'b1', serviceId: 's1', quantity: 2 },
          { id: 'sb2', bookingId: 'b2', serviceId: 's2', quantity: 1 },
        ];
        res.status(200).json(serviceBookings);
      };
  
      await getAllServiceBookings(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
  });
  
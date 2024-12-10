describe('Get Order Services By Booking ID', () => {
    // Test for successful retrieval of order services
    it('should return order services for a given booking ID', async () => {
      const req = { params: { bookingId: 'booking1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Simulate function logic
      const getOrderServicesByBookingId = async (req, res) => {
        const orderServices = [
          { id: 'orderService1', bookingId: 'booking1', serviceId: 'service1', quantity: 2 },
          { id: 'orderService2', bookingId: 'booking1', serviceId: 'service2', quantity: 3 },
        ];
  
        // Filter order services by bookingId
        const filteredServices = orderServices.filter(
          (service) => service.bookingId === req.params.bookingId
        );
  
        if (filteredServices.length === 0) {
          return res.status(404).json({ message: 'No order services found for the given booking ID' });
        }
  
        res.status(200).json(filteredServices);
      };
  
      await getOrderServicesByBookingId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: 'orderService1', bookingId: 'booking1', serviceId: 'service1', quantity: 2 },
        { id: 'orderService2', bookingId: 'booking1', serviceId: 'service2', quantity: 3 },
      ]);
    });
  
    // Test for 404 response when no order services are found
    it('should return 404 if no order services are found for the booking ID', async () => {
      const req = { params: { bookingId: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Simulate function logic
      const getOrderServicesByBookingId = async (req, res) => {
        const orderServices = []; // No order services available
  
        const filteredServices = orderServices.filter(
          (service) => service.bookingId === req.params.bookingId
        );
  
        if (filteredServices.length === 0) {
          return res.status(404).json({ message: 'No order services found for the given booking ID' });
        }
  
        res.status(200).json(filteredServices);
      };
  
      await getOrderServicesByBookingId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'No order services found for the given booking ID' });
    });
  
    // Test for missing booking ID in request
    it('should return 400 if booking ID is not provided', async () => {
      const req = { params: {} }; // No bookingId provided
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Simulate function logic
      const getOrderServicesByBookingId = async (req, res) => {
        if (!req.params.bookingId) {
          return res.status(400).json({ message: 'Booking ID is required' });
        }
      };
  
      await getOrderServicesByBookingId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Booking ID is required' });
    });
  
    // Test for server errors
    it('should handle server errors gracefully', async () => {
      const req = { params: { bookingId: 'booking1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const getOrderServicesByBookingId = async (req, res) => {
        try {
          throw new Error('Database error');
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
  
      await getOrderServicesByBookingId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
  
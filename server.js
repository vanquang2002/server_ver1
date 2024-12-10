// Import các module cần thiết
import express, { json } from "express";
import * as dotenv from "dotenv";
import connectDB from "./database/database.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import nodemailer from "nodemailer";
import {
  ImageRouter,
  RoomRouter,
  OtherServiceRouter,
  MenuRouter,
  LocationRouter,
  IdentifycationRouter,
  HistoryRoutes,
  TaxRouter,
  BookingRouter,
  CustomerRouter,
  StaffRouter,
  RoomCategoryRouter,
  OrderRoomRouter,
  AgencyRouter,
  ContractRouter,
  OrderServiceRouter,
  paymentRoute,
  ServiceBookingRouter,
  Email,
  ChatRouter,
} from "./routes/index.js";
import { changePassword, loginUser, registerUser, verifyAccessToken } from "./authens/auth.js";

// Load biến môi trường
dotenv.config();

// Tạo app Express và HTTP server
const app = express();
const server = http.createServer(app);

// Parse JSON
app.use(json());

// Lấy danh sách các URL frontend từ biến môi trường
const allowedOrigins = process.env.REACT_URL
  ? process.env.REACT_URL.split(",")
  : ["https://client-customers-ver1.vercel.app", "https://client-admin-ver1.vercel.app"];

// Middleware CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["polling", "websocket"], // Cho phép polling và websocket
});

io.on("connection", (socket) => {
  console.log("Người dùng đã kết nối:", socket.id);

  // Phát thông báo tới client
  socket.emit("notification", { message: "Chào mừng bạn đến với ứng dụng!" });

  // Lắng nghe sự kiện từ client
  socket.on("send_notification", (data) => {
    console.log("Thông báo từ client:", data);
    io.emit("notification", data); // Phát thông báo tới tất cả client
  });

  socket.on("disconnect", () => {
    console.log("Người dùng đã ngắt kết nối:", socket.id);
  });
});

// Route chính
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Cấu hình routing
app.use("/images", ImageRouter);
app.use("/rooms", RoomRouter);
app.use("/otherservices", OtherServiceRouter);
app.use("/menus", MenuRouter);
app.use("/locations", LocationRouter);
app.use("/customers", CustomerRouter);
app.use("/staffs", StaffRouter);
app.use("/identifycations", IdentifycationRouter);
app.use("/histories", HistoryRoutes);
app.use("/taxes", TaxRouter);
app.use("/bookings", BookingRouter);
app.use("/roomCategories", RoomCategoryRouter);
app.use("/orderRooms", OrderRoomRouter);
app.use("/agencies", AgencyRouter);
app.use("/contracts", ContractRouter);
app.use("/orderServices", OrderServiceRouter);
app.use("/service-bookings", ServiceBookingRouter);
app.use("/payment", paymentRoute);
app.use("/chats", ChatRouter);
app.use("/email", Email);

// Định tuyến cho xác thực
app.post("/register", registerUser);
app.post("/login", loginUser);
app.put("/change-password", changePassword);

// Route bảo vệ
app.get("/profile", verifyAccessToken, (req, res) => {
  res.json({ message: `Hello, ${req.payload.aud}` });
});

// Route gửi phản hồi qua email
app.post("/send-feedback", async (req, res) => {
  const { hotelEmail, customerName, customerEmail, feedback } = req.body;

  if (!hotelEmail || !customerName || !customerEmail || !feedback) {
    return res.status(400).send({ error: "Thiếu thông tin cần thiết" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Không dùng SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"Customer Feedback" <nhakhachhuongsen.business@gmail.com>',
    to: hotelEmail,
    subject: `Feedback từ ${customerName}`,
    html: `
      <p><strong>Phản Hồi Từ Khách Hàng:</strong></p>
      <p><strong>Tên:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Nội Dung Phản Hồi:</strong></p>
      <p>${feedback}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Phản hồi đã được gửi thành công!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ error: "Gửi email thất bại" });
  }
});

// Kết nối server và database
const port = process.env.PORT || 8080;

server.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Server is running on: http://localhost:${port}`);
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error);
    process.exit(1); // Dừng server nếu không kết nối được database
  }
});

export { server, io };

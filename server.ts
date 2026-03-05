import express from "express";
import { createServer as createViteServer } from "vite";
import mysql from "mysql2/promise";
import cors from "cors";

// Create MySQL connection pool
const pool = mysql.createPool({
  host: "45.43.152.5",
  user: "tobulut_erp",
  password: "9Y349cvcZEKhzwrbUZ2s",
  database: "tobulut_erp",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/health", async (req, res) => {
    try {
      const connection = await pool.getConnection();
      connection.release();
      res.json({ status: "ok", database: "connected" });
    } catch (error) {
      console.error("Database connection failed:", error);
      res.status(500).json({ status: "error", message: "Database connection failed" });
    }
  });

  // Contacts API
  app.get("/api/contacts", async (req, res) => {
    try {
      // Assuming a contacts table exists, if not we will return mock data for now
      // const [rows] = await pool.query("SELECT * FROM contacts");
      // res.json(rows);
      
      // Fallback to mock data if table doesn't exist
      res.json([
        {
          id: "1",
          name: "Ahmet Yılmaz",
          type: "customer",
          taxNumber: "1234567890",
          email: "ahmet@example.com",
          phone: "5551234567",
          address: "İstanbul",
          balance: 1500.00,
          currency: "TRY",
          status: "active",
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01"
        },
        {
          id: "2",
          name: "Mehmet Demir",
          type: "supplier",
          taxNumber: "9876543210",
          email: "mehmet@example.com",
          phone: "5559876543",
          address: "Ankara",
          balance: -500.00,
          currency: "TRY",
          status: "active",
          createdAt: "2024-01-02",
          updatedAt: "2024-01-02"
        }
      ]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Auth API
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (email === "admin@example.com" && password === "password") {
      res.json({
        user: { id: "1", name: "Admin User", email: "admin@example.com", role: "admin" },
        token: "mock-jwt-token"
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.get("/api/auth/me", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      res.json({ id: "1", name: "Admin User", email: "admin@example.com", role: "admin" });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  });

  // Products API
  app.get("/api/products", (req, res) => {
    res.json([
      {
        id: "1",
        name: "Web Tasarım Hizmeti",
        code: "SRV-001",
        type: "service",
        buyPrice: 0,
        sellPrice: 15000.00,
        vatRate: 20,
        unit: "adet",
        stockQuantity: 0,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01"
      },
      {
        id: "2",
        name: "Laptop Standı",
        code: "PRD-001",
        type: "product",
        buyPrice: 250.00,
        sellPrice: 450.00,
        vatRate: 20,
        unit: "adet",
        stockQuantity: 50,
        createdAt: "2024-01-02",
        updatedAt: "2024-01-02"
      }
    ]);
  });

  // Invoices API
  app.get("/api/invoices", (req, res) => {
    res.json([
      {
        id: "1",
        number: "INV2024001",
        type: "sales",
        contactId: "1",
        contactName: "Ahmet Yılmaz",
        issueDate: "2024-03-01",
        dueDate: "2024-03-15",
        status: "sent",
        currency: "TRY",
        items: [
          {
            id: "101",
            productId: "1",
            productName: "Web Tasarım Hizmeti",
            quantity: 1,
            unitPrice: 15000.00,
            taxRate: 20,
            total: 15000.00
          }
        ],
        subtotal: 15000.00,
        taxTotal: 3000.00,
        total: 18000.00,
        createdAt: "2024-03-01",
        updatedAt: "2024-03-01"
      }
    ]);
  });

  // Expenses API
  app.get("/api/expenses", (req, res) => {
    res.json([
      {
        id: "1",
        description: "Ofis Kirası",
        amount: 5000.00,
        currency: "TRY",
        date: "2024-03-01",
        category: "rent",
        status: "paid",
        createdAt: "2024-03-01",
        updatedAt: "2024-03-01"
      }
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

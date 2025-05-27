const databaseConnection = require("./src/Config/Database.config.js");
const bcrypt = require("bcryptjs");
const Admin = require("./src/Models/AdminModel/Admin.model.js");

// Read arguments from terminal
const args = process.argv.slice(2);
const [adminName, adminEmail, adminPassword] = args;

if (!adminName || !adminEmail || !adminPassword) {
  console.error("Please provide name, email, and password as arguments");
  console.error(
    'Example: node seedAdmin.js "Super Admin" "admin@example.com" "admin123"'
  );
  process.exit(1);
}

// Connect to your database
const connectDB = async () => {
  try {
    const res = await databaseConnection();
    console.log("MongoDB connected for seeding");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

// Seed admin function
const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    console.log(existingAdmin);
    if (existingAdmin) {
      console.log("Admin already exists with this email");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = new Admin({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
    });

    await admin.save();
    console.log("Admin seeded successfully.");
    process.exit();
  } catch (error) {
    console.error("Error seeding admin:", error.message);
    process.exit(1);
  }
};

// Main execution
const start = async () => {
  await connectDB();
  await seedAdmin();
};

start();

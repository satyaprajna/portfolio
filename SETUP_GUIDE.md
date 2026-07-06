# MEAN Stack Contact Management System

A fully functional contact management application with CRUD operations, MongoDB integration, and admin panel with password protection.

## Features ✨

✅ **Contact Form**
- Submit new contacts with validation
- Store data in MongoDB
- Support for international phone numbers (50+ countries)

✅ **Admin Panel** (Password: `123`)
- View all stored contacts in a table
- Edit existing contacts
- Delete contacts with confirmation
- Real-time data display
- Responsive design

✅ **Full CRUD Operations**
- **Create**: Submit new contact form
- **Read**: View all contacts in admin panel
- **Update**: Edit existing contact details
- **Delete**: Remove contacts from database

✅ **Security**
- Admin panel protected with password
- Session persistence using localStorage
- Password field for each contact

✅ **Responsive Design**
- Works on desktop, tablet, and mobile devices
- Beautiful gradient UI with smooth animations
- Professional styling and user experience

---

## Tech Stack 🛠

- **Frontend**: React + React Router + Vite
- **Backend**: Express.js
- **Database**: MongoDB
- **Styling**: CSS with responsive design

---

## Prerequisites 📋

Before you start, ensure you have:

1. **Node.js** installed (v14 or higher)
2. **MongoDB** running locally or connection string ready
3. **npm** package manager

---

## Installation & Setup 🚀

### 1. Backend Setup

```bash
# Navigate to Express backend
cd Express-Backend

# Install dependencies
npm install

# Check .env file for MongoDB URL
cat .env  # Should show: MONGO_URL=mongodb://localhost:27017/contact_db

# Start the server
npm run dev  # or npm start for production

# Server will run on: http://localhost:3000
```

### 2. Frontend Setup

```bash
# Open new terminal, navigate to React app
cd my-react-app

# Install dependencies
npm install

# Update vite.config.js if backend is on different port (optional)
# Default: http://localhost:3000

# Start development server
npm run dev

# App will open on: http://localhost:5173 (or shown in terminal)
```

### 3. MongoDB Setup

**If MongoDB is running locally:**
```bash
# The app uses: mongodb://localhost:27017/contact_db
# Make sure MongoDB service is running

# macOS with brew:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod

# Windows:
# Start MongoDB from Services or use MongoDB Compass
```

**If using MongoDB Atlas (Cloud):**
1. Get your connection string from MongoDB Atlas
2. Update `.env` file in `Express-Backend/`:
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/contact_db
```

---

## Usage Guide 📖

### For Users (Contact Form)

1. **Fill the Contact Form**
   - Enter your name, email, phone number with country code
   - Create a password (min 3 characters)
   - Click "Submit"

2. **View Confirmation**
   - Success message will appear
   - Form will clear after submission

### For Admin (Manage All Contacts)

1. **Access Admin Panel**
   - Scroll down to see admin login panel
   - Or enter password: `123`
   - Click "Login"

2. **View All Contacts**
   - Click "Show All Contacts" button
   - See all submitted contacts in table format
   - Table shows: Name, Email, Phone, Password, Created Date

3. **Edit a Contact**
   - Click "✎ Edit" button on any contact
   - Update fields directly in the table
   - Click "✓ Save" to save changes
   - Click "✕ Cancel" to discard changes

4. **Delete a Contact**
   - Click "🗑 Delete" button on any contact
   - Confirm deletion in popup
   - Contact will be removed from database

5. **Logout**
   - Click "Logout" button in admin header
   - Returns to contact form

---

## API Endpoints 🔌

### Backend Routes (Express)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Create new contact |
| GET | `/all` | Get all contacts (sorted by newest) |
| GET | `/contact/:id` | Get single contact by ID |
| PUT | `/update/:id` | Update contact details |
| DELETE | `/delete/:id` | Delete contact |

### Request/Response Examples

**Create Contact:**
```bash
POST http://localhost:3000/create
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "countryCode": "+1",
  "phone": "1234567890",
  "password": "secure123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "countryCode": "+1",
    "phone": "1234567890",
    "password": "secure123",
    "createdAt": "2024-06-22T10:30:00.000Z"
  }
}
```

---

## Troubleshooting 🔧

### Backend Issues

**"MongoDB Connection Error"**
- Ensure MongoDB is running
- Check `.env` file has correct `MONGO_URL`
- If using local: ensure `mongod` service is active
- If using Atlas: verify credentials in connection string

**"Port 3000 already in use"**
- Change PORT in `.env`: `PORT=3001`
- Or kill process: `lsof -ti:3000 | xargs kill -9`

**"CORS Error"**
- Backend CORS is already configured
- Ensure frontend is accessing correct API_BASE URL

### Frontend Issues

**"Cannot fetch contacts"**
- Ensure backend is running on port 3000
- Check browser console for error messages
- Verify network requests in DevTools

**"Admin password not working"**
- Password is case-sensitive: `123`
- Clear localStorage: Open DevTools → Application → Clear All
- Refresh page

**"Data not saving"**
- Check MongoDB connection
- Ensure backend is running
- Check browser console for errors
- Look at server logs for detailed errors

---

## Project Structure 📁

```
MEAN Stack/
├── Express-Backend/
│   ├── .env (MongoDB URL configuration)
│   ├── server.js (Express server)
│   ├── package.json
│   ├── dbconnection/
│   │   └── dbcon.js (MongoDB connection)
│   ├── model/
│   │   └── contact_details.js (Mongoose schema)
│   └── routes/
│       └── web.js (API endpoints)
│
└── my-react-app/
    ├── package.json
    ├── src/
    │   ├── App.jsx (Main component)
    │   ├── main.jsx (Entry point)
    │   └── assets/
    │       ├── contract.jsx (Contact form + Admin panel)
    │       ├── contract.css (Styling)
    │       └── other components...
    └── vite.config.js
```

---

## Environment Variables 🔐

### Express Backend (.env)

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/contact_db
```

### React App (vite.config.js)

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
```

---

## Admin Credentials 🔐

- **Username**: Admin (any entry)
- **Password**: `123`

⚠️ **Note**: For production, change this password in the component and never commit to public repositories.

---

## Database Schema 📊

### Contact Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  countryCode: String (required),
  phone: String (required),
  password: String (required),
  createdAt: Date (default: now)
}
```

---

## Features in Detail 🎯

### 1. Contact Submission
- Real-time form validation
- Email format validation
- Phone number length validation
- Success/error messages
- Auto-clear form on success

### 2. Admin Dashboard
- Protected with password
- Sortable contacts table (newest first)
- Inline editing capability
- Delete confirmation
- Session persistence
- Contact counter

### 3. Data Persistence
- All data stored in MongoDB
- Automatic timestamps
- No data loss on page refresh

### 4. User Experience
- Smooth animations
- Responsive design
- Loading indicators
- Error handling
- Visual feedback

---

## Performance Tips ⚡

1. **MongoDB Indexing**: Consider indexing email field for faster queries
   ```javascript
   db.contacts.createIndex({ email: 1 })
   ```

2. **Pagination**: For large datasets, implement pagination in `/all` endpoint

3. **Caching**: Use Redis for frequently accessed data

4. **Rate Limiting**: Add rate limiting to prevent abuse:
   ```bash
   npm install express-rate-limit
   ```

---

## Security Recommendations 🔒

1. **Production Password**: Change admin password from `123` to strong credential
2. **Password Hashing**: Hash contact passwords using bcrypt:
   ```bash
   npm install bcrypt
   ```
3. **Environment Variables**: Never commit `.env` file
4. **Input Validation**: Already implemented on frontend and backend
5. **HTTPS**: Enable SSL/TLS in production

---

## Common Commands 📝

```bash
# Start everything
cd backend && npm run dev
Terminal 2: cd frontend && npm run dev

# MongoDB checks
mongosh  # Connect to MongoDB shell
show databases
use contact_db
db.contacts.find()  # View all contacts

# Development
npm install  # Install dependencies
npm run dev  # Start dev server
npm run build  # Build for production

# Debugging
npm run dev -- --inspect  # Debug mode
```

---

## Browser Support 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

## What's Included ✅

- ✅ Complete CRUD operations
- ✅ MongoDB integration
- ✅ Admin panel with authentication
- ✅ Form validation
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states
- ✅ Success messages
- ✅ Edit functionality
- ✅ Delete functionality
- ✅ Data persistence

---

## Future Enhancements 🚀

- [ ] User authentication (JWT)
- [ ] Contact search and filtering
- [ ] Pagination for large datasets
- [ ] Export contacts (CSV/PDF)
- [ ] Email notifications
- [ ] Contact categorization
- [ ] User roles and permissions
- [ ] Activity logging
- [ ] Data backup

---

## License 📄

This project is open source and available under the MIT License.

---

## Support 💬

For issues or questions:
1. Check the Troubleshooting section
2. Review server console logs
3. Check browser developer console
4. Verify MongoDB connection

---

## Version History 📜

**v1.0.0** (Current)
- Initial release
- Full CRUD operations
- Admin panel
- Responsive design
- MongoDB integration

---

**Happy Contact Managing! 🎉**

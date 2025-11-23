# 🎓 Pharm D Student Portfolio & Notes Platform

A full-stack Next.js application combining a professional student portfolio with a premium notes platform, built with TypeScript, Tailwind CSS, and Supabase.

---

## 🚀 Features

### 📱 Portfolio Features
- Modern, responsive design with Framer Motion animations
- Professional student profile showcase
- Education-focused about page
- Contact form UI
- Clean, minimal aesthetic

### 📚 Notes Platform
- Categorized study notes system
- Premium content with subscription model
- Advanced filtering (by category, semester, subject)
- Admin panel for content management
- Automated payment processing with Razorpay

### 💳 Subscription System
- Monthly Plan: ₹49/month
- Semester Plan: ₹99/6 months
- Automated Razorpay integration
- Webhook-based subscription activation
- Premium content auto-unlock

### 👑 Admin Features
- Full access to all content (no subscription needed)
- Add/manage notes with rich categorization
- Platform analytics dashboard
- User and subscription insights

---

## 🗺️ Routes & Functionality

### Public Routes

#### `/` - Homepage
- **Features**:
  - Hero section with student introduction
  - "About Me Preview" section
  - "My Academic Journey" cards (Studies, Campus Learning, Helping Juniors)
  - Smooth animations and hover effects
- **Access**: Public

#### `/about` - About Page
- **Features**:
  - Profile introduction
  - Education section (Pharm D details)
  - "What I'm Currently Working On" (4 cards)
  - "My Learning Philosophy" section
- **Access**: Public

#### `/contact` - Contact Page
- **Features**:
  - Contact form UI (Name, Email, Message)
  - Clean, centered layout
- **Access**: Public

#### `/notes` - Notes Listing
- **Features**:
  - Grid view of all notes
  - Filter by Category (Semester Notes, Module Notes, Subject Notes, PYQ Solved, Quick Revision, Case Studies)
  - Filter by Semester (1-6)
  - Premium badge indicators
  - Subject and category tags
  - Responsive card layout
- **Access**: Public (premium notes locked)

#### `/notes/[slug]` - Individual Note
- **Features**:
  - Full note content display
  - Subject and semester badges
  - Attached file download (if available)
  - Premium lock screen for non-subscribers
- **Access**: 
  - Free notes: Public
  - Premium notes: Requires active subscription or admin role

#### `/premium` - Subscription Plans
- **Features**:
  - Two pricing cards (Monthly ₹49, Semester ₹99)
  - Feature comparison
  - Razorpay checkout integration
  - "Best Value" badge on semester plan
- **Access**: Public (must be logged in to purchase)

---

### Protected Routes (Login Required)

#### `/login` - Authentication
- **Features**:
  - Sign in / Sign up toggle
  - Email + password authentication
  - Email verification support
  - Error handling
- **Access**: Public

#### `/dashboard` - User Dashboard
- **Features**:
  - Profile information display
  - Subscription status with badges
  - **For Regular Users**:
    - Active/Inactive subscription status
    - Start and end dates
    - "Upgrade to Premium" button (if not subscribed)
  - **For Admin Users**:
    - Platform analytics (Total Users, Total Notes, Premium Notes, Active Subscriptions)
    - Quick action buttons (Add New Note, View All Notes)
    - "ADMIN" badge with crown icon
    - "Full Access" indicator
- **Access**: Logged-in users only

---

### Admin-Only Routes

#### `/admin` - Admin Panel
- **Features**:
  - Add new notes form
  - Fields:
    - Title (auto-generates slug)
    - Subject
    - Semester (1-10)
    - Category dropdown (6 options)
    - Content (textarea)
    - File URL (optional)
    - Premium checkbox
  - Success/error messages
  - Form validation
- **Access**: Admin role only (checks `profiles.role === 'admin'`)

---

### API Routes

#### `POST /api/razorpay/order`
- **Purpose**: Create Razorpay payment order
- **Input**: `{ plan: 'monthly' | 'semester' }`
- **Output**: Razorpay order object
- **Access**: Logged-in users only

#### `POST /api/razorpay/webhook`
- **Purpose**: Handle payment confirmation
- **Input**: Razorpay webhook payload
- **Process**:
  - Verify signature
  - Update/insert subscription in database
  - Set end_date based on plan (1 month or 6 months)
- **Access**: Razorpay webhook only

#### `POST /auth/signout`
- **Purpose**: Sign out user
- **Access**: Logged-in users only

#### `GET /auth/callback`
- **Purpose**: Handle email verification callback
- **Access**: Public

---

## 🗄️ Database Schema

### Tables

#### `notes`
```sql
- id (uuid, primary key)
- title (text)
- slug (text, unique)
- subject (text)
- semester (integer)
- category (text) -- NEW: semester-notes, module-notes, subject-notes, pyq-solved, quick-revision, case-studies
- content (text)
- is_premium (boolean)
- file_url (text, nullable)
- created_at (timestamp)
```

#### `profiles`
```sql
- id (uuid, primary key, references auth.users)
- name (text)
- email (text)
- role (text) -- 'user' or 'admin'
- created_at (timestamp)
```

#### `subscriptions`
```sql
- id (uuid, primary key)
- user_id (uuid, references profiles)
- status (text) -- 'active' or 'inactive'
- start_date (timestamp)
- end_date (timestamp)
```

---

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563EB)
- **Admin**: Purple (#9333EA)
- **Premium**: Amber (#F59E0B)
- **Success**: Green (#10B981)
- **Background**: White to Gray gradient

### Components
- Rounded cards with soft shadows
- Hover animations (lift effect)
- Framer Motion page transitions
- Lucide React icons
- Responsive grid layouts

---

## 🔐 Access Control

### User Roles

#### **Public Visitor**
- ✅ View homepage, about, contact
- ✅ View notes list
- ✅ View free notes
- ❌ View premium notes
- ❌ Access dashboard
- ❌ Access admin panel

#### **Registered User (Free)**
- ✅ All public visitor permissions
- ✅ Access dashboard
- ✅ View subscription status
- ❌ View premium notes
- ❌ Access admin panel

#### **Premium Subscriber**
- ✅ All registered user permissions
- ✅ View premium notes
- ✅ Download attached files
- ❌ Access admin panel

#### **Admin**
- ✅ All premium subscriber permissions
- ✅ Access admin panel
- ✅ Add/manage notes
- ✅ View platform analytics
- ✅ No subscription required (automatic full access)
- ✅ Premium navbar link hidden
- ✅ Special "ADMIN" badges throughout UI

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Razorpay

### Deployment
- **Hosting**: Vercel (recommended)
- **Database**: Supabase Cloud

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret
RAZORPAY_WEBHOOK_SECRET=your-webhook-secret
```

### 4. Set up Supabase

#### Create tables:
```sql
-- Notes table
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  semester INTEGER NOT NULL,
  category TEXT DEFAULT 'semester-notes',
  content TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT false,
  file_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'inactive',
  start_date TIMESTAMP,
  end_date TIMESTAMP
);
```

#### Create trigger for auto-profile creation:
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'user',
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

#### Make yourself admin:
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

### 5. Set up Razorpay

1. Sign up at [Razorpay](https://razorpay.com/)
2. Get API keys from Settings → API Keys
3. Create webhook at Settings → Webhooks
   - URL: `https://your-domain.com/api/razorpay/webhook`
   - Event: `payment.captured`
4. Copy webhook secret

### 6. Run development server
```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🧪 Testing

### Test Razorpay Payments (Test Mode)
- **Card Number**: 4111 1111 1111 1111
- **Expiry**: Any future date
- **CVV**: Any 3 digits

### Test User Roles
1. **Regular User**: Sign up normally
2. **Premium User**: Sign up + purchase subscription
3. **Admin**: Update role in database to 'admin'

---

## 📝 Note Categories

1. **Semester Notes** - Complete semester coverage
2. **Module Notes** - Module-specific content
3. **Subject Notes** - Subject-wise organization
4. **PYQ Solved** - Previous Year Questions with solutions
5. **Quick Revision** - Short notes for quick review
6. **Case Studies** - Clinical case studies

---

## 🎯 Future Enhancements

- [ ] Markdown support for note content
- [ ] File upload to Supabase Storage
- [ ] Search functionality
- [ ] Bookmarks/favorites
- [ ] Comments on notes
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] PDF export
- [ ] Dark mode

---

## 📄 License

This project is for educational purposes.

---

## 👨‍💻 Developer

Built with ❤️ for Pharm D students

---

## 🆘 Support

For issues or questions, please create an issue in the repository.

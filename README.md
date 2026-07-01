# Full Stack Ecommerce V3

This project is an ecommerce website built with:

- `back-end`: Laravel API
- `front-end`: React application

The backend is built using a clean structure:

- Controllers handle request validation and API responses.
- Services handle database and business logic.
- Models represent database tables and relationships.
- Migrations create or update database tables.
- Middleware protects routes, like admin-only actions.

## Project Folders

```text
fullStack-ecomerce-v3/
  back-end/    Laravel backend API
  front-end/   React frontend
```

## Backend Parts

### Models

Models are inside:

```text
back-end/app/Models
```

Current ecommerce models:

- `User`: customers and admins
- `Category`: product categories
- `Product`: products for sale
- `Cart`: customer shopping cart
- `CartItem`: products inside a cart
- `Order`: customer order
- `OrderItem`: products inside an order
- `Payment`: order payment information
- `Promotion`: discount or promo code
- `Review`: product review by customer

The `User` model uses Laravel Sanctum with `HasApiTokens`.

### Migrations

Migrations are inside:

```text
back-end/database/migrations
```

They create the database tables:

- `users`
- `personal_access_tokens`
- `categories`
- `products`
- `carts`
- `cart_items`
- `promotions`
- `orders`
- `order_items`
- `payments`
- `reviews`

Run migrations from `back-end`:

```bash
php artisan migrate
```

### Controllers

Controllers are inside:

```text
back-end/app/Http/Controllers
```

Current controllers:

- `AuthController`: register, login, current user, logout
- `UserController`: admin user management
- `ProfileController`: logged-in user profile management

### Services

Services are inside:

```text
back-end/app/Services
```

Current services:

- `AuthService`: customer registration, login, logout, Sanctum token creation
- `UserService`: list, create, update, and delete users

### Middleware

Middleware is inside:

```text
back-end/app/Http/Middleware
```

Current middleware:

- `EnsureUserIsAdmin`: checks that the logged-in user has role `admin`

This protects admin routes.

## Authentication

Authentication uses Laravel Sanctum.

After login or registration, the API returns a token.

Use the token in React like this:

```text
Authorization: Bearer YOUR_TOKEN
```

## Roles

There are two roles:

- `customer`
- `admin`

Rules:

- A customer can register himself.
- Public registration always creates a `customer`.
- An admin can create customers.
- An admin can create other admins.
- Customers cannot create admins.
- Customers cannot update their own role.

## Auth API Routes

Public routes:

```text
POST /api/auth/register
POST /api/auth/login
```

Protected routes:

```text
GET  /api/auth/me
POST /api/auth/logout
```

### Register Customer

```http
POST /api/auth/register
```

Body:

```json
{
  "name": "Customer Name",
  "email": "customer@example.com",
  "password": "password123",
  "phone": "0600000000",
  "address": "Customer address"
}
```

This always creates a user with role `customer`.

### Login

```http
POST /api/auth/login
```

Body:

```json
{
  "email": "customer@example.com",
  "password": "password123"
}
```

Response includes:

```json
{
  "user": {},
  "token": "SANCTUM_TOKEN"
}
```

## Profile API Routes

These routes require login.

```text
GET       /api/profile
PUT/PATCH /api/profile
DELETE    /api/profile
```

### View Profile

```http
GET /api/profile
```

Returns the logged-in user.

### Update Profile

```http
PUT /api/profile
```

Allowed fields:

```json
{
  "name": "New Name",
  "email": "new@example.com",
  "password": "newpassword123",
  "phone": "0611111111",
  "address": "New address"
}
```

The user cannot update their own `role`.

### Delete Profile

```http
DELETE /api/profile
```

Deletes the logged-in user account and their Sanctum tokens.

## Admin User API Routes

These routes require:

- login with Sanctum token
- user role must be `admin`

```text
GET       /api/admin/users
POST      /api/admin/users
PUT/PATCH /api/admin/users/{user}
DELETE    /api/admin/users/{user}
```

### List Users

```http
GET /api/admin/users
```

Optional query parameters:

```text
search
role
per_page
```

Example:

```text
/api/admin/users?role=customer&search=john&per_page=20
```

### Create User

```http
POST /api/admin/users
```

Body:

```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin",
  "phone": "0600000000",
  "address": "Admin address"
}
```

An admin can create:

- `customer`
- `admin`

### Update User

```http
PUT /api/admin/users/{user}
```

Allowed fields:

```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "password": "newpassword123",
  "role": "customer",
  "phone": "0622222222",
  "address": "Updated address"
}
```

### Delete User

```http
DELETE /api/admin/users/{user}
```

Admin cannot delete their own account from this admin route.

## Development Commands

Run backend server:

```bash
cd back-end
php artisan serve
```

Run migrations:

```bash
cd back-end
php artisan migrate
```

Run backend tests:

```bash
cd back-end
php artisan test
```

Run frontend:

```bash
cd front-end
npm install
npm run dev
```

## Recommended Next Backend Parts

Build these next:

1. `CategoryController` and `CategoryService`
2. `ProductController` and `ProductService`
3. `CartController` and `CartService`
4. `OrderController` and `OrderService`
5. `PaymentController` or checkout payment logic
6. `ReviewController`
7. `PromotionController`

Suggested order:

```text
Auth -> Users/Profile -> Categories -> Products -> Cart -> Checkout/Orders -> Reviews -> Promotions -> Reports
```

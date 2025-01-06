/**
 * Database for UT Case
 * 
 * Created by: Yusuf Bozacı
 * Designed for: MySQL
 * Online Preview: https://sqlfiddle.com/mysql/online-compiler?id=9e6e0209-ceb0-4301-bbd1-bb67c3118499
 */

-- Malls Table
CREATE TABLE IF NOT EXISTS malls (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Example: 1
  name VARCHAR(255) NOT NULL, -- Example: X AVM
  location JSON NOT NULL, -- Example: {"address": "Denizaltı Mercan Sokak, Fırtına Tepesi Mahallesi", "city": "Yalova", "country": "Türkiye"}
  opening_hours JSON NOT NULL, -- Example: {"Monday": "09:00-22:00", "Tuesday": "09:00-22:00"}
  total_stores INT NOT NULL, -- Example: 3
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Example: 1
  firstname VARCHAR(50) NOT NULL, -- Example: Yusuf
  lastname VARCHAR(50) NOT NULL, -- Example: Bozacı
  email VARCHAR(100) NOT NULL, -- Example: hi@yusufbozaci.dev
  phone_number VARCHAR(25), -- Example: 555 555 55 55
  phone_number_region_code VARCHAR(10), -- Example: 90
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Example: 2025-01-06 14:00:00
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Example: 2025-01-06 14:00:00
  
);

-- Stores Table
CREATE TABLE IF NOT EXISTS stores (
 id INT AUTO_INCREMENT PRIMARY KEY, -- Example: 1
 mall_id INT NOT NULL, -- Example: 1 (Refers to the 'id' column in the 'malls' table, indicating which shopping mall the store belongs to.)
 client_id INT NOT NULL, -- Example: 1 (Refers to the 'id' column in the 'clients' table, indicating which client owns the store.)
 name VARCHAR(255) NOT NULL, -- Example: Nike
 type VARCHAR(100) NOT NULL, -- Example: Elektronik, Giyim, Spor or Yiyecek
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Example: 2025-01-06 14:00:00
 FOREIGN KEY (mall_id) REFERENCES malls(id) ON DELETE CASCADE,
 FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- Stores Type Table
CREATE TABLE IF NOT EXISTS stores_type (
 id INT AUTO_INCREMENT PRIMARY KEY, -- Example: 1
 name VARCHAR(255) NOT NULL, -- Example: Nike
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Example: 2025-01-06 14:00:00
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Example: 1
  authorised_mall_id INT NOT NULL, -- Example: 1
  firstname VARCHAR(50) NOT NULL, -- Example: Yusuf
  lastname VARCHAR(50) NOT NULL, -- Example: Bozacı
  email VARCHAR(100) NOT NULL, -- Example: hi@yusufbozaci.dev
  phone_number VARCHAR(25), -- Example: 555 555 55 55
  phone_number_region_code VARCHAR(10), -- Example: 90
  is_admin TINYINT NOT NULL, -- Example: 0 (Not an admin), 1 (Admin)
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Example: 2025-01-06 14:00:00
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Example: 2025-01-06 14:00:00
  FOREIGN KEY (authorised_mall_id) REFERENCES malls(id) ON DELETE CASCADE
);

-- Payments Method Table
CREATE TABLE IF NOT EXISTS payments_method (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Example: 1
  name VARCHAR(50) NOT NULL, -- Example: Kredi Kartı, Nakit or Banka Transferi
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Example: 2025-01-06 14:00:00
);

-- Payments Currency Table
CREATE TABLE IF NOT EXISTS payments_currency (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Example: 1
  name VARCHAR(50) NOT NULL, -- Example: TRY, USD or EUR
  symbol VARCHAR(50) NOT NULL, -- Example: ₺, $ or €
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Example: 2025-01-06 14:00:00
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Example: 1
  user_id INT NOT NULL, -- Example: 1 (Refers to the 'id' column in the 'users' table, indicating the person who received the payment.)
  store_id INT NOT NULL, -- Example: 1 (Refers to the 'id' column in the 'stores' table, indicating which store the payment is associated with.)
  payment_method_id INT NOT NULL, -- Example: 1 (Refers to the 'id' column in the 'payments_method' table, indicating the method of payment used.)
  currency_id INT NOT NULL, -- Example: 1 (Refers to the 'id' column in the 'payments_currency' table, indicating the currency in which the payment was made.)
  amount INT NOT NULL, -- Example: 50000
  status ENUM('pending', 'completed', 'failed'), -- Example: compeleted
  notes TEXT, -- Example: Extra Note.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Example: 2025-01-06 14:00:00
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
  FOREIGN KEY (payment_method_id) REFERENCES payments_method(id) ON DELETE CASCADE,
  FOREIGN KEY (currency_id) REFERENCES payments_currency(id) ON DELETE CASCADE
);

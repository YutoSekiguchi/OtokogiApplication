CREATE DATABASE IF NOT EXISTS otokogi_db;

USE otokogi_db;

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  display_name TEXT,
  mail TEXT NOT NULL,
  image TEXT NOT NULL,
  friend_code TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS friendships (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  uid INT NOT NULL,
  friend_id INT NOT NULL,
  status INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS records (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  total_price INT NOT NULL,
  url_code TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS members (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  rid INT NOT NULL,
  name TEXT NOT NULL,
  uid INT NOT NULL,
  ranking INT NOT NULL,
  total_price INT NOT NULL,
  total_drive INT NOT NULL,
  total_win INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pays (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  rid INT NOT NULL,
  mid INT NOT NULL,
  uid INT NOT NULL,
  other_uids TEXT NOT NULL,
  price INT NOT NULL,
  drive INT NOT NULL,
  drive_beer INT NOT NULL,
  detail TEXT,
  date TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
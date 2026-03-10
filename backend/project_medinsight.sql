-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2026 at 11:08 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_medinsight`
--

-- --------------------------------------------------------

--
-- Table structure for table `assistanthospitals`
--

CREATE TABLE `assistanthospitals` (
  `id` bigint(20) NOT NULL,
  `hospital_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `assistant_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assistanthospitals`
--

INSERT INTO `assistanthospitals` (`id`, `hospital_name`, `location`, `createdAt`, `updatedAt`, `assistant_id`) VALUES
(1, '35', '', '2025-12-31 07:20:46', '2025-12-31 07:20:46', 1),
(2, 'Leasons', 'Ja Ela', '2025-12-31 07:53:13', '2025-12-31 07:53:13', 2);

-- --------------------------------------------------------

--
-- Table structure for table `consultanthospitals`
--

CREATE TABLE `consultanthospitals` (
  `id` bigint(20) NOT NULL,
  `hospital_name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `consultant_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consultanthospitals`
--

INSERT INTO `consultanthospitals` (`id`, `hospital_name`, `location`, `createdAt`, `updatedAt`, `consultant_id`) VALUES
(1, 'njvsrkhbs', '3513035', '2025-12-31 07:22:06', '2025-12-31 07:22:06', 1);

-- --------------------------------------------------------

--
-- Table structure for table `consultants`
--

CREATE TABLE `consultants` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `experience_years` int(11) DEFAULT 0,
  `bio` text DEFAULT NULL,
  `hourly_rate` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consultants`
--

INSERT INTO `consultants` (`id`, `name`, `email`, `password`, `phone`, `experience_years`, `bio`, `hourly_rate`, `createdAt`, `updatedAt`) VALUES
(1, 'consultatnt', 'consultant@gmail.com', '$2b$10$ETg1xghoT93PQmBeGn382O5soRtM42Miq0TVMcnY3y/m3ALl2lmgK', '24152604', 5, '5300', 50000.00, '2025-12-31 07:22:06', '2026-03-09 21:57:58');

-- --------------------------------------------------------

--
-- Table structure for table `hospitalassistants`
--

CREATE TABLE `hospitalassistants` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `experience_years` int(11) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `hourly_rate` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hospitalassistants`
--

INSERT INTO `hospitalassistants` (`id`, `name`, `email`, `password`, `phone`, `experience_years`, `bio`, `hourly_rate`, `createdAt`, `updatedAt`) VALUES
(1, 'test2111', 'assistant@gmail.com', '$2b$10$DCnHTIWp2SBQnIvTbzlNhuvHOY/dTGahdjsLGl4sTq.90AzjkPsoy', '0175214654', 35, '35\n35\n', 1, '2025-12-31 07:20:46', '2026-03-09 21:48:54'),
(2, 'Gihan', 'gihan@gmail.com', '$2b$10$zI6W4W01bC.9/2cu18k2Z.9GDgzAt2waRL45svCqZi9jwgkub4cSi', '0721163855', 1, '1', 6, '2025-12-31 07:53:13', '2025-12-31 07:53:13');

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('PENDING','PROCESSING','SHIPPED','DELIVERED') DEFAULT 'PENDING',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `shop_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`id`, `qty`, `price`, `status`, `createdAt`, `updatedAt`, `order_id`, `product_id`, `shop_id`) VALUES
(1, 1, 122.00, 'PENDING', '2026-02-24 16:59:16', '2026-02-24 16:59:16', NULL, NULL, 1),
(2, 3, 850.00, 'PENDING', '2026-03-02 14:37:17', '2026-03-02 14:37:17', NULL, 3, 1),
(3, 2, 450.00, 'PENDING', '2026-03-02 14:37:18', '2026-03-02 14:37:18', NULL, 4, 1),
(4, 1, 850.00, 'PENDING', '2026-03-02 17:42:09', '2026-03-02 17:42:09', NULL, 3, 1),
(5, 1, 450.00, 'PENDING', '2026-03-02 17:42:09', '2026-03-02 17:42:09', NULL, 4, 1),
(6, 1, 450.00, 'PENDING', '2026-03-02 17:53:42', '2026-03-02 17:53:42', NULL, 4, 1),
(7, 1, 850.00, 'DELIVERED', '2026-03-02 18:11:21', '2026-03-03 03:47:49', NULL, 3, 1),
(8, 2, 1500.00, 'SHIPPED', '2026-03-02 18:25:37', '2026-03-03 03:40:59', NULL, 2, 1),
(9, 1, 450.00, 'SHIPPED', '2026-03-02 18:41:00', '2026-03-03 03:40:55', NULL, 4, 1),
(10, 1, 850.00, 'PROCESSING', '2026-03-02 20:11:22', '2026-03-03 03:47:43', NULL, 3, 1),
(11, 1, 850.00, 'SHIPPED', '2026-03-03 14:24:34', '2026-03-04 19:02:08', NULL, 3, 1),
(12, 1, 1200.00, 'PENDING', '2026-03-08 05:56:33', '2026-03-08 05:56:33', 4, 5, 1),
(13, 1, 12500.00, 'PENDING', '2026-03-08 06:07:28', '2026-03-08 06:07:28', 5, 9, 1),
(14, 1, 450.00, 'PENDING', '2026-03-08 06:07:28', '2026-03-08 06:07:28', 5, 4, 1),
(15, 1, 850.00, 'PENDING', '2026-03-08 06:07:28', '2026-03-08 06:07:28', 5, 3, 1),
(16, 1, 950.00, 'PENDING', '2026-03-08 06:07:28', '2026-03-08 06:07:28', 5, 6, 1),
(17, 1, 1200.00, 'PENDING', '2026-03-08 06:07:28', '2026-03-08 06:07:28', 5, 5, 1),
(18, 1, 12500.00, 'PENDING', '2026-03-08 20:29:53', '2026-03-08 20:29:53', 6, 9, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` enum('PLACED','PAID','CANCELLED') DEFAULT 'PLACED',
  `stripeSessionId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `total`, `status`, `stripeSessionId`, `createdAt`, `updatedAt`, `user_id`) VALUES
(1, 850.00, 'PAID', 'cs_test_a1xHaRV1NDBoShm192i3WGbfUeRDPkvhxz6hQ33rtSHqbYx8wOS8E7daeP', '2026-03-08 05:12:48', '2026-03-08 05:12:48', 1),
(2, 850.00, 'PAID', 'cs_test_a1FVtcZG0CxrwtFyekoBilwlkoesfEJCgEvxqnSLGQfWIEHCeIHI7ug0bB', '2026-03-08 05:15:21', '2026-03-08 05:15:21', 1),
(3, 450.00, 'PAID', 'cs_test_a1zxTKZd7iEb4Xft5avBzjHL27vWqZh0JG2j9NBXucMmmGkHiFUiMpY6Ev', '2026-03-08 05:24:33', '2026-03-08 05:24:33', 1),
(4, 1200.00, 'PAID', 'cs_test_a1gnDlveURZfhzn5Cqhh3eOVyzGyUJZo7MUkPOO8hcEwFz1A8ha3mG1pJL', '2026-03-08 05:56:33', '2026-03-08 05:56:33', 1),
(5, 15950.00, 'PAID', 'cs_test_b1rrGYCrhhtjJ3FvJ814IpyUyeKy5yCXMVrCMXGpBAu5rBw6qEcB3VmLAw', '2026-03-08 06:07:28', '2026-03-08 06:07:28', 1),
(6, 12500.00, 'PAID', 'cs_test_a1b5Z2L8fsjnrf0WdlTV3sI175KXIkLg0QoY5I8xoyMMOaYxYnUEO4mAhD', '2026-03-08 20:29:53', '2026-03-08 20:29:53', 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `shop_id` int(11) DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'PENDING',
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `shop_id` bigint(20) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `stock`, `image`, `createdAt`, `updatedAt`, `shop_id`, `tags`) VALUES
(2, 'Medical Arm Sling', 1500.00, 0, '1772521793427-577557281.png', '2026-03-02 08:51:03', '2026-03-03 07:09:53', 1, 'fracture, bone, support'),
(3, 'Calcium Carbonate 500mg', 850.00, 92, '1772521836994-374720514.png', '2026-03-02 08:51:03', '2026-03-08 06:07:28', 1, 'fracture, bone health, vitamins'),
(4, 'Pain Relief Gel', 450.00, 69, '1772521864764-719104702.jpg', '2026-03-02 08:51:03', '2026-03-08 06:07:28', 1, 'fracture, pain, injury'),
(5, 'Orthopedic Wrist Support', 1200.00, 28, '1772521885080-349166482.jpg', '2026-03-02 08:51:03', '2026-03-08 06:07:28', 1, 'fracture, wrist, hand'),
(6, 'Multivitamin Tablet Pack', 950.00, 119, '1772521903951-142643067.jpeg', '2026-03-02 08:51:03', '2026-03-08 06:07:28', 1, 'normal, wellness, general'),
(9, 'Test Product', 12500.00, 998, '1772674098024-964125267.png', '2026-03-05 01:28:18', '2026-03-08 20:29:53', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `shops`
--

CREATE TABLE `shops` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','APPROVED','BLOCKED') DEFAULT 'PENDING',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `owner_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shops`
--

INSERT INTO `shops` (`id`, `name`, `description`, `status`, `createdAt`, `updatedAt`, `owner_id`) VALUES
(1, 'shop', 'hey this is the shop', 'APPROVED', '2026-02-24 16:57:52', '2026-03-08 18:55:40', 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('USER','SHOP_OWNER','ADMIN') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'user11', 'user@gmail.com', '$2b$10$DyNSZvZaDdaXG4dNp32m6eGp6rODmcvErtRHvZ0ZwFAJAsc7lYdMK', 'USER', '2025-12-31 07:20:18', '2026-03-09 21:48:42'),
(3, 'admin@medinsight.com', 'admin@medinsight.com', '$2a$12$151F.NCD3rNjjUoTr/ue0eaRa4tQ1t62Mjxe7somASbIY6.KcPMP.', 'ADMIN', '2025-12-20 05:23:53', '2025-12-20 05:23:53'),
(4, 'shop owner', 'shop@gmail.com', '$2b$10$Zp/jSR865en4D5Q22vNb6ezLcAdrnTRKJVRQQx72xRol2an226J.q', 'SHOP_OWNER', '2026-02-24 16:57:37', '2026-02-24 16:57:37'),
(5, 'stdfh', 'ussdtger@gmail.com', '$2b$10$5drBWqvEmgJyyYfi0UWkkuSRW4oMuKskrgnTj/H0krwkVXEMOnjyC', 'USER', '2026-03-02 13:17:34', '2026-03-02 13:17:34'),
(6, 'test', 'test@gmail.com', '$2b$10$I736Hyt2uM7oiGOqoJ1noeXbwaP8Nr5xP7cMuGlMxt2LMtOv1lHGi', 'USER', '2026-03-02 18:40:46', '2026-03-02 18:40:46'),
(10, 'Test123', 'test123@gmail.com', '$2b$10$h3O/7C.SAcSHd3stF4sFx.Xc2fRb/fOtOhMvC3mqw/0k2VSialVTK', 'USER', '2026-03-04 19:26:40', '2026-03-04 19:26:40'),
(11, 'test', 'user1234@gmail.com', '$2b$10$D53k6DVzgp0AMgce1cPD2uTNpNr/uzmB9xW//PN15TsUzOpY4rVqW', 'USER', '2026-03-04 19:26:59', '2026-03-04 19:26:59'),
(12, 'test456', 'user456@gmail.com', '$2b$10$xPB/TXmSGRdEz1Qz4/Lg/ucD8RYhmDuMgFVQpKkcx.jS16uwj4xPm', 'USER', '2026-03-04 19:27:17', '2026-03-04 19:27:17'),
(15, 'brave', 'brave@gmail.com', '$2b$10$INdgJspbkRxR2OZIsq/6keyEX8KruhsZujUatk9VdWvOIamAUS7RW', 'USER', '2026-03-07 13:51:14', '2026-03-07 13:51:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assistanthospitals`
--
ALTER TABLE `assistanthospitals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assistant_id` (`assistant_id`);

--
-- Indexes for table `consultanthospitals`
--
ALTER TABLE `consultanthospitals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `consultant_id` (`consultant_id`);

--
-- Indexes for table `consultants`
--
ALTER TABLE `consultants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `hospitalassistants`
--
ALTER TABLE `hospitalassistants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `stripeSessionId` (`stripeSessionId`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Indexes for table `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assistanthospitals`
--
ALTER TABLE `assistanthospitals`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `consultanthospitals`
--
ALTER TABLE `consultanthospitals`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `consultants`
--
ALTER TABLE `consultants`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hospitalassistants`
--
ALTER TABLE `hospitalassistants`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `shops`
--
ALTER TABLE `shops`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assistanthospitals`
--
ALTER TABLE `assistanthospitals`
  ADD CONSTRAINT `assistanthospitals_ibfk_1` FOREIGN KEY (`assistant_id`) REFERENCES `hospitalassistants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `consultanthospitals`
--
ALTER TABLE `consultanthospitals`
  ADD CONSTRAINT `consultanthospitals_ibfk_1` FOREIGN KEY (`consultant_id`) REFERENCES `consultants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_3` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `shops`
--
ALTER TABLE `shops`
  ADD CONSTRAINT `shops_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

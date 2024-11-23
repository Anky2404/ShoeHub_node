-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2024 at 08:08 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shoehub`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `catID` int(11) NOT NULL,
  `catName` varchar(255) NOT NULL,
  `imageURL` varchar(255) NOT NULL,
  `catDescription` text NOT NULL,
  `addedBy` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`catID`, `catName`, `imageURL`, `catDescription`, `addedBy`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Running Shoes', 'running_shoes.jpg', 'Running shoes are specifically designed to provide comfort and support during high-impact activities such as running and jogging. These shoes are built with lightweight materials to reduce fatigue and are equipped with cushioned soles for added comfort. Whether you are training for a marathon or just going for a morning run, the right running shoes can improve your performance and reduce the risk of injury. The design focuses on arch support, flexibility, and shock absorption to give you a smooth running experience. Available in various colors and styles, these shoes are a must-have for any runner.', 1, 1, '2024-11-21 23:30:30', '2024-11-21 23:30:30'),
(2, 'Casual Shoes', 'casual_shoes.jpg', 'Casual shoes are versatile and comfortable footwear options suitable for a variety of everyday activities. These shoes are designed to be both practical and stylish, making them perfect for running errands, meeting friends, or enjoying a casual day out. They come in a range of materials including leather, canvas, and synthetic fabrics, offering both durability and breathability. Casual shoes are often designed with a flexible sole for added comfort and ease of movement. With numerous styles, colors, and patterns, they can easily complement any casual outfit.', 1, 1, '2024-11-21 23:30:30', '2024-11-21 23:30:30'),
(3, 'Formal Shoes', 'formal_shoes.jpg', 'Formal shoes are designed to provide an elegant and professional appearance for business meetings, formal events, and special occasions. These shoes are typically made from high-quality leather or polished synthetic materials that give a sophisticated look. With a focus on comfort and style, formal shoes are crafted with features like cushioned insoles and ergonomic soles to ensure a comfortable fit throughout long hours. They come in various styles, including Oxfords, Brogues, and Loafers, and are perfect for completing a professional or formal outfit. A good pair of formal shoes can elevate your overall appearance and make a lasting impression.', 1, 1, '2024-11-21 23:30:30', '2024-11-21 23:30:30'),
(4, 'Sneakers', 'sneakers.jpg', 'Sneakers are casual shoes designed for comfort, style, and versatility. Initially developed for athletic purposes, they have now become a staple of everyday fashion. Sneakers are known for their padded interior and flexible sole, providing excellent support for walking, running, or just lounging. They come in a variety of designs, from high-tops to low-tops, and can be worn with jeans, shorts, or even dresses for a laid-back look. With cutting-edge technology in cushioning and support, modern sneakers offer a combination of performance and fashion that appeals to athletes and fashion enthusiasts alike.', 1, 1, '2024-11-21 23:30:30', '2024-11-21 23:30:30'),
(5, 'Boots', 'boots.jpg', 'Boots are durable footwear designed to protect your feet and provide stability in challenging outdoor conditions. They are ideal for hiking, trekking, or even harsh weather conditions, offering ankle support and protection against rough terrains. Boots come in a variety of styles, including hiking boots, combat boots, and fashion boots, each designed with specific features to meet different needs. Many boots are equipped with waterproof materials, breathable linings, and sturdy soles to ensure comfort and safety. Whether you re exploring the great outdoors or simply need a sturdy, stylish shoe for winter, boots are a reliable choice for both functionality and fashion.', 1, 1, '2024-11-21 23:30:30', '2024-11-21 23:30:30');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productID` int(11) NOT NULL,
  `productName` varchar(100) NOT NULL,
  `productImage` varchar(255) NOT NULL,
  `productDesription` text NOT NULL,
  `productStatus` tinyint(4) NOT NULL,
  `productQuantity` int(11) NOT NULL,
  `categoryID` int(11) NOT NULL,
  `addedBy` int(11) NOT NULL,
  `unitPrice` decimal(10,2) NOT NULL,
  `addedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAT` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `dob` date NOT NULL,
  `role` enum('Customer','Admin','Staff','Manager') NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `isVerified` tinyint(4) NOT NULL DEFAULT 0,
  `password` text NOT NULL,
  `createdAT` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `firstname`, `lastname`, `email`, `phone`, `gender`, `dob`, `role`, `status`, `isVerified`, `password`, `createdAT`, `updatedAt`) VALUES
(1, 'Anky1231', 'Anky', 'Singh', 'anky@gmail.com', '7301005510', 'Male', '1994-04-24', 'Admin', 1, 1, '$2a$10$e6pSaYp.2kU0qFzksexU4ON81zTczpyP9wzWdOgPMfVKyZaq53E.O', '2024-11-20 04:37:29', '2024-11-22 06:39:53'),
(7, 'Abhishek1237', 'Abhishek', 'Kumar', 'abhi@gmail.com', '7301005510', 'Male', '1995-04-24', 'Staff', 0, 0, '$2b$10$sPt4LhHz9wtfg79ZQQwIL.Q1ytfYuyztGSRou9zDstLqmaJjtbi2K', '2024-11-20 06:38:05', '2024-11-22 08:08:23'),
(8, 'James1238', 'James', 'Smith', 'james@gmail.com', '9874342323', 'Male', '2024-11-14', 'Customer', 1, 1, '$2b$10$7XSionxI0ibMzrNutc.GuOUps88R5MbWD9hnu6w7YMafkZzVlqrNu', '2024-11-20 06:46:42', '2024-11-21 06:06:00'),
(13, 'Henry12313', 'Henry', 'Williams', 'henry@gmail.com', '9876543210', 'Male', '0000-00-00', 'Staff', 1, 1, '$2a$10$oMiaVdscSn6H4a7Lm3.VyuV1VodAXPRwHhOwE4eOUnwOLssdwPNG6', '2024-11-22 09:29:47', '2024-11-22 09:29:47'),
(14, 'asdf12314', 'asdf', 'asd', 'asdf@gmail.com', '1234567890', 'Male', '2024-11-05', 'Staff', 1, 1, '$2a$10$S7NAdYiiJcUAg0369hxC..scYfFf/mfORDqxBKQ5Uz5HDWq7foiFi', '2024-11-22 10:10:40', '2024-11-22 10:10:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`catID`),
  ADD KEY `fk2` (`addedBy`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `fk1` (`categoryID`),
  ADD KEY `fk3` (`addedBy`);

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
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `catID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `fk2` FOREIGN KEY (`addedBy`) REFERENCES `users` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk1` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`catID`),
  ADD CONSTRAINT `fk3` FOREIGN KEY (`addedBy`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Nov 05, 2025 at 08:45 PM
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
-- Database: `contact_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `ID` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Phone_Number` varchar(11) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `BirthDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`ID`, `Name`, `Phone_Number`, `Email`, `BirthDate`) VALUES
(1, 'Kathy', NULL, NULL, NULL),
(2, 'Michael', '4694266925', NULL, NULL),
(3, 'Nathan', '8649154169', 'NathanLorenzen1@gmail.com', '2000-06-07'),
(4, 'Willie', NULL, 'atuasmedium@gmail.com', '1999-11-29'),
(5, 'Scarlett', '9124679551', 'Scarlettfromash@gmail.com', '2007-05-16');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `Uno` int(11) NOT NULL,
  `Minecraft` int(11) NOT NULL,
  `VR` int(11) NOT NULL,
  `Monopoly` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gametypes`
--

CREATE TABLE `gametypes` (
  `ID` int(11) NOT NULL,
  `VideoGame` int(11) NOT NULL,
  `CardGame` int(11) NOT NULL,
  `VirtualReality` int(11) NOT NULL,
  `BoardGame` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `gametypes`
--
ALTER TABLE `gametypes`
  ADD PRIMARY KEY (`ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gametypes`
--
ALTER TABLE `gametypes`
  ADD CONSTRAINT `gametypes_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `contacts` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

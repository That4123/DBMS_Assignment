
PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;

-- --------------------------------------------------------

-- Table structure for table `permitted_file_type`

CREATE TABLE IF NOT EXISTS `permitted_file_type` (
  `permitted_id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `file_type` TEXT NOT NULL,
  `max_file_size` INTEGER NOT NULL
);

-- Dumping data for table `permitted_file_type`

INSERT INTO `permitted_file_type` (`permitted_id`, `file_type`, `max_file_size`) VALUES
(1, 'docx', 100),
(2, 'pdf', 40),
(3, 'xlsx', 100),
(4, 'png', 200);

-- --------------------------------------------------------

-- Table structure for table `printer`

CREATE TABLE IF NOT EXISTS `printer` (
  `printer_id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `brand` TEXT NOT NULL,
  `model` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `campusName` TEXT NOT NULL,
  `roomNumber` TEXT NOT NULL,
  `buildingName` TEXT NOT NULL,
  `printer_status` TEXT NOT NULL
);

-- Dumping data for table `printer`

INSERT INTO `printer` (`printer_id`, `brand`, `model`, `description`, `campusName`, `roomNumber`, `buildingName`, `printer_status`) VALUES
(1, 'Canon', 'LBP 6030', 'Mới, không lem mực', '2', '101', 'H1', 'Đang hoạt động'),
(2, 'Xerox', 'XR1737', 'Mới, không lem mực', '1', '203', 'C5', 'Đang hoạt động'),
(3, 'HP', '2Z609A', 'Mới, không lem mực', '2', '303', 'H3', 'Đang hoạt động'),
(4, 'Canon', 'LBP 4039', 'Mới, không lem mực', '1', '314', 'B1', 'Đang hoạt động'),
(5, 'Epson', 'ESP030', 'Mới, không lem mực', '2', '403', 'H3', 'Đang hoạt động'),
(6, 'Canon', 'G1737', 'Mới, không lem mực', '1', '101', 'B7', 'Đang hoạt động'),
(7, 'HP', '2T394A', 'Mới, không lem mực', '2', '303', 'H6', 'Đang hoạt động'),
(8, 'Canon', 'LBP 5023', 'Mới, không lem mực', '1', '504', 'B1', 'Đang hoạt động'),
(9, 'Xerox', 'XR1745', 'Mới, không lem mực', '2', '302', 'H6', 'Đang hoạt động'),
(10, 'Canon', 'LBP 5024', 'Mới, không lem mực', '1', '501', 'B1', 'Đang hoạt động');

-- --------------------------------------------------------

-- Table structure for table `printing_log`

CREATE TABLE IF NOT EXISTS `printing_log` (
  `log_id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `student_id` INTEGER NOT NULL,
  `printer_id` INTEGER NOT NULL,
  `print_request_id` INTEGER NOT NULL,
  `start_time` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `num_of_page_to_print` INTEGER NOT NULL,
  `printing_status` TEXT NOT NULL CHECK(printing_status IN ('Pending','Accepted','Executing','Completed','Denied'))
);
INSERT INTO `printing_log` (`log_id`,`student_id`, `printer_id`,`print_request_id`,`start_time`,`end_time`,`num_of_page_to_print`,`printing_status`) VALUES
(1,2000001,5,1,'2023-10-31 14:30:45', '2023-11-02 14:30:45', 3, 'Completed'),
(2,2000001,2,2,'2023-12-31 14:30:45', '2023-12-31 15:30:45', 3, 'Denied'),
(3,2000001,3,3,'2024-02-01 14:30:45', '2023-02-02 14:30:45', 3, 'Executing');
-- SELECT  * from printing_log;
-- --------------------------------------------------------

-- Table structure for table `print_request`

CREATE TABLE IF NOT EXISTS `print_request` (
  `request_id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `file_name` TEXT NOT NULL,
  `file_path` TEXT NOT NULL,
  `chosen_printer` INTEGER NOT NULL,
  `paper_size` TEXT NOT NULL CHECK(paper_size IN ('A3','A4')),
  `pages_to_print` TEXT NOT NULL,
  `is_double_side` INTEGER NOT NULL,
  `number_of_copies` INTEGER NOT NULL,
  `print_type` TEXT NOT NULL
);
-- SELECT CURRENT_TIMESTAMP;
-- --------------------------------------------------------

-- Table structure for table `user`

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` INTEGER PRIMARY KEY,
  `user_name` TEXT NOT NULL,
  `email` TEXT NOT NULL,
  `password` TEXT NOT NULL,
  `role` TEXT NOT NULL,
  `state` TEXT NOT NULL
);

-- Dumping data for table `user`

INSERT INTO `user` (`user_id`, `user_name`, `email`, `password`, `role`, `state`) VALUES
(2000000, 'SPSO 1', 'abc@def.com', '$2b$10$gmZJOS1l9LGpT3HyDPMWkOx.E23.QneEZ0ISy9FDosVE9g8zBz2mm', 'Nhân viên SPSO', 'Đang hoạt động'),
(2000001, 'Student 1', 'abd@def.com', '$2b$10$vPfiwJdRbJsMV04pbav0TOry.VJe9Of6Gdo08d0mVh9VMpjpJUJHy', 'Sinh viên', 'Đang hoạt động');

-- --------------------------------------------------------

-- Table structure for table `student`

CREATE TABLE IF NOT EXISTS `student` (
  `student_id` INTEGER PRIMARY KEY,
  `page_num_left` INTEGER NOT NULL DEFAULT 10,
  FOREIGN KEY (`student_id`) REFERENCES `user`(`user_id`)
);

-- Dumping data for table `student`

INSERT INTO `student` (`student_id`, `page_num_left`) VALUES
(2000001, 10);

-- --------------------------------------------------------

-- Table structure for table `paper_purchase_log`

CREATE TABLE IF NOT EXISTS `paper_purchase_log` (
  `purchase_log_id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `student_id` INTEGER NOT NULL,
  `register_date` TEXT NOT NULL,
  `number_of_page` INTEGER NOT NULL,
  `amount` TEXT NOT NULL,
  `status` TEXT NOT NULL,
  `purchase_date` TEXT,
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`)
);

-- Dumping data for table `paper_purchase_log`

INSERT INTO `paper_purchase_log` (`purchase_log_id`, `student_id`, `register_date`, `number_of_page`, `amount`, `status`, `purchase_date`) VALUES
(1, 2000001, '2023-11-30 14:30:45', 30, '12000', 'Đã thanh toán', '2023-12-01 14:30:45'),
(2, 2000001, '2023-11-29 14:30:45', 50, '20000', 'Chưa thanh toán', NULL),
(3, 2000001, '2023-10-31 14:30:45', 10, '4000', 'Đã thanh toán', '2023-11-28 14:30:45'),
(4, 2000001, '2023-09-30 14:30:45', 20, '8000', 'Đã thanh toán', '2023-10-15 14:30:45');

-- --------------------------------------------------------

PRAGMA foreign_keys = ON;
COMMIT;

-- SELECT * FROM user;

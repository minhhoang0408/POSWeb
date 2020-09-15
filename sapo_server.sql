-- Database for sale mock project


-- Create table `app_user`

DROP TABLE IF EXISTS `app_user`;

CREATE TABLE `app_user` (
	`id` int NOT NULL AUTO_INCREMENT,
    `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `app_user` VALUES (1,'admin','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','admin123007@gmail.com','ROLE_ADMIN');

-- Create table `category`

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` varchar(1000) charset utf8mb4,
  `create_on` timestamp null DEFAULT current_timestamp(),
  `update_on` timestamp null DEFAULT NULL,
  PRIMARY KEY(`id`)
);

INSERT INTO `category` VALUES (1,'Quần','Adidas',Null,'2020-08-21',Null),
(2,'Áo','Gucci',Null,'2020-05-21',Null),
(3,'Váy','Uniqlo',Null,'2020-05-21',Null),
(4,'Túi','Chanel',Null,'2020-05-21',Null),
(5,'Mũ','Nike',Null,'2020-05-21',Null),
(6,'Khăn','Uniqlo',Null,'2020-05-21',Null),
(7,'Tất','Adidas',Null,'2020-05-15',Null),
(8,'Thắt lưng','Gucci',Null,'2020-05-12',Null)
;

-- Create table `product`

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
	`id` int NOT NULL AUTO_INCREMENT,
    `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `category_id` int NOT NULL,
    `quantity` int NOT NULL,
    `price_in` decimal(12,0) NOT NULL,
    `price_out` decimal(12,0) NOT NULL,
    `discount` decimal(12,0) DEFAULT NULL,
    `image_link` varchar(255) DEFAULT NULL,
    `deleted` bit DEFAULT 0,
	`create_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP(),
	`update_on` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `product` VALUES (1,'SKU1','Áo sơ mi nam',2,10,15000,25000,5000,'https://cf.shopee.vn/file/9af30533254c282fbc11d3d38fa94ffa',b'0','2020-06-22','2020-06-25'),
(2,'SKU2','Áo dài',2,99,150000,290000,5000,'https://cf.shopee.vn/file/a38edd2909808fa1f3759aaeae7273b0',b'0','2020-06-22','2020-07-12'),
(3,'SKU3','Quần jean nam',1,32,240000,460000,5000,'https://cf.shopee.vn/file/e72e2b4049f80e09b9b9d8c94fd69bbb',b'0','2020-06-22','2020-06-25'),
(4,'SKU4','Áo dài nam',2,104,780000,900000,0,'https://media3.scdn.vn/img2/2018/8_4/yzsPYb_simg_6d9572_499-499-0-11_cropf_simg_de2fe0_500x500_maxb.jpg',b'0','2020-06-22','2020-07-12'),
(5,'SKU5','Mũ freesize',5,100,150000,250000,0,'https://bizweb.dktcdn.net/thumb/1024x1024/100/350/900/products/dsc00845.jpg?v=1554929893363',b'0','2020-06-22','2020-07-18'),
(6,'SKU6','Khăn quàng cổ',6,100,50000,450000,0,'https://cf.shopee.vn/file/7d0a5e1b6809124542357b4ad9f63e83',b'0','2020-06-22','2020-07-18'),
(7,'SKU7','Áo khoác nam',2,100,670000,1500000,0,'https://cf.shopee.vn/file/f779e2f0842167690f1279540de7ba21',b'0','2020-06-22','2020-06-25'),
(8,'SKU8','Quần short nam',1,99,250000,300000,0,'https://cf.shopee.vn/file/c9b5c3f4849a56cfcc5bb271e8159b4d',b'0','2020-06-22','2020-07-12'),
(9,'SKU9','Mũ lưỡi trai',5,99,400000,500000,0,'https://cf.shopee.vn/file/423e92beff12d31395e58836a7b5e687',b'0','2020-06-22','2020-07-18'),
(10,'SKU10','Túi xách',4,99,1500000,2900000,0,'https://cf.shopee.vn/file/83fd08e6801e24a603c0b5747073364a',b'0','2020-06-22','2020-07-25'),
(11,'SKU11','Thắt lưng da cá trê',8,100,400000,900000,0,'https://cf.shopee.vn/file/cba94b0cf9cc24f60f7aa294526ef89b',b'0','2020-06-23','2020-08-05'),
(12,'SKU12','Áo dài tay',2,99,200000,500000,0,'https://cf.shopee.vn/file/3d055a5fd9400f94e9fef7f3f04a4d3d',b'0','2020-06-22','2020-07-12'),
(13,'SKU13','Áo ngắn tay',2,99,150000,600000,0,'https://vn-live-02.slatic.net/original/140ec68c9ba32c21305a40dd986827eb.jpg',b'0','2020-06-22','2020-06-25'),
(14,'SKU14','Quần ống rộng',1,99,200000,900000,0,'https://cf.shopee.vn/file/5416022a7a8b51db37618ca0b3e44972',b'0','2020-06-22','2020-07-18'),
(15,'SKU15','Quần tây công sở',1,99,300000,1200000,0,'https://vn-test-11.slatic.net/shop/433f6540346a9db27f4fad90da45b810.jpeg',b'0','2020-06-22','2020-07-25'),
(16,'SKU16','Quần baggy công sở',1,99,150000,500000,0,'https://media3.scdn.vn/img2/2017/11_21/yPDRPU_simg_de2fe0_500x500_maxb.jpg',b'0','2020-06-22','2020-07-12'),
(17,'SKU17','Áo nỉ',2,99,150000,300000,0,'https://cf.shopee.vn/file/d16882f6e4b11dfe4b8cc0a629d931fb',b'0','2020-06-22','2020-08-05'),
(18,'SKU18','Áo sơ mi họa tiết',2,99,300000,700000,0,'https://bizweb.dktcdn.net/thumb/1024x1024/100/350/935/articles/ao-so-mi-hoa-tiet-nam.jpg?v=1568632279300',b'0','2020-06-22','2020-07-25'),
(19,'SKU19','Áo chống nắng',2,99,150000,300000,0,'https://hinlet.vn/wp-content/uploads/2019/06/ao-khoac-thun-lanh-uniqlo-1.jpg',b'0','2020-06-22','2020-07-18'),
(20,'SKU20','Chân váy xếp li',3,99,50000,200000,0,'https://cf.shopee.vn/file/1fbb08db5bebdf1cb4d049b9942be05f',b'0','2020-06-22','2020-06-25'),
(21,'SKU21','Chân váy công sở',3,99,50000,200000,0,'https://vn-test-11.slatic.net/original/a69e7d4583e5dc60cc114666db4c6783.jpg_720x720q80.jpg_.webp',b'0','2020-06-22','2020-07-12'),
(22,'SKU22','Chân váy kẻ caro',3,99,270000,400000,0,'https://vn-test-11.slatic.net/p/02dd188fc7a33b6263ffc4118a348fed.jpg_720x720q80.jpg_.webp',b'0','2020-06-22','2020-07-25'),
(23,'SKU23','Tất họa tiết',7,99,15000,60000,0,'https://storage.googleapis.com/cdn.nhanh.vn/store/26236/ps/20180408/50k0_495x495.png',b'0','2020-06-22','2020-07-18'),
(24,'SKU24','Tất lười',7,99,20000,56000,0,'https://salt.tikicdn.com/ts/tmp/bc/07/69/b8ab41f6c50262b1c180c2df2f34861f.bmp',b'0','2020-06-22','2020-07-18'),
(25,'SKU25','Tất len',7,99,20000,56000,0,'https://cf.shopee.vn/file/532e51abbc1cfdc8ae9a67034bbee713',b'0','2020-06-22','2020-08-05'),
(26,'SKU26','Thắt lưng dây xích',8,99,420000,990000,0,'https://vn-live-03.slatic.net/p/1fd54f60af5b1b0364dd660a2f1aac47.jpg',b'0','2020-06-22','2020-07-12'),
(27,'SKU27','Thắt lưng da bò',8,99,570000,800000,0,'https://vn-test-11.slatic.net/p/64d1e94767e00a21b410f629aa800ce3.jpg_720x720q80.jpg_.webp',b'0','2020-06-22','2020-07-25'),
(28,'SKU28','Khăn bandana',6,99,180000,300000,0,'https://cf.shopee.vn/file/33f876abf37d16910cab8ed6e3902795',b'0','2020-06-22','2020-06-25'),
(29,'SKU29','Khăn cashmere',6,99,310000,480000,0,'https://cf.shopee.vn/file/ee56a4f4e08f5f265a2d2b0b4a53da1d',b'0','2020-06-22','2020-07-18'),
(30,'SKU30','Túi xách nữ da rắn',4,99,2000000,6000000,0,'https://cf.shopee.vn/file/79189fb25e5b32e2482f4c81d991c1fa',b'0','2020-06-22','2020-06-25')
;


-- Create table `customer`

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
	`id` int NOT NULL AUTO_INCREMENT,
	`code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`gender` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`dob` date NULL DEFAULT NULL,
    `deleted` bit DEFAULT 0,
    `create_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP(),
	`update_on` timestamp NULL DEFAULT NULL, 
	PRIMARY KEY (`id`) 
);

INSERT INTO `customer` VALUES 
(1,'KH1','Nguyễn Văn B','0823456789','b@gmail.com','Hà Nội','Nam','1990-01-02',b'0','2020-08-21',Null),
(2,'KH2','Minh','0946810112','minh@gmail.com','Hà Nội','Nam','1999-08-04',b'0','2020-08-21',Null),
(3,'KH3','Quốc Anh','0987654321','anh@gmail.com','Hà Nội','Nam','1999-03-16',b'0','2020-08-21',Null),
(4,'KH4','Hinh','0923123123','hinh@gmail.com','Hà Nội','Nam','1998-09-10',b'0','2020-08-21',Null),
(5,'KH5','Thành','09424242424','thanh@gmail.com','Hà Nội','Nam','1999-10-21',b'0','2020-08-21',Null),
(6,'KH6','Hùng','0971468513','hung@gmail.com','Hà Nội','Nam','1998-09-02',b'0','2020-08-21',Null),
(7,'KH7','Phạm Tuân','0923123142','tuan@gmail.com','Đà Nẵng','Nam','1993-01-10',b'0','2020-08-21',Null),
(8,'KH8','Nguyễn Thoa','0888888888','thoa@gmail.com','Hà Nội','Nữ','1990-09-09',b'0','2020-08-21',Null),
(9,'KH9','Bá Ngọc','0934234394','ngoc@gmail.com','Hà Nội','Nữ','1998-09-08',b'0','2020-08-21',Null),
(10,'KH10','Hoàng Dũng','0989256275','dung@gmail.com','Hà Nội','Nam','1996-04-03',b'0','2020-08-21',Null),
(11,'KH11','Trần Hoàng','0926363582','hoang@gmail.com','Đà Lạt','Nam','1998-09-08',b'0','2020-08-21',Null),
(12,'KH12','Nguyễn Đức Cường','0868104800','denvau@gmail.com','Quảng Ninh','Nam','1990-03-25',b'0','2020-08-21',Null),
(13,'KH13','Nguyễn Thùy Chi','0981235679','chipu@gmail.com','Hà Nội','Nữ','1993-06-08',b'0','2020-08-21',Null),
(14,'KH14','Lê Nguyễn Trung Đan','0885543679','binz@gmail.com','Hồ Chí Minh','Nam','1988-02-17',b'0','2020-08-21',Null),
(15,'KH15','Phương Ly','0921831276','lyharu@gmail.com','Hà Nội','Nữ','1988-02-17',b'0','2020-08-21',Null)
;


-- Create table `bill`

DROP TABLE IF EXISTS `bill`;

CREATE TABLE `bill` (
	`id` int NOT NULL AUTO_INCREMENT,
	`code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`customer_id` int NOT NULL,
	`total_price` decimal(12,0) DEFAULT NULL,
	`discount` decimal(12,0) DEFAULT NULL,
	`cash_in` decimal(12,0) DEFAULT NULL,
	`cash_out` decimal(12,0) DEFAULT NULL,
	`note` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`create_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP(),
	PRIMARY KEY (`id`),
	CONSTRAINT `fk_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) 
	ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `bill` VALUES (1,'HD1',1,670000,0,670000,0,Null,'2020-06-22'),
(2,'HD2',2,1425000,0,1500000,75000,Null,'2020-06-22'),
(3,'HD3',3,40000,0,50000,10000,Null,'2020-06-22'),
(4,'HD4',4,2310000,0,2310000,0,Null,'2020-06-22'),
(5,'HD5',5,3000000,0,3000000,0,Null,'2020-06-22'),
(6,'HD6',6,2585000,0,2585000,0,Null,'2020-06-22'),
(7,'HD7',7,1500000,0,1500000,0,Null,'2020-06-22'),
(8,'HD8',8,990000,0,990000,0,Null,'2020-06-22'),
(9,'HD9',9,2470000,0,2470000,0,Null,'2020-06-22'),
(10,'HD10',10,3200000,0,3200000,0,Null,'2020-06-22'),
(11,'HD11',11,1500000,0,1500000,0,Null,'2020-06-22'),
(12,'HD12',12,1200000,0,1200000,0,Null,'2020-06-22'),
(13,'HD13',13,500000,0,500000,0,Null,'2020-06-22'),
(14,'HD14',14,8300000,0,8300000,0,Null,'2020-06-22'),
(15,'HD15',15,300000,0,300000,0,Null,'2020-06-22'),
(16,'HD16',1,8300000,0,8300000,0,Null,'2020-06-22'),
(17,'HD17',1,2470000,0,2470000,0,Null,'2020-06-22'),
(18,'HD18',1,1200000,0,1200000,0,Null,'2020-06-22'),
(19,'HD19',1,1200000,0,3300000,0,Null,'2020-06-22'),
(20,'HD20',1,2585000,0,2585000,0,Null,'2020-06-22')
;

-- Create table `bill_items`

DROP TABLE IF EXISTS `bill_items`;

CREATE TABLE `bill_items` (
	`bill_id` int NOT NULL,
    `prod_id` int NOT NULL,
    `price_out` decimal(12,0) NOT NULL,
	`quantity` int DEFAULT NULL,
    `discount` decimal(12,0) DEFAULT NULL,
	`total_price` decimal(12,0) DEFAULT NULL,
	PRIMARY KEY (`bill_id`, `prod_id`),
	CONSTRAINT `fk1_bill` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`) 
    ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `fk2_product` FOREIGN KEY (`prod_id`) REFERENCES `product` (`id`) 
    ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `bill_items` VALUES (1,1,25000,4,0,100000),
(1,2,290000,2,5000,570000),
(2,2,290000,5,5000,1425000),
(3,4,900000,2,0,1800000),
(4,3,460000,2,5000,910000),
(4,4,900000,1,0,900000),
(4,5,250000,2,0,500000),
(5,6,450000,2,0,900000),
(5,7,1500000,1,0,1500000),
(5,8,300000,2,0,600000),
(6,2,290000,1,5000,285000),
(6,5,250000,1,0,500000),
(7,12,500000,1,0,500000),
(7,16,500000,2,0,1000000),
(8,26,990000,1,0,990000),
(9,2,290000,1,0,290000),
(9,13,600000,2,0,1200000),
(9,26,990000,1,0,990000),
(9,25,56000,5,0,280000),
(10,10,2900000,5,0,2900000),
(10,28,300000,5,0,300000),
(11,4,900000,1,0,900000),
(11,8,300000,2,0,600000),
(12,15,1200000,1,0,1200000),
(13,21,200000,1,0,200000),
(13,28,300000,1,0,300000),
(14,9,500000,1,0,500000),
(14,18,700000,2,0,1400000),
(14,22,400000,1,0,400000),
(14,30,6000000,1,0,6000000),
(15,19,300000,1,0,300000),
(16,9,500000,1,0,500000),
(16,18,700000,2,0,1400000),
(16,22,400000,1,0,400000),
(16,30,6000000,1,0,6000000),
(17,2,290000,1,0,290000),
(17,13,600000,2,0,1200000),
(17,26,990000,1,0,990000),
(17,25,56000,5,0,280000),
(18,15,1200000,1,0,1200000),
(19,14,900000,2,0,1800000),
(19,7,1500000,1,0,1500000),
(20,2,290000,1,5000,285000),
(20,5,250000,1,0,500000)
;

-- Create table `feedback`

DROP TABLE IF EXISTS `feedback`;

CREATE TABLE `feedback` (
	`id` int NOT NULL AUTO_INCREMENT,
    `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `customer_id` int NOT NULL,
    `note` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `create_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP(),
	`update_on` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk1_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO `feedback` VALUES (1,"FB1",1,"Mọi thứ đều tốt.","2020-08-20",Null),
(2,"FB2",2,"Hàng hơi cũ.","2020-08-20",Null),
(3,"FB3",3,"Phục vụ tốt.","2020-08-21",Null),
(4,"FB4",4,"Dịch vụ tốt.","2020-08-20",Null),
(5,"FB5",5,"Tốt.","2020-08-20",Null),
(6,"FB6",6,"Nhân viên thân thiện.","2020-08-20",Null),
(7,"FB7",7,"Hàng mới.","2020-08-20",Null),
(8,"FB8",8,"Đóng gói đẹp.","2020-08-20",Null),
(9,"FB9",9,"Cần xem lại thái độ phục vụ của bảo vệ.","2020-08-20",Null),
(10,"FB10",10,"Khách muốn phiếu giảm giá cho lần tới do đã mua nhiều hàng.","2020-08-20",Null),
(11,"FB11",11,"Mọi thứ đều tốt","2020-08-20",Null),
(12,"FB12",12,"Phục vụ tốt","2020-08-20",Null),
(13,"FB13",13,"Khách yêu cầu thay đổi số điện thoại","2020-08-20",Null),
(14,"FB14",1,"Không có góp ý","2020-08-20",Null),
(15,"FB15",2,"Khách đang bận","2020-08-20",Null),
(16,"FB16",3,"Tốt","2020-08-20",Null),
(17,"FB17",4,"Hàng hóa chưa đa dạng","2020-08-20",Null),
(18,"FB18",5,"Tốt","2020-08-20",Null)
;


drop table `feedback`;
drop table `bill_items`;
drop table `bill`;
drop table `customer`;
drop table `product`;
drop table `category`;
drop table `app_user`;






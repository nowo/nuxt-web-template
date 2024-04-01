-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `admin` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`account` varchar(50),
	`username` varchar(30),
	`password` varchar(255),
	`avatar` varchar(255),
	`status` int(11) DEFAULT 1,
	`created_at` datetime(3) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)',
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `admin_account_key` UNIQUE(`account`)
);
--> statement-breakpoint
CREATE TABLE `company` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`company` varchar(100) NOT NULL,
	`address` varchar(200),
	`logo` varchar(255),
	`logo2` varchar(255),
	`qr_code` varchar(255),
	`phone` varchar(20),
	`email` varchar(50),
	`seo_keyword` varchar(100),
	`seo_description` varchar(200),
	`copyright` varchar(200),
	`created_at` datetime(3) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)',
	`updated_at` datetime(3) NOT NULL,
	`filing` varchar(100)
);
--> statement-breakpoint
CREATE TABLE `link` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`title` varchar(100),
	`title_en` varchar(100),
	`img` varchar(255),
	`href` varchar(255),
	`sort` int(11) DEFAULT 0,
	`type` int(11) DEFAULT 1,
	`isHide` tinyint NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)',
	`updated_at` datetime(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `menu` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`p_id` int(11) DEFAULT 0,
	`icon` varchar(50),
	`sort` int(11) DEFAULT 0,
	`title` varchar(100),
	`title_en` varchar(100),
	`created_at` datetime(3) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)',
	`updated_at` datetime(3) NOT NULL,
	`href` varchar(200)
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`title` varchar(100),
	`title_en` varchar(100),
	`author` varchar(100),
	`describe` varchar(200),
	`describe_en` varchar(200),
	`content` text,
	`content_en` text,
	`img` varchar(255),
	`sort` int(11) DEFAULT 0,
	`type` int(11) NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)',
	`updated_at` datetime(3) NOT NULL,
	`isHide` tinyint DEFAULT 0,
	`read` int(11) DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `other` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`title` varchar(100),
	`title_en` varchar(100),
	`img` varchar(255),
	`content` text,
	`content_en` text,
	`created_at` datetime(3) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)',
	`updated_at` datetime(3) NOT NULL,
	`type` int(11) NOT NULL DEFAULT 0,
	CONSTRAINT `other_type_key` UNIQUE(`type`)
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`title` varchar(100),
	`title_en` varchar(100),
	`author` varchar(100),
	`describe` varchar(200),
	`describe_en` varchar(200),
	`content` text,
	`content_en` text,
	`img` varchar(255),
	`sort` int(11) DEFAULT 0,
	`isHide` tinyint DEFAULT 0,
	`type` int(11) NOT NULL DEFAULT 0,
	`read` int(11) DEFAULT 0,
	`created_at` datetime(3) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)',
	`updated_at` datetime(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `system` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`title` varchar(100),
	`address` varchar(200),
	`logo` varchar(255),
	`logo2` varchar(255),
	`qr_code` varchar(255),
	`phone` varchar(20),
	`email` varchar(50),
	`keyword` varchar(100),
	`description` varchar(200),
	`filing` varchar(100),
	`copyright` varchar(200),
	`created_at` datetime(3) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)',
	`updated_at` datetime(3) NOT NULL,
	`icon` varchar(255)
);
--> statement-breakpoint
CREATE INDEX `menu_p_id_fkey` ON `menu` (`p_id`);
*/
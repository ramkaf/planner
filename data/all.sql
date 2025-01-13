INSERT INTO "user" 
(email, username, phone, password, "firstName", "lastName", "profilePictureUrl", "dateOfBirth", "roleId") 
VALUES
('ali.mohammad@example.com', 'alimohammad', '09123456789', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'علی', 'محمدی', 'https://example.com/profile1.jpg', '1985-04-21', 1),
('fatemeh.reza@example.com', 'fatemehreza', '09123456788', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'فاطمه', 'رضایی', 'https://example.com/profile2.jpg', '1990-05-10', 1),
('mohammad.ahmadi@example.com', 'mohammadahmadi', '09123456787', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'محمد', 'احمدی', 'https://example.com/profile3.jpg', '1988-06-15', 1),
('zahra.ali@example.com', 'zahraali', '09123456786', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'زهرا', 'علی‌پور', 'https://example.com/profile4.jpg', '1992-07-03', 1),
('hassan.jafari@example.com', 'hassanjafari', '09123456785', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'حسن', 'جافری', 'https://example.com/profile5.jpg', '1987-08-30', 1),
('mahdia.ghorbani@example.com', 'mahdiaghorbani', '09123456784', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'مهدیه', 'غیربی', 'https://example.com/profile6.jpg', '1994-09-12', 1),
('reza.nasiri@example.com', 'rezanasiri', '09123456783', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'رضا', 'نصیری', 'https://example.com/profile7.jpg', '1991-02-14', 1),
('mohammad.reza@example.com', 'mohammadreza', '09123456782', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'محمدرضا', 'سهرابی', 'https://example.com/profile8.jpg', '1989-03-22', 1),
('niloofar.mohseni@example.com', 'niloofarmohseni', '09123456781', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'نیلوفر', 'محسنی', 'https://example.com/profile9.jpg', '1993-10-01', 1),
('saeed.hosseini@example.com', 'saeedhosseini', '09123456780', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'سعید', 'حسینی', 'https://example.com/profile10.jpg', '1986-11-20', 1);



INSERT INTO tag (name) VALUES
('فرهنگ'),
('هنر'),
('ورزش'),
('تکنولوژی'),
('سینما'),
('موسیقی'),
('تاریخ'),
('کتاب'),
('ادبیات'),
('فلسفه'),
('علوم'),
('کامپیوتر'),
('ریاضیات'),
('روانشناسی'),
('عکاسی'),
('مسافرت'),
('آشپزی'),
('سلامت'),
('محیط زیست'),
('آموزش');

INSERT INTO category (name, description, icon) VALUES
('فناوری', 'دسته‌بندی مرتبط با فناوری‌های نوین', 'tech-icon'),
('موسیقی', 'دسته‌بندی مرتبط با انواع موسیقی', 'music-icon'),
('کتاب', 'دسته‌بندی مربوط به انواع کتاب‌ها', 'book-icon'),
('ورزش', 'دسته‌بندی مربوط به ورزش‌های مختلف', 'sport-icon'),
('سینما', 'دسته‌بندی مرتبط با فیلم‌ها و سینما', 'cinema-icon'),
('هنر', 'دسته‌بندی مرتبط با هنرهای مختلف', 'art-icon'),
('علم', 'دسته‌بندی مربوط به علوم و تحقیقات', 'science-icon'),
('طبیعت', 'دسته‌بندی مرتبط با طبیعت و محیط زیست', 'nature-icon'),
('تاریخ', 'دسته‌بندی مربوط به تاریخ و اتفاقات گذشته', 'history-icon'),
('سیاست', 'دسته‌بندی مرتبط با سیاست و اخبار سیاسی', 'politics-icon'),
('آشپزی', 'دسته‌بندی مربوط به غذا و آشپزی', 'cooking-icon'),
('مد و فشن', 'دسته‌بندی مربوط به مد و فشن', 'fashion-icon'),
('سفر', 'دسته‌بندی مربوط به گردشگری و سفرها', 'travel-icon'),
('بازی', 'دسته‌بندی مربوط به بازی‌های ویدیویی', 'gaming-icon'),
('اقتصاد', 'دسته‌بندی مربوط به مسائل اقتصادی و بازار', 'economy-icon'),
('معماری', 'دسته‌بندی مربوط به طراحی و معماری', 'architecture-icon'),
('سلامت', 'دسته‌بندی مربوط به سلامت و بهداشت', 'health-icon'),
('آموزش', 'دسته‌بندی مربوط به آموزش و یادگیری', 'education-icon'),
('روحانیت', 'دسته‌بندی مربوط به دین و معنویت', 'spirituality-icon'),
('خودرو', 'دسته‌بندی مربوط به خودروها و صنعت خودروسازی', 'car-icon');

INSERT INTO author ("firstName", "lastName", bio, "profilePictureUrl", "isActive")
VALUES
    ('علی', 'رضایی', 'مدرس هنرهای تجسمی با ۱۰ سال تجربه.', 'https://example.com/ali_rezaei.jpg', true),
    ('زهرا', 'کریمی', 'مدرس زبان انگلیسی و مترجم حرفه‌ای.', 'https://example.com/zahra_karimi.jpg', true),
    ('محمد', 'نجفی', 'مدرس دوره‌های بازاریابی و مدیریت.', 'https://example.com/mohammad_najafi.jpg', true),
    ('فاطمه', 'هاشمی', 'مدرس موسیقی سنتی و آواز.', 'https://example.com/fatemeh_hashemi.jpg', true),
    ('رضا', 'جعفری', 'مدرس طراحی و معماری داخلی.', 'https://example.com/reza_jafari.jpg', true),
    ('لیلا', 'احمدی', 'مدرس رقص و حرکات موزون.', 'https://example.com/leila_ahmadi.jpg', true),
    ('کامران', 'مرادی', 'مدرس برنامه‌نویسی و توسعه نرم‌افزار.', 'https://example.com/kamran_moradi.jpg', true),
    ('مریم', 'صادقی', 'مدرس آشپزی و هنرهای آشپزخانه.', 'https://example.com/maryam_sadeghi.jpg', true),
    ('حسین', 'شفیعی', 'مدرس ورزش‌های رزمی و دفاع شخصی.', 'https://example.com/hossein_shafiei.jpg', true),
    ('سارا', 'نوری', 'مدرس خلاقیت و نوآوری.', 'https://example.com/sara_nouri.jpg', true),
    ('مجید', 'کاظمی', 'مدرس فناوری اطلاعات و شبکه.', 'https://example.com/majid_kazemi.jpg', true),
    ('الهام', 'رستمی', 'مدرس صنایع دستی و هنرهای محلی.', 'https://example.com/elham_rostami.jpg', true),
    ('عادل', 'عباسی', 'مدرس کارآفرینی و مدیریت کسب‌وکار.', 'https://example.com/adel_abbasi.jpg', true),
    ('زهرا', 'محبی', 'مدرس عکاسی و فیلم‌سازی.', 'https://example.com/zahra_mohbi.jpg', true),
    ('پژمان', 'شریفی', 'مدرس طراحی گرافیک و دیجیتال.', 'https://example.com/pejman_sharifi.jpg', true),
    ('نفیسه', 'اکبری', 'مدرس هنرهای نمایشی و بازیگری.', 'https://example.com/nafiseh_akbari.jpg', true),
    ('حسن', 'یوسفی', 'مدرس خوشنویسی و خطاطی.', 'https://example.com/hasan_yousefi.jpg', true),
    ('سپیده', 'قاسمی', 'مدرس روان‌شناسی و مشاوره.', 'https://example.com/sepideh_ghasemi.jpg', true),
    ('امیر', 'حسینی', 'مدرس زبان فرانسوی.', 'https://example.com/amir_hosseini.jpg', true),
    ('نازنین', 'توکلی', 'مدرس یوگا و مراقبه.', 'https://example.com/nazanin_tavakoli.jpg', true);

INSERT INTO address (title, description, province, city, region, "mainStreet", "subStreet", alley, code, unit)
VALUES
('خانه', 'خانه اصلی من', 'تهران', 'تهران', 'منطقه ۲', 'خیابان ولیعصر', 'کوچه یاس', 'بن‌بست گل', '12345-6789', '2'),
('محل کار', 'دفتر کار شرکت', 'تهران', 'تهران', 'منطقه ۳', 'خیابان مطهری', 'کوچه فرهنگ', 'بن‌بست صبا', '23456-7890', '1'),
('خانه پدری', 'آدرس خانه پدری', 'اصفهان', 'اصفهان', 'ناژوان', 'خیابان چهارباغ بالا', 'کوچه نارنج', 'بن‌بست مهر', '34567-8901', '3'),
('ویلا شمال', 'ویلا در شمال کشور', 'مازندران', 'چالوس', 'رامسر', 'بلوار معلم', 'کوچه آرام', 'بن‌بست آفتاب', '45678-9012', '1'),
('خانه باغ', 'خانه با باغ بزرگ', 'کرج', 'کرج', 'منطقه فردیس', 'خیابان سرو', 'کوچه شکوفه', 'بن‌بست گلستان', '56789-0123', '1'),
('محل استراحت', 'ویلای شخصی', 'گیلان', 'رشت', 'منطقه آزاد', 'خیابان گلسار', 'کوچه نوین', 'بن‌بست آبی', '67890-1234', '2'),
('خانه دوست', 'آدرس دوست من', 'خراسان رضوی', 'مشهد', 'منطقه احمدآباد', 'خیابان امام رضا', 'کوچه امید', 'بن‌بست یاس', '78901-2345', '4'),
('دفتر مرکزی', 'دفتر اصلی شرکت', 'تهران', 'تهران', 'منطقه ۶', 'خیابان انقلاب', 'کوچه آزادی', 'بن‌بست بهار', '89012-3456', '3'),
('خانه جدید', 'خانه تازه خریداری شده', 'شیراز', 'شیراز', 'بلوار چمران', 'خیابان نیایش', 'کوچه صنوبر', 'بن‌بست گل یاس', '90123-4567', '5'),
('خانه مادر', 'آدرس مادر', 'تبریز', 'تبریز', 'منطقه ایل گلی', 'خیابان آزادی', 'کوچه باران', 'بن‌بست سپید', '01234-5678', '6');


INSERT INTO event (
    name, description, date, price, capacity, organizer_name, organizer_contact, seen, image_url, status, category_id, author_id, user_id, address_id
)
VALUES
('همایش تکنولوژی نوین', 'بررسی تکنولوژی‌های جدید و نوآوری‌های آینده', '2025-01-15', 100, 200, 'علی حسینی', '09121234567', 50, 'https://example.com/tech.jpg', 'Scheduled', 1, 1, 1, 1),
('کارگاه طراحی سایت', 'آموزش طراحی سایت با ابزارهای مدرن', '2025-02-01', 150, 50, 'زهرا محمدی', '09123456789', 30, 'https://example.com/web.jpg', 'Scheduled', 2, 2, 2, 2),
('سمینار کسب و کار', 'راهکارهای موفقیت در کسب و کارهای نوپا', '2025-03-10', 200, 100, 'محمد امیری', '09131112233', 60, 'https://example.com/business.jpg', 'Scheduled', 3, 3, 3, 3),
('دوره بازاریابی دیجیتال', 'آموزش بازاریابی دیجیتال برای مبتدیان', '2025-04-20', 120, 70, 'سارا احمدی', '09132223344', 40, 'https://example.com/marketing.jpg', 'Scheduled', 4, 4, 4, 4),
('نمایشگاه کتاب', 'نمایشگاه جدیدترین کتاب‌های فارسی و انگلیسی', '2025-05-05', 50, 500, 'رضا حسنی', '09134445566', 200, 'https://example.com/book.jpg', 'Scheduled', 5, 5, 5, 5),
('کنسرت موسیقی کلاسیک', 'اجرای زنده موسیقی کلاسیک توسط هنرمندان برجسته', '2025-06-18', 300, 150, 'مینا رضایی', '09135556677', 120, 'https://example.com/music.jpg', 'Scheduled', 6, 6, 6, 6),
('کنفرانس علمی پژوهشی', 'ارائه مقالات و پژوهش‌های علمی جدید', '2025-07-15', 250, 300, 'امیر کریمی', '09136667788', 80, 'https://example.com/science.jpg', 'Scheduled', 7, 7, 7, 7),
('همایش پزشکی', 'آشنایی با تکنولوژی‌های جدید در پزشکی', '2025-08-25', 400, 250, 'لیلا موسوی', '09137778899', 100, 'https://example.com/medicine.jpg', 'Scheduled', 8, 8, 8, 8),
('کارگاه هنرهای تجسمی', 'آموزش نقاشی و طراحی برای همه سنین', '2025-09-05', 180, 80, 'حسین عباسی', '09138889900', 50, 'https://example.com/art.jpg', 'Scheduled', 9, 9, 9, 9),
('نمایشگاه فناوری اطلاعات', 'نمایش آخرین دستاوردهای فناوری اطلاعات', '2025-10-15', 500, 1000, 'محمدرضا کاظمی', '09139990011', 300, 'https://example.com/it.jpg', 'Scheduled', 10, 10, 10, 10),
('وبینار مدیریت مالی', 'آموزش مدیریت مالی شخصی و سازمانی', '2025-01-10', 75, 150, 'شادی رحیمی', '09121000022', 40, 'https://example.com/finance.jpg', 'Scheduled', 1, 2, 3, 4),
('نمایشگاه صنایع دستی', 'آشنایی با هنرهای دستی ایرانی', '2025-02-20', 50, 400, 'پریسا جباری', '09121111133', 90, 'https://example.com/crafts.jpg', 'Scheduled', 2, 3, 4, 5),
('کنفرانس مدیریت پروژه', 'راهکارهای موفقیت در مدیریت پروژه', '2025-03-30', 220, 120, 'فرهاد نظری', '09122222244', 55, 'https://example.com/project.jpg', 'Scheduled', 3, 4, 5, 6),
('نمایشگاه گردشگری', 'معرفی مکان‌های گردشگری جدید', '2025-04-25', 60, 600, 'مهدی صادقی', '09123333355', 150, 'https://example.com/travel.jpg', 'Scheduled', 4, 5, 6, 7),
('کنسرت موسیقی سنتی', 'اجرای زنده موسیقی سنتی ایران', '2025-05-10', 350, 200, 'نیلوفر معینی', '09124444466', 140, 'https://example.com/traditional.jpg', 'Scheduled', 5, 6, 7, 8),
('همایش آموزشی', 'آموزش موضوعات علمی و فناوری جدید', '2025-06-15', 100, 300, 'زهرا بیگی', '09125555577', 70, 'https://example.com/education.jpg', 'Scheduled', 6, 7, 8, 9),
('کارگاه عکاسی', 'آموزش عکاسی حرفه‌ای برای مبتدیان', '2025-07-25', 250, 60, 'پویان رضایی', '09126666688', 30, 'https://example.com/photography.jpg', 'Scheduled', 7, 8, 9, 10),
('نمایشگاه خودرو', 'نمایش جدیدترین مدل‌های خودرو', '2025-08-05', 400, 800, 'آرش کریمی', '09127777799', 200, 'https://example.com/car.jpg', 'Scheduled', 8, 9, 10, 1),
('کارگاه موسیقی', 'آموزش نواختن سازهای موسیقی', '2025-09-15', 300, 100, 'بهناز جباری', '09128888800', 100, 'https://example.com/instruments.jpg', 'Scheduled', 9, 10, 1, 2),
('همایش کارآفرینی', 'راهکارهای موفقیت در کارآفرینی', '2025-10-20', 180, 150, 'رضا نوروزی', '09129999911', 70, 'https://example.com/entrepreneurship.jpg', 'Scheduled', 10, 1, 2, 3),
('کنفرانس علوم کامپیوتر', 'بررسی تکنولوژی‌های جدید در علوم کامپیوتر', '2025-11-25', 270, 200, 'امین محمدی', '09120000022', 90, 'https://example.com/cs.jpg', 'Scheduled', 1, 3, 5, 7),
('نمایشگاه عطر و ادکلن', 'معرفی جدیدترین عطرها و ادکلن‌ها', '2025-12-10', 90, 300, 'مهدی طاهری', '09121111234', 40, 'https://example.com/perfume.jpg', 'Scheduled', 2, 4, 6, 8),
('کارگاه فیلم‌سازی', 'آموزش ساخت فیلم کوتاه برای علاقه‌مندان', '2025-12-20', 350, 70, 'زهرا نوری', '09122222345', 30, 'https://example.com/film.jpg', 'Scheduled', 3, 5, 7, 9),
('سمینار روابط عمومی', 'آشنایی با تکنیک‌های جدید روابط عمومی', '2025-12-30', 100, 200, 'فرزانه رضوی', '09123333456', 50, 'https://example.com/pr.jpg', 'Scheduled', 4, 6, 8, 10),
('کارگاه نویسندگی', 'آموزش نویسندگی خلاق برای علاقه‌مندان', '2026-01-10', 150, 100, 'امیر رستمی', '09124444567', 80, 'https://example.com/writing.jpg', 'Scheduled', 5, 7, 9, 1),
('همایش سلامت', 'راهکارهای جدید برای زندگی سالم', '2026-01-20', 200, 300, 'زهرا نظری', '09125555678', 100, 'https://example.com/health.jpg', 'Scheduled', 6, 8, 10, 2),
('کنفرانس امنیت سایبری', 'آشنایی با تهدیدات امنیتی و روش‌های مقابله', '2026-02-05', 400, 250, 'پرهام جلالی', '09126666789', 150, 'https://example.com/cybersecurity.jpg', 'Scheduled', 7, 9, 1, 3),
('کارگاه تحلیل داده', 'آموزش تحلیل داده‌های بزرگ', '2026-02-15', 180, 150, 'بهار احمدی', '09127777890', 70, 'https://example.com/data.jpg', 'Scheduled', 8, 10, 2, 4),
('نمایشگاه هوش مصنوعی', 'نمایش دستاوردهای جدید هوش مصنوعی', '2026-03-05', 500, 500, 'رضا پارسی', '09128888901', 250, 'https://example.com/ai.jpg', 'Scheduled', 9, 1, 3, 5),
('همایش مهندسی برق', 'بررسی موضوعات جدید در مهندسی برق', '2026-03-15', 250, 200, 'امید شریفی', '09129999012', 100, 'https://example.com/electrical.jpg', 'Scheduled', 10, 2, 4, 6);


INSERT INTO event_tags_tag ("eventId", "tagId")
VALUES
(1, 1), (1, 2), (1, 3),         -- Event 1 linked to Tags 1, 2, 3
(2, 4), (2, 5), (2, 6),         -- Event 2 linked to Tags 4, 5, 6
(3, 7), (3, 8),                 -- Event 3 linked to Tags 7, 8
(4, 9), (4, 10),                -- Event 4 linked to Tags 9, 10
(5, 1), (5, 3), (5, 5),         -- Event 5 linked to Tags 1, 3, 5
(6, 2), (6, 4), (6, 6),         -- Event 6 linked to Tags 2, 4, 6
(7, 7), (7, 8),                 -- Event 7 linked to Tags 7, 8
(8, 9), (8, 10),                -- Event 8 linked to Tags 9, 10
(9, 1), (9, 4), (9, 7),         -- Event 9 linked to Tags 1, 4, 7
(10, 2), (10, 5), (10, 8),      -- Event 10 linked to Tags 2, 5, 8
(11, 3), (11, 6), (11, 9),      -- Event 11 linked to Tags 3, 6, 9
(12, 10), (12, 1),              -- Event 12 linked to Tags 10, 1
(13, 2), (13, 4),               -- Event 13 linked to Tags 2, 4
(14, 5), (14, 7),               -- Event 14 linked to Tags 5, 7
(15, 8), (15, 10),              -- Event 15 linked to Tags 8, 10
(16, 1), (16, 6), (16, 9),      -- Event 16 linked to Tags 1, 6, 9
(17, 2), (17, 5), (17, 8),      -- Event 17 linked to Tags 2, 5, 8
(18, 3), (18, 7),               -- Event 18 linked to Tags 3, 7
(19, 4), (19, 9),               -- Event 19 linked to Tags 4, 9
(20, 6), (20, 10),              -- Event 20 linked to Tags 6, 10
(21, 1), (21, 8),               -- Event 21 linked to Tags 1, 8
(22, 2), (22, 7),               -- Event 22 linked to Tags 2, 7
(23, 3), (23, 10),              -- Event 23 linked to Tags 3, 10
(24, 4), (24, 6),               -- Event 24 linked to Tags 4, 6
(25, 5), (25, 9),               -- Event 25 linked to Tags 5, 9
(26, 1), (26, 3), (26, 7),      -- Event 26 linked to Tags 1, 3, 7
(27, 2), (27, 4), (27, 8),      -- Event 27 linked to Tags 2, 4, 8
(28, 6), (28, 9),               -- Event 28 linked to Tags 6, 9
(29, 5), (29, 10),              -- Event 29 linked to Tags 5, 10
(30, 1), (30, 2), (30, 3);      -- Event 30 linked to Tags 1, 2, 3


INSERT INTO review (user_id, event_id, content, rating)
SELECT
    (1 + (random() * 9)::int) AS user_id,  -- Random userId between 1 and 10
    (1 + (random() * 29)::int) AS event_id,  -- Random eventId between 25 and 40
    'Sample review content for event ' || (25 + (random() * 15)::int) AS content,  -- Dynamic content
    (1 + (random() * 4)::int) AS rating  -- Random rating between 1 and 5 (ensured by using random number between 1 and 5)
FROM generate_series(1, 50);  -- Generate 50 rows

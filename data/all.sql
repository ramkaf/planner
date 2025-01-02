INSERT INTO "user" 
(email, username, phone, password, "firstName", "lastName", "profilePictureUrl", "dateOfBirth", role) 
VALUES
('ali.mohammad@example.com', 'alimohammad', '09123456789', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'علی', 'محمدی', 'https://example.com/profile1.jpg', '1985-04-21', 'user'),
('fatemeh.reza@example.com', 'fatemehreza', '09123456788', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'فاطمه', 'رضایی', 'https://example.com/profile2.jpg', '1990-05-10', 'user'),
('mohammad.ahmadi@example.com', 'mohammadahmadi', '09123456787', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'محمد', 'احمدی', 'https://example.com/profile3.jpg', '1988-06-15', 'user'),
('zahra.ali@example.com', 'zahraali', '09123456786', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'زهرا', 'علی‌پور', 'https://example.com/profile4.jpg', '1992-07-03', 'user'),
('hassan.jafari@example.com', 'hassanjafari', '09123456785', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'حسن', 'جافری', 'https://example.com/profile5.jpg', '1987-08-30', 'user'),
('mahdia.ghorbani@example.com', 'mahdiaghorbani', '09123456784', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'مهدیه', 'غیربی', 'https://example.com/profile6.jpg', '1994-09-12', 'user'),
('reza.nasiri@example.com', 'rezanasiri', '09123456783', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'رضا', 'نصیری', 'https://example.com/profile7.jpg', '1991-02-14', 'user'),
('mohammad.reza@example.com', 'mohammadreza', '09123456782', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'محمدرضا', 'سهرابی', 'https://example.com/profile8.jpg', '1989-03-22', 'user'),
('niloofar.mohseni@example.com', 'niloofarmohseni', '09123456781', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'نیلوفر', 'محسنی', 'https://example.com/profile9.jpg', '1993-10-01', 'user'),
('saeed.hosseini@example.com', 'saeedhosseini', '09123456780', '$2b$10$2yAnZZDjAxKo1eVtAGGHa.f7aOr8pb14es0dXmQjqXZBx7yuLdnxi', 'سعید', 'حسینی', 'https://example.com/profile10.jpg', '1986-11-20', 'user');



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

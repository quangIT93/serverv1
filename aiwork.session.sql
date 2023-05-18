-- 2 . Văn phòng
-- 3. Khách sạn/ Nhà hàng
-- 4.IT/ Programing
-- 5.Design
-- 6.Marketing
-- 7.Lao động phổ thông 
-- 8.Ngân hàng 
-- 9.Beauty & Spa
-- 10.Xuất nhập khẩu 
-- 11.Dịch vụ 
-- 12. Giáo dục- Đào tạo
-- 13.Dịch thuật (번역)
-- 14.Khoa học-Kỹ thuật
-- 15. Chuyển nhà/ Vệ sinh
-- 16. Ngành khác

UPDATE parent_categories
SET id = CASE
    WHEN id = 20 THEN 1
    WHEN id = 40 THEN 9
    WHEN id = 60 THEN 3
    WHEN id = 80 THEN 7
    WHEN id = 100 THEN 12
    WHEN id = 120 THEN 18
    WHEN id = 140 THEN 2
    WHEN id = 160 THEN 5
    WHEN id = 180 THEN 4
    WHEN id = 200 THEN 6
    WHEN id = 220 THEN 10
    WHEN id = 240 THEN 8
    WHEN id = 260 THEN 13
    WHEN id = 280 THEN 14
    WHEN id = 300 THEN 11
    WHEN id = 320 THEN 15
    WHEN id = 340 THEN 17
    ELSE id
    END
WHERE id IN (20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340);

-- update parent_categories set id = id * 20;
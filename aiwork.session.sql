SELECT t.*,  
wards.full_name as ward,   
wards.name as ward_name,  
districts.id as district_id,  
districts.full_name as district,   
districts.name as district_name,  
provinces.full_name as province,  
provinces.name as province_name,  
provinces.id as province_id,  
post_images.image as image,  
salary_types.value as salary_type  
FROM (  
SELECT  
applications.id,  
applications.post_id,  
posts.account_id,  
posts.title,  
posts.company_name,     
posts.address,  
posts.ward_id,  
applications.status,  
'application' as type,  
applications.created_at,  
NULL as num_of_application,  
posts.start_date,  
posts.end_date,  
posts.salary_min,  
posts.salary_max,  
posts.salary_type as salary_type_id, 
posts.money_type,  
applications.updated_at 
FROM applications  
LEFT JOIN posts ON applications.post_id = posts.id  
WHERE applications.account_id = "4d207f7c-d443-476b-af9a-b59da47560a9" 
UNION SELECT  
posts.id,  
posts.id as post_id,  
posts.account_id,  
posts.title,  
posts.company_name,  
posts.address,  
posts.ward_id,  
posts.status,  
'post' as type,  
posts.created_at,  
COUNT(applications.id) as num_of_application,  
posts.start_date,  
posts.end_date,  
posts.salary_min,  
posts.salary_max,  
posts.salary_type as salary_type_id, 
posts.money_type,  
COALESCE((SELECT MAX(updated_at) FROM applications WHERE post_id = posts.id), posts.updated_at) 
FROM posts  
LEFT JOIN applications ON applications.post_id = posts.id  
WHERE posts.account_id = "4d207f7c-d443-476b-af9a-b59da47560a9"  
GROUP BY posts.id  
) as t  
LEFT JOIN wards ON wards.id = t.ward_id  
LEFT JOIN salary_types ON salary_types.id = t.salary_type_id  
LEFT JOIN districts ON districts.id = wards.district_id  
LEFT JOIN provinces ON provinces.id = districts.province_id  
LEFT JOIN (SELECT DISTINCT post_id, image FROM post_images GROUP BY post_id)  
as post_images ON post_images.post_id = t.post_id  
ORDER BY updated_at DESC;
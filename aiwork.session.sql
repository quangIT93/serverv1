SELECT themes.id, 
themes.title, 
themes.image, 
themes.district_id, 
COUNT(themes_posts.post_id) AS number_of_posts 
FROM themes 
LEFT JOIN themes_posts 
ON themes_posts.theme_id = themes.id 
LEFT JOIN posts 
ON posts.id = themes_posts.post_id 
LEFT JOIN districts 
ON districts.id = themes.district_id 
WHERE themes.status = 1 AND posts.status = 1
AND districts.province_id IN ("79") 
GROUP BY themes.id
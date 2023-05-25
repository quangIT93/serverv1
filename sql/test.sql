-- if district_status is 0 then don't check district_id
-- if category_status is 0 then don't check category_id

SELECT keywords_notification.*
FROM keywords_notification
LEFT JOIN wards
ON wards.id = "00001"
LEFT JOIN child_categories
ON child_categories.id IN (422,423)
WHERE "Tuyen Ke toan abc" LIKE CONCAT('%', keywords_notification.keyword, '%')
AND (keywords_notification.district_status = 0 OR keywords_notification.district_id = wards.district_id)
AND (keywords_notification.category_status = 0 OR keywords_notification.category_id = child_categories.parent_category_id)
GROUP BY keywords_notification.account_id
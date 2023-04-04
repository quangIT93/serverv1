SELECT DATE_FORMAT(created_at, '%d/%m/%Y') as date, COUNT(*) as quantity 
FROM posts 
WHERE account_id = "4d207f7c-d443-476b-af9a-b59da47560a9"
AND DATE(created_at) = CURDATE()

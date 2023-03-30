SELECT DATE_FORMAT(created_at, 'DD-MM-YYYY') as date, COUNT(*) as quantity 
FROM posts 
WHERE account_id = "4d207f7c-d443-476b-af9a-b59da47560a9"
GROUP BY DAY(created_at) 
ORDER BY date ASC;
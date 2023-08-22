-- explain
SELECT
        posts.id,
        posts.account_id,
        posts.title,
        posts.company_name,
        posts.ward_id,
        posts.start_date,
        posts.end_date,
        posts.start_time,
        posts.end_time,
        posts.salary_min,
        posts.salary_max,
        posts.salary_type as salary_type_id,
        posts.money_type,
        posts.created_at,
        posts.status,
        posts.is_inhouse_data,
        posts.job_type,
        wards.name as ward_name,
        districts.id as district_id,
        districts.name as district_name,
        provinces.name as province_name,
        provinces.id as province_id,
        post_images.image AS image,
        posts.expired_date,
        company_resource.icon as company_resource_icon,
        parent_categories.default_post_image
        FROM posts use index (idx_sort_fields)
    INNER JOIN wards
    ON wards.id = posts.ward_id
    INNER JOIN districts
    ON districts.id = wards.district_id
    INNER JOIN provinces
    ON provinces.id = districts.province_id
    INNER JOIN salary_types
    ON salary_types.id = posts.salary_type
    LEFT JOIN post_images
    ON post_images.post_id = posts.id AND (post_images.type = 1 OR NOT EXISTS (SELECT * FROM post_images WHERE post_images.post_id = posts.id LIMIT 1))
    INNER JOIN company_resource
    ON company_resource.id = posts.company_resource_id
    INNER JOIN job_types
    ON job_types.id = posts.job_type
    INNER JOIN (SELECT * from posts_categories GROUP BY post_id) as posts_categories
    ON posts.id = posts_categories.post_id
    INNER JOIN child_categories 
    ON child_categories.id = posts_categories.category_id
    INNER JOIN parent_categories
    ON parent_categories.id = child_categories.parent_category_id
where posts.status = 1 
order by created_at_date DESC, field(company_resource_id,2) desc, id desc
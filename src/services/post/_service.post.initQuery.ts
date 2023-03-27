const initQueryReadPost = {
    q1: "SELECT " +
    "posts.id," +
    "posts.account_id," +
    "posts.title," +
    "posts.company_name," +
    "posts.ward_id," +
    "posts.start_date," +
    "posts.end_date," +
    "posts.start_time," +
    "posts.end_time," +
    "posts.salary_min," +
    "posts.salary_max," +
    "posts.salary_type as salary_type_id," +
    "posts.money_type," +
    "posts.created_at," +
    "wards.full_name as ward," + 
    "wards.name as ward_name," +
    "districts.id as district_id," +
    "districts.full_name as district," + 
    "districts.name as district_name," +
    "provinces.full_name as province," +
    "provinces.name as province_name," +
    "provinces.id as province_id," +
    "salary_types.value as salary_type, " +
    "post_images.image AS image " +
    "FROM posts " +
    "LEFT JOIN wards " +
    "ON wards.id = posts.ward_id " +
    "LEFT JOIN districts " +
    "ON districts.id = wards.district_id " +
    "LEFT JOIN provinces " +
    "ON provinces.id = districts.province_id " +
    "LEFT JOIN post_images " +
    "ON post_images.post_id = posts.id " +
    "LEFT JOIN salary_types " +
    "ON salary_types.id = posts.salary_type ",
    q2: "SELECT " +
    "posts.id," +
    "posts.status," +
    "posts.account_id," +
    "posts.title," +
    "posts.company_name," +
    "posts.address," +
    "posts.latitude," +
    "posts.longitude," +
    "posts.ward_id," +
    "posts.is_date_period," +
    "posts.is_working_weekend," +
    "posts.is_remotely," +
    "posts.start_date," +
    "posts.end_date," +
    "posts.start_time," +
    "posts.end_time," +
    "posts.salary_min," +
    "posts.salary_max," +
    "posts.salary_type as salary_type_id," +
    "posts.money_type," +
    "posts.description," +
    "posts.phone_contact," +
    "posts.is_inhouse_data," +
    "posts.created_at," +
    "wards.full_name as ward," + 
    "wards.name as ward_name," +
    "districts.id as district_id," +
    "districts.full_name as district," + 
    "districts.name as district_name," +
    "provinces.full_name as province," +
    "provinces.name as province_name," +
    "provinces.id as province_id," +
    "salary_types.value as salary_type, " +
    "post_images.image AS image, " +
    "profiles.avatar as avatar_poster " +
    "FROM posts " +
    "LEFT JOIN wards " +
    "ON wards.id = posts.ward_id " +
    "LEFT JOIN districts " +
    "ON districts.id = wards.district_id " +
    "LEFT JOIN provinces " +
    "ON provinces.id = districts.province_id " +
    "LEFT JOIN post_images " +
    "ON post_images.post_id = posts.id " +
    "LEFT JOIN salary_types " +
    "ON salary_types.id = posts.salary_type " +
    "LEFT JOIN profiles " +
    "ON profiles.id = posts.account_id "    
}

export default initQueryReadPost;
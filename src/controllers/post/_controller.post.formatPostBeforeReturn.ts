import MoneyType from "../../enum/money_type.enum";

function formatPostBeforeReturn(post) {
    if (post) {
        if (post.start_date !== undefined) {
            post.start_date = +post.start_date || null;
        }
        if (post.end_date !== undefined) {
            post.end_date = +post.end_date || null;
        }
        if (post.start_time !== undefined) {
            post.start_time = +post.start_time || null;
        }
        if (post.end_time !== undefined) {
            post.end_time = +post.end_time || null;
        }
        if (post.created_at !== undefined) {
            post.created_at = new Date(post.created_at).getTime();
        }
        if (post.money_type !== undefined) {
            post.money_type = +post.money_type;
            post.money_type_text = MoneyType[post.money_type];
        }
        if (post.latitude !== undefined) {
            post.latitude = parseFloat(post.latitude) || null;
        }
        if (post.longitude !== undefined) {
            post.longitude = parseFloat(post.longitude) || null;
        }

        if (post.is_remotely !== undefined) {
            post.is_remotely = +post.is_remotely;
            // post.is_remotely_value = +post.is_remotely ? true : false;
        }

        if (post.is_inhouse_data !== undefined) {
            post.is_inhouse_data = +post.is_inhouse_data;
            // post.is_inhouse_data_value = +post.is_inhouse_data ? true : false;
        }

        if (post.phone_contact !== undefined) {
            post.phone_contact = "+" + post.phone_contact || null;
        }

        if (post.image !== undefined && post.image !== null) {
            post.image = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/` + post.image;
        }

    }
    return post;
}

// function formatPostBeforeReturn2(post) {
//     if (post) {
//         post.start_date = +post.start_date || null;
//         post.end_date = +post.end_date || null;
//         post.start_time = +post.start_time || null;
//         post.end_time = +post.end_time || null;
//         post.created_at = new Date(post.created_at).getTime();
//         post.money_type = +post.money_type;
//         post.money_type_text = MoneyType[post.money_type];
//         post.salary_min = parseFloat(post.salary_min) || null;
//         post.salary_max = parseFloat(post.salary_max) || null;
//         post.salary_type = +post.salary_type;
//     }
//     return post;
// }

export { formatPostBeforeReturn };

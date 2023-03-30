import ImageBucket from "../../enum/imageBucket.enum";
import MoneyType from "../../enum/money_type.enum";
import { readDefaultPostImageByPostId } from "../../services/category/_service.category";


async function formatPostBeforeReturn (post, lang = "vi") {
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
        }

        if (post.is_inhouse_data !== undefined) {
            post.is_inhouse_data = +post.is_inhouse_data;
        }

        if (post.phone_contact !== undefined) {
            post.phone_contact = "+" + post.phone_contact || null;
        }

        if (post.image !== undefined && post.image !== null) {
            post.image = `${process.env.AWS_BUCKET_IMAGE_URL}/${ImageBucket.POST_IMAGES}/${post.post_id || post.id}/` + post.image;
        } else {
                const firstParentCategoryImage =
                    await readDefaultPostImageByPostId(
                        post.post_id || post.id,
                    );
                if (!firstParentCategoryImage) {
                    post.image = null;
                } else {
                    post.image = firstParentCategoryImage.image;
                }
        }       

        switch (lang) {
            case "en":
                switch (post.salary_type_id) {
                    case 1:
                        post.salary_type = "Hourly";
                        break;
                    case 2:
                        post.salary_type = "Daily";
                        break;
                    case 3:
                        post.salary_type = "Weekly";
                        break;
                    case 4:
                        post.salary_type = "Monthly";
                        break;
                    case 5:
                        post.salary_type = "Job";
                }
                break;
            case "ko":
                switch (post.salary_type_id) {
                    case 1:
                        post.salary_type = "시급";
                        break;
                    case 2:
                        post.salary_type = "일급";
                        break;
                    case 3:
                        post.salary_type = "주급";
                        break;
                    case 4:
                        post.salary_type = "월급";
                        break;
                    case 5:
                        post.salary_type = "일자리";
                }
        }
    }
    return post;
}

export { formatPostBeforeReturn };

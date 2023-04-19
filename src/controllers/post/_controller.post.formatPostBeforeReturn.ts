import ImageBucket from "../../enum/imageBucket.enum";
import MoneyType from "../../enum/money_type.enum";
import { PostService, PostResponse } from "../../interface/Post";
import { readDefaultPostImageByPostId } from "../../services/category/_service.category";

async function formatPostBeforeReturn(post: PostService) {
    const postResponse: PostResponse = {
        id: post.id,
        post_id: post.post_id ? post.post_id : post.id,
        account_id: post.account_id,
        title: post.title,
        company_name: post.company_name,
        address: post.address,
        salary_type: post.salary_type,
        salary_type_id: post.salary_type_id,
        image: post.image,
        description: post.description,
        phone_contact: "+" + post.phone_contact,
        is_date_period: post.is_date_period,
        is_working_weekend: post.is_working_weekend,
        is_remotely: +post.is_remotely,
        is_inhouse_data: +post.is_inhouse_data,
        created_at: new Date(post.created_at).getTime(),
        money_type: +post.money_type,
        money_type_text: MoneyType[post.money_type],
        status: post.status,
        start_date: post.start_date ? +post.start_date : null,
        end_date: post.end_date ? +post.end_date : null,
        start_time: +post.start_time,
        end_time: +post.end_time,
        salary_min: post.salary_min,
        salary_max: post.salary_max,
        ward_id: post.ward_id,
        ward: post.ward,
        ward_name: post.ward_name,
        district_id: post.district_id,
        district: post.district,
        district_name: post.district_name,
        province_id: post.province_id,
        province: post.province,
        province_name: post.province_name,
        latitude: post.latitude ? Number(post.latitude) : null, // Number(null) = 0 (not null
        longitude: post.longitude ? Number(post.longitude) : null,
        updated_at: post.updated_at ? new Date(post.updated_at).getTime() : null,
        // share_link: `${process.env.WEB_DEEP_LINK}/post?postId=${post.post_id ? post.post_id : post.id}`
        share_link: `${process.env.WEB_DEEP_LINK}?link=${process.env.PREVIEW_PAGE_URL
            }?postId=${post.post_id ? post.post_id : post.id
            }&st=${`${encodeURIComponent(post.title)}`}&sd=${encodeURIComponent(
                post.description.substring(0, 100)
            )}&si=`,
    };
    if (post.image !== undefined && post.image !== null) {
        postResponse.image =
            `${process.env.AWS_BUCKET_IMAGE_URL}/${ImageBucket.POST_IMAGES}/${post.post_id ? post.post_id : postResponse.id
            }/` + post.image;
    } else {
        const firstParentCategoryImage = await readDefaultPostImageByPostId(
            post.post_id || post.id
        );
        if (!firstParentCategoryImage) {
            postResponse.image = null;
        } else {
            postResponse.image = firstParentCategoryImage.image;
        }
    }
    postResponse.share_link += postResponse.image
        ? postResponse.image
        : "https://hi-job-app-upload.s3.ap-southeast-1.amazonaws.com/images/deep-link/meta/sharelink-logo.png";

    return postResponse;
}

export { formatPostBeforeReturn };

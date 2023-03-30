import ImageBucket from "../../../enum/imageBucket.enum";

const formatBannerResponse = (banner) => {
    return {
        ...banner,
        image: banner.image ? `${process.env.AWS_BUCKET_IMAGE_URL}/${ImageBucket.BANNER_IMAGES}/` + banner.image : null,
    };
}

export { formatBannerResponse };
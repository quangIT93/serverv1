const formatBannerResponse = (banner) => {
    return {
        ...banner,
        image: banner.image ? `${process.env.AWS_BUCKET_IMAGE_URL}/banners/` + banner.image : null,
    };
}

export { formatBannerResponse };
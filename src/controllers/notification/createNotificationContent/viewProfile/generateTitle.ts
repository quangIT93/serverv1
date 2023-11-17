const generateBody = ({
    lang = "vi",
    companyName,
}: {
    lang: string;
    companyName: string;
}) => {
    // switch (lang) {
    //     case "vi":
    //         return `Bình luận mới!`;
    //     case "en":
    //         return `New comment!`;
    //     case "ko":
    //         return `새 댓글!`;
    //     default:
    //         return `Bình luận mới!`;
    // }
    return companyName;
};

export default generateBody;

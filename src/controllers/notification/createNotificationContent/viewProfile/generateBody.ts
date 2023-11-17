

const generateBody = (
    {
        lang, //language
    } : {
        lang: string,
    }
): string => {
    switch (lang) {
        case "vi":
            return "Vừa xem hồ sơ của bạn";
        case "en":
            return "Just viewed your profile";
        case "ko":
            return "귀하의 프로필을 확인했습니다";
        default:
            return "Vừa xem hồ sơ của bạn";
    }
}

export default generateBody;
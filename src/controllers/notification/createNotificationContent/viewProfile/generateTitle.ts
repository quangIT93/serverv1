const generateBody = ({
    lang = "vi",
    companyName,
}: {
    lang: string;
    companyName: string;
}) => {
    switch (lang) {
        case "vi":
            return `Công ty ${companyName}`;
        case "en":
            return `Company ${companyName}`;
        case "ko":
            return `회사 ${companyName}`;
        default:
            return `Công ty ${companyName}`;
    }
    // return companyName;
};

export default generateBody;

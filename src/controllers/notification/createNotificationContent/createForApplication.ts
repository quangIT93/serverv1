// result.forEach(async (notification) => {
//     // type 0 is notification for application
//     if (notification.type === "0") {
//         notification.type_text = "applicator"
//         if (+notification.application_status === 2) {
//             notification.title = "Đơn ứng tuyển đã được duyệt!";
//             notification.content = `Đơn ứng tuyển vị trí ${notification.post_title} cho ${notification.company_name} của bạn đã được nhà tuyển dụng duyệt.`;
//         } else if (+notification.application_status === 4) {
//             notification.title = "Chúc mừng";
//             notification.content = `Chúc mừng bạn đã được chọn cho công việc ${notification.post_title} tại ${notification.company_name}.`;
//         }
//     } else if (notification.type === "1") {
//         // if (notification.application_status === ) {
//         // }
//         notification.type_text = "recruiter"
//         notification.title = "Ứng viên mới đã nộp hồ sơ";
//         notification.content = `Ứng viên ${notification.name} đã ứng tuyển vào công việc ${notification.post_title}.`;
//     }   
//     notification.created_at = new Date(notification.created_at).getTime();
//     notification.is_read_value = notification.is_read === "1" ? true : false;
//     notification.type = +notification.type;
//     notification.is_read = +notification.is_read;
// })

const createNotificationContent = (
    type: number, 
    applicationStatus: number, 
    postTitle: string, 
    companyName: string, 
    name: string
) => {
    let title = "";
    let content = "";
    if (type === 0) {
        if (applicationStatus === 2) {
            title = "Đơn ứng tuyển đã được duyệt!";
            content = `Đơn ứng tuyển vị trí ${postTitle} cho ${companyName} của bạn đã được nhà tuyển dụng duyệt.`;
        } else if (applicationStatus === 4) {
            title = "Chúc mừng";
            content = `Chúc mừng bạn đã được chọn cho công việc ${postTitle} tại ${companyName}.`;
        }
    } else if (type === 1) {
        title = "Ứng viên mới đã nộp hồ sơ";
        content = `Ứng viên ${name} đã ứng tuyển vào công việc ${postTitle}.`;
    }
    return {
        title,
        content
    }
}

export { createNotificationContent };
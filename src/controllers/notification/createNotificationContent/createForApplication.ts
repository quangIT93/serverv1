
interface NotificationData {
    type: number;
    type_text: string;
    id: number;
}

const createNotificationContent = (
    application_id: number,
    type: number, 
    applicationStatus: number, 
    postTitle: string, 
    companyName: string, 
    name: string
) => {
    let title = "";
    let content = "";
    let data: NotificationData;

    data.id = application_id;

    if (type === 0) {
        data.type = 0;
        data.type_text = "applicator";
        if (applicationStatus === 2) {
            title = "Đơn ứng tuyển đã được duyệt!";
            content = `Đơn ứng tuyển vị trí ${postTitle} cho ${companyName} của bạn đã được nhà tuyển dụng duyệt.`;
        } else if (applicationStatus === 4) {
            title = "Chúc mừng";
            content = `Chúc mừng bạn đã được chọn cho công việc ${postTitle} tại ${companyName}.`;
        }
    } else if (type === 1) {
        data.type = 1;
        data.type_text = "recruiter";
        title = "Ứng viên mới đã nộp hồ sơ";
        content = `Ứng viên ${name} đã ứng tuyển vào công việc ${postTitle}.`;
    }
    return {
        title,
        content,
        data
    }
}

export { createNotificationContent };
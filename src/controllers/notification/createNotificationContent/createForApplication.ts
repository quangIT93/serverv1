
interface NotificationData {
    type: number;
    type_text: string;
    applicationId: number | null;
    postId: number | null;
}

interface NotificationContent {
    application_id: number | null;
    post_id: number | null;
    type: number | null;
    applicationStatus: number | null;
    postTitle: string | null;
    companyName: string | null;
    name: string | null;
}

const createNotificationContent = (content: NotificationContent) => {
    let title = "";
    let body = "";
    let data: NotificationData = {
        type: 0,
        type_text: "",
        applicationId: null,
        postId: null
    };

    
    data.applicationId = content.application_id;
    data.postId = content.post_id;
    
    if (content.type === 0) {
        data.type = 0;
        data.type_text = "applicator";
        if (content.applicationStatus === 2) {
            title = "Đơn ứng tuyển đã được duyệt!";
            body = `Đơn ứng tuyển vị trí ${content.postTitle} cho ${content.companyName} của bạn đã được nhà tuyển dụng duyệt.`;
        } else if (content.applicationStatus === 4) {
            title = "Chúc mừng";
            body = `Chúc mừng bạn đã được chọn cho công việc ${content.postTitle} tại ${content.companyName}.`;
        }
    } else if (content.type === 1) {
        data.type = 1;
        data.type_text = "recruiter";
        title = "Ứng viên mới đã nộp hồ sơ";
        body = `Ứng viên ${content.name} đã ứng tuyển vào công việc ${content.postTitle}.`;
    }
    return {
        title,
        body,
        data
    }
}

export { createNotificationContent };
export type { NotificationData };
export type { NotificationContent };
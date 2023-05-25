import readKeywordByPostDetailService from "../../../../services/notification/keyword/service.notification.keyword.getKeywordByPost";
import createNotificationForKeywordService from "../../../../services/notification/service.notification.createNotificationForKeyword";
import pushNotification from "../../../../services/pushNotification/push";

const createNotificationKeywordForUsers = async (
    {
        postTitle,
        postId,
        wardId,
        categoryId,
    }
) => {
    // this function will be called when a new job is created
    // if the job title contains a keyword, 
    // districtId of the job is the same as the districtId of the keyword
    // categoryId of the job is the same as the categoryId of the keyword
    // then create a notification for all users who have subscribed to that keyword
    // the notification will be sent to the user's mobile device
    
    // get all keywords
    // get all users who have subscribed to that keyword
    // create a notification for each user
    // send the notification to the user's mobile device
    
    try {
        console.log("createNotificationKeywordForUsers");
        // console.log(postTitle, " postTitle");
        // console.log(postId, " postId");
        // console.log(wardId, " wardId");
        // console.log(categoryId, " categoryId");
    
        const accountIds: string[] | string = [];
    
        const listAccountIds = await readKeywordByPostDetailService(postTitle, wardId, categoryId);
    
        // console.log(listAccountIds, " listAccountIds");
    
        listAccountIds.forEach((item: any) => {
            accountIds.push(item.account_id);
        });
    
        console.log(accountIds, " accountIds");
    
        // create a notification for each user
        // send the notification to the user's mobile device

        const body = {
            content: {
                title: "Bạn có một việc làm mới",
                body: `${postTitle}`,
            },
            data: {
                postId: postId,
            }
        }

        const isCreated = await createNotificationForKeywordService(accountIds, postId);

        if (!isCreated) {
            throw new Error("createNotificationForKeywordService failed");
        }

        pushNotification(
            accountIds,
            body
        ) 

    } catch (error) {
        console.log(error, " createNotificationKeywordForUsers");
    }

}

export default createNotificationKeywordForUsers;
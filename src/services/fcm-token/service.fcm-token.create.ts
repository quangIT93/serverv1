import logging from '../../utils/logging';
import { executeQuery } from '../../configs/database';

const createFcmTokenService = async (
    accountId: string,
    fcmToken: string
) => {
  try {
    // logging.info("Read all provinces service start ...");
    const query = 'INSERT INTO fcm_tokens (account_id, token) VALUES (?, ?)';
    const res = await executeQuery(query, [accountId, fcmToken]);
    return res ? res : null;
  } catch (error) {
    logging.error('Read all provinces has error: ', error);
    throw error;
  }
};

export default createFcmTokenService;

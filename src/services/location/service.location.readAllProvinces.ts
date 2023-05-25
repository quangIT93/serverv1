import logging from '../../utils/logging';
import { executeQuery } from '../../configs/database/database';

const readAllProvinces = async () => {
  try {
    // logging.info("Read all provinces service start ...");
    const query = 'SELECT * FROM provinces';
    const res = await executeQuery(query);
    return res ? res : null;
  } catch (error) {
    logging.error('Read all provinces has error: ', error);
    throw error;
  }
};

export default readAllProvinces;

import logging from "../../utils/logging";
import { executeQuery } from "../../configs/database";

const updateTheme = async (themeId: number, title: string, image: string) => {
    try {
        logging.info("Update theme service start ...");
        const query = "UPDATE themes SET title = ?, image = ? WHERE id = ?";
        const params = [title, image, themeId];
        const res = await executeQuery(query, params);
        return res ? res.affectedRows === 1 : false;
    } catch (error) {
        logging.error("Update theme service has error: ", error);
        throw error;
    }
};

export default updateTheme;

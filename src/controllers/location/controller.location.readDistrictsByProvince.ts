import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

import logging from "../../utils/logging";
import * as locationServices from "../../services/location/_service.location";

const readDistrictByProvince = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

        const sortDistrict = (arrayDistrict:
            { id:String, full_name:String, full_name_en:String, name:String} [])=>{

            const listDistrict = new Array()
            const listDistrictSort = new Array()
            const listCity= new Array()
            const listTown = new Array()
            const listFinal= new Array()

            for (const district of arrayDistrict) {
                // filter listDistrict and list city, town
                if(district.full_name_en.endsWith('District')|| 
                district.full_name_en.startsWith("District")){
                        listDistrict.push(district)
                }else 
                if(district.full_name_en.endsWith("City")){
                    listCity.push(district)
                }          
                else{
                   listTown.push(district)
                }
            }
            //  filter list district number
            const listDistrictNumber = listDistrict.filter(dis => dis.name.length <= 2);
            // filter list district characters
            const listDistrictChar= listDistrict.filter(disChar=> disChar.name.length > 2)

            if(listDistrictNumber.length>0){
            //sort
                listDistrictNumber.sort(
                    function(a, b){return parseInt(a.name) - parseInt(b.name)});

                listDistrictSort.push(...listDistrictNumber);
                listDistrictSort.push(...listDistrictChar);

            }else{

                listDistrictSort.push(...listDistrictChar)
            }

            listFinal.push(...listCity)
            listFinal.push(...listTown)

            listFinal.push(...listDistrictSort)
        
            return listFinal
        }

    try {
        logging.info("Read districts by province controller start ...");

        // GET PROVINCE ID
        const provinceId = +req.query.pid;

        var { lang = "" } = req.query;
        
        if (!provinceId || !Number.isInteger(provinceId)) {
            logging.warning("Invalid province id");
            return next(createError(400));
        }

        if(lang.toString().trim()!=""){        
            if ((lang.toString().trim()!='vi'&& lang.toString().trim()!='en'&& lang.toString().trim()!='ko')){
              logging.warning("Invalid language");
              return next(createError(400));
          }
          }else{
            lang ="vi"
          }

        // GET DATA
        const districts = await locationServices.readDistrictsByProvince(
            provinceId,
            lang.toString()
        );
        if (!districts) {
            return next(createError(500));
        }

        // Sort
        const sortedDistrict = districts.sort((a, b) => a.full_name.localeCompare(b.full_name));

        const data = sortDistrict(sortedDistrict).map(district =>{
            return {
                id: district.id, 
                full_name: district.full_name,
                
            }
        })

        // SUCCESS
        return res.status(200).json({
            code: 200,
            success: true,
            data: data,
            message: "Successfully",
        });
    } catch (error) {
        logging.error(
            "Read districts by province controller has error: ",
            error
        );
        return next(createError(500));
    }
};

export default readDistrictByProvince;

import { Request } from "express";
import isNumeric from "validator/lib/isNumeric";

export class CreateKeywordNotificationDto {
    constructor(
        public keyword: string,
        public category_id: number,
        public district_id: string,
        public accountId: string,
    ) {}

    public static fromRequest(req: Request): CreateKeywordNotificationDto {
        return new CreateKeywordNotificationDto(
            req.body.keyword,
            +req.body.category_id,
            req.body.district_id,
            req.user.id,
        );
    }

    public static validate(dto: CreateKeywordNotificationDto): boolean {
        if (!dto.keyword || !dto.category_id || !dto.district_id || !dto.accountId) {
            return false;
        }
        if (
            typeof dto.keyword !== 'string' ||
            isNaN(+dto.category_id) ||
            !isNumeric(dto.district_id) ||
            typeof dto.accountId !== 'string'
        ) {
            return false;
        }
        return true;
    }

    public static sanitize(dto: CreateKeywordNotificationDto): CreateKeywordNotificationDto {
        return new CreateKeywordNotificationDto(
            dto.keyword,
            +dto.category_id,
            dto.district_id,
            dto.accountId,
        );
    }

    public static toResponse(dto: CreateKeywordNotificationDto): CreateKeywordNotificationDto {
        return new CreateKeywordNotificationDto(
            dto.keyword,
            +dto.category_id,
            dto.district_id,
            dto.accountId,
        );
    }
}
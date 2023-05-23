import { Request } from "express";

export class UpdateKeywordNotificationStatusDto {
  constructor(
    public keywordNotificationId: number,
    public accountId: string,
    public districtStatus: boolean,
    public categoryStatus: boolean
  ) {}

  public static fromRequest(req: Request): UpdateKeywordNotificationStatusDto {
    return new UpdateKeywordNotificationStatusDto(
      +req.body.id,
      req.user.id,
      Boolean(req.body.districtStatus),
      Boolean(req.body.categoryStatus)
    );
  }

  public static validate(dto: UpdateKeywordNotificationStatusDto): boolean {
    if (
      !dto.keywordNotificationId ||
      !dto.accountId ||
      dto.districtStatus === undefined ||
      dto.categoryStatus === undefined
    ) {
      return false;
    }
    if (
      isNaN(+dto.keywordNotificationId) ||
      typeof dto.accountId !== "string" ||
      typeof dto.categoryStatus !== "boolean" ||
      typeof dto.districtStatus !== "boolean"
    ) {
      return false;
    }
    return true;
  }

  public static sanitize(
    dto: UpdateKeywordNotificationStatusDto
  ): UpdateKeywordNotificationStatusDto {
    return new UpdateKeywordNotificationStatusDto(
      +dto.keywordNotificationId,
      dto.accountId,
      dto.districtStatus,
      dto.categoryStatus
    );
  }

  public static toResponse(
    dto: UpdateKeywordNotificationStatusDto
  ): UpdateKeywordNotificationStatusDto {
    return new UpdateKeywordNotificationStatusDto(
      +dto.keywordNotificationId,
      dto.accountId,
      dto.districtStatus,
      dto.categoryStatus
    );
  }
}

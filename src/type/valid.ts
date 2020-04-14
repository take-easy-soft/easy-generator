export class Valid {
    type: ValidType;
    /** 保存信息, 非Pattern使用自动生成即可 */
    message?: string;
    /** 适用于Pattern类型 */
    regexp?: string;
    /** 适用于Max、Min类型 */
    value?: number;
    /** 适用于Length、Size类型 */
    min?: number;
    /** 适用于Length、Size类型 */
    max?: number;
}

export enum ValidType {
    PATTERN = "Pattern", NOT_EMPTY = "NotEmpty", NOT_BLANK = "NotBlank",
    NOT_NULL = "NotNull", MAX = "Max", MIN = "Min",
    LENGTH = "Length", SIZE = "Size"
}
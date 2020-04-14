export class Valid {
    type: string;
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
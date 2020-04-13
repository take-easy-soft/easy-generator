export class Valid {
    type: string;
    message: string;
}

export class Pattern extends Valid {
    regexp: string;
}

export class NotEmpty extends Valid {
}

export class NotBlank extends Valid {
}

export class NotNull extends Valid {
}

export class Max extends Valid {
    value: number;
}

export class Min extends Valid {
    value: string;
}
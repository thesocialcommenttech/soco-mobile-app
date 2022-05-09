import validator from "is_js";

const checkEmpty = (val: string, key: string) => {
    if (validator.empty(val.trim())) {
        return `${key}`;
    }
    else {
        return '';
    }
}

const checkMinLength = (val: { trim: () => { (): any; new(): any; length: number; }; }, key: string, minLength: number) => {
    if (val.trim().length < minLength) {
        return `Please enter valid ${key}`;
    }
    else {
        return '';
    }
}

export default function (data: { email: any; password: any; userName: any; }) {
    const {
        email,
        password,
        userName,
    } = data;
    if (userName != undefined) {
        let emptyValidationText = checkEmpty(userName, 'Please enter your username');
        if (emptyValidationText != '') {
            return emptyValidationText;
        }
        let minLengthValidationText = checkMinLength(userName, 'username', 3);
        if (minLengthValidationText != '') {
            return minLengthValidationText;
        }
    }
    if (email != undefined) {
        let emptyValidationText = checkEmpty(email, 'Please enter your email');
        if (emptyValidationText != '') {
            return emptyValidationText;
        }
        if (!validator.email(email.trim())) {
            return 'Please enter valid email';
        }
    }
    if (password != undefined) {
        let emptyValidationText = checkEmpty(password, 'Please enter your password');
        if (emptyValidationText != '') {
            return emptyValidationText;
        }
        let minLengthValidationText = checkMinLength(password, 'password', 6);
        if (minLengthValidationText != '') {
            return minLengthValidationText;
        }
    }
}
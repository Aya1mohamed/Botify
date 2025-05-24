import * as yup from 'yup';

export const RegisterSchema = () => {
    return yup.object({
        first_name: yup.string().required('First name is required').max(255, 'First name is too long'),
        last_name: yup.string().required('Last name is required').max(255, 'Last name is too long'),
        username: yup.string().required('Username is required').max(255, 'Username is too long'),
        password: yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .matches(/[A-Z]/, 'Must include at least one uppercase letter')
            .matches(/[0-9]/, 'Must include at least one number')
            .matches(/[!@#$%^&*]/, 'Must include at least one special character'),
        password1: yup.string()
            .required('Confirm password is required')
            .oneOf([yup.ref('password')], 'Passwords must match'),
        email: yup.string()
            .email('Invalid email')
            .required('Email is required')
            .max(255, 'Email is too long'),
        phone_number: yup.string()
            .required('Phone number is required')
            .min(10, 'Phone number is too short')
            .max(17, 'Phone number is too long')
            .matches(/^[0-9]+$/, 'Phone number must contain only numbers'),
    });
};
import type { ValidateProps } from "../data/signup";


export const validateSignup = ({
    firstName,
    lastName,
    username,
    email,
    password,
    phone,
    shippingAddress,
    errors,
}: ValidateProps) => {
    // First Name Validation
    if (!firstName.trim()) {
        errors.firstName = "First name is required";
    } else if (firstName.trim().length < 2) {
        errors.firstName = "First name must be at least 2 characters";
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
        errors.firstName = "First name must contain only letters";
    }

    // Last Name Validation
    if (!lastName.trim()) {
        errors.lastName = "Last name is required";
    } else if (lastName.trim().length < 2) {
        errors.lastName = "Last name must be at least 2 characters";
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
        errors.lastName = "Last name must contain only letters";
    }

    // Username Validation
    if (!username.trim()) {
        errors.username = "Username is required";
    } else if (username.length < 4) {
        errors.username = "Username must be at least 4 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.username = "Username can only contain letters, numbers, and underscores";
    }

    // Email Validation
    if (!email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Invalid email address";
    }

    // Password Validation
    if (!password) {
        errors.password = "Password is required";
    } else {
        if (password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }
        if (!/[A-Z]/.test(password)) {
            errors.password = "Password must contain at least one uppercase letter";
        }
        if (!/[a-z]/.test(password)) {
            errors.password = "Password must contain at least one lowercase letter";
        }
        if (!/[0-9]/.test(password)) {
            errors.password = "Password must contain at least one number";
        }
        if (/\s/.test(password)) {
            errors.password = "Password cannot contain spaces";
        }
    }

    // Phone Number Validation (Egypt-friendly)
    if (!phone.trim()) {
        errors.phone = "Phone number is required";
    } else if (!/^(\+2)?01[0-2,5]{1}[0-9]{8}$/.test(phone.replace(/\s/g, ""))) {
        errors.phone = "Invalid phone number";
    }

    // Shipping Address Validation
    if (!shippingAddress.trim()) {
        errors.shippingAddress = "Shipping address is required";
    } else if (shippingAddress.trim().length < 10) {
        errors.shippingAddress = "Shipping address must be at least 10 characters";
    }
};
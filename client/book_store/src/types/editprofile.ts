export type EditProfileErrors = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    current_password?: string;
    new_password?: string;
    confirm_password?: string;
};

export type ValidateEditProfileProps = {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    address?: string;
    current_password?: string;
    new_password?: string;
    confirm_password?: string;
    errors: EditProfileErrors;
};

export const validateEditProfile = ({
    first_name,
    last_name,
    email,
    phone,
    address,
    current_password,
    new_password,
    confirm_password,
    errors,
}: ValidateEditProfileProps) => {

    // First Name
    if (!first_name?.trim()) {
        errors.firstName = "First name is required";
    } else if (first_name.trim().length < 2) {
        errors.firstName = "First name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(first_name)) {
        errors.firstName = "First name must contain only letters";
    }

    if (!last_name?.trim()) {
        errors.lastName = "Last name is required";
    } else if (last_name.trim().length < 2) {
        errors.lastName = "Last name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(last_name)) {
        errors.lastName = "Last name must contain only letters";
    }

    if (!email?.trim()) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Invalid email address";
    }

    // Phone (Egypt-friendly regex)
    if (!phone?.trim()) {
        errors.phone = "Phone number is required";
    } else if (!/^(\+2)?01[0-2,5]{1}[0-9]{8}$/.test(phone.replace(/\s/g, ""))) {
        errors.phone = "Invalid phone number";
    }

    if (!address?.trim()) {
        errors.address = "Shipping address is required";
    } else if (address.trim().length < 10) {
        errors.address = "Address must be at least 10 characters";
    }

    if (new_password && new_password.trim() !== "") {
        if (!current_password) {
            errors.current_password = "Current password is required to set a new one";
        }

        // 2. Validate New Password Complexity
        if (new_password.length < 8) {
            errors.new_password = "Password must be at least 8 characters";
        } else if (!/[A-Z]/.test(new_password)) {
            errors.new_password = "Password must contain at least one uppercase letter";
        } else if (!/[0-9]/.test(new_password)) {
            errors.new_password = "Password must contain at least one number";
        }

        // 3. Check Confirmation
        if (new_password !== confirm_password) {
            errors.confirm_password = "Passwords do not match";
        }
    }
};
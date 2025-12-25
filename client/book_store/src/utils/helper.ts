import type { ValidateEditProfileProps } from "../types/editprofile";
import type { ValidateProps } from "../types/signup";
import type { CartItem } from '../types/cart';
import type { AddBookErrors, ModifyBookErrors } from "../types/book";
const CART_KEY = 'cart';


export const validateSignup = ({
    first_name,
    last_name,
    username,
    email,
    password,
    phone,
    address,
    errors,
}: ValidateProps) => {
    // First Name Validation
    if (!first_name.trim()) {
        errors.first_name = "First name is required";
    } else if (first_name.trim().length < 2) {
        errors.first_name = "First name must be at least 2 characters";
    } else if (!/^[a-zA-Z]+$/.test(first_name)) {
        errors.first_name = "First name must contain only letters";
    }

    // Last Name Validation
    if (!last_name.trim()) {
        errors.last_name = "Last name is required";
    } else if (last_name.trim().length < 2) {
        errors.last_name = "Last name must be at least 2 characters";
    } else if (!/^[a-zA-Z]+$/.test(last_name)) {
        errors.last_name = "Last name must contain only letters";
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
    if (!address.trim()) {
        errors.address = "Shipping address is required";
    } else if (address.trim().length < 10) {
        errors.address = "Shipping address must be at least 10 characters";
    }
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
    // --- Personal Information (Always Required) ---

    // First Name
    if ((first_name ?? "").trim().length < 2) {
        errors.firstName = "First name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(first_name ?? "")) {
        errors.firstName = "First name must contain only letters";
    }

    // Last Name
    if (!last_name?.trim()) {
        errors.lastName = "Last name is required";
    } else if (last_name.trim().length < 2) {
        errors.lastName = "Last name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(last_name)) {
        errors.lastName = "Last name must contain only letters";
    }

    // Email
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

    // Address
    if (!address?.trim()) {
        errors.address = "Shipping address is required";
    } else if (address.trim().length < 10) {
        errors.address = "Address must be at least 10 characters";
    }

    // --- Password Change (Optional - Only validates if newPassword is entered) ---

    if (new_password && new_password.trim() !== "") {
        // 1. Check if Current Password is provided
        if (!current_password) {
            errors.current_password = "Current password is required to set a new one";
        }

        // 2. Validate New Password Complexity
        if (new_password.length < 8) {
            errors.new_password = "Password must be at least 8 characters";
        }
        if (!/[A-Z]/.test(new_password)) {
            errors.new_password = "Password must contain at least one uppercase letter";
        }
        if (!/[0-9]/.test(new_password)) {
            errors.new_password = "Password must contain at least one number";
        }

        if (new_password !== confirm_password) {
            errors.confirm_password = "Passwords do not match";
        }
    }
};


interface ValidateAddBookProps {
    isbn: string;
    title: string;
    authors: string[],
    publisher: string;
    publicationYear: number;
    price: string;
    category: string;
    stockQuantity: string;
    thresholdQuantity: string;
    errors: AddBookErrors;
}

export const validateAddBook = ({
    isbn,
    title,
    authors,
    publisher,
    publicationYear,
    price,
    category,
    stockQuantity,
    thresholdQuantity,
    errors,
}: ValidateAddBookProps) => {
    // ISBN
    if (!isbn.trim()) {
        errors.isbn = "ISBN is required";
    } else if (!/^[0-9\-]{10,17}$/.test(isbn)) {
        errors.isbn = "Invalid ISBN format";
    }

    // Title
    if (!title.trim()) {
        errors.title = "Book title is required";
    } else if (title.trim().length < 3) {
        errors.title = "Title must be at least 3 characters";
    }

    // Author
    if (!authors || authors.length === 0 || authors.some((a: string) => !a.trim())) {
        errors.author = "At least one author is required";
    }

    if (category === '') {
        errors.category = "Category is required";
    }
    // Publisher
    if (!publisher) {
        errors.publisher = "Publisher is required";
    }

    // Publication Year
    const currentYear = new Date().getFullYear();
    if (!publicationYear) {
        errors.publicationYear = "Publication year is required";
    } else if (publicationYear < 1900 || publicationYear > currentYear + 1) {
        errors.publicationYear = "Invalid publication year";
    }

    // Price
    if (!price) {
        errors.price = "Price is required";
    } else if (Number(price) <= 0) {
        errors.price = "Price must be greater than zero";
    }

    // Stock Quantity
    if (stockQuantity === '') {
        errors.stockQuantity = "Stock quantity is required";
    } else if (Number(stockQuantity) < 0) {
        errors.stockQuantity = "Stock cannot be negative";
    }

    // Threshold Quantity
    if (thresholdQuantity === '') {
        errors.thresholdQuantity = "Threshold quantity is required";
    } else if (Number(thresholdQuantity) < 0) {
        errors.thresholdQuantity = "Threshold cannot be negative";
    } else if (Number(thresholdQuantity) > Number(stockQuantity)) {
        errors.thresholdQuantity = "Threshold cannot exceed stock quantity";
    }
};

export function validateModifyBook(data: any): ModifyBookErrors {
    const errors: ModifyBookErrors = {};

    if (!data.isbn.trim()) {
        errors.isbn = "ISBN is required";
    }

    if (!data.title.trim()) {
        errors.title = "Title is required";
    }

    if (!data.authors.trim()) {
        errors.authors = "At least one author is required";
    }

    if (!data.category) {
        errors.category = "Category is required";
    }

    if (data.stockQuantity < 0 || isNaN(data.stockQuantity)) {
        errors.stockQuantity = "Stock must be 0 or more";
    }

    if (data.price <= 0 || isNaN(data.price)) {
        errors.price = "Price must be greater than 0";
    }

    return errors;
}



export const loadCart = (): CartItem[] => {
    try {
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const saveCart = (cart: CartItem[]) => {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
    }
};

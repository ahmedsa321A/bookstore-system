import { useState } from 'react';
import { User, Save } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import FormInput from '../../components/FormInput';
import AlertCard from '../../components/AlertCard';
import { CustomButton } from '../../components/CustomButton';
import { validateEditProfile } from '../../utils/helper'; 
import type { EditProfileErrors } from '../../types/editprofile'; 

interface EditProfileFormState {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  current_password?: string;
  new_password?: string;
  confirm_password?: string;
}

export function EditProfile() {
  const user = useAppSelector((state) => state.auth.user);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState<EditProfileFormState>({
    first_name: user?.FirstName || '', 
    last_name: user?.LastName || '',
    email: user?.Email || '',
    phone: user?.Phone || '',
    address: user?.Address || '',
    current_password: '',
    new_password: '',
    confirm_password: '', 
  });
  const [errors, setErrors] = useState<EditProfileErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    variant: "success" | "error";
    title?: string;
    message: string;
  } | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof EditProfileErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    setIsSubmitting(true);

    const newErrors: EditProfileErrors = {};
    validateEditProfile({ ...formData, errors: newErrors });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAlert({
        variant: "error",
        title: "Validation Error",
        message: "Please fix the highlighted fields.",
      });
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
    console.log("Submitting profile update:", formData);
    // try {
     

    //   setAlert({
    //     variant: "success",
    //     title: "Success",
    //     message: "Profile updated successfully!",
    //   });

    //   // Clear password fields on success
    //   setFormData(prev => ({
    //     ...prev,
    //     current_password: '',
    //     new_password: '',
    //     confirm_password: ''
    //   }));

    // } catch (error: any) {
    //   console.error("Update error:", error);
    //   setAlert({
    //     variant: "error",
    //     title: "Update Failed",
    //     message: error.response?.data?.message || "Failed to update profile.",
    //   });
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <User className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        </div>
        <p className="text-muted-foreground">Update your personal information and password</p>
      </div>

      <div className="max-w-3xl">
        {/* Global Alert */}
        {alert && (
          <div className="mb-6">
            <AlertCard
              variant={alert.variant}
              title={alert.title}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section: Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="First Name"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                error={errors.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
              />
              <FormInput
                label="Last Name"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                error={errors.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
              />

              <div className="md:col-span-2">
                <FormInput
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  error={errors.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                />
              </div>

              <div className="md:col-span-2">
                <FormInput
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  error={errors.phone}
                  onChange={handleChange}
                  placeholder="+20..."
                />
              </div>

              <div className="md:col-span-2">
                <FormInput
                  label="Shipping Address"
                  id="address" 
                  name="address" 
                  value={formData.address}
                  error={errors.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter your full address"
                />
              </div>
            </div>
          </div>

          {/* Section: Change Password */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Change Password</h2>
            <p className="text-sm text-gray-500 mb-4">Leave these fields blank if you do not want to change your password.</p>
            
            <div className="space-y-4">
              <FormInput
                label="Current Password"
                id="current_password"
                name="current_password"
                type="password"
                showPassword={showCurrentPassword}
                onTogglePassword={() => setShowCurrentPassword(!showCurrentPassword)}
                value={formData.current_password || ''}
                error={errors.current_password}
                onChange={handleChange}
                placeholder="Enter current password"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="New Password"
                  id="new_password"
                  name="new_password"
                  type="password"
                  showPassword={showNewPassword}
                  onTogglePassword={() => setShowNewPassword(!showNewPassword)}
                  value={formData.new_password || ''}
                  error={errors.new_password}
                  onChange={handleChange}
                  placeholder="New password"
                />

                <FormInput
                  label="Confirm New Password"
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  showPassword={showNewPassword}
                  onTogglePassword={() => setShowNewPassword(!showNewPassword)}
                  value={formData.confirm_password || ''}
                  error={errors.confirm_password}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <CustomButton
              type="submit"
              icon={Save}
              isLoading={isSubmitting}
              disabled={isSubmitting}
              className="w-full md:w-auto px-8"
            >
              Save Changes
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
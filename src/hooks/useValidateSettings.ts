import { useState, useEffect } from "react";

interface UseValidateSettingsParams {
  currentPassword: string;
  newPassword: string;
  isFormValid: boolean;
  hasOtherChanges?: boolean;
}

interface UseValidateSettingsResult {
  isSubmitEnabled: boolean;
}

export const useValidateSettings = ({
  currentPassword,
  newPassword,
  isFormValid,
  hasOtherChanges = false,
}: UseValidateSettingsParams): UseValidateSettingsResult => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);

  useEffect(() => {
    // First check: we always need current password
    if (!currentPassword) {
      setIsSubmitEnabled(false);
      return;
    }

    // If we have a new password, form validation matters
    if (newPassword) {
      setIsSubmitEnabled(isFormValid);
      return;
    }

    // If no new password but other fields changed, enable submit
    if (hasOtherChanges) {
      setIsSubmitEnabled(true);
      return;
    }

    // Otherwise disable submit (current password provided but nothing to change)
    setIsSubmitEnabled(false);
  }, [currentPassword, newPassword, isFormValid, hasOtherChanges]);

  return { isSubmitEnabled };
};

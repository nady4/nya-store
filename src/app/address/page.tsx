"use client";
import { useState, useTransition } from "react";
import FormContainer from "@/components/FormContainer";
import { updateAddress } from "@/actions/address";

export default function AddressPage() {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [pending, startTransition] = useTransition();

  const hasChanges = street || city || state || postalCode || country;
  const isSubmitEnabled =
    hasChanges && street && city && postalCode && country && !pending;

  const handleSubmit = (formData: FormData) => {
    if (!isSubmitEnabled) return;
    startTransition(async () => {
      try {
        await updateAddress(formData);
        alert("Address updated successfully!");
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <FormContainer title="Shipping Address">
      <form action={handleSubmit}>
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State / Province"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <button type="submit" disabled={!isSubmitEnabled}>
          {pending ? "Saving..." : "Save Address"}
        </button>
      </form>
    </FormContainer>
  );
}

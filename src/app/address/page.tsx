import { getUserAddress } from "@/actions/address";
import AddressForm from "@/components/Address";

export default async function AddressPage() {
  const address = await getUserAddress();

  return <AddressForm initialAddress={address} />;
}

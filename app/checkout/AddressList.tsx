"use client";

interface Address {
  id: string;
  name: string;
  phone: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  created_at: string;
}

interface AddressListProps {
  addresses: Address[];
  selectedId?: string;
  onSelect: (address: Address) => void;
}

export default function AddressList({
  addresses,
  selectedId,
  onSelect,
}: AddressListProps) {
  if (addresses.length === 0) {
    return (
      <p className="text-gray-400">
        No addresses found. Please add a new address.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {addresses.map((address) => {
        const isSelected = address.id === selectedId;

        return (
          <div
            key={address.id}
            onClick={() => onSelect(address)}
            className={`cursor-pointer border rounded-xl p-4 bg-neutral-900 hover:border-white transition-all ${
              isSelected ? "border-white ring-2 ring-blue-500" : "border-neutral-700"
            }`}
          >
            <p className="font-semibold text-white">{address.name}</p>
            <p className="text-sm text-gray-400">{address.phone}</p>
            <p className="text-sm text-gray-400">
              {address.address_line_1}, {address.address_line_2}
            </p>
            <p className="text-sm text-gray-400">
              {address.city}, {address.state} - {address.pincode}
            </p>
            <p className="text-sm text-gray-400">{address.country}</p>
          </div>
        );
      })}
    </div>
  );
}

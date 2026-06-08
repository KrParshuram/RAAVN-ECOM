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
      <div className="border-t border-zinc-800 pt-8">
        <h3 className="text-2xl font-black mb-4">
          NO SAVED ADDRESSES.
        </h3>

        <p className="text-zinc-500">
          Add a delivery address to continue.
        </p>
      </div>
    );
  }

  return (
    <div className="border-t border-zinc-800">
      {addresses.map((address) => {
        const selected =
          address.id === selectedId;

        return (
          <button
            key={address.id}
            type="button"
            onClick={() => onSelect(address)}
            className="
              w-full
              text-left
              border-b
              border-zinc-800
              py-8
              transition-opacity
              hover:opacity-100
            "
          >
            <div className="grid md:grid-cols-[40px_1fr] gap-6">

              {/* Radio */}

              <div className="pt-1">
                <div
                  className={`
                    h-4
                    w-4
                    rounded-full
                    border
                    ${
                      selected
                        ? "border-white bg-white"
                        : "border-zinc-600"
                    }
                  `}
                />
              </div>

              {/* Content */}

              <div>
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <h3 className="text-xl font-medium text-white">
                    {address.name}
                  </h3>

                  <span className="text-zinc-500 text-sm">
                    {address.phone}
                  </span>
                </div>

                <p className="text-zinc-400 leading-relaxed">
                  {address.address_line_1}
                  {address.address_line_2 &&
                    `, ${address.address_line_2}`}
                </p>

                <p className="mt-2 text-zinc-500">
                  {address.city},{" "}
                  {address.state}{" "}
                  {address.pincode}
                </p>

                <p className="text-zinc-600 text-sm mt-1">
                  {address.country}
                </p>
              </div>

            </div>
          </button>
        );
      })}
    </div>
  );
}
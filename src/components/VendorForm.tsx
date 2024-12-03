import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Vendor, VendorCategory } from '../types/vendor';
import { FileUpload } from './FileUpload';

interface VendorFormProps {
  vendor?: Vendor;
  onSubmit: (vendor: Omit<Vendor, 'id'>) => void;
  onCancel: () => void;
}

const categories: VendorCategory[] = ['Technology', 'Services', 'Supplies', 'Consulting', 'Manufacturing'];

export function VendorForm({ vendor, onSubmit, onCancel }: VendorFormProps) {
  const [mediaData, setMediaData] = useState<string>(vendor?.media || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      category: formData.get('category') as VendorCategory,
      number: formData.get('number') as string,
      email: formData.get('email') as string,
      url: formData.get('url') as string,
      media: mediaData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{vendor ? 'Edit Vendor' : 'Add New Vendor'}</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Vendor Name</label>
          <input
            type="text"
            name="name"
            defaultValue={vendor?.name}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            defaultValue={vendor?.category}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vendor Number</label>
          <input
            type="text"
            name="number"
            defaultValue={vendor?.number}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={vendor?.email}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Website URL</label>
          <input
            type="url"
            name="url"
            defaultValue={vendor?.url}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Media</label>
          <FileUpload
            defaultValue={vendor?.media}
            onChange={setMediaData}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {vendor ? 'Update' : 'Add'} Vendor
        </button>
      </div>
    </form>
  );
}
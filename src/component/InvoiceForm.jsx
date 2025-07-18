import React, { useEffect } from "react";
import { X, Trash, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleForm, addInvoice, updateInvoice } from "../store/invoiceSlice";
import { addDays, format, format as formatDate } from "date-fns";

function InvoiceForm({ invoice }) {
  const [formData, setFormData] = React.useState(() => {

    if (invoice) {
      return{...invoice };
    }

    return {
      id: `INV ${Math.floor(Math.random() * 1000)}`,
      status: "pending",
      billForm: {
        streetAddress: "",
        city: "",
        pinCode: "",
        country: "",
      },
      billTo: {
        clientEmail: "",
        streetName: "",
        city: "",
        pinCode: "",
        country: "",
      },
      clientName: "",
      items: [],
      paymetTerm: "Net 30 Days",
      aboutProject: "",
      invoiceDate: format(new Date(), "yyyy-MM-dd"),
      dueDate: format(addDays(new Date(), 30), "yyyy-MM-dd"),
      amount: "",
    };
  });

  useEffect(() => {
    if (invoice) {
      setFormData(invoice);
    }
  }, [invoice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (invoice) {
      dispatch(updateInvoice(formData));
    } else {
      dispatch(addInvoice(formData));
    }
  }


  const dispatch = useDispatch();
  const calculateAmount = (items) => {
    return items.reduce((sum, item) => sum + (Number(item.totalAmount) || 0), 0);
  };

  const addItem = () => {
    const newItems = [
      ...formData.items,
      { name: "", quantity: 0, price: 0, totalAmount: 0 },
    ];
    setFormData({
      ...formData,
      items: newItems,
      amount: calculateAmount(newItems),
    });
  };


  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    const quantity = field === "quantity" ? value : newItems[index].quantity;
    const price = field === "price" ? value : newItems[index].price;
    newItems[index].totalAmount = quantity * price;

    setFormData({
      ...formData,
      items: newItems,
      amount: calculateAmount(newItems),
    });
  };


  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: newItems,
      amount: calculateAmount(newItems),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center overflow-y-auto p-4">
      <div className="bg-slate-800 p-6 sm:p-8 rounded-lg w-full max-w-3xl mt-8 mb-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">New Invoice</h2>
          <button type="button" onClick={() => dispatch(toggleForm())}>
            <X size={24} className="text-white" />
          </button>
        </div>

        <form className="space-y-6 text-white"  onSubmit={handleSubmit}>
          {/* Bill From */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bill From</h3>
            <input
              type="text"
              placeholder="Street Address"
              className="bg-slate-900 w-full rounded-lg p-3"
              value={formData.billForm.streetAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billForm: {
                    ...formData.billForm,
                    streetAddress: e.target.value,
                  },
                })
              }
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                className="bg-slate-900 w-full rounded-lg p-3"
                value={formData.billForm.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billForm: {
                      ...formData.billForm,
                      city: e.target.value,
                    },
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Pin Code"
                className="bg-slate-900 w-full rounded-lg p-3"
                value={formData.billForm.pinCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billForm: {
                      ...formData.billForm,
                      pinCode: e.target.value,
                    },
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Country"
                className="bg-slate-900 w-full rounded-lg p-3"
                value={formData.billForm.country}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billForm: {
                      ...formData.billForm,
                      country: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
          </div>

          {/* Bill To */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bill To</h3>
            <input
              type="text"
              placeholder="Client's Name"
              className="bg-slate-900 w-full rounded-lg p-3"
              value={formData.clientName}
              onChange={(e) =>
                setFormData({ ...formData, clientName: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Client's Email"
              className="bg-slate-900 w-full rounded-lg p-3"
              value={formData.billTo.clientEmail}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    clientEmail: e.target.value,
                  },
                })
              }
              required
            />
            <input
              type="text"
              placeholder="Street Name"
              className="bg-slate-900 w-full rounded-lg p-3"
              value={formData.billTo.streetName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: {
                    ...formData.billTo,
                    streetName: e.target.value,
                  },
                })
              }
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                className="bg-slate-900 w-full rounded-lg p-3"
                value={formData.billTo.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billTo: {
                      ...formData.billTo,
                      city: e.target.value,
                    },
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Pin Code"
                className="bg-slate-900 w-full rounded-lg p-3"
                value={formData.billTo.pinCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billTo: {
                      ...formData.billTo,
                      pinCode: e.target.value,
                    },
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Country"
                className="bg-slate-900 w-full rounded-lg p-3"
                value={formData.billTo.country}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billTo: {
                      ...formData.billTo,
                      country: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
          </div>

          {/* Date & About */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                className="bg-slate-900 w-full rounded-lg p-3"
                value={formData.invoiceDate}
                onChange={(e) => {
                  const newDate = e.target.value;
                  setFormData({
                    ...formData,
                    invoiceDate: newDate,
                    dueDate: formatDate(
                      addDays(new Date(newDate), 30),
                      "yyyy-MM-dd"
                    ),
                  });
                }}
              />
              <select
                className="bg-slate-900 w-full rounded-lg p-3"
                value={formData.paymetTerm}
                onChange={(e) =>
                  setFormData({ ...formData, paymetTerm: e.target.value })
                }
              >
                <option>Net 30 Days</option>
                <option>Net 60 Days</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="About Project"
              className="w-full bg-slate-900 rounded-lg p-3"
              value={formData.aboutProject}
              onChange={(e) =>
                setFormData({ ...formData, aboutProject: e.target.value })
              }
            />
          </div>

          {/* Item List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Item List</h3>
            {formData.items.map((item, index) => (
              <div
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                key={index}
              >
                <input
                  type="text"
                  placeholder="Item Name"
                  className="bg-slate-900 rounded-lg p-3 sm:col-span-4"
                  value={item.name}
                  onChange={(e) =>
                    updateItem(index, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  className="bg-slate-900 rounded-lg p-3 sm:col-span-3"
                  min={0}
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", parseInt(e.target.value) || 0)
                  }
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="bg-slate-900 rounded-lg p-3 sm:col-span-2"
                  min={0}
                  value={item.price}
                  onChange={(e) =>
                    updateItem(index, "price", parseInt(e.target.value) || 0)
                  }
                />
                <div className="sm:col-span-2 text-right">
                  ${item.totalAmount.toFixed(2)}
                </div>
                <button
                  type="button"
                  className="sm:col-span-1"
                  onClick={() => removeItem(index)}
                >
                  <Trash size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="w-full bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex items-center justify-center space-x-2"
              onClick={addItem}
            >
              <Plus size={20} />
              <span>Add New Item</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <button
              type="button"
              className="bg-violet-500 hover:bg-violet-600 w-full sm:w-auto rounded-full px-6 py-3 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-600 w-full sm:w-auto rounded-full px-6 py-3 text-white" >
              {invoice ? "Save Change" : "Create Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvoiceForm;
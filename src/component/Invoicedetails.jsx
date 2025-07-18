import React from "react";
import { format, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import { deleteInvoice, setSelectedInvoice, toggleForm, marksAsPaid } from "../store/invoiceSlice";
import InvoicePdf from "./InvoicePdf";




function Invoicedetails({invoice}){

  const dispatch = useDispatch();

   const handleEdit = () => {
    dispatch(setSelectedInvoice(invoice));
    dispatch(toggleForm());
  };
   
  const handleMarks = ( ) => {
    dispatch(marksAsPaid(invoice.id));
    dispatch(setSelectedInvoice(null)); 
  };

  const handleDelete = () => {
    dispatch(deleteInvoice(invoice.id));
  };
  
  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "dd/MM/yyyy");
    } catch (err) {
      console.log(err);
      return "Invalid Date"; // Fallback to original string if parsing fails
    }
  }

  return (
    <div className="bg-slate-800 rounded-lg p-8">
     <div className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-4">
        <span>Status</span>
        <div className={`px-4 py-2 text-white rounded-lg flex items-center space-x-2 ${
          invoice.status === 'paid'
            ? 'bg-green-900/20 text-green-500'
            : invoice.status === 'pending'
            ? 'bg-red-900/20 text-red-500'
            : 'bg-orange-900/20 text-yellow-500'
        }`}>
            <div className={`w-2 h-2 rounded-full ${invoice.status==='paid'? 'bg-green-600':
              invoice.status === 'pending' ? 'bg-red-600' : 'bg-yellow-600'
            }`}></div>
             <span className="capitalize">{invoice.status}</span>
          </div>
      </div>

      

      <div className="flex space-x-4 items-center">
        <InvoicePdf invoice={invoice} />


        <button className="px-6 py-3 bg-slate-700 text-white rounded-full hover:bg-slate-600 transition-colors duration-200" onClick={handleEdit}>
          Edit
        </button>
         <button className="px-6 py-3 bg-red-700 text-white rounded-full hover:bg-red-600 transition-colors duration-200" onClick={handleDelete}>
          Delete
        </button>
         <button className="px-6 py-3 bg-violet-700 text-white rounded-full hover:bg-violet-600 transition-colors duration-200" onClick={handleMarks}>
          Mark as Paid
        </button>
      </div>
     </div>
     <div className="bg-slate-900 rounded-lg p-8">
      <div className="flex justify-between mb-8"> 
        <div>
          <h2 className="text-xl font-bold mb-2"> #{invoice.id}</h2>
          <p className="text-slate-400">{invoice.aboutProject}</p>
        </div>
        <div className="text-right text-slate-400">
          <p>{invoice.billForm.streetAddress}</p>
          <p>{invoice.billForm.city}</p>
          <p>{invoice.billForm.pinCode}</p>
          <p>{invoice.billForm.country}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <div>
          <p className="text-slate-400 mb-2">Invoice Date</p>
          <p className="font-bold">{formatDate(invoice.invoiceDate)}</p>
          <p className="text-slate-400 mb-2">Payment-Due</p>
          <p className="font-bold">{formatDate(invoice.dueDate)}</p>
        </div>
        <div>
          <p className="text-slate-400 mb-2">Bill To</p>
          <p className="font-bold mb-2">{invoice.clientName}</p>
          <p className="text-slate-400">{invoice.billTo.streetAddress}</p>
          <p className="text-slate-400">{invoice.billTo.city}</p>
          <p className="text-slate-400">{invoice.billTo.pinCode}</p>
          <p className="text-slate-400">{invoice.billTo.country}</p>
        </div>
        <div>
          <p className="text-slate-400 mb-2">Send To</p>
          <p className="font-bold">{invoice.billTo.clientEmail}</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <div className="p-8">
          <table className="w-full">
            <thead>
              <tr className="text-slate-400">
                <th className="text-left">Item Name</th>
                <th className="text-center">Quantity</th>
                <th className="text-right">Price</th>
                <th className="text-right">Total</th>
              </tr>   
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b border-slate-700">
                  <td className="py-4">{item.name}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-right">₹{item.price.toFixed(2)}</td>
                  <td className="text-right">₹{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="font-bold">
                <td colSpan="3" className="text-right">Total Amount</td>
                <td className="text-right">₹{invoice.amount?.toFixed(2) || "0.00"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-900 p-8 flex justify-between items-center">
          <span className="text-white">Amount Due</span>
          <span className="font-bold text-3xl ">₹{invoice.amount}</span>
          </div>        

      </div>


     </div>
  </div>
  )
}

export default Invoicedetails;
import React from "react";
import { ChevronRight } from "lucide-react";
import { useSelector, useDispatch} from "react-redux";
import { format, parseISO } from "date-fns";
import { setSelectedInvoice } from "../store/invoiceSlice";

function InvoiceList(){

  const dispatch = useDispatch();

  const { invoices, filter }= useSelector((state) => state.invoices);

  const filterInvoices = invoices.filter ((invoice)=>{
     if (filter === 'all') return true;
     return invoice.status === filter;  
  })

  if (filterInvoices.length === 0) {
    return <div className="text-center py-12">
      <p className="text-xl text-slate-400">No Invoice Found</p>
    </div>
  }

  const handleInvoiceClick = (invoice) => {
    dispatch(setSelectedInvoice(invoice));
  };

  const formatDate = (date) => {
    try {
      return format(parseISO(date), "dd/MM/yyyy");
    } catch (err) {
      console.log(err);
    } 
  }



  return (
    <div className="space-y-4">
      { filterInvoices.map((invoice)=>(
        <div className="bg-slate-800 rounded-lg p-6 flex items-center justify-between hover:bg-slate-600 transition-colors duration-200 cursor-pointer" key= {invoice.id} onClick={()=> handleInvoiceClick(invoice)}>
        <div className="flex items-center space-x-6">
          <span className="text-slate-400">{invoice.id}</span>
          <span className="text-slate-400">Due{formatDate(invoice.dueDate)}</span>
          <span className="text-slate-300">{invoice.clientName}</span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-2xl font-bold">₹{invoice.amount?.toFixed(2)||"0"}</span>
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
         
          <ChevronRight className="text-violet-500" />
        </div>
      </div>
      ))}
    </div>
  );
}

export default InvoiceList;
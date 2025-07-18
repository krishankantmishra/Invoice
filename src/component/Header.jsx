import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Filter, Plus } from "lucide-react";
import { useSelector,useDispatch } from "react-redux"
import { setFilter } from "../store/invoiceSlice";

function Header({ onNewInvoice }) {
  const dispatch = useDispatch();
  const status = ["all", "draft", "pending", "paid"];

  const { invoices, filter }= useSelector((state)=> state.invoices)

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Invoice</h1>
        <p className="text-slate-400">{invoices.length===0? 'There is 0 Invoices':`There are ${invoices.length} Invoices`}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <Menu as="div" className="relative w-full sm:w-auto">
          <Menu.Button className="flex items-center space-x-2 text-white w-full sm:w-auto">
            <Filter size={20} />
            <span>Filter by status</span>
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg p-2 z-10">
              {status.map((s) => (
                <Menu.Item key={s}>
                  {({active})=> (
                    <button className={ `${active ? "bg-slate-700": ""} w-full text-left px-4 py-2 
                    rounded-lg capitalize ${filter === s ?"text-violet-500":" text-white"}`}
                    onClick={() => dispatch(setFilter(s))}
                    >
                        {s}
                      </button>
                     )}
              
            </Menu.Item>))}

            
            {/*  */}
          </Menu.Items>
        </Menu>

        <button
          type="button"
          className="bg-violet-500 hover:bg-violet-700 text-white px-6 py-2 rounded-full flex items-center space-x-2 w-full sm:w-auto"
          onClick={onNewInvoice}
        >
          <div className="bg-white rounded-full p-2">
            <Plus size={16} className="text-violet-500" />
          </div>
          <span>New Invoice</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
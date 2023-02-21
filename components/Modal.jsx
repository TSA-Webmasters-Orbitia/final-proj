import React from 'react'

function Modal({ isVisible, errorMsg, onClose, children }) {
    if (!isVisible) return ;

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    }

    

  return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm' id='wrapper' onClick={handleClose}>
          <div className='w-[600px] flex flex-col'>
              <div className='p-2 bg-white rounded-lg'>
                  <div className="flex justify-end">
                      <button className='fixed m-4 text-xl font-bold text-right text-red-600 hover:text-red-500 w-fit' onClick={() => { onClose() }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 24 24" className='stroke-red-600 hover:stroke-red-500'>
                        <path d="M18 6L6 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6 6L18 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                      </button>
                  </div>
                  <div className="p-4">
                      {children}
                  </div>
                  <div id='errorMsg' className={(!errorMsg ? "hidden " : "") + "p-2 bg-red-300 text-red-800 rounded-md"}>
                      <p className='p-4 font-medium'>{errorMsg}</p>
                  </div>
              </div>
          </div>    
    </div>
  )
}

export default Modal
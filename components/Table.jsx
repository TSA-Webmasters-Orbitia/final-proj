import { getFormattedDate } from "@/utils/Dates";
import { deleteFlight } from "@/utils/Flights";
const Table = ({ rows }) => {
    return (
        <>
            <table className='w-full text-sm text-center text-gray-500'>
                <thead className='text-xs text-center text-gray-700 uppercase bg-gray-50'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>
                            Name
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Take Off
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Landing
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Ship Type
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={row?.id} className='bg-white border-b'>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-900'>Flight {index+1}</div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-900'>{getFormattedDate(row?.takeOff)}</div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-900'>{getFormattedDate(row?.landing)}</div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-900'>{row?.shipType === "FirstClass" ? "First Class" : row?.shipType}</div>
                            </td>
                            <td className='flex justify-center px-6 py-4 whitespace-nowrap'>
                                <div className='flex gap-4 text-sm text-gray-900'>
                                    <a href={"/flight/"+row.id+"?ref=dashboard"}>
                                    <button className='px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700'>
                                        Edit
                                    </button></a>
                                    <button id={row.id} onClick={(e)=>{deleteFlight(e)}} className='px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700'>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Table;
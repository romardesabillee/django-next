import useSWR from "swr";
import { albumAPI } from "@/lib/api.constant";
import dayjs from "dayjs";
import { useState } from "react";
import { Pagination } from "@mui/material";

export default function Home() {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useSWR(albumAPI+'?page='+page);

    const handleOnChange = (pageValue, value) => {
        setPage(value);
    };

    return (
        <div className="max-w-[90%] m-auto flex flex-col h-screen items-center mt-[30px]">
            {isLoading && 
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            }
            <div className="relative overflow-x-auto w-full">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Stars
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Artist
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.results.map((album) => (
                            <tr 
                                key={album.id}
                                className="bg-white dark:bg-gray-800"
                            >
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    { album.id }
                                </th>
                                <td className="px-6 py-4">
                                    { album.name }
                                </td>
                                <td className="px-6 py-4">
                                    { album.num_stars }
                                </td>
                                <td className="px-6 py-4">
                                    { dayjs(album.release_date).format('MMM D, YYYY') }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="w-100 flex justify-end mt-5">
                    <Pagination
                        color="primary"
                        page={page}
                        count={data?.count ? Math.ceil(data?.count / 1) : 0}
                        onChange={handleOnChange}
                    />
                </div>
            </div>
        </div>
    )
}
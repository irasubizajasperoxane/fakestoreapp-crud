import axios from 'axios';
import { BookPlusIcon, Loader, SquarePen } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

function allbooks() {
    //define states
    const [Books, setBooks] = useState([]);
    const [isLoading, setLoading] = useState(false)
    //function for call book api
    async function getAllBooks() {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/book/");
            setBooks(response.data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }
    //function to delete

    async function handleDeleteBook(id) {
        try {
            setLoading(true);
            const response = await axios.delete("http://localhost:5000/book/" + id);
            toast.success(response.data.message);
            getAllBooks();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    //use effect for initialiing book api call
    useEffect(function () {
        getAllBooks();

    }, []);

    if (isLoading) {
        return <div>

            <div className='h-[70vh] flex justify-center items-center'>
                <Loader
                    size={70} className='animate-ping' />
            </div>
        </div>
    }
    return (
        <div>
            <div className='flex justify-between mb-5'>
                <h1 className='font-bold text-2xl text-center'>All Books</h1>

                <Link to={"/book/create"} className='flex gap-2 px-4 py-2 rounded-2xl bg-green-400'>
                    <BookPlusIcon /> Add Book
                </Link>
            </div>

            <table>
                <thead>
                    <tr>
                        <th className='px-4 py-1 border'>#</th>
                        <th className='px-4 py-1 border'>Title</th>
                        <th className='px-4 py-1 border'>Author</th>
                        <th className='px-4 py-1 border'>Published_At</th>
                        <th className='px-4 py-1 border'>Created_at</th>
                        <th className='px-4 py-1 border'>Updated_At</th>
                        <th className='px-4 py-1 border'>Actions</th>

                    </tr>
                </thead>
                <tbody>

                    {Books.map(function (book, index) {
                        return (
                            <tr key={index}>
                                <td className='px-4 py-1 border'>{index + 1}</td>
                                <td className='px-4 py-1 border'>{book.title}</td>
                                <td className='px-4 py-1 border'>{book.author}</td>
                                <td className='px-4 py-1 border'>{book.published_at.slice(0, 10)}</td>
                                <td className='px-4 py-1 border'>{moment(book.created_at).fromNow()}</td>
                                <td className='px-4 py-1 border'>{book.updated_at}</td>
                                <td className='px-4 py-1 border flex gap-2'>

                                    {/* delete button */}

                                    <button onClick={function () { handleDeleteBook(book.id) }} className='px-5 py-1 bg-red-700 text-white rounded'>Delete</button>
                                    {/* edit button */}
                                    {/* <Link to={"/book/"+ book.id+"/edit"}></Link> */}

                                    <Link to={`/book/${book.id}/edit`}>
                                        <SquarePen />
                                    </Link>

                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

}

export default allbooks
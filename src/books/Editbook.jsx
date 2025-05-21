import axios from 'axios';
import { SaveIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

function EditBook() {

  //define state for storing book details
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    year: "",
  });

  //read book id from url parameters
  const { id } = useParams();

  //define a function for reading book by id

  async function getBookById() {
    const book = await axios.get("http://localhost:5000/book/" + id);
    console.log(book.data);
    setBookData({
      title: book.data.title,
      author: book.data.author,
      year: book.data.published_at.slice(0, 10),
    });

  }

  //execute function inside useEffect
  useEffect(function () {
    getBookById();
  }, []);
  //redirecting hook
  const redirect = useNavigate()


  //define function to perform insert operation

  async function handleEdit() {
    // http://localhost:5000/book
    const response = await axios.put("http://localhost:5000/book/"+id, {

      ...bookData,
      published_at: bookData.year,
    });
    toast.success(response.data.message);
    redirect("/books");

  }
  return (
    <div>
      <h1 className='text-center text-2xl text-black'>Edit Book</h1>
      <div className='flex flex-col gap-2'>
        <label htmlFor="">Book title</label>
        <input onChange={function (e) {
          setBookData({ ...bookData, title: e.target.value });
        }}
          value={bookData.title} type="text" className='p-2 border border-black block outline-green-800 w-[300px]' />

        <label htmlFor="">Book author</label>
        <input onChange={function (e) {
          setBookData({ ...bookData, author: e.target.value });
        }}
          value={bookData.author}
          type="text" className='p-2 border border-black block outline-green-800 w-[300px] ' />

        <label htmlFor="">publication</label>
        <input

          onChange={function (e) {
            setBookData({ ...bookData, year: e.target.value });
          }}
          value={bookData.year} type="date" className='p-2 border border-black block outline-green-800 w-[300px]' />
        <div>
          <button onClick={handleEdit} className='px-6 py-7 rounded-2xl bg-green-400 flex-gap text-white'>
            <SaveIcon />
            Edit
          </button>
        </div>

      </div>
    </div>
  )
}

export default EditBook;
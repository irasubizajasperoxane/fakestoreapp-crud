import axios from 'axios';
import { SaveIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function InsertBook() {
  //redirecting hook
  const redirect = useNavigate()
  //define state for storing book details

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    year: "",
  });

  //define function to perform insert operation

  async function handleInsert() {
    // http://localhost:5000/book
    const response = await axios.post("http://localhost:5000/book", {

      ...bookData,
      published_at: bookData.year,
    });
    toast.success(response.data.message);
    redirect("/books");

  }


  return (
    <div>

      <h1 className='text-center text-2xl text-black'>Create new Book</h1>
      <div className='flex flex-col gap-2'>
        <label htmlFor="">Book title</label>
        <input onChange={function (e) {
          setBookData({ ...bookData, title: e.target.value });
        }}
          value={bookData.title} type="text" className='p-2 border border-black block outline-green-800 w-[300px]' />

        <label htmlFor="" >Book author</label>
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
          <button onClick={handleInsert} className='px-10 py-2 rounded-2xl bg-green-400 flex-gap text-white'>
            <SaveIcon />
            Save
          </button>
        </div>

      </div>
    </div>
  )
}

export default InsertBook
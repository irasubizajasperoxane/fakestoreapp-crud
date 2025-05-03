import axios from 'axios';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner';

function Editscreen() {

    const redirect = useNavigate();
    const [products, setProducts] = useState(null);
    const [isLoading, setLoading] = useState(false);
    //read product id by using useParams() hooks which is imported from react-router-dom
    const { id } = useParams();
//fetch product by id
    async function getProductById() {
        try {
            setLoading(true);
            const response = await axios.get("https://fakestoreapi.com/products/" + id);
            setProducts(response.data);


        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductById();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.put("https://fakestoreapi.com/products/" + id);
            toast.success("Product updated");
        } catch (error) {
            toast.error(error.message);
            redirect('/products');
        } finally {
            setLoading(false);
        }
    }

    if (isLoading) {
        return <div className='h-[70vh] flex justify-center items-center'>
            <Loader size={70} />
        </div>
    }

    // function to update data from form to backend
    async function handleUpdate() {
        //call api endpoint fonr sending update request with forn data by using PUT method
        try {
            setLoading(true);
            const res = await axios.put("https://fakestoreapi.com/products/" + id, products);
            toast.success("update done!");
            redirect("/products");
        } catch (error) {
            toast.error(error.message);
        }

        finally {
            setLoading(false);

        }
    }
    return products && (
        <div className='p-4 max-w-xl mx-auto'>
            <h1 className='text-xl font-semibold mb-4'>Edit {products.title}</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <input
                    type='text'
                    name='title'
                    value={products.title}
                    onChange={(e) => setProducts({ ...products, title: e.target.value })}
                    placeholder='Title'
                    className='w-full border p-2 rounded'
                />
                <input
                    type='number'
                    name='price'
                    value={products.price}
                    onChange={(e) => setProducts({ ...products, price: e.target.value })}
                    placeholder='Price'
                    className='w-full border p-2 rounded'
                />
                <textarea
                    name='description'
                    value={products.description}
                    onChange={(e) => setProducts({ ...products, description: e.target.value })}
                    placeholder='Description'
                    className='w-full border p-2 rounded'
                />
                <input
                    type='text'
                    name='category'
                    value={products.category}
                    onChange={(e) => setProducts({ ...products, category: e.target.value })}
                    placeholder='Category'
                    className='w-full border p-2 rounded'
                />

                <button onClick={handleUpdate} type='submit' className='bg-blue-600 text-white px-4 py-2 rounded'>
                    Update changes
                </button>
            </form>
        </div>
    )
}

export default Editscreen;

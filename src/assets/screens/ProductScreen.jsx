import React, { useState, useEffect } from 'react'
import { toast } from 'sonner';
import axios from 'axios';
import { Edit2, Loader, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
function ProductScreen() {
    const [products, setProducts] = useState([]);
    const [waiting, setWaiting] = useState(false);

    const redirect = useNavigate()

    async function selectAllProducts() {
        try {
            setWaiting(true)
            const response = await axios.get('https://fakestoreapi.com/products')
            setProducts(response.data)
        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setWaiting(false);
        }
    }

    useEffect(() => {
        selectAllProducts();
    }, []);

    function handleDelete(id) {
        // toast("You are going to delete item with id"+id);
        const items = products.filter((p) => p.id != id)
        setProducts(items);
        toast.success("Product Deleted!")
    }

    if (waiting) {
        return <>

            <div className='h-[70vh] flex justify-center items-center'>
                <Loader
                    size={70} className='animate-ping' />
            </div>
        </>
    }
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map(function (item) {
            return (
                <div onClick={() => redirect("/product/" + item.id)} key={item.id} className="bg-white p-5 rounded-2xl hover:shadow-2xl ">

                    <img
                        className='h-60 object-contain mx-auto'

                        src={item.image} alt="" />
                    <h1 className='text-blue-700 font-bold line-clamp-2'>{item.title}</h1>
                    <p className='my-2 line-clamp-4'>{item.description}</p>
                    <div className='flex justify-between items-center'>
                        <button onClick={(event) => {
                            event.stopPropagation();
                            handleDelete(item.id)
                        }}
                            className='mt-4 flex items-center text-xl'>
                            <Trash2 color='red'
                                size={30}

                            />
                            Delete
                        </button>
                        < Link onClick={(e) => e.stopPropagation()}
                            to={"/edit/" + item.id}
                            className='flex gap-3 text-2xl '
                        >
                            <Edit2 color='green'
                                size={30}
                            />
                            Edit
                        </Link>
                    </div>

                </div>
            );
        })}

    </div>

    //   return (
    //     <div>
    // <button onClick={()=>toast.success("sonner is working")}>display</button>
    //     </div>

    //   )
}

export default ProductScreen;
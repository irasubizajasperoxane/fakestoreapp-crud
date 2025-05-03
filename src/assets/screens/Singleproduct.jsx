import axios from 'axios';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';

function Singleproduct() {
    const { id } = useParams();
    const [product, setProducts] = useState(null);
    const [waiting, setWaiting] = useState(false);


    async function getSingleProduct() {
        try {
            setWaiting(true);
            const response = await axios.get("https://fakestoreapi.com/products/" + id);
            setProducts(response.data);

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setWaiting(false);
        }
    }


    useEffect(function () {
        getSingleProduct()
    }, [id])


    //waiting indicator

    if (waiting) {
        return <>

            <div className='h-[70vh] flex justify-center items-center'>
                <Loader
                    size={70} className='animate-ping' />
            </div>
        </>
    }
        // return (
        //     //using axios we'll select product with the received id and then display it on the screen
        //     <div>

                return(
                 product && (
                        <div className='flex gap-5'>
                            <img className='h-[400px] w-[400px] object-contain'
                            src={product.image}
                             alt =""
                             />
                        <div className='space-y-5'>
                    <p className='text-3xl text-blue-700 font-semibold'>Price:{product.price}</p>
                    <h1 className='semi-bold text-blue-500'>{product.title}</h1>
                    <p>{product.description}</p>
                    <p className='bg-blue-600 px-6 py-2 rounded-2xl w-60 text-center uppercase text-black font-black '>{product.category}</p>
                    

                    </div>
                    </div>
                 )
                );
                
            }

        //         <h1>you're viewing product with {id} id</h1>
        //     </div>
        // );
    


    export default Singleproduct;
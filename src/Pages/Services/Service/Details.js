import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../Context/Authprovider/Authprovider';
import Facility from './Facility';
import Review from './Review';
import ReviewCard from './ReviewCard';


const Details = () => {

    const { user } = useContext(AuthContext);
    const { _id, title, price } = useLoaderData();
    const [facilities, setFacilities] = useState([]);
    const [service, setService] = useState([]);
    const [reviews, setReviews] = useState([])
    
    //const {displayName, email, photoURL} = user;



    useEffect(() => {
        fetch(`https://b6a11-service-review-server-side-hasan-1911001-hasan1911001.vercel.app/reviews?service=${_id}`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [_id])


    useEffect(() => {
        fetch(`https://b6a11-service-review-server-side-hasan-1911001-hasan1911001.vercel.app/services/${_id}`)
            .then(res => res.json())
            .then(data => {
                setFacilities(data.facility)
                setService(data)
            })
    }, []);

    

    const handleOrder = () => {
        const review = {
            service: _id,
            serviceName: title,
            price,
            customer: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
        }

        fetch('https://b6a11-service-review-server-side-hasan-1911001-hasan1911001.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                //authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.acknowledged){
                    alert('Order placed successfully')
                    
                }
            })
            .catch(er => console.error(er));
    }

    return (
        <div>
            <div className="card glass m-20">
                <figure><img src={service.img} alt="car!" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{service.title}</h2>
                    <p>{service.description}</p>
                    <div className="card-actions justify-end">
                        <button onClick={handleOrder} className="btn btn-primary">Book Now</button>
                    </div>
                </div>
            </div>
            <div className='m-20'>
                <div className='text-center my-10'>
                    <h1 className='text-center text-6xl font-bold mt-20'>Why we are best!!!</h1>
                </div>
                <div className='grid gap-6 grid-cols-1 md:grid-cols-2 m-10'>
                    {
                        facilities.map(facility => <Facility
                            key={facility.name}
                            facility={facility}
                        ></Facility>)
                    }
                </div>
            </div>
            <div>
                <h1 className='text-7xl text-center'>Reviews</h1>
                <div className="overflow-x-auto w-full">
                {
                                reviews.map(review => <ReviewCard
                                    key={review._id}
                                    review={review}
                                ></ReviewCard>)
                            }
                </div>
            </div>
            {
        user?.email ?
            <Review> </Review>
            :
            <>
                <h3 className='text-3xl text-center m-10'> Please <Link className='btn btn-primary' to='/login'>Login</Link> to give reveiw</h3>   
            </>
            
    }
            
        </div >
    );
};

export default Details;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecommendationList = ({ diagnosis }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (diagnosis) {
            axios.get(`/api/recommendations/suggest?diagnosis=${diagnosis}`)
                .then(res => setItems(res.data))
                .catch(err => console.log(err));
        }
    }, [diagnosis]);

    if (items.length === 0) return null;

    return (
        <div className="mt-8 p-4 border rounded-lg bg-blue-50">
            <h3 className="text-lg font-bold mb-4">Recommended for your Recovery:</h3>
            <div className="grid grid-cols-2 gap-4">
                {items.map(item => (
                    <div key={item.id} className="bg-white p-3 shadow-sm rounded">
                        <p className="font-semibold">{item.product_name}</p>
                        <p className="text-sm text-gray-600">LKR {item.price}</p>
                        <button className="text-xs mt-2 bg-blue-600 text-white px-2 py-1 rounded">View Item</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendationList;
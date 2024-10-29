import { useState } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";

export default function Rating({ auth, postId, initialRating, initialVote }) {
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(initialRating);
    const [userVote, setUserVote] = useState(initialVote);

    const handleRate = async (type) => {
        if (!auth.user) {
            setMessage('You need to be logged in to rate.');
            router.get(route('login'));
            return;
        }

        try {
            const response = await axios.post(`/posts/${postId}/rate`, { type });
            setMessage(response.data.message);

            const ratingChange = response.data.ratingChange;
            setRating(rating + ratingChange);

            setUserVote(prevVote => (prevVote === type ? null : type));
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="flex items-center flex-col gap-0.5 bg-gradient-to-b from-yellow-200 to-red-200 rounded-3xl p-1 border border-red-300">
            <button onClick={() => handleRate(true)} className="text-orange-500 hover:text-orange-700">
                {userVote === true ?
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff8000" stroke="#FFA500">
                        <path d="M320-160v-280H204q-26 0-36.5-22.5T173-505l276-337q12-15 31-15t31 15l276 337q16 20 5.5 42.5T756-440H640v280q0 17-11.5 28.5T600-120H360q-17 0-28.5-11.5T320-160Z"/>
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff8000" stroke="#0000FF">
                        <path d="M320-160v-280H204q-26 0-36.5-22.5T173-505l276-337q12-15 31-15t31 15l276 337q16 20 5.5 42.5T756-440H640v280q0 17-11.5 28.5T600-120H360q-17 0-28.5-11.5T320-160Zm80-40h160v-320h111L480-754 289-520h111v320Zm80-320Z"/>
                    </svg>}
            </button>
            <span className="text-gray-700">{rating}</span>
            <button onClick={() => handleRate(false)} className="text-blue-500 hover:text-blue-700 rotate-180">
                {userVote === false ?
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0037ff" stroke="#FFA500">
                        <path d="M320-160v-280H204q-26 0-36.5-22.5T173-505l276-337q12-15 31-15t31 15l276 337q16 20 5.5 42.5T756-440H640v280q0 17-11.5 28.5T600-120H360q-17 0-28.5-11.5T320-160Z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0037ff" stroke="#0000FF">
                        <path d="M320-160v-280H204q-26 0-36.5-22.5T173-505l276-337q12-15 31-15t31 15l276 337q16 20 5.5 42.5T756-440H640v280q0 17-11.5 28.5T600-120H360q-17 0-28.5-11.5T320-160Zm80-40h160v-320h111L480-754 289-520h111v320Zm80-320Z"/>
                    </svg>}
            </button>
        </div>
    );
}

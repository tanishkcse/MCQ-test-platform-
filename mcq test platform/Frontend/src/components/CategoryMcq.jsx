import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CategoryMcq({ isLoggedIn }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    { isLoggedIn }

    const [selectedType, setSelectedType] = useState('');

    const mcqTypes = [
        'Mix Type',
        'DBMS',
        'OS',
        'oops',
        'networking',
    ];

    const handleTypeSelection = (type) => {
        console.log(type)
        setSelectedType(type);
        navigate(`/fundamentalmcq?type=${type}`);
    };

    const renderMcqPage = () => {
        const searchParams = new URLSearchParams(window.location.search);
        const type = searchParams.get('type');

        if (type) {
            return <Fundamentalmcq mcqType={type} />;
        }

        return null;
    };



    return (
        <>
            <h2>Select MCQ Type</h2>
            <div>
                {mcqTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => handleTypeSelection(type)}
                        style={{
                            backgroundColor: selectedType === type ? '#007bff' : '#f8f9fa',
                            color: selectedType === type ? 'white' : 'black',
                            padding: '10px 20px',
                            margin: '5px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {type}
                    </button>
                ))}
            </div>
            {selectedType && <p>Selected Type: {selectedType}</p>}
            {renderMcqPage()}

        </>
    )
}

export default CategoryMcq

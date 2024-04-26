import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [universities, setUniversities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 25; // גודל עמוד, ניתן לשנות לפי הצורך

    useEffect(() => {
        axios.get('http://universities.hipolabs.com/search?country=india')
            .then(response => {
                const data = response.data;
                if (data && Array.isArray(data)) {
                    setUniversities(data);
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // חישוב הנתונים להצגה בעמוד הנוכחי
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentData = universities.slice(indexOfFirstItem, indexOfLastItem);

    // פונקציות לעדכון העמוד הנוכחי
    const nextPage = () => {
        if (currentPage * pageSize < universities.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <h1>25 אוניברסיטאות בהודו</h1>
            <table>
                <thead>
                    <tr>
                        <th>שם</th>
                        <th>מדינה</th>
                        <th>אתר אינטרנט</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((university, index) => (
                        <tr key={index}>
                            <td>{university.name}</td>
                            <td>{university.country}</td>
                            <td><a href={university.web_pages}>{university.web_pages}</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* כפתורי ניווט */}
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>הקודם</button>
                <button onClick={nextPage} disabled={currentPage * pageSize >= universities.length}>הבא</button>
            </div>
        </div>
    );
}

export default App;

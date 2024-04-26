import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [universities, setUniversities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 25;

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
            <h1>Universities in India</h1>
            <table>
                <thead>
                    <tr>
                      <th>name</th>
                      <th>domains</th>
                      <th>state-province</th>
                      <th>web pages</th>
                      <th>alpha_two_code</th>
                    </tr>
                </thead>
                <tbody>
                {currentData.map(university => (
                  <tr key={university.id}>
                    <td>{university.name}</td>
                    <td>{university.domains}</td>
                    <td>{university["state-province"]}</td>
                    <td><a href={university.web_pages}>{university.web_pages}</a></td>
                    <td>{university.alpha_two_code}</td>
                  </tr>
                 ))}
                </tbody>
            </table>

            {/* כפתורי ניווט */}
            <div className="pagination">
                <button className="pagination-button" onClick={prevPage} disabled={currentPage === 1}>הקודם</button>
                <button className="pagination-button" onClick={nextPage} disabled={currentPage * pageSize >= universities.length}>הבא</button>
            </div>
        </div>
    );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CityCards from '../components/CityCards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import stations from '../gares.json';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 12; // Nombre de cartes par page
    const maxPageNumbers = 8; // Nombre maximal de numéros de page à afficher

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Réinitialiser la page lors de la recherche
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const cities = Object.keys(stations);
    const filteredCities = cities.filter((city) =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPageCount = Math.ceil(filteredCities.length / cardsPerPage);

    useEffect(() => {
        // Assurez-vous que la page actuelle est valide
        if (currentPage < 1) setCurrentPage(1);
        if (currentPage > totalPageCount) setCurrentPage(totalPageCount);
    }, [currentPage, totalPageCount]);

    // Calculer les numéros de page à afficher dynamiquement
    const calculatePageNumbersToDisplay = () => {
        if (totalPageCount <= maxPageNumbers) {
            // Si le nombre total de pages est inférieur ou égal à maxPageNumbers,
            // afficher toutes les pages.
            return Array.from({ length: totalPageCount }, (_, index) => index + 1);
        } else {
            // Sinon, déterminez quels numéros de page afficher en fonction de la position actuelle
            if (currentPage <= maxPageNumbers - Math.floor(maxPageNumbers / 2)) {
                // Afficher les premières maxPageNumbers pages
                return Array.from({ length: maxPageNumbers }, (_, index) => index + 1);
            } else if (currentPage >= totalPageCount - Math.floor(maxPageNumbers / 2)) {
                // Afficher les dernières maxPageNumbers pages
                return Array.from(
                    { length: maxPageNumbers },
                    (_, index) => totalPageCount - maxPageNumbers + index + 1
                );
            } else {
                // Afficher les pages autour de la page actuelle
                return Array.from(
                    { length: maxPageNumbers },
                    (_, index) => currentPage - Math.floor(maxPageNumbers / 2) + index
                );
            }
        }
    };

    const pageNumbersToDisplay = calculatePageNumbersToDisplay();

    return (
        <>
            <Header />
            <div className='home'>
                <div className='home__content-wrapper'>
                    <h1 className='home__content-title'>
                        Choisissez une<span> ville </span>pour afficher les{' '}
                        <span>horaires</span> des trains
                    </h1>
                    <input
                        className='input-search'
                        type='text'
                        placeholder='Rechercher une gare...'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <CityCards
                        searchTerm={searchTerm}
                        currentPage={currentPage}
                        cardsPerPage={cardsPerPage}
                    />
                    <div className='pagination'>
                        <Link
                            to={`?page=${currentPage - 1}`}
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            &lt;
                        </Link>
                        {pageNumbersToDisplay.map((pageNumber) => (
                            <Link
                                key={pageNumber}
                                to={`?page=${pageNumber}`}
                                className={currentPage === pageNumber ? 'active' : ''}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </Link>
                        ))}
                        <Link
                            to={`?page=${currentPage + 1}`}
                            disabled={currentPage === totalPageCount}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            &gt;
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;






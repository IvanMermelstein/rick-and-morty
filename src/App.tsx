import React, { useState } from 'react';
import './App.scss';
import { useQuery, gql } from "@apollo/client";

const FEMALE_CHARACTERS_QUERY = gql`
    {
        characters(filter: { gender: "female" }) {
                results {
                    id
                    name
                    status
                    gender
                    image
                }
            }
    }
`;

const App = () => {

    const { data, loading, error } = useQuery(FEMALE_CHARACTERS_QUERY);
    const characters = data?.characters.results;
    const [showCharacters, setShowCharacters] = useState(false);
    
    
    if (loading) return <p className='loading'>Loading ...</p>;
    if (error) return <p>{error.message}</p>;
    
    return (
        <div className='main-container'>
            <div className='button-container'>
                <button
                    onClick={() => setShowCharacters(!showCharacters)}
                    className='button'
                >
                    Click me, Morty!
                </button>
            </div>
            <div className='list-container'>
                {
                    showCharacters &&
                    characters.map((character: any) => {
                        return (
                            <div key={character.id} className='item-list'>
                                <img
                                    src={character.image}
                                    alt={character.name}
                                    className='avatar'
                                />
                                {character.name}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default App;

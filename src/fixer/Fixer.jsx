import React, { useState, useEffect } from 'react';
import BackEnd from '../config/Index';
import './Fixer.css';  

function Fixer() {
    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [date, setDate] = useState('');
    const [base, setBase] = useState('');

    const currencyCountryMap = {
        'USD': 'Estados Unidos',
        'EUR': 'Zona do Euro',
        'GBP': 'Reino Unido',
        'JPY': 'Japão',
        'AUD': 'Austrália',
        'CAD': 'Canadá',
        'CHF': 'Suíça',
        'CNY': 'China',
        'NZD': 'Nova Zelândia',
        'INR': 'Índia'
    };

    useEffect(() => {
        const symbols = 'USD,EUR,GBP,JPY,AUD,CAD,CHF,CNY,NZD,INR';  
        BackEnd.get('/latest', {
            params: {
                symbols: symbols
            }
        })
            .then(response => {
                if (response.data.success) {
                    setRates(response.data.rates);
                    setDate(response.data.date);
                    setBase(response.data.base);
                } else {
                    console.error('Erro na resposta da API:', response.data.error);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="fixer-container">
            <h1>Taxas de Câmbio (Base: {base})</h1>

            {loading ? (
                <p>Carregando...</p>
            ) : rates ? (
                <ul className="rates-list">
                    {Object.entries(rates).map(([currency, rate]) => (
                        <li key={currency} className="rate-item">
                            <span className="currency-code">{currency}</span>
                            <span className="country-name">{currencyCountryMap[currency]}</span>
                            <span className="rate">{rate}</span>
                        </li>
                    ))}
                    <p className='date'>Atualização: {date}</p>
                </ul>
            ) : (
                <p>Erro ao carregar dados.</p>
            )}
        </div>
    );
}

export default Fixer;

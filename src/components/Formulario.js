import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    const [listaCriptoMonedas, guardarCriptoMoneda] = useState([]);
    const [error, guardarError] = useState(false);

    useEffect(() => {
        const consultarApi = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
            const resultado = await axios.get(url);
            console.log(resultado.data.Data);
            guardarCriptoMoneda(resultado.data.Data);
        };

        consultarApi();
    }, [])

    const MONEDAS = [
        { codigo:'USD', nombre:'Dolar de Estados Unidos'},
        { codigo:'MXN', nombre:'Peso Mexicano'},
        { codigo:'EUR', nombre:'Euro'},
        { codigo:'GBP', nombre:'Libra Esterlina'}
    ]

    const [moneda,SelectMonedas] = useMoneda('Elige tu moneda','',MONEDAS);
    const [criptomoneda,SelectCripto] = useCriptomoneda('Elige tu criptomoneda','',listaCriptoMonedas);

    // cuando el usuario da submit al formulario
    const cotizarMoneda = e => {
        e.preventDefault();
        // validando los datos del form
        if(moneda.trim() === '' || criptomoneda.trim() === '') {
            guardarError(true);
            return;
        }

        // pasar los datos al componente principal
        guardarError(false);

        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    };
    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error?<Error mensaje="Todos los campos son obligatorios"/>: null}
            <SelectMonedas/>
            <SelectCripto/>
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    );
}
 
export default Formulario;
import styled from '@emotion/styled';
import React from 'react'

const ResultadoDiv = styled.div`
    color: #fff;
`;

const Info = styled.p`
    font-size: 18px;

    span {
        font-weight: bold;
    }
`;


const Precio = styled.p`
    font-size: 30px;
    span {
        font-weight: bold;
    }
`;

const Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).length === 0) return null;
    console.log(resultado);
    return (
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio más alto del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio más bajo del día: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación ultimas 24hrs: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Última Actuliazión: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
    );
}
 
export default Cotizacion;
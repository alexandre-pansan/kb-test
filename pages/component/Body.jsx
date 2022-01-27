import styled from 'styled-components';
import Image from 'next/image'
import Link from 'next/link';
import CarouselCard from './CarouselCard';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
let cart = [];
export default function Body(props) {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    

    const router = useRouter();

    const CallBackCard = (data) => {
        //console.log(data)
        //setCart(data)
        cart.push(data)
        console.log(cart)
        props.cbCart(cart)
        router.replace(router.asPath);
    }
    useEffect(() => {
        fetch("/api/hello")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setData(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Container>
    
                <Image src='/../public/assets/body/banner.png' width={1440} height={600} layout='responsive' />
                <View>
                    <div className="card">
                        <p style={{ fontWeight: '800', fontSize: '24px' }}>BLACK FRIDAY</p>
                        <Timer >
                            <span style={{ fontSize: '16px' }}>A PROMOÇÃO TERMINA EM:</span>
                            <Image src='/../public/assets/body/clock.png' width={22} height={24} />
                            <span style={{ fontSize: '25px' }}>13d 18:15:56</span>
                        </Timer>
                    </div>
                    <Carrousel>
                        <div className="prev">
                            <Image src='/../public/assets/body/Back.png' width={24} height={24} />
                        </div>
    
                        {/*  carrousel over here*/}
                        <div className="carousel">
                            {data.map(d => {
                                return(<CarouselCard cbFunc={CallBackCard} item={d}></CarouselCard>)
                            })}
                            
    
                        </div>
    
    
                        <div className="next">
                            <Image src='/../public/assets/body/Forward.png' width={24} height={24} />
                        </div>
                    </Carrousel>
                    <Footer>
                        <div className="cardFooter">
                            <div className="top">
                                <div className="title">
                                    VENDA O SEU PRODUTO
                                </div>
                                <div className="sub-title">
                                    Venda o seu produto usado em nosso marketplace.
                                </div>
                            </div>
                            <div className="div">
                                <Image src='/../public/assets/body/footer/1.png' width={384} height={168} />
                            </div>
                            
                        </div>
                        <div className="cardFooter">
                            <div className="top">
                                <div className="title">
                                    CONHEÇA OS PRODUTOS PRIME
                                </div>
                                <div className="sub-title">
                                    Fique por dentro de todos os nossoa benefícios.
                                </div>
                            </div>
                            <div className="div">
                                <Image src='/../public/assets/body/footer/2.png' width={384} height={168} />
                            </div>
                            
                        </div>
                        <div className="cardFooter">
                            <div className="top">
                                <div className="title">
                                    CONHEÇA NOSSOS PRODUTOS DE LEILÃO
                                </div>
                                <div className="sub-title">
                                    As melhores oportunidades de compra.
                                </div>
                            </div>
                            <div className="div">
                                <Image src='/../public/assets/body/footer/3.png' width={384} height={168} />
                            </div>
                            
                        </div>
                    </Footer>
                </View>
    
            </Container>
        );
    }

    
}



//styled components
const Container = styled.div`
    max-width:1440px;
    height:100%;
    margin:auto;
    //border:1px solid;
`
const View = styled.div`
    //border:1px solid;
    max-width:1360px;
    margin:auto;
    top:-290px;
    position:relative;
    background: #FAFAFB;
    color:#42464D;
    .card{
        background: #FF6500;
        width:100%;
        height: 70px;
        color:#FFF;
        display:flex;
        flex-direction: row;
        justify-content:space-between;
        align-items:center;
        padding:20px 70px;
        p{
            padding:0px;
            margin:0;
        }
    }
`

const Timer = styled.p`
    display:flex;
    flex-direction: row;
    align-items:center;
    gap:5px;
`

const Carrousel = styled.div`
    padding:30px;
    display:flex;
    flex-direction:row;
    align-items:center;
    .prev{
        
        width:30px;
        margin:au
    }
    .next{
        
        width:30px;
        
    }
    .carousel{
        display:flex;
        flex-direction:row;
        gap:10px;
        width: auto;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        -ms-overflow-style: none;
        scrollbar-width: none;
        ::-webkit-scrollbar {
            display: none;
        }
    }
`

const Footer = styled.div`
    padding:32px 72px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    .cardFooter{
        border:1px solid #F2F3F4;
        background: transparent;
        display:flex;
        flex-direction:column;
        .top{
            padding:10px;
            color: #565C69;
            .title{
                font-weight: bold;
                font-size: 14px;
                
            }
            .sub-title{
                font-size: 10px;
            }
        }
        .img{
            height:168;
            width:384;
        }
    }
    @media(max-width: 1200px) {
        flex-direction: column;

    }
`
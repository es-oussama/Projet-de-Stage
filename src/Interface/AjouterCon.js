import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AjouterCon.css'; 

export default function AjouterCon() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/contentieux')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <div className='boddy'></div>
            <div className="boîte-connexion">
                <table className="boîte-connexion-table">
                    <thead>
                        <tr>
                            <th>CONTENTIEUX</th>
                            <th>DATE DEBUT</th>
                            <th>DATE FIN</th>
                            <th>DATE DE RECLAMATION</th>
                            <th>AVOCAT</th>
                            <th>TRIBUNAL</th>
                            <th>SUJET</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((contentieux, i) => {
                            return <tr key={i}>
                                <td>{contentieux.contentieux}</td>
                                <td>{contentieux.datDebut}</td>
                                <td>{contentieux.dateFin}</td>
                                <td>{contentieux.dateReclamation}</td>
                                <td>{contentieux.id_avocat}</td>
                                <td>{contentieux.id_tribunal}</td>
                                <td>{contentieux.Sujet}</td>
                                <td>
                                    <button className='primary-button'>Modifier</button>
                                    <button className='primary-button'>Supprimer</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

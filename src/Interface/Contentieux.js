import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Global.css';
import './Contentieux.css';

export default function Contentieux() {
  const [id, setId] = useState('');
  const [contentieux, setContentieux] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [dateReclamation, setdateReclamation] = useState('');
  const [sujet, setSujet] = useState('');
  const [search, setSearch] = useState('');
  const [date, setdate] = useState(new Date().toISOString().split('T')[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState([]);
  const [sdata, setsData] = useState([]);
  const [Dataavocat, setDataAvocat] = useState([]);
  const [DataTribunal, setDataTribunal] = useState([]);
  const [DataRedevable, setDataRedevable] = useState([]);
  const [DataPercepteur, setDataPercepteur] = useState([]);
  const [selectedAvocat, setSelectedAvocat] = useState('');
  const [selectedTribunal, setselectedTribunal] = useState('');
  const [selectedPercepteur, setselectedPercepteur] = useState('');
  const [selectedRedevable, setselectedRedevable] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8081/contentieux')
      .then(res => setsData(res.data))
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    async function fetchData() {
      await axios.get('http://localhost:8081/contentieux')
        .then(res => setData(res.data))
        .catch(err => console.log(err));

      await axios.get('http://localhost:8081/avocats')
        .then(res => setDataAvocat(res.data))
        .catch(err => {
          if (err.response && err.response.status === 404) {
            console.log("Ressource introuvable (404) : Impossible de récupérer les données de l'avocat.");
          } else {
            console.error("Erreur lors de la récupération des données de l'avocat :", err.message);
          }
        });
      await axios.get('http://localhost:8081/percepteurs')
        .then(res => setDataPercepteur(res.data))
        .catch(err => {
          if (err.response && err.response.status === 404) {
            console.log("Ressource introuvable (404) : Impossible de récupérer les données du percepteur.");
          } else {
            console.error("Erreur lors de la récupération des données du percepteur :", err.message);
          }
        });


      await axios.get('http://localhost:8081/redevables')
        .then(res => setDataRedevable(res.data))
        .catch(err => {
          if (err.response && err.response.status === 404) {
            console.log("Ressource introuvable (404) : Impossible de récupérer les données du redevable.");
          } else {
            console.error("Erreur lors de la récupération des données du redevable :", err.message);
          }
        });

      await axios.get('http://localhost:8081/tribunals')
        .then(res => setDataTribunal(res.data))
        .catch(err => {
          if (err.response && err.response.status === 404) {
            console.log("Ressource introuvable (404) : Impossible de récupérer les données du tribunal.");
          } else {
            console.error("Erreur lors de la récupération des données du tribunal :", err.message);
          }
        });
    }
    fetchData();
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    try {
      const formData = {
        id: 'AUTO',
        contentieux: contentieux,
        dateDebut: dateDebut,
        dateFin: dateFin,
        dateReclamation: dateReclamation,
        Sujet: sujet,
        name_avocat: selectedAvocat,
        name_tribunal: selectedTribunal,
        name_percepteur: selectedPercepteur,
        name_redevable: selectedRedevable
      };
      if (isEditing) {
        await axios.put(`http://localhost:8081/contentieux/${id}`, formData);
      } else {
        await axios.post('http://localhost:8081/contentieux', formData);
      }
      setId('');
      setContentieux('');
      setSujet('');
      setDateDebut('');
      setDateFin('');
      setdateReclamation('');
      setSelectedAvocat('');
      setselectedTribunal('');
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
    }
    window.location.reload();
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce contenu ?");
      if (confirmed) {
        await axios.delete(`http://localhost:8081/contentieux/${id}`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    const searchInData = data.filter((item) => item.contentieux.toLowerCase().includes(searchTerm));
    setsData(searchInData);
  }

  const handleEdit = async (contentieux) => {
    setIsEditing(true);
    setId(contentieux.Id);
    setContentieux(contentieux.contentieux);
    setSujet(contentieux.Sujet);
    setDateDebut(contentieux.dateDebut);
    setDateFin(contentieux.dateFin);
    setdateReclamation(contentieux.dateReclamation);
    setSelectedAvocat(contentieux.id_avocat);
    setselectedTribunal(contentieux.id_tribunal);
    setselectedRedevable(contentieux.id_redevable);
    setselectedPercepteur(contentieux.id_percepteur);
    await axios.post('http://localhost:8081/historique', contentieux);
  };

  return (
    <div>
      <div className='corps'></div>
      <div className="boîte-connexion">
        <p>Informations de Contentieux</p>
        <form onSubmit={handleSubmit}>
          <div className="zone-utilisateur">
            <input type="text" name="contentieux" value={contentieux} onChange={e => setContentieux(e.target.value)} required />
            <label> Contentieux :</label>
          </div>
          <div className="zone-utilisateur">
            <input type="date" name="date_debut" value={dateDebut} onChange={e => setDateDebut(e.target.value)} />
            <label>Date de début :</label>
          </div>
          <div className="zone-utilisateur">
            <input type="date" name="date_fin" value={dateFin} onChange={e => setDateFin(e.target.value)} />
            <label>Date de fin :</label>
          </div>
          <div className="zone-utilisateur">
            <input type="date" name="date_reclamation" value={dateReclamation} onChange={e => setdateReclamation(e.target.value)} />
            <label>Date initiateur :</label>
          </div>
          <div className="zone-utilisateur">
            <div className="cases-à-cocher">
              <input type="text" name="Sujet" value={sujet} onChange={e => setSujet(e.target.value)} required />
              <label>Sujet :</label>
            </div>
          </div>

          <div className="zone-utilisateur">
            <select value={selectedAvocat} onChange={e => setSelectedAvocat(e.target.value)}>
              <option>Sélectionnez un avocat</option>
              {Dataavocat.map(avocat => (
                <option key={avocat.Id_avocat} value={avocat.nom_avo}>{avocat.nom_avo}</option>
              ))}
            </select>
            <label>Avocat :</label>
          </div>

          <div className="zone-utilisateur">
            <select value={selectedTribunal} onChange={e => setselectedTribunal(e.target.value)}>
              <option>Sélectionnez un Tribunal</option>
              {DataTribunal.map(tribunal => (
                <option key={tribunal.Id_tribunal} value={tribunal.Nom_tri}>{tribunal.Nom_tri}</option>
              ))}
            </select>
            <label>Tribunal :</label>
          </div>

          <div className="zone-utilisateur">
            <select value={selectedRedevable} onChange={e => setselectedRedevable(e.target.value)}>
              <option>Sélectionnez un Redevable</option>
              {DataRedevable.map(redevable => (
                <option key={redevable.Id_redevable} value={redevable.nom_red}>{redevable.nom_red}</option>
              ))}
            </select>
            <label>Redevable :</label>
          </div>

          <div className="zone-utilisateur">
            <select value={selectedPercepteur} onChange={e => setselectedPercepteur(e.target.value)}>
              <option>Sélectionnez un percepteur</option>
              {DataPercepteur.map(percepteur => (
                <option key={percepteur.Id_percepteur} value={percepteur.nom_per}>{percepteur.nom_percepteur}</option>
              ))}
            </select>
            <label>Percepteur :</label>
          </div>

          <div className='button-borders'>
            <button type='submit' className='primary-button'> {isEditing ? 'Modifier' : 'Ajouter'}</button>
          </div>

        </form>
        <br />
        <span>
          <div className="zone-utilisateur">
            <input type="text" style={{ width: 200 }} name="Recherche" value={search} onChange={(e) => { handleSearch(e) }} required />
            <label>Barre de Recherche</label>
          </div>
          <div className="zone-utilisateur">
            <input type="date" style={{ width: 200 }} name="Recherche" value={date} onChange={e => setdate(e.target.value)} />
            {/* <label>Barre de Recherche par Jour</label> */}
          </div>
        </span>
        {sdata.length > 0 ? (
          <div className="table">
            <table border="2px">
              <thead>
                <tr>
                  {/* <th>id</th> */}
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
                {sdata
                  .filter(contentieux => {
                    const contentieuxDate = new Date(contentieux.DateCreation);
                    const today = new Date(date);
                    return contentieuxDate.toDateString() === today.toDateString();
                  })
                  .map(contentieux => {
                    if (contentieux.contentieux) {
                      return (
                        <tr key={contentieux.contentieux}>
                          <td>{contentieux.contentieux}</td>
                          <td>{contentieux.dateDebut}</td>
                          <td>{contentieux.dateFin}</td>
                          <td>{contentieux.dateReclamation}</td>
                          <td>{contentieux.name_avocat}</td>
                          <td>{contentieux.name_tribunal}</td>
                          <td>{contentieux.Sujet}</td>
                          <td>
                            <button onClick={() => handleEdit(contentieux)} className='primary-button'>Modifier</button>
                            <button onClick={() => handleDelete(contentieux.Id)} className='primary-button'>Supprimer</button>
                          </td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })}

              </tbody>
            </table>
          </div>
        ) : (
          <p>????????????????</p>
        )}
      </div>
    </div>
  );
}  
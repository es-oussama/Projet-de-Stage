import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';


function Update() {
  const [contentieux, setContentieux] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [dateReclamation, setdateReclamation] = useState('');
  const [sujet, setSujet] = useState('');
  const {id}=useParams();
   const navigate =useNavigate();
   function HandleSubmit(event){
    event.preventDefault();
    axios.put('http://localhost:8081/Update' +id,{contentieux,dateDebut,dateFin,dateReclamation,sujet})
    .then(res=>{
        console.log(res);
        navigate('/')
    }).catch(err =>console.log(err))


}

  return (<div>
    <div>U</div>
    <p>Modifier Informations de Contentieux</p>
        <form onSubmit={handleSubmit}>
          <div className="zone-utilisateur">
            <input type="text" name="contentieux" value={contentieux} onChange={e => setContentieux(e.target.value)} required />
            <label> Contentieux :</label>
          </div>
          <div className="zone-utilisateur">
            <input type="date" name="date_debut"  value={dateDebut} onChange={e => setDateDebut(e.target.value)} />
            <label>Date de début :</label>
          </div>
          <div className="zone-utilisateur">
            <input type="date" name="date_fin"  value={dateFin} onChange={e => setDateFin(e.target.value)} />
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
            {/* <div className="zone-utilisateur">
              <input type="text" name="Jugement" required />
              <label>Jugement :</label>
            </div>
            <div className="zone-utilisateur">
              <input type="text" name="Initiateur" required />
              <label>Initiateur :</label>
            </div> */}
          </div>
          <div className="zone-utilisateur">
            <select value={selectedAvocat} onChange={handleSelectChange}>
              <option value="">Sélectionnez un avocat</option>
              {Dataavocat.map(avocat => (
                <option key={avocat.id} value={avocat.id}>{avocat.nom_avo}</option>
              ))}
            </select>

            <label>Avocat :</label>
          </div>


          <div className="zone-utilisateur">
            <select value={selectedTribunal} onChange={handleSelectChangeTRI}>
              <option value="">Sélectionnez un Tribunal</option>
              {DataTribunal.map(tribunal => (
                <option key={tribunal.id} value={tribunal.id}>{tribunal.Nom_tri}</option>
              ))}
            </select>
            <label>Tribunal :</label>
          </div>

          <div className="zone-utilisateur">
            <select value={selectedRedevable} onChange={handleSelectChangeRED}>
              <option value="">Sélectionnez un Redevable</option>
              {DataRedevable.map(redevable => (
                <option key={redevable.id} value={redevable.id}>{redevable.nom_red}</option>
              ))}
            </select>
            <label>Redevable :</label>
          </div>

          <div className="zone-utilisateur">
            <select value={selectedPercepteur} onChange={handleSelectChangePER}>
              <option value="">Sélectionnez un percepteur</option>
              {DataPercepteur.map(percepteur => (
                <option key={percepteur.id} value={percepteur.id}>{percepteur.nom_per}</option>
              ))}
            </select>
            <label>Percepteur :</label>
          </div>
          <div className='button-borders'>
            <button type='submit' className='primary-button'> Ajouter</button>
          </div>

        </form>
  </div>
  )
}

export default Update
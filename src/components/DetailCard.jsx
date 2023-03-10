import { useQuery } from "react-query";
import EmptyCard from "./EmptyCard";

const getUser = async(user) =>{
  const response= await fetch(`https://api.github.com/users/${user}`)
  return await response.json()
  

}



export default function DetaildCard({ user, handleHistory }) {
const {isLoading, isError, isSuccess, data, error }= useQuery(
  ["get_user", user], ()=> getUser(user))

  if (isLoading) {
    return <EmptyCard text="Cargando.."/>
  }

  if (isError) {
    return <EmptyCard text="Prueba de nuevo más tarde"/>
  }
  console.log(data);

  return (
    <div className="detail">
      <div className="left">
        <img className="avatar" src={data.avatar_url} alt="" />
      </div>
      <div className="right">
        <div className="title">
          <h2>{data.name}</h2>
          <a  href={data.html_url} target="_blank">{user}</a>
        </div>
        <div className="stats">
          <div className="item">
            <small>Repos</small>
            <span>{data.public_repos}</span>
          </div>
          <div className="item">
            <small>Followers</small>
            <span>{data.followers}</span>
          </div>
          <div className="item">
            <small>Following</small>
            <span>{data.following}</span>
          </div>
        </div>
        <ul>
          <li>
            <i className="fas fa-map-marker-alt"> "Not available"</i>
          </li>
          <li>
            <i className="fab fa-twitter"> "Not available"</i>{" "}
          </li>
          <li>
            <i className="fas fa-link">"Not available"</i>{" "}
          </li>
          <li>
            <i className="fas fa-building"> "Not available" </i>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
}

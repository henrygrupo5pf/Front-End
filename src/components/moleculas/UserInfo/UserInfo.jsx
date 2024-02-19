import { Link } from 'react-router-dom';

export const UsersInfo = ({ info }) => {


  return (
    <Link to={`/dashboard/updateuser/${info.id}`}>
      <div>
        <p>ID: {info.id} </p>
        <p>Name: {info.name}</p>
        <p>Email: {info.email}</p>
      </div>
    </Link>
  );
};


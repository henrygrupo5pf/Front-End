
export const UsersInfo = ({ info }) => {

  return (
    <div>
      <div className="id"> {info.id}  </div>
      <div className="name"> {info.name} </div>
      <div className="email"> {info.email} </div>
    </div>
  );
};


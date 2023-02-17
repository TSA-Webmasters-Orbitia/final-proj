const NavLink = ({ text, url }) => {
    return (
      <>
        <a href={url}>
          <div className="mb-2 text-center border-b-2 border-blue-300 hover:text-blue-900 hover:scale-105 hover:border-b-2 hover:border-blue-900 w-fit">{text}</div>
        </a>
      </>
    );
  };
  
  export default NavLink;
  
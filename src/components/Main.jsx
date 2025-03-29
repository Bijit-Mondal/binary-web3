const Main = ({ children }) => {
  return (
    <div className="main w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full md:w-[480px] h-full flex flex-col items-center justify-center bg-white shadow-lg rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default Main;

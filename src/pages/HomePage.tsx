import AddButton from "../components/Addbutton/AddButton";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <h1 className="text-2xl font-bold flex justify-center items-center">
        POC for Reservations
      </h1>
      <div className="flex justify-end mr-3 flex-wrap">
        <AddButton />
      </div>
    </>
  );
};

export default HomePage;

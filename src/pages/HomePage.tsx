import AddButton from "../components/Addbutton/AddButton";
import Datatable from "../components/Datatable/Datatable";

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
      <div className="justify-center flex-wrap w-full">
        <Datatable />
      </div>
    </>
  );
};

export default HomePage;

import AdvanceSearch from "./AdvanceSearch";
import Heading from "./Heading";
import Results from "./Results";
import SearchInput from "./SearchInput";

export default function CreateImagePage() {
  return (
    <>
      <Heading text="Let's create a masterpiece, Alvian! " />
      <SearchInput />
      <AdvanceSearch />

      <Results />
    </>
  );
}

export default function Header({ setRoute }) {
  function handleClick(e) {
    setRoute(e.target.value);
  }

  return (
    <header className="flex items-center mb-12 justify-between">
      <div className="flex items-center">
        <img src="./assets/logo.svg" className="h-10" />
      </div>
      <ul className="ml-4 text-sm text-zinc-400 flex gap-8">
        <button
          onClick={handleClick}
          value="create"
          className="hover:text-zinc-200 font-medium text-zinc-200 cursor-pointer transition-all"
        >
          Create Image
        </button>
        <button
          onClick={handleClick}
          value="download"
          className="hover:text-zinc-200 cursor-pointer transition-all"
        >
          Downloaded
        </button>
      </ul>
    </header>
  );
}

type props = {
  title: string
}

export default function Header(props: props) {
    return (
      <header className='p-4 w-[90%]'>
        <h1 className="font-bold text-[32px] p-2">{props.title}</h1>
        <hr className="w-[100%]"/>
      </header>
    );
  }
  